---
title: Hollow Form Whirling Assault Martial Artist
class: Monk
ascendancy: Martial Artist
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Hollow Form Whirling Assault Martial Artist Build Guide"
  author: "manni (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/hollow-form-whirling-assault-martial-artist-build-guide
  updated: 2026-09-03
summary: "Monk Martial Artist who holds Hollow Form to summon clones that run the full Whirling Assault sequence, fed with Power Charges by Lochtonial Caress."
tags: [melee, quarterstaff, crit, evasion, energy shield, chaos inoculation]
damage: Physical / Lightning
playstyle: Melee
difficulty: medium
budget: low
tiers:
  starter: S
pros:
  - "Smooth playstyle: hold Hollow Form and let the clones work"
  - "Self-sufficient early variant without expensive items"
  - "Evasion, energy shield and Chaos Inoculation scale well"
cons:
  - "Needs Whirling Assault, two ascensions and Lochtonial Caress to start"
  - "Levels with a different cold staff setup until 41"
skills:
  - gem: "Hollow Form"
    supports: [Whirling Assault, Rigwald's Ferocity, Vorana's Siege, Rakiata's Flow, Blindside]
    weaponSet: 2
  - gem: "Hollow Focus"
    supports: [Magnified Area II, Blind II, Cooldown Recovery II, Armour Break III, Living Lightning II]
    weaponSet: 2
  - gem: "Rend"
    supports: [Prolonged Duration II, Blazing Critical, Rage III, Perpetual Charge, Rapid Attacks III]
    weaponSet: 1
  - gem: "Killing Palm"
    supports: [Rage III, Rapid Attacks II, Charge Profusion II, Ancestral Call II, Thrill of the Kill II]
  - gem: "Pounce"
    supports: [Prolonged Duration II, Mark for Death, Brutus' Brain, Cooldown Recovery II, Rapid Attacks III]
  - gem: "Charge Regulation"
    supports: [Uhtred's Exodus]
  - gem: "Wind Dancer"
    supports: [Magnified Area II, Rage III, Blind II, Maim, Heavy Swing]
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II, Clarity I, Cool Headed, Her Declaration]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery II]
gemPriority:
  skills:
    - label: "Act 1"
      gems: [Glacial Cascade, Frozen Locus, Frost Bomb, Pounce, Tempest Bell, Ice Strike]
    - label: "Act 2"
      gems: [Freezing Mark]
  spirit:
    - label: "Act 1"
      gems: [Herald of Ice]
  supports:
    - label: "Act 1"
      gems: [Rage I, Concentrated Area, Ice Bite I, Elemental Armament I, Magnified Area I]
    - label: "Act 2"
      gems: [Magnified Area I, Durability, Cold Attunement, Execute I, Elemental Armament II, Prolonged Duration I, Mark of Siphoning]
leveling:
  - name: "Campaign (1-41)"
    steps:
      - name: "Level 1-14"
        skills:
          - gem: "Glacial Cascade"
            supports: [Concentrated Area, Rage I]
          - gem: "Frozen Locus"
            supports: [Ice Bite I, Elemental Armament I]
          - gem: "Herald of Ice"
            supports: [Magnified Area I]
          - gem: "Frost Bomb"
          - gem: "Pounce"
      - name: "Level 14-41"
        skills:
          - gem: "Ice Strike"
            supports: [Rage II, Elemental Armament II, Cold Attunement]
          - gem: "Frozen Locus"
            supports: [Ice Bite I, Elemental Armament I]
          - gem: "Tempest Bell"
            supports: [Magnified Area I, Durability, Execute I]
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament II]
          - gem: "Frost Bomb"
          - gem: "Freezing Mark"
            supports: [Mark of Siphoning, Prolonged Duration I]
          - gem: "Hollow Focus"
            supports: [Magnified Area I, Cooldown Recovery I]
    rotations:
      - name: "Clearing"
        steps:
          - gem: "Frozen Locus"
            label: "Place Locus in the pack"
          - gem: "Ice Strike"
            label: "Destroy Locus with Ice Strike"
      - name: "Bosses"
        steps:
          - gem: "Frost Bomb"
            label: "Debuff the Boss with Frost Bomb and Freezing Mark"
          - gem: "Freezing Mark"
          - gem: "Ice Strike"
            label: "Build 4 Combo"
          - gem: "Tempest Bell"
            label: "Use Tempest Bell when possible"
          - gem: "Ice Strike"
            label: "Hit Boss and Tempest Bell with Ice Strike"
  - name: "Early (Level 41+)"
    steps:
      - name: "Default"
        skills:
          - gem: "Hollow Form"
            supports: [Whirling Assault, Heavy Swing, Heightened Charges, Magnified Area II, Blindside]
          - gem: "Killing Palm"
            supports: [Rapid Attacks II, Charge Profusion II, Rage III, Ancestral Call II]
          - gem: "Rend"
            supports: [Prolonged Duration II, Blazing Critical, Rage III, Perpetual Charge, Rapid Attacks II]
          - gem: "Hollow Focus"
            supports: [Cooldown Recovery II, Magnified Area II, Armour Break III, Blind II, Life Leech III]
          - gem: "Wind Dancer"
            supports: [Magnified Area II, Blind II, Maim, Rage III, Heavy Swing]
          - gem: "Charge Regulation"
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II, Vitality I, Clarity I, Strong Hearted, Cool Headed]
          - gem: "Pounce"
            supports: [Mark for Death II, Mark of Siphoning II, Prolonged Duration II, Holy Descent, Cooldown Recovery II]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II]
      - name: "Endgame"
        skills:
          - gem: "Hollow Form"
            supports: [Whirling Assault, Rigwald's Ferocity, Vorana's Siege, Rakiata's Flow, Blindside]
          - gem: "Hollow Focus"
            supports: [Magnified Area II, Blind II, Cooldown Recovery II, Armour Break III, Living Lightning II]
          - gem: "Rend"
            supports: [Prolonged Duration II, Blazing Critical, Rage III, Perpetual Charge, Rapid Attacks III]
          - gem: "Killing Palm"
            supports: [Rage III, Rapid Attacks II, Charge Profusion II, Ancestral Call II, Thrill of the Kill II]
          - gem: "Pounce"
            supports: [Prolonged Duration II, Mark for Death, Brutus' Brain, Cooldown Recovery II, Rapid Attacks III]
          - gem: "Charge Regulation"
            supports: [Uhtred's Exodus]
          - gem: "Wind Dancer"
            supports: [Magnified Area II, Rage III, Blind II, Maim, Heavy Swing]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II, Clarity I, Cool Headed, Her Declaration]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II]
    rotations:
      - name: "Clearing"
        steps:
          - gem: "Hollow Form"
            label: "Clear with Hollow Form"
          - gem: "Killing Palm"
            label: "for mobilty"
          - gem: "Pounce"
      - name: "Boss Fights"
        steps:
          - gem: "Killing Palm"
            label: "Pre-stack Power Charges, Rage and Rend's Buff"
          - gem: "Hollow Focus"
          - gem: "Rend"
          - gem: "Pounce"
            label: "debuff the boss"
          - gem: "Hollow Form"
            label: "Dps"
rotations:
  - name: "Clearing"
    steps:
      - gem: "Hollow Form"
        label: "Clear with Hollow Form"
      - gem: "Killing Palm"
        label: "for mobilty"
      - gem: "Pounce"
  - name: "Boss Fights"
    steps:
      - gem: "Killing Palm"
        label: "Pre-stack Power Charges, Rage and Rend's Buff"
      - gem: "Hollow Focus"
      - gem: "Rend"
      - gem: "Pounce"
        label: "debuff the boss"
      - gem: "Hollow Form"
        label: "Dps"
gear:
  weapon:
    unique: "Amor Mandragora"
  helmet:
    base: Grinning Mask
    mods: [Evasion Rating, Energy Shield, Critical Hit Chance, Deflection, +Attributes]
    runes: ["Raven-Touched Shard"]
  body:
    base: Sleek Jacket
    mods: [Evasion Rating, Energy Shield, Deflection, Elemental Resistances]
    runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Rune of Foundations: +30 to Armour, +30 to Evasion Rating, +10 to maximum Energy Shield"]
  gloves:
    unique: "Lochtonial Caress"
    runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
  boots:
    base: Sekhema Sandals
    mods: [Movement Speed, Energy Shield, Elemental Resistances, +Intelligence]
    runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
  amulet:
    base: Gold Amulet
    mods: [+Spirit, +Level of all Melee Skills, Energy Shield, Critical Hit Chance, Critical Damage Bonus, +Maximum Mana]
  ring1:
    base: Prismatic Ring
    mods: [Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Elemental Resistances, +Attributes]
  ring2:
    base: Prismatic Ring
    mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Elemental Resistances, +Attributes]
  belt:
    unique: "Mageblood"
  weapon2:
    base: Sinister Quarterstaff
    mods: [High Physical DPS, Critical Hit Chance, Critical Damage Bonus, +Level of all Attack Skills, +Level of all Melee Skills, Increased Attack Speed]
gearStages:
  campaign:
    weapon:
      base: Changeling Talisman
      mods: []
    helmet:
      base: Felt Cap
      mods: [Evasion Rating, Elemental Resistances, +Maximum Life, +Attributes]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    body:
      base: Pathfinder Coat
      mods: [Evasion Rating, Elemental Resistances, +Maximum Life]
      runes: ["Lesser Glacial Rune: +10% to Cold Resistance", "Lesser Desert Rune: +10% to Fire Resistance"]
    gloves:
      base: Suede Bracers
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, +Level of all Melee Skills, Elemental Resistances]
      runes: ["Lesser Storm Rune: +10% to Lightning Resistance"]
    boots:
      base: Embossed Boots
      mods: [Movement Speed, Evasion Rating, Elemental Resistances, +Maximum Life]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    amulet:
      base: Crimson Amulet
      mods: [+Attributes, Elemental Resistances]
    ring1:
      base: Iron Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Elemental Resistances, +Attributes]
    ring2:
      base: Iron Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Elemental Resistances, +Attributes]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances, +Strength]
    weapon2:
      base: Gothic Quarterstaff
      mods: [High Physical DPS, +Level of all Melee Skills]
  mapping:
    weapon:
      unique: "Amor Mandragora"
    helmet:
      base: Grinning Mask
      mods: [Energy Shield, Evasion Rating, Elemental Resistances, Critical Hit Chance, Deflection, +Dexterity]
      runes: ["Raven-Touched Shard"]
    body:
      base: Sleek Jacket
      mods: [Evasion Rating, Energy Shield, Elemental Resistances, Deflection, +Dexterity, +Intelligence]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Rune of Foundations: +30 to Armour, +30 to Evasion Rating, +10 to maximum Energy Shield"]
    gloves:
      unique: "Lochtonial Caress"
      runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Elemental Resistances, Evasion Rating, Energy Shield, Deflection, +Maximum Life]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Melee Skills, +Spirit, +Attributes, Energy Shield, +Maximum Life, +Maximum Mana]
    ring1:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Elemental Resistances, +Attributes]
    ring2:
      base: Amethyst Ring
      mods: [Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Elemental Resistances, +Attributes]
    belt:
      base: Wide Belt
      mods: [+Maximum Life, Elemental Resistances, +Strength, +Maximum Mana]
    weapon2:
      base: Wyrm Quarterstaff
      mods: [High Physical DPS, Critical Hit Chance, Critical Damage Bonus, +Level of all Melee Skills, +Level of all Attack Skills]
      runes: ["2× Greater Iron Rune: 18% increased Physical Damage"]
  endgame:
    weapon:
      unique: "Amor Mandragora"
    helmet:
      base: Grinning Mask
      mods: [Evasion Rating, Energy Shield, Critical Hit Chance, Deflection, +Attributes]
      runes: ["Raven-Touched Shard"]
    body:
      base: Sleek Jacket
      mods: [Evasion Rating, Energy Shield, Deflection, Elemental Resistances]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Rune of Foundations: +30 to Armour, +30 to Evasion Rating, +10 to maximum Energy Shield"]
    gloves:
      unique: "Lochtonial Caress"
      runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    amulet:
      base: Gold Amulet
      mods: [+Spirit, +Level of all Melee Skills, Energy Shield, Critical Hit Chance, Critical Damage Bonus, +Maximum Mana]
    ring1:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Elemental Resistances, +Attributes]
    ring2:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Elemental Resistances, +Attributes]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Sinister Quarterstaff
      mods: [High Physical DPS, Critical Hit Chance, Critical Damage Bonus, +Level of all Attack Skills, +Level of all Melee Skills, Increased Attack Speed]
passives:
  attribute: dex
  path:
    - "Flow Like Water"
    - "Crashing Wave"
    - "Mindful Awareness"
    - "Step Like Mist"
    - "Shimmering"
    - "Immaterial"
    - "Essence of the Storm"
    - "Killer Instinct"
    - "Dizzying Sweep"
    - "Overflowing Power"
    - "Frantic Reach"
    - "Resolute Reach"
    - "Spectral Ward"
    - "Shadow Dancing"
    - "For the Jugular"
    - "Deadly Force"
    - "True Strike"
    - "Martial Artistry"
    - "First Principle of the Hollow"
    - "First Teachings of the Keeper"
    - "The Hollowkeeper"
    - "Chakra of Sight"
    - "Chaos Inoculation"
    - "Patient Barrier"
    - "Ingenuity"
    - "Careful Assassin"
    - "Conservative Casting"
  ascendancy: [Hollow Form Technique, Hollow Focus Technique, Way of the Stonefist, Runic Meridians]
  weaponSet1: [Disciplined Training, Lingering Horror, Preservation, Thin Ice, Harsh Winter]
  weaponSet2: [Heartstopping, Struck Through, Heartbreaking, Dizzying Hits, Stupefy, Concussive Attack, Moment of Truth]
farming:
  clear: 3
  single: 2
  tank: 2
  speed: 2
  style: melee
  traits: [evasion, es, ci]
---
## How It Works

Hold [[Hollow Form]] and your clones attack with the full [[Whirling Assault]] sequence. Hollow Form spawns extra clones when it can consume a Power Charge, and the Way of the Stonefist version of Lochtonial Caress gives your clones a chance to grant you charges, so the build sustains them on its own. [[Hollow Focus]] creates Ghost Bells, [[Killing Palm]] jumps between packs for Rage, and [[Rend]] consumes a Power Charge for a buff of 50% extra Lightning Damage to all skills (about 25 seconds). [[Pounce]] marks bosses with Predator's Mark and breaks armour with Mark for Death.

Runic Meridians, the last two ascendancy points, let you socket five extra runes into your character. Defences are evasion and energy shield, with [[Ghost Dance]] for recovery, then Chaos Inoculation.

## Leveling

Up to level 41, level with a cold quarterstaff build. Upgrade the base early (Long Quarterstaff at level 4, Gothic at 11, with two lesser elemental or Iron Runes), and get "adds damage to attacks" on gloves and rings (Iron Rings have it as an implicit).
- Act 1: place [[Frozen Locus]] and destroy it with [[Glacial Cascade]]; on bosses, Frost Bomb on cooldown for Exposure, then spam Glacial Cascade and land its final spike.
- With [[Tempest Bell]], build 4 combo with Quarterstaff Strike to place it on the boss. At level 14, Ice Strike replaces Quarterstaff Strike, then Glacial Cascade: Frozen Locus plus [[Ice Strike]] for packs, and Tempest Bell, Frost Bomb and Freezing Mark on bosses.
- Hollow Palm Technique usually beats an average Act 2-3 weapon, unless you have a strong leveling weapon such as Nazir's Judgement.
- The build starts at level 41 with Whirling Assault, two ascensions and Lochtonial Caress.

## Playstyle

**Mapping.** Hold Hollow Form. Use Killing Palm to jump into the next pack; hitting Ghost Bells with it also builds Power Charges and Rage before a boss.

**Bossing.** Refresh Rend's buff, Pounce for Predator's Mark (more damage for each ally near the marked enemy, so Living Lightning II on Hollow Focus helps) and keep holding Hollow Form. [[Refutation]] blocks a hit and applies Parried: enemies take 50% more attack damage.

## Endgame Progression

**Early maps.**
- Energy shield and evasion first, life second. Instill Well of Power on the amulet for mana.
- Upgrade Lochtonial Caress at the Verisium Anvil for Runic Ward; it rerolls the values, so only the Power Charge roll afterwards matters: "5-10% chance to grant a Power Charge to Allies in your Presence on Hit", 8% minimum.
- The staff's combined physical and elemental DPS matters most, then critical chance, + Melee levels, attack speed and critical damage. Avoid Dreaming Quarterstaff (0% critical chance). About 400 DPS clears tier 15 maps.
- Any talisman for the other set, Amor Mandragora adding skill effect duration for Rend. Added damage to attacks on rings and + Melee levels on the amulet are the best non-weapon damage.
- Runic Meridians first fix attributes and resistances with basic runes; in the endgame, socket Craiceann's Rune of Recovery, Craiceann's Rune of Warding, Farrul's Rune of the Chase and Thane Grannell's Rune of Mastery (runes with local item stats do not work there).
- Swap to Chaos Inoculation at around 3,000 energy shield, with the Endgame (CI) tree.

**Gems.** Hollow Form must be on weapon set 2 only. Prioritise Whirling Assault levels, and a 20% quality "+1 level" corrupted copy when affordable. As elemental damage grows (Heart of the Well, Saqawal's Rune of the Sky, Fenumus' Rune of Agony, Rend), replace Heavy Swing with Rigwald's Ferocity (the staff on weapon set 2 gets its 30% more damage), add Rakiata's Flow instead of Heightened Charges and Vorana's Siege instead of Magnified Area II. Brutus' Brain on Pounce keeps six immortal wolves (set Summon Wolves to both weapon sets). Her Declaration on Ghost Dance with spare Spirit.

**Endgame gear.**
- Runeforged Duality, damage variant, reaches over 900 physical DPS; a perfect rare with 900+ DPS, high critical chance and + Attack levels is better but replacing Duality should be one of the last steps.
- Mageblood is the chase belt; Headhunter or Ingenuity are solid alternatives. A Heart of the Well with extra damage of any element (ideally twice), critical chance, critical damage and movement speed.
- Voices gives several Sinister Jewel Sockets for rare jewels: maximum energy shield, critical damage and chance, area, faster energy shield recharge, attack and quarterstaff damage.
- A Raven-Touched Shard on the final helmet, instilled with Potent Liquid Melancholy, Ferocity and Contempt for the hidden notable Zarokh's Gift (an extra jewel socket).
- Nascent Hope and The Fall of the Axe as charms, and Rite of Passage as a luxury.

## Gear Priorities

Staff DPS and critical chance, Lochtonial Caress with a high Power Charge roll, + Melee levels on the amulet, added damage on rings, and evasion and energy shield on armour.

## FAQ

**How do Hollow Form and Hollow Focus get more sockets?** They are ascendancy skills that level with your character: 5th socket at level 65, 6th at 90. Gemcutter's Prisms do not work on them.

**How do I craft a starter staff?** Take a normal or magic Sinister, Skullcrusher, Razor, Striking, Aegis, Lunar or Wyrm Quarterstaff. Use Greater Transmutation or Augmentation Orbs until you get increased physical damage (100% is enough for about 400 DPS), then a Greater Essence of Abrasion and two Greater Iron Runes. Fill the rest with two Exalted or Greater Exalted Orbs and finish with a Preserved Jawbone.

**What amulet do I need?** Any amulet with + Melee levels and some Spirit, rarity, energy shield or critical stats is enough for most content. The source guide also details a full endgame craft around a fractured +3 to Melee Skills on a Gold Amulet.
