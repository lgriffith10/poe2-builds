"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { FARMING_STYLES, FARMING_TRAITS, rankMechanics, type FarmingProfile, type FarmingTrait, type MechanicId } from "@/lib/farming";
import { ClassEmblem } from "./ui";

export interface PlannerBuild {
  slug: string;
  title: string;
  ascendancy: string;
  className: string;
  profile: FarmingProfile;
  notes: Partial<Record<MechanicId, string>>;
}

export interface PlannerMechanic {
  id: MechanicId;
  title: string;
  summary: string;
  href: string;
  loot: { name: string; icon: string | null; price: { amount: string; unit: "divine" | "exalted" }; href: string | null }[];
}

const CUSTOM = "__custom";
/** Mechanics specialised on the Atlas tree with Tablets; the two trials are run with their own keys instead. */
const ATLAS: MechanicId[] = ["breach", "ritual", "delirium", "expedition", "abyss", "temple"];
const FIT_STYLE = {
  great: "border-emerald-500/60 bg-emerald-500/10 text-emerald-300",
  good: "border-sky-500/50 bg-sky-500/10 text-sky-300",
  fair: "border-line-strong text-muted",
  poor: "border-red-500/50 bg-red-500/10 text-red-300",
} as const;

export function AtlasPlanner({ builds, mechanics }: { builds: PlannerBuild[]; mechanics: PlannerMechanic[] }) {
  const { t, lang, fmt } = useI18n();
  const ta = t.atlasPlanner;
  const [pick, setPick] = useState(builds[0]?.slug ?? CUSTOM);
  const [custom, setCustom] = useState<FarmingProfile>({ clear: 2, single: 2, tank: 2, speed: 2, style: "ranged", traits: [], adjust: {}, notes: {} });
  const build = builds.find((b) => b.slug === pick);
  const profile = build?.profile ?? custom;
  const ranked = useMemo(() => rankMechanics(profile, lang, build?.notes ?? {}), [profile, lang, build]);
  const byId = new Map(mechanics.map((m) => [m.id, m]));
  const atlas = ranked.filter((m) => ATLAS.includes(m.id));
  const focus = atlas.filter((m) => m.score >= 2).slice(0, 2);
  const plan = focus.length ? focus : atlas.slice(0, 1);
  const trials = ranked.filter((m) => !ATLAS.includes(m.id) && m.score >= 2);
  const avoid = ranked.filter((m) => m.fit === "poor");
  const names = (list: typeof ranked) => list.map((m) => byId.get(m.id)!.title).join(lang === "fr" ? " et " : " and ");

  const setRating = (key: "clear" | "single" | "tank" | "speed", v: 1 | 2 | 3) => setCustom({ ...custom, [key]: v });
  const toggleTrait = (tr: FarmingTrait) =>
    setCustom({ ...custom, traits: custom.traits.includes(tr) ? custom.traits.filter((x) => x !== tr) : [...custom.traits, tr] });
  const chip = (on: boolean) =>
    `rounded-lg border px-2.5 py-1 text-xs ${on ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"}`;

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <div className="min-w-0 space-y-4">
        <label className="block text-sm font-semibold" htmlFor="planner-build">
          {ta.build}
        </label>
        <select
          id="planner-build"
          value={pick}
          onChange={(e) => setPick(e.target.value)}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value={CUSTOM}>{ta.custom}</option>
          {builds.map((b) => (
            <option key={b.slug} value={b.slug}>
              {b.title}
            </option>
          ))}
        </select>
        {build ? (
          <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
            <ClassEmblem name={build.className} size={36} />
            <div className="min-w-0 text-sm">
              <p className="truncate font-semibold">{build.title}</p>
              <p className="truncate text-xs text-muted">{build.ascendancy}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 rounded-xl border border-line bg-surface p-3">
            <p className="text-xs text-faint">{ta.customHint}</p>
            {(["clear", "single", "tank", "speed"] as const).map((k) => (
              <div key={k}>
                <p className="mb-1 text-xs font-semibold">{t.farmingPages.demand[k]}</p>
                <div className="flex gap-1.5">
                  {([1, 2, 3] as const).map((v) => (
                    <button key={v} type="button" aria-pressed={custom[k] === v} onClick={() => setRating(k, v)} className={chip(custom[k] === v)}>
                      {t.farmingPages.demandLevel[v]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <p className="mb-1 text-xs font-semibold">{ta.style}</p>
              <div className="flex flex-wrap gap-1.5">
                {FARMING_STYLES.map((s) => (
                  <button key={s} type="button" aria-pressed={custom.style === s} onClick={() => setCustom({ ...custom, style: s })} className={chip(custom.style === s)}>
                    {ta.styles[s]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold">{ta.traits}</p>
              <div className="flex flex-wrap gap-1.5">
                {FARMING_TRAITS.map((tr) => (
                  <button key={tr} type="button" aria-pressed={custom.traits.includes(tr)} onClick={() => toggleTrait(tr)} className={chip(custom.traits.includes(tr))}>
                    {ta.traitNames[tr]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-faint">{ta.method}</p>
      </div>

      <div className="min-w-0" aria-live="polite">
        <div className="mb-5 rounded-xl border border-gold-soft/50 bg-gold/5 p-4">
          <p className="font-display text-lg text-gold">{ta.plan}</p>
          <p className="mt-1 text-sm">{fmt(plan.length > 1 ? ta.planTwo : ta.planOne, { names: names(plan) })}</p>
          {trials.length > 0 && <p className="mt-1 text-sm">{fmt(trials.length > 1 ? ta.trialsTwo : ta.trialsOne, { names: names(trials) })}</p>}
          {avoid.length > 0 && <p className="mt-1 text-sm text-muted">{fmt(ta.avoid, { names: names(avoid) })}</p>}
        </div>
        <ol className="space-y-2.5">
          {ranked.map((m, i) => {
            const info = byId.get(m.id)!;
            return (
              <li key={m.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-5 font-display text-lg text-faint">{i + 1}</span>
                  <Link href={info.href} className="font-display text-lg font-semibold hover:text-gold">
                    {info.title}
                  </Link>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${FIT_STYLE[m.fit]}`}>{t.build.farming.fit[m.fit]}</span>
                  <Link href={info.href} className="ml-auto text-xs text-gold hover:underline">
                    {ATLAS.includes(m.id) ? ta.open : ta.openTrial} →
                  </Link>
                </div>
                <ul className="mt-2 space-y-0.5 pl-7 text-sm text-muted">
                  {m.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                {info.loot.length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 pl-7 text-xs">
                    <span className="text-faint">{ta.loot}</span>
                    {info.loot.map((l) => (
                      <span key={l.name} className="inline-flex items-center gap-1 rounded-md border border-line bg-surface-2 px-1.5 py-0.5">
                        {l.icon && <img src={l.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />}
                        {l.name}
                        <span className="tabular-nums text-muted">
                          {l.price.amount} {l.price.unit === "divine" ? "div" : "ex"}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
