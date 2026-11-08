import Link from "next/link";
import { getBuilds } from "@/lib/builds";
import { summarize } from "@/lib/build-summary";
import { fmt, getDictionary, localePath, type Locale } from "@/i18n";
import { TIER_CATEGORIES, type TierCategory } from "@/lib/types";
import { TierBoard } from "./tier-board";
import { PageHeader } from "./ui";

export function TierListPage({ category, lang }: { category: TierCategory; lang: Locale }) {
  const t = getDictionary(lang);
  const path = (p: string) => localePath(lang, p);
  const builds = getBuilds(lang).map(summarize);
  return (
    <>
      <PageHeader title={fmt(t.tierList.title, { category: t.categories[category] })} sub={t.categories[`${category}Blurb`]}>
        <div className="mt-6 inline-flex rounded-lg border border-line p-1">
          {TIER_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={path(c === "starter" ? "/tier-list" : `/tier-list/${c}`)}
              className={`rounded-md px-4 py-1.5 text-sm ${c === category ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {t.categories[c]}
            </Link>
          ))}
        </div>
      </PageHeader>
      <TierBoard builds={builds} category={category} />
    </>
  );
}
