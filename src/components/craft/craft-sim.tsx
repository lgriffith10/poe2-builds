"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/client";
import {
  Crafter,
  ESSENCES,
  actions,
  advise,
  diagnose,
  groupLabel,
  LORDS,
  planCraft,
  type PlanResult,
  rolledText,
  type Action,
  type CraftData,
  type CurrencyTier,
  type Item,
  type Rarity,
} from "@/lib/craft";
import { frenchModText, parseItemText } from "@/lib/craft-import";
import { decodeCraft, encodeCraft } from "@/lib/craft-share";

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

/** Currency wiki entries by currency name (passed from the page, see lib/currency.ts). */
export type CraftWiki = Record<string, { slug: string; description: string | null }>;
const WikiContext = createContext<CraftWiki>({});

/** Square stash slot with a hover card (not the browser's title tooltip) showing the game text and a wiki link. */
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
  const { t, path } = useI18n();
  const entry = useContext(WikiContext)[label];
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
      {/* Padding (not margin) under the card keeps the hover alive while the pointer moves up to the wiki link. */}
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 w-64 -translate-x-1/2 pb-2 opacity-0 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
      >
        <span className="block rounded-lg border border-line-strong bg-surface p-2.5 text-left text-xs shadow-xl shadow-black/60">
          <span className="block font-semibold text-[#c9b37e]">{label}</span>
          {entry?.description && <span className="mt-1 block whitespace-pre-line leading-snug text-ink/85">{entry.description}</span>}
          {desc && <span className="mt-1 block leading-snug text-muted">{desc}</span>}
          {entry && (
            <a href={path(`/database/currency/${entry.slug}`)} className="mt-1.5 block font-semibold text-gold hover:underline">
              {t.craft.wikiLink} →
            </a>
          )}
        </span>
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

export function CraftSim({ wiki = {}, prices = {} }: { wiki?: CraftWiki; prices?: Record<string, number> } = {}) {
  const { t, fmt, lang } = useI18n();
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
  return (
    <WikiContext.Provider value={wiki}>
      <Workbench data={data} t={t.craft} fmt={fmt} french={lang === "fr"} prices={prices} />
    </WikiContext.Provider>
  );
}

function Workbench({ data, t, fmt, french, prices }: { data: CraftData; t: Tc; fmt: Fmt; french: boolean; prices: Record<string, number> }) {
  const c = useMemo(() => new Crafter(data), [data]);
  // A shared link (#c=…) opens on its item and goals; the workbench only mounts in the browser, once data is loaded.
  const [shared] = useState(() => (window.location.hash.startsWith("#c=") ? decodeCraft(new Crafter(data), window.location.hash.slice(3)) : null));
  /** Mod texts in the page language (French from the trade site's translations, English otherwise). */
  const tr = useMemo(() => (french ? (s: string) => frenchModText(c, s) : (s: string) => s), [c, french]);
  const baseNames = useMemo(
    () => new Map(french ? Object.entries(data.fr?.bases ?? {}).map(([fr, en]) => [en, fr]) : []),
    [data, french],
  );
  const baseName = (b: string) => baseNames.get(b) ?? b;
  const all = useMemo(() => new Map(actions().map((a) => [a.id, a])), []);
  const classes = useMemo(() => [...new Set(Object.values(data.bases).map((b) => b[0]))].sort(), [data]);

  const [cls, setCls] = useState(shared ? data.bases[shared.item.base][0] : "Boots");
  const [base, setBase] = useState(shared?.item.base ?? "Sleek Boots");
  const [ilvl, setIlvl] = useState(shared?.item.ilvl ?? 82);
  const [item, setItem] = useState<Item>(shared?.item ?? { base: "Sleek Boots", ilvl: 82, rarity: "normal", mods: [] });
  const [history, setHistory] = useState<{ item: Item; label: string; icon?: string; omenIcon?: string }[]>([]);
  const [targets, setTargets] = useState<Set<string>>(new Set(shared?.targets ?? []));
  const [reveal, setReveal] = useState<{ item: Item; options: number[] } | null>(null);
  const [tier, setTier] = useState<CurrencyTier>("normal");
  const [omen, setOmen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [flash, setFlash] = useState(0);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string; unmatched?: string[] } | null>(null);
  const [editing, setEditing] = useState(false);
  const [editQuery, setEditQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [plan, setPlan] = useState<{ key: string; result: PlanResult } | null>(null);
  const [planning, setPlanning] = useState(false);
  const planKey = `${item.base}|${item.ilvl}|${item.rarity}|${item.mods.map((m) => m.i).join(",")}|${[...targets].join(",")}`;
  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}#c=${encodeCraft(c, item, targets)}`;
    window.history.replaceState(null, "", url);
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => undefined,
    );
  };
  const runPlan = () => {
    setPlanning(true);
    // Let the spinner paint before the (1-3 s) simulation blocks the thread.
    setTimeout(() => {
      setPlan({ key: planKey, result: planCraft(c, item, targets, prices, { trials: 100 }) });
      setPlanning(false);
    }, 30);
  };
  const exaltedPerDivine = prices["Exalted Orb"] ? 1 / prices["Exalted Orb"] : null;
  const priceText = (div: number) =>
    div < 1 && exaltedPerDivine ? fmt(t.priceExalted, { n: Math.max(1, Math.round(div * exaltedPerDivine)) }) : fmt(t.priceDivine, { n: div < 10 ? div.toFixed(1) : Math.round(div) });

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
  /** Item level change: keeps the item, minus the modifiers the new level cannot have. */
  const setLevel = (v: number) => {
    setIlvl(v);
    setItem((it) => ({ ...it, ilvl: v, mods: it.mods.filter((m) => c.mod(m.i).level <= v) }));
    setReveal(null);
  };
  const importItem = () => {
    const res = parseItemText(c, importText, base);
    if (!res.item) {
      setImportMsg({ ok: false, text: t.importErrors[res.error ?? "empty"] });
      return;
    }
    const it = res.item;
    setCls(data.bases[it.base][0]);
    setBase(it.base);
    setIlvl(it.ilvl);
    setItem(it);
    setHistory([]);
    setReveal(null);
    setOmen(null);
    setTargets(new Set());
    setFlash((f) => f + 1);
    setImportMsg({
      ok: true,
      text: fmt(t.importOk, { n: it.mods.length }) + (res.baseGuessed ? ` ${fmt(t.importBaseGuessed, { base: it.base })}` : ""),
      unmatched: res.unmatched,
    });
  };

  // Manual edits (to rebuild an item by hand); each one can be undone like a currency.
  const edit = (next: Item) => {
    setHistory((h) => [...h, { item, label: t.manualEdit }]);
    setItem(next);
    setFlash((f) => f + 1);
  };
  const tiersOf = (group: string, desecrated: boolean) =>
    (desecrated ? c.desecratedPool(base) : c.pool(base))
      .filter((i) => c.mod(i).group === group && c.mod(i).level <= item.ilvl)
      .sort((a, b) => c.mod(b).level - c.mod(a).level);
  const canAdd = (group: string, affix: "P" | "S") =>
    !item.mods.some((m) => c.mod(m.i).group === group) &&
    c.free(item, "rare")[affix] > 0 &&
    (tiersOf(group, false).length > 0 || tiersOf(group, true).length > 0);
  const addMod = (group: string) => {
    const regular = tiersOf(group, false);
    const tiers = regular.length ? regular : tiersOf(group, true);
    if (!tiers.length) return;
    const affix = c.mod(tiers[0]).affix;
    let rarity: Rarity = item.rarity === "normal" ? "magic" : item.rarity;
    if (rarity === "magic" && c.free(item, "magic")[affix] <= 0) rarity = "rare";
    if (c.free(item, rarity)[affix] <= 0) return;
    edit({ ...item, rarity, mods: [...item.mods, { i: tiers[0], r: 0.5, ...(regular.length ? {} : { desecrated: true }) }] });
  };
  const rarityAllowed = (r: Rarity) =>
    r === "rare" || (r === "magic" ? c.count(item, "P") <= 1 && c.count(item, "S") <= 1 : item.mods.length === 0);
  const toggleTarget = (g: string) =>
    setTargets((s) => {
      const n = new Set(s);
      if (!n.delete(g)) n.add(g);
      return n;
    });

  const groups = useMemo(() => {
    const seen = new Map<string, "P" | "S">();
    const lordOf = new Map<string, string>();
    for (const i of [...c.pool(base), ...c.desecratedPool(base)]) {
      seen.set(c.mod(i).group, c.mod(i).affix);
      if (c.mod(i).lord) lordOf.set(c.mod(i).group, LORDS.find((l) => l.lord === c.mod(i).lord)!.name);
    }
    // Desecrated-only stats are labelled with their abyssal lord.
    return [...seen]
      .map(([g, affix]) => ({ group: g, affix, label: tr(groupLabel(c, base, g)) + (lordOf.has(g) && !c.pool(base).some((i) => c.mod(i).group === g) ? ` (${lordOf.get(g)})` : "") }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [c, base, tr]);
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
                  {baseName(n)} · {b[1]}
                </option>
              ))}
            </select>
          </label>
          <div className="text-[11px] uppercase tracking-wider text-faint">
            {t.itemLevel}
            <div className="mt-1 flex items-center overflow-hidden rounded-md border border-line bg-surface-2">
              <button type="button" aria-label={`${t.itemLevel} −1`} onClick={() => setLevel(Math.max(1, ilvl - 1))} className="px-2 py-1.5 text-muted hover:text-ink">−</button>
              <input
                aria-label={t.itemLevel}
                type="number"
                min={1}
                max={86}
                value={ilvl}
                onChange={(e) => setLevel(Math.max(1, Math.min(86, Number(e.target.value) || 1)))}
                className="w-12 bg-transparent py-1.5 text-center text-sm text-ink [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button type="button" aria-label={`${t.itemLevel} +1`} onClick={() => setLevel(Math.min(86, ilvl + 1))} className="px-2 py-1.5 text-muted hover:text-ink">+</button>
            </div>
          </div>
        </div>

        {/* Start from an existing item */}
        <div className="rounded-xl border border-line bg-surface">
          <button
            type="button"
            onClick={() => setImportOpen((o) => !o)}
            aria-expanded={importOpen}
            className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold text-gold"
          >
            {t.startFrom}
            <span className="text-faint">{importOpen ? "−" : "+"}</span>
          </button>
          {importOpen && (
            <div className="space-y-2 border-t border-line p-3">
              <p className="text-xs leading-relaxed text-muted">{t.importHint}</p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={6}
                aria-label={t.startFrom}
                placeholder={"Item Class: Boots\nRarity: Rare\n…"}
                className="w-full rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs placeholder:text-faint focus:border-gold-soft focus:outline-none"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={importItem}
                  disabled={!importText.trim()}
                  className="rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40"
                >
                  {t.importButton}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-md border border-line px-3 py-1.5 text-sm hover:border-gold-soft"
                >
                  ✎ {t.editByHand}
                </button>
              </div>
              {importMsg && (
                <div className={`text-xs ${importMsg.ok ? "text-emerald-300" : "text-red-300"}`}>
                  <p>{importMsg.text}{importMsg.ok && ` ${t.importNext}`}</p>
                  {!!importMsg.unmatched?.length && (
                    <p className="mt-1 text-faint">
                      {t.importUnmatched} <span className="text-muted">{importMsg.unmatched.join(" · ")}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
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
                {baseName(base)}
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
                      const tiers = editing ? tiersOf(mod.group, Boolean(m.desecrated)) : [];
                      return (
                        <li key={m.i} className={`group/mod relative grid items-center gap-1 ${editing ? "grid-cols-[2.2rem_1fr_auto]" : "grid-cols-[2.2rem_1fr_2.2rem]"}`}>
                          <span className={`justify-self-start rounded px-1 text-[9px] font-bold ${mod.affix === "P" ? "bg-sky-500/15 text-sky-300" : "bg-violet-500/15 text-violet-300"}`}>
                            {mod.affix === "P" ? t.prefixShort : t.suffixShort}
                          </span>
                          <button
                            type="button"
                            disabled={editing}
                            onClick={() => toggleTarget(mod.group)}
                            title={wanted ? t.unmarkWanted : t.markWanted}
                            aria-pressed={wanted}
                            className={`whitespace-pre-line rounded leading-snug ${editing ? "" : "hover:bg-white/5"} ${wanted ? "underline decoration-gold/50 underline-offset-2" : ""}`}
                            style={{ color: m.desecrated ? "#d4807a" : m.crafted ? "#b9a6ff" : wanted ? "#e8c46a" : "#8888ff" }}
                          >
                            {tr(rolledText(mod.text, m.r))}
                          </button>
                          {editing ? (
                            <span className="flex items-center gap-1 justify-self-end">
                              <select
                                aria-label={t.tierSelect}
                                value={m.i}
                                onChange={(e) => {
                                  const i = Number(e.target.value);
                                  edit({ ...item, mods: item.mods.map((x) => (x === m ? { ...x, i } : x)) });
                                }}
                                className="rounded border border-line bg-surface-2 px-1 py-0.5 text-[11px] text-ink"
                              >
                                {(tiers.includes(m.i) ? tiers : [m.i, ...tiers]).map((i) => (
                                  <option key={i} value={i}>
                                    T{tierOf.get(i)} · {c.mod(i).text.match(/\(([\d.-]+-[\d.-]+)\)/)?.[1] ?? fmt(t.levelShort, { n: c.mod(i).level })}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                aria-label={t.removeMod}
                                onClick={() => edit({ ...item, mods: item.mods.filter((x) => x !== m) })}
                                className="px-1 text-faint hover:text-red-300"
                              >
                                ×
                              </button>
                            </span>
                          ) : (
                          <span className="justify-self-end text-[10px] text-faint" title={mod.text}>
                            {m.crafted ? <span className="mr-0.5 text-[#b9a6ff]">✦</span> : m.desecrated ? <span className="mr-0.5 text-[#d4807a]">◆</span> : null}
                            T{tierOf.get(m.i)}
                          </span>
                          )}
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
            {item.mods.length > 0 && !editing && <p className="-mt-1 px-4 pb-2 text-[10px] text-faint">{t.clickToWant}</p>}
            {editing && (
              <div className="border-t border-line bg-surface/60 px-4 py-3 text-left">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-faint">{t.rarityLabel}</span>
                  {(["normal", "magic", "rare"] as Rarity[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      disabled={!rarityAllowed(r) || item.rarity === r}
                      onClick={() => edit({ ...item, rarity: r })}
                      className={`rounded px-2 py-0.5 text-xs ${item.rarity === r ? "bg-surface-2" : "text-muted hover:text-ink disabled:opacity-40"}`}
                      style={item.rarity === r ? { color: RARITY_COLOR[r] } : undefined}
                    >
                      {t.rarity[r]}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="ml-auto rounded-md bg-gold px-2.5 py-1 text-xs font-semibold text-black hover:brightness-110"
                  >
                    {t.editDone}
                  </button>
                </div>
                <p className="mb-2 text-[11px] text-faint">{t.editHint}</p>
                <input
                  type="search"
                  value={editQuery}
                  onChange={(e) => setEditQuery(e.target.value)}
                  placeholder={t.addMod}
                  className="mb-1 w-full rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none"
                />
                <ul className="max-h-48 space-y-0.5 overflow-y-auto pr-1">
                  {groups
                    .filter((g) => (!editQuery || g.label.toLowerCase().includes(editQuery.toLowerCase())) && canAdd(g.group, g.affix))
                    .map((g) => (
                      <li key={g.group}>
                        <button
                          type="button"
                          onClick={() => addMod(g.group)}
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
              </div>
            )}
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
                      {tr(c.mod(i).text)}
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
                  disabled={!!reveal || editing || !orbUsable(o.kind)}
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
                  desc={`${e.groups.map((g) => tr(groupLabel(c, base, g))).join(" / ")} — ${essenceTier === "greater" ? t.kinds.greaterEssence : t.kinds.perfectEssence}`}
                  size={44}
                  disabled={!!reveal || editing || !a?.can(c, item)}
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
            <button
              type="button"
              onClick={() => setEditing((e) => !e)}
              aria-pressed={editing}
              disabled={!!reveal}
              className={`rounded-md border px-3 py-1 text-sm disabled:opacity-40 ${editing ? "border-gold-soft text-gold" : "border-line hover:border-gold-soft"}`}
            >
              ✎ {t.editByHand}
            </button>
            <button type="button" onClick={share} className="rounded-md border border-line px-3 py-1 text-sm hover:border-gold-soft">
              {copied ? `✓ ${t.shared}` : t.share}
            </button>
            {history.length > 0 && (
              <div className="ml-auto flex max-w-full flex-wrap items-center gap-1" aria-label={t.history}>
                {history.map((h, k) => (
                  <span key={k} className="group relative">
                    <span className="flex h-7 w-7 items-center justify-center rounded border border-line bg-black/40">
                      {h.icon ? <img src={h.icon} alt={h.label} className="h-5 w-5 object-contain" /> : <span className="text-xs text-muted" aria-label={h.label}>✎</span>}
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

        {/* Whole strategy: success rate, currency used and cost */}
        <div className="rounded-xl border border-line bg-surface p-4">
          <h3 className="font-display text-lg text-gold">{t.plan}</h3>
          <p className="mt-1 text-xs text-faint">{t.planHint}</p>
          <button
            type="button"
            onClick={runPlan}
            disabled={!targets.size || planning}
            className="mt-3 rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40"
          >
            {planning ? t.planRunning : t.planRun}
          </button>
          {plan && plan.key !== planKey && <p className="mt-2 text-xs text-faint">{t.planStale}</p>}
          {plan && plan.key === planKey && (
            <div className="mt-3 space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border border-line bg-surface-2/50 p-2">
                  <p className="text-lg font-semibold text-gold tabular-nums">{pct(plan.result.success)}</p>
                  <p className="text-[11px] text-faint">{t.planSuccess}</p>
                </div>
                <div className="rounded-lg border border-line bg-surface-2/50 p-2">
                  <p className="text-lg font-semibold tabular-nums">{plan.result.success ? plan.result.steps.toFixed(0) : "—"}</p>
                  <p className="text-[11px] text-faint">{t.planSteps}</p>
                </div>
                <div className="rounded-lg border border-line bg-surface-2/50 p-2">
                  <p className="text-lg font-semibold tabular-nums">{plan.result.cost === null ? "—" : `${plan.result.partial ? "≥ " : "≈ "}${priceText(plan.result.cost)}`}</p>
                  <p className="text-[11px] text-faint">{t.planCost}</p>
                </div>
              </div>
              {plan.result.route.length > 0 && (
                <div>
                  <p className="mb-1.5 text-[11px] uppercase tracking-wider text-faint">{t.planRoute}</p>
                  <ol className="flex flex-wrap items-center gap-1">
                    {plan.result.route.map((r, k) => (
                      <li key={k} className="flex items-center gap-1">
                        {k > 0 && <span className="text-faint">›</span>}
                        <span className="relative" title={r.omen ? `${r.currency} + ${r.omen}` : r.currency}>
                          <img src={icon(r.currency)} alt={r.currency} className="h-8 w-8 rounded border border-line bg-black/40 object-contain p-0.5" />
                          {r.omen && <img src={icon(r.omen)} alt="" className="absolute -bottom-1 -right-1 h-4 w-4 rounded border border-red-500/70 bg-black" />}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {plan.result.usage.length > 0 && (
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-faint">{t.planUsage}</p>
                  <ul className="space-y-0.5 text-xs">
                    {plan.result.usage.slice(0, 8).map((u) => (
                      <li key={`${u.currency}|${u.omen}`} className="flex items-center gap-2">
                        <span className="w-10 text-right tabular-nums text-gold">×{u.avg < 10 ? u.avg.toFixed(1) : Math.round(u.avg)}</span>
                        <span className="min-w-0 flex-1 truncate text-muted">
                          {u.currency}
                          {u.omen && <span className="text-red-300/90"> + {u.omen}</span>}
                        </span>
                        {prices[u.currency] !== undefined && (!u.omen || prices[u.omen] !== undefined) && (
                          <span className="shrink-0 tabular-nums text-faint">{priceText((prices[u.currency] + (u.omen ? prices[u.omen] : 0)) * u.avg)}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {plan.result.unreachable.length > 0 && (
                <p className="text-xs text-red-300">
                  {t.planUnreachable} {plan.result.unreachable.map((g) => groups.find((x) => x.group === g)?.label ?? g).join(", ")}
                </p>
              )}
              {plan.result.partial && <p className="text-xs text-faint">{t.planPartial}</p>}
            </div>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-faint">{t.planDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}
