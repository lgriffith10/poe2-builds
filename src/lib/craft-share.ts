// Craft links: the item, its wanted modifiers and nothing else, in the URL hash (#c=…), like the planner's build codes.
// Mods are stored by group and level (not by index in craft.json) so links survive a data refresh.

import type { Crafter, Item, ItemMod, Rarity } from "./craft";
import { statKey } from "./craft-import";

interface Payload {
  /** base, item level, rarity (n/m/r) */
  b: string;
  l: number;
  r?: "n" | "m" | "r";
  /** [group, level, roll 0-99, flags (1 crafted, 2 desecrated)] */
  m?: [string, number, number, number?][];
  /** wanted groups */
  t?: string[];
}

const RARITY: Record<Rarity, "n" | "m" | "r"> = { normal: "n", magic: "m", rare: "r" };
const FROM: Record<string, Rarity> = { n: "normal", m: "magic", r: "rare" };

const toB64 = (s: string) => btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64 = (s: string) => atob(s.replace(/-/g, "+").replace(/_/g, "/"));

export function encodeCraft(c: Crafter, item: Item, targets: Iterable<string>): string {
  const p: Payload = { b: item.base, l: item.ilvl };
  if (item.rarity !== "normal") p.r = RARITY[item.rarity];
  if (item.mods.length)
    p.m = item.mods.map((m) => {
      const mod = c.mod(m.i);
      const flags = (m.crafted ? 1 : 0) | (m.desecrated ? 2 : 0);
      const row: [string, number, number, number?] = [mod.group, mod.level, Math.round((m.r ?? 0.5) * 99)];
      if (flags) row.push(flags);
      return row;
    });
  const t = [...targets];
  if (t.length) p.t = t;
  // Base names are ASCII; escape anything else so btoa never throws.
  return toB64(JSON.stringify(p).replace(/[^\x20-\x7e]/g, (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`));
}

export function decodeCraft(c: Crafter, code: string): { item: Item; targets: string[] } | null {
  let p: Payload;
  try {
    p = JSON.parse(fromB64(code));
  } catch {
    return null;
  }
  if (!p || typeof p.b !== "string" || !c.data.bases[p.b]) return null;
  const ilvl = Math.max(1, Math.min(86, Number(p.l) || 82));
  const pool = [...c.pool(p.b), ...c.desecratedPool(p.b)];
  const mods: ItemMod[] = [];
  for (const [group, level, roll, flags = 0] of p.m ?? []) {
    const i = pool.find((x) => c.mod(x).group === group && c.mod(x).level === level);
    if (i === undefined || mods.some((m) => c.mod(m.i).group === group)) continue;
    const mod: ItemMod = { i, r: Math.min(99, Math.max(0, Number(roll) || 0)) / 99 };
    if (flags & 1) mod.crafted = true;
    if (flags & 2 || c.mod(i).desecrated) mod.desecrated = true;
    mods.push(mod);
  }
  const groups = new Set(pool.map((i) => c.mod(i).group));
  return {
    item: { base: p.b, ilvl, rarity: FROM[p.r ?? "n"] ?? "normal", mods },
    targets: (p.t ?? []).filter((g) => typeof g === "string" && groups.has(g)),
  };
}

/**
 * Mod groups of a base matching guide modifier lines ("+# to maximum Life", "+80 to maximum Life", "Movement Speed"
 * once expanded). Single-line mods win over hybrids; lines that match nothing are skipped.
 */
export function groupsForLines(c: Crafter, base: string, lines: string[]): string[] {
  const single = new Map<string, string>();
  const hybrid = new Map<string, string>();
  for (const i of [...c.pool(base), ...c.desecratedPool(base)]) {
    const mod = c.mod(i);
    const parts = mod.text.split("\n");
    for (const line of parts) {
      const key = statKey(line);
      const map = parts.length === 1 ? single : hybrid;
      if (!map.has(key)) map.set(key, mod.group);
    }
  }
  const out = new Set<string>();
  for (const line of lines) {
    const keys = [statKey(line), statKey(line.replace(/\bincreased\b/, "reduced"))];
    const g = keys.map((k) => single.get(k)).find(Boolean) ?? keys.map((k) => hybrid.get(k)).find(Boolean);
    if (g) out.add(g);
  }
  return [...out];
}
