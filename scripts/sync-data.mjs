#!/usr/bin/env node
// Downloads public PoE2 game data and compiles it into compact JSON used by the site.
//
// Sources:
//   - RePoE fork (https://repoe-fork.github.io/poe2/): gems, base items, unique art, ascendancies
//   - Path of Building PoE2 (https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2):
//     passive tree layout and unique item modifiers
//
// Usage: node scripts/sync-data.mjs [--force]
//   --force  re-download raw files even when cached in .cache/raw

import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { buildIconAtlas, ICON_SHEETS } from "./tree-icons.mjs";
import { ART_SHEETS, buildTreeArt } from "./tree-art.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, ".cache", "raw");
const OUT_SRC = path.join(ROOT, "src", "data", "generated");
const OUT_PUBLIC = path.join(ROOT, "public", "data");
const OUT_IMG = path.join(ROOT, "public", "img");
const FORCE = process.argv.includes("--force");

const REPOE = "https://repoe-fork.github.io/poe2/";
const POB = "https://raw.githubusercontent.com/PathOfBuildingCommunity/PathOfBuilding-PoE2/dev/src/";
const TREE_VERSION = "0_5";

const UNIQUE_FILES = [
  "amulet", "axe", "belt", "body", "boots", "bow", "claw", "crossbow", "dagger", "flail", "flask",
  "focus", "gloves", "helmet", "jewel", "mace", "quiver", "ring", "sceptre", "shield", "soulcore",
  "spear", "staff", "sword", "talisman", "wand",
];

const RAW_FILES = {
  "tree.json": `${POB}TreeData/${TREE_VERSION}/tree.json`,
  "skill_gems.json": `${REPOE}skill_gems.min.json`,
  "skills.json": `${REPOE}skills.min.json`,
  "base_items.json": `${REPOE}base_items.min.json`,
  "uniques.json": `${REPOE}uniques.min.json`,
  "ascendancies.json": `${REPOE}ascendancies.min.json`,
  "characters.json": `${REPOE}characters.min.json`,
  ...Object.fromEntries(UNIQUE_FILES.map((f) => [`uniques/${f}.lua`, `${POB}Data/Uniques/${f}.lua`])),
  ...Object.fromEntries(ICON_SHEETS.map((f) => [`icons/${f}`, `${POB}TreeData/${TREE_VERSION}/${f}`])),
  ...Object.fromEntries(ART_SHEETS.map((f) => [`art/${f}`, `${POB}TreeData/${TREE_VERSION}/${f}`])),
};

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function download() {
  await fs.mkdir(path.join(RAW, "uniques"), { recursive: true });
  await fs.mkdir(path.join(RAW, "icons"), { recursive: true });
  await fs.mkdir(path.join(RAW, "art"), { recursive: true });
  const entries = Object.entries(RAW_FILES);
  let fetched = 0;
  await Promise.all(
    entries.map(async ([file, url]) => {
      const dest = path.join(RAW, file);
      if (!FORCE && (await exists(dest))) return;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
      await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
      fetched++;
    }),
  );
  console.log(`raw: ${fetched} downloaded, ${entries.length - fetched} cached`);
}

const readJson = async (file) => JSON.parse(await fs.readFile(path.join(RAW, file), "utf8"));
const ddsToUrl = (dds) => (dds ? REPOE + dds.replace(/\.dds$/i, "") + ".webp" : null);
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const round = (n) => Math.round(n * 10) / 10;
/** Strips PoE markup like [Curse] or [Charges|Power Charges] to plain text. */
const cleanMarkup = (s) => s?.replace(/\[([^\]|]+)\|([^\]]+)\]/g, "$2").replace(/\[([^\]]+)\]/g, "$1");

// ---------------------------------------------------------------------------
// Passive tree
// ---------------------------------------------------------------------------

function buildTree(tree, ascendancyData) {
  const { orbitRadii, orbitAnglesByOrbit } = tree.constants;
  const raw = tree.nodes;
  // Group ids are 1-based (Lua convention in Path of Building) while the JSON array is 0-based.
  const groupOf = (id) => tree.groups[id - 1];

  const position = (n) => {
    const g = groupOf(n.group);
    const r = orbitRadii[n.orbit];
    const a = orbitAnglesByOrbit[n.orbit][n.orbitIndex];
    return { x: g.x + r * Math.sin(a), y: g.y - r * Math.cos(a) };
  };

  const skip = (n) => !n || n.isOnlyImage || n.isMultipleChoiceOption || !groupOf(n.group);

  const nodeType = (n) => {
    if (n.classesStart) return "start";
    if (n.isAscendancyStart) return "ascStart";
    if (n.isKeystone) return "keystone";
    if (n.isJewelSocket) return "jewel";
    if (n.isNotable) return "notable";
    if (n.isAttribute) return "attribute";
    return "normal";
  };

  const nodes = {};
  for (const [id, n] of Object.entries(raw)) {
    if (skip(n)) continue;
    const p = position(n);
    const name = n.classesStart ? `${n.classesStart.join(" / ")} Start` : n.name;
    const node = { x: round(p.x), y: round(p.y), n: name, t: nodeType(n) };
    if (n.stats?.length) node.s = n.stats.map(cleanMarkup);
    if (n.ascendancyName) {
      node.a = n.ascendancyName;
      if (n.isSwitchable && n.options) node.a2 = Object.keys(n.options);
    }
    if (n.classesStart) node.c = n.classesStart;
    if (n.flavourText) node.f = n.flavourText;
    if (n.isAttribute && n.options) node.o = n.options.map((o) => o.name);
    if (n.isFreeAllocate) node.free = 1;
    nodes[id] = node;
  }

  // Ascendancy sub-trees are drawn at the centre of the main tree, like in game.
  // Store each ascendancy's centroid so the client can translate it to (0, 0).
  const centres = {};
  for (const node of Object.values(nodes)) {
    if (!node.a) continue;
    const c = (centres[node.a] ??= { x: 0, y: 0, k: 0 });
    c.x += node.x;
    c.y += node.y;
    c.k++;
  }

  const edges = [];
  const seen = new Set();
  for (const [id, n] of Object.entries(raw)) {
    if (!nodes[id]) continue;
    for (const conn of n.connections ?? []) {
      const other = String(conn.id);
      if (!nodes[other]) continue;
      const key = id < other ? `${id}-${other}` : `${other}-${id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const a = nodes[id];
      const b = nodes[other];
      // Never link the main tree to an ascendancy sub-tree: they are rendered apart.
      if (Boolean(a.a) !== Boolean(b.a)) continue;
      const edge = [Number(id), Number(other)];
      const o = Math.abs(conn.orbit);
      if (conn.orbit !== 0 && o < orbitRadii.length) {
        edge.push(orbitRadii[o], conn.orbit > 0 ? 1 : 0);
      } else if (raw[id].group === raw[other].group && raw[id].orbit === raw[other].orbit && raw[id].orbit > 0) {
        // Same orbit inside a group: draw along the orbit circle (shortest arc).
        const g = groupOf(raw[id].group);
        const ang = (p) => Math.atan2(p.x - g.x, -(p.y - g.y));
        let d = ang(b) - ang(a);
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d < -Math.PI) d += 2 * Math.PI;
        edge.push(orbitRadii[raw[id].orbit], d > 0 ? 1 : 0);
      }
      edges.push(edge);
    }
  }

  const ascInfo = {};
  for (const a of Object.values(ascendancyData)) {
    if (a.name) ascInfo[a.name] = { flavour: a.flavour_text ?? null };
  }

  const classes = tree.classes.map((c) => {
    const startId = Object.keys(nodes).find((id) => nodes[id].c?.includes(c.name));
    return {
      name: c.name,
      base: { str: c.base_str, dex: c.base_dex, int: c.base_int },
      start: Number(startId),
      ascendancies: c.ascendancies.map((a) => {
        const ce = centres[a.name] ?? { x: 0, y: 0, k: 1 };
        return {
          id: a.id,
          name: a.name,
          centre: { x: round(ce.x / ce.k), y: round(ce.y / ce.k) },
          flavour: ascInfo[a.name]?.flavour ?? null,
        };
      }),
    };
  });

  const mainNodes = Object.values(nodes).filter((n) => !n.a);
  const bounds = {
    minX: Math.min(...mainNodes.map((n) => n.x)),
    maxX: Math.max(...mainNodes.map((n) => n.x)),
    minY: Math.min(...mainNodes.map((n) => n.y)),
    maxY: Math.max(...mainNodes.map((n) => n.y)),
  };

  return { version: TREE_VERSION.replace("_", "."), bounds, classes, nodes, edges };
}

// ---------------------------------------------------------------------------
// Gems
// ---------------------------------------------------------------------------

function buildGems(skillGems) {
  const nameById = {};
  for (const [id, g] of Object.entries(skillGems)) nameById[id] = g.base_item?.display_name;
  const gems = [];
  const seenNames = new Set();
  for (const g of Object.values(skillGems)) {
    const name = g.base_item?.display_name;
    if (!name || g.base_item.release_state !== "released" || seenNames.has(name)) continue;
    // Skip internal placeholders ("[DNT] ...", "Companion: {0}", "Coming Soon").
    if (name.startsWith("[") || name.includes("{") || name === "Coming Soon") continue;
    seenNames.add(name);
    const w = g.requirement_weights ?? {};
    gems.push({
      id: slugify(name),
      name,
      type: g.gem_type, // active | support | spirit
      color: g.color, // r | g | b | w
      tags: (g.tags ?? []).filter((t) => !["grants_active_skill", "default", "repeatable"].includes(t)),
      text: cleanMarkup(g.support_text) ?? null,
      tier: g.crafting_level ?? 0,
      lineage: Boolean(g.is_lineage),
      attr: w.strength >= 50 ? "str" : w.dexterity >= 50 ? "dex" : w.intelligence >= 50 ? "int" : "mixed",
      icon: ddsToUrl(g.icon_dds_file),
      recommended: (g.recommended_supports ?? [])
        .map((r) => nameById[r] ?? nameById[r.replace("/Gems/", "/Gem/")])
        .filter(Boolean),
    });
  }
  return gems.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Base items
// ---------------------------------------------------------------------------

const EQUIPMENT_CLASSES = new Set([
  "Body Armour", "Helmet", "Gloves", "Boots", "Shield", "Focus", "Buckler", "Quiver", "Amulet", "Ring",
  "Belt", "One Hand Mace", "Two Hand Mace", "Warstaff", "Wand", "Staff", "Bow", "Crossbow", "Sceptre",
  "Spear", "Talisman", "Life Flask", "Mana Flask", "Charm", "Jewel", "One Hand Sword", "Two Hand Sword",
  "One Hand Axe", "Two Hand Axe", "Dagger", "Claw", "Flail",
]);

function buildBases(baseItems) {
  const bases = [];
  const seen = new Set();
  for (const b of Object.values(baseItems)) {
    if (b.release_state !== "released" || b.domain !== "item" || !EQUIPMENT_CLASSES.has(b.item_class)) continue;
    if (seen.has(b.name) || b.name.startsWith("[")) continue;
    seen.add(b.name);
    const p = b.properties ?? {};
    const props = {};
    for (const k of ["armour", "evasion", "energy_shield"]) if (p[k]) props[k] = p[k].max ?? p[k];
    if (p.physical_damage_min !== undefined) props.damage = `${p.physical_damage_min}-${p.physical_damage_max}`;
    if (p.attack_time) props.aps = Math.round((1000 / p.attack_time) * 100) / 100;
    if (p.critical_strike_chance) props.crit = p.critical_strike_chance / 100;
    if (p.block) props.block = p.block;
    const r = b.requirements ?? {};
    bases.push({
      id: slugify(b.name),
      name: b.name,
      class: b.item_class,
      level: r.level ?? b.drop_level ?? 1,
      req: { str: r.strength ?? 0, dex: r.dexterity ?? 0, int: r.intelligence ?? 0 },
      props,
      icon: ddsToUrl(b.visual_identity?.dds_file),
    });
  }
  return bases.sort((a, b) => a.class.localeCompare(b.class) || a.level - b.level);
}

// ---------------------------------------------------------------------------
// Uniques (Path of Building item text format)
// ---------------------------------------------------------------------------

function parseUniqueBlock(block, category) {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;
  const [name, base] = lines;
  const meta = {};
  const variants = [];
  let implicitCount = 0;
  const mods = [];
  for (const line of lines.slice(2)) {
    const lvl = line.match(/^Requires Level (\d+)/);
    if (lvl) {
      meta.level = Number(lvl[1]);
      continue;
    }
    const m = line.match(/^([A-Za-z ]+):\s*(.*)$/);
    if (m && !line.startsWith("{")) {
      const key = m[1].trim();
      if (key === "Variant") variants.push(m[2]);
      else if (key === "Implicits") implicitCount = Number(m[2]) || 0;
      else if (["Source", "League", "Requires", "Requires Level", "LevelReq", "Selected Variant", "Sockets",
        "Radius", "Limited to", "Has Alt Variant", "Selected Alt Variant", "Item Level", "Quality",
        "Charm Slots", "Upgrade", "Rune Sockets", "Corrupted"].includes(key)) {
        meta[key] = m[2];
        continue;
      } else mods.push(line);
      continue;
    }
    mods.push(line);
  }
  const current = Number(meta["Selected Variant"]) || variants.length || 0;
  const kept = [];
  for (const raw of mods) {
    let line = raw;
    let ok = true;
    for (const tag of line.match(/\{[^}]*\}/g) ?? []) {
      const v = tag.match(/^\{variant:([\d,]+)\}$/);
      if (v && current && !v[1].split(",").map(Number).includes(current)) ok = false;
    }
    if (!ok) continue;
    line = line.replace(/\{[^}]*\}/g, "").trim();
    if (line) kept.push(line);
  }
  return {
    id: slugify(name),
    name,
    base,
    category,
    source: meta.Source?.replace(/\w+\{([^}]*)\}/g, "$1") ?? null,
    league: meta.League ?? null,
    level: meta.level ?? null,
    implicits: kept.slice(0, implicitCount),
    mods: kept.slice(implicitCount),
  };
}

async function buildUniques(repoeUniques, bases) {
  const artByName = {};
  const classByName = {};
  for (const u of Object.values(repoeUniques)) {
    if (u.is_alternate_art) continue;
    artByName[u.name] ??= ddsToUrl(u.visual_identity?.dds_file);
    classByName[u.name] ??= u.item_class;
  }
  const baseClass = Object.fromEntries(bases.map((b) => [b.name, b.class]));
  const uniques = [];
  const seen = new Set();
  for (const file of UNIQUE_FILES) {
    const text = await fs.readFile(path.join(RAW, "uniques", `${file}.lua`), "utf8");
    let category = file;
    // Blocks are Lua long strings: [[ ... ]]; "-- Body: Armour" comments name the category.
    const re = /--\s*([^\n]+)\n|\[\[([\s\S]*?)\]\]/g;
    let m;
    while ((m = re.exec(text))) {
      if (m[1]) {
        if (!m[1].includes("(c)")) category = m[1].trim();
        continue;
      }
      const u = parseUniqueBlock(m[2], category);
      if (!u || seen.has(u.name)) continue;
      seen.add(u.name);
      u.class = classByName[u.name] ?? baseClass[u.base] ?? category;
      u.icon = artByName[u.name] ?? null;
      uniques.push(u);
    }
  }
  return uniques.sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Icons: mirrored locally and resized, so pages never wait on a third-party host.

async function mirrorIcons(list, dir, maxSize) {
  const outDir = path.join(OUT_IMG, dir);
  await fs.mkdir(outDir, { recursive: true });
  let fetched = 0;
  let failed = 0;
  const queue = list.filter((x) => x.icon);
  const worker = async () => {
    for (let x = queue.shift(); x; x = queue.shift()) {
      const file = path.join(outDir, `${x.id}.webp`);
      const local = `/img/${dir}/${x.id}.webp`;
      if (!FORCE && (await exists(file))) {
        x.icon = local;
        continue;
      }
      try {
        const res = await fetch(x.icon);
        if (res.status === 404) {
          x.icon = null; // the source has no art for this entry
          failed++;
          continue;
        }
        if (!res.ok) throw new Error(String(res.status));
        const img = await loadImage(Buffer.from(await res.arrayBuffer()));
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = createCanvas(Math.max(1, Math.round(img.width * scale)), Math.max(1, Math.round(img.height * scale)));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        await fs.writeFile(file, await canvas.encode("webp", 82));
        x.icon = local;
        fetched++;
      } catch {
        failed++; // keep the remote URL as a fallback
      }
    }
  };
  await Promise.all(Array.from({ length: 16 }, worker));
  console.log(`icons/${dir}: ${fetched} downloaded, ${failed} failed`);
}

// Gem details (tooltip stats)
// ---------------------------------------------------------------------------

// Gem level the tooltip numbers are taken at (the usual endgame level).
const DETAIL_LEVEL = "20";
const atLevel = (perLevel) => perLevel?.[DETAIL_LEVEL] ?? perLevel?.[Object.keys(perLevel ?? {}).pop()] ?? {};
const spaced = (s) => s?.replace(/([a-z])([A-Z])/g, "$1 $2");

/** Per-gem stats from RePoE skills.json at DETAIL_LEVEL, keyed by gem id: cost, timings, damage effectiveness, stat lines. */
function buildGemDetails(skillGems, skills, gems) {
  const ids = new Set(gems.map((g) => g.id));
  const details = {};
  for (const g of Object.values(skillGems)) {
    const id = slugify(g.base_item?.display_name ?? "");
    if (!ids.has(id) || details[id]) continue;
    const granted = (g.grants_skills ?? []).map((s) => skills[s]).filter(Boolean);
    const main = granted[0];
    if (!main) continue;
    const top = atLevel(main.per_level);
    const st = main.static ?? {};
    const d = {};
    if (main.active_skill?.description) d.desc = cleanMarkup(main.active_skill.description);
    const props = [];
    const spirit = top.reservations?.spirit ?? st.reservations?.spirit;
    if (spirit) props.push(["Reservation", `${spirit} Spirit`]);
    if (top.costs) props.push(["Cost", Object.entries(top.costs).map(([k, v]) => `${v} ${k}`).join(", ")]);
    if (st.cost_multiplier && st.cost_multiplier !== 100) props.push(["Cost Multiplier", `${st.cost_multiplier}%`]);
    // Attacks use their weapon's speed; their cast_time is a placeholder.
    if (main.cast_time && !main.active_skill?.types?.includes("Attack")) props.push(["Cast Time", `${main.cast_time / 1000} sec`]);
    if (st.attack_speed_multiplier) props.push(["Attack Speed", `${100 + st.attack_speed_multiplier}% of base`]);
    if (st.cooldown) props.push(["Cooldown Time", `${st.cooldown / 1000} sec`]);
    if (st.stored_uses > 1) props.push(["Uses", `${st.stored_uses}`]);
    if (props.length) d.props = props;
    const sets = [];
    for (const skill of granted) {
      for (const set of skill.stat_sets ?? []) {
        const pl = atLevel(set.per_level);
        const text = { ...set.static?.stat_text, ...pl.stat_text };
        const keys = [...new Set([...(set.static?.tooltip_order ?? []), ...Object.keys(text)])];
        const lines = keys.flatMap((k) => (text[k] ? cleanMarkup(text[k]).split("\n") : [])).map((l) => l.trim()).filter(Boolean);
        const props = [];
        const dmg = pl.damage_multiplier ?? set.static?.damage_multiplier;
        if (dmg != null) props.push(["Attack Damage", `${dmg}% of base`]);
        const crit = pl.crit_chance ?? set.static?.crit_chance;
        if (crit) props.push(["Critical Hit Chance", `${crit / 100}%`]);
        if (!lines.length && !props.length) continue;
        const label = skill === main ? spaced(set.label?.[0]) : skill.active_skill?.display_name ?? spaced(set.label?.[0]);
        sets.push({ ...(label && { label }), ...(props.length && { props }), lines });
      }
    }
    if (sets.length) d.sets = sets;
    if (Object.keys(d).length) details[id] = d;
  }
  return details;
}

// ---------------------------------------------------------------------------

async function main() {
  await download();
  const [tree, skillGems, skills, baseItems, repoeUniques, ascendancies] = await Promise.all([
    readJson("tree.json"),
    readJson("skill_gems.json"),
    readJson("skills.json"),
    readJson("base_items.json"),
    readJson("uniques.json"),
    readJson("ascendancies.json"),
  ]);

  const compactTree = buildTree(tree, ascendancies);
  const sheets = Object.fromEntries(
    await Promise.all(ICON_SHEETS.map(async (f) => [f, await fs.readFile(path.join(RAW, "icons", f))])),
  );
  const icons = await buildIconAtlas(tree, sheets);
  for (const [id, node] of Object.entries(compactTree.nodes)) {
    const i = icons.index.get(tree.nodes[id].icon);
    if (i !== undefined) node.i = i;
  }
  compactTree.icons = { url: "/data/tree-icons.webp", cols: icons.cols, cell: icons.cell };
  compactTree.art = await buildTreeArt(tree, (f) => fs.readFile(path.join(RAW, "art", f)), path.join(OUT_PUBLIC, "tree-art"));
  const gems = buildGems(skillGems);
  const bases = buildBases(baseItems);
  const uniques = await buildUniques(repoeUniques, bases);
  await mirrorIcons(gems, "gems", 64);
  await mirrorIcons(uniques, "uniques", 128);
  await mirrorIcons(bases, "bases", 96);
  const classes = compactTree.classes;

  await fs.mkdir(OUT_SRC, { recursive: true });
  await fs.mkdir(OUT_PUBLIC, { recursive: true });
  const write = (dir, file, data) => fs.writeFile(path.join(dir, file), JSON.stringify(data));
  await Promise.all([
    write(OUT_PUBLIC, "tree.json", compactTree),
    // Lightweight lookup data loaded on demand by the planner and the character page.
    write(OUT_PUBLIC, "catalog.json", {
      gems: gems.map((g) => [g.name, g.icon, g.color, g.type, g.id]),
      items: [
        ...uniques.map((u) => [u.name, u.class, u.icon, 1, u.id]),
        ...bases.map((b) => [b.name, b.class, b.icon, 0, b.id]),
      ],
    }),
    fs.writeFile(path.join(OUT_PUBLIC, "tree-icons.webp"), icons.atlas),
    write(OUT_SRC, "gems.json", gems),
    // Server-only: embedded in guide pages for reference tooltips.
    write(OUT_SRC, "gem-details.json", buildGemDetails(skillGems, skills, gems)),
    write(OUT_SRC, "bases.json", bases),
    write(OUT_SRC, "uniques.json", uniques),
    write(OUT_SRC, "classes.json", classes),
    write(OUT_SRC, "meta.json", { treeVersion: compactTree.version, syncedAt: new Date().toISOString() }),
  ]);

  console.log(
    `tree: ${Object.keys(compactTree.nodes).length} nodes, ${compactTree.edges.length} edges | ` +
      `icons: ${icons.index.size} (${icons.missing} missing) | gems: ${gems.length} | bases: ${bases.length} | uniques: ${uniques.length} | classes: ${classes.length}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
