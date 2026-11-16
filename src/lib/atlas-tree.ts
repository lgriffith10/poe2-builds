import "server-only";
import YAML from "yaml";
import atlasJson from "@/data/generated/atlas.json";

/**
 * A mechanic's Atlas sub-tree for guides: a fenced ```atlas block naming the sub-tree and the order to take its
 * notables in. The block draws the sub-tree (src/data/generated/atlas.json, from `npm run atlas:data`), numbers
 * the listed notables, lights up the path that reaches them, and lists them under the drawing with their effect.
 *
 *   ```atlas
 *   tree: Ritual            # Breach | Ritual | Delirium | Expedition | Abyss | Incursion
 *   order:
 *     - Reborn in Shadow    # a node name...
 *     - node: Traveller's Woe
 *       choice: Tainted     # ...or an object with the option to pick and a note
 *       note: "Tainted Rituals favour belts, charms and flasks."
 *   ```
 *
 * Each listed node must be reachable from the previous ones through small nodes only: a path that crosses a
 * notable not listed yet is an error, so the numbers always match what the reader allocates.
 */
interface AtlasNode {
  x: number;
  y: number;
  name: string;
  kind: "root" | "small" | "notable" | "keystone";
  stats: string[];
}
interface AtlasTree {
  root: number;
  nodes: Record<string, AtlasNode>;
  /** [a, b] straight, or [a, b, radius, sweep] along an orbit arc. */
  edges: number[][];
}
interface Step {
  node: string;
  choice?: string;
  note?: string;
}

const trees = (atlasJson as unknown as { trees: Record<string, AtlasTree> }).trees;
export const ATLAS_TREES = Object.keys(trees);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderAtlasTree(source: string, where: string): string {
  const spec = YAML.parse(source) as { tree?: string; order?: (string | Step)[] };
  const fail = (msg: string): never => {
    throw new Error(`[${where}] atlas block: ${msg}`);
  };
  const tree = trees[spec.tree ?? ""] ?? fail(`unknown tree "${spec.tree}" (expected ${ATLAS_TREES.join(", ")})`);
  const steps: Step[] = (spec.order ?? []).map((s) => (typeof s === "string" ? { node: s } : s));
  if (!steps.length) fail("empty order");

  const ids = Object.keys(tree.nodes).map(Number);
  const byName = new Map(ids.filter((id) => tree.nodes[id].kind !== "small").map((id) => [tree.nodes[id].name, id]));
  const adj = new Map<number, number[]>(ids.map((id) => [id, []]));
  for (const [a, b] of tree.edges) {
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  }

  // Allocate each listed node in turn by the shortest path from what is already taken.
  const taken = new Set([tree.root]);
  const number = new Map<number, number>();
  steps.forEach((step, i) => {
    const target = byName.get(step.node) ?? fail(`unknown node "${step.node}" in ${spec.tree}`);
    if (number.has(target)) fail(`"${step.node}" is listed twice`);
    const from = new Map<number, number>();
    const queue = [...taken];
    for (const id of queue) from.set(id, -1);
    while (queue.length && !from.has(target)) {
      const id = queue.shift()!;
      for (const next of adj.get(id)!) {
        if (from.has(next)) continue;
        from.set(next, id);
        if (next === target) break;
        if (tree.nodes[next].kind === "small") queue.push(next);
      }
    }
    if (!from.has(target)) fail(`"${step.node}" cannot be reached without an unlisted notable first`);
    for (let id = target; !taken.has(id); id = from.get(id)!) taken.add(id);
    number.set(target, i + 1);
  });

  // Fit the drawing to the sub-tree. Sizes are in tree units, scaled so the drawing reads at ~560px wide or tall.
  const xs = ids.map((id) => tree.nodes[id].x);
  const ys = ids.map((id) => tree.nodes[id].y);
  const k = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 520;
  const px = (n: number) => Math.round(n * k * 10) / 10;
  const pad = px(20);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.max(...xs) + pad - minX;
  const h = Math.max(...ys) + pad - minY;
  const radius = { keystone: px(14), notable: px(11.5), root: px(12), small: px(5) };

  const edges = tree.edges
    .map(([a, b, r, sweep]) => {
      const p = tree.nodes[a];
      const q = tree.nodes[b];
      const d = r ? `M${p.x} ${p.y}A${r} ${r} 0 0 ${sweep} ${q.x} ${q.y}` : `M${p.x} ${p.y}L${q.x} ${q.y}`;
      return `<path d="${d}"${taken.has(a) && taken.has(b) ? ` class="on" stroke-width="${px(4)}"` : ""}/>`;
    })
    .join("");

  const nodes = ids
    .map((id) => {
      const n = tree.nodes[id];
      const step = number.get(id);
      const cls = [`at-${n.kind}`, taken.has(id) ? "on" : ""].filter(Boolean).join(" ");
      const tip = n.kind === "root" ? spec.tree! : [n.name, ...n.stats].join("\n");
      return `<g class="${cls}"><title>${esc(tip)}</title><circle cx="${n.x}" cy="${n.y}" r="${radius[n.kind]}"${
        n.kind === "keystone" ? ` stroke-dasharray="${px(5)} ${px(2.5)}"` : ""
      }/>${
        step ? `<text x="${n.x}" y="${n.y}">${step}</text>` : ""
      }</g>`;
    })
    .join("");

  const legend = steps
    .map((s) => {
      const n = tree.nodes[byName.get(s.node)!];
      return `<li><span class="at-name">${esc(n.name)}</span>${n.kind === "keystone" ? ' <span class="at-tag">keystone</span>' : ""}${
        s.choice ? ` <span class="at-choice">→ ${esc(s.choice)}</span>` : ""
      }${s.note ? `<span class="at-note">${esc(s.note)}</span>` : ""}<span class="at-stats">${esc(n.stats.join(" · "))}</span></li>`;
    })
    .join("");

  return `<figure class="atlas-tree"><svg viewBox="${minX} ${minY} ${w} ${h}" role="img" aria-label="${esc(
    `${spec.tree} Atlas passive tree`,
  )}"><g class="at-edges" stroke-width="${px(2.5)}">${edges}</g><g stroke-width="${px(2)}" font-size="${px(12)}">${nodes}</g></svg><ol class="atlas-order">${legend}</ol></figure>\n`;
}
