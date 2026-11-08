#!/usr/bin/env node
// Drafts a build guide's front matter from the poe.ninja ladder (facts only; write the text by hand).
//
// Usage: node scripts/draft-from-ninja.mjs "<Ascendancy>" "<Main skill>" [pick] [leagueUrl] [--char <account>/<name>]
//   pick: index in poe.ninja's character list for that filter (default 10, so not the single richest character)
//   --char: draft from that exact character instead (e.g. to refresh an existing ladder guide)
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

const argv = process.argv.slice(2);
const charIdx = argv.indexOf("--char");
const charArg = charIdx >= 0 ? argv.splice(charIdx, 2)[1] : null;
const [ascName, skillName, pickArg, leagueArg] = argv;
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
const who = charArg
  ? { account: charArg.slice(0, charArg.indexOf("/")), name: charArg.slice(charArg.indexOf("/") + 1) }
  : list[Math.min(pick, list.length - 1)];
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
// Weapon2/Offhand2 are the weapon set II (swap) slots.
const SLOTS = {
  Weapon: "weapon", Offhand: "offhand", Weapon2: "weapon2", Offhand2: "offhand2", Helm: "helmet", BodyArmour: "body",
  Gloves: "gloves", Boots: "boots", Amulet: "amulet", Ring: "ring1", Ring2: "ring2", Belt: "belt",
};
const isUnique = (d) => d.rarity === "Unique" || d.frameType === 3 || d.frameTypeId === 3;
// Rune and soul core lines, without "Bonded" lines (they only apply to another class).
const runeLines = (d) => (d.runeMods ?? []).filter((m) => !/\|Bonded\]/.test(m)).map(plain);
const gear = {};
for (const { itemData: d } of c.items) {
  const slot = SLOTS[d.inventoryId];
  if (!slot) continue;
  const runes = runeLines(d);
  if (isUnique(d)) {
    if (uniques.some((u) => u.name === d.name)) gear[slot] = { unique: d.name, ...(runes.length && { runes }) };
    else console.error(`NOTE ${slot}: unique "${d.name}" not in our data, slot left out`);
    continue;
  }
  const base = d.baseType?.replace(/^(Runeforged|Runemastered) /, "");
  const implicits = (d.implicitMods ?? []).map(plain);
  // Every modifier the item has: fractured, explicit, desecrated and crafted.
  const mods = [...(d.fracturedMods ?? []), ...(d.explicitMods ?? []), ...(d.desecratedMods ?? []), ...(d.craftedMods ?? [])].map(plain);
  gear[slot] = {
    ...(bases.some((b) => b.name === base) ? { base } : {}),
    ...(implicits.length && { implicits }),
    mods: [...new Set(mods)],
    ...(runes.length && { runes }),
  };
}

// Ladder popularity per slot: what the characters of this ascendancy + skill wear there ("Rare Boots" or a unique).
const SLOT_CLASSES = {
  helmet: ["Helmet"], body: ["Body Armour"], gloves: ["Gloves"], boots: ["Boots"], amulet: ["Amulet"],
  ring1: ["Ring"], ring2: ["Ring"], belt: ["Belt"],
  offhand: ["Shield", "Buckler", "Focus", "Quiver"], offhand2: ["Shield", "Buckler", "Focus", "Quiver"],
};
const WEAPONS = [
  "Bow", "Crossbow", "Spear", "Warstaff", "Quarterstaff", "Wand", "Staff", "Sceptre", "Talisman", "Flail", "Claw", "Dagger",
  "Mace", "One Hand Mace", "Two Hand Mace", "Sword", "One Hand Sword", "Two Hand Sword", "Axe", "One Hand Axe", "Two Hand Axe",
];
SLOT_CLASSES.weapon = SLOT_CLASSES.weapon2 = WEAPONS;
const classOf = (entry) =>
  entry.name.startsWith("Rare ") ? entry.name.slice(5) : uniques.find((u) => u.name === entry.name)?.class;
for (const [slot, piece] of Object.entries(gear)) {
  const fits = (cls) => Boolean(cls && SLOT_CLASSES[slot]?.includes(cls));
  const rows = (agg.dims.items ?? []).filter((e) => fits(classOf(e))).slice(0, 4);
  if (rows.length) piece.ladder = rows.map((e) => ({ name: e.name, pct: Math.round((100 * e.count) / agg.total) }));
}

// --- passives: notables/keystones ordered by distance from the class start, inside the character's own tree
const allocated = new Set(c.passiveSelection);
// Distances run through weapon-set nodes too: the shared tree can continue past them.
const reach = new Set([...allocated, ...(c.passiveSelectionSet1 ?? []), ...(c.passiveSelectionSet2 ?? [])]);
const adj = new Map();
for (const [a, b] of tree.edges) {
  if (!reach.has(a) && !tree.classes.some((k) => k.start === a)) continue;
  if (!reach.has(b) && !tree.classes.some((k) => k.start === b)) continue;
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
  // Nodes not connected to the class start (e.g. Dominion, granted without a path) cannot be pathed to.
  .filter((id) => node(id) && !node(id).a && ["notable", "keystone"].includes(node(id).t) && dist.has(id))
  .sort((a, b) => (dist.get(a) ?? 999) - (dist.get(b) ?? 999));
// Some ascendancies (e.g. Abyssal Lich) share the nodes of another one and are listed in `a2`.
const inAsc = (n) => n && (n.a === ascName || (n.a2 ?? []).includes(ascName));
const ascOrder = [...allocated].filter((id) => inAsc(node(id)) && node(id).t === "notable").map((id) => node(id).n);
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
  passives: {
    attribute,
    path: keyNodes.map((id) => node(id).n),
    ascendancy: ascOrder,
    // Weapon-set points (kept apart from passiveSelection by poe.ninja).
    ...Object.fromEntries(
      [1, 2]
        .map((set) => [
          `weaponSet${set}`,
          (c[`passiveSelectionSet${set}`] ?? [])
            .filter((id) => node(id) && ["notable", "keystone"].includes(node(id).t))
            .map((id) => node(id).n.trim()),
        ])
        .filter(([, names]) => names.length),
    ),
  },
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
