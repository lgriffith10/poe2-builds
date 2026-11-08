// Fits a guide into the passive point budget by dropping its last key passives (and last ascendancy notables).
// Useful for ladder drafts, whose characters often use more points than our re-pathed tree allows.
// Usage: npm run builds:fit -- <slug> [slug...]
import fs from "node:fs";
import YAML from "yaml";
import { getClass, tree } from "@/lib/data";
import { allocateTargets, createGraph, findNodeByName, MAX_ASCENDANCY_POINTS, MAX_PASSIVE_POINTS } from "@/lib/tree";
const graph = createGraph(tree);
for (const slug of process.argv.slice(2)) {
  const p = `content/builds/${slug}.md`;
  const text = fs.readFileSync(p, "utf8");
  const fmText = text.split("---\n")[1];
  const fm = YAML.parse(fmText);
  const cls = getClass(fm.class)!;
  const count = (path: string[], asc: string[]) => {
    const ids = [...path, ...asc].map((n) => findNodeByName(graph, n, cls, fm.ascendancy)!);
    const { allocated } = allocateTargets(graph, cls, fm.ascendancy, ids);
    const main = [...allocated].filter((id) => !tree.nodes[id].a && tree.nodes[id].t !== "start").length;
    const a = [...allocated].filter((id) => tree.nodes[id].a && tree.nodes[id].t !== "ascStart").length;
    return { main, a };
  };
  let path: string[] = fm.passives.path, asc: string[] = fm.passives.ascendancy;
  while (count([], asc).a > MAX_ASCENDANCY_POINTS) asc = asc.slice(0, -1);
  while (count(path, asc).main > MAX_PASSIVE_POINTS) path = path.slice(0, -1);
  const before = fm.passives.path.length, beforeAsc = fm.passives.ascendancy.length;
  console.log(slug, count(path, asc), `path ${before} -> ${path.length}, asc ${beforeAsc} -> ${asc.length}`);
  let out = text.replace(/  path:\n(?:    - .*\n)+/, `  path:\n${path.map((n) => `    - ${JSON.stringify(n)}`).join("\n")}\n`);
  out = out.replace(/  ascendancy: \[.*\]\n/, `  ascendancy: [${asc.join(", ")}]\n`);
  fs.writeFileSync(p, out);
}
