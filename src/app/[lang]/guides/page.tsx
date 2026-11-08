import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { getGuides } from "@/lib/guides";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.guides.title, description: t.guides.intro, alternates: alternates("/guides", lang) };
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const { lang, t, path } = await pageI18n(params);
  const guides = getGuides(lang);
  return (
    <>
      <PageHeader title={t.guides.title} sub={t.guides.intro} />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={path(`/guides/${g.slug}`)}
            className="rounded-xl border border-line bg-surface p-5 hover:border-gold-soft"
          >
            <h2 className="font-display text-xl font-semibold text-gold">{g.title}</h2>
            <p className="mt-2 text-muted">{g.summary}</p>
            <p className="mt-3 text-xs text-faint">{fmt(t.guides.updated, { date: g.updated })}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
