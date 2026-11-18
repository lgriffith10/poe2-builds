import type { Demand } from "@/lib/mechanics";

const ORDER: Demand[] = ["clear", "single", "tank", "speed"];

/** What a mechanic asks of a build: one three-segment bar per demand (clear, single target, defences, mobility). */
export function DemandMeters({
  demands,
  labels,
  levels,
  compact = false,
}: {
  demands: Record<Demand, 1 | 2 | 3>;
  labels: Record<Demand, string>;
  levels: Record<1 | 2 | 3, string>;
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5" : "mt-3 space-y-2.5"}>
      {ORDER.map((d) => (
        <li key={d} className="text-sm">
          <div className="flex items-baseline justify-between gap-2">
            <span className={compact ? "text-xs text-muted" : "text-muted"}>{labels[d]}</span>
            {!compact && <span className="text-xs text-faint">{levels[demands[d]]}</span>}
          </div>
          <div className="mt-1 flex gap-1" role="img" aria-label={`${labels[d]}: ${levels[demands[d]]}`}>
            {[1, 2, 3].map((i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= demands[d] ? "bg-gold" : "bg-line"}`} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
