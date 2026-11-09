"use client";

import { useState } from "react";

/** Categorical slots for the dark surface, in fixed order (validated: CVD and contrast on #15120e). */
const SERIES = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"];
const W = 720, H = 260, PAD = { l: 44, r: 128, t: 12, b: 28 };

export interface TrendSeries {
  name: string;
  /** null: not in that snapshot's top list (drawn as a gap). */
  values: (number | null)[];
}

/** Share of the ladder over time, one line per entry, crosshair tooltip on hover, data table for screen readers. */
export function MetaTrendChart({ title, labels, series, tableLabel }: { title: string; labels: string[]; series: TrendSeries[]; tableLabel: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(0.05, ...series.flatMap((s) => s.values.filter((v): v is number => v !== null)));
  const top = Math.ceil(max * 20) / 20; // round up to 5 %
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(1, labels.length - 1);
  const y = (v: number) => PAD.t + (1 - v / top) * (H - PAD.t - PAD.b);
  const ticks = Array.from({ length: Math.round(top / 0.05) + 1 }, (_, k) => k * 0.05).filter((_, k, a) => a.length <= 6 || k % 2 === 0);
  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  // Direct labels at the line ends, nudged apart so they never overlap.
  const ends = series.map((s, k) => ({ k, y: y(s.values.at(-1) ?? 0) })).sort((a, b) => a.y - b.y);
  /** Runs of consecutive known values, one polyline each. */
  const runs = (values: (number | null)[]) => {
    const out: string[][] = [[]];
    values.forEach((v, i) => (v === null ? out.at(-1)!.length && out.push([]) : out.at(-1)!.push(`${x(i)},${y(v)}`)));
    return out.filter((r) => r.length);
  };
  for (let j = 1; j < ends.length; j++) if (ends[j].y - ends[j - 1].y < 13) ends[j].y = ends[j - 1].y + 13;
  const endY = new Map(ends.map((e) => [e.k, e.y]));

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - PAD.l) / (W - PAD.l - PAD.r)) * (labels.length - 1));
    setHover(i >= 0 && i < labels.length ? i : null);
  };

  return (
    <figure className="rounded-xl border border-line bg-surface p-4">
      <figcaption className="text-sm font-semibold">{title}</figcaption>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-hidden>
        {series.map((s, k) => (
          <li key={s.name} className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 rounded-full" style={{ background: SERIES[k] }} />
            {s.name}
          </li>
        ))}
      </ul>
      <div className="relative mt-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={title} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          {ticks.map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="var(--color-line)" strokeWidth={1} />
              <text x={PAD.l - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--color-faint)">
                {Math.round(v * 100)}%
              </text>
            </g>
          ))}
          {labels.map((l, i) => (
            <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize={10} fill="var(--color-faint)">
              {l}
            </text>
          ))}
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H - PAD.b} stroke="var(--color-line-strong)" strokeWidth={1} />}
          {series.map((s, k) => (
            <g key={s.name}>
              {runs(s.values).map((pts, j) =>
                pts.length === 1 ? (
                  <circle key={j} cx={pts[0].split(",")[0]} cy={pts[0].split(",")[1]} r={2} fill={SERIES[k]} />
                ) : (
                  <polyline key={j} points={pts.join(" ")} fill="none" stroke={SERIES[k]} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                ),
              )}
              {hover !== null && s.values[hover] !== null && (
                <circle cx={x(hover)} cy={y(s.values[hover]!)} r={4} fill={SERIES[k]} stroke="var(--color-surface)" strokeWidth={2} />
              )}
              <text x={W - PAD.r + 8} y={endY.get(k)! + 3} fontSize={10} fill="var(--color-muted)">
                {s.name.length > 20 ? `${s.name.slice(0, 19)}…` : s.name}
              </text>
            </g>
          ))}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 w-48 rounded-lg border border-line-strong bg-surface-2 p-2 text-xs shadow-xl shadow-black/50"
            style={{ left: `${Math.min(70, (x(hover) / W) * 100)}%` }}
          >
            <p className="mb-1 font-semibold">{labels[hover]}</p>
            {series
              .map((s, k) => ({ s, k }))
              .sort((a, b) => (b.s.values[hover] ?? -1) - (a.s.values[hover] ?? -1))
              .map(({ s, k }) => (
                <p key={s.name} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: SERIES[k] }} />
                  <span className="flex-1 truncate text-muted">{s.name}</span>
                  <span className="tabular-nums">{s.values[hover] === null ? "—" : pct(s.values[hover]!)}</span>
                </p>
              ))}
          </div>
        )}
      </div>
      <details className="mt-2 text-xs">
        <summary className="cursor-pointer text-faint">{tableLabel}</summary>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full tabular-nums">
            <thead>
              <tr className="text-faint">
                <th className="py-1 pr-2 text-left font-normal" />
                {labels.map((l) => (
                  <th key={l} className="px-1 py-1 text-right font-normal">
                    {l}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {series.map((s) => (
                <tr key={s.name} className="border-t border-line/60">
                  <td className="py-1 pr-2 text-muted">{s.name}</td>
                  {s.values.map((v, i) => (
                    <td key={i} className="px-1 py-1 text-right">
                      {v === null ? "—" : pct(v)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
