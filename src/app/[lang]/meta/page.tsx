import type { Metadata } from "next";
import { LadderMeta, type MetaAscendancy, type MetaRow } from "@/components/ladder-meta";
import { MetaTrendChart } from "@/components/meta-trend-chart";
import { PageHeader } from "@/components/ui";
import { metaHistory, movers, trend, type Dimension } from "@/lib/meta-history";
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
        {metaHistory.points.length > 2 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-gold">{t.ladderMeta.history.title}</h2>
            <p className="mt-1 text-sm text-muted">{fmt(t.ladderMeta.history.sub, { league: metaHistory.league, date: metaHistory.fetchedAt })}</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {(["classes", "skills"] as Dimension[]).map((dim) => (
                <MetaTrendChart
                  key={dim}
                  title={dim === "classes" ? t.ladderMeta.history.ascendancies : t.ladderMeta.history.skills}
                  labels={metaHistory.points.map((p) =>
                    p.label === "now"
                      ? t.ladderMeta.history.now
                      : fmt(p.label.startsWith("day-") ? t.ladderMeta.history.day : t.ladderMeta.history.week, { n: p.label.split("-")[1] }),
                  )}
                  series={trend(dim, 6)}
                  tableLabel={t.ladderMeta.history.table}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(["classes", "skills"] as Dimension[]).map((dim) => {
                const m = movers(dim);
                if (!m) return null;
                const from = fmt(m.from.startsWith("day-") ? t.ladderMeta.history.day : t.ladderMeta.history.week, { n: m.from.split("-")[1] });
                return (
                  <div key={dim} className="rounded-xl border border-line bg-surface p-4">
                    <h3 className="text-sm font-semibold">
                      {fmt(dim === "classes" ? t.ladderMeta.history.moversAsc : t.ladderMeta.history.moversSkills, { from })}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                      {(["up", "down"] as const).map((dir) => (
                        <ul key={dir} className="space-y-1" aria-label={dir === "up" ? t.ladderMeta.history.up : t.ladderMeta.history.down}>
                          {m[dir].map((r) => (
                            <li key={r.name} className="flex items-center gap-1.5">
                              <span className={dir === "up" ? "text-emerald-300" : "text-red-300"} aria-hidden>
                                {dir === "up" ? "▲" : "▼"}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-muted">{r.name}</span>
                              <span className="tabular-nums">
                                {(r.now - r.before > 0 ? "+" : "") + ((r.now - r.before) * 100).toFixed(1)} {t.ladderMeta.history.pts}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
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
