"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/client";
import { stepFr } from "@/lib/step-labels";
import type { StatPriorityStage } from "@/lib/stat-priority";
import type { PassiveStep, PlannerState, TreeVariant, WeaponSet } from "@/lib/types";
import { BuildTreeViewer } from "./build-tree-viewer";
import { CampaignTimer } from "./campaign-timer";
import { supportKey } from "@/lib/gem-checklist";
import { CAMPAIGN_REWARDS, CAMPAIGN_REWARDS_SOURCE, stepParts, type CampaignPart, type RewardKind } from "@/lib/campaign-rewards";
import { Check, useObtained, type TimelineGem, type TimelinePath } from "./leveling-timeline";
import { TipScope } from "./ref-tooltips";
import type { RotationGem, RotationView } from "./rotation-strip";
import { GemIcon } from "./ui";
import { SourceChip, type SkillSourceKind } from "./skill-source-chip";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";
import { Price, tradeUrl } from "./gear-inventory";
import type { PriceTag } from "@/lib/prices";
import type { TradeSearch } from "@/lib/trade";
import { useTradeLevel } from "@/lib/trade-level";

export interface PlayGearItem {
  slot: string;
  slotLabel: string;
  title: string;
  kind: "unique" | "rare";
  icon: string | null;
  /** Rares: modifiers to look for (by priority when `ranked`); uniques: the item's modifiers. */
  mods: string[];
  ranked: boolean;
  /** Skills the build takes from this rare's base ("Grants Skill: Level # …"). */
  grantsUsed: string[];
  runes: { count: number; name: string | null; effect: string; icon: string | null }[];
  note: string | null;
  trade: TradeSearch | null;
  price: PriceTag | null;
}

export interface PlayGearStage {
  id: string;
  label: string;
  items: PlayGearItem[];
  stats: StatPriorityStage | null;
}

/** A skill of the final setup, with what the guide's skill section says about it. */
export interface PlaySkill {
  gem: RotationGem;
  supports: RotationGem[];
  source: { kind: SkillSourceKind; label: string };
  weaponSet: WeaponSet | null;
  /** Gem level to keep the skill at (not higher). */
  level: number | null;
  note: string | null;
}

/** Game data for a skill gem of the leveling steps. */
export interface PlayGemInfo {
  tags: string[];
  tier: number;
}

export interface PlayViewProps {
  slug: string;
  title: string;
  leveling: TimelinePath[];
  gemInfo: Record<string, PlayGemInfo>;
  skills: PlaySkill[];
  rotations: RotationView[];
  /** Gear stages after the campaign (maps, endgame, min-max); the campaign one is shown with the leveling steps. */
  gear: PlayGearStage[];
  campaign: PlayGearStage | null;
  ascendancy: { name: string; stats: string[] }[];
  links: { id: string; text: string }[];
  plannerHref: string;
  tree: { planner: PlannerState; code: string; steps: PassiveStep[]; variants: TreeVariant[]; variantsSource: string | null };
}

type Stop = { kind: "step" | "gear"; index: number; label: string };
type Tab = "gems" | "gear" | "more";

const HASH = "#play";

/**
 * Source tree matching where the player is: the leveling tree for the level in the step name ("Level 6 to 13"),
 * else the tree of the same gear stage; -1 (the guide tree) when the source has none.
 */
function variantFor(stop: Stop | undefined, stepName: string | undefined, gearId: string | undefined, variants: TreeVariant[]): number {
  if (!stop) return -1;
  const indexed = variants.map((v, i) => ({ v, i }));
  if (stop.kind === "step") {
    const leveling = indexed.filter(({ v }) => v.stage === "leveling");
    if (!leveling.length) return -1;
    const level = Number(stepName?.match(/\blevel\s*(\d+)/i)?.[1] ?? NaN);
    const reached = Number.isNaN(level) ? [] : leveling.filter(({ v }) => (v.level ?? 1) <= level);
    return (reached.at(-1) ?? leveling[0]).i;
  }
  return indexed.find(({ v }) => v.stage === gearId)?.i ?? -1;
}

/** Opens with the #play hash (bookmarkable), as a one-screen panel over the guide; a floating button opens it. */
export function PlayView(props: PlayViewProps) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === HASH);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const close = useCallback((anchor?: string) => {
    history.replaceState(null, "", window.location.pathname + window.location.search + (anchor ? `#${anchor}` : ""));
    setOpen(false);
    // Lets the guide's tabs open the section holding the anchor before scrolling to it.
    if (anchor) window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  if (!open)
    return (
      <a
        href={HASH}
        title={t.build.play.openHint}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-gold bg-[#2a2113] px-5 py-3 font-semibold text-gold shadow-lg shadow-black/60 transition-colors hover:bg-[#3a2d17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:right-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M8 10v4m-2-2h4m6-1h.01M18 13h.01" strokeLinecap="round" />
        </svg>
        {t.build.play.open}
      </a>
    );
  // Portaled to <body> so no ancestor stacking context or transform can show the guide through the panel.
  return createPortal(
    <TipScope>
      <Panel {...props} close={close} />
    </TipScope>,
    document.body,
  );
}

/** Width of the side panel next to the tree (wide screens), set by dragging the divider; kept in this browser. */
const SIDE = { min: 300, default: 400, key: "exile-codex:play:side" };
const maxSide = () => Math.max(SIDE.min, Math.round(window.innerWidth * 0.7));
function useSideWidth() {
  const [width, setWidth] = useState(() => {
    try {
      const v = Number(localStorage.getItem(SIDE.key));
      if (v >= SIDE.min) return Math.min(v, maxSide());
    } catch {
      // Storage unavailable: default width.
    }
    return SIDE.default;
  });
  const save = useCallback((w: number) => {
    const next = Math.round(Math.min(maxSide(), Math.max(SIDE.min, w)));
    setWidth(next);
    try {
      localStorage.setItem(SIDE.key, String(next));
    } catch {
      // Not kept: the width holds for this visit.
    }
  }, []);
  return [width, save] as const;
}

/** Draggable divider on the side panel's left edge (pointer, arrow keys, double-click to reset). */
function SideResizer({ width, setWidth, label }: { width: number; setWidth: (w: number) => void; label: string }) {
  const [dragging, setDragging] = useState(false);
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      title={label}
      aria-valuenow={width}
      aria-valuemin={SIDE.min}
      tabIndex={0}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
      }}
      onPointerMove={(e) => {
        if (dragging) setWidth(window.innerWidth - e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onDoubleClick={() => setWidth(SIDE.default)}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 80 : 20;
        if (e.key === "ArrowLeft") setWidth(width + step);
        else if (e.key === "ArrowRight") setWidth(width - step);
        else return;
        // The arrows resize here; they must not also change the step (document listener of the view).
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`group absolute inset-y-0 -left-1.5 z-10 hidden w-3 cursor-col-resize touch-none lg:block focus-visible:outline-none ${dragging ? "select-none" : ""}`}
    >
      <span
        className={`absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 transition-colors ${dragging ? "bg-gold" : "bg-transparent group-hover:bg-gold-soft group-focus-visible:bg-gold"}`}
      />
    </div>
  );
}

/** Where the player is in this build (route and stop), kept in this browser. */
function usePosition(slug: string) {
  const key = `exile-codex:play:${slug}`;
  const [pos, setPos] = useState<{ path: number; stop: number }>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(key) ?? "null");
      if (v && Number.isInteger(v.path) && Number.isInteger(v.stop)) return v;
    } catch {
      // Storage unavailable or corrupt: start at the beginning.
    }
    return { path: -1, stop: 0 };
  });
  const save = useCallback(
    (next: { path: number; stop: number }) => {
      setPos(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Not kept: the view still works for this visit.
      }
    },
    [key],
  );
  return [pos, save] as const;
}

function Panel({
  slug,
  title,
  leveling,
  gemInfo,
  skills,
  rotations,
  gear,
  campaign,
  ascendancy,
  links,
  plannerHref,
  tree,
  close,
}: PlayViewProps & { close: (anchor?: string) => void }) {
  const { t, lang } = useI18n();
  const tp = t.build.play;
  const [sideWidth, setSideWidth] = useSideWidth();
  // Some translated step names start lower case ("début des maps"): they are shown as labels here.
  const label = useCallback((s: string) => {
    const l = lang === "fr" ? stepFr(s) : s;
    return l.charAt(0).toUpperCase() + l.slice(1);
  }, [lang]);
  const { obtained, toggle } = useObtained(slug);
  const [pos, setPos] = usePosition(slug);
  const [tab, setTab] = useState<Tab>("gems");
  // The last route is the one that continues into maps (see LevelingTimeline).
  const pathIndex = pos.path >= 0 && pos.path < leveling.length ? pos.path : Math.max(0, leveling.length - 1);
  const route = leveling[pathIndex];

  const stops = useMemo<Stop[]>(
    () => [
      ...(route?.steps ?? []).map((s, i) => ({ kind: "step" as const, index: i, label: label(s.name) })),
      ...gear.map((g, i) => ({ kind: "gear" as const, index: i, label: g.label })),
    ],
    [route, gear, label],
  );
  const at = Math.min(Math.max(0, pos.stop), stops.length - 1);
  const stop = stops[at];
  const go = useCallback(
    (i: number) => setPos({ path: pathIndex, stop: Math.min(Math.max(0, i), stops.length - 1) }),
    [pathIndex, stops.length, setPos],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.target instanceof HTMLElement && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") go(at + 1);
      else if (e.key === "ArrowLeft") go(at - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [at, go, close]);

  const step = stop?.kind === "step" ? route?.steps[stop.index] : undefined;
  const parts = useMemo(() => stepParts((route?.steps ?? []).map((s) => s.name)), [route]);
  const gearStage = stop?.kind === "gear" ? gear[stop.index] : campaign;
  const treeVariant = variantFor(stop, step?.name, stop?.kind === "gear" ? gear[stop.index]?.id : undefined, tree.variants);
  const stepRotations = step ? [...step.rotations, ...(stop!.index === 0 ? route!.rotations : [])] : rotations;

  const tabs: { id: Tab; text: string }[] = [
    { id: "gems", text: tp.tabGems },
    { id: "gear", text: tp.gearList },
    { id: "more", text: tp.tabMore },
  ];

  return (
    <div role="dialog" aria-modal="true" aria-label={tp.title} className="fixed inset-0 z-50 flex flex-col bg-bg lg:h-dvh">
      {/* Top bar: build name, the route as a rail of stops, close. */}
      <header className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-4 py-2.5 lg:flex-nowrap">
        <div className="min-w-0 flex-1 lg:w-56 lg:flex-none">
          <p className="truncate font-display text-base font-bold leading-tight">{title}</p>
          <p className="text-xs text-faint">{tp.title}</p>
        </div>
        <StopRail stops={stops} at={at} go={go} prevLabel={tp.prev} nextLabel={tp.next} levelingLabel={t.build.leveling} gearLabel={t.common.gear} />
        {leveling.length > 1 && (
          <select
            value={pathIndex}
            onChange={(e) => setPos({ path: Number(e.target.value), stop: 0 })}
            aria-label={t.build.levelingPath}
            className="hidden max-w-40 rounded-lg border border-line bg-surface px-2 py-1.5 text-sm xl:block"
          >
            {leveling.map((p, i) => (
              <option key={i} value={i}>
                {label(p.name ?? `${t.build.levelingPath} ${i + 1}`)}
              </option>
            ))}
          </select>
        )}
        <CampaignTimer key={pathIndex} storageKey={`${slug}:${pathIndex}`} at={at} labels={stops.map((s) => s.label)} />
        <button
          type="button"
          onClick={() => close()}
          className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:border-line-strong hover:text-ink"
        >
          {tp.close}
        </button>
      </header>

      <div
        className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:overflow-hidden"
        style={{ gridTemplateColumns: `minmax(0,1fr) ${sideWidth}px` }}
      >
        {/* The tree takes the room; it opens on the tree that matches the stop (the reader can pick another). */}
        <section aria-label={t.common.passiveTree} className="h-[75dvh] shrink-0 p-3 lg:h-auto lg:shrink">
          <BuildTreeViewer key={`${pathIndex}-${at}`} {...tree} initialVariant={treeVariant} compact />
        </section>

        <aside className="relative flex min-h-0 flex-col border-line lg:border-l">
          <SideResizer width={sideWidth} setWidth={setSideWidth} label={tp.resize} />
          <div role="tablist" className="flex shrink-0 border-b border-line">
            {tabs.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={tab === x.id}
                onClick={() => setTab(x.id)}
                className={`flex-1 border-b-2 px-2 py-2.5 text-sm transition-colors ${
                  tab === x.id ? "border-gold text-gold" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {x.text}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {tab === "gems" &&
              (step ? (
                <>
                  <StepGems step={step} next={route!.steps[stop!.index + 1]} obtained={obtained} toggle={toggle} info={gemInfo} finals={skills} />
                  <CampaignRewards slug={slug} parts={parts[stop!.index] ?? []} />
                </>
              ) : (
                <FinalGems skills={skills} obtained={obtained} toggle={toggle} />
              ))}
            {tab === "gems" && stepRotations.length > 0 && (
              <div className="mt-5 space-y-3 border-t border-line pt-4">
                {stepRotations.map((r) => (
                  <MiniRotation key={r.name} rotation={r} label={label} />
                ))}
              </div>
            )}
            {tab === "gear" && <GearTab slug={slug} stage={gearStage ?? null} />}
            {tab === "more" && (
              <More ascendancy={ascendancy} links={links} plannerHref={plannerHref} close={close} />
            )}
          </div>
          <p className="hidden shrink-0 border-t border-line px-4 py-2 text-[11px] text-faint lg:block">{tp.hint}</p>
        </aside>
      </div>
    </div>
  );
}

/** The player's route as one row of stops: campaign steps, then gear stages, the current one centred. */
function StopRail({
  stops,
  at,
  go,
  prevLabel,
  nextLabel,
  levelingLabel,
  gearLabel,
}: {
  stops: Stop[];
  at: number;
  go: (i: number) => void;
  prevLabel: string;
  nextLabel: string;
  levelingLabel: string;
  gearLabel: string;
}) {
  const rail = useRef<HTMLOListElement>(null);
  useEffect(() => {
    rail.current?.querySelector<HTMLElement>('[aria-current="step"]')?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [at]);
  const firstGear = stops.findIndex((s) => s.kind === "gear");
  const arrow = "h-9 w-9 shrink-0 rounded-lg border border-line text-muted hover:border-gold-soft hover:text-gold disabled:opacity-30";
  return (
    <nav className="order-last flex min-w-0 basis-full items-center gap-2 lg:order-none lg:basis-auto lg:flex-1" aria-label={levelingLabel}>
      <button type="button" onClick={() => go(at - 1)} disabled={at === 0} aria-label={prevLabel} className={arrow}>
        ‹
      </button>
      <ol ref={rail} className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none]">
        {stops.map((s, i) => {
          const current = i === at;
          return (
            <li key={i} className="flex shrink-0 items-center">
              {i === firstGear && firstGear > 0 && (
                <span className="mx-2 h-6 w-px bg-line-strong" title={gearLabel} aria-hidden />
              )}
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={current ? "step" : undefined}
                title={`${s.kind === "step" ? levelingLabel : gearLabel} : ${s.label}`}
                className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  current
                    ? "bg-gold font-semibold text-black"
                    : i < at
                      ? "text-gold-soft hover:text-gold"
                      : s.kind === "gear"
                        ? "text-ink hover:bg-surface-2"
                        : "text-muted hover:bg-surface-2 hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>
      <button type="button" onClick={() => go(at + 1)} disabled={at === stops.length - 1} aria-label={nextLabel} className={arrow}>
        ›
      </button>
    </nav>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="mb-2.5 font-display text-sm font-semibold text-gold">{children}</h2>;
}

function SupportChip({ gem, children }: { gem: RotationGem; children?: ReactNode }) {
  const { path } = useI18n();
  return (
    <span className="inline-flex items-center gap-1 rounded border border-line bg-surface-2 py-0.5 pl-0.5 pr-1.5 text-xs text-muted">
      {children}
      <Link href={path(`/database/gems#${gem.id}`)} data-tip={gem.tip} className="flex items-center gap-1 hover:text-ink">
        <GemIcon gem={gem} size={18} />
        {gem.name}
      </Link>
    </span>
  );
}

const tagLabel = (tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1);

function StepGems({
  step,
  next,
  obtained,
  toggle,
  info,
  finals,
}: {
  step: TimelinePath["steps"][number];
  next: TimelinePath["steps"][number] | undefined;
  obtained: Set<string>;
  toggle: (name: string) => void;
  info: Record<string, PlayGemInfo>;
  finals: PlaySkill[];
}) {
  const { t, fmt, path } = useI18n();
  const tp = t.build.play;
  const coming: TimelineGem[] = next
    ? [...new Map(next.skills.flatMap((k) => [k.gem, ...k.supports]).filter((g) => g.isNew).map((g) => [g.name, g])).values()]
    : [];
  return (
    <>
      <ul className="space-y-2.5">
        {step.skills.map(({ gem, supports }) => {
          const data = info[gem.name];
          const final = finals.find((f) => f.gem.name === gem.name);
          const keys = [gem.name, ...supports.map((s) => supportKey(gem.name, s.name))];
          const complete = keys.every((k) => obtained.has(k));
          return (
            <li key={gem.name} className={`rounded-lg border bg-surface-2/40 p-2.5 ${complete ? "border-emerald-500/40" : "border-line"}`}>
              <div className="flex items-start gap-2">
                <span className="mt-2">
                  <Check on={obtained.has(gem.name)} label={fmt(t.build.checklistToggle, { gem: gem.name })} onClick={() => toggle(gem.name)} />
                </span>
                <GemIcon gem={gem} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <Link
                      href={path(`/database/gems#${gem.id}`)}
                      data-tip={gem.tip}
                      className={`font-semibold hover:text-gold ${obtained.has(gem.name) ? "opacity-60" : ""}`}
                    >
                      {gem.name}
                    </Link>
                    {gem.isNew && <span className="shrink-0 rounded-full bg-gold/15 px-1.5 text-[10px] font-semibold text-gold">{t.build.newGem}</span>}
                    {complete && <span className="shrink-0 text-xs font-semibold text-emerald-300">✓ {t.build.skillGroupDone}</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    {final && final.source.kind !== "gem" && <SourceChip kind={final.source.kind} label={final.source.label} />}
                    {final?.level && (
                      <span className="whitespace-nowrap rounded-full border border-sky-400/60 px-2 py-0.5 text-xs text-sky-300" title={t.build.gemLevelHint}>
                        {fmt(t.build.gemLevel, { level: final.level })}
                      </span>
                    )}
                    {final?.weaponSet && (
                      <span
                        className="whitespace-nowrap rounded-full border px-2 py-0.5 text-xs"
                        style={{ color: WEAPON_SET_COLORS[final.weaponSet].light, borderColor: WEAPON_SET_COLORS[final.weaponSet].main }}
                        title={t.build.weaponSetSkillHint}
                      >
                        {final.weaponSet === 1 ? t.tree.weaponSet1 : t.tree.weaponSet2}
                      </span>
                    )}
                    {data && data.tier > 0 && (
                      <span className="whitespace-nowrap rounded-full border border-line-strong px-2 py-0.5 text-xs text-muted">Tier {data.tier}</span>
                    )}
                    <span
                      className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs ${
                        final ? "border-emerald-500/50 text-emerald-300" : "border-line text-faint"
                      }`}
                    >
                      {final ? tp.inFinal : tp.notInFinal}
                    </span>
                  </div>
                  {data && data.tags.length > 0 && (
                    <p className="mt-1 text-[11px] leading-snug text-faint">{data.tags.map(tagLabel).join(" · ")}</p>
                  )}
                  {final?.note && <p className="mt-1 text-xs leading-relaxed text-ink/90">{final.note}</p>}
                </div>
              </div>
              {supports.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 border-t border-line pt-2">
                  {supports.map((s) => (
                    <SupportChip key={s.name} gem={s}>
                      <Check
                        on={obtained.has(supportKey(gem.name, s.name))}
                        label={fmt(t.build.checklistToggle, { gem: s.name })}
                        onClick={() => toggle(supportKey(gem.name, s.name))}
                        size="sm"
                      />
                    </SupportChip>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {next && (
        <div className="mt-5 border-t border-line pt-4">
          <Heading>{tp.nextStep}</Heading>
          {coming.length ? (
            <div className="flex flex-wrap gap-1">
              {coming.map((g) => (
                <SupportChip key={g.name} gem={g} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">{tp.nothingNew}</p>
          )}
        </div>
      )}
    </>
  );
}

function FinalGems({ skills, obtained, toggle }: { skills: PlaySkill[]; obtained: Set<string>; toggle: (name: string) => void }) {
  const { t, fmt, path } = useI18n();
  const keys = [...new Set(skills.flatMap(({ gem, supports }) => [gem.name, ...supports.map((s) => supportKey(gem.name, s.name))]))];
  const done = keys.filter((k) => obtained.has(k)).length;
  return (
    <>
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className="h-1.5 w-24 overflow-hidden rounded-full bg-line">
          <span className="block h-full rounded-full bg-emerald-400/80 transition-all" style={{ width: `${(100 * done) / Math.max(1, keys.length)}%` }} />
        </span>
        <span className="tabular-nums text-muted">{fmt(t.build.checklistCount, { n: done, total: keys.length })}</span>
      </div>
      <ul className="space-y-2.5">
        {skills.map(({ gem, supports, source, weaponSet, level, note }) => {
          const complete = [gem.name, ...supports.map((s) => supportKey(gem.name, s.name))].every((k) => obtained.has(k));
          return (
            <li key={gem.name} className={`rounded-lg border bg-surface-2/40 p-2.5 ${complete ? "border-emerald-500/40" : "border-line"}`}>
              <div className="flex items-start gap-2">
                <span className="mt-2">
                  <Check on={obtained.has(gem.name)} label={fmt(t.build.checklistToggle, { gem: gem.name })} onClick={() => toggle(gem.name)} />
                </span>
                <GemIcon gem={gem} size={34} />
                <div className="min-w-0 flex-1">
                  <Link
                    href={path(`/database/gems#${gem.id}`)}
                    data-tip={gem.tip}
                    className={`font-semibold hover:text-gold ${obtained.has(gem.name) ? "opacity-60" : ""}`}
                  >
                    {gem.name}
                  </Link>
                  <div className="mt-1 flex flex-wrap items-center gap-1">
                    <SourceChip kind={source.kind} label={source.label} />
                    {weaponSet && (
                      <span
                        className="whitespace-nowrap rounded-full border px-2 py-0.5 text-xs"
                        style={{ color: WEAPON_SET_COLORS[weaponSet].light, borderColor: WEAPON_SET_COLORS[weaponSet].main }}
                        title={t.build.weaponSetSkillHint}
                      >
                        {weaponSet === 1 ? t.tree.weaponSet1 : t.tree.weaponSet2}
                      </span>
                    )}
                    {level && (
                      <span className="whitespace-nowrap rounded-full border border-sky-400/60 px-2 py-0.5 text-xs text-sky-300" title={t.build.gemLevelHint}>
                        {fmt(t.build.gemLevel, { level })}
                      </span>
                    )}
                    {complete && (
                      <span className="whitespace-nowrap rounded-full border border-emerald-400/60 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                        ✓ {t.build.skillGroupDone}
                      </span>
                    )}
                  </div>
                  {note && <p className="mt-1.5 text-xs leading-relaxed text-muted">{note}</p>}
                </div>
              </div>
              {supports.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 border-t border-line pt-2">
                  {supports.map((s) => (
                    <SupportChip key={s.name} gem={s}>
                      <Check
                        on={obtained.has(supportKey(gem.name, s.name))}
                        label={fmt(t.build.checklistToggle, { gem: s.name })}
                        onClick={() => toggle(supportKey(gem.name, s.name))}
                        size="sm"
                      />
                    </SupportChip>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** A rotation as one line of numbered gem icons (the full strip with notes is on the guide). */
function MiniRotation({ rotation, label }: { rotation: RotationView; label: (s: string) => string }) {
  const { path } = useI18n();
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-ink">{label(rotation.name)}</p>
      <ol className="flex flex-wrap items-center gap-y-1.5">
        {rotation.steps.map((st, i) => (
          <li key={i} className="flex items-center">
            {i > 0 && <span aria-hidden className="mx-1 text-gold-soft">›</span>}
            <Link
              href={path(`/database/gems#${st.gem.id}`)}
              data-tip={st.gem.tip}
              title={st.label ? label(st.label) : undefined}
              className="relative"
            >
              <GemIcon gem={st.gem} size={28} />
              {st.count && st.count > 1 && (
                <span className="absolute -bottom-1 -right-1 rounded bg-bg px-0.5 text-[10px] font-bold text-gold">×{st.count}</span>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function GearTab({ slug, stage }: { slug: string; stage: PlayGearStage | null }) {
  const { t, fmt } = useI18n();
  const tp = t.build.play;
  // Own store, so "untick all" on the gem checklist leaves the gear alone.
  const { obtained, toggle } = useObtained(`gear:${slug}`);
  if (!stage) return <p className="text-sm text-muted">{tp.noGear}</p>;
  const stats = stage.stats;
  return (
    <>
      <p className="mb-3 text-xs text-faint">{stage.label}</p>
      {stats && (stats.weapons.length > 0 || stats.ranked.length > 0) && (
        <div className="mb-5">
          <Heading>{tp.stats}</Heading>
          {stats.weapons.map((w) => (
            <div key={w.slotLabel + w.title} className="mb-3">
              <p className="text-xs text-faint">
                {w.slotLabel}, {w.title}
              </p>
              <StatList stats={w.mods.slice(0, 5)} />
            </div>
          ))}
          {stats.ranked.length > 0 && (
            <>
              <p className="text-xs text-faint">{tp.otherSlots}</p>
              <StatList stats={stats.ranked.slice(0, 8).map((s) => s.stat)} />
            </>
          )}
        </div>
      )}
      {stage.items.length > 0 && (
        <>
          <div className="flex items-baseline justify-between gap-2">
            <Heading>{tp.gearList}</Heading>
            <span className="text-xs tabular-nums text-faint">
              {fmt(tp.gearCount, { n: stage.items.filter((i) => obtained.has(gearKey(i))).length, total: stage.items.length })}
            </span>
          </div>
          <ul className="space-y-1">
            {stage.items.map((i, n) => (
              <GearRow key={`${stage.id}-${n}`} item={i} on={obtained.has(gearKey(i))} toggle={() => toggle(gearKey(i))} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

/** Slot and item: an item kept from one stage to the next stays ticked. */
const gearKey = (i: PlayGearItem) => `${i.slot}:${i.title}`;

/** One slot of the gear list: name on one line, and what to look for once opened. */
function GearRow({ item: i, on, toggle }: { item: PlayGearItem; on: boolean; toggle: () => void }) {
  const { t, lang, fmt } = useI18n();
  const check = <Check on={on} label={fmt(t.build.play.gearToggle, { item: i.title })} onClick={toggle} />;
  const [level] = useTradeLevel();
  const hasDetails = i.mods.length > 0 || i.grantsUsed.length > 0 || i.runes.length > 0 || i.note || i.trade;
  const head = (
    <>
      {i.icon ? <img src={i.icon} alt="" width={28} height={28} className="h-7 w-7 shrink-0 object-contain" /> : <span className="h-7 w-7 shrink-0" />}
      <span className={`min-w-0 flex-1 ${on ? "opacity-50" : ""}`}>
        <span className="block text-[11px] leading-tight text-faint">{i.slotLabel}</span>
        <span className={`block truncate text-sm ${i.kind === "unique" ? "text-unique" : "text-[#e8d47a]"}`}>{i.title}</span>
      </span>
      {i.price && <Price tag={i.price} alt={i.price.unit === "divine" ? "Divine Orb" : "Exalted Orb"} />}
    </>
  );
  if (!hasDetails)
    return (
      <li className="flex items-center gap-2 rounded-lg px-1.5 py-1">
        {check}
        {head}
      </li>
    );
  return (
    <li className="flex items-start gap-1">
      {/* The box sits outside the summary so ticking does not open the details. */}
      <span className="pt-2.5 pl-1.5">{check}</span>
      <details className="group min-w-0 flex-1 rounded-lg border border-transparent open:border-line open:bg-surface">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
          {head}
          <span aria-hidden className="shrink-0 text-xs text-faint transition-transform group-open:rotate-90">
            ›
          </span>
        </summary>
        <div className="space-y-2 px-2.5 pb-2.5 pt-1 text-sm">
          {i.grantsUsed.length > 0 && (
            <ul className="space-y-0.5 text-xs text-[#8fb6f0]">
              {i.grantsUsed.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          )}
          {i.mods.length > 0 &&
            (i.ranked ? (
              <StatList stats={i.mods} />
            ) : (
              <ul className="space-y-0.5 text-[#8fb6f0]">
                {i.mods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ))}
          {i.runes.length > 0 && (
            <ul className="space-y-1 border-t border-line pt-2 text-xs">
              {i.runes.map((r, k) => (
                <li key={k} className="flex items-center gap-1.5">
                  {r.icon ? <img src={r.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" /> : <span className="h-[18px] w-[18px]" />}
                  <span className="text-muted">
                    {r.count > 1 && `${r.count}× `}
                    {r.name && <span className="text-ink">{r.name}</span>}
                    {r.name && r.effect && (lang === "fr" ? " : " : ": ")}
                    {r.effect}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {i.note && <p className="border-t border-line pt-2 text-xs text-muted">{i.note}</p>}
          {i.trade && (
            <a
              href={tradeUrl(i.trade, level)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-gold-soft px-2 py-0.5 text-xs text-gold hover:bg-surface-2"
            >
              ⇄ {t.build.tradeSearch} ↗
            </a>
          )}
        </div>
      </details>
    </li>
  );
}

const KIND_COLOR: Record<RewardKind, string> = {
  points: "text-gold",
  spirit: "text-[#c9a7f5]",
  res: "text-[#8fb6f0]",
  life: "text-red-300",
  choice: "text-sky-300",
  ascend: "text-emerald-300",
};

/** Permanent campaign bonuses of the acts a leveling step covers, each ticked once taken. */
function CampaignRewards({ slug, parts }: { slug: string; parts: CampaignPart[] }) {
  const { t, fmt, lang } = useI18n();
  const tp = t.build.play;
  const { obtained, toggle } = useObtained(`campaign:${slug}`);
  const rewards = CAMPAIGN_REWARDS.filter((r) => parts.includes(r.part));
  if (!rewards.length) return null;
  const done = rewards.filter((r) => obtained.has(r.id)).length;
  return (
    <section className="mt-5 border-t border-line pt-4">
      <div className="flex items-baseline justify-between gap-2">
        <Heading>{tp.rewards}</Heading>
        <span className={`text-xs tabular-nums ${done === rewards.length ? "text-emerald-300" : "text-faint"}`}>
          {fmt(tp.rewardsCount, { n: done, total: rewards.length })}
        </span>
      </div>
      <p className="-mt-1 mb-3 text-xs text-faint">{tp.rewardsHint}</p>
      {parts.map((part) => {
        const list = rewards.filter((r) => r.part === part);
        if (!list.length) return null;
        return (
          <div key={part} className="mb-3">
            {parts.length > 1 && (
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-faint">
                {part === 5 ? tp.interludes : fmt(tp.act, { n: part })}
              </p>
            )}
            <ul className="space-y-2">
              {list.map((r) => {
                const on = obtained.has(r.id);
                return (
                  <li key={r.id} className="flex items-start gap-2">
                    <span className="pt-0.5">
                      <Check on={on} label={fmt(tp.rewardToggle, { reward: r.reward[lang] })} onClick={() => toggle(r.id)} size="sm" />
                    </span>
                    <span className={`min-w-0 text-sm ${on ? "opacity-50" : ""}`}>
                      <span className={`font-semibold ${KIND_COLOR[r.kind]}`}>{r.reward[lang]}</span>
                      <span className="text-faint"> · {r.zone}</span>
                      <span className="block text-xs text-muted">{r.how[lang]}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <a href={CAMPAIGN_REWARDS_SOURCE} target="_blank" rel="noopener noreferrer" className="text-xs text-faint hover:text-gold">
        {tp.rewardsSource} ↗
      </a>
    </section>
  );
}

/** Stats in order of importance; the order is the information, so they are numbered. */
function StatList({ stats }: { stats: string[] }) {
  return (
    <ol className="mt-1 space-y-0.5 text-sm">
      {stats.map((m, i) => (
        <li key={m} className="flex gap-2">
          <span className="w-4 shrink-0 text-right text-xs tabular-nums text-faint">{i + 1}</span>
          <span className="text-[#8fb6f0]">{m}</span>
        </li>
      ))}
    </ol>
  );
}

function More({
  ascendancy,
  links,
  plannerHref,
  close,
}: {
  ascendancy: PlayViewProps["ascendancy"];
  links: PlayViewProps["links"];
  plannerHref: string;
  close: (anchor?: string) => void;
}) {
  const { t } = useI18n();
  const tp = t.build.play;
  return (
    <>
      {ascendancy.length > 0 && (
        <div className="mb-5">
          <Heading>{tp.ascendancy}</Heading>
          <ol className="space-y-2">
            {ascendancy.map((n, i) => (
              <li key={n.name} className="flex gap-2.5">
                <span className="w-4 shrink-0 text-right font-display text-gold">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{n.name}</p>
                  <p className="line-clamp-2 text-xs text-[#8fb6f0]">{n.stats.join(" ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      <Heading>{tp.quick}</Heading>
      <ul className="space-y-0.5">
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                close(l.id);
              }}
              className="block rounded-md px-2 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-ink"
            >
              {l.text}
            </a>
          </li>
        ))}
        <li>
          <Link href={plannerHref} className="block rounded-md px-2 py-1.5 text-sm text-gold hover:bg-surface-2">
            {tp.planner}
          </Link>
        </li>
      </ul>
    </>
  );
}
