"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import type { PlannerState, TreeData } from "@/lib/types";
import { PassiveTree } from "./passive-tree";

/** Read-only passive tree for a build guide. */
export function BuildTreeViewer({ planner, code }: { planner: PlannerState; code: string }) {
  const { t, path } = useI18n();
  const [tree, setTree] = useState<TreeData | null>(null);
  const [view, setView] = useState<"main" | "ascendancy">("main");

  useEffect(() => {
    fetch("/data/tree.json")
      .then((r) => r.json())
      .then(setTree)
      .catch(() => setTree(null));
  }, []);

  const allocated = useMemo(() => new Set(planner.nodes), [planner.nodes]);

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
