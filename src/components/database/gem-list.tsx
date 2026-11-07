"use client";

import { useI18n } from "@/i18n/client";
import { useMemo, useState } from "react";
import type { Gem } from "@/lib/types";
import { GemIcon } from "../ui";
import { FilterBar } from "./filter-bar";
import { useShowMore } from "./use-show-more";

export function GemList({ gems }: { gems: Gem[] }) {
  const { t, fmt } = useI18n();
  const TYPE_LABEL = { active: t.database.typeActive, support: t.database.typeSupport, spirit: t.database.typeSpirit };
  const ATTR_LABEL = { str: t.database.attrStr, dex: t.database.attrDex, int: t.database.attrInt, mixed: t.database.attrMixed };
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [attr, setAttr] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gems.filter(
      (g) =>
        (type === "all" || g.type === type) &&
        (attr === "all" || g.attr === attr) &&
        (!q || g.name.toLowerCase().includes(q) || g.tags.some((t) => t.includes(q)) || g.text?.toLowerCase().includes(q)),
    );
  }, [gems, query, type, attr]);
  const { visible, more } = useShowMore(filtered, 90);

  return (
    <>
      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder={t.database.searchGems}
        count={filtered.length}
        groups={[
          {
            label: t.database.gemType,
            value: type,
            onChange: setType,
            options: [{ value: "all", label: t.database.allTypes }, ...Object.entries(TYPE_LABEL).map(([value, label]) => ({ value, label }))],
          },
          {
            label: t.database.attribute,
            value: attr,
            onChange: setAttr,
            options: [{ value: "all", label: t.database.allAttributes }, ...Object.entries(ATTR_LABEL).map(([value, label]) => ({ value, label }))],
          },
        ]}
      />
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((g) => (
          <div
            key={g.id}
            id={g.id}
            className="scroll-mt-32 rounded-xl border border-line bg-surface p-3 target:border-gold target:ring-1 target:ring-gold"
          >
            <div className="flex items-center gap-3">
              <GemIcon gem={g} size={44} />
              <div className="min-w-0">
                <p className="font-semibold">{g.name}</p>
                <p className="text-xs text-muted">
                  {fmt(t.database.gemKind, { type: TYPE_LABEL[g.type].toLowerCase() })} · {ATTR_LABEL[g.attr]}
                  {g.tier ? ` · ${fmt(t.database.tier, { n: g.tier })}` : ""}
                </p>
              </div>
            </div>
            {g.text && <p className="mt-2 text-sm text-[#8fb6f0]">{g.text}</p>}
            {g.tags.length > 0 && (
              <p className="mt-2 text-xs capitalize text-faint">{g.tags.map((t) => t.replace(/_/g, " ")).join(" · ")}</p>
            )}
          </div>
        ))}
      </div>
      {more}
    </>
  );
}
