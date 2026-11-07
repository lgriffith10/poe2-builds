"use client";

// Gem and item lookup data, fetched once on demand from /data/catalog.json (see scripts/sync-data.mjs)
// instead of being embedded in every page that needs it.
import { useEffect, useState } from "react";
import type { Gem } from "./types";

export type GemInfo = Pick<Gem, "name" | "icon" | "color" | "type" | "id">;
export interface ItemInfo {
  name: string;
  class: string;
  icon: string | null;
  unique: boolean;
  id: string;
}

export interface Catalog {
  gems: GemInfo[];
  items: ItemInfo[];
  gemByName: Map<string, GemInfo>;
  itemByName: Map<string, ItemInfo>;
}

type RawCatalog = {
  gems: [string, string | null, Gem["color"], Gem["type"], string][];
  items: [string, string, string | null, 0 | 1, string][];
};

let pending: Promise<Catalog> | null = null;

export function loadCatalog(): Promise<Catalog> {
  pending ??= fetch("/data/catalog.json")
    .then((r) => (r.ok ? (r.json() as Promise<RawCatalog>) : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then((raw) => {
      const gems = raw.gems.map(([name, icon, color, type, id]) => ({ name, icon, color, type, id }));
      const items = raw.items.map(([name, cls, icon, unique, id]) => ({ name, class: cls, icon, unique: unique === 1, id }));
      return {
        gems,
        items,
        gemByName: new Map(gems.map((g) => [g.name.toLowerCase(), g])),
        // Uniques first so a unique wins over a base type with the same name.
        itemByName: new Map([...items].reverse().map((i) => [i.name.toLowerCase(), i])),
      };
    })
    .catch((e) => {
      pending = null;
      throw e;
    });
  return pending;
}

/** Returns the catalog once loaded (null until then). Pass `enabled: false` to defer the request. */
export function useCatalog(enabled = true): Catalog | null {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadCatalog()
      .then((c) => alive && setCatalog(c))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [enabled]);
  return catalog;
}
