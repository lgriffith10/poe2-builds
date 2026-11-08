"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { decodeBuild, encodeBuild } from "@/lib/build-code";
import {
  MAX_ASCENDANCY_POINTS,
  MAX_PASSIVE_POINTS,
  MAX_WEAPON_SET_POINTS,
  aggregateStats,
  belongsToAscendancy,
  countPoints,
  createGraph,
  findPath,
  nodeStats,
  nodesForSet,
  pruneWithWeaponSets,
  roots,
} from "@/lib/tree";
import type { PlannerState, SkillGroup, TreeData, WeaponSet } from "@/lib/types";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";
import { PassiveTree, type NodePreview } from "../passive-tree";
import { ClassEmblem } from "../ui";
import { useCatalog } from "@/lib/catalog";
import { useI18n } from "@/i18n/client";
import { GearEditor } from "./gear-editor";
import { SkillsEditor } from "./skills-editor";

type Tab = "tree" | "ascendancy" | "skills" | "gear" | "stats";

export function Planner() {
  const { t: tr, fmt } = useI18n();
  const [loaded, setLoaded] = useState<{ tree: TreeData; initial: PlannerState } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/tree.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((tree: TreeData) => {
        // A shared build lives in the URL hash.
        const code = window.location.hash.slice(1);
        const shared = code ? decodeBuild(code) : null;
        const initial: PlannerState =
          shared && tree.classes[shared.classIndex]
            ? {
                ...shared,
                nodes: shared.nodes.filter((id) => tree.nodes[id]),
                weaponSets: Object.fromEntries(Object.entries(shared.weaponSets ?? {}).filter(([id]) => tree.nodes[id])),
              }
            : { classIndex: 0, ascIndex: -1, nodes: [tree.classes[0].start], attributes: {}, skills: [], gear: {} };
        setLoaded({ tree, initial });
      })
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <p className="p-8 text-center text-red-400">{fmt(tr.planner.loadError, { e: error })}</p>;
  if (!loaded) return <p className="p-8 text-center text-muted">{tr.common.loadingTree}</p>;
  return <PlannerInner tree={loaded.tree} initial={loaded.initial} />;
}

function PlannerInner({ tree, initial }: { tree: TreeData; initial: PlannerState }) {
  const { t: tr, fmt, path } = useI18n();
  const attrShort = [tr.planner.strShort, tr.planner.dexShort, tr.planner.intShort];
  const attrNames = [tr.planner.strength, tr.planner.dexterity, tr.planner.intelligence];
  const graph = useMemo(() => createGraph(tree), [tree]);
  const [classIndex, setClassIndex] = useState(initial.classIndex);
  const [ascIndex, setAscIndex] = useState(initial.ascIndex);
  const [allocated, setAllocated] = useState<Set<number>>(() => new Set(initial.nodes));
  const [weaponSets, setWeaponSets] = useState<Record<number, WeaponSet>>(initial.weaponSets ?? {});
  /** Where clicks allocate: the shared tree (0) or one weapon set, whose view then hides the other set. */
  const [activeSet, setActiveSet] = useState<0 | WeaponSet>(0);
  const [attributes, setAttributes] = useState<Record<number, number>>(initial.attributes);
  const [defaultAttr, setDefaultAttr] = useState(0);
  const [skills, setSkills] = useState<SkillGroup[]>(initial.skills);
  const [gear, setGear] = useState<PlannerState["gear"]>(initial.gear);
  const [tab, setTab] = useState<Tab>("tree");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [catalogWanted, setCatalogWanted] = useState(false);
  if (!catalogWanted && (tab === "skills" || tab === "gear")) setCatalogWanted(true);
  const catalog = useCatalog(catalogWanted);

  const cls = tree.classes[classIndex];
  const ascendancy = ascIndex >= 0 ? cls.ascendancies[ascIndex]?.name ?? null : null;
  const rootIds = useMemo(() => roots(graph, cls, ascendancy), [graph, cls, ascendancy]);

  const state: PlannerState = useMemo(
    () => ({
      classIndex,
      ascIndex,
      nodes: [...allocated],
      ...(Object.keys(weaponSets).length && { weaponSets }),
      attributes,
      skills,
      gear,
    }),
    [classIndex, ascIndex, allocated, weaponSets, attributes, skills, gear],
  );
  const code = useMemo(() => encodeBuild(state), [state]);

  // Keep the URL in sync so it can be shared or bookmarked.
  useEffect(() => {
    window.history.replaceState(null, "", `#${code}`);
  }, [code]);

  const selectClass = (index: number) => {
    if (index === classIndex) return;
    setClassIndex(index);
    setAscIndex(-1);
    setAllocated(new Set([tree.classes[index].start]));
    setWeaponSets({});
    setAttributes({});
  };

  const selectAscendancy = (index: number) => {
    const name = index >= 0 ? cls.ascendancies[index].name : null;
    setAscIndex(index);
    setAllocated((prev) => {
      const next = new Set([...prev].filter((id) => !tree.nodes[id].a));
      if (name) roots(graph, cls, name).forEach((id) => next.add(id));
      return next;
    });
    if (name) setTab("ascendancy");
  };

  // Weapon-set mode only applies to the main tree; ascendancy nodes are always shared.
  const mode: 0 | WeaponSet = tab === "tree" ? activeSet : 0;
  const shown = useMemo(() => nodesForSet(allocated, weaponSets, mode), [allocated, weaponSets, mode]);

  /** Allocation after removing `id`, with everything that no longer connects (per weapon set) pruned. */
  const without = useCallback(
    (id: number) => {
      const next = new Set(allocated);
      next.delete(id);
      return pruneWithWeaponSets(graph, next, weaponSets, rootIds);
    },
    [allocated, weaponSets, graph, rootIds],
  );

  /** Path to `id` from the nodes usable in the current mode, without crossing the other set's nodes. */
  const pathTo = useCallback(
    (id: number) => {
      const blocked = new Set(
        Object.entries(weaponSets)
          .filter(([, set]) => set !== mode)
          .map(([n]) => Number(n)),
      );
      return findPath(graph, shown, id, cls, ascendancy, blocked);
    },
    [weaponSets, mode, graph, shown, cls, ascendancy],
  );

  const onNodeClick = useCallback(
    (id: number, { shift }: { shift: boolean }) => {
      const node = tree.nodes[id];
      if (allocated.has(id)) {
        if (shift && node.t === "attribute") {
          setAttributes((a) => ({ ...a, [id]: ((a[id] ?? 0) + 1) % 3 }));
          return;
        }
        if (rootIds.includes(id)) return;
        const next = without(id);
        setAllocated(next.allocated);
        setWeaponSets(next.weaponSets);
        setAttributes((a) => Object.fromEntries(Object.entries(a).filter(([k]) => next.allocated.has(Number(k)))));
        return;
      }
      const path = pathTo(id);
      if (!path) return;
      setAllocated(new Set([...allocated, ...path]));
      if (mode) {
        const set = mode;
        setWeaponSets((w) => ({ ...w, ...Object.fromEntries(path.filter((p) => !tree.nodes[p].a).map((p) => [p, set])) }));
      }
      const newAttrs = path.filter((p) => tree.nodes[p].t === "attribute");
      if (newAttrs.length) setAttributes((a) => ({ ...a, ...Object.fromEntries(newAttrs.map((p) => [p, defaultAttr])) }));
    },
    [allocated, rootIds, without, pathTo, mode, tree, defaultAttr],
  );

  const previewFor = useCallback(
    (id: number): NodePreview | null => {
      if (allocated.has(id)) {
        if (rootIds.includes(id)) return null;
        const kept = without(id).allocated;
        return { add: [], remove: [...allocated].filter((n) => !kept.has(n)) };
      }
      const path = pathTo(id);
      return path ? { add: path, remove: [] } : null;
    },
    [allocated, rootIds, without, pathTo],
  );

  const highlight = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return undefined;
    const out = new Set<number>();
    for (const [id, n] of Object.entries(tree.nodes)) {
      if (n.n.toLowerCase().includes(q) || n.s?.some((s) => s.toLowerCase().includes(q))) out.add(Number(id));
    }
    return out;
  }, [search, tree]);

  const points = countPoints(graph, allocated, weaponSets);
  const stats = useMemo(() => {
    const lines = [...shown].flatMap((id) => nodeStats(tree.nodes[id], attributes[id]));
    return aggregateStats(lines);
  }, [shown, attributes, tree]);
  const attrTotals = useMemo(() => {
    const t = [cls.base.str, cls.base.dex, cls.base.int];
    const re = /^\+(\d+) to (Strength|Dexterity|Intelligence)$/;
    for (const id of shown) {
      for (const s of nodeStats(tree.nodes[id], attributes[id])) {
        const m = s.match(re);
        if (m) t[["Strength", "Dexterity", "Intelligence"].indexOf(m[2])] += Number(m[1]);
      }
    }
    return t;
  }, [shown, attributes, cls, tree]);

  const reset = () => {
    setAllocated(new Set(rootIds));
    setWeaponSets({});
    setAttributes({});
  };

  const share = async () => {
    const url = `${window.location.origin}${path("/planner")}#${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(tr.planner.copyPrompt, url);
    }
  };

  const ascNodeCount = Object.values(tree.nodes).filter((n) => ascendancy && belongsToAscendancy(n, ascendancy)).length;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6">
      {/* Class & ascendancy selection */}
      <div className="flex flex-wrap gap-2">
        {tree.classes.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => selectClass(i)}
            aria-pressed={i === classIndex}
            className={`flex items-center gap-2 rounded-lg border py-1.5 pl-1.5 pr-3 text-sm ${
              i === classIndex ? "border-gold-soft bg-surface-2 text-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            <ClassEmblem name={c.name} size={26} />
            {c.name}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-faint">{tr.planner.ascendancyLabel}</span>
        {[-1, ...cls.ascendancies.map((_, i) => i)].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => selectAscendancy(i)}
            className={`rounded-md border px-3 py-1 text-sm ${
              i === ascIndex ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"
            }`}
          >
            {i < 0 ? tr.planner.none : cls.ascendancies[i].name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface p-3">
        <Counter label={tr.planner.passive} value={points.main} max={MAX_PASSIVE_POINTS} />
        <Counter label={tr.common.ascendancy} value={points.ascendancy} max={MAX_ASCENDANCY_POINTS} />
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {tr.planner.allocateInto}
          <div className="inline-flex rounded-lg border border-line p-0.5" role="group" aria-label={tr.planner.allocateInto}>
            {([0, 1, 2] as const).map((set) => (
              <button
                key={set}
                type="button"
                onClick={() => setActiveSet(set)}
                aria-pressed={activeSet === set}
                title={set ? tr.planner.weaponSetHelp : undefined}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 ${activeSet === set ? "bg-surface-2 text-ink" : "hover:text-ink"}`}
              >
                {set > 0 && <span className="h-2 w-2 rounded-full" style={{ background: WEAPON_SET_COLORS[set as WeaponSet].main }} />}
                {set === 0 ? tr.tree.sharedNodes : set === 1 ? tr.tree.weaponSet1 : tr.tree.weaponSet2}
                {set > 0 && (
                  <span className={(set === 1 ? points.set1 : points.set2) > MAX_WEAPON_SET_POINTS ? "text-red-400" : "text-faint"}>
                    {set === 1 ? points.set1 : points.set2}/{MAX_WEAPON_SET_POINTS}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted">
          {attrTotals.map((v, i) => (
            <span key={i} className="rounded bg-surface-2 px-2 py-1" title={attrNames[i]}>
              {attrShort[i]} <b className="text-ink">{v}</b>
            </span>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          {tr.planner.newAttributeNodes}
          <select
            value={defaultAttr}
            onChange={(e) => setDefaultAttr(Number(e.target.value))}
            className="rounded-md border border-line bg-surface-2 px-2 py-1 text-ink"
          >
            <option value={0}>{tr.planner.strength}</option>
            <option value={1}>{tr.planner.dexterity}</option>
            <option value={2}>{tr.planner.intelligence}</option>
          </select>
        </label>
        <div className="ml-auto flex flex-wrap gap-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tr.planner.searchPassives}
            className="w-44 rounded-md border border-line bg-surface-2 px-3 py-1.5 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none"
          />
          <button type="button" onClick={reset} className="rounded-md border border-line px-3 py-1.5 text-sm text-muted hover:text-ink">
            {tr.planner.resetTree}
          </button>
          <button type="button" onClick={share} className="rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-black hover:bg-[#e2b964]">
            {copied ? tr.planner.linkCopied : tr.planner.share}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 overflow-x-auto border-b border-line">
        {(
          [
            ["tree", tr.common.passiveTree],
            ["ascendancy", tr.common.ascendancy],
            ["skills", fmt(tr.planner.tabSkills, { n: skills.length })],
            ["gear", tr.common.gear],
            ["stats", tr.planner.tabStats],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2 text-sm ${
              tab === key ? "border-gold text-gold" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          {(tab === "tree" || tab === "ascendancy") &&
            (tab === "ascendancy" && !ascendancy ? (
              <p className="rounded-xl border border-line bg-surface p-8 text-center text-muted">
                {tr.planner.pickAscendancy}
              </p>
            ) : (
              <>
                <PassiveTree
                  tree={tree}
                  classIndex={classIndex}
                  ascendancy={ascendancy}
                  view={tab === "tree" ? "main" : "ascendancy"}
                  allocated={shown}
                  weaponSets={weaponSets}
                  attributes={attributes}
                  highlight={highlight}
                  onNodeClick={onNodeClick}
                  previewFor={previewFor}
                  className="h-[70vh] min-h-[420px]"
                />
                <p className="mt-2 text-xs text-faint">
                  {tr.planner.help}
                  {tab === "ascendancy" && ascendancy && ` ${fmt(tr.planner.ascNodes, { name: ascendancy, n: ascNodeCount })}`}
                </p>
              </>
            ))}
          {(tab === "skills" || tab === "gear") && !catalog && (
            <p className="rounded-xl border border-line bg-surface p-8 text-center text-muted">{tr.planner.loadingCatalog}</p>
          )}
          {tab === "skills" && catalog && <SkillsEditor gems={catalog.gems} skills={skills} onChange={setSkills} />}
          {tab === "gear" && catalog && <GearEditor items={catalog.items} gear={gear} onChange={setGear} />}
          {tab === "stats" && <StatsList stats={stats} />}
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border border-line bg-surface p-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">{tr.planner.statSummary}</h3>
            <StatsList stats={stats} compact />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Counter({ label, value, max }: { label: string; value: number; max: number }) {
  const over = value > max;
  return (
    <div className="text-sm">
      <span className="text-muted">{label} </span>
      <b className={over ? "text-red-400" : "text-gold"}>{value}</b>
      <span className="text-faint"> / {max}</span>
    </div>
  );
}

function StatsList({ stats, compact = false }: { stats: { text: string; count: number }[]; compact?: boolean }) {
  const { t: tr } = useI18n();
  const [filter, setFilter] = useState("");
  const shown = stats.filter((s) => s.text.toLowerCase().includes(filter.toLowerCase()));
  if (!stats.length) return <p className="mt-3 text-sm text-faint">{tr.planner.noStats}</p>;
  return (
    <div className={compact ? "mt-3" : "rounded-xl border border-line bg-surface p-4"}>
      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={tr.planner.filterStats}
        className="w-full rounded-md border border-line bg-surface-2 px-3 py-1.5 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none"
      />
      <ul className={`mt-3 space-y-1 overflow-y-auto pr-1 text-sm text-[#8fb6f0] ${compact ? "max-h-[60vh]" : ""}`}>
        {shown.map((s) => (
          <li key={s.text}>{s.text}</li>
        ))}
      </ul>
    </div>
  );
}
