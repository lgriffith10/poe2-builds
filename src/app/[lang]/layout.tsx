import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, LOCALES } from "@/i18n";
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
  return (
    <html lang={lang} className={`${inter.variable} ${cinzel.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <I18nProvider lang={lang} t={t}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter lang={lang} />
        </I18nProvider>
      </body>
    </html>
  );
}
