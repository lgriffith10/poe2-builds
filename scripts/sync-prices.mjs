#!/usr/bin/env node
// Snapshots unique item prices from poe.ninja into src/data/generated/prices.json (committed, read at build time).
// Values are in Divine Orbs; the exchange rates to Exalted and Chaos Orbs are stored with them.
// Only uniques are priced: rare items have no meaningful single price.
//
// Usage: node scripts/sync-prices.mjs [League name]   (default: the league of the ladder snapshot)

import fs from "node:fs/promises";
import path from "node:path";
import { economy } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src", "data", "generated", "prices.json");
const ICONS = path.join(ROOT, "public", "img", "currency");
const ladder = JSON.parse(await fs.readFile(path.join(ROOT, "src", "data", "generated", "ladder.json"), "utf8"));
const LEAGUE = process.argv[2] ?? ladder.league;
const TYPES = ["UniqueWeapons", "UniqueArmours", "UniqueAccessories", "UniqueFlasks", "UniqueCharms", "UniqueJewels"];

const currency = await economy(LEAGUE, "exchange", "Currency");
const value = (id) => currency.lines.find((l) => l.id === id)?.primaryValue;
const exalted = value("exalted");
const chaos = value("chaos");
if (!exalted || !chaos) throw new Error("Could not read Exalted/Chaos rates from poe.ninja");

// Currency art for the price chips (poe.ninja serves it from the official CDN).
for (const id of ["divine", "exalted", "chaos"]) {
  const item = currency.core.items.find((i) => i.id === id);
  const file = path.join(ICONS, `price-${id}.png`);
  try {
    await fs.access(file);
  } catch {
    if (item?.image) await fs.writeFile(file, Buffer.from(await (await fetch(`https://web.poecdn.com${item.image}`)).arrayBuffer()));
  }
}

const uniques = {};
for (const type of TYPES) {
  const data = await economy(LEAGUE, "stash", type);
  // Several lines per unique (Runeforged/Runemastered bases, corrupted copies): keep the plain, uncorrupted one
  // with the most listings.
  for (const l of data.lines) {
    if (l.corrupted || /^(Runeforged|Runemastered) /.test(l.baseType ?? "")) continue;
    const prev = uniques[l.name];
    if (!prev || l.listingCount > prev.listings) uniques[l.name] = { div: Number(l.primaryValue.toPrecision(4)), listings: l.listingCount };
  }
  console.log(`  ${type}: ${data.lines.length} lines`);
}

const prices = {
  source: "poe.ninja",
  league: LEAGUE,
  fetchedAt: new Date().toISOString().slice(0, 10),
  /** How many Exalted / Chaos Orbs one Divine Orb is worth. */
  rates: { exalted: Math.round(1 / exalted), chaos: Number((1 / chaos).toFixed(2)) },
  uniques,
};
await fs.writeFile(OUT, JSON.stringify(prices, null, 1) + "\n");
console.log(`wrote ${path.relative(ROOT, OUT)}: ${Object.keys(uniques).length} uniques, 1 divine = ${prices.rates.exalted} exalted`);
