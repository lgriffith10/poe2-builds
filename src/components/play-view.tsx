"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/i18n/client";
import { stepFr } from "@/lib/step-labels";
import type { StatPriorityStage } from "@/lib/stat-priority";
import type { PassiveStep, PlannerState, TreeVariant } from "@/lib/types";
import { BuildTreeViewer } from "./build-tree-viewer";
import { Check, useObtained, type TimelineGem, type TimelinePath } from "./leveling-timeline";
import { TipScope } from "./ref-tooltips";
import type { RotationGem, RotationView } from "./rotation-strip";
import { GemIcon } from "./ui";

export interface PlayGearStage {
  id: string;
  label: string;
  items: { slotLabel: string; title: string; kind: "unique" | "rare"; icon: string | null }[];
  stats: StatPriorityStage | null;
}

export interface PlayViewProps {
  slug: string;
  title: string;
  leveling: TimelinePath[];
  skills: { gem: RotationGem; supports: RotationGem[] }[];
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
                <StepGems step={step} next={route!.steps[stop!.index + 1]} obtained={obtained} toggle={toggle} />
              ) : (
                <FinalGems skills={skills} />
              ))}
            {tab === "gems" && stepRotations.length > 0 && (
              <div className="mt-5 space-y-3 border-t border-line pt-4">
                {stepRotations.map((r) => (
                  <MiniRotation key={r.name} rotation={r} label={label} />
                ))}
              </div>
            )}
            {tab === "gear" && <GearTab stage={gearStage ?? null} />}
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

function StepGems({
  step,
  next,
  obtained,
  toggle,
}: {
  step: TimelinePath["steps"][number];
  next: TimelinePath["steps"][number] | undefined;
  obtained: Set<string>;
  toggle: (name: string) => void;
}) {
  const { t, fmt, path } = useI18n();
  const tp = t.build.play;
  const coming: TimelineGem[] = next
    ? [...new Map(next.skills.flatMap((k) => [k.gem, ...k.supports]).filter((g) => g.isNew).map((g) => [g.name, g])).values()]
    : [];
  return (
    <>
      <ul className="space-y-3">
        {step.skills.map(({ gem, supports }) => (
          <li key={gem.name}>
            <div className="flex items-center gap-2">
              <Check on={obtained.has(gem.name)} label={fmt(t.build.checklistToggle, { gem: gem.name })} onClick={() => toggle(gem.name)} />
              <Link
                href={path(`/database/gems#${gem.id}`)}
                data-tip={gem.tip}
                className={`flex min-w-0 items-center gap-2 font-semibold hover:text-gold ${obtained.has(gem.name) ? "opacity-50" : ""}`}
              >
                <GemIcon gem={gem} size={30} />
                <span className="truncate">{gem.name}</span>
              </Link>
              {gem.isNew && <span className="shrink-0 rounded-full bg-gold/15 px-1.5 text-[10px] font-semibold text-gold">{t.build.newGem}</span>}
            </div>
            {supports.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1 pl-7">
                {supports.map((s) => (
                  <SupportChip key={s.name} gem={s}>
                    <Check on={obtained.has(s.name)} label={fmt(t.build.checklistToggle, { gem: s.name })} onClick={() => toggle(s.name)} size="sm" />
                  </SupportChip>
                ))}
              </div>
            )}
          </li>
        ))}
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

function FinalGems({ skills }: { skills: PlayViewProps["skills"] }) {
  const { path } = useI18n();
  return (
    <ul className="space-y-3">
      {skills.map(({ gem, supports }) => (
        <li key={gem.name}>
          <Link href={path(`/database/gems#${gem.id}`)} data-tip={gem.tip} className="flex items-center gap-2 font-semibold hover:text-gold">
            <GemIcon gem={gem} size={30} />
            {gem.name}
          </Link>
          {supports.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1 pl-8">
              {supports.map((s) => (
                <SupportChip key={s.name} gem={s} />
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
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

function GearTab({ stage }: { stage: PlayGearStage | null }) {
  const { t } = useI18n();
  const tp = t.build.play;
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
          <Heading>{tp.gearList}</Heading>
          <ul className="space-y-1.5">
            {stage.items.map((i, n) => (
              <li key={n} className="flex items-center gap-2 text-sm">
                {i.icon ? <img src={i.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" /> : <span className="h-6 w-6" />}
                <span className="w-20 shrink-0 truncate text-xs text-faint">{i.slotLabel}</span>
                <span className={`min-w-0 truncate ${i.kind === "unique" ? "text-unique" : "text-[#e8d47a]"}`}>{i.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
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
