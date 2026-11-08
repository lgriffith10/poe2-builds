"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { MAX_WEAPON_SET_POINTS, nodesForSet } from "@/lib/tree";
import type { PlannerState, TreeData, WeaponSet } from "@/lib/types";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";
import { PassiveTree } from "./passive-tree";

/** Read-only passive tree for a build guide. */
export function BuildTreeViewer({ planner, code }: { planner: PlannerState; code: string }) {
  const { t, path } = useI18n();
  const [tree, setTree] = useState<TreeData | null>(null);
  const [view, setView] = useState<"main" | "ascendancy">("main");
  const [shownSet, setShownSet] = useState<0 | WeaponSet>(0);

  useEffect(() => {
    fetch("/data/tree.json")
      .then((r) => r.json())
      .then(setTree)
      .catch(() => setTree(null));
  }, []);

  const weaponSets = useMemo(() => planner.weaponSets ?? {}, [planner.weaponSets]);
  const setCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0 };
    for (const set of Object.values(weaponSets)) counts[set]++;
    return counts;
  }, [weaponSets]);
  const hasSets = setCounts[1] + setCounts[2] > 0;
  const allocated = useMemo(() => nodesForSet(planner.nodes, weaponSets, shownSet), [planner.nodes, weaponSets, shownSet]);

  return (
    <div>
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
          className="h-[520px]"
        />
      ) : (
        <div className="flex h-[520px] items-center justify-center rounded-xl border border-line text-muted">
          {t.common.loadingTree}
        </div>
      )}
    </div>
  );
}
