"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/client";
import {
  Crafter,
  ESSENCES,
  actions,
  advise,
  diagnose,
  groupLabel,
  LORDS,
  rolledText,
  type Action,
  type CraftData,
  type CurrencyTier,
  type Item,
  type Rarity,
} from "@/lib/craft";

type Tc = ReturnType<typeof useI18n>["t"]["craft"];
type Fmt = ReturnType<typeof useI18n>["fmt"];

const RARITY_COLOR: Record<Rarity, string> = { normal: "#c8c8c8", magic: "#8888ff", rare: "#e8d77a" };
const pct = (n: number) => `${Math.round(n * 100)}%`;

// --- currency tiles ------------------------------------------------------------------------------

type Kind = "transmute" | "augment" | "regal" | "alchemy" | "exalt" | "chaos" | "annul" | "desecrate";
const ORBS: { kind: Kind; name: string; tiered: boolean }[] = [
  { kind: "transmute", name: "Orb of Transmutation", tiered: true },
  { kind: "augment", name: "Orb of Augmentation", tiered: true },
  { kind: "regal", name: "Regal Orb", tiered: true },
  { kind: "alchemy", name: "Orb of Alchemy", tiered: false },
  { kind: "exalt", name: "Exalted Orb", tiered: true },
  { kind: "chaos", name: "Chaos Orb", tiered: true },
  { kind: "annul", name: "Orb of Annulment", tiered: false },
  { kind: "desecrate", name: "Preserved Rib", tiered: false },
];
/** Omen -> the currency it modifies and the action id suffix it selects. */
const OMENS: { name: string; kind: "exalt" | "chaos" | "annul" | "desecrate"; suffix: string }[] = [
  { name: "Omen of Sinistral Exaltation", kind: "exalt", suffix: "-prefix" },
  { name: "Omen of Dextral Exaltation", kind: "exalt", suffix: "-suffix" },
  { name: "Omen of Greater Exaltation", kind: "exalt", suffix: "-double" },
  { name: "Omen of Sinistral Erasure", kind: "chaos", suffix: "-prefix" },
  { name: "Omen of Dextral Erasure", kind: "chaos", suffix: "-suffix" },
  { name: "Omen of Whittling", kind: "chaos", suffix: "-lowest" },
  { name: "Omen of Sinistral Annulment", kind: "annul", suffix: "-prefix" },
  { name: "Omen of Dextral Annulment", kind: "annul", suffix: "-suffix" },
  { name: "Omen of the Sovereign", kind: "desecrate", suffix: "-ulaman" },
  { name: "Omen of the Liege", kind: "desecrate", suffix: "-amanamu" },
  { name: "Omen of the Blackblooded", kind: "desecrate", suffix: "-kurgal" },
  { name: "Omen of Sinistral Necromancy", kind: "desecrate", suffix: "-prefix" },
  { name: "Omen of Dextral Necromancy", kind: "desecrate", suffix: "-suffix" },
];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");
const TIER_NAME: Record<CurrencyTier, string> = { normal: "", greater: "Greater ", perfect: "Perfect " };

function actionId(kind: Kind, tier: CurrencyTier, omen: string | null) {
  const o = OMENS.find((x) => x.name === omen && x.kind === kind)?.suffix ?? "";
  if (kind === "alchemy") return kind;
  if (kind === "desecrate") return `desecrate${o}`;
  if (kind === "annul") return `annul${o}`;
  return `${kind}-${tier}${o}`;
}

/** Square stash slot with a hover card (not the browser's title tooltip). */
function Tile({
  icon,
  label,
  desc,
  badge,
  disabled,
  active,
  onClick,
  size = 52,
}: {
  icon?: string;
  label: string;
  desc?: ReactNode;
  badge?: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  size?: number;
}) {
  return (
    <span className="group relative inline-block">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        aria-pressed={active}
        className={`relative flex items-center justify-center rounded-md border bg-[radial-gradient(circle_at_50%_40%,#2a241b,#0e0c09)] transition ${
          active ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.6),0_0_12px_rgba(239,68,68,0.35)]" : "border-line-strong hover:border-gold-soft"
        } disabled:cursor-not-allowed disabled:opacity-35 disabled:grayscale`}
        style={{ width: size, height: size }}
      >
        {icon ? <img src={icon} alt="" className="h-[85%] w-[85%] object-contain" /> : <span className="text-xs text-faint">?</span>}
        {badge && (
          <span className="absolute -bottom-1 -right-1 rounded bg-gold px-1 text-[9px] font-bold leading-tight text-black">{badge}</span>
        )}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-lg border border-line-strong bg-surface p-2.5 text-left text-xs opacity-0 shadow-xl shadow-black/60 transition group-hover:visible group-hover:opacity-100"
      >
        <span className="block font-semibold text-[#c9b37e]">{label}</span>
        {desc && <span className="mt-1 block leading-snug text-muted">{desc}</span>}
      </span>
    </span>
  );
}

// --- item tooltip ------------------------------------------------------------------------------

function Divider({ color }: { color: string }) {
  return <div className="mx-auto my-2 h-px w-4/5" style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }} />;
}

function Pips({ used, max, label }: { used: number; max: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1" title={`${label} ${used}/${max}`}>
      <span className="text-[10px] uppercase tracking-wider text-faint">{label}</span>
      {Array.from({ length: 3 }, (_, k) => (
        <span
          key={k}
          className={`h-2 w-2 rotate-45 border ${k >= max ? "border-line/40" : k < used ? "border-gold bg-gold" : "border-gold-soft"}`}
        />
      ))}
    </span>
  );
}

// --- main ---------------------------------------------------------------------------------------

export function CraftSim() {
  const { t, fmt } = useI18n();
  const [data, setData] = useState<CraftData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("/data/craft.json")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);
  if (error) return <p className="text-red-400">{error}</p>;
  if (!data)
    return (
      <div className="flex h-96 items-center justify-center rounded-xl border border-line bg-surface text-muted">{t.craft.loading}</div>
    );
  return <Workbench data={data} t={t.craft} fmt={fmt} />;
}

function Workbench({ data, t, fmt }: { data: CraftData; t: Tc; fmt: Fmt }) {
  const c = useMemo(() => new Crafter(data), [data]);
  const all = useMemo(() => new Map(actions().map((a) => [a.id, a])), []);
  const classes = useMemo(() => [...new Set(Object.values(data.bases).map((b) => b[0]))].sort(), [data]);

  const [cls, setCls] = useState("Boots");
  const [base, setBase] = useState("Sleek Boots");
  const [ilvl, setIlvl] = useState(82);
  const [item, setItem] = useState<Item>({ base: "Sleek Boots", ilvl: 82, rarity: "normal", mods: [] });
  const [history, setHistory] = useState<{ item: Item; label: string; icon?: string; omenIcon?: string }[]>([]);
  const [targets, setTargets] = useState<Set<string>>(new Set());
  const [reveal, setReveal] = useState<{ item: Item; options: number[] } | null>(null);
  const [tier, setTier] = useState<CurrencyTier>("normal");
  const [omen, setOmen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [flash, setFlash] = useState(0);

  const basesOfClass = useMemo(
    () => Object.entries(data.bases).filter(([, b]) => b[0] === cls).sort((a, b) => b[1][1] - a[1][1] || a[0].localeCompare(b[0])),
    [data, cls],
  );
  const reset = (b = base, lvl = ilvl) => {
    setItem({ base: b, ilvl: lvl, rarity: "normal", mods: [] });
    setHistory([]);
    setReveal(null);
    setOmen(null);
  };
  const pickBase = (b: string) => {
    setBase(b);
    setTargets(new Set());
    reset(b);
  };

  const groups = useMemo(() => {
    const seen = new Map<string, "P" | "S">();
    const lordOf = new Map<string, string>();
    for (const i of [...c.pool(base), ...c.desecratedPool(base)]) {
      seen.set(c.mod(i).group, c.mod(i).affix);
      if (c.mod(i).lord) lordOf.set(c.mod(i).group, LORDS.find((l) => l.lord === c.mod(i).lord)!.name);
    }
    // Desecrated-only stats are labelled with their abyssal lord.
    return [...seen]
      .map(([g, affix]) => ({ group: g, affix, label: groupLabel(c, base, g) + (lordOf.has(g) && !c.pool(base).some((i) => c.mod(i).group === g) ? ` (${lordOf.get(g)})` : "") }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [c, base]);
  const tierOf = useMemo(() => {
    const rank = new Map<number, number>();
    const byGroup = new Map<string, number[]>();
    for (const i of [...c.pool(base), ...c.desecratedPool(base)]) byGroup.set(c.mod(i).group, [...(byGroup.get(c.mod(i).group) ?? []), i]);
    for (const list of byGroup.values()) [...list].sort((a, b) => c.mod(b).level - c.mod(a).level).forEach((i, k) => rank.set(i, k + 1));
    return rank;
  }, [c, base]);

  const advice = useMemo(() => advise(c, item, targets), [c, item, targets]);

  const icon = (name: string) => data.icons[name] ?? data.icons[name.replace(/^(Greater|Perfect) /, "")];
  const run = (a: Action, label: string, icons: { icon?: string; omenIcon?: string }) => {
    setHistory((h) => [...h, { item, label, ...icons }]);
    if (a.reveal) setReveal(c.desecrate(item, Math.random, a.desecrate));
    else setItem(a.run(c, item, Math.random));
    if (a.omen) setOmen(null);
    setFlash((f) => f + 1);
  };
  const applyOrb = (kind: Kind) => {
    const withOmen = all.get(actionId(kind, tier, omen));
    const plain = all.get(actionId(kind, tier, null));
    const a = withOmen && withOmen.can(c, item) ? withOmen : plain;
    if (!a || !a.can(c, item)) return;
    run(a, a.omen ? `${a.currency} + ${a.omen}` : a.currency, { icon: icon(a.currency), omenIcon: a.omen ? icon(a.omen) : undefined });
  };
  const orbUsable = (kind: Kind) => {
    const ids = [actionId(kind, tier, omen), actionId(kind, tier, null)];
    return ids.some((id) => all.get(id)?.can(c, item));
  };
  const undo = () => {
    const last = history.at(-1);
    if (!last) return;
    setItem(last.item);
    setHistory((h) => h.slice(0, -1));
    setReveal(null);
  };

  const color = RARITY_COLOR[item.rarity];
  const baseIcon = data.bases[base]?.[2];
  const maxSide = item.rarity === "rare" ? 3 : item.rarity === "magic" ? 1 : 0;
  const essenceTier: "greater" | "perfect" = item.rarity === "rare" ? "perfect" : "greater";

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="space-y-5">
        {/* Base picker */}
        <div className="flex flex-wrap items-end gap-2 rounded-xl border border-line bg-surface p-3">
          <label className="min-w-36 flex-1 text-[11px] uppercase tracking-wider text-faint">
            {t.itemClass}
            <select
              value={cls}
              onChange={(e) => {
                setCls(e.target.value);
                const first = Object.entries(data.bases).filter(([, b]) => b[0] === e.target.value).sort((a, b) => b[1][1] - a[1][1])[0]?.[0];
                if (first) pickBase(first);
              }}
              className="mt-1 w-full rounded-md border border-line bg-surface-2 px-2 py-1.5 text-sm normal-case tracking-normal text-ink"
            >
              {classes.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="min-w-44 flex-[2] text-[11px] uppercase tracking-wider text-faint">
            {t.base}
            <select value={base} onChange={(e) => pickBase(e.target.value)} className="mt-1 w-full rounded-md border border-line bg-surface-2 px-2 py-1.5 text-sm normal-case tracking-normal text-ink">
              {basesOfClass.map(([n, b]) => (
                <option key={n} value={n}>
                  {n} · {b[1]}
                </option>
              ))}
            </select>
          </label>
          <div className="text-[11px] uppercase tracking-wider text-faint">
            {t.itemLevel}
            <div className="mt-1 flex items-center overflow-hidden rounded-md border border-line bg-surface-2">
              <button type="button" onClick={() => { const v = Math.max(1, ilvl - 1); setIlvl(v); reset(base, v); }} className="px-2 py-1.5 text-muted hover:text-ink">−</button>
              <input
                type="number"
                min={1}
                max={86}
                value={ilvl}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(86, Number(e.target.value) || 1));
                  setIlvl(v);
                  reset(base, v);
                }}
                className="w-12 bg-transparent py-1.5 text-center text-sm text-ink [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button type="button" onClick={() => { const v = Math.min(86, ilvl + 1); setIlvl(v); reset(base, v); }} className="px-2 py-1.5 text-muted hover:text-ink">+</button>
            </div>
          </div>
        </div>

        {/* Item */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-[radial-gradient(ellipse_at_center,#221d16,#0b0907_75%)]">
            {baseIcon && <img src={baseIcon} alt="" className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />}
          </div>
          <div
            key={flash}
            className="w-full max-w-md animate-[craftflash_0.45s_ease-out] overflow-hidden rounded-md border bg-[#0b0907]/95 text-center shadow-2xl shadow-black/60"
            style={{ borderColor: `${color}88` }}
          >
            <div className="border-b px-4 py-2" style={{ borderColor: `${color}55`, background: `linear-gradient(180deg, ${color}2e, ${color}0d)` }}>
              {item.rarity !== "normal" && <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color }}>{t.rarity[item.rarity]}</p>}
              <p className="font-display text-xl" style={{ color }}>
                {base}
              </p>
            </div>
            <div className="px-4 py-3 text-sm">
              <p className="text-xs text-faint">
                {fmt(t.ilvlShort, { n: item.ilvl })}
              </p>
              <Divider color={color} />
              {item.mods.length === 0 ? (
                <p className="py-3 text-faint">{t.noMods}</p>
              ) : (
                <ul className="space-y-1 py-1">
                  {[...item.mods]
                    .sort((a, b) => (c.mod(a.i).affix === c.mod(b.i).affix ? 0 : c.mod(a.i).affix === "P" ? -1 : 1))
                    .map((m) => {
                      const mod = c.mod(m.i);
                      const wanted = targets.has(mod.group);
                      return (
                        <li key={m.i} className="group/mod relative grid grid-cols-[2.2rem_1fr_2.2rem] items-center gap-1">
                          <span className={`justify-self-start rounded px-1 text-[9px] font-bold ${mod.affix === "P" ? "bg-sky-500/15 text-sky-300" : "bg-violet-500/15 text-violet-300"}`}>
                            {mod.affix === "P" ? t.prefixShort : t.suffixShort}
                          </span>
                          <span
                            className="whitespace-pre-line leading-snug"
                            style={{ color: m.desecrated ? "#d4807a" : m.crafted ? "#b9a6ff" : wanted ? "#e8c46a" : "#8888ff" }}
                          >
                            {rolledText(mod.text, m.r)}
                          </span>
                          <span className="justify-self-end text-[10px] text-faint" title={mod.text}>
                            {m.crafted ? <span className="mr-0.5 text-[#b9a6ff]">✦</span> : m.desecrated ? <span className="mr-0.5 text-[#d4807a]">◆</span> : null}
                            T{tierOf.get(m.i)}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}
              {item.rarity !== "normal" && (
                <>
                  <Divider color={color} />
                  <div className="flex items-center justify-center gap-4">
                    <Pips used={c.count(item, "P")} max={maxSide} label={t.prefixShort} />
                    <Pips used={c.count(item, "S")} max={maxSide} label={t.suffixShort} />
                  </div>
                </>
              )}
              {item.mods.length > 0 && (
                <p className="mt-2 text-[10px] text-faint">
                  {t.tierHint}
                  {c.hasCrafted(item) && (
                    <>
                      {" · "}
                      <span style={{ color: "#b9a6ff" }}>✦</span> {t.crafted}
                    </>
                  )}
                  {c.hasDesecrated(item) && (
                    <>
                      {" · "}
                      <span style={{ color: "#d4807a" }}>◆</span> {t.desecrated}
                    </>
                  )}
                </p>
              )}
            </div>
            {reveal && (
              <div className="border-t border-red-900/50 bg-red-950/20 px-4 py-3">
                <p className="mb-2 text-xs text-red-200/80">{t.revealPick}</p>
                <div className="space-y-1.5">
                  {reveal.options.map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setItem({ ...reveal.item, mods: [...reveal.item.mods, { i, r: Math.random(), desecrated: true }] });
                        setReveal(null);
                        setFlash((f) => f + 1);
                      }}
                      className="block w-full rounded border border-red-900/60 bg-black/40 px-2 py-1.5 text-sm hover:border-red-400"
                      style={{ color: targets.has(c.mod(i).group) ? "#e8c46a" : "#d4807a" }}
                    >
                      {c.mod(i).text}
                    </button>
                  ))}
                  {reveal.options.length === 0 && <p className="text-sm text-faint">{t.revealNone}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stash */}
        <div className="rounded-xl border border-line bg-[linear-gradient(180deg,#17130e,#100d0a)] p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-lg text-gold">{t.currencies}</h3>
            <div role="radiogroup" aria-label={t.tierLabel} className="inline-flex rounded-md border border-line p-0.5 text-xs">
              {(["normal", "greater", "perfect"] as CurrencyTier[]).map((x) => (
                <button
                  key={x}
                  type="button"
                  role="radio"
                  aria-checked={tier === x}
                  onClick={() => setTier(x)}
                  className={`rounded px-2.5 py-1 ${tier === x ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
                >
                  {t.tiers[x]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {ORBS.map((o) => {
              const name = o.tiered ? `${TIER_NAME[tier]}${o.name}` : o.name;
              return (
                <Tile
                  key={o.kind}
                  icon={icon(o.name)}
                  label={name}
                  badge={o.tiered && tier !== "normal" ? (tier === "greater" ? "G" : "P") : undefined}
                  desc={t.kinds[o.kind]}
                  disabled={!!reveal || !orbUsable(o.kind)}
                  onClick={() => applyOrb(o.kind)}
                />
              );
            })}
          </div>

          <p className="mb-2 mt-4 text-[11px] uppercase tracking-wider text-faint">{t.omens}</p>
          <div className="flex flex-wrap gap-2">
            {OMENS.map((o) => (
              <Tile
                key={o.name}
                icon={icon(o.name)}
                label={o.name}
                desc={t.omenDesc[o.suffix.slice(1) as keyof Tc["omenDesc"]] + ` (${t.kindNames[o.kind]})`}
                active={omen === o.name}
                size={44}
                onClick={() => setOmen(omen === o.name ? null : o.name)}
              />
            ))}
          </div>
          {omen && <p className="mt-2 text-xs text-red-300">{fmt(t.omenActive, { omen })}</p>}

          <p className="mb-2 mt-4 text-[11px] uppercase tracking-wider text-faint">
            {essenceTier === "greater" ? t.essencesGreater : t.essencesPerfect}
          </p>
          <div className="flex flex-wrap gap-2">
            {ESSENCES.map((e) => {
              const a = all.get(`${essenceTier}-${slug(e.name)}`);
              const name = `${essenceTier === "greater" ? "Greater" : "Perfect"} ${e.name}`;
              return (
                <Tile
                  key={e.name}
                  icon={data.icons[name]}
                  label={name}
                  desc={`${e.groups.map((g) => groupLabel(c, base, g)).join(" / ")} — ${essenceTier === "greater" ? t.kinds.greaterEssence : t.kinds.perfectEssence}`}
                  size={44}
                  disabled={!!reveal || !a?.can(c, item)}
                  onClick={() => a && run(a, a.currency, { icon: data.icons[name] })}
                />
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <button type="button" onClick={undo} disabled={!history.length} className="rounded-md border border-line px-3 py-1 text-sm hover:border-gold-soft disabled:opacity-40">
              ↶ {t.undo}
            </button>
            <button type="button" onClick={() => reset()} className="rounded-md border border-line px-3 py-1 text-sm hover:border-gold-soft">
              {t.reset}
            </button>
            {history.length > 0 && (
              <div className="ml-auto flex max-w-full flex-wrap items-center gap-1" aria-label={t.history}>
                {history.map((h, k) => (
                  <span key={k} className="group relative">
                    <span className="flex h-7 w-7 items-center justify-center rounded border border-line bg-black/40">
                      {h.icon && <img src={h.icon} alt={h.label} className="h-5 w-5 object-contain" />}
                      {h.omenIcon && <img src={h.omenIcon} alt="" className="absolute -right-1 -top-1 h-3.5 w-3.5" />}
                    </span>
                    <span className="pointer-events-none invisible absolute bottom-full right-0 z-30 mb-1 whitespace-nowrap rounded border border-line bg-surface px-2 py-1 text-[11px] text-muted opacity-0 group-hover:visible group-hover:opacity-100">
                      {k + 1}. {h.label}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Goals and advice */}
      <div className="space-y-5">
        <div className="rounded-xl border border-line bg-surface p-4">
          <h3 className="font-display text-lg text-gold">{t.goals}</h3>
          <p className="mb-3 text-xs text-faint">{t.goalsHint}</p>
          {targets.size > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {[...targets].map((g) => {
                const d = diagnose(c, item, g);
                const dot = d.status === "done" ? "bg-emerald-400" : d.status === "ok" ? "bg-gold" : "bg-red-400";
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setTargets((s) => { const n = new Set(s); n.delete(g); return n; })}
                    className="group flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 py-1 pl-2 pr-2.5 text-xs hover:border-red-400"
                    title={fmt(t.status[d.status === "ok" ? "okShort" : d.status], { n: d.level ?? 0 })}
                  >
                    <span className={`h-2 w-2 rounded-full ${dot}`} />
                    {groups.find((x) => x.group === g)?.label ?? g}
                    <span className="text-faint group-hover:text-red-300">×</span>
                  </button>
                );
              })}
            </div>
          )}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="mb-2 w-full rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none"
          />
          <ul className="max-h-64 space-y-0.5 overflow-y-auto pr-1">
            {groups
              .filter((g) => !targets.has(g.group) && (!query || g.label.toLowerCase().includes(query.toLowerCase())))
              .map((g) => (
                <li key={g.group}>
                  <button
                    type="button"
                    onClick={() => setTargets((s) => new Set(s).add(g.group))}
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-muted hover:bg-surface-2 hover:text-ink"
                  >
                    <span className="text-gold">+</span>
                    <span className="flex-1">{g.label}</span>
                    <span className={`text-[9px] font-bold ${g.affix === "P" ? "text-sky-300/70" : "text-violet-300/70"}`}>
                      {g.affix === "P" ? t.prefixShort : t.suffixShort}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
          {targets.size > 0 && (
            <ul className="mt-3 space-y-1 border-t border-line pt-3 text-xs">
              {[...targets].map((g) => {
                const d = diagnose(c, item, g);
                if (d.status === "ok" && !d.level) return null;
                return (
                  <li key={g} className={d.status === "done" ? "text-emerald-300" : d.status === "ok" ? "text-faint" : "text-red-300"}>
                    <span className="text-muted">{groups.find((x) => x.group === g)?.label}</span> — {fmt(d.status === "ok" ? t.bestTierAt : t.status[d.status], { n: d.level ?? 0 })}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-line bg-surface p-4">
          <h3 className="font-display text-lg text-gold">{t.advice}</h3>
          {!targets.size ? (
            <p className="mt-2 text-sm text-faint">{t.adviceEmpty}</p>
          ) : advice.length === 0 ? (
            <p className="mt-2 text-sm text-faint">{t.adviceNone}</p>
          ) : (
            <ol className="mt-3 space-y-2">
              {advice.map((a, k) => (
                <li key={a.action.id} className={`flex items-center gap-3 rounded-lg border p-2.5 ${k === 0 ? "border-gold-soft bg-gold/5" : "border-line bg-surface-2/40"}`}>
                  <span className="relative shrink-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-line-strong bg-[radial-gradient(circle_at_50%_40%,#2a241b,#0e0c09)]">
                      <img src={icon(a.action.currency)} alt="" className="h-9 w-9 object-contain" />
                    </span>
                    {a.action.omen && (
                      <img src={icon(a.action.omen)} alt="" className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded border border-red-500/70 bg-black" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{a.action.currency}</p>
                    {a.action.omen && <p className="truncate text-xs text-red-300/90">+ {a.action.omen}</p>}
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/50">
                        <span className="block h-full rounded-full bg-gold" style={{ width: pct(a.gain) }} />
                      </span>
                      <span className="w-10 text-right text-xs tabular-nums text-gold">{pct(a.gain)}</span>
                    </div>
                    {a.loss > 0 && <p className="mt-0.5 text-[11px] text-red-300">{fmt(t.loss, { p: pct(a.loss) })}</p>}
                  </div>
                  <button
                    type="button"
                    disabled={!!reveal}
                    onClick={() =>
                      run(a.action, a.action.omen ? `${a.action.currency} + ${a.action.omen}` : a.action.currency, {
                        icon: icon(a.action.currency),
                        omenIcon: a.action.omen ? icon(a.action.omen) : undefined,
                      })
                    }
                    className="shrink-0 rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-black hover:brightness-110 disabled:opacity-40"
                  >
                    {t.apply}
                  </button>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-faint">{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
