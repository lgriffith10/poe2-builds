// Drafts the YAML front matter of a build guide from a public Maxroll PoE2 build guide.
// It only covers facts (skills, ascendancy order, key passives, gear); the write-up must be written by hand.
//
// Usage: node scripts/draft-from-maxroll.cjs <guide-slug> [profileName] > content/builds/<file>.md
//   guide-slug is the last part of https://maxroll.gg/poe2/build-guides/<guide-slug>
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS dev script */
const fs = require("fs");
const path = require("path");

const P = path.resolve(__dirname, "..") + "/";
const raw = (f) => JSON.parse(fs.readFileSync(P + ".cache/raw/" + f));
const tree = JSON.parse(fs.readFileSync(P + "public/data/tree.json"));
const gems = JSON.parse(fs.readFileSync(P + "src/data/generated/gems.json"));
const uniques = JSON.parse(fs.readFileSync(P + "src/data/generated/uniques.json"));
const bases = JSON.parse(fs.readFileSync(P + "src/data/generated/bases.json"));
const gemsRaw = raw("skill_gems.json");
const basesRaw = raw("base_items.json");
const charactersRaw = raw("characters.json");
// Maxroll items carry the unique's art id (e.g. "FourUniqueRing32"); RePoE has the same id under visual_identity.
const uniqueByArt = new Map(
  Object.values(raw("uniques.json")).map((u) => [u.visual_identity?.id?.replace(/_+$/, "").toLowerCase(), u.name]),
);

const gemName = (id) => {
  for (const k of [id, id.replace("/Gems/", "/Gem/"), id.replace("/Gem/", "/Gems/")]) {
    const n = gemsRaw[k]?.base_item?.display_name;
    if (n) return n;
  }
  return null;
};
const knownGem = (n) => n && gems.some((g) => g.name === n);

// Human wording for the stat ids Maxroll uses on items and stat priorities.
const STAT_LABELS = [
  [/^local_physical_damage_\+%$/, "Increased Physical Damage"],
  [/^local_(minimum|maximum)_added_physical_damage$/, "Adds Physical Damage"],
  [/^local_(minimum|maximum)_added_(cold|fire|lightning|chaos)_damage$/, (m) => `Adds ${cap(m[2])} Damage`],
  [/^attack_(minimum|maximum)_added_(physical|cold|fire|lightning|chaos)_damage$/, (m) => `Adds ${cap(m[2])} Damage to Attacks`],
  [/^local_attack_speed_\+%$|^attack_speed_\+%$/, "Increased Attack Speed"],
  [/^local_critical_strike_chance$|^critical_strike_chance_\+%$|^local_critical_strike_chance_\+%$/, "Critical Hit Chance"],
  [/^attack_critical_strike_chance_\+%$/, "Attack Critical Hit Chance"],
  [/^spell_critical_strike_chance_\+%$/, "Spell Critical Hit Chance"],
  [/critical_strike_multiplier/, "Critical Damage Bonus"],
  [/^projectile_skill_gem_level_\+$/, "+Level of all Projectile Skills"],
  [/^melee_skill_gem_level_\+$/, "+Level of all Melee Skills"],
  [/^spell_skill_gem_level_\+$/, "+Level of all Spell Skills"],
  [/^minion_skill_gem_level_\+$/, "+Level of all Minion Skills"],
  [/^attack_skill_gem_level_\+$/, "+Level of all Attack Skills"],
  [/^(\w+)_spell_skill_gem_level_\+$/, (m) => `+Level of all ${cap(m[1])} Spell Skills`],
  [/^number_of_additional_arrows$/, "Additional Arrow"],
  [/^base_maximum_life$|pseudo_total_life|^maximum_life_\+%$/, "+Maximum Life"],
  [/^base_maximum_mana$/, "+Maximum Mana"],
  [/^base_spirit_from_equipment$|^spirit_\+%$|^local_spirit_\+%$/, "+Spirit"],
  [/resist_all_elements|pseudo_total_resistance/, "Elemental Resistances"],
  [/^base_(fire|cold|lightning)_damage_resistance_%$/, (m) => `${cap(m[1])} Resistance`],
  [/chaos_damage_resistance|lightning_and_chaos_damage_resistance/, "Chaos Resistance"],
  [/^base_movement_velocity_\+%$/, "Movement Speed"],
  [/deflection/, "Deflection"],
  [/^local_evasion_and_energy_shield_\+%$/, "Evasion and Energy Shield"],
  [/^local_armour_and_energy_shield_\+%$/, "Armour and Energy Shield"],
  [/^local_armour_and_evasion_\+%$/, "Armour and Evasion"],
  [/evasion_rating|armour_filters\.ev/, "Evasion Rating"],
  [/energy_shield/, "Energy Shield"],
  [/physical_damage_reduction_rating|armour_filters\.ar/, "Armour"],
  [/^armour_%_applies_to_fire_cold_lightning_damage$/, "Armour applies to Elemental Damage"],
  [/^base_cast_speed_\+%$/, "Increased Cast Speed"],
  [/^spell_damage_\+%$/, "Increased Spell Damage"],
  [/^(\w+)_damage_\+%$/, (m) => `Increased ${cap(m[1].replace(/_/g, " "))} Damage`],
  [/^additional_strength$/, "+Strength"],
  [/^additional_dexterity$/, "+Dexterity"],
  [/^additional_intelligence$/, "+Intelligence"],
  [/^additional_all_attributes$/, "+All Attributes"],
  [/life_leech/, "Life Leech"],
  [/mana_leech/, "Mana Leech"],
  [/^minion_damage_\+%$/, "Minions deal Increased Damage"],
  [/^weapon_filters\.pdps$/, "High Physical DPS"],
  [/^stun_threshold_\+$/, "Stun Threshold"],
  [/^minion_maximum_life_\+%$/, "Minion Life"],
  [/^minion_skill_area_of_effect_\+%$/, "Minion Area of Effect"],
  [/^minion_melee_splash$/, "Minion Melee Splash"],
  [/block_chance/, "Block Chance"],
  [/total_elemental_resistance/, "Elemental Resistances"],
  [/^allies_in_presence_attack_speed_\+%$/, "Allies in Presence Attack Speed"],
  [/^allies_in_presence_attack_(minimum|maximum)_added_(\w+)_damage$/, (m) => `Allies in Presence gain Added ${cap(m[2])} Damage`],
  [/pseudo_total_attributes/, "+Attributes"],
  [/^non_skill_base_all_damage_%_to_gain_as_(\w+)$/, (m) => `Gain Damage as Extra ${cap(m[1])}`],
  [/^mod_granted_passive_hash$/, "Grants a Passive Skill"],
  [/^base_number_of_crossbow_bolts$/, "+Crossbow Bolts"],
  [/mana_regeneration_rate/, "Mana Regeneration"],
  [/accuracy_rating/, "Accuracy Rating"],
  [/^local_charm_slots$/, "Charm Slots"],
  [/^base_item_found_rarity_\+%$/, null], // rarity is a farming stat, leave it out
];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function statLabel(id) {
  const clean = id.replace(/^(pseudo|filters)\./, "");
  for (const [re, label] of STAT_LABELS) {
    const m = clean.match(re);
    if (m) return typeof label === "function" ? label(m) : label;
  }
  return `?${id}`;
}

const SLOTS = { Weapon: "weapon", Offhand: "offhand", Helm: "helmet", BodyArmour: "body", Gloves: "gloves", Boots: "boots", Amulet: "amulet", Ring: "ring1", Ring2: "ring2", Belt: "belt", Weapon2: "weapon2", Offhand2: "offhand2" };

const yamlList = (items) => `[${items.map((s) => (/[:,[\]#]/.test(s) || /^[!&*'"]/.test(s) ? JSON.stringify(s) : s)).join(", ")}]`;

// Gear progression: picks one equipment variant per stage, by name (or by an explicit --map).
const STAGE_RULES = [
  ["minmax", /min.?max|aspir|high budget|\+\+\+/i, "last"],
  ["campaign", /campaign|\bact ?\d|leveling|level ?\d|interlude|hollow palm|respec|^set 1$|legion swap/i, "last"],
  ["endgame", /end ?game|late|^maps$/i, "last"],
  ["mapping", /early|map|mid|red/i, "first"],
];
function printStages(d, gearFor, mapArg) {
  const variants = [];
  for (const p of d.profiles)
    for (const v of p.equipment.variants)
      if (!variants.some((x) => x.name === v.name) && Object.values(v.items ?? {}).some((id) => d.items[id])) variants.push(v);
  const explicit = Object.fromEntries((mapArg || "").split(",").filter(Boolean).map((kv) => kv.split("=").map((x) => x.trim())));
  const picked = {};
  if (Object.keys(explicit).length) {
    for (const [stage, name] of Object.entries(explicit)) {
      const v = variants.find((x) => x.name === name);
      if (!v) throw new Error(`No equipment variant "${name}" (have: ${variants.map((x) => x.name).join(" | ")})`);
      picked[stage] = v;
    }
  } else {
    for (const v of variants) {
      const rule = STAGE_RULES.find(([, re]) => re.test(v.name.replace(/\s*\{[^}]*\}\s*$/, "")));
      if (!rule) continue;
      if (rule[2] === "last" || !picked[rule[0]]) picked[rule[0]] = v;
    }
  }
  console.error(`variants: ${variants.map((v) => v.name).join(" | ")}`);
  console.error(`picked: ${Object.entries(picked).map(([k, v]) => `${k}=${v.name}`).join(", ")}`);
  const order = ["campaign", "mapping", "endgame", "minmax"];
  const out = ["gearStages:"];
  for (const stage of order.filter((s) => picked[s])) {
    out.push(`  ${stage}:`);
    out.push(...gearFor(picked[stage], "    ").map((l) => l.replace(/, \?[\w+%.]+|\?[\w+%.]+, |\?[\w+%.]+/g, "")));
  }
  process.stdout.write(out.join("\n") + "\n");
}

(async () => {
  const args = process.argv.slice(2);
  const stagesMode = args.includes("--stages");
  const mapIdx = args.indexOf("--map");
  const stageArgs = mapIdx >= 0 ? args[mapIdx + 1] : "";
  // --tree <name>: passive tree variant to use (default: the longest one of the profile).
  const treeIdx = args.indexOf("--tree");
  const treeArg = treeIdx >= 0 ? args[treeIdx + 1] : null;
  const valueIdx = new Set([mapIdx + 1, treeIdx + 1].filter((i) => i > 0));
  const [slug, wanted] = args.filter((a, i) => !a.startsWith("--") && !valueIdx.has(i));
  const url = `https://maxroll.gg/poe2/build-guides/${slug}`;
  const html = await (await fetch(url)).text();
  const plannerId = html.match(/maxroll\.gg\/poe2\/planner\/([a-z0-9]+)/)?.[1];
  if (!plannerId) throw new Error(`No planner found on ${url}`);
  const title = html.match(/<title>([^<]*?) - Path of Exile 2/)?.[1]?.replace(/ Build Guide.*$/, "") ?? slug;
  const author = html.match(/"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"/)?.[1] ?? "Maxroll";
  const updated = html.match(/"dateModified"\s*:\s*"([^"T]+)/)?.[1];

  const j = await (await fetch(`https://planners.maxroll.gg/profiles/poe2/${plannerId}`)).json();
  const d = JSON.parse(j.data);
  const profile =
    d.profiles.find((p) => p.name === wanted) ??
    d.profiles.find((p) => /map|endgame/i.test(p.name) && !/aspir|min.?max|\+/i.test(p.name)) ??
    d.profiles.at(-1);

  // Class and ascendancy.
  // profile.class is a character metadata id suffix (e.g. "DexFourb"); profile.ascendancy is "<Class><n>", 1-based.
  const charName = charactersRaw.find((ch) => ch.metadata_id.toLowerCase().endsWith("/" + profile.class.toLowerCase()))?.name;
  const cls = tree.classes.find((c) => c.name === charName);
  const asc = cls?.ascendancies[Number(profile.ascendancy.match(/(\d+)$/)?.[1]) - 1];

  // Passives: history is a flat id list, {add, remove} steps, or {id, set} weapon-set allocations (set 1 or 2).
  const flatten = (h) => {
    const out = [];
    for (const step of h) {
      if (typeof step === "number") out.push(step);
      else if (step.set !== undefined) continue;
      else {
        for (const id of step.add ?? []) if (!out.includes(id)) out.push(id);
        for (const id of step.remove ?? []) if (out.includes(id)) out.splice(out.indexOf(id), 1);
      }
    }
    return out;
  };
  const setNodes = (h, set) => h.filter((s) => s && s.set === set && tree.nodes[s.id]).map((s) => s.id);
  const variants = profile.passives.variants.map((v) => ({
    ...v,
    history: flatten(v.history),
    sets: { 1: setNodes(v.history, 1), 2: setNodes(v.history, 2) },
  }));
  const pv = variants.find((v) => v.name === treeArg) ?? variants.sort((a, b) => b.history.length - a.history.length)[0];
  if (treeArg && pv.name !== treeArg) console.error(`NOTE tree "${treeArg}" not found, using "${pv.name}"`);
  const main = pv.history.filter((n) => tree.nodes[n] && !tree.nodes[n].a);
  const key = [...new Set(main.filter((n) => ["notable", "keystone"].includes(tree.nodes[n].t)).map((n) => tree.nodes[n].n))];
  const setKey = (set) => [...new Set(pv.sets[set].filter((n) => ["notable", "keystone"].includes(tree.nodes[n].t)).map((n) => tree.nodes[n].n.trim()))];
  const weaponSet1 = setKey(1);
  const weaponSet2 = setKey(2);
  const ascOrder = pv.history.filter((n) => tree.nodes[n]?.a && tree.nodes[n].t === "notable").map((n) => tree.nodes[n].n);
  const attrCounts = [0, 0, 0];
  Object.values(pv.attributes ?? {}).forEach((v) => attrCounts[v]++);
  const attribute = ["str", "dex", "int"][attrCounts.indexOf(Math.max(...attrCounts))];

  // Skills of the matching step (or the last one).
  const step = profile.skills.steps.find((s) => s.name === pv.name) ?? profile.skills.steps.at(-1);
  const skills = [];
  for (const s of step.skills) {
    const names = s.gems.map((g) => gemName(g.id)).filter(knownGem);
    if (!names.length) continue;
    const [gem, ...supports] = names;
    if (skills.some((x) => x.gem === gem)) continue;
    // The active gem was a placeholder (e.g. "Companion: {0}", "Spectre: {0}") that we do not track.
    if (gems.find((g) => g.name === gem)?.type === "support") {
      console.error(`NOTE skipped group led by a placeholder gem: ${names.join(" + ")}`);
      continue;
    }
    skills.push({ gem, supports, weaponSet: s.weaponSet });
  }
  // Only worth showing when the build socket skills on both weapon sets.
  const bothSets = new Set(skills.map((s) => s.weaponSet).filter(Boolean)).size > 1;

  // Gear: one YAML block per equipment variant.
  const notes = [];
  const gearFor = (variant, indent = "  ") => {
    const gear = [];
    for (const [slot, key2] of Object.entries(SLOTS)) {
      const it = d.items[variant.items[slot]];
      if (!it) continue;
      const base = basesRaw[it.base]?.name;
      if (it.rarity === "unique") {
        let name = it.name && uniques.some((u) => u.name === it.name) ? it.name : null;
        const byArt = it.unique && uniqueByArt.get(it.unique.replace(/_+$/, "").toLowerCase());
        if (!name && byArt && uniques.some((u) => u.name === byArt)) name = byArt;
        if (!name) {
          const candidates = uniques.filter((u) => u.base === base || u.base === base?.replace(/^Runemastered |^Runeforged /, ""));
          if (candidates.length === 1) name = candidates[0].name;
          else if (candidates.length > 1) {
            // Several uniques share this base: pick the one whose mod text best matches the item's stat ids.
            const words = new Set(Object.keys(it.stats?.explicit ?? {}).join("_").toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3));
            const score = (u) => [...u.implicits, ...u.mods].join(" ").toLowerCase().split(/[^a-z]+/).filter((w) => words.has(w)).length;
            const ranked = candidates.map((u) => ({ u, s: score(u) })).sort((x, y) => y.s - x.s);
            name = ranked[0].u.name;
            notes.push(`${key2}: unique on ${base} guessed as ${name} (${ranked.map((r) => `${r.u.name}=${r.s}`).join(", ")})`);
          } else notes.push(`${key2}: unique on ${base}, no candidate in our data`);
        }
        if (name) gear.push(`${indent}${key2}:\n${indent}  unique: ${JSON.stringify(name)}`);
        continue;
      }
      const pr = variant.priority?.[slot];
      const statIds = [...(pr?.required ?? []), ...(pr?.optional ?? [])].map((x) => x.id);
      const ids = statIds.length ? statIds : Object.keys(it.stats?.explicit ?? {});
      const mods = [...new Set(ids.map(statLabel).filter(Boolean))].slice(0, 6);
      const baseLine = base && bases.some((b) => b.name === base) ? `\n${indent}  base: ${base}` : "";
      gear.push(`${indent}${key2}:${baseLine}\n${indent}  mods: ${yamlList(mods)}`);
    }
    return gear;
  };
  const variant = profile.equipment.variants.find((v) => v.name === pv.name) ?? profile.equipment.variants[0];
  const gear = gearFor(variant);

  if (stagesMode) {
    printStages(d, gearFor, stageArgs);
    for (const n of notes) console.error("NOTE " + n);
    return;
  }

  const out = `---
title: ${title}
class: ${cls?.name ?? "?"}
ascendancy: ${asc?.name ?? "?"}
author: Exile Codex
updated: ${new Date().toISOString().slice(0, 10)}
patch: "0.5.5"
source:
  title: ${JSON.stringify(title + " Build Guide")}
  author: ${JSON.stringify(author + " (Maxroll)")}
  url: ${url}
  updated: ${updated}
summary: TODO
tags: []
damage: TODO
playstyle: TODO
difficulty: medium
budget: low
tiers:
  starter: TODO
pros: []
cons: []
skills:
${skills.map((s) => `  - gem: ${JSON.stringify(s.gem)}\n    supports: ${yamlList(s.supports)}${bothSets && s.weaponSet ? `\n    weaponSet: ${s.weaponSet}` : ""}`).join("\n")}
gear:
${gear.join("\n")}
passives:
  attribute: ${attribute}
  path:
${key.map((k) => `    - ${JSON.stringify(k)}`).join("\n")}
  ascendancy: ${yamlList(ascOrder)}${weaponSet1.length ? `\n  weaponSet1: ${yamlList(weaponSet1)}` : ""}${weaponSet2.length ? `\n  weaponSet2: ${yamlList(weaponSet2)}` : ""}
---
`;
  process.stdout.write(out);
  console.error(`profile "${profile.name}" / tree "${pv.name}": ${main.length} main nodes, ${ascOrder.length} ascendancy notables, weapon sets ${pv.sets[1].length}/${pv.sets[2].length} nodes`);
  for (const n of notes) console.error("NOTE " + n);
  const unknown = gear.join("\n").match(/\?[a-z_.+%]+/g);
  if (unknown) console.error("UNMAPPED STATS " + [...new Set(unknown)].join(", "));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
