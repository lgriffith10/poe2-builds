import type { Metadata } from "next";
import Link from "next/link";
import { DemandMeters } from "@/components/demand-meters";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { mechanicHref } from "@/lib/farming";
import { getMechanics, mechanicTierList } from "@/lib/mechanics";

export async function generateMetadata({ params }: PageProps<"/[lang]/farming">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.farmingPages.title, description: t.farmingPages.intro, alternates: alternates("/farming", lang) };
}

export default async function FarmingPage({ params }: PageProps<"/[lang]/farming">) {
  const { lang, t, path } = await pageI18n(params);
  const tr = t.farmingPages;
  const mechanics = getMechanics(lang);
  return (
    <>
      <PageHeader title={tr.title} sub={tr.intro}>
        <p className="mt-3 text-sm text-muted">
          {tr.general}{" "}
          <Link href={path("/guides/farming-and-currency")} className="text-gold hover:underline">
            {tr.generalLink}
          </Link>
        </p>
        <Link href={path("/farming/planner")} className="poe-button mt-4 inline-block">
          {t.atlasPlanner.title} →
        </Link>
      </PageHeader>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-2">
        {mechanics.map((m) => {
          const top = mechanicTierList(m.id, lang).filter((e) => e.tier === "S").slice(0, 3);
          return (
            <div key={m.id} className="relative flex flex-col rounded-xl border border-line bg-surface p-5 hover:border-gold-soft">
              <h2 className="font-display text-xl font-semibold text-gold">
                <Link href={path(mechanicHref(m.id))} className="after:absolute after:inset-0">
                  {m.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{m.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {m.rewards.map((r) => (
                  <span key={r} className="rounded-full border border-line-strong px-2 py-0.5 text-xs text-muted">
                    {r}
                  </span>
                ))}
              </div>
              <DemandMeters demands={m.demands} labels={tr.demand} levels={tr.demandLevel} compact />
              {top.length > 0 && (
                <div className="mt-4 text-xs">
                  <p className="uppercase tracking-wider text-faint">{tr.topBuilds}</p>
                  <p className="mt-1 text-muted">{top.map((e) => e.build.title).join(" · ")}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
