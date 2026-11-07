// Compares an imported character with the site's build guides.
import type { SkillGroup } from "./types";

export interface GuideFingerprint {
  slug: string;
  title: string;
  className: string;
  ascendancy: string;
  /** Every passive allocated by the guide (main tree and ascendancy, starts excluded). */
  nodes: number[];
  keyPassives: { id: number; name: string }[];
  skills: SkillGroup[];
  uniques: string[];
}

export interface CharacterFingerprint {
  className: string;
  ascendancy: string | null;
  nodes: number[];
  skills: SkillGroup[];
  uniques: string[];
}

export interface Comparison {
  guide: GuideFingerprint;
  score: number;
  passives: number;
  mainSkills: number;
  supports: number;
  sameAscendancy: boolean;
  missingKeyPassives: string[];
  missingSkills: string[];
  /** Supports the guide links to a skill you use, but that you do not link. */
  missingSupports: { gem: string; supports: string[] }[];
  missingUniques: string[];
}

const lower = (s: string) => s.toLowerCase();

export function compareWithGuide(char: CharacterFingerprint, guide: GuideFingerprint): Comparison {
  const nodes = new Set(char.nodes);
  const passives = guide.nodes.length ? guide.nodes.filter((n) => nodes.has(n)).length / guide.nodes.length : 0;

  const charGems = new Set(char.skills.flatMap((s) => [s.gem, ...s.supports]).map(lower));
  const mainGems = guide.skills.map((s) => s.gem);
  const mainSkills = mainGems.length ? mainGems.filter((g) => charGems.has(lower(g))).length / mainGems.length : 0;

  const missingSupports: Comparison["missingSupports"] = [];
  let supportTotal = 0;
  let supportFound = 0;
  for (const g of guide.skills) {
    const mine = char.skills.find((s) => lower(s.gem) === lower(g.gem));
    if (!mine) continue;
    const linked = new Set(mine.supports.map(lower));
    const missing = g.supports.filter((s) => !linked.has(lower(s)));
    supportTotal += g.supports.length;
    supportFound += g.supports.length - missing.length;
    if (missing.length) missingSupports.push({ gem: g.gem, supports: missing });
  }
  const supports = supportTotal ? supportFound / supportTotal : 0;

  const myUniques = new Set(char.uniques.map(lower));
  const sameAscendancy = char.ascendancy === guide.ascendancy;
  const score = 0.55 * passives + 0.3 * mainSkills + 0.15 * supports;

  return {
    guide,
    score,
    passives,
    mainSkills,
    supports,
    sameAscendancy,
    missingKeyPassives: guide.keyPassives.filter((k) => !nodes.has(k.id)).map((k) => k.name),
    missingSkills: mainGems.filter((g) => !charGems.has(lower(g))),
    missingSupports,
    missingUniques: guide.uniques.filter((u) => !myUniques.has(lower(u))),
  };
}

/** Ranks guides: same ascendancy first, then same class, then by score. */
export function rankGuides(char: CharacterFingerprint, guides: GuideFingerprint[]): Comparison[] {
  const rank = (c: Comparison) => (c.sameAscendancy ? 2 : c.guide.className === char.className ? 1 : 0);
  return guides
    .map((g) => compareWithGuide(char, g))
    .sort((a, b) => rank(b) - rank(a) || b.score - a.score);
}
