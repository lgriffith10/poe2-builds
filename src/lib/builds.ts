import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { classes, getBase, getClass, getGem, getUnique, tree } from "./data";
import { gemTip, tipAttr, uniqueTip } from "./tips";
import { renderItemCards } from "./item-cards";
import { allocateTargets, allocateWeaponSetTargets, createGraph, findNodeByName } from "./tree";
import { encodeBuild } from "./build-code";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/i18n/config";
import {
  DIFFICULTIES,
  type Difficulty,
  GEAR_SLOTS,
  GEAR_STAGES,
  TIER_CATEGORIES,
  TIER_CHANGES,
  TIERS,
  type GearPiece,
  type GearSet,
  type GearSlot,
  type GearStage,
  type LevelingPath,
  type SkillRotation,
  type PlannerState,
  type SkillGroup,
  type Tier,
  type TierCategory,
  type TierChange,
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
  /** "guide": based on a written guide; "ladder": drawn from a ladder character and ladder statistics. */
  origin: "guide" | "ladder";
  /** Game patch the guide was written for, e.g. "0.5.5". */
  patch: string;
  /** Guide this build is based on, credited on the page. */
  source: {
    title: string;
    author: string;
    url: string;
    updated?: string;
  } | null;
  tags: string[];
  damage: string;
  playstyle: string;
  difficulty: Difficulty;
  budget: "low" | "medium" | "high";
  tiers: Partial<Record<TierCategory, Tier>>;
  /** Movement since the previous version of the source tier list, when the source says so. */
  tierChanges: Partial<Record<TierCategory, TierChange>>;
  pros: string[];
  cons: string[];
  skills: SkillGroup[];
  /** Campaign skill progression, from the source guide's planner. */
  leveling: LevelingPath[];
  /** Set when the leveling comes from another guide than `source` (endgame-only guides). */
  levelingSource: { title: string; url: string } | null;
  rotations: SkillRotation[];
  /** Reference gear (used by the planner and character comparison). */
  gear: GearSet;
  /** Optional gear progression; `gear` is shown when empty. */
  gearStages: Partial<Record<GearStage, GearSet>>;
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

/** Replaces [[Name]] references with links to the database (gems or uniques), carrying hover-card data. */
function linkReferences(markdown: string, file: string): string {
  return markdown.replace(/\[\[([^\]]+)\]\]/g, (_, name: string) => {
    const gem = getGem(name);
    if (gem) return `<a class="ref ref-gem" href="/database/gems#${gem.id}" ${tipAttr(gemTip(name)!)}>${gem.name}</a>`;
    const unique = getUnique(name);
    if (unique) {
      return `<a class="ref ref-unique" href="/database/uniques#${unique.id}" ${tipAttr(uniqueTip(name)!)}>${unique.name}</a>`;
    }
    throw new BuildError(file, `Unknown reference [[${name}]] (not a gem or unique)`);
  });
}

/** Renders guide Markdown: [[Name]] references, heading ids (h2 collected as a table of contents), localized links. */
export function renderBody(markdown: string, file: string, lang: Locale = DEFAULT_LOCALE) {
  const toc: Build["toc"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const id = slugify(text);
    if (depth === 2) toc.push({ id, text });
    return `<h${depth} id="${id}">${marked.Parser.parseInline(tokens)}</h${depth}>`;
  };
  // ```items blocks become item illustrations (see item-cards.ts).
  const code = renderer.code.bind(renderer);
  renderer.code = (token) => (token.lang === "items" ? renderItemCards(token.text, file) : code(token));
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

  // An unquoted "Label: text" list item parses as an object in YAML and crashes the page.
  for (const key of ["pros", "cons", "tags"]) {
    const bad = (fm[key] ?? []).find((v: unknown) => typeof v !== "string");
    if (bad !== undefined) fail(`${key} item ${JSON.stringify(bad)} is not text (quote items that contain ": ")`);
  }

  const tiers: Build["tiers"] = {};
  for (const [cat, tier] of Object.entries(fm.tiers ?? {})) {
    if (!TIER_CATEGORIES.includes(cat as TierCategory)) fail(`Unknown tier category "${cat}"`);
    if (!TIERS.includes(tier as Tier)) fail(`Invalid tier "${tier}" for ${cat}`);
    tiers[cat as TierCategory] = tier as Tier;
  }

  const skills: SkillGroup[] = (fm.skills ?? []).map((s: SkillGroup) => {
    for (const name of [s.gem, ...(s.supports ?? [])]) if (!getGem(name)) fail(`Unknown gem "${name}"`);
    if (s.weaponSet !== undefined && s.weaponSet !== 1 && s.weaponSet !== 2) fail(`${s.gem}: weaponSet must be 1 or 2`);
    return {
      gem: getGem(s.gem)!.name,
      supports: (s.supports ?? []).map((n) => getGem(n)!.name),
      note: s.note,
      ...(s.weaponSet && { weaponSet: s.weaponSet }),
    };
  });

  const gemNamed = (name: string, where: string) => getGem(name)?.name ?? fail(`${where}: unknown gem "${name}"`);
  const parseRotation = (r: SkillRotation, where: string): SkillRotation => ({
    name: String(r.name),
    steps: (r.steps ?? []).map((s) => ({
      gem: gemNamed(s.gem, `${where} "${r.name}"`),
      ...(s.count && s.count > 1 && { count: s.count }),
      ...(s.label && { label: String(s.label) }),
    })),
  });
  const leveling: LevelingPath[] = (fm.leveling ?? []).map((p: LevelingPath, i: number) => ({
    ...(p.name && { name: String(p.name) }),
    steps: (p.steps ?? []).map((s) => {
      const where = `leveling[${i}] "${s.name}"`;
      if (!s.name) fail(`leveling[${i}]: step without a name`);
      return {
        name: String(s.name),
        skills: (s.skills ?? []).map((g) => ({
          gem: gemNamed(g.gem, where),
          supports: (g.supports ?? []).map((n) => gemNamed(n, where)),
        })),
      };
    }),
    ...(p.rotations?.length && { rotations: p.rotations.map((r) => parseRotation(r, `leveling[${i}].rotations`)) }),
  }));
  const rotations: SkillRotation[] = (fm.rotations ?? []).map((r: SkillRotation) => parseRotation(r, "rotations"));

  const parseGear = (raw: unknown, where: string): GearSet => {
    const set: GearSet = {};
    for (const [slot, piece] of Object.entries((raw ?? {}) as Record<string, GearPiece>)) {
      if (!(GEAR_SLOTS as readonly string[]).includes(slot)) fail(`${where}: unknown gear slot "${slot}"`);
      if (piece.unique && !getUnique(piece.unique)) fail(`${where}: unknown unique "${piece.unique}"`);
      if (piece.base && !getBase(piece.base)) fail(`${where}: unknown base type "${piece.base}"`);
      set[slot as GearSlot] = {
        ...piece,
        unique: piece.unique ? getUnique(piece.unique)!.name : undefined,
      };
    }
    return set;
  };
  const gear = parseGear(fm.gear, "gear");
  const gearStages: Build["gearStages"] = {};
  for (const [stage, set] of Object.entries(fm.gearStages ?? {})) {
    if (!(GEAR_STAGES as readonly string[]).includes(stage)) fail(`Unknown gear stage "${stage}"`);
    gearStages[stage as GearStage] = parseGear(set, `gearStages.${stage}`);
  }

  const tierChanges: Build["tierChanges"] = {};
  for (const [cat, change] of Object.entries(fm.tierChanges ?? {})) {
    if (!tiers[cat as TierCategory]) fail(`tierChanges.${cat} without a tier in that category`);
    if (!(TIER_CHANGES as readonly string[]).includes(change as string)) fail(`Invalid tier change "${change}"`);
    tierChanges[cat as TierCategory] = change as TierChange;
  }

  // Passive tree: guides list the notables/keystones they path to, in order.
  const resolve = (name: string) =>
    findNodeByName(graph, name, cls, ascendancy) ?? fail(`Unknown passive "${name}" for ${cls.name}/${ascendancy}`);
  const keyPassives: string[] = fm.passives?.path ?? [];
  const ascendancyOrder: string[] = fm.passives?.ascendancy ?? [];
  const targets = [...keyPassives, ...ascendancyOrder].map(resolve);
  const { allocated: shared, unreachable } = allocateTargets(graph, cls, ascendancy, targets);
  if (unreachable.length) fail(`Unreachable passives: ${unreachable.map((id) => tree.nodes[id].n).join(", ")}`);
  // Weapon-set passives: notables taken with each weapon set's own points, pathed from the shared tree.
  const setTargets = {
    1: ((fm.passives?.weaponSet1 ?? []) as string[]).map(resolve),
    2: ((fm.passives?.weaponSet2 ?? []) as string[]).map(resolve),
  };
  const sets = allocateWeaponSetTargets(graph, cls, ascendancy, shared, setTargets);
  if (sets.unreachable.length) fail(`Unreachable weapon-set passives: ${sets.unreachable.map((id) => tree.nodes[id].n).join(", ")}`);
  const allocated = sets.allocated;

  const attrChoice = { str: 0, dex: 1, int: 2 }[fm.passives?.attribute as string] ?? 0;
  const attributes: Record<number, number> = {};
  for (const id of allocated) if (tree.nodes[id].t === "attribute") attributes[id] = attrChoice;

  const planner: PlannerState = {
    classIndex: classes.indexOf(cls),
    ascIndex,
    nodes: [...allocated],
    ...(Object.keys(sets.weaponSets).length && { weaponSets: sets.weaponSets }),
    attributes,
    skills,
    gear: Object.fromEntries(
      Object.entries(gear).map(([slot, p]) => [slot, p.unique ?? p.base ?? ""]),
    ) as PlannerState["gear"],
  };
  const pointsUsed = [...allocated].filter((id) => {
    const n = tree.nodes[id];
    return !n.a && n.t !== "start" && !sets.weaponSets[id];
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
    origin: fm.origin === "ladder" ? "ladder" : fm.origin === undefined || fm.origin === "guide" ? "guide" : fail(`Invalid origin "${fm.origin}"`),
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
    difficulty: DIFFICULTIES.includes(fm.difficulty ?? "medium")
      ? (fm.difficulty ?? "medium")
      : fail(`Invalid difficulty "${fm.difficulty}" (expected ${DIFFICULTIES.join(", ")})`),
    budget: fm.budget ?? "medium",
    tiers,
    tierChanges,
    pros: fm.pros ?? [],
    cons: fm.cons ?? [],
    skills,
    leveling,
    levelingSource: fm.levelingSource?.url
      ? { title: String(fm.levelingSource.title ?? fm.levelingSource.url), url: String(fm.levelingSource.url) }
      : null,
    rotations,
    gear,
    gearStages,
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
  // Same check as the English guides: an unquoted "Label : text" item parses as an object and crashes the page.
  for (const key of ["pros", "cons", "tags"]) {
    const bad = (tr[key] ?? []).find((v: unknown) => typeof v !== "string");
    if (bad !== undefined) throw new BuildError(where, `${key} item ${JSON.stringify(bad)} is not text (quote items that contain ": ")`);
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
  __buildCacheV12?: {
    files: Map<string, { mtimeMs: number; parsed: Parsed }>;
    lists: Map<Locale, { key: string; list: Build[] }>;
  };
};
// Versioned key: a dev server still holding a cache in an older shape (hot reload keeps globalThis) gets a fresh one.
const cache = (store.__buildCacheV12 ??= { files: new Map(), lists: new Map() });

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
