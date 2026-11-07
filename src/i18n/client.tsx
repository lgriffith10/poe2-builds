"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "./dictionaries/en";
import { fmt, localePath, type Locale } from "./config";

const I18nContext = createContext<{ lang: Locale; t: Dictionary } | null>(null);

export function I18nProvider({ lang, t, children }: { lang: Locale; t: Dictionary; children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

/** Current locale, its dictionary, a {placeholder} formatter and a localized path builder. */
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return { lang: ctx.lang, t: ctx.t, fmt, path: (p: string) => localePath(ctx.lang, p) };
}
