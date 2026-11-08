import "server-only";
import { getGem, getGemDetails, getUnique } from "./data";
import type { RefTip } from "./types";

/** Hover-card data for a gem, as the `data-tip` attribute value read by TipScope (components/ref-tooltips.tsx). */
export function gemTip(name: string): string | undefined {
  const gem = getGem(name);
  if (!gem) return undefined;
  const tip: RefTip = {
    kind: "gem",
    name: gem.name,
    icon: gem.icon,
    color: gem.color,
    type: gem.type,
    tier: gem.tier,
    tags: gem.tags,
    text: gem.text,
    ...getGemDetails(gem.id),
  };
  return JSON.stringify(tip);
}

/** Hover-card data for a unique item (see gemTip). */
export function uniqueTip(name: string): string | undefined {
  const u = getUnique(name);
  if (!u) return undefined;
  const tip: RefTip = {
    kind: "unique",
    name: u.name,
    icon: u.icon,
    base: u.base,
    category: u.category,
    level: u.level,
    implicits: u.implicits,
    mods: u.mods,
  };
  return JSON.stringify(tip);
}

/** Escapes a tip for use inside a double-quoted HTML attribute. */
export const tipAttr = (json: string) => `data-tip="${json.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`;
