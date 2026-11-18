"use client";

import { useMemo, useState } from "react";
import type { useI18n } from "@/i18n/client";
import type { Crafter, Item } from "@/lib/craft";
import { itemText, lineMin, readItem, StatIndex, tradeUrl, type PricedItem, type PriceLine, type StatList } from "@/lib/price-check";

type Tc = ReturnType<typeof useI18n>["t"]["craft"];
type Fmt = ReturnType<typeof useI18n>["fmt"];
export type UniquePrices = Record<string, { div: number; listings: number }>;

const RARITY_COLOR = { normal: "#c8c8c8", magic: "#8888ff", rare: "#e8d77a", unique: "#d27b3f" } as const;
/** The trade stat list is large: loaded the first time an item is checked. */
let statIndex: Promise<StatIndex> | null = null;
const loadStats = () => (statIndex ??= import("@/data/generated/trade-stats.json").then((m) => new StatIndex(m.default as StatList)));

function tierColor(tier: number) {
  return tier <= 2 ? "border-emerald-400/60 text-emerald-300" : tier <= 4 ? "border-gold-soft text-gold" : "border-line text-faint";
}

/** Price check of a pasted item (or the workbench's): a prefilled trade site search, plus poe.ninja for uniques. */
export function PriceCheck({
  c,
  simItem,
  league,
  uniques,
  exaltedPerDivine,
  t: tc,
  fmt,
  baseName,
}: {
  c: Crafter;
  simItem: Item;
  league: string;
  uniques: UniquePrices;
  exaltedPerDivine: number | null;
  t: Tc;
  fmt: Fmt;
  baseName: (b: string) => string;
}) {
  const t = tc.priceCheck;
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<PricedItem | null>(null);
  const [on, setOn] = useState<Set<string>>(new Set());
  const [tolerance, setTolerance] = useState(0.85);
  const [mins, setMins] = useState<Record<string, number | null>>({});
  const [ilvl, setIlvl] = useState(false);
  const [copied, setCopied] = useState(false);

  const check = async (raw: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = readItem(c, raw, await loadStats());
      if ("error" in res) {
        setItem(null);
        setError(t.errors[res.error]);
        return;
      }
      setItem(res);
      setOn(new Set(res.lines.filter((l) => l.on).map((l) => l.key)));
      setMins({});
      // Normal and magic items are bought as crafting bases: their level matters.
      setIlvl(res.rarity === "normal" || res.rarity === "magic");
    } finally {
      setBusy(false);
    }
  };
  const fromWorkbench = () => {
    const raw = itemText(c, simItem);
    setText(raw);
    check(raw);
  };

  const url = useMemo(() => (item ? tradeUrl(league, item, { tolerance, mins, on, ilvl }) : null), [item, league, tolerance, mins, on, ilvl]);
  // A handful of listings gives no price (poe.ninja shows absurd figures for items listed once or twice).
  const ninja = item?.rarity === "unique" && item.name ? uniques[item.name] : undefined;
  const unique = ninja && ninja.listings >= 5 ? ninja : undefined;
  const price = (div: number) =>
    div < 1 && exaltedPerDivine
      ? { n: Math.max(1, Math.round(div * exaltedPerDivine)), icon: "/img/currency/price-exalted.png", alt: "exalted" }
      : { n: div < 10 ? Number(div.toFixed(1)) : Math.round(div), icon: "/img/currency/price-divine.png", alt: "divine" };
  const toggle = (key: string) =>
    setOn((s) => {
      const n = new Set(s);
      if (!n.delete(key)) n.add(key);
      return n;
    });
  const label = (l: PriceLine) =>
    l.source === "pseudo" ? t.pseudo[l.text as keyof typeof t.pseudo] : l.source === "property" ? t.props[l.text as keyof typeof t.props] : l.text;
  const copy = () => {
    if (!url) return;
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => undefined,
    );
  };

  return (
    <section className="rounded-xl border border-line bg-surface p-4 xl:col-span-2" id="price-check">
      <h2 className="font-display text-xl font-semibold text-gold">{t.title}</h2>
      <p className="mt-1 max-w-3xl text-sm text-muted">{t.intro}</p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="space-y-2">
          <p className="text-xs leading-relaxed text-muted">{t.hint}</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={9}
            aria-label={t.title}
            placeholder={"Item Class: Rings\nRarity: Rare\n…"}
            className="w-full rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs placeholder:text-faint focus:border-gold-soft focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => check(text)}
              disabled={!text.trim() || busy}
              className="rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110 disabled:opacity-40"
            >
              {busy ? t.loadingStats : t.analyse}
            </button>
            <button
              type="button"
              onClick={fromWorkbench}
              disabled={busy}
              className="rounded-md border border-line px-3 py-1.5 text-sm hover:border-gold-soft disabled:opacity-40"
            >
              {t.useWorkbench}
            </button>
          </div>
          {error && <p className="text-xs text-red-300">{error}</p>}
          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs leading-relaxed text-faint">
            {t.howTo.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {item && (
          <div className="min-w-0 space-y-3">
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              {item.name && (
                <p className="font-semibold" style={{ color: RARITY_COLOR[item.rarity] }}>
                  {item.name}
                </p>
              )}
              <p className={item.name ? "text-sm text-muted" : "font-semibold"} style={item.name ? undefined : { color: RARITY_COLOR[item.rarity] }}>
                {item.base ? baseName(item.base) : "—"}
              </p>
              <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-faint">
                {item.ilvl && <span>{fmt(t.itemLevel, { n: item.ilvl })}</span>}
                {item.corrupted && <span className="text-red-400">{t.corrupted}</span>}
                {item.open && (item.open.P > 0 || item.open.S > 0) && <span>{fmt(t.open, { p: item.open.P, s: item.open.S })}</span>}
              </p>
            </div>

            {item.rarity === "unique" && (
              <div className="rounded-lg border border-gold-soft/50 bg-gold/5 p-3 text-sm">
                {unique ? (
                  <p className="flex flex-wrap items-center gap-2">
                    <span className="text-muted">{t.ninja}</span>
                    <span className="flex items-center gap-1 text-lg font-semibold text-gold">
                      {unique.listings < 10 && "≈ "}
                      {price(unique.div).n}
                      <img src={price(unique.div).icon} alt={price(unique.div).alt} width={20} height={20} className="h-5 w-5" />
                    </span>
                    {unique.listings < 10 && <span className="text-xs text-faint">({t.ninjaThin})</span>}
                  </p>
                ) : (
                  <p className="text-muted">{t.ninjaNone}</p>
                )}
              </div>
            )}

            {item.lines.length > 0 && (
              <ul className="space-y-1">
                {item.lines.map((l) => {
                  const min = lineMin(l, { tolerance, mins });
                  const active = on.has(l.key);
                  return (
                    <li
                      key={l.key}
                      className={`grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border px-2 py-1.5 text-sm ${active ? "border-gold-soft/60 bg-surface-2" : "border-line"} ${l.id ? "" : "opacity-50"}`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        disabled={!l.id}
                        onChange={() => toggle(l.key)}
                        aria-label={label(l)}
                        className="accent-[var(--color-gold)]"
                      />
                      <span className="min-w-0">
                        <span className={l.source === "pseudo" || l.source === "property" ? "font-semibold" : ""}>{label(l)}</span>
                        {(l.source === "pseudo" || l.source === "property") && l.value !== null && <span className="text-muted"> : {l.value}</span>}
                        {l.tier && l.tiers && (
                          <span title={fmt(t.tierTitle, { t: l.tier, n: l.tiers })} className={`ml-2 rounded border px-1 text-[10px] font-semibold ${tierColor(l.tier)}`}>
                            T{l.tier}
                          </span>
                        )}
                        {l.source !== "explicit" && l.source !== "pseudo" && l.source !== "property" && (
                          <span className="ml-2 text-[10px] uppercase tracking-wider text-faint">{t.sources[l.source]}</span>
                        )}
                        {!l.id && <span className="ml-2 text-[10px] text-faint">({t.noStat})</span>}
                        {l.inPseudo && <span className="ml-2 text-[10px] text-faint">({t.inPseudo})</span>}
                      </span>
                      {l.id && l.value !== null && l.value > 0 ? (
                        <label className="flex items-center gap-1 text-[11px] text-faint">
                          {t.min}
                          <input
                            type="number"
                            value={min ?? ""}
                            onChange={(e) => setMins((m) => ({ ...m, [l.key]: e.target.value === "" ? null : Number(e.target.value) }))}
                            className="w-16 rounded border border-line bg-surface px-1.5 py-0.5 text-right text-xs text-ink focus:border-gold-soft focus:outline-none"
                          />
                        </label>
                      ) : (
                        <span />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {item.rarity !== "unique" && (
              <div className="space-y-2 rounded-lg border border-line p-3 text-sm">
                <label className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-faint">{t.tolerance}</span>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.05}
                    value={tolerance}
                    onChange={(e) => {
                      setTolerance(Number(e.target.value));
                      setMins({});
                    }}
                    className="flex-1 accent-[var(--color-gold)]"
                  />
                  <span className="w-10 text-right font-semibold text-gold">{Math.round(tolerance * 100)}%</span>
                </label>
                <p className="text-xs text-faint">{fmt(t.toleranceHint, { n: Math.round(tolerance * 100) })}</p>
                {item.ilvl && (
                  <label className="flex items-center gap-2 text-xs text-muted">
                    <input type="checkbox" checked={ilvl} onChange={(e) => setIlvl(e.target.checked)} className="accent-[var(--color-gold)]" />
                    {t.ilvlFilter} ({item.ilvl}+)
                  </label>
                )}
              </div>
            )}

            {url && (
              <div className="flex flex-wrap gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-black hover:brightness-110"
                >
                  {t.search} ↗
                </a>
                <button type="button" onClick={copy} className="rounded-md border border-line px-3 py-2 text-sm hover:border-gold-soft">
                  {copied ? `✓ ${t.copied}` : t.copy}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
