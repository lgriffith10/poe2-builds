import type { Metadata } from "next";
import { BuildsBrowser } from "@/components/builds-browser";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { summarize } from "@/lib/build-summary";
import { getBuilds } from "@/lib/builds";
import { classes } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/[lang]/builds">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.buildsPage.title, description: t.buildsPage.intro, alternates: alternates("/builds", lang) };
}

export default async function BuildsPage({ params }: PageProps<"/[lang]/builds">) {
  const { lang, t } = await pageI18n(params);
  const builds = getBuilds(lang).map(summarize);
  return (
    <>
      <PageHeader title={t.buildsPage.title} sub={t.buildsPage.intro} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <BuildsBrowser builds={builds} classes={classes.map((c) => c.name)} />
      </div>
    </>
  );
}
