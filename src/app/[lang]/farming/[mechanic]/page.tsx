import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MechanicTierBoard } from "@/components/mechanic-tier-board";
import { RefTooltips } from "@/components/ref-tooltips";
import { DemandMeters } from "@/components/demand-meters";
import { articleLd, breadcrumbLd, JsonLd } from "@/components/json-ld";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { MECHANICS, MECHANIC_INFO, mechanicHref } from "@/lib/farming";
import { getMechanics, isMechanic, mechanicTierList } from "@/lib/mechanics";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return MECHANICS.map((id) => ({ mechanic: MECHANIC_INFO[id].slug }));
}

// Every mechanic page is prerendered (generateStaticParams), so a navigation only waits for its static payload:
// no loading shell is needed, and the dev "instant navigation" check is turned off for this route.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/farming/[mechanic]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { mechanic } = await params;
  if (!isMechanic(mechanic)) return {};
  const m = getMechanics(lang).find((x) => x.id === mechanic)!;
  const t = getDictionary(lang);
  return {
    title: `${m.title} · ${t.farmingPages.title}`,
    description: m.summary,
    alternates: alternates(mechanicHref(mechanic), lang),
    openGraph: { title: m.title, description: m.summary, type: "article", siteName: SITE_NAME, locale: t.meta.ogLocale },
  };
}

export default async function MechanicPage({ params }: PageProps<"/[lang]/farming/[mechanic]">) {
  const { lang, t, path } = await pageI18n(params);
  const { mechanic } = await params;
  if (!isMechanic(mechanic)) notFound();
  const all = getMechanics(lang);
  const m = all.find((x) => x.id === mechanic)!;
  const tr = t.farmingPages;
  const entries = mechanicTierList(mechanic, lang).map(({ build, tier, reasons }) => ({ build, tier, reasons }));
  const top = entries.filter((e) => e.tier === "S").slice(0, 5);
  const tierId = "tier-list";
  const toc = [{ id: tierId, text: fmt(tr.tierTitle, { name: m.title }) }, ...m.toc];

  return (
    <article>
      <JsonLd
        data={[
          articleLd({ url: path(mechanicHref(m.id)), title: m.title, description: m.summary, lang, updated: m.updated }),
          breadcrumbLd([
            [tr.title, path("/farming")],
            [m.title, path(mechanicHref(m.id))],
          ]),
        ]}
      />
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link href={path("/farming")} className="text-sm text-muted hover:text-gold">
            {tr.all}
          </Link>
          <nav className="mt-4 flex flex-wrap gap-1.5" aria-label={tr.title}>
            {all.map((x) => (
              <Link
                key={x.id}
                href={path(mechanicHref(x.id))}
                aria-current={x.id === m.id ? "page" : undefined}
                className={`rounded-lg border px-3 py-1 text-sm ${x.id === m.id ? "border-gold-soft bg-surface-2 text-gold" : "border-line text-muted hover:text-ink"}`}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-wide sm:text-4xl">{m.title}</h1>
          <p className="mt-2 max-w-3xl text-lg text-muted">{m.summary}</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <dl className="space-y-3 rounded-xl border border-line bg-surface p-4 text-sm lg:col-span-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">{tr.hub}</dt>
                <dd className="mt-0.5">{m.hub}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">{tr.pinnacle}</dt>
                <dd className="mt-0.5">{m.pinnacle}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-faint">{tr.rewards}</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {m.rewards.map((r) => (
                    <span key={r} className="rounded-full border border-gold-soft px-2.5 py-0.5 text-xs text-gold">
                      {r}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="rounded-xl border border-line bg-surface p-4">
              <p className="text-xs uppercase tracking-wider text-faint">{tr.demands}</p>
              <DemandMeters demands={m.demands} labels={tr.demand} levels={tr.demandLevel} />
            </div>
          </div>

          {top.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-xs uppercase tracking-wider text-faint">{tr.topBuilds}</span>
              {top.map((e) => (
                <Link
                  key={e.build.slug}
                  href={path(`/builds/${e.build.slug}`)}
                  className="rounded-lg border border-line bg-surface px-2.5 py-1 hover:border-gold-soft hover:text-gold"
                >
                  {e.build.title}
                </Link>
              ))}
              <a href={`#${tierId}`} className="text-gold hover:underline">
                {fmt(tr.tierTitle, { name: m.title })} ↓
              </a>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-line text-sm">
            {toc.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-gold hover:text-ink">
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0">
          <section id={tierId} className="scroll-mt-24">
            <h2 className="font-display text-2xl font-semibold text-gold">{fmt(tr.tierTitle, { name: m.title })}</h2>
            <p className="mt-1 mb-4 max-w-3xl text-sm text-muted">{fmt(tr.tierSub, { name: m.title })}</p>
            <MechanicTierBoard entries={entries} noBuilds={tr.noBuilds} />
            <p className="mt-3 text-xs text-faint">{tr.tierMethod}</p>
          </section>

          <div className="mt-12 max-w-3xl">
            <RefTooltips className="prose-guide" html={m.html} />
            <footer className="mt-12 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
              <p>
                {tr.general}{" "}
                <Link href={path("/guides/farming-and-currency")} className="text-gold underline-offset-2 hover:underline">
                  {tr.generalLink}
                </Link>
              </p>
              {m.sources.length > 0 && (
                <>
                  <p className="mt-4 font-semibold text-ink">{tr.sources}</p>
                  <p className="mt-1">{tr.sourcesNote}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {m.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} rel="noopener" className="text-gold underline-offset-2 hover:underline">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-3 text-xs text-faint">{fmt(tr.updated, { date: m.updated })}</p>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
