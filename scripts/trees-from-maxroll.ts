// Imports every passive tree of a guide's Maxroll planner (campaign, respecs, mapping, endgame, min-max...) into
// content/builds/trees/<slug>.json, node for node and in the order the planner allocates them, with the attribute
// choices and weapon-set points. The guide page lets readers switch between those trees (see `treeVariants` in
// src/lib/builds.ts); the guide's own `passives` stay its recommended tree.
// - Only visible planner profiles are read; identical trees are kept once.
// - Nodes our tree data does not know (multiple-choice ascendancy options) are dropped. Nodes with no path from the
//   class start (anointed notables, nodes granted by jewels) are kept: the guide page lists them apart. A tree with more
//   than 20 such nodes is skipped: it starts from somewhere our tree cannot model (Pathfinder's "Path of the ...",
//   From Nothing, Split Personality...).
// Variant names are Maxroll's labels; `stage` is our classification (leveling, mapping, endgame, minmax).
// Usage: npm run trees:maxroll -- [slug...]   (no slug: every guide whose source is maxroll.gg)
import fs from "node:fs";
import matter from "gray-matter";
import { getClass, tree } from "@/lib/data";
import { createGraph, isAllocatable, pruneDisconnected, roots } from "@/lib/tree";

const DIR = "content/builds/";
const OUT = DIR + "trees/";
const graph = createGraph(tree);

type Entry = number | { id: number; set?: number };
type Step = Entry | { add?: Entry[]; remove?: Entry[] };
interface Variant {
  name: string;
  history: Step[];
  attributes?: Record<string, number>;
  buildMetadata?: { minLevel?: number };
}
interface Profile {
  name: string;
  hidden?: boolean;
  passives: { variants: Variant[] };
}

export interface TreeVariantFile {
  name: string;
  stage: "leveling" | "mapping" | "endgame" | "minmax";
  level?: number;
  nodes: number[];
  attributes?: Record<string, number>;
  weaponSets?: Record<string, 1 | 2>;
}

const idOf = (e: Entry) => (typeof e === "number" ? e : e.id);
const setOf = (e: Entry) => (typeof e === "number" ? 0 : e.set === 1 || e.set === 2 ? e.set : 0);

/** Final allocation of a variant, in the order its nodes were first taken, with each node's weapon set (0 = shared). */
function replay(history: Step[]) {
  const order = new Map<number, number>();
  const add = (e: Entry) => {
    if (!order.has(idOf(e))) order.set(idOf(e), setOf(e));
  };
  for (const step of history) {
    if (typeof step === "number" || "id" in step) add(step as Entry);
    else {
      for (const e of step.add ?? []) add(e);
      for (const e of step.remove ?? []) order.delete(idOf(e));
    }
  }
  return order;
}

const clean = (s: string) => {
  const t = s.replace(/\{\d+\}/g, "").replace(/\s+/g, " ").trim();
  // Some planners label everything in capitals ("MIN MAX").
  if (t !== t.toUpperCase()) return t;
  // Short words stay in capitals (CI, ES).
  return t.replace(/[A-Z]{4,}/g, (w) => w[0] + w.slice(1).toLowerCase());
};
const GENERIC = /^(variant|tree|passive tree)\s*\d*$|^\d+$/i;

function label(profile: string, variant: string) {
  const p = clean(profile);
  const v = clean(variant);
  if (GENERIC.test(v)) return p;
  if (GENERIC.test(p) || v.toLowerCase().includes(p.toLowerCase())) return v;
  return `${p}: ${v}`;
}

const STAGES: [TreeVariantFile["stage"], RegExp][] = [
  ["minmax", /min.?max|aspirational|high budget|\+\+\+/i],
  ["leveling", /campaign|leveling|\bact\s*\d|level\s*\d|interlude/i],
  ["mapping", /map|early|mid\b/i],
  ["endgame", /endgame|late|end game/i],
];
/** Stage of a tree: from the variant's own name when it says, else from its profile's ("Campaign" > "Endgame"). */
function stage(profile: string, variant: string): TreeVariantFile["stage"] {
  for (const name of [variant, profile]) for (const [st, re] of STAGES) if (re.test(name)) return st;
  return "endgame";
}

async function planner(url: string) {
  const html = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const id = html.match(/maxroll\.gg\/poe2\/planner\/([a-z0-9]+)/)?.[1];
  if (!id) return null;
  const j = await (await fetch(`https://planners.maxroll.gg/profiles/poe2/${id}`)).json();
  return { id, profiles: (JSON.parse(j.data) as { profiles: Profile[] }).profiles };
}

(async () => {
  const wanted = process.argv.slice(2);
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !wanted.length || wanted.includes(f.replace(/\.md$/, "")));
  fs.mkdirSync(OUT, { recursive: true });
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fm = matter(fs.readFileSync(DIR + file, "utf8")).data;
    const url: string | undefined = fm.source?.url;
    if (!url?.startsWith("https://maxroll.gg/")) continue;
    const cls = getClass(fm.class)!;
    const asc: string = fm.ascendancy;
    const rootIds = roots(graph, cls, asc);
    const p = await planner(url);
    if (!p) {
      console.log(`! ${slug}: no planner on ${url}`);
      continue;
    }
    const out: TreeVariantFile[] = [];
    const seen = new Set<string>();
    const notes: string[] = [];
    for (const profile of p.profiles.filter((pr) => !pr.hidden)) {
      for (const v of profile.passives.variants) {
        const name = label(profile.name, v.name);
        const order = replay(v.history);
        const usable = [...order.keys()].filter((id) => tree.nodes[id] && isAllocatable(tree.nodes[id], cls, asc));
        const connected = pruneDisconnected(graph, new Set([...usable, ...rootIds]), rootIds);
        const detached = usable.filter((id) => !connected.has(id)).length;
        if (detached > 20) {
          notes.push(`skipped "${name}" (${detached}/${order.size} nodes without a path in our tree)`);
          continue;
        }
        const dropped = order.size - usable.length;
        if (dropped || detached) notes.push(`"${name}": ${dropped} unknown node(s) dropped, ${detached} without a path`);
        const nodes = usable.filter((id) => tree.nodes[id].t !== "start");
        const sig = nodes.map((id) => `${id}:${order.get(id)}`).sort().join(",");
        if (seen.has(sig)) continue;
        seen.add(sig);
        const attributes = Object.fromEntries(
          nodes.filter((id) => tree.nodes[id].t === "attribute" && v.attributes?.[id] !== undefined).map((id) => [id, v.attributes![id]]),
        );
        const weaponSets = Object.fromEntries(nodes.filter((id) => order.get(id)).map((id) => [id, order.get(id) as 1 | 2]));
        const level = v.buildMetadata?.minLevel;
        out.push({
          name,
          stage: stage(profile.name, v.name),
          ...(level && level > 1 && { level }),
          nodes,
          ...(Object.keys(attributes).length && { attributes }),
          ...(Object.keys(weaponSets).length && { weaponSets }),
        });
      }
    }
    const target = `${OUT}${slug}.json`;
    if (out.length < 2) {
      if (fs.existsSync(target)) fs.rmSync(target);
      console.log(`- ${slug}: ${out.length} usable tree(s), nothing written${notes.length ? ` (${notes.join("; ")})` : ""}`);
      continue;
    }
    // One tree per line keeps the file diffable without spreading thousands of ids over lines.
    const body = out.map((t) => "    " + JSON.stringify(t)).join(",\n");
    fs.writeFileSync(target, `{\n  "source": ${JSON.stringify(url)},\n  "planner": "${p.id}",\n  "trees": [\n${body}\n  ]\n}\n`);
    console.log(`✓ ${slug}: ${out.map((t) => `${t.name} [${t.stage}]`).join(" | ")}${notes.length ? `\n    ${notes.join("\n    ")}` : ""}`);
  }
})();
