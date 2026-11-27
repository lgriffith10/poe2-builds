"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import type { LootEntry } from "@/lib/mechanics";
import { TIERS, type Tier } from "@/lib/types";
import { TierBadge } from "./ui";

const FOLDED: Tier[] = ["D"];
const PRICE_ICON = { divine: "/img/currency/price-divine.png", exalted: "/img/currency/price-exalted.png" } as const;

function LootChip({ e, dim = false }: { e: LootEntry; dim?: boolean }) {
  const { path } = useI18n();
  const body = (
    <>
      {e.icon ? (
        <img src={e.icon} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
      ) : (
        <span className="h-8 w-8 shrink-0 rounded bg-line" />
      )}
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{e.name}</span>
      <span className="flex shrink-0 items-center gap-1 text-sm text-gold">
        {dim && "≈ "}
        {e.price.amount}
        <img src={PRICE_ICON[e.price.unit]} alt={e.price.unit} width={18} height={18} className="h-[18px] w-[18px]" />
      </span>
    </>
  );
  const cls = `flex items-center gap-2 rounded-lg border border-line bg-surface-2 p-2 ${dim ? "opacity-70" : ""}`;
  return e.href ? (
    <Link href={path(e.href)} className={`${cls} hover:border-gold-soft`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** A mechanic's loot by value (lib/mechanics.ts): tiers of well-traded items, thinly traded ones apart. */
export function LootTierBoard({ entries }: { entries: LootEntry[] }) {
  const { t, fmt } = useI18n();
  const tr = t.farmingPages;
  const [open, setOpen] = useState<string[]>([]);
  const liquid = entries.filter((e) => e.liquid);
  const thin = entries.filter((e) => !e.liquid);
  const showButton = (key: string, n: number) => (
    <button
      type="button"
      onClick={() => setOpen([...open, key])}
      className="self-center justify-self-start rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:text-gold"
    >
      {fmt(tr.showItems, { n })}
    </button>
  );

  return (
    <div className="space-y-3">
      {TIERS.map((tier) => {
        const inTier = liquid.filter((e) => e.tier === tier);
        if (!inTier.length) return null;
        const folded = FOLDED.includes(tier) && !open.includes(tier);
        return (
          <div key={tier} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
            <TierBadge tier={tier} size="lg" />
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {folded ? showButton(tier, inTier.length) : inTier.map((e) => <LootChip key={e.name} e={e} />)}
            </div>
          </div>
        );
      })}
      {thin.length > 0 && (
        <div className="rounded-xl border border-dashed border-line p-3">
          <p className="text-sm font-semibold text-muted">{tr.lootThin}</p>
          <p className="mb-2 text-xs text-faint">{tr.lootThinSub}</p>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {open.includes("thin") ? thin.map((e) => <LootChip key={e.name} e={e} dim />) : showButton("thin", thin.length)}
          </div>
        </div>
      )}
    </div>
  );
}
