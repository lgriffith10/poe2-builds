#!/usr/bin/env node
// Snapshots ladder statistics from poe.ninja into src/data/generated/ladder.json (committed, read at build time).
// The site never calls poe.ninja at runtime.
//
// Usage: node scripts/sync-ninja.mjs [leagueUrl]   (default: forbiddenrites)

import fs from "node:fs/promises";
import path from "node:path";
import { search, snapshot } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src", "data", "generated", "ladder.json");
const LEAGUE = process.argv[2] ?? "forbiddenrites";
const MIN_ASCENDANCY = 100; // ignore base classes that only have a handful of characters

const isUnique = (name) => !/^(Rare|Magic|Normal) /.test(name);
const top = (rows, n, filter = () => true) =>
  rows.filter((r) => filter(r.name)).slice(0, n).map((r) => ({ name: r.name, count: r.count }));

const snap = await snapshot(LEAGUE);
console.log(`poe.ninja ${snap.league} snapshot ${snap.version}`);
const all = await search(snap);

const ascendancies = [];
for (const { name, count } of all.dims.class.filter((c) => c.count >= MIN_ASCENDANCY)) {
  const r = await search(snap, { class: name });
  ascendancies.push({
    name,
    count,
    skills: top(r.dims.skills, 12),
    uniques: top(r.dims.items, 10, isUnique),
    keystones: top(r.dims.keypassives, 6),
  });
  console.log(`  ${name}: ${count}`);
}

const ladder = {
  source: "poe.ninja",
  league: snap.league,
  snapshot: snap.version,
  fetchedAt: new Date().toISOString().slice(0, 10),
  total: all.total,
  skills: top(all.dims.skills, 25),
  uniques: top(all.dims.items, 25, isUnique),
  keystones: top(all.dims.keypassives, 15),
  ascendancies,
};
await fs.writeFile(OUT, JSON.stringify(ladder, null, 1) + "\n");
console.log(`wrote ${path.relative(ROOT, OUT)} (${all.total} characters, ${ascendancies.length} ascendancies)`);
