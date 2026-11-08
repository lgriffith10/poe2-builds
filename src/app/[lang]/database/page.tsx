import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { bases, classes, gems, uniques } from "@/lib/data";
import { DB_SECTIONS } from "@/lib/nav";
import { DbHeading } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/database">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.database.title, description: t.database.indexMeta, alternates: alternates("/database", lang) };
}

export default async function DatabasePage({ params }: PageProps<"/[lang]/database">) {
  const { t, path } = await pageI18n(params);
  const counts: Record<string, number> = {
    "/database/gems": gems.length,
    "/database/uniques": uniques.length,
    "/database/bases": bases.length,
    "/database/ascendancies": classes.reduce((n, c) => n + c.ascendancies.length, 0),
  };
  return (
    <>
    <div className="mt-6">
      <DbHeading title={t.database.h1.index} sub={t.database.indexMeta} />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      {DB_SECTIONS.map((s) => (
        <Link
          key={s.href}
          href={path(s.href)}
          className="group rounded-xl border border-line bg-surface p-6 transition hover:border-gold-soft hover:bg-surface-2"
        >
          <p className="font-display text-3xl font-bold text-gold">{counts[s.href]}</p>
          <h2 className="mt-1 text-lg font-semibold group-hover:text-gold">{t.database[s.key]}</h2>
          <p className="mt-1 text-sm text-muted">{t.database[s.blurb]}</p>
        </Link>
      ))}
    </div>
    </>
  );
}
