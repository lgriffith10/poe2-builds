import ladderJson from "@/data/generated/ladder.json";
import type { Build } from "./builds";

export interface LadderEntry {
  name: string;
  count: number;
}
export interface LadderAscendancy extends LadderEntry {
  skills: LadderEntry[];
  uniques: LadderEntry[];
  keystones: LadderEntry[];
}
export interface Ladder {
  source: string;
  league: string;
  snapshot: string;
  fetchedAt: string;
  total: number;
  skills: LadderEntry[];
  uniques: LadderEntry[];
  keystones: LadderEntry[];
  ascendancies: LadderAscendancy[];
}

/** Ladder snapshot from poe.ninja (scripts/sync-ninja.mjs), committed and read at build time. */
export const ladder = ladderJson as Ladder;

/** How many ladder characters of the build's ascendancy use its first skill, when the snapshot lists it. */
export function ladderPopularity(build: Pick<Build, "ascendancy" | "skills">) {
  const asc = ladder.ascendancies.find((a) => a.name === build.ascendancy);
  if (!asc) return null;
  const skill = build.skills.map((s) => asc.skills.find((x) => x.name === s.gem)).find(Boolean);
  return {
    ascendancy: asc.count,
    ascendancyShare: asc.count / ladder.total,
    skill: skill ? { name: skill.name, count: skill.count, share: skill.count / asc.count } : null,
  };
}
