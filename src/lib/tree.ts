// Passive tree graph logic shared by the planner (client) and the build loader (server).
import type { ClassInfo, TreeData, TreeNode } from "./types";

/** Passive points available at level 100 (99 from levels + 24 from quests). */
export const MAX_PASSIVE_POINTS = 123;
export const MAX_ASCENDANCY_POINTS = 8;

export interface TreeGraph {
  data: TreeData;
  adj: Map<number, number[]>;
  node(id: number): TreeNode | undefined;
}

export function createGraph(data: TreeData): TreeGraph {
  const adj = new Map<number, number[]>();
  const link = (a: number, b: number) => {
    let list = adj.get(a);
    if (!list) adj.set(a, (list = []));
    list.push(b);
  };
  for (const [a, b] of data.edges) {
    link(a, b);
    link(b, a);
  }
  return { data, adj, node: (id) => data.nodes[id] };
}

export const belongsToAscendancy = (node: TreeNode, ascendancy: string) =>
  node.a === ascendancy || Boolean(node.a2?.includes(ascendancy));

/**
 * Whether a node may be allocated by this class/ascendancy combination.
 * Other classes' start nodes and other ascendancies are off limits.
 */
export function isAllocatable(node: TreeNode, cls: ClassInfo, ascendancy: string | null): boolean {
  if (node.t === "start") return Boolean(node.c?.includes(cls.name));
  if (node.a) return ascendancy !== null && belongsToAscendancy(node, ascendancy);
  return true;
}

/** Root nodes of a build: the class start, plus the ascendancy start when one is chosen. */
export function roots(graph: TreeGraph, cls: ClassInfo, ascendancy: string | null): number[] {
  const out = [cls.start];
  if (ascendancy) {
    for (const [id, node] of Object.entries(graph.data.nodes)) {
      if (node.t === "ascStart" && belongsToAscendancy(node, ascendancy)) out.push(Number(id));
    }
  }
  return out;
}

/**
 * Shortest path (by node count) from any allocated node to `target`.
 * Returns the newly allocated nodes, ordered from the allocated set to the target,
 * or null when unreachable.
 */
export function findPath(
  graph: TreeGraph,
  allocated: ReadonlySet<number>,
  target: number,
  cls: ClassInfo,
  ascendancy: string | null,
): number[] | null {
  if (allocated.has(target)) return [];
  const prev = new Map<number, number>();
  const queue: number[] = [];
  for (const id of allocated) {
    prev.set(id, -1);
    queue.push(id);
  }
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    for (const next of graph.adj.get(cur) ?? []) {
      if (prev.has(next)) continue;
      const node = graph.node(next);
      if (!node || !isAllocatable(node, cls, ascendancy)) continue;
      // Paths may not travel through any start node (main or ascendancy).
      if (next !== target && (node.t === "start" || node.t === "ascStart")) continue;
      prev.set(next, cur);
      if (next === target) {
        const path: number[] = [];
        for (let at = next; !allocated.has(at); at = prev.get(at)!) path.unshift(at);
        return path;
      }
      queue.push(next);
    }
  }
  return null;
}

/** Keeps only nodes still connected to a root. */
export function pruneDisconnected(graph: TreeGraph, allocated: ReadonlySet<number>, rootIds: number[]): Set<number> {
  const keep = new Set<number>();
  const queue = rootIds.filter((r) => allocated.has(r));
  queue.forEach((r) => keep.add(r));
  for (let head = 0; head < queue.length; head++) {
    for (const next of graph.adj.get(queue[head]) ?? []) {
      if (allocated.has(next) && !keep.has(next)) {
        keep.add(next);
        queue.push(next);
      }
    }
  }
  return keep;
}

/** Removes a node and everything that depended on it. Roots cannot be removed. */
export function deallocate(graph: TreeGraph, allocated: ReadonlySet<number>, id: number, rootIds: number[]): Set<number> {
  if (rootIds.includes(id)) return new Set(allocated);
  const next = new Set(allocated);
  next.delete(id);
  return pruneDisconnected(graph, next, rootIds);
}

/** Nodes that would be lost if `id` were removed (including itself). */
export function dependents(graph: TreeGraph, allocated: ReadonlySet<number>, id: number, rootIds: number[]): Set<number> {
  const kept = deallocate(graph, allocated, id, rootIds);
  return new Set([...allocated].filter((n) => !kept.has(n)));
}

export function countPoints(graph: TreeGraph, allocated: Iterable<number>) {
  let main = 0;
  let ascendancy = 0;
  for (const id of allocated) {
    const node = graph.node(id);
    if (!node || node.t === "start" || node.t === "ascStart" || node.free) continue;
    if (node.a) ascendancy++;
    else main++;
  }
  return { main, ascendancy };
}

/**
 * Allocates a list of target nodes in order (each via its shortest path).
 * Used by build guides, which list the notables they take rather than every node.
 */
export function allocateTargets(
  graph: TreeGraph,
  cls: ClassInfo,
  ascendancy: string | null,
  targets: number[],
): { allocated: Set<number>; unreachable: number[] } {
  const rootIds = roots(graph, cls, ascendancy);
  const allocated = new Set<number>(rootIds);
  const unreachable: number[] = [];
  for (const target of targets) {
    const path = findPath(graph, allocated, target, cls, ascendancy);
    if (path === null) unreachable.push(target);
    else path.forEach((id) => allocated.add(id));
  }
  return { allocated, unreachable };
}

/** Finds the node with this name allowed for the class/ascendancy, preferring the closest one to the start. */
export function findNodeByName(graph: TreeGraph, name: string, cls: ClassInfo, ascendancy: string | null): number | null {
  const lower = name.toLowerCase();
  const matches = Object.entries(graph.data.nodes)
    .filter(([, n]) => n.n.toLowerCase() === lower && n.t !== "start" && isAllocatable(n, cls, ascendancy))
    .map(([id]) => Number(id));
  if (matches.length <= 1) return matches[0] ?? null;
  // Duplicate names (e.g. generic notables): pick the one closest to the class start.
  const start = graph.node(cls.start)!;
  const dist = (id: number) => {
    const n = graph.node(id)!;
    return (n.x - start.x) ** 2 + (n.y - start.y) ** 2;
  };
  return matches.sort((a, b) => dist(a) - dist(b))[0];
}

const ATTRIBUTE_NAMES = ["Strength", "Dexterity", "Intelligence"];

/** Stat lines of a node, resolving attribute nodes to the chosen attribute. */
export function nodeStats(node: TreeNode, attributeChoice?: number): string[] {
  if (node.t === "attribute" && attributeChoice !== undefined) {
    return [`+5 to ${ATTRIBUTE_NAMES[attributeChoice] ?? "any Attribute"}`];
  }
  return node.s ?? [];
}

/**
 * Sums stat lines that share the same wording, e.g. "10% increased Damage" x3 → "30% increased Damage".
 * Lines with several numbers are summed position by position.
 */
export function aggregateStats(lines: string[]): { text: string; count: number }[] {
  const groups = new Map<string, { values: number[]; count: number; template: string }>();
  const numberRe = /\d+(?:\.\d+)?/g;
  for (const line of lines) {
    const template = line.replace(numberRe, "#");
    const values = (line.match(numberRe) ?? []).map(Number);
    const group = groups.get(template);
    if (group) {
      group.count++;
      group.values = group.values.map((v, i) => v + (values[i] ?? 0));
    } else groups.set(template, { values, count: 1, template });
  }
  return [...groups.values()]
    .map((g) => {
      let i = 0;
      const text = g.template.replace(/#/g, () => {
        const v = g.values[i++];
        return Number.isInteger(v) ? String(v) : v.toFixed(1);
      });
      return { text, count: g.count };
    })
    .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text));
}
