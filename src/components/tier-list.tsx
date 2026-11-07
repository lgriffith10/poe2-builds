import Link from "next/link";
import { getBuilds } from "@/lib/builds";
import { summarize } from "@/lib/build-summary";
import { fmt, getDictionary, localePath, type Locale } from "@/i18n";
import { TIER_CATEGORIES, TIERS, type TierCategory } from "@/lib/types";
import { ClassEmblem, GemIcon, PageHeader, TierBadge } from "./ui";

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
      <div className="mx-auto max-w-7xl space-y-3 px-4 py-8">
        {TIERS.map((tier) => {
          const inTier = builds.filter((b) => b.tiers[category] === tier);
          return (
            <div key={tier} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
              <TierBadge tier={tier} size="lg" />
              <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {inTier.length === 0 && <p className="self-center px-2 text-sm text-faint">{t.tierList.noBuilds}</p>}
                {inTier.map((b) => (
                  <Link
                    key={b.slug}
                    href={path(`/builds/${b.slug}`)}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 p-2 hover:border-gold-soft"
                  >
                    <ClassEmblem name={b.className} size={36} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{b.title}</p>
                      <p className="truncate text-xs text-muted">{b.ascendancy}</p>
                    </div>
                    {b.skills[0] && <GemIcon gem={b.skills[0]} size={30} />}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
