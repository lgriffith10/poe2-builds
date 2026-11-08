import type { Metadata } from "next";
import { GemList } from "@/components/database/gem-list";
import { getDictionary } from "@/i18n";
import { alternates, resolveLang, pageI18n } from "@/i18n/server";
import { gems } from "@/lib/data";
import { DbHeading } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/gems">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.gems, description: t.gemsMeta, alternates: alternates("/database/gems", lang) };
}

export default async function GemsPage({ params }: PageProps<"/[lang]/database/gems">) {
  const { t } = await pageI18n(params);
  // Only the fields the list displays; recommended supports are not shown here.
  return (
    <>
      <DbHeading title={t.database.h1.gems} sub={t.database.gemsMeta} />
      <GemList gems={gems.map((g) => ({ ...g, recommended: [] }))} />
    </>
  );
}
