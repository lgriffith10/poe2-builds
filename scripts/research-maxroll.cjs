// Research helper for writing guides: summarises a public Maxroll PoE2 planner (skills, key passives in the order
// they are taken, ascendancy order, gear and stat priorities) using this project's game data. Run `npm run data:sync` first.
// Usage: node scripts/research-maxroll.cjs <plannerId> [profileName]   (plannerId from maxroll.gg/poe2/planner/<id>)
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS dev script */
const fs = require("fs");
const P = require("path").resolve(__dirname, "..") + "/";
const raw = (f) => JSON.parse(fs.readFileSync(P + ".cache/raw/" + f));
const tree = JSON.parse(fs.readFileSync(P + "public/data/tree.json"));
const gemsRaw = raw("skill_gems.json");
const basesRaw = raw("base_items.json");
const gemName = (id) =>
  gemsRaw[id]?.base_item?.display_name ??
  gemsRaw[id.replace("/Gems/", "/Gem/")]?.base_item?.display_name ??
  gemsRaw[id.replace("/Gem/", "/Gems/")]?.base_item?.display_name ??
  `?${id}`;

(async () => {
  const [id, wanted] = process.argv.slice(2);
  const j = await (await fetch(`https://planners.maxroll.gg/profiles/poe2/${id}`)).json();
  const d = JSON.parse(j.data);
  console.log(`# ${j.name} (updated ${j.date})  profiles: ${d.profiles.map((p) => p.name).join(", ")}`);
  const p = d.profiles.find((x) => x.name === wanted) ?? d.profiles.at(-1);
  console.log(`profile: ${p.name}  class=${p.class} asc=${p.ascendancy} level=${p.level}`);

  // History is either a flat list of node ids or a list of {add, remove} steps.
  const flatten = (h) => {
    const out = [];
    for (const step of h) {
      if (typeof step === "number") out.push(step);
      else {
        for (const id of step.add ?? []) if (!out.includes(id)) out.push(id);
        for (const id of step.remove ?? []) out.splice(out.indexOf(id), out.includes(id) ? 1 : 0);
      }
    }
    return out;
  };
  for (const v of p.passives.variants) v.history = flatten(v.history);
  const pv = [...p.passives.variants].sort((a, b) => b.history.length - a.history.length)[0];
  console.log(`passive variants: ${p.passives.variants.map((v) => `${v.name}(${v.history.length})`).join(", ")} -> using ${pv.name}`);
  const hist = pv.history;
  const missing = hist.filter((n) => !tree.nodes[n]);
  const main = hist.filter((n) => tree.nodes[n] && !tree.nodes[n].a);
  const asc = hist.filter((n) => tree.nodes[n]?.a);
  const key = main.filter((n) => ["notable", "keystone"].includes(tree.nodes[n].t)).map((n) => tree.nodes[n].n);
  console.log(`nodes: ${hist.length} (main ${main.length}, asc ${asc.length}, missing in our tree ${missing.length})`);
  console.log(`attributes chosen: ${JSON.stringify(pv.attributes ?? {}).slice(0, 200)}`);
  console.log(`KEY PASSIVES (in order): ${key.join(" | ")}`);
  console.log(`ASCENDANCY (in order): ${asc.filter((n) => tree.nodes[n].t === "notable").map((n) => tree.nodes[n].n).join(" | ")}`);
  console.log(`jewels: ${JSON.stringify(pv.jewels ?? {}).slice(0, 200)}`);

  for (const step of p.skills.steps) {
    console.log(`\n## skills: ${step.name}`);
    for (const s of step.skills) console.log(`- ${s.gems.map((g) => gemName(g.id)).join(" + ")}`);
  }

  const variant = p.equipment.variants[0];
  console.log(`\n## gear (${variant.name})`);
  for (const [slot, itemId] of Object.entries(variant.items)) {
    const it = d.items[itemId];
    if (!it) continue;
    const base = basesRaw[it.base]?.name ?? it.base;
    const mods = Object.keys(it.stats?.explicit ?? {}).join(", ");
    console.log(`- ${slot}: [${it.rarity}] ${it.rarity === "unique" ? it.name + " (" + base + ")" : base} :: ${mods.slice(0, 220)}`);
    const pr = variant.priority?.[slot];
    if (pr) console.log(`    priority: ${[...(pr.required ?? []), ...(pr.optional ?? [])].map((x) => x.id).join(", ").slice(0, 250)}`);
  }
  const notes = JSON.stringify(d.strAndWeak ?? "").replace(/\\"/g, '"').match(/"text":"[^"]+"/g)?.map((t) => t.slice(8, -1));
  console.log(`\n## strengths/weaknesses: ${(notes ?? []).join(" / ").slice(0, 900)}`);
})();
