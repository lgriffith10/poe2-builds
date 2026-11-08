---
title: Twister Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Gemling Legionnaire Twister Build Guide
  author: Goratha (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/gemling-legionnaire-twister-build-guide
  updated: 2026-09-19
summary: Spear Mercenary that stacks Whirling Slash stages and Barrage to fill the screen with elemental Twisters, using Gemling's gem bonuses for speed.
tags: [spear, twister, elemental, projectile, mapping]
damage: Elemental
playstyle: Ranged attack
difficulty: hard
budget: medium
tiers:
  starter: S
pros:
  - Screen-wide clear once Whirling Slash and Barrage are combined
  - Whirling Slash doubles as fast movement
  - Scales extremely well with The Taming
cons:
  - Needs two weapon sets and careful gem setup
  - Gem Studded asks you to balance support gem colours
skills:
  - gem: Twister
    supports: [Elemental Armament II, Projectile Acceleration III, Ice Bite II, Retreat II, Salvo]
    note: Main damage, weapon set 2
  - gem: Whirling Slash
    supports: [Rapid Attacks III, Rage III, Punch Through, Blind II, Maim]
    note: Builds up to three stages for multiple Twisters; also your movement. Keep it at gem level 1 and on weapon set 1.
  - gem: Barrage
    supports: [Rapid Casting II, Cooldown Recovery II, Prolonged Duration II, Perpetual Charge]
    note: Multiplies the next Twister cast
  - gem: Herald of Ice
    supports: [Magnified Area II, Armour Break III, Armour Explosion]
    note: Clear
  - gem: Sniper's Mark
    supports: [Efficiency II, Eternal Mark, Charge Profusion II, Prolonged Duration II, Mark of Siphoning II]
    note: Mark for rares and bosses
  - gem: Righteous Descent
    supports: [Concentrated Area, Fist of War III, Elemental Armament II]
  - gem: Purity of Ice
    supports: [Vitality II, Precision II, Cool Headed]
    note: Aura
  - gem: Wind Dancer
    supports: [Blind II, Freeze, Magnified Area II, Ambush]
    note: Defensive buff
  - gem: Combat Frenzy
    supports: [Charge Profusion II]
    note: Frenzy charges for Barrage
  - gem: Berserk
    supports: [Vitality I]
    note: Rage buff, strong with gem quality
  - gem: Virtuous Barrier
    supports: []
  - gem: Charge Regulation
    supports: []
gemPriority:
  skills:
    - label: "Act I"
      gems: [Whirling Slash, Twister, Frost Bomb, Barrage, Ice-Tipped Arrows]
    - label: "Act Ii"
      gems: [Freezing Mark]
  spirit:
    - label: "Act I"
      gems: [War Banner, Herald of Ice, Wind Dancer]
  supports:
    - label: "Act I"
      gems: [Rage I, Rapid Attacks I, Retreat I, Projectile Acceleration I]
    - label: "Act Ii"
      gems: [Salvo]
leveling:
  - name: "Leveling"
    steps:
      - name: "Twister Leveling"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Frost Nexus, Projectile Acceleration I, Salvo]
          - gem: "Frost Bomb"
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Ice-Tipped Arrows"
            supports: [Rapid Casting I]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Mark of Siphoning, Charged Mark]
          - gem: "Purity of Lightning"
      - name: "Early Maps"
        skills:
          - gem: "Virtuous Barrier"
          - gem: "Righteous Descent"
            supports: [Concentrated Area, Fist of War III, Elemental Armament II]
          - gem: "Purity of Ice"
            supports: [Vitality II, Precision II, Cool Headed]
          - gem: "Wind Dancer"
            supports: [Blind II, Freeze, Magnified Area II, Ambush]
          - gem: "Whirling Slash"
            supports: [Rapid Attacks III, Rage III, Punch Through, Blind II, Maim]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion II]
          - gem: "Barrage"
            supports: [Rapid Casting II, Cooldown Recovery II, Prolonged Duration II, Perpetual Charge, Olroth's Conviction]
          - gem: "Twister"
            supports: [Elemental Armament II, Projectile Acceleration III, Ice Bite II, Retreat II, Salvo]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Armour Break III, Armour Explosion, Uruk's Smelting]
          - gem: "Sniper's Mark"
            supports: [Efficiency II, Eternal Mark, Charge Profusion II, Prolonged Duration II, Mark of Siphoning II]
          - gem: "Berserk"
            supports: [Vitality I]
          - gem: "Charge Regulation"
    rotations:
      - name: "Clear"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Twister"
      - name: "Single Target"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Barrage"
          - gem: "Twister"
rotations:
  - name: "Clear"
    steps:
      - gem: "Whirling Slash"
        count: 3
      - gem: "Barrage"
      - gem: "Twister"
  - name: "Single Target"
    steps:
      - gem: "Whirling Slash"
        count: 3
      - gem: "Barrage"
      - gem: "Sniper's Mark"
      - gem: "Twister"
gear:
  weapon:
    unique: Skysliver
    note: Weapon set 1 for Whirling Slash. A rare Akoyan Spear with physical damage and critical strike chance goes in set 2.
  offhand:
    unique: Guiding Palm of the Eye
  helmet:
    base: Freebooter Cap
    mods: [Evasion Rating, +Maximum Life, Deflection, Lightning Resistance]
  body:
    base: Slipstrike Vest
    mods: [Evasion Rating, +Maximum Life]
  gloves:
    base: Runeforged Polished Bracers
    mods: [Evasion Rating, Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Lightning Resistance]
  boots:
    base: Treerunner Shoes
    mods: [+Maximum Life, Evasion Rating, Fire Resistance]
    note: Movement speed is optional, Whirling Slash is your movement.
  amulet:
    unique: Yoke of Suffering
  ring1:
    unique: The Taming
    note: The biggest upgrade; Berek's rings work as a cheaper stand-in.
  ring2:
    base: Gold Ring
    mods: [+Maximum Life, Adds Physical Damage to Attacks, +Strength, +Intelligence, Elemental Resistances]
  belt:
    unique: Darkness Enthroned
  weapon2:
    base: Akoyan Spear
    mods: [Increased Physical Damage, Adds Physical Damage, Critical Hit Chance]
  offhand2:
    unique: Guiding Palm of the Eye
passives:
  attribute: dex
  path:
    - Remorseless
    - Avoiding Deflection
    - Enduring Deflection
    - Stupefy
    - Dizzying Hits
    - The Fabled Stag
    - Heartstopping
    - Heartbreaking
    - Struck Through
    - Fervour
    - Enhanced Reflexes
    - Trained Deflection
    - Catalysis
    - Dance with Death
    - Acceleration
    - The Wild Cat
    - Focused Thrust
    - Catapult
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded, Integrated Efficiency]
  weaponSet1: [Stimulants, Roll and Strike, Precise Point, Versatile Arms, Bond of the Wolf]
  weaponSet2: [Prolonged Assault, Coming Calamity, Material Solidification, Maiming Strike, Javelin, Crystal Elixir, The Frenzied Bear]
---

## How It Works

[[Twister]] and [[Whirling Slash]] are combo skills. Each Whirling Slash adds a stage, up to three, and a Twister thrown right after splits into several Twisters. [[Barrage]] then multiplies that cast again, so a full sequence fills the screen.

Twister also takes on the element of the ground it passes over. With [[The Taming]], wind skills count as empowered by chilled, shocked and ignited ground at the same time, which is why it is the single most important upgrade. Before that, shattering with cold creates chilled ground for the same effect.

The Gemling Legionnaire ascendancy makes the combo faster: Advanced Thaumaturgy gives Whirling Slash attack speed, Twister projectile speed and Barrage a chance not to consume frenzy charges. Gem Studded rewards a balanced mix of red, green and blue support gems; fill spare sockets in throw-away skills to hit the thresholds. Integrated Efficiency adds even more skill speed to Whirling Slash.

## Setup

- Put [[Whirling Slash]] on **weapon set 1** and every other skill on **weapon set 2**. This matters: Skysliver powers the slashes while the second spear carries the Twisters.
- Keep [[Whirling Slash]] at **gem level 1** for its low mana cost. Once you have attack speed, you will use it to move.

## Playstyle

**Mapping.** Slash three times through a pack, fire [[Barrage]], then throw [[Twister]]. [[Herald of Ice]] chains the clear.

**Bossing.** Apply [[Sniper's Mark]], build three [[Whirling Slash]] stages, then repeat [[Barrage]] + [[Twister]] while keeping [[Berserk]] and [[Combat Frenzy]] up.

## Gear Priorities

[[The Taming]] first, then [[Skysliver]] and a strong second spear. Evasion and Deflection on helmet, gloves and boots, and life everywhere. [[Yoke of Suffering]] and [[Guiding Palm of the Eye]] are strong damage pieces; [[Darkness Enthroned]] boosts socketed items.
