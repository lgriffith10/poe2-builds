// Passive tree graph logic shared by the planner (client) and the build loader (server).
import type { ClassInfo, TreeData, TreeNode, WeaponSet } from "./types";

/** Passive points available at level 100 (99 from levels + 24 from quests). */
export const MAX_PASSIVE_POINTS = 123;
export const MAX_ASCENDANCY_POINTS = 8;
/** Weapon-set passive points: each weapon set gets its own 24, on top of the regular points. */
export const MAX_WEAPON_SET_POINTS = 24;

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
 * or null when unreachable. `blocked` nodes can be neither crossed nor targeted
 * (e.g. the other weapon set's nodes while allocating into a set).
 */
export function findPath(
  graph: TreeGraph,
  allocated: ReadonlySet<number>,
  target: number,
  cls: ClassInfo,
  ascendancy: string | null,
  blocked?: ReadonlySet<number>,
): number[] | null {
  if (allocated.has(target)) return [];
  if (blocked?.has(target)) return null;
  const prev = new Map<number, number>();
  const queue: number[] = [];
  for (const id of allocated) {
    prev.set(id, -1);
    queue.push(id);
  }
  for (let head = 0; head < queue.length; head++) {
    const cur = queue[head];
    for (const next of graph.adj.get(cur) ?? []) {
      if (prev.has(next) || blocked?.has(next)) continue;
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

export function countPoints(graph: TreeGraph, allocated: Iterable<number>, weaponSets: WeaponSetMap = {}) {
  let main = 0;
  let ascendancy = 0;
  const sets = { 1: 0, 2: 0 };
  for (const id of allocated) {
    const node = graph.node(id);
    if (!node || node.t === "start" || node.t === "ascStart" || node.free) continue;
    if (node.a) ascendancy++;
    else if (weaponSets[id]) sets[weaponSets[id]]++;
    else main++;
  }
  return { main, ascendancy, set1: sets[1], set2: sets[2] };
}

export type WeaponSetMap = Readonly<Record<number, WeaponSet>>;

/** Nodes of one weapon set view: the shared nodes plus that set's own nodes (set 0: everything). */
export function nodesForSet(allocated: Iterable<number>, weaponSets: WeaponSetMap, set: 0 | WeaponSet): Set<number> {
  return new Set([...allocated].filter((id) => !set || !weaponSets[id] || weaponSets[id] === set));
}

/**
 * Keeps only nodes still connected to a root: shared nodes through shared nodes,
 * and each weapon set's nodes through shared nodes or nodes of the same set.
 */
export function pruneWithWeaponSets(
  graph: TreeGraph,
  allocated: ReadonlySet<number>,
  weaponSets: WeaponSetMap,
  rootIds: number[],
): { allocated: Set<number>; weaponSets: Record<number, WeaponSet> } {
  const shared = new Set([...allocated].filter((id) => !weaponSets[id]));
  const keep = pruneDisconnected(graph, shared, rootIds);
  const sets: Record<number, WeaponSet> = {};
  for (const set of [1, 2] as const) {
    const view = new Set([...keep, ...[...allocated].filter((id) => weaponSets[id] === set)]);
    for (const id of pruneDisconnected(graph, view, rootIds)) {
      if (!keep.has(id)) sets[id] = set;
    }
  }
  return { allocated: new Set([...keep, ...Object.keys(sets).map(Number)]), weaponSets: sets };
}

/**
 * How many of `a`'s nodes `b` also allocates in a compatible way: shared nodes must be shared (or in either set)
 * in `b`, and a set node must be in a set of `b` too. Which set is called I or II is arbitrary between two builds,
 * so set nodes are matched with `b`'s sets as numbered and swapped, keeping the best.
 */
export function matchingNodes(a: Iterable<number>, aSets: WeaponSetMap, b: Iterable<number>, bSets: WeaponSetMap): number {
  const inB = new Set(b);
  const ids = [...a].filter((id) => inB.has(id));
  const count = (swap: boolean) =>
    ids.filter((id) => {
      const sa = aSets[id];
      const sb = bSets[id];
      if (!sa) return true; // a shared node of `a` is active in both of `b`'s sets as well
      if (!sb) return true; // shared in `b`: active whatever set `a` uses it with
      return swap ? sa !== sb : sa === sb;
    }).length;
  return Math.max(count(false), count(true));
}

/**
 * Allocates weapon-set targets on top of an allocation, set by set, each via its shortest path from the
 * shared nodes and the nodes already in that set. Targets already allocated as shared nodes are skipped.
 */
export function allocateWeaponSetTargets(
  graph: TreeGraph,
  cls: ClassInfo,
  ascendancy: string | null,
  allocated: ReadonlySet<number>,
  targets: Partial<Record<WeaponSet, number[]>>,
): { allocated: Set<number>; weaponSets: Record<number, WeaponSet>; unreachable: number[] } {
  const all = new Set(allocated);
  const weaponSets: Record<number, WeaponSet> = {};
  const unreachable: number[] = [];
  for (const set of [1, 2] as const) {
    const own = new Set(allocated);
    const other = new Set<number>(
      Object.entries(weaponSets)
        .filter(([, s]) => s !== set)
        .map(([id]) => Number(id)),
    );
    for (const target of targets[set] ?? []) {
      const path = findPath(graph, own, target, cls, ascendancy, other);
      if (path === null) unreachable.push(target);
      else
        for (const id of path) {
          own.add(id);
          all.add(id);
          weaponSets[id] = set;
        }
    }
  }
  return { allocated: all, weaponSets, unreachable };
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
  const lower = name.trim().toLowerCase();
  const matches = Object.entries(graph.data.nodes)
    .filter(([, n]) => n.n.trim().toLowerCase() === lower && n.t !== "start" && isAllocatable(n, cls, ascendancy))
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
