"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BuildSummary } from "@/lib/build-summary";
import { useI18n } from "@/i18n/client";
import { TIERS, type TierCategory, type TierChange } from "@/lib/types";
import { ClassEmblem, GemIcon, TierBadge } from "./ui";

/** Damage types of a build, e.g. "Cold / Physical" → ["Cold", "Physical"]. */
const damageTypes = (d: string) => d.split("/").map((x) => x.trim()).filter(Boolean);

const CHANGE_STYLE: Record<TierChange, string> = {
  new: "border-sky-500/50 bg-sky-500/10 text-sky-300",
  up: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
  down: "border-red-500/50 bg-red-500/10 text-red-300",
};

export function TierBoard({ builds, category }: { builds: BuildSummary[]; category: TierCategory }) {
  const { t, fmt, path } = useI18n();
  const [cls, setCls] = useState<string | null>(null);
  const [damage, setDamage] = useState<string | null>(null);
  const [beginner, setBeginner] = useState(false);

  const ranked = builds.filter((b) => b.ratings[category]);
  const classes = useMemo(() => [...new Set(ranked.map((b) => b.className))].sort(), [ranked]);
  const damages = useMemo(() => [...new Set(ranked.flatMap((b) => damageTypes(b.damage)))].sort(), [ranked]);
  const visible = ranked
    .filter((b) => !cls || b.className === cls)
    .filter((b) => !damage || damageTypes(b.damage).includes(damage))
    .filter((b) => !beginner || b.beginner);

  const chip = (active: boolean) =>
    `rounded-lg border px-3 py-1.5 text-sm ${active ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-24 text-xs uppercase tracking-wider text-faint">{t.tierList.filterClass}</span>
          <button type="button" className={chip(!cls)} onClick={() => setCls(null)}>
            {t.common.allClasses}
          </button>
          {classes.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cls === c}
              onClick={() => setCls(cls === c ? null : c)}
              className={`${chip(cls === c)} flex items-center gap-2 py-1 pl-1`}
            >
              <ClassEmblem name={c} size={22} />
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-24" />
          <button
            type="button"
            aria-pressed={beginner}
            onClick={() => setBeginner(!beginner)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              beginner ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300" : "border-line text-muted hover:text-ink"
            }`}
          >
            {beginner ? "✓ " : ""}
            {t.beginner.filter}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-24 text-xs uppercase tracking-wider text-faint">{t.tierList.filterDamage}</span>
          <button type="button" className={chip(!damage)} onClick={() => setDamage(null)}>
            {t.tierList.allDamage}
          </button>
          {damages.map((d) => (
            <button key={d} type="button" aria-pressed={damage === d} onClick={() => setDamage(damage === d ? null : d)} className={chip(damage === d)}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {TIERS.map((tier) => {
          // Sourced tiers first, then estimated ones.
          const inTier = visible
            .filter((b) => b.ratings[category]?.tier === tier)
            .sort((a, b) => Number(a.ratings[category]!.estimated) - Number(b.ratings[category]!.estimated));
          return (
            <div key={tier} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
              <TierBadge tier={tier} size="lg" />
              <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {inTier.length === 0 && <p className="self-center px-2 text-sm text-faint">{t.tierList.noBuilds}</p>}
                {inTier.map((b) => {
                  const change = b.tierChanges[category];
                  const estimated = b.ratings[category]!.estimated;
                  return (
                    <Link
                      key={b.slug}
                      href={path(`/builds/${b.slug}`)}
                      title={estimated ? fmt(t.common.estimatedTier, { tier }) : undefined}
                      className={`flex items-center gap-3 rounded-lg border bg-surface-2 p-2 hover:border-gold-soft ${
                        estimated ? "border-dashed border-line-strong" : "border-line"
                      }`}
                    >
                      <ClassEmblem name={b.className} size={36} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{b.title}</p>
                        <p className="truncate text-xs text-muted">
                          {b.ascendancy} · {b.damage}
                        </p>
                      </div>
                      {b.beginner && (
                        <span
                          title={t.beginner.badgeTitle}
                          className="shrink-0 rounded border border-emerald-500/50 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-300"
                        >
                          {t.beginner.badge}
                        </span>
                      )}
                      {estimated && (
                        <span className="shrink-0 rounded border border-dashed border-line-strong px-1.5 py-0.5 text-[10px] uppercase text-faint">
                          {t.common.estimated}
                        </span>
                      )}
                      {change && (
                        <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${CHANGE_STYLE[change]}`}>
                          {t.tierList.changes[change]}
                        </span>
                      )}
                      {b.skills[0] && <GemIcon gem={b.skills[0]} size={30} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-faint">{t.tierList.method[category]}</p>
      <p className="mt-1 text-xs text-faint">{t.tierList.estimatedNote}</p>
    </div>
  );
}
