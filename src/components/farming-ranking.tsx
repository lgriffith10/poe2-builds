import Link from "next/link";
import { FARMING_GUIDE, MECHANIC_INFO, type Fit, type MechanicFit } from "@/lib/farming";

const FIT_STYLE: Record<Fit, string> = {
  great: "border-[#7fbf6a]/60 bg-[#7fbf6a]/10 text-[#9fd88c]",
  good: "border-gold-soft text-gold",
  fair: "border-line-strong text-muted",
  poor: "border-[#e07a6a]/60 bg-[#e07a6a]/10 text-[#e8968a]",
};

/** The endgame mechanics ranked for one build (see lib/farming.ts), each linking to its section of the farming guide. */
export function FarmingRanking({
  ranking,
  labels,
  path,
}: {
  ranking: MechanicFit[];
  labels: { fit: Record<Fit, string>; guide: string; intro: string };
  path: (p: string) => string;
}) {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">{labels.intro}</p>
      <ol className="space-y-2">
        {ranking.map((m, i) => {
          const info = MECHANIC_INFO[m.id];
          return (
            <li key={m.id} className="flex gap-3 rounded-lg border border-line bg-surface p-3">
              <span className="w-5 shrink-0 text-center font-display text-lg text-gold">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold">{info.name}</p>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${FIT_STYLE[m.fit]}`}>{labels.fit[m.fit]}</span>
                  <Link href={path(`${FARMING_GUIDE}#${info.anchor}`)} className="ml-auto text-xs text-gold hover:underline">
                    {labels.guide} →
                  </Link>
                </div>
                <p className="mt-1 text-sm text-muted">{m.reasons.join(" ")}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
