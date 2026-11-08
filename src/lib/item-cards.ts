import "server-only";
import YAML from "yaml";
import { getBase, getUnique } from "./data";

/**
 * Item illustrations for guides: a fenced ```items block holding a YAML list of cards.
 *
 *   ```items
 *   flow: true            # optional: equal-width grid for numbered crafting steps
 *   cards:
 *     - base: Sleek Boots
 *       rarity: magic      # normal | magic | rare | unique (unique: give `unique` instead of `base`)
 *       mods: [30% increased Movement Speed, +38% to Fire Resistance]
 *       step: "1. Buy a magic base"
 *       note: "Optional line under the card"
 *       mark: [0]          # optional: indexes of mods to highlight (what this step added)
 *       bad: [2]           # optional: indexes of unwanted mods (struck through)
 *   ```
 */
interface Card {
  base?: string;
  unique?: string;
  rarity?: "normal" | "magic" | "rare" | "unique";
  name?: string;
  mods?: string[];
  step?: string;
  note?: string;
  mark?: number[];
  /** Indexes of unwanted mods (shown struck through in red). */
  bad?: number[];
  verdict?: "good" | "bad";
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderItemCards(source: string, where: string): string {
  const spec = YAML.parse(source) as { flow?: boolean; cards?: Card[] } | Card[];
  const cards = Array.isArray(spec) ? spec : spec.cards ?? [];
  const flow = !Array.isArray(spec) && spec.flow;
  const html = cards.map((card) => {
    const unique = card.unique ? getUnique(card.unique) : undefined;
    if (card.unique && !unique) throw new Error(`[${where}] items block: unknown unique "${card.unique}"`);
    const base = card.base ? getBase(card.base) : undefined;
    if (card.base && !base) throw new Error(`[${where}] items block: unknown base "${card.base}"`);
    const rarity = unique ? "unique" : card.rarity ?? "normal";
    const title = card.name ?? unique?.name ?? base?.name ?? "";
    const icon = unique?.icon ?? base?.icon;
    const mods = card.mods ?? (unique ? [...unique.implicits, ...unique.mods] : []);
    const marked = new Set(card.mark ?? []);
    const bad = new Set(card.bad ?? []);
    return `<figure class="item-card item-${rarity}${card.verdict ? ` item-${card.verdict}` : ""}">
${card.step ? `<figcaption class="item-step">${esc(card.step)}</figcaption>` : ""}
<div class="item-head">${icon ? `<img src="${icon}" alt="" loading="lazy" width="56" height="56">` : ""}<div><p class="item-name">${esc(title)}</p>${
      unique || (card.name && base) ? `<p class="item-base">${esc(unique?.base ?? base!.name)}</p>` : ""
    }</div></div>
<ul class="item-mods">${mods
      .map((m, k) => `<li${marked.has(k) ? ' class="item-new"' : bad.has(k) ? ' class="item-unwanted"' : ""}>${esc(m)}</li>`)
      .join("")}</ul>
${card.note ? `<p class="item-note">${esc(card.note)}</p>` : ""}
</figure>`;
  });
  return `<div class="item-cards${flow ? " item-flow" : ""}">${html.join("")}</div>\n`;
}
