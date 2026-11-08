// Encodes planner state into a compact, URL-safe string (stored in the URL hash).
import { GEAR_SLOTS, type GearSlot, type PlannerState, type WeaponSet } from "./types";

const VERSION = 1;

interface Encoded {
  v: number;
  c: number;
  a: number;
  /** sorted node ids, delta-encoded in base 36 and joined with "." */
  n: string;
  /** attribute choices: "<index in sorted node list>:<choice>" pairs */
  at?: string;
  /** weapon-set nodes: "<index in sorted node list>:<set>" pairs */
  ws?: string;
  s?: [string, ...string[]][];
  g?: Record<string, string>;
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code: string): string {
  const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

export function encodeBuild(state: PlannerState): string {
  const sorted = [...state.nodes].sort((a, b) => a - b);
  let prev = 0;
  const n = sorted
    .map((id) => {
      const d = id - prev;
      prev = id;
      return d.toString(36);
    })
    .join(".");
  const at = sorted
    .map((id, i) => (state.attributes[id] !== undefined ? `${i.toString(36)}:${state.attributes[id]}` : null))
    .filter(Boolean)
    .join(".");
  const ws = sorted
    .map((id, i) => (state.weaponSets?.[id] ? `${i.toString(36)}:${state.weaponSets[id]}` : null))
    .filter(Boolean)
    .join(".");
  const payload: Encoded = { v: VERSION, c: state.classIndex, a: state.ascIndex, n };
  if (at) payload.at = at;
  if (ws) payload.ws = ws;
  const skills = state.skills.filter((s) => s.gem);
  if (skills.length) payload.s = skills.map((s) => [s.gem, ...s.supports]);
  const gear = Object.fromEntries(Object.entries(state.gear).filter(([, v]) => v));
  if (Object.keys(gear).length) payload.g = gear;
  return toBase64Url(JSON.stringify(payload));
}

export function decodeBuild(code: string): PlannerState | null {
  try {
    const p = JSON.parse(fromBase64Url(code)) as Encoded;
    if (p.v !== VERSION) return null;
    let acc = 0;
    const nodes = p.n ? p.n.split(".").map((d) => (acc += parseInt(d, 36))) : [];
    const attributes: Record<number, number> = {};
    for (const pair of p.at?.split(".") ?? []) {
      const [i, choice] = pair.split(":");
      const id = nodes[parseInt(i, 36)];
      if (id !== undefined) attributes[id] = Number(choice);
    }
    const weaponSets: Record<number, WeaponSet> = {};
    for (const pair of p.ws?.split(".") ?? []) {
      const [i, set] = pair.split(":");
      const id = nodes[parseInt(i, 36)];
      if (id !== undefined && (set === "1" || set === "2")) weaponSets[id] = Number(set) as WeaponSet;
    }
    const gear: PlannerState["gear"] = {};
    for (const [slot, name] of Object.entries(p.g ?? {})) {
      if ((GEAR_SLOTS as readonly string[]).includes(slot)) gear[slot as GearSlot] = name;
    }
    return {
      classIndex: p.c,
      ascIndex: p.a,
      nodes,
      ...(Object.keys(weaponSets).length && { weaponSets }),
      attributes,
      skills: (p.s ?? []).map(([gem, ...supports]) => ({ gem, supports })),
      gear,
    };
  } catch {
    return null;
  }
}
