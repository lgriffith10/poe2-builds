import type { InventoryItem, InventoryStage } from "@/components/gear-inventory";
import type { GearSlot } from "./types";

export const WEAPON_SLOTS: GearSlot[] = ["weapon", "offhand", "weapon2", "offhand2"];

export interface RankedStat {
  stat: string;
  /** Slots of the rare items that list it. */
  slots: string[];
}

export interface StatPriorityStage {
  id: InventoryStage["id"];
  label: string;
  /** Rare weapons and off-hands, with their modifiers in the source guide's priority order. */
  weapons: { slotLabel: string; title: string; mods: string[] }[];
  /** Stats wanted on the other rare items, most important first. */
  ranked: RankedStat[];
  /** Number of unique items in the stage (they have no stats to choose). */
  uniques: number;
}

/** Ladder characters list real rolls ("54% increased Spell Damage"): use # so equal stats group together. */
const generic = (mod: string) => mod.replace(/\d+(?:\.\d+)?/g, "#").replace(/\(#-#\)/g, "#");
/** Farming stats that do not make the character stronger. */
const IGNORED = /Rarity of Items|Quantity of Items/i;

/**
 * Ranks the stats a guide asks for on rare items. Each guide lists a slot's modifiers in the planner's order
 * (required stats first, then optional ones), so a stat scores 1 for each slot that wants it, plus up to 1 more
 * the higher it sits in that slot's list. Weapons are kept apart: their stats matter far more than the rest.
 */
export function statPriority(stages: InventoryStage[], ordered = true, limit = 10): StatPriorityStage[] {
  return stages.map((stage) => {
    const rares = stage.items
      .filter((i): i is InventoryItem => i.kind === "rare")
      .map((i) => ({ ...i, mods: [...new Set(i.mods.filter((m) => !IGNORED.test(m)).map(generic))] }))
      .filter((i) => i.mods.length > 0);
    const weapons = rares
      .filter((i) => WEAPON_SLOTS.includes(i.slot))
      .map((i) => ({ slotLabel: i.slotLabel, title: i.title, mods: i.mods }));
    const scores = new Map<string, { score: number; first: number; slots: string[] }>();
    let order = 0;
    for (const item of rares.filter((i) => !WEAPON_SLOTS.includes(i.slot))) {
      item.mods.forEach((mod, idx) => {
        const entry = scores.get(mod) ?? { score: 0, first: order++, slots: [] };
        // Ladder items list their mods in game order, not by importance: only the slot count counts then.
        entry.score += 1 + (ordered ? (item.mods.length - idx) / item.mods.length : 0);
        if (!entry.slots.includes(item.slotLabel)) entry.slots.push(item.slotLabel);
        scores.set(mod, entry);
      });
    }
    const ranked = [...scores.entries()]
      .sort(([, a], [, b]) => b.score - a.score || a.first - b.first)
      .slice(0, limit)
      .map(([stat, e]) => ({ stat, slots: e.slots }));
    return { id: stage.id, label: stage.label, weapons, ranked, uniques: stage.items.filter((i) => i.kind === "unique").length };
  });
}
