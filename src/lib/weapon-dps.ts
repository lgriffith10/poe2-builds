// Weapon DPS from an item copied in game (Ctrl+C), English or French client. This is the weapon's own damage: hits per
// second times average hit, by damage type, with optional build multipliers. It ignores the skill, the passive tree and
// support gems, so it ranks weapons for a build that scales the same types, not the build's real DPS.

export const DAMAGE_TYPES = ["physical", "fire", "cold", "lightning", "chaos"] as const;
export type DamageType = (typeof DAMAGE_TYPES)[number];
export const ELEMENTAL: DamageType[] = ["fire", "cold", "lightning"];

export interface WeaponStats {
  name: string | null;
  base: string | null;
  itemClass: string | null;
  /** Min-max per damage type (summed when a type appears twice). */
  damage: Partial<Record<DamageType, [number, number]>>;
  /** Critical hit chance, in %. */
  crit: number;
  /** Attacks per second. */
  aps: number;
}

const num = (s: string) => Number(s.replace(",", "."));
const TYPE_WORDS: [RegExp, DamageType][] = [
  [/physical|physiques?/i, "physical"],
  [/fire|feu/i, "fire"],
  [/cold|froid/i, "cold"],
  [/lightning|foudre/i, "lightning"],
  [/chaos/i, "chaos"],
];
const typeOf = (s: string) => TYPE_WORDS.find(([re]) => re.test(s))?.[1] ?? null;

/** "12-20 (augmented), 5-30 (lightning)" -> [[12, 20, "augmented"], [5, 30, "lightning"]] */
function ranges(s: string): [number, number, string][] {
  return [...s.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:-|à|to)\s*(\d+(?:[.,]\d+)?)\s*(?:\(([^)]*)\))?/g)].map((m) => [num(m[1]), num(m[2]), m[3] ?? ""]);
}

export function parseWeapon(raw: string): WeaponStats | null {
  const lines = raw.replace(/\r/g, "").split("\n").map((l) => l.replace(/[  ]/g, " ").trim());
  const w: WeaponStats = { name: null, base: null, itemClass: null, damage: {}, crit: 0, aps: 0 };
  const add = (type: DamageType, lo: number, hi: number) => {
    const prev = w.damage[type] ?? [0, 0];
    w.damage[type] = [prev[0] + lo, prev[1] + hi];
  };
  // Header: class, rarity, then name and base until the first separator.
  const sep = lines.findIndex((l) => /^-{4,}$/.test(l));
  const head = lines.slice(0, sep < 0 ? lines.length : sep).filter(Boolean);
  w.itemClass = head.find((l) => /^(Item Class|Classe d['’]objet)\s*:/i.test(l))?.split(":")[1]?.trim() ?? null;
  const titles = head.filter((l) => !/^(Item Class|Rarity|Classe d['’]objet|Rareté)\s*:/i.test(l));
  w.name = titles[0] ?? null;
  w.base = titles[1] ?? titles[0] ?? null;

  for (const l of lines) {
    const m = l.match(/^([^:]+?)\s*:\s*(.+)$/);
    if (!m) continue;
    const [label, value] = [m[1], m[2]];
    if (/^(Critical Hit Chance|Critical Strike Chance|Chances? de coup critique)/i.test(label)) w.crit = num(value.match(/[\d.,]+/)?.[0] ?? "0");
    else if (/^(Attacks per Second|Attaques par seconde)/i.test(label)) w.aps = num(value.match(/[\d.,]+/)?.[0] ?? "0");
    else if (/^(Elemental Damage|Dégâts élémentaires)/i.test(label)) {
      // Each range may carry its element in brackets; untagged ones count as fire (only the elemental total matters then).
      for (const [lo, hi, tag] of ranges(value)) add(typeOf(tag) ?? "fire", lo, hi);
    } else if (/(Damage|Dégâts)/i.test(label) && !/\b(per|par)\b|Reload|Rechargement/i.test(label)) {
      const type = typeOf(label);
      if (type) for (const [lo, hi] of ranges(value)) add(type, lo, hi);
    }
  }
  return w.aps > 0 && Object.keys(w.damage).length ? w : null;
}

export interface DpsSettings {
  /** Damage types the build scales (others are ignored). */
  types: Record<DamageType, boolean>;
  /** Extra critical damage bonus, in % (PoE2 base: +100%). */
  critBonus: number;
  /** Build's increased damage per type group, in %. */
  incPhysical: number;
  incElemental: number;
  incChaos: number;
}

export const DEFAULT_SETTINGS: DpsSettings = {
  types: { physical: true, fire: true, cold: true, lightning: true, chaos: true },
  critBonus: 100,
  incPhysical: 0,
  incElemental: 0,
  incChaos: 0,
};

export interface Dps {
  physical: number;
  elemental: number;
  chaos: number;
  /** Sum of the counted types. */
  total: number;
  /** Total with critical hits averaged in. */
  withCrit: number;
}

export function weaponDps(w: WeaponStats, s: DpsSettings): Dps {
  const avg = (t: DamageType) => {
    const d = w.damage[t];
    return d && s.types[t] ? ((d[0] + d[1]) / 2) * w.aps : 0;
  };
  const physical = avg("physical") * (1 + s.incPhysical / 100);
  const elemental = ELEMENTAL.reduce((sum, t) => sum + avg(t), 0) * (1 + s.incElemental / 100);
  const chaos = avg("chaos") * (1 + s.incChaos / 100);
  const total = physical + elemental + chaos;
  return { physical, elemental, chaos, total, withCrit: total * (1 + (Math.min(100, w.crit) / 100) * (s.critBonus / 100)) };
}
