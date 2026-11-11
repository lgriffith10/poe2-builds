/**
 * Builds official trade site searches (pathofexile.com/trade2) for a build's gear. The trade site accepts a search
 * in its URL (`?q={"query": …}`), so links are built in the browser, with the player's level when they give it.
 */
import { getBase, getUnique } from "./data";
import { modLabel } from "./mod-labels";
import type { GearPiece, GearSlot } from "./types";

/** [text, id] pairs from the trade site's stat list (src/data/generated/trade-stats.json, `npm run trade:stats`). */
export type TradeStat = [string, string];

const CLASS_CATEGORY: Record<string, string> = {
  Bow: "weapon.bow",
  Crossbow: "weapon.crossbow",
  Claw: "weapon.claw",
  Dagger: "weapon.dagger",
  Flail: "weapon.flail",
  Spear: "weapon.spear",
  Talisman: "weapon.talisman",
  Wand: "weapon.wand",
  Sceptre: "weapon.sceptre",
  Staff: "weapon.staff",
  Warstaff: "weapon.warstaff",
  "One Hand Axe": "weapon.oneaxe",
  "One Hand Mace": "weapon.onemace",
  "One Hand Sword": "weapon.onesword",
  "Two Hand Axe": "weapon.twoaxe",
  "Two Hand Mace": "weapon.twomace",
  "Two Hand Sword": "weapon.twosword",
  Quiver: "armour.quiver",
  Shield: "armour.shield",
  Buckler: "armour.buckler",
  Focus: "armour.focus",
  Helmet: "armour.helmet",
  "Body Armour": "armour.chest",
  Gloves: "armour.gloves",
  Boots: "armour.boots",
  Amulet: "accessory.amulet",
  Ring: "accessory.ring",
  Belt: "accessory.belt",
};

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

  constructor(stats: TradeStat[]) {
    for (const [text, id] of stats) if (id.startsWith("explicit.") && !this.byText.has(norm(text))) this.byText.set(norm(text), id);
  }

  /** Trade stat id for a guide modifier label, or null when the trade site has no clear match. */
  statId(label: string): string | null {
    const l = modLabel(label).replace(/\d+(?:\.\d+)?/g, "#");
    // Pseudo ids are lower case ("pseudo_total_fire_resistance").
    for (const [re, id] of MANUAL) if (re.test(l)) return l.replace(re, id).toLowerCase();
    return this.byText.get(norm(l)) ?? null;
  }

  /**
   * Search for a gear piece. Uniques: by name. Rares: the item category, the base's defence type, the first two
   * stats the guide asks for, and at least one of the others. `ordered` is false for ladder characters, whose
   * modifiers are not listed by importance: half of them are asked for, in any order.
   */
  query(slot: GearSlot, piece: GearPiece, ordered: boolean): object | null {
    const status = { option: "available" };
    if (piece.unique) {
      const u = getUnique(piece.unique);
      if (!u) return null;
      return { status, name: u.name, type: u.base, filters: { type_filters: { filters: { rarity: { option: "unique" } } } } };
    }
    const base = piece.base ? getBase(piece.base) : undefined;
    const category = (base && CLASS_CATEGORY[base.class]) ?? SLOT_CATEGORY[slot];
    if (!category) return null;
    const ids = [...new Set((piece.mods ?? []).filter((m) => !DEFENCE_LABEL.test(m)).map((m) => this.statId(m)).filter((x): x is string => !!x))];
    if (!ids.length) return null;
    const filter = (id: string) => ({ id });
    const stats = !ordered
      ? [{ type: "count", value: { min: Math.ceil(ids.length / 2) }, filters: ids.map(filter) }]
      : [
          { type: "and", filters: ids.slice(0, 2).map(filter) },
          ...(ids.length > 2 ? [{ type: "count", value: { min: 1 }, filters: ids.slice(2).map(filter) }] : []),
        ];
    const defence: Record<string, { min: number }> = {};
    const props = base?.props ?? {};
    if (props.armour) defence.ar = { min: 1 };
    if (props.evasion) defence.ev = { min: 1 };
    if (props.energy_shield) defence.es = { min: 1 };
    return {
      status,
      stats,
      filters: {
        type_filters: { filters: { category: { option: category }, rarity: { option: "nonunique" } } },
        ...(Object.keys(defence).length && category.startsWith("armour.") ? { equipment_filters: { filters: defence } } : {}),
      },
    };
  }
}
