import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { renderBody } from "./builds";

const DIR = path.join(process.cwd(), "content", "guides");

export interface Guide {
  slug: string;
  /** Position in the guide list (lower first). */
  order: number;
  title: string;
  summary: string;
  updated: string;
  /** Pages the facts were checked against, credited at the end of the guide. */
  sources: { title: string; url: string }[];
  html: string;
  toc: { id: string; text: string }[];
}

function read(file: string, lang: Locale): Guide {
  const where = `guides/${file}`;
  const base = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const trPath = path.join(DIR, lang, file);
  const tr = lang !== DEFAULT_LOCALE && fs.existsSync(trPath) ? matter(fs.readFileSync(trPath, "utf8")) : null;
  const fm = base.data;
  for (const key of ["title", "summary", "updated"]) if (!fm[key]) throw new Error(`[content/${where}] missing "${key}"`);
  const { html, toc } = renderBody(tr?.content.trim() ? tr.content : base.content, where, lang);
  return {
    slug: file.replace(/\.md$/, ""),
    order: Number(fm.order ?? 99),
    title: tr?.data.title ?? fm.title,
    summary: tr?.data.summary ?? fm.summary,
    updated: fm.updated instanceof Date ? fm.updated.toISOString().slice(0, 10) : String(fm.updated),
    sources: fm.sources ?? [],
    html,
    toc,
  };
}

export function getGuides(lang: Locale = DEFAULT_LOCALE): Guide[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f, lang))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export const getGuide = (slug: string, lang: Locale = DEFAULT_LOCALE) => getGuides(lang).find((g) => g.slug === slug);
