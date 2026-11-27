import type { SkillSource } from "@/lib/skill-source";

// Where a skill comes from (item, weapon, ascendancy, gem, spirit), as a small chip. Plain component: used by the
// build page's skill section and by the in-game view.

export type SkillSourceKind = SkillSource["kind"];

const SOURCE_STYLE: Record<SkillSourceKind, string> = {
  weapon: "border-amber-600/50 bg-amber-500/10 text-amber-200",
  item: "border-unique/50 bg-unique/10 text-unique",
  ascendancy: "border-violet-500/50 bg-violet-500/10 text-violet-200",
  gem: "border-line-strong text-muted",
  spirit: "border-teal-500/40 bg-teal-500/10 text-teal-200",
};
const SOURCE_ICON: Record<SkillSourceKind, string> = { weapon: "⚔", item: "◈", ascendancy: "✦", gem: "◆", spirit: "◇" };

export function SourceChip({ kind, label }: { kind: SkillSourceKind; label: string }) {
  return (
    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${SOURCE_STYLE[kind]}`}>
      <span aria-hidden className="mr-1">
        {SOURCE_ICON[kind]}
      </span>
      {label}
    </span>
  );
}
