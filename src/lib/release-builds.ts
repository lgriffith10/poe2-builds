import "server-only";
import type { Build } from "./builds";
import { changesFor, type BuildFootprint, type PatchChange } from "./release";
import { GEAR_STAGES } from "./types";

/** Gems, uniques and key passives of a build: what a patch note change can touch. */
export function footprint(b: Build): BuildFootprint {
  const sets = [b.gear, ...GEAR_STAGES.map((s) => b.gearStages[s] ?? {})];
  return {
    gems: [...new Set([...b.skills.flatMap((s) => [s.gem, ...s.supports]), ...b.leveling.flatMap((p) => p.steps.flatMap((st) => st.skills.flatMap((s) => [s.gem, ...s.supports])))])],
    uniques: [...new Set(sets.flatMap((g) => Object.values(g).flatMap((p) => (p?.unique ? [p.unique] : []))))],
    passives: [...new Set([...b.keyPassives, ...b.ascendancyOrder])],
  };
}

export const buildChanges = (b: Build): PatchChange[] => changesFor(footprint(b));
