"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Thin gold bar at the top of the screen while a page is loading after a click: some pages take a moment to render
// (a build page in particular), and without it the click seems to do nothing.

const START = "exile-codex:nav-start";

/** Starts the bar for a navigation made in code (router.push), not by clicking a link. */
export function startNavProgress() {
  window.dispatchEvent(new Event(START));
}

/** Only shown when loading takes longer than this, so instant (prefetched) navigations do not flash. */
const DELAY = 150;
/** Gives up if the page never changes (a link that ends up on the same page). */
const TIMEOUT = 15000;

type Phase = "idle" | "loading" | "done";

export function NavProgress() {
  const pathname = usePathname();
  const [phase, setPhaseState] = useState<Phase>("idle");
  const [grow, setGrow] = useState(false);
  const timers = useRef<number[]>([]);
  const active = useRef(false);
  const shown = useRef<Phase>("idle");
  const setPhase = (p: Phase) => {
    shown.current = p;
    setPhaseState(p);
  };

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    const start = () => {
      clear();
      active.current = true;
      timers.current.push(
        window.setTimeout(() => {
          setGrow(false);
          setPhase("loading");
          // Next frame: let the bar render at 0 before it grows.
          requestAnimationFrame(() => requestAnimationFrame(() => setGrow(true)));
        }, DELAY),
        window.setTimeout(() => {
          active.current = false;
          setPhase("idle");
        }, TIMEOUT),
      );
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      // Same page (anchors, query changes) or another site: nothing to wait for here.
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      start();
    };
    // Capture phase: <Link> cancels the default action of the click before it would bubble up to the document.
    document.addEventListener("click", onClick, true);
    window.addEventListener(START, start);
    return () => {
      clear();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START, start);
    };
  }, []);

  // The new page is in: finish the bar, then hide it.
  useEffect(() => {
    if (!active.current) return;
    active.current = false;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (shown.current === "idle") return; // Faster than the delay: the bar never showed.
    setPhase("done");
    timers.current.push(window.setTimeout(() => setPhase("idle"), 400));
  }, [pathname]);

  if (phase === "idle") return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5">
      <div
        className="h-full bg-gold shadow-[0_0_8px_var(--color-gold)]"
        style={{
          width: phase === "done" ? "100%" : grow ? "85%" : "0%",
          opacity: phase === "done" ? 0 : 1,
          transition:
            phase === "done"
              ? "width 200ms ease-out, opacity 200ms ease-out 200ms"
              : grow
                ? "width 8s cubic-bezier(0.1, 0.6, 0.2, 1)"
                : "none",
        }}
      />
    </div>
  );
}
