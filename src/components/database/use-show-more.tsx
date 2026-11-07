"use client";

import { useI18n } from "@/i18n/client";
import { useEffect, useState } from "react";

/**
 * Renders long lists progressively. Items targeted by the URL hash (#id) are always
 * revealed so links from build guides land on the right card.
 */
export function useShowMore<T extends { id: string }>(items: T[], pageSize: number) {
  const { t, fmt } = useI18n();
  const [page, setPage] = useState({ items, limit: pageSize });
  // Reset the page when the filtered list changes (derived state, no effect needed).
  if (page.items !== items) setPage({ items, limit: pageSize });
  const limit = page.items === items ? page.limit : pageSize;

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const index = items.findIndex((i) => i.id === id);
      if (index >= pageSize) setPage({ items, limit: index + 1 });
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "center" }));
    });
    return () => cancelAnimationFrame(frame);
    // Only on first render: later filtering should not jump around.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = items.slice(0, limit);
  const more =
    items.length > limit ? (
      <button
        type="button"
        onClick={() => setPage({ items, limit: limit + pageSize })}
        className="mx-auto mt-6 block rounded-lg border border-line-strong px-5 py-2 text-sm text-muted hover:border-gold-soft hover:text-gold"
      >
        {fmt(t.common.showMore, { n: items.length - limit })}
      </button>
    ) : null;
  return { visible, more };
}
