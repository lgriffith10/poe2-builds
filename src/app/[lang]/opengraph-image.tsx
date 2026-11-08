import { getDictionary, LOCALES } from "@/i18n";
import { resolveLang } from "@/i18n/server";
import { getBuilds } from "@/lib/builds";
import { getGuides } from "@/lib/guides";
import { OG_SIZE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Exile Codex";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return ogImage({
    eyebrow: "Path of Exile 2",
    title: t.og.siteTitle,
    subtitle: t.og.siteSubtitle,
    chips: [`${getBuilds(lang).length} builds`, `${getGuides(lang).length} guides`, t.og.planner, t.og.craft],
    footer: t.og.footer,
  });
}
