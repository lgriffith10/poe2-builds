"use client";

import { useState } from "react";
import type { StatPriorityStage } from "@/lib/stat-priority";

export interface StatPriorityLabels {
  weapons: string;
  weaponsSub: string;
  weaponsSubLadder: string;
  others: string;
  othersSubLadder: string;
  othersSub: string;
  allUniques: string;
  noWeapon: string;
  tipsTitle: string;
  tips: string[];
}

export function StatPriority({
  stages,
  initialStage,
  ordered,
  labels,
}: {
  stages: StatPriorityStage[];
  initialStage: number;
  /** False for ladder characters, whose modifiers are not listed by importance. */
  ordered: boolean;
  labels: StatPriorityLabels;
}) {
  const [index, setIndex] = useState(initialStage);
  const stage = stages[index];

  return (
    <div>
      {stages.length > 1 && (
        <div role="tablist" className="mb-4 inline-flex flex-wrap gap-1 rounded-lg border border-line p-1">
          {stages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`rounded-md px-3 py-1.5 text-sm ${i === index ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {!stage.weapons.length && !stage.ranked.length ? (
        <p className="text-sm text-muted">{labels.allUniques}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-4">
            <h3 className="font-semibold text-gold">{labels.weapons}</h3>
            <p className="mt-1 text-xs text-muted">{ordered ? labels.weaponsSub : labels.weaponsSubLadder}</p>
            {stage.weapons.length ? (
              stage.weapons.map((w) => (
                <div key={w.slotLabel} className="mt-3">
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {w.slotLabel} · {w.title}
                  </p>
                  <ol className="mt-1 space-y-1 text-sm">
                    {w.mods.map((m, i) => (
                      <li key={m} className="flex gap-2">
                        <span className="w-5 shrink-0 text-right font-semibold tabular-nums text-gold">{i + 1}.</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))
            ) : (
              <p className="mt-3 text-sm text-muted">{labels.noWeapon}</p>
            )}
          </div>

          <div className="rounded-xl border border-line bg-surface p-4">
            <h3 className="font-semibold text-gold">{labels.others}</h3>
            <p className="mt-1 text-xs text-muted">{ordered ? labels.othersSub : labels.othersSubLadder}</p>
            <ol className="mt-3 space-y-2 text-sm">
              {stage.ranked.map((r, i) => (
                <li key={r.stat} className="flex gap-2">
                  <span className="w-5 shrink-0 text-right font-semibold tabular-nums text-gold">{i + 1}.</span>
                  <span className="min-w-0">
                    {r.stat}
                    <span className="mt-0.5 flex flex-wrap gap-1">
                      {r.slots.map((s) => (
                        <span key={s} className="rounded border border-line px-1.5 py-px text-[11px] text-muted">
                          {s}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <details className="mt-4 rounded-xl border border-line bg-surface p-4" open={stage.id === "campaign"}>
        <summary className="cursor-pointer font-semibold">{labels.tipsTitle}</summary>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
          {labels.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
