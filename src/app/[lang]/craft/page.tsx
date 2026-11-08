import type { Metadata } from "next";
import Link from "next/link";
import { CraftSim } from "@/components/craft/craft-sim";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/craft">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.craft.title, description: t.craft.intro, alternates: alternates("/craft", lang) };
}

export default async function CraftPage({ params }: PageProps<"/[lang]/craft">) {
  const { t, path } = await pageI18n(params);
  return (
    <>
      <PageHeader title={t.craft.title} sub={t.craft.intro}>
        <Link href={path("/guides/crafting-basics")} className="mt-4 inline-block text-sm text-gold hover:underline">
          {t.craft.guideLink} →
        </Link>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <details className="group mb-6 rounded-xl border border-gold-soft/50 bg-gold/5 px-4 py-3 text-sm">
          <summary className="cursor-pointer font-semibold text-gold marker:text-gold">{t.craft.help.title}</summary>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
            {t.craft.help.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link href={path("/guides/crafting-strategy")} className="mt-3 inline-block text-gold hover:underline">
            {t.craft.help.link} →
          </Link>
        </details>
        <CraftSim />
      </div>
    </>
  );
}
