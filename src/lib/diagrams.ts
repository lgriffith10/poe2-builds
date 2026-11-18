import "server-only";
import { marked } from "marked";
import YAML from "yaml";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";

/**
 * Diagrams for guides, written as fenced blocks in the Markdown:
 *
 *   ```flow                         a numbered sequence of steps joined by arrows (how an encounter plays out)
 *   caption: How a Breach plays out
 *   steps:
 *     - title: Open the Breach
 *       text: Walk over the hand…   (inline Markdown)
 *   ```
 *
 *   ```loot                         loot → what it is for → how to turn it into currency, one row per item
 *   caption: What Breach drops
 *   items:
 *     - item: Catalysts
 *       use: Raise the quality of rings and amulets
 *       sell: Bulk on the Currency Exchange
 *       value: high               (high | medium | low: how much it usually earns)
 *   ```
 *
 * [[Name]] references are not available inside these blocks (they are YAML); name items in plain text.
 */

const LABELS: Record<Locale, { item: string; use: string; sell: string; value: Record<Value, string> }> = {
  en: { item: "Loot", use: "What it is for", sell: "How to cash in", value: { high: "High value", medium: "Steady value", low: "Low value" } },
  fr: { item: "Butin", use: "À quoi ça sert", sell: "Comment le vendre", value: { high: "Forte valeur", medium: "Valeur régulière", low: "Faible valeur" } },
};
type Value = "high" | "medium" | "low";
const VALUES: Value[] = ["high", "medium", "low"];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const inline = (s: string) => marked.parseInline(String(s), { async: false }) as string;

function parse<T>(source: string, kind: string, where: string): T {
  try {
    return YAML.parse(source) as T;
  } catch (e) {
    throw new Error(`[${where}] ${kind} block: ${(e as Error).message}`);
  }
}

export function renderFlow(source: string, where: string): string {
  const spec = parse<{ caption?: string; steps?: { title?: string; text?: string }[] }>(source, "flow", where);
  const steps = spec.steps ?? [];
  if (steps.length < 2) throw new Error(`[${where}] flow block: needs at least two steps`);
  const items = steps.map((s, i) => {
    if (!s.title) throw new Error(`[${where}] flow block: step ${i + 1} has no title`);
    return `<li><span class="df-num">${i + 1}</span><div><p class="df-title">${inline(s.title)}</p>${s.text ? `<p class="df-text">${inline(s.text)}</p>` : ""}</div></li>`;
  });
  return `<figure class="diagram-flow">${spec.caption ? `<figcaption>${esc(spec.caption)}</figcaption>` : ""}<ol>${items.join("")}</ol></figure>\n`;
}

export function renderLoot(source: string, where: string, lang: Locale = DEFAULT_LOCALE): string {
  const spec = parse<{ caption?: string; items?: { item?: string; use?: string; sell?: string; value?: Value }[] }>(source, "loot", where);
  const items = spec.items ?? [];
  if (!items.length) throw new Error(`[${where}] loot block: no items`);
  const t = LABELS[lang] ?? LABELS[DEFAULT_LOCALE];
  const rows = items.map((it, i) => {
    if (!it.item || !it.use || !it.sell) throw new Error(`[${where}] loot block: item ${i + 1} needs item, use and sell`);
    if (it.value && !VALUES.includes(it.value)) throw new Error(`[${where}] loot block: value must be ${VALUES.join(", ")}`);
    const badge = it.value ? `<span class="dl-value dl-${it.value}">${t.value[it.value]}</span>` : "";
    return `<li><div class="dl-cell dl-item"><span class="dl-label">${t.item}</span><p>${inline(it.item)}</p>${badge}</div><span class="dl-arrow" aria-hidden="true">→</span><div class="dl-cell"><span class="dl-label">${t.use}</span><p>${inline(it.use)}</p></div><span class="dl-arrow" aria-hidden="true">→</span><div class="dl-cell"><span class="dl-label">${t.sell}</span><p>${inline(it.sell)}</p></div></li>`;
  });
  return `<figure class="diagram-loot">${spec.caption ? `<figcaption>${esc(spec.caption)}</figcaption>` : ""}<ol>${rows.join("")}</ol></figure>\n`;
}
