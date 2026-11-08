import { getDictionary } from "@/i18n";
import { resolveLang } from "@/i18n/server";
import { getBuild, getBuilds } from "@/lib/builds";
import { classStyle } from "@/lib/classes";
import { OG_SIZE, ogImage } from "@/lib/og";
import { TIER_CATEGORIES } from "@/lib/types";

export function generateStaticParams() {
  return getBuilds().map((b) => ({ slug: b.slug }));
}

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Exile Codex build guide";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const build = getBuild((await params).slug, lang);
  if (!build) return ogImage({ eyebrow: "Path of Exile 2", title: t.og.siteTitle, footer: t.og.footer });
  const style = classStyle(build.className);
  return ogImage({
    eyebrow: t.og.buildGuide,
    title: build.title,
    subtitle: `${build.ascendancy} · ${build.className} · ${build.damage}`,
    emblem: { color: style.color, glyph: style.glyph },
    tiers: TIER_CATEGORIES.filter((c) => build.tiers[c]).map((c) => ({ label: t.categories[c], tier: build.tiers[c]! })),
    chips: build.skills.slice(0, 3).map((s) => s.gem),
    footer: t.og.footer,
  });
}
