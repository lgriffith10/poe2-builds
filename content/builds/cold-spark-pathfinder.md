---
title: Cold Spark Pathfinder
class: Ranger
ascendancy: Pathfinder
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Cold Spark Pathfinder Build Guide"
  author: "goratha (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/cold-spark-pathfinder-build-guide
  updated: 2026-09-02
summary: "Spellcasting Ranger that floods the screen with Cold-Infused Sparks, triggers Comets on crit, and casts while running thanks to Pathfinder."
tags: [caster, cold, crit, projectile, chaos inoculation]
damage: Cold
playstyle: Caster
difficulty: medium
budget: high
tiers:
  starter: C
  endgame: A
  bossing: A
pros:
  - "Outstanding mobility: cast while moving and ignore slows"
  - Very fast clear with freezing Sparks
  - Comets from Cast on Critical handle single target
cons:
  - Keeping Cold Infusions up needs a few supporting spells
  - The finished version relies on expensive uniques
  - Switching to Chaos Inoculation means a gear rework
skills:
  - gem: "Spellslinger"
    supports: [Powered by Verisium]
    note: "Reserves Spirit to auto-cast spells"
  - gem: "Impurity"
    supports: [Cool Headed, Clarity II, Strong Hearted, Mysticism II]
    note: "Chaos resistance aura for allies"
  - gem: "Icestorm"
    supports: [Prolonged Duration II, Rapid Casting II, Commiserate, Potent Exposure]
    note: "Extra cold damage and exposure on bosses"
  - gem: "Heart of Ice"
    supports: [Cold Mastery, Slow Potency]
    note: "Cold damage buff"
  - gem: "Spark"
    supports: [Projectile Acceleration III, Dialla's Desire, Pinpoint Critical, Tul's Stillness, Fork]
    note: "Main skill; Cold Infusions add cold damage, duration and speed"
  - gem: "Convalescence"
    supports: [Prolonged Duration II, Cooldown Recovery II, Efficiency II, Second Wind II]
    note: "Energy shield recovery after the Chaos Inoculation switch"
  - gem: "Cast on Critical"
    supports: [Comet, Living Bomb, Efficiency II, Pinpoint Critical, Ixchel's Torment]
    note: "Triggers Comet and Living Bomb on critical hits"
  - gem: "Mana Remnants"
    supports: [Harmonic Remnants II, Remnant Potency I]
    note: "Mana sustain from enemies with ailments"
  - gem: "Siphon Elements"
    supports: [Cold Mastery, Harmonic Remnants II, Khatal's Rejuvenation]
    note: "Chance to grant Infusions when you freeze, shock or ignite"
  - gem: "Frost Bomb"
    supports: [Harmonic Remnants II, Cooldown Recovery II, Short Fuse II, Spell Cascade, Overabundance I]
    note: "Generates Cold Infusions and applies exposure"
  - gem: "Elemental Weakness"
    supports: [Rapid Casting II, Cursed Ground, Cold Mastery, Heightened Curse]
    note: "Curse for bosses"
gemPriority:
  skills:
    - label: "Act I"
      gems: [Spark, Frost Bomb, Orb of Storms]
  spirit:
    - label: "Early"
      gems: [Arctic Armour, Siphon Elements, Mana Remnants]
    - label: "Late"
      gems: [Cast on Critical, Convalescence]
  supports:
    - label: "Act I"
      gems: [Short Fuse I, Overabundance I, Unleash]
leveling:
  - steps:
      - name: "CAMPAIGN"
        skills:
          - gem: "Galvanic Field"
          - gem: "Discipline"
          - gem: "Mana Remnants"
            supports: [Remnant Potency I, Cannibalism II]
          - gem: "Frost Bomb"
            supports: [Short Fuse II, Spell Cascade, Overabundance I, Harmonic Remnants II]
          - gem: "Arctic Armour"
            supports: [Mysticism II, Freeze, Clarity I]
          - gem: "Siphon Elements"
          - gem: "Spark"
            supports: [Projectile Acceleration I, Rapid Casting I, Fork, Prolonged Duration II, Efficiency II]
          - gem: "Orb of Storms"
            supports: [Overabundance II, Unleash, Prolonged Duration II, Living Lightning II]
          - gem: "Flame Wall"
          - gem: "Elemental Weakness"
      - name: "Early Maps"
        skills:
          - gem: "Purity of Ice"
            supports: [Mysticism II, Strong Hearted, Clarity II, Cool Headed]
          - gem: "Icestorm"
            supports: [Prolonged Duration II, Rapid Casting II, Commiserate, Potent Exposure]
          - gem: "Heart of Ice"
            supports: [Cold Mastery, Slow Potency]
          - gem: "Spark"
            supports: [Projectile Acceleration III, Prolonged Duration II, Fork, Freeze, Pinpoint Critical]
          - gem: "Convalescence"
            supports: [Prolonged Duration II, Cooldown Recovery II, Clarity I, Second Wind II]
          - gem: "Cast on Critical"
            supports: [Comet, Living Bomb, Efficiency II, Pinpoint Critical, Boundless Energy II]
          - gem: "Elemental Weakness"
            supports: [Rapid Casting II, Cold Mastery, Cursed Ground]
          - gem: "Mana Remnants"
            supports: [Remnant Potency I, Harmonic Remnants II, Khatal's Rejuvenation]
          - gem: "Frost Bomb"
            supports: [Harmonic Remnants II, Cooldown Recovery II, Short Fuse II, Spell Cascade, Overabundance I]
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II, Cold Mastery]
          - gem: "Powered by Verisium"
    rotations:
      - name: "Campaign Clear"
        steps:
          - gem: "Frost Bomb"
          - gem: "Spark"
      - name: "Campaign Single Target"
        steps:
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Orb of Storms"
            count: 2
          - gem: "Flame Wall"
          - gem: "Spark"
rotations:
  - name: "Campaign Clear"
    steps:
      - gem: "Frost Bomb"
      - gem: "Spark"
  - name: "Campaign Single Target"
    steps:
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Orb of Storms"
        count: 2
      - gem: "Flame Wall"
      - gem: "Spark"
  - name: "Maps Clear"
    steps:
      - gem: "Frost Bomb"
      - gem: "Spark"
  - name: "Maps Single Target"
    steps:
      - gem: "Frost Bomb"
      - gem: "Icestorm"
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Spark"
gear:
  weapon:
    base: Dueling Wand
    mods: [Increased Cast Speed, Increased Spell Damage, Gain Damage as Extra Lightning, +Level of all Spell Skills, Increased Elemental Damage, Spell Critical Hit Chance]
  offhand:
    unique: "Palm of the Dreamer"
  helmet:
    base: Ancestral Tiara
    mods: [Evasion and Energy Shield, Critical Hit Chance]
  body:
    unique: "Atziri's Splendour"
  gloves:
    unique: "Maligaro's Virtuosity"
  boots:
    base: Sekhema Sandals
    mods: [+Intelligence, Energy Shield, Movement Speed, Fire Resistance, Cold Resistance]
  amulet:
    base: Gold Amulet
    mods: [Increased Cast Speed, +Level of all Spell Skills, Grants a Passive Skill]
  ring1:
    unique: "Kalandra's Touch"
  ring2:
    base: Prismatic Ring
    mods: [Cold Resistance, Increased Cast Speed, +Maximum Mana]
  belt:
    unique: "Headhunter"
gearStages:
  campaign:
    weapon:
      base: Galvanic Wand
      mods: [Spell Critical Hit Chance, Increased Spell Damage, Gain Damage as Extra Cold, Gain Damage as Extra Lightning, +Level of all Lightning Spell Skills]
    offhand:
      unique: "Threaded Light"
    helmet:
      unique: "Crown of the Victor"
    body:
      unique: "Enfolding Dawn"
    gloves:
      unique: "Painter's Servant"
    boots:
      unique: "Wondertrap"
    amulet:
      unique: "Astramentis"
    belt:
      base: Rawhide Belt
      mods: [Cold Resistance, Fire Resistance, +Maximum Life]
    weapon2:
      base: Stoic Sceptre
      mods: [+Spirit, +Maximum Mana, Allies in Presence Attack Speed]
  endgame:
    weapon:
      base: Dueling Wand
      mods: [Increased Cast Speed, Spell Critical Hit Chance, Increased Spell Damage, +Level of all Spell Skills, Increased Elemental Damage, Gain Damage as Extra Cold]
    offhand:
      unique: "Guiding Palm of the Eye"
    helmet:
      base: Kamasan Tiara
      mods: [Energy Shield, Cold Resistance, Lightning Resistance]
    body:
      base: Sleek Jacket
      mods: [Evasion and Energy Shield, Evasion Rating, Energy Shield, +Maximum Life, Fire Resistance, Lightning Resistance]
    gloves:
      unique: "Maligaro's Virtuosity"
    boots:
      base: Sekhema Sandals
      mods: [+Intelligence, Energy Shield, Movement Speed, Cold Resistance]
    amulet:
      base: Gold Amulet
      mods: [Increased Cast Speed, +Level of all Spell Skills, Grants a Passive Skill]
    ring1:
      base: Breach Ring
      mods: [Fire Resistance, Increased Cast Speed, Evasion Rating, Lightning Resistance]
    ring2:
      unique: "Call of the Brotherhood"
    belt:
      base: Heavy Belt
      mods: [+Strength, Fire Resistance, Lightning Resistance]
    weapon2:
      unique: The Whispering Ice
  minmax:
    weapon:
      base: Dueling Wand
      mods: [Increased Cast Speed, Increased Spell Damage, Gain Damage as Extra Lightning, +Level of all Spell Skills, Increased Elemental Damage, Spell Critical Hit Chance]
    offhand:
      unique: "Palm of the Dreamer"
    helmet:
      base: Ancestral Tiara
      mods: [Evasion and Energy Shield, Critical Hit Chance]
    body:
      unique: "Atziri's Splendour"
    gloves:
      unique: "Maligaro's Virtuosity"
    boots:
      base: Sekhema Sandals
      mods: [+Intelligence, Energy Shield, Movement Speed, Fire Resistance, Cold Resistance]
    amulet:
      base: Gold Amulet
      mods: [Increased Cast Speed, +Level of all Spell Skills, Grants a Passive Skill]
    ring1:
      unique: "Kalandra's Touch"
    ring2:
      base: Prismatic Ring
      mods: [Cold Resistance, Increased Cast Speed, +Maximum Mana]
    belt:
      unique: "Headhunter"
    weapon2:
      unique: The Whispering Ice
passives:
  attribute: int
  path:
    - "Blur"
    - "Pure Energy"
    - "Dampening Shield"
    - "Practiced Signs"
    - "Echoing Frost"
    - "Echoing Thunder"
    - "Echoing Flames"
    - "Chaos Inoculation"
    - "Abasement"
    - "Whispers of Doom"
    - "Ingenuity"
    - "Patient Barrier"
    - "Turn the Clock Forward"
    - "Thin Ice"
    - "Heavy Frost"
    - "Spectral Ward"
    - "Shimmering"
    - "Crashing Wave"
    - "Flow Like Water"
    - "Mindful Awareness"
    - "Step Like Mist"
    - "Melding"
    - "Insightfulness"
    - "Arcane Remnants"
    - "Arcane Blossom"
    - "Sudden Escalation"
    - "Critical Overload"
    - "Raw Power"
    - "Spell Haste"
    - "Spaghettification"
  ascendancy: [Relentless Pursuit, Running Assault, Path Seeker, Traveller's Wisdom]
  weaponSet1: [Preservation, Controlling Magic, Careful Assassin, Effervescent, Evocational Practitioner, Critical Exploit]
  weaponSet2: [Forthcoming, Roil, Stripped Defences, Secrets of the Orb, Overexposure]
---
## How It Works

This Ranger drops the bow for a wand. [[Spark]] is the main skill, and it only becomes strong with Cold Infusions: each one gives Spark more cold damage, more duration and faster projectiles, so the sparks freeze and shatter whole packs.

Infusions come from two places: [[Frost Bomb]] (several per cast with Spell Cascade) and [[Siphon Elements]], which can grant the Infusion matching the ailment you just applied. [[Cast on Critical]] then turns your many Spark hits into [[Comet]]s for single target.

Pathfinder's Relentless Pursuit, Running Assault, Path Seeker and Traveller's Wisdom are what set the build apart: you cast at full speed while moving, ignore slows and are not stunned while sprinting.

## Playstyle

**Mapping.** Keep [[Frost Bomb]] cycling for Infusions and spam [[Spark]] while running through the map.

**Bossing.** Curse with [[Elemental Weakness]], drop [[Frost Bomb]] and [[Icestorm]] for exposure, then keep casting [[Spark]] so Cast on Critical keeps firing [[Comet]].

## Defences

You start as a life and evasion hybrid. Later, the source guide switches to Chaos Inoculation for a bigger energy shield pool and chaos immunity, with [[Convalescence]] for recovery.

## Gear Priorities

The build works without uniques at first. Call of the Brotherhood helps generate Cold Infusions early, and Maligaro's Virtuosity fixes the critical damage loss from Pinpoint Critical. Wands want cast speed, spell levels and spell crit.

## FAQ

**What do I need for Cast on Critical to work?** Enough Spirit first: the build gets it from a sceptre, either a rare one or a unique such as [[Guiding Palm]]. Then enough critical hit chance, which is why [[Spark]] uses [[Pinpoint Critical]] together with [[Maligaro's Virtuosity]]. Keep [[Cast on Critical]] last in your gem list, otherwise weapon swapping will not work later.

**Why can't I cast spells with Atziri's Splendour?** If your [[Atziri's Splendour]] has the modifier converting mana costs to life costs, it cannot be used with Chaos Inoculation. Use one where that modifier has been removed with a Cultivation Orb.

**How do I deal with mana costs?** Take Cost Efficiency from Traveller's Wisdom as needed, and run [[Mana Remnants]]: it returns a lot of mana when you kill enemies with elemental ailments or crit them in single target. In the endgame, a Dueling Wand with Spellslinger helps a lot, and you can make it auto-cast a curse by binding Spellslinger to a numlock key and turning numlock on.

**What should I take with Traveller's Wisdom?** Global Defence if you feel squishy, Cost Efficiency if mana costs are a problem, increased damage if you want more damage. In general, Cost Efficiency and Global Defence are the best value.

**Why is my damage low in the campaign?** For a spellcaster it is almost always missing +skill levels, so keep checking vendors as you progress.

**I don't have enough Spirit for all my buffs.** Drop [[Arctic Armour]] once you start using [[Cast on Critical]]. A rare sceptre lets you run everything, but the unique sceptres are better for this build.
