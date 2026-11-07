import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TierListPage } from "@/components/tier-list";
import { fmt, getDictionary } from "@/i18n";
import { alternates, resolveLang } from "@/i18n/server";
import type { TierCategory } from "@/lib/types";

const CATEGORIES: TierCategory[] = ["endgame", "bossing"];
const isCategory = (c: string): c is TierCategory => CATEGORIES.includes(c as TierCategory);

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tier-list/[category]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { category } = await params;
  if (!isCategory(category)) return {};
  const t = getDictionary(lang);
  return {
    title: fmt(t.tierList.title, { category: t.categories[category] }),
    description: t.categories[`${category}Blurb`],
    alternates: alternates(`/tier-list/${category}`, lang),
  };
}

export default async function Page({ params }: PageProps<"/[lang]/tier-list/[category]">) {
  const lang = await resolveLang(params);
  const { category } = await params;
  if (!isCategory(category)) notFound();
  return <TierListPage category={category} lang={lang} />;
}
