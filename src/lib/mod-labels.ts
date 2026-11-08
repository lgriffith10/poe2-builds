/**
 * Guides list the modifiers to look for on rare items with short labels ("+Maximum Life", "Fire Resistance").
 * This turns them into the in-game wording with # for the value ("+# to maximum Life", "+#% to Fire Resistance"),
 * so "+" always means a flat amount added and "#%" a percentage. Labels with real numbers are left as they are.
 */
const RULES: [RegExp, string | ((...m: string[]) => string)][] = [
  [/^\+Level of all (.+)$/, "+# to Level of all $1"],
  [/^\+Maximum (Life|Mana)$/, "+# to maximum $1"],
  [/^\+All Attributes$/, "+# to all Attributes"],
  [/^\+Attributes$/, "+# to Strength, Dexterity or Intelligence"],
  [/^\+(Spirit|Strength|Dexterity|Intelligence)$/, "+# to $1"],
  [/^Elemental Resistances$/, "+#% to all Elemental Resistances"],
  [/^(Fire|Cold|Lightning|Chaos) Resistance$/, "+#% to $1 Resistance"],
  [/^Movement Speed$/, "#% increased Movement Speed"],
  [/^Increased (.+)$/, (_, x) => `#% increased ${x}`],
  [/^((?:Spell |Attack )?Critical Hit Chance|Critical Damage Bonus)$/, "#% increased $1"],
  [/^Adds (.+) Damage( to Attacks)?$/, "Adds # to # $1 Damage$2"],
  [/^Gain Damage as Extra (.+)$/, "Gain #% of Damage as Extra $1 Damage"],
  [/^Armour applies to Elemental Damage$/, "+#% of Armour also applies to Elemental Damage"],
  [/^(Life|Mana) Leech$/, "Leeches #% of Physical Damage as $1"],
  [/^(Accuracy Rating|Stun Threshold)$/, "+# to $1"],
  [/^Block Chance$/, "+#% to Block chance"],
  [/^Mana Regeneration$/, "#% increased Mana Regeneration Rate"],
  [/^Minion Life$/, "Minions have #% increased maximum Life"],
];

export function modLabel(label: string): string {
  if (/\d/.test(label)) return label;
  for (const [re, to] of RULES) {
    if (re.test(label)) return typeof to === "string" ? label.replace(re, to) : label.replace(re, to as (...m: string[]) => string);
  }
  return label;
}
