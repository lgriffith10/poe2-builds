import type { Metadata } from "next";
import { BaseList } from "@/components/database/base-list";
import { getDictionary } from "@/i18n";
import { alternates, resolveLang, pageI18n } from "@/i18n/server";
import { bases } from "@/lib/data";
import { DbHeading } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/bases">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.bases, description: t.basesMeta, alternates: alternates("/database/bases", lang) };
}

export default async function BasesPage({ params }: PageProps<"/[lang]/database/bases">) {
  const { t } = await pageI18n(params);
  return (
    <>
      <DbHeading title={t.database.h1.bases} sub={t.database.basesMeta} />
      <BaseList bases={bases} />
    </>
  );
}
