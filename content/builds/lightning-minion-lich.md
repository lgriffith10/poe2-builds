---
title: Lightning Minion Lich
class: Witch
ascendancy: Lich
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Lightning Minion Lich Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/storm-mage-lich-build-guide
  updated: 2026-10-30
summary: "Very tanky minion Witch: Powered Zealot spectres and Skeletal Storm Mages handle the damage while the Lich stacks energy shield and block."
tags: [minion, lightning, spectre, energy shield, tanky]
damage: Lightning
playstyle: Minions
difficulty: medium
budget: low
tiers:
  starter: B
  endgame: A
  bossing: S
pros:
  - "Very tanky: energy shield, block and Eternal Life"
  - Huge single-target damage from the minion army
  - Few buttons to press once the army is up
cons:
  - Clearing is slower than most builds
  - The screen gets very busy with minions and effects
  - Getting the right spectre takes a specific Interlude area
skills:
  - gem: "Skeletal Warrior"
    supports: [Sacrificial Lamb I, Last Gasp, Amanamu's Tithe, Deathmarch]
    note: "Front-line meat shield"
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Prolonged Duration II, Magnified Area II, Brutus' Brain]
    note: "Offering that boosts minion damage"
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Deathmarch, Meat Shield II, Last Gasp, Minion Mastery]
    note: "Heals and revives the army"
  - gem: "Skeletal Storm Mage"
    supports: [Muster, Feeding Frenzy II, Shock, Overcharge, Esh's Radiance]
    note: "Lightning minions that add damage and shock"
  - gem: "Elemental Weakness"
    supports: [Cursed Ground, Heightened Curse, Prolonged Duration II, Efficiency II, Magnified Area II]
    note: "Curse to raise minion damage"
  - gem: "Sigil of Power"
    supports: [Prolonged Duration II, Magnified Area II]
    note: "Pre-cast before a boss from the staff on weapon set 2"
  - gem: "Frost Bomb"
    supports: [Potent Exposure, Overabundance II, Spell Echo, Long Fuse II, Prolonged Duration II]
    note: "Exposure for bosses"
  - gem: "Skeletal Brute"
    supports: [Bidding III, Prolonged Duration II, Magnified Area II, Last Gasp, Efficiency II]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Uhtred's Constellation, Atziri's Communion]
    note: "Energy shield recovery"
  - gem: "Wolf Pack"
    supports: [Tecrod's Revenge, Romira's Requital, Uul-Netol's Embrace, Muster, Feeding Frenzy II]
    note: "Front-line minions that soak damage"
  - gem: "Refutation"
    supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Mobility]
  - gem: "Bind Spectre"
    supports: [Muster, Pierce III, Wildshards II, Dialla's Desire, Vilenta's Propulsion]
    note: "Powered Zealot spectres (the ones that cast lightning balls): main damage"
gemPriority:
  skills:
    - label: "First"
      gems: [Skeletal Sniper]
    - label: ""
      gems: [Volcano, Contagion, Frost Bomb]
    - label: ""
      gems: [Elemental Weakness, Pain Offering]
    - label: "Act 4 (Use one or two)"
      gems: [Skeletal Cleric]
    - label: "Swap to Powered Zealot Spectres in the Interlude"
      gems: [Bind Spectre]
    - label: "One to debuff enemies with shock"
      gems: [Skeletal Storm Mage]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [Raging Spirits]
    - label: "ACT II (Golden Tomb)"
      gems: [Raging Spirits]
    - label: "ACT III (The Azak Bog Witch)"
      gems: [Raging Spirits]
    - label: "+Damage & 10% less dmg taken"
      gems: [Wolf Pack]
  supports:
    - label: "Act I"
      gems: [Multishot I, Fire Attunement, Ignite I, Unleash, Last Gasp, Arcane Surge]
    - label: "Act Ii"
      gems: [Minion Splash I, Infernal Legion I, Multishot II, Spell Cascade, Efficiency I, Minion Instability, Fire Attunement, Potent Exposure]
    - label: "Act III"
      gems: [Feeding Frenzy I, Focused Curse, Infernal Legion I, Last Gasp, Loyalty, Meat Shield II, Elemental Army]
    - label: "Act 4"
      gems: [Feeding Frenzy II, Muster, Efficiency II, Rapid Attacks II, Danse Macabre, Sacrificial Lamb I, Meat Shield II, Rapid Casting II, Wildshards II, Pierce III]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1 Step 1"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
          - gem: "Contagion"
      - name: "Act 1 Step 2"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Frost Bomb"
      - name: "Act 1 Step 3"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Efficiency I]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability, Infernal Legion I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Spell Cascade, Focused Curse]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Fire Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Loyalty, Feeding Frenzy I]
      - name: "Act 4 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability, Infernal Legion I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Efficiency II, Focused Curse]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash I]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy II, Loyalty]
      - name: "Interludes Powered Zealots"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability, Infernal Legion I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Efficiency II, Focused Curse]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash I]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy II, Loyalty]
      - name: "Early Maps"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Sacrificial Offering, Meat Shield II, Elemental Army]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II, Elemental Army]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Loyalty, Muster, Feeding Frenzy II, Rage III]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Spell Cascade, Focused Curse, Arcane Surge]
          - gem: "Frost Bomb"
            supports: [Overabundance II, Spell Echo, Potent Exposure, Prolonged Duration II]
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Muster, Pin II, Rage III]
          - gem: "Raging Spirits"
            supports: [Muster, Feeding Frenzy II, Last Gasp, Minion Splash II]
    rotations:
      - name: "Act1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill"
          - gem: "Skeletal Sniper"
          - gem: "Contagion"
            label: "Aoe dmg"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 Step 3"
        steps:
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Frost Bomb"
            label: "Rares & Bosses"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 2"
        steps:
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "More Raging Spirits"
          - gem: "Elemental Weakness"
          - gem: "Elemental Weakness"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 3 & Act 4 & Interlude Spectres"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Early"
    steps:
      - gem: "Elemental Weakness"
        label: "Raging Spirits"
      - gem: "Pain Offering"
        label: "Rares & Bosses"
      - gem: "Frost Bomb"
      - gem: "Elemental Weakness"
      - gem: "Unearth"
        label: "Corpses"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Owl Idol: Allies in your Presence have 10% increased Cast Speed"]
  offhand:
    base: Sacred Focus
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    runes: ["2× Perfect Iron Rune: 20% increased Physical Damage"]
  helmet:
    base: Ancestral Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
    runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Raven-Touched Shard"]
  body:
    base: Sacramental Robe
    mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
    runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
  gloves:
    base: Vaal Gloves
    mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
    runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
  boots:
    unique: "Bones of Ullr"
    runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply"]
  amulet:
    base: Portent Amulet
    mods: [+Level of all Minion Skills, +Spirit, +Attributes, Energy Shield, Elemental Resistances]
  ring1:
    base: Topaz Ring
    mods: [Increased Minion Damage, Elemental Resistances, Minion Life]
  ring2:
    unique: "Kalandra's Touch"
  belt:
    base: Heavy Belt
    mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, +Strength]
  weapon2:
    base: Chiming Staff
    mods: [+Level of all Spell Skills]
  offhand2:
    unique: Prism Guardian
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Block Chance, Elemental Resistances, Chaos Resistance]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    helmet:
      base: Twig Circlet
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Glacial Rune: +14% to Cold Resistance", "Storm Rune: +14% to Lightning Resistance"]
    gloves:
      base: Torn Gloves
      mods: [Elemental Resistances, +Maximum Life, Energy Shield, +Attributes, Chaos Resistance]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    ring2:
      base: Ruby Ring
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Strength, Armour, +Maximum Mana]
    weapon2:
      unique: Trenchtimbre
      runes: ["Lesser Resolve Rune: +6 to Intelligence"]
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Elemental Resistances, Critical Damage Bonus]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Painted Crest Shield
      mods: [Elemental Resistances, Block Chance, +Maximum Life, +Attributes]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Glacial Rune: +18% to Cold Resistance"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["2× Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [Elemental Resistances, Increased Minion Damage, +Maximum Life, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [Elemental Resistances, Increased Minion Damage, +Maximum Life, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, Armour]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      unique: "Prism Guardian"
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes, +Maximum Life]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance", "Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      unique: "Evergrasping Ring"
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    belt:
      base: Heavy Belt
      mods: [Elemental Resistances, +Strength, +Maximum Life, Armour]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
    offhand2:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
  minmax:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Owl Idol: Allies in your Presence have 10% increased Cast Speed"]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["2× Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Raven-Touched Shard"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply"]
    amulet:
      base: Portent Amulet
      mods: [+Level of all Minion Skills, +Spirit, +Attributes, Energy Shield, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, Minion Life]
    ring2:
      unique: "Kalandra's Touch"
    belt:
      base: Heavy Belt
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, +Strength]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
    offhand2:
      unique: Prism Guardian
passives:
  attribute: int
  path:
    - "Raw Power"
    - "Elemental Force"
    - "Crystalline Flesh"
    - "Restless Dead"
    - "Lord of Horrors"
    - "Necrotised Flesh"
    - "Enhanced Barrier"
    - "Profane Commander"
    - "Heavy Buffer"
    - "Silent Guardian"
    - "Pure Energy"
    - "Dampening Shield"
    - "Vile Mending"
    - "Melding"
    - "Dependable Ward"
    - "Insightfulness"
    - "Essence Infusion"
    - "Hallowed"
    - "Bringer of Order"
    - "Warding Fetish"
  ascendancy: [Soulless Form, Necromantic Conduit, Eternal Life, Crystalline Phylactery]
---
## How It Works

Your minions do the work. The main damage comes from Powered Zealot spectres raised with [[Bind Spectre]]: of the three monsters with that name in the Interlude's Etched Ravine, bind the one that casts lightning balls. [[Skeletal Storm Mage]]s add more lightning and shocks, [[Pain Offering]] boosts the whole army, and [[Elemental Weakness]] and [[Frost Bomb]] lower enemy resistances.

The source guide levels with Volcano raging spirits and Skeletal Snipers, then Vaal Guard spectres from Act 3, and only switches to Powered Zealots once Wildshards II and Pierce III are available.

## Playstyle

**Mapping.** Walk forward and let the army fight; refresh [[Pain Offering]] on packs.

**Bossing.** Swap to the second weapon set to pre-cast [[Sigil of Power]], curse the boss, drop [[Frost Bomb]] and keep the offering up.

## Defences

The Lich stacks energy shield, energy shield recovery and block. Eternal Life with Soulless Form gives a large reduction in damage taken, and [[Wolf Pack]] minions supported by Loyalty soak hits in front of you.

## Gear Priorities

+Level of all Minion Skills on the sceptre, helmet and amulet comes first, then Spirit for more minions. A Rattling Sceptre is best. Enfolding Dawn and a pair of Bones of Ullr are cheap, common uniques the build uses; the Kalandra's Touch ring shown here is the min-max option.

## FAQ

**How do I get the right spectres?** At the end of Act 3, in Utzaal, use [[Bind Spectre]] on a Vaal Guard. Three monsters share that name: a melee one (50 Spirit), a ranged one (60 Spirit) and the one you want, which throws bombs (50 Spirit). In the Interludes, start with Doryani's Contingency: in its second to last area, Etched Ravine, three kinds of Powered Zealot appear, and only the one casting lightning balls (Spark) is worth binding, for 55 Spirit. Wait until you have cut [[Wildshards II]] and [[Pierce III]] before replacing your Vaal Guards. Disenchanting the Vaal Guard spectre gem at the NPC gives back a clean [[Bind Spectre]] with the same level and sockets. Do not link [[Projectile Acceleration III]]: it lowers the Zealots' damage.

**How do I fix mana problems in the campaign?** Support [[Volcano]] with [[Arcane Surge]] and [[Elemental Weakness]] with [[Efficiency I]]; [[Pain Offering]] can take [[Efficiency I]] too. Once you complete the second ascendancy trial and take Soulless Form, mana should no longer be an issue.

**I'm dying too often. What can I do?** Cap your elemental resistances at 75% and aim for around 60% chaos resistance, and wear energy shield bases to get as much energy shield as possible. Early in Act 4, travel to Ngakanu and hand in the Shark Fin quest item for 30% increased maximum energy shield.

**How many of each minion should I use?** It depends on your Spirit. As a guide: one or two [[Skeletal Cleric]]s, the two [[Skeletal Warrior]]s that come free with your Rattling Sceptre (do not spend Spirit on more), [[Wolf Pack]], and the rest on Powered Zealot spectres. Only add a [[Skeletal Storm Mage]] once you can run at least 6 Zealots, and a [[Skeletal Brute]] once you can run at least 9.

**How do I get more sockets for my Skeletal Warriors?** With Skeletal Warriors granted by a Rattling Sceptre, the number of support sockets follows the skill level on the sceptre: level 20 allows five supports. A Perfect Jeweller's Orb on the sceptre also adds sockets, except on corrupted or sanctified items.

**What is Sigil of Power and where does it come from?** [[Sigil of Power]] only exists on a Chiming Staff. It creates a blue circle that grants you and your minions more spell damage while you stand in it, growing stronger the more mana you spend inside. Your main weapon set holds the Rattling Sceptre, so put the staff on the second weapon set and cast it before bosses or Simulacrum waves, with second set passives in curse effect, spell duration and area. The key staff modifier is +level of all Spell Skills; quality from Arcanist's Etchers enlarges the circle.
