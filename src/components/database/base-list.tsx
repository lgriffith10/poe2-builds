"use client";

import { useI18n } from "@/i18n/client";
import { useMemo, useState } from "react";
import type { BaseItem } from "@/lib/types";
import { ItemIcon } from "../ui";
import { FilterBar } from "./filter-bar";
import { useShowMore } from "./use-show-more";

export function BaseList({ bases }: { bases: BaseItem[] }) {
  const { t, fmt } = useI18n();
  const PROP_LABEL: Record<string, string> = {
    armour: t.database.propArmour,
    evasion: t.database.propEvasion,
    energy_shield: t.database.propEnergyShield,
    damage: t.database.propDamage,
    aps: t.database.propAps,
    crit: t.database.propCrit,
    block: t.database.propBlock,
  };
  const ATTR: Record<string, string> = { str: t.planner.strength, dex: t.planner.dexterity, int: t.planner.intelligence };
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState("all");
  const classes = useMemo(() => [...new Set(bases.map((b) => b.class))].sort(), [bases]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bases.filter((b) => (cls === "all" || b.class === cls) && (!q || b.name.toLowerCase().includes(q)));
  }, [bases, query, cls]);
  const { visible, more } = useShowMore(filtered, 90);

  return (
    <>
      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder={t.database.searchBases}
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
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((b) => {
          const reqs = Object.entries(b.req).filter(([, v]) => v > 0);
          return (
            <div key={b.id} id={b.id} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
              <ItemIcon src={b.icon} alt={b.name} size={56} />
              <div className="min-w-0 text-sm">
                <p className="font-semibold">{b.name}</p>
                <p className="text-xs text-muted">
                  {b.class} · {fmt(t.database.level, { n: b.level })}
                </p>
                <ul className="mt-1 text-xs text-[#8fb6f0]">
                  {Object.entries(b.props).map(([k, v]) => (
                    <li key={k}>
                      {PROP_LABEL[k] ?? k}: {k === "crit" || k === "block" ? `${v}%` : v}
                    </li>
                  ))}
                </ul>
                {reqs.length > 0 && (
                  <p className="mt-1 text-xs text-faint">
                    {fmt(t.database.requires, { list: reqs.map(([k, v]) => `${v} ${ATTR[k] ?? k}`).join(", ") })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {more}
    </>
  );
}
