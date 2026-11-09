import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { WeaponCompare } from "@/components/weapon-compare";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/weapons">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.weapons.title, description: t.weapons.intro, alternates: alternates("/weapons", lang) };
}

export default async function WeaponsPage({ params }: PageProps<"/[lang]/weapons">) {
  const { t } = await pageI18n(params);
  return (
    <>
      <PageHeader title={t.weapons.title} sub={t.weapons.intro} />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <WeaponCompare />
      </div>
    </>
  );
}
