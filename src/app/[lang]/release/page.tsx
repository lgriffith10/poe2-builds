import type { Metadata } from "next";
import Link from "next/link";
import { ReleaseCountdown } from "@/components/release-countdown";
import { ClassEmblem, PageHeader } from "@/components/ui";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { getBuilds } from "@/lib/builds";
import { beforeRelease, patch, RELEASE, releaseMoment, type ChangeType } from "@/lib/release";
import { buildChanges } from "@/lib/release-builds";

export async function generateMetadata({ params }: PageProps<"/[lang]/release">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.release.title, description: t.release.intro, alternates: alternates("/release", lang) };
}

const TYPE_STYLE: Record<ChangeType, string> = {
  buff: "border-emerald-500/50 text-emerald-300",
  nerf: "border-red-500/50 text-red-300",
  rework: "border-sky-500/50 text-sky-300",
  removed: "border-red-500/50 text-red-300",
  new: "border-gold-soft text-gold",
};

export default async function ReleasePage({ params }: PageProps<"/[lang]/release">) {
  const { lang, t, path } = await pageI18n(params);
  const tr = t.release;
  const date = new Date(`${RELEASE.date}T12:00:00Z`).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { day: "numeric", month: "long", year: "numeric" });
  const builds = getBuilds(lang);
  const outdated = builds.filter((b) => beforeRelease(b.patch));
  const touched = builds
    .map((b) => ({ b, changes: buildChanges(b) }))
    .filter((x) => x.changes.length)
    .sort((a, z) => z.changes.length - a.changes.length);

  return (
    <>
      <PageHeader title={tr.title} sub={tr.intro}>
        <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl border border-gold-soft/50 bg-gold/5 px-5 py-3">
          <ReleaseCountdown at={releaseMoment().toISOString()} exact={!!RELEASE.launchAt} className="font-display text-2xl font-bold text-gold" />
          <span className="text-sm text-muted">{fmt(RELEASE.launchAt ? tr.dateExact : tr.date, { date })}</span>
        </div>
        <div className="mt-4">
          <Link href={path("/league-start")} className="poe-button inline-block">
            {t.leagueStart.title} →
          </Link>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-gold">{tr.confirmedTitle}</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
            {tr.confirmed.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">
            {tr.sources}{" "}
            {RELEASE.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && " · "}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {s.title}
                </a>
              </span>
            ))}
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-gold">{tr.changesTitle}</h2>
          {!patch.published ? (
            <p className="rounded-xl border border-dashed border-line p-5 text-sm text-muted">{tr.notYet}</p>
          ) : (
            <>
              {patch.notesUrl && (
                <a href={patch.notesUrl} target="_blank" rel="noopener noreferrer" className="mb-3 inline-block text-sm text-gold hover:underline">
                  {tr.readNotes} ↗
                </a>
              )}
              <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
                {patch.changes.map((c, i) => (
                  <li key={i} className="flex flex-wrap items-baseline gap-2 px-4 py-2.5 text-sm">
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${TYPE_STYLE[c.type]}`}>{tr.types[c.type]}</span>
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-xs text-faint">{tr.kinds[c.kind]}</span>
                    <span className="basis-full text-muted">{c.text[lang]}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section>
          <h2 className="mb-1 font-display text-xl font-semibold text-gold">{tr.buildsTitle}</h2>
          <p className="mb-3 text-sm text-muted">{fmt(tr.buildsSub, { n: outdated.length, total: builds.length })}</p>
          {touched.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {touched.map(({ b, changes }) => (
                <li key={b.slug}>
                  <Link href={path(`/builds/${b.slug}`)} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3 hover:border-gold-soft">
                    <ClassEmblem name={b.className} size={32} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{b.title}</span>
                      <span className="block text-xs text-muted">{changes.map((c) => c.name).join(", ")}</span>
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-faint">{fmt(tr.changeCount, { n: changes.length })}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-faint">{patch.published ? tr.noneTouched : tr.willCross}</p>
          )}
        </section>
      </div>
    </>
  );
}
