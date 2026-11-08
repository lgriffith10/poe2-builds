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
  tierChanges: Build["tierChanges"];
  difficulty: Build["difficulty"];
  budget: Build["budget"];
  damage: string;
  playstyle: string;
  sample: boolean;
  origin: Build["origin"];
  updated: string;
  skills: Pick<Gem, "name" | "icon" | "color">[];
  /** Guide the build is based on: site name (from the URL) and author. */
  source: { site: string; author: string; url: string } | null;
}

const SITE_NAMES: Record<string, string> = {
  "maxroll.gg": "Maxroll",
  "mobalytics.gg": "Mobalytics",
  "poe-vault.com": "PoE Vault",
  "poe.ninja": "poe.ninja",
  "poe2db.tw": "PoE2DB",
  "pathofexile.com": "PoE Forum",
  "youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "reddit.com": "Reddit",
};

function sourceOf(b: Build): BuildSummary["source"] {
  if (!b.source) return null;
  const host = new URL(b.source.url).hostname.replace(/^www\./, "");
  const site = SITE_NAMES[host] ?? host;
  // Authors are written "name (Site)"; the site is shown separately.
  const author = b.source.author.replace(/\s*\([^)]*\)\s*$/, "").trim() || b.source.author;
  return { site, author, url: b.source.url };
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
    tierChanges: b.tierChanges,
    difficulty: b.difficulty,
    budget: b.budget,
    damage: b.damage,
    playstyle: b.playstyle,
    sample: b.sample,
    origin: b.origin,
    updated: b.updated,
    skills: b.skills.map((s) => {
      const g = getGem(s.gem)!;
      return { name: g.name, icon: g.icon, color: g.color };
    }),
    source: sourceOf(b),
  };
}
