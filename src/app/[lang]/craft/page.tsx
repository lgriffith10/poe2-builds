import type { Metadata } from "next";
import Link from "next/link";
import { CraftSim, type CraftWiki } from "@/components/craft/craft-sim";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { getCurrency, simulatorNames } from "@/lib/currency";
import prices from "@/data/generated/prices.json";

export async function generateMetadata({ params }: PageProps<"/[lang]/craft">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.craft.title, description: t.craft.intro, alternates: alternates("/craft", lang) };
}

/** Wiki entry (game text + page) of every currency the simulator uses, for the stash tooltips. */
function craftWiki(): CraftWiki {
  const wiki: CraftWiki = {};
  for (const name of simulatorNames) {
    const c = getCurrency(name);
    if (c) wiki[name] = { slug: c.slug, description: c.description };
  }
  return wiki;
}

/** Market prices (Divine Orbs) of the currencies the simulator can use, for the strategy's cost. */
function craftPrices(): Record<string, number> {
  const all = (prices as { currency?: Record<string, number> }).currency ?? {};
  return Object.fromEntries([...simulatorNames, "Exalted Orb"].filter((n) => all[n] !== undefined).map((n) => [n, all[n]]));
}

export default async function CraftPage({ params }: PageProps<"/[lang]/craft">) {
  const { t, path } = await pageI18n(params);
  return (
    <>
      <PageHeader title={t.craft.title} sub={t.craft.intro}>
        <Link href={path("/guides/crafting-basics")} className="mt-4 inline-block text-sm text-gold hover:underline">
          {t.craft.guideLink} →
        </Link>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <details className="group mb-6 rounded-xl border border-gold-soft/50 bg-gold/5 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-semibold text-gold marker:text-gold">{t.craft.help.title}</summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
            {t.craft.help.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link href={path("/guides/crafting-strategy")} className="mt-3 inline-block text-gold hover:underline">
            {t.craft.help.link} →
          </Link>
        </details>
        <CraftSim wiki={craftWiki()} prices={craftPrices()} />
      </div>
    </>
  );
}
