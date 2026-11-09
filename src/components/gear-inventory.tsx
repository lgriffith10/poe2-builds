"use client";

import { useState } from "react";
import type { PriceTag } from "@/lib/prices";
import type { GearSlot, GearStage } from "@/lib/types";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";

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
  /** Socketed runes and soul cores. */
  runes: string[];
  /** Ladder popularity for this slot among characters of the build (% of characters). */
  ladder: { name: string; pct: number }[];
  /** "Grants Skill: …" line for bases that come with a skill (uniques list it in their mods). */
  grants: string | null;
  /** Crafting simulator link (base + listed modifiers as goals) for rares. */
  craft: string | null;
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
  // Weapon set II takes the same cells; a I / II switch above the weapon swaps them, like in game.
  weapon2: "col-start-1 col-span-2 row-start-2 row-span-4",
  offhand2: "col-start-7 col-span-2 row-start-2 row-span-4",
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
  weaponSetsLabel = "Weapon sets",
  weaponLabels = { title: "Weapons", set1: "Weapon Set I", set2: "Weapon Set II" },
  labels = { runes: "Socketed", ladder: "On the ladder", craft: "Craft this item" },
  hint,
  priceLabels,
}: {
  stages: InventoryStage[];
  initialStage: number;
  slotLabels: Record<GearSlot, string>;
  weaponSetsLabel?: string;
  /** Titles of the weapons row under the inventory. */
  weaponLabels?: { title: string; set1: string; set2: string };
  /** Section titles in the item panel. */
  labels?: { runes: string; ladder: string; craft: string };
  hint: string;
  /** { divine, exalted, stageTotal, note } labels for the price chips. */
  priceLabels: { divine: string; exalted: string; stageTotal: string; note: string };
}) {
  const [stageIndex, setStageIndex] = useState(initialStage);
  const stage = stages[stageIndex];
  const bySlot = new Map(stage.items.map((it) => [it.slot, it]));
  const [selected, setSelected] = useState<GearSlot>(stage.items[0]?.slot ?? "weapon");
  const current = bySlot.get(selected) ?? bySlot.get("weapon") ?? stage.items[0];
  const hasSwap = bySlot.has("weapon2") || bySlot.has("offhand2");
  const [swapState, setSwap] = useState(false);
  // Weapon set II is only shown where the stage has one.
  const swap = hasSwap && swapState;
  const shownSlot = (slot: GearSlot): GearSlot =>
    swap && (slot === "weapon" || slot === "offhand") ? (slot === "weapon" ? "weapon2" : "offhand2") : slot;
  const pick = (slot: GearSlot) => {
    setSelected(slot);
    if (slot === "weapon2" || slot === "offhand2") setSwap(true);
    else if (slot === "weapon" || slot === "offhand") setSwap(false);
  };
  // Changing stage keeps the slot being looked at when the new stage has it (set II falls back to set I).
  const changeStage = (i: number) => {
    const next = new Set(stages[i].items.map((it) => it.slot));
    setStageIndex(i);
    if (!next.has(selected)) {
      const alt = selected === "weapon2" ? "weapon" : selected === "offhand2" ? "offhand" : null;
      setSelected(alt && next.has(alt) ? alt : next.has("weapon") ? "weapon" : (stages[i].items[0]?.slot ?? "weapon"));
    }
    if (!next.has("weapon2") && !next.has("offhand2")) setSwap(false);
  };
  const weaponSets = ([
    [1, ["weapon", "offhand"]],
    [2, ["weapon2", "offhand2"]],
  ] as const)
    .map(([set, slots]) => ({ set, items: slots.map((sl) => bySlot.get(sl)).filter((it): it is InventoryItem => Boolean(it)) }))
    .filter((g) => g.items.length);

  return (
    <div>
      {stages.length > 1 && (
        <div role="tablist" className="mb-4 inline-flex flex-wrap gap-1 rounded-lg border border-line p-1">
          {stages.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === stageIndex}
              onClick={() => changeStage(i)}
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
            {ORDER.map((base) => {
              const slot = shownSlot(base);
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
                    <span className={`px-0.5 text-center text-[10px] leading-tight ${it ? "text-[#e8d77a]" : "text-faint"}`}>
                      {it ? it.title : slotLabels[slot]}
                    </span>
                  )}
                  {hasSwap && (base === "weapon" || base === "offhand") && (
                    <span
                      className="absolute left-1 top-1 rounded px-1 font-display text-[10px] font-bold text-black"
                      style={{ background: WEAPON_SET_COLORS[swap ? 2 : 1].main }}
                    >
                      {swap ? "II" : "I"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {weaponSets.length > 0 && (
            <div className="mt-3 border-t border-line pt-3" role="group" aria-label={weaponSetsLabel}>
              <p className="text-xs uppercase tracking-wider text-faint">{weaponLabels.title}</p>
              <div className={`mt-2 grid gap-2 ${weaponSets.length > 1 ? "grid-cols-2" : ""}`}>
                {weaponSets.map((g) => {
                  const on = (g.set === 2) === swap;
                  return (
                    <div
                      key={g.set}
                      className={`rounded-lg border p-1.5 ${on ? "bg-surface-2" : ""}`}
                      style={{ borderColor: on ? WEAPON_SET_COLORS[g.set].main : "var(--color-line, #3a3227)" }}
                    >
                      <p className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: WEAPON_SET_COLORS[g.set].light }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: WEAPON_SET_COLORS[g.set].main }} />
                        {g.set === 1 ? weaponLabels.set1 : weaponLabels.set2}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {g.items.map((it) => (
                          <li key={it.slot}>
                            <button
                              type="button"
                              onClick={() => pick(it.slot)}
                              className={`flex w-full items-center gap-2 rounded px-1 py-0.5 text-left text-xs hover:bg-black/30 ${
                                current?.slot === it.slot ? "ring-1 ring-gold" : ""
                              }`}
                            >
                              {it.icon ? (
                                <img src={it.icon} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
                              ) : (
                                <span className="h-8 w-8 shrink-0 rounded bg-black/40" />
                              )}
                              <span className={`min-w-0 truncate ${it.kind === "unique" ? "text-unique" : "text-[#e8d77a]"}`}>{it.title}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
              {current.runes.length > 0 && (
                <div className="border-t border-line pt-2">
                  <p className="text-xs uppercase tracking-wider text-faint">{labels.runes}</p>
                  <ul className="mt-0.5 space-y-0.5 text-[#c8b47a]">
                    {current.runes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
              {current.note && <p className="border-t border-line pt-2 text-xs text-muted">{current.note}</p>}
              {current.craft && (
                <p className="border-t border-line pt-2">
                  <a href={current.craft} className="inline-flex items-center gap-1 rounded-md border border-gold-soft px-2.5 py-1 text-xs text-gold hover:bg-surface-2">
                    ⚒ {labels.craft} →
                  </a>
                </p>
              )}
              {current.ladder.length > 0 && (
                <div className="border-t border-line pt-2 text-left">
                  <p className="text-center text-xs uppercase tracking-wider text-faint">{labels.ladder}</p>
                  <ul className="mt-1.5 space-y-1">
                    {current.ladder.map((e) => (
                      <li key={e.name} className="flex items-center gap-2 text-xs">
                        <span className="w-36 shrink-0 truncate text-muted" title={e.name}>
                          {e.name}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                          <span className="block h-full rounded-full bg-gold/70" style={{ width: `${e.pct}%` }} />
                        </span>
                        <span className="w-9 text-right tabular-nums text-muted">{e.pct}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-faint">{hint}</p>
    </div>
  );
}
