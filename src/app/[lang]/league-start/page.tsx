import type { Metadata } from "next";
import { BeginnerPicks } from "@/components/beginner-picks";
import { LeagueChecklist, type ChecklistGroup } from "@/components/league-checklist";
import { ReleaseCountdown } from "@/components/release-countdown";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { RELEASE, releaseMoment } from "@/lib/release";

export async function generateMetadata({ params }: PageProps<"/[lang]/league-start">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.leagueStart.title, description: t.leagueStart.intro, alternates: alternates("/league-start", lang) };
}

export default async function LeagueStartPage({ params }: PageProps<"/[lang]/league-start">) {
  const { lang, t, path } = await pageI18n(params);
  const tl = t.leagueStart;
  // Item texts live in the dictionary; links are added here.
  const links: Record<string, [string, string]> = {
    build: ["/quiz", tl.links.quiz],
    changes: ["/release", tl.links.release],
    filter: ["/guides/leveling-and-gearing", tl.links.guide],
    playView: ["/builds", tl.links.builds],
    rewards: ["/builds", tl.links.builds],
    ascend: ["/guides/ascendancy-trials", tl.links.trials],
    atlas: ["/farming/planner", tl.links.atlas],
    loot: ["/loot-value", tl.links.loot],
  };
  const groups: ChecklistGroup[] = (["before", "campaign", "maps"] as const).map((g) => ({
    id: g,
    title: tl.groups[g],
    items: Object.entries(tl.items[g]).map(([id, text]) => ({ id: `${g}:${id}`, text, href: links[id] ? path(links[id][0]) : undefined, link: links[id]?.[1] })),
  }));
  return (
    <>
      <PageHeader title={tl.title} sub={tl.intro}>
        <p className="mt-5 font-display text-2xl font-bold text-gold">
          <ReleaseCountdown at={releaseMoment().toISOString()} exact={!!RELEASE.launchAt} />
        </p>
      </PageHeader>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8">
        <LeagueChecklist groups={groups} />
        <p className="text-xs text-faint">{tl.note}</p>
        <BeginnerPicks lang={lang} />
      </div>
    </>
  );
}
