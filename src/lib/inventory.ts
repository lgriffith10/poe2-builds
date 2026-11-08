import "server-only";
import type { InventoryItem, InventoryStage } from "@/components/gear-inventory";
import { fmt, type Dictionary } from "@/i18n";
import type { Build } from "./builds";
import { getBase, getUnique } from "./data";
import { modLabel } from "./mod-labels";
import { baseGrants } from "./skill-source";
import { GEAR_SLOTS, GEAR_STAGES, type GearSet } from "./types";

/** Resolves a gear set into what the inventory panel shows (names, icons, modifier lines). */
export function inventoryItems(gear: GearSet, t: Dictionary, reference?: GearSet): InventoryItem[] {
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
          grants: null,
          note: piece.note ?? null,
        }
      : {
          slot,
          slotLabel: t.slots[slot],
          title: fmt(t.common.rareItem, { base: base?.name ?? t.slots[slot] }),
          kind: "rare",
          base: base?.name ?? null,
          icon: base?.icon ?? null,
          implicits: [],
          mods: (piece.mods ?? []).map(modLabel),
          grants: baseGrants(base?.name).length ? fmt(t.build.grantsSkill, { skills: baseGrants(base?.name).join(" / ") }) : null,
          note: piece.note ?? null,
        };
  });
}

/** Gear progression tabs; the reference gear alone when the guide has no stages. Endgame is selected first. */
export function inventoryStages(build: Build, t: Dictionary): { stages: InventoryStage[]; initial: number } {
  const stages: InventoryStage[] = GEAR_STAGES.filter((s) => build.gearStages[s]).map((s) => ({
    id: s,
    label: t.build.gearStages[s],
    items: inventoryItems(build.gearStages[s]!, t, build.gear),
  }));
  if (!stages.length) return { stages: [{ id: "default", label: "", items: inventoryItems(build.gear, t) }], initial: 0 };
  const endgame = stages.findIndex((s) => s.id === "endgame");
  return { stages, initial: endgame >= 0 ? endgame : stages.length - 1 };
}
