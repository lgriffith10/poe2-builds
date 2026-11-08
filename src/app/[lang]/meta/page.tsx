import type { Metadata } from "next";
import { LadderMeta, type MetaAscendancy, type MetaRow } from "@/components/ladder-meta";
import { PageHeader } from "@/components/ui";
import { getBuilds } from "@/lib/builds";
import { classes, getGem, getUnique } from "@/lib/data";
import { ladder, type LadderEntry } from "@/lib/ladder";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/meta">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.ladderMeta.title, description: t.ladderMeta.intro, alternates: alternates("/meta", lang) };
}

const skillRows = (rows: LadderEntry[]): MetaRow[] =>
  rows.map((r) => {
    const g = getGem(r.name);
    return { ...r, gem: g ? { name: g.name, icon: g.icon, color: g.color } : undefined };
  });
const uniqueRows = (rows: LadderEntry[]): MetaRow[] => rows.map((r) => ({ ...r, icon: getUnique(r.name)?.icon ?? null }));

export default async function MetaPage({ params }: PageProps<"/[lang]/meta">) {
  const { lang, t } = await pageI18n(params);
  const builds = getBuilds(lang);
  const classOf = (asc: string) => classes.find((c) => c.ascendancies.some((a) => a.name === asc))?.name ?? asc;
  const ascendancies: MetaAscendancy[] = ladder.ascendancies.map((a) => ({
    name: a.name,
    className: classOf(a.name),
    count: a.count,
    skills: skillRows(a.skills),
    uniques: uniqueRows(a.uniques),
    keystones: a.keystones,
    guides: builds.filter((b) => b.ascendancy === a.name).map((b) => ({ slug: b.slug, title: b.title })),
  }));
  return (
    <>
      <PageHeader
        title={t.ladderMeta.title}
        sub={fmt(t.ladderMeta.subtitle, { n: ladder.total.toLocaleString(lang === "fr" ? "fr-FR" : "en-US"), league: ladder.league, date: ladder.fetchedAt })}
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <LadderMeta
          total={ladder.total}
          ascendancies={ascendancies}
          overall={{ skills: skillRows(ladder.skills), uniques: uniqueRows(ladder.uniques), keystones: ladder.keystones }}
        />
        <p className="mt-10 text-xs text-faint">
          {t.ladderMeta.sourceNote}{" "}
          <a href="https://poe.ninja/poe2/builds" rel="noopener" className="text-gold underline-offset-2 hover:underline">
            poe.ninja
          </a>
          .
        </p>
      </div>
    </>
  );
}
