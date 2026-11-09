import "server-only";
import type { InventoryItem, InventoryStage } from "@/components/gear-inventory";
import { fmt, type Dictionary } from "@/i18n";
import type { Build } from "./builds";
import { getBase, getUnique } from "./data";
import { modLabel } from "./mod-labels";
import { priceTag, uniquePrice } from "./prices";
import { baseGrants } from "./skill-source";
import { GEAR_SLOTS, GEAR_STAGES, type GearSet } from "./types";
import fs from "node:fs";
import path from "node:path";
import { localePath, type Locale } from "@/i18n/config";
import { Crafter } from "./craft";
import { encodeCraft, groupsForLines } from "./craft-share";

let crafter: Crafter | null = null;
/** Link to the crafting simulator with this rare's base and its listed modifiers as goals (null when not craftable). */
function craftLink(base: string | undefined, mods: string[], lang: string): string | null {
  crafter ??= new Crafter(JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "data", "craft.json"), "utf8")));
  if (!base || !crafter.data.bases[base]) return null;
  const targets = groupsForLines(crafter, base, mods);
  const code = encodeCraft(crafter, { base, ilvl: 82, rarity: "normal", mods: [] }, targets);
  return localePath(lang as Locale, `/craft#c=${code}`);
}

/** Resolves a gear set into what the inventory panel shows (names, icons, modifier lines). */
export function inventoryItems(gear: GearSet, t: Dictionary, reference?: GearSet, lang = "en"): InventoryItem[] {
  return GEAR_SLOTS.filter((slot) => gear[slot]).map((slot) => {
    const ref = reference?.[slot];
    // Notes are written for the reference gear; reuse them when a stage has the same item in that slot.
    const sameItem = ref && (ref.unique ? ref.unique === gear[slot]!.unique : ref.base && ref.base === gear[slot]!.base);
    const piece = { ...gear[slot]!, note: gear[slot]!.note ?? (sameItem ? ref.note : undefined) };
    const unique = piece.unique ? getUnique(piece.unique) : undefined;
    const base = piece.base ? getBase(piece.base) : undefined;
    return unique
      ? {
          slot,
          slotLabel: t.slots[slot],
          title: unique.name,
          kind: "unique",
          base: unique.base,
          icon: unique.icon,
          implicits: unique.implicits,
          mods: unique.mods,
          runes: piece.runes ?? [],
          ladder: piece.ladder ?? [],
          grants: null,
          craft: null,
          price: uniquePrice(unique.name) !== null ? priceTag(uniquePrice(unique.name)!, lang) : null,
          note: piece.note ?? null,
        }
      : {
          slot,
          slotLabel: t.slots[slot],
          title: fmt(t.common.rareItem, { base: base?.name ?? t.slots[slot] }),
          kind: "rare",
          base: base?.name ?? null,
          icon: base?.icon ?? null,
          implicits: piece.implicits ?? [],
          mods: (piece.mods ?? []).map(modLabel),
          craft: craftLink(base?.name, (piece.mods ?? []).map(modLabel), lang),
          runes: piece.runes ?? [],
          ladder: piece.ladder ?? [],
          price: null,
          grants: baseGrants(base?.name).length ? fmt(t.build.grantsSkill, { skills: baseGrants(base?.name).join(" / ") }) : null,
          note: piece.note ?? null,
        };
  });
}

/** Gear progression tabs; the reference gear alone when the guide has no stages. Endgame is selected first. */
/** Price of the uniques in a gear set, or null when it has no priced unique. */
function stageTotal(gear: GearSet, lang: string) {
  const values = Object.values(gear).flatMap((p) => (p?.unique && uniquePrice(p.unique) !== null ? [uniquePrice(p.unique)!] : []));
  return values.length ? priceTag(values.reduce((a, b) => a + b, 0), lang) : null;
}

/** Gear progression tabs; the reference gear alone when the guide has no stages. Endgame is selected first. */
export function inventoryStages(build: Build, t: Dictionary, lang = "en"): { stages: InventoryStage[]; initial: number } {
  const stages: InventoryStage[] = GEAR_STAGES.filter((s) => build.gearStages[s]).map((s) => ({
    id: s,
    label: t.build.gearStages[s],
    items: inventoryItems(build.gearStages[s]!, t, build.gear, lang),
    total: stageTotal(build.gearStages[s]!, lang),
  }));
  if (!stages.length)
    return { stages: [{ id: "default", label: "", items: inventoryItems(build.gear, t, undefined, lang), total: stageTotal(build.gear, lang) }], initial: 0 };
  const endgame = stages.findIndex((s) => s.id === "endgame");
  return { stages, initial: endgame >= 0 ? endgame : stages.length - 1 };
}
