import "server-only";
// Item filter (.filter, PoE2 syntax) for a build guide: its gear bases, weapon classes and uniques stand out.
// Two forms: a block to paste at the top of an existing filter (NeverSink's, for instance: the first matching rule
// wins, so these rules take precedence), and a standalone filter with simple generic rules after them.

import type { Build } from "./builds";
import { getBase, getUnique } from "./data";
import type { GearSet } from "./types";

/** Base item class -> the in-game item class used by filters. */
const FILTER_CLASS: Record<string, string> = {
  Amulet: "Amulets",
  Belt: "Belts",
  "Body Armour": "Body Armours",
  Boots: "Boots",
  Bow: "Bows",
  Buckler: "Bucklers",
  Claw: "Claws",
  Crossbow: "Crossbows",
  Dagger: "Daggers",
  Flail: "Flails",
  Focus: "Foci",
  Gloves: "Gloves",
  Helmet: "Helmets",
  "One Hand Axe": "One Hand Axes",
  "One Hand Mace": "One Hand Maces",
  "One Hand Sword": "One Hand Swords",
  Quiver: "Quivers",
  Ring: "Rings",
  Sceptre: "Sceptres",
  Shield: "Shields",
  Spear: "Spears",
  Staff: "Staves",
  Talisman: "Talismans",
  "Two Hand Axe": "Two Hand Axes",
  "Two Hand Mace": "Two Hand Maces",
  "Two Hand Sword": "Two Hand Swords",
  Wand: "Wands",
  Warstaff: "Quarterstaves",
};
const WEAPON_SLOTS = new Set(["weapon", "offhand", "weapon2", "offhand2"]);
const GEAR_CLASSES = Object.values(FILTER_CLASS);
const quote = (xs: Iterable<string>) => [...new Set(xs)].sort().map((x) => `"${x}"`).join(" ");

/** Gear bases, weapon classes and unique bases of a guide (all gear stages). */
export function filterTargets(build: Build) {
  const sets: GearSet[] = [build.gear, ...Object.values(build.gearStages)].filter(Boolean) as GearSet[];
  const bases = new Set<string>(), weaponClasses = new Set<string>(), uniqueBases = new Set<string>(), uniques = new Set<string>();
  for (const set of sets)
    for (const [slot, piece] of Object.entries(set)) {
      if (!piece) continue;
      const unique = piece.unique ? getUnique(piece.unique) : undefined;
      if (unique) {
        uniques.add(unique.name);
        uniqueBases.add(unique.base);
      }
      const base = piece.base ? getBase(piece.base) : undefined;
      if (base) {
        bases.add(base.name);
        if (WEAPON_SLOTS.has(slot) && FILTER_CLASS[base.class]) weaponClasses.add(FILTER_CLASS[base.class]);
      }
      const uBase = unique ? getBase(unique.base) : undefined;
      if (uBase && WEAPON_SLOTS.has(slot) && FILTER_CLASS[uBase.class]) weaponClasses.add(FILTER_CLASS[uBase.class]);
    }
  return { bases: [...bases], weaponClasses: [...weaponClasses], uniqueBases: [...uniqueBases], uniques: [...uniques] };
}

type Rgba = [number, number, number, number];
/** How one kind of build rule looks in game; shared by the .filter and the preview on the page. */
export interface FilterStyle {
  size: number;
  text: Rgba;
  border: Rgba;
  background: Rgba;
  /** Light beam colour (PlayEffect); `temp` beams only flash when the item drops. */
  beam: string;
  temp?: boolean;
  icon: { size: 0 | 1 | 2; color: string; shape: string };
  sound?: [number, number];
}
export type FilterRuleKind = "unique" | "rare" | "craft" | "weapon";

/** Loud on purpose: solid backgrounds, beams and minimap icons so the build's drops can't be missed. */
export const FILTER_STYLES: Record<FilterRuleKind, FilterStyle> = {
  unique: {
    size: 45,
    text: [255, 255, 255, 255],
    border: [255, 255, 255, 255],
    background: [200, 90, 20, 255],
    beam: "Orange",
    icon: { size: 0, color: "Orange", shape: "Star" },
    sound: [1, 300],
  },
  rare: {
    size: 45,
    text: [255, 255, 255, 255],
    border: [255, 255, 255, 255],
    background: [0, 110, 190, 255],
    beam: "Cyan",
    icon: { size: 0, color: "Cyan", shape: "Diamond" },
    sound: [2, 300],
  },
  craft: {
    size: 42,
    text: [190, 240, 255, 255],
    border: [80, 200, 255, 255],
    background: [10, 45, 70, 240],
    beam: "Cyan",
    temp: true,
    icon: { size: 1, color: "Cyan", shape: "Circle" },
  },
  weapon: {
    size: 42,
    text: [255, 255, 119, 255],
    border: [255, 220, 60, 255],
    background: [60, 45, 0, 240],
    beam: "Yellow",
    temp: true,
    icon: { size: 1, color: "Yellow", shape: "Triangle" },
    sound: [3, 200],
  },
};

const rgba = (c: Rgba) => c.join(" ");
function styleLines(s: FilterStyle): string[] {
  return [
    `\tSetFontSize ${s.size}`,
    `\tSetTextColor ${rgba(s.text)}`,
    `\tSetBorderColor ${rgba(s.border)}`,
    `\tSetBackgroundColor ${rgba(s.background)}`,
    ...(s.sound ? [`\tPlayAlertSound ${s.sound[0]} ${s.sound[1]}`] : []),
    `\tPlayEffect ${s.beam}${s.temp ? " Temp" : ""}`,
    `\tMinimapIcon ${s.icon.size} ${s.icon.color} ${s.icon.shape}`,
  ];
}

/** One preview row per rule the build actually has, with a real item name as the sample. */
export function filterPreview(build: Build): { kind: FilterRuleKind; sample: string; style: FilterStyle }[] {
  const t = filterTargets(build);
  const rows: { kind: FilterRuleKind; sample: string | undefined }[] = [
    { kind: "unique", sample: t.uniques[0] },
    { kind: "rare", sample: t.bases[0] },
    { kind: "craft", sample: t.bases[0] },
    { kind: "weapon", sample: t.weaponClasses[0] },
  ];
  return rows.filter((r) => r.sample).map((r) => ({ kind: r.kind, sample: r.sample!, style: FILTER_STYLES[r.kind] }));
}

function buildRules(build: Build, url: string): string {
  const t = filterTargets(build);
  const out: string[] = [`# ===== Exile Codex: ${build.title} =====`, `# ${url}`, ""];
  if (t.uniqueBases.length)
    out.push(
      `# Uniques of the build: ${t.uniques.join(", ")}`,
      "Show",
      "\tRarity Unique",
      `\tBaseType == ${quote(t.uniqueBases)}`,
      ...styleLines(FILTER_STYLES.unique),
      "",
    );
  if (t.bases.length)
    out.push(
      "# Rare items on the build's bases",
      "Show",
      "\tRarity Rare",
      `\tBaseType == ${quote(t.bases)}`,
      ...styleLines(FILTER_STYLES.rare),
      "",
      "# Crafting bases (normal and magic, high item level)",
      "Show",
      "\tRarity Normal Magic",
      "\tItemLevel >= 75",
      `\tBaseType == ${quote(t.bases)}`,
      ...styleLines(FILTER_STYLES.craft),
      "",
    );
  if (t.weaponClasses.length)
    out.push(
      "# Rare weapons of the build's weapon type",
      "Show",
      "\tRarity Rare",
      `\tClass == ${quote(t.weaponClasses)}`,
      ...styleLines(FILTER_STYLES.weapon),
      "",
    );
  return out.join("\n");
}

/** Plain generic rules for a standalone filter; `strict` hides normal and magic gear in maps. */
function genericRules(strict: boolean): string {
  const block = (lines: string[]) => lines.join("\n") + "\n";
  return [
    "# ===== Generic rules =====",
    block([
      "Show",
      '\tClass == "Stackable Currency"',
      '\tBaseType == "Divine Orb" "Mirror of Kalandra" "Perfect Exalted Orb" "Perfect Chaos Orb" "Fracturing Orb" "Hinekora\'s Lock" "Orb of Annulment"',
      "\tSetFontSize 45",
      "\tSetTextColor 255 0 0 255",
      "\tSetBorderColor 255 0 0 255",
      "\tSetBackgroundColor 255 255 255 255",
      "\tPlayAlertSound 6 300",
      "\tPlayEffect Red",
      "\tMinimapIcon 0 Red Star",
    ]),
    block(["Show", '\tClass == "Stackable Currency" "Omen" "Map Fragments" "Pinnacle Keys" "Vault Keys" "Incubators"', "\tSetFontSize 40", "\tSetTextColor 170 158 130 255", "\tMinimapIcon 2 White Circle"]),
    block(["Show", '\tClass == "Waystones" "Tablet" "Expedition Logbook"', "\tSetFontSize 40", "\tSetBorderColor 255 255 255 200", "\tMinimapIcon 1 White Square"]),
    block(["Show", "\tRarity Unique", "\tSetFontSize 40", "\tSetTextColor 175 96 37 255", "\tSetBorderColor 175 96 37 255", "\tPlayEffect Brown", "\tMinimapIcon 1 Brown Star"]),
    block(["Show", '\tClass == "Skill Gems" "Support Gems" "Jewels" "Charms" "Augment"', "\tSetFontSize 38", "\tSetBorderColor 30 200 200 200"]),
    block(["Show", '\tClass == "Life Flasks" "Mana Flasks"', "\tSetFontSize 34"]),
    block(["Show", "\tRarity Rare", "\tSetFontSize 36", "\tSetTextColor 255 255 119 255"]),
    ...(strict
      ? [block(["Hide", "\tAreaLevel >= 65", "\tRarity Normal Magic", `\tClass == ${quote(GEAR_CLASSES)}`, "\tSetFontSize 18", "\tDisableDropSound True"])]
      : []),
    block(["Show", "\tSetFontSize 32"]),
  ].join("\n");
}

export interface LootFilter {
  fileName: string;
  /** Rules to paste at the top of an existing filter. */
  snippet: string;
  /** Standalone filters. */
  soft: string;
  strict: string;
  preview: ReturnType<typeof filterPreview>;
}

export function lootFilter(build: Build, url: string): LootFilter {
  const rules = buildRules(build, url);
  const head = `# Exile Codex loot filter for ${build.title}\n# Generated from the guide: ${url}\n\n`;
  return {
    fileName: `ExileCodex-${build.slug}`,
    snippet: rules,
    soft: head + rules + "\n" + genericRules(false),
    strict: head + rules + "\n" + genericRules(true),
    preview: filterPreview(build),
  };
}
