import Link from "next/link";
import { fmt, getDictionary, localePath, type Locale } from "@/i18n";
import { BEGINNER_PICKS } from "@/lib/beginner";
import { getBuilds } from "@/lib/builds";
import { getGem } from "@/lib/data";
import { classStyle } from "@/lib/classes";
import { ClassEmblem, GemIcon, TierBadge } from "./ui";

/** The builds recommended to new players, with why, as cards (home page and tier lists). */
export function BeginnerPicks({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const tb = t.beginner;
  const path = (p: string) => localePath(lang, p);
  const all = getBuilds(lang);
  const picks = BEGINNER_PICKS.flatMap((p) => {
    const build = all.find((b) => b.slug === p.slug);
    return build ? [{ build, why: p.why[lang] }] : [];
  });
  if (!picks.length) return null;
  return (
    <div className="poe-panel border-emerald-500/30 p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-emerald-300">{tb.title}</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted">{tb.sub}</p>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
          <Link href={path("/quiz")} className="text-gold hover:underline">
            {tb.quiz} →
          </Link>
          <Link href={path("/guides/leveling-and-gearing")} className="text-muted hover:text-gold">
            {tb.guide} →
          </Link>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {picks.map(({ build: b, why }) => {
          const uniques = Object.values(b.gear).filter((p) => p?.unique).length;
          const main = getGem(b.skills[0]?.gem ?? "");
          const starter = b.ratings.starter;
          return (
            <Link
              key={b.slug}
              href={path(`/builds/${b.slug}`)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface p-4 transition hover:border-emerald-500/50 hover:bg-surface-2"
            >
              <span className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${classStyle(b.className).color}, transparent)` }} />
              <div className="flex items-start gap-3">
                <ClassEmblem name={b.className} size={40} />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold group-hover:text-gold">{b.title}</h3>
                  <p className="truncate text-sm text-muted">
                    {b.ascendancy} · {b.playstyle}
                  </p>
                </div>
                {main && <GemIcon gem={main} size={34} />}
              </div>
              <p className="mt-3 text-sm text-ink/90">{why}</p>
              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3 text-xs">
                <span className="rounded-full border border-emerald-500/50 px-2 py-0.5 text-emerald-300">
                  {fmt(t.common.difficulty, { v: t.levels[b.difficulty] })}
                </span>
                <span className="rounded-full border border-line-strong px-2 py-0.5 text-muted">{fmt(t.common.budget, { v: t.levels[b.budget] })}</span>
                <span className="rounded-full border border-line-strong px-2 py-0.5 text-muted">
                  {uniques === 0 ? tb.noUnique : fmt(uniques === 1 ? tb.oneUnique : tb.uniques, { n: uniques })}
                </span>
                {starter && (
                  <span className="ml-auto flex items-center gap-1 text-muted">
                    <TierBadge tier={starter.tier} size="xs" estimated={starter.estimated} />
                    {t.categories.starter}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
