// Adds the weapon-set facts of a guide's Maxroll planner to its front matter:
// - passives: `passives.weaponSet1` / `weaponSet2`. The planner variant used is the one whose shared notables best match
//   the guide's `passives.path`. Set notables are removed from `path` (they are not shared nodes), and each set is
//   trimmed to fit its 24 points in our re-pathed tree;
// - skills: `weaponSet: 1|2` on each skill, when the planner sockets skills on both weapon sets;
// - gear: `weapon2` / `offhand2` (weapon set II) in `gear` and `gearStages`, taken from `draft:maxroll` output for the
//   same profile, only where that output's set I weapon matches the guide's (so the right variant is used).
// Ladder guides (poe.ninja characters) get their set passives from `passiveSelectionSet1/2`; poe.ninja does not say which
// set a skill is socketed on, so skills and gear are left as they are.
// Usage: npm run builds:weapon-sets -- [slug...]   (no slug: every guide sourced from Maxroll or poe.ninja)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { guidePlanner } from "./maxroll-planner.cjs";
import YAML, { parseDocument } from "yaml";
import { character, snapshot } from "./ninja-lib.mjs";
import { getClass, tree } from "@/lib/data";
import {
  allocateTargets,
  allocateWeaponSetTargets,
  createGraph,
  findNodeByName,
  MAX_WEAPON_SET_POINTS,
} from "@/lib/tree";
import type { WeaponSet } from "@/lib/types";

type Step =
  | number
  | { add?: number[]; remove?: number[] }
  | { id: number; set: WeaponSet };
interface Variant {
  name: string;
  history: Step[];
}
interface Profile {
  name: string;
  passives: { variants: Variant[] };
  skills: { steps: { name: string; skills: { gems: { id: string }[]; weaponSet?: WeaponSet }[] }[] };
}

// Gem display names by metadata id (same lookup as draft-from-maxroll).
const gemsRaw = JSON.parse(fs.readFileSync(".cache/raw/skill_gems.json", "utf8")) as Record<
  string,
  { base_item?: { display_name?: string } }
>;
const gemName = (id: string) =>
  (
    gemsRaw[id] ??
    gemsRaw[id.replace("/Gems/", "/Gem/")] ??
    gemsRaw[id.replace("/Gem/", "/Gems/")]
  )?.base_item?.display_name;

const graph = createGraph(tree);
const KEY_TYPES = new Set(["notable", "keystone"]);
const name = (id: number) => tree.nodes[id].n.trim();

function readVariant(v: Variant) {
  const shared: number[] = [];
  const sets: Record<WeaponSet, number[]> = { 1: [], 2: [] };
  for (const step of v.history) {
    if (typeof step === "number") shared.push(step);
    else if ("set" in step) {
      // Only sets 1 and 2 hold weapon-set points; other values are ignored.
      if (tree.nodes[step.id] && (step.set === 1 || step.set === 2))
        sets[step.set].push(step.id);
    } else {
      for (const id of step.add ?? [])
        if (!shared.includes(id)) shared.push(id);
      for (const id of step.remove ?? [])
        if (shared.includes(id)) shared.splice(shared.indexOf(id), 1);
    }
  }
  const keys = (ids: number[]) => [
    ...new Set(
      ids
        .filter((id) => tree.nodes[id] && KEY_TYPES.has(tree.nodes[id].t))
        .map(name),
    ),
  ];
  return {
    name: v.name,
    shared: keys(shared.filter((id) => tree.nodes[id] && !tree.nodes[id].a)),
    sets: { 1: keys(sets[1]), 2: keys(sets[2]) },
  };
}

async function plannerVariants(guideUrl: string) {
  const found = await guidePlanner(guideUrl);
  if (!found.data) return null;
  const data = found.data as { profiles: Profile[] };
  return data.profiles.flatMap((p) =>
    p.passives.variants.map((v) => ({ profile: p, ...readVariant(v) })),
  );
}

/** Weapon set of each skill (by its first gem) in the planner step matching the variant, when both sets are used. */
function skillSets(profile: Profile, variantName: string) {
  const step = profile.skills.steps.find((s) => s.name === variantName) ?? profile.skills.steps.at(-1);
  const out = new Map<string, WeaponSet>();
  for (const group of step?.skills ?? []) {
    const first = group.gems[0] && gemName(group.gems[0].id);
    if (first && group.weaponSet && !out.has(first.toLowerCase())) out.set(first.toLowerCase(), group.weaponSet);
  }
  return new Set(out.values()).size > 1 ? out : new Map<string, WeaponSet>();
}

type GearBlock = Record<string, { unique?: string; base?: string } | undefined>;
/** Gear of draft:maxroll for that guide and profile: the reference `gear` and the `gearStages`. */
function draftGear(guideSlug: string, profile: string) {
  const run = (extra: string[]) => {
    try {
      return execFileSync("node", ["scripts/draft-from-maxroll.cjs", guideSlug, profile, ...extra], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
    } catch {
      return ""; // the draft failed for this guide: no gear from it
    }
  };
  const parse = <T,>(text: string): T | null => {
    try {
      return YAML.parse(text) as T;
    } catch {
      return null; // the draft could not resolve something (e.g. "ascendancy: ?"): no gear from it
    }
  };
  const main = parse<{ gear?: GearBlock }>(run([]).split("---\n")[1] ?? "");
  const stages = parse<{ gearStages?: Record<string, GearBlock> }>(run(["--stages"]))?.gearStages ?? {};
  // Stats the draft could not label come out as "?stat_id": dropped.
  for (const block of [main?.gear, ...Object.values(stages)])
    for (const piece of Object.values(block ?? {}) as { mods?: string[] }[])
      if (piece?.mods) piece.mods = piece.mods.filter((m) => !m.startsWith("?"));
  // A two-handed weapon is listed in both hands: keep it as the weapon only.
  for (const block of [main?.gear, ...Object.values(stages)])
    if (block?.offhand2 && JSON.stringify(block.offhand2) === JSON.stringify(block.weapon2)) delete block.offhand2;
  return { gear: main?.gear ?? {}, stages };
}
const sameItem = (a?: { unique?: string; base?: string }, b?: { unique?: string; base?: string }) =>
  Boolean(a && b && (a.unique ? a.unique === b.unique : a.base && a.base === b.base));

/** A poe.ninja character as a single variant; set nodes ordered by distance from the shared tree. */
async function ninjaVariants(url: string) {
  const m = decodeURIComponent(url).match(/builds\/([^/]+)\/character\/([^/]+)\/([^/?]+)/);
  if (!m) return null;
  const c = await character(await snapshot(m[1]), m[2], m[3]);
  const shared: number[] = c.passiveSelection ?? [];
  const history: Step[] = [...shared];
  for (const set of [1, 2] as const) {
    const own = new Set<number>(c[`passiveSelectionSet${set}`] ?? []);
    const seen = new Set(shared);
    const queue = [...shared];
    for (let head = 0; head < queue.length; head++)
      for (const next of graph.adj.get(queue[head]) ?? [])
        if (own.has(next) && !seen.has(next)) {
          seen.add(next);
          queue.push(next);
          history.push({ id: next, set });
        }
  }
  return [{ profile: undefined, ...readVariant({ name: c.name, history }) }];
}

const yamlList = (items: string[]) =>
  `[${items.map((s) => (/[:,[\]#]/.test(s) || /^[!&*'"]/.test(s) ? JSON.stringify(s) : s)).join(", ")}]`;

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs
      .readdirSync("content/builds")
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));

async function main() {
  for (const slug of slugs) {
    const file = `content/builds/${slug}.md`;
    const text = fs.readFileSync(file, "utf8");
    const fm = YAML.parse(text.split("---\n")[1]);
    const url: string | undefined = fm.source?.url;
    const fromMaxroll = url?.startsWith("https://maxroll.gg/poe2/build-guides/");
    if (!url || !(fromMaxroll || url.startsWith("https://poe.ninja/poe2/builds/"))) {
      console.log(`- ${slug}: not a Maxroll or poe.ninja guide, skipped`);
      continue;
    }
    const variants: { profile?: Profile; name: string; shared: string[]; sets: Record<WeaponSet, string[]> }[] | null =
      fromMaxroll ? await plannerVariants(url) : await ninjaVariants(url);
    if (!variants?.length) {
      console.log(`- ${slug}: no planner found`);
      continue;
    }
    // Best match: Jaccard similarity between the guide's notables (path and weapon sets) and the variant's.
    const path: string[] = fm.passives.path.map((n: string) => n.trim());
    const guideNames = new Set([...path, ...(fm.passives.weaponSet1 ?? []), ...(fm.passives.weaponSet2 ?? [])].map((n: string) => n.trim()));
    const score = (v: (typeof variants)[number]) => {
      const all = new Set([...v.shared, ...v.sets[1], ...v.sets[2]]);
      const common = [...guideNames].filter((n) => all.has(n)).length;
      return common / Math.max(1, new Set([...guideNames, ...all]).size);
    };
    // Ties (common: every late variant contains the path) are broken by the guide's skills found in the variant's
    // skill step, then by the latest variant (planners list them in progression order).
    const guideGems = new Set<string>((fm.skills ?? []).map((g: { gem: string }) => g.gem.toLowerCase()));
    const skillScore = (v: (typeof variants)[number]) => {
      if (!v.profile) return 0;
      const step = v.profile.skills.steps.find((st) => st.name === v.name) ?? v.profile.skills.steps.at(-1);
      const found = (step?.skills ?? []).filter((g) => guideGems.has((gemName(g.gems[0]?.id ?? "") ?? "").toLowerCase()));
      return found.length / Math.max(1, guideGems.size);
    };
    const best = variants.reduce((a, b) =>
      score(b) > score(a) || (score(b) === score(a) && skillScore(b) >= skillScore(a)) ? b : a,
    );
    const label = `"${best.profile ? `${best.profile.name} / ` : ""}${best.name}" (match ${Math.round(score(best) * 100)}%)`;
    const report: string[] = [];
    let out = text;
    if (!best.sets[1].length && !best.sets[2].length) report.push("no set passives");
    else {

    const cls = getClass(fm.class)!;
    const asc: string = fm.ascendancy;
    const resolve = (n: string) => findNodeByName(graph, n, cls, asc);
    const setNames = new Set([...best.sets[1], ...best.sets[2]]);
    const newPath = path.filter((n) => !setNames.has(n));
    const { allocated } = allocateTargets(
      graph,
      cls,
      asc,
      [...newPath, ...(fm.passives.ascendancy ?? [])].map((n: string) =>
        resolve(n)!,
      ),
    );
    // Shared notables already on the path need no set point; unknown names are dropped.
    const wanted = (set: WeaponSet) =>
      best.sets[set].filter(
        (n) => resolve(n) !== null && !allocated.has(resolve(n)!),
      );
    const sets: Record<WeaponSet, string[]> = { 1: wanted(1), 2: wanted(2) };
    const used = () => {
      const r = allocateWeaponSetTargets(graph, cls, asc, allocated, {
        1: sets[1].map((n) => resolve(n)!),
        2: sets[2].map((n) => resolve(n)!),
      });
      const count = (set: WeaponSet) =>
        Object.values(r.weaponSets).filter((s) => s === set).length;
      return { 1: count(1), 2: count(2), unreachable: r.unreachable.map(name) };
    };
    let u = used();
    if (u.unreachable.length) {
      // Notables our shared tree cannot reach without crossing the other set: dropped.
      console.warn(
        `  ⚠ ${slug}: unreachable ${u.unreachable.join(", ")}, dropped`,
      );
      for (const set of [1, 2] as const)
        sets[set] = sets[set].filter((n) => !u.unreachable.includes(n));
      u = used();
    }
    for (const set of [1, 2] as const) {
      while (u[set] > MAX_WEAPON_SET_POINTS) {
        sets[set] = sets[set].slice(0, -1);
        u = used();
      }
    }

    // Drop the set notables from `path`, keeping the other lines as they are written.
    out = out.replace(/  path:\n(?:    - .*\n)+/, (block) =>
      block
        .split("\n")
        .filter((line) => {
          const m = line.match(/^    - (.*)$/);
          return !m || !setNames.has(String(YAML.parse(m[1])).trim());
        })
        .join("\n"),
    );
    // Existing lists, in flow ([a, b]) or block (one "- item" per line) style.
    out = out.replace(/  weaponSet[12]:.*\n(?:    - .*\n)*/g, "");
    const lines = ([1, 2] as const)
      .filter((s) => sets[s].length)
      .map((s) => `  weaponSet${s}: ${yamlList(sets[s])}\n`)
      .join("");
    out = out.replace(/(  ascendancy: \[.*\]\n)/, `$1${lines}`);
    report.push(
      `passives: path ${path.length} -> ${newPath.length}, set I ${sets[1].length} notables / ${u[1]} pts, set II ${sets[2].length} / ${u[2]} pts`,
    );
    }

    // Skills and weapon set II gear, edited through the YAML document (formatting is preserved).
    const [before, fmText, ...rest] = out.split("---\n");
    const doc = parseDocument(fmText);
    const profile = best.profile;
    if (!profile) {
      fs.writeFileSync(file, out);
      console.log(`✓ ${slug}: ${label}\n    ${report.join("\n    ")}\n    skills and gear: not in the ladder data`);
      continue;
    }
    const bySkill = skillSets(profile, best.name);
    let tagged = 0;
    (doc.get("skills") as YAML.YAMLSeq<YAML.YAMLMap>).items.forEach((item) => {
      const set = bySkill.get(String(item.get("gem")).toLowerCase());
      if (set) {
        item.set("weaponSet", set);
        tagged++;
      } else item.delete("weaponSet");
    });
    report.push(bySkill.size ? `skills: ${tagged} tagged` : "skills: single set");

    const draft = draftGear(url.split("/").pop()!, profile.name);
    const addSwap = (path: string[], from: GearBlock | undefined) => {
      const mine = (doc.getIn(path) as YAML.YAMLMap | undefined)?.toJSON() as GearBlock | undefined;
      if (!mine || !from || !(from.weapon2 || from.offhand2)) return null;
      if (!sameItem(mine.weapon ?? mine.offhand, from.weapon ?? from.offhand)) return `${path.join(".")}: weapon differs, skipped`;
      for (const slot of ["weapon2", "offhand2"]) {
        if (from[slot]) {
          const node = doc.createNode(from[slot]) as YAML.YAMLMap;
          const mods = node.get("mods", true) as YAML.YAMLSeq | undefined;
          if (mods) mods.flow = true; // same `mods: [a, b]` style as the rest of the guides
          doc.setIn([...path, slot], node);
        }
        else doc.deleteIn([...path, slot]);
      }
      return `${path.join(".")}: ${[from.weapon2, from.offhand2].map((p) => p?.unique ?? p?.base ?? (p ? "rare" : "-")).join(" + ")}`;
    };
    const gearNotes = [
      addSwap(["gear"], draft.gear),
      ...Object.keys((doc.get("gearStages") as YAML.YAMLMap | undefined)?.toJSON() ?? {}).map((stage) =>
        addSwap(["gearStages", stage], draft.stages[stage]),
      ),
    ].filter(Boolean);
    report.push(gearNotes.length ? `gear: ${gearNotes.join("; ")}` : "gear: no set II weapon");

    fs.writeFileSync(file, [before, doc.toString({ lineWidth: 0, flowCollectionPadding: false }), ...rest].join("---\n"));
    console.log(`✓ ${slug}: ${label}\n    ${report.join("\n    ")}`);
  }
}

main();
