import { getDictionary } from "@/i18n";
import { resolveLang } from "@/i18n/server";
import { getGuide, getGuides } from "@/lib/guides";
import { OG_SIZE, ogImage } from "@/lib/og";

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Exile Codex guide";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const guide = getGuide((await params).slug, lang);
  return ogImage({
    eyebrow: t.og.guide,
    title: guide?.title ?? t.og.siteTitle,
    subtitle: guide?.summary,
    footer: t.og.footer,
  });
}
