"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BuildSummary } from "@/lib/build-summary";
import { useI18n } from "@/i18n/client";
import { TIERS, type Tier } from "@/lib/types";
import { ClassEmblem, GemIcon, TierBadge } from "./ui";

export interface MechanicTierItem {
  build: BuildSummary;
  tier: Tier;
  reasons: string[];
}

/** Lower tiers start folded so the guide below stays close. */
const FOLDED: Tier[] = ["C", "D"];

/** One mechanic's build tier list (lib/mechanics.ts), with a class filter; each card's tooltip gives its reasons. */
export function MechanicTierBoard({ entries, noBuilds }: { entries: MechanicTierItem[]; noBuilds: string }) {
  const { t, fmt, path } = useI18n();
  const [cls, setCls] = useState<string | null>(null);
  const [open, setOpen] = useState<Tier[]>([]);
  const classes = useMemo(() => [...new Set(entries.map((e) => e.build.className))].sort(), [entries]);
  const visible = entries.filter((e) => !cls || e.build.className === cls);
  const chip = (active: boolean) =>
    `rounded-lg border px-3 py-1.5 text-sm ${active ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"}`;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="w-20 text-xs uppercase tracking-wider text-faint">{t.farmingPages.filterClass}</span>
        <button type="button" className={chip(!cls)} onClick={() => setCls(null)}>
          {t.farmingPages.allClasses}
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
      <div className="space-y-3">
        {TIERS.map((tier) => {
          const inTier = visible.filter((e) => e.tier === tier);
          const folded = FOLDED.includes(tier) && !open.includes(tier) && inTier.length > 0;
          return (
            <div key={tier} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
              <TierBadge tier={tier} size="lg" />
              <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {inTier.length === 0 && <p className="self-center px-2 text-sm text-faint">{noBuilds}</p>}
                {folded && (
                  <button
                    type="button"
                    onClick={() => setOpen([...open, tier])}
                    className="self-center justify-self-start rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:text-gold"
                  >
                    {fmt(t.farmingPages.showTier, { n: inTier.length })}
                  </button>
                )}
                {!folded && inTier.map(({ build: b, reasons }) => (
                  <Link
                    key={b.slug}
                    href={path(`/builds/${b.slug}`)}
                    title={reasons.join(" ")}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 p-2 hover:border-gold-soft"
                  >
                    <ClassEmblem name={b.className} size={32} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{b.title}</p>
                      <p className="truncate text-xs text-muted">
                        {b.ascendancy} · {b.damage}
                      </p>
                    </div>
                    {b.skills[0] && <GemIcon gem={b.skills[0]} size={30} />}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
