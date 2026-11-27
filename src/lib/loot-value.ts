// Loot value: reads a pasted list of drops (free lines like "12x Divine Orb", or items copied in game with Ctrl+C)
// and prices each one with the poe.ninja snapshot (prices.json). Client-safe: the price table is passed in.

export interface PricedName {
  name: string;
  /** Price of one, in Divine Orbs. */
  div: number;
  icon: string | null;
  kind: "currency" | "unique";
  href: string | null;
}

export interface LootRow extends PricedName {
  count: number;
  total: number;
}

export interface LootResult {
  rows: LootRow[];
  /** Lines that named nothing we have a price for. */
  unknown: string[];
  total: number;
}

const QTY_BEFORE = /^(\d[\d\s.,]*)\s*[x×]?\s+(.+)$/i;
const QTY_AFTER = /^(.+?)\s*(?:[x×]\s*|\s)(\d[\d\s.,]*)$/i;
const qty = (s: string) => Number(s.replace(/[\s.,]/g, "")) || 1;

/** Finds a priced name, also accepting plurals ("Exalted Orbs") and any letter case. */
function lookup(table: Map<string, PricedName>, raw: string): PricedName | undefined {
  const k = raw.trim().toLowerCase();
  return table.get(k) ?? (k.endsWith("s") ? table.get(k.slice(0, -1)) : undefined) ?? (k.endsWith("es") ? table.get(k.slice(0, -2)) : undefined);
}

/** One item copied in game (blocks separated by "--------"): its name and stack size. */
function readCopied(block: string): { name: string; count: number } | null {
  const lines = block.split("\n").map((l) => l.trim());
  const rarity = lines.findIndex((l) => /^Rarity:/i.test(l));
  if (rarity < 0) return null;
  const name = lines[rarity + 1];
  const stack = block.match(/Stack Size:\s*([\d\s.,]+)\s*\//i);
  return name ? { name, count: stack ? qty(stack[1]) : 1 } : null;
}

export function priceLoot(text: string, names: PricedName[]): LootResult {
  const table = new Map(names.map((n) => [n.name.toLowerCase(), n]));
  const found = new Map<string, LootRow>();
  const unknown: string[] = [];
  const add = (p: PricedName, count: number) => {
    const row = found.get(p.name) ?? { ...p, count: 0, total: 0 };
    row.count += count;
    row.total = row.count * row.div;
    found.set(p.name, row);
  };

  // Items copied in game come as blocks starting with "Item Class:"; everything else is read line by line.
  const chunks = text.replace(/\r/g, "").split(/\n(?=Item Class:)/);
  for (const chunk of chunks) {
    if (/^Item Class:/m.test(chunk.trimStart().split("\n")[0])) {
      const item = readCopied(chunk);
      const p = item && lookup(table, item.name);
      if (p) add(p, item.count);
      else if (item) unknown.push(item.name);
      continue;
    }
    for (const raw of chunk.split("\n")) {
      const line = raw.replace(/^[-•*\s]+/, "").trim();
      if (!line || /^-+$/.test(line)) continue;
      let p = lookup(table, line);
      let count = 1;
      if (!p) {
        const before = line.match(QTY_BEFORE);
        const after = line.match(QTY_AFTER);
        if (before && (p = lookup(table, before[2]))) count = qty(before[1]);
        else if (after && (p = lookup(table, after[1]))) count = qty(after[2]);
      }
      if (p) add(p, count);
      else unknown.push(line);
    }
  }
  const rows = [...found.values()].sort((a, b) => b.total - a.total);
  return { rows, unknown, total: rows.reduce((s, r) => s + r.total, 0) };
}
