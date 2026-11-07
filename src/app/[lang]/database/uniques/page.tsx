import type { Metadata } from "next";
import { UniqueList } from "@/components/database/unique-list";
import { getDictionary } from "@/i18n";
import { alternates, resolveLang } from "@/i18n/server";
import { uniques } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/uniques">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.uniquesTitle, description: t.uniquesMeta, alternates: alternates("/database/uniques", lang) };
}

export default async function UniquesPage({ params }: PageProps<"/[lang]/database/uniques">) {
  await resolveLang(params);
  return <UniqueList uniques={uniques} />;
}
