"use client";

import { useMemo, useSyncExternalStore } from "react";

// Favorite build slugs, kept in this browser only (localStorage, shared between tabs and pages).
const KEY = "exile-codex:favorites";
const listeners = new Set<() => void>();

const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]"; // Storage unavailable (private mode, blocked site data).
  }
};

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
};

/** Favorite build slugs, most recently added last, and a toggle that persists them. */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const favorites = useMemo(() => {
    try {
      const list = JSON.parse(raw);
      return new Set<string>(Array.isArray(list) ? list.filter((x) => typeof x === "string") : []);
    } catch {
      return new Set<string>();
    }
  }, [raw]);
  const toggle = (slug: string) => {
    const next = new Set(favorites);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    try {
      localStorage.setItem(KEY, JSON.stringify([...next]));
    } catch {
      // Storage unavailable: the favorite is simply not kept.
    }
    listeners.forEach((l) => l());
  };
  return { favorites, toggle };
}
