import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath } from "@/i18n/config";
import { getBuilds } from "@/lib/builds";
import { currencies } from "@/lib/currency";
import { getGuides } from "@/lib/guides";
import { mechanicHref } from "@/lib/farming";
import { getMechanics } from "@/lib/mechanics";
import { DB_SECTIONS, NAV } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site";

/** Every public page, in each language, with its hreflang alternates (x-default = English). */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap =>
    LOCALES.map((lang) => ({
      url: absoluteUrl(localePath(lang, path)),
      ...(lastModified && { lastModified }),
      changeFrequency: "weekly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(localePath(l, path))])),
          "x-default": absoluteUrl(localePath(DEFAULT_LOCALE, path)),
        },
      },
    }));
  return [
    ...entry("/", 1),
    ...NAV.flatMap((n) => entry(n.href, n.href === "/builds" ? 0.9 : 0.8)),
    ...["/tier-list/endgame", "/tier-list/bossing"].flatMap((p) => entry(p, 0.8)),
    ...DB_SECTIONS.flatMap((d) => entry(d.href, 0.6)),
    ...getBuilds().flatMap((b) => entry(`/builds/${b.slug}`, 0.9, b.updated || undefined)),
    ...getGuides().flatMap((g) => entry(`/guides/${g.slug}`, 0.7, g.updated)),
    ...getMechanics().flatMap((m) => entry(mechanicHref(m.id), 0.7, m.updated)),
    ...currencies.flatMap((c) => entry(`/database/currency/${c.slug}`, 0.5)),
  ];
}
