/**
 * Endgame farming fit: ranks the eight endgame mechanics for a build.
 *
 * Each build carries a small `farming` profile in its front matter (how well it clears, kills single targets,
 * survives and moves, how it fights and what defends it). Every mechanic has rules describing what it asks of a
 * character, taken from the mechanic pages (content/farming/*.md and their Maxroll sources):
 * a rule that matches the profile adds or removes points and gives the reason shown on the build page.
 */
import type { Locale } from "@/i18n/config";
import type { Tier } from "./types";

export const MECHANICS = ["breach", "ritual", "delirium", "expedition", "abyss", "temple", "sekhemas", "chaos"] as const;
export type MechanicId = (typeof MECHANICS)[number];

/** Display name and page (/farming/<slug>, content/farming/<id>.md) of each mechanic. */
export const MECHANIC_INFO: Record<MechanicId, { name: string; slug: string }> = {
  breach: { name: "Breach", slug: "breach" },
  ritual: { name: "Ritual", slug: "ritual" },
  delirium: { name: "Delirium", slug: "delirium" },
  expedition: { name: "Expedition", slug: "expedition" },
  abyss: { name: "Abyss", slug: "abyss" },
  temple: { name: "Vaal Temple", slug: "temple" },
  sekhemas: { name: "Trial of the Sekhemas", slug: "sekhemas" },
  chaos: { name: "Trial of Chaos", slug: "chaos" },
};
/** Page of one mechanic. */
export const mechanicHref = (id: MechanicId) => `/farming/${MECHANIC_INFO[id].slug}`;
/** General farming guide (what to farm, selling habits). */
export const FARMING_GUIDE = "/guides/farming-and-currency";

export const FARMING_STYLES = ["melee", "ranged", "minion", "totem"] as const;
export type FarmingStyle = (typeof FARMING_STYLES)[number];
/**
 * es / ci / evasion / armour / block: main defences. physical: mostly physical damage. dot: damage over time.
 * stationary: stands still to channel. close: a ranged or caster build whose skills work at close range.
 */
export const FARMING_TRAITS = ["es", "ci", "evasion", "armour", "block", "physical", "dot", "stationary", "close"] as const;
export type FarmingTrait = (typeof FARMING_TRAITS)[number];

type Rating = 1 | 2 | 3;
export interface FarmingProfile {
  /** Pack clear, 1 (slow) to 3 (screen-wide). */
  clear: Rating;
  /** Single-target and boss damage. */
  single: Rating;
  /** How much damage the character can take. */
  tank: Rating;
  /** Movement and mobility. */
  speed: Rating;
  style: FarmingStyle;
  traits: FarmingTrait[];
  /** Hand-written points for one mechanic, when the guide says something the rules cannot know. */
  adjust: Partial<Record<MechanicId, number>>;
  /** Hand-written reason for one mechanic, shown instead of the generated ones. */
  notes: Partial<Record<MechanicId, string>>;
}

export type Fit = "great" | "good" | "fair" | "poor";
export interface MechanicFit {
  id: MechanicId;
  score: number;
  fit: Fit;
  reasons: string[];
}

type Text = Record<Locale, string>;
interface Rule {
  when: (p: FarmingProfile) => boolean;
  points: number;
  text: Text;
}

const has = (t: FarmingTrait) => (p: FarmingProfile) => p.traits.includes(t);
const is = (key: "clear" | "single" | "tank" | "speed", v: Rating) => (p: FarmingProfile) => p[key] === v;
const styled = (s: FarmingStyle) => (p: FarmingProfile) => p.style === s;

const RULES: Record<MechanicId, Rule[]> = {
  breach: [
    { when: is("clear", 3), points: 3, text: { en: "Fast, wide clear stabilises Breaches well before the timer runs out.", fr: "Le nettoyage rapide et large stabilise les Breaches bien avant la fin du minuteur." } },
    { when: is("clear", 2), points: 1, text: { en: "Clear is fast enough for normal Breaches, but the densest ones will be tight on time.", fr: "Le nettoyage suffit pour des Breaches normales, mais les plus denses seront justes en temps." } },
    { when: is("clear", 1), points: -2, text: { en: "A slower clear struggles to stabilise Breaches before the timer runs out.", fr: "Un nettoyage plus lent a du mal à stabiliser les Breaches avant la fin du minuteur." } },
    { when: is("speed", 3), points: 1, text: { en: "Mobility keeps up with Hiveborn swarming in from every side.", fr: "La mobilité permet de suivre les Hiveborn qui arrivent de tous les côtés." } },
    { when: is("speed", 1), points: -1, text: { en: "Hiveborn spread across the whole Breach, and a slow character loses part of the timer reaching them.", fr: "Les Hiveborn se répandent dans toute la Breach, et un personnage lent perd une partie du minuteur à les rejoindre." } },
    { when: (p) => p.style === "minion" || p.style === "totem", points: 1, text: { en: "Hives, where you defend Ailith from one spot, suit a build that fights from a fixed position.", fr: "Les Hives, où l'on défend Ailith depuis un point fixe, conviennent à un build qui combat sans bouger." } },
    { when: is("tank", 3), points: 1, text: { en: "Solid defences let you stand in the middle of the swarm.", fr: "Des défenses solides permettent de rester au milieu de l'essaim." } },
    { when: is("tank", 1), points: -1, text: { en: "The Rares and Marshals that close each Breach hit hard against light defences.", fr: "Les rares et les Marshals qui referment chaque Breach frappent fort contre des défenses légères." } },
  ],
  ritual: [
    { when: is("clear", 3), points: 2, text: { en: "Big area damage wipes the revived packs inside the circle.", fr: "Les gros dégâts de zone balaient les packs ressuscités dans le cercle." } },
    { when: is("clear", 1), points: -1, text: { en: "Every monster you killed comes back, which drags on with a slower clear.", fr: "Chaque monstre tué revient, ce qui s'éternise avec un nettoyage plus lent." } },
    { when: is("tank", 3), points: 2, text: { en: "Strong defences hold up while the closed circle refills with monsters.", fr: "Des défenses solides tiennent pendant que le cercle fermé se remplit de monstres." } },
    { when: is("tank", 1), points: -2, text: { en: "The circle locks you in, and light defences leave no room to back off.", fr: "Le cercle vous enferme, et des défenses légères ne laissent aucune marge pour reculer." } },
    { when: styled("minion"), points: 2, text: { en: "A closed circle is ideal ground for minions: they fight the waves while you stay at the edge.", fr: "Un cercle fermé est un terrain idéal pour les sbires : ils affrontent les vagues pendant que vous restez au bord." } },
    { when: styled("totem"), points: 2, text: { en: "Totems placed once in the circle cover the whole fight.", fr: "Des totems posés une fois dans le cercle couvrent tout le combat." } },
    { when: has("stationary"), points: 2, text: { en: "Standing still to channel costs nothing in a closed circle.", fr: "Rester immobile pour canaliser ne coûte rien dans un cercle fermé." } },
    { when: is("speed", 1), points: 1, text: { en: "Low mobility costs nothing here: the fight comes to you inside the circle.", fr: "Le manque de mobilité ne coûte rien ici : le combat vient à vous dans le cercle." } },
    { when: is("single", 3), points: 1, text: { en: "Revived map bosses and Rares go down fast to your single-target damage.", fr: "Les boss de carte et les rares ressuscités tombent vite face à vos dégâts sur cible unique." } },
  ],
  delirium: [
    { when: is("speed", 3), points: 2, text: { en: "Your speed keeps pace with the fog, so the encounter lasts all the way to the boss.", fr: "Votre vitesse suit le brouillard : la rencontre dure jusqu'au boss." } },
    { when: is("speed", 1), points: -2, text: { en: "A slow character falls behind the moving fog, and the encounter ends early.", fr: "Un personnage lent se laisse distancer par le brouillard, et la rencontre s'arrête tôt." } },
    { when: is("clear", 3), points: 2, text: { en: "Fast clear kills Delirium packs before the fog makes them too tough.", fr: "Le nettoyage rapide tue les packs de Delirium avant que le brouillard ne les rende trop résistants." } },
    { when: is("clear", 1), points: -2, text: { en: "Packs get tougher the further the fog goes, which a slower clear feels quickly.", fr: "Les packs se renforcent à mesure que le brouillard avance, ce qu'un nettoyage lent ressent vite." } },
    { when: has("stationary"), points: -2, text: { en: "Standing still to channel works against a fog that keeps moving.", fr: "Rester immobile pour canaliser va à l'encontre d'un brouillard qui avance sans cesse." } },
    { when: styled("totem"), points: -1, text: { en: "Re-placing totems every few steps slows you down in a moving fog.", fr: "Reposer ses totems tous les quelques pas ralentit dans un brouillard qui avance." } },
    { when: is("tank", 3), points: 1, text: { en: "Your defences hold up in the late Simulacrum waves.", fr: "Vos défenses tiennent dans les dernières vagues du Simulacrum." } },
    { when: is("tank", 1), points: -1, text: { en: "Late Simulacrum waves and fog-empowered Rares are dangerous with light defences.", fr: "Les dernières vagues du Simulacrum et les rares renforcés par le brouillard sont dangereux avec des défenses légères." } },
    { when: is("single", 3), points: 1, text: { en: "Kosis and the boss at the end of the fog go down quickly.", fr: "Kosis et le boss au bout du brouillard tombent rapidement." } },
  ],
  expedition: [
    { when: is("single", 3), points: 2, text: { en: "Runic monsters and Remnant-boosted Rares fall fast to your single-target damage.", fr: "Les monstres runiques et les rares renforcés par les Remnants tombent vite face à vos dégâts sur cible unique." } },
    { when: is("single", 1), points: -2, text: { en: "Remnant modifiers make Rares much tougher, a weak spot for your single-target damage.", fr: "Les modificateurs des Remnants rendent les rares bien plus résistants, un point faible pour vos dégâts sur cible unique." } },
    { when: is("tank", 3), points: 2, text: { en: "Your defences let you take the dangerous Remnant modifiers that pay the most.", fr: "Vos défenses permettent de prendre les modificateurs de Remnant dangereux, ceux qui rapportent le plus." } },
    { when: is("tank", 1), points: -2, text: { en: "Remnant modifiers make monsters much deadlier: stick to the safer Remnants with light defences.", fr: "Les modificateurs des Remnants rendent les monstres bien plus mortels : tenez-vous-en aux Remnants les plus sûrs avec des défenses légères." } },
    { when: is("clear", 3), points: 1, text: { en: "You can let every monster unearth, then clear them all in one go.", fr: "Vous pouvez laisser tous les monstres se déterrer, puis tout nettoyer d'un coup." } },
  ],
  abyss: [
    { when: is("clear", 3), points: 2, text: { en: "Fissures close and the pit's hordes die quickly.", fr: "Les fissures se referment et les hordes du puits meurent vite." } },
    { when: is("clear", 1), points: -1, text: { en: "Pits release large hordes, which takes a while with a slower clear.", fr: "Les puits libèrent de grosses hordes, ce qui prend du temps avec un nettoyage plus lent." } },
    { when: is("single", 3), points: 1, text: { en: "Rares with Abyssal modifiers and Lichborn exiles die fast.", fr: "Les rares à modificateurs abyssaux et les exilés Lichborn meurent vite." } },
    { when: is("single", 1), points: -1, text: { en: "Rares with Abyssal modifiers, where the money is, take a while to kill.", fr: "Les rares à modificateurs abyssaux, là où est l'argent, mettent du temps à mourir." } },
    { when: is("tank", 3), points: 1, text: { en: "Your defences shrug off the Abyssal Rares' deadly modifiers.", fr: "Vos défenses encaissent les modificateurs mortels des rares abyssaux." } },
    { when: is("tank", 1), points: -1, text: { en: "Abyssal modifiers on Rares are deadly against light defences.", fr: "Les modificateurs abyssaux des rares sont mortels contre des défenses légères." } },
    { when: is("speed", 3), points: 1, text: { en: "You move quickly from fissure to fissure.", fr: "Vous passez vite d'une fissure à l'autre." } },
    { when: styled("melee"), points: -1, text: { en: "Abyss is some of the hardest content for melee builds: its Rares hit hard up close.", fr: "L'Abyss est l'un des contenus les plus durs pour les builds de mêlée : ses rares frappent fort au contact." } },
  ],
  temple: [
    { when: is("tank", 3), points: 2, text: { en: "Your defences can take tier 3 rooms, where the best rewards are.", fr: "Vos défenses supportent les salles de palier 3, là où sont les meilleures récompenses." } },
    { when: is("tank", 1), points: -2, text: { en: "Upgraded rooms raise monster power, and light defences keep you to the lower tiers.", fr: "Les salles améliorées renforcent les monstres, et des défenses légères vous limitent aux paliers bas." } },
    { when: is("single", 3), points: 2, text: { en: "Your boss damage is ready for the Architect and Atziri.", fr: "Vos dégâts sur boss sont prêts pour l'Architecte et Atziri." } },
    { when: is("single", 1), points: -1, text: { en: "The Architect and Atziri will ask for more single-target damage.", fr: "L'Architecte et Atziri demanderont plus de dégâts sur cible unique." } },
    { when: is("clear", 3), points: 1, text: { en: "A long temple full of extra packs plays to your clear.", fr: "Un long temple rempli de packs supplémentaires met votre nettoyage en valeur." } },
  ],
  sekhemas: [
    { when: styled("minion"), points: 2, text: { en: "Your minions take the hits, so your Honour stays high.", fr: "Vos sbires encaissent les coups, votre Honneur reste donc élevé." } },
    { when: styled("totem"), points: 2, text: { en: "Totems draw enemies away from you, so your Honour stays high.", fr: "Les totems détournent les ennemis de vous, votre Honneur reste donc élevé." } },
    { when: (p) => p.style === "ranged" && !p.traits.includes("close"), points: 1, text: { en: "Fighting from range keeps hits, and Honour loss, to a minimum.", fr: "Combattre à distance limite les coups reçus, et donc l'Honneur perdu." } },
    { when: (p) => p.style === "ranged" && p.traits.includes("close"), points: -1, text: { en: "Your skills work at close range, so expect more hits, and more Honour lost, than a ranged build.", fr: "Vos compétences s'utilisent de près : attendez-vous à plus de coups, et d'Honneur perdu, qu'un build à distance." } },
    { when: styled("melee"), points: -2, text: { en: "Melee range means taking hits, and every hit costs Honour.", fr: "La mêlée oblige à encaisser des coups, et chaque coup coûte de l'Honneur." } },
    { when: has("evasion"), points: 1, text: { en: "Evasion gives each hit a chance to cost no Honour.", fr: "L'évasion donne à chaque coup une chance de ne coûter aucun Honneur." } },
    { when: has("armour"), points: 1, text: { en: "Armour reduces the Honour each hit takes.", fr: "L'armure réduit l'Honneur retiré par chaque coup." } },
    { when: is("tank", 3), points: 1, text: { en: "Honour equals life plus energy shield, and your pool is large.", fr: "L'Honneur vaut vie plus bouclier d'énergie, et votre réserve est grande." } },
    { when: is("tank", 1), points: -1, text: { en: "Honour equals life plus energy shield, and your pool is small.", fr: "L'Honneur vaut vie plus bouclier d'énergie, et votre réserve est petite." } },
    { when: is("speed", 3), points: 1, text: { en: "Your mobility helps in timed rooms and trap gauntlets.", fr: "Votre mobilité aide dans les salles chronométrées et les couloirs à pièges." } },
    { when: is("speed", 1), points: -1, text: { en: "Trap gauntlets and timed rooms are harder for a slow character.", fr: "Les couloirs à pièges et les salles chronométrées sont plus durs pour un personnage lent." } },
  ],
  chaos: [
    { when: is("single", 3), points: 2, text: { en: "Rounds 4, 7 and 10 are boss fights, and yours end quickly.", fr: "Les manches 4, 7 et 10 sont des combats de boss, et les vôtres finissent vite." } },
    { when: is("single", 1), points: -2, text: { en: "Three of the ten rounds are boss fights, a weak spot for your single-target damage.", fr: "Trois des dix manches sont des combats de boss, un point faible pour vos dégâts sur cible unique." } },
    { when: is("tank", 3), points: 2, text: { en: "You can afford the harder modifiers that pile up over ten rounds.", fr: "Vous pouvez vous permettre les modificateurs plus durs qui s'accumulent sur dix manches." } },
    { when: is("tank", 1), points: -2, text: { en: "Modifiers pile up every round, and light defences limit which ones you can take.", fr: "Les modificateurs s'accumulent à chaque manche, et des défenses légères limitent ceux que vous pouvez prendre." } },
    { when: has("ci"), points: 1, text: { en: "Chaos Inoculation ignores the chaos damage modifier: one less threat.", fr: "Chaos Inoculation ignore le modificateur de dégâts de chaos : une menace de moins." } },
    { when: has("physical"), points: 1, text: { en: "Physical damage ignores the enemy resistance modifier.", fr: "Les dégâts physiques ignorent le modificateur de résistances ennemies." } },
    { when: has("es"), points: -1, text: { en: "Never take the modifier that lowers energy shield, armour and evasion: it guts an energy shield build.", fr: "Ne prenez jamais le modificateur qui réduit bouclier d'énergie, armure et évasion : il ruine un build à bouclier d'énergie." } },
    { when: is("clear", 1), points: -1, text: { en: "Slower rooms give the escalating damage taken modifier time to stack.", fr: "Des salles plus lentes laissent le temps au modificateur de dégâts subis croissants de s'accumuler." } },
  ],
};

const NEUTRAL: Text = {
  en: "No marked strength or weakness for this mechanic: an average fit.",
  fr: "Ni point fort ni point faible marqué pour cette mécanique : une adéquation moyenne.",
};

/** What each mechanic asks for first: breaks ties between mechanics with the same score. */
const PRIMARY: Record<MechanicId, (p: FarmingProfile) => number> = {
  breach: (p) => p.clear,
  ritual: (p) => p.tank,
  delirium: (p) => p.speed,
  expedition: (p) => p.single,
  abyss: (p) => (p.clear + p.single) / 2,
  temple: (p) => p.tank,
  sekhemas: (p) => p.tank,
  chaos: (p) => p.single,
};

/** Place in a mechanic's tier list (lib/mechanics.ts): S matches a "great" fit, D a "poor" one. */
export const mechanicTier = (score: number): Tier => (score >= 4 ? "S" : score === 3 ? "A" : score === 2 ? "B" : score >= 0 ? "C" : "D");

const fitOf = (score: number): Fit => (score >= 4 ? "great" : score >= 2 ? "good" : score >= 0 ? "fair" : "poor");

/**
 * The eight mechanics, best fit first. Each one keeps its strongest reason for and against it; a hand-written note
 * comes first and keeps only the strongest generated reason. `notes` are translated notes, used before the profile's.
 */
export function rankMechanics(profile: FarmingProfile, lang: Locale, notes: Partial<Record<MechanicId, string>> = {}): MechanicFit[] {
  return MECHANICS.map((id) => {
    const matched = RULES[id].filter((r) => r.when(profile));
    const score = matched.reduce((s, r) => s + r.points, 0) + (profile.adjust[id] ?? 0);
    const note = notes[id] ?? profile.notes[id];
    const byWeight = (a: Rule, b: Rule) => Math.abs(b.points) - Math.abs(a.points);
    const pros = matched.filter((r) => r.points > 0).sort(byWeight);
    const cons = matched.filter((r) => r.points < 0).sort(byWeight);
    // Lead with what decides the verdict, then the strongest counterpoint (or the second strongest point).
    const [lead, other] = score >= 0 ? [pros, cons] : [cons, pros];
    const picked = [lead[0], other[0] ?? lead[1]].filter(Boolean) as Rule[];
    const generated = picked.map((r) => r.text[lang]);
    const reasons = note ? [note, ...generated.slice(0, 1)] : generated.length ? generated : [NEUTRAL[lang]];
    return { id, score, fit: fitOf(score), reasons };
  }).sort((a, b) => b.score - a.score || PRIMARY[b.id](profile) - PRIMARY[a.id](profile) || MECHANICS.indexOf(a.id) - MECHANICS.indexOf(b.id));
}

/** Validates a front matter `farming` block; returns an error message or the profile. */
export function parseFarming(raw: unknown): FarmingProfile | string {
  if (!raw || typeof raw !== "object") return "farming must be an object";
  const r = raw as Record<string, unknown>;
  const rating = (k: string) => (r[k] === 1 || r[k] === 2 || r[k] === 3 ? (r[k] as Rating) : null);
  for (const k of ["clear", "single", "tank", "speed"]) if (!rating(k)) return `farming.${k} must be 1, 2 or 3`;
  if (!(FARMING_STYLES as readonly unknown[]).includes(r.style)) return `farming.style must be one of ${FARMING_STYLES.join(", ")}`;
  const traits = (r.traits ?? []) as unknown[];
  const bad = traits.find((t) => !(FARMING_TRAITS as readonly unknown[]).includes(t));
  if (bad !== undefined) return `farming.traits: unknown trait "${bad}" (expected ${FARMING_TRAITS.join(", ")})`;
  const byMechanic = <T,>(key: string, check: (v: unknown) => boolean): Partial<Record<MechanicId, T>> | string => {
    const obj = (r[key] ?? {}) as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj)) {
      if (!(MECHANICS as readonly string[]).includes(k)) return `farming.${key}: unknown mechanic "${k}" (expected ${MECHANICS.join(", ")})`;
      if (!check(v)) return `farming.${key}.${k} has the wrong type`;
    }
    return obj as Partial<Record<MechanicId, T>>;
  };
  const adjust = byMechanic<number>("adjust", (v) => Number.isInteger(v));
  if (typeof adjust === "string") return adjust;
  const notes = byMechanic<string>("notes", (v) => typeof v === "string");
  if (typeof notes === "string") return notes;
  return {
    clear: rating("clear")!,
    single: rating("single")!,
    tank: rating("tank")!,
    speed: rating("speed")!,
    style: r.style as FarmingStyle,
    traits: traits as FarmingTrait[],
    adjust,
    notes,
  };
}
