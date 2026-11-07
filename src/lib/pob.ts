// Path of Building (PoE2) export codes: base64url-encoded, zlib-compressed XML.
// Parsing is string-based so it runs both in the browser and in Node tests.
import type { GearSlot, SkillGroup } from "./types";

export interface PobItem {
  rarity: string;
  name: string;
  base: string;
  mods: string[];
}

export interface PobCharacter {
  className: string;
  ascendancy: string | null;
  level: number;
  treeVersion: string | null;
  nodes: number[];
  /** Gem groups in the active skill set; the first gem of each group is the one PoB lists first. */
  skills: SkillGroup[];
  items: Partial<Record<GearSlot, PobItem>>;
}

const SLOT_MAP: Record<string, GearSlot> = {
  "Weapon 1": "weapon",
  "Weapon 2": "offhand",
  Helmet: "helmet",
  "Body Armour": "body",
  Gloves: "gloves",
  Boots: "boots",
  Amulet: "amulet",
  "Ring 1": "ring1",
  "Ring 2": "ring2",
  Belt: "belt",
};

const unescapeXml = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&");

const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? unescapeXml(m[1]) : null;
};

/** Extracts the code from a raw code, a pobb.in URL or a URL ending with the code. */
export function extractPobbId(input: string): string | null {
  const m = input.trim().match(/^https?:\/\/pobb\.in\/([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

export async function decodePobCode(code: string): Promise<string> {
  const b64 = code.trim().replace(/-/g, "+").replace(/_/g, "/").replace(/\s+/g, "");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
  return new Response(stream).text();
}

function parseItemText(text: string): PobItem {
  const lines = unescapeXml(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const rarity = (lines.find((l) => l.startsWith("Rarity:"))?.slice(7).trim() ?? "NORMAL").toUpperCase();
  const rest = lines.filter((l) => !l.startsWith("Rarity:"));
  const named = rarity === "RARE" || rarity === "UNIQUE";
  const name = rest[0] ?? "";
  const base = named ? (rest[1] ?? "") : name;
  const body = rest.slice(named ? 2 : 1);
  const implicitsIdx = body.findIndex((l) => /^Implicits:/.test(l));
  const modLines = implicitsIdx >= 0 ? body.slice(implicitsIdx + 1) : body.filter((l) => !/^[A-Za-z ]+:/.test(l));
  const mods = modLines
    .filter((l) => !/^(ModRange|<)/.test(l))
    .map((l) => l.replace(/\{[^}]*\}/g, "").trim())
    .filter(Boolean);
  return { rarity, name, base, mods };
}

export function parsePobXml(xml: string): PobCharacter {
  const build = xml.match(/<Build\b[^>]*>/)?.[0];
  if (!build) throw new Error("This does not look like a Path of Building export.");

  // Tree: the active spec.
  const treeTag = xml.match(/<Tree\b[^>]*>/)?.[0] ?? "";
  const activeSpec = Number(attr(treeTag, "activeSpec") ?? 1);
  const specs = [...xml.matchAll(/<Spec\b[^>]*>/g)].map((m) => m[0]);
  const spec = specs[activeSpec - 1] ?? specs[0] ?? "";
  const nodes = (attr(spec, "nodes") ?? "")
    .split(",")
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0);

  // Skills: the active skill set, enabled groups only.
  const skillsTag = xml.match(/<Skills\b[^>]*>/)?.[0] ?? "";
  const activeSet = attr(skillsTag, "activeSkillSet") ?? "1";
  const setBody =
    xml.match(new RegExp(`<SkillSet\\b[^>]*\\bid="${activeSet}"[^>]*>([\\s\\S]*?)</SkillSet>`))?.[1] ??
    xml.match(/<Skills\b[^>]*>([\s\S]*?)<\/Skills>/)?.[1] ??
    "";
  const skills: SkillGroup[] = [];
  for (const m of setBody.matchAll(/<Skill\b([^>]*)>([\s\S]*?)<\/Skill>/g)) {
    if (attr(m[1], "enabled") === "false") continue;
    const gems = [...m[2].matchAll(/<Gem\b[^>]*>/g)]
      .map((g) => g[0])
      .filter((g) => attr(g, "enabled") !== "false")
      .map((g) => attr(g, "nameSpec"))
      .filter((n): n is string => Boolean(n));
    if (gems.length) skills.push({ gem: gems[0], supports: gems.slice(1) });
  }

  // Items: text by id, then slots of the active item set.
  const itemText = new Map<string, string>();
  for (const m of xml.matchAll(/<Item\b([^>]*)>([\s\S]*?)<\/Item>/g)) {
    const id = attr(m[1], "id");
    if (id) itemText.set(id, m[2]);
  }
  const itemsTag = xml.match(/<Items\b[^>]*>/)?.[0] ?? "";
  const activeItemSet = attr(itemsTag, "activeItemSet") ?? "1";
  const setXml =
    xml.match(new RegExp(`<ItemSet\\b[^>]*\\bid="${activeItemSet}"[^>]*>([\\s\\S]*?)</ItemSet>`))?.[1] ?? xml;
  const items: PobCharacter["items"] = {};
  for (const m of setXml.matchAll(/<Slot\b[^>]*>/g)) {
    const slot = SLOT_MAP[attr(m[0], "name") ?? ""];
    const id = attr(m[0], "itemId");
    if (!slot || !id || id === "0" || !itemText.has(id)) continue;
    items[slot] = parseItemText(itemText.get(id)!);
  }

  const asc = attr(build, "ascendClassName");
  return {
    className: attr(build, "className") ?? "",
    ascendancy: asc && asc !== "None" ? asc : null,
    level: Number(attr(build, "level") ?? 1),
    treeVersion: attr(spec, "treeVersion"),
    nodes,
    skills,
    items,
  };
}
