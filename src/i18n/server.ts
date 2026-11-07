import "server-only";
import { notFound } from "next/navigation";
import { getDictionary } from "./index";
import { LOCALES, isLocale, localePath, type Locale } from "./config";

/** Reads and validates the [lang] route param. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

/** Locale, dictionary and localized path builder for a page. */
export async function pageI18n(params: Promise<{ lang: string }>) {
  const lang = await resolveLang(params);
  return { lang, t: getDictionary(lang), path: (p: string) => localePath(lang, p) };
}

/** hreflang alternates for a path (path without locale prefix). */
export function alternates(path: string, lang: Locale) {
  return {
    canonical: localePath(lang, path),
    languages: Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
  };
}
