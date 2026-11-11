/**
 * Creates official trade site searches for every build's gear and stores their ids in src/data/generated/trade.json.
 * The trade site ignores searches passed in a link (?q=…) and only opens ids created by its API, hence this script.
 *
 *   npm run trade:sync              all builds, campaign gear first, then uniques, then the rest
 *   npm run trade:sync -- --max 50  stop after 50 new searches
 *
 * Searches are cached by query: a rerun only creates the missing ones. Changing league starts over.
 * The API allows about 30 searches per 5 minutes and 600 per 6 hours: the script waits between requests and stops
 * (progress saved) when the next window is too far away; just run it again later.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { getBuilds } from "@/lib/builds";
import { TradeQueries, type TradeStat } from "@/lib/trade-query";
import { GEAR_SLOTS, type GearSet } from "@/lib/types";

const OUT = path.join(process.cwd(), "src/data/generated/trade.json");
const API = "https://www.pathofexile.com/api/trade2";
const HEADERS = { "User-Agent": "poe2-builds static site generator (trade search links)", "Content-Type": "application/json" };
const MAX_WAIT_S = 15 * 60;

interface TradeFile {
  league: string;
  updated: string;
  /** Query hash -> search id. */
  searches: Record<string, string>;
  /** "<slug>|<stage>|<slot>" and "unique|<name>" -> query hash. */
  links: Record<string, string>;
}

const args = process.argv.slice(2);
const max = args.includes("--max") ? Number(args[args.indexOf("--max") + 1]) : Infinity;
const league: string = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data/generated/prices.json"), "utf8")).league;

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
const hash = (q: object) => crypto.createHash("sha1").update(JSON.stringify(q)).digest("hex").slice(0, 16);

const previous: TradeFile | null = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : null;
const data: TradeFile = previous?.league === league ? { ...previous, links: {} } : { league, updated: "", searches: {}, links: {} };

async function main() {
  const stats: TradeStat[] = (await (await fetch(`${API}/data/stats`, { headers: HEADERS })).json()).result.flatMap(
    (g: { entries: TradeStat[] }) => g.entries,
  );
  const tq = new TradeQueries(stats);

  // Collect every query, campaign stages first (players need them the most), then uniques, then everything else.
  const queries = new Map<string, { q: object; rank: number }>();
  const add = (key: string, q: object | null, rank: number) => {
    if (!q) return;
    const h = hash(q);
    data.links[key] = h;
    const prev = queries.get(h);
    if (!prev || prev.rank > rank) queries.set(h, { q, rank });
  };
  for (const b of getBuilds()) {
    const stages: [string, GearSet][] = Object.keys(b.gearStages).length
      ? Object.entries(b.gearStages).map(([s, g]) => [s, g!])
      : [["default", b.gear]];
    for (const [stage, gear] of stages)
      for (const slot of GEAR_SLOTS) {
        const piece = gear[slot];
        if (!piece) continue;
        const q = tq.query(slot, piece, b.origin === "guide");
        if (piece.unique) add(`unique|${piece.unique}`, q, 1);
        else add(`${b.slug}|${stage}|${slot}`, q, stage === "campaign" ? 0 : 2);
      }
  }

  const todo = [...queries.entries()].filter(([h]) => !data.searches[h]).sort((a, b) => a[1].rank - b[1].rank);
  console.log(`${league}: ${queries.size} searches, ${queries.size - todo.length} cached, ${todo.length} to create.`);

  const save = () => {
    data.updated = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(OUT, JSON.stringify(data, null, 1) + "\n");
  };

  /** Seconds to wait before the next request, from the X-Rate-Limit headers ("max:period:penalty" per rule). */
  function waitFor(res: Response): number {
    const rules = (res.headers.get("x-rate-limit-ip") ?? "").split(",").filter(Boolean);
    const state = (res.headers.get("x-rate-limit-ip-state") ?? "").split(",").filter(Boolean);
    let wait = 0;
    rules.forEach((rule, i) => {
      const [maxHits, period] = rule.split(":").map(Number);
      const [hits, , penalty] = (state[i] ?? "0:0:0").split(":").map(Number);
      if (penalty > 0) wait = Math.max(wait, penalty);
      else if (hits >= maxHits - 1) wait = Math.max(wait, period);
    });
    return wait;
  }

  let created = 0;
  let failed = 0;
  for (const [h, { q }] of todo) {
    if (created >= max) break;
    const res = await fetch(`${API}/search/poe2/${encodeURIComponent(league)}`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ query: q, sort: { price: "asc" } }),
    });
    if (res.status === 429) {
      const retry = Number(res.headers.get("retry-after") ?? 60);
      console.log(`Rate limited for ${retry}s.`);
      if (retry > MAX_WAIT_S) break;
      await sleep(retry + 1);
      continue; // the query stays out of `searches`, a rerun picks it up
    }
    const body = await res.json().catch(() => ({}));
    if (res.ok && body.id) {
      data.searches[h] = body.id;
      created++;
      if (created % 10 === 0) {
        save();
        console.log(`${created}/${todo.length}`);
      }
    } else {
      failed++;
      console.warn(`Search failed (${res.status}): ${JSON.stringify(body.error ?? body).slice(0, 200)} for ${JSON.stringify(q).slice(0, 200)}`);
    }
    const wait = waitFor(res);
    if (wait > MAX_WAIT_S) {
      console.log(`Next search allowed in ${Math.round(wait / 60)} min: stopping here, run again later.`);
      break;
    }
    await sleep(Math.max(wait, 2));
  }
  save();
  console.log(`Created ${created}, failed ${failed}, ${todo.length - created - failed} left.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
