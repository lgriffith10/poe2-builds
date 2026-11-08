---
title: Cluster Grenade Warbringer
class: Warrior
ascendancy: Warbringer
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Warbringer using Cluster Grenade"
  author: Dein_Nachbar_Singt (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/DeaDrecome-4892/Dein_Nachbar_Singt
  updated: 2026-10-17
origin: ladder
summary: Crossbow Warbringer that fires Cluster and Voltaic Grenades from a distance while Ancestral Spirits and Encase in Jade hold the line.
tags: [crossbow, grenade, fire, lightning, ranged]
damage: Fire / Lightning
playstyle: Ranged attack
difficulty: medium
budget: high
pros:
  - "Very consistent setup: almost every player links the same supports"
  - Grenades hit large areas from a safe distance
  - Ancestral Spirits and Encase in Jade add help and protection
cons:
  - "Drawn from a level 98 ladder character: Mageblood is out of reach for most players"
  - "No written source guide: no campaign route or detailed rotation"
  - Grenades need a moment to land, which takes practice on moving bosses
skills:
  - gem: Cluster Grenade
    supports: [Fire Attunement, Multishot II, Payload, Rakiata's Flow]
    note: Main skill, fired from Mortar Cannon; Multishot II and Payload on 99% of these players
  - gem: Mortar Cannon
    supports: []
    note: Fires the socketed grenade
  - gem: Ancestral Spirits
    supports: [Culling Strike II, Blind I, Minion Mastery, Armour Demolisher II]
    note: Warbringer skill from Answered Call (every player in this group takes it)
  - gem: Voltaic Grenade
    supports: [Lightning Attunement, Shock, Payload, Elemental Armament II]
    note: Second grenade for lightning damage and shock; used by 91% of these players
  - gem: Crossbow Shot
    supports: [Rage I, Rapid Attacks I]
    note: Basic crossbow attack
  - gem: Encase in Jade
    supports: [Rapid Casting II, Prolonged Duration II]
    note: Defensive skill tied to the Jade Heritage notable
  - gem: Time of Need
    supports: [Cooldown Recovery II, Vitality II]
    note: Emergency recovery
  - gem: Leap Slam
    supports: []
  - gem: Eternal Rage
    supports: []
gear:
  gloves:
    base: Blacksteel Gauntlets
    mods: [Adds 17 to 31 Physical Damage to Attacks, 90% increased Armour and Evasion, +134 to maximum Life, +2 to Level of all Projectile Skills, +36% to Cold Resistance, 18% increased Rarity of Items found]
    runes: [+75 to maximum Life, Can roll Marksman modifiers]
    ladder:
      - name: Rare Gloves
        pct: 99
      - name: Maligaro's Virtuosity
        pct: 0
      - name: Painter's Servant
        pct: 0
  boots:
    base: Vaal Greaves
    mods: [35% increased Movement Speed, 91% increased Armour, +100 to maximum Life, +27% to Chaos Resistance, +38% to Fire Resistance, 16% increased Rarity of Items found]
    runes: [5% increased Movement Speed, +75 to maximum Life]
    ladder:
      - name: Rare Boots
        pct: 100
  ring1:
    base: Topaz Ring
    implicits: [+22% to Lightning Resistance]
    mods: [Adds 13 to 23 Physical Damage to Attacks, Adds 29 to 44 Fire damage to Attacks, +124 to maximum Life, +32% to Lightning Resistance, 20.9 Life Regeneration per second, +14% to Lightning and Chaos Resistances]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 11
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
  belt:
    unique: Mageblood
    ladder:
      - name: Rare Belt
        pct: 61
      - name: Mageblood
        pct: 31
      - name: Headhunter
        pct: 6
      - name: Ryslatha's Coil
        pct: 1
  body:
    base: Ornate Plate
    implicits: [Regenerate 2.3% of maximum Life per second]
    mods: [107% increased Armour, +61 to Spirit, +40% to Lightning Resistance, +33% of Armour also applies to Elemental Damage, 26.4 Life Regeneration per second, +290 to Armour]
    runes: ["20% increased Armour, Evasion and Energy Shield", 5% increased maximum Life, +50% of Armour also applies to Elemental Damage, +2 to Armour per 1 Spirit]
    ladder:
      - name: Rare Body Armour
        pct: 95
      - name: Morior Invictus
        pct: 2
      - name: Reverie
        pct: 1
      - name: The Brass Dome
        pct: 1
  weapon2:
    unique: Frostbreath
    ladder:
      - name: Rare Crossbow
        pct: 98
      - name: Sculpted Suffering
        pct: 4
      - name: Rare Talisman
        pct: 3
      - name: Frostbreath
        pct: 2
  ring2:
    base: Gold Ring
    implicits: [10% increased Rarity of Items found]
    mods: [Adds 12 to 24 Physical Damage to Attacks, +107 to maximum Life, +41% to Fire Resistance, +48% to Cold Resistance, 19% increased Rarity of Items found, 16% increased Rarity of Items found]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 11
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
  helmet:
    base: Imperial Greathelm
    mods: [17% increased Rarity of Items found, +215 to Armour, 39% increased Armour, +215 to maximum Life, +45% to Fire Resistance, +36% of Armour also applies to Elemental Damage]
    runes: [+4 to Maximum Rage, Raven-Touched]
    ladder:
      - name: Rare Helmet
        pct: 96
      - name: Alpha's Howl
        pct: 2
      - name: Constricting Command
        pct: 1
      - name: Decree of Acuity
        pct: 0
  weapon:
    base: Siege Crossbow
    implicits: [Grenade Skills Fire an additional Projectile]
    mods: [Adds 53 to 91 Physical Damage, 169% increased Physical Damage, +5 to Level of all Projectile Skills, 73% increased Physical Damage, +165 to Accuracy Rating, 16% increased Attack Speed, +2 to maximum number of Summoned Ballista Totems]
    runes: [40% increased Physical Damage, +1 to Level of all Grenade Skill Gems]
    ladder:
      - name: Rare Crossbow
        pct: 98
      - name: Sculpted Suffering
        pct: 4
      - name: Rare Talisman
        pct: 3
      - name: Frostbreath
        pct: 2
  amulet:
    unique: Fireflower
    ladder:
      - name: Fireflower
        pct: 74
      - name: Idol of Uldurn
        pct: 15
      - name: Rare Amulet
        pct: 10
      - name: Astramentis
        pct: 1
passives:
  attribute: str
  path:
    - "Relentless"
    - "Sturdy Metal"
    - "Carved Earth"
    - "Blazing Arms"
    - "Crushing Verdict"
    - "Ichlotl's Inferno"
    - "Heatproof"
    - "Watchtowers"
    - "Ancestral Mending"
    - "Blood Magic"
    - "Tempered Defences"
    - "The Molten One's Gift"
    - "Battle Trance"
    - "Demolitionist"
    - "Impact Force"
    - "Ancestral Reach"
    - "Fortified Location"
    - "Artillery Strike"
    - "Repeating Explosives"
    - "Supportive Ancestors"
    - "Ancestral Alacrity"
    - "Ancient Aegis"
  ascendancy: [Jade Heritage, Answered Call, Wooden Wall, Anvil's Weight]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide. 298 of the 888 Warbringer characters on the ladder use [[Cluster Grenade]], and they agree on almost everything: **Multishot II and Payload are on 99%** of them and Fire Attunement on 90%. The character shown fires it from [[Mortar Cannon]].

[[Voltaic Grenade]] (91%) adds lightning damage and shocks, and many players also throw Oil Grenade (38%). The Warbringer side comes from its ascendancy: [[Ancestral Spirits]] is used by 96% of this group, and [[Encase in Jade]] protects you.

## Ascendancy and Key Passives

Answered Call is taken by every character in this group, with Wooden Wall (96%), Jade Heritage (91%) and Anvil's Weight (89%). Blood Magic appears on 95% of them.

## Gear

A Siege Crossbow carries the damage. The most common uniques are Fireflower (74%), Heart of the Well (68%), From Nothing (50%) and Rite of Passage (48%). The character's Mageblood is a luxury: capped resistances, life and a strong crossbow come first.
