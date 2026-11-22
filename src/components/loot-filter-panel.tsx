"use client";

import { useState } from "react";
import type { FilterRuleKind, FilterStyle } from "@/lib/loot-filter";

/** CSS colours for the in-game beam / minimap icon colour names. */
const GAME_COLORS: Record<string, string> = {
  Red: "#ff3b3b", Green: "#4cdc5a", Blue: "#4a7dff", Brown: "#b5763a", White: "#ffffff", Yellow: "#ffe14a",
  Cyan: "#3fdcff", Grey: "#a0a0a0", Orange: "#ff9a2e", Pink: "#ff7ad9", Purple: "#b06bff",
};
const SHAPES: Record<string, string> = { Star: "★", Diamond: "◆", Circle: "●", Triangle: "▲", Square: "■", Hexagon: "⬢" };
const css = ([r, g, b, a]: number[]) => `rgba(${r}, ${g}, ${b}, ${a / 255})`;

/** Rough look of a drop label in game: solid label, beam above it, minimap icon beside it. */
function DropLabel({ sample, style }: { sample: string; style: FilterStyle }) {
  const beam = GAME_COLORS[style.beam] ?? "#fff";
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col items-center">
        <span
          aria-hidden
          className={`h-7 w-1.5 rounded-full ${style.temp ? "opacity-60" : ""}`}
          style={{ background: `linear-gradient(to top, ${beam}, transparent)`, boxShadow: `0 0 10px ${beam}` }}
        />
        <span
          className="whitespace-nowrap border-2 px-2 py-0.5 font-semibold"
          style={{
            color: css(style.text),
            borderColor: css(style.border),
            background: css(style.background),
            fontSize: `${Math.round(style.size / 3.2)}px`,
          }}
        >
          {sample}
        </span>
      </div>
      <span aria-hidden className="mb-1" style={{ color: GAME_COLORS[style.icon.color], fontSize: `${18 - style.icon.size * 4}px` }}>
        {SHAPES[style.icon.shape] ?? "●"}
      </span>
    </div>
  );
}

export interface LootFilterLabels {
  intro: string;
  soft: string;
  strict: string;
  strictHint: string;
  download: string;
  copy: string;
  copied: string;
  snippetHint: string;
  install: string;
  targets: string;
  preview: string;
  beamTemp: string;
  sound: string;
  kinds: Record<FilterRuleKind, string>;
}

/** Download / copy the build's item filter (generated at build time, see lib/loot-filter). */
export function LootFilterPanel({
  fileName,
  soft,
  strict,
  snippet,
  summary,
  preview,
  labels,
}: {
  fileName: string;
  soft: string;
  strict: string;
  snippet: string;
  /** What the rules highlight, already formatted. */
  summary: string[];
  preview: { kind: FilterRuleKind; sample: string; style: FilterStyle }[];
  labels: LootFilterLabels;
}) {
  const [mode, setMode] = useState<"soft" | "strict">("soft");
  const [copied, setCopied] = useState(false);
  const download = () => {
    const blob = new Blob([mode === "soft" ? soft : strict], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}${mode === "strict" ? "-strict" : ""}.filter`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const copy = () =>
    navigator.clipboard?.writeText(snippet).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => undefined,
    );

  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-sm">
      <p className="text-muted">{labels.intro}</p>
      {summary.length > 0 && (
        <div className="mt-2">
          <p className="text-[11px] uppercase tracking-wider text-faint">{labels.targets}</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {summary.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface-2 px-2 py-0.5 text-xs">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
      {preview.length > 0 && (
        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-wider text-faint">{labels.preview}</p>
          <ul className="mt-2 grid gap-3 rounded-lg bg-[#0b0a09] p-3 sm:grid-cols-2">
            {preview.map((p) => (
              <li key={p.kind} className="min-w-0">
                <p className="mb-1 text-[11px] text-faint">
                  {labels.kinds[p.kind]}
                  {p.style.temp && ` · ${labels.beamTemp}`}
                  {p.style.sound && ` · ${labels.sound}`}
                </p>
                <div className="overflow-hidden">
                  <DropLabel sample={p.sample} style={p.style} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div role="radiogroup" className="inline-flex rounded-md border border-line p-0.5 text-xs">
          {(["soft", "strict"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              className={`rounded px-2.5 py-1 ${mode === m ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {labels[m]}
            </button>
          ))}
        </div>
        <button type="button" onClick={download} className="rounded-md bg-gold px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110">
          ⬇ {labels.download}
        </button>
        <button type="button" onClick={copy} className="rounded-md border border-line px-3 py-1.5 text-sm hover:border-gold-soft">
          {copied ? `✓ ${labels.copied}` : labels.copy}
        </button>
      </div>
      {mode === "strict" && <p className="mt-2 text-xs text-faint">{labels.strictHint}</p>}
      <p className="mt-2 text-xs text-faint">{labels.snippetHint}</p>
      <p className="mt-1 text-xs text-faint">{labels.install}</p>
    </div>
  );
}
