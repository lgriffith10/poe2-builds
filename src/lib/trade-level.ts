"use client";

import { useSyncExternalStore } from "react";

// Player level used to cap the required level of trade searches, kept in this browser only.
const KEY = "exile-codex:trade-level";
const listeners = new Set<() => void>();

const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return ""; // Storage unavailable (private mode, blocked site data).
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

/** The saved level (1-100) or null, and a setter that keeps it for the next visits. */
export function useTradeLevel(): [number | null, (value: string) => void] {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const n = Number(raw);
  const level = raw && n >= 1 && n <= 100 ? n : null;
  const set = (value: string) => {
    const v = Math.round(Number(value));
    try {
      if (v >= 1 && v <= 100) localStorage.setItem(KEY, String(v));
      else localStorage.removeItem(KEY);
    } catch {
      // Storage unavailable: the level is not kept.
    }
    listeners.forEach((l) => l());
  };
  return [level, set];
}
