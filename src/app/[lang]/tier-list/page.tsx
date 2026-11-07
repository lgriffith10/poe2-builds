import type { Metadata } from "next";
import { TierListPage } from "@/components/tier-list";
import { fmt, getDictionary } from "@/i18n";
import { alternates, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/tier-list">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return {
    title: fmt(t.tierList.title, { category: t.categories.starter }),
    description: t.categories.starterBlurb,
    alternates: alternates("/tier-list", lang),
  };
}

export default async function Page({ params }: PageProps<"/[lang]/tier-list">) {
  return <TierListPage category="starter" lang={await resolveLang(params)} />;
}
