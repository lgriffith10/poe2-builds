// Builds recommended to players new to the game: easy to play (few buttons, no long boss setup), cheap to gear
// (low budget, few or no uniques) and solid from league start. Picked by hand among the Maxroll guides rated
// "easy" (complexity ≤ 2) with a low budget, keeping those whose rotations stay short; the ladder builds rated easy
// are left out because their gear is the expensive gear of top characters.

export interface BeginnerPick {
  slug: string;
  why: { en: string; fr: string };
}

export const BEGINNER_PICKS: BeginnerPick[] = [
  {
    slug: "shield-wall-warbringer",
    why: {
      en: "One attack and two war cries: shout, slam the shield, repeat. It plays the same from the first act to maps, and needs a single unique late in the endgame.",
      fr: "Une attaque et deux cris de guerre : on crie, on frappe avec le bouclier, on recommence. Il se joue pareil du premier acte aux maps et ne demande qu'un seul unique, tard en endgame.",
    },
  },
  {
    slug: "minion-army-spirit-walker",
    why: {
      en: "Your minions and your companion do the killing while you place a mark and a few buffs from a safe distance. Cheap, and rated A in all three tier lists.",
      fr: "Vos sbires et votre compagnon tuent pendant que vous posez une marque et quelques buffs à distance. Peu cher, et classé A dans les trois tier lists.",
    },
  },
  {
    slug: "permafrost-bolt-witchhunter",
    why: {
      en: "No unique at any stage: every piece is a rare you can find or buy cheaply. Two buttons to clear, four against bosses.",
      fr: "Aucun unique à aucune étape : chaque pièce est un rare que l'on trouve ou achète pour pas cher. Deux touches pour nettoyer, quatre contre les boss.",
    },
  },
];

const SLUGS = new Set(BEGINNER_PICKS.map((p) => p.slug));
export const isBeginnerPick = (slug: string) => SLUGS.has(slug);
