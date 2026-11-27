"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/client";
import { Check, useObtained } from "./leveling-timeline";

export interface ChecklistGroup {
  id: string;
  title: string;
  items: { id: string; text: string; href?: string; link?: string }[];
}

/** League start checklist: each item ticked once done, kept in this browser. */
export function LeagueChecklist({ groups }: { groups: ChecklistGroup[] }) {
  const { t, fmt } = useI18n();
  const tl = t.leagueStart;
  const { obtained, toggle, reset } = useObtained("league-start");
  const all = groups.flatMap((g) => g.items.map((i) => i.id));
  const done = all.filter((id) => obtained.has(id)).length;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
        <span className="h-2 min-w-32 flex-1 overflow-hidden rounded-full bg-line/50">
          <span className="block h-full rounded-full bg-emerald-400/80 transition-all" style={{ width: `${(100 * done) / Math.max(1, all.length)}%` }} />
        </span>
        <span className="tabular-nums text-muted">{fmt(tl.count, { n: done, total: all.length })}</span>
        {done > 0 && (
          <button type="button" onClick={reset} className="text-xs text-faint hover:text-red-300">
            {t.build.checklistReset}
          </button>
        )}
      </div>
      {groups.map((g) => (
        <section key={g.id}>
          <h2 className="mb-3 font-display text-xl font-semibold text-gold">{g.title}</h2>
          <ul className="space-y-2">
            {g.items.map((i) => {
              const on = obtained.has(i.id);
              return (
                <li key={i.id} className="flex items-start gap-3 rounded-lg border border-line bg-surface px-3 py-2.5">
                  <span className="pt-0.5">
                    <Check on={on} label={i.text} onClick={() => toggle(i.id)} />
                  </span>
                  <span className={`min-w-0 text-sm ${on ? "text-faint line-through decoration-line-strong" : ""}`}>
                    {i.text}
                    {i.href && i.link && (
                      <>
                        {" "}
                        <Link href={i.href} className="whitespace-nowrap text-gold no-underline hover:underline">
                          {i.link} →
                        </Link>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
