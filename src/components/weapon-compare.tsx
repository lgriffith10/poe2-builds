"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/client";
import { DEFAULT_SETTINGS, parseWeapon, weaponDps, type Dps, type DpsSettings, type DamageType, type WeaponStats } from "@/lib/weapon-dps";

const TYPE_COLOR: Record<DamageType, string> = {
  physical: "#c8c8c8",
  fire: "#e8794a",
  cold: "#6fb6f0",
  lightning: "#e8d45a",
  chaos: "#c06ae8",
};
const ROWS: (keyof Dps)[] = ["physical", "elemental", "chaos", "total", "withCrit"];
const fmtNum = (n: number) => (n >= 100 ? Math.round(n).toLocaleString() : n.toFixed(1));

export function WeaponCompare() {
  const { t, fmt } = useI18n();
  const tw = t.weapons;
  const [texts, setTexts] = useState(["", ""]);
  const [settings, setSettings] = useState<DpsSettings>(DEFAULT_SETTINGS);
  const weapons = texts.map((x) => (x.trim() ? parseWeapon(x) : null));
  const dps = weapons.map((w) => (w ? weaponDps(w, settings) : null));
  const both = dps[0] && dps[1];
  const set = <K extends keyof DpsSettings>(k: K, v: DpsSettings[K]) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((k) => (
          <div key={k} className="rounded-xl border border-line bg-surface p-4">
            <h2 className="font-display text-lg text-gold">{k === 0 ? tw.weaponA : tw.weaponB}</h2>
            <textarea
              value={texts[k]}
              onChange={(e) => setTexts((xs) => xs.map((x, j) => (j === k ? e.target.value : x)))}
              rows={8}
              aria-label={k === 0 ? tw.weaponA : tw.weaponB}
              placeholder={tw.placeholder}
              className="mt-2 w-full rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs placeholder:text-faint focus:border-gold-soft focus:outline-none"
            />
            {texts[k].trim() && !weapons[k] && <p className="mt-2 text-xs text-red-300">{tw.notWeapon}</p>}
            {weapons[k] && <WeaponSummary w={weapons[k]!} labels={tw} fmt={fmt} />}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-surface p-4">
        <h2 className="font-display text-lg text-gold">{tw.settings}</h2>
        <p className="mt-1 text-xs text-faint">{tw.settingsHint}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <fieldset className="flex flex-wrap items-center gap-3">
            <legend className="sr-only">{tw.counted}</legend>
            <span className="text-[11px] uppercase tracking-wider text-faint">{tw.counted}</span>
            {(Object.keys(settings.types) as DamageType[]).map((type) => (
              <label key={type} className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={settings.types[type]}
                  onChange={(e) => set("types", { ...settings.types, [type]: e.target.checked })}
                  className="accent-[#d4a64f]"
                />
                <span style={{ color: TYPE_COLOR[type] }}>{tw.types[type]}</span>
              </label>
            ))}
          </fieldset>
          {(
            [
              ["critBonus", tw.critBonus],
              ["incPhysical", tw.incPhysical],
              ["incElemental", tw.incElemental],
              ["incChaos", tw.incChaos],
            ] as [keyof DpsSettings, string][]
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <span className="text-muted">{label}</span>
              <input
                type="number"
                min={0}
                max={2000}
                value={settings[key] as number}
                onChange={(e) => set(key, Math.max(0, Number(e.target.value) || 0) as never)}
                className="w-20 rounded-md border border-line bg-surface-2 px-2 py-1 text-right tabular-nums"
              />
              <span className="text-faint">%</span>
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-4 py-2 font-normal">{tw.dps}</th>
              <th className="px-4 py-2 text-right font-normal">{tw.weaponA}</th>
              <th className="px-4 py-2 text-right font-normal">{tw.weaponB}</th>
              <th className="px-4 py-2 text-right font-normal">{tw.difference}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const [a, b] = dps.map((d) => d?.[row] ?? null);
              const diff = a !== null && b !== null && a > 0 ? (b - a) / a : null;
              const main = row === "withCrit";
              return (
                <tr key={row} className={`border-b border-line/60 last:border-0 ${main ? "bg-gold/5 font-semibold" : ""}`}>
                  <td className="px-4 py-2">{tw.rows[row]}</td>
                  {[a, b].map((v, k) => (
                    <td
                      key={k}
                      className={`px-4 py-2 text-right tabular-nums ${both && v !== null && a !== null && b !== null && v === Math.max(a, b) && a !== b ? "text-gold" : ""}`}
                    >
                      {v === null ? "—" : fmtNum(v)}
                    </td>
                  ))}
                  <td className={`px-4 py-2 text-right tabular-nums ${diff === null ? "" : diff > 0 ? "text-emerald-300" : diff < 0 ? "text-red-300" : "text-muted"}`}>
                    {diff === null ? "—" : `${diff > 0 ? "+" : ""}${(diff * 100).toFixed(1)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {both && (
        <p className="text-sm">
          {dps[0]!.withCrit === dps[1]!.withCrit
            ? tw.verdictTie
            : fmt(tw.verdict, {
                w: dps[1]!.withCrit > dps[0]!.withCrit ? tw.weaponB : tw.weaponA,
                p: `${(Math.abs(dps[1]!.withCrit / dps[0]!.withCrit - 1) * 100).toFixed(1)}%`,
              })}
        </p>
      )}
      <p className="text-xs leading-relaxed text-faint">{tw.disclaimer}</p>
    </div>
  );
}

function WeaponSummary({ w, labels, fmt }: { w: WeaponStats; labels: ReturnType<typeof useI18n>["t"]["weapons"]; fmt: ReturnType<typeof useI18n>["fmt"] }) {
  return (
    <div className="mt-3 rounded-lg border border-line bg-surface-2/40 p-3 text-sm">
      {w.name && <p className="font-semibold text-[#e8d77a]">{w.name}</p>}
      {w.base && w.base !== w.name && <p className="text-xs text-muted">{w.base}</p>}
      <ul className="mt-2 space-y-0.5 text-xs">
        {(Object.entries(w.damage) as [DamageType, [number, number]][]).map(([type, [lo, hi]]) => (
          <li key={type}>
            <span style={{ color: TYPE_COLOR[type] }}>{labels.types[type]}</span> : {lo}–{hi}
          </li>
        ))}
        <li className="text-muted">{fmt(labels.critAps, { c: w.crit.toFixed(2), a: w.aps.toFixed(2) })}</li>
      </ul>
    </div>
  );
}
