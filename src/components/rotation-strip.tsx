import Link from "next/link";
import type { Gem } from "@/lib/types";
import { GemIcon } from "./ui";

export interface RotationGem extends Pick<Gem, "id" | "name" | "icon" | "color"> {
  /** Hover-card data (lib/tips.ts), shown by the enclosing TipScope. */
  tip: string;
}
export interface RotationView {
  name: string;
  steps: { gem: RotationGem; count?: number; label?: string }[];
}

/**
 * A skill rotation drawn as numbered gem icons joined by arrows, with "×N" for repeated casts and the source's note
 * under the icon. Plain component (no hooks): usable from server pages and from client components.
 */
export function RotationStrip({ rotation, gemsHref }: { rotation: RotationView; gemsHref: string }) {
  return (
    <div className="rounded-xl border border-line bg-[linear-gradient(180deg,#17130e,#110e0b)] p-4">
      <p className="font-display text-sm font-semibold tracking-wide text-gold">{rotation.name}</p>
      <ol className="mt-3 flex flex-wrap items-start gap-y-4">
        {rotation.steps.map((step, i) => (
          <li key={i} className="flex items-start">
            {i > 0 && (
              <span aria-hidden className="mx-1.5 mt-5 text-lg leading-none text-gold-soft sm:mx-2.5">
                ›
              </span>
            )}
            <Link
              href={`${gemsHref}#${step.gem.id}`}
              data-tip={step.gem.tip}
              className="group flex w-[5.5rem] flex-col items-center text-center"
            >
              <span className="relative">
                <span className="block rounded-lg ring-1 ring-line transition group-hover:ring-gold-soft">
                  <GemIcon gem={step.gem} size={52} />
                </span>
                <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-gold-soft bg-bg text-[10px] font-bold text-gold">
                  {i + 1}
                </span>
                {step.count && (
                  <span className="absolute -bottom-1.5 -right-2 rounded bg-gold px-1 text-[10px] font-bold text-black">×{step.count}</span>
                )}
              </span>
              <span className="mt-1.5 text-xs font-medium leading-tight text-ink group-hover:text-gold">{step.gem.name}</span>
              {step.label && <span className="mt-0.5 text-[10px] leading-tight text-muted">{step.label}</span>}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
