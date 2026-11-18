#!/usr/bin/env node
// Prices the loot of each endgame mechanic for the loot tier lists of the mechanic pages (/farming/<id>).
// Each content/farming/<id>.md lists its loot in its front matter:
//
//   loot:
//     exchange: ["Breach"]                 whole poe.ninja exchange categories
//     items: ["Breachlord Sac", ...]       single items, looked up in every exchange category
//     uniques: ["Skin of the Loyal", ...]  unique items (poe.ninja stash prices)
//     exclude: ["Omen of Light"]           names to leave out of the categories above
//
// Writes src/data/generated/mechanic-loot.json: price in Divine Orbs and how much of it trades (exchange volume in
// Divine Orbs per day, or unique listings), so thinly traded items can be told apart. Missing icons are saved in
// public/img/loot.
//
// Usage: node scripts/sync-loot.mjs [League name]   (default: the league of the ladder snapshot)

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { economy } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src", "data", "generated", "mechanic-loot.json");
const ICONS = path.join(ROOT, "public", "img", "loot");
const read = async (p) => JSON.parse(await fs.readFile(path.join(ROOT, p), "utf8"));
const ladder = await read("src/data/generated/ladder.json");
const LEAGUE = process.argv[2] ?? ladder.league;
const currencyWiki = await read("src/data/generated/currency.json");
const uniquesData = await read("src/data/generated/uniques.json");
const gems = await read("src/data/generated/gems.json");
const localIcon = new Map(
  [...currencyWiki.items, ...uniquesData, ...gems].filter((x) => x.icon).map((x) => [x.name, x.icon]),
);

const EXCHANGE = ["Currency", "Fragments", "Breach", "Ritual", "Delirium", "Abyss", "Expedition", "Runes", "SoulCores", "Idols", "Essences", "LineageSupportGems"];
const UNIQUES = ["UniqueWeapons", "UniqueArmours", "UniqueAccessories", "UniqueFlasks", "UniqueCharms", "UniqueJewels"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Exchange items by name, with their category.
const exchange = new Map();
for (const type of EXCHANGE) {
  const data = await economy(LEAGUE, "exchange", type);
  const lines = new Map(data.lines.map((l) => [l.id, l]));
  for (const item of data.items) {
    const l = lines.get(item.id);
    if (l && l.primaryValue > 0) exchange.set(item.name, { type, image: item.image, div: l.primaryValue, volume: l.volumePrimaryValue ?? 0 });
  }
  await sleep(300);
}
const exalted = exchange.get("Exalted Orb")?.div;
if (!exalted) throw new Error("Could not read the Exalted Orb rate from poe.ninja");

// Uniques: the plain, uncorrupted line with the most listings.
const uniques = new Map();
for (const type of UNIQUES) {
  const data = await economy(LEAGUE, "stash", type);
  for (const l of data.lines) {
    if (l.corrupted || /^(Runeforged|Runemastered) /.test(l.baseType ?? "")) continue;
    const prev = uniques.get(l.name);
    if (!prev || l.listingCount > prev.listings) uniques.set(l.name, { image: l.icon, div: l.primaryValue, listings: l.listingCount });
  }
  await sleep(300);
}

await fs.mkdir(ICONS, { recursive: true });
async function icon(name, remote) {
  if (localIcon.has(name)) return localIcon.get(name);
  if (!remote) return null;
  const file = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.png`;
  try {
    await fs.access(path.join(ICONS, file));
  } catch {
    const url = remote.startsWith("http") ? remote : `https://web.poecdn.com${remote}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    await fs.writeFile(path.join(ICONS, file), Buffer.from(await res.arrayBuffer()));
  }
  return `/img/loot/${file}`;
}

const DIR = path.join(ROOT, "content", "farming");
const mechanics = {};
let missing = 0;
for (const file of (await fs.readdir(DIR)).filter((f) => f.endsWith(".md")).sort()) {
  const id = file.replace(/\.md$/, "");
  const loot = matter(await fs.readFile(path.join(DIR, file), "utf8")).data.loot ?? {};
  const exclude = new Set(loot.exclude ?? []);
  const out = new Map();
  for (const [name, e] of exchange) {
    if ((loot.exchange ?? []).includes(e.type) && !exclude.has(name)) out.set(name, { name, kind: "exchange", ...e });
  }
  for (const name of loot.items ?? []) {
    const e = exchange.get(name);
    if (e) out.set(name, { name, kind: "exchange", ...e });
    else {
      console.warn(`  ⚠ ${id}: "${name}" is not on the poe.ninja exchange`);
      missing++;
    }
  }
  for (const name of loot.uniques ?? []) {
    const u = uniques.get(name);
    if (u) out.set(name, { name, kind: "unique", ...u });
    else {
      console.warn(`  ⚠ ${id}: unique "${name}" has no poe.ninja price`);
      missing++;
    }
  }
  const items = [];
  for (const it of out.values()) {
    items.push({
      name: it.name,
      kind: it.kind,
      div: Number(it.div.toPrecision(3)),
      ...(it.kind === "exchange" ? { volume: Number(it.volume.toPrecision(3)) } : { listings: it.listings }),
      icon: await icon(it.name, it.image),
    });
  }
  mechanics[id] = items.sort((a, b) => b.div - a.div);
  console.log(`${id}: ${items.length} items`);
}

const data = { source: "poe.ninja", league: LEAGUE, fetchedAt: new Date().toISOString().slice(0, 10), exalted: Math.round(1 / exalted), mechanics };
await fs.writeFile(OUT, `${JSON.stringify(data, null, 1)}\n`);
console.log(`wrote ${path.relative(ROOT, OUT)} (1 divine = ${data.exalted} exalted)${missing ? `, ${missing} names not found` : ""}`);
