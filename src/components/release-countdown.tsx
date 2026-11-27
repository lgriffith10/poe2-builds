"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";

/**
 * Time left before the 1.0 launch. While the hour is not announced it counts whole days to the date; once
 * `launchAt` is set it counts down to the minute. Rendered after mount (the static page does not know the time).
 */
export function ReleaseCountdown({ at, exact, className = "" }: { at: string; exact: boolean; className?: string }) {
  const { t, fmt } = useI18n();
  const tr = t.release.countdown;
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, exact ? 1000 : 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [exact]);
  if (now === null) return <span className={className}>&nbsp;</span>;
  const left = new Date(at).getTime() - now;
  if (left <= 0) return <span className={className}>{tr.live}</span>;
  const days = Math.floor(left / 86_400_000);
  if (!exact) return <span className={className}>{days <= 0 ? tr.today : fmt(days === 1 ? tr.day : tr.days, { n: days + 1 })}</span>;
  const h = Math.floor((left % 86_400_000) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  return (
    <span className={`tabular-nums ${className}`}>
      {days > 0 && `${days} ${tr.d} `}
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}
