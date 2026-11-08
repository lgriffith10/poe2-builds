#!/usr/bin/env node
// Lists the skills that come from items or the ascendancy instead of a skill gem:
// base types (skills_granted and "Grants Skill" implicits), uniques and ascendancy notables.
// Output: src/data/generated/granted-skills.json  { bases, uniques, ascendancy: { name: [skill] } }
//
// Usage: node scripts/granted-skills.mjs   (needs .cache/raw from data:sync and craft:data)

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".cache", "raw");
const read = async (p) => JSON.parse(await fs.readFile(p, "utf8"));

const baseItems = await read(path.join(RAW, "base_items.json"));
const skillGems = await read(path.join(RAW, "skill_gems.json"));
const mods = await read(path.join(RAW, "mods.json"));
const uniques = await read(path.join(ROOT, "src", "data", "generated", "uniques.json"));
const bases = await read(path.join(ROOT, "src", "data", "generated", "bases.json"));
const tree = await read(path.join(ROOT, "public", "data", "tree.json"));

const gemName = (id) => {
  for (const k of [id, id.replace("/Gems/", "/Gem/"), id.replace("/Gem/", "/Gems/")]) {
    const n = skillGems[k]?.base_item?.display_name;
    if (n) return n;
  }
  return null;
};
/** "Grants Skill: Level (1-20) Herald of Ice" -> "Herald of Ice" */
const fromText = (text) =>
  [...text.matchAll(/Grants Skill: (?:Level [^ ]+ )?([^\n]+)/g)].map((m) => m[1].replace(/\[[^\]|]*\|([^\]]+)\]|\[([^\]]+)\]/g, "$1$2").trim());

const out = { bases: {}, uniques: {}, ascendancy: {} };
// Several bases can share a name (e.g. Shrine Sceptre: one variant per Purity); keep every variant's skill.
const byName = new Map();
for (const [id, b] of Object.entries(baseItems)) {
  if (b.domain !== "item" || /Unique/.test(id)) continue;
  byName.set(b.name, [...(byName.get(b.name) ?? []), b]);
}
/** "local_display_grants_spear_throw_skill" -> "Spear Throw" */
const fromStat = (id) => {
  const m = id.match(/^local_display_grants_(\w+?)_skill$/);
  return m ? [m[1].split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")] : [];
};
for (const base of bases) {
  const variants = byName.get(base.name);
  if (!variants) continue;
  const skills = variants.flatMap((b) => [
    // A base listing several skills can roll one of them (e.g. Lament Amulet): not a fixed grant, skip it.
    ...((b.skills_granted ?? []).length === 1 ? b.skills_granted.map(gemName).filter(Boolean) : []),
    ...(b.implicits ?? []).flatMap((id) => [...(mods[id]?.text ? fromText(mods[id].text) : []), ...(mods[id]?.stats ?? []).flatMap((st) => fromStat(st.id))]),
  ]);
  if (skills.length) out.bases[base.name] = [...new Set(skills)];
}
for (const u of uniques) {
  const skills = [...u.implicits, ...u.mods].flatMap(fromText);
  if (skills.length) out.uniques[u.name] = [...new Set(skills)];
}
for (const n of Object.values(tree.nodes)) {
  if (!n.a) continue;
  const skills = (n.s ?? []).flatMap(fromText);
  if (skills.length) out.ascendancy[n.n] = [...new Set(skills)];
}
const file = path.join(ROOT, "src", "data", "generated", "granted-skills.json");
await fs.writeFile(file, JSON.stringify(out, null, 1) + "\n");
console.log(
  `wrote ${path.relative(ROOT, file)}: ${Object.keys(out.bases).length} bases, ${Object.keys(out.uniques).length} uniques, ${Object.keys(out.ascendancy).length} ascendancy notables`,
);
