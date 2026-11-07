"use client";

import { useI18n } from "@/i18n/client";
import { useMemo, useState } from "react";
import type { UniqueItem } from "@/lib/types";
import { ItemIcon } from "../ui";
import { FilterBar } from "./filter-bar";
import { useShowMore } from "./use-show-more";

export function UniqueList({ uniques }: { uniques: UniqueItem[] }) {
  const { t, fmt } = useI18n();
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState("all");
  const classes = useMemo(() => [...new Set(uniques.map((u) => u.class))].sort(), [uniques]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return uniques.filter(
      (u) =>
        (cls === "all" || u.class === cls) &&
        (!q ||
          u.name.toLowerCase().includes(q) ||
          u.base.toLowerCase().includes(q) ||
          u.mods.some((m) => m.toLowerCase().includes(q))),
    );
  }, [uniques, query, cls]);
  const { visible, more } = useShowMore(filtered, 60);

  return (
    <>
      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder={t.database.searchUniques}
        count={filtered.length}
        groups={[
          {
            label: t.database.itemClass,
            value: cls,
            onChange: setCls,
            options: [{ value: "all", label: t.database.allItemClasses }, ...classes.map((c) => ({ value: c, label: c }))],
          },
        ]}
      />
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((u) => (
          <div
            key={u.id}
            id={u.id}
            className="flex scroll-mt-32 gap-3 rounded-xl border border-line bg-surface p-3 target:border-gold target:ring-1 target:ring-gold"
          >
            <ItemIcon src={u.icon} alt={u.name} size={72} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-unique">{u.name}</p>
              <p className="text-xs text-muted">
                {u.base} · {u.class}
                {u.level ? ` · ${fmt(t.database.level, { n: u.level })}` : ""}
              </p>
              {u.implicits.length > 0 && (
                <ul className="mt-2 border-b border-line pb-1.5 text-sm text-[#8fb6f0]">
                  {u.implicits.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
              <ul className="mt-1.5 space-y-0.5 text-sm text-[#8fb6f0]">
                {u.mods.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              {u.source && <p className="mt-2 text-xs text-faint">{u.source}</p>}
            </div>
          </div>
        ))}
      </div>
      {more}
    </>
  );
}
