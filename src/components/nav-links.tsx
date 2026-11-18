"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LOCALE_COOKIE, LOCALE_NAMES, LOCALES, localePath, stripLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { DB_SECTIONS, NAV_GROUPS } from "@/lib/nav";
import { NavIcon } from "./nav-icons";

function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <path d="M16 2 29 9v14l-13 7L3 23V9z" fill="none" stroke="#d4a64f" strokeWidth="1.8" />
        <path d="M16 8v16M10 12l6 4 6-4" fill="none" stroke="#d4a64f" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg font-bold tracking-wider">
        Exile <span className="text-gold">Codex</span>
      </span>
    </Link>
  );
}

/** Links to the current page in the other languages; remembers the choice in a cookie. */
function LanguageSwitch({ current, page }: { current: Locale; page: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-1 text-xs" aria-label={t.nav.language}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={localePath(l, page)}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "true" : undefined}
          title={LOCALE_NAMES[l]}
          onClick={(e) => {
            document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
            // Keep state stored in the hash (planner builds, shared characters) when switching language.
            if (window.location.hash) {
              e.preventDefault();
              window.location.assign(localePath(l, page) + window.location.hash);
            }
          }}
          className={`rounded px-1.5 py-1 uppercase ${l === current ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

/** Navigation with the active link highlighted (reads the URL, so it renders inside Suspense). */
export function NavLinks({ slot }: { slot?: ReactNode }) {
  return <NavBar pathname={stripLocale(usePathname())} slot={slot} />;
}

type MenuEntry = { href: string; label: string; desc?: string; icon?: string };

/** Resolves a group's entries (labels, blurbs, icons); the Database group lists its sections. */
function useMenu() {
  const { t } = useI18n();
  return NAV_GROUPS.map((g) => {
    const entries: MenuEntry[] =
      g.key === "database"
        ? DB_SECTIONS.map((s) => ({ href: s.href, label: t.database[s.key], desc: t.database[s.blurb] }))
        : g.items.map((i) => ({
            href: i.href,
            label: t.nav[i.menuLabel ?? i.key],
            desc: t.home.tools[i.key],
            icon: i.key,
          }));
    const footer = g.key === "database" ? { href: "/database", label: t.nav.overview } : undefined;
    return { key: g.key, label: t.nav.groups[g.key], entries, footer };
  });
}

/** `slot`: extra controls shown before the language switch (the search button). */
export function NavBar({ pathname, slot }: { pathname: string | null; slot?: ReactNode }) {
  const { t, lang, path } = useI18n();
  const menu = useMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const active = (href: string) => pathname !== null && (pathname === href || pathname.startsWith(href + "/"));
  const groupActive = (g: (typeof menu)[number]) =>
    g.entries.some((e) => active(e.href)) || (g.footer !== undefined && active(g.footer.href));

  const close = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 150);
  };

  // Escape and clicks outside close the open sub-menu.
  useEffect(() => {
    if (!openGroup && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openGroup, mobileOpen]);

  useEffect(() => cancelClose, []);

  return (
    <>
      <Logo href={path("/")} />
      <nav ref={navRef} className="hidden gap-1 lg:flex" aria-label="Main">
        {menu.map((g) => {
          const isOpen = openGroup === g.key;
          return (
            <div
              key={g.key}
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpenGroup(g.key);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setOpenGroup(isOpen ? null : g.key)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                  groupActive(g) || isOpen ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"
                }`}
              >
                {g.label}
                <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                  <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className="w-80 rounded-lg border border-line-strong bg-surface p-2 shadow-xl shadow-black/50">
                    {g.entries.map((e) => (
                      <Link
                        key={e.href}
                        href={path(e.href)}
                        onClick={close}
                        aria-current={active(e.href) ? "page" : undefined}
                        className={`group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-2 ${
                          active(e.href) ? "bg-surface-2" : ""
                        }`}
                      >
                        {e.icon && <NavIcon name={e.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold-soft group-hover:text-gold" />}
                        <span className="min-w-0">
                          <span className={`block text-sm font-medium ${active(e.href) ? "text-gold" : "text-ink group-hover:text-gold"}`}>
                            {e.label}
                          </span>
                          {e.desc && <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{e.desc}</span>}
                        </span>
                      </Link>
                    ))}
                    {g.footer && (
                      <Link
                        href={path(g.footer.href)}
                        onClick={close}
                        className="mt-1 block border-t border-line px-3 pb-1 pt-2.5 text-xs text-muted hover:text-gold"
                      >
                        {g.footer.label} →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        {slot}
        <LanguageSwitch current={lang} page={pathname ?? "/"} />
        <button
          type="button"
          className="rounded-md p-2 text-muted hover:text-ink lg:hidden"
          aria-label={t.nav.toggleMenu}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <nav className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg p-3 lg:hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            {menu.map((g) => (
              <div key={g.key}>
                <div className="px-3 pb-1 font-display text-xs font-semibold uppercase tracking-widest text-faint">{g.label}</div>
                {[...g.entries, ...(g.footer ? [g.footer] : [])].map((e) => (
                  <Link
                    key={e.href}
                    href={path(e.href)}
                    onClick={close}
                    className={`block rounded-md px-3 py-2 text-sm ${active(e.href) ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
