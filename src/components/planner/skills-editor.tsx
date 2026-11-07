"use client";

import { useId, useMemo } from "react";
import { useI18n } from "@/i18n/client";
import type { Gem, SkillGroup } from "@/lib/types";
import { GemIcon } from "../ui";

export type GemOption = Pick<Gem, "name" | "icon" | "color" | "type">;

const MAX_SUPPORTS = 5;

export function SkillsEditor({
  gems,
  skills,
  onChange,
}: {
  gems: GemOption[];
  skills: SkillGroup[];
  onChange: (skills: SkillGroup[]) => void;
}) {
  const { t, fmt } = useI18n();
  const activeId = useId();
  const supportId = useId();
  const byName = useMemo(() => new Map(gems.map((g) => [g.name.toLowerCase(), g])), [gems]);
  const active = gems.filter((g) => g.type !== "support");
  const supports = gems.filter((g) => g.type === "support");

  const update = (i: number, group: SkillGroup) => onChange(skills.map((s, j) => (j === i ? group : s)));

  return (
    <div className="space-y-3">
      <datalist id={activeId}>
        {active.map((g) => (
          <option key={g.name} value={g.name} />
        ))}
      </datalist>
      <datalist id={supportId}>
        {supports.map((g) => (
          <option key={g.name} value={g.name} />
        ))}
      </datalist>

      {skills.map((group, i) => {
        const gem = byName.get(group.gem.toLowerCase());
        return (
          <div key={i} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              {gem ? <GemIcon gem={gem} size={44} /> : <span className="h-11 w-11 rounded-md border border-dashed border-line-strong" />}
              <input
                list={activeId}
                value={group.gem}
                onChange={(e) => update(i, { ...group, gem: e.target.value })}
                placeholder={t.planner.skillGem}
                className="min-w-0 flex-1 rounded-md border border-line bg-surface-2 px-3 py-2 text-sm focus:border-gold-soft focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onChange(skills.filter((_, j) => j !== i))}
                className="rounded-md px-2 py-1 text-sm text-faint hover:text-red-400"
                aria-label={t.planner.removeSkill}
              >
                ✕
              </button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: MAX_SUPPORTS }, (_, k) => {
                const value = group.supports[k] ?? "";
                const sup = byName.get(value.toLowerCase());
                return (
                  <div key={k} className="flex items-center gap-2">
                    {sup ? <GemIcon gem={sup} size={30} /> : <span className="h-[30px] w-[30px] rounded border border-dashed border-line" />}
                    <input
                      list={supportId}
                      value={value}
                      onChange={(e) => {
                        const next = [...group.supports];
                        next[k] = e.target.value;
                        update(i, { ...group, supports: next.map((s) => s ?? "") });
                      }}
                      placeholder={fmt(t.planner.support, { n: k + 1 })}
                      className="min-w-0 flex-1 rounded-md border border-line bg-surface-2 px-2 py-1.5 text-sm focus:border-gold-soft focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => onChange([...skills, { gem: "", supports: [] }])}
        className="w-full rounded-xl border border-dashed border-line-strong py-3 text-sm text-muted hover:border-gold-soft hover:text-gold"
      >
        {t.planner.addSkill}
      </button>
    </div>
  );
}
