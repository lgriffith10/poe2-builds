"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { DEFAULT_ANSWERS, rankBuilds, type QuizAnswers, type QuizBuild, type Reason } from "@/lib/quiz";
import { classStyle } from "@/lib/classes";
import { ClassEmblem, GemIcon, TierBadge } from "./ui";

type Question = { [K in keyof QuizAnswers]: { key: K; options: QuizAnswers[K][] } }[keyof QuizAnswers];

const QUESTIONS: Question[] = [
  { key: "family", options: ["melee", "ranged", "caster", "minions", "any"] },
  { key: "buttons", options: ["few", "some", "many"] },
  { key: "budget", options: ["low", "medium", "high"] },
  { key: "goal", options: ["starter", "endgame", "bossing"] },
  { key: "priority", options: ["balanced", "tank", "speed"] },
];

export function BuildQuiz({ builds }: { builds: QuizBuild[] }) {
  const { t, fmt, path } = useI18n();
  const tq = t.quiz;
  const [answers, setAnswers] = useState<QuizAnswers>(DEFAULT_ANSWERS);
  const ranked = useMemo(() => rankBuilds(builds, answers), [builds, answers]);
  const top = ranked.slice(0, 3);
  const more = ranked.slice(3, 9);

  const reasonText = (r: Reason) => {
    switch (r.key) {
      case "style":
        return fmt(tq.reasons.style, { v: r.v });
      case "rotation":
        return fmt(tq.reasons.rotation, { n: r.n });
      case "budget":
        return fmt(tq.reasons.budget, { v: t.levels[r.v] });
      case "tier":
        return fmt(tq.reasons.tier, { tier: r.tier, goal: t.categories[r.goal] });
      default:
        return tq.reasons[r.key];
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[22rem_1fr]">
      <div className="min-w-0 space-y-5">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.key} className="min-w-0">
            <legend className="mb-2 text-sm font-semibold">
              <span className="mr-2 font-display text-gold">{i + 1}.</span>
              {tq.questions[q.key].label}
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {q.options.map((o) => {
                const on = answers[q.key] === o;
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setAnswers({ ...answers, [q.key]: o })}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      on ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    {(tq.questions[q.key].options as Record<string, string>)[o]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        <p className="text-xs text-faint">{tq.method}</p>
      </div>

      <div aria-live="polite" className="min-w-0">
        <h2 className="mb-3 font-display text-xl font-semibold text-gold">{tq.results}</h2>
        <ol className="space-y-3">
          {top.map(({ build: b, reasons }, i) => {
            const rating = b.ratings[answers.goal];
            return (
              <li key={b.slug}>
                <Link
                  href={path(`/builds/${b.slug}`)}
                  className="group relative flex gap-4 overflow-hidden rounded-xl border border-line bg-surface p-4 transition hover:border-gold-soft hover:bg-surface-2"
                >
                  <span className="absolute inset-y-0 left-0 w-0.5" style={{ background: classStyle(b.className).color }} />
                  <span className="font-display text-2xl font-bold text-faint">{i + 1}</span>
                  <ClassEmblem name={b.className} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold group-hover:text-gold">{b.title}</h3>
                        <p className="truncate text-sm text-muted">
                          {b.ascendancy} · {b.playstyle}
                        </p>
                      </div>
                      {rating && (
                        <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
                          <TierBadge tier={rating.tier} size="sm" estimated={rating.estimated} />
                          <span className="hidden sm:inline">{t.categories[answers.goal]}</span>
                        </span>
                      )}
                      {b.gem && <GemIcon gem={b.gem} size={36} />}
                    </div>
                    {reasons.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
                        {reasons.map((r, k) => (
                          <li key={k} className="rounded-full border border-emerald-500/40 bg-emerald-500/5 px-2 py-0.5 text-emerald-300">
                            ✓ {reasonText(r)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        {more.length > 0 && (
          <>
            <h3 className="mb-2 mt-6 text-sm font-semibold text-muted">{tq.alsoConsider}</h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {more.map(({ build: b }) => (
                <li key={b.slug}>
                  <Link href={path(`/builds/${b.slug}`)} className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 hover:border-gold-soft">
                    <ClassEmblem name={b.className} size={28} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{b.title}</span>
                      <span className="block truncate text-xs text-muted">{fmt(tq.moreLine, { asc: b.ascendancy, budget: t.levels[b.budget] })}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
