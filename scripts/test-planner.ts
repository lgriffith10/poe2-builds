// Sanity checks for the planner logic. Usage: npm run test:planner
import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";
import { decodeBuild, encodeBuild } from "@/lib/build-code";
import {
  aggregateStats, allocateTargets, allocateWeaponSetTargets, countPoints, createGraph, deallocate, dependents, findNodeByName,
  findPath, matchingNodes, nodesForSet, pruneWithWeaponSets, roots,
} from "@/lib/tree";
import { rankGuides } from "@/lib/compare";
import { decodePobCode, extractPobbId, parsePobXml } from "@/lib/pob";
import type { TreeData } from "@/lib/types";

const tree = JSON.parse(fs.readFileSync("public/data/tree.json", "utf8")) as TreeData;
const graph = createGraph(tree);
let passed = 0;
const test = (name: string, fn: () => void) => {
  fn();
  passed++;
  console.log(`✓ ${name}`);
};

const ranger = tree.classes.find((c) => c.name === "Ranger")!;
const witch = tree.classes.find((c) => c.name === "Witch")!;

test("every class start and ascendancy start exists", () => {
  for (const c of tree.classes) {
    assert.equal(tree.nodes[c.start].t, "start");
    for (const a of c.ascendancies) assert.equal(roots(graph, c, a.name).length, 2, a.name);
  }
});

test("findPath reaches a nearby notable through connected nodes only", () => {
  const target = findNodeByName(graph, "Eagle Eye", ranger, null)!;
  const path = findPath(graph, new Set([ranger.start]), target, ranger, null)!;
  assert.ok(path.length > 0 && path.at(-1) === target);
  let prev = ranger.start;
  for (const id of path) {
    assert.ok(graph.adj.get(prev)!.includes(id), `${prev} -> ${id} not adjacent`);
    prev = id;
  }
});

test("paths never go through another class start", () => {
  const far = findNodeByName(graph, "Pure Energy", witch, null)!;
  const path = findPath(graph, new Set([ranger.start]), far, ranger, null)!;
  assert.ok(path.every((id) => tree.nodes[id].t !== "start"));
});

test("other ascendancies cannot be allocated", () => {
  const titanNode = Object.keys(tree.nodes).map(Number).find((id) => tree.nodes[id].a === "Titan")!;
  assert.equal(findPath(graph, new Set(roots(graph, ranger, "Deadeye")), titanNode, ranger, "Deadeye"), null);
});

test("refunding a node removes everything that depended on it", () => {
  const targets = ["Honed Instincts", "Clean Shot"].map((n) => findNodeByName(graph, n, ranger, null)!);
  const { allocated } = allocateTargets(graph, ranger, null, targets);
  const rootIds = roots(graph, ranger, null);
  const first = findPath(graph, new Set(rootIds), targets[0], ranger, null)![0];
  const after = deallocate(graph, allocated, first, rootIds);
  assert.ok(!after.has(targets[1]) || graph.adj.get(ranger.start)!.some((n) => after.has(n)));
  assert.ok(dependents(graph, allocated, first, rootIds).has(first));
  assert.deepEqual(deallocate(graph, allocated, ranger.start, rootIds), allocated, "roots cannot be refunded");
  assert.equal(countPoints(graph, allocated).main, allocated.size - 1);
});

test("build codes round-trip", () => {
  const state = {
    classIndex: 2,
    ascIndex: 1,
    nodes: [ranger.start, 123, 4567, 65000],
    attributes: { 4567: 2 },
    skills: [{ gem: "Spark", supports: ["Arcane Surge", "Spell Echo"] }],
    gear: { amulet: "Choir of the Storm" },
  };
  const decoded = decodeBuild(encodeBuild(state))!;
  assert.deepEqual([...decoded.nodes].sort((a, b) => a - b), [...state.nodes].sort((a, b) => a - b));
  assert.deepEqual(decoded.attributes, state.attributes);
  assert.deepEqual(decoded.skills, state.skills);
  assert.deepEqual(decoded.gear, state.gear);
  assert.equal(decodeBuild("not-a-code"), null);
});

test("weapon sets: separate paths, counts, round-trip and pruning", () => {
  const shared = allocateTargets(graph, ranger, null, []).allocated;
  const near = (from: number) => [...graph.adj.get(from)!].find((id) => tree.nodes[id].t !== "start")!;
  const a = near(ranger.start);
  const b = near(a);
  const sets = allocateWeaponSetTargets(graph, ranger, null, shared, { 1: [b], 2: [b] });
  // Each set paths on its own, never through the other set's nodes: the shared target is taken by set 1 only.
  assert.deepEqual(sets.unreachable, [b]);
  assert.equal(sets.weaponSets[a], 1);
  assert.equal(countPoints(graph, sets.allocated, sets.weaponSets).set1, 2);
  assert.equal(countPoints(graph, sets.allocated, sets.weaponSets).main, 0);
  assert.equal(nodesForSet(sets.allocated, sets.weaponSets, 2).has(a), false);
  const state = { classIndex: 0, ascIndex: -1, nodes: [...sets.allocated], weaponSets: sets.weaponSets, attributes: {}, skills: [], gear: {} };
  assert.deepEqual(decodeBuild(encodeBuild(state))!.weaponSets, sets.weaponSets);
  const next = new Set(sets.allocated);
  next.delete(a);
  const pruned = pruneWithWeaponSets(graph, next, sets.weaponSets, [ranger.start]);
  assert.equal(pruned.allocated.has(b), false);
  assert.deepEqual(pruned.weaponSets, {});
});

test("tree overlap only matches weapon-set nodes taken with set points, whatever the set number", () => {
  // Node 2 is set I in a and set II in b (numbering is arbitrary): it matches. Node 3 is shared in a but set in b: matches.
  assert.equal(matchingNodes([1, 2, 3], { 2: 1 }, [1, 2, 3], { 2: 2, 3: 1 }), 3);
  // Nodes 2 and 3 are in different sets in a but in the same set in b: only one of them can match.
  assert.equal(matchingNodes([2, 3], { 2: 1, 3: 2 }, [2, 3], { 2: 1, 3: 1 }), 1);
});

test("PoB weapon-set nodes are read from <WeaponSet1/2>", () => {
  const xml = `<PathOfBuilding2><Build className="Ranger" level="90"/><Tree activeSpec="1"><Spec treeVersion="0_5" nodes="1,2,3,4"><WeaponSet1 nodes="2"/><WeaponSet2 nodes="3,99"/></Spec></Tree></PathOfBuilding2>`;
  const char = parsePobXml(xml);
  assert.deepEqual(char.nodes, [1, 2, 3, 4]);
  assert.deepEqual(char.weaponSets, { 2: 1, 3: 2 });
});

test("stats aggregate identical wordings", () => {
  const out = aggregateStats(["10% increased Damage", "10% increased Damage", "+5 to Strength"]);
  assert.deepEqual(out[0], { text: "20% increased Damage", count: 2 });
});

const SAMPLE_POB = `<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding2>
  <Build className="Ranger" ascendClassName="Deadeye" level="92"/>
  <Tree activeSpec="1"><Spec treeVersion="0_5" nodes="${ranger.start},4,8"/></Tree>
  <Skills activeSkillSet="1"><SkillSet id="1">
    <Skill enabled="true"><Gem nameSpec="Ice Shot" enabled="true"/><Gem nameSpec="Ricochet II" enabled="true"/><Gem nameSpec="Pierce I" enabled="false"/></Skill>
    <Skill enabled="false"><Gem nameSpec="Snipe" enabled="true"/></Skill>
  </SkillSet></Skills>
  <Items activeItemSet="1">
    <Item id="1">Rarity: UNIQUE
Cadiro&apos;s Gambit
Primed Quiver
Implicits: 0
{range:1}(7-10)% increased Attack Speed</Item>
    <ItemSet id="1"><Slot name="Weapon 2" itemId="1"/><Slot name="Helmet" itemId="0"/></ItemSet>
  </Items>
</PathOfBuilding2>`;

(async () => {
  const code = zlib.deflateSync(SAMPLE_POB).toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
  const char = parsePobXml(await decodePobCode(code));
  assert.equal(char.className, "Ranger");
  assert.equal(char.ascendancy, "Deadeye");
  assert.equal(char.level, 92);
  assert.deepEqual(char.nodes, [ranger.start, 4, 8]);
  assert.deepEqual(char.skills, [{ gem: "Ice Shot", supports: ["Ricochet II"] }], "disabled gems and groups are skipped");
  assert.equal(char.items.offhand?.name, "Cadiro's Gambit");
  assert.deepEqual(char.items.offhand?.mods, ["(7-10)% increased Attack Speed"]);
  assert.equal(char.items.helmet, undefined, "empty slots are ignored");
  assert.equal(extractPobbId("https://pobb.in/GOU67_AGYT_-"), "GOU67_AGYT_-");
  passed++;
  console.log("✓ Path of Building codes decode and parse");

  const guide = (slug: string, ascendancy: string, nodes: number[], gem: string) => ({
    slug, title: slug, className: "Ranger", ascendancy, nodes, keyPassives: [{ id: nodes[0], name: "A" }],
    skills: [{ gem, supports: ["Ricochet II", "Cold Attunement"] }], uniques: ["Cadiro's Gambit"],
  });
  const ranking = rankGuides(
    { className: "Ranger", ascendancy: "Deadeye", nodes: [1, 2, 3], skills: char.skills, uniques: ["Cadiro's Gambit"] },
    [guide("other-asc", "Pathfinder", [1, 2, 3], "Ice Shot"), guide("far", "Deadeye", [9], "Spark"), guide("close", "Deadeye", [1, 2, 3], "Ice Shot")],
  );
  assert.deepEqual(ranking.map((r) => r.guide.slug), ["close", "far", "other-asc"], "same ascendancy first, then by score");
  assert.equal(ranking[0].passives, 1);
  assert.deepEqual(ranking[0].missingSupports, [{ gem: "Ice Shot", supports: ["Cold Attunement"] }]);
  assert.deepEqual(ranking[0].missingUniques, []);
  passed++;
  console.log("✓ characters are ranked against guides");

  console.log(`\n${passed} checks passed`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
