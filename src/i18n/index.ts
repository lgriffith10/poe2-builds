import { en, type Dictionary } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export const getDictionary = (lang: Locale): Dictionary => DICTIONARIES[lang];
export type { Dictionary };
export * from "./config";
