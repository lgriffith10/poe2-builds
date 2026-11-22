"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sticky tabs over the build guide's panels. Every panel stays in the HTML (search engines and the in-page search
 * see it); CSS shows the active one. The URL hash picks the tab: a tab id (#leveling) or any anchor inside a panel
 * (#loot-filter, #guide-faq), which opens that panel and scrolls to the anchor.
 */
export function BuildTabs({ tabs, children }: { tabs: { id: string; text: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(tabs[0].id);
  const bar = useRef<HTMLDivElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  // The bar is stuck once the line just above it has scrolled under the site header.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: "-65px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || id === "play") return;
      if (tabs.some((t) => t.id === id)) return setActive(id);
      const target = document.getElementById(id);
      const panel = target?.closest<HTMLElement>("[data-panel]")?.dataset.panel;
      if (!panel) return;
      setActive(panel);
      requestAnimationFrame(() => target!.scrollIntoView({ block: "start" }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tabs]);

  const pick = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    // Keep the bar in view: jump back to it when the reader had scrolled down a long panel.
    const el = bar.current;
    if (el && el.getBoundingClientRect().top < 64) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 64 + 1 });
  };

  return (
    <div data-active={active}>
      <style>{tabs.map((t) => `[data-active="${t.id}"] [data-panel]:not([data-panel="${t.id}"]){display:none}`).join("")}</style>
      <div ref={sentinel} aria-hidden />
      {/* Full-width opaque bar: the shadow paints the background edge to edge, the clip keeps it to the bar's height. */}
      <div
        ref={bar}
        className={`sticky top-16 z-30 -mx-4 mb-8 bg-bg px-4 shadow-[0_0_0_100vmax_var(--color-bg)] transition-[box-shadow] [clip-path:inset(0_-100vmax_-24px)] ${
          stuck ? "border-b border-line-strong shadow-[0_0_0_100vmax_var(--color-bg),0_10px_20px_-8px_rgb(0_0_0/0.8)]" : "border-b border-line"
        }`}
      >
        <div role="tablist" className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              role="tab"
              aria-selected={active === t.id}
              onClick={(e) => {
                e.preventDefault();
                pick(t.id);
              }}
              className={`-mb-px whitespace-nowrap border-b-2 px-3 py-3 text-sm transition-colors ${
                active === t.id ? "border-gold font-semibold text-gold" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t.text}
            </a>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
