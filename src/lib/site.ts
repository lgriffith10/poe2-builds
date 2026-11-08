// Public site address and shared SEO facts.

/** Absolute site origin: SITE_URL, or the address Netlify provides as URL during builds. */
export const SITE_URL = (process.env.SITE_URL ?? process.env.URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Exile Codex";

/** Absolute URL of a public path. */
export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
