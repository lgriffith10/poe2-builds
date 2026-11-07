import type { ReactNode } from "react";
import { classStyle } from "@/lib/classes";
import type { Gem, Tier } from "@/lib/types";

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
