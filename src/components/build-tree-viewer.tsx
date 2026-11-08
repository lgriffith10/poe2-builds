"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { MAX_WEAPON_SET_POINTS, nodesForSet } from "@/lib/tree";
import type { PlannerState, TreeData, WeaponSet } from "@/lib/types";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";
import type { PassiveStep } from "@/lib/builds";
import { PassiveTree } from "./passive-tree";

/**
 * Read-only passive tree for a build guide. With `steps`, a progression bar replays the guide's key passives in
 * order (numbered on the tree), so readers know which branch to take first.
 */
export function BuildTreeViewer({ planner, code, steps = [] }: { planner: PlannerState; code: string; steps?: PassiveStep[] }) {
  const { t, fmt, path } = useI18n();
  const [tree, setTree] = useState<TreeData | null>(null);
  const [view, setView] = useState<"main" | "ascendancy">("main");
  const [shownSet, setShownSet] = useState<0 | WeaponSet>(0);
  /** Number of steps shown (steps.length = the whole tree). */
  const [stepCount, setStepCount] = useState(steps.length);

  // The tree data and art (~500 KB) are only fetched when the viewer gets close to the screen: on guide pages it sits
  // far below the fold, and many readers never scroll that far.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  useEffect(() => {
    if (!near) return;
    fetch("/data/tree.json")
      .then((r) => r.json())
      .then(setTree)
      .catch(() => setTree(null));
  }, [near]);

  const weaponSets = useMemo(() => planner.weaponSets ?? {}, [planner.weaponSets]);
  const setCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0 };
    for (const set of Object.values(weaponSets)) counts[set]++;
    return counts;
  }, [weaponSets]);
  const hasSets = setCounts[1] + setCounts[2] > 0;
  const allocated = useMemo(() => {
    const shown = nodesForSet(planner.nodes, weaponSets, shownSet);
    if (stepCount >= steps.length || !tree) return shown;
    // Partial progression: class/ascendancy starts, the ascendancy, and the nodes of the first steps.
    const upTo = new Set(steps.slice(0, stepCount).flatMap((st) => st.nodes));
    return new Set([...shown].filter((id) => upTo.has(id) || tree.nodes[id]?.a || tree.nodes[id]?.t === "start"));
  }, [planner.nodes, weaponSets, shownSet, stepCount, steps, tree]);
  // Step numbers on the tree, for the steps of the weapon set shown.
  const visibleSteps = useMemo(
    () => steps.map((st, i) => ({ ...st, index: i + 1 })).filter((st) => !shownSet || !st.set || st.set === shownSet),
    [steps, shownSet],
  );
  const markers = useMemo(() => new Map(visibleSteps.map((st) => [st.id, st.index])), [visibleSteps]);
  const current = stepCount > 0 && stepCount < steps.length ? steps[stepCount - 1] : null;
  const highlight = useMemo(() => (current ? new Set([current.id]) : undefined), [current]);
  // Cumulative points after each step, per pool: the shared tree and each weapon set have their own budget.
  const totals = useMemo(() => {
    const sums = { 0: 0, 1: 0, 2: 0 };
    return steps.map((st) => (sums[st.set ?? 0] += st.points));
  }, [steps]);

  return (
    <div ref={wrapRef}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-lg border border-line p-1">
          {(["main", "ascendancy"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-sm ${view === v ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {v === "main" ? t.common.passiveTree : t.common.ascendancy}
            </button>
          ))}
        </div>
        {hasSets && view === "main" && (
          <div className="inline-flex flex-wrap items-center rounded-lg border border-line p-1" role="group" aria-label={t.tree.weaponSets}>
            {([0, 1, 2] as const).map((set) => (
              <button
                key={set}
                type="button"
                onClick={() => setShownSet(set)}
                aria-pressed={shownSet === set}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${shownSet === set ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`}
              >
                {set > 0 && (
                  <span className="h-2 w-2 rounded-full" style={{ background: WEAPON_SET_COLORS[set as WeaponSet].main }} />
                )}
                {set === 0 ? t.tree.bothSets : set === 1 ? t.tree.weaponSet1 : t.tree.weaponSet2}
                {set > 0 && (
                  <span className="text-xs text-faint">
                    {setCounts[set as WeaponSet]}/{MAX_WEAPON_SET_POINTS}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <Link
          href={path(`/planner#${code}`)}
          className="ml-auto rounded-lg border border-gold-soft px-3 py-1.5 text-sm text-gold hover:bg-surface-2"
        >
          {t.common.openInPlanner}
        </Link>
      </div>
      {tree ? (
        <PassiveTree
          tree={tree}
          classIndex={planner.classIndex}
          ascendancy={tree.classes[planner.classIndex].ascendancies[planner.ascIndex]?.name ?? null}
          view={view}
          allocated={allocated}
          weaponSets={weaponSets}
          attributes={planner.attributes}
          markers={view === "main" ? markers : undefined}
          highlight={view === "main" ? highlight : undefined}
          className="h-[520px]"
        />
      ) : (
        <div className="flex h-[520px] items-center justify-center rounded-xl border border-line text-muted">
          {t.common.loadingTree}
        </div>
      )}
      {steps.length > 0 && view === "main" && (
        <div className="mt-3 rounded-xl border border-line bg-surface p-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold">{t.build.progression}</span>
            <button
              type="button"
              onClick={() => setStepCount((n) => Math.max(0, n - 1))}
              disabled={stepCount === 0}
              aria-label={t.build.previousStep}
              className="h-7 w-7 rounded-md border border-line text-muted hover:text-ink disabled:opacity-40"
            >
              ‹
            </button>
            <input
              type="range"
              min={0}
              max={steps.length}
              value={stepCount}
              onChange={(e) => setStepCount(Number(e.target.value))}
              aria-label={t.build.progression}
              className="min-w-32 flex-1 accent-[#d4a64f]"
            />
            <button
              type="button"
              onClick={() => setStepCount((n) => Math.min(steps.length, n + 1))}
              disabled={stepCount === steps.length}
              aria-label={t.build.nextStep}
              className="h-7 w-7 rounded-md border border-line text-muted hover:text-ink disabled:opacity-40"
            >
              ›
            </button>
            <span className="text-sm text-muted">
              {stepCount === steps.length
                ? t.build.fullTree
                : fmt(t.build.stepOf, { k: stepCount, n: steps.length })}
              {current && <b className="ml-1.5 text-ink">{current.name}</b>}
            </span>
          </div>
          <p className="mt-1 text-xs text-faint">{t.build.progressionHint}</p>
          <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {visibleSteps.map((st) => {
              const reached = st.index <= stepCount;
              return (
                <li key={`${st.id}-${st.index}`}>
                  <button
                    type="button"
                    onClick={() => setStepCount(st.index)}
                    className={`flex w-full items-center gap-2 rounded-md border px-2 py-1.5 text-left text-sm ${
                      st.index === stepCount && stepCount < steps.length ? "border-gold-soft bg-surface-2" : "border-line hover:border-line-strong"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        reached ? "bg-gold text-black" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {st.index}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{st.name}</span>
                    {st.set && (
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: WEAPON_SET_COLORS[st.set].main }} title={st.set === 1 ? t.tree.weaponSet1 : t.tree.weaponSet2} />
                    )}
                    <span className="shrink-0 text-xs tabular-nums text-faint">
                      {st.points > 0 ? fmt(t.build.stepPoints, { n: st.points, total: totals[st.index - 1] }) : t.build.stepFree}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
