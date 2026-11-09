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
  error?: "empty" | "unique";
  /** The base type was not recognised: the item uses the fallback base. */
  baseGuessed?: boolean;
  /** The text came from a French game client. */
  french?: boolean;
}

/**
 * Stat key shared with scripts/craft-data.mjs: numbers and ranges -> #, no "+" sign, no space before %, lower case.
 * French texts use a comma decimal separator and a (narrow) no-break space before %.
 */
export const statKey = (s: string) =>
  normalize(s)
    .replace(/\((-?[\d.]+)-(-?[\d.]+)\)/g, "#")
    .replace(NUMBER, "#")
    .replace(/\+#/g, "#")
    .replace(/\s*\(local\)$/i, "")
    .toLowerCase();
const NUMBER = /\+?-?\d+(\.\d+)?/g;
const normalize = (s: string) =>
  s
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/\s+%/g, "%")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\s+/g, " ")
    .trim();

/** French "reduced" wordings -> the "increased" ones the trade site uses for both signs. */
const REDUCED_FR: [RegExp, string][] = [
  [/\bde réduction\b/, "d'augmentation"],
  [/\brédui(tes)\b/, "augmentées"],
  [/\brédui(ts)\b/, "augmentés"],
  [/\brédui(te)\b/, "augmentée"],
  [/\brédui(t)\b/, "augmenté"],
];

/** A French mod line in English, or null when the stat is unknown. */
function translateLine(c: Crafter, line: string): string | null {
  const stats = c.data.fr?.stats;
  if (!stats) return null;
  const text = normalize(line);
  const values = [...text.replace(/\+(?=\d)/g, "").matchAll(/-?\d+(\.\d+)?/g)].map((m) => m[0]);
  const fill = (en: string) => {
    let k = 0;
    return en.replace(/#/g, () => values[k++] ?? "#");
  };
  const direct = stats[statKey(text)];
  if (direct) return fill(direct);
  for (const [re, to] of REDUCED_FR) {
    if (!re.test(text)) continue;
    const en = stats[statKey(text.replace(re, to))];
    if (en) return fill(en).replace(/\bincreased\b/, "reduced");
  }
  return null;
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
  // The "+" sign is optional on both sides (the French texts of the trade site drop it).
  let last = 0;
  for (const m of text.matchAll(RANGE)) {
    re += escape(text.slice(last, m.index));
    re += "(-?\\d+(?:\\.\\d+)?)";
    ranges.push([Number(m[1]), Number(m[2])]);
    last = m.index + m[0].length;
  }
  re += escape(text.slice(last));
  return { i, re: new RegExp(`^${re.replace(/\\\+(?=\(|\d|$)/g, "\\+?")}$`, "i"), ranges, lines: text.split("\n").length };
}

/** Advanced text writes "+80(70-89) to maximum Life"; keep the rolled value only. */
const cleanLine = (s: string) =>
  s
    .replace(/(\d)\((-?[\d.]+)-(-?[\d.]+)\)/g, "$1")
    .replace(/\s+—\s+Unscalable Value$/i, "")
    .trim();

const FLAG = /\s*\((crafted|desecrated|fractured|implicit|rune|enchant|augmented|implicite|enchantement|profanée?|fracturée?|augmentée?|façonnée?)\)$/i;
const SKIP_FLAGS = /^(implicite?|rune|enchant(ement)?)$/i;
const isDesecratedFlag = (f?: string) => !!f && /^(desecrated|profanée?)$/i.test(f);
const HEADER = /^(Item Class|Rarity|Classe d['’]objet|Rareté)\s*:/i;
const RARITY = /^(Rarity|Rareté)\s*:/i;
const ITEM_LEVEL = /^(Item Level|Niveau d['’]objet|Niveau de l['’]objet)\s*:/i;

interface Line {
  text: string;
  /** A French line that could not be translated (kept to report it). */
  skip?: string;
  desecrated?: boolean;
  /** From an advanced-text header. */
  affix?: Affix;
  name?: string;
}

export function parseItemText(c: Crafter, raw: string, fallbackBase?: string): ImportResult {
  const lines = raw.replace(/\r/g, "").split("\n").map((l) => l.trim());
  if (!lines.some(Boolean)) return { item: null, unmatched: [], error: "empty" };
  const sections: string[][] = [[]];
  for (const l of lines) {
    if (/^-{4,}$/.test(l)) sections.push([]);
    else if (l) sections.at(-1)!.push(l);
  }

  // Header: "Item Class: …", "Rarity: …", then the name and/or base type.
  const head = sections[0];
  const french = head.some((l) => /^(Classe d['’]objet|Rareté)\s*:/i.test(l));
  const rarityText = head.find((l) => RARITY.test(l))?.split(":")[1]?.trim().toLowerCase() ?? "normal";
  if (rarityText === "unique") return { item: null, unmatched: [], error: "unique" };
  const rarity: Rarity = rarityText === "rare" ? "rare" : /^(magic|magique)$/.test(rarityText) ? "magic" : "normal";
  const titles = head.filter((l) => !HEADER.test(l));
  // Base names by language (French names map to the English ones).
  const names: [string, string][] = french ? Object.entries(c.data.fr?.bases ?? {}) : Object.keys(c.data.bases).map((b) => [b, b]);
  const found =
    names.find(([n]) => titles.includes(n)) ??
    // Magic items carry their affixes around the base name: the longest base contained in a title.
    names.filter(([n]) => titles.some((t) => t.includes(n))).sort((a, b) => b[0].length - a[0].length)[0];
  const base = found?.[1] ?? (fallbackBase && c.data.bases[fallbackBase] ? fallbackBase : undefined);
  if (!base) return { item: null, unmatched: [], error: "empty" };
  const name = rarity === "rare" && titles.length > 1 ? titles[0] : undefined;

  let ilvl = 82;
  const modLines: Line[] = [];
  let afterLevel = false;
  for (const section of sections.slice(1)) {
    const level = section.find((l) => ITEM_LEVEL.test(l));
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
        const mFr = h[1].match(/Modificateur (préfixe|suffixe)/i);
        header = m
          ? { affix: m[1].toLowerCase() === "prefix" ? "P" : "S", name: m[2], skip: false }
          : mFr
            ? { affix: mFr[1].toLowerCase() === "préfixe" ? "P" : "S", skip: false } // French affix names are not in the data
            : { skip: true }; // implicit, rune, unique modifiers
        if (!header.skip) modLines.push({ text: "", affix: header.affix, name: header.name, desecrated: /desecrated|profané/i.test(h[1]) }); // merged below
        continue;
      }
      if (header?.skip) continue;
      if (/^(Corrupted|Unidentified|Mirrored|Sanctified|Corrompu|Non identifié|Reflété|Sanctifié)$/i.test(l) || /:/.test(l) || /^".*"$/.test(l)) continue;
      const flag = l.match(FLAG)?.[1];
      if (flag && SKIP_FLAGS.test(flag)) continue;
      let text = cleanLine(l.replace(FLAG, ""));
      if (french) {
        const en = translateLine(c, text);
        if (!en) {
          modLines.push({ text: "", skip: text }); // reported as not recognised
          continue;
        }
        text = en;
      }
      modLines.push({ text, desecrated: isDesecratedFlag(flag) });
    }
  }

  // Advanced text: the lines under one header form one mod.
  const groups: Line[] = [];
  let open: Line | null = null;
  const unmatched: string[] = [];
  for (const l of modLines) {
    if (l.skip) {
      unmatched.push(l.skip);
      continue;
    }
    if (!l.text) {
      open = { ...l };
      groups.push(open);
    } else if (open) open.text = open.text ? `${open.text}\n${l.text}` : l.text;
    else groups.push(l);
  }

  const cands = [...new Set([...c.pool(base), ...c.desecratedPool(base)])].map((i) => matcher(c, i));
  const regular = new Set(c.pool(base));
  const item: Item = { base, ilvl, rarity, mods: [] };

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
  return { item, name, unmatched, baseGuessed: !found, french };
}


/**
 * A mod text (rolled values, ranges or # placeholders) in French, line by line; lines without a translation stay in
 * English. Ranges "(a-b)" are kept as they are.
 */
export function frenchModText(c: Crafter, text: string): string {
  const table = c.data.fr?.text;
  if (!table) return text;
  return text
    .split("\n")
    .map((line) => {
      const values = [...line.matchAll(/\((-?[\d.]+)-(-?[\d.]+)\)|#|-?\d+(\.\d+)?/g)].map((m) => m[0].replace(/^(\d)/, "$1"));
      const fill = (fr: string) => {
        let k = 0;
        return fr.replace(/#/g, () => values[k++] ?? "#");
      };
      const sign = (fr: string) => (/^\+/.test(line) && /^#/.test(fr) ? `+${fill(fr)}` : fill(fr));
      const direct = table[statKey(line)];
      if (direct) return sign(direct);
      const flipped = table[statKey(line.replace(/\breduced\b/, "increased"))];
      if (flipped) return sign(flipped).replace(/d'augmentation/, "de réduction").replace(/augmenté(e?s?)\b/, "réduit$1");
      return line;
    })
    .join("\n");
}
