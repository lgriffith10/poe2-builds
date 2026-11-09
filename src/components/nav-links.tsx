"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LOCALE_COOKIE, LOCALE_NAMES, LOCALES, localePath, stripLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { NAV } from "@/lib/nav";

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

/** `slot`: extra controls shown before the language switch (the search button). */
export function NavBar({ pathname, slot }: { pathname: string | null; slot?: ReactNode }) {
  const { t, lang, path } = useI18n();
  const [open, setOpen] = useState(false);
  const active = (href: string) =>
    pathname !== null && pathname.startsWith(href);

  const links = NAV.map((item) => (
    <Link
      key={item.href}
      href={path(item.href)}
      onClick={() => setOpen(false)}
      className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
        active(item.href) ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"
      }`}
    >
      {t.nav[item.key]}
    </Link>
  ));

  return (
    <>
      <Logo href={path("/")} />
      <nav className="hidden gap-1 lg:flex">{links}</nav>
      <div className="ml-auto flex items-center gap-2">
        {slot}
        <LanguageSwitch current={lang} page={pathname ?? "/"} />
        <button
          type="button"
          className="rounded-md p-2 text-muted hover:text-ink lg:hidden"
          aria-label={t.nav.toggleMenu}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="absolute inset-x-0 top-16 flex flex-col gap-1 border-b border-line bg-bg p-3 lg:hidden">{links}</nav>
      )}
    </>
  );
}
