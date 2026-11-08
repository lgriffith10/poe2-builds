"use client";

// Game-style hover cards for gems and uniques.
// The server embeds each link's data in a `data-tip` attribute (see lib/tips.ts); TipScope listens for hover/focus
// on those links anywhere inside it and shows one positioned card.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { RefTip } from "@/lib/types";

const GAP = 10;
const MARGIN = 12;

const GEM_TYPE: Record<Extract<RefTip, { kind: "gem" }>["type"], string> = {
  active: "Skill Gem",
  support: "Support Gem",
  spirit: "Spirit Gem",
};

/** Rendered guide Markdown whose [[Name]] references show hover cards. */
export function RefTooltips({ html, className }: { html: string; className?: string }) {
  return (
    <TipScope>
      <section className={className} dangerouslySetInnerHTML={{ __html: html }} />
    </TipScope>
  );
}

/** Shows a hover card for every `a[data-tip]` link inside it. Do not nest scopes. */
export function TipScope({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ data: RefTip; anchor: HTMLElement } | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const show = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("a[data-tip]");
      if (!a || !el.contains(a)) return;
      try {
        setTip({ data: JSON.parse(a.dataset.tip!) as RefTip, anchor: a });
      } catch {
        setTip(null);
      }
    };
    const hide = (e: Event) => {
      const a = (e.target as HTMLElement).closest("a[data-tip]");
      const next = (e as MouseEvent).relatedTarget as Node | null;
      if (a && (!next || !a.contains(next))) setTip(null);
    };
    el.addEventListener("mouseover", show);
    el.addEventListener("mouseout", hide);
    el.addEventListener("focusin", show);
    el.addEventListener("focusout", hide);
    const clear = () => setTip(null);
    window.addEventListener("scroll", clear, { passive: true });
    return () => {
      el.removeEventListener("mouseover", show);
      el.removeEventListener("mouseout", hide);
      el.removeEventListener("focusin", show);
      el.removeEventListener("focusout", hide);
      window.removeEventListener("scroll", clear);
    };
  }, []);

  // Place the card above the link, or below it when there is no room; keep it inside the viewport.
  useLayoutEffect(() => {
    if (!tip || !card.current) return setPos(null);
    const a = tip.anchor.getBoundingClientRect();
    const { width, height } = card.current.getBoundingClientRect();
    const left = Math.min(Math.max(a.left + a.width / 2 - width / 2, MARGIN), window.innerWidth - width - MARGIN);
    const above = a.top - GAP - height;
    const top = above >= MARGIN ? above : Math.min(a.bottom + GAP, window.innerHeight - height - MARGIN);
    setPos({ left, top });
  }, [tip]);

  return (
    <>
      <div ref={root} className={className}>
        {children}
      </div>
      {tip && (
        <div
          ref={card}
          role="tooltip"
          className="poe-tip pointer-events-none fixed z-50 w-80 max-w-[calc(100vw-1.5rem)]"
          style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: "hidden" }}
        >
          {tip.data.kind === "gem" ? <GemCard gem={tip.data} /> : <UniqueCard item={tip.data} />}
        </div>
      )}
    </>
  );
}

function GemCard({ gem }: { gem: Extract<RefTip, { kind: "gem" }> }) {
  const tags = gem.tags.filter((t) => t !== "support" && !["strength", "dexterity", "intelligence"].includes(t));
  const multi = (gem.sets?.length ?? 0) > 1;
  return (
    <>
      <div className="poe-tip-head poe-tip-head-gem">
        <span className="poe-tip-name">{gem.name}</span>
      </div>
      <div className="poe-tip-body">
        <div className="flex items-center gap-3">
          {gem.icon && (
            <img src={gem.icon} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-contain" />
          )}
          <div className="text-left">
            {tags.length > 0 && <p className="poe-tip-tags">{tags.map(cap).join(", ")}</p>}
            <p className="poe-tip-prop">
              {GEM_TYPE[gem.type]} <span className="text-white">· Tier {gem.tier}</span>
              {gem.type !== "support" && (gem.sets || gem.props) ? <span> · Level 20</span> : null}
            </p>
          </div>
        </div>
        {gem.props && (
          <>
            <hr className="poe-tip-sep poe-tip-sep-gem" />
            <Props props={gem.props} />
          </>
        )}
        {(gem.desc ?? gem.text) && (
          <>
            <hr className="poe-tip-sep poe-tip-sep-gem" />
            <p className="poe-tip-desc">{gem.desc ?? gem.text}</p>
          </>
        )}
        {gem.sets?.map((set, i) => (
          <div key={i}>
            <hr className="poe-tip-sep poe-tip-sep-gem" />
            {multi && set.label && <p className="poe-tip-set">{set.label}</p>}
            {set.props && <Props props={set.props} />}
            {set.lines.map((l) => (
              <p key={l} className="poe-tip-mod">
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Props({ props }: { props: [string, string][] }) {
  return (
    <>
      {props.map(([k, v]) => (
        <p key={k} className="poe-tip-prop">
          {k}: <span className="text-white">{v}</span>
        </p>
      ))}
    </>
  );
}

function UniqueCard({ item }: { item: Extract<RefTip, { kind: "unique" }> }) {
  const kind = item.category.split(":").pop()!.trim();
  return (
    <>
      <div className="poe-tip-head poe-tip-head-unique">
        <span className="poe-tip-name">{item.name}</span>
        <span className="poe-tip-name">{item.base}</span>
      </div>
      <div className="poe-tip-body">
        {item.icon && <img src={item.icon} alt="" className="mx-auto mb-2 max-h-20 object-contain" />}
        <p className="poe-tip-prop">{kind}</p>
        {item.level != null && (
          <p className="poe-tip-prop">
            Requires Level <span className="text-white">{item.level}</span>
          </p>
        )}
        {item.implicits.length > 0 && (
          <>
            <hr className="poe-tip-sep poe-tip-sep-unique" />
            {item.implicits.map((m) => (
              <p key={m} className="poe-tip-mod">
                {m}
              </p>
            ))}
          </>
        )}
        {item.mods.length > 0 && (
          <>
            <hr className="poe-tip-sep poe-tip-sep-unique" />
            {item.mods.map((m) => (
              <p key={m} className="poe-tip-mod">
                {m}
              </p>
            ))}
          </>
        )}
      </div>
    </>
  );
}

const cap = (s: string) => s.replace(/(^|[\s_-])\w/g, (c) => c.toUpperCase()).replace(/_/g, " ");
