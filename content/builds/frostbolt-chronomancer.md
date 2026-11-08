---
title: Frostbolt Chronomancer
class: Sorceress
ascendancy: Chronomancer
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Chronomancer using Frostbolt"
  author: 三百六十度原地轉一圈 (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/ophster125268-3466/%E4%B8%89%E7%99%BE%E5%85%AD%E5%8D%81%E5%BA%A6%E5%8E%9F%E5%9C%B0%E8%BD%89%E4%B8%80%E5%9C%88
  updated: 2026-10-21
origin: ladder
summary: "Sorceress who fires Frostbolt and lets critical hits trigger Comet and other spells, on the Chronomancer's time magic."
tags: [caster, cold, projectile, trigger]
damage: Cold
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Frostbolt is the only spell you really aim"
  - "Comet and other spells trigger on critical hits"
  - "Strong ascendancy with Phased Form and Quicksand Hourglass"
cons:
  - "Small sample: 239 ladder characters"
  - "The trigger setup takes some understanding"
  - "The reference gear includes Mageblood"
skills:
  - gem: Frostbolt
    supports: [Vilenta's Propulsion, Sione's Temper, Trickster's Shard, Atalui's Bloodletting, Rakiata's Flow]
  - gem: Powered by Verisium
    supports: &a1 [Projectile Acceleration III, Zenith II, Esh's Prowess]
    note: Socketed in Spellslinger
  - gem: Spark
    supports: *a1
    note: Socketed in Spellslinger
  - gem: Spellslinger
    supports: []
    note: Holds Powered by Verisium, Spark
  - gem: Living Bomb
    supports: &a2 [Boundless Energy II, Efficiency II, Execute III]
    note: Socketed in Cast on Critical
  - gem: Comet
    supports: *a2
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Living Bomb, Comet
  - gem: Living Bomb
    supports: &a3 [Boundless Energy II, Efficiency II, Creeping Chill]
    note: Socketed in Cast on Critical
  - gem: Grim Pillars
    supports: *a3
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Living Bomb, Grim Pillars
  - gem: Archmage
    supports: [Dialla's Desire, Herbalism II, Lightning Mastery, Her Declaration, Cannibalism I]
  - gem: Explosive Transmutation
    supports: [Mórrigan's Insight, Spell Cascade, Zenith II, Physical Mastery, Lightning Attunement]
  - gem: Time Snap
    supports: [Atziri's Impatience, Second Wind III, Rapid Casting II, Uhtred's Rite]
  - gem: Refutation
    supports: [Uhtred's Constellation, Prolonged Duration II, Rapid Casting II, Mobility]
  - gem: Time Freeze
    supports: [Second Wind III, Rapid Casting II, Magnified Area II]
  - gem: Rite of Restoration
    supports: [Second Wind III, Rapid Casting III, Magnified Area II]
  - gem: Mana Remnants
    supports: [Remnant Potency I, Harmonic Remnants II, Khatal's Rejuvenation]
  - gem: Blink
    supports: [Cooldown Recovery II, Rapid Casting II]
  - gem: Remnants of Kalguur
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Trinity
    supports: [Atziri's Communion, Uhtred's Omen]
  - gem: Purity of Fire
    supports: []
  - gem: Raise Shield
    supports: []
gear:
  gloves:
    base: Opulent Gloves
    mods: [+75 to maximum Mana, 15% increased Projectile Speed, +2 to Level of all Projectile Skills, +25 to Intelligence, 33% increased Projectile Damage, Projectiles have 96% chance for an additional Projectile when Forking]
    runes: [20% increased Life and Mana Recovery from Flasks, Can roll Marksman modifiers]
    ladder:
      - name: Maligaro's Virtuosity
        pct: 53
      - name: Rare Gloves
        pct: 35
      - name: Nightscale
        pct: 10
      - name: Idle Hands
        pct: 0
  belt:
    unique: Mageblood
    ladder:
      - name: Rare Belt
        pct: 44
      - name: Mageblood
        pct: 34
      - name: Headhunter
        pct: 11
      - name: Midnight Braid
        pct: 7
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+146 to maximum Mana, +4 to Level of all Spell Skills, 33% increased Critical Hit Chance, +50 to Spirit]
    ladder:
      - name: Rare Amulet
        pct: 92
      - name: Eventide Petals
        pct: 5
      - name: Choir of the Storm
        pct: 1
      - name: Fixation of Yix
        pct: 1
  weapon2:
    base: Dueling Wand
    mods: [Gain 22% of Damage as Extra Cold Damage, 73% increased Fire Damage, +118 to maximum Mana, +4 to Level of all Spell Skills, 27% increased Cast Speed, Gain 22 Life per enemy killed]
    runes: [30% increased Spell Damage]
    ladder:
      - name: Rare Staff
        pct: 71
      - name: Rare Wand
        pct: 34
      - name: Atziri's Rule
        pct: 9
      - name: Widowhail
        pct: 8
  boots:
    base: Sekhema Sandals
    mods: [+128 to maximum Life, +122 to maximum Mana, 18% increased Rarity of Items found, 58% reduced Shock duration on you, 35% increased Movement Speed, 60% increased effect of Socketed Augment Items]
    runes: [16% increased Movement Speed when on Low Life, 32% increased Life and Mana Recovery from Flasks]
    ladder:
      - name: Rare Boots
        pct: 98
      - name: Atziri's Step
        pct: 1
      - name: Wanderlust
        pct: 1
      - name: Wondertrap
        pct: 0
  helmet:
    unique: Alpha's Howl
    runes: [15% increased Cost Efficiency]
    ladder:
      - name: Rare Helmet
        pct: 73
      - name: Alpha's Howl
        pct: 13
      - name: Scold's Bridle
        pct: 5
      - name: Myris Uxor
        pct: 4
  offhand2:
    unique: Crest of Ardura
    runes: [+60 to maximum Life]
    ladder:
      - name: Rare Focus
        pct: 30
      - name: Drillneck
        pct: 8
      - name: Svalinn
        pct: 2
      - name: Arvil's Wheel
        pct: 1
  body:
    unique: Reverie
    runes: [Cannot be Ignited, -10 Physical Damage taken from Attack Hits, 20% increased Life and Mana Recovery from Flasks, 15% Life Recovery from Flasks also applies to Runic Ward]
    ladder:
      - name: Rare Body Armour
        pct: 72
      - name: Sacrosanctum
        pct: 8
      - name: Morior Invictus
        pct: 6
      - name: Sands of Silk
        pct: 3
  ring1:
    unique: Snakepit
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Snakepit
        pct: 78
      - name: Kalandra's Touch
        pct: 8
      - name: Dream Fragments
        pct: 1
  offhand:
    unique: Sacred Flame
    runes: [15% increased Spirit, +15 to Intelligence]
    ladder:
      - name: Rare Focus
        pct: 30
      - name: Drillneck
        pct: 8
      - name: Svalinn
        pct: 2
      - name: Arvil's Wheel
        pct: 1
  ring2:
    base: Mnemonic Ring
    implicits: [8% increased maximum Mana]
    mods: [15% increased Critical Hit Chance for Spells, 22% increased Critical Spell Damage Bonus, +10% to all Elemental Resistances, 30% increased Mana Cost Efficiency of Spells, +222 to maximum Mana, 8% increased maximum Mana]
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Snakepit
        pct: 78
      - name: Kalandra's Touch
        pct: 8
      - name: Dream Fragments
        pct: 1
  weapon:
    base: Dueling Wand
    mods: [72% increased Critical Hit Chance for Spells, Gain 31% of Damage as Extra Fire Damage, +3 to Level of all Spell Skills, 123% increased Spell Damage, +175 to maximum Mana, +1 to Level of all Spell Skills, 28% increased Cast Speed, Gain 10% of Elemental Damage as Extra Cold Damage]
    runes: [+1 to Level of all Spell Skills, Remnants you create have 25% reduced effect, Remnants can be collected from 50% further away]
    ladder:
      - name: Rare Staff
        pct: 71
      - name: Rare Wand
        pct: 34
      - name: Atziri's Rule
        pct: 9
      - name: Widowhail
        pct: 8
passives:
  attribute: int
  path:
    - "Raw Power"
    - "Practiced Signs"
    - "Arcane Remnants"
    - "Vigorous Remnants"
    - "Efficient Casting"
    - "Empowering Remnants"
    - "Shocking Limit"
    - "Frozen Limit"
    - "Infernal Limit"
    - "Empowering Infusions"
    - "Everlasting Infusions"
    - "Infusion of Power"
    - "Mind Over Matter"
    - "Pain Attunement"
    - "Well of Power"
    - "True Strike"
  ascendancy: [Unbound Encore, Quicksand Hourglass, Now and Again, Ultimate Command]
  weaponSet1: [Critical Overload, For the Jugular, Evocational Practitioner, Turn the Clock Forward]
  weaponSet2: [Preservation, Lingering Horror, Devoted Protector, Grounded in the Earth]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide. [[Frostbolt]] fires a slow cold projectile; players link it with **Sione's Temper (84%), Vilenta's Propulsion (81%) and Trickster's Shard (69%)**.

[[Frost Wall]] (86%), [[Comet]] (78%) and [[Frost Bomb]] (71%) round out most setups. This character triggers [[Comet]], [[Living Bomb]] and [[Grim Pillars]] through [[Cast on Critical]], and [[Spark]] through [[Spellslinger]].

## Ascendancy and Key Passives

Phased Form (91%), Quicksand Hourglass (86%), Now and Again (82%) and Footprints in the Sand (56%).

## Gear

[[Snakepit]] (78%) and Maligaro's Virtuosity (53%) are the most common uniques. This character wears [[Snakepit]], [[Reverie]], [[Alpha's Howl]], [[Sacred Flame]] and [[Crest of Ardura]] on the second weapon set; [[Mageblood]] is an endgame luxury.
