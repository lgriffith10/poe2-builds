import pricesJson from "@/data/generated/prices.json";

export interface Prices {
  source: string;
  league: string;
  fetchedAt: string;
  rates: { exalted: number; chaos: number };
  uniques: Record<string, { div: number; listings: number }>;
}
/** Unique item prices from poe.ninja (scripts/sync-prices.mjs), committed and read at build time. */
export const prices = pricesJson as Prices;

export interface PriceTag {
  /** Amount as displayed ("19", "1.3", "< 1"). */
  amount: string;
  unit: "divine" | "exalted";
  icon: string;
}

/** Divine value -> what a player reads: Divine Orbs from 1 div up, Exalted Orbs below. */
export function priceTag(div: number, lang = "en"): PriceTag {
  const nf = (n: number, digits: number) => n.toLocaleString(lang === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: digits });
  if (div >= 1) return { amount: nf(div, div < 10 ? 1 : 0), unit: "divine", icon: "/img/currency/price-divine.png" };
  const ex = div * prices.rates.exalted;
  return { amount: ex < 1 ? "< 1" : nf(ex, 0), unit: "exalted", icon: "/img/currency/price-exalted.png" };
}

export const uniquePrice = (name: string) => prices.uniques[name]?.div ?? null;
