#!/usr/bin/env node
// Compiles the crafting simulator data (public/data/craft.json) from RePoE: for every base type in our base list, the
// prefixes and suffixes it can roll, with their tier level, mod group and text.
//
// RePoE only says whether a mod CAN spawn on an item (weight 0 or 1); the real spawn weights are not public, so the
// simulator treats every eligible tier as equally likely and says so.
//
// Usage: node scripts/craft-data.mjs

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".cache", "raw");
const OUT = path.join(ROOT, "public", "data", "craft.json");

async function raw(file, url) {
  const p = path.join(RAW, file);
  try {
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    console.log(`downloading ${url}`);
    const text = await (await fetch(url)).text();
    await fs.mkdir(RAW, { recursive: true });
    await fs.writeFile(p, text);
    return JSON.parse(text);
  }
}

const mods = await raw("mods.json", "https://repoe-fork.github.io/poe2/mods.min.json");
const baseItems = await raw("base_items.json", "https://repoe-fork.github.io/poe2/base_items.min.json");
const ourBases = JSON.parse(await fs.readFile(path.join(ROOT, "src", "data", "generated", "bases.json"), "utf8"));

// "[Tag|Shown]" / "[Tag]" markup -> plain text.
const plain = (s) => s.replace(/\[([^\]|]+)\|([^\]]+)\]/g, "$2").replace(/\[([^\]]+)\]/g, "$1");

const craftable = Object.entries(mods).filter(
  ([, m]) => m.domain === "item" && (m.generation_type === "prefix" || m.generation_type === "suffix") && !m.is_essence_only && m.text,
);

// Desecration (Preserved Rib and other abyssal bones) draws from its own pool, the "desecrated" domain. Many of those
// mods belong to an abyssal lord (Ulaman, Amanamu, Kurgal) and only spawn when that lord is chosen by an omen.
const desecratedMods = Object.entries(mods).filter(
  ([, m]) => m.domain === "desecrated" && (m.generation_type === "prefix" || m.generation_type === "suffix") && m.text,
);
const LORDS = ["ulaman", "amanamu", "kurgal"];

/** PoE rule: the first spawn tag the item has decides the weight. */
function canSpawn(m, tags) {
  for (const w of m.spawn_weights) if (tags.has(w.tag)) return w.weight > 0;
  return false;
}

const modIndex = new Map(); // mod id -> index in the output list
const outMods = [];
const sets = new Map(); // sorted tag key -> mod indexes
const desecratedSets = new Map(); // sorted tag key -> desecrated mod indexes
/** Index of a mod in the output list; `origin` marks desecrated mods ("d", or "d:<lord>" when a lord omen is needed). */
const indexOf = (id, m, origin) => {
  if (!modIndex.has(id)) {
    modIndex.set(id, outMods.length);
    const row = [m.generation_type === "prefix" ? "P" : "S", m.groups[0] ?? m.type, m.required_level, plain(m.text), m.name];
    outMods.push(origin ? [...row, origin] : row);
  }
  return modIndex.get(id);
};
const bases = {};
const byName = new Map(Object.values(baseItems).filter((b) => b.domain === "item").map((b) => [b.name, b]));

for (const base of ourBases) {
  const b = byName.get(base.name);
  if (!b) continue;
  const tags = new Set(b.tags);
  const key = [...tags].sort().join(",");
  if (!sets.has(key)) {
    const ids = [];
    for (const [id, m] of craftable) {
      if (!canSpawn(m, tags)) continue;
      ids.push(indexOf(id, m));
    }
    sets.set(key, ids);
    const dIds = [];
    for (const [id, m] of desecratedMods) {
      if (!canSpawn(m, tags)) continue;
      // The lord is a marker tag on the mod (after the base tags), used by the lord omens to filter the pool.
      const lord = LORDS.find((l) => m.spawn_weights.some((w) => w.tag === `${l}_mod` && w.weight > 0));
      dIds.push(indexOf(id, m, lord ? `d:${lord}` : "d"));
    }
    desecratedSets.set(key, dIds);
  }
  if (sets.get(key).length) bases[base.name] = { class: base.class, level: base.level, icon: base.icon, set: key };
}

// Currency, omen and essence icons (RePoE serves game art as WebP next to the data).
const CURRENCIES = [
  "Orb of Transmutation", "Orb of Augmentation", "Regal Orb", "Orb of Alchemy", "Exalted Orb", "Chaos Orb", "Orb of Annulment",
  "Omen of Sinistral Exaltation", "Omen of Dextral Exaltation", "Omen of Greater Exaltation",
  "Omen of Sinistral Erasure", "Omen of Dextral Erasure", "Omen of Whittling",
  "Omen of Sinistral Annulment", "Omen of Dextral Annulment", "Preserved Rib",
  "Omen of the Sovereign", "Omen of the Liege", "Omen of the Blackblooded", "Omen of Sinistral Necromancy", "Omen of Dextral Necromancy",
  ...["the Body", "the Mind", "Insulation", "Thawing", "Grounding", "Ruin", "Haste", "Opulence", "the Infinite"].flatMap((e) => [
    `Greater Essence of ${e}`,
    `Perfect Essence of ${e}`,
  ]),
];
const ICON_DIR = path.join(ROOT, "public", "img", "currency");
await fs.mkdir(ICON_DIR, { recursive: true });
const icons = {};
const currencyByName = new Map(Object.values(baseItems).filter((b) => b.visual_identity?.dds_file).map((b) => [b.name, b]));
for (const name of CURRENCIES) {
  const dds = currencyByName.get(name)?.visual_identity?.dds_file;
  if (!dds) {
    console.warn(`no art for ${name}`);
    continue;
  }
  const slug = dds.split("/").pop().replace(/\.dds$/i, "").toLowerCase();
  const file = path.join(ICON_DIR, `${slug}.webp`);
  try {
    await fs.access(file);
  } catch {
    const res = await fetch(`https://repoe-fork.github.io/poe2/${dds.replace(/\.dds$/i, "")}.webp`);
    if (!res.ok) {
      console.warn(`art download failed for ${name}: ${res.status}`);
      continue;
    }
    await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  }
  icons[name] = `/img/currency/${slug}.webp`;
}

const setKeys = [...sets.keys()].filter((k) => sets.get(k).length);
const data = {
  note: "Generated by scripts/craft-data.mjs from RePoE. Spawn weights are not public: every eligible tier counts as equally likely.",
  // mod: [P|S, group, level, text, affix name, origin?] where origin is "d" (desecrated) or "d:<lord>"
  mods: outMods,
  sets: setKeys.map((k) => sets.get(k)),
  // desecrated pool of each set, same order as `sets`
  desecrated: setKeys.map((k) => desecratedSets.get(k)),
  icons,
  bases: Object.fromEntries(Object.entries(bases).map(([n, b]) => [n, [b.class, b.level, b.icon, setKeys.indexOf(b.set)]])),
};
await fs.writeFile(OUT, JSON.stringify(data));
const size = (await fs.stat(OUT)).size;
console.log(`desecrated: ${outMods.filter((m) => m[5]).length} mods (${LORDS.map((l) => `${l} ${outMods.filter((m) => m[5] === `d:${l}`).length}`).join(", ")})`);
console.log(`wrote ${path.relative(ROOT, OUT)}: ${outMods.length} mods, ${setKeys.length} mod pools, ${Object.keys(bases).length} bases, ${(size / 1024).toFixed(0)} KB`);
