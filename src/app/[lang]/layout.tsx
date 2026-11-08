import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { SearchEntry } from "@/components/search-dialog";
import { getBuilds } from "@/lib/builds";
import { getGuides } from "@/lib/guides";
import { DB_SECTIONS, NAV } from "@/lib/nav";
import { getDictionary, localePath, LOCALES } from "@/i18n";
import { I18nProvider } from "@/i18n/client";
import { alternates, resolveLang } from "@/i18n/server";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["600", "700"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return {
    title: { default: t.meta.siteTitle, template: "%s · Exile Codex" },
    description: t.meta.siteDescription,
    alternates: alternates("/", lang),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  const path = (p: string) => localePath(lang, p);
  // Small, build-time part of the search index; gems and items come from /data/catalog.json when the search opens.
  const search: SearchEntry[] = [
    ...NAV.map((n) => ({ kind: "page" as const, title: t.nav[n.key], href: path(n.href) })),
    ...DB_SECTIONS.map((d) => ({ kind: "page" as const, title: t.database[d.key], sub: t.nav.database, href: path(d.href) })),
    ...getBuilds(lang).map((b) => ({
      kind: "build" as const,
      title: b.title,
      sub: `${b.ascendancy} · ${b.className}`,
      href: path(`/builds/${b.slug}`),
      keywords: [b.damage, b.playstyle, ...b.tags, ...b.skills.map((s) => s.gem)].join(" "),
    })),
    ...getGuides(lang).map((g) => ({ kind: "guide" as const, title: g.title, sub: g.summary, href: path(`/guides/${g.slug}`) })),
  ];
  return (
    <html lang={lang} className={`${inter.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <I18nProvider lang={lang} t={t}>
          <SiteHeader search={search} />
          <main className="flex-1">{children}</main>
          <SiteFooter lang={lang} />
        </I18nProvider>
      </body>
    </html>
  );
}
