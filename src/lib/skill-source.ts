import "server-only";
import grantedJson from "@/data/generated/granted-skills.json";
import type { Build } from "./builds";
import { getGem } from "./data";
import { GEAR_STAGES, type GearSet, type GearSlot } from "./types";

/** Skills granted by base types, uniques and ascendancy notables (scripts/granted-skills.mjs). */
export const granted = grantedJson as Record<"bases" | "uniques" | "ascendancy", Record<string, string[]>>;

export type SkillSource =
  | { kind: "weapon"; from: string }
  | { kind: "item"; from: string }
  | { kind: "ascendancy"; from: string }
  | { kind: "gem" }
  | { kind: "spirit" };

/** Granted names sometimes differ from the gem name ("Skeletal Warrior Minion"). */
const same = (a: string, b: string) => a.replace(/ Minion$/, "") === b.replace(/ Minion$/, "");
const WEAPON_SLOTS: GearSlot[] = ["weapon", "offhand"];

/** Where each of the build's skills comes from: an item it wears, an ascendancy notable, or a skill gem. */
export function skillSources(build: Build): Map<string, SkillSource> {
  const sets: GearSet[] = [build.gear, ...GEAR_STAGES.map((s) => build.gearStages[s]).filter((g): g is GearSet => !!g)];
  const out = new Map<string, SkillSource>();
  for (const { gem } of build.skills) {
    let source: SkillSource | undefined;
    for (const set of sets) {
      for (const [slot, piece] of Object.entries(set) as [GearSlot, NonNullable<GearSet[GearSlot]>][]) {
        const fromUnique = piece.unique && granted.uniques[piece.unique]?.some((s) => same(s, gem)) ? piece.unique : undefined;
        const fromBase = piece.base && granted.bases[piece.base]?.some((s) => same(s, gem)) ? piece.base : undefined;
        const from = fromUnique ?? fromBase;
        if (from) {
          source = { kind: WEAPON_SLOTS.includes(slot) ? "weapon" : "item", from };
          break;
        }
      }
      if (source) break;
    }
    if (!source) {
      const notable = build.ascendancyOrder.find((n) => granted.ascendancy[n]?.some((s) => same(s, gem)));
      if (notable) source = { kind: "ascendancy", from: notable };
    }
    out.set(gem, source ?? (getGem(gem)?.type === "spirit" ? { kind: "spirit" } : { kind: "gem" }));
  }
  return out;
}

/** Skills a base type or unique grants, for the gear panel (uniques already list them in their mods). */
export const baseGrants = (base: string | undefined) => (base ? granted.bases[base] ?? [] : []);
