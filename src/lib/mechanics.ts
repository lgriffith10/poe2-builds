import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getBuilds, renderBody } from "./builds";
import { summarize, type BuildSummary } from "./build-summary";
import { MECHANICS, mechanicTier, rankMechanics, type MechanicId } from "./farming";
import type { Tier } from "./types";
import lootJson from "@/data/generated/mechanic-loot.json";
import { getGem, getUnique } from "./data";
import { currencyHref, getCurrency } from "./currency";

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

// --- Loot tier lists (scripts/sync-loot.mjs → src/data/generated/mechanic-loot.json) -------------------------------

interface LootRow {
  name: string;
  kind: "exchange" | "unique";
  div: number;
  volume?: number;
  listings?: number;
  icon: string | null;
}
const loot = lootJson as unknown as { league: string; fetchedAt: string; exalted: number; mechanics: Record<string, LootRow[]> };

/** Price bounds of each loot tier, in Divine Orbs (S: 20+, A: 2+, B: 0.2+, C: 0.02+, D: below). */
export const LOOT_TIERS: [Tier, number][] = [["S", 20], ["A", 2], ["B", 0.2], ["C", 0.02], ["D", 0]];
/** Below this, a price rests on a handful of trades: Divine Orbs traded per day on the exchange, or unique listings. */
const MIN_VOLUME = 1;
const MIN_LISTINGS = 10;

export interface LootEntry {
  name: string;
  icon: string | null;
  href: string | null;
  /** "12 div" or "45 ex". */
  price: { amount: string; unit: "divine" | "exalted" };
  tier: Tier;
  /** False when too little of it trades for the price to be trusted. */
  liquid: boolean;
}

/** One mechanic's loot, most valuable first, with its tier; null without price data. */
export function mechanicLoot(id: MechanicId, lang: Locale = DEFAULT_LOCALE): { entries: LootEntry[]; fetchedAt: string; league: string } | null {
  const rows = loot.mechanics[id];
  if (!rows?.length) return null;
  const nf = (n: number, digits: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: digits });
  const entries = rows.map((r): LootEntry => {
    const gem = getGem(r.name);
    const unique = getUnique(r.name);
    const currency = getCurrency(r.name);
    const href = currency ? currencyHref(currency) : unique ? `/database/uniques#${unique.id}` : gem ? `/database/gems#${gem.id}` : null;
    const ex = r.div * loot.exalted;
    const price: LootEntry["price"] =
      r.div >= 1 ? { amount: nf(r.div, r.div < 10 ? 1 : 0), unit: "divine" } : { amount: ex < 1 ? "< 1" : nf(ex, 0), unit: "exalted" };
    return {
      name: r.name,
      icon: r.icon,
      href,
      price,
      tier: LOOT_TIERS.find(([, min]) => r.div >= min)![0],
      liquid: r.kind === "exchange" ? (r.volume ?? 0) >= MIN_VOLUME : (r.listings ?? 0) >= MIN_LISTINGS,
    };
  });
  return { entries, fetchedAt: loot.fetchedAt, league: loot.league };
}
