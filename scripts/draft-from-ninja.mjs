#!/usr/bin/env node
// Drafts a build guide's front matter from the poe.ninja ladder (facts only; write the text by hand).
//
// Usage: node scripts/draft-from-ninja.mjs "<Ascendancy>" "<Main skill>" [pick] [leagueUrl]
//   pick: index in poe.ninja's character list for that filter (default 10, so not the single richest character)
//
// Prints the YAML front matter to stdout and ladder statistics to stderr:
//   - skills, supports, gear and passives come from one representative character;
//   - stderr shows how common each support and unique is among all characters with that ascendancy and skill.

import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { character, characters, search, snapshot } from "./ninja-lib.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const tree = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/tree.json")));
const gems = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/gems.json")));
const uniques = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/uniques.json")));
const bases = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/bases.json")));

const [ascName, skillName, pickArg, leagueArg] = process.argv.slice(2);
if (!ascName || !skillName) {
  console.error('Usage: node scripts/draft-from-ninja.mjs "<Ascendancy>" "<Main skill>" [pick] [leagueUrl]');
  process.exit(1);
}
const pick = Number(pickArg ?? 10);
const snap = await snapshot(leagueArg ?? "forbiddenrites");

const filters = { class: ascName, skills: skillName };
const agg = await search(snap, filters);
const list = await characters(snap, filters);
if (!list.length) throw new Error(`No ladder characters for ${ascName} / ${skillName}`);
const who = list[Math.min(pick, list.length - 1)];
const c = await character(snap, who.account, who.name);

// "[Tag|Shown text]" and "[Tag]" markup in poe.ninja mod text -> plain text.
const plain = (s) => s.replace(/\[([^\]|]+)\|([^\]]+)\]/g, "$2").replace(/\[([^\]]+)\]/g, "$1").replace(/\n/g, " ");
const knownGem = (n) => gems.some((g) => g.name === n);

// --- skills: socket groups whose first gem is an active gem we know -----------------------------
// A group can hold a meta gem (e.g. "Fire Spell on Hit") followed by the spell it triggers: the spell gets the
// supports and a note, the meta gem is listed on its own.
const skills = [];
for (const group of c.skills) {
  const actives = group.allGems.filter((g) => !g.itemData.support && knownGem(g.name)).map((g) => g.name);
  const supports = group.allGems.filter((g) => g.itemData.support && knownGem(g.name)).map((g) => g.name);
  if (!actives.length || skills.some((s) => s.gem === actives.at(-1))) continue;
  if (actives.length === 1) skills.push({ gem: actives[0], supports });
  else {
    const [host, ...spells] = actives;
    for (const spell of spells) skills.push({ gem: spell, supports, note: `Socketed in ${host}` });
    skills.push({ gem: host, supports: [], note: `Holds ${spells.join(", ")}` });
  }
}
// Main skill first.
skills.sort((a, b) => (b.gem === skillName) - (a.gem === skillName));

// --- gear ----------------------------------------------------------------------------------------
const SLOTS = { Weapon: "weapon", Offhand: "offhand", Helm: "helmet", BodyArmour: "body", Gloves: "gloves", Boots: "boots", Amulet: "amulet", Ring: "ring1", Ring2: "ring2", Belt: "belt" };
const gear = {};
for (const { itemData: d } of c.items) {
  const slot = SLOTS[d.inventoryId];
  if (!slot) continue;
  if (d.rarity === "Unique") {
    if (uniques.some((u) => u.name === d.name)) gear[slot] = { unique: d.name };
    else console.error(`NOTE ${slot}: unique "${d.name}" not in our data, slot left out`);
    continue;
  }
  const base = d.baseType?.replace(/^(Runeforged|Runemastered) /, "");
  gear[slot] = {
    ...(bases.some((b) => b.name === base) ? { base } : {}),
    mods: (d.explicitMods ?? []).map(plain).slice(0, 6),
  };
}

// --- passives: notables/keystones ordered by distance from the class start, inside the character's own tree
const allocated = new Set(c.passiveSelection);
const adj = new Map();
for (const [a, b] of tree.edges) {
  if (!allocated.has(a) && !tree.classes.some((k) => k.start === a)) continue;
  if (!allocated.has(b) && !tree.classes.some((k) => k.start === b)) continue;
  (adj.get(a) ?? adj.set(a, []).get(a)).push(b);
  (adj.get(b) ?? adj.set(b, []).get(b)).push(a);
}
const cls = tree.classes.find((k) => k.ascendancies.some((a) => a.name === ascName));
const dist = new Map([[cls.start, 0]]);
for (const queue = [cls.start]; queue.length; ) {
  const n = queue.shift();
  for (const m of adj.get(n) ?? []) if (!dist.has(m)) { dist.set(m, dist.get(n) + 1); queue.push(m); }
}
const node = (id) => tree.nodes[id];
const keyNodes = [...allocated]
  .filter((id) => node(id) && !node(id).a && ["notable", "keystone"].includes(node(id).t))
  .sort((a, b) => (dist.get(a) ?? 999) - (dist.get(b) ?? 999));
const ascOrder = [...allocated].filter((id) => node(id)?.a === ascName && node(id).t === "notable").map((id) => node(id).n);
const attrCount = { str: 0, dex: 0, int: 0 };
for (const v of Object.values(c.passiveSkillOverrides ?? {})) {
  const m = String(v).match(/generic_attribute_(strength|dexterity|intelligence)/);
  if (m) attrCount[{ strength: "str", dexterity: "dex", intelligence: "int" }[m[1]]]++;
}
const attribute = Object.entries(attrCount).sort((a, b) => b[1] - a[1])[0][0];

const fm = {
  title: `${skillName} ${ascName}`,
  class: cls.name,
  ascendancy: ascName,
  author: "Exile Codex",
  updated: new Date().toISOString().slice(0, 10),
  patch: "0.5.5",
  source: {
    title: `${snap.league} ladder: ${ascName} using ${skillName}`,
    author: `${c.name} (poe.ninja)`,
    url: `https://poe.ninja/poe2/builds/${snap.overview.replace(/-/g, "")}/character/${encodeURIComponent(who.account)}/${encodeURIComponent(who.name)}`,
    updated: (c.lastSeenUtc ?? c.updatedUtc ?? "").slice(0, 10),
  },
  origin: "ladder",
  summary: "TODO",
  tags: [],
  damage: "TODO",
  playstyle: "TODO",
  difficulty: "medium",
  budget: "high",
  pros: [],
  cons: [],
  skills,
  gear,
  passives: { attribute, path: keyNodes.map((id) => node(id).n), ascendancy: ascOrder },
};
const doc = new YAML.Document(fm);
YAML.visit(doc, {
  Seq(_, node, path) {
    const key = path.at(-1)?.key?.value;
    if (["supports", "mods", "ascendancy", "tags", "pros", "cons"].includes(key)) node.flow = true;
  },
});
process.stdout.write(`---\n${doc.toString({ lineWidth: 0, flowCollectionPadding: false })}---\n`);

// --- ladder statistics for the write-up --------------------------------------------------------
const share = (n) => `${((100 * n) / agg.total).toFixed(0)}%`;
console.error(`${ascName} + ${skillName}: ${agg.total} ladder characters; drafted from #${pick} ${who.name} (level ${c.level})`);
const main = skills.find((s) => s.gem === skillName);
if (main) console.error(`supports of ${skillName} on ladder: ${main.supports.map((s) => `${s} ${share(agg.dims.allskills?.find((x) => x.name === s)?.count ?? 0)}`).join(", ")}`);
console.error(`top uniques: ${agg.dims.items.filter((x) => !/^(Rare|Magic|Normal) /.test(x.name)).slice(0, 8).map((x) => `${x.name} ${share(x.count)}`).join(", ")}`);
console.error(`top key passives: ${agg.dims.keypassives.slice(0, 8).map((x) => `${x.name} ${share(x.count)}`).join(", ")}`);
console.error(`other skills: ${agg.dims.skills.slice(0, 10).map((x) => `${x.name} ${share(x.count)}`).join(", ")}`);
