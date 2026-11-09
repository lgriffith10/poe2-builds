import Link from "next/link";
import type { ReactNode } from "react";
import { BuildCard } from "@/components/build-card";
import { GAME, JsonLd, PUBLISHER } from "@/components/json-ld";
import { ClassEmblem, GemIcon, TierBadge } from "@/components/ui";
import { fmt } from "@/i18n";
import { pageI18n } from "@/i18n/server";
import { summarize, type BuildSummary } from "@/lib/build-summary";
import { getBuilds, tierRank } from "@/lib/builds";
import { classStyle } from "@/lib/classes";
import { classes, gems, getGem, meta } from "@/lib/data";
import { getGuides } from "@/lib/guides";
import { ladder } from "@/lib/ladder";
import { NAV } from "@/lib/nav";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { TIER_CATEGORIES } from "@/lib/types";

/** Line icons for the tool tiles, drawn in the same style as the logo. */
const TOOL_ICONS: Record<string, ReactNode> = {
  builds: <path d="M6 26 20 12m-3-5 8 8M20 4l8 8-4 4-8-8zM4 28l4-4" />,
  tierList: <path d="M5 7h22M5 13h16M5 19h11M5 25h6" />,
  meta: <path d="M5 27V17m7 10V9m7 18v-6m7 6V5M3 28h26" />,
  guides: <path d="M5 6c4-1 8-1 11 2 3-3 7-3 11-2v20c-4-1-8-1-11 2-3-3-7-3-11-2zM16 8v20" />,
  planner: (
    <>
      <circle cx="16" cy="16" r="3" />
      <circle cx="6" cy="8" r="2.5" />
      <circle cx="26" cy="8" r="2.5" />
      <circle cx="8" cy="26" r="2.5" />
      <circle cx="25" cy="25" r="2.5" />
      <path d="m8 9.5 6 4.5m10-4.5-6 4.5m-8 10 4.5-6m11 4.5-4.5-4.5" />
    </>
  ),
  craft: <path d="M16 3 27 9.5v13L16 29 5 22.5v-13zM16 3v26M5 9.5l22 13m0-13-22 13" />,
  database: (
    <>
      <ellipse cx="16" cy="7" rx="10" ry="3.5" />
      <path d="M6 7v18c0 2 4.5 3.5 10 3.5S26 27 26 25V7M6 16c0 2 4.5 3.5 10 3.5S26 18 26 16" />
    </>
  ),
  compare: <path d="M16 4v24M6 10h6M6 16h6M6 22h6M20 10h6m-6 6h6m-6 6h6" />,
  character: (
    <>
      <circle cx="16" cy="10" r="5" />
      <path d="M6 28c1-6 5-9 10-9s9 3 10 9" />
    </>
  ),
};

/** Section heading: ornamented title, subtitle and an optional "see all" link. */
function Section({ title, sub, more, children }: { title: string; sub?: string; more?: { href: string; label: string }; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="poe-heading font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
          {sub && <p className="mt-1.5 text-sm text-muted">{sub}</p>}
        </div>
        {more && (
          <Link href={more.href} className="text-sm font-medium text-gold hover:text-[#e2b964]">
            {more.label} →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Divider() {
  return (
    <div className="poe-divider mx-auto max-w-7xl px-4" aria-hidden>
      <span />
    </div>
  );
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang, t, path } = await pageI18n(params);
  const locale = lang === "fr" ? "fr-FR" : "en-US";
  const num = (n: number) => n.toLocaleString(locale);

  const all = getBuilds(lang);
  const builds = all.map(summarize);
  const bySlug = new Map(builds.map((b) => [b.slug, b]));
  const guides = getGuides(lang);

  const featured = bySlug.get((all.find((b) => b.tiers.starter && !b.sample) ?? all[0]).slug)!;
  const best = TIER_CATEGORIES.map((category) => ({
    category,
    builds: all
      .filter((b) => b.tiers[category])
      .sort((a, b) => tierRank(a, category) - tierRank(b, category) || a.title.localeCompare(b.title))
      .slice(0, 5)
      .map((b) => bySlug.get(b.slug)!),
  }));
  const recent = [...builds].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 3);

  const classOf = (asc: string) => classes.find((c) => c.ascendancies.some((a) => a.name === asc))?.name ?? asc;
  const topAsc = [...ladder.ascendancies].sort((a, b) => b.count - a.count).slice(0, 6);
  const topSkills = ladder.skills.slice(0, 10).flatMap((s) => {
    const g = getGem(s.name);
    return g ? [{ ...s, gem: g }] : [];
  });

  const stats = [
    { value: num(builds.length), label: t.home.stats.builds },
    { value: num(guides.length), label: t.home.stats.guides },
    { value: num(ladder.total), label: t.home.stats.ladder },
    { value: num(gems.length), label: t.home.stats.gems },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: absoluteUrl(path("/")),
            description: t.meta.siteDescription,
            inLanguage: lang,
            about: GAME,
            publisher: PUBLISHER,
          },
          { "@context": "https://schema.org", ...PUBLISHER },
        ]}
      />

      {/* Hero */}
      <section className="poe-hero relative overflow-hidden border-b border-line">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1fr_26rem] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold sm:text-sm">
              {fmt(t.home.kicker, { league: ladder.league, v: meta.treeVersion })}
            </p>
            <h1 className="poe-title mt-3 font-display text-4xl font-bold leading-tight tracking-wide sm:text-6xl">
              {t.home.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{t.home.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={path("/builds")} className="poe-button">
                {t.home.browseBuilds}
              </Link>
              <Link
                href={path("/tier-list")}
                className="rounded-md border border-line-strong bg-surface/60 px-5 py-2.5 text-sm font-semibold hover:border-gold-soft hover:text-gold"
              >
                {t.home.viewTierList}
              </Link>
              <Link
                href={path("/planner")}
                className="rounded-md border border-line-strong bg-surface/60 px-5 py-2.5 text-sm font-semibold hover:border-gold-soft hover:text-gold"
              >
                {t.home.openPlanner}
              </Link>
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-gold-soft/50 pl-3">
                  <dd className="font-display text-2xl font-bold text-gold">{s.value}</dd>
                  <dt className="text-xs text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <FeaturedBuild
            build={featured}
            label={t.home.featured}
            cta={t.home.readGuide}
            href={path(`/builds/${featured.slug}`)}
            tierLabels={t.categories}
          />
        </div>
      </section>

      {/* Tools */}
      <Section title={t.home.toolsTitle} sub={t.home.toolsSub}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={path(n.href)}
              className="group flex items-start gap-4 rounded-lg border border-line bg-surface p-4 transition hover:border-gold-soft hover:bg-surface-2"
            >
              <span className="poe-icon-frame">
                <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {TOOL_ICONS[n.key]}
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-semibold group-hover:text-gold">{t.nav[n.key]}</span>
                <span className="mt-0.5 block text-sm text-muted">{t.home.tools[n.key as keyof typeof t.home.tools]}</span>
              </span>
            </Link>
          ))}
        </div>
        <Link
          href={path("/guides/leveling-and-gearing")}
          className="mt-4 flex items-center gap-3 rounded-lg border border-gold-soft/60 bg-gold/5 px-4 py-3 text-sm hover:bg-gold/10"
        >
          <span className="font-display text-lg text-gold">?</span>
          <span>
            <span className="font-semibold text-ink">{t.home.beginnerTitle}</span>{" "}
            <span className="text-muted">{t.home.beginnerText}</span>
          </span>
        </Link>
      </Section>

      <Divider />

      {/* Best builds per tier list category */}
      <Section title={t.home.bestTitle} sub={t.home.bestSub} more={{ href: path("/tier-list"), label: t.home.seeTierList }}>
        <div className="grid gap-4 lg:grid-cols-3">
          {best.map(({ category, builds: list }) => (
            <div key={category} className="poe-panel">
              <Link
                href={path(category === "starter" ? "/tier-list" : `/tier-list/${category}`)}
                className="flex items-center justify-between border-b border-line px-4 py-3 font-display text-lg font-semibold text-gold hover:text-[#e2b964]"
              >
                {t.categories[category]}
                <span className="text-sm text-muted">→</span>
              </Link>
              <ol>
                {list.map((b, i) => (
                  <li key={b.slug} className="border-b border-line/60 last:border-0">
                    <Link href={path(`/builds/${b.slug}`)} className="group flex items-center gap-3 px-4 py-2.5 hover:bg-surface-2">
                      <span className="w-4 text-right font-display text-sm text-faint">{i + 1}</span>
                      <ClassEmblem name={b.className} size={34} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold group-hover:text-gold">{b.title}</span>
                        <span className="block truncate text-xs text-muted">{b.ascendancy}</span>
                      </span>
                      <TierBadge tier={b.tiers[category]!} size="sm" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Ladder meta */}
      <Section
        title={t.home.metaTitle}
        sub={fmt(t.home.metaSub, { n: num(ladder.total), league: ladder.league, date: ladder.fetchedAt })}
        more={{ href: path("/meta"), label: t.home.seeMeta }}
      >
        <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
          <div className="poe-panel p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{t.home.topAscendancies}</h3>
            <ul className="space-y-3">
              {topAsc.map((a) => {
                const cls = classOf(a.name);
                const share = a.count / ladder.total;
                const { color } = classStyle(cls);
                return (
                  <li key={a.name} className="flex items-center gap-3">
                    <ClassEmblem name={cls} size={30} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2 text-sm">
                        <span className="truncate font-medium">{a.name}</span>
                        <span className="shrink-0 tabular-nums text-muted">{(share * 100).toFixed(1)} %</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(share / (topAsc[0].count / ladder.total)) * 100}%`, background: `linear-gradient(90deg, ${color}aa, ${color})` }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="poe-panel p-5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{t.home.topSkills}</h3>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {topSkills.map((s) => (
                <li key={s.name} className="flex items-center gap-2.5">
                  <GemIcon gem={s.gem} size={32} />
                  <span className="min-w-0 flex-1 truncate text-sm">{s.gem.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted">{((s.count / ladder.total) * 100).toFixed(0)} %</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Classes */}
      <Section title={t.home.classesTitle} sub={t.home.classesSub} more={{ href: path("/builds"), label: t.home.seeAll }}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {classes.map((c) => {
            const { color } = classStyle(c.name);
            const n = builds.filter((b) => b.className === c.name).length;
            return (
              <Link
                key={c.name}
                href={`${path("/builds")}?class=${encodeURIComponent(c.name)}`}
                className="group relative overflow-hidden rounded-lg border border-line bg-surface p-4 text-center transition hover:border-line-strong"
                style={{ backgroundImage: `radial-gradient(120% 80% at 50% 0%, ${color}22, transparent 70%)` }}
              >
                <span className="flex justify-center">
                  <ClassEmblem name={c.name} size={56} />
                </span>
                <span className="mt-3 block font-display text-lg font-semibold group-hover:text-gold">{c.name}</span>
                <span className="mt-0.5 block truncate text-xs text-muted">
                  {c.ascendancies.map((a) => a.name).join(" · ")}
                </span>
                <span className="mt-2 block text-xs font-medium" style={{ color }}>
                  {fmt(t.home.buildCount, { n })}
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Divider />

      {/* Guides */}
      <Section title={t.home.guidesTitle} sub={t.home.guidesSub} more={{ href: path("/guides"), label: t.home.seeGuides }}>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              href={path(`/guides/${g.slug}`)}
              className={`group rounded-lg border bg-surface p-5 transition hover:bg-surface-2 ${
                i === 0 ? "border-gold-soft/70 lg:row-span-2" : "border-line hover:border-line-strong"
              }`}
            >
              <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className={`mt-1 font-display font-semibold group-hover:text-gold ${i === 0 ? "text-2xl" : "text-lg"}`}>{g.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{g.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Recently updated */}
      <Section title={t.home.recentTitle} more={{ href: path("/builds"), label: t.home.seeAll }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((b) => (
            <BuildCard key={b.slug} build={b} />
          ))}
        </div>
      </Section>
    </>
  );
}

/** Large card in the hero: the best league starter, framed like an in-game panel. */
function FeaturedBuild({
  build,
  label,
  cta,
  href,
  tierLabels,
}: {
  build: BuildSummary;
  label: string;
  cta: string;
  href: string;
  tierLabels: Record<(typeof TIER_CATEGORIES)[number], string>;
}) {
  const { color } = classStyle(build.className);
  return (
    <Link href={href} className="poe-frame group block p-6">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</p>
      <div className="mt-5 flex flex-col items-center text-center">
        <span className="rounded-full p-1" style={{ boxShadow: `0 0 40px ${color}55` }}>
          <ClassEmblem name={build.className} size={84} />
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold group-hover:text-gold">{build.title}</h2>
        <p className="text-sm text-muted">
          {build.ascendancy} · {build.className}
        </p>
      </div>
      <div className="mt-5 flex justify-center gap-4">
        {TIER_CATEGORIES.map((c) =>
          build.tiers[c] ? (
            <div key={c} className="flex flex-col items-center gap-1">
              <TierBadge tier={build.tiers[c]!} />
              <span className="text-[11px] text-muted">{tierLabels[c]}</span>
            </div>
          ) : null,
        )}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {build.skills.slice(0, 6).map((s) => (
          <GemIcon key={s.name} gem={s} size={36} />
        ))}
      </div>
      <p className="mt-4 line-clamp-3 text-center text-sm text-muted">{build.summary}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="truncate text-xs text-muted">
          {build.damage} · {build.playstyle}
        </span>
        <span className="text-sm font-semibold text-gold">{cta} →</span>
      </div>
    </Link>
  );
}
