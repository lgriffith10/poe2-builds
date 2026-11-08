"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/client";
import type { Gem } from "@/lib/types";
import { ClassEmblem, GemIcon } from "./ui";

export interface MetaRow {
  name: string;
  count: number;
  /** Gem for skills, item art for uniques. */
  gem?: Pick<Gem, "name" | "icon" | "color">;
  icon?: string | null;
}
export interface MetaAscendancy {
  name: string;
  className: string;
  count: number;
  skills: MetaRow[];
  uniques: MetaRow[];
  keystones: MetaRow[];
  guides: { slug: string; title: string }[];
}

const LOCALES = { en: "en-US", fr: "fr-FR" } as const;
type Formats = { pct: (n: number, of: number) => string; int: (n: number) => string };
const formats = (locale: string): Formats => ({
  pct: (n, of) =>
    new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: n / of >= 0.1 ? 0 : 1 }).format(n / of),
  int: (n) => n.toLocaleString(locale),
});

/** Ranked horizontal bars: one hue, value as text, share of `of` on hover. */
function Bars({ rows, of, unit, f }: { rows: MetaRow[]; of: number; unit: string; f: Formats }) {
  const { pct, int } = f;
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <ul className="space-y-1.5">
      {rows.map((r) => (
        <li
          key={r.name}
          className="group grid grid-cols-[minmax(0,11rem)_1fr_3.5rem] items-center gap-3 rounded-md px-1.5 py-1 hover:bg-surface-2"
          title={`${r.name}: ${int(r.count)} ${unit} (${pct(r.count, of)})`}
        >
          <span className="flex min-w-0 items-center gap-2 text-sm">
            {r.gem ? (
              <GemIcon gem={r.gem} size={22} />
            ) : r.icon ? (
              <img src={r.icon} alt="" width={22} height={22} loading="lazy" className="h-[22px] w-[22px] object-contain" />
            ) : r.icon === null ? (
              <span className="h-[22px] w-[22px] shrink-0" />
            ) : null}
            <span className="truncate">{r.name}</span>
          </span>
          <span className="h-2 overflow-hidden rounded-r bg-line/40">
            <span className="block h-full rounded-r bg-gold/80 group-hover:bg-gold" style={{ width: `${(100 * r.count) / max}%` }} />
          </span>
          <span className="text-right text-xs tabular-nums text-muted">{pct(r.count, of)}</span>
        </li>
      ))}
    </ul>
  );
}

export function LadderMeta({
  total,
  ascendancies,
  overall,
}: {
  total: number;
  ascendancies: MetaAscendancy[];
  overall: { skills: MetaRow[]; uniques: MetaRow[]; keystones: MetaRow[] };
}) {
  const { t, fmt, path, lang } = useI18n();
  const f = formats(LOCALES[lang]);
  const { pct, int } = f;
  const [selected, setSelected] = useState<string | null>(null);
  const asc = ascendancies.find((a) => a.name === selected);
  const scope = asc ?? { ...overall, count: total };
  const max = Math.max(...ascendancies.map((a) => a.count));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <section>
        <h2 className="font-display text-lg text-gold">{t.ladderMeta.ascendancies}</h2>
        <p className="mb-3 text-xs text-faint">{t.ladderMeta.ascendanciesHint}</p>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className={`w-full rounded-md px-2 py-1.5 text-left text-sm ${!selected ? "bg-surface-2 text-gold" : "text-muted hover:text-ink"}`}
            >
              {t.ladderMeta.allLadder} · {int(total)}
            </button>
          </li>
          {ascendancies.map((a) => (
            <li key={a.name}>
              <button
                type="button"
                aria-pressed={selected === a.name}
                onClick={() => setSelected(selected === a.name ? null : a.name)}
                title={`${a.name}: ${int(a.count)} (${pct(a.count, total)})`}
                className={`grid w-full grid-cols-[minmax(0,10rem)_1fr_3rem] items-center gap-2 rounded-md px-2 py-1 text-left text-sm ${
                  selected === a.name ? "bg-surface-2 text-gold" : "hover:bg-surface-2"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <ClassEmblem name={a.className} size={20} />
                  <span className="truncate">{a.name}</span>
                </span>
                <span className="h-2 overflow-hidden rounded-r bg-line/40">
                  <span className="block h-full rounded-r bg-gold/80" style={{ width: `${(100 * a.count) / max}%` }} />
                </span>
                <span className="text-right text-xs tabular-nums text-muted">{pct(a.count, total)}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="min-w-0 space-y-8">
        <div>
          <h2 className="font-display text-2xl text-gold">{asc ? asc.name : t.ladderMeta.allLadder}</h2>
          <p className="text-sm text-muted">
            {fmt(t.ladderMeta.characters, { n: int(scope.count) })}
            {asc && ` · ${fmt(t.ladderMeta.shareOfLadder, { p: pct(asc.count, total) })}`}
          </p>
          {asc && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-faint">{t.ladderMeta.ourGuides}</span>
              {asc.guides.length ? (
                asc.guides.map((g) => (
                  <Link key={g.slug} href={path(`/builds/${g.slug}`)} className="rounded-md border border-line px-2 py-0.5 hover:border-gold-soft hover:text-gold">
                    {g.title}
                  </Link>
                ))
              ) : (
                <span className="text-faint">{t.ladderMeta.noGuide}</span>
              )}
            </div>
          )}
        </div>
        <div className="grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">{t.ladderMeta.skills}</h3>
            <Bars rows={scope.skills} of={scope.count} unit={t.ladderMeta.unit} f={f} />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">{t.ladderMeta.uniques}</h3>
            <Bars rows={scope.uniques} of={scope.count} unit={t.ladderMeta.unit} f={f} />
          </div>
          <div>
            <h3 className="mb-2 font-semibold">{t.ladderMeta.keystones}</h3>
            <Bars rows={scope.keystones} of={scope.count} unit={t.ladderMeta.unit} f={f} />
          </div>
        </div>
        <p className="text-xs text-faint">{t.ladderMeta.shareNote}</p>
      </section>
    </div>
  );
}
