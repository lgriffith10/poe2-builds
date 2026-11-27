import type { Metadata } from "next";
import { LootValue } from "@/components/loot-value";
import { PageHeader } from "@/components/ui";
import { fmt, getDictionary, localePath } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { currencies, currencyHref } from "@/lib/currency";
import { uniques } from "@/lib/data";
import type { PricedName } from "@/lib/loot-value";
import { prices } from "@/lib/prices";

export async function generateMetadata({ params }: PageProps<"/[lang]/loot-value">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.loot.title, description: t.loot.intro, alternates: alternates("/loot-value", lang) };
}

export default async function LootValuePage({ params }: PageProps<"/[lang]/loot-value">) {
  const { lang, t } = await pageI18n(params);
  const byCurrency = new Map(currencies.map((c) => [c.name, c]));
  const byUnique = new Map(uniques.map((u) => [u.name, u]));
  // Only what poe.ninja prices: crafting currency (orbs, essences, omens, runes…) and uniques.
  const names: PricedName[] = [
    ...Object.entries(prices.currency ?? {}).map(([name, div]) => {
      const c = byCurrency.get(name);
      return { name, div, icon: c?.icon ?? null, kind: "currency" as const, href: c ? localePath(lang, currencyHref(c)) : null };
    }),
    ...Object.entries(prices.uniques).map(([name, p]) => {
      const u = byUnique.get(name);
      return { name, div: p.div, icon: u?.icon ?? null, kind: "unique" as const, href: u ? localePath(lang, `/database/uniques#${u.id}`) : null };
    }),
  ];
  return (
    <>
      <PageHeader title={t.loot.title} sub={t.loot.intro} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <LootValue names={names} exaltedPerDivine={prices.rates.exalted} />
        <p className="mt-6 text-xs text-faint">{fmt(t.loot.source, { league: prices.league, date: prices.fetchedAt })}</p>
      </div>
    </>
  );
}
