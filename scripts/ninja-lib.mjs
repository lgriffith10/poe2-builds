// Minimal client for poe.ninja's public PoE2 build data, used only by offline scripts (never at runtime).
//
// - /poe2/api/data/index-state            JSON: leagues and the current snapshot version of each
// - /poe2/api/builds/<version>/search     protobuf: ladder aggregates (classes, skills, items...) for a filter
// - /poe2/api/builds/dictionary/<hash>    "NDIC" string table that maps aggregate keys to names
// - /poe2/api/builds/<version>/character  JSON: one character (passives, skills, items)

const BASE = "https://poe.ninja/poe2/api";
const HEADERS = { "user-agent": "ExileCodex data sync (offline script)" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let last = 0;

// Polite client: at most one request per second; on 429 it honours Retry-After (and gives up when that is long).
async function get(url, as = "json") {
  for (let attempt = 0; ; attempt++) {
    await sleep(Math.max(0, last + 1000 - Date.now()));
    last = Date.now();
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.status === 429) {
        // Cloudflare says how long to wait; retrying earlier only extends the block.
        const wait = Number(res.headers.get("retry-after") ?? 60);
        if (wait > 120 || attempt >= 3) throw new Error(`poe.ninja rate limit: retry in ${Math.ceil(wait / 60)} min (${url})`);
        await sleep(wait * 1000);
        continue;
      }
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return as === "json" ? res.json() : Buffer.from(await res.arrayBuffer());
    } catch (e) {
      if (attempt >= 3) throw e;
      await sleep(2000 * (attempt + 1));
    }
  }
}

// --- protobuf wire format (schema-less) -------------------------------------------------------

function varint(b, p) {
  let r = 0, mul = 1, x;
  do {
    x = b[p++];
    r += (x & 0x7f) * mul;
    mul *= 128;
  } while (x & 0x80);
  return [r, p];
}

/** Decodes one message into { field: [values] }; length-delimited values stay as Buffers. */
function message(b) {
  const out = {};
  let p = 0;
  while (p < b.length) {
    let key;
    [key, p] = varint(b, p);
    const f = Math.floor(key / 8), t = key % 8;
    let v;
    if (t === 0) [v, p] = varint(b, p);
    else if (t === 2) {
      let len;
      [len, p] = varint(b, p);
      v = b.subarray(p, p + len);
      p += len;
    } else if (t === 5) { v = b.readFloatLE(p); p += 4; }
    else if (t === 1) { v = b.readDoubleLE(p); p += 8; }
    else throw new Error(`unsupported wire type ${t}`);
    (out[f] ??= []).push(v);
  }
  return out;
}
const str = (m, f) => m[f]?.[0]?.toString("utf8");
const num = (m, f) => m[f]?.[0] ?? 0;

// --- NDIC dictionaries -------------------------------------------------------------------------

/** Entry count at offset 12, then one varint length per entry, then the UTF-8 strings back to back. */
export function parseNdic(b) {
  if (b.toString("latin1", 0, 4) !== "NDIC") throw new Error("not an NDIC dictionary");
  const count = b.readUInt32LE(12);
  for (let p = 16; p < b.length; p++) {
    const lens = [];
    let q = p, ok = true;
    for (let k = 0; k < count && ok; k++) {
      if (q >= b.length) { ok = false; break; }
      let v;
      [v, q] = varint(b, q);
      lens.push(v);
    }
    if (!ok || q + lens.reduce((a, c) => a + c, 0) !== b.length) continue;
    return lens.map((l) => b.toString("utf8", q, (q += l)));
  }
  throw new Error("could not locate the NDIC string table");
}

const dictionaries = new Map();
async function dictionary(hash) {
  if (!dictionaries.has(hash)) dictionaries.set(hash, parseNdic(await get(`${BASE}/builds/dictionary/${hash}`, "buffer")));
  return dictionaries.get(hash);
}

// --- public API --------------------------------------------------------------------------------

/** Snapshot info for a build league url (e.g. "forbiddenrites"). */
export async function snapshot(leagueUrl) {
  const state = await get(`${BASE}/data/index-state`);
  const s = state.snapshotVersions.find((x) => x.url === leagueUrl);
  if (!s) throw new Error(`League "${leagueUrl}" not found on poe.ninja`);
  return { league: s.name, version: s.version, overview: s.snapshotName };
}

/**
 * Ladder aggregates for a filter (e.g. { class: "Titan", skills: "Earthshatter" }).
 * Returns the character count and, per dimension (class, skills, items, keypassives, allskills...),
 * the entries sorted by count.
 */
export async function search(snap, filters = {}) {
  const qs = new URLSearchParams({ overview: snap.overview, ...filters });
  const root = message(message(await get(`${BASE}/builds/${snap.version}/search?${qs}`, "buffer"))[1][0]);
  const hashes = {};
  for (const d of root[6] ?? []) {
    const m = message(d);
    hashes[str(m, 1)] = str(m, 2);
  }
  const dims = {};
  for (const d of root[2] ?? []) {
    const m = message(d);
    const names = await dictionary(hashes[str(m, 2)]);
    dims[str(m, 1)] = (m[3] ?? [])
      .map((row) => {
        const r = message(row);
        return { name: names[num(r, 1)], count: num(r, 2) };
      })
      .sort((a, b) => b.count - a.count);
  }
  return { total: num(root, 1), dims };
}

/** Top characters (name, account) returned with a search, in poe.ninja's order. */
export async function characters(snap, filters = {}) {
  const qs = new URLSearchParams({ overview: snap.overview, ...filters });
  const root = message(message(await get(`${BASE}/builds/${snap.version}/search?${qs}`, "buffer"))[1][0]);
  const cols = {};
  for (const c of root[12] ?? []) {
    const m = message(c);
    cols[str(m, 1)] = (m[7] ?? []).map((v) => v.toString("utf8"));
  }
  return (cols.name ?? []).map((name, i) => ({ name, account: cols.account?.[i] }));
}

/** Full data of one character. */
export function character(snap, account, name) {
  const qs = new URLSearchParams({ account, name, overview: snap.overview });
  return get(`${BASE}/builds/${snap.version}/character?${qs}`);
}
