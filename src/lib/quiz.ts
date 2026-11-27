// Build finder: a few questions about how the player wants to play, scored against each build's data
// (playstyle, difficulty, longest rotation, budget, uniques, tier in the chosen goal, farming profile).
import type { Rating } from "./ratings";
import type { Gem, TierCategory } from "./types";

export type Family = "melee" | "ranged" | "caster" | "minions";

export interface QuizBuild {
  slug: string;
  title: string;
  className: string;
  ascendancy: string;
  playstyle: string;
  family: Family;
  difficulty: "easy" | "medium" | "hard";
  budget: "low" | "medium" | "high";
  ratings: Partial<Record<TierCategory, Rating>>;
  /** Distinct skills in the build's longest rotation; null when the guide gives none. */
  rotation: number | null;
  /** Distinct uniques across every gear stage. */
  uniques: number;
  /** Farming profile (1 to 3), null when not filled in. */
  profile: { clear: number; single: number; tank: number; speed: number } | null;
  beginner: boolean;
  gem: Pick<Gem, "name" | "icon" | "color"> | null;
}

export interface QuizAnswers {
  family: Family | "any";
  buttons: "few" | "some" | "many";
  budget: "low" | "medium" | "high";
  goal: TierCategory;
  priority: "balanced" | "tank" | "speed";
}

export const DEFAULT_ANSWERS: QuizAnswers = { family: "any", buttons: "few", budget: "low", goal: "starter", priority: "balanced" };

/** "Melee combo", "Ranged attack", "Spell totems"… → one of the four families asked about. */
export function familyOf(playstyle: string): Family {
  // Totems are placed spells: they play like a caster, not like a minion army.
  if (/minion|companion/i.test(playstyle)) return "minions";
  if (/melee/i.test(playstyle)) return "melee";
  if (/ranged|bow/i.test(playstyle)) return "ranged";
  return "caster";
}

const TIER_POINTS = { S: 4, A: 3, B: 2, C: 1, D: 0 } as const;
const BUDGET_LEVEL = { low: 0, medium: 1, high: 2 } as const;

/** Why a build fits, as dictionary keys with their values (shown under each result). */
export type Reason =
  | { key: "style"; v: string }
  | { key: "easy" | "medium" | "hard" }
  | { key: "rotation"; n: number }
  | { key: "budget"; v: "low" | "medium" | "high" }
  | { key: "noUnique" }
  | { key: "tier"; tier: string; goal: TierCategory }
  | { key: "tank" | "speed" };

export function scoreBuild(b: QuizBuild, a: QuizAnswers): { score: number; reasons: Reason[] } {
  let score = 0;
  const reasons: Reason[] = [];

  if (a.family !== "any") {
    if (b.family === a.family) {
      score += 6;
      reasons.push({ key: "style", v: b.playstyle });
    } else score -= 30; // Another style only shows once every build of the chosen one is listed.
  }

  const r = b.rotation;
  if (a.buttons === "few") {
    score += { easy: 3, medium: 0, hard: -4 }[b.difficulty];
    if (r !== null) score += r <= 2 ? 2 : r <= 4 ? 1 : r >= 6 ? -2 : 0;
    if (b.beginner) score += 1;
  } else if (a.buttons === "some") {
    score += { easy: 1, medium: 2, hard: -1 }[b.difficulty];
    if (r !== null && r >= 7) score -= 1;
  } else {
    score += { easy: 0, medium: 1, hard: 2 }[b.difficulty];
    if (r !== null && r >= 5) score += 1;
  }
  if (b.difficulty === "easy" && a.buttons !== "many") reasons.push({ key: "easy" });
  if (r !== null && r <= 4 && a.buttons === "few") reasons.push({ key: "rotation", n: r });

  const over = BUDGET_LEVEL[b.budget] - BUDGET_LEVEL[a.budget];
  score += over > 0 ? -3 * over : over === 0 ? 2 : 1;
  if (over <= 0) reasons.push({ key: "budget", v: b.budget });
  if (a.budget === "low") {
    if (b.uniques === 0) {
      score += 1;
      reasons.push({ key: "noUnique" });
    } else if (b.uniques >= 4) score -= 1;
  }

  const rating = b.ratings[a.goal];
  if (rating) {
    score += 1.5 * (TIER_POINTS[rating.tier] - (rating.estimated ? 0.5 : 0));
    if (rating.tier === "S" || rating.tier === "A") reasons.push({ key: "tier", tier: rating.tier, goal: a.goal });
  } else score -= 2;

  if (b.profile && a.priority !== "balanced") {
    const v = a.priority === "tank" ? b.profile.tank : (b.profile.clear + b.profile.speed) / 2;
    score += 1.5 * (v - 2);
    if (v >= 2.5) reasons.push({ key: a.priority });
  }

  return { score, reasons };
}

export function rankBuilds(builds: QuizBuild[], a: QuizAnswers) {
  return builds
    .map((b) => ({ build: b, ...scoreBuild(b, a) }))
    .sort((x, y) => y.score - x.score || x.build.title.localeCompare(y.build.title));
}
