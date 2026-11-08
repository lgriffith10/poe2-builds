---
title: Twister Spirit Walker
class: Huntress
ascendancy: Spirit Walker
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Spirit Walker Twisters Build Guide
  author: aer0 (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/spirit-walker-twisters
  updated: 2026-09-02
summary: Spear Huntress that floods the screen with icy Twisters, freezing packs and shattering them while spirit companions fight alongside.
tags: [spear, cold, projectile, companion, mapping]
damage: Cold
playstyle: Ranged attack
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - Huge screen coverage while mapping
  - Freeze and chilled ground keep enemies under control
  - Companions draw aggro and add damage
cons:
  - Several buttons to juggle for full damage
  - Evasion-based defences struggle against damage over time
skills:
  - gem: Twister
    supports: [Elemental Armament II, Retreat III, Frost Nexus, Projectile Acceleration III, Deliberation]
    note: Main skill
  - gem: Whirling Slash
    supports: [Rage III, Rapid Attacks III, Knockback, Magnified Area II]
    note: Builds the whirlwind stages that empower Twister; use on tanky rares
  - gem: Ice-Tipped Arrows
    supports: [Magnified Area II, Elemental Focus, Cooldown Recovery II, Elemental Armament II]
    note: Icy fragments that clear most trash on their own
  - gem: Barrage
    supports: [Rapid Casting II, Cooldown Recovery II, Perpetual Charge, Heightened Charges]
    note: Repeats your next attacks; great on dense packs and bosses
  - gem: Freezing Mark
    supports: [Charged Mark, Mark of Siphoning II, Prolonged Duration II, Eternal Mark]
    note: Freeze buildup and charge generation
  - gem: Vivid Stampede
    supports: [Magnified Area II, Commiserate, Overcharge, Shock]
    note: Spirit Walker skill
  - gem: Wild Protector
    supports: [Elemental Army, Meat Shield II, Loyalty, Exposing Cry]
    note: Spirit Walker companion
  - gem: Herald of Ice
    supports: [Magnified Area II, Frozen Spite, Elemental Armament II, Elemental Focus]
    note: Shatter explosions
  - gem: War Banner
    supports: [Prolonged Duration II, Magnified Area II, Refraction II]
    note: Damage banner for bosses
  - gem: Combat Frenzy
    supports: [Charge Profusion II]
    note: Frenzy charge generation
  - gem: Wind Dancer
    supports: [Knockback, Life Leech III]
    note: Defensive buff
  - gem: Malice
    supports: [Prolonged Duration II]
    note: Aura
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Whirling Slash"
            supports: [Rapid Attacks I, Rage I]
          - gem: "Twister"
            supports: [Retreat I, Prolonged Duration I]
          - gem: "Frost Bomb"
          - gem: "Fangs of Frost"
          - gem: "Parry"
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "War Banner"
      - name: "Act 2"
        skills:
          - gem: "Whirling Slash"
            supports: [Rapid Attacks I, Rage I]
          - gem: "Twister"
            supports: [Retreat I, Frost Nexus, Elemental Armament II]
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Prolonged Duration I]
          - gem: "Ice-Tipped Arrows"
            supports: [Elemental Armament I, Magnified Area I]
          - gem: "Herald of Ice"
            supports: [Elemental Armament II, Overreach]
      - name: "Act 3 to Maps"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage III, Rapid Attacks III, Knockback]
          - gem: "Twister"
            supports: [Retreat III, Frost Nexus, Elemental Armament II, Projectile Acceleration III]
          - gem: "Ice-Tipped Arrows"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery II, Elemental Armament II]
          - gem: "Barrage"
            supports: [Rapid Casting II, Perpetual Charge, Heightened Charges]
          - gem: "War Banner"
            supports: [Prolonged Duration II, Magnified Area II]
          - gem: "Freezing Mark"
            supports: [Charged Mark, Mark of Siphoning II, Eternal Mark]
          - gem: "Herald of Ice"
            supports: [Elemental Armament II, Overreach, Frozen Spite]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion I]
          - gem: "Wind Dancer"
            supports: [Knockback, Life Leech III]
          - gem: "Primal Bounty"
          - gem: "Malice"
            supports: [Prolonged Duration I]
          - gem: "Vivid Stampede"
            supports: [Magnified Area II, Shock]
          - gem: "Wild Protector"
            supports: [Loyalty, Meat Shield II, Elemental Army]
      - name: "Early Maps"
        skills:
          - gem: "Twister"
            supports: [Elemental Armament II, Retreat III, Frost Nexus, Projectile Acceleration III, Deliberation]
          - gem: "Whirling Slash"
            supports: [Rage III, Rapid Attacks III, Knockback, Magnified Area II]
          - gem: "Ice-Tipped Arrows"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery II, Elemental Armament II]
          - gem: "Barrage"
            supports: [Rapid Casting II, Cooldown Recovery II, Perpetual Charge, Heightened Charges]
          - gem: "Freezing Mark"
            supports: [Charged Mark, Mark of Siphoning II, Prolonged Duration II, Eternal Mark]
          - gem: "War Banner"
            supports: [Prolonged Duration II, Magnified Area II, Refraction II]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Frozen Spite, Elemental Armament II, Elemental Focus]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion II]
          - gem: "Wind Dancer"
            supports: [Knockback, Life Leech III]
          - gem: "Vivid Stampede"
            supports: [Magnified Area II, Commiserate, Overcharge, Shock]
          - gem: "Wild Protector"
            supports: [Elemental Army, Meat Shield II, Loyalty, Exposing Cry]
          - gem: "Malice"
            supports: [Prolonged Duration II]
rotations:
  - name: "Bossing"
    steps:
      - gem: "Ice-Tipped Arrows"
      - gem: "Freezing Mark"
      - gem: "Barrage"
      - gem: "Whirling Slash"
        count: 3
      - gem: "Twister"
  - name: "Map Clear"
    steps:
      - gem: "Ice-Tipped Arrows"
      - gem: "Whirling Slash"
        count: 3
      - gem: "Twister"
gear:
  weapon:
    base: Akoyan Spear
    mods: [+Level of all Projectile Skills, Adds Cold Damage, Adds Physical Damage, Increased Attack Speed, Critical Hit Chance]
  offhand:
    base: Omen Sceptre
    note: For the extra Spirit. Upgrade to Sacred Flame later.
  helmet:
    base: Desert Cap
    mods: [Evasion Rating, +Maximum Life, Deflection]
    note: The Black Insignia is a strong late upgrade.
  body:
    base: Slipstrike Vest
    mods: [Evasion Rating, +Maximum Life, Deflection]
  gloves:
    base: Polished Bracers
    mods: [Evasion Rating, Deflection, Adds Cold Damage to Attacks, Increased Attack Speed]
  boots:
    base: Drakeskin Boots
    mods: [Movement Speed, Evasion Rating, Deflection]
  amulet:
    base: Stellar Amulet
    mods: [+Spirit, +Level of all Projectile Skills, +Maximum Life, Critical Hit Chance]
  ring1:
    base: Amethyst Ring
    mods: [+Maximum Life, Adds Cold Damage to Attacks, Elemental Resistances]
  ring2:
    base: Amethyst Ring
    mods: [+Maximum Life, Adds Physical Damage to Attacks, Life Leech]
    note: The Taming is the aspirational ring.
  belt:
    base: Rawhide Belt
    mods: [+Maximum Life, Elemental Resistances]
passives:
  attribute: dex
  path:
    - Honed Instincts
    - Clean Shot
    - Hail
    - Harness the Elements
    - Escape Velocity
    - Dance with Death
    - Acceleration
    - Catalysis
    - Maiming Strike
    - Focused Thrust
    - Precise Point
    - Roll and Strike
    - The Spring Hare
    - Multitasking
    - Marked for Sickness
    - Marked Agility
    - Coming Calamity
    - Deep Freeze
    - Enhanced Reflexes
  ascendancy: [Primal Bounty, Wild Protector, Vivid Stampede, Sacred Unity]
---

## How It Works

[[Twister]] throws spinning whirlwinds that travel across the screen and hit everything in their path. [[Whirling Slash]] creates a whirlwind around you that grows over successive slashes, and Twisters thrown while it is active are empowered by it. The build converts that into cold damage: [[Frost Nexus]] leaves chilled ground behind, [[Ice-Tipped Arrows]] spray icy fragments, and [[Herald of Ice]] makes frozen enemies explode.

Spirit Walker adds a permanent companion through [[Wild Protector]] and the [[Vivid Stampede]] skill, while Primal Bounty is the first ascendancy pick for its projectile scaling.

## Playstyle

**Clearing.** Throw [[Twister]] and let [[Ice-Tipped Arrows]] freeze the pack and lay chilled ground. Most trash dies to the icy fragments alone. Only slash with [[Whirling Slash]] when a rare is tanky; on very dense packs, three slashes followed by [[Barrage]] clears off-screen.

**Bossing.** Mark the boss with [[Freezing Mark]], drop [[War Banner]], build a full [[Whirling Slash]] whirlwind, then use [[Barrage]] and unload empowered Twisters. Keep moving between casts; your companion holds aggro.

## Defences

Like most Huntress builds, defences come from Evasion and Deflection on every armour slot, plus [[Wind Dancer]]. Keep resistances capped and avoid standing in ground effects.

## Gear Priorities

The spear matters most: +Level of all Projectile Skills, added cold and physical damage, attack speed and critical strike chance. An amulet with Spirit and projectile levels comes next, then life, evasion and Deflection on armour. Later upgrades from the source guide's aspirational setup include [[The Black Insignia]], [[The Taming]] and [[Sacred Flame]].
