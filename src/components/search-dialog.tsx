"use client";

import { useRouter } from "next/navigation";
import { startNavProgress } from "./nav-progress";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/i18n/client";
import type { Gem } from "@/lib/types";
import { GemIcon } from "./ui";

/** Site entries known at build time (builds, guides, pages); gems and items are loaded with the catalog on open. */
export interface SearchEntry {
  kind: "build" | "guide" | "page";
  title: string;
  sub?: string;
  href: string;
  /** Extra words that should match (class, tags, skills…). */
  keywords?: string;
}
interface Result {
  kind: SearchEntry["kind"] | "gem" | "unique" | "base";
  title: string;
  sub?: string;
  href: string;
  keywords?: string;
  icon?: string | null;
  gem?: Pick<Gem, "name" | "icon" | "color">;
}

const KIND_ORDER: Result["kind"][] = ["page", "build", "guide", "gem", "unique", "base"];
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** 3: title starts with the query, 2: a word of the title does, 1: title contains it, 0.5: keywords do. */
function score(r: Result, q: string) {
  const title = fold(r.title);
  if (title.startsWith(q)) return 3;
  if (title.split(/[\s'-]+/).some((w) => w.startsWith(q))) return 2;
  if (title.includes(q)) return 1;
  if (r.keywords && fold(r.keywords).includes(q)) return 0.5;
  return 0;
}

export function SearchDialog({ entries }: { entries: SearchEntry[] }) {
  const { t, path } = useI18n();
  const ts = t.search;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [catalog, setCatalog] = useState<Result[] | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // Ctrl/Cmd+K anywhere, or "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || catalog) return;
    fetch("/data/catalog.json")
      .then((r) => r.json())
      .then((c: { gems: [string, string | null, Gem["color"], string, string][]; items: [string, string, string | null, number, string][] }) =>
        setCatalog([
          ...c.gems.map(([name, icon, color, type, id]) => ({
            kind: "gem" as const,
            title: name,
            sub: ts.gemTypes[type as keyof typeof ts.gemTypes] ?? type,
            href: path(`/database/gems#${id}`),
            gem: { name, icon, color },
          })),
          ...c.items.map(([name, cls, icon, unique, id]) => ({
            kind: unique ? ("unique" as const) : ("base" as const),
            title: name,
            sub: cls,
            href: path(`/database/${unique ? "uniques" : "bases"}#${id}`),
            icon,
          })),
        ]),
      )
      .catch(() => setCatalog([]));
  }, [open, catalog, path, ts]);

  const results = useMemo(() => {
    const q = fold(query.trim());
    const pool: Result[] = [...entries, ...(catalog ?? [])];
    if (!q) return pool.filter((r) => r.kind === "page" || r.kind === "guide").slice(0, 12);
    const scored = pool.map((r) => ({ r, s: score(r, q) })).filter((x) => x.s > 0);
    scored.sort((a, b) => b.s - a.s || KIND_ORDER.indexOf(a.r.kind) - KIND_ORDER.indexOf(b.r.kind) || a.r.title.length - b.r.title.length);
    // At most 6 per kind so one kind (1,000 gems) cannot crowd out the others.
    const perKind = new Map<string, number>();
    return scored
      .filter(({ r }) => {
        const n = perKind.get(r.kind) ?? 0;
        perKind.set(r.kind, n + 1);
        return n < 6;
      })
      .map((x) => x.r)
      .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind))
      .slice(0, 30);
  }, [query, entries, catalog]);

  const go = (r: Result | undefined) => {
    if (!r) return;
    setOpen(false);
    setQuery("");
    if (new URL(r.href, location.href).pathname !== location.pathname) startNavProgress();
    router.push(r.href);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") go(results[active]);
  };
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ts.open}
        className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 text-sm text-muted hover:border-line-strong hover:text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <kbd className="hidden rounded border border-line px-1 font-sans text-[10px] text-faint xl:inline">Ctrl K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={ts.open}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-line-strong bg-surface shadow-2xl shadow-black/70"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-faint" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={input}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder={ts.placeholder}
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-${active}` : undefined}
                className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-faint focus:outline-none"
              />
              <kbd className="rounded border border-line px-1.5 text-[10px] text-faint">Esc</kbd>
            </div>
            <ul id="search-results" ref={list} role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
              {query && !catalog && <li className="px-3 py-2 text-xs text-faint">{ts.loading}</li>}
              {results.length === 0 && query && catalog && <li className="px-3 py-6 text-center text-sm text-faint">{ts.none}</li>}
              {results.map((r, i) => {
                const header = i === 0 || results[i - 1].kind !== r.kind;
                return (
                  <li key={`${r.kind}-${r.href}-${r.title}`} role="presentation">
                    {header && <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-faint">{ts.kinds[r.kind]}</p>}
                    <button
                      type="button"
                      id={`search-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(r)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${i === active ? "bg-surface-2" : ""}`}
                    >
                      {r.gem ? (
                        <GemIcon gem={r.gem} size={28} />
                      ) : r.icon ? (
                        <img src={r.icon} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 object-contain" />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-xs text-gold">
                          {r.kind === "build" ? "◆" : r.kind === "guide" ? "§" : "›"}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm ${r.kind === "unique" ? "text-unique" : i === active ? "text-gold" : "text-ink"}`}>{r.title}</span>
                        {r.sub && <span className="block truncate text-xs text-faint">{r.sub}</span>}
                      </span>
                      {i === active && <span className="text-xs text-faint">↵</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
