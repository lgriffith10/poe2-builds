// Shapes of the compiled game data (see scripts/sync-data.mjs).

export type NodeType = "normal" | "notable" | "keystone" | "jewel" | "attribute" | "start" | "ascStart";

export interface TreeNode {
  x: number;
  y: number;
  /** name */
  n: string;
  /** type */
  t: NodeType;
  /** stat lines */
  s?: string[];
  /** ascendancy */
  a?: string;
  /** other ascendancies sharing this node */
  a2?: string[];
  /** classes starting here */
  c?: string[];
  /** flavour text */
  f?: string;
  /** attribute options */
  o?: string[];
  free?: 1;
  /** cell index in the icon atlas */
  i?: number;
}

/** [from, to] or [from, to, arcRadius, sweep] */
export type TreeEdge = [number, number] | [number, number, number, number];

export interface AscendancyInfo {
  id: string;
  name: string;
  centre: { x: number; y: number };
  flavour: string | null;
}

export interface ClassInfo {
  name: string;
  base: { str: number; dex: number; int: number };
  start: number;
  ascendancies: AscendancyInfo[];
}

export interface TreeData {
  version: string;
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
  classes: ClassInfo[];
  nodes: Record<string, TreeNode>;
  edges: TreeEdge[];
  icons?: { url: string; cols: number; cell: number };
  art?: {
    base: string;
    frames: { url: string; cell: number; keys: string[] };
    ring: string;
    /** Illustration file per class or ascendancy name. */
    classes: Record<string, string>;
  };
}

export interface Gem {
  id: string;
  name: string;
  type: "active" | "support" | "spirit";
  color: "r" | "g" | "b" | "w";
  tags: string[];
  text: string | null;
  tier: number;
  lineage: boolean;
  attr: "str" | "dex" | "int" | "mixed";
  icon: string | null;
  recommended: string[];
}

/** Gem stats at level 20 (see buildGemDetails in scripts/sync-data.mjs). Props are [label, value] pairs. */
export interface GemDetails {
  desc?: string;
  props?: [string, string][];
  sets?: { label?: string; props?: [string, string][]; lines: string[] }[];
}

/** Data shown when hovering a [[Name]] reference in guide text. */
export type RefTip =
  | ({ kind: "gem" } & Pick<Gem, "name" | "icon" | "color" | "type" | "tier" | "tags" | "text"> & GemDetails)
  | ({ kind: "unique" } & Pick<UniqueItem, "name" | "icon" | "base" | "category" | "level" | "implicits" | "mods">)
  | ({ kind: "currency" } & Pick<CurrencyItem, "name" | "icon" | "description" | "directions" | "essence" | "socket">)
  | { kind: "term"; name: string; text: string };

/** Crafting consumable of the currency wiki (scripts/currency-data.mjs). */
export interface CurrencyItem {
  slug: string;
  name: string;
  category: CurrencyCategory;
  icon: string | null;
  /** In-game description and directions (English game text). */
  description: string | null;
  directions: string | null;
  stack: number | null;
  /** Minimum area level where it drops. */
  level: number | null;
  /** Essences: guaranteed modifier per item class (from Path of Building). */
  essence?: { text: string; classes: string[] }[];
  /** Runes, soul cores, idols, abyssal eyes: what they grant per slot. */
  socket?: { slots: string[]; lines: string[]; level: number | null }[];
}
export type CurrencyCategory = "orbs" | "essences" | "omens" | "abyss" | "catalysts" | "emotions" | "runes" | "soulcores" | "idols";

export interface UniqueItem {
  id: string;
  name: string;
  base: string;
  category: string;
  class: string;
  source: string | null;
  league: string | null;
  level: number | null;
  implicits: string[];
  mods: string[];
  icon: string | null;
}

export interface BaseItem {
  id: string;
  name: string;
  class: string;
  level: number;
  req: { str: number; dex: number; int: number };
  props: Partial<Record<"armour" | "evasion" | "energy_shield" | "aps" | "crit" | "block", number>> & {
    damage?: string;
  };
  icon: string | null;
}

// ---------------------------------------------------------------------------
// Builds

export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export type Tier = "S" | "A" | "B" | "C" | "D";
export const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

export type TierCategory = "starter" | "endgame" | "bossing";
export const TIER_CATEGORIES: TierCategory[] = ["starter", "endgame", "bossing"];
export const DEFAULT_CATEGORY: TierCategory = "starter";
export const CATEGORY_LABEL: Record<TierCategory, string> = {
  starter: "League Start",
  endgame: "Endgame",
  bossing: "Bossing",
};

export const GEAR_SLOTS = [
  "weapon",
  "offhand",
  "helmet",
  "body",
  "gloves",
  "boots",
  "amulet",
  "ring1",
  "ring2",
  "belt",
  // Weapon set II (swap weapons); "weapon"/"offhand" are weapon set I.
  "weapon2",
  "offhand2",
] as const;
export type GearSlot = (typeof GEAR_SLOTS)[number];
export type GearSet = Partial<Record<GearSlot, GearPiece>>;

/** Gear progression steps a guide can describe, in play order. */
export const GEAR_STAGES = ["campaign", "mapping", "endgame", "minmax"] as const;
export type GearStage = (typeof GEAR_STAGES)[number];

/** How a build moved since the previous version of its source tier list. */
export const TIER_CHANGES = ["new", "up", "down"] as const;
export type TierChange = (typeof TIER_CHANGES)[number];

export const SLOT_LABELS: Record<GearSlot, string> = {
  weapon: "Weapon",
  offhand: "Off-hand",
  helmet: "Helmet",
  body: "Body Armour",
  gloves: "Gloves",
  boots: "Boots",
  amulet: "Amulet",
  ring1: "Ring",
  ring2: "Ring",
  belt: "Belt",
  weapon2: "Weapon (Set II)",
  offhand2: "Off-hand (Set II)",
};

export interface GearPiece {
  /** Unique item name, if the slot uses a unique. */
  unique?: string;
  /** Base type for rare items. */
  base?: string;
  /** Priority modifiers for rare items (or, for ladder guides, the reference character's modifiers). */
  mods?: string[];
  /** Implicit modifiers of the reference rare (ladder guides). */
  implicits?: string[];
  /** Socketed runes and soul cores (ladder guides). */
  runes?: string[];
  /** What the ladder characters of this build wear in this slot, most worn first (% of characters). */
  ladder?: { name: string; pct: number }[];
  note?: string;
}

export interface SkillGroup {
  gem: string;
  supports: string[];
  note?: string;
  /** Weapon set the skill is socketed on, when the build uses both sets for different skills. */
  weaponSet?: WeaponSet;
  /** Gem level to keep the skill at (not higher), usually to limit its mana cost. */
  level?: number;
}

/** One stage of the campaign (e.g. "Act 2") and the skills used during it. */
export interface LevelingStep {
  name: string;
  skills: SkillGroup[];
}

/** A leveling route; guides with several starts (e.g. crossbow or spear) have one path each. */
export interface LevelingPath {
  name?: string;
  steps: LevelingStep[];
  /** Campaign rotations of this path (often one per act), from the source planner. */
  rotations?: SkillRotation[];
}

/** Order in which skills are used for a situation (e.g. "Single Target"). */
export interface SkillRotation {
  name: string;
  /** `label`: the source's note for that step ("Pre-buff before boss fight"). */
  steps: { gem: string; count?: number; label?: string }[];
}

export type WeaponSet = 1 | 2;

export interface PlannerState {
  classIndex: number;
  /** -1 when no ascendancy is chosen. */
  ascIndex: number;
  /** Every allocated node, weapon-set nodes included (like Path of Building's `nodes`). */
  nodes: number[];
  /**
   * Nodes allocated with weapon-set points, by set (1 or 2). They only apply while that weapon set is
   * equipped; the other nodes of `nodes` are shared by both sets.
   */
  weaponSets?: Record<number, WeaponSet>;
  /** Attribute choice per attribute node: 0 str, 1 dex, 2 int. */
  attributes: Record<number, number>;
  skills: SkillGroup[];
  gear: Partial<Record<GearSlot, string>>;
}

export interface PassiveStep {
  name: string;
  id: number;
  /** Nodes allocated by this step, in path order (the notable last). */
  nodes: number[];
  /** Passive points those nodes cost. */
  points: number;
  /** Weapon set the step's points belong to. */
  set?: 1 | 2;
}

export const TREE_STAGES = ["leveling", "mapping", "endgame", "minmax"] as const;
export type TreeStage = (typeof TREE_STAGES)[number];

/**
 * One passive tree of the source guide's planner (campaign, respec, mapping, endgame, min-max...), node for node, from
 * content/builds/trees/<slug>.json (written by `npm run trees:maxroll`).
 */
export interface TreeVariant {
  /** The source planner's label. */
  name: string;
  stage: TreeStage;
  /** Level the source suggests switching to this tree at. */
  level: number | null;
  /** The tree's part of the planner state; skills and gear are the guide's (merged by the viewer). */
  planner: Pick<PlannerState, "nodes" | "attributes" | "weaponSets">;
  /** Allocation order: each notable/keystone and the nodes taken since the previous one. */
  steps: PassiveStep[];
  points: number;
  setPoints: Record<1 | 2, number>;
  /** Attribute nodes per chosen attribute; `free` = left to the player by the source. */
  attributes: { str: number; dex: number; int: number; free: number };
  /** Notables and keystones with no path from the class start in our tree data (anointed, granted by a jewel...). */
  detached: string[];
  /** Difference with the previous tree of the list: what to refund and what to take when moving on. */
  changes: { from: string; added: number; removed: number; addedKeys: string[]; removedKeys: string[] } | null;
}
