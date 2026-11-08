import type { ReactNode } from "react";
import { classStyle } from "@/lib/classes";
import type { Difficulty, Gem, Tier } from "@/lib/types";

const TIER_BG: Record<Tier, string> = {
  S: "bg-tier-s",
  A: "bg-tier-a",
  B: "bg-tier-b",
  C: "bg-tier-c",
  D: "bg-tier-d",
};

export function TierBadge({ tier, size = "md" }: { tier: Tier; size?: "sm" | "md" | "lg" }) {
  const dims = { sm: "h-6 w-6 text-xs", md: "h-8 w-8 text-sm", lg: "h-14 w-14 text-2xl" }[size];
  return (
    <span
      className={`${TIER_BG[tier]} ${dims} inline-flex shrink-0 items-center justify-center rounded-md font-display font-bold text-black/80`}
      title={`${tier} tier`}
    >
      {tier}
    </span>
  );
}

export function ClassEmblem({ name, size = 40 }: { name: string; size?: number }) {
  const { color, glyph } = classStyle(name);
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold"
      style={{
        width: size,
        height: size,
        fontSize: size * (glyph.length > 1 ? 0.36 : 0.45),
        color,
        background: `radial-gradient(circle at 30% 25%, ${color}40, ${color}12 70%)`,
        boxShadow: `inset 0 0 0 1.5px ${color}90`,
      }}
    >
      {glyph}
    </span>
  );
}

const GEM_RING: Record<Gem["color"], string> = {
  r: "ring-gem-r",
  g: "ring-gem-g",
  b: "ring-gem-b",
  w: "ring-gem-w",
};

const GEM_TEXT: Record<Gem["color"], string> = {
  r: "text-gem-r",
  g: "text-gem-g",
  b: "text-gem-b",
  w: "text-gem-w",
};

/**
 * Hover/focus card for a gem. Place it inside an element with the `group relative` classes.
 * Pure CSS so it works in server components.
 */
export function GemTooltip({ gem, meta }: { gem: Pick<Gem, "name" | "icon" | "color" | "text">; meta?: string }) {
  if (!gem.text) return null;
  return (
    <span
      role="tooltip"
      className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-lg border border-line-strong bg-surface p-3 text-left opacity-0 shadow-xl shadow-black/60 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
    >
      <span className="flex items-center gap-2 border-b border-line pb-2">
        <GemIcon gem={gem} size={32} />
        <span className="min-w-0">
          <span className={`block truncate text-sm font-semibold ${GEM_TEXT[gem.color]}`}>{gem.name}</span>
          {meta && <span className="block text-xs text-faint">{meta}</span>}
        </span>
      </span>
      <span className="mt-2 block text-xs leading-relaxed text-muted">{gem.text}</span>
      <span className="absolute left-1/2 top-full -mt-px h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-line-strong bg-surface" />
    </span>
  );
}

export function GemIcon({ gem, size = 40 }: { gem: Pick<Gem, "name" | "icon" | "color">; size?: number }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface-2 ring-1 ${GEM_RING[gem.color]}`}
      style={{ width: size, height: size }}
    >
      {gem.icon ? (
        <img src={gem.icon} alt="" width={size} height={size} loading="lazy" className="h-full w-full object-contain" />
      ) : (
        <span className="text-xs text-muted">{gem.name[0]}</span>
      )}
    </span>
  );
}

export function ItemIcon({ src, alt, size = 56 }: { src: string | null; alt: string; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-md border border-line bg-surface-2"
      style={{ width: size, height: size }}
    >
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="max-h-[90%] max-w-[90%] object-contain" />
      ) : (
        <span className="text-[10px] uppercase tracking-wide text-faint">Rare</span>
      )}
    </span>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "gold" | "warn" }) {
  const styles = {
    default: "border-line-strong text-muted",
    gold: "border-gold-soft text-gold",
    warn: "border-amber-700/60 bg-amber-900/20 text-amber-300",
  }[tone];
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs ${styles}`}>{children}</span>;
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-xl font-semibold text-gold sm:text-2xl">{children}</h2>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

export function PageHeader({ title, sub, children }: { title: string; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <h1 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">{title}</h1>
        {sub && <p className="mt-2 max-w-3xl text-muted">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

const DIFFICULTY_STYLE: Record<Difficulty, { level: number; color: string }> = {
  easy: { level: 1, color: "#7fbf6a" },
  medium: { level: 2, color: "#d9b649" },
  hard: { level: 3, color: "#e07a6a" },
};

/** Three bars filled up to the difficulty level, followed by its label. */
export function DifficultyBadge({ difficulty, label }: { difficulty: Difficulty; label: string }) {
  const { level, color } = DIFFICULTY_STYLE[difficulty];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-0.5 text-xs"
      style={{ color }}
    >
      <span aria-hidden className="flex items-end gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-1 rounded-sm"
            style={{
              height: 4 + i * 2,
              background: i <= level ? color : "var(--color-line-strong)",
            }}
          />
        ))}
      </span>
      {label}
    </span>
  );
}
