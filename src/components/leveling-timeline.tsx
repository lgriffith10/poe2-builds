"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import type { Gem } from "@/lib/types";
import { stepFr } from "@/lib/step-labels";
import { RotationStrip, type RotationView } from "./rotation-strip";
import { GemIcon } from "./ui";

/** `tip` is the hover-card data (lib/tips.ts), shown by the enclosing TipScope. */
export type TimelineGem = Pick<Gem, "id" | "name" | "icon" | "color"> & { tip: string; isNew: boolean };
export interface TimelinePath {
  name?: string;
  steps: { name: string; skills: { gem: TimelineGem; supports: TimelineGem[] }[]; rotations: RotationView[] }[];
  /** Campaign rotations that are not tied to one act (e.g. "Clear", "Bossing (Lvl 1-13)"). */
  rotations: RotationView[];
}

/**
 * Campaign progression: one card per step, gems added since the previous step are highlighted.
 * With several paths, the last one is the continuation of the others (alternative starts such as "Crossbow" or
 * "Twister" that both lead into "Minions"); it is also the one that ends with the early maps step.
 */
export function LevelingTimeline({ paths }: { paths: TimelinePath[] }) {
  const { t, fmt, lang, path } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = paths[active] ?? paths[0];
  const label = (s: string) => (lang === "fr" ? stepFr(s) : s);
  const pathName = (i: number) => label(paths[i].name ?? `${t.build.levelingPath} ${i + 1}`);
  const last = paths.length - 1;
  const open = (i: number, scroll = false) => {
    setActive(i);
    if (scroll) root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={root} className="scroll-mt-24">
      {paths.length > 1 && (
        <div role="tablist" className="mb-5 flex flex-wrap gap-2">
          {paths.map((p, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => open(i)}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                i === active ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"
              }`}
            >
              {pathName(i)}
            </button>
          ))}
        </div>
      )}
      {last > 0 && active === last && (
        <p className="mb-4 text-sm text-muted">
          {t.build.levelingFollows}{" "}
          {paths.slice(0, last).map((_, i) => (
            <span key={i}>
              {i > 0 && ` ${t.build.levelingOr} `}
              <button type="button" onClick={() => open(i)} className="text-gold hover:underline">
                {pathName(i)}
              </button>
            </span>
          ))}
          .
        </p>
      )}
      {current.rotations.length > 0 && (
        <div className="mb-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-faint">{t.build.campaignRotations}</h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {current.rotations.map((r) => (
              <RotationStrip key={r.name} rotation={{ ...r, name: label(r.name), steps: r.steps.map((st) => ({ ...st, label: st.label && label(st.label) })) }} gemsHref={path("/database/gems")} />
            ))}
          </div>
        </div>
      )}
      <ol className="relative space-y-4 border-l border-line pl-6">
        {current.steps.map((step, i) => (
          <li key={`${active}-${i}`} className="relative">
            <span className="absolute -left-[31px] top-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gold-soft bg-bg">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <div className="rounded-xl border border-line bg-surface p-4">
              <h3 className="font-display text-base font-semibold text-gold">{label(step.name)}</h3>
              <ul className="mt-3 space-y-2.5">
                {step.skills.map(({ gem, supports }) => (
                  <li key={gem.name} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <Link
                      href={path(`/database/gems#${gem.id}`)}
                      data-tip={gem.tip}
                      className="flex min-w-44 items-center gap-2 text-sm font-semibold hover:text-gold"
                    >
                      <GemIcon gem={gem} size={32} />
                      {gem.name}
                      {gem.isNew && <NewTag text={t.build.newGem} />}
                    </Link>
                    {supports.map((s) => (
                      <Link
                        key={s.name}
                        href={path(`/database/gems#${s.id}`)}
                        data-tip={s.tip}
                        className={`flex items-center gap-1.5 rounded-md border bg-surface-2 py-0.5 pl-0.5 pr-2 text-xs hover:border-line-strong ${
                          s.isNew ? "border-gold-soft text-ink" : "border-line text-muted"
                        }`}
                      >
                        <GemIcon gem={s} size={20} />
                        {s.name}
                      </Link>
                    ))}
                  </li>
                ))}
              </ul>
              {step.rotations.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-line pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-faint">{t.build.rotation}</p>
                  {step.rotations.map((r) => (
                    <RotationStrip
                      key={r.name}
                      rotation={{ ...r, name: label(r.name), steps: r.steps.map((st) => ({ ...st, label: st.label && label(st.label) })) }}
                      gemsHref={path("/database/gems")}
                    />
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      {active < last && (
        <button
          type="button"
          onClick={() => open(last, true)}
          className="mt-4 ml-6 rounded-lg border border-gold-soft bg-surface-2 px-4 py-2 text-sm text-gold hover:bg-surface"
        >
          {fmt(t.build.levelingNext, { name: pathName(last) })}
        </button>
      )}
    </div>
  );
}

function NewTag({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-gold-soft px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-gold">
      {text}
    </span>
  );
}

