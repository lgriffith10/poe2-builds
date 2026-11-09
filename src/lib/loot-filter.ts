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

function buildRules(build: Build, url: string): string {
  const t = filterTargets(build);
  const out: string[] = [`# ===== Exile Codex: ${build.title} =====`, `# ${url}`, ""];
  if (t.uniqueBases.length)
    out.push(
      `# Uniques of the build: ${t.uniques.join(", ")}`,
      "Show",
      "\tRarity Unique",
      `\tBaseType == ${quote(t.uniqueBases)}`,
      "\tSetFontSize 45",
      "\tSetTextColor 175 96 37 255",
      "\tSetBorderColor 255 210 120 255",
      "\tSetBackgroundColor 53 13 13 255",
      "\tPlayAlertSound 1 300",
      "\tPlayEffect Orange",
      "\tMinimapIcon 0 Orange Star",
      "",
    );
  if (t.bases.length)
    out.push(
      "# Rare items on the build's bases",
      "Show",
      "\tRarity Rare",
      `\tBaseType == ${quote(t.bases)}`,
      "\tSetFontSize 42",
      "\tSetTextColor 255 255 119 255",
      "\tSetBorderColor 80 200 255 255",
      "\tSetBackgroundColor 20 40 60 230",
      "\tPlayAlertSound 2 250",
      "\tPlayEffect Cyan",
      "\tMinimapIcon 1 Cyan Diamond",
      "",
      "# Crafting bases (normal and magic, high item level)",
      "Show",
      "\tRarity Normal Magic",
      "\tItemLevel >= 75",
      `\tBaseType == ${quote(t.bases)}`,
      "\tSetFontSize 38",
      "\tSetBorderColor 80 200 255 160",
      "\tMinimapIcon 2 Cyan Diamond",
      "",
    );
  if (t.weaponClasses.length)
    out.push(
      "# Rare weapons of the build's weapon type",
      "Show",
      "\tRarity Rare",
      `\tClass == ${quote(t.weaponClasses)}`,
      "\tSetFontSize 38",
      "\tSetTextColor 255 255 119 255",
      "\tSetBorderColor 80 200 255 180",
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
}

export function lootFilter(build: Build, url: string): LootFilter {
  const rules = buildRules(build, url);
  const head = `# Exile Codex loot filter for ${build.title}\n# Generated from the guide: ${url}\n\n`;
  return {
    fileName: `ExileCodex-${build.slug}`,
    snippet: rules,
    soft: head + rules + "\n" + genericRules(false),
    strict: head + rules + "\n" + genericRules(true),
  };
}
