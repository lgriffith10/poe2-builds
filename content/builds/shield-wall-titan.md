---
title: Shield Wall Titan Endgame
class: Warrior
ascendancy: Titan
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Shield Wall Titan Endgame Build Guide"
  author: "carn (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/shield-wall-titan-endgame-build-guide
  updated: 2026-09-02
summary: "Tanky Titan that spreads Shield Wall fissures across the screen and detonates them with warcries, slams and charges."
tags: [melee, shield, armour, warcry, tanky]
damage: Physical
playstyle: Melee
difficulty: medium
budget: low
pros:
  - "Very good defences from armour and a big shield"
  - "Gear is easy to find"
  - "Good damage and speed on a low budget"
cons:
  - "Slow animations early on"
  - "Scales less than other builds in the very late endgame"
  - "Endgame only: needs level 68 and a finished campaign"
skills:
  - gem: "Mace Strike"
    supports: [Rapid Attacks II, Close Combat I]
    note: "Basic attack"
  - gem: "Raise Shield"
    supports: []
    note: "Block heavy hits"
  - gem: "Shield Wall"
    supports: [Rapid Attacks II, Ahn's Citadel, Kaom's Madness, Heft, Atalui's Bloodletting]
    note: "Main skill; lineage supports turn it into branching fissures"
  - gem: "Fortifying Cry"
    supports: [Enraged Warcry II, Raging Cry, Heavy Swing, Brutality III, Life Leech III]
    note: "Guard, damage and fissure detonation; consumes Rage to skip its cooldown"
  - gem: "Infernal Cry"
    supports: [Enraged Warcry II, Raging Cry, Tireless, Echoing Cry]
    note: "Empowers attacks and detonates fissures"
  - gem: "Sunder"
    supports: [Rapid Attacks III, Rigwald's Ferocity, Rage III, Prolonged Duration II]
    note: "Extra damage on armour-broken enemies; also detonates fissures"
  - gem: "Leap Slam"
    supports: [Holy Descent, Rage III, Rapid Attacks III, Magnified Area II]
    note: "Movement that detonates fissures"
  - gem: "Shield Charge"
    supports: [Rapid Attacks III, Rage III, Magnified Area I, Close Combat II]
    note: "Movement that detonates fissures"
  - gem: "War Banner"
    supports: [Daresso's Passion, Magnified Area II, Prolonged Duration II]
    note: "Extra single-target damage"
  - gem: "Scavenged Plating"
    supports: [Prolonged Duration II, Cannibalism I]
    note: "Armour buff"
gemPriority:
  skills:
    - label: "Level first"
      gems: [Shield Wall, Fortifying Cry]
    - label: "Level carefully only if mana is comfortable"
      gems: [Infernal Cry]
    - label: "Do not level"
      gems: [Shield Charge, Leap Slam, Tame Beast]
  spirit:
    - label: "Lower prio"
      gems: [Herald of Ash]
levelingSource:
  title: "Boneshatter Titan Build Guide"
  url: https://maxroll.gg/poe2/build-guides/boneshatter-titan-leveling-guide
leveling:
  - steps:
      - name: "Act 1"
        skills:
          - gem: "Mace Strike"
            supports: [Concentrated Area, Rapid Attacks I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Rolling Slam"
            supports: [Rapid Attacks I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Execute I]
          - gem: "Infernal Cry"
          - gem: "Perfect Strike"
            supports: [Rapid Attacks I, Window of Opportunity I]
          - gem: "Herald of Ash"
          - gem: "Frost Bomb"
      - name: "Act 2"
        skills:
          - gem: "Mace Strike"
            supports: [Concentrated Area, Rapid Attacks I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Rolling Slam"
            supports: [Rapid Attacks I]
          - gem: "Forge Hammer"
            supports: [Fist of War I, Execute I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Execute I]
          - gem: "Infernal Cry"
            supports: [Raging Cry]
          - gem: "Leap Slam"
            supports: [Brink I, Crater]
          - gem: "Herald of Ash"
      - name: "Act 3+"
        skills:
          - gem: "Mace Strike"
            supports: [Rapid Attacks I, Armour Break I, Armour Demolisher I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Forge Hammer"
            supports: [Fist of War II, Execute II, Branching Fissures I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Urgent Totems III]
          - gem: "Infernal Cry"
            supports: [Raging Cry]
          - gem: "Leap Slam"
            supports: [Brink I, Crater, Rapid Attacks II]
          - gem: "Herald of Ash"
            supports: [Cannibalism I]
          - gem: "Scavenged Plating"
            supports: [Prolonged Duration I]
          - gem: "Hammer of the Gods"
            supports: [Fist of War I, Heavy Swing]
          - gem: "Seismic Cry"
            supports: [Raging Cry]
      - name: "Endgame"
        skills:
          - gem: "Mace Strike"
            supports: [Rapid Attacks II, Close Combat I]
          - gem: "Raise Shield"
          - gem: "Shield Wall"
            supports: [Rapid Attacks II, Ahn's Citadel, Kaom's Madness, Heft, Atalui's Bloodletting]
          - gem: "Fortifying Cry"
            supports: [Enraged Warcry II, Raging Cry, Heavy Swing, Brutality III, Life Leech III]
          - gem: "Infernal Cry"
            supports: [Enraged Warcry II, Raging Cry, Tireless, Echoing Cry]
          - gem: "Sunder"
            supports: [Rapid Attacks III, Rigwald's Ferocity, Rage III, Prolonged Duration II]
          - gem: "Leap Slam"
            supports: [Holy Descent, Rage III, Rapid Attacks III, Magnified Area II]
          - gem: "Shield Charge"
            supports: [Rapid Attacks III, Rage III, Magnified Area I, Close Combat II]
          - gem: "War Banner"
            supports: [Daresso's Passion, Magnified Area II, Prolonged Duration II]
          - gem: "Scavenged Plating"
            supports: [Prolonged Duration II, Cannibalism I]
rotations:
  - name: "Skill Rotation"
    steps:
      - gem: "Infernal Cry"
      - gem: "Shield Wall"
      - gem: "Fortifying Cry"
      - gem: "Shield Wall"
gear:
  weapon:
    base: Fortified Hammer
    mods: [Adds Fire Damage, Increased Attack Speed, Increased Physical Damage, Gain Damage as Extra Physical, +Level of all Attack Skills]
    runes: ["2× Greater Rune of Alacrity: 8% increased Skill Speed"]
  offhand:
    base: Tawhoan Tower Shield
    mods: [Armour, Armour applies to Elemental Damage, Chaos Resistance, Fire Resistance, Stun Threshold]
    runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  helmet:
    unique: "Thrillsteel"
    runes: ["Greater Desert Rune: +18% to Fire Resistance"]
  body:
    base: Warlord Cuirass
    mods: [Armour, Armour applies to Elemental Damage, +Maximum Life, Cold Resistance, Lightning Resistance]
    runes: ["3× Soul Core of Jiquani: 5% increased maximum Life"]
  gloves:
    base: Massive Mitts
    mods: [Increased Attack Speed, Armour, Armour applies to Elemental Damage, Adds Lightning Damage to Attacks, +Maximum Life, +Level of all Melee Skills]
    runes: ["Idol of Sirrius: 8% increased Attack Speed", "Greater Storm Rune: +18% to Lightning Resistance"]
  boots:
    base: Tasalian Greaves
    mods: [Movement Speed, +Maximum Life, Armour, Armour applies to Elemental Damage, Fire Resistance, Lightning Resistance]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
  amulet:
    base: Solar Amulet
    mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Level of all Melee Skills, Armour]
  ring1:
    base: Ruby Ring
    mods: [Adds Physical Damage to Attacks, Cold Resistance, Evasion Rating, +Maximum Life, Mana Leech]
  ring2:
    base: Amethyst Ring
    mods: [Elemental Resistances, Life Leech, Fire Resistance, +Maximum Life, +Maximum Mana]
  belt:
    base: Plate Belt
    mods: [Fire Resistance, +Maximum Life, Lightning Resistance, Cold Resistance, Armour]
passives:
  attribute: str
  path:
    - "Brutal"
    - "Sturdy Metal"
    - "Relentless"
    - "Devastation"
    - "Smash"
    - "Blood Rush"
    - "Polished Iron"
    - "Gem Enthusiast"
    - "Adrenaline Rush"
    - "Light on your Feet"
    - "Momentum"
    - "Tempered Defences"
    - "Battle Trance"
    - "Heatproof"
    - "Crushing Verdict"
    - "Pile On"
    - "Irreparable"
    - "Knight of Tarcus"
  ascendancy: [Colossal Capacity, Hulking Form, Stone Skin, Mysterious Lineage]
  weaponSet1: [Unyielding, Sand in the Eyes, The Molten One's Gift, Mass Hysteria]
  weaponSet2: [Admonisher, Escalation, Vocal Empowerment, Cacophony, Roaring Cries, Inherited Strength]
farming:
  clear: 2
  single: 2
  tank: 3
  speed: 1
  style: melee
  traits: [armour, block, physical]
---
## How It Works

[[Shield Wall]] is linked to the lineage supports Ahn's Citadel and Kaom's Madness, which turn the wall into branching fissures that cover a huge area. Almost every other skill then detonates those fissures: [[Fortifying Cry]] and [[Infernal Cry]] blow them up while adding damage and Rage, [[Leap Slam]] and [[Shield Charge]] do it while moving, and [[Sunder]] does it while making armour-broken enemies take even more damage.

With Enraged Warcry II, Raging Cry and the Roaring Cries notable, warcries spend Rage to skip their cooldown and generate Rage at the same time, so they are almost always ready.

The Titan's Colossal Capacity, Hulking Form, Stone Skin and Mysterious Lineage add size, armour and defences.

## Playstyle

**Mapping.** Drop [[Shield Wall]] ahead of you, then [[Leap Slam]] or [[Shield Charge]] into the fissures.

**Bossing.** Pre-place fissures while the boss spawns (or before opening an essence), break its armour, then alternate warcries and [[Sunder]]; plant [[War Banner]] for extra damage.

## Gear Priorities

Look for the shield with the highest armour you can find, then life and resistances everywhere. A body armour with high life and armour is the biggest defensive upgrade, and "Armour applies to Elemental Damage" is very valuable. Attack speed on gloves and skill speed on jewellery make the build much smoother. Thrillsteel and Constricting Command are the uniques that take it further.

## FAQ

**Do I need a good weapon to deal more damage?** No. Your weapon's damage plays no part in this build; only the stats tied to its key mechanics matter.

**My single target is weak on bosses, how do I fix it?** Swap [[Ahn's Citadel]] and [[Kaom's Madness]] for [[Concentrated Area]] and [[Close Combat II]], and use [[Sunder]] on the boss once its armour is broken, as it adds a lot of damage.

**How do I fix mana problems?** One Mana Leech modifier on a ring or gloves solves them. Do not level [[Leap Slam]], [[Infernal Cry]] or [[Seismic Cry]]; leveling Infernal Cry is still worth it, but only if your mana is comfortable or you have a fifth socket to support it with [[Lifetap]].

**An upgrade left me unable to use a skill or item, what now?** Spend gold at the Hooded One or Doryani to respec your attribute points so they meet the new requirements.
