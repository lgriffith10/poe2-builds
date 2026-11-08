import type { WeaponSet } from "./types";

/** Weapon set I / II colours, shared by the passive tree (edges, rings, legend) and the skill and gear badges. */
export const WEAPON_SET_COLORS: Record<WeaponSet, { main: string; light: string }> = {
  1: { main: "#4f9fe8", light: "#a9d2ff" },
  2: { main: "#c06ae8", light: "#e3b8ff" },
};
