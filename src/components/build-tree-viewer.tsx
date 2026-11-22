"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import { encodeBuild } from "@/lib/build-code";
import { MAX_WEAPON_SET_POINTS, nodesForSet } from "@/lib/tree";
import { TREE_STAGES, type PassiveStep, type PlannerState, type TreeData, type TreeVariant, type WeaponSet } from "@/lib/types";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";

import { PassiveTree } from "./passive-tree";

/**
 * Read-only passive tree for a build guide. With `steps`, a progression bar replays the guide's key passives in
 * order (numbered on the tree), so readers know which branch to take first. With `variants`, readers can switch to the
 * source planner's other trees (leveling stages, respecs, endgame variants).
 */
export function BuildTreeViewer({
  planner: guidePlanner,
  code: guideCode,
  steps: guideSteps = [],
  variants = [],
  variantsSource = null,
  initialVariant = -1,
  compact = false,
}: {
  planner: PlannerState;
  code: string;
  steps?: PassiveStep[];
  variants?: TreeVariant[];
  variantsSource?: string | null;
  /** Tree shown first: -1 = the guide tree, else an index in `variants`. */
  initialVariant?: number;
  /** Fills its container's height: a select for the trees, a one-line progression, no step list (in-game view). */
  compact?: boolean;
}) {
  const { t, fmt, path } = useI18n();
  /** -1 = the guide tree, else an index in `variants`. */
  const [variantIndex, setVariantIndex] = useState(initialVariant);
  const variant = variants[variantIndex] ?? null;
  // A source tree keeps the guide's skills and gear; the guide tree's weapon sets must not leak into it.
  const planner = useMemo<PlannerState>(
    () => (variant ? { ...guidePlanner, weaponSets: undefined, ...variant.planner } : guidePlanner),
    [variant, guidePlanner],
  );
  const code = useMemo(() => (variant ? encodeBuild(planner) : guideCode), [variant, planner, guideCode]);
  const steps = variant?.steps ?? guideSteps;
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

  const pickVariant = (i: number) => {
    setVariantIndex(i);
    setShownSet(0);
    setStepCount((variants[i]?.steps ?? guideSteps).length);
  };

  return (
    <div ref={wrapRef} className={compact ? "flex h-full min-h-0 flex-col" : undefined}>
      {compact && variants.length > 0 && (
        <select
          value={variantIndex}
          onChange={(e) => pickVariant(Number(e.target.value))}
          aria-label={t.build.treeVariants}
          className="mb-2 w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-sm"
        >
          <option value={-1}>{t.build.guideTree}</option>
          {TREE_STAGES.filter((st) => variants.some((x) => x.stage === st)).map((st) => (
            <optgroup key={st} label={t.build.treeStages[st]}>
              {variants.map((x, i) =>
                x.stage === st ? (
                  <option key={i} value={i}>
                    {x.name}
                    {x.level ? ` (${x.level}+)` : ""}
                  </option>
                ) : null,
              )}
            </optgroup>
          ))}
        </select>
      )}
      {!compact && variants.length > 0 && (
        <TreeVariantPicker
          variants={variants}
          current={variantIndex}
          onPick={pickVariant}
          source={variantsSource}
        />
      )}
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
          className={compact ? "min-h-0 flex-1" : "h-[520px]"}
        />
      ) : (
        <div className={`flex items-center justify-center rounded-xl border border-line text-muted ${compact ? "min-h-0 flex-1" : "h-[520px]"}`}>
          {t.common.loadingTree}
        </div>
      )}
      {steps.length > 0 && view === "main" && (
        <div className={compact ? "mt-2 rounded-lg border border-line bg-surface px-3 py-2" : "mt-3 rounded-xl border border-line bg-surface p-3"}>
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
          {!compact && <p className="mt-1 text-xs text-faint">{t.build.progressionHint}</p>}
          <ol className={compact ? "hidden" : "mt-3 grid gap-1.5 sm:grid-cols-2"}>
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

const STAGE_COLORS: Record<TreeVariant["stage"], string> = {
  leveling: "#7fb069",
  mapping: "#5aa9e6",
  endgame: "#d4a64f",
  minmax: "#c06cd4",
};

/** Buttons for the guide tree and each source tree (grouped by stage), and what changes with the selected one. */
function TreeVariantPicker({
  variants,
  current,
  onPick,
  source,
}: {
  variants: TreeVariant[];
  current: number;
  onPick: (i: number) => void;
  source: string | null;
}) {
  const { t, fmt } = useI18n();
  const v = variants[current] ?? null;
  const chip = (active: boolean) =>
    `rounded-md border px-2.5 py-1 text-sm ${active ? "border-gold-soft bg-surface-2 text-ink" : "border-line text-muted hover:border-line-strong hover:text-ink"}`;
  const attrs = v
    ? (["str", "dex", "int", "free"] as const)
        .filter((k) => v.attributes[k] > 0)
        .map((k) => `${v.attributes[k]} ${t.build.treeAttrNames[k]}`)
    : [];
  return (
    <div className="mb-3 rounded-xl border border-line bg-surface p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{t.build.treeVariants}</span>
        {source && (
          <a href={source} rel="noopener" target="_blank" className="text-xs text-gold hover:underline">
            {t.build.treeVariantsSource} ↗
          </a>
        )}
      </div>
      <p className="mt-1 text-xs text-faint">{t.build.treeVariantsHint}</p>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => onPick(-1)} aria-pressed={current === -1} className={chip(current === -1)}>
            {t.build.guideTree}
          </button>
        </div>
        {TREE_STAGES.filter((st) => variants.some((x) => x.stage === st)).map((st) => (
          <div key={st} className="flex flex-wrap items-center gap-1.5">
            <span className="flex w-24 shrink-0 items-center gap-1.5 text-xs uppercase tracking-wide text-faint">
              <span className="h-2 w-2 rounded-full" style={{ background: STAGE_COLORS[st] }} />
              {t.build.treeStages[st]}
            </span>
            {variants.map((x, i) =>
              x.stage === st ? (
                <button key={i} type="button" onClick={() => onPick(i)} aria-pressed={current === i} className={chip(current === i)}>
                  {x.name}
                  {x.level && <span className="ml-1.5 text-xs text-faint">{x.level}+</span>}
                </button>
              ) : null,
            )}
          </div>
        ))}
      </div>
      {v && (
        <div className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
          <p className="text-muted">
            {[
              v.level && fmt(t.build.treeFromLevel, { n: v.level }),
              fmt(t.build.treePoints, { n: v.points }),
              (v.setPoints[1] || v.setPoints[2]) && fmt(t.build.treeSetPoints, { a: v.setPoints[1], b: v.setPoints[2] }),
            ]
              .filter(Boolean)
              .join(" · ")}
            {attrs.length > 0 && (
              <>
                {" · "}
                {t.build.treeAttributes} <span className="text-ink">{attrs.join(", ")}</span>
              </>
            )}
          </p>
          {v.changes && (
            <div className="text-muted">
              <p>{fmt(t.build.treeChanges, { from: v.changes.from, added: v.changes.added, removed: v.changes.removed })}</p>
              {v.changes.removedKeys.length > 0 && (
                <p>
                  <span className="text-[#e07a6a]">{t.build.treeRefund}</span> {v.changes.removedKeys.join(", ")}
                </p>
              )}
              {v.changes.addedKeys.length > 0 && (
                <p>
                  <span className="text-[#7fb069]">{t.build.treeNew}</span> {v.changes.addedKeys.join(", ")}
                </p>
              )}
            </div>
          )}
          {v.detached.length > 0 && (
            <p className="text-muted">
              {t.build.treeDetached} <span className="text-ink">{v.detached.join(", ")}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
