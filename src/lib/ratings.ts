import type { FarmingProfile } from "./farming";
import { TIER_CATEGORIES, type Tier, type TierCategory } from "./types";

/** A build's note in one tier category: from its source, or estimated when the source gives none. */
export type Rating = { tier: Tier; estimated: boolean };
export type Ratings = Record<TierCategory, Rating>;

const BUDGET_PENALTY = { low: 0, medium: 0.5, high: 1 } as const;

/**
 * Estimated tier from the farming profile (clear, single, tank on a 1-3 scale) and the budget.
 * Same idea as the Maxroll-derived tiers (clear or bossing weighted twice, plus defences), calibrated on
 * the 24-46 builds that have a sourced tier: it matches 19/24 endgame, 17/24 bossing and 23/46 league start
 * tiers exactly. Estimates stop at A: an S needs a source.
 */
function estimate(category: TierCategory, p: FarmingProfile, budget: keyof typeof BUDGET_PENALTY): Tier {
  const mapping = (2 * p.clear + p.single + p.tank) / 4;
  const score =
    category === "bossing"
      ? (2 * p.single + p.tank) / 3
      : category === "starter"
        ? mapping - BUDGET_PENALTY[budget]
        : mapping;
  return score >= 2.25 ? "A" : score >= 2 ? "B" : score >= 5 / 3 - 0.01 ? "C" : "D";
}

export function buildRatings(
  tiers: Partial<Record<TierCategory, Tier>>,
  profile: FarmingProfile | null,
  budget: keyof typeof BUDGET_PENALTY,
): Partial<Ratings> {
  const out: Partial<Ratings> = {};
  for (const c of TIER_CATEGORIES) {
    const sourced = tiers[c];
    if (sourced) out[c] = { tier: sourced, estimated: false };
    else if (profile) out[c] = { tier: estimate(c, profile, budget), estimated: true };
  }
  return out;
}
