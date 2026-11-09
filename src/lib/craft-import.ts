// Reads an item copied in game (Ctrl+C, or Ctrl+Alt+C for the advanced text) into a simulator item.
//
// The mod lines are matched against the base's pools (regular and desecrated). The advanced text names each mod's
// affix ("{ Prefix Modifier "Hale" (Tier: 5) }"), which settles ambiguous lines; with the plain text, two consecutive
// lines can form one hybrid mod, and the tier is the one whose ranges contain the rolled values.

import type { Affix, Crafter, Item, ItemMod, Rarity } from "./craft";

export interface ImportResult {
  item: Item | null;
  /** Item name for rares and uniques. */
  name?: string;
  /** Mod lines that matched nothing the base can roll (implicits, runes, essence-only or unsupported mods). */
  unmatched: string[];
  error?: "empty" | "base" | "unique";
}

const RANGE = /\((-?[\d.]+)-(-?[\d.]+)\)/g;
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

interface Matcher {
  i: number;
  re: RegExp;
  ranges: [number, number][];
  lines: number;
}

function matcher(c: Crafter, i: number): Matcher {
  const text = c.mod(i).text;
  const ranges: [number, number][] = [];
  let re = "";
  let last = 0;
  for (const m of text.matchAll(RANGE)) {
    re += escape(text.slice(last, m.index));
    re += "(-?\\d+(?:\\.\\d+)?)";
    ranges.push([Number(m[1]), Number(m[2])]);
    last = m.index + m[0].length;
  }
  re += escape(text.slice(last));
  return { i, re: new RegExp(`^${re}$`, "i"), ranges, lines: text.split("\n").length };
}

/** Advanced text writes "+80(70-89) to maximum Life"; keep the rolled value only. */
const cleanLine = (s: string) =>
  s
    .replace(/(\d)\((-?[\d.]+)-(-?[\d.]+)\)/g, "$1")
    .replace(/\s+—\s+Unscalable Value$/i, "")
    .trim();

const FLAG = /\s*\((crafted|desecrated|fractured|implicit|rune|enchant|augmented)\)$/i;
const SKIP_FLAGS = new Set(["implicit", "rune", "enchant"]);

interface Line {
  text: string;
  desecrated?: boolean;
  /** From an advanced-text header. */
  affix?: Affix;
  name?: string;
}

export function parseItemText(c: Crafter, raw: string): ImportResult {
  const lines = raw.replace(/\r/g, "").split("\n").map((l) => l.trim());
  if (!lines.some(Boolean)) return { item: null, unmatched: [], error: "empty" };
  const sections: string[][] = [[]];
  for (const l of lines) {
    if (/^-{4,}$/.test(l)) sections.push([]);
    else if (l) sections.at(-1)!.push(l);
  }

  // Header: "Item Class: …", "Rarity: …", then the name and/or base type.
  const head = sections[0];
  const rarityText = head.find((l) => /^Rarity:/i.test(l))?.split(":")[1]?.trim().toLowerCase() ?? "normal";
  if (rarityText === "unique") return { item: null, unmatched: [], error: "unique" };
  const rarity: Rarity = rarityText === "rare" ? "rare" : rarityText === "magic" ? "magic" : "normal";
  const titles = head.filter((l) => !/^(Item Class|Rarity):/i.test(l));
  const bases = Object.keys(c.data.bases);
  const base =
    titles.map((t) => bases.find((b) => b === t)).find(Boolean) ??
    // Magic items carry their affixes around the base name: the longest base contained in a title.
    bases.filter((b) => titles.some((t) => t.includes(b))).sort((a, b) => b.length - a.length)[0];
  if (!base) return { item: null, unmatched: [], error: "base" };
  const name = rarity === "rare" && titles.length > 1 ? titles[0] : undefined;

  let ilvl = 82;
  const modLines: Line[] = [];
  let afterLevel = false;
  for (const section of sections.slice(1)) {
    const level = section.find((l) => /^Item Level:/i.test(l));
    if (level) {
      ilvl = Number(level.split(":")[1]) || ilvl;
      afterLevel = true;
      continue;
    }
    if (!afterLevel) continue; // properties, requirements, sockets
    let header: { affix?: Affix; name?: string; skip: boolean } | null = null;
    for (const l of section) {
      const h = l.match(/^\{\s*(.*?)\s*\}$/);
      if (h) {
        const m = h[1].match(/(Prefix|Suffix) Modifier(?: "([^"]+)")?/i);
        header = m
          ? { affix: m[1].toLowerCase() === "prefix" ? "P" : "S", name: m[2], skip: false }
          : { skip: true }; // implicit, rune, unique modifiers
        if (!header.skip) modLines.push({ text: "", affix: header.affix, name: header.name, desecrated: /desecrated/i.test(h[1]) }); // merged below
        continue;
      }
      if (header?.skip) continue;
      if (/^(Corrupted|Unidentified|Mirrored|Sanctified)$/i.test(l) || /:/.test(l) || /^".*"$/.test(l)) continue;
      const flag = l.match(FLAG)?.[1]?.toLowerCase();
      if (flag && SKIP_FLAGS.has(flag)) continue;
      modLines.push({ text: cleanLine(l.replace(FLAG, "")), desecrated: flag === "desecrated" });
    }
  }

  // Advanced text: the lines under one header form one mod.
  const groups: Line[] = [];
  let open: Line | null = null;
  for (const l of modLines) {
    if (!l.text) {
      open = { ...l };
      groups.push(open);
    } else if (open) open.text = open.text ? `${open.text}\n${l.text}` : l.text;
    else groups.push(l);
  }

  const cands = [...new Set([...c.pool(base), ...c.desecratedPool(base)])].map((i) => matcher(c, i));
  const regular = new Set(c.pool(base));
  const item: Item = { base, ilvl, rarity, mods: [] };
  const unmatched: string[] = [];

  const best = (text: string, line: Line, lines: number) => {
    let found: { m: Matcher; r: number; score: number } | null = null;
    const taken = new Set(item.mods.map((x) => c.mod(x.i).group));
    for (const m of cands) {
      if (m.lines !== lines) continue;
      const hit = text.match(m.re);
      if (!hit) continue;
      const mod = c.mod(m.i);
      const values = hit.slice(1).map(Number);
      const inRange = m.ranges.every(([a, b], k) => values[k] >= Math.min(a, b) && values[k] <= Math.max(a, b));
      const rs = m.ranges.map(([a, b], k) => (b === a ? 0.5 : Math.min(1, Math.max(0, (values[k] - a) / (b - a)))));
      const score =
        (line.name && mod.name === line.name ? 100 : 0) +
        (line.affix && mod.affix === line.affix ? 20 : 0) +
        (inRange ? 10 : 0) +
        (!taken.has(mod.group) ? 5 : 0) +
        (mod.level <= ilvl ? 2 : 0) +
        (regular.has(m.i) !== Boolean(line.desecrated) ? 1 : 0);
      if (!found || score > found.score) found = { m, r: rs.length ? rs.reduce((s, x) => s + x, 0) / rs.length : 0.5, score };
    }
    // Without a header, a line only counts when its values fit a tier (otherwise it is likely a merged or foreign stat).
    return found && (found.score >= 10 || line.affix) ? found : null;
  };
  const push = (i: number, r: number) => {
    const mod: ItemMod = { i, r };
    if (!regular.has(i)) mod.desecrated = true;
    item.mods.push(mod);
  };

  for (let k = 0; k < groups.length; k++) {
    const g = groups[k];
    if (!g.text) continue;
    if (g.affix) {
      const hit = best(g.text, g, g.text.split("\n").length);
      if (hit) push(hit.m.i, hit.r);
      else unmatched.push(g.text);
      continue;
    }
    // Plain text: try a hybrid (two lines) before a single line.
    const next = groups[k + 1];
    const pair = next?.text && !next.affix ? best(`${g.text}\n${next.text}`, g, 2) : null;
    if (pair && pair.score >= 15) {
      push(pair.m.i, pair.r);
      k++;
      continue;
    }
    const one = best(g.text, g, 1);
    if (one) push(one.m.i, one.r);
    else unmatched.push(g.text);
  }

  // A normal item with mods is at least magic; a magic item over its limits is rare.
  const count = (a: Affix) => item.mods.filter((m) => c.mod(m.i).affix === a).length;
  if (item.rarity === "normal" && item.mods.length) item.rarity = "magic";
  if (item.rarity === "magic" && (count("P") > 1 || count("S") > 1)) item.rarity = "rare";
  return { item, name, unmatched };
}

