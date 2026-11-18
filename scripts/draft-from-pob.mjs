#!/usr/bin/env node
// Drafts a build guide's front matter from a content creator's Path of Building (facts only; write the text by hand).
//
// Usage: node scripts/draft-from-pob.mjs <pob> [options]
//   <pob>: a pobb.in link, a poe.ninja/poe2/pob link, or a raw PoB export code
//   --title "<video or guide title>" --url <video url> --creator "<name>" [--date YYYY-MM-DD]   source credit
//   --spec <n>      passive tree (PoB spec, 1-based) used for `passives`; default: the active one
//   --skills <n>    skill set used for `skills`; default: the active one
//   --items <n>     item set used for `gear`; default: the active one
//   --stages campaign=<n>,mapping=<n>,endgame=<n>,minmax=<n>   item sets for `gearStages` (by id)
//   --trees leveling=<n>,mapping=<n>,endgame=<n>,minmax=<n>   specs written to content/builds/trees/<slug>.json
//   --slug <slug>   needed with --trees
//   --main "<skill>" main skill, listed first (PoB's own main skill is often just the first group)
//   --notes         also print the PoB notes to stderr (to read, never to copy)
//
// Prints the YAML front matter to stdout and the content of the PoB (specs, skill sets, item sets) to stderr.

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import YAML from "yaml";
import { nameRunes, pieceClass } from "./rune-names.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const tree = JSON.parse(fs.readFileSync(path.join(ROOT, "public/data/tree.json")));
const gems = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/gems.json")));
const uniques = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/uniques.json")));
const bases = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/generated/bases.json")));

// --- arguments -----------------------------------------------------------------------------------
const argv = process.argv.slice(2);
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv.splice(i, 2)[1] : null;
};
const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? (argv.splice(i, 1), true) : false;
};
const o = {
  title: opt("title"), url: opt("url"), creator: opt("creator"), date: opt("date"),
  spec: opt("spec"), skills: opt("skills"), items: opt("items"), stages: opt("stages"), trees: opt("trees"),
  slug: opt("slug"), main: opt("main"), notes: flag("notes"),
};
const input = argv[0];
if (!input) {
  console.error("Usage: node scripts/draft-from-pob.mjs <pobb.in link | poe.ninja pob link | code> [--title … --url … --creator …]");
  process.exit(1);
}
const pairs = (s) => Object.fromEntries((s ?? "").split(",").filter(Boolean).map((p) => p.split("=")));

// --- fetch and decode ----------------------------------------------------------------------------
async function fetchCode(s) {
  const pobb = s.match(/pobb\.in\/([\w-]+)/);
  const ninja = s.match(/poe\.ninja\/poe2\/pob\/(?:raw\/)?([\w-]+)/);
  const url = pobb ? `https://pobb.in/${pobb[1]}/raw` : ninja ? `https://poe.ninja/poe2/pob/raw/${ninja[1]}` : null;
  if (!url) return s;
  const res = await fetch(url, { headers: { "User-Agent": "ExileCodex/0.1 (PoE2 build site; creator build drafts)" } });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return (await res.text()).trim();
}
const code = await fetchCode(input);
const xml = zlib.inflateSync(Buffer.from(code.replace(/-/g, "+").replace(/_/g, "/"), "base64")).toString("utf8");

const unescape = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&amp;/g, "&");
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? unescape(m[1]) : null;
};
const ids = (s) => (s ?? "").split(",").map(Number).filter((n) => Number.isFinite(n) && n > 0);

const build = xml.match(/<Build\b[^>]*>/)[0];
const className = attr(build, "className");
const ascName = attr(build, "ascendClassName");
const level = Number(attr(build, "level"));
const cls = tree.classes.find((k) => k.name === className);
if (!cls || !cls.ascendancies.some((a) => a.name === ascName)) throw new Error(`Unknown class/ascendancy ${className}/${ascName}`);

// --- PoB content ---------------------------------------------------------------------------------
const ATTR = { str: 0, dex: 1, int: 2 };
const specs = [...xml.matchAll(/<Spec\b([^>]*?)(?:\/>|>([\s\S]*?)<\/Spec>)/g)].map((m, i) => {
  const nodes = ids(attr(m[1], "nodes"));
  const weaponSets = {};
  for (const w of (m[2] ?? "").matchAll(/<WeaponSet([12])\b[^>]*>/g))
    for (const id of ids(attr(w[0], "nodes"))) if (nodes.includes(id)) weaponSets[id] = Number(w[1]);
  const attributes = {};
  const ov = (m[2] ?? "").match(/<AttributeOverride\b[^>]*>/)?.[0] ?? "";
  for (const [k, v] of Object.entries(ATTR)) for (const id of ids(attr(ov, `${k}Nodes`))) attributes[id] = v;
  return { id: i + 1, title: attr(m[1], "title") ?? `Tree ${i + 1}`, version: attr(m[1], "treeVersion"), nodes, weaponSets, attributes };
});
const activeSpec = Number(attr(xml.match(/<Tree\b[^>]*>/)?.[0] ?? "", "activeSpec") ?? 1);

const skillSets = [...xml.matchAll(/<SkillSet\b([^>]*)>([\s\S]*?)<\/SkillSet>/g)].map((m) => ({
  id: attr(m[1], "id"), title: attr(m[1], "title") ?? "", body: m[2],
}));
if (!skillSets.length) skillSets.push({ id: "1", title: "", body: xml.match(/<Skills\b[^>]*>([\s\S]*?)<\/Skills>/)?.[1] ?? "" });
const activeSkillSet = attr(xml.match(/<Skills\b[^>]*>/)?.[0] ?? "", "activeSkillSet") ?? "1";

const itemText = new Map([...xml.matchAll(/<Item\b([^>]*)>([\s\S]*?)<\/Item>/g)].map((m) => [attr(m[1], "id"), m[2]]));
const itemSets = [...xml.matchAll(/<ItemSet\b([^>]*)>([\s\S]*?)<\/ItemSet>/g)].map((m) => ({
  id: attr(m[1], "id"), title: attr(m[1], "title") ?? "", body: m[2],
}));
const activeItemSet = attr(xml.match(/<Items\b[^>]*>/)?.[0] ?? "", "activeItemSet") ?? "1";

// --- skills --------------------------------------------------------------------------------------
const gemByName = new Map(gems.map((g) => [g.name, g]));
// PoB's main skill: `mainSocketGroup` of <Build>, a 1-based index over the groups of the active skill set.
const mainGroup = Number(attr(build, "mainSocketGroup") ?? 0);
function skillsOf(set) {
  const out = [];
  let mainSkill = null;
  for (const [i, m] of [...set.body.matchAll(/<Skill\b([^>]*)>([\s\S]*?)<\/Skill>/g)].entries()) {
    if (attr(m[1], "enabled") === "false") continue;
    const names = [...m[2].matchAll(/<Gem\b[^>]*>/g)]
      .filter((g) => attr(g[0], "enabled") !== "false")
      .map((g) => attr(g[0], "nameSpec"))
      .filter((n) => gemByName.has(n));
    const actives = names.filter((n) => gemByName.get(n).type !== "support");
    const supports = names.filter((n) => gemByName.get(n).type === "support");
    // Item-granted skills (no gem of ours) are left out; they show with their item.
    if (!actives.length || out.some((s) => s.gem === actives.at(-1))) continue;
    const ws = /Swap/.test(attr(m[1], "slot") ?? "") ? { weaponSet: 2 } : {};
    if (actives.length === 1) out.push({ gem: actives[0], supports, ...ws });
    else if (!gemByName.get(actives[0]).tags?.includes("meta")) {
      // Two skills in one group without a meta gem: listed apart, the supports with the first.
      actives.forEach((g, k) => out.push({ gem: g, supports: k ? [] : supports, ...ws }));
    } else {
      // A meta gem (Spell Totem, Cast on Critical, Blasphemy…) holding other skills: they get the supports.
      const [host, ...held] = actives;
      for (const g of held) out.push({ gem: g, supports: [...supports], note: `Socketed in ${host}`, ...ws });
      out.push({ gem: host, supports: [], note: `Holds ${held.join(", ")}`, ...ws });
    }
    if (i + 1 === mainGroup) mainSkill = actives.at(-1);
  }
  // Main skill first.
  const main = o.main ?? mainSkill;
  return out.sort((a, b) => (b.gem === main) - (a.gem === main));
}

// --- gear ----------------------------------------------------------------------------------------
const SLOTS = {
  "Weapon 1": "weapon", "Weapon 2": "offhand", "Weapon 1 Swap": "weapon2", "Weapon 2 Swap": "offhand2",
  Helmet: "helmet", "Body Armour": "body", Gloves: "gloves", Boots: "boots", Amulet: "amulet",
  "Ring 1": "ring1", "Ring 2": "ring2", Belt: "belt",
};
const META = /^(Unique ID|Item Level|LevelReq|Quality|Sockets|Rune|Radius|Limited to|Corrupted|Requires|Catalyst|Talisman Tier|Evasion|Armour|Energy Shield|Ward|Spirit|Prefix|Suffix|Implicits|Selected Variant|Variant|League|Has Alt Variant|Crafted|Mirrored|Unreleased|Source|Upgrade|BasePercentile|ArmourBasePercentile|EvasionBasePercentile|EnergyShieldBasePercentile)\b.*:/;
// Magic items are named "<prefix> <base> of <suffix>": the longest base name the item name contains.
const magicBase = (name) =>
  bases.map((b) => b.name).filter((b) => name.includes(b)).sort((a, b) => b.length - a.length)[0] ?? name;
function parseItem(text) {
  const lines = unescape(text).replace(/<ModRange[^>]*\/>/g, "").split("\n").map((l) => l.trim()).filter(Boolean);
  const rarity = (lines.shift().replace(/^Rarity:\s*/, "") || "NORMAL").toUpperCase();
  const named = rarity === "RARE" || rarity === "UNIQUE";
  const name = lines.shift();
  const base = named ? lines.shift() : name;
  const implicitCount = Number(lines.find((l) => /^Implicits:/.test(l))?.match(/\d+/)?.[0] ?? 0);
  const after = lines.slice(lines.findIndex((l) => /^Implicits:/.test(l)) + 1);
  const clean = (l) => l.replace(/\{[^}]*\}/g, "").trim();
  const body = after.filter((l) => !META.test(l) && l !== "Corrupted");
  // The implicit block counts the rune lines too; enchants (anoints, corruptions) are kept with the implicits.
  const isRune = (l) => /\{rune\}/.test(l);
  const head = body.slice(0, implicitCount);
  // Rune lines, without "Bonded" lines (they only apply to another class).
  const runes = body.filter((l) => isRune(l) && !/^Bonded:/.test(clean(l))).map(clean);
  const implicits = head.filter((l) => !isRune(l)).map(clean);
  const mods = body.slice(implicitCount).filter((l) => !isRune(l)).map(clean);
  return { rarity, name, base: named ? base : magicBase(base), implicits, mods, runes };
}
function gearOf(set) {
  const gear = {};
  for (const m of set.body.matchAll(/<Slot\b[^>]*>/g)) {
    const slot = SLOTS[attr(m[0], "name")];
    const id = attr(m[0], "itemId");
    if (!slot || !id || id === "0" || !itemText.has(id)) continue;
    const it = parseItem(itemText.get(id));
    if (it.rarity === "UNIQUE") {
      if (!uniques.some((u) => u.name === it.name)) {
        console.error(`NOTE ${slot}: unique "${it.name}" not in our data, slot left out`);
        continue;
      }
      const runes = nameRunes(it.runes, pieceClass({ unique: it.name }));
      gear[slot] = { unique: it.name, ...(runes.length && { runes }) };
      continue;
    }
    const base = it.base?.replace(/^(Runeforged|Runemastered) /, "");
    const boost = Number(it.mods.join("\n").match(/(\d+)% increased effect of Socketed Augment Items/)?.[1] ?? 0);
    const runes = nameRunes(it.runes, pieceClass({ base }), boost);
    gear[slot] = {
      ...(bases.some((b) => b.name === base) ? { base } : (console.error(`NOTE ${slot}: base "${base}" not in our data`), {})),
      ...(it.implicits.length && { implicits: it.implicits }),
      mods: [...new Set(it.mods)],
      ...(runes.length && { runes }),
    };
  }
  return gear;
}

// --- passives ------------------------------------------------------------------------------------
const node = (id) => tree.nodes[id];
const isStart = (id) => tree.classes.some((k) => k.start === id);
/** Allocated nodes ordered by distance from the class start, inside the allocated tree (an allocation order). */
function byDistance(nodes) {
  const reach = new Set(nodes);
  const adj = new Map();
  for (const [a, b] of tree.edges) {
    if ((!reach.has(a) && !isStart(a)) || (!reach.has(b) && !isStart(b))) continue;
    (adj.get(a) ?? adj.set(a, []).get(a)).push(b);
    (adj.get(b) ?? adj.set(b, []).get(b)).push(a);
  }
  // An item can let the tree grow from another class's start: that start is a root too.
  // Classes can share a start (Witch/Sorceress): prefer the one the jewel names.
  const named = unescape(xml).match(/from the (\w+)'s starting point/)?.[1];
  const others = tree.classes.filter((k) => k.start !== cls.start && (adj.get(k.start) ?? []).some((m) => reach.has(m)));
  const other = others.find((k) => k.name === named) ?? others[0];
  const starts = [cls.start, ...(other ? [other.start] : [])];
  const dist = new Map(starts.map((st) => [st, 0]));
  for (const queue = [...starts]; queue.length; ) {
    const n = queue.shift();
    for (const m of adj.get(n) ?? []) if (!dist.has(m)) { dist.set(m, dist.get(n) + 1); queue.push(m); }
  }
  const ordered = nodes.filter((id) => node(id) && node(id).t !== "start").sort((a, b) => (dist.get(a) ?? 999) - (dist.get(b) ?? 999));
  return { dist, ordered, startFrom: other?.name ?? null };
}
const inAsc = (n) => n && (n.a === ascName || (n.a2 ?? []).includes(ascName));
function passivesOf(spec) {
  const { dist, ordered, startFrom } = byDistance(spec.nodes);
  const key = (id) => !node(id).a && ["notable", "keystone"].includes(node(id).t) && dist.has(id);
  const shared = ordered.filter((id) => !spec.weaponSets[id] && key(id));
  const count = { str: 0, dex: 0, int: 0 };
  for (const v of Object.values(spec.attributes)) count[Object.keys(ATTR)[v]]++;
  return {
    attribute: Object.entries(count).sort((a, b) => b[1] - a[1])[0][0],
    ...(startFrom && { startFrom }),
    path: shared.map((id) => node(id).n.trim()),
    ascendancy: spec.nodes.filter((id) => inAsc(node(id)) && node(id).t === "notable").map((id) => node(id).n.trim()),
    ...Object.fromEntries(
      [1, 2]
        .map((set) => [`weaponSet${set}`, ordered.filter((id) => spec.weaponSets[id] === set && key(id)).map((id) => node(id).n.trim())])
        .filter(([, names]) => names.length),
    ),
  };
}

// --- report the PoB content ----------------------------------------------------------------------
const unknownNodes = specs.flatMap((s) => s.nodes.filter((id) => !node(id)));
console.error(`${className} / ${ascName}, level ${level}`);
for (const s of specs) console.error(`spec ${s.id}${s.id === activeSpec ? "*" : ""}: "${s.title}" (${s.nodes.length} nodes, tree ${s.version})`);
for (const s of skillSets) console.error(`skill set ${s.id}${s.id === activeSkillSet ? "*" : ""}: "${s.title}" → ${skillsOf(s).map((k) => k.gem).join(", ")}`);
for (const s of itemSets) console.error(`item set ${s.id}${s.id === activeItemSet ? "*" : ""}: "${s.title}"`);
const allUniques = [...itemText.values()].map(parseItem).filter((it) => it.rarity === "UNIQUE").map((it) => it.name);
console.error(`uniques in the PoB (all sets, jewels included): ${[...new Set(allUniques)].join(", ")}`);
if (unknownNodes.length) console.error(`WARN ${unknownNodes.length} node ids not in our tree (other tree version?): ${[...new Set(unknownNodes)].slice(0, 10).join(", ")}`);
if (o.notes) console.error(`--- notes ---\n${unescape(xml.match(/<Notes>([\s\S]*?)<\/Notes>/)?.[1] ?? "").replace(/\^[0-9xA-F]{1,7}/g, "").trim()}`);

// --- draft ---------------------------------------------------------------------------------------
const pick = (list, id, active) => list.find((s) => String(s.id) === String(id ?? active)) ?? list[0];
const spec = pick(specs, o.spec, activeSpec);
const skills = skillsOf(pick(skillSets, o.skills, activeSkillSet));
const gearStages = Object.fromEntries(
  Object.entries(pairs(o.stages)).map(([stage, id]) => [stage, gearOf(pick(itemSets, id, activeItemSet))]),
);
const gear = gearStages.endgame ?? gearOf(pick(itemSets, o.items, activeItemSet));

const fm = {
  title: `TODO ${ascName}`,
  class: className,
  ascendancy: ascName,
  author: "Exile Codex",
  updated: new Date().toISOString().slice(0, 10),
  patch: "0.5.5",
  source: {
    title: o.title ?? "TODO",
    author: o.creator ? `${o.creator} (YouTube)` : "TODO",
    url: o.url ?? input,
    ...(o.date && { updated: o.date }),
  },
  origin: "creator",
  summary: "TODO",
  tags: [],
  damage: "TODO",
  playstyle: "TODO",
  difficulty: "medium",
  budget: "medium",
  pros: [],
  cons: [],
  skills,
  gear,
  ...(Object.keys(gearStages).length && { gearStages }),
  passives: passivesOf(spec),
};
const doc = new YAML.Document(fm);
YAML.visit(doc, {
  Seq(_, n, p) {
    if (["supports", "mods", "implicits", "ascendancy", "tags", "pros", "cons"].includes(p.at(-1)?.key?.value)) n.flow = true;
  },
});
process.stdout.write(`---\n${doc.toString({ lineWidth: 0, flowCollectionPadding: false })}---\n`);

// --- exact trees (content/builds/trees/<slug>.json) ----------------------------------------------
if (o.trees) {
  if (!o.slug) throw new Error("--trees needs --slug");
  const trees = Object.entries(pairs(o.trees)).map(([stage, id]) => {
    const s = pick(specs, id, activeSpec);
    // PoB does not record the allocation order: nodes go by distance from the class start, ascendancy last.
    const { ordered, startFrom } = byDistance(s.nodes);
    const nodes = [...ordered.filter((n) => !node(n).a), ...s.nodes.filter((n) => node(n)?.a && inAsc(node(n)))];
    const keep = (rec) => Object.fromEntries(Object.entries(rec).filter(([n]) => nodes.includes(Number(n))));
    return {
      name: s.title, stage, ...(startFrom && { startFrom }), nodes,
      ...(Object.keys(keep(s.attributes)).length && { attributes: keep(s.attributes) }),
      ...(Object.keys(keep(s.weaponSets)).length && { weaponSets: keep(s.weaponSets) }),
    };
  });
  const file = path.join(ROOT, "content/builds/trees", `${o.slug}.json`);
  fs.writeFileSync(file, `${JSON.stringify({ source: o.url ?? input, trees })}\n`);
  console.error(`wrote ${path.relative(ROOT, file)} (${trees.length} trees)`);
}
