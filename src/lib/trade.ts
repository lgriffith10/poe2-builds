import "server-only";
import statsJson from "@/data/generated/trade-stats.json";
import { prices } from "./prices";
import { TradeQueries, type TradeStat } from "./trade-query";
import type { GearPiece, GearSlot } from "./types";

/** A prefilled trade site search; the browser adds the level filter and turns it into a link. */
export interface TradeSearch {
  league: string;
  query: object;
}

let queries: TradeQueries | null = null;

export function tradeSearch(slot: GearSlot, piece: GearPiece, ordered: boolean): TradeSearch | null {
  queries ??= new TradeQueries(statsJson as TradeStat[]);
  const query = queries.query(slot, piece, ordered);
  return query ? { league: prices.league, query } : null;
}
