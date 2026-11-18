// Price check: an item copied in game (Ctrl+C, English or French client) turned into a trade site search for
// comparable items. Prices of rares are not public data, so the estimate is the trade site's own listings, reached
// through a prefilled search (`?q=`, see src/lib/trade-query.ts); uniques also get their poe.ninja price.

import { LIMITS, rolledText, type Crafter, type Item } from "./craft";
import { parseItemText, statKey, translateLine } from "./craft-import";
import { CASTER_WEAPONS, CLASS_CATEGORY } from "./trade-categories";
import { parseWeapon } from "./weapon-dps";

/** [text, id] pairs from the trade site's stat list (src/data/generated/trade-stats.json). */
export type StatList = [string, string][];

export type LineSource = "property" | "pseudo" | "explicit" | "implicit" | "rune" | "enchant" | "fractured" | "desecrated";

export interface PriceLine {
  key: string;
  source: LineSource;
  /** The line as read on the item (French when the item is), or a pseudo/property code for the interface to word. */
  text: string;
  /** Trade stat id, or an equipment filter for properties ("ar", "pdps"…); null: the trade site has no such stat. */
  id: string | null;
  /** Value compared by the search (average for "Adds # to #"), null for stats without a number. */
  value: number | null;
  /** Modifier tier on its base (1 = best), when the simulator knows the mod. */
  tier: number | null;
  /** Number of tiers of that modifier on the base. */
  tiers: number | null;
  /** Searched by default. */
  on: boolean;
  /** English text of a mod line (translated from a French client). */
  en?: string;
  /** Explicit lines folded into a pseudo total. */
  inPseudo?: boolean;
}

export interface PricedItem {
  rarity: "normal" | "magic" | "rare" | "unique";
  name: string | null;
  /** English base type, when recognised. */
  base: string | null;
  category: string | null;
  ilvl: number | null;
  corrupted: boolean;
  lines: PriceLine[];
  french: boolean;
  /** Free affix slots of a magic or rare item (open prefixes and suffixes make a base worth more for crafting). */
  open: { P: number; S: number } | null;
}

const HEADER = /^(Item Class|Rarity|Classe d['’]objet|Rareté)\s*:/i;
const ITEM_LEVEL = /^(Item Level|Niveau d['’]objet|Niveau de l['’]objet)\s*:/i;
const FLAG = /\s*\((crafted|desecrated|fractured|implicit|rune|enchant|augmented|implicite|enchantement|profanée?|fracturée?|augmentée?|façonnée?)\)$/i;
const FLAG_SOURCE: [RegExp, LineSource][] = [
  [/^implicite?$/i, "implicit"],
  [/^rune$/i, "rune"],
  [/^enchant(ement)?$/i, "enchant"],
  [/^fractur/i, "fractured"],
  [/^(desecrated|profan)/i, "desecrated"],
];
const PROPS: [RegExp, string][] = [
  [/^(Armour|Armure)\s*:/i, "ar"],
  [/^(Evasion Rating|Score d['’][ée]vasion|[ÉE]vasion)\s*:/i, "ev"],
  [/^(Energy Shield|Bouclier d['’][ée]nergie)\s*:/i, "es"],
];
const SKIP = /^(Corrupted|Unidentified|Mirrored|Sanctified|Corrompu|Non identifié|Reflété|Sanctifié)$/i;
const cleanLine = (s: string) =>
  s
    .replace(/(\d)\((-?[\d.]+)-(-?[\d.]+)\)/g, "$1")
    .replace(/\s+—\s+Unscalable Value$/i, "")
    .trim();
const numbers = (s: string) => [...s.replace(/(\d),(\d)/g, "$1.$2").matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));

/** Explicit trade stats by text key, with their "(Local)" variant when the trade site has one. */
export class StatIndex {
  private map = new Map<string, { global?: string; local?: string }>();
  constructor(stats: StatList) {
    for (const [text, id] of stats) {
      if (!id.startsWith("explicit.") || id.includes("|")) continue;
      const local = /\s\(Local\)$/i.test(text);
      const k = statKey(text.replace(/\s\(Local\)$/i, ""));
      const e = this.map.get(k) ?? {};
      if (local) e.local ??= id;
      else e.global ??= id;
      this.map.set(k, e);
    }
  }
  /** Stat id for an English mod line; "reduced" lines use the "increased" stat with a negative value. */
  find(line: string, local: boolean): { id: string; negate: boolean } | null {
    const pick = (k: string) => {
      const e = this.map.get(k);
      return e ? ((local ? (e.local ?? e.global) : (e.global ?? e.local)) ?? null) : null;
    };
    const id = pick(statKey(line));
    if (id) return { id, negate: false };
    const flipped = pick(statKey(line.replace(/\breduced\b/, "increased").replace(/\bless\b/, "more")));
    return flipped ? { id: flipped, negate: true } : null;
  }
}

/** Pseudo totals the trade site computes ("+#% total Elemental Resistance"), from English mod lines. */
const PSEUDO_RULES: [RegExp, (n: number[], m: RegExpMatchArray) => [string, number][]][] = [
  [/^\+?[\d.]+% to (Fire|Cold|Lightning) Resistance$/i, (n) => [["elemental_resistance", n[0]]]],
  [/^\+?[\d.]+% to (Fire|Cold|Lightning) and (Fire|Cold|Lightning) Resistances$/i, (n) => [["elemental_resistance", 2 * n[0]]]],
  [/^\+?[\d.]+% to all Elemental Resistances$/i, (n) => [["elemental_resistance", 3 * n[0]]]],
  [/^\+?[\d.]+% to Chaos Resistance$/i, (n) => [["chaos_resistance", n[0]]]],
  [/^\+?[\d.]+ to maximum Life$/i, (n) => [["life", n[0]]]],
  [/^\+?[\d.]+ to maximum Mana$/i, (n) => [["mana", n[0]]]],
  [/^\+?[\d.]+ to (Strength|Dexterity|Intelligence)$/i, (n, m) => [[m[1].toLowerCase(), n[0]]]],
  [
    /^\+?[\d.]+ to (Strength|Dexterity|Intelligence) and (Strength|Dexterity|Intelligence)$/i,
    (n, m) => [[m[1].toLowerCase(), n[0]], [m[2].toLowerCase(), n[0]]],
  ],
  [/^\+?[\d.]+ to all Attributes$/i, (n) => ["strength", "dexterity", "intelligence"].map((a) => [a, n[0]] as [string, number])],
];
/** Pseudo stat id of each total (lower case, as the trade site writes them). */
const PSEUDO_ID: Record<string, string> = {
  elemental_resistance: "pseudo.pseudo_total_elemental_resistance",
  chaos_resistance: "pseudo.pseudo_total_chaos_resistance",
  life: "pseudo.pseudo_total_life",
  mana: "pseudo.pseudo_total_mana",
  strength: "pseudo.pseudo_total_strength",
  dexterity: "pseudo.pseudo_total_dexterity",
  intelligence: "pseudo.pseudo_total_intelligence",
};
export const PSEUDOS = Object.keys(PSEUDO_ID);

/** Tier of each modifier of `base` (1 = highest level), with the number of tiers of its group. */
function tierTable(c: Crafter, base: string) {
  const byGroup = new Map<string, number[]>();
  for (const i of new Set([...c.pool(base), ...c.desecratedPool(base)])) byGroup.set(c.mod(i).group, [...(byGroup.get(c.mod(i).group) ?? []), i]);
  const rank = new Map<number, [number, number]>();
  for (const list of byGroup.values()) [...list].sort((a, b) => c.mod(b).level - c.mod(a).level).forEach((i, k) => rank.set(i, [k + 1, list.length]));
  return rank;
}

export function readItem(c: Crafter, raw: string, stats: StatIndex): PricedItem | { error: "empty" | "base" } {
  const lines = raw.replace(/\r/g, "").split("\n").map((l) => l.replace(/[  ]/g, " ").trim());
  if (!lines.some(Boolean)) return { error: "empty" };
  const sections: string[][] = [[]];
  for (const l of lines) {
    if (/^-{4,}$/.test(l)) sections.push([]);
    else if (l) sections.at(-1)!.push(l);
  }
  const head = sections[0];
  const french = head.some((l) => /^(Classe d['’]objet|Rareté)\s*:/i.test(l));
  const rarityText = head.find((l) => /^(Rarity|Rareté)\s*:/i.test(l))?.split(":")[1]?.trim().toLowerCase() ?? "normal";
  const rarity: PricedItem["rarity"] =
    rarityText === "unique" ? "unique" : rarityText === "rare" ? "rare" : /^(magic|magique)$/.test(rarityText) ? "magic" : "normal";
  const titles = head.filter((l) => !HEADER.test(l));
  const names: [string, string][] = french ? Object.entries(c.data.fr?.bases ?? {}) : Object.keys(c.data.bases).map((b) => [b, b]);
  const found =
    names.find(([n]) => titles.includes(n)) ??
    names.filter(([n]) => titles.some((t) => t.includes(n))).sort((a, b) => b[0].length - a[0].length)[0];
  const base = found?.[1] ?? null;
  if (!base && rarity !== "unique") return { error: "base" };
  const cls = base ? c.data.bases[base]?.[0] : undefined;
  const category = (cls && CLASS_CATEGORY[cls]) ?? null;
  // Damage, speed and critical modifiers of martial weapons, and defences of armour pieces, are local.
  const local = !!category && ((category.startsWith("weapon.") && !CASTER_WEAPONS.has(category)) || category.startsWith("armour."));
  const name = (rarity === "rare" || rarity === "unique") && titles.length > 1 ? titles[0] : null;

  const out: PriceLine[] = [];
  let ilvl: number | null = null;
  let corrupted = false;
  let afterLevel = false;
  for (const section of sections.slice(1)) {
    if (section.some((l) => /^(Corrupted|Corrompu)$/i.test(l))) corrupted = true;
    const level = section.find((l) => ITEM_LEVEL.test(l));
    if (level) {
      ilvl = Number(level.split(":")[1]) || null;
      afterLevel = true;
      continue;
    }
    if (!afterLevel) {
      for (const l of section)
        for (const [re, id] of PROPS)
          if (re.test(l)) {
            const v = numbers(l.split(":")[1] ?? "")[0];
            if (v) out.push({ key: `prop-${id}`, source: "property", text: id, id, value: v, tier: null, tiers: null, on: false });
          }
      continue;
    }
    let headerSource: LineSource | "skip" | null = null;
    for (const l of section) {
      const h = l.match(/^\{\s*(.*?)\s*\}$/);
      if (h) {
        headerSource = /implicit|implicite/i.test(h[1])
          ? "implicit"
          : /rune/i.test(h[1])
            ? "rune"
            : /enchant/i.test(h[1])
              ? "enchant"
              : /unique|corrupt|corromp|sanctif/i.test(h[1]) && !/modifier|modificateur/i.test(h[1])
                ? "skip"
                : /desecrated|profan/i.test(h[1])
                  ? "desecrated"
                  : /fractur/i.test(h[1])
                    ? "fractured"
                    : null;
        continue;
      }
      if (headerSource === "skip" || SKIP.test(l) || /:/.test(l) || /^".*"$/.test(l)) continue;
      const flag = l.match(FLAG)?.[1];
      const source: LineSource = (flag && FLAG_SOURCE.find(([re]) => re.test(flag))?.[1]) || headerSource || "explicit";
      const text = cleanLine(l.replace(FLAG, ""));
      const en = french ? translateLine(c, text) : text;
      const hit = en ? stats.find(en, local) : null;
      const nums = numbers(en ?? text);
      const avg = /^Adds .+ to .+ Damage/i.test(en ?? "") && nums.length >= 2 ? (nums[0] + nums[1]) / 2 : nums[0];
      const value = avg === undefined ? null : hit?.negate ? -avg : avg;
      // Same stat family as the explicit one: the trade site uses the prefix for implicits, runes and enchants.
      const id = hit ? (source === "explicit" || source === "desecrated" ? hit.id : hit.id.replace(/^explicit\./, `${source}.`)) : null;
      out.push({
        key: `${out.length}`,
        source,
        text,
        id,
        value,
        tier: null,
        tiers: null,
        // Uniques: their fixed lines are matched by name; rares: every explicit stat at first.
        on: !!id && rarity !== "unique" && (source === "explicit" || source === "desecrated" || source === "fractured"),
        ...(en ? { en } : {}),
      });
    }
  }

  // Uniques: drop lines the trade site cannot search (lore, unknown stats).
  const kept = rarity === "unique" ? out.filter((l) => l.id) : out;

  // Tiers, from the simulator's reading of the same text.
  if (base && rarity !== "unique") {
    const parsed = parseItemText(c, raw, base);
    const table = tierTable(c, base);
    const tierByKey = new Map<string, [number, number]>();
    for (const m of parsed.item?.mods ?? []) {
      const t = table.get(m.i);
      if (t) for (const line of c.mod(m.i).text.split("\n")) tierByKey.set(statKey(line), t);
    }
    for (const l of kept) {
      const en = l.en;
      const t = en && (l.source === "explicit" || l.source === "desecrated" || l.source === "fractured") ? tierByKey.get(statKey(en)) : undefined;
      if (t) [l.tier, l.tiers] = t;
    }
  }

  // Pseudo totals replace the explicit lines they sum (resistances, life, mana, attributes).
  if (rarity !== "unique") {
    const totals = new Map<string, number>();
    for (const l of kept) {
      const en = l.en;
      if (!en || l.source === "rune" || l.source === "enchant") continue;
      for (const [re, fn] of PSEUDO_RULES) {
        const m = en.match(re);
        if (!m) continue;
        for (const [k, v] of fn(numbers(en), m)) totals.set(k, (totals.get(k) ?? 0) + v);
        l.inPseudo = true;
        l.on = false;
        break;
      }
    }
    const pseudo = PSEUDOS.filter((k) => totals.has(k)).map(
      (k): PriceLine => ({ key: `pseudo-${k}`, source: "pseudo", text: k, id: PSEUDO_ID[k], value: totals.get(k)!, tier: null, tiers: null, on: true }),
    );
    kept.unshift(...pseudo);
  }

  // Weapons: physical and elemental DPS (from the properties).
  if (category?.startsWith("weapon.")) {
    const w = parseWeapon(raw);
    if (w) {
      const avg = (r?: [number, number]) => (r ? (r[0] + r[1]) / 2 : 0);
      const pdps = avg(w.damage.physical) * w.aps;
      const edps = (avg(w.damage.fire) + avg(w.damage.cold) + avg(w.damage.lightning)) * w.aps;
      const martial = !CASTER_WEAPONS.has(category);
      if (pdps >= 1) kept.unshift({ key: "prop-pdps", source: "property", text: "pdps", id: "pdps", value: Math.round(pdps), tier: null, tiers: null, on: martial });
      if (edps >= 1) kept.unshift({ key: "prop-edps", source: "property", text: "edps", id: "edps", value: Math.round(edps), tier: null, tiers: null, on: martial });
    }
  }
  kept.sort((a, b) => Number(b.source === "property") - Number(a.source === "property"));

  let open: PricedItem["open"] = null;
  if ((rarity === "rare" || rarity === "magic") && base) {
    const parsed = parseItemText(c, raw, base).item;
    if (parsed) {
      const used = (a: "P" | "S") => parsed.mods.filter((m) => c.mod(m.i).affix === a).length;
      open = { P: Math.max(0, LIMITS[rarity].P - used("P")), S: Math.max(0, LIMITS[rarity].S - used("S")) };
    }
  }

  return { rarity, name, base, category, ilvl, corrupted, lines: kept, french, open };
}

/** The simulator's item as the game would copy it (English), to price check it the same way. */
export function itemText(c: Crafter, item: Item): string {
  const cls = c.data.bases[item.base]?.[0] ?? "";
  const rarity = { normal: "Normal", magic: "Magic", rare: "Rare" }[item.rarity];
  const mods = [...item.mods]
    .sort((a, b) => c.mod(a.i).affix.localeCompare(c.mod(b.i).affix))
    .map((m) => rolledText(c.mod(m.i).text, m.r ?? 0.5) + (m.desecrated ? " (desecrated)" : ""));
  return [`Item Class: ${cls}`, `Rarity: ${rarity}`, item.base, "--------", `Item Level: ${item.ilvl}`, ...(mods.length ? ["--------", ...mods] : [])].join("\n");
}

export interface SearchOptions {
  /** Share of each value asked for (0.85: at least 85 % of the item's roll). */
  tolerance: number;
  /** Per-line minimum typed by the player, overriding the tolerance. */
  mins: Record<string, number | null>;
  /** Lines to search (by key). */
  on: Set<string>;
  /** Ask for at least the item's level (bases bought to craft). */
  ilvl: boolean;
}

/** Minimum asked for a line: its value times the tolerance (rounded down), or the player's own figure. */
export function lineMin(l: PriceLine, o: Pick<SearchOptions, "tolerance" | "mins">): number | null {
  if (l.key in o.mins) return o.mins[l.key];
  if (l.value === null || l.value <= 0) return null;
  const v = l.value * o.tolerance;
  // Small whole numbers (+3 to skill levels): rounding keeps the step the item has.
  if (Number.isInteger(l.value)) return v >= 10 ? Math.floor(v) : Math.max(1, Math.round(v));
  return Math.floor(v * 10) / 10;
}

/** pathofexile.com/trade2 search URL for items like this one. */
export function tradeUrl(league: string, it: PricedItem, o: SearchOptions): string {
  const status = { option: "available" };
  const lines = it.lines.filter((l) => l.id && o.on.has(l.key));
  const equipment: Record<string, { min: number }> = {};
  const filters: { id: string; value?: { min: number } }[] = [];
  for (const l of lines) {
    const min = lineMin(l, o);
    if (l.source === "property") {
      if (min !== null) equipment[l.id!] = { min };
    } else filters.push({ id: l.id!, ...(min !== null ? { value: { min } } : {}) });
  }
  const unique = it.rarity === "unique";
  const query: Record<string, unknown> = {
    status,
    ...(unique && it.name && !it.french ? { name: it.name } : {}),
    ...(unique && it.base ? { type: it.base } : {}),
    stats: filters.length ? [{ type: "and", filters }] : [],
    filters: {
      type_filters: {
        filters: {
          ...(it.category && !unique ? { category: { option: it.category } } : {}),
          rarity: { option: unique ? "unique" : "nonunique" },
        },
      },
      ...(Object.keys(equipment).length ? { equipment_filters: { filters: equipment } } : {}),
      misc_filters: {
        filters: {
          ...(o.ilvl && it.ilvl ? { ilvl: { min: it.ilvl } } : {}),
          corrupted: { option: it.corrupted ? "true" : "false" },
        },
      },
    },
  };
  return `https://www.pathofexile.com/trade2/search/poe2/${encodeURIComponent(league)}?q=${encodeURIComponent(JSON.stringify({ query, sort: { price: "asc" } }))}`;
}
