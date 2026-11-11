import "server-only";
import fs from "node:fs";
import path from "node:path";

interface TradeFile {
  league: string;
  updated: string;
  searches: Record<string, string>;
  links: Record<string, string>;
}

const FILE = path.join(process.cwd(), "src/data/generated/trade.json");
let cache: TradeFile | null | undefined;
const load = () => (cache ??= fs.existsSync(FILE) ? (JSON.parse(fs.readFileSync(FILE, "utf8")) as TradeFile) : null);

/** Link to the trade site search created for this gear piece by `npm run trade:sync`, or null. */
export function tradeLink(key: string): string | null {
  const t = load();
  const id = t && t.links[key] && t.searches[t.links[key]];
  return id ? `https://www.pathofexile.com/trade2/search/poe2/${encodeURIComponent(t.league)}/${id}` : null;
}

export const tradeKey = {
  rare: (slug: string, stage: string, slot: string) => `${slug}|${stage}|${slot}`,
  unique: (name: string) => `unique|${name}`,
};
