import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { classes, getBase, getClass, getGem, getUnique, tree } from "./data";
import { allocateTargets, createGraph, findNodeByName } from "./tree";
import { encodeBuild } from "./build-code";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/i18n/config";
import {
  GEAR_SLOTS,
  TIER_CATEGORIES,
  TIERS,
  type GearPiece,
  type GearSlot,
  type PlannerState,
  type SkillGroup,
  type Tier,
  type TierCategory,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "builds");

export interface Build {
  slug: string;
  title: string;
  className: string;
  ascendancy: string;
  author: string;
  updated: string;
  summary: string;
  sample: boolean;
  /** Game patch the guide was written for, e.g. "0.5.5". */
  patch: string;
  /** Guide this build is based on, credited on the page. */
  source: { title: string; author: string; url: string; updated?: string } | null;
  tags: string[];
  damage: string;
  playstyle: string;
  difficulty: "easy" | "medium" | "hard";
  budget: "low" | "medium" | "high";
  tiers: Partial<Record<TierCategory, Tier>>;
  pros: string[];
  cons: string[];
  skills: SkillGroup[];
  gear: Partial<Record<GearSlot, GearPiece>>;
  ascendancyOrder: string[];
  keyPassives: string[];
  planner: PlannerState;
  plannerCode: string;
  pointsUsed: number;
  html: string;
  toc: { id: string; text: string }[];
}

class BuildError extends Error {
  constructor(file: string, message: string) {
    super(`[content/builds/${file}] ${message}`);
  }
}

const graph = createGraph(tree);
const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Replaces [[Name]] references with links to the database (gems or uniques). */
function linkReferences(markdown: string, file: string): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_, name: string) => {
    const gem = getGem(name);
    if (gem) return `<a class="ref ref-gem" href="/database/gems#${gem.id}">${gem.name}</a>`;
    const unique = getUnique(name);
    if (unique) return `<a class="ref ref-unique" href="/database/uniques#${unique.id}">${unique.name}</a>`;
    throw new BuildError(file, `Unknown reference [[${name}]] (not a gem or unique)`);
  });
}

function renderBody(markdown: string, file: string, lang: Locale = DEFAULT_LOCALE) {
  const toc: Build["toc"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const id = slugify(text);
    if (depth === 2) toc.push({ id, text });
    return `<h${depth} id="${id}">${marked.Parser.parseInline(tokens)}</h${depth}>`;
  };
  const html = (marked.parse(linkReferences(markdown, file), { renderer, async: false }) as string)
    // Site-relative links follow the page language.
    .replace(/href="(\/[^"]*)"/g, (_, href: string) => `href="${localePath(lang, href)}"`);
  return { html, toc };
}

function parseBuild(file: string): { build: Build; markdown: string } {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data: fm, content } = matter(raw);
  const fail = (msg: string): never => {
    throw new BuildError(file, msg);
  };

  const cls = getClass(fm.class ?? "") ?? fail(`Unknown class "${fm.class}"`);
  const ascIndex = cls.ascendancies.findIndex((a) => a.name === fm.ascendancy);
  if (ascIndex < 0) fail(`Unknown ascendancy "${fm.ascendancy}" for ${cls.name}`);
  const ascendancy = cls.ascendancies[ascIndex].name;

  const tiers: Build["tiers"] = {};
  for (const [cat, tier] of Object.entries(fm.tiers ?? {})) {
    if (!TIER_CATEGORIES.includes(cat as TierCategory)) fail(`Unknown tier category "${cat}"`);
    if (!TIERS.includes(tier as Tier)) fail(`Invalid tier "${tier}" for ${cat}`);
    tiers[cat as TierCategory] = tier as Tier;
  }

  const skills: SkillGroup[] = (fm.skills ?? []).map((s: SkillGroup) => {
    for (const name of [s.gem, ...(s.supports ?? [])]) if (!getGem(name)) fail(`Unknown gem "${name}"`);
    return { gem: getGem(s.gem)!.name, supports: (s.supports ?? []).map((n) => getGem(n)!.name), note: s.note };
  });

  const gear: Build["gear"] = {};
  for (const [slot, piece] of Object.entries((fm.gear ?? {}) as Record<string, GearPiece>)) {
    if (!(GEAR_SLOTS as readonly string[]).includes(slot)) fail(`Unknown gear slot "${slot}"`);
    if (piece.unique && !getUnique(piece.unique)) fail(`Unknown unique "${piece.unique}"`);
    if (piece.base && !getBase(piece.base)) fail(`Unknown base type "${piece.base}"`);
    gear[slot as GearSlot] = {
      ...piece,
      unique: piece.unique ? getUnique(piece.unique)!.name : undefined,
    };
  }

  // Passive tree: guides list the notables/keystones they path to, in order.
  const resolve = (name: string) =>
    findNodeByName(graph, name, cls, ascendancy) ?? fail(`Unknown passive "${name}" for ${cls.name}/${ascendancy}`);
  const keyPassives: string[] = fm.passives?.path ?? [];
  const ascendancyOrder: string[] = fm.passives?.ascendancy ?? [];
  const targets = [...keyPassives, ...ascendancyOrder].map(resolve);
  const { allocated, unreachable } = allocateTargets(graph, cls, ascendancy, targets);
  if (unreachable.length) fail(`Unreachable passives: ${unreachable.map((id) => tree.nodes[id].n).join(", ")}`);

  const attrChoice = { str: 0, dex: 1, int: 2 }[fm.passives?.attribute as string] ?? 0;
  const attributes: Record<number, number> = {};
  for (const id of allocated) if (tree.nodes[id].t === "attribute") attributes[id] = attrChoice;

  const planner: PlannerState = {
    classIndex: classes.indexOf(cls),
    ascIndex,
    nodes: [...allocated],
    attributes,
    skills,
    gear: Object.fromEntries(
      Object.entries(gear).map(([slot, p]) => [slot, p.unique ?? p.base ?? ""]),
    ) as PlannerState["gear"],
  };
  const pointsUsed = [...allocated].filter((id) => {
    const n = tree.nodes[id];
    return !n.a && n.t !== "start";
  }).length;

  const { html, toc } = renderBody(content, file);
  const updated = fm.updated instanceof Date ? fm.updated.toISOString().slice(0, 10) : String(fm.updated ?? "");

  const build: Build = {
    slug: file.replace(/\.md$/, ""),
    title: fm.title ?? fail("Missing title"),
    className: cls.name,
    ascendancy,
    author: fm.author ?? "Exile Codex",
    updated,
    summary: fm.summary ?? "",
    sample: Boolean(fm.sample),
    patch: String(fm.patch ?? ""),
    source: fm.source
      ? {
          title: fm.source.title ?? fail("source.title is required"),
          author: fm.source.author ?? fail("source.author is required"),
          url: fm.source.url ?? fail("source.url is required"),
          updated:
            fm.source.updated instanceof Date ? fm.source.updated.toISOString().slice(0, 10) : fm.source.updated,
        }
      : null,
    tags: fm.tags ?? [],
    damage: fm.damage ?? "",
    playstyle: fm.playstyle ?? "",
    difficulty: fm.difficulty ?? "medium",
    budget: fm.budget ?? "medium",
    tiers,
    pros: fm.pros ?? [],
    cons: fm.cons ?? [],
    skills,
    gear,
    ascendancyOrder,
    keyPassives,
    planner,
    plannerCode: encodeBuild(planner),
    pointsUsed,
    html,
    toc,
  };
  return { build, markdown: content };
}

/**
 * Applies a translation from content/builds/<lang>/<file> on top of the English guide.
 * Translations only carry prose (summary, pros, cons, labels, notes and the body); facts stay shared.
 */
function localizeBuild(file: string, base: { build: Build; markdown: string }, lang: Locale): Build {
  if (lang === DEFAULT_LOCALE) return base.build;
  const trPath = path.join(CONTENT_DIR, lang, file);
  if (!fs.existsSync(trPath)) {
    const { html, toc } = renderBody(base.markdown, file, lang);
    return { ...base.build, html, toc };
  }
  const { data: tr, content } = matter(fs.readFileSync(trPath, "utf8"));
  const where = `${lang}/${file}`;
  const known = ["summary", "pros", "cons", "tags", "damage", "playstyle", "skillNotes", "gearNotes"];
  for (const key of Object.keys(tr)) {
    if (!known.includes(key)) throw new BuildError(where, `Unknown translation field "${key}"`);
  }
  const b = base.build;
  for (const gem of Object.keys(tr.skillNotes ?? {})) {
    if (!b.skills.some((s) => s.gem === gem)) throw new BuildError(where, `skillNotes: "${gem}" is not a skill of this guide`);
  }
  for (const slot of Object.keys(tr.gearNotes ?? {})) {
    if (!b.gear[slot as GearSlot]) throw new BuildError(where, `gearNotes: no "${slot}" slot in this guide`);
  }
  const { html, toc } = renderBody(content.trim() ? content : base.markdown, where, lang);
  return {
    ...b,
    summary: tr.summary ?? b.summary,
    pros: tr.pros ?? b.pros,
    cons: tr.cons ?? b.cons,
    tags: tr.tags ?? b.tags,
    damage: tr.damage ?? b.damage,
    playstyle: tr.playstyle ?? b.playstyle,
    skills: b.skills.map((s) => ({ ...s, note: tr.skillNotes?.[s.gem] ?? s.note })),
    gear: Object.fromEntries(
      Object.entries(b.gear).map(([slot, piece]) => [slot, { ...piece, note: tr.gearNotes?.[slot] ?? piece?.note }]),
    ),
    html,
    toc,
  };
}

// Parsing a guide resolves its whole passive tree, so parsed guides are cached per file and only re-parsed when the
// file changes (keeps hot reload for content edits). Translations are cached per locale the same way.
// The cache lives on globalThis to survive dev module reloads.
type Parsed = { build: Build; markdown: string };
const store = globalThis as typeof globalThis & {
  __buildCache?: {
    files: Map<string, { mtimeMs: number; parsed: Parsed }>;
    lists: Map<Locale, { key: string; list: Build[] }>;
  };
};
const cache = (store.__buildCache ??= { files: new Map(), lists: new Map() });

const mtime = (p: string) => (fs.existsSync(p) ? fs.statSync(p).mtimeMs : 0);

export function getBuilds(lang: Locale = DEFAULT_LOCALE): Build[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const stamps = files.map((f) => [f, mtime(path.join(CONTENT_DIR, f)), mtime(path.join(CONTENT_DIR, lang, f))] as const);
  const key = stamps.map(([f, m, t]) => `${f}:${m}:${t}`).join("|");
  const cached = cache.lists.get(lang);
  if (cached && cached.key === key) return cached.list;

  for (const [file, mtimeMs] of stamps) {
    if (cache.files.get(file)?.mtimeMs !== mtimeMs) cache.files.set(file, { mtimeMs, parsed: parseBuild(file) });
  }
  for (const file of cache.files.keys()) if (!files.includes(file)) cache.files.delete(file);

  const list = files
    .map((file) => localizeBuild(file, cache.files.get(file)!.parsed, lang))
    .sort((a, b) => tierRank(a) - tierRank(b) || a.title.localeCompare(b.title));
  cache.lists.set(lang, { key, list });
  return list;
}

export const getBuild = (slug: string, lang: Locale = DEFAULT_LOCALE) => getBuilds(lang).find((b) => b.slug === slug);

/** Lower is better; builds without an endgame tier sort last. */
export function tierRank(b: Build, category: TierCategory = "starter"): number {
  const t = b.tiers[category];
  return t ? TIERS.indexOf(t) : TIERS.length;
}
