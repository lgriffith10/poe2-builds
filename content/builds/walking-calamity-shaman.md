---
title: Walking Calamity Shaman
class: Druid
ascendancy: Shaman
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Walking Calamity Shaman Build Guide"
  author: "cptngarbage (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/walking-calamity-shaman-build-guide
  updated: 2026-09-04
summary: "Bear-form Druid that builds Rage with Maul and Rampage, then unleashes Walking Calamity eruptions; Polcirkeln adds chill and shatter."
tags: [shapeshift, bear, rage, melee]
damage: Fire / Physical
playstyle: Melee
difficulty: hard
budget: low
tiers:
  starter: B
  endgame: S
  bossing: A
pros:
  - "Huge area damage from Walking Calamity"
  - "Armour-stacking bear form is tanky"
  - "Strong rage-based burst"
cons:
  - "Setup-heavy boss rotation"
  - "Several uniques to unlock the full build"
skills:
  - gem: "Rampage"
    supports: [Momentum, Burgeon II, Close Combat II, Stomping Ground, Heavy Swing]
  - gem: "Walking Calamity"
    supports: [Prolonged Duration II, Elemental Armament II, Magnified Area II, Ambush, Close Combat II]
  - gem: "Maul"
    supports: [Rapid Attacks II, Armour Break III, Armour Demolisher II, Close Combat II]
  - gem: "Ferocious Roar"
    supports: [Echoing Cry, Raging Cry, Enraged Warcry II, Magnified Area II]
  - gem: "Herald of Ice"
    supports: [Magnified Area II, Armour Explosion, Armour Break III, Armour Demolisher II, Ambush]
  - gem: "Savage Fury"
    supports: [Prolonged Duration II]
  - gem: "Charge Regulation"
    supports: [Vitality II, Precision I]
  - gem: "Lunar Assault"
    supports: [Bhatair's Vengeance, Ancestral Call II, Freeze, Elemental Armament II]
  - gem: "Entangle"
    supports: [Upheaval II, Pinpoint Critical, Inexorable Critical II, Rapid Casting II]
  - gem: "Scavenged Plating"
    supports: [Prolonged Duration II]
leveling:
  - steps:
      - name: "Act 1"
        skills:
          - gem: "Maul"
            supports: [Rapid Attacks I, Concentrated Area]
          - gem: "Furious Slam"
            supports: [Fist of War I, Magnified Area I]
          - gem: "Shockwave Totem"
            supports: [Urgent Totems I, Overabundance I]
          - gem: "Pounce"
          - gem: "Frost Bomb"
          - gem: "Herald of Ash"
          - gem: "Fury of the Mountain"
            supports: [Upheaval I, Elemental Armament I]
          - gem: "Volcano"
      - name: "Act 2"
        skills:
          - gem: "Maul"
            supports: [Rapid Attacks I, Armour Break I]
          - gem: "Furious Slam"
            supports: [Fist of War II, Magnified Area I, Aftershock I]
          - gem: "Ferocious Roar"
            supports: [Infernal Cry, Raging Cry]
          - gem: "Shockwave Totem"
            supports: [Urgent Totems I, Overabundance I]
          - gem: "Pounce"
          - gem: "Frost Bomb"
          - gem: "Herald of Ash"
            supports: [Magnified Area I]
          - gem: "Fury of the Mountain"
            supports: [Upheaval I, Elemental Armament I]
      - name: "Act 3+"
        skills:
          - gem: "Rampage"
            supports: [Momentum, Burgeon I, Stomping Ground]
          - gem: "Walking Calamity"
            supports: [Prolonged Duration II, Elemental Armament II, Close Combat I]
          - gem: "Maul"
            supports: [Rapid Attacks I, Armour Break I]
          - gem: "Furious Slam"
            supports: [Fist of War II, Magnified Area I, Aftershock I]
          - gem: "Fury of the Mountain"
            supports: [Upheaval I, Fire Penetration I]
          - gem: "Ferocious Roar"
            supports: [Echoing Cry, Raging Cry, Enraged Warcry II]
          - gem: "Savage Fury"
          - gem: "Charge Regulation"
          - gem: "Herald of Ash"
            supports: [Magnified Area I]
      - name: "Endgame"
        skills:
          - gem: "Rampage"
            supports: [Momentum, Burgeon II, Close Combat II, Stomping Ground]
          - gem: "Walking Calamity"
            supports: [Prolonged Duration II, Elemental Armament II, Close Combat II, Magnified Area II]
          - gem: "Maul"
            supports: [Rapid Attacks II, Armour Break III, Armour Demolisher II, Close Combat II]
          - gem: "Ferocious Roar"
            supports: [Echoing Cry, Raging Cry, Enraged Warcry II]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Elemental Armament II, Cold Penetration]
          - gem: "Savage Fury"
            supports: [Prolonged Duration II]
          - gem: "Charge Regulation"
            supports: [Vitality II, Precision I]
          - gem: "Lunar Assault"
            supports: [Bhatair's Vengeance, Ancestral Call II, Freeze, Elemental Armament II]
rotations:
  - name: "Early Single Target"
    steps:
      - gem: "Maul"
      - gem: "Furious Slam"
      - gem: "Maul"
      - gem: "Furious Slam"
      - gem: "Shockwave Totem"
      - gem: "Ferocious Roar"
      - gem: "Volcano"
      - gem: "Frost Bomb"
      - gem: "Savage Fury"
  - name: "Early Clear"
    steps:
      - gem: "Maul"
      - gem: "Furious Slam"
      - gem: "Maul"
      - gem: "Furious Slam"
      - gem: "Pounce"
      - gem: "Savage Fury"
  - name: "Later Single Target"
    steps:
      - gem: "Ferocious Roar"
      - gem: "Walking Calamity"
      - gem: "Entangle"
      - gem: "Rampage"
      - gem: "Savage Fury"
  - name: "Late Clear"
    steps:
      - gem: "Ferocious Roar"
      - gem: "Lunar Assault"
      - gem: "Walking Calamity"
      - gem: "Rampage"
      - gem: "Savage Fury"
gear:
  weapon:
    base: Maji Talisman
    mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Adds Lightning Damage, Adds Fire Damage, Critical Hit Chance]
  helmet:
    base: Warmonger Greathelm
    mods: [Elemental Resistances, Armour applies to Elemental Damage, Armour, +Maximum Life, Chaos Resistance]
  body:
    unique: "Cloak of Flame"
  gloves:
    base: Knightly Mitts
    mods: [Armour applies to Elemental Damage, +Maximum Life, Armour, Elemental Resistances]
  boots:
    base: Ornate Greaves
    mods: [Movement Speed, Armour applies to Elemental Damage, Elemental Resistances, +Maximum Life, Armour]
  amulet:
    unique: "Defiance of Destiny"
  ring1:
    base: Amethyst Ring
    mods: [+Maximum Life, Elemental Resistances, Mana Regeneration, Adds Cold Damage to Attacks, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks]
  ring2:
    unique: "Polcirkeln"
  belt:
    unique: "Goregirdle"
gearStages:
  campaign:
    weapon:
      base: Vicious Talisman
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Lightning Damage, Adds Cold Damage, Adds Fire Damage, Increased Attack Speed]
    helmet:
      base: Warrior Greathelm
      mods: [+Maximum Life, Armour, Elemental Resistances, Armour applies to Elemental Damage]
    body:
      base: Vaal Cuirass
      mods: [+Maximum Life, Elemental Resistances, Armour, Armour applies to Elemental Damage]
    gloves:
      base: Moulded Mitts
      mods: [Increased Attack Speed, Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, +Maximum Life, Elemental Resistances]
    boots:
      base: Stone Greaves
      mods: [Movement Speed, +Maximum Life, Elemental Resistances, Armour applies to Elemental Damage, Armour]
    amulet:
      base: Jade Amulet
      mods: [+Level of all Melee Skills, Elemental Resistances, +Maximum Life, Chaos Resistance]
    ring1:
      base: Topaz Ring
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Maximum Life]
    ring2:
      base: Topaz Ring
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Maximum Life, Adds Cold Damage to Attacks, Adds Fire Damage to Attacks]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances, Chaos Resistance]
  mapping:
    weapon:
      base: Wildwood Talisman
      mods: [Adds Fire Damage, Increased Physical Damage]
    helmet:
      base: Guardian Greathelm
      mods: [Armour, +Maximum Life, +Strength, Fire Resistance]
    body:
      unique: "Cloak of Flame"
    gloves:
      base: Knightly Mitts
      mods: [Increased Attack Speed, Adds Physical Damage to Attacks, Mana Leech, Life Leech]
    boots:
      base: Bulwark Greaves
      mods: [Movement Speed, +Maximum Life, Armour]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Melee Skills, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [Elemental Resistances, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, +Maximum Life]
    ring2:
      base: Topaz Ring
      mods: [Elemental Resistances, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, +Maximum Life]
    belt:
      unique: "Goregirdle"
  endgame:
    weapon:
      base: Maji Talisman
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Adds Lightning Damage, Adds Fire Damage, Critical Hit Chance]
    helmet:
      base: Warmonger Greathelm
      mods: [Elemental Resistances, Armour applies to Elemental Damage, Armour, +Maximum Life, Chaos Resistance]
    body:
      unique: "Cloak of Flame"
    gloves:
      base: Knightly Mitts
      mods: [Armour applies to Elemental Damage, +Maximum Life, Armour, Elemental Resistances]
    boots:
      base: Ornate Greaves
      mods: [Movement Speed, Armour applies to Elemental Damage, Elemental Resistances, +Maximum Life, Armour]
    amulet:
      unique: "Defiance of Destiny"
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Elemental Resistances, Mana Regeneration, Adds Cold Damage to Attacks, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks]
    ring2:
      unique: "Polcirkeln"
    belt:
      unique: "Goregirdle"
passives:
  attribute: str
  path:
    - "Relentless Vindicator"
    - "Bolstering Presence"
    - "Radial Force"
    - "Cruel Fate"
    - "Viciousness"
    - "Among the Hordes"
    - "Primal Rage"
    - "Impact Area"
    - "Impact Force"
    - "Piercing Claw"
    - "Swift Claw"
    - "Sharpened Claw"
    - "Protraction"
    - "Grounded in the Earth"
    - "Sigil of Fire"
    - "Prism Guard"
    - "Devoted Protector"
    - "Spirit of the Bear"
    - "Hide of the Bear"
    - "Molten Claw"
    - "Crushing Verdict"
    - "Singular Purpose"
    - "Polished Iron"
    - "Overwhelming Strike"
    - "Vulgar Methods"
    - "Barbaric Strength"
    - "Howling Beast"
    - "Bonded Precision"
    - "Leaping Ambush"
    - "Direct Approach"
    - "Chronomancy"
  ascendancy: [Druidic Champion, Furious Wellspring, Reactive Growth, Avatar of Evolution]
---
## How It Works

In bear form, [[Maul]] and [[Rampage]] generate Rage, and [[Ferocious Roar]] tops it up. [[Walking Calamity]] turns that into large eruptions around you, and [[Savage Fury]] is a large damage boost. Shaman's Druidic Champion, Furious Wellspring, Reactive Growth and Avatar of Evolution reinforce the shapeshifted playstyle.

With [[Polcirkeln]] and added cold damage on your gear, Walking Calamity can chill enemies so that kills shatter. The source guide then replaces its Armour Break Herald setup with [[Herald of Ice]]. [[Charge Regulation]] uses the endurance charges from bear form, and [[Scavenged Plating]] adds armour.

## Playstyle

**Early.** Maul until you have 30 Rage, then Furious Slam, and repeat. Add Fury of the Mountain once unlocked and pre-place its fissures where the boss will stand.

**Endgame.** Build Rage with [[Maul]] and [[Rampage]], activate [[Savage Fury]] and Bhatair's Vengeance (it must come before Walking Calamity, it does not apply retroactively), then unleash [[Walking Calamity]].

## Gear Priorities

The source guide's uniques are [[Cloak of Flame]], [[Defiance of Destiny]], [[Polcirkeln]] and [[Goregirdle]]; rares should bring armour, life and added cold damage.
