import Link from "next/link";
import { BuildsBrowser } from "@/components/builds-browser";
import { fmt } from "@/i18n";
import { pageI18n } from "@/i18n/server";
import { getBuilds } from "@/lib/builds";
import { summarize } from "@/lib/build-summary";
import { classes, meta } from "@/lib/data";
import { GAME, JsonLd, PUBLISHER } from "@/components/json-ld";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang, t, path } = await pageI18n(params);
  const builds = getBuilds(lang).map(summarize);
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
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">{fmt(t.home.kicker, { v: meta.treeVersion })}</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-wide sm:text-5xl">{t.home.title}</h1>
          <p className="mt-3 max-w-2xl text-muted">{t.home.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={path("/tier-list")}
              className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-[#e2b964]"
            >
              {t.home.viewTierList}
            </Link>
            <Link href={path("/planner")} className="rounded-lg border border-line-strong px-4 py-2 text-sm hover:border-gold-soft">
              {t.home.openPlanner}
            </Link>
          </div>
          <Link
            href={path("/guides/leveling-and-gearing")}
            className="mt-6 flex max-w-2xl items-center gap-3 rounded-xl border border-gold-soft/60 bg-gold/5 px-4 py-3 text-sm hover:bg-gold/10"
          >
            <span className="font-display text-lg text-gold">?</span>
            <span>
              <span className="font-semibold text-ink">{t.home.beginnerTitle}</span>{" "}
              <span className="text-muted">{t.home.beginnerText}</span>
            </span>
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <BuildsBrowser builds={builds} classes={classes.map((c) => c.name)} />
      </div>
    </>
  );
}
