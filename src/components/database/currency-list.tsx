"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import type { PriceTag } from "@/lib/prices";
import type { CurrencyCategory } from "@/lib/types";
import { ItemIcon } from "../ui";
import { FilterBar } from "./filter-bar";

export interface CurrencyRow {
  slug: string;
  name: string;
  category: CurrencyCategory;
  icon: string | null;
  /** First line of what it does (game description, or its first effect). */
  summary: string | null;
  /** Lower-case name, description and effects, for the search box. */
  search: string;
  price: PriceTag | null;
}

export function CurrencyList({ rows, categories }: { rows: CurrencyRow[]; categories: CurrencyCategory[] }) {
  const { t, path } = useI18n();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"all" | CurrencyCategory>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => (cat === "all" || r.category === cat) && (!q || r.search.includes(q)));
  }, [rows, query, cat]);
  const groups = categories.map((c) => ({ c, rows: filtered.filter((r) => r.category === c) })).filter((g) => g.rows.length);

  return (
    <>
      <FilterBar
        query={query}
        onQuery={setQuery}
        placeholder={t.database.searchCurrency}
        count={filtered.length}
        groups={[
          {
            label: t.database.currencyCategory,
            value: cat,
            onChange: (v) => setCat(v as typeof cat),
            options: [
              { value: "all", label: t.database.allCategories },
              ...categories.map((c) => ({ value: c, label: t.database.currencyCategories[c] })),
            ],
          },
        ]}
      />
      {groups.map((g) => (
        <section key={g.c} className="mt-6">
          <h2 className="mb-3 font-display text-lg text-gold">
            {t.database.currencyCategories[g.c]} <span className="text-sm text-faint">({g.rows.length})</span>
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.rows.map((r) => (
              <Link
                key={r.slug}
                href={path(`/database/currency/${r.slug}`)}
                className="flex gap-3 rounded-lg border border-line bg-surface p-2.5 transition hover:border-gold-soft hover:bg-surface-2"
              >
                <ItemIcon src={r.icon} alt="" size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-[#c9b37e]">{r.name}</p>
                    {r.price && (
                      <span className="inline-flex shrink-0 items-center gap-0.5 text-xs tabular-nums text-muted">
                        {r.price.amount}
                        <img src={r.price.icon} alt={r.price.unit} width={14} height={14} className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  {r.summary && <p className="mt-0.5 line-clamp-2 text-xs text-muted">{r.summary}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
