/**
 * Builds official trade site searches (pathofexile.com/trade2) for a build's gear. The trade site accepts a search
 * in its URL (`?q={"query": …}`), so links are built in the browser, with the player's level when they give it.
 */
import { getBase, getUnique } from "./data";
import { modLabel } from "./mod-labels";
import type { GearPiece, GearSlot } from "./types";
import { CASTER_WEAPONS, CLASS_CATEGORY } from "./trade-categories";

/** [text, id] pairs from the trade site's stat list (src/data/generated/trade-stats.json, `npm run trade:stats`). */
export type TradeStat = [string, string];


const SLOT_CATEGORY: Partial<Record<GearSlot, string>> = {
  helmet: "armour.helmet",
  body: "armour.chest",
  gloves: "armour.gloves",
  boots: "armour.boots",
  amulet: "accessory.amulet",
  ring1: "accessory.ring",
  ring2: "accessory.ring",
  belt: "accessory.belt",
};

/** Guide labels the trade site words differently, or better served by its "total" pseudo stats. */
const MANUAL: [RegExp, string][] = [
  [/^\+# to maximum Life$/, "pseudo.pseudo_total_life"],
  [/^\+# to maximum Mana$/, "pseudo.pseudo_total_mana"],
  [/^\+#% to (Fire|Cold|Lightning|Chaos) Resistance$/, "pseudo.pseudo_total_$1_resistance"],
  [/^(\+#% to all Elemental Resistances|Resistances)$/, "pseudo.pseudo_total_elemental_resistance"],
  [/^\+# to (Strength|Dexterity|Intelligence)$/, "pseudo.pseudo_total_$1"],
  [/^\+# to Strength, Dexterity or Intelligence$/, "pseudo.pseudo_total_attributes"],
  [/^\+# to all Attributes$/, "pseudo.pseudo_total_all_attributes"],
  [/^#% increased Movement Speed$/, "pseudo.pseudo_increased_movement_speed"],
  [/^Deflection$/, "explicit.stat_3040571529"],
  [/^#% increased Allies in presence Damage$|^Allies in Presence deal Increased Damage$/, "explicit.stat_1798257884"],
  [/^Allies in Presence Attack Speed$/, "explicit.stat_1998951374"],
  [/^Allies in Presence gain Added Physical Damage$/, "explicit.stat_1574590649"],
  [/^Allies in Presence gain Added Lightning Damage$/, "explicit.stat_2854751904"],
  [/^Allies in Presence gain Added Fire Damage$/, "explicit.stat_849987426"],
  [/^Allies in Presence gain Added Cold Damage$/, "explicit.stat_2347036682"],
  [/^Allies in Presence Critical Damage Bonus$/, "explicit.stat_3057012405"],
  [/^(#% increased Minion Damage|Minions deal Increased Damage)$/, "explicit.stat_1589917703"],
  [/^Minion Melee Splash$/, "explicit.stat_3249412463"],
  [/^Minion Area of Effect$/, "explicit.stat_3811191316"],
  [/^Additional Arrow$/, "explicit.stat_3885405204"],
];

/** Guide labels that read better raw than through modLabel: matched on the label itself. */
const RAW: Record<string, string> = {
  "Spell Critical Hit Chance": "explicit.stat_737908626",
  "Attack Critical Hit Chance": "explicit.stat_2194114101",
  "Life Regeneration": "explicit.stat_3325883026",
  "Mana Cost Efficiency": "explicit.stat_4101445926",
  "Life Cost Efficiency": "explicit.stat_310945763",
  "Projectile Speed": "explicit.stat_3759663284",
  "Quality of all Skill Gems": "explicit.stat_3655769732",
  "Ignite Magnitude": "explicit.stat_3791899485",
  "Faster Damaging Ailments": "explicit.stat_538241406",
  "Minion Movement Speed": "explicit.stat_174664100",
  "Minion Damaging Ailment Magnitude": "explicit.stat_953593695",
  "Minion Immobilisation Buildup": "explicit.stat_1485480327",
  "Increased Damage with Command Skills": "explicit.stat_3742865955",
  "Presence Area": "explicit.stat_101878827",
  "Exposure Effect": "explicit.stat_2074866941",
  "Power Charge on Critical Hit": "explicit.stat_3814876985",
  "Damage against Fully Broken Armour": "explicit.stat_2301718443",
  "Skill Speed": "explicit.stat_970213192",
  "Mana on Kill": "explicit.stat_1368271171",
  "Life on Kill": "explicit.stat_3695891184",
  "Onslaught on Kill": "explicit.stat_1195849808",
  "Archon Duration": "explicit.stat_2158617060",
  "Spell Damage with Spells that Cost Life": "explicit.stat_1373860425",
  "Damage Taken from Mana before Life": "explicit.stat_458438597",
  "Maximum Infusion Stacks": "explicit.stat_4097212302",
  "Additional Combo Gain": "explicit.stat_4258524206",
};

/**
 * On martial weapons these stats are local: the trade site lists them apart from the global ones found on jewellery
 * ("+#% to Critical Hit Chance" on a spear, "#% increased Critical Hit Chance" on an amulet).
 */
const LOCAL: [RegExp, string][] = [
  [/^#% increased Attack Speed$/, "explicit.stat_210067635"],
  [/^#% increased Critical Hit Chance$/, "explicit.stat_518292764"],
  [/^#% increased Critical Damage Bonus$/, "explicit.stat_2694482655"],
  [/^\+# to Accuracy Rating$/, "explicit.stat_691932474"],
];

/** Whether a base is a martial weapon, whose damage, speed and critical modifiers are local. */
export function isLocalWeapon(baseName: string | undefined): boolean {
  const base = baseName ? getBase(baseName) : undefined;
  const category = base && CLASS_CATEGORY[base.class];
  return !!category && category.startsWith("weapon.") && !CASTER_WEAPONS.has(category);
}

/** Maxroll's "physical DPS" planner filter: no stat to require, so the search is sorted by physical DPS instead. */
export const HIGH_PDPS = "High Physical DPS";

/** How a guide's modifier is used by the trade search: required, one of the rest, or not searchable. */
export type TradeRole = "required" | "any" | null;

/** Defence words in guide labels: the base already decides them, so they become "has this defence" filters. */
const DEFENCE_LABEL = /^(Armour|Evasion Rating|Energy Shield|Evasion and Energy Shield|Armour and (Evasion|Energy Shield))$/;

const norm = (s: string) =>
  s
    .replace(/\d+(?:\.\d+)?/g, "#")
    .replace(/^\+/, "")
    .toLowerCase()
    .trim();

export class TradeQueries {
  private byText = new Map<string, string>();
  /** "Grants Skill: Level # <skill>" stats, by skill name. */
  private skills = new Map<string, TradeStat>();

  constructor(stats: TradeStat[]) {
    for (const [text, id] of stats) {
      if (id.startsWith("explicit.") && !this.byText.has(norm(text))) this.byText.set(norm(text), id);
      const skill = id.startsWith("skill.") && text.match(/^Grants Skill: Level # (.+?)(?: Minion)?$/);
      if (skill) this.skills.set(skill[1], [text, id]);
    }
  }

  /** Trade stat id for a guide modifier label, or null when the trade site has no clear match. */
  statId(label: string, local = false): string | null {
    if (RAW[label]) return RAW[label];
    const l = modLabel(label).replace(/\d+(?:\.\d+)?/g, "#");
    if (local) for (const [re, id] of LOCAL) if (re.test(l)) return id;
    // Pseudo ids are lower case ("pseudo_total_fire_resistance").
    for (const [re, id] of MANUAL) if (re.test(l)) return l.replace(re, id).toLowerCase();
    return this.byText.get(norm(l)) ?? null;
  }

  /** The "Grants Skill: Level # …" stat for a skill granted by an item ("Skeletal Warrior"), or null. */
  grantedSkill(name: string): TradeStat | null {
    return this.skills.get(name.replace(/ Minion$/, "")) ?? null;
  }

  /**
   * Search for a gear piece. Uniques: by name. Rares: the item category, the base's defence type, the first two
   * stats the guide asks for, and at least one of the others. Guides list a slot's stats by priority, so `roles`
   * tells, for each listed stat, how the search uses it. `ordered` is false for ladder characters, whose
   * modifiers are not listed by importance: half of them are asked for, in any order.
   */
  query(
    slot: GearSlot,
    piece: GearPiece,
    ordered: boolean,
    grantedSkills: string[] = [],
  ): { query: object; roles: TradeRole[]; sort?: Record<string, string> } | null {
    const status = { option: "available" };
    if (piece.unique) {
      const u = getUnique(piece.unique);
      if (!u) return null;
      return { query: { status, name: u.name, type: u.base, filters: { type_filters: { filters: { rarity: { option: "unique" } } } } }, roles: [] };
    }
    const base = piece.base ? getBase(piece.base) : undefined;
    const category = (base && CLASS_CATEGORY[base.class]) ?? SLOT_CATEGORY[slot];
    if (!category) return null;
    const local = category.startsWith("weapon.") && !CASTER_WEAPONS.has(category);
    const mods = piece.mods ?? [];
    // One stat id per listed modifier (null: defence word, physical DPS or no trade stat); duplicates count once.
    const seen = new Set<string>();
    const idOf = mods.map((m) => {
      const id = DEFENCE_LABEL.test(m) || m === HIGH_PDPS ? null : this.statId(m, local);
      if (!id || seen.has(id)) return null;
      seen.add(id);
      return id;
    });
    const ids = idOf.filter((x): x is string => !!x);
    const sort = local && mods.includes(HIGH_PDPS) ? { pdps: "desc" } : undefined;
    if (!ids.length && !sort) return null;
    const filter = (id: string) => ({ id });
    // Skills the build takes from this item: the item must grant them (the level is left to the player to compare).
    const skillIds = grantedSkills.map((s) => this.grantedSkill(s)?.[1]).filter((x): x is string => !!x);
    const required = ordered ? ids.slice(0, 2) : [];
    const rest = ordered ? ids.slice(2) : ids;
    const stats = [
      ...(skillIds.length || required.length ? [{ type: "and", filters: [...skillIds, ...required].map(filter) }] : []),
      ...(rest.length ? [{ type: "count", value: { min: ordered ? 1 : Math.ceil(rest.length / 2) }, filters: rest.map(filter) }] : []),
    ];
    const roles: TradeRole[] = idOf.map((id) => (!id ? null : required.includes(id) ? "required" : "any"));
    const defence: Record<string, { min: number }> = {};
    const props = base?.props ?? {};
    if (props.armour) defence.ar = { min: 1 };
    if (props.evasion) defence.ev = { min: 1 };
    if (props.energy_shield) defence.es = { min: 1 };
    return {
      roles,
      sort,
      query: {
        status,
        stats,
        filters: {
          type_filters: { filters: { category: { option: category }, rarity: { option: "nonunique" } } },
          ...(Object.keys(defence).length && category.startsWith("armour.") ? { equipment_filters: { filters: defence } } : {}),
        },
      },
    };
  }
}
