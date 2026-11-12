---
title: Bleed Rake Amazon
class: Huntress
ascendancy: Amazon
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Bleed Rake Amazon Build Guide"
  author: "goratha (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/bleed-rake-amazon-build-guide
  updated: 2026-09-02
summary: "Mobile spear Amazon that dashes in with Rake to stack bleeds, then finishes bosses with a huge Blood Hunt hit."
tags: [melee, spear, bleed, physical, mobile]
damage: Physical
playstyle: Melee
difficulty: medium
budget: medium
tiers:
  starter: D
  endgame: B
  bossing: A
pros:
  - Very mobile, dash-heavy playstyle
  - Blood Hunt deletes bosses after enough bleed
  - Herald of Blood and plague make packs explode
cons:
  - Low defences compared to other builds
  - Clear relies on Spearfield and takes practice
  - Weaker start than most builds on the list
skills:
  - gem: "Herald of Blood"
    supports: [Poison III, Bursting Plague, Deadly Poison II, Overreach, Blind II]
    note: "Blood explosions; with Bursting Plague, poisoned enemies explode too"
  - gem: "Rake"
    supports: [Momentum, Heft, Deep Cuts II, Close Combat II, Brutality III]
    note: "Dash that deals more bleed the farther you travel"
  - gem: "Blood Hunt"
    supports: [Rapid Attacks III, Magnified Area I, Life Leech III, Armour Break III]
    note: "Finisher scaled by the bleed damage the target has taken"
  - gem: "Bloodhound's Mark"
    supports: [Mark for Death, Rupture, Stun I, Close Combat II]
    note: "Bleeding builds up heavy stun on the marked target"
  - gem: "Spearfield"
    supports: [Incision, Brutality III, Rage III, Heft, Rearm II]
    note: "Main clear skill; also the best damage on big bosses"
  - gem: "Disengage"
    supports: [Rapid Attacks II, Cooldown Recovery I, Holy Descent, Shocking Leap, Culling Strike I]
    note: "Retreat dash that hits in a cone"
  - gem: "Wind Dancer"
    supports: [Cannibalism I, Maim, Blind I, Culling Strike I, Magnified Area I]
    note: "Evasion buff"
  - gem: "War Banner"
    supports: [Prolonged Duration I, Magnified Area II]
    note: "Damage banner"
gemPriority:
  skills:
    - label: "Gem Cut Order"
      gems: [Explosive Spear, Disengage, Rake, Spearfield, Blood Hunt, Bloodhound's Mark]
  spirit:
    - label: "First Spirit Gem"
      gems: [Herald of Blood]
    - label: "Second Spirit Gem"
      gems: [Wind Dancer]
  supports:
    - label: "Early Support Order"
      gems: [Elemental Armament I, Magnified Area I, Rapid Attacks I]
leveling:
  - steps:
      - name: "Campaign"
        skills:
          - gem: "Explosive Spear"
            supports: [Elemental Armament I, Magnified Area I]
          - gem: "Spear Stab"
            supports: [Rapid Attacks I, Pursuit I]
          - gem: "Herald of Blood"
            supports: [Poison I, Bursting Plague]
          - gem: "Rake"
            supports: [Rapid Attacks I, Brutality I, Momentum]
          - gem: "Blood Hunt"
            supports: [Rapid Attacks I, Magnified Area I]
          - gem: "Bloodhound's Mark"
            supports: [Mark for Death, Rupture]
          - gem: "Spearfield"
            supports: [Rapid Attacks I, Rage I, Incision]
          - gem: "Disengage"
            supports: [Rapid Attacks I, Brutality I]
          - gem: "Wind Dancer"
            supports: [Cannibalism I, Maim, Blind I]
          - gem: "War Banner"
            supports: [Prolonged Duration II, Magnified Area II]
      - name: "Early Maps"
        skills:
          - gem: "Herald of Blood"
            supports: [Poison III, Bursting Plague, Bleed III, Magnified Area II]
          - gem: "Rake"
            supports: [Momentum, Brutality III, Deep Cuts II, Heft]
          - gem: "Blood Hunt"
            supports: [Rapid Attacks II, Magnified Area I]
          - gem: "Bloodhound's Mark"
            supports: [Mark for Death, Rupture, Stun I, Close Combat II]
          - gem: "Spearfield"
            supports: [Incision, Rage III, Knockback, Brutality III, Heft]
          - gem: "Disengage"
            supports: [Rapid Attacks I, Cooldown Recovery I, Holy Descent]
          - gem: "Wind Dancer"
            supports: [Cannibalism I, Maim, Blind I, Culling Strike I]
          - gem: "War Banner"
            supports: [Magnified Area II, Prolonged Duration II]
rotations:
  - name: "Clear"
    steps:
      - gem: "Rake"
      - gem: "Disengage"
      - gem: "Spearfield"
  - name: "Single Target"
    steps:
      - gem: "Spearfield"
      - gem: "Bloodhound's Mark"
      - gem: "Rake"
      - gem: "Disengage"
      - gem: "Rake"
      - gem: "Blood Hunt"
gear:
  weapon:
    base: Spiked Spear
    mods: [+Level of all Melee Skills, Accuracy Rating, Increased Physical Damage, Adds Physical Damage, Critical Damage Bonus, Critical Hit Chance]
  offhand:
    base: Desert Buckler
    mods: [Armour, Block Chance, Accuracy Rating]
  helmet:
    base: Freebooter Cap
    mods: [Energy Shield, Critical Hit Chance, +Maximum Life, Elemental Resistances]
  body:
    base: Slipstrike Vest
    mods: [Evasion Rating, Energy Shield, Evasion and Energy Shield, +Maximum Life, Elemental Resistances]
  gloves:
    base: Polished Bracers
    mods: [Adds Physical Damage to Attacks, +Maximum Life, Accuracy Rating, +Level of all Melee Skills, Critical Damage Bonus, Increased Attack Speed]
  boots:
    base: Drakeskin Boots
    mods: [+Maximum Life, Movement Speed, Elemental Resistances]
  amulet:
    base: Pearlescent Amulet
    mods: [+All Attributes, Grants a Passive Skill]
  ring1:
    base: Topaz Ring
    mods: [+Dexterity, +Maximum Life, Life Leech, +Strength]
  ring2:
    base: Prismatic Ring
    mods: [Elemental Resistances, Accuracy Rating, +Maximum Life, Mana Leech]
  belt:
    unique: "Ryslatha's Coil"
gearStages:
  campaign:
    weapon:
      base: Jagged Spear
      mods: [Adds Physical Damage, Increased Physical Damage, Accuracy Rating, Increased Attack Speed, +Level of all Melee Skills]
    offhand:
      base: Painted Buckler
      mods: [+Dexterity, +Maximum Life, Elemental Resistances]
    helmet:
      unique: "Horns of Bynden"
    body:
      base: Corsair Vest
      mods: [+Dexterity, +Maximum Life, +Spirit, Elemental Resistances]
    gloves:
      base: Fine Bracers
      mods: [+Maximum Life, Elemental Resistances, +Level of all Melee Skills, Critical Damage Bonus, Increased Attack Speed, Adds Physical Damage to Attacks]
    boots:
      base: Lizardscale Boots
      mods: [+Dexterity, Evasion Rating, Movement Speed]
    amulet:
      base: Amber Amulet
      mods: [+All Attributes, +Maximum Life, +Strength, +Dexterity, Critical Hit Chance, Critical Damage Bonus]
    ring1:
      base: Prismatic Ring
      mods: [+All Attributes, Accuracy Rating, +Maximum Life, +Strength]
    ring2:
      base: Amethyst Ring
      mods: [Fire Resistance, +Maximum Life, +Strength]
    belt:
      base: Rawhide Belt
      mods: [+Strength, Cold Resistance]
  mapping:
    weapon:
      base: Spiked Spear
      mods: [Accuracy Rating, Increased Physical Damage, Adds Physical Damage, Critical Damage Bonus, +Level of all Melee Skills, Increased Attack Speed]
    offhand:
      base: Ornate Buckler
      mods: [Armour, Block Chance, Accuracy Rating]
    helmet:
      base: Trapper Hood
      mods: [+Dexterity, +Strength, Accuracy Rating, +Maximum Life]
    body:
      base: Wyrmscale Coat
      mods: [+Dexterity, Evasion Rating, Elemental Resistances]
    gloves:
      base: Barbed Bracers
      mods: [+Strength, Adds Physical Damage to Attacks, Critical Damage Bonus, +Maximum Life, Elemental Resistances, +Level of all Melee Skills]
    boots:
      base: Dragonscale Boots
      mods: [+Maximum Life, Movement Speed, Elemental Resistances]
    amulet:
      base: Solar Amulet
      mods: [Evasion Rating, +Maximum Life, Elemental Resistances, +Strength, +Dexterity, Critical Damage Bonus]
    ring1:
      base: Topaz Ring
      mods: [+Dexterity, +Maximum Life, Life Leech, +Strength]
    ring2:
      base: Topaz Ring
      mods: [Elemental Resistances, +Maximum Life, Mana Leech, +Strength]
    belt:
      base: Mail Belt
      mods: [+Maximum Life, +Strength, Elemental Resistances]
  endgame:
    weapon:
      base: Spiked Spear
      mods: [+Level of all Melee Skills, Accuracy Rating, Increased Physical Damage, Adds Physical Damage, Critical Damage Bonus, Critical Hit Chance]
    offhand:
      base: Desert Buckler
      mods: [Armour, Block Chance, Accuracy Rating]
    helmet:
      base: Freebooter Cap
      mods: [Energy Shield, Critical Hit Chance, +Maximum Life, Elemental Resistances]
    body:
      base: Slipstrike Vest
      mods: [Evasion Rating, Energy Shield, Evasion and Energy Shield, +Maximum Life, Elemental Resistances]
    gloves:
      base: Polished Bracers
      mods: [Adds Physical Damage to Attacks, +Maximum Life, Accuracy Rating, +Level of all Melee Skills, Critical Damage Bonus, Increased Attack Speed]
    boots:
      base: Drakeskin Boots
      mods: [+Maximum Life, Movement Speed, Elemental Resistances]
    amulet:
      base: Pearlescent Amulet
      mods: [+All Attributes, Grants a Passive Skill]
    ring1:
      base: Topaz Ring
      mods: [+Dexterity, +Maximum Life, Life Leech, +Strength]
    ring2:
      base: Prismatic Ring
      mods: [Elemental Resistances, Accuracy Rating, +Maximum Life, Mana Leech]
    belt:
      unique: "Ryslatha's Coil"
passives:
  attribute: str
  path:
    - "Honed Instincts"
    - "Vile Wounds"
    - "Escape Velocity"
    - "Acceleration"
    - "Focused Thrust"
    - "Precise Point"
    - "Roll and Strike"
    - "Inspiring Ally"
    - "Tainted Strike"
    - "Perfectly Placed Knife"
    - "Versatile Arms"
    - "Falcon Dive"
    - "Heartstopping"
    - "Heartbreaking"
    - "Enhanced Reflexes"
    - "Beastial Skin"
    - "Maiming Strike"
    - "Cooked"
    - "Splinters"
    - "Deterioration"
    - "Struck Through"
    - "Wasting"
    - "Avoiding Deflection"
    - "Enduring Deflection"
    - "Thousand Cuts"
    - "Inevitable Rupture"
  ascendancy: [Critical Strike, Penetrate, Predatory Instinct, In for the Kill]
---
## How It Works

[[Rake]] dashes toward enemies and inflicts more bleeding the farther you dash. [[Disengage]] takes you back out while hitting in a cone, ready for the next Rake. Once a target has taken enough bleed damage, [[Blood Hunt]] finishes it with a hit that scales with that bleed.

[[Spearfield]] clears from range and, on big bosses, its overlapping hits become the best damage of the build. [[Herald of Blood]] makes bleeding enemies burst; linking it with Poison and Bursting Plague adds poison explosions on top. [[Bloodhound's Mark]] turns bleeding into heavy stun on its target.

The Amazon's Critical Strike, Penetrate, Predatory Instinct and In for the Kill complete the setup: Blood Hunt is meant to land during Predatory Instinct.

## Playstyle

**Mapping.** Throw [[Spearfield]] into packs and [[Rake]] through what survives.

**Bossing.** Mark the boss, alternate [[Rake]] and [[Disengage]] to stack bleeds, then use [[Blood Hunt]] during Predatory Instinct.

## Gear Priorities

The spear needs physical damage, attack speed and accuracy. Life and resistances everywhere else, with movement speed on boots. Horns of Bynden helps during the campaign, and the endgame setup adds a Ryslatha's Coil belt.

## FAQ

**Why do I keep getting stunned?** Two options on the tree: Hunter's Talisman gives you an extra charm slot for a Stone Charm, or spend two points on Deft Recovery. Stuns also become less of a problem as your life pool grows, even if they stay annoying.

**Why can't I level all my gems?** Levelling every gem asks for a lot of attributes. Early on, Strength comes first, even before fully levelled gems; just keep enough Dexterity to use every gem and wear evasion gear. Later you need both, so look for Dexterity and Strength on gear and move attribute points as needed (the Hooded One or Doryani respec them for gold).

**How do I sustain life and mana in maps?** Get at least one roll of physical damage leeched as life and one leeched as mana. They can roll on the weapon, rings or gloves, ideally rings. Chance to evade is your main defence, so keep a body armour with as much evasion as possible.

**Can I use Tame Beast, and why is my Spirit short?** Only if you have spare Spirit from gear such as the body armour or amulet. [[Tame Beast]] turns a captured rare beast into a minion that can bring useful buffs like a physical aura, but its Spirit cost is not fixed: it depends on how many modifiers the beast has.

**Which Act 2 relic and Act 3 Venom Draught bonuses should I take?** These bonuses are minor. If you picked something different, especially for the Venom Draught, it will not hurt the build much.
