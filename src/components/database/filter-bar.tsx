"use client";

import { useI18n } from "@/i18n/client";

export function FilterBar({
  query,
  onQuery,
  placeholder,
  groups,
  count,
}: {
  query: string;
  onQuery: (q: string) => void;
  placeholder: string;
  groups: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }[];
  count: number;
}) {
  const { t, fmt } = useI18n();
  return (
    <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none sm:w-72"
        />
        {groups.map((g) => (
          <select
            key={g.label}
            aria-label={g.label}
            value={g.value}
            onChange={(e) => g.onChange(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm"
          >
            {g.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
        <span className="ml-auto text-sm text-faint">{fmt(t.common.results, { n: count })}</span>
      </div>
    </div>
  );
}
