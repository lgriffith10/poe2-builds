"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";

// Run timer of the in-game view: time is counted on the stop the player is on, so each step of the route gets
// its own time, compared with the player's best finished run on this build and route. Kept in this browser.

type Store = {
  running: boolean;
  /** When the current segment started (ms timestamp), while running. */
  since: number;
  /** Stop the current segment counts for. */
  stop: number;
  /** Time spent per stop index. */
  steps: Record<number, number>;
  /** Best saved run: its total and its time per stop. */
  best: { total: number; steps: Record<number, number> } | null;
};

const EMPTY: Store = { running: false, since: 0, stop: 0, steps: {}, best: null };
const total = (steps: Record<number, number>) => Object.values(steps).reduce((a, b) => a + b, 0);

export const clock = (ms: number) => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`;
};

function useRunStore(key: string) {
  // The in-game view only renders in the browser (like usePosition), so storage can be read up front.
  // Its parent remounts it (key) when the route changes.
  const [store, setStore] = useState<Store>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(key) ?? "null");
      return v && typeof v === "object" && v.steps ? { ...EMPTY, ...v } : EMPTY;
    } catch {
      return EMPTY;
    }
  });
  const save = useCallback(
    (next: Store) => {
      setStore(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Not kept: the timer still works for this visit.
      }
    },
    [key],
  );
  return [store, save] as const;
}

/** Adds the running segment to its stop. */
const commit = (s: Store, now: number): Store =>
  s.running ? { ...s, since: now, steps: { ...s.steps, [s.stop]: (s.steps[s.stop] ?? 0) + (now - s.since) } } : s;

export function CampaignTimer({ storageKey, at, labels }: { storageKey: string; at: number; labels: string[] }) {
  const { t } = useI18n();
  const tt = t.build.play.timer;
  const [store, save] = useRunStore(`exile-codex:timer:${storageKey}`);
  const [now, setNow] = useState(() => Date.now());
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!store.running) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [store.running]);

  // Moving to another stop while running: the time so far goes to the stop being left.
  useEffect(() => {
    if (store.running && store.stop !== at) {
      const t0 = Date.now();
      save({ ...commit(store, t0), stop: at });
    }
  }, [at, store, save]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!panel.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const live = (stop: number) => (store.steps[stop] ?? 0) + (store.running && store.stop === stop ? Math.max(0, now - store.since) : 0);
  const elapsed = total(store.steps) + (store.running ? Math.max(0, now - store.since) : 0);
  const toggle = () => {
    const t0 = Date.now();
    setNow(t0);
    save(store.running ? { ...commit(store, t0), running: false } : { ...store, running: true, since: t0, stop: at });
  };
  const finish = () => {
    const done = commit(store, Date.now());
    const run = total(done.steps);
    const best = run > 0 && (!done.best || run < done.best.total) ? { total: run, steps: done.steps } : done.best;
    save({ ...EMPTY, best });
    setOpen(false);
  };
  const reset = () => {
    save({ ...EMPTY, best: store.best });
    setOpen(false);
  };

  const step = live(at);
  const bestStep = store.best?.steps[at];
  const diff = (a: number, b: number) => `${a > b ? "+" : "−"}${clock(Math.abs(a - b))}`;

  return (
    <div ref={panel} className="relative flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        aria-label={store.running ? tt.pause : tt.start}
        title={store.running ? tt.pause : tt.start}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm ${
          store.running ? "border-emerald-500/60 text-emerald-300" : "border-line text-muted hover:border-gold-soft hover:text-gold"
        }`}
      >
        {store.running ? "❚❚" : "▶"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        title={tt.details}
        className="rounded-lg border border-line px-2 py-1 text-left leading-tight hover:border-line-strong"
      >
        <span className={`block font-mono text-sm tabular-nums ${store.running ? "text-ink" : "text-muted"}`}>{clock(elapsed)}</span>
        <span className="block text-[10px] tabular-nums text-faint">
          {tt.step} {clock(step)}
          {bestStep !== undefined && step > 0 && (
            <span className={step > bestStep ? "text-red-300" : "text-emerald-300"}> {diff(step, bestStep)}</span>
          )}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-line-strong bg-surface p-3 text-sm shadow-xl shadow-black/60">
          <p className="mb-2 text-xs text-faint">{tt.hint}</p>
          <ol className="max-h-64 space-y-0.5 overflow-y-auto">
            {labels.map((label, i) => {
              const v = live(i);
              const b = store.best?.steps[i];
              if (!v && b === undefined) return null;
              return (
                <li key={i} className={`flex items-center gap-2 rounded px-1.5 py-0.5 ${i === at ? "bg-surface-2" : ""}`}>
                  <span className="min-w-0 flex-1 truncate text-muted">{label}</span>
                  <span className="font-mono tabular-nums">{clock(v)}</span>
                  {b !== undefined && v > 0 && (
                    <span className={`w-14 text-right font-mono text-xs tabular-nums ${v > b ? "text-red-300" : "text-emerald-300"}`}>{diff(v, b)}</span>
                  )}
                </li>
              );
            })}
          </ol>
          {store.best && (
            <p className="mt-2 border-t border-line pt-2 text-xs text-muted">
              {tt.best} <span className="font-mono text-ink">{clock(store.best.total)}</span>
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={finish} disabled={elapsed === 0} className="flex-1 rounded-lg border border-gold-soft px-2 py-1 text-xs text-gold hover:bg-surface-2 disabled:opacity-40">
              {tt.finish}
            </button>
            <button type="button" onClick={reset} disabled={elapsed === 0} className="rounded-lg border border-line px-2 py-1 text-xs text-muted hover:text-red-300 disabled:opacity-40">
              {tt.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
