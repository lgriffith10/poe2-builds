"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { priceLoot, type PricedName } from "@/lib/loot-value";

const EXAMPLE = `3x Divine Orb
Exalted Orb x45
12 Chaos Orb
Greater Essence of Haste
Item Class: Stackable Currency
Rarity: Currency
Orb of Annulment
--------
Stack Size: 4/20`;

export function LootValue({ names, exaltedPerDivine }: { names: PricedName[]; exaltedPerDivine: number }) {
  const { t, lang } = useI18n();
  const tl = t.loot;
  const [text, setText] = useState("");
  const result = useMemo(() => priceLoot(text, names), [text, names]);
  const nf = (n: number, d: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: d });
  // Same reading as the price chips: Divine Orbs from 1 div up, Exalted Orbs below.
  const price = (div: number) =>
    div >= 1 ? (
      <Money amount={nf(div, div < 10 ? 2 : 1)} icon="/img/currency/price-divine.png" alt="Divine Orb" />
    ) : (
      <Money amount={div * exaltedPerDivine < 1 ? "< 1" : nf(div * exaltedPerDivine, 0)} icon="/img/currency/price-exalted.png" alt="Exalted Orb" />
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div className="min-w-0">
        <label htmlFor="loot" className="mb-2 block text-sm font-semibold">
          {tl.paste}
        </label>
        <textarea
          id="loot"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          spellCheck={false}
          placeholder={EXAMPLE}
          className="w-full rounded-xl border border-line bg-surface p-3 font-mono text-sm placeholder:text-faint focus:border-gold-soft focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <button type="button" onClick={() => setText(EXAMPLE)} className="rounded-lg border border-line px-2.5 py-1 text-muted hover:text-gold">
            {tl.example}
          </button>
          {text && (
            <button type="button" onClick={() => setText("")} className="rounded-lg border border-line px-2.5 py-1 text-muted hover:text-red-300">
              {tl.clear}
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-faint">{tl.hint}</p>
      </div>

      <div className="min-w-0" aria-live="polite">
        <div className="mb-3 flex items-baseline justify-between gap-3 rounded-xl border border-gold-soft/50 bg-gold/5 px-4 py-3">
          <span className="font-display text-lg text-gold">{tl.total}</span>
          <span className="flex items-center gap-3 text-lg font-semibold">
            {price(result.total)}
            {result.total >= 1 && <span className="text-sm text-muted">≈ {nf(result.total * exaltedPerDivine, 0)} ex</span>}
          </span>
        </div>
        {result.rows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-faint">{tl.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-faint">
              <tr>
                <th className="pb-2 font-normal">{tl.item}</th>
                <th className="pb-2 text-right font-normal">{tl.count}</th>
                <th className="pb-2 text-right font-normal">{tl.each}</th>
                <th className="pb-2 text-right font-normal">{tl.sum}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {result.rows.map((r) => (
                <tr key={r.name}>
                  <td className="py-1.5">
                    <span className="flex min-w-0 items-center gap-2">
                      {r.icon ? <img src={r.icon} alt="" width={24} height={24} className="h-6 w-6 shrink-0 object-contain" /> : <span className="h-6 w-6 shrink-0" />}
                      {r.href ? (
                        <Link href={r.href} className={`truncate hover:underline ${r.kind === "unique" ? "text-unique" : "text-[#c9b37e]"}`}>
                          {r.name}
                        </Link>
                      ) : (
                        <span className="truncate">{r.name}</span>
                      )}
                    </span>
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{nf(r.count, 0)}</td>
                  <td className="py-1.5 text-right">{price(r.div)}</td>
                  <td className="py-1.5 text-right font-semibold">{price(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {result.unknown.length > 0 && (
          <div className="mt-4 rounded-xl border border-line p-3 text-xs">
            <p className="mb-1 font-semibold text-muted">{tl.unknown}</p>
            <p className="text-faint">{result.unknown.slice(0, 20).join(" · ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Money({ amount, icon, alt }: { amount: string; icon: string; alt: string }) {
  return (
    <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap tabular-nums">
      {amount}
      <img src={icon} alt={alt} width={18} height={18} className="h-[18px] w-[18px]" />
    </span>
  );
}
