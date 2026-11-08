---
title: Comet Infernalist
class: Witch
ascendancy: Infernalist
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Infernalist using Comet"
  author: Powershot_A (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/Ray007-1442/Powershot_A
  updated: 2026-11-08
origin: ladder
summary: "Witch whose Comets fall on their own: Cast on Elemental Ailment triggers them while Spark and Arc apply ailments, with Infernalist's fire ascendancy."
tags: [caster, fire, cold, trigger, chaos inoculation]
damage: Elemental
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Comet is triggered automatically, few buttons to press"
  - "Very popular: 5,115 ladder characters"
  - "Supports are consistent across players"
cons:
  - "The trigger setup takes some understanding"
  - "Chaos Inoculation (71%) needs a respec and energy shield"
  - "The reference gear includes Mageblood"
skills:
  - gem: Comet
    supports: &a1 [Spell Cascade, Execute III, Arbiter's Ignition]
    note: Socketed in Cast on Elemental Ailment
  - gem: Summon Infernal Hound
    supports: [Magnified Area II, Romira's Requital, Hulking Minions, Brutus' Brain, Ignite III]
  - gem: Living Bomb
    supports: *a1
    note: Socketed in Cast on Elemental Ailment
  - gem: Cast on Elemental Ailment
    supports: []
    note: Holds Comet, Living Bomb
  - gem: Spark
    supports: [Rakiata's Flow, Pierce III, Commiserate, Considered Casting, Execute III]
  - gem: Arc
    supports: [Sione's Temper, Pierce III, Projectile Acceleration III, Execute III, Considered Casting]
  - gem: Ice Nova
    supports: [Magnified Area II, Boundless Energy II, Execute III]
    note: Socketed in Cast on Block
  - gem: Cast on Block
    supports: []
    note: Holds Ice Nova
  - gem: Trinity
    supports: [Atziri's Communion, Cannibalism I, Fire Mastery, Dialla's Desire]
  - gem: Raise Shield
    supports: [Punch Through, Knockback, Retaliate II]
  - gem: Powered by Verisium
    supports: [Uhtred's Rite, Uhtred's Constellation, Prolonged Duration II]
  - gem: The Stars Answer
    supports: [Efficiency II, Prolonged Duration II]
  - gem: Remnants of Kalguur
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Elemental Conflux
    supports: [Cold Mastery, Uhtred's Omen]
  - gem: Siphon Elements
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Charge Regulation
    supports: [Armour Demolisher II]
gear:
  belt:
    unique: Mageblood
    ladder:
      - name: Mageblood
        pct: 49
      - name: Headhunter
        pct: 38
      - name: Rare Belt
        pct: 8
      - name: Coward's Legacy
        pct: 3
  offhand:
    unique: Svalinn
    runes: [15% increased Block chance, 20% increased Runic Ward]
    ladder:
      - name: Svalinn
        pct: 54
      - name: Rare Focus
        pct: 12
      - name: Crest of Ardura
        pct: 3
      - name: Redblade Banner
        pct: 2
  helmet:
    unique: Alpha's Howl
    runes: [15% increased Cost Efficiency, Raven-Touched]
    ladder:
      - name: Alpha's Howl
        pct: 76
      - name: Rare Helmet
        pct: 22
      - name: Myris Uxor
        pct: 1
      - name: Vestige of Darkness
        pct: 0
  ring2:
    base: Gold Ring
    implicits: [14% increased Rarity of Items found]
    mods: [16% increased Rarity of Items found, 54% increased Spell Damage, 26% increased Cold Damage, +50% to Chaos Resistance, Gain 10% of Damage as Extra Fire Damage with Spells]
    ladder:
      - name: Rare Ring
        pct: 98
      - name: Kalandra's Touch
        pct: 63
      - name: Snakepit
        pct: 6
      - name: Andvarius
        pct: 1
  boots:
    base: Blacksteel Sabatons
    mods: [18% increased Rarity of Items found, 35% increased Movement Speed, +123 to maximum Mana, +45% to Lightning Resistance, 60% increased effect of Socketed Augment Items, 30% increased Runic Ward]
    runes: [+48 to maximum Runic Ward, 32% increased Runic Ward, 16% increased Movement Speed when on Low Life]
    ladder:
      - name: Rare Boots
        pct: 99
      - name: Shankgonne
        pct: 0
      - name: Trampletoe
        pct: 0
      - name: Decree of Flight
        pct: 0
  body:
    unique: The Brass Dome
    runes: [80% increased Runic Ward]
    ladder:
      - name: The Brass Dome
        pct: 78
      - name: Sacrosanctum
        pct: 6
      - name: Rare Body Armour
        pct: 6
      - name: Temporalis
        pct: 5
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+50 to Spirit, +4 to Level of all Spell Skills, +5% to Quality of all Skills, 10% increased maximum Runic Ward]
    ladder:
      - name: Rare Amulet
        pct: 99
      - name: Choir of the Storm
        pct: 0
      - name: Yoke of Suffering
        pct: 0
      - name: Eventide Petals
        pct: 0
  ring1:
    base: Gold Ring
    implicits: [16% increased Rarity of Items found]
    mods: [54% increased Spell Damage, 41% increased Rarity of Items found, 22% increased Cast Speed, +50% to Fire Resistance, Gain 13% of Damage as Extra Lightning Damage with Spells]
    ladder:
      - name: Rare Ring
        pct: 98
      - name: Kalandra's Touch
        pct: 63
      - name: Snakepit
        pct: 6
      - name: Andvarius
        pct: 1
  gloves:
    base: Blacksteel Gauntlets
    mods: [+2 to Level of all Projectile Skills, 33% increased Projectile Speed, 34% increased Critical Damage Bonus, +36 to Dexterity, 40% increased Projectile Damage, 26% increased Runic Ward, Remnants can be collected from 44% further away]
    runes: [+1 Suffix Modifier allowed, 20% increased Magnitude of Damaging Ailments you inflict, Can roll Marksman modifiers]
    ladder:
      - name: Rare Gloves
        pct: 94
      - name: Maligaro's Virtuosity
        pct: 3
      - name: Aurseize
        pct: 1
      - name: Sine Aequo
        pct: 1
  weapon:
    unique: Runeseeker's Call
    runes: [105% increased Spell Damage, +9 to Level of all Spell Skills, Gain 45% of maximum Life as Extra maximum Runic Ward, 45% less maximum Life, Gain 15% of Damage as Extra Damage of all Elements, 150% increased Spell Damage while your Companion is in your Presence]
    ladder:
      - name: Runeseeker's Call
        pct: 57
      - name: Rare Wand
        pct: 34
      - name: Sacred Flame
        pct: 21
      - name: Rare Staff
        pct: 19
passives:
  attribute: int
  path:
    - "Controlling Magic"
    - "Turn the Clock Forward"
    - "Bone Chains"
    - "Turn the Clock Back"
    - "Sanguine Tolerance"
    - "Rupturing Pins"
    - "Careful Assassin"
    - "Invocated Efficiency"
    - "Energise"
    - "Core of the Guardian"
    - "Evocational Practitioner"
    - "Wide Barrier"
    - "Heartbreaking"
    - "Heartstopping"
    - "Cooked"
  ascendancy: [Pyromantic Pact, Loyal Hellhound, Bringer of Flame, Grinning Immolation]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide. [[Comet]] drops a large meteor; players link it with **Spell Cascade (91%) and Arbiter's Ignition (84%)**. This character sockets it with [[Living Bomb]] in [[Cast on Elemental Ailment]], so both fire on their own when you inflict ailments.

[[Spark]] (87%) is the usual way to apply those ailments, often with [[Arc]] (42%) or [[Frost Bomb]] (41%). [[Summon Infernal Hound]] adds the Infernalist's permanent fire minion.

## Ascendancy and Key Passives

Pyromantic Pact (97%), Grinning Immolation (95%) and Bringer of Flame (92%), with Loyal Hellhound (51%). Chaos Inoculation is taken by 71% of the group.

## Gear

[[The Brass Dome]] (78%), [[Alpha's Howl]] (76%), [[Runeseeker's Call]] (57%) and [[Svalinn]] (54%) are very common; this character wears all four. [[Mageblood]] is an endgame luxury.
