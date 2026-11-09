import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbLd, JsonLd } from "@/components/json-ld";
import { CurrencyCard } from "@/components/ref-tooltips";
import { DbHeading, ItemIcon } from "@/components/ui";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import {
  currencies,
  currencyFamily,
  currencyPrice,
  currencyPriceTag,
  currencySummary,
  getCurrencyBySlug,
  simulatorNames,
} from "@/lib/currency";
import { prices } from "@/lib/prices";
import type { CurrencyItem } from "@/lib/types";

export function generateStaticParams() {
  return currencies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/database/currency/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const c = getCurrencyBySlug((await params).slug);
  if (!c) return {};
  const t = getDictionary(lang).database;
  return {
    title: `${c.name} · ${t.currency}`,
    description: fmt(t.currencyPage.metaDescription, { name: c.name, text: currencySummary(c) ?? t.currencyCategories[c.category] }),
    alternates: alternates(`/database/currency/${c.slug}`, lang),
  };
}

const cap = (s: string) => s.replace(/(^|\s)\w/g, (m) => m.toUpperCase());

export default async function CurrencyItemPage({ params }: PageProps<"/[lang]/database/currency/[slug]">) {
  const { t, lang, path } = await pageI18n(params);
  const c = getCurrencyBySlug((await params).slug);
  if (!c) notFound();
  const tp = t.database.currencyPage;
  const div = currencyPrice(c.name);
  const price = div == null ? null : currencyPriceTag(div, lang);
  const family = currencyFamily(c);
  const familySet = new Set(family);
  const more = currencies.filter((x) => x.category === c.category && x !== c && !familySet.has(x)).slice(0, 12);
  const href = (x: CurrencyItem) => path(`/database/currency/${x.slug}`);

  return (
    <article className="mt-4">
      <JsonLd
        data={breadcrumbLd([
          [t.database.title, path("/database")],
          [t.database.currency, path("/database/currency")],
          [c.name, href(c)],
        ])}
      />
      <Link href={path("/database/currency")} className="text-sm text-muted hover:text-gold">
        ← {tp.back}
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[340px_1fr]">
        <div>
          <div className="poe-tip">
            <CurrencyCard item={c} />
          </div>
          <p className="mt-2 text-xs text-faint">{tp.gameTextNote}</p>
        </div>

        <div className="min-w-0 space-y-6">
          <div>
            <DbHeading title={c.name} sub={t.database.currencyCategories[c.category]} />
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {price && (
                <Fact label={tp.price}>
                  <span className="inline-flex items-center gap-1">
                    ≈ {price.amount}
                    <img src={price.icon} alt={price.unit} width={18} height={18} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="mt-0.5 block text-[11px] font-normal text-faint">
                    {fmt(tp.priceSource, { league: prices.league, date: prices.fetchedAt })}
                  </span>
                </Fact>
              )}
              {c.stack != null && <Fact label={tp.stack}>{c.stack}</Fact>}
              {c.level != null && c.level > 1 && <Fact label={tp.dropLevel}>{c.level}</Fact>}
            </dl>
          </div>

          {c.essence && (
            <section>
              <h2 className="mb-2 font-display text-lg text-gold">{tp.essenceEffects}</h2>
              <Table head={[tp.essenceClass, tp.essenceEffects]} rows={c.essence.map((e) => [e.classes.join(", "), e.text])} />
            </section>
          )}

          {c.socket && (
            <section>
              <h2 className="mb-2 font-display text-lg text-gold">{tp.socketEffects}</h2>
              <Table
                head={[tp.socketSlot, tp.socketEffects]}
                rows={c.socket.map((s) => [
                  s.slots.map(cap).join(", ") + (s.level ? ` (${fmt(tp.socketLevel, { n: s.level })})` : ""),
                  s.lines.join("\n"),
                ])}
              />
            </section>
          )}

          {simulatorNames.has(c.name) && (
            <section className="rounded-xl border border-gold-soft/50 bg-gold/5 p-4">
              <h2 className="font-display text-lg text-gold">{tp.inSimulator}</h2>
              <Link href={path("/craft")} className="mt-1 inline-block text-sm text-gold hover:underline">
                {tp.openSimulator} →
              </Link>
            </section>
          )}

          {family.length > 0 && <Related title={tp.family} items={family} href={href} />}
          {more.length > 0 && (
            <Related
              title={fmt(tp.sameCategory, { category: t.database.currencyCategories[c.category].toLowerCase() })}
              items={more}
              href={href}
            />
          )}
        </div>
      </div>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2">
      <dt className="text-[11px] uppercase tracking-wider text-faint">{label}</dt>
      <dd className="mt-0.5 font-semibold tabular-nums text-ink">{children}</dd>
    </div>
  );
}

function Table({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase tracking-wider text-faint">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-t border-line">
              <td className="px-3 py-2 align-top text-muted">{a}</td>
              <td className="whitespace-pre-line px-3 py-2 text-[#8fb6f0]">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Related({ title, items, href }: { title: string; items: CurrencyItem[]; href: (c: CurrencyItem) => string }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-lg text-gold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((x) => (
          <Link
            key={x.slug}
            href={href(x)}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface py-1 pl-1 pr-3 text-sm text-[#c9b37e] hover:border-gold-soft"
          >
            <ItemIcon src={x.icon} alt="" size={32} />
            {x.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
