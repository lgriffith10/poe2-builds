import "server-only";
// How the ladder meta moved during the league (scripts/sync-meta-history.mjs, poe.ninja's time machine).

import data from "@/data/generated/meta-history.json";

export interface MetaPoint {
  label: string;
  /** Days since league start (null for the current snapshot). */
  day: number | null;
  total: number;
  classes: Record<string, number>;
  skills: Record<string, number>;
}
export const metaHistory = data as unknown as { source: string; league: string; fetchedAt: string; points: MetaPoint[] };

export type Dimension = "classes" | "skills";
const share = (p: MetaPoint, dim: Dimension, name: string) => (p.total ? (p[dim][name] ?? 0) / p.total : 0);

/** Share of the ladder over time for the `n` most played entries now; null where the entry was outside the snapshot's top list. */
export function trend(dim: Dimension, n: number): { name: string; values: (number | null)[] }[] {
  const pts = metaHistory.points;
  const now = pts.at(-1);
  if (!now) return [];
  return Object.entries(now[dim])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name]) => ({ name, values: pts.map((p) => (name in p[dim] ? share(p, dim, name) : null)) }));
}

/**
 * Biggest risers and fallers between about two weeks ago and now (percentage points of the ladder), among entries
 * listed at either end.
 */
export function movers(dim: Dimension, n = 5) {
  const pts = metaHistory.points;
  const now = pts.at(-1);
  if (!now || pts.length < 2) return null;
  const lastDay = pts.at(-2)!.day ?? 0;
  const from = [...pts].reverse().find((p) => p.day !== null && p.day <= lastDay - 7) ?? pts[0];
  const names = new Set([...Object.keys(from[dim]), ...Object.keys(now[dim])]);
  const rows = [...names].map((name) => ({ name, before: share(from, dim, name), now: share(now, dim, name) }));
  const delta = (r: { before: number; now: number }) => r.now - r.before;
  return {
    from: from.label,
    up: rows.filter((r) => delta(r) > 0).sort((a, b) => delta(b) - delta(a)).slice(0, n),
    down: rows.filter((r) => delta(r) < 0).sort((a, b) => delta(a) - delta(b)).slice(0, n),
  };
}
