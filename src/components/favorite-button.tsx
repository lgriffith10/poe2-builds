"use client";

import { useI18n } from "@/i18n/client";
import { useFavorites } from "@/lib/favorites";

/** Star toggling a build in the browser's favorites; `labeled` adds the text next to the star. */
export function FavoriteButton({
  slug,
  title,
  labeled = false,
}: {
  slug: string;
  title: string;
  labeled?: boolean;
}) {
  const { t, fmt } = useI18n();
  const { favorites, toggle } = useFavorites();
  const on = favorites.has(slug);
  const label = fmt(on ? t.favorites.remove : t.favorites.add, { title });
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={on}
      aria-label={label}
      title={label}
      className={
        labeled
          ? `inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-sm ${
              on
                ? "border-gold-soft bg-gold/10 text-gold"
                : "border-line-strong text-muted hover:border-gold-soft hover:text-gold"
            }`
          : `inline-flex h-8 w-8 items-center justify-center rounded-md border bg-surface/80 ${
              on
                ? "border-gold-soft text-gold"
                : "border-line text-faint hover:border-gold-soft hover:text-gold"
            }`
      }
    >
      <Star filled={on} />
      {labeled && <span>{on ? t.favorites.saved : t.favorites.save}</span>}
    </button>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
    >
      <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" />
    </svg>
  );
}
