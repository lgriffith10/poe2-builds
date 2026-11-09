import type { Metadata } from "next";
import { CurrencyList, type CurrencyRow } from "@/components/database/currency-list";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { CURRENCY_CATEGORIES, currencies, currencyPrice, currencyPriceTag, currencySummary } from "@/lib/currency";
import { DbHeading } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/currency">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.currency, description: t.currencyMeta, alternates: alternates("/database/currency", lang) };
}

export default async function CurrencyPage({ params }: PageProps<"/[lang]/database/currency">) {
  const { t, lang } = await pageI18n(params);
  const rows: CurrencyRow[] = currencies.map((c) => {
    const div = currencyPrice(c.name);
    return {
      slug: c.slug,
      name: c.name,
      category: c.category,
      icon: c.icon,
      summary: currencySummary(c),
      search: [c.name, c.description, ...(c.essence?.map((e) => e.text) ?? []), ...(c.socket?.flatMap((s) => s.lines) ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
      price: div == null ? null : currencyPriceTag(div, lang),
    };
  });
  return (
    <>
      <DbHeading title={t.database.h1.currency} sub={t.database.currencyMeta} />
      <CurrencyList rows={rows} categories={CURRENCY_CATEGORIES} />
    </>
  );
}
