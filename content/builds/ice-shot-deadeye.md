---
title: Ice Shot Deadeye
class: Ranger
ascendancy: Deadeye
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Ice Shot Deadeye Build Guide
  author: aer0 (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/ice-shot-deadeye-build-guide
  updated: 2026-09-04
summary: Cold bow build that shatters packs with Ice Shot's shard bursts and deletes frozen bosses with a perfectly timed Snipe.
tags: [bow, cold, crit, freeze, ranged]
damage: Cold
playstyle: Ranged attack
difficulty: medium
budget: low
tiers:
  starter: A
  endgame: B
  bossing: B
pros:
  - Very fast mapping with excellent coverage
  - Strong single target once Snipe is mastered
  - Evasion and Deflection avoid most incoming hits
cons:
  - Snipe needs precise timing to deal its full damage
  - Damage over time and ground effects hurt evasion-based defences
skills:
  - gem: Ice Shot
    supports: [Cold Attunement, Ricochet II, Elemental Armament II, Ice Bite II, Stoicism II]
    note: Main clear and single-target skill
  - gem: Snipe
    supports: [Window of Opportunity II, Concentrated Area, Elemental Armament II, Elemental Focus, Inexorable Critical I]
    note: Burst on frozen bosses; release at the perfect timing window
  - gem: Tornado Shot
    supports: [Prolonged Duration II, Durability, Overabundance II]
    note: Place tornadoes, then shoot through them to split projectiles
  - gem: Barrage
    supports: [Perpetual Charge, Cooldown Recovery II]
    note: Empowers the next attacks; use before Snipe and on cooldown while mapping
  - gem: Ice-Tipped Arrows
    supports: [Magnified Area II, Elemental Armament II, Short Fuse I, Longshot II]
    note: Extra clear and freeze buildup
  - gem: Freezing Salvo
    supports: [Elemental Armament II, Cold Attunement, Freeze, Ice Bite II]
    note: Large freeze buildup to set up Snipe
  - gem: Herald of Ice
    supports: [Magnified Area II, Cold Attunement]
    note: Shattering explosions for clear
  - gem: Wind Dancer
    supports: [Blind II, Pin I, Knockback]
    note: Evasion buff and melee knockback
  - gem: Called Shots
    supports: [Sniper's Mark, Freezing Mark, Charged Mark, Mark of Siphoning, Charge Profusion II]
    note: Deadeye mark package
  - gem: Rhoa Mount
    supports: [Loyalty, Meat Shield II, Elemental Army]
    note: Mounted movement speed in maps
leveling:
  - name: "Campaign"
    steps:
      - name: "Level 1-5"
        skills:
          - gem: "Escape Shot"
            supports: [Cold Attunement]
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I]
          - gem: "Frost Bomb"
      - name: "Level 6-14"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Elemental Armament I]
          - gem: "Escape Shot"
            supports: [Cold Attunement, Freeze]
          - gem: "Freezing Salvo"
            supports: [Cold Attunement, Ice Bite I]
          - gem: "Herald of Ice"
          - gem: "Snipe"
            supports: [Window of Opportunity I, Burgeon I]
          - gem: "Stormcaller Arrow"
            supports: [Lightning Attunement]
          - gem: "Ice-Tipped Arrows"
            supports: [Magnified Area I]
          - gem: "Frost Bomb"
      - name: "Level 15-30"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Elemental Armament I]
          - gem: "Escape Shot"
            supports: [Cold Attunement, Freeze]
          - gem: "Freezing Salvo"
            supports: [Cold Attunement, Ice Bite I]
          - gem: "Herald of Ice"
            supports: [Cold Attunement, Magnified Area I]
          - gem: "Snipe"
            supports: [Window of Opportunity I, Concentrated Area, Elemental Armament I]
          - gem: "Barrage"
            supports: [Perpetual Charge]
          - gem: "Ice-Tipped Arrows"
            supports: [Magnified Area I, Elemental Armament I]
          - gem: "Freezing Mark"
            supports: [Prolonged Duration I]
      - name: "Level 31 to Maps"
        skills:
          - gem: "Ice Shot"
            supports: [Elemental Armament I, Cold Attunement, Gambleshot, Rapid Attacks II]
          - gem: "Freezing Salvo"
            supports: [Cold Attunement, Ice Bite I, Elemental Armament II, Freeze]
          - gem: "Herald of Ice"
            supports: [Overreach, Cold Attunement]
          - gem: "Tornado Shot"
            supports: [Overabundance I]
          - gem: "Snipe"
            supports: [Window of Opportunity I, Concentrated Area, Elemental Armament II]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion I]
          - gem: "Ice-Tipped Arrows"
            supports: [Cold Attunement, Magnified Area I, Elemental Armament II]
          - gem: "Barrage"
            supports: [Perpetual Charge, Cooldown Recovery II]
          - gem: "Wind Dancer"
            supports: [Blind I, Pin I]
          - gem: "Called Shots"
            supports: [Freezing Mark, Mark of Siphoning, Charged Mark]
      - name: "Early Maps"
        skills:
          - gem: "Ice Shot"
            supports: [Cold Attunement, Ricochet II, Elemental Armament II, Ice Bite II, Stoicism II]
          - gem: "Snipe"
            supports: [Window of Opportunity II, Concentrated Area, Elemental Armament II, Elemental Focus, Inexorable Critical I]
          - gem: "Barrage"
            supports: [Perpetual Charge, Cooldown Recovery II]
          - gem: "Tornado Shot"
            supports: [Prolonged Duration II, Durability, Overabundance II]
          - gem: "Wind Dancer"
            supports: [Blind II, Pin I, Knockback]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Cold Attunement]
          - gem: "Ice-Tipped Arrows"
            supports: [Magnified Area II, Elemental Armament II, Short Fuse I, Longshot II]
          - gem: "Rhoa Mount"
            supports: [Loyalty, Meat Shield II, Elemental Army]
          - gem: "Called Shots"
            supports: [Sniper's Mark, Freezing Mark, Charged Mark, Mark of Siphoning, Charge Profusion II]
          - gem: "Freezing Salvo"
            supports: [Elemental Armament II, Cold Attunement, Freeze, Ice Bite II]
rotations:
  - name: "Bossing"
    steps:
      - gem: "Ice-Tipped Arrows"
      - gem: "Tornado Shot"
      - gem: "Ice Shot"
      - gem: "Barrage"
      - gem: "Snipe"
  - name: "Mapping"
    steps:
      - gem: "Barrage"
      - gem: "Ice-Tipped Arrows"
      - gem: "Tornado Shot"
      - gem: "Ice Shot"
gear:
  weapon:
    base: Guardian Bow
    mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Increased Attack Speed, Critical Hit Chance, Additional Arrow]
  offhand:
    unique: Cadiro's Gambit
    note: Random special arrows; a rare quiver with +Projectile Skill levels and Critical Damage is a fine alternative.
  helmet:
    base: Freebooter Cap
    mods: [Evasion Rating, +Maximum Life, Deflection, Critical Hit Chance]
  body:
    unique: Hyrri's Ire
  gloves:
    base: Polished Bracers
    mods: [Deflection, Evasion Rating, Adds Cold Damage to Attacks, +Maximum Life]
  boots:
    base: Drakeskin Boots
    mods: [Movement Speed, Evasion Rating, Deflection, +Maximum Life]
  amulet:
    base: Solar Amulet
    mods: [+Spirit, +Level of all Projectile Skills, +Maximum Life, Increased Evasion Rating]
  ring1:
    base: Amethyst Ring
    mods: [+Maximum Life, Adds Cold Damage to Attacks, Elemental Resistances]
  ring2:
    base: Amethyst Ring
    mods: [+Maximum Life, Adds Cold Damage to Attacks, Elemental Resistances]
  belt:
    base: Wide Belt
    mods: [+Maximum Life, Elemental Resistances]
gearStages:
  campaign:
    weapon:
      base: Snakewood Shortbow
      mods: [Increased Physical Damage, Adds Cold Damage, +Level of all Projectile Skills]
    helmet:
      base: Viper Cap
      mods: [Evasion Rating, +Maximum Life]
    body:
      base: Serpentscale Coat
      mods: [Evasion Rating, +Maximum Life]
    gloves:
      base: Hunting Bracers
      mods: [Adds Physical Damage to Attacks, +Maximum Life]
    boots:
      base: Lizardscale Boots
      mods: [Movement Speed, +Maximum Life]
    amulet:
      base: Bloodstone Amulet
      mods: [+Maximum Life, +Level of all Projectile Skills]
    ring1:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life]
    ring2:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life]
  endgame:
    weapon:
      base: Guardian Bow
      mods: [High Physical DPS, Increased Attack Speed, Critical Hit Chance, Additional Arrow]
    offhand:
      unique: "Cadiro's Gambit"
    helmet:
      base: Freebooter Cap
      mods: [Evasion Rating, Deflection, +Maximum Life, Critical Hit Chance]
    body:
      unique: "Hyrri's Ire"
    gloves:
      base: Polished Bracers
      mods: [Deflection, Evasion Rating, Adds Cold Damage to Attacks, +Maximum Life]
    boots:
      base: Drakeskin Boots
      mods: [Movement Speed, Evasion Rating, Deflection, +Maximum Life]
    amulet:
      base: Solar Amulet
      mods: [+Spirit, +Level of all Projectile Skills, +Maximum Life, Evasion Rating]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Adds Cold Damage to Attacks, Elemental Resistances]
    ring2:
      base: Amethyst Ring
      mods: [+Maximum Life, Adds Cold Damage to Attacks, Elemental Resistances]
    belt:
      base: Wide Belt
      mods: [+Maximum Life, Elemental Resistances]
  minmax:
    weapon:
      base: Warmonger Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Critical Hit Chance, +Level of all Projectile Skills, Increased Attack Speed]
    offhand:
      unique: "Cadiro's Gambit"
    helmet:
      base: Freebooter Cap
      mods: [+Maximum Life, Evasion Rating, Deflection, Critical Hit Chance]
    body:
      unique: "Hyrri's Ire"
    gloves:
      base: Polished Bracers
      mods: [+Maximum Life, Evasion Rating, Deflection, Adds Physical Damage to Attacks, Critical Damage Bonus]
    boots:
      base: Drakeskin Boots
      mods: [Movement Speed, +Maximum Life, Deflection, Evasion Rating]
    amulet:
      base: Solar Amulet
      mods: [+Maximum Life, +Spirit, Evasion Rating, +Level of all Projectile Skills]
    ring1:
      base: Breach Ring
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life]
    ring2:
      base: Breach Ring
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life]
    belt:
      base: Heavy Belt
      mods: [+Maximum Life, +Maximum Mana]
passives:
  attribute: dex
  path:
    - Honed Instincts
    - Vile Wounds
    - Primal Sundering
    - Harness the Elements
    - Escape Velocity
    - Catalysis
    - Maiming Strike
    - Acceleration
    - Coming Calamity
    - Snowpiercer
    - Marked for Sickness
    - Marked for Death
    - Blinding Strike
    - Agile Succession
    - Feathered Fletching
    - Catlike Agility
    - Blur
    - Heartstopping
    - Struck Through
    - Heartbreaking
    - Moment of Truth
    - Crashing Wave
    - True Strike
    - For the Jugular
    - Deadly Force
    - Distracted Target
    - Stand and Deliver
    - Frenetic
    - Deep Freeze
  ascendancy: [Gathering Winds, Called Shots, Bullseye]
---

## How It Works

[[Ice Shot]] fires an arrow that bursts into a fan of icy shards when it hits an enemy or object, and those shards can all strike the same target. Shooting it through a tornado from [[Tornado Shot]] splits the projectiles again, multiplying the number of shards that reach the pack or the boss. The build scales physical and cold damage with critical strikes, freezes enemies quickly thanks to its cold supports, then cashes in on frozen targets with [[Snipe]].

Add quality to [[Ice Shot]] as early as you can: in this version of the game, quality on the gem is a straight damage increase.

## Playstyle

**Mapping.** Keep [[Barrage]] on cooldown and fire [[Ice Shot]] into packs. [[Herald of Ice]] shatters frozen enemies and chains the clear across the screen. Use [[Ice-Tipped Arrows]] when packs are dense or tanky.

**Bossing.**

1. Drop a [[Tornado Shot]] just before the boss becomes active.
2. Shoot [[Ice Shot]] through the tornado into the boss, and use [[Freezing Salvo]] to build up the freeze quickly.
3. Once the boss is frozen, activate [[Barrage]] and release [[Snipe]] at the perfect timing (your character glows when it is ready).
4. Repeat. Practise the Snipe timing on trash mobs first: a mistimed Snipe loses most of its damage.

## Defences

The build relies on Evasion and Deflection rather than raw life. [[Wind Dancer]] adds evasion and knocks back melee attackers, and [[Hyrri's Ire]] doubles your evasion while you have not been hit recently. Prioritise Deflection on helmet, gloves and boots. Damage over time and ground degens bypass evasion entirely, so step out of them and keep your resistances capped.

## Gear Priorities

Your bow is by far the most important item: look for high physical damage per second, attack speed and critical strike chance, with added cold damage and an additional arrow as bonuses. After that, an amulet with Spirit and +Level of all Projectile Skills, then life and resistances on the remaining slots.
