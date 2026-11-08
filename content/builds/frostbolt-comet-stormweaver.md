---
title: Frostbolt Cast On Crit Comet Stormweaver Endgame
class: Sorceress
ascendancy: Stormweaver
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Frostbolt Cast On Crit Comet Stormweaver Endgame Build Guide"
  author: "zen_m (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/frostbolt-cast-on-crit-comet-stormweaver-endgame-build-guide
  updated: 2026-09-03
summary: "Forking Frostbolts detonate on impact and blow up Frost Wall crystals, generating endless Cast on Critical Comets."
tags: [caster, cold, crit, freeze, chaos inoculation]
damage: Cold
playstyle: Caster
difficulty: medium
budget: high
tiers:
  endgame: A
  bossing: A
pros:
  - Chain reactions of Frostbolts and ice crystals clear screens
  - Comets give strong single target
  - Has a cheaper Cast on Elemental Ailment version before Snakepit
cons:
  - The crit version needs the Snakepit ring
  - "Endgame only: level with another Stormweaver setup first"
  - Several debuffs to keep up on bosses
skills:
  - gem: "Frostbolt"
    supports: [Sione's Temper, Pinpoint Critical, Rising Tempest, Magnified Area II, Vilenta's Propulsion]
    note: "Main skill; forks and explodes with Snakepit"
  - gem: "Frost Wall"
    supports: [Spell Cascade, Cooldown Recovery II, Pinpoint Critical, Fortress II, Rapid Casting II]
    note: "Ice crystals that explode into chain reactions"
  - gem: "Snap"
    supports: [Pinpoint Critical, Rising Tempest, Concentrated Area, Considered Casting, Elemental Focus]
    note: "Detonates Frostbolts and ice crystals"
  - gem: "Frost Bomb"
    supports: [Potent Exposure, Magnified Area II, Cooldown Recovery II]
    note: "Exposure; use from weapon set 2"
  - gem: "Cast on Critical"
    supports: [Comet, Living Bomb, Efficiency II, Pinpoint Critical, Dialla's Desire]
    note: "Triggers Comet once you have Snakepit"
  - gem: "Cast on Elemental Ailment"
    supports: [Comet, Living Bomb, Spell Cascade, Efficiency II, Pinpoint Critical]
    note: "Comet trigger for the pre-Snakepit version"
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Second Wind III]
    note: "Energy shield recovery with Chaos Inoculation"
  - gem: "Siphon Elements"
    supports: [Harmonic Remnants II, Cold Mastery, Clarity I]
    note: "Generates Infusions"
  - gem: "Elemental Weakness"
    supports: [Heightened Curse, Prolonged Duration II, Cursed Ground]
    note: "Curse; use from weapon set 2"
  - gem: "Sigil of Power"
    supports: [Prolonged Duration II, Magnified Area II, Cooldown Recovery II]
    note: "From a Chiming Staff on weapon set 2"
levelingSource:
  title: "Ice Nova Snap Stormweaver Build Guide"
  url: https://maxroll.gg/poe2/build-guides/cold-snap-frostbolt-stormweaver-leveling-guide
leveling:
  - steps:
      - name: "Level 3 Swap"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Magnified Area I]
          - gem: "Frost Darts"
          - gem: "Frost Bomb"
          - gem: "Flame Wall"
      - name: "Act 1"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Magnified Area I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Rapid Casting I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Cascade]
          - gem: "Flame Wall"
          - gem: "Snap"
          - gem: "Arctic Armour"
      - name: "Act 2"
        skills:
          - gem: "Ice Nova"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting]
          - gem: "Snap"
            supports: [Rising Tempest, Magnified Area I]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Prolonged Duration II]
          - gem: "Arctic Armour"
      - name: "Act 3"
        skills:
          - gem: "Ice Nova"
            supports: [Astral Projection, Rising Tempest, Magnified Area II]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting, Cold Penetration]
          - gem: "Snap"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery I]
          - gem: "Frost Wall"
            supports: [Icicle, Spell Cascade, Cooldown Recovery I]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Prolonged Duration II]
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II]
          - gem: "Arctic Armour"
      - name: "Endgame"
        skills:
          - gem: "Ice Nova"
            supports: [Magnified Area II, Astral Projection, Rising Tempest, Controlled Destruction]
          - gem: "Frost Darts"
            supports: [Elemental Focus, Considered Casting, Cold Penetration, Controlled Destruction]
          - gem: "Snap"
            supports: [Rising Tempest, Magnified Area II, Elemental Focus, Controlled Destruction]
          - gem: "Frost Wall"
            supports: [Spell Cascade, Cooldown Recovery II, Fortress I]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I, Potent Exposure]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Focused Curse, Prolonged Duration II]
          - gem: "Cast on Elemental Ailment"
            supports: [Comet, Living Bomb, Boundless Energy II, Efficiency II]
          - gem: "Convalescence"
            supports: [Prolonged Duration II, Cooldown Recovery II, Second Wind III]
          - gem: "Sigil of Power"
            supports: [Prolonged Duration II, Magnified Area II, Cooldown Recovery II]
rotations:
  - name: "Mapping"
    steps:
      - gem: "Frostbolt"
      - gem: "Frost Wall"
      - gem: "Snap"
  - name: "Without Snakepit"
    steps:
      - gem: "Frost Wall"
      - gem: "Frostbolt"
      - gem: "Snap"
      - gem: "Ice Nova"
  - name: "Bossing"
    steps:
      - gem: "Sigil of Power"
      - gem: "Frost Bomb"
      - gem: "Elemental Weakness"
      - gem: "Frost Wall"
      - gem: "Frostbolt"
gear:
  weapon:
    base: Siphoning Wand
    mods: [Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning, +Level of all Cold Spell Skills, Increased Spell Damage]
  offhand:
    unique: "Palm of the Dreamer"
  helmet:
    base: Kamasan Tiara
    mods: [Energy Shield, Fire Resistance]
  body:
    base: Sacramental Robe
    mods: [Energy Shield, Cold Resistance]
  gloves:
    unique: "Maligaro's Virtuosity"
  boots:
    base: Sandsworn Sandals
    mods: [Energy Shield, Movement Speed]
  amulet:
    base: Solar Amulet
    mods: [Increased Cast Speed, +Level of all Spell Skills, Increased Spell Damage, +Spirit]
  ring1:
    unique: "Snakepit"
  ring2:
    base: Topaz Ring
    mods: [Adds Fire Damage to Attacks, Increased Cast Speed]
  belt:
    base: Rawhide Belt
    mods: [Cold Resistance, Fire Resistance, Lightning Resistance]
gearStages:
  mapping:
    weapon:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Spell Damage, Increased Cold Damage, Increased Cast Speed]
    offhand:
      base: Magus Focus
      mods: [+Level of all Spell Skills, Increased Spell Damage, Energy Shield]
    helmet:
      base: Magus Tiara
      mods: [+Maximum Life, Energy Shield]
    body:
      base: Havoc Raiment
      mods: [+Maximum Life, Energy Shield]
    gloves:
      base: Adorned Gloves
      mods: [+Maximum Life, Energy Shield]
    boots:
      base: Elaborate Sandals
      mods: [Movement Speed, +Maximum Life, Energy Shield]
    amulet:
      base: Stellar Amulet
      mods: [+Maximum Life, +Level of all Spell Skills, +Spirit]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Increased Cast Speed]
    ring2:
      base: Amethyst Ring
      mods: [+Maximum Life, Increased Cast Speed]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, +Maximum Mana]
  endgame:
    weapon:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Spell Critical Hit Chance, Gain Damage as Extra Cold, Increased Spell Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage, Energy Shield]
    helmet:
      base: Kamasan Tiara
      mods: [Energy Shield, Fire Resistance, Cold Resistance, Lightning Resistance]
    body:
      base: Sacramental Robe
      mods: [Energy Shield, Fire Resistance, Cold Resistance, Lightning Resistance]
    gloves:
      unique: "Maligaro's Virtuosity"
    boots:
      base: Sandsworn Sandals
      mods: [Movement Speed, Energy Shield, Cold Resistance, Fire Resistance, Lightning Resistance, +Maximum Mana]
    amulet:
      base: Solar Amulet
      mods: [+Spirit, +Level of all Spell Skills, Energy Shield, Fire Resistance]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Mana, Mana Regeneration, Increased Cast Speed, Lightning Resistance]
    belt:
      base: Long Belt
      mods: [Lightning Resistance, Fire Resistance, Cold Resistance, +Maximum Mana]
  minmax:
    weapon:
      base: Siphoning Wand
      mods: [Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning, +Level of all Cold Spell Skills, Increased Spell Damage]
    offhand:
      unique: "Palm of the Dreamer"
    helmet:
      base: Kamasan Tiara
      mods: [Energy Shield, Fire Resistance]
    body:
      base: Sacramental Robe
      mods: [Energy Shield, Cold Resistance]
    gloves:
      unique: "Maligaro's Virtuosity"
    boots:
      base: Sandsworn Sandals
      mods: [Energy Shield, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [Increased Cast Speed, +Level of all Spell Skills, Increased Spell Damage, +Spirit]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Topaz Ring
      mods: [Adds Fire Damage to Attacks, Increased Cast Speed]
    belt:
      base: Rawhide Belt
      mods: [Cold Resistance, Fire Resistance, Lightning Resistance]
passives:
  attribute: int
  path:
    - "Pure Energy"
    - "Dampening Shield"
    - "Chaos Inoculation"
    - "Invocated Efficiency"
    - "Abasement"
    - "Ether Flow"
    - "Enhanced Barrier"
    - "Shredding Force"
    - "Ingenuity"
    - "Patient Barrier"
    - "Conservative Casting"
    - "Crashing Wave"
    - "Melding"
    - "Efficient Casting"
    - "Mana Blessing"
    - "Rapid Recharge"
    - "Turn the Clock Forward"
    - "Convalescence"
    - "Shimmering Mirage"
    - "Echoing Frost"
    - "Echoing Thunder"
    - "Echoing Flames"
    - "Practiced Signs"
    - "Raw Power"
  ascendancy: [Constant Gale, Force of Will, Strike Twice, Refracted Infusion]
---
## How It Works

[[Frostbolt]] normally pierces and hits each enemy once. The Snakepit ring (left ring slot) makes it fork instead and explode when it hits, so overlapping explosions hit the same enemies many times. Shooting the ice crystals left by [[Frost Wall]] sets off even more explosions, and [[Snap]] detonates bolts and crystals on demand.

All those critical hits fill [[Cast on Critical]] very quickly, which triggers [[Comet]] for single target. Before you own Snakepit, the source guide plays a non-crit version that freezes enemies and triggers Comet with [[Cast on Elemental Ailment]] instead.

This guide starts at level 68; the campaign is done with another Stormweaver setup.

## Playstyle

**Mapping.** Cast [[Frost Wall]] on the monsters and shoot [[Frostbolt]] through the crystals; [[Snap]] when it is ready.

**Bossing.** From weapon set 2, apply [[Elemental Weakness]] and [[Frost Bomb]] and place [[Sigil of Power]], then go back to set 1 and keep Frostbolt hitting so Comets keep falling.

## Defences

Start as a life and energy shield hybrid. After the Snakepit swap, move to Chaos Inoculation for a larger energy shield pool and immunity to chaos damage, with [[Convalescence]] for recovery (it needs 30 more Spirit).

## Gear Priorities

Snakepit enables the crit version, Maligaro's Virtuosity adds a lot of critical damage, and Palm of the Dreamer is a strong but expensive off hand (Guiding Palm of the Eye is the cheaper alternative). Aim for at least 60% critical hit chance on Frostbolt.
