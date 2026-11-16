#!/usr/bin/env node
// Compiles the mechanic sub-trees of the Atlas passive tree (src/data/generated/atlas.json) from RePoE's Atlas.json:
// Breach, Ritual, Delirium, Expedition, Abyss and Incursion (Vaal Temple). Guides draw them with ```atlas blocks
// (see src/lib/atlas-tree.ts). Positions follow the game: group centre plus orbit radius at the node's orbit slot.
//
// Usage: node scripts/atlas-data.mjs   (delete .cache/raw/Atlas.json to fetch a fresh copy)

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".cache", "raw", "Atlas.json");
const OUT = path.join(ROOT, "src", "data", "generated", "atlas.json");
const URL = "https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.min.json";

async function load() {
  try {
    return await fs.readFile(RAW, "utf8");
  } catch {
    console.log(`downloading ${URL}`);
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`${res.status} ${URL}`);
    const text = await res.text();
    await fs.mkdir(path.dirname(RAW), { recursive: true });
    await fs.writeFile(RAW, text);
    return text;
  }
}

const atlas = JSON.parse(await load());
const { passives, groups, orbit_radii: radii, skills_per_orbit: perOrbit } = atlas;

/** "[ContainsBreach|Breach] Hives" -> "Breach Hives" */
const clean = (s) => s.replace(/\[([^|\]]*)\|([^\]]*)\]/g, "$2").replace(/\[([^\]]*)\]/g, "$1");
const lines = (v) => (Array.isArray(v) ? v : v ? [v] : []).flatMap((s) => clean(String(s)).split("\n")).filter(Boolean);
const round = (n) => Math.round(n * 10) / 10;

const place = new Map(); // hash -> { x, y, group, orbit, angle }
groups.forEach((g, gi) => {
  for (const p of g.passives) {
    const r = radii[p.radius] ?? 0;
    const angle = (2 * Math.PI * p.position_clockwise) / (perOrbit[p.radius] || 1);
    place.set(p.hash, { x: g.x + r * Math.sin(angle), y: g.y - r * Math.cos(angle), group: gi, orbit: p.radius, angle });
  }
});

const trees = {};
for (const [hash, node] of Object.entries(passives)) {
  const sub = node.atlas_subtree?.id;
  if (!sub) continue;
  const at = place.get(Number(hash));
  if (!at) throw new Error(`atlas node ${hash} has no position`);
  const tree = (trees[sub] ??= { root: 0, nodes: {}, edges: [] });
  const kind = node.name === "" ? "root" : node.is_keystone ? "keystone" : node.is_notable ? "notable" : "small";
  if (kind === "root") tree.root = Number(hash);
  tree.nodes[hash] = { x: round(at.x), y: round(at.y), name: node.name, kind, stats: lines(node.stat_text) };
}

const seen = new Set();
groups.forEach((g) => {
  for (const p of g.passives) {
    for (const other of p.connections) {
      const key = [p.hash, other].sort((a, b) => a - b).join("-");
      if (seen.has(key)) continue;
      seen.add(key);
      const sub = passives[p.hash]?.atlas_subtree?.id;
      if (!sub || passives[other]?.atlas_subtree?.id !== sub) continue;
      const a = place.get(p.hash);
      const b = place.get(other);
      // Same orbit of the same group: the game draws an arc along the orbit circle.
      const arc = a.group === b.group && a.orbit === b.orbit && a.orbit > 0 ? radii[a.orbit] : 0;
      let sweep = 0;
      if (arc) {
        let d = b.angle - a.angle;
        while (d <= -Math.PI) d += 2 * Math.PI;
        while (d > Math.PI) d -= 2 * Math.PI;
        sweep = d > 0 ? 1 : 0;
      }
      trees[sub].edges.push(arc ? [p.hash, other, arc, sweep] : [p.hash, other]);
    }
  }
});

for (const [id, t] of Object.entries(trees)) {
  if (!t.root) throw new Error(`atlas sub-tree ${id} has no root`);
  const notables = Object.values(t.nodes).filter((n) => n.kind === "notable" || n.kind === "keystone").length;
  console.log(`${id}: ${Object.keys(t.nodes).length} nodes, ${notables} notables and keystones, ${t.edges.length} links`);
}
await fs.writeFile(OUT, JSON.stringify({ source: URL, trees }) + "\n");
console.log(`wrote ${path.relative(ROOT, OUT)}`);
