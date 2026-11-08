---
title: Shield Wall Warbringer
class: Warrior
ascendancy: Warbringer
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Shield Wall Warbringer Build Guide
  author: carn (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/shield-wall-warbringer-build-guide
  updated: 2026-09-07
summary: Armour-stacking Warrior that raises Shield Wall fissures and detonates them with warcries, breaking enemy armour for huge physical hits.
tags: [mace, shield, warcry, physical, tanky]
damage: Physical
playstyle: Melee
difficulty: easy
budget: low
tiers:
  starter: A
pros:
  - Easy-to-find gear
  - Satisfying corpse and fissure explosions
  - Good damage and speed on a low budget
cons:
  - Slow animations early in the campaign
  - Scales less than top builds in the very late endgame
skills:
  - gem: Shield Wall
    supports: [Rapid Attacks II, Ahn's Citadel, Kaom's Madness, Heft, Rageforged II]
    note: Creates fissures that every other skill detonates
  - gem: Fortifying Cry
    supports: [Raging Cry, Heavy Swing, Brutality III, Atalui's Bloodletting, Heft]
    note: Guard, damage and fissure detonation
  - gem: Infernal Cry
    supports: [Raging Cry, Tireless, Echoing Cry, Magnified Area II]
    note: Empowers attacks, detonates fissures, generates Rage
  - gem: Sunder
    supports: [Rapid Attacks III, Rigwald's Ferocity, Rage III, Prolonged Duration II]
    note: Use after armour is broken
  - gem: Leap Slam
    supports: [Holy Descent, Rage III, Rapid Attacks III, Magnified Area II]
    note: Movement that also detonates fissures
  - gem: Shield Charge
    supports: [Rapid Attacks III, Rage III, Magnified Area I, Close Combat II]
    note: Movement that also detonates fissures
  - gem: Mace Strike
    supports: [Rapid Attacks II, Close Combat I]
  - gem: War Banner
    supports: [Daresso's Passion, Magnified Area II, Prolonged Duration II]
  - gem: Scavenged Plating
    supports: [Prolonged Duration II, Cannibalism I]
  - gem: Encase in Jade
    supports: [Prolonged Duration II, Physical Mastery]
  - gem: Raise Shield
    supports: []
leveling:
  - name: "Level 1-22"
    steps:
      - name: "Level 1-22"
        skills:
          - gem: "Mace Strike"
            supports: [Rapid Attacks II, Concentrated Area]
          - gem: "Rolling Slam"
            supports: [Brink I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Infernal Cry"
            supports: [Tireless]
          - gem: "Herald of Ash"
          - gem: "Perfect Strike"
            supports: [Window of Opportunity I, Rapid Attacks I]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Rolling Slam"
          - gem: "Boneshatter"
      - name: "Single Target"
        steps:
          - gem: "Infernal Cry"
          - gem: "Perfect Strike"
            count: 2
  - name: "Shield Wall Campaign"
    steps:
      - name: "Shield Wall Swap"
        skills:
          - gem: "Shield Wall"
            supports: [Rapid Attacks I, Fire Attunement, Magnified Area I]
          - gem: "Shockwave Totem"
            supports: [Urgent Totems I]
          - gem: "Leap Slam"
            supports: [Rapid Attacks I]
          - gem: "Shield Charge"
            supports: [Rapid Attacks I]
          - gem: "Infernal Cry"
            supports: [Tireless, Raging Cry]
          - gem: "Herald of Ash"
          - gem: "Fortifying Cry"
            supports: [Brutality II, Raging Cry]
      - name: "Shield Wall Campaign"
        skills:
          - gem: "Shield Wall"
            supports: [Rapid Attacks II, Fire Attunement, Magnified Area II, Impale]
          - gem: "Shockwave Totem"
            supports: [Urgent Totems I]
          - gem: "Leap Slam"
            supports: [Rapid Attacks I]
          - gem: "Shield Charge"
            supports: [Rapid Attacks I]
          - gem: "Infernal Cry"
            supports: [Tireless, Raging Cry, Echoing Cry]
          - gem: "Herald of Ash"
          - gem: "Fortifying Cry"
            supports: [Brutality II, Raging Cry, Heavy Swing]
      - name: "Endgame"
        skills:
          - gem: "Mace Strike"
            supports: [Rapid Attacks II, Close Combat I]
          - gem: "Raise Shield"
          - gem: "Shield Wall"
            supports: [Rapid Attacks II, Ahn's Citadel, Kaom's Madness, Heft, Rageforged II]
          - gem: "Fortifying Cry"
            supports: [Raging Cry, Heavy Swing, Brutality III, Atalui's Bloodletting, Heft]
          - gem: "Infernal Cry"
            supports: [Raging Cry, Tireless, Echoing Cry, Magnified Area II]
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
          - gem: "Encase in Jade"
            supports: [Prolonged Duration II, Physical Mastery]
    rotations:
      - name: "Skill Rotation"
        steps:
          - gem: "Infernal Cry"
          - gem: "Shield Wall"
          - gem: "Fortifying Cry"
          - gem: "Shield Wall"
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
    mods: [Increased Physical Damage, Increased Attack Speed, Gain Damage as Extra Physical, +Level of all Attack Skills, Damage against Fully Broken Armour]
  offhand:
    base: Tawhoan Tower Shield
    mods: [Increased Armour, Armour applies to Elemental Damage, Stun Threshold, Resistances]
    note: Gamble for the highest Armour shield you can find when you unlock Shield Wall.
  helmet:
    unique: Thrillsteel
  body:
    base: Warlord Cuirass
    mods: [Increased Armour, Armour applies to Elemental Damage, +Maximum Life, Elemental Resistances]
  gloves:
    base: Massive Mitts
    mods: [Increased Attack Speed, Increased Armour, Armour applies to Elemental Damage, +Maximum Life, +Level of all Melee Skills]
  boots:
    base: Tasalian Greaves
    mods: [Movement Speed, +Maximum Life, Increased Armour, Armour applies to Elemental Damage]
  amulet:
    base: Solar Amulet
    mods: [+Level of all Melee Skills, +Maximum Life, Increased Maximum Life, Elemental Resistances]
  ring1:
    base: Ruby Ring
    mods: [Adds Physical Damage to Attacks, +Maximum Life, Skill Speed, Cold Resistance]
  ring2:
    base: Amethyst Ring
    mods: [+Maximum Life, Life Leech, Elemental Resistances]
  belt:
    base: Plate Belt
    mods: [+Maximum Life, Armour, Elemental Resistances]
gearStages:
  campaign:
    weapon:
      base: Slim Mace
      mods: [+Level of all Melee Skills]
    offhand:
      base: Rampart Tower Shield
      mods: [Armour]
    helmet:
      base: Wrapped Greathelm
      mods: [+Maximum Life]
    body:
      base: Maraketh Cuirass
      mods: []
    gloves:
      base: Tempered Mitts
      mods: [+Level of all Melee Skills, Increased Attack Speed]
    boots:
      base: Bronze Greaves
      mods: [Movement Speed]
    amulet:
      base: Bloodstone Amulet
      mods: [+Level of all Melee Skills]
    ring1:
      base: Ruby Ring
      mods: [Mana Leech]
    ring2:
      base: Topaz Ring
      mods: [Life Leech]
    belt:
      base: Rawhide Belt
      mods: []
  endgame:
    weapon:
      base: Fortified Hammer
      mods: [Adds Fire Damage, Increased Attack Speed, Increased Physical Damage, Gain Damage as Extra Physical, +Level of all Attack Skills]
    offhand:
      base: Tawhoan Tower Shield
      mods: [Armour, Stun Threshold, Armour applies to Elemental Damage, Chaos Resistance]
    helmet:
      unique: "Thrillsteel"
    body:
      base: Warlord Cuirass
      mods: [Armour, Armour applies to Elemental Damage, +Maximum Life, Cold Resistance, Lightning Resistance]
    gloves:
      base: Massive Mitts
      mods: [Increased Attack Speed, Armour, Armour applies to Elemental Damage, Adds Lightning Damage to Attacks, +Maximum Life, Chaos Resistance]
    boots:
      base: Tasalian Greaves
      mods: [Movement Speed, +Maximum Life, Armour, Armour applies to Elemental Damage, Fire Resistance, Lightning Resistance]
    amulet:
      base: Solar Amulet
      mods: [Elemental Resistances, +Maximum Life, +Strength, +Level of all Melee Skills, Armour, Grants a Passive Skill]
    ring1:
      base: Ruby Ring
      mods: [Adds Physical Damage to Attacks, Cold Resistance, Evasion Rating, +Maximum Life, Mana Leech]
    ring2:
      base: Amethyst Ring
      mods: [Adds Cold Damage to Attacks, Elemental Resistances, Chaos Resistance, +Maximum Life]
    belt:
      base: Plate Belt
      mods: [Fire Resistance, +Maximum Life, Lightning Resistance, Cold Resistance]
passives:
  attribute: str
  path:
    - Brutal
    - Sturdy Metal
    - Relentless
    - Devastation
    - Smash
    - Blood Rush
    - Polished Iron
    - Gem Enthusiast
    - Adrenaline Rush
    - Light on your Feet
    - Momentum
    - Tempered Defences
    - Battle Trance
    - Heatproof
    - Crushing Verdict
    - Pile On
    - Irreparable
    - Knight of Tarcus
  ascendancy: [Anvil's Weight, Jade Heritage, Imploding Impacts, Warcaller's Bellow]
  weaponSet1: [Unyielding, Sand in the Eyes, The Molten One's Gift, Mass Hysteria]
  weaponSet2: [Admonisher, Escalation, Vocal Empowerment, Cacophony, Roaring Cries, Inherited Strength]
---

## How It Works

[[Shield Wall]], supported by the lineage gems [[Ahn's Citadel]] and [[Kaom's Madness]], sends out large fissures. Almost every other skill in the build detonates them: [[Fortifying Cry]], [[Infernal Cry]], [[Sunder]], [[Leap Slam]] and [[Shield Charge]]. You can set fissures up in advance while a boss spawns or just before opening an essence.

The Warbringer ascendancy turns this into a loop. Anvil's Weight makes all your damage break armour without spending a support gem, and Imploding Impacts makes broken armour hurt enemies even more. Warcaller's Bellow removes the cooldown from your warcries, so you can detonate fissures at will, and warcries also explode nearby corpses.

## Playstyle

1. Raise [[Shield Wall]] in front of the pack or boss.
2. Detonate it with [[Fortifying Cry]] (which also grants Guard) and [[Infernal Cry]] (which empowers your attacks and builds Rage).
3. Once the target's armour is fully broken, apply [[Sunder]] for the extra damage-taken debuff.
4. Move with [[Leap Slam]] and [[Shield Charge]], which detonate any fissure you pass through.

## Leveling

Spend early attribute points on Intelligence and Dexterity only as needed for gear and gems, and put everything else into Strength for life. When you reach level 22 and unlock [[Shield Wall]], spend your gold gambling for a shield with as much Armour as possible.

## Gear Priorities

Armour, life and "Armour applies to Elemental Damage" on every armour slot, plus a shield with high base Armour. On the mace, look for physical damage, attack speed and damage against fully broken armour. [[Thrillsteel]] grants permanent Onslaught.
