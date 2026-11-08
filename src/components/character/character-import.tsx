"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { encodeBuild } from "@/lib/build-code";
import { useCatalog, type Catalog } from "@/lib/catalog";
import { useI18n } from "@/i18n/client";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { rankGuides, type Comparison, type GuideFingerprint } from "@/lib/compare";
import { decodePobCode, extractPobbId, parsePobXml, type PobCharacter } from "@/lib/pob";
import { GEAR_SLOTS, type PlannerState } from "@/lib/types";
import { BuildTreeViewer } from "../build-tree-viewer";
import { ClassEmblem, GemIcon, ItemIcon, Pill, SectionTitle } from "../ui";

export interface CharacterMeta {
  classes: { name: string; ascendancies: string[] }[];
  treeVersion: string;
}

const STORAGE_KEY = "exile-codex:last-pob";

function readSaved(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function save(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage may be unavailable (private mode); importing still works.
  }
}

async function loadCharacter(input: string, t: Dictionary["character"]): Promise<PobCharacter> {
  const pobbId = extractPobbId(input);
  let code = input.trim();
  if (pobbId) {
    const res = await fetch(`/api/pobb/${pobbId}`);
    if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? t.errPobb);
    code = await res.text();
  }
  if (!code) throw new Error(t.errEmpty);
  let xml: string;
  try {
    xml = await decodePobCode(code);
  } catch {
    throw new Error(t.errDecode);
  }
  return parsePobXml(xml);
}

const pct = (v: number) => `${Math.round(v * 100)}%`;

export function CharacterImport({ guides, meta }: { guides: GuideFingerprint[]; meta: CharacterMeta }) {
  const { t: tr, fmt, path } = useI18n();
  const c = tr.character;
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<{ loading: boolean; error: string | null }>({ loading: false, error: null });
  const [char, setChar] = useState<PobCharacter | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [knownNodes, setKnownNodes] = useState<Set<number> | null>(null);
  // Gem and item icons are only needed once a character is shown.
  const catalog = useCatalog(Boolean(char));

  const runImport = async (value: string) => {
    setStatus({ loading: true, error: null });
    try {
      const loadedChar = await loadCharacter(value, c);
      if (!meta.classes.some((cl) => cl.name === loadedChar.className)) {
        throw new Error(fmt(c.errClass, { c: loadedChar.className }));
      }
      setChar(loadedChar);
      setSelected(null);
      setStatus({ loading: false, error: null });
      save(value);
      // pobb.in imports get a shareable URL.
      const pobbId = extractPobbId(value);
      window.history.replaceState(null, "", pobbId ? `#pobb=${pobbId}` : window.location.pathname);
    } catch (e) {
      setStatus({ loading: false, error: e instanceof Error ? e.message : String(e) });
    }
  };

  // A shared link (#pobb=<id>) wins; otherwise restore the last imported character.
  useEffect(() => {
    const shared = window.location.hash.match(/^#pobb=([A-Za-z0-9_-]+)$/)?.[1];
    const saved = shared ? `https://pobb.in/${shared}` : readSaved();
    if (!saved) return;
    const t = setTimeout(() => {
      setInput(saved);
      void runImport(saved);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Node ids of the current tree, to report passives from older tree versions.
  useEffect(() => {
    if (!char) return;
    let alive = true;
    fetch("/data/tree.json")
      .then((r) => r.json())
      .then((t: { nodes: Record<string, unknown> }) => alive && setKnownNodes(new Set(Object.keys(t.nodes).map(Number))))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [char]);

  const derived = useMemo(() => {
    if (!char) return null;
    const classIndex = meta.classes.findIndex((c) => c.name === char.className);
    const ascIndex = char.ascendancy ? meta.classes[classIndex].ascendancies.indexOf(char.ascendancy) : -1;
    const nodes = knownNodes ? char.nodes.filter((n) => knownNodes.has(n)) : char.nodes;
    const uniquesWorn = Object.values(char.items)
      .filter((i) => i?.rarity === "UNIQUE")
      .map((i) => i!.name);
    const planner: PlannerState = {
      classIndex,
      ascIndex,
      nodes,
      weaponSets: Object.fromEntries(
        Object.entries(char.weaponSets ?? {}).filter(([id]) => nodes.includes(Number(id))),
      ),
      attributes: {},
      skills: char.skills,
      gear: Object.fromEntries(
        Object.entries(char.items).map(([slot, it]) => [slot, it!.rarity === "UNIQUE" ? it!.name : it!.base]),
      ),
    };
    const ranking = rankGuides(
      {
        className: char.className,
        ascendancy: char.ascendancy,
        nodes,
        weaponSets: planner.weaponSets,
        skills: char.skills,
        uniques: uniquesWorn,
      },
      guides,
    );
    return {
      planner,
      code: encodeBuild(planner),
      ranking,
      unknownNodes: knownNodes ? char.nodes.length - nodes.length : 0,
    };
  }, [char, meta, guides, knownNodes]);

  const match: Comparison | undefined = derived
    ? (derived.ranking.find((r) => r.guide.slug === selected) ?? derived.ranking[0])
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <form
        className="rounded-xl border border-line bg-surface p-4"
        onSubmit={(e) => {
          e.preventDefault();
          void runImport(input);
        }}
      >
        <label htmlFor="pob-code" className="text-sm font-semibold">
          {c.inputLabel}
        </label>
        <textarea
          id="pob-code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          spellCheck={false}
          placeholder="https://pobb.in/…  or  eNrtPWtz47aun…"
          className="mt-2 w-full resize-y rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs placeholder:text-faint focus:border-gold-soft focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status.loading}
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-[#e2b964] disabled:opacity-60"
          >
            {status.loading ? c.importing : c.import}
          </button>
          {char && (
            <button
              type="button"
              onClick={() => {
                setChar(null);
                setInput("");
                save("");
              }}
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted hover:text-ink"
            >
              {c.clear}
            </button>
          )}
          {status.error && <p className="text-sm text-red-400">{status.error}</p>}
        </div>
      </form>

      {char && derived && (
        <div className="mt-8 space-y-12">
          {/* Character header */}
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center">
            <ClassEmblem name={char.className} size={64} />
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold">
                {char.ascendancy ?? char.className}
                <span className="ml-2 text-base font-normal text-muted">
                  {char.ascendancy && `${char.className} · `}
                  {fmt(c.level, { n: char.level })}
                </span>
              </h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Pill>{fmt(c.passives, { n: char.nodes.length })}</Pill>
                <Pill>{fmt(c.skillGroups, { n: char.skills.length })}</Pill>
                <Pill>{fmt(c.items, { n: Object.keys(char.items).length })}</Pill>
                {derived.unknownNodes > 0 && (
                  <Pill tone="warn">
                    {fmt(c.unknownNodes, {
                      n: derived.unknownNodes,
                      v: meta.treeVersion,
                      pv: char.treeVersion?.replace("_", ".") ?? "?",
                    })}
                  </Pill>
                )}
              </div>
            </div>
            <Link
              href={path(`/planner#${derived.code}`)}
              className="rounded-lg border border-gold-soft px-4 py-2 text-sm text-gold hover:bg-surface-2"
            >
              {tr.common.openInPlanner}
            </Link>
          </div>

          {/* Guide comparison */}
          <section>
            <SectionTitle sub={c.closestSub}>{c.closest}</SectionTitle>
            <div className="grid gap-3 md:grid-cols-3">
              {derived.ranking.slice(0, 3).map((r) => (
                <button
                  key={r.guide.slug}
                  type="button"
                  onClick={() => setSelected(r.guide.slug)}
                  className={`rounded-xl border p-4 text-left transition ${
                    match?.guide.slug === r.guide.slug ? "border-gold-soft bg-surface-2" : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ClassEmblem name={r.guide.className} size={36} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{r.guide.title}</p>
                      <p className="text-xs text-muted">{r.guide.ascendancy}</p>
                    </div>
                    <span className="font-display text-2xl font-bold text-gold">{pct(r.score)}</span>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-muted">
                    <Bar label={c.barPassive} value={r.passives} />
                    <Bar label={c.barMain} value={r.mainSkills} />
                    <Bar label={c.barSupports} value={r.supports} />
                  </div>
                </button>
              ))}
            </div>
            {derived.ranking.length > 3 && (
              <select
                aria-label={c.compareWith}
                value={match?.guide.slug ?? ""}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
              >
                {derived.ranking.map((r) => (
                  <option key={r.guide.slug} value={r.guide.slug}>
                    {r.guide.title} ({pct(r.score)})
                  </option>
                ))}
              </select>
            )}

            {match && <ComparisonDetails match={match} catalog={catalog} />}
          </section>

          <section>
            <SectionTitle>{tr.common.passiveTree}</SectionTitle>
            <BuildTreeViewer planner={derived.planner} code={derived.code} />
          </section>

          <section>
            <SectionTitle>{tr.common.skills}</SectionTitle>
            <div className="grid gap-3 md:grid-cols-2">
              {char.skills.map((s, i) => (
                <div key={i} className="rounded-xl border border-line bg-surface p-3">
                  <GemLine name={s.gem} catalog={catalog} size={40} bold />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.supports.map((sup, k) => (
                      <GemLine key={k} name={sup} catalog={catalog} size={24} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>{tr.common.gear}</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {GEAR_SLOTS.filter((slot) => char.items[slot]).map((slot) => {
                const it = char.items[slot]!;
                const unique = it.rarity === "UNIQUE";
                const icon = catalog?.itemByName.get((unique ? it.name : it.base).toLowerCase())?.icon ?? catalog?.itemByName.get(it.base.toLowerCase())?.icon ?? null;
                return (
                  <div key={slot} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
                    <ItemIcon src={icon} alt={it.name} size={64} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-faint">{tr.slots[slot]}</p>
                      <p className={`font-semibold ${unique ? "text-unique" : it.rarity === "RARE" ? "text-[#e8d77a]" : ""}`}>
                        {unique || it.rarity === "RARE" ? it.name : it.base}
                      </p>
                      {(unique || it.rarity === "RARE") && <p className="text-xs text-muted">{it.base}</p>}
                      <ul className="mt-1 space-y-0.5 text-sm text-[#8fb6f0]">
                        {it.mods.map((m, k) => (
                          <li key={k}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 shrink-0">{label}</span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <span className="block h-full rounded-full bg-gold" style={{ width: pct(value) }} />
      </span>
      <span className="w-9 text-right">{pct(value)}</span>
    </div>
  );
}

function GemLine({
  name,
  catalog,
  size,
  bold = false,
}: {
  name: string;
  catalog: Catalog | null;
  size: number;
  bold?: boolean;
}) {
  const { path } = useI18n();
  const gem = catalog?.gemByName.get(name.toLowerCase());
  const content = (
    <>
      {gem ? <GemIcon gem={gem} size={size} /> : <span className="rounded border border-dashed border-line" style={{ width: size, height: size }} />}
      <span className={bold ? "font-semibold" : "text-sm"}>{name}</span>
    </>
  );
  return gem ? (
    <Link href={path(`/database/gems#${gem.id}`)} className="inline-flex items-center gap-2 rounded-lg pr-2 hover:bg-surface-2">
      {content}
    </Link>
  ) : (
    <span className="inline-flex items-center gap-2 pr-2">{content}</span>
  );
}

function ComparisonDetails({ match, catalog }: { match: Comparison; catalog: Catalog | null }) {
  const { t, path } = useI18n();
  const c = t.character;
  const done =
    !match.missingKeyPassives.length && !match.missingSkills.length && !match.missingSupports.length && !match.missingUniques.length;
  return (
    <div className="mt-6 rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">
          {c.comparedWith} <span className="text-gold">{match.guide.title}</span>
          {!match.sameAscendancy && <span className="ml-2 text-sm font-normal text-amber-300">{c.differentAsc}</span>}
        </h3>
        <Link href={path(`/builds/${match.guide.slug}`)} className="text-sm text-gold hover:underline">
          {c.readGuide}
        </Link>
      </div>
      {done ? (
        <p className="mt-3 text-sm text-[#7fbf6a]">{c.allGood}</p>
      ) : (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {match.missingKeyPassives.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">{c.missingKey}</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {match.missingKeyPassives.map((p) => (
                  <Pill key={p}>{p}</Pill>
                ))}
              </div>
            </div>
          )}
          {match.missingSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">{c.missingSkills}</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {match.missingSkills.map((g) => (
                  <GemLine key={g} name={g} catalog={catalog} size={24} />
                ))}
              </div>
            </div>
          )}
          {match.missingSupports.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">{c.missingSupports}</h4>
              <ul className="mt-2 space-y-2">
                {match.missingSupports.map((m) => (
                  <li key={m.gem} className="text-sm">
                    <span className="font-semibold">{m.gem}:</span>{" "}
                    <span className="inline-flex flex-wrap gap-1.5 align-middle">
                      {m.supports.map((s) => (
                        <GemLine key={s} name={s} catalog={catalog} size={20} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {match.missingUniques.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">{c.missingUniques}</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {match.missingUniques.map((u) => (
                  <Link
                    key={u}
                    href={path(`/database/uniques#${catalog?.itemByName.get(u.toLowerCase())?.id ?? ""}`)}
                    className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 py-1 pl-1 pr-3 text-sm text-unique hover:border-line-strong"
                  >
                    <ItemIcon src={catalog?.itemByName.get(u.toLowerCase())?.icon ?? null} alt={u} size={28} />
                    {u}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
