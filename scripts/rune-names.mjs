#!/usr/bin/env node
// Names the runes, soul cores and idols behind the rune lines of the ladder builds.
// poe.ninja only gives the summed effect of an item's augments ("+150 to maximum Life"); this finds which augment
// (and how many) gives it, from the socket effects in currency.json: "2× Greater Body Rune: +150 to maximum Life".
// A line nothing matches exactly (e.g. boosted by "increased effect of Socketed Augment Items") stays as it is.
//
// Usage: node scripts/rune-names.mjs [slug...]   (default: every ladder build)
// Also exported for draft-from-ninja.mjs.

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ROOT = path.resolve(import.meta.dirname, "..");
const currency = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/currency.json"))).items;
const bases = Object.values(JSON.parse(fs.readFileSync(path.join(ROOT, ".cache/raw/base_items.json"))));
const uniques = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/uniques.json")));

const ARMOUR = new Set(["Helmet", "Body Armour", "Gloves", "Boots", "Shield", "Buckler"]);
const CASTER = new Set(["Wand", "Staff", "Sceptre", "Focus"]);
const generic = (l) => l.replace(/\d+(\.\d+)?/g, "#");
const numbers = (l) => (l.match(/\d+(\.\d+)?/g) ?? []).map(Number);
const ORDER = { runes: 0, soulcores: 1, idols: 2, abyss: 3 };

/** Item class of a piece ({base} or {unique}). */
export function pieceClass(piece) {
  const base = piece.base ?? uniques.find((u) => u.name === piece.unique)?.base;
  return bases.find((b) => b.name === base && b.domain === "item")?.item_class ?? "";
}

/** Socket effects ({name, lines}) of every augment for this item class. */
function effects(itemClass) {
  const cls = itemClass.toLowerCase();
  const group = ARMOUR.has(itemClass) ? "armour" : CASTER.has(itemClass) ? "caster" : "weapon";
  const out = [];
  for (const c of [...currency].sort((a, b) => (ORDER[a.category] ?? 9) - (ORDER[b.category] ?? 9))) {
    const s =
      c.socket?.find((e) => e.slots.includes(cls)) ??
      c.socket?.find((e) => e.slots.includes(group)) ??
      (group === "caster" ? c.socket?.find((e) => e.slots.includes("weapon")) : undefined);
    if (s?.lines.length) out.push({ name: c.name, lines: s.lines });
  }
  return out;
}

/** "k× Name: line" for each rune line poe.ninja gave, or the line as it is when no augment explains it. */
// `boost`: the item's "#% increased effect of Socketed Augment Items", which scales every augment value.
export function nameRunes(lines, itemClass, boost = 0) {
  if (lines.some((l) => /^\d+× |: /.test(l) && currency.some((c) => l.includes(c.name)))) return lines; // already named
  const fx = effects(itemClass);
  const left = [...lines];
  const out = [];
  // Augments with several lines first (unique soul cores, idols): every line must be there.
  for (const e of fx.filter((e) => e.lines.length > 1)) {
    const idx = e.lines.map((l) => left.indexOf(l));
    if (idx.some((i) => i < 0)) continue;
    out.push(`${e.name}: ${e.lines.join(", ")}`);
    for (const i of idx.sort((a, b) => b - a)) left.splice(i, 1);
  }
  for (const line of left) {
    const g = generic(line);
    const v = numbers(line);
    let best = null;
    for (const e of fx.filter((e) => e.lines.length === 1 && generic(e.lines[0]) === g)) {
      const w = numbers(e.lines[0]);
      // Smallest number of sockets (at most 6) that gives every number of the line, rounded either way.
      const fits = (k) =>
        v.length === w.length &&
        v.every((x, i) => [Math.floor, Math.round].some((r) => x === r(w[i] * k * (1 + boost / 100)) || x === k * r(w[i] * (1 + boost / 100))));
      const k = v.length ? [1, 2, 3, 4, 5, 6].find(fits) : 1;
      if (k && (!best || k < best.k)) best = { name: e.name, k };
    }
    out.push(best ? `${best.k > 1 ? `${best.k}× ` : ""}${best.name}: ${line}` : line);
  }
  // More augments than an item can hold: the counts are coincidences, keep poe.ninja's lines.
  const sockets = out.reduce((n, l) => n + (l === lines.find((x) => x === l) ? 0 : Number(l.match(/^(\d+)× /)?.[1] ?? 1)), 0);
  return sockets > 6 ? lines : out;
}

// CLI: rewrite the `runes:` lines of the ladder builds in place (front matter edited line by line).
if (import.meta.url === `file://${process.argv[1]}`) {
  const dir = path.join(ROOT, "content/builds");
  const slugs = process.argv.slice(2).length
    ? process.argv.slice(2)
    : fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
  for (const slug of slugs) {
    const file = path.join(dir, `${slug}.md`);
    const text = fs.readFileSync(file, "utf8");
    if (!/^origin: ladder$/m.test(text)) continue;
    const lines = text.split("\n");
    let piece = {}, named = 0, total = 0;
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^(\s+)(base|unique|mods|runes): (.*)$/);
      if (!m) continue;
      if (m[2] === "mods") {
        piece.boost = Number(m[3].match(/(\d+)% increased effect of Socketed Augment Items/)?.[1] ?? 0);
        continue;
      }
      if (m[2] !== "runes") {
        piece = { [m[2]]: yaml.load(m[3]) };
        continue;
      }
      const runes = yaml.load(m[3]);
      const out = nameRunes(runes, pieceClass(piece), piece.boost);
      total += out.length;
      named += out.filter((l) => !runes.includes(l)).length;
      lines[i] = `${m[1]}runes: [${out.map((l) => JSON.stringify(l)).join(", ")}]`;
    }
    fs.writeFileSync(file, lines.join("\n"));
    console.log(`${slug}: ${named}/${total} rune lines named`);
  }
}
