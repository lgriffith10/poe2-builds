#!/usr/bin/env node
// Snapshots how the ladder meta moved during the league (poe.ninja's "time machine": day-1 … week-N, then now) into
// src/data/generated/meta-history.json (committed, read at build time). One search request per point in time.
//
// Usage: node scripts/sync-meta-history.mjs [leagueUrl]   (default: the league of ladder.json)

import fs from "node:fs/promises";
import path from "node:path";
import { search, snapshot } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src", "data", "generated", "meta-history.json");
const ladder = JSON.parse(await fs.readFile(path.join(ROOT, "src", "data", "generated", "ladder.json"), "utf8"));
const STATE = "https://poe.ninja/poe2/api/data/index-state";
const leagueUrl = process.argv[2] ?? null;

const state = await (await fetch(STATE, { headers: { "user-agent": "ExileCodex data sync (offline script)" } })).json();
const entry = state.snapshotVersions.find((s) => (leagueUrl ? s.url === leagueUrl : s.name === ladder.league));
if (!entry) throw new Error(`League not found on poe.ninja: ${leagueUrl ?? ladder.league}`);
const snap = await snapshot(entry.url);

// Early days, then every week; the current snapshot closes the series.
const labels = entry.timeMachineLabels ?? [];
const order = (l) => (l.startsWith("day-") ? Number(l.slice(4)) : l.startsWith("week-") ? Number(l.slice(5)) * 7 : Infinity);
const picks = labels.filter((l) => ["day-1", "day-3"].includes(l) || l.startsWith("week-")).sort((a, b) => order(a) - order(b));

const TOP = 80;
const shares = (rows) => Object.fromEntries(rows.slice(0, TOP).map((r) => [r.name, r.count]));
const points = [];
for (const label of [...picks, "now"]) {
  const r = await search(snap, label === "now" ? {} : { timemachine: label });
  if (!r.total) continue;
  points.push({ label, day: label === "now" ? null : order(label), total: r.total, classes: shares(r.dims.class ?? []), skills: shares(r.dims.skills ?? []) });
  console.log(`  ${label}: ${r.total} characters`);
}

const history = { source: "poe.ninja", league: snap.league, fetchedAt: new Date().toISOString().slice(0, 10), points };
await fs.writeFile(OUT, JSON.stringify(history, null, 1) + "\n");
console.log(`wrote ${path.relative(ROOT, OUT)}: ${points.length} points`);
