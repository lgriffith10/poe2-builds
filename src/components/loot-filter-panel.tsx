"use client";

import { useState } from "react";

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
}

/** Download / copy the build's item filter (generated at build time, see lib/loot-filter). */
export function LootFilterPanel({
  fileName,
  soft,
  strict,
  snippet,
  summary,
  labels,
}: {
  fileName: string;
  soft: string;
  strict: string;
  snippet: string;
  /** What the rules highlight, already formatted. */
  summary: string[];
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
