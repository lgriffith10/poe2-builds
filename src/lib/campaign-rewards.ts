// Permanent rewards hidden in the campaign (passive points, Spirit, resistances, choices), per act, shown as reminders
// in the in-game view. Facts from Maxroll's "Permanent Stats From The Campaign" (updated June 2026, patch 0.5) and the
// site's ascendancy trials guide; the wording is ours.

/** 1 to 4: the acts; 5: the three interludes. */
export type CampaignPart = 1 | 2 | 3 | 4 | 5;

export type RewardKind = "points" | "spirit" | "res" | "life" | "choice" | "ascend";

export interface CampaignReward {
  id: string;
  part: CampaignPart;
  kind: RewardKind;
  zone: string;
  reward: { en: string; fr: string };
  how: { en: string; fr: string };
}

export const CAMPAIGN_REWARDS_SOURCE = "https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign";

const r = (
  id: string,
  part: CampaignPart,
  kind: RewardKind,
  zone: string,
  reward: [string, string],
  how: [string, string],
): CampaignReward => ({ id, part, kind, zone, reward: { en: reward[0], fr: reward[1] }, how: { en: how[0], fr: how[1] } });

export const CAMPAIGN_REWARDS: CampaignReward[] = [
  // Act 1
  r("beira", 1, "res", "Clearfell", ["+10% cold resistance", "+10 % de résistance au froid"], ["Kill Beira of the Rotten Pack.", "Tuez Beira of the Rotten Pack."]),
  r("crowbell", 1, "points", "Hunting Grounds", ["+2 passive points", "+2 points de passif"], ["Kill Crowbell.", "Tuez Crowbell."]),
  r("king-in-the-mist", 1, "spirit", "Freythorn", ["+30 Spirit", "+30 d'Esprit"], [
    "Complete the Ritual encounters to summon the King in the Mist, then kill him (he also drops an Uncut Spirit Gem).",
    "Terminez les rituels pour invoquer le King in the Mist, puis tuez-le (il lâche aussi une Uncut Spirit Gem).",
  ]),
  r("una", 1, "points", "Ogham Farmlands", ["+2 passive points", "+2 points de passif"], ["Find Una's Lute and bring it back to Una.", "Trouvez le luth d'Una et rapportez-le-lui."]),
  r("candlemass", 1, "life", "Ogham Manor", ["+20 maximum life", "+20 de vie maximum"], [
    "Click the Psalm of Madness to wake Candlemass, the Living Rite, and kill him.",
    "Cliquez sur le Psalm of Madness pour réveiller Candlemass, the Living Rite, puis tuez-le.",
  ]),
  // Act 2
  r("sekhemas", 2, "ascend", "Traitor's Passage", ["Ascendancy points 1 and 2", "Points d'ascendance 1 et 2"], [
    "Run the Trial of the Sekhemas with Balbala's Barya, from the campaign quest.",
    "Faites le Trial of the Sekhemas avec la Balbala's Barya donnée par la quête.",
  ]),
  r("kabala", 2, "points", "Keth", ["+2 passive points", "+2 points de passif"], ["Kill Kabala, Constrictor Queen.", "Tuez Kabala, Constrictor Queen."]),
  r("relics", 2, "choice", "Valley of the Titans", ["+1 charm slot and a charm bonus", "+1 emplacement de charme et un bonus de charmes"], [
    "Pick up the Kabala Clan Relic (Keth) and the Sun Clan Relic (Bone Pits), then place them on the altar. You can swap the bonus later.",
    "Ramassez la Kabala Clan Relic (Keth) et la Sun Clan Relic (Bone Pits), puis posez-les sur l'autel. Le bonus peut être changé plus tard.",
  ]),
  r("shambrin", 2, "points", "Deshar", ["+2 passive points", "+2 points de passif"], ["Find the Final Letter and give it to Shambrin.", "Trouvez la Final Letter et donnez-la à Shambrin."]),
  r("garukhan", 2, "res", "Spires of Deshar", ["+10% lightning resistance", "+10 % de résistance à la foudre"], [
    "Click the Sisters of Garukhan shrine.",
    "Cliquez sur l'autel des Sisters of Garukhan.",
  ]),
  // Act 3
  r("silverfist", 3, "points", "Jungle Ruins", ["+2 passive points", "+2 points de passif"], ["Kill Mighty Silverfist.", "Tuez Mighty Silverfist."]),
  r("ignagduk", 3, "spirit", "Azak Bog", ["+30 Spirit", "+30 d'Esprit"], [
    "Kill Ignagduk, the Bog Witch (she also drops an Uncut Spirit Gem).",
    "Tuez Ignagduk, the Bog Witch (elle lâche aussi une Uncut Spirit Gem).",
  ]),
  r("servi", 3, "choice", "Venom Crypts", ["A permanent draught", "Un breuvage permanent"], [
    "Bring the Venom Vial to Servi and pick stun threshold, elemental ailment threshold or mana regeneration. This choice is final.",
    "Rapportez la Venom Vial à Servi et choisissez seuil d'étourdissement, seuil d'altérations élémentaires ou régénération de mana. Ce choix est définitif.",
  ]),
  r("blackjaw", 3, "res", "Jiquani's Machinarium", ["+10% fire resistance", "+10 % de résistance au feu"], [
    "Put the Small Soul Core on a Stone Altar to open the way, then kill Blackjaw, the Remnant.",
    "Posez le Small Soul Core sur un Stone Altar pour ouvrir le passage, puis tuez Blackjaw, the Remnant.",
  ]),
  r("chaos-trial", 3, "ascend", "Chimeral Wetlands", ["Ascendancy points 3 and 4", "Points d'ascendance 3 et 4"], [
    "Run the Trial of Chaos with the Chimeral Inscribed Ultimatum dropped by Xyclucian, the Chimera.",
    "Faites le Trial of Chaos avec la Chimeral Inscribed Ultimatum lâchée par Xyclucian, the Chimera.",
  ]),
  r("aggorat", 3, "points", "Aggorat", ["+2 passive points", "+2 points de passif"], [
    "Kill monsters until a Sacrificial Heart drops (also in Utzaal) and offer it at the altar.",
    "Tuez des monstres jusqu'à obtenir un Sacrificial Heart (aussi à Utzaal) et offrez-le sur l'autel.",
  ]),
  // Act 4
  r("omniphobia", 4, "points", "Journey's End", ["+2 passive points", "+2 points de passif"], [
    "Finish the Dark Mists quest by killing Omniphobia, Fear Manifest.",
    "Terminez la quête Dark Mists en tuant Omniphobia, Fear Manifest.",
  ]),
  r("silent-hall", 4, "life", "Eye of Hinekora", ["+5% maximum mana", "+5 % de mana maximum"], ["Pay your respects at the Silent Hall.", "Rendez hommage au Silent Hall."]),
  r("tattoos", 4, "choice", "Halls of the Dead", ["3 × attribute or resistance", "3 × attribut ou résistance"], [
    "Complete the three trials: each tattoo gives +5 to an attribute or +5% to a resistance. These choices are final.",
    "Terminez les trois épreuves : chaque tatouage donne +5 à un attribut ou +5 % à une résistance. Ces choix sont définitifs.",
  ]),
  r("yama", 4, "points", "Trial of the Ancestors", ["+2 passive points", "+2 points de passif"], [
    "Kill Yama the White, then speak to Hinekora.",
    "Tuez Yama the White, puis parlez à Hinekora.",
  ]),
  r("justice", 4, "choice", "Abandoned Prison", ["+30% life or mana flask recovery", "+30 % de récupération des flacons de vie ou de mana"], [
    "Find the Goddess of Justice and pick a bonus. You can swap it later.",
    "Trouvez la Goddess of Justice et choisissez un bonus. Il peut être changé plus tard.",
  ]),
  r("great-white", 4, "choice", "Whakapanu Island", ["A defence bonus", "Un bonus de défense"], [
    "Kill the Great White One and bring the Shark Fin to Kaimana.",
    "Tuez le Great White One et rapportez le Shark Fin à Kaimana.",
  ]),
  // Interludes
  r("oswin", 5, "points", "Wolvenhold", ["+2 passive points", "+2 points de passif"], ["Kill Oswin, the Dread Warden.", "Tuez Oswin, the Dread Warden."]),
  r("risu", 5, "points", "Clearing the Way", ["+2 passive points", "+2 points de passif"], [
    "Kill Akthi and Anundr, then speak to Risu.",
    "Tuez Akthi et Anundr, puis parlez à Risu.",
  ]),
  r("molten-gift", 5, "life", "Khari Crossing", ["+5% maximum life", "+5 % de vie maximum"], [
    "In the Skullmaw Stairway, use the Molten One's Gift at the Molten Shrine.",
    "Dans le Skullmaw Stairway, utilisez le Molten One's Gift sur le Molten Shrine.",
  ]),
  r("seven-pillars", 5, "choice", "Qimah", ["A bonus of your choice", "Un bonus au choix"], [
    "At the Seven Pillars, pick a bonus (attributes, resistances, movement speed…). You can swap it later; avoid the experience one, it reverses the others.",
    "Aux Seven Pillars, choisissez un bonus (attributs, résistances, vitesse de déplacement…). Il peut être changé plus tard ; évitez celui d'expérience, il inverse les autres.",
  ]),
  r("lythara", 5, "spirit", "Kriar Village", ["+40 Spirit", "+40 d'Esprit"], ["Kill Lythara, the Wayward Spear.", "Tuez Lythara, the Wayward Spear."]),
  r("madox", 5, "choice", "Kriar Peaks", ["A free unique item", "Un objet unique gratuit"], [
    "Talk to Elder Madox and pick one of the uniques he offers.",
    "Parlez à Elder Madox et choisissez un des uniques proposés.",
  ]),
  r("yeti", 5, "points", "Howling Caves", ["+2 passive points", "+2 points de passif"], ["Kill the Abominable Yeti.", "Tuez l'Abominable Yeti."]),
  r("hooded-one", 5, "points", "Kingsmarch", ["+2 passive points", "+2 points de passif"], [
    "After the interludes, talk to the Hooded One to finish Siege of Oriath.",
    "Après les interludes, parlez au Hooded One pour terminer Siege of Oriath.",
  ]),
];

const ACT1_PLACES = /\b(beach|clearfell|grelwood|grim tangle|ogham|freythorn|devourer|areagne)\b/i;

/** Campaign part a character level falls in, roughly (where leveling guides usually are at that level). */
const partOfLevel = (level: number): CampaignPart => (level < 16 ? 1 : level < 30 ? 2 : level < 44 ? 3 : level < 54 ? 4 : 5);

/** Where a step starts: a campaign part, null once past the campaign (maps), undefined when the name says nothing. */
function startOf(name: string): CampaignPart | null | undefined {
  const act = name.match(/\bact\s*(\d)/i);
  if (act) return Math.min(5, Math.max(1, Number(act[1]))) as CampaignPart;
  if (/interlude/i.test(name)) return 5;
  if (/\b(maps?|mapping|endgame|optional)\b/i.test(name)) return null;
  if (/end of campaign|late campaign/i.test(name)) return 5;
  if (ACT1_PLACES.test(name)) return 1;
  const level = name.match(/\blevel\s*(\d+)/i) ?? name.match(/^(\d+)\s*\+/);
  if (level) return partOfLevel(Number(level[1]));
  if (/\b(campaign|leveling|default|early)\b/i.test(name)) return 1;
  return undefined;
}

/**
 * Campaign parts each leveling step covers, from the step names of a route ("Act 1", "Act 3+", "Level 6 to 14",
 * "Interludes", "Early Maps"…). A step runs until the next step that starts later; steps past the campaign cover none.
 */
export function stepParts(names: string[]): CampaignPart[][] {
  const starts: (CampaignPart | null)[] = [];
  for (const name of names) {
    const prev = starts.at(-1);
    const s = startOf(name);
    if (prev === null) starts.push(null); // Once in maps, the route does not go back to the campaign.
    else if (s === undefined) starts.push(prev ?? 1);
    else starts.push(s === null ? null : (Math.max(s, prev ?? 1) as CampaignPart));
  }
  return starts.map((s, i) => {
    if (s === null) return [];
    let end: number = 5;
    for (const next of starts.slice(i + 1)) {
      if (next === null) break;
      if (next > s) {
        end = next - 1;
        break;
      }
    }
    return Array.from({ length: end - s + 1 }, (_, k) => (s + k) as CampaignPart);
  });
}
