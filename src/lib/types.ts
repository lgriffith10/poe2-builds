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
  | ({ kind: "unique" } & Pick<UniqueItem, "name" | "icon" | "base" | "category" | "level" | "implicits" | "mods">);

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
};

export interface GearPiece {
  /** Unique item name, if the slot uses a unique. */
  unique?: string;
  /** Base type for rare items. */
  base?: string;
  /** Priority modifiers for rare items. */
  mods?: string[];
  note?: string;
}

export interface SkillGroup {
  gem: string;
  supports: string[];
  note?: string;
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

export interface PlannerState {
  classIndex: number;
  /** -1 when no ascendancy is chosen. */
  ascIndex: number;
  nodes: number[];
  /** Attribute choice per attribute node: 0 str, 1 dex, 2 int. */
  attributes: Record<number, number>;
  skills: SkillGroup[];
  gear: Partial<Record<GearSlot, string>>;
}
