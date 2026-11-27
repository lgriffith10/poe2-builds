// Game terms explained for new players: the /glossary page, and hover cards on the first mention of each term in
// guides (see linkGlossary in builds.ts). Definitions are ours, checked against the PoE2 wiki (poe2wiki.net).

export type GlossaryGroup = "defence" | "resource" | "damage" | "items" | "endgame";

export interface GlossaryTerm {
  id: string;
  group: GlossaryGroup;
  name: { en: string; fr: string };
  /** Words that mark the term in a guide, case-sensitive, longest first is not required. */
  match: { en: string[]; fr: string[] };
  text: { en: string; fr: string };
  /** Text right after a match that means it is something else ("Spirit Walker" is an ascendancy). */
  notBefore?: RegExp;
  /** Text right before a match that means it is part of a name ("Sniper's Mark", "Blood of Rage"). */
  notAfter?: RegExp;
}

const term = (
  id: string,
  group: GlossaryGroup,
  name: [string, string],
  match: [string[], string[]],
  text: [string, string],
): GlossaryTerm => ({ id, group, name: { en: name[0], fr: name[1] }, match: { en: match[0], fr: match[1] }, text: { en: text[0], fr: text[1] } });

export const GLOSSARY: GlossaryTerm[] = [
  // Defences
  term("armour", "defence", ["Armour", "Armure (Armour)"], [["Armour"], ["Armour"]], [
    "Reduces the physical damage of hits. It works best against many small hits: a big hit compared with your armour is reduced much less. Capped at 90% reduction. Comes mostly from Strength gear.",
    "Réduit les dégâts physiques des coups. Elle marche surtout contre les petits coups répétés : un gros coup par rapport à votre armure est bien moins réduit. Plafonnée à 90 % de réduction. Vient surtout de l'équipement de Force.",
  ]),
  term("evasion", "defence", ["Evasion", "Évasion (Evasion)"], [["Evasion"], ["Evasion", "évasion"]], [
    "Chance to avoid hits completely, based on your Evasion Rating against the attacker's Accuracy. Comes mostly from Dexterity gear.",
    "Chance d'éviter complètement un coup, selon votre score d'évasion face à la précision de l'attaquant. Vient surtout de l'équipement de Dextérité.",
  ]),
  term("energy-shield", "defence", ["Energy Shield", "Bouclier d'énergie (Energy Shield)"], [["Energy Shield"], ["Energy Shield", "bouclier d'énergie"]], [
    "A second health bar on top of life that recharges on its own after a short time without taking damage. Bleeding and poison skip it, and chaos damage hurts it twice as much. Comes mostly from Intelligence gear.",
    "Une seconde barre de vie au-dessus de la vie, qui se recharge seule après un court moment sans subir de dégâts. Le saignement et le poison passent à travers, et les dégâts de chaos lui font deux fois plus mal. Vient surtout de l'équipement d'Intelligence.",
  ]),
  term("deflection", "defence", ["Deflection", "Déflexion (Deflection)"], [["Deflection"], ["Deflection", "déflexion"]], [
    "Chance to take less damage from a hit instead of avoiding it, rolled like evasion against the attacker's Accuracy. Most sources scale with your Evasion, so it backs up evasion builds.",
    "Chance de subir moins de dégâts d'un coup au lieu de l'éviter, tirée comme l'évasion face à la précision de l'attaquant. La plupart des sources dépendent de votre évasion : c'est un complément des builds à évasion.",
  ]),
  term("resistances", "defence", ["Resistances", "Résistances"], [["Resistances", "resistances"], ["résistances"]], [
    "Reduce fire, cold, lightning and chaos damage. The cap is 75%: endgame content is balanced around it, and at 50% you take twice the damage you would at 75%.",
    "Réduisent les dégâts de feu, de froid, de foudre et de chaos. Le plafond est de 75 % : l'endgame est équilibré autour, et à 50 % vous prenez deux fois plus de dégâts qu'à 75 %.",
  ]),
  term("stun", "defence", ["Stun and Heavy Stun", "Étourdissement (Stun)"], [["Heavy Stun", "Stun Threshold"], ["Heavy Stun", "étourdissement"]], [
    "A light stun briefly interrupts you based on the size of a hit; heavy stun builds up over several hits and stops you for longer. Stun Threshold and the Stone charm help against it.",
    "Un étourdissement léger vous interrompt brièvement selon la taille du coup ; l'étourdissement lourd (Heavy Stun) s'accumule sur plusieurs coups et vous arrête plus longtemps. Le seuil d'étourdissement et le charme de pierre aident à l'éviter.",
  ]),
  // Resources
  term("spirit", "resource", ["Spirit", "Esprit (Spirit)"], [["Spirit"], ["Spirit", "Esprit"]], [
    "Reserved by persistent skills: auras, heralds, permanent minions and meta gems. You start with none; the campaign gives up to 100, and the rest comes from gear (sceptres, amulets, body armour) and the ascendancy.",
    "Réservé par les compétences permanentes : auras, hérauts, sbires permanents et gemmes méta. On commence sans ; la campagne en donne jusqu'à 100, le reste vient de l'équipement (sceptres, amulettes, armures) et de l'ascendance.",
  ]),
  term("rage", "resource", ["Rage", "Rage"], [["Rage"], ["Rage"]], [
    "Built up by fighting; gives more attack damage the more you have, and some skills spend it. 30 at most by default.",
    "Se remplit en combattant ; donne plus de dégâts d'attaque à mesure qu'elle monte, et certaines compétences la dépensent. 30 au maximum par défaut.",
  ]),
  term("charges", "resource", ["Endurance, Frenzy and Power charges", "Charges (Endurance, Frenzy, Power)"], [["Endurance Charges", "Frenzy Charges", "Power Charges", "Endurance Charge", "Frenzy Charge", "Power Charge"], ["Endurance Charges", "Frenzy Charges", "Power Charges", "charges d'endurance", "charges de frénésie", "charges de puissance"]], [
    "Stored resources (3 of each at most, lasting 15 seconds) that skills consume to get stronger. In PoE2 they give nothing on their own.",
    "Ressources stockées (3 de chaque au maximum, pendant 15 secondes) que des compétences consomment pour devenir plus fortes. Dans PoE2, elles ne donnent rien par elles-mêmes.",
  ]),
  term("combo", "resource", ["Combo", "Combo"], [["Combo"], ["Combo"]], [
    "Counter of your melee strikes over the last 8 seconds, spent by some Monk skills and supports.",
    "Compteur de vos frappes au corps à corps des 8 dernières secondes, dépensé par certaines compétences et supports du Monk.",
  ]),
  term("leech", "resource", ["Leech", "Vol (Leech)"], [["Leech", "leech"], ["Leech", "vol de vie"]], [
    "Recovers life, mana or energy shield over a short time based on the damage your hits deal.",
    "Rend de la vie, du mana ou du bouclier d'énergie sur un court moment, selon les dégâts infligés par vos coups.",
  ]),
  term("weapon-set", "resource", ["Weapon sets", "Sets d'armes"], [["weapon set", "Weapon Set", "weapon sets"], ["set d'armes", "sets d'armes"]], [
    "Two sets of weapons you swap between. Some passive points can be assigned to one set only, so each set gets its own part of the tree; skills can be bound to a set.",
    "Deux jeux d'armes entre lesquels on alterne. Certains points de passif peuvent être réservés à un set, si bien que chaque set a sa propre partie de l'arbre ; les compétences peuvent être liées à un set.",
  ]),
  // Damage and ailments
  term("ailments", "damage", ["Ailments", "Altérations (ailments)"], [["ailments", "Ailments"], ["altérations"]], [
    "Effects of a damage type: bleeding, poison and ignite deal damage over time; chill, freeze, shock and electrocute hinder the target.",
    "Effets liés à un type de dégâts : saignement, poison et brûlure infligent des dégâts dans la durée ; froid, gel, choc et électrocution gênent la cible.",
  ]),
  term("dot", "damage", ["Damage over time (DoT)", "Dégâts dans la durée (DoT)"], [["damage over time", "DoT"], ["dégâts dans la durée", "DoT"]], [
    "Damage dealt continuously instead of on a hit: bleeding, poison, ignite and some spells. It cannot be evaded or blocked, and it takes a moment to kill.",
    "Dégâts infligés en continu plutôt qu'au coup : saignement, poison, brûlure et certains sorts. Impossibles à éviter ou bloquer, ils mettent un moment à tuer.",
  ]),
  term("armour-break", "damage", ["Armour Break", "Bris d'armure (Armour Break)"], [["Armour Break", "Fully Broken Armour"], ["Armour Break", "Fully Broken Armour", "bris d'armure"]], [
    "Debuff that lowers an enemy's armour. At zero the armour is Fully Broken, which some skills and passives exploit for big bonuses.",
    "Affaiblissement qui réduit l'armure d'un ennemi. À zéro, l'armure est entièrement brisée (Fully Broken Armour), ce que certaines compétences et passifs exploitent pour de gros bonus.",
  ]),
  term("exposure", "damage", ["Exposure", "Exposition (Exposure)"], [["Exposure"], ["Exposure", "exposition"]], [
    "Debuff that lowers an enemy's elemental resistances, so all your fire, cold and lightning damage hits harder.",
    "Affaiblissement qui réduit les résistances élémentaires d'un ennemi : tous vos dégâts de feu, de froid et de foudre frappent plus fort.",
  ]),
  term("mark", "damage", ["Marks", "Marques (Marks)"], [["Mark"], ["marque", "Mark"]], [
    "Skills that place a debuff on an enemy (one mark per enemy); the mark triggers an effect when its condition is met, then disappears.",
    "Compétences qui posent un affaiblissement sur un ennemi (une marque par ennemi) ; la marque déclenche un effet quand sa condition est remplie, puis disparaît.",
  ]),
  term("crit", "damage", ["Critical hits", "Coups critiques"], [["critical", "Critical"], ["critique", "critiques"]], [
    "Hits that deal extra damage. Built from critical hit chance (how often) and critical damage bonus (how much more).",
    "Coups qui infligent des dégâts en plus. Se construisent avec la chance de coup critique (à quelle fréquence) et le bonus de dégâts critiques (de combien).",
  ]),
  // Items and gems
  term("support-gem", "items", ["Support gems", "Gemmes de support"], [["support gem", "support gems", "Support Gem"], ["gemme de support", "gemmes de support"]], [
    "Gems socketed into a skill to change or strengthen it. Each skill has a limited number of support sockets, added with Jeweller's Orbs.",
    "Gemmes placées dans une compétence pour la modifier ou la renforcer. Chaque compétence a un nombre limité d'emplacements de support, ajoutés avec des Jeweller's Orbs.",
  ]),
  term("uncut-gem", "items", ["Uncut gems", "Gemmes non taillées (Uncut)"], [["Uncut Skill Gem", "Uncut Support Gem", "Uncut Spirit Gem", "Uncut Skill Gems", "Uncut Support Gems"], ["Uncut Skill Gem", "Uncut Support Gem", "Uncut Spirit Gem", "gemmes non taillées"]], [
    "Blank gems you cut into the skill, support or spirit gem of your choice. Their level caps the level of the skill you make.",
    "Gemmes vierges que l'on taille en la compétence, le support ou la gemme d'esprit de son choix. Leur niveau plafonne celui de la gemme obtenue.",
  ]),
  term("rarity", "items", ["Normal, magic, rare and unique", "Rareté des objets"], [["magic item", "rare item", "magic items", "rare items"], ["objet magique", "objet rare", "objets magiques", "objets rares"]], [
    "White items have no modifiers, blue (magic) up to two, yellow (rare) up to six, and orange (unique) fixed ones. Judge an item by its modifiers, not its colour.",
    "Les objets blancs n'ont aucun modificateur, les bleus (magiques) jusqu'à deux, les jaunes (rares) jusqu'à six, et les orange (uniques) des modificateurs fixes. Jugez un objet sur ses modificateurs, pas sur sa couleur.",
  ]),
  term("rune", "items", ["Runes and soul cores", "Runes et cœurs d'âme"], [["Soul Core", "soul cores", "Soul Cores", "runes"], ["Soul Core", "runes", "cœurs d'âme"]], [
    "Augments placed in an item's sockets for a fixed bonus (resistance, damage…). Soul cores come mostly from the Trial of Chaos.",
    "Augments placés dans les châsses d'un objet pour un bonus fixe (résistance, dégâts…). Les cœurs d'âme viennent surtout du Trial of Chaos.",
  ]),
  term("charm", "items", ["Charms", "Charmes"], [["Charm", "charms"], ["charme", "charmes"]], [
    "Trinkets that fill with kills and trigger on their own to protect you, for instance against freeze or stun.",
    "Babioles qui se remplissent en tuant et se déclenchent seules pour vous protéger, par exemple contre le gel ou l'étourdissement.",
  ]),
  term("corrupted", "items", ["Corrupted", "Corrompu (Corrupted)"], [["corrupted", "Corrupted", "Vaal Orb"], ["corrompu", "corrompus", "Vaal Orb"]], [
    "An item changed by a Vaal Orb (or found that way). The outcome is random, and a corrupted item can no longer be modified with most currency.",
    "Un objet modifié par une Vaal Orb (ou trouvé ainsi). Le résultat est aléatoire, et un objet corrompu ne peut plus être modifié par la plupart des monnaies.",
  ]),
  // Endgame
  term("ascendancy", "endgame", ["Ascendancy", "Ascendance"], [["Ascendancy"], ["ascendance"]], [
    "Your class's specialisation: up to 8 points earned in the Trials of Ascendancy, the biggest power spike of a build.",
    "La spécialisation de votre classe : jusqu'à 8 points gagnés dans les épreuves d'ascendance, le plus gros gain de puissance d'un build.",
  ]),
  term("waystone", "endgame", ["Waystones and the Atlas", "Waystones et Atlas"], [["Waystone", "waystones", "Waystones"], ["Waystone", "waystones"]], [
    "Waystones open maps on the Atlas, the endgame world map. Their tier sets the difficulty and the loot.",
    "Les waystones ouvrent les maps de l'Atlas, la carte du monde de l'endgame. Leur tier fixe la difficulté et le butin.",
  ]),
  term("tablet", "endgame", ["Precursor tablets", "Tablettes (Precursor Tablets)"], [["Tablet", "tablets", "Tablets"], ["tablette", "tablettes"]], [
    "Items placed in the map device with a waystone to add a mechanic (Breach, Ritual, Delirium…) to the map. They have a limited number of uses.",
    "Objets placés dans le dispositif avec une waystone pour ajouter une mécanique (Breach, Ritual, Delirium…) à la map. Ils ont un nombre d'utilisations limité.",
  ]),
  term("clear", "endgame", ["Clear and single target", "Nettoyage et mono-cible"], [["clear speed", "single target", "single-target"], ["nettoyage", "mono-cible"]], [
    "Clear is how fast a build kills packs of monsters; single target is how fast it kills one tough enemy, such as a boss.",
    "Le nettoyage, c'est la vitesse à laquelle un build tue les groupes de monstres ; le mono-cible, celle à laquelle il tue un ennemi coriace, comme un boss.",
  ]),
  term("league-start", "endgame", ["League start", "Début de ligue"], [["league start", "League Start"], ["début de ligue"]], [
    "The first days of a new league, when everyone starts over with no items or currency. A league starter build works with what drops.",
    "Les premiers jours d'une nouvelle ligue, quand tout le monde repart sans objets ni monnaie. Un build de début de ligue fonctionne avec ce qui tombe.",
  ]),
];

// Skill and item names that contain a glossary word.
const NAME_PARTS: Record<string, { notBefore?: RegExp; notAfter?: RegExp }> = {
  spirit: { notBefore: /^ (Walker|Gem|Offering|Vessel)/ },
  charm: { notBefore: /^ (Slot|slot)/ },
  "energy-shield": { notBefore: /^ Aura/ },
  rage: { notBefore: /^ Carapace/, notAfter: /\b(of|Raging|Berserk|Eternal|Commanding) $/ },
  mark: { notBefore: /^ (of|for Death)/, notAfter: /(&#39;s|['’]s|Voltaic|Freezing|Sniper|Fire|Charged) $/ },
  armour: { notBefore: /^ (Break|Aura|Explosion|Demolisher)/, notAfter: /Arctic $/ },
};
for (const t of GLOSSARY) Object.assign(t, NAME_PARTS[t.id]);

export const GLOSSARY_GROUPS: GlossaryGroup[] = ["defence", "resource", "damage", "items", "endgame"];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Links the first mention of each glossary term in rendered guide HTML to the glossary, with a hover card.
 * Text inside links, headings, code and buttons is left alone. `tip` builds the data-tip attribute.
 */
export function linkGlossary(html: string, lang: "en" | "fr", tip: (t: GlossaryTerm) => string): string {
  const pending = GLOSSARY.map((t) => ({
    t,
    re: new RegExp(`(?<![\\p{L}\\p{N}])(?:${[...t.match[lang]].sort((a, b) => b.length - a.length).map(esc).join("|")})(?![\\p{L}\\p{N}])`, "u"),
  }));
  const used = new Set<string>();
  let skip = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith("<")) {
        const m = part.match(/^<(\/?)(a|h[1-6]|code|pre|button|summary|script|style|svg)\b/i);
        if (m && !part.endsWith("/>")) skip += m[1] ? -1 : 1;
        return part;
      }
      if (skip > 0 || !part.trim()) return part;
      let out = part;
      for (const { t, re } of pending) {
        if (used.has(t.id)) continue;
        // Search outside links already added to this text node.
        const segs = out.split(/(<a [^>]*>.*?<\/a>)/);
        let done = false;
        out = segs
          .map((seg) => {
            if (done || seg.startsWith("<a ")) return seg;
            let from = 0;
            while (from <= seg.length) {
              const m = re.exec(seg.slice(from));
              if (!m) return seg;
              const at = from + m.index;
              const after = seg.slice(at + m[0].length);
              // "Rage III", "Leech II": a support gem, not the mechanic.
              if (/^ (I{1,3}|IV|V)\b/.test(after) || t.notBefore?.test(after) || t.notAfter?.test(seg.slice(Math.max(0, at - 20), at))) {
                from = at + m[0].length;
                continue;
              }
              done = true;
              return `${seg.slice(0, at)}<a class="ref ref-term" href="/glossary#${t.id}" ${tip(t)}>${m[0]}</a>${seg.slice(at + m[0].length)}`;
            }
            return seg;
          })
          .join("");
        if (done) used.add(t.id);
      }
      return out;
    })
    .join("");
}
