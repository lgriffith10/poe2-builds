"use client";

import { useId, useMemo } from "react";
import { useI18n } from "@/i18n/client";
import { GEAR_SLOTS, type GearSlot, type PlannerState } from "@/lib/types";
import { ItemIcon } from "../ui";

export interface ItemOption {
  name: string;
  class: string;
  icon: string | null;
  unique: boolean;
}

/** Item classes that fit each equipment slot. */
const WEAPONS = [
  "Bow", "Crossbow", "Spear", "Warstaff", "Wand", "Staff", "Sceptre", "Talisman", "Mace", "One Hand Mace",
  "Two Hand Mace", "One Hand Sword", "Two Hand Sword", "One Hand Axe", "Two Hand Axe", "Dagger", "Claw", "Flail",
];
const OFFHANDS = ["Shield", "Buckler", "Focus", "Focii", "Quiver", "Sceptre", "Wand"];

export const SLOT_CLASSES: Record<GearSlot, string[]> = {
  weapon: WEAPONS,
  offhand: OFFHANDS,
  weapon2: WEAPONS,
  offhand2: OFFHANDS,
  helmet: ["Helmet"],
  body: ["Body Armour"],
  gloves: ["Gloves"],
  boots: ["Boots"],
  amulet: ["Amulet"],
  ring1: ["Ring"],
  ring2: ["Ring"],
  belt: ["Belt"],
};

export function GearEditor({
  items,
  gear,
  onChange,
}: {
  items: ItemOption[];
  gear: PlannerState["gear"];
  onChange: (gear: PlannerState["gear"]) => void;
}) {
  const { t, fmt } = useI18n();
  const baseId = useId();
  const byName = useMemo(() => new Map(items.map((i) => [i.name.toLowerCase(), i])), [items]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {GEAR_SLOTS.map((slot) => {
        const listId = `${baseId}-${slot}`;
        const value = gear[slot] ?? "";
        const item = byName.get(value.toLowerCase());
        const options = items.filter((i) => SLOT_CLASSES[slot].includes(i.class));
        return (
          <div key={slot} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
            <ItemIcon src={item?.icon ?? null} alt={value} size={52} />
            <div className="min-w-0 flex-1">
              <label htmlFor={`${listId}-input`} className="text-xs uppercase tracking-wider text-faint">
                {t.slots[slot]}
              </label>
              <input
                id={`${listId}-input`}
                list={listId}
                value={value}
                onChange={(e) => onChange({ ...gear, [slot]: e.target.value })}
                placeholder={t.planner.itemPlaceholder}
                className={`mt-1 w-full rounded-md border border-line bg-surface-2 px-2 py-1.5 text-sm focus:border-gold-soft focus:outline-none ${
                  item?.unique ? "text-unique" : ""
                }`}
              />
              <datalist id={listId}>
                {options.map((o) => (
                  <option key={o.name} value={o.name}>
                    {o.unique ? fmt(t.planner.uniqueOption, { class: o.class }) : o.class}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
        );
      })}
    </div>
  );
}
