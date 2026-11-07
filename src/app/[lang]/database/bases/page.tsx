import type { Metadata } from "next";
import { BaseList } from "@/components/database/base-list";
import { getDictionary } from "@/i18n";
import { alternates, resolveLang } from "@/i18n/server";
import { bases } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/bases">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.bases, description: t.basesMeta, alternates: alternates("/database/bases", lang) };
}

export default async function BasesPage({ params }: PageProps<"/[lang]/database/bases">) {
  await resolveLang(params);
  return <BaseList bases={bases} />;
}
