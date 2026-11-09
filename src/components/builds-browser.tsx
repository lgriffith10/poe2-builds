"use client";

import { useMemo, useState } from "react";
import type { BuildSummary } from "@/lib/build-summary";
import { useI18n } from "@/i18n/client";
import { DEFAULT_CATEGORY, DIFFICULTIES, TIER_CATEGORIES, TIERS, type Difficulty, type TierCategory } from "@/lib/types";
import { useFavorites } from "@/lib/favorites";
import { BuildCard } from "./build-card";
import { ClassEmblem } from "./ui";

export function BuildsBrowser({ builds, classes }: { builds: BuildSummary[]; classes: string[] }) {
  const { t, fmt } = useI18n();
  const [cls, setCls] = useState<string | null>(null);
  const [category, setCategory] = useState<TierCategory>(DEFAULT_CATEGORY);
  const [query, setQuery] = useState("");
  // "" = all, "site:Maxroll" = every guide from a site, "author:Maxroll:aer0" = one author.
  const [source, setSource] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { favorites } = useFavorites();
  const favoriteCount = builds.filter((b) => favorites.has(b.slug)).length;

  // Guides spell the same author with different casing ("Havoc" / "havoc"): use the most frequent spelling.
  const list = useMemo(() => {
    const spellings = new Map<string, Map<string, number>>();
    for (const b of builds) {
      if (!b.source) continue;
      const key = b.source.author.toLowerCase();
      const m = spellings.get(key) ?? new Map<string, number>();
      m.set(b.source.author, (m.get(b.source.author) ?? 0) + 1);
      spellings.set(key, m);
    }
    const canonical = (author: string) => [...spellings.get(author.toLowerCase())!].sort((a, b) => b[1] - a[1])[0][0];
    return builds.map((b) => (b.source ? { ...b, source: { ...b.source, author: canonical(b.source.author) } } : b));
  }, [builds]);

  const sources = useMemo(() => {
    const bySite = new Map<string, Map<string, number>>();
    for (const b of list) {
      if (!b.source) continue;
      const authors = bySite.get(b.source.site) ?? new Map<string, number>();
      authors.set(b.source.author, (authors.get(b.source.author) ?? 0) + 1);
      bySite.set(b.source.site, authors);
    }
    return [...bySite]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([site, authors]) => ({
        site,
        count: [...authors.values()].reduce((n, c) => n + c, 0),
        authors: [...authors].sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: "base" })),
      }));
  }, [list]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const [kind, site, author] = source.split(":");
    const matchesSource = (b: BuildSummary) =>
      !source || (b.source?.site === site && (kind === "site" || b.source.author === author));
    const rank = (b: BuildSummary) => {
      const t = b.tiers[category];
      return t ? TIERS.indexOf(t) : TIERS.length;
    };
    return list
      .filter((b) => !onlyFavorites || favorites.has(b.slug))
      .filter((b) => !cls || b.className === cls)
      .filter(matchesSource)
      .filter((b) => !difficulty || b.difficulty === difficulty)
      .filter(
        (b) =>
          !q ||
          [
            b.title,
            b.ascendancy,
            b.className,
            b.damage,
            ...b.tags,
            ...b.skills.map((s) => s.name),
            b.source?.site ?? "",
            b.source?.author ?? "",
          ]
            .join(" ")
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title));
  }, [list, cls, category, query, source, difficulty, onlyFavorites, favorites]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          aria-pressed={onlyFavorites}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm ${
            onlyFavorites ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"
          }`}
        >
          <span aria-hidden="true">{onlyFavorites ? "★" : "☆"}</span>
          {fmt(t.favorites.filter, { n: favoriteCount })}
        </button>
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

      <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-3">
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
          <div role="group" aria-label={t.home.filterDifficulty} className="inline-flex rounded-lg border border-line p-1">
            {[null, ...DIFFICULTIES].map((d) => (
              <button
                key={d ?? "all"}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={difficulty === d}
                className={`rounded-md px-3 py-1.5 text-sm ${difficulty === d ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
              >
                {d ? capitalize(t.levels[d]) : t.home.allDifficulties}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="shrink-0">{t.home.filterSource}</span>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-gold-soft focus:outline-none sm:w-56"
            >
              <option value="">{t.home.allSources}</option>
              {sources.map((s) => (
                <optgroup key={s.site} label={s.site}>
                  <option value={`site:${s.site}`}>
                    {fmt(t.home.allFromSite, { site: s.site })} ({s.count})
                  </option>
                  {s.authors.map(([author, n]) => (
                    <option key={author} value={`author:${s.site}:${author}`}>
                      {author} ({n})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.home.searchPlaceholder}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none sm:w-72"
          />
        </div>
      </div>

      {visible.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((b) => (
            <BuildCard key={b.slug} build={b} category={category} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">
          {onlyFavorites && !favoriteCount ? t.favorites.empty : t.home.noMatch}
        </p>
      )}
    </div>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
