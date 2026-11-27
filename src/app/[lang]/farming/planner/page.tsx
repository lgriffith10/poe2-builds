import type { Metadata } from "next";
import { AtlasPlanner, type PlannerBuild, type PlannerMechanic } from "@/components/atlas-planner";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { getBuilds } from "@/lib/builds";
import { mechanicHref } from "@/lib/farming";
import { getMechanics, mechanicLoot } from "@/lib/mechanics";

export async function generateMetadata({ params }: PageProps<"/[lang]/farming/planner">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.atlasPlanner.title, description: t.atlasPlanner.intro, alternates: alternates("/farming/planner", lang) };
}

export default async function AtlasPlannerPage({ params }: PageProps<"/[lang]/farming/planner">) {
  const { lang, t, path } = await pageI18n(params);
  const builds: PlannerBuild[] = getBuilds(lang)
    .filter((b) => b.farming && !b.sample)
    .map((b) => ({ slug: b.slug, title: b.title, ascendancy: b.ascendancy, className: b.className, profile: b.farming!, notes: b.farmingNotes }))
    .sort((a, b) => a.title.localeCompare(b.title));
  const mechanics: PlannerMechanic[] = getMechanics(lang).map((m) => ({
    id: m.id,
    title: m.title,
    summary: m.summary,
    href: path(mechanicHref(m.id)),
    // The most valuable drops that actually trade, as a hint of what the mechanic pays.
    loot: (mechanicLoot(m.id, lang)?.entries ?? [])
      .filter((e) => e.liquid)
      .slice(0, 3)
      .map((e) => ({ name: e.name, icon: e.icon, price: e.price, href: e.href ? path(e.href) : null })),
  }));
  return (
    <>
      <PageHeader title={t.atlasPlanner.title} sub={t.atlasPlanner.intro} />
      <AtlasPlanner builds={builds} mechanics={mechanics} />
    </>
  );
}
