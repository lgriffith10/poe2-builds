// Adds the runes and soul cores socketed in each Maxroll planner item to the matching gear piece of the guides.
// usage: node scripts/runes-from-maxroll.cjs [slug...]   (default: every guide whose source is a Maxroll build guide)
// Pieces are matched by base type (or the unique's base) in the planner's equipment variants, preferring the
// variant that fits the stage (campaign, mapping, endgame...). Existing `runes:` lines are left as they are.
const fs = require("fs");
const yaml = require("js-yaml");

const P = __dirname + "/../";
const bases = JSON.parse(fs.readFileSync(P + ".cache/raw/base_items.json"));
const uniques = JSON.parse(fs.readFileSync(P + "src/data/generated/uniques.json"));
const currency = JSON.parse(fs.readFileSync(P + "src/data/generated/currency.json")).items;

const SLOTS = { weapon: "Weapon", offhand: "Offhand", helmet: "Helm", body: "BodyArmour", gloves: "Gloves", boots: "Boots", amulet: "Amulet", ring1: "Ring", ring2: "Ring2", belt: "Belt", weapon2: "Weapon2", offhand2: "Offhand2" };
const STAGE_RE = {
  campaign: /campaign|\bact ?\d|leveling|level ?\d|interlude|respec|^set 1$/i,
  mapping: /early|map|mid|red/i,
  endgame: /end ?game|late|^maps$/i,
  minmax: /min.?max|aspir|high budget|\+\+\+/i,
};
const ARMOUR = new Set(["Helmet", "Body Armour", "Gloves", "Boots", "Shield", "Buckler"]);
const CASTER = new Set(["Wand", "Staff", "Sceptre", "Focus"]);

/** "Greater Rune of Leadership: Minions gain ..." — the effect for this item's class, when the rune has one. */
function runeLine(name, count, itemClass) {
  const c = currency.find((x) => x.name === name);
  const cls = itemClass.toLowerCase();
  const group = ARMOUR.has(itemClass) ? "armour" : CASTER.has(itemClass) ? "caster" : "weapon";
  const s =
    c?.socket?.find((e) => e.slots.includes(cls)) ??
    c?.socket?.find((e) => e.slots.includes(group)) ??
    (group === "caster" ? c?.socket?.find((e) => e.slots.includes("weapon")) : undefined);
  const prefix = count > 1 ? `${count}× ` : "";
  const effect = s?.lines.join(", ");
  // Some shards only carry a keyword ("Raven-Touched"): the name says it all.
  return effect && /\s/.test(effect) ? `${prefix}${name}: ${effect}` : `${prefix}${name}`;
}

function runesOf(it) {
  // Sockets can also list gems socketed in the item (staves): keep augments only (runes, soul cores, idols).
  const names = (it.sockets ?? []).filter((id) => bases[id]?.item_class === "SoulCore").map((id) => bases[id].name);
  if (!names.length) return [];
  const itemClass = bases[it.base]?.item_class ?? "";
  const counts = new Map();
  for (const n of names) counts.set(n, (counts.get(n) ?? 0) + 1);
  return [...counts].map(([n, k]) => runeLine(n, k, itemClass));
}

const baseName = (it) => bases[it.base]?.name;
function matches(it, piece) {
  if (piece.unique) {
    const u = uniques.find((x) => x.name === piece.unique);
    return it.rarity === "unique" && !!u && (u.base === baseName(it) || u.base === baseName(it)?.replace(/^Runemastered |^Runeforged /, ""));
  }
  return it.rarity !== "unique" && baseName(it) === piece.base;
}

async function planner(url) {
  const html = await (await fetch(url)).text();
  const id = html.match(/maxroll\.gg\/poe2\/planner\/([a-z0-9]+)/)?.[1];
  if (!id) throw new Error(`no planner on ${url}`);
  const j = await (await fetch(`https://planners.maxroll.gg/profiles/poe2/${id}`)).json();
  return JSON.parse(j.data);
}

/** Line index range [start, end) of the YAML block `key:` found at `indent` after line `from`, before `until`. */
function block(lines, key, indent, from = 0, until = lines.length) {
  const pad = " ".repeat(indent);
  const start = lines.findIndex((l, i) => i >= from && i < until && l === `${pad}${key}:`);
  if (start < 0) return null;
  let end = start + 1;
  while (end < until && (lines[end].trim() === "" || lines[end].search(/\S/) > indent)) end++;
  return [start, end];
}

async function run(slug) {
  const file = `${P}content/builds/${slug}.md`;
  const text = fs.readFileSync(file, "utf8");
  const fmEnd = text.indexOf("\n---", 4);
  const fm = yaml.load(text.slice(4, fmEnd));
  if (fm.origin === "ladder" || !/maxroll\.gg\/poe2\/build-guides/.test(fm.source?.url ?? "")) return console.log(`${slug}: skipped`);
  const d = await planner(fm.source.url);

  const variants = [];
  for (const p of d.profiles) for (const v of p.equipment.variants) if (!variants.includes(v)) variants.push(v);
  const ranked = (stage) => {
    const re = STAGE_RE[stage];
    // Variants that fit the stage first (latest first), then the others; the main gear prefers non-campaign ones.
    const fit = (v) => (re ? re.test(v.name) : !STAGE_RE.campaign.test(v.name));
    return [...variants.filter(fit).reverse(), ...variants.filter((v) => !fit(v)).reverse()];
  };

  const lines = text.slice(0, fmEnd).split("\n");
  const inserts = [];
  const stages = [["gear", fm.gear, block(lines, "gear", 0), 2]];
  const gs = block(lines, "gearStages", 0);
  for (const [stage, set] of Object.entries(fm.gearStages ?? {})) if (gs) stages.push([stage, set, block(lines, stage, 2, gs[0], gs[1]), 4]);
  let added = 0, missed = [];
  for (const [stage, set, range, indent] of stages) {
    if (!range) continue;
    for (const [slot, piece] of Object.entries(set ?? {})) {
      if (!piece || piece.runes || !SLOTS[slot]) continue;
      let found = null;
      for (const v of ranked(stage)) {
        const it = d.items[v.items?.[SLOTS[slot]]];
        if (it && matches(it, piece)) { found = it; break; }
      }
      if (!found) { missed.push(`${stage}.${slot}`); continue; }
      const runes = runesOf(found);
      if (!runes.length) continue;
      const b = block(lines, slot, indent, range[0], range[1]);
      if (!b) continue;
      let end = b[1];
      while (lines[end - 1].trim() === "") end--;
      inserts.push([end, `${" ".repeat(indent + 2)}runes: [${runes.map((r) => JSON.stringify(r)).join(", ")}]`]);
      added++;
    }
  }
  for (const [at, line] of inserts.sort((a, b) => b[0] - a[0])) lines.splice(at, 0, line);
  fs.writeFileSync(file, lines.join("\n") + text.slice(fmEnd));
  console.log(`${slug}: ${added} pieces with runes${missed.length ? `, not found: ${missed.join(" ")}` : ""}`);
}

(async () => {
  const slugs = process.argv.slice(2).length
    ? process.argv.slice(2)
    : fs.readdirSync(P + "content/builds").filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
  for (const s of slugs) {
    try { await run(s); } catch (e) { console.log(`${s}: ERROR ${e.message}`); }
  }
})();
