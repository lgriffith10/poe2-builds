---
title: Grim Pillars Spell Totem Oracle
class: Druid
ascendancy: Oracle
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Grim Pillars Spell Totem Oracle Build Guide
  author: Palsteron (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/grim-pillars-spell-totem-oracle-build-guide
  updated: 2026-09-07
summary: Druid totem caster that lets Spell Totems cast Grim Pillars for huge cold damage, then shatters the leftover Ice Crystals with Entangle.
tags: [totem, cold, lightning, caster, league starter]
damage: Cold / Lightning
playstyle: Totems
difficulty: medium
budget: low
tiers:
  starter: S
pros:
  - One of the best league starters, with very high damage on little gear
  - Totems fight for you, keeping you at a safe distance
cons:
  - The totem playstyle is not for everyone
  - Lots of effects on screen can be heavy on your computer
skills:
  - gem: Spell Totem
    supports: [Grim Pillars, Urgent Totems III, Efficiency II, Magnified Area II, Cold Mastery]
    note: Main damage; totems cast Grim Pillars
    weaponSet: 1
  - gem: Entangle
    supports: [Biting Frost I, Living Lightning II, Branching Fissures I, Rapid Casting II, Magnified Area II]
    note: Consumes the Ice Crystals' freeze. Keep a copy at gem level 1 for a tiny mana cost.
    weaponSet: 2
  - gem: Mana Tempest
    supports: [Advancing Storm, Efficiency II, Lightning Mastery]
    note: Damage buff
    weaponSet: 2
  - gem: Frost Bomb
    supports: [Spell Echo, Overabundance I, Potent Exposure, Efficiency II]
    note: Exposure for bosses
    weaponSet: 2
  - gem: Elemental Weakness
    supports: [Efficiency II, Cursed Ground, Heightened Curse, Ritualistic Curse]
    note: Curse
    weaponSet: 2
  - gem: Purity of Fire
    supports: [Mysticism II, Clarity II, Vitality II]
    note: Aura
    weaponSet: 2
leveling:
  - name: "Plants Leveling"
    steps:
      - name: "Act1"
        skills:
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Volcano"
            supports: [Controlled Destruction]
          - gem: "Essence Drain"
            supports: [Swift Affliction I, Zenith I]
          - gem: "Frost Bomb"
          - gem: "Bone Cage"
            supports: [Spell Cascade, Controlled Destruction]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion]
      - name: "Act2"
        skills:
          - gem: "Bone Cage"
            supports: [Spell Cascade, Controlled Destruction, Lightning Attunement]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I, Lightning Attunement]
          - gem: "Thunderstorm"
            supports: [Living Lightning, Magnified Area I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion, Clarity I]
      - name: "Act3"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Branching Fissures I, Controlled Destruction]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I, Lightning Attunement]
          - gem: "Thunderstorm"
            supports: [Living Lightning, Magnified Area I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion, Clarity I]
          - gem: "Thrashing Vines"
            supports: [Concentrated Area, Accelerated Growth, Rapid Casting I]
      - name: "Endgame"
        skills:
          - gem: "Spell Totem"
            supports: [Grim Pillars, Urgent Totems III, Efficiency II, Magnified Area II, Cold Mastery]
          - gem: "Entangle"
            supports: [Biting Frost I, Living Lightning II, Branching Fissures I, Rapid Casting II, Magnified Area II]
          - gem: "Mana Tempest"
            supports: [Advancing Storm, Efficiency II, Lightning Mastery]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Cursed Ground, Heightened Curse, Ritualistic Curse]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I, Potent Exposure, Efficiency II]
          - gem: "Purity of Fire"
            supports: [Vitality II, Mysticism II, Clarity II]
    rotations:
      - name: "Bossing (Lvl 1-13)"
        steps:
          - gem: "Frost Bomb"
          - gem: "Volcano"
      - name: "Pack Clear (Lvl 1-13)"
        steps:
          - gem: "Contagion"
          - gem: "Essence Drain"
      - name: "Bossing (lvl14+)"
        steps:
          - gem: "Bonestorm"
          - gem: "Thrashing Vines"
          - gem: "Bonestorm"
          - gem: "Thunderstorm"
          - gem: "Bonestorm"
      - name: "Pack Clear (Lvl 14+)"
        steps:
          - gem: "Bone Cage"
          - gem: "Entangle"
          - gem: "Thrashing Vines"
          - gem: "Thunderstorm"
rotations:
  - name: "Bossing (Lvl 1-13)"
    steps:
      - gem: "Frost Bomb"
      - gem: "Volcano"
  - name: "Pack Clear (Lvl 1-13)"
    steps:
      - gem: "Contagion"
      - gem: "Essence Drain"
  - name: "Bossing (lvl14+)"
    steps:
      - gem: "Bonestorm"
      - gem: "Thrashing Vines"
      - gem: "Bonestorm"
      - gem: "Thunderstorm"
      - gem: "Bonestorm"
  - name: "Pack Clear (Lvl 14+)"
    steps:
      - gem: "Bone Cage"
      - gem: "Entangle"
      - gem: "Thrashing Vines"
      - gem: "Thunderstorm"
gear:
  weapon:
    base: Attuned Wand
    mods: [+Level of all Spell Skills, Increased Spell Damage, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
  offhand:
    base: Shrine Sceptre
    mods: [Increased Spirit, +Maximum Mana]
  helmet:
    base: Cryptic Crown
    mods: [+Maximum Life, +Maximum Mana, Elemental Resistances, Chaos Resistance]
  body:
    base: Corvus Mantle
    mods: [+Maximum Life, +Spirit, Elemental Resistances, Chaos Resistance]
  gloves:
    base: Adherent Cuffs
    mods: [+Maximum Life, +Maximum Mana, Elemental Resistances, Chaos Resistance]
  boots:
    base: Cryptic Leggings
    mods: [Movement Speed, +Maximum Life, +Maximum Mana, Elemental Resistances]
  amulet:
    base: Solar Amulet
    mods: [+Level of all Spell Skills, +Spirit]
  ring1:
    base: Pearl Ring
    mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
  ring2:
    base: Pearl Ring
    mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
  belt:
    base: Utility Belt
    mods: [+Maximum Life, +Maximum Mana, +Strength, Elemental Resistances]
  weapon2:
    base: Attuned Wand
    mods: [Increased Spell Damage, +Level of all Cold Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
  offhand2:
    base: Shrine Sceptre
    mods: [+Spirit, +Maximum Mana]
gearStages:
  campaign:
    weapon:
      unique: "Lifesprig"
    offhand:
      mods: [+Spirit]
    helmet:
      base: Mailed Crown
      mods: [Fire Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
    body:
      base: Bearskin Mantle
      mods: [+Maximum Life, +Spirit]
    gloves:
      base: Signet Cuffs
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
    boots:
      base: Pelt Leggings
      mods: [Movement Speed]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Spell Skills]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Fine Belt
      mods: [Fire Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
  mapping:
    weapon:
      base: Attuned Wand
      mods: [Increased Spell Damage, +Level of all Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
    helmet:
      base: Cryptic Crown
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
    body:
      base: Corvus Mantle
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Spirit]
    gloves:
      base: Adherent Cuffs
      mods: [Fire Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
    boots:
      base: Cryptic Leggings
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Spell Skills, +Spirit]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Utility Belt
      mods: [+Strength, Fire Resistance, Cold Resistance, +Maximum Life, +Maximum Mana]
  endgame:
    weapon:
      base: Attuned Wand
      mods: [Increased Spell Damage, +Level of all Cold Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
    helmet:
      base: Cryptic Crown
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
    body:
      base: Corvus Mantle
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Spirit]
    gloves:
      base: Adherent Cuffs
      mods: [Fire Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
    boots:
      base: Cryptic Leggings
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Spell Skills, +Spirit]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Utility Belt
      mods: [+Strength, Fire Resistance, Cold Resistance, +Maximum Life, +Maximum Mana]
    weapon2:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
    offhand2:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
  minmax:
    weapon:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
    helmet:
      base: Ancestral Tiara
      mods: [Cold Resistance, Lightning Resistance, Energy Shield, +Maximum Life]
    body:
      base: Vile Robe
      mods: [Fire Resistance, Cold Resistance, Lightning Resistance, Energy Shield, +Spirit]
    gloves:
      base: Vaal Gloves
      mods: [Cold Resistance, Energy Shield, Adds Physical Damage to Attacks, Critical Damage Bonus]
    boots:
      base: Sekhema Sandals
      mods: [Cold Resistance, Lightning Resistance, Energy Shield, Movement Speed]
    amulet:
      base: Stellar Amulet
      mods: [Energy Shield, +Level of all Spell Skills, +Spirit]
    ring1:
      base: Gold Ring
      mods: [Fire Resistance, Cold Resistance, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Gold Ring
      mods: [Fire Resistance, Cold Resistance, +Maximum Mana, Increased Cast Speed]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
    offhand2:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
passives:
  attribute: str
  path:
    - Relentless Vindicator
    - Bolstering Presence
    - Vulgar Methods
    - Barbaric Strength
    - Sigil of Lightning
    - Sigil of Ice
    - Desensitisation
    - All Natural
    - Endless Blizzard
    - Glaciation
    - Controlling Magic
    - Ancestral Bond
    - Lasting Incantations
    - Wasting Casts
    - Limitless Pursuit
    - Calculated Hunter
    - Cower Before the First Ones
  ascendancy: [The Unseen Path, The Lesser Harm, Forced Outcome, Unnamed Heartwood]
  weaponSet1: [Ancestral Alacrity, Supportive Ancestors, Ancestral Reach, Ancestral Conduits, Stormcharged, Rustle of the Leaves, Mighty Trunk]
  weaponSet2: [Radial Force, Splitting Ground, Touch the Arcane, Erraticism, Casting Cascade, Overzealous]
---

## How It Works

[[Grim Pillars]] is socketed in [[Spell Totem]], so your totems do the casting. The pillars deal heavy cold damage and leave Ice Crystals behind. To cash those in, you need to consume their freeze: [[Entangle]] supported by [[Biting Frost I]] does that automatically, without needing to deal damage itself, and [[Living Lightning II]] cleans up leftover crystals.

The totem count grows with the build:

| Source | Totems |
| --- | --- |
| Base | 1 |
| [[Spell Totem]] at gem level 14 | 2 |
| Unnamed Heartwood (ascendancy) | 3 |
| Ancestral Bond (keystone) | 6 |

Beyond five totems, the source guide notes diminishing returns: placing them takes time and costs Spirit.

## Playstyle

**Mapping.** Drop totems as you move, then cast [[Entangle]] over the pillars to shatter the Ice Crystals. [[Mana Tempest]] boosts the damage while it lasts.

**Bossing.** Curse with [[Elemental Weakness]], apply exposure with [[Frost Bomb]], plant your full set of totems near the boss and keep re-casting [[Entangle]] on the crystals.

## Leveling

The source guide levels through the campaign with plant skills and elemental spells such as [[Volcano]] and [[Frost Bomb]], then respecs into totems once the setup comes online.

## Gear Priorities

+Level of all Spell Skills on the wand and amulet, Spirit on the sceptre, amulet and body armour (each totem needs it), then life, mana and resistances. The build works on very little gear, which is what makes it such a strong league starter.
