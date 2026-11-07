// Locales: English is served without a URL prefix, French under /fr (see src/proxy.ts).
export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", fr: "Français" };

export const isLocale = (value: string | undefined): value is Locale => LOCALES.includes(value as Locale);

/** Public URL of an app path in a given locale, e.g. ("fr", "/planner") -> "/fr/planner". */
export function localePath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Removes a locale prefix from a public path: "/fr/planner" -> "/planner". */
export function stripLocale(path: string): string {
  const m = path.match(/^\/(en|fr)(?=\/|$)/);
  return m ? path.slice(m[0].length) || "/" : path;
}

/** Fills {placeholders} in a dictionary string. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
