import type { Metadata } from "next";
import { Planner } from "@/components/planner/planner";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/planner">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).planner;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates("/planner", lang) };
}

export default async function PlannerPage({ params }: PageProps<"/[lang]/planner">) {
  const { t } = await pageI18n(params);
  return (
    <>
      <div className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-4 py-6">
          <h1 className="font-display text-3xl font-bold tracking-wide">{t.planner.title}</h1>
          <p className="mt-1 text-sm text-muted">{t.planner.intro}</p>
        </div>
      </div>
      <Planner />
    </>
  );
}
