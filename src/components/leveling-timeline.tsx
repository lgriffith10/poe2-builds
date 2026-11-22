"use client";

import { supportKey } from "@/lib/gem-checklist";
import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
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
// Gems ticked as obtained, per build, kept in this browser only (localStorage, shared between tabs).
const listeners = new Set<() => void>();
const readStore = (key: string) => {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]"; // Storage unavailable (private mode, blocked site data).
  }
};
const subscribe = (notify: () => void) => {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
};

export function useObtained(storageKey: string) {
  const key = `exile-codex:leveling:${storageKey}`;
  const raw = useSyncExternalStore(subscribe, () => readStore(key), () => "[]");
  const obtained = useMemo(() => {
    try {
      const list = JSON.parse(raw);
      return new Set<string>(Array.isArray(list) ? list.filter((x) => typeof x === "string") : []);
    } catch {
      return new Set<string>();
    }
  }, [raw]);
  const save = (next: Set<string>) => {
    try {
      localStorage.setItem(key, JSON.stringify([...next]));
    } catch {
      // Storage unavailable: nothing is kept, the boxes simply do not stay ticked.
    }
    listeners.forEach((l) => l());
  };
  const toggle = (name: string) => {
    const next = new Set(obtained);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    save(next);
  };
  return { obtained, toggle, reset: () => save(new Set()) };
}

export function Check({ on, label, onClick, size = "md" }: { on: boolean; label: string; onClick: () => void; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center rounded border transition ${size === "sm" ? "h-4 w-4 text-[10px]" : "h-5 w-5 text-xs"} ${
        on ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-line-strong text-transparent hover:border-gold-soft"
      }`}
    >
      ✓
    </button>
  );
}

export function LevelingTimeline({ paths, storageKey }: { paths: TimelinePath[]; storageKey: string }) {
  const { t, fmt, lang, path } = useI18n();
  const { obtained, toggle, reset } = useObtained(storageKey);
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const current = paths[active] ?? paths[0];
  const label = (s: string) => (lang === "fr" ? stepFr(s) : s);
  const pathName = (i: number) => label(paths[i].name ?? `${t.build.levelingPath} ${i + 1}`);
  const last = paths.length - 1;
  const open = (i: number, scroll = false) => {
    setActive(i);
    setStepIdx(0);
    if (scroll) root.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={root} className="scroll-mt-24">
      {paths.length > 1 && (
        <div role="tablist" className="mb-5 flex flex-wrap gap-2">
          {paths.map((_, i) => (
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
      {(() => {
        const all = [...new Set(current.steps.flatMap((st) => st.skills.flatMap((k) => [k.gem.name, ...k.supports.map((x) => supportKey(k.gem.name, x.name))])))];
        const done = all.filter((n) => obtained.has(n)).length;
        return (
          <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
            <span className="font-semibold text-gold">{t.build.checklist}</span>
            <span className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-line/50">
              <span className="block h-full rounded-full bg-emerald-400/80 transition-all" style={{ width: `${(100 * done) / Math.max(1, all.length)}%` }} />
            </span>
            <span className="tabular-nums text-muted">{fmt(t.build.checklistCount, { n: done, total: all.length })}</span>
            {done > 0 && (
              <button type="button" onClick={reset} className="text-xs text-faint hover:text-red-300">
                {t.build.checklistReset}
              </button>
            )}
            <span className="basis-full text-xs text-faint">{t.build.checklistHint}</span>
          </div>
        );
      })()}
      {(() => {
        const progress = current.steps.map((step) => {
          const names = [...new Set(step.skills.flatMap((k) => [k.gem.name, ...k.supports.map((x) => supportKey(k.gem.name, x.name))]))];
          const got = names.filter((n) => obtained.has(n)).length;
          return { names, got, complete: names.length > 0 && got === names.length };
        });
        const i = Math.min(stepIdx, current.steps.length - 1);
        const step = current.steps[i];
        const { names, got, complete } = progress[i];
        const arrow = "h-9 w-9 shrink-0 rounded-lg border border-line text-muted hover:border-gold-soft hover:text-gold disabled:opacity-30";
        return (
          <>
            {/* The route as a rail: one stop per step, ticked steps in green, the open one in gold. */}
            <div className="mb-4 flex items-center gap-2">
              <button type="button" onClick={() => setStepIdx(i - 1)} disabled={i === 0} aria-label={t.build.previousStep} className={arrow}>
                ‹
              </button>
              <ol className="flex min-w-0 flex-1 gap-1 overflow-x-auto py-1 [scrollbar-width:none]">
                {current.steps.map((st, k) => (
                  <li key={k} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setStepIdx(k)}
                      aria-current={k === i ? "step" : undefined}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                        k === i
                          ? "bg-gold font-semibold text-black"
                          : progress[k].complete
                            ? "text-emerald-300 hover:bg-surface-2"
                            : "text-muted hover:bg-surface-2 hover:text-ink"
                      }`}
                    >
                      {progress[k].complete && k !== i && <span aria-hidden>✓</span>}
                      {label(st.name)}
                    </button>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setStepIdx(i + 1)}
                disabled={i === current.steps.length - 1}
                aria-label={t.build.nextStep}
                className={arrow}
              >
                ›
              </button>
            </div>
            <div key={`${active}-${i}`}>
            <div className={`rounded-xl border bg-surface p-4 ${complete ? "border-emerald-500/40" : "border-line"}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-semibold text-gold">{label(step.name)}</h3>
                <span className={`text-xs tabular-nums ${complete ? "text-emerald-300" : "text-faint"}`}>
                  {complete ? `✓ ${t.build.checklistStepDone}` : `${got}/${names.length}`}
                </span>
              </div>
              <ul className="mt-3 space-y-2.5">
                {step.skills.map(({ gem, supports }) => (
                  <li key={gem.name} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <Check on={obtained.has(gem.name)} label={fmt(t.build.checklistToggle, { gem: gem.name })} onClick={() => toggle(gem.name)} />
                    <Link
                      href={path(`/database/gems#${gem.id}`)}
                      data-tip={gem.tip}
                      className={`flex min-w-44 items-center gap-2 text-sm font-semibold hover:text-gold ${obtained.has(gem.name) ? "opacity-60" : ""}`}
                    >
                      <GemIcon gem={gem} size={32} />
                      {gem.name}
                      {gem.isNew && <NewTag text={t.build.newGem} />}
                    </Link>
                    {supports.map((s) => (
                      <span
                        key={s.name}
                        className={`flex items-center gap-1 rounded-md border bg-surface-2 py-0.5 pl-1 pr-2 text-xs ${
                          obtained.has(supportKey(gem.name, s.name)) ? "border-emerald-500/40 text-muted" : s.isNew ? "border-gold-soft text-ink" : "border-line text-muted"
                        }`}
                      >
                        <Check on={obtained.has(supportKey(gem.name, s.name))} label={fmt(t.build.checklistToggle, { gem: s.name })} onClick={() => toggle(supportKey(gem.name, s.name))} size="sm" />
                        <Link href={path(`/database/gems#${s.id}`)} data-tip={s.tip} className="flex items-center gap-1.5 hover:text-ink">
                          <GemIcon gem={s} size={20} />
                          {s.name}
                        </Link>
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
              {step.rotations.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-line pt-3">
                  <p className="text-sm font-semibold text-ink">{t.build.rotation}</p>
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
            </div>
          </>
        );
      })()}
      {current.rotations.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">{t.build.campaignRotations}</h3>
          <div className="grid gap-3 lg:grid-cols-2">
            {current.rotations.map((r) => (
              <RotationStrip key={r.name} rotation={{ ...r, name: label(r.name), steps: r.steps.map((st) => ({ ...st, label: st.label && label(st.label) })) }} gemsHref={path("/database/gems")} />
            ))}
          </div>
        </div>
      )}
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

