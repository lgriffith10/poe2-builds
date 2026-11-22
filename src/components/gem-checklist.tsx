"use client";

import { useI18n } from "@/i18n/client";
import { Check, useObtained } from "./leveling-timeline";

// Ticks for the build page's skill section. Same per-build store as the leveling checklist, so a gem ticked in one
// place is ticked everywhere on the page.

/** One gem's "obtained" box. */
export function GemCheck({ slug, gem, size = "md" }: { slug: string; gem: string; size?: "sm" | "md" }) {
  const { t, fmt } = useI18n();
  const { obtained, toggle } = useObtained(slug);
  return <Check on={obtained.has(gem)} label={fmt(t.build.checklistToggle, { gem })} onClick={() => toggle(gem)} size={size} />;
}

/** "Complete" badge of a skill group, once the skill and all its supports are ticked. */
export function SkillGroupDone({ slug, gems }: { slug: string; gems: string[] }) {
  const { t } = useI18n();
  const { obtained } = useObtained(slug);
  if (!gems.every((g) => obtained.has(g))) return null;
  return (
    <span className="whitespace-nowrap rounded-md border border-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
      ✓ {t.build.skillGroupDone}
    </span>
  );
}

/** Progress over every gem of the skill section, with a way to untick them. */
export function SkillsProgress({ slug, gems }: { slug: string; gems: string[] }) {
  const { t, fmt } = useI18n();
  const { obtained, reset } = useObtained(slug);
  const all = [...new Set(gems)];
  const done = all.filter((g) => obtained.has(g)).length;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-xs">
      <span className="h-1.5 w-32 overflow-hidden rounded-full bg-line">
        <span className="block h-full rounded-full bg-emerald-400/80 transition-all" style={{ width: `${(100 * done) / Math.max(1, all.length)}%` }} />
      </span>
      <span className="tabular-nums text-muted">{fmt(t.build.checklistCount, { n: done, total: all.length })}</span>
      <span className="text-faint">{t.build.skillsChecklistHint}</span>
      {done > 0 && (
        <button
          type="button"
          onClick={reset}
          className="ml-auto text-faint hover:text-gold"
        >
          {t.build.checklistReset}
        </button>
      )}
    </div>
  );
}
