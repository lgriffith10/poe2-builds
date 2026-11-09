// Crafting simulator logic (pure, no React). Data comes from public/data/craft.json (scripts/craft-data.mjs).
//
// Real spawn weights are not public, so every eligible modifier tier is treated as equally likely. Rules covered:
// prefix/suffix limits, one mod per group, item level, Greater/Perfect minimum mod level, the main omens, essences,
// desecration (from the separate desecrated pool, with the abyssal lord and Necromancy omens) and the one-crafted-mod /
// one-desecrated-mod limits.

export type Affix = "P" | "S";
/** [affix, group, level, text, affix name, origin?]: origin "d" for desecrated mods, "d:<lord>" for an abyssal lord's. */
export type RawMod = [Affix, string, number, string, string, string?];
export type Lord = "ulaman" | "amanamu" | "kurgal";
export const LORDS: { lord: Lord; name: string; omen: string }[] = [
  { lord: "ulaman", name: "Ulaman", omen: "Omen of the Sovereign" },
  { lord: "amanamu", name: "Amanamu", omen: "Omen of the Liege" },
  { lord: "kurgal", name: "Kurgal", omen: "Omen of the Blackblooded" },
];
export interface CraftData {
  mods: RawMod[];
  sets: number[][];
  /** Desecrated pool of each set (same order as `sets`). */
  desecrated?: number[][];
  /** base name -> [item class, level requirement, icon, pool index] */
  bases: Record<string, [string, number, string | null, number]>;
  /** Currency / omen / essence name -> icon (Greater and Perfect orbs share the base orb's art). */
  icons: Record<string, string>;
  /** French stat key -> English stat text, French base name -> English base name (from the trade site). */
  fr?: { stats: Record<string, string>; bases: Record<string, string>; text: Record<string, string> };
}

export type Rarity = "normal" | "magic" | "rare";
export interface ItemMod {
  i: number;
  /** Roll position (0..1) inside each value range of the mod text. */
  r?: number;
  crafted?: boolean;
  desecrated?: boolean;
}
export interface Item {
  base: string;
  ilvl: number;
  rarity: Rarity;
  mods: ItemMod[];
}
export type CurrencyTier = "normal" | "greater" | "perfect";
/** Minimum modifier level added by Greater and Perfect currencies (Maxroll's crafting guide: 44 and 70). */
export const TIER_MIN_LEVEL: Record<CurrencyTier, number> = { normal: 0, greater: 44, perfect: 70 };

export const LIMITS: Record<Rarity, Record<Affix, number>> = {
  normal: { P: 0, S: 0 },
  magic: { P: 1, S: 1 },
  rare: { P: 3, S: 3 },
};

/** Essences and the mod groups they guarantee (the ones covered by Maxroll's crafting guide). */
export const ESSENCES: { name: string; groups: string[] }[] = [
  { name: "Essence of the Body", groups: ["IncreasedLife"] },
  { name: "Essence of the Mind", groups: ["IncreasedMana"] },
  { name: "Essence of Insulation", groups: ["FireResistance"] },
  { name: "Essence of Thawing", groups: ["ColdResistance"] },
  { name: "Essence of Grounding", groups: ["LightningResistance"] },
  { name: "Essence of Ruin", groups: ["ChaosResistance"] },
  { name: "Essence of Haste", groups: ["MovementVelocity"] },
  { name: "Essence of Opulence", groups: ["ItemFoundRarityIncrease", "ItemFoundRarityIncreasePrefix"] },
  { name: "Essence of the Infinite", groups: ["Strength", "Dexterity", "Intelligence"] },
];

export type Rng = () => number;
const pickOne = <T,>(list: T[], rng: Rng): T => list[Math.floor(rng() * list.length)];

export class Crafter {
  constructor(readonly data: CraftData) {}

  mod(i: number) {
    const [affix, group, level, text, name, origin] = this.data.mods[i];
    const desecrated = Boolean(origin?.startsWith("d"));
    const lord = (origin?.split(":")[1] as Lord | undefined) ?? null;
    return { affix, group, level, text, name, desecrated, lord };
  }
  /** Mods that regular currency can add. */
  pool(base: string): number[] {
    const b = this.data.bases[base];
    return b ? this.data.sets[b[3]] : [];
  }
  /** Mods that desecration can reveal (a separate pool, mostly tied to an abyssal lord). */
  desecratedPool(base: string): number[] {
    const b = this.data.bases[base];
    return b ? (this.data.desecrated?.[b[3]] ?? []) : [];
  }
  /** Lord omens only work on weapons and jewellery. */
  lordOmensApply(base: string) {
    const cls = this.data.bases[base]?.[0] ?? "";
    return !/Helmet|Body Armour|Gloves|Boots|Shield|Buckler|Focus|Quiver|Belt/.test(cls);
  }
  count(item: Item, affix: Affix) {
    return item.mods.filter((m) => this.mod(m.i).affix === affix).length;
  }
  free(item: Item, rarity: Rarity = item.rarity): Record<Affix, number> {
    return { P: LIMITS[rarity].P - this.count(item, "P"), S: LIMITS[rarity].S - this.count(item, "S") };
  }

  /** Modifier tiers that could be added to `item` (as `rarity`), optionally restricted. */
  candidates(
    item: Item,
    opts: { rarity?: Rarity; minLevel?: number; affix?: Affix; groups?: string[]; desecrated?: boolean; lord?: Lord } = {},
  ): number[] {
    const rarity = opts.rarity ?? item.rarity;
    const free = this.free(item, rarity);
    const taken = new Set(item.mods.map((m) => this.mod(m.i).group));
    return (opts.desecrated ? this.desecratedPool(item.base) : this.pool(item.base)).filter((i) => {
      const m = this.mod(i);
      return (
        (!opts.lord || m.lord === opts.lord) &&
        m.level <= item.ilvl &&
        m.level >= (opts.minLevel ?? 0) &&
        free[m.affix] > 0 &&
        !taken.has(m.group) &&
        (!opts.affix || m.affix === opts.affix) &&
        (!opts.groups || opts.groups.includes(m.group))
      );
    });
  }

  /** Chance that one random pick among `cands` belongs to `targets` (equal weights). */
  hitChance(cands: number[], targets: Set<string>) {
    if (!cands.length || !targets.size) return 0;
    return cands.filter((i) => targets.has(this.mod(i).group)).length / cands.length;
  }

  private add(item: Item, cands: number[], rng: Rng, flags: Partial<ItemMod> = {}): Item {
    if (!cands.length) return item;
    return { ...item, mods: [...item.mods, { i: pickOne(cands, rng), r: rng(), ...flags }] };
  }

  /** Indices (in item.mods) that a removal can hit. */
  removable(item: Item, opts: { affix?: Affix; lowest?: boolean } = {}): number[] {
    let idx = item.mods.map((_, k) => k).filter((k) => !opts.affix || this.mod(item.mods[k].i).affix === opts.affix);
    if (opts.lowest && idx.length) {
      const min = Math.min(...idx.map((k) => this.mod(item.mods[k].i).level));
      idx = idx.filter((k) => this.mod(item.mods[k].i).level === min);
    }
    return idx;
  }
  /** Chance that a removal takes away a wanted modifier. */
  loseChance(item: Item, targets: Set<string>, opts: { affix?: Affix; lowest?: boolean } = {}) {
    const idx = this.removable(item, opts);
    if (!idx.length) return 0;
    return idx.filter((k) => targets.has(this.mod(item.mods[k].i).group)).length / idx.length;
  }
  private remove(item: Item, rng: Rng, opts: { affix?: Affix; lowest?: boolean } = {}): Item {
    const idx = this.removable(item, opts);
    if (!idx.length) return item;
    const k = pickOne(idx, rng);
    return { ...item, mods: item.mods.filter((_, j) => j !== k) };
  }

  hasCrafted = (item: Item) => item.mods.some((m) => m.crafted);
  hasDesecrated = (item: Item) => item.mods.some((m) => m.desecrated);

  // --- currencies -------------------------------------------------------------------------------
  // Each action has `can` (null when usable, else a reason key), `cands` (what the added mod is drawn from) and `apply`.

  transmute(item: Item, tier: CurrencyTier, rng: Rng): Item {
    const next = { ...item, rarity: "magic" as const };
    return this.add(next, this.candidates(next, { minLevel: TIER_MIN_LEVEL[tier] }), rng);
  }
  augment(item: Item, tier: CurrencyTier, rng: Rng): Item {
    return this.add(item, this.candidates(item, { minLevel: TIER_MIN_LEVEL[tier] }), rng);
  }
  regal(item: Item, tier: CurrencyTier, rng: Rng): Item {
    const next = { ...item, rarity: "rare" as const };
    return this.add(next, this.candidates(next, { minLevel: TIER_MIN_LEVEL[tier] }), rng);
  }
  alchemy(item: Item, rng: Rng): Item {
    let next: Item = { ...item, rarity: "rare" };
    for (let k = 0; k < 4; k++) next = this.add(next, this.candidates(next), rng);
    return next;
  }
  exalt(item: Item, tier: CurrencyTier, rng: Rng, omen: { affix?: Affix; double?: boolean } = {}): Item {
    let next = item;
    for (let k = 0; k < (omen.double ? 2 : 1); k++) {
      next = this.add(next, this.candidates(next, { minLevel: TIER_MIN_LEVEL[tier], affix: omen.affix }), rng);
    }
    return next;
  }
  chaos(item: Item, tier: CurrencyTier, rng: Rng, omen: { affix?: Affix; lowest?: boolean } = {}): Item {
    const removed = this.remove(item, rng, omen);
    return this.add(removed, this.candidates(removed, { minLevel: TIER_MIN_LEVEL[tier] }), rng);
  }
  annul(item: Item, rng: Rng, omen: { affix?: Affix } = {}): Item {
    return this.remove(item, rng, omen);
  }
  /** Greater Essence: magic -> rare with a guaranteed (crafted) mod of the essence's groups. */
  greaterEssence(item: Item, groups: string[], rng: Rng): Item {
    const next: Item = { ...item, rarity: "rare" };
    const cands = this.candidates(next, { groups, minLevel: TIER_MIN_LEVEL.greater });
    return this.add(next, cands.length ? cands : this.candidates(next, { groups }), rng, { crafted: true });
  }
  /** Perfect Essence: on a rare, removes a random mod (from the essence mod's side when that side is full) and adds a guaranteed (crafted) one. */
  perfectEssence(item: Item, groups: string[], rng: Rng): Item {
    // The essence mod must fit: when its side (prefix or suffix) is full, the removed mod is from that side.
    const affix = this.pool(item.base).map((i) => this.mod(i)).find((m) => groups.includes(m.group))?.affix;
    const removed = this.remove(item, rng, affix && this.free(item)[affix] <= 0 ? { affix } : {});
    const cands = this.candidates(removed, { groups, minLevel: TIER_MIN_LEVEL.perfect });
    return this.add(removed, cands.length ? cands : this.candidates(removed, { groups }), rng, { crafted: true });
  }
  /**
   * Desecration: returns the item (a random mod removed if it was full, on the omen's side if any) and three options
   * to reveal, from the desecrated pool. A lord omen keeps that lord's mods; a Necromancy omen keeps one side.
   */
  desecrate(item: Item, rng: Rng, opts: DesecrateOptions = {}): { item: Item; options: number[] } {
    const full = item.mods.length >= 6 || (opts.affix !== undefined && this.free(item)[opts.affix] <= 0);
    const base = full ? this.remove(item, rng, opts.affix ? { affix: opts.affix } : {}) : item;
    const cands = [...this.candidates(base, { desecrated: true, lord: opts.lord, affix: opts.affix })];
    const options: number[] = [];
    while (options.length < 3 && cands.length) {
      const k = Math.floor(rng() * cands.length);
      const i = cands.splice(k, 1)[0];
      // Three different groups, like the in-game reveal.
      if (!options.some((o) => this.mod(o).group === this.mod(i).group)) options.push(i);
    }
    return { item: base, options };
  }
}

export interface DesecrateOptions {
  lord?: Lord;
  affix?: Affix;
}

/** Short label for a mod group: text of its best tier with numbers replaced by #. */
export function groupLabel(c: Crafter, base: string, group: string) {
  const tiers = [...c.pool(base), ...c.desecratedPool(base)].filter((i) => c.mod(i).group === group);
  if (!tiers.length) return group;
  const best = tiers.reduce((a, b) => (c.mod(b).level > c.mod(a).level ? b : a));
  return c.mod(best).text.replace(/\(([\d.]+)-([\d.]+)\)/g, "#").replace(/\d+(\.\d+)?/g, "#").replace(/\n/g, " / ");
}

// --- actions & advisor -------------------------------------------------------------------------

export interface Action {
  id: string;
  /** In-game currency name. */
  currency: string;
  omen?: string;
  /** Reveals three options to choose from instead of adding a mod directly. */
  reveal?: boolean;
  /** Desecration options selected by the action's omen. */
  desecrate?: DesecrateOptions;
  can: (c: Crafter, item: Item) => boolean;
  run: (c: Crafter, item: Item, rng: Rng, targets?: Set<string>) => Item;
  /** Exact (or close) one-step odds without simulation, used by the strategy planner. */
  odds: (c: Crafter, item: Item, targets: Set<string>) => Odds;
}

export interface Odds {
  /** Chance to add a wanted modifier the item does not have. */
  gain: number;
  /** Chance to remove a wanted modifier it has. */
  loss: number;
}

const hit = (c: Crafter, item: Item, targets: Set<string>, opts: Parameters<Crafter["candidates"]>[1] = {}) =>
  c.hitChance(c.candidates(item, opts), targets);
const atLeastOnce = (p: number, n: number) => 1 - (1 - p) ** n;
/** Odds of "remove one mod (uniformly among `opts`) then something": `after` gives the gain chance on the reduced item. */
function removalOdds(c: Crafter, item: Item, targets: Set<string>, opts: { affix?: Affix; lowest?: boolean }, after: (it: Item) => number): Odds {
  const idx = c.removable(item, opts);
  if (!idx.length) return { gain: after(item), loss: 0 };
  let gain = 0, loss = 0;
  for (const k of idx) {
    gain += after({ ...item, mods: item.mods.filter((_, j) => j !== k) });
    if (targets.has(c.mod(item.mods[k].i).group)) loss++;
  }
  return { gain: gain / idx.length, loss: loss / idx.length };
}
/** Chance that three revealed options (distinct groups) include a wanted one. */
function revealHit(c: Crafter, item: Item, targets: Set<string>, opts: DesecrateOptions) {
  const groups = new Set(c.candidates(item, { desecrated: true, lord: opts.lord, affix: opts.affix }).map((i) => c.mod(i).group));
  const n = groups.size, k = [...groups].filter((g) => targets.has(g)).length;
  if (!k) return 0;
  if (n <= 3) return 1;
  // 1 - C(n-k, 3) / C(n, 3)
  let miss = 1;
  for (let j = 0; j < 3; j++) miss *= Math.max(0, n - k - j) / (n - j);
  return 1 - miss;
}

const TIER_PREFIX: Record<CurrencyTier, string> = { normal: "", greater: "Greater ", perfect: "Perfect " };
const TIERS: CurrencyTier[] = ["normal", "greater", "perfect"];
const isRare = (item: Item) => item.rarity === "rare";

export function actions(): Action[] {
  const list: Action[] = [];
  for (const t of TIERS) {
    list.push({
      id: `transmute-${t}`,
      currency: `${TIER_PREFIX[t]}Orb of Transmutation`,
      can: (_, item) => item.rarity === "normal",
      run: (c, item, rng) => c.transmute(item, t, rng),
      odds: (c, item, tg) => ({ gain: hit(c, { ...item, rarity: "magic" }, tg, { minLevel: TIER_MIN_LEVEL[t] }), loss: 0 }),
    });
    list.push({
      id: `augment-${t}`,
      currency: `${TIER_PREFIX[t]}Orb of Augmentation`,
      can: (c, item) => item.rarity === "magic" && c.candidates(item, { minLevel: TIER_MIN_LEVEL[t] }).length > 0,
      run: (c, item, rng) => c.augment(item, t, rng),
      odds: (c, item, tg) => ({ gain: hit(c, item, tg, { minLevel: TIER_MIN_LEVEL[t] }), loss: 0 }),
    });
    list.push({
      id: `regal-${t}`,
      currency: `${TIER_PREFIX[t]}Regal Orb`,
      can: (_, item) => item.rarity === "magic",
      run: (c, item, rng) => c.regal(item, t, rng),
      odds: (c, item, tg) => ({ gain: hit(c, { ...item, rarity: "rare" }, tg, { minLevel: TIER_MIN_LEVEL[t] }), loss: 0 }),
    });
    const exaltOmens: [string, string | undefined, { affix?: Affix; double?: boolean }][] = [
      ["", undefined, {}],
      ["-prefix", "Omen of Sinistral Exaltation", { affix: "P" }],
      ["-suffix", "Omen of Dextral Exaltation", { affix: "S" }],
      ["-double", "Omen of Greater Exaltation", { double: true }],
    ];
    for (const [suffix, omen, o] of exaltOmens) {
      list.push({
        id: `exalt-${t}${suffix}`,
        currency: `${TIER_PREFIX[t]}Exalted Orb`,
        omen,
        can: (c, item) =>
          isRare(item) &&
          (o.double ? item.mods.length <= 4 : item.mods.length < 6) &&
          c.candidates(item, { minLevel: TIER_MIN_LEVEL[t], affix: o.affix }).length > 0 &&
          (!o.affix || c.free(item)[o.affix === "P" ? "S" : "P"] > 0), // the omen only matters when both sides are open
        run: (c, item, rng) => c.exalt(item, t, rng, o),
        odds: (c, item, tg) => {
          const p = hit(c, item, tg, { minLevel: TIER_MIN_LEVEL[t], affix: o.affix });
          return { gain: o.double ? atLeastOnce(p, 2) : p, loss: 0 };
        },
      });
    }
    const chaosOmens: [string, string | undefined, { affix?: Affix; lowest?: boolean }][] = [
      ["", undefined, {}],
      ["-prefix", "Omen of Sinistral Erasure", { affix: "P" }],
      ["-suffix", "Omen of Dextral Erasure", { affix: "S" }],
      ["-lowest", "Omen of Whittling", { lowest: true }],
    ];
    for (const [suffix, omen, o] of chaosOmens) {
      list.push({
        id: `chaos-${t}${suffix}`,
        currency: `${TIER_PREFIX[t]}Chaos Orb`,
        omen,
        can: (c, item) => isRare(item) && c.removable(item, o).length > 0,
        run: (c, item, rng) => c.chaos(item, t, rng, o),
        odds: (c, item, tg) => removalOdds(c, item, tg, o, (it) => hit(c, it, tg, { minLevel: TIER_MIN_LEVEL[t] })),
      });
    }
  }
  list.push({
    id: "alchemy",
    currency: "Orb of Alchemy",
    can: (_, item) => item.rarity === "normal",
    run: (c, item, rng) => c.alchemy(item, rng),
    odds: (c, item, tg) => ({ gain: atLeastOnce(hit(c, { ...item, rarity: "rare" }, tg), 4), loss: 0 }),
  });
  for (const [suffix, omen, o] of [
    ["", undefined, {}],
    ["-prefix", "Omen of Sinistral Annulment", { affix: "P" as Affix }],
    ["-suffix", "Omen of Dextral Annulment", { affix: "S" as Affix }],
  ] as [string, string | undefined, { affix?: Affix }][]) {
    list.push({
      id: `annul${suffix}`,
      currency: "Orb of Annulment",
      omen,
      can: (c, item) => item.rarity !== "normal" && c.removable(item, o).length > 0,
      run: (c, item, rng) => c.annul(item, rng, o),
      odds: (c, item, tg) => ({ gain: 0, loss: c.loseChance(item, tg, o) }),
    });
  }
  for (const e of ESSENCES) {
    const slug = e.name.toLowerCase().replace(/[^a-z]+/g, "-");
    list.push({
      id: `greater-${slug}`,
      currency: `Greater ${e.name}`,
      can: (c, item) =>
        item.rarity === "magic" && !c.hasCrafted(item) && c.candidates({ ...item, rarity: "rare" }, { groups: e.groups }).length > 0,
      run: (c, item, rng) => c.greaterEssence(item, e.groups, rng),
      odds: (_, __, tg) => ({ gain: e.groups.some((g) => tg.has(g)) ? 1 : 0, loss: 0 }),
    });
    list.push({
      id: `perfect-${slug}`,
      currency: `Perfect ${e.name}`,
      can: (c, item) =>
        isRare(item) &&
        item.mods.length > 0 &&
        !c.hasCrafted(item) &&
        c.pool(item.base).some((i) => e.groups.includes(c.mod(i).group)) &&
        !item.mods.some((m) => e.groups.includes(c.mod(m.i).group)),
      run: (c, item, rng) => c.perfectEssence(item, e.groups, rng),
      odds: (c, item, tg) => {
        const affix = c.pool(item.base).map((i) => c.mod(i)).find((m) => e.groups.includes(m.group))?.affix;
        const side = affix && c.free(item)[affix] <= 0 ? { affix } : {};
        return { gain: e.groups.some((g) => tg.has(g)) ? 1 : 0, loss: c.loseChance(item, tg, side) };
      },
    });
  }
  // Desecration, plain or with an omen: a lord omen (weapons and jewellery) or Sinistral/Dextral Necromancy.
  const variants: { suffix: string; omen?: string; opts: DesecrateOptions; can?: (c: Crafter, item: Item) => boolean }[] = [
    { suffix: "", opts: {} },
    ...LORDS.map((l) => ({
      suffix: `-${l.lord}`,
      omen: l.omen,
      opts: { lord: l.lord },
      can: (c: Crafter, item: Item) => c.lordOmensApply(item.base),
    })),
    { suffix: "-prefix", omen: "Omen of Sinistral Necromancy", opts: { affix: "P" as Affix } },
    { suffix: "-suffix", omen: "Omen of Dextral Necromancy", opts: { affix: "S" as Affix } },
  ];
  for (const v of variants) {
    list.push({
      id: `desecrate${v.suffix}`,
      currency: "Preserved Rib",
      omen: v.omen,
      reveal: true,
      desecrate: v.opts,
      can: (c, item) =>
        isRare(item) &&
        !c.hasDesecrated(item) &&
        (v.can?.(c, item) ?? true) &&
        c.desecrate(item, () => 0, v.opts).options.length > 0,
      // The player keeps the best of the three options: a wanted one when offered (the planner passes its goals).
      run: (c, item, rng, targets?: Set<string>) => {
        const { item: base, options } = c.desecrate(item, rng, v.opts);
        const pick = options.find((i) => targets?.has(c.mod(i).group)) ?? options[0];
        return pick !== undefined ? { ...base, mods: [...base.mods, { i: pick, r: rng(), desecrated: true }] } : base;
      },
      odds: (c, item, tg) => {
        const full = item.mods.length >= 6 || (v.opts.affix !== undefined && c.free(item)[v.opts.affix] <= 0);
        return full
          ? removalOdds(c, item, tg, v.opts.affix ? { affix: v.opts.affix } : {}, (it) => revealHit(c, it, tg, v.opts))
          : { gain: revealHit(c, item, tg, v.opts), loss: 0 };
      },
    });
  }
  return list;
}

export interface Advice {
  action: Action;
  /** Chance to end with more wanted modifiers than now. */
  gain: number;
  /** Chance to lose a wanted modifier already on the item. */
  loss: number;
}

/** Ranks the usable actions by their chance to add a wanted modifier, estimated by simulation (equal weights). */
export function advise(c: Crafter, item: Item, targets: Set<string>, runs = 800): Advice[] {
  if (!targets.size) return [];
  const have = (it: Item) => new Set(it.mods.map((m) => c.mod(m.i).group).filter((g) => targets.has(g)));
  const before = have(item);
  const out: Advice[] = [];
  for (const action of actions()) {
    if (!action.can(c, item)) continue;
    let gain = 0, loss = 0;
    for (let k = 0; k < runs; k++) {
      let after: Item;
      if (action.reveal) {
        const { item: base, options } = c.desecrate(item, Math.random, action.desecrate);
        const best = options.find((i) => targets.has(c.mod(i).group)) ?? options[0];
        after = best === undefined ? base : { ...base, mods: [...base.mods, { i: best, desecrated: true }] };
      } else after = action.run(c, item, Math.random);
      const now = have(after);
      if ([...before].some((g) => !now.has(g))) loss++;
      if ([...now].filter((g) => !before.has(g)).length > 0) gain++;
    }
    if (gain > 0) out.push({ action, gain: gain / runs, loss: loss / runs });
  }
  // Prefer safe actions: losing a wanted mod (often one the player already paid for) costs twice what a gain is worth.
  return out.sort((a, b) => b.gain - 2 * b.loss - (a.gain - 2 * a.loss)).slice(0, 6);
}

/** Why a wanted modifier can or cannot be reached on this item. */
/** `level` on "ok" is the item level the best tier needs, when higher than the item's. */
export function diagnose(c: Crafter, item: Item, group: string): { status: "done" | "impossible" | "ilvl" | "blocked" | "ok"; level?: number } {
  if (item.mods.some((m) => c.mod(m.i).group === group)) return { status: "done" };
  const tiers = c.pool(item.base).filter((i) => c.mod(i).group === group);
  if (!tiers.length) return { status: "impossible" };
  const minLevel = Math.min(...tiers.map((i) => c.mod(i).level));
  if (minLevel > item.ilvl) return { status: "ilvl", level: minLevel };
  const affix = c.mod(tiers[0]).affix;
  if (item.rarity === "rare" && c.free(item)[affix] <= 0) return { status: "blocked" };
  const best = Math.max(...tiers.map((i) => c.mod(i).level));
  return best > item.ilvl ? { status: "ok", level: best } : { status: "ok" };
}

/** Mod text with each "(min-max)" range replaced by the rolled value, like an identified item. */
export function rolledText(text: string, r = 0.5) {
  return text.replace(/\((-?[\d.]+)-(-?[\d.]+)\)/g, (_, a: string, b: string) => {
    const decimals = Math.max(a.split(".")[1]?.length ?? 0, b.split(".")[1]?.length ?? 0);
    const v = Number(a) + r * (Number(b) - Number(a));
    return decimals ? v.toFixed(decimals) : String(Math.round(v));
  });
}

// --- strategy planner ----------------------------------------------------------------------------

const LOST_GOAL = 2;

export interface PlanResult {
  trials: number;
  /** Share of runs that end with every reachable goal. */
  success: number;
  /** Average number of currency uses in successful runs. */
  steps: number;
  /** Average currency used per run (successful or not), most used first. */
  usage: { currency: string; omen?: string; avg: number }[];
  /** Average cost of a run in Divine Orbs (null without prices); `partial` when some currency had no price. */
  cost: number | null;
  partial: boolean;
  /** Most common sequence of the first steps. */
  route: { currency: string; omen?: string }[];
  /** Goals left out because the base or item level cannot have them. */
  unreachable: string[];
}

/**
 * Plays a greedy strategy many times (each step: the action with the best gain minus twice its loss, per Divine when
 * prices are known; when nothing can add a goal, an annulment that frees the blocked side) and summarises the runs.
 */
export function planCraft(
  c: Crafter,
  start: Item,
  goals: Set<string>,
  prices: Record<string, number> = {},
  { trials = 150, maxSteps = 80, rng = Math.random }: { trials?: number; maxSteps?: number; rng?: Rng } = {},
): PlanResult {
  const unreachable = [...goals].filter((g) => ["impossible", "ilvl"].includes(diagnose(c, start, g).status));
  const targets = new Set([...goals].filter((g) => !unreachable.includes(g)));
  const list = actions();
  const empty: PlanResult = { trials, success: 0, steps: 0, usage: [], cost: null, partial: false, route: [], unreachable };
  if (!targets.size) return empty;
  const priced = Object.keys(prices).length > 0;
  const actionCost = (a: Action) => (prices[a.currency] ?? 0) + (a.omen ? (prices[a.omen] ?? 0) : 0);
  const lowestCost = (a: Action, it: Item) => actionCost(a) + a.odds(c, it, targets).loss * LOST_GOAL;
  const done = (it: Item) => [...targets].every((g) => it.mods.some((m) => c.mod(m.i).group === g));
  const memo = new Map<string, Action | null>();
  const choose = (it: Item): Action | null => {
    const key = `${it.rarity}|${it.mods.map((m) => m.i).sort((a, b) => a - b).join(",")}`;
    if (memo.has(key)) return memo.get(key)!;
    let best: Action | null = null, score = 0;
    for (const a of list) {
      if (!a.can(c, it)) continue;
      const o = a.odds(c, it, targets);
      if (o.gain <= 0) continue;
      // With prices: progress per Divine spent (a small floor keeps near-free orbs from dominating everything).
      const v = (o.gain - 2 * o.loss) / (priced ? actionCost(a) + 0.02 : 1);
      if (v > score) {
        best = a;
        score = v;
      }
    }
    const direct = best;
    const blocked = [...targets].some((g) => diagnose(c, it, g).status === "blocked");
    if (!best || (blocked && priced)) {
      best = null;
      // Blocked: annul on the side of a missing goal, preferring the omen that cannot hit a kept mod.
      const sides = new Set([...targets].filter((g) => diagnose(c, it, g).status === "blocked").map((g) => c.mod(c.pool(it.base).find((i) => c.mod(i).group === g)!).affix));
      // A lost goal is counted as about LOST_GOAL Divines to roll again when prices are known.
      let lowest = Infinity;
      for (const a of list) {
        if (!a.id.startsWith("annul") || !a.can(c, it)) continue;
        const side = a.id.endsWith("-prefix") ? "P" : a.id.endsWith("-suffix") ? "S" : null;
        if (side && !sides.has(side)) continue;
        const loss = a.odds(c, it, targets).loss;
        if (loss >= 1) continue;
        const v = priced ? actionCost(a) + loss * LOST_GOAL : loss;
        if (v < lowest) {
          best = a;
          lowest = v;
        }
      }
    }
    // Keep the direct action unless freeing the side first is cheaper (one step ahead: annul, then add).
    if (direct && (!best || !priced || actionCost(direct) <= lowestCost(best, it))) best = direct;
    memo.set(key, best);
    return best;
  };

  const usage = new Map<string, { currency: string; omen?: string; n: number }>();
  const routes = new Map<string, number>();
  let wins = 0, winSteps = 0;
  for (let k = 0; k < trials; k++) {
    let it = start;
    const route: string[] = [];
    let steps = 0;
    while (!done(it) && steps < maxSteps) {
      const a = choose(it);
      if (!a) break;
      it = a.run(c, it, rng, targets);
      steps++;
      const u = usage.get(a.id) ?? { currency: a.currency, omen: a.omen, n: 0 };
      u.n++;
      usage.set(a.id, u);
      if (route.length < 6) route.push(a.id);
    }
    if (done(it)) {
      wins++;
      winSteps += steps;
      const key = route.join(">");
      routes.set(key, (routes.get(key) ?? 0) + 1);
    }
  }
  let cost = 0, partial = false;
  for (const u of usage.values()) {
    for (const name of [u.currency, u.omen]) {
      if (!name) continue;
      if (prices[name] === undefined) partial = true;
      else cost += (prices[name] * u.n) / trials;
    }
  }
  const byId = new Map(list.map((a) => [a.id, a]));
  const top = [...routes].sort((a, b) => b[1] - a[1])[0]?.[0];
  return {
    trials,
    success: wins / trials,
    steps: wins ? winSteps / wins : 0,
    usage: [...usage.values()].sort((a, b) => b.n - a.n).map((u) => ({ currency: u.currency, omen: u.omen, avg: u.n / trials })),
    cost: Object.keys(prices).length ? cost : null,
    partial,
    route: top ? top.split(">").map((id) => ({ currency: byId.get(id)!.currency, omen: byId.get(id)!.omen })) : [],
    unreachable,
  };
}
