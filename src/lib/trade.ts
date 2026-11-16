import "server-only";
import statsJson from "@/data/generated/trade-stats.json";
import { prices } from "./prices";
import { TradeQueries, type TradeRole, type TradeStat } from "./trade-query";
import type { GearPiece, GearSlot } from "./types";

/** A prefilled trade site search; the browser adds the level filter and turns it into a link. */
export interface TradeSearch {
  league: string;
  query: object;
  /** For each modifier the guide lists on a rare: required by the search, one of the rest, or not searched. */
  roles: TradeRole[];
  /** Result order when not the cheapest first (physical DPS for weapons the guide wants "High Physical DPS" on). */
  sort?: Record<string, string>;
}

let queries: TradeQueries | null = null;

const tradeQueries = () => (queries ??= new TradeQueries(statsJson as TradeStat[]));

/** `grantedSkills`: skills the build uses that this item's base grants. */
export function tradeSearch(slot: GearSlot, piece: GearPiece, ordered: boolean, grantedSkills: string[] = []): TradeSearch | null {
  const search = tradeQueries().query(slot, piece, ordered, grantedSkills);
  return search ? { league: prices.league, ...search } : null;
}

/** Trade site wording of a granted skill's level line ("Grants Skill: Level # Skeletal Warrior Minion"). */
export function grantedSkillLine(skill: string): string {
  return tradeQueries().grantedSkill(skill)?.[0] ?? `Grants Skill: Level # ${skill}`;
}
