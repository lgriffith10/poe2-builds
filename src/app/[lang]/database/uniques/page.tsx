import type { Metadata } from "next";
import { UniqueList } from "@/components/database/unique-list";
import { getDictionary } from "@/i18n";
import { alternates, resolveLang, pageI18n } from "@/i18n/server";
import { uniques } from "@/lib/data";
import { DbHeading } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/uniques">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.uniquesTitle, description: t.uniquesMeta, alternates: alternates("/database/uniques", lang) };
}

export default async function UniquesPage({ params }: PageProps<"/[lang]/database/uniques">) {
  const { t } = await pageI18n(params);
  return (
    <>
      <DbHeading title={t.database.h1.uniques} sub={t.database.uniquesMeta} />
      <UniqueList uniques={uniques} />
    </>
  );
}
