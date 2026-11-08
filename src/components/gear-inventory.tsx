"use client";

import { useState } from "react";
import type { PriceTag } from "@/lib/prices";
import type { GearSlot, GearStage } from "@/lib/types";

export interface InventoryItem {
  slot: GearSlot;
  slotLabel: string;
  /** Unique name, or "Rare <base>" for rares. */
  title: string;
  kind: "unique" | "rare";
  base: string | null;
  icon: string | null;
  implicits: string[];
  mods: string[];
  /** "Grants Skill: …" line for bases that come with a skill (uniques list it in their mods). */
  grants: string | null;
  note: string | null;
  /** Market price for uniques (poe.ninja), null when unknown or for rares. */
  price: PriceTag | null;
}

export interface InventoryStage {
  id: GearStage | "default";
  label: string;
  items: InventoryItem[];
  /** Sum of the uniques' prices in this stage. */
  total: PriceTag | null;
}

/** Small "19 [exalted icon]" chip. */
export function Price({ tag, alt }: { tag: PriceTag; alt: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-line bg-black/40 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-ink">
      ≈ {tag.amount}
      <img src={tag.icon} alt={alt} width={16} height={16} className="h-4 w-4" />
    </span>
  );
}

/** Grid placement of each slot, mirroring the in-game equipment panel (8 columns x 7 rows). */
const PLACEMENT: Record<GearSlot, string> = {
  weapon: "col-start-1 col-span-2 row-start-2 row-span-4",
  offhand: "col-start-7 col-span-2 row-start-2 row-span-4",
  helmet: "col-start-4 col-span-2 row-start-1 row-span-2",
  amulet: "col-start-6 row-start-2",
  body: "col-start-4 col-span-2 row-start-3 row-span-3",
  ring1: "col-start-3 row-start-4",
  ring2: "col-start-6 row-start-4",
  gloves: "col-start-1 col-span-2 row-start-6 row-span-2",
  belt: "col-start-4 col-span-2 row-start-6",
  boots: "col-start-7 col-span-2 row-start-6 row-span-2",
};
const ORDER: GearSlot[] = ["weapon", "helmet", "body", "offhand", "gloves", "boots", "amulet", "ring1", "ring2", "belt"];

export function GearInventory({
  stages,
  initialStage,
  slotLabels,
  hint,
  priceLabels,
}: {
  stages: InventoryStage[];
  initialStage: number;
  slotLabels: Record<GearSlot, string>;
  hint: string;
  /** { divine, exalted, stageTotal, note } labels for the price chips. */
  priceLabels: { divine: string; exalted: string; stageTotal: string; note: string };
}) {
  const [stageIndex, setStageIndex] = useState(initialStage);
  const stage = stages[stageIndex];
  const bySlot = new Map(stage.items.map((it) => [it.slot, it]));
  const [selected, setSelected] = useState<GearSlot>(stage.items[0]?.slot ?? "weapon");
  const current = bySlot.get(selected) ?? stage.items[0];

  return (
    <div>
      {stages.length > 1 && (
        <div role="tablist" className="mb-4 inline-flex flex-wrap gap-1 rounded-lg border border-line p-1">
          {stages.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === stageIndex}
              onClick={() => setStageIndex(i)}
              className={`rounded-md px-3 py-1.5 text-sm ${i === stageIndex ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      {stage.total && (
        <p className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
          {priceLabels.stageTotal}
          <Price tag={stage.total} alt={stage.total.unit === "divine" ? priceLabels.divine : priceLabels.exalted} />
          <span className="text-xs text-faint">{priceLabels.note}</span>
        </p>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="w-full max-w-sm shrink-0 self-center rounded-xl border border-line bg-[radial-gradient(ellipse_at_center,#1d1913_0%,#0c0a08_80%)] p-3 md:self-start">
          <div className="grid aspect-[8/7] grid-cols-8 grid-rows-7 gap-1.5">
            {ORDER.map((slot) => {
              const it = bySlot.get(slot);
              const active = it && current?.slot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!it}
                  onMouseEnter={() => it && setSelected(slot)}
                  onFocus={() => it && setSelected(slot)}
                  onClick={() => it && setSelected(slot)}
                  aria-label={it ? `${slotLabels[slot]}: ${it.title}` : slotLabels[slot]}
                  className={`${PLACEMENT[slot]} relative flex items-center justify-center overflow-hidden rounded-md border bg-black/40 transition ${
                    !it
                      ? "border-line/60"
                      : it.kind === "unique"
                        ? "border-unique/50 bg-[radial-gradient(circle,rgba(201,132,74,0.18),transparent_70%)] hover:border-unique"
                        : "border-[#e8d77a]/35 bg-[radial-gradient(circle,rgba(232,215,122,0.10),transparent_70%)] hover:border-[#e8d77a]/80"
                  } ${active ? "ring-2 ring-gold" : ""}`}
                >
                  {it?.icon ? (
                    <img src={it.icon} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                  ) : (
                    <span className="px-0.5 text-center text-[10px] leading-tight text-faint">{slotLabels[slot]}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {current && (
          <div className="min-w-0 flex-1 rounded-xl border border-line-strong bg-surface shadow-lg shadow-black/40">
            <div
              className={`rounded-t-xl border-b px-4 py-3 text-center ${
                current.kind === "unique" ? "border-unique/30 bg-unique/10" : "border-[#e8d77a]/25 bg-[#e8d77a]/5"
              }`}
            >
              <p className="text-xs uppercase tracking-wider text-faint">{current.slotLabel}</p>
              <p className={`font-display text-lg ${current.kind === "unique" ? "text-unique" : "text-[#e8d77a]"}`}>
                {current.title}
              </p>
              {current.kind === "unique" && current.base && <p className="text-sm text-muted">{current.base}</p>}
              {current.price && (
                <p className="mt-1.5">
                  <Price tag={current.price} alt={current.price.unit === "divine" ? priceLabels.divine : priceLabels.exalted} />
                </p>
              )}
            </div>
            <div className="space-y-2 px-4 py-3 text-center text-sm">
              {current.grants && <p className="border-b border-line pb-2 font-semibold text-[#c8b47a]">{current.grants}</p>}
              {current.implicits.length > 0 && (
                <ul className="space-y-0.5 border-b border-line pb-2 text-[#8fb6f0]">
                  {current.implicits.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
              <ul className={`space-y-0.5 ${current.kind === "unique" ? "text-[#8fb6f0]" : "text-ink"}`}>
                {current.mods.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
              {current.note && <p className="border-t border-line pt-2 text-xs text-muted">{current.note}</p>}
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-faint">{hint}</p>
    </div>
  );
}
