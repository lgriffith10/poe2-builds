"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/client";
import type { BuildSummary } from "@/lib/build-summary";
import { classStyle } from "@/lib/classes";
import { DEFAULT_CATEGORY, type TierCategory } from "@/lib/types";
import { ClassEmblem, GemIcon, Pill, TierBadge } from "./ui";

export function BuildCard({ build, category = DEFAULT_CATEGORY }: { build: BuildSummary; category?: TierCategory }) {
  const { t, fmt, path } = useI18n();
  const tier = build.tiers[category];
  const { color } = classStyle(build.className);
  return (
    <Link
      href={path(`/builds/${build.slug}`)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:border-line-strong hover:bg-surface-2"
    >
      <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div className="flex items-start gap-3 p-4">
        <ClassEmblem name={build.className} size={44} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold group-hover:text-gold">{build.title}</h3>
          <p className="text-sm text-muted">
            {build.ascendancy} · {build.className}
          </p>
        </div>
        {tier && <TierBadge tier={tier} />}
      </div>
      <p className="line-clamp-2 px-4 text-sm text-muted">{build.summary}</p>
      <div className="mt-auto flex items-center gap-1.5 px-4 pt-4">
        {build.skills.slice(0, 7).map((s) => (
          <GemIcon key={s.name} gem={s} size={32} />
        ))}
        {build.skills.length > 7 && <span className="text-xs text-faint">+{build.skills.length - 7}</span>}
      </div>
      <div className="flex flex-wrap gap-1.5 p-4 pt-3">
        <Pill>{build.damage}</Pill>
        <Pill>{build.playstyle}</Pill>
        <Pill>{fmt(t.common.budget, { v: t.levels[build.budget] })}</Pill>
        {build.sample && <Pill tone="warn">{t.common.sample}</Pill>}
      </div>
    </Link>
  );
}
