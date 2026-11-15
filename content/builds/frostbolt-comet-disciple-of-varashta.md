---
title: Frostbolt Comet Disciple of Varashta
class: Sorceress
ascendancy: Disciple of Varashta
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Frostbolt Cast on Crit Comet Disciple Of Varashta Build Guide"
  author: "zen_m (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/frostbolt-cast-on-crit-comet-disciple-of-varashta-build-guide
  updated: 2026-09-03
summary: "Sorceress Disciple of Varashta whose Frostbolts fork through Snakepit and explode across the screen, with Comets triggered by freezes, then by critical hits."
tags: [caster, cold, crit, freeze, energy shield, chaos inoculation]
damage: Cold / Fire
playstyle: Caster
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - "Freezes everything"
  - "High single-target damage"
  - "Easy to play once on Frostbolt"
cons:
  - "Frostbolt needs Snakepit, so it comes late"
  - "Relies on Infusion Remnants during the campaign"
skills:
  - gem: "Frostbolt"
    supports: [Projectile Acceleration III, Multishot II, Pinpoint Critical, Ice Bite II]
    weaponSet: 1
  - gem: "Cast on Critical"
    supports: [Comet, Living Bomb, Efficiency II, Pinpoint Critical]
  - gem: "Frost Wall"
    supports: [Spell Cascade, Fortress I, Cooldown Recovery II, Pinpoint Critical]
    weaponSet: 1
  - gem: "Frost Bomb"
    supports: [Overabundance I, Spell Echo, Potent Exposure, Cooldown Recovery II]
    weaponSet: 2
  - gem: "Elemental Weakness"
    supports: [Efficiency II, Prolonged Duration II, Heightened Curse, Cursed Ground]
    weaponSet: 2
  - gem: "Convalescence"
    supports: [Second Wind III, Prolonged Duration II, Cooldown Recovery II]
  - gem: "Sigil of Power"
    supports: [Prolonged Duration II, Cooldown Recovery II, Magnified Area II]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Ice Nova, Frost Bomb, Frost Darts, Pounce, Snap]
    - label: "Act Ii"
      gems: [Elemental Weakness]
    - label: "Act Iii"
      gems: [Frost Wall]
    - label: "Maps"
      gems: [Comet, Living Bomb]
    - label: "Frostbolt Swap"
      gems: [Frostbolt]
  spirit:
    - label: "Act I"
      gems: [Arctic Armour]
    - label: "Act Iii"
      gems: [Siphon Elements]
    - label: "Maps"
      gems: [Cast on Elemental Ailment]
    - label: "Crit"
      gems: [Cast on Critical]
    - label: "Ci"
      gems: [Convalescence]
    - label: "160 Spirit"
      gems: [Mana Remnants]
  supports:
    - label: "Act I"
      gems: [Controlled Destruction, Ice Bite I, Overabundance I, Spell Cascade, Rapid Casting I]
    - label: "Act Ii"
      gems: [Spell Echo, Considered Casting, Heightened Curse, Efficiency I]
    - label: "Act Iii"
      gems: [Astral Projection, Icicle, Spell Cascade, Ice Bite II, Elemental Focus, Cold Penetration, Cooldown Recovery I, Magnified Area II, Harmonic Remnants II, Remnant Potency I, Prolonged Duration II]
    - label: "Maps"
      gems: [Efficiency II, Cooldown Recovery II, Rising Tempest, Potent Exposure, Cold Mastery]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Ice Bite I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Rapid Casting I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Cascade]
          - gem: "Snap"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Pounce"
          - gem: "Arctic Armour"
      - name: "Act 2"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Considered Casting, Ice Bite I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo]
          - gem: "Snap"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency I]
          - gem: "Pounce"
          - gem: "Arctic Armour"
      - name: "Act 3 to Maps"
        skills:
          - gem: "Ice Nova"
            supports: [Considered Casting, Astral Projection, Ice Bite II]
          - gem: "Frost Darts"
            supports: [Considered Casting, Elemental Focus, Cold Penetration]
          - gem: "Frost Wall"
            supports: [Icicle, Spell Cascade, Cooldown Recovery I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo, Cooldown Recovery I]
          - gem: "Snap"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency I, Prolonged Duration II]
          - gem: "Pounce"
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II, Remnant Potency I]
          - gem: "Arctic Armour"
      - name: "Early Maps"
        skills:
          - gem: "Ice Nova"
            supports: [Astral Projection, Magnified Area II, Ice Bite II, Rising Tempest]
          - gem: "Frost Darts"
            supports: [Elemental Focus, Considered Casting, Cold Penetration, Cold Mastery]
          - gem: "Frost Wall"
            supports: [Spell Cascade, Icicle, Fortress I, Cooldown Recovery II]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo, Cooldown Recovery II, Potent Exposure]
          - gem: "Snap"
            supports: [Magnified Area II, Cooldown Recovery II, Elemental Focus, Innervate]
          - gem: "Cast on Elemental Ailment"
            supports: [Comet, Living Bomb, Efficiency II, Concentrated Area]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency II, Focused Curse, Rapid Casting II]
          - gem: "Sigil of Power"
            supports: [Prolonged Duration II, Cooldown Recovery II, Magnified Area II]
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II, Remnant Potency III]
    rotations:
      - name: "Act 1"
        steps:
          - gem: "Frost Bomb"
            label: "Infusions Generator"
          - gem: "Ice Nova"
            label: "Infusions Spender"
      - name: "Act 2+"
        steps:
          - gem: "Ice Nova"
            label: "Freeze Enemies"
          - gem: "Snap"
            label: "Shater Frozen Enemies"
          - gem: "Ice Nova"
            label: "Spend Infusions"
      - name: "Single Target"
        steps:
          - gem: "Sigil of Power"
            label: "Debuffs"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Frost Wall"
          - gem: "Ice Nova"
          - gem: "Frost Darts"
            label: "Filler"
rotations:
  - name: "Skill Rotation"
    steps:
      - gem: "Ice Nova"
        label: "Freeze Enemies"
      - gem: "Snap"
        label: "Shater Frozen Enemies"
      - gem: "Ice Nova"
        label: "Spend Infusions"
  - name: "Single Target"
    steps:
      - gem: "Sigil of Power"
        label: "Debuffs"
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Frost Wall"
      - gem: "Ice Nova"
      - gem: "Frost Darts"
        label: "Filler"
gear:
  weapon:
    base: Gelid Staff
    mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
  offhand:
    base: Tasalian Focus
    mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, Increased Spell Damage, +Maximum Mana]
    runes: ["Greater Iron Rune: 18% increased Physical Damage"]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  body:
    base: Vile Robe
    mods: [Energy Shield, +Spirit, Elemental Resistances]
    runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
  gloves:
    unique: "Maligaro's Virtuosity"
    runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
  boots:
    base: Sekhema Sandals
    mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Greater Desert Rune: +18% to Fire Resistance"]
  amulet:
    base: Amber Amulet
    mods: [+Level of all Spell Skills, +Spirit, Energy Shield, Increased Cast Speed, Elemental Resistances]
  ring1:
    unique: "Snakepit"
  ring2:
    base: Prismatic Ring
    mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
  belt:
    base: Rawhide Belt
    mods: [Elemental Resistances, +Maximum Mana, Mana Flask Recovery, Mana Regeneration]
  weapon2:
    base: Chiming Staff
    mods: [+Level of all Spell Skills, Increased Cast Speed]
  offhand2:
    base: Tasalian Focus
    mods: [Energy Shield, +Maximum Mana, Increased Cast Speed, +Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage]
gearStages:
  campaign:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
      runes: ["2× Iron Rune: 25% increased Spell Damage"]
    offhand:
      base: Twig Focus
      mods: [+Level of all Spell Skills, Increased Spell Damage, Increased Cold Damage]
    helmet:
      base: Hooded Mask
      mods: [+Maximum Life, Elemental Resistances]
    body:
      base: Altar Robe
      mods: [+Maximum Life, Elemental Resistances]
    gloves:
      base: Suede Bracers
      mods: [+Maximum Life, Elemental Resistances]
    boots:
      base: Hunting Shoes
      mods: [Movement Speed, +Maximum Life, Elemental Resistances]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Spell Skills, +Maximum Life, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances]
    weapon2:
      base: Frenzied Talisman
      mods: [Increased Attack Speed]
  mapping:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold]
      runes: ["Iron Rune: 25% increased Spell Damage", "Storm Rune: Gain 8% of Damage as Extra Lightning Damage"]
    offhand:
      base: Whorl Focus
      mods: [+Level of all Spell Skills, Increased Spell Damage, Energy Shield]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    helmet:
      base: Sandsworn Tiara
      mods: [+Maximum Life, Energy Shield, Elemental Resistances]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency"]
    body:
      base: Vile Robe
      mods: [+Spirit, Energy Shield, +Maximum Life, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield", "Lesser Iron Rune: 14% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Pauascale Gloves
      mods: [Energy Shield, +Maximum Life, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Bound Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Spell Skills, +Spirit, Increased Cast Speed, Energy Shield, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances, +Maximum Mana, Mana Flask Recovery]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
  endgame:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
      runes: ["Iron Rune: 25% increased Spell Damage", "Storm Rune: Gain 8% of Damage as Extra Lightning Damage"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, Increased Spell Damage, +Maximum Mana]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    body:
      base: Vile Robe
      mods: [Energy Shield, +Spirit, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield", "Lesser Iron Rune: 14% increased Armour, Evasion and Energy Shield"]
    gloves:
      unique: "Maligaro's Virtuosity"
      runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
    boots:
      base: Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Spell Skills, +Spirit, Energy Shield, Increased Cast Speed, Elemental Resistances]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Prismatic Ring
      mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
    belt:
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Mana, Mana Flask Recovery, Mana Regeneration]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
  minmax:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, +Maximum Mana, Increased Cold Damage]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Mana Cost Efficiency, Elemental Resistances]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    body:
      base: Sacramental Robe
      mods: [Energy Shield, Elemental Resistances]
      runes: ["Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers", "Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      unique: "Maligaro's Virtuosity"
      runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
    boots:
      base: Sandsworn Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Jiquani's Thesis: Increases and Reductions to Movement Speed also,  apply to Energy Shield Recharge Rate"]
    amulet:
      base: Gold Amulet
      mods: [+Level of all Spell Skills, +Spirit, Increased Cast Speed, Energy Shield, Elemental Resistances]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Prismatic Ring
      mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
passives:
  attribute: int
  path:
    - "Pure Energy"
    - "Rapid Recharge"
    - "Mana Blessing"
    - "Dampening Shield"
    - "Melding"
    - "Efficient Casting"
    - "Critical Exploit"
    - "Roil"
    - "Enhanced Barrier"
    - "Patient Barrier"
    - "Heavy Frost"
    - "Thin Ice"
    - "Harsh Winter"
    - "Ether Flow"
    - "Chaos Inoculation"
    - "Abasement"
    - "Shimmering Mirage"
    - "Invocated Efficiency"
    - "Brain Freeze"
    - "Dependable Ward"
    - "Stormcharged"
    - "Breaking Point"
    - "Erraticism"
    - "Flurry"
    - "Shredding Force"
    - "Mental Alacrity"
    - "Warding Fetish"
    - "Touch the Arcane"
  ascendancy: [Instruments of Power, The Fourth Teaching, Sacred Rituals, Baryanic Leylines]
  weaponSet1: [Endless Blizzard, Glaciation, Careful Assassin, Controlling Magic, Turn the Clock Forward, Echoing Frost, Echoing Flames, Echoing Thunder]
  weaponSet2: [Stripped Defences, Lingering Whispers, Master of Hexes, Overexposure]
---
## How It Works

[[Frostbolt]] normally pierces and hits each enemy once. With **Snakepit in the left ring slot** it forks instead and explodes after forking, so overlapping explosions hit packs many times. [[Frost Wall]] creates Ice Crystals that Frostbolt shatters in a chain of explosions, which triggers [[Comet]] (with Living Bomb providing the fire remnants that double Comet's damage).

At level 58, Comet is triggered by [[Cast on Elemental Ailment]] whenever you freeze, but bosses can only be frozen every few seconds. Once Frostbolt reaches around 70% critical chance, switch to [[Cast on Critical]] for steadier single-target damage.

The Disciple's Instruments of Power lets you hold a focus with your staff (its modifiers are halved, but +1 to Spell Skills still counts as +1 and its energy shield is not reduced). The Fourth Teaching lowers the energy shield recharge delay from 5 to 4 seconds, Sacred Rituals reduces physical damage taken based on your energy shield, and Baryanic Leylines makes two Time-Lost Sapphires empower nearby notables. The early game is a life and energy shield hybrid; Chaos Inoculation comes later.

## Leveling

Use [[Spark]] to Clearfell, then [[Ice Nova]] and [[Frost Bomb]], with [[Frost Darts]] from level 3 for bosses and tough rares. Both rely on Cold Infusion Remnants: without them they deal three times less damage. Generate them with Frost Bomb and, later, by shattering frozen enemies with [[Snap]]. Use Frost Wall on bosses and rares and detonate it with Ice Nova (or Snap if the enemy is frozen). Put [[Elemental Weakness]] and Frost Bomb on weapon set 2 for its passives, and every other skill on set 1. Cold skills cost a lot of mana: use the best mana flask with increased amount recovered, or Mana Drain from an Attuned Wand in weapon set 2. A talisman in weapon set 2 gives [[Pounce]] for mobility.

## Playstyle

**Mapping (with Snakepit).** Cast Frostbolt; block and kill tougher enemies with Frost Wall, and use Frost Bomb for Exposure.

**Bossing.** Cast [[Sigil of Power]], Elemental Weakness and Frost Bomb at the start and stand in the Sigil. Place Frost Walls next to the boss and detonate them with Frostbolt to rain Comets.

## Endgame Progression

**Early maps.**
- Prioritise energy shield on top of some life, and increased energy shield recharge on helmet, body armour, gloves and boots. At least +30 Spirit on the body armour or amulet.
- The staff is your biggest damage upgrade: + Cold Spell or + Spell levels and spell critical chance. On the focus, +1 to Spell Skills first, then as much energy shield as possible. A Chiming Staff as main weapon, or in weapon set 2 instead of the talisman, enables Sigil of Power.
- Two jewels with "Recover 2% of Maximum Mana on Kill" fix mana while clearing; with 160 Spirit, Mana Remnants helps further. Keep Living Bomb at level 3 to lower its cost.
- At 5,000-6,000 energy shield, allocate Chaos Inoculation and stop caring about life and chaos resistance.

**Endgame.**
- Maligaro's Virtuosity is not required but highly recommended: it sets your critical damage bonus to 250%, so it cannot be raised but cannot be lowered either. Then support Frostbolt, Comet and Frost Wall with Pinpoint Critical, whose critical damage penalty the gloves cancel.
- Time-Lost Sapphires are the best later upgrades with Baryanic Leylines, for example for spell critical chance.
- Jiquani's Thesis raises energy shield recharge rate based on your movement speed. Add increased item rarity once damage and defences are solid.
- Mageblood (Quicksilver, Gold, Diamond, Bismuth, Silver) is the chase item.

## Gear Priorities

+ Cold and Spell levels and spell critical chance on the staff and focus, Snakepit in the left ring, then energy shield, energy shield recharge, cast speed on rings and amulet, and Spirit.

## FAQ

**Can I use Frostbolt before Snakepit?** No. Unless you can equip Snakepit at level 32, level with Ice Nova and Frost Darts.

**How do Cold Infusion Remnants work?** Skills like Frost Bomb drop them on the ground; pick them up to empower your next Ice Nova or Frost Darts. You hold up to 3 (Frozen Limit and Infused Limits raise it). Shattering enemies with Snap and freezing them while affected by Siphon Elements also create them.

**How does Cast on Critical charge?** Each critical hit generates energy by enemy rarity: 1 for normal, 2 for magic, 5 for rare and 20 for unique. A Comet costs 300 energy, so you need many frozen enemies.

**How do I fix mana on bosses?** It stays tight: invest in mana regeneration rate, maximum mana, increased flask mana recovery and reduced mana cost of skills on gear and the tree.
