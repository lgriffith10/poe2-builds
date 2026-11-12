---
title: His Scattering Calamity Titan
class: Warrior
ascendancy: Titan
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Titan using His Scattering Calamity"
  author: 샤닝타이탄오오 (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/%EC%83%A4%EC%9D%B4%EB%8B%9D-5233/%EC%83%A4%EB%8B%9D%ED%83%80%EC%9D%B4%ED%83%84%EC%98%A4%EC%98%A4
  updated: 2026-11-08
origin: ladder
summary: "Titan caster built around the unique staff The Unborn Lich: its skill His Scattering Calamity does nearly all the damage, protected by Mind Over Matter and Eldritch Battery."
tags: [caster, lightning, unique-based, mana]
damage: Lightning
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "One skill does almost all the damage"
  - "Very consistent setup across the ladder"
  - "The Titan's size and Hulking Form make it sturdy"
cons:
  - "Requires The Unborn Lich"
  - "A warrior played as a caster is unusual and takes some respec planning"
  - "The reference gear includes expensive uniques"
skills:
  - gem: His Scattering Calamity
    supports: [Zenith II, Execute III, Rakiata's Flow, Esh's Radiance, Sione's Temper]
  - gem: Comet
    supports: [Boundless Energy II, Spell Cascade, Efficiency II, Lifetap]
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Comet
  - gem: Sigil of Power
    supports: [Prolonged Duration II, Magnified Area II, Cooldown Recovery II, Efficiency II, Profanity II]
  - gem: Mana Tempest
    supports: [Lightning Mastery, Morgana's Tempest, Lifetap, Efficiency II, Dialla's Desire]
  - gem: Powered by Verisium
    supports: &a1 [Wildshards II, Efficiency II, Atalui's Bloodletting]
    note: Socketed in Cast on Critical
  - gem: Arc
    supports: *a1
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Powered by Verisium, Arc
  - gem: Temporal Chains
    supports: [Seraph's Heart, Atziri's Communion, Ritualistic Curse, Clarity I]
    note: Socketed in Blasphemy
  - gem: Blasphemy
    supports: []
    note: Holds Temporal Chains
  - gem: Feast of Flesh
    supports: [Magnified Area II, Rapid Casting II, Corpse Conservation]
  - gem: Explosive Transmutation
    supports: [Lightning Mastery, Spell Cascade, Magnified Area II]
  - gem: Siphon Elements
    supports: [Lightning Mastery, Harmonic Remnants II, Remnant Potency I]
  - gem: Mana Remnants
    supports: [Harmonic Remnants II, Remnant Potency I, Cannibalism I]
  - gem: Remnants of Kalguur
    supports: [Harmonic Remnants II, Remnant Potency I]
gear:
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+4 to Level of all Spell Skills, +176 to maximum Mana, +50 to Spirit, 37% increased Cast Speed]
    ladder:
      - name: Rare Amulet
        pct: 99
      - name: Defiance of Destiny
        pct: 1
      - name: Beacon of Azis
        pct: 0
      - name: Astramentis
        pct: 0
  body:
    unique: Morior Invictus
    runes: ["2× Perfect Mind Rune: +100 to maximum Mana", "3× Perfect Glacial Rune: +66% to Cold Resistance"]
    ladder:
      - name: Rare Body Armour
        pct: 52
      - name: Morior Invictus
        pct: 42
      - name: Reverie
        pct: 1
      - name: Kaom's Heart
        pct: 1
  boots:
    base: Sekhema Sandals
    mods: [+44% to Fire Resistance, 35% increased Movement Speed, +59 to maximum Energy Shield, +43% to Lightning Resistance, +25% to Chaos Resistance, 99% increased Energy Shield]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Tecrod's Gaze: 10% increased Movement Speed when on Low Life"]
    ladder:
      - name: Rare Boots
        pct: 99
      - name: Decree of Flight
        pct: 1
      - name: Ghostmarch
        pct: 0
      - name: Wanderlust
        pct: 0
  belt:
    unique: Mageblood
    ladder:
      - name: Headhunter
        pct: 43
      - name: Mageblood
        pct: 38
      - name: Rare Belt
        pct: 12
      - name: Ingenuity
        pct: 6
  helmet:
    base: Ancestral Tiara
    mods: [+72 to maximum Energy Shield, 37% increased Energy Shield, +32 to maximum Mana, 26% increased Critical Hit Chance, +37% to Fire Resistance, +35% to Lightning Resistance, 100% increased Energy Shield]
    runes: ["Pain Attunement", "Raven-Touched Shard: Raven-Touched"]
    ladder:
      - name: Rare Helmet
        pct: 95
      - name: Alpha's Howl
        pct: 2
      - name: Veil of the Night
        pct: 2
      - name: Scold's Bridle
        pct: 1
  gloves:
    base: Opulent Gloves
    mods: [+122 to maximum Mana, +2 to Level of all Projectile Skills, 38% increased Projectile Damage, +56 to maximum Energy Shield, 60% increased effect of Socketed Augment Items, 28% increased Critical Damage Bonus]
    runes: ["Fenumus' Rune of Spinning: 12% increased Cast Speed", "Kolr's Hunt: Can roll Marksman modifiers"]
    ladder:
      - name: Rare Gloves
        pct: 96
      - name: Leopold's Applause
        pct: 2
      - name: Maligaro's Virtuosity
        pct: 1
      - name: Painter's Servant
        pct: 1
  weapon2:
    base: Chiming Staff
    mods: [Gain 52% of Damage as Extra Lightning Damage, 132% increased Spell Damage, +22 to Intelligence, 72% increased chance to Shock, +172 to maximum Mana, +6 to Level of all Spell Skills]
    runes: ["Astrid's Creativity: Can have 1 additional Crafted Modifier", "Greater Inspiration Rune: 30% increased Mana Regeneration Rate"]
    ladder:
      - name: The Unborn Lich
        pct: 100
      - name: Rare Staff
        pct: 71
      - name: Rare Talisman
        pct: 1
      - name: Amor Mandragora
        pct: 1
  ring1:
    unique: Kalandra's Touch
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 75
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
  weapon:
    unique: The Unborn Lich
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements", "Thane Girt's Rune of Wildness: 25% chance for Spell Skills to fire 2 additional Projectiles"]
    ladder:
      - name: The Unborn Lich
        pct: 100
      - name: Rare Staff
        pct: 71
      - name: Rare Talisman
        pct: 1
      - name: Amor Mandragora
        pct: 1
  ring2:
    base: Mnemonic Ring
    implicits: [8% increased maximum Mana]
    mods: [+254 to maximum Mana, 21% increased Cast Speed, +31 to Intelligence, +15% to all Elemental Resistances, Gain 11% of Damage as Extra Fire Damage with Spells, 8% increased maximum Mana]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 75
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
passives:
  attribute: int
  path:
    - "Cruel Fate"
    - "Constricting"
    - "Mind Over Matter"
    - "Raw Mana"
    - "Controlling Magic"
    - "Arcane Intensity"
    - "Eldritch Battery"
    - "For the Jugular"
    - "True Strike"
    - "Heartbreaking"
    - "Heartstopping"
    - "Remnant Attraction"
    - "Tempered Mind"
    - "Dreamcatcher"
    - "Mental Alacrity"
    - "Brain Freeze"
    - "Invigorating Archon"
    - "Energising Archon"
    - "Brain Storm"
    - "Cooked"
  ascendancy: [Mysterious Lineage, Hulking Form, Crushing Impacts, Colossal Capacity]
  weaponSet1: [Turn the Clock Back, Turn the Clock Forward, Forthcoming, Careful Assassin, Throatseeker, Near at Hand]
  weaponSet2: [Preservation, Effervescent, Casting Cascade, Overzealous, Final Barrage, Reverberation]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide. [[His Scattering Calamity]] is granted by the unique staff [[The Unborn Lich]], worn by all 541 Titans in this group. Its most common links are **Zenith II (91%), Sione's Temper (79%), Rakiata's Flow (66%) and Esh's Radiance (61%)**.

The rest of the setup supports that one skill: [[Mana Tempest]] (67%) and [[Sigil of Power]] (66%) boost spell damage, and this character also triggers [[Comet]] and [[Arc]] through [[Cast on Critical]].

## Ascendancy and Key Passives

Colossal Capacity and Hulking Form (100%), Mysterious Lineage (93%) and Crushing Impacts (76%) on the ascendancy. Eldritch Battery (94%) and Mind Over Matter (91%) turn your large mana pool into a defence.

## Gear

[[The Unborn Lich]] is mandatory. Kalandra's Touch (75%) and [[Headhunter]] (43%) are common on the ladder; this character wears [[Morior Invictus]] and [[Mageblood]], which are endgame luxuries rather than requirements of the build.
