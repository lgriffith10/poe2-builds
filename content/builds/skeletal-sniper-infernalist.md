---
title: Skeletal Sniper Infernalist
class: Witch
ascendancy: Infernalist
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Skeletal Sniper Infernalist Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/skeletal-sniper-infernalist-build-guide
  updated: 2026-09-03
summary: "Witch minion build where Skeletal Snipers fire gas arrows that explode on ignited enemies, backed by Raging Spirits and an Infernal Hound."
tags: [minion, fire, ignite, commands]
damage: Fire / Chaos
playstyle: Minions
difficulty: medium
budget: low
tiers:
  starter: C
  endgame: B
  bossing: B
pros:
  - "Big area explosions from gas arrows"
  - "Large minion army keeps you safe"
  - "Infernal Hound adds damage and utility"
cons:
  - "Relies on keeping enemies ignited"
  - "Command-heavy to get full damage"
skills:
  - gem: "Skeletal Warrior"
    supports: [Sacrificial Lamb I, Last Gasp, Amanamu's Tithe, Deathmarch]
  - gem: "Summon Infernal Hound"
    supports: [Romira's Requital, Meat Shield II, Last Gasp, Elemental Army, Fire Mastery]
  - gem: "Skeletal Reaver"
    supports: [Feeding Frenzy II, Muster, Tecrod's Revenge, Rapid Attacks II, Uul-Netol's Embrace]
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Brutus' Brain, Prolonged Duration II, Magnified Area II]
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Meat Shield II, Last Gasp, Prolonged Duration II]
  - gem: "Skeletal Storm Mage"
    supports: [Shock, Muster, Overcharge, Feeding Frenzy II, Esh's Radiance]
  - gem: "Skeletal Brute"
    supports: [Bidding III, Prolonged Duration II, Magnified Area II, Last Gasp, Physical Mastery]
  - gem: "Skeletal Sniper"
    supports: [Muster, Feeding Frenzy II, Dialla's Desire, Rapid Attacks II, Last Gasp]
  - gem: "Despair"
    supports: [Cursed Ground, Heightened Curse, Focused Curse, Efficiency II, Prolonged Duration II]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Upwelling I, Uhtred's Constellation]
gemPriority:
  skills:
    - label: "First"
      gems: [Skeletal Sniper]
    - label: ""
      gems: [Volcano, Contagion, Frost Bomb]
    - label: ""
      gems: [Elemental Weakness]
    - label: ""
      gems: [Pain Offering]
    - label: "Use a few reavers as front-line fighters"
      gems: [Skeletal Reaver]
    - label: "Act 4 (Use one or two)"
      gems: [Skeletal Cleric]
    - label: "One to apply shock vs bosses in maps"
      gems: [Skeletal Storm Mage]
    - label: "One Brute to debuff enemies with Intimidate"
      gems: [Skeletal Brute]
    - label: "Replace Vulnerability in the Mid setup"
      gems: [Despair]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [Raging Spirits]
    - label: "ACT II (Golden Tomb)"
      gems: [Raging Spirits]
    - label: "ACT III (The Azak Bog Witch)"
      gems: [Raging Spirits]
    - label: "Mid extra ES Recovery"
      gems: [Convalescence]
  supports:
    - label: "Act 1"
      gems: [Multishot I, Fire Attunement, Ignite I, Unleash, Last Gasp, Brutality I, Arcane Surge]
    - label: "Act 2"
      gems: [Minion Splash I, Multishot II, Last Gasp, Loyalty, Efficiency I, Fire Attunement, Potent Exposure, Brutality II]
    - label: "Act 3"
      gems: [Feeding Frenzy I, Cursed Ground, Meat Shield II, Rapid Casting I, Elemental Army, Sacrificial Lamb I]
    - label: "Act 4"
      gems: [Muster, Last Gasp, Danse Macabre, Rapid Casting II, Feeding Frenzy II]
leveling:
  - steps:
      - name: "Act 1 - Step 1"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
          - gem: "Contagion"
      - name: "Act 1 - Step 2"
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
      - name: "Act 1 - Step 3"
        skills:
          - gem: "Unearth"
            supports: [Brutality I]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
          - gem: "Frost Bomb"
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality II]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Efficiency I]
          - gem: "Summon Infernal Hound"
            supports: [Last Gasp, Loyalty]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy I, Brutality II]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Feeding Frenzy I]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Cursed Ground]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II]
      - name: "Act 4 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Muster, Brutality II]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Muster, Feeding Frenzy II]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy I, Minion Splash I]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Elemental Army, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Efficiency II, Heightened Curse]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Skeletal Reaver"
            supports: [Muster, Last Gasp, Feeding Frenzy II]
      - name: "Endgame"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Meat Shield II, Last Gasp, Elemental Army, Fire Mastery]
          - gem: "Skeletal Reaver"
            supports: [Brutality III, Muster, Last Gasp, Feeding Frenzy II, Minion Splash II]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Meat Shield II, Elemental Army, Sacrificial Offering]
          - gem: "Skeletal Cleric"
            supports: [Rapid Casting II, Meat Shield II, Last Gasp, Elemental Army]
          - gem: "Skeletal Storm Mage"
            supports: [Shock, Muster, Feeding Frenzy II, Overcharge]
          - gem: "Skeletal Brute"
            supports: [Bidding III, Prolonged Duration II, Last Gasp, Magnified Area II]
          - gem: "Skeletal Sniper"
            supports: [Muster, Feeding Frenzy II, Gambleshot, Brutality III, Rapid Attacks II]
          - gem: "Vulnerability"
            supports: [Heightened Curse, Cursed Ground, Efficiency II, Focused Curse]
          - gem: "Unearth"
            supports: [Muster, Feeding Frenzy II, Brutality III, Pin II]
    rotations:
      - name: "Act 1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
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
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 2 & 3"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Bosses/Rares"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interludes"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Bosses/Rares"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Act 1 Step 1 & 2"
    steps:
      - gem: "Volcano"
        label: "Command skill combo"
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
        label: "Command skill combo"
      - gem: "Skeletal Sniper"
      - gem: "Volcano"
        label: "Raging Spirits"
      - gem: "Unearth"
        label: "Corpses"
      - gem: "Frost Bomb"
        label: "Bosses/rares"
  - name: "Act 2 & 3"
    steps:
      - gem: "Volcano"
        label: "Command skill combo"
      - gem: "Skeletal Sniper"
      - gem: "Volcano"
        label: "Raging Spirits"
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Unearth"
        label: "Corpses"
  - name: "Act 4 & Interludes"
    steps:
      - gem: "Volcano"
        label: "Command skill combo"
      - gem: "Skeletal Sniper"
      - gem: "Volcano"
        label: "Raging Spirits"
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Unearth"
        label: "Corpses"
  - name: "Early & Mid mapping"
    steps:
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Skeletal Brute"
      - gem: "Vulnerability"
      - gem: "Unearth"
        label: "Corpses"
  - name: "Mid mapping"
    steps:
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Skeletal Brute"
      - gem: "Despair"
      - gem: "Skeletal Reaver"
        label: "Use on CD"
      - gem: "Unearth"
        label: "Corpses"
  - name: "Late mapping"
    steps:
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Skeletal Brute"
      - gem: "Despair"
      - gem: "Skeletal Reaver"
        label: "Use on CD"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Lightning Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Fire Damage]
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Rabbit Idol: 15% increased Spirit"]
  offhand:
    base: Emblem Crest Shield
    mods: [+Maximum Life, Elemental Resistances, Chaos Resistance, Block Chance, +Attributes]
    runes: ["Desert Rune: +14% to Fire Resistance"]
  helmet:
    base: Twig Circlet
    mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
    runes: ["Desert Rune: +14% to Fire Resistance"]
  body:
    unique: "Enfolding Dawn"
    runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Glacial Rune: +18% to Cold Resistance"]
  gloves:
    base: Torn Gloves
    mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes, Energy Shield]
    runes: ["Storm Rune: +14% to Lightning Resistance"]
  boots:
    unique: "Bones of Ullr"
    runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply"]
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
  ring1:
    base: Sapphire Ring
    mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
  ring2:
    base: Ruby Ring
    mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
  belt:
    base: Rawhide Belt
    mods: [Elemental Resistances, +Maximum Life, +Strength, +Maximum Mana, Chaos Resistance]
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Lightning Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Fire Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Elemental Resistances, Chaos Resistance, Block Chance, +Attributes]
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
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes, Energy Shield]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
    ring2:
      base: Ruby Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
    belt:
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, +Maximum Mana, Chaos Resistance]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Painted Crest Shield
      mods: [Block Chance, +Maximum Life, Chaos Resistance, Elemental Resistances, +Attributes]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Glacial Rune: +18% to Cold Resistance"]
    gloves:
      base: Vaal Gloves
      mods: [Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply", "Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, Elemental Resistances, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Allies in Presence Attack Speed, +Spirit]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Elemental Resistances]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Soul Core of Tacati: 25% increased Magnitude of Poison you inflict"]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Vaal Gloves
      mods: [Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply", "Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, Elemental Resistances, +Attributes]
    ring1:
      unique: "Evergrasping Ring"
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    belt:
      base: Heavy Belt
      mods: [Minion Melee Splash, Elemental Resistances, +Maximum Life, +Strength, Minion Life]
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, +Maximum Mana, Increased Allies in presence Damage, Allies in Presence Attack Speed, Elemental Resistances]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand2:
      unique: Prism Guardian
  minmax:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Rabbit Idol: 15% increased Spirit"]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, +Maximum Life, Energy Shield, Elemental Resistances]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Raven-Touched Shard"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, +Maximum Life, Elemental Resistances, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Amanamu's Gaze: 1% increased Movement Speed per 15 Spirit, up to a maximum of 40%, Other Modifiers to Movement Speed except for Sprinting do not apply"]
    amulet:
      base: Twisted Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, +All Attributes, Elemental Resistances]
    ring1:
      base: Sapphire Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    belt:
      base: Heavy Belt
      mods: [Minion Melee Splash, Elemental Resistances, +Maximum Life, +Strength, Minion Life]
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, +Maximum Mana, Allies in Presence Attack Speed, Elemental Resistances]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
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
    - "Relentless Fallen"
    - "Profane Commander"
    - "Pure Energy"
    - "Enhanced Barrier"
    - "Silent Guardian"
    - "Bringer of Order"
    - "Dampening Shield"
    - "Melding"
    - "Insightfulness"
    - "Dependable Ward"
    - "Essence Infusion"
    - "Entropic Incarnation"
    - "Vile Mending"
    - "Illuminated Crown"
    - "Hallowed"
    - "Ancient Aegis"
  ascendancy: [Loyal Hellhound, Altered Flesh, Beidat's Will, Beidat's Hand]
farming:
  clear: 3
  single: 2
  tank: 2
  speed: 1
  style: minion
  traits: [dot]
---
## How It Works

[[Volcano]] ignites enemies and, with the right setup, spawns Raging Spirits. When commanded, your [[Skeletal Sniper]]s fire gas arrows that explode on ignited enemies, which is the build's main damage. [[Summon Infernal Hound]], boosted by the Infernalist's Loyal Hellhound, fights alongside a full skeleton army ([[Skeletal Warrior]], [[Skeletal Reaver]], [[Skeletal Brute]], [[Skeletal Storm Mage]], [[Skeletal Cleric]]).

## Leveling

Ignite packs with [[Volcano]], command the Snipers' gas arrows, apply exposure with [[Frost Bomb]] on rares and bosses, add [[Contagion]] early on, and raise extra bodies from corpses with [[Unearth]].

## Playstyle

1. Cast [[Volcano]] to ignite enemies and spawn Raging Spirits.
2. Command the [[Skeletal Sniper]]s to fire gas arrows at the ignited targets.
3. Apply [[Frost Bomb]] and curse bosses with [[Despair]].
4. Keep [[Pain Offering]] up for the army, and use [[Convalescence]] for energy shield recovery.

## Gear Priorities

Minion levels and energy shield. [[Enfolding Dawn]] provides Spirit for the army and [[Bones of Ullr]] makes undead minions cheaper to reserve.

## FAQ

**How do I fix mana problems?** Put [[Arcane Surge]] on [[Volcano]] and [[Efficiency I]] on [[Elemental Weakness]], and optionally another [[Efficiency I]] on [[Pain Offering]].

**Where do I get Raging Spirits?** Defeating The King in the Mists gives an Uncut Spirit Gem (level 4). Raging Spirits is not in the Witch tab: switch to the Sorceress tab to find it. They are summoned by casting [[Volcano]], so try to keep ten of them up during the campaign.

**Which act bonus should I take?** Early in Act 4, bring the Shark Fin quest item to Ngakanu for 30% increased maximum energy shield. Act bonuses are small, so a different pick is no big deal.

**I die too often, what should I check?** Cap your elemental resistances, aim for roughly 60% chaos resistance, and wear bases that give as much energy shield as possible.

**How do I get more support sockets for my Skeletal Warriors and Infernal Hound?** Skeletal Warriors from a Rattling Sceptre get sockets based on the skill level on the sceptre: level 20 [[Skeletal Warrior]] allows five supports. [[Summon Infernal Hound]] sockets follow your character level instead; the last one unlocks at level 90.

**How many of each minion should I summon?** It depends on your Spirit. Keep the two free [[Skeletal Warrior]]s from the sceptre (do not summon more), one or two [[Skeletal Cleric]]s, one [[Skeletal Storm Mage]], up to one [[Skeletal Brute]] and several [[Skeletal Reaver]]s, but always keep enough Spirit for at least six [[Skeletal Sniper]]s. The late setup adds two Gargantuan Wasp spectres and aims for eight or more Snipers.
