"use client";

import { useMemo, useState } from "react";
import type { BuildSummary } from "@/lib/build-summary";
import { useI18n } from "@/i18n/client";
import { DEFAULT_CATEGORY, TIER_CATEGORIES, TIERS, type TierCategory } from "@/lib/types";
import { BuildCard } from "./build-card";
import { ClassEmblem } from "./ui";


export function BuildsBrowser({ builds, classes }: { builds: BuildSummary[]; classes: string[] }) {
  const { t } = useI18n();
  const [cls, setCls] = useState<string | null>(null);
  const [category, setCategory] = useState<TierCategory>(DEFAULT_CATEGORY);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rank = (b: BuildSummary) => {
      const t = b.tiers[category];
      return t ? TIERS.indexOf(t) : TIERS.length;
    };
    return builds
      .filter((b) => !cls || b.className === cls)
      .filter(
        (b) =>
          !q ||
          [b.title, b.ascendancy, b.className, b.damage, ...b.tags, ...b.skills.map((s) => s.name)]
            .join(" ")
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));
  }, [builds, cls, category, query]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCls(null)}
          className={`rounded-lg border px-3 py-2 text-sm ${!cls ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"}`}
        >
          {t.common.allClasses}
        </button>
        {classes.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCls(cls === c ? null : c)}
            aria-pressed={cls === c}
            className={`flex items-center gap-2 rounded-lg border py-1.5 pl-1.5 pr-3 text-sm ${
              cls === c ? "border-gold-soft bg-surface-2 text-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            <ClassEmblem name={c} size={26} />
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-line p-1">
          {TIER_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-3 py-1.5 text-sm ${category === c ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {t.categories[c]}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.home.searchPlaceholder}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none sm:w-72"
        />
      </div>

      {visible.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((b) => (
            <BuildCard key={b.slug} build={b} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">{t.home.noMatch}</p>
      )}
    </div>
  );
}
