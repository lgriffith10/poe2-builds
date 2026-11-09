#!/usr/bin/env node
// Compiles the crafting consumables wiki (src/data/generated/currency.json) and its icons (public/img/currency).
//
// - poe.ninja's currency exchange decides WHICH items exist in the current game (RePoE still lists many PoE1 leftovers),
//   grouped into our categories.
// - RePoE base_items gives the in-game description, directions, stack size and art.
// - Path of Building gives what each essence guarantees per item class (Essence.lua, mod texts from RePoE mods) and
//   what each rune, soul core, idol or abyssal eye grants per slot (ModRunes.lua).
// Prices are not stored here: `npm run prices:sync` snapshots them weekly into prices.json.
//
// Usage: node scripts/currency-data.mjs [League name]   (default: the league of the ladder snapshot)

import fs from "node:fs/promises";
import path from "node:path";
import { economy } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".cache", "raw");
const OUT = path.join(ROOT, "src", "data", "generated", "currency.json");
const ICON_DIR = path.join(ROOT, "public", "img", "currency");
const POB = "https://raw.githubusercontent.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/dev/src/Data/";
const ladder = JSON.parse(await fs.readFile(path.join(ROOT, "src", "data", "generated", "ladder.json"), "utf8"));
const LEAGUE = process.argv[2] ?? ladder.league;

async function cached(file, load) {
  const p = path.join(RAW, file);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    const text = await load();
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, text);
    return text;
  }
}
const download = (url) => async () => {
  console.log(`downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
};

const baseItems = JSON.parse(await cached("base_items.json", download("https://repoe-fork.github.io/poe2/base_items.min.json")));
const mods = JSON.parse(await cached("mods.json", download("https://repoe-fork.github.io/poe2/mods.min.json")));
const essenceLua = await cached("Essence.lua", download(`${POB}Essence.lua`));
const runesLua = await cached("ModRunes.lua", download(`${POB}ModRunes.lua`));

/** Our categories, in display order: poe.ninja exchange type and an optional name filter. */
const CATEGORIES = [
  { id: "orbs", type: "Currency" },
  { id: "essences", type: "Essences" },
  { id: "omens", type: "Ritual", keep: (n) => n.startsWith("Omen of") },
  { id: "abyss", type: "Abyss" },
  { id: "catalysts", type: "Breach", keep: (n) => n.endsWith("Catalyst") },
  { id: "emotions", type: "Delirium" },
  { id: "runes", type: "Runes" },
  { id: "soulcores", type: "SoulCores" },
  { id: "idols", type: "Idols" },
];
// Not crafting consumables, even though poe.ninja files them with currency.
const SKIP = new Set(["Cryptic Key", "Hinekora's Lock"]);

// "[Tag|Shown]" / "[Tag]" markup -> plain text.
const plain = (s = "") =>
  s
    .replace(/\[([^\]|]+)\|([^\]]+)\]/g, "$2")
    .replace(/\[([^\]]+)\]/g, "$1")
    .replace(/\r/g, "")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .trim();
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// RePoE base item by name: several entries can share a name (PoE1 leftovers); prefer a released one with art.
const byName = new Map();
for (const b of Object.values(baseItems)) {
  if (!b.visual_identity?.dds_file) continue;
  const prev = byName.get(b.name);
  if (!prev || (prev.release_state !== "released" && b.release_state === "released")) byName.set(b.name, b);
}

// --- essences: guaranteed mod per item class -------------------------------------------------------
const essenceMods = new Map(); // essence name -> [{ text, classes[] }]
for (const line of essenceLua.split("\n")) {
  const name = line.match(/name = "([^"]+)"/)?.[1];
  const block = line.match(/mods = \{(.*)\}, \},?\s*$/)?.[1];
  if (!name || !block) continue;
  const byText = new Map();
  for (const [, cls, id] of block.matchAll(/\["([^"]+)"\] = "([^"]+)"/g)) {
    const text = plain(mods[id]?.text);
    if (!text) continue;
    if (!byText.has(text)) byText.set(text, []);
    byText.get(text).push(cls);
  }
  essenceMods.set(name, [...byText].map(([text, classes]) => ({ text, classes })));
}

// --- socketables: effect per slot ------------------------------------------------------------------
// ModRunes.lua: ["Name"] = { ["slot"] = { type = ..., "stat line", ..., levelReq = N, }, ... }
const socketEffects = new Map(); // name -> [{ slots[], lines[], level }]
{
  let current = null, slot = null;
  for (const line of runesLua.split("\n")) {
    let m;
    if ((m = line.match(/^\t\["(.+)"\] = \{$/))) {
      current = [];
      socketEffects.set(m[1].replace(/\\'/g, "'"), current);
    } else if (current && (m = line.match(/^\t\t\["(.+)"\] = \{$/))) {
      slot = { slots: [m[1]], lines: [], level: null };
      current.push(slot);
    } else if (slot && (m = line.match(/^\t\t\t\t"(.*)",$/))) {
      slot.lines.push(m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'));
    } else if (slot && (m = line.match(/^\t\t\t\tlevelReq = (\d+),$/))) {
      slot.level = Number(m[1]);
    }
  }
  // Merge slots that grant the same lines.
  for (const [name, list] of socketEffects) {
    const merged = [];
    for (const s of list) {
      const same = merged.find((x) => x.lines.join("\n") === s.lines.join("\n") && x.level === s.level);
      if (same) same.slots.push(...s.slots);
      else merged.push(s);
    }
    socketEffects.set(name, merged.filter((s) => s.lines.length));
  }
}

// --- items -----------------------------------------------------------------------------------------
await fs.mkdir(ICON_DIR, { recursive: true });
async function icon(b, name) {
  const dds = b?.visual_identity?.dds_file;
  if (!dds) return null;
  const file = dds.split("/").pop().replace(/\.dds$/i, "").toLowerCase();
  const out = path.join(ICON_DIR, `${file}.webp`);
  try {
    await fs.access(out);
  } catch {
    const res = await fetch(`https://repoe-fork.github.io/poe2/${dds.replace(/\.dds$/i, "")}.webp`);
    if (!res.ok) {
      console.warn(`art download failed for ${name}: ${res.status}`);
      return null;
    }
    await fs.writeFile(out, Buffer.from(await res.arrayBuffer()));
  }
  return `/img/currency/${file}.webp`;
}

const items = [];
const seen = new Set();
for (const cat of CATEGORIES) {
  const text = await cached(`ninja/${cat.type}.json`, async () => JSON.stringify(await economy(LEAGUE, "exchange", cat.type)));
  const data = JSON.parse(text);
  const names = data.items.map((i) => i.name).filter((n) => !SKIP.has(n) && !seen.has(n) && (!cat.keep || cat.keep(n)));
  let missing = 0;
  for (const name of names) {
    const b = byName.get(name);
    if (!b) {
      missing++;
      console.warn(`  no RePoE entry for ${name}`);
      continue;
    }
    seen.add(name);
    const p = b.properties ?? {};
    const item = {
      slug: slugify(name),
      name,
      category: cat.id,
      icon: await icon(b, name),
      description: plain(p.description) || null,
      directions: plain(p.directions) || null,
      stack: p.stack_size ?? null,
      level: b.drop_level ?? null,
    };
    const ess = essenceMods.get(name);
    if (ess?.length) item.essence = ess;
    const sock = socketEffects.get(name);
    if (sock?.length) item.socket = sock;
    items.push(item);
  }
  console.log(`  ${cat.id}: ${names.length - missing} items`);
}

// Family order inside a category: "Lesser X", "X", "Greater X", "Perfect X" stay together.
const TIER = { Lesser: 0, Greater: 2, Perfect: 3 };
const tierOf = (n) => TIER[n.split(" ")[0]] ?? 1;
const family = (n) => n.replace(/^(Lesser|Greater|Perfect) /, "");
items.sort(
  (a, b) =>
    CATEGORIES.findIndex((c) => c.id === a.category) - CATEGORIES.findIndex((c) => c.id === b.category) ||
    family(a.name).localeCompare(family(b.name)) ||
    tierOf(a.name) - tierOf(b.name),
);

const dupes = items.filter((it, k) => items.findIndex((x) => x.slug === it.slug) !== k);
if (dupes.length) throw new Error(`duplicate slugs: ${dupes.map((d) => d.slug).join(", ")}`);

const out = {
  note: "Generated by scripts/currency-data.mjs from poe.ninja (item list), RePoE (texts, art) and Path of Building (essence and socketable effects).",
  league: LEAGUE,
  categories: CATEGORIES.map((c) => c.id),
  items,
};
await fs.writeFile(OUT, JSON.stringify(out, null, 1) + "\n");
console.log(`wrote ${path.relative(ROOT, OUT)}: ${items.length} items`);
