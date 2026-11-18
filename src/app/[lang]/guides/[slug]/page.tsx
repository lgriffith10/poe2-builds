import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RefTooltips } from "@/components/ref-tooltips";
import { getGuide, getGuides } from "@/lib/guides";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { articleLd, breadcrumbLd, JsonLd } from "@/components/json-ld";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

// Prerendered (generateStaticParams): no loading shell needed, so the dev "instant navigation" check is off.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/guides/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const guide = getGuide(slug, lang);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.summary,
    alternates: alternates(`/guides/${slug}`, lang),
    openGraph: { title: guide.title, description: guide.summary, type: "article", siteName: SITE_NAME, locale: getDictionary(lang).meta.ogLocale },
  };
}

export default async function GuidePage({ params }: PageProps<"/[lang]/guides/[slug]">) {
  const { lang, t, path } = await pageI18n(params);
  const guide = getGuide((await params).slug, lang);
  if (!guide) notFound();
  return (
    <article>
      <JsonLd
        data={[
          articleLd({ url: path(`/guides/${guide.slug}`), title: guide.title, description: guide.summary, lang, updated: guide.updated }),
          breadcrumbLd([
            [t.nav.guides, path("/guides")],
            [guide.title, path(`/guides/${guide.slug}`)],
          ]),
        ]}
      />
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link href={path("/guides")} className="text-sm text-muted hover:text-gold">
            {t.guides.all}
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-wide sm:text-4xl">{guide.title}</h1>
          <p className="mt-2 max-w-3xl text-lg text-muted">{guide.summary}</p>
          <p className="mt-2 text-sm text-faint">{fmt(t.guides.updated, { date: guide.updated })}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-line text-sm">
            {guide.toc.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-gold hover:text-ink">
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 max-w-3xl">
          <RefTooltips className="prose-guide" html={guide.html} />
          {guide.sources.length > 0 && (
            <footer className="mt-12 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
              <p className="font-semibold text-ink">{t.guides.sources}</p>
              <p className="mt-1">{t.guides.sourcesNote}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {guide.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" className="text-gold underline-offset-2 hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          )}
        </div>
      </div>
    </article>
  );
}
