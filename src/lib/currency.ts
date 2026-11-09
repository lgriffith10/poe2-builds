import "server-only";
import currencyJson from "@/data/generated/currency.json";
import { actions } from "./craft";
import { prices } from "./prices";
import type { CurrencyCategory, CurrencyItem, RefTip } from "./types";

/** Crafting consumables wiki (scripts/currency-data.mjs), read at build time. */
export const currencies = currencyJson.items as CurrencyItem[];
export const CURRENCY_CATEGORIES = currencyJson.categories as CurrencyCategory[];

const bySlug = new Map(currencies.map((c) => [c.slug, c]));
const byName = new Map(currencies.map((c) => [c.name.toLowerCase(), c]));
export const getCurrency = (name: string) => byName.get(name.toLowerCase());
export const getCurrencyBySlug = (slug: string) => bySlug.get(slug);
export const currencyHref = (c: Pick<CurrencyItem, "slug">) => `/database/currency/${c.slug}`;

/** poe.ninja price of one item, in Divine Orbs (scripts/sync-prices.mjs). */
export const currencyPrice = (name: string): number | null => prices.currency?.[name] ?? null;

/** Divine value -> "≈ 1.3 div", "≈ 12 ex" or "≈ 0.19 ex" (cheap currencies cost a fraction of an Exalted Orb). */
export function currencyPriceTag(div: number, lang = "en") {
  const nf = (n: number, opts: Intl.NumberFormatOptions) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", opts);
  if (div >= 1) return { amount: nf(div, { maximumFractionDigits: div < 10 ? 1 : 0 }), unit: "divine" as const, icon: "/img/currency/price-divine.png" };
  const ex = div * prices.rates.exalted;
  return {
    amount: ex >= 10 ? nf(ex, { maximumFractionDigits: 0 }) : nf(ex, { maximumSignificantDigits: 2 }),
    unit: "exalted" as const,
    icon: "/img/currency/price-exalted.png",
  };
}

/** Hover-card data for a currency (see gemTip in tips.ts). */
export function currencyTip(name: string): string | undefined {
  const c = getCurrency(name);
  if (!c) return undefined;
  const tip: RefTip = {
    kind: "currency",
    name: c.name,
    icon: c.icon,
    description: c.description,
    directions: c.directions,
    essence: c.essence,
    socket: c.socket,
  };
  return JSON.stringify(tip);
}

/** Currencies the crafting simulator can use (orbs of every tier, omens, essences, desecration). */
export const simulatorNames = new Set(actions().flatMap((a) => (a.omen ? [a.currency, a.omen] : [a.currency])));

/** Same item at other tiers: "Lesser X", "X", "Greater X", "Perfect X". */
export function currencyFamily(c: CurrencyItem): CurrencyItem[] {
  const family = (n: string) => n.replace(/^(Lesser|Greater|Perfect) /, "");
  return currencies.filter((x) => x.category === c.category && x !== c && family(x.name) === family(c.name));
}

/** First line of what the item does: game description, else its first effect. */
export function currencySummary(c: CurrencyItem): string | null {
  return c.description?.split("\n").join(" ") ?? c.essence?.[0]?.text ?? c.socket?.[0]?.lines.join(", ") ?? c.directions ?? null;
}
