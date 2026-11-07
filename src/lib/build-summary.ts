import "server-only";
import type { Build } from "./builds";
import { getGem } from "./data";
import type { Gem } from "./types";

/** Lightweight build data passed to client components (no guide HTML). */
export interface BuildSummary {
  slug: string;
  title: string;
  className: string;
  ascendancy: string;
  summary: string;
  tags: string[];
  tiers: Build["tiers"];
  difficulty: Build["difficulty"];
  budget: Build["budget"];
  damage: string;
  playstyle: string;
  sample: boolean;
  updated: string;
  skills: Pick<Gem, "name" | "icon" | "color">[];
}

export function summarize(b: Build): BuildSummary {
  return {
    slug: b.slug,
    title: b.title,
    className: b.className,
    ascendancy: b.ascendancy,
    summary: b.summary,
    tags: b.tags,
    tiers: b.tiers,
    difficulty: b.difficulty,
    budget: b.budget,
    damage: b.damage,
    playstyle: b.playstyle,
    sample: b.sample,
    updated: b.updated,
    skills: b.skills.map((s) => {
      const g = getGem(s.gem)!;
      return { name: g.name, icon: g.icon, color: g.color };
    }),
  };
}
