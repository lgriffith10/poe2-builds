import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getBuilds, renderBody } from "./builds";
import { summarize, type BuildSummary } from "./build-summary";
import { MECHANICS, mechanicTier, rankMechanics, type MechanicId } from "./farming";
import type { Tier } from "./types";

/**
 * Endgame mechanic pages (/farming/<id>): content/farming/<id>.md, translated in content/farming/<lang>/<id>.md
 * (front matter fields title, summary, hub, pinnacle and rewards, plus the body).
 */
const DIR = path.join(process.cwd(), "content", "farming");

export const DEMANDS = ["clear", "single", "tank", "speed"] as const;
export type Demand = (typeof DEMANDS)[number];

export interface Mechanic {
  id: MechanicId;
  title: string;
  summary: string;
  /** Where the mechanic lives on the Atlas or how it is reached. */
  hub: string;
  /** Pinnacle boss or end of its progression. */
  pinnacle: string;
  /** Main rewards, a few words each. */
  rewards: string[];
  /** What the mechanic asks of a build, 1 (little) to 3 (a lot), with the same scale as build farming profiles. */
  demands: Record<Demand, 1 | 2 | 3>;
  updated: string;
  sources: { title: string; url: string }[];
  html: string;
  toc: { id: string; text: string }[];
}

function read(id: MechanicId, lang: Locale): Mechanic {
  const where = `farming/${id}.md`;
  const file = path.join(DIR, `${id}.md`);
  if (!fs.existsSync(file)) throw new Error(`[content/${where}] missing page for mechanic "${id}"`);
  const base = matter(fs.readFileSync(file, "utf8"));
  const trPath = path.join(DIR, lang, `${id}.md`);
  const tr = lang !== DEFAULT_LOCALE && fs.existsSync(trPath) ? matter(fs.readFileSync(trPath, "utf8")) : null;
  const fm = base.data;
  const fail = (msg: string): never => {
    throw new Error(`[content/${where}] ${msg}`);
  };
  for (const key of ["title", "summary", "hub", "pinnacle", "updated"]) if (!fm[key]) fail(`missing "${key}"`);
  const demands = Object.fromEntries(
    DEMANDS.map((d) => {
      const v = fm.demands?.[d];
      if (v !== 1 && v !== 2 && v !== 3) fail(`demands.${d} must be 1, 2 or 3`);
      return [d, v];
    }),
  ) as Mechanic["demands"];
  const { html, toc } = renderBody(tr?.content.trim() ? tr.content : base.content, where, lang);
  return {
    id,
    title: tr?.data.title ?? fm.title,
    summary: tr?.data.summary ?? fm.summary,
    hub: tr?.data.hub ?? fm.hub,
    pinnacle: tr?.data.pinnacle ?? fm.pinnacle,
    rewards: tr?.data.rewards ?? fm.rewards ?? [],
    demands,
    updated: fm.updated instanceof Date ? fm.updated.toISOString().slice(0, 10) : String(fm.updated),
    sources: fm.sources ?? [],
    html,
    toc,
  };
}

export const getMechanics = (lang: Locale = DEFAULT_LOCALE): Mechanic[] => MECHANICS.map((id) => read(id, lang));
export const isMechanic = (id: string): id is MechanicId => (MECHANICS as readonly string[]).includes(id);

export interface MechanicTierEntry {
  build: BuildSummary;
  score: number;
  tier: Tier;
  /** Why the build sits there: the strongest reason first. */
  reasons: string[];
}

/** Every listed build with a farming profile, ranked for one mechanic (same scores as the build pages). */
export function mechanicTierList(id: MechanicId, lang: Locale = DEFAULT_LOCALE): MechanicTierEntry[] {
  return getBuilds(lang)
    .filter((b) => b.farming)
    .map((b) => {
      const fit = rankMechanics(b.farming!, lang, b.farmingNotes).find((m) => m.id === id)!;
      return { build: summarize(b), score: fit.score, tier: mechanicTier(fit.score), reasons: fit.reasons };
    })
    .sort((a, b) => b.score - a.score || a.build.title.localeCompare(b.build.title));
}
