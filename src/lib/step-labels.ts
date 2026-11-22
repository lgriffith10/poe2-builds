// Source planners label leveling steps and rotations in English; this translates the common words for the French site.
const FR_WORDS: [RegExp, string][] = [
  [/\bPre-buff before boss fight\b/gi, "buffs avant le combat de boss"],
  [/\bSingle Target\b/gi, "Cible unique"],
  [/\b(?:Pack|Map) Clear(?:ing)?\b/gi, "Nettoyage"],
  [/\bClear(?:ing)?\b/g, "Nettoyage"],
  [/\bBoss(?:ing|es)\b/g, "Boss"],
  [/\bMapping\b/g, "Cartes"],
  [/\bSkill Rotation\b/gi, "Rotation"],
  [/\bEnd of Campaign\b/gi, "fin de campagne"],
  [/\bEarly Maps?\b|\bEarly Mapping\b/gi, "début des maps"],
  [/\bNew Supports?\b/gi, "nouveaux supports"],
  [/\bCampaign\b/gi, "Campagne"],
  [/\bAct\b/g, "Acte"],
  [/\bAct(\d)/g, "Acte $1"],
  [/\bLevels?\b/g, "Niveau"],
  [/\blevel\b/g, "niveau"],
  [/\bStep\b/gi, "étape"],
  [/\bBefore\b/gi, "avant"],
  [/\bAfter\b/gi, "après"],
  [/\bto\b/g, "à"],
  [/\band\b/g, "et"],
  [/\bAscendancy\b/gi, "Ascendance"],
  [/\b(\d)(st|nd|rd|th)\b/g, "$1e"],
];
/** Labels start with a capital even when the translated phrase comes first ("Early Maps" -> "Début des maps"). */
export const stepFr = (s: string) => {
  const out = FR_WORDS.reduce((acc, [re, to]) => acc.replace(re, to), s);
  return out.charAt(0).toUpperCase() + out.slice(1);
};
