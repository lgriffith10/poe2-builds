---
title: Minion Army Shaman
class: Druid
ascendancy: Shaman
author: Exile Codex
updated: 2026-11-08
patch: "0.5.5"
source:
  title: "Minion Army Shaman Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/minion-army-shaman-build-guide
  updated: 2026-11-01
summary: "Druid summoner with skeletons, wolves and spectres, protected by the Shaman's damage reduction and a large energy shield pool."
tags: [minion, spectre, energy shield, block, league starter]
damage: Physical / Lightning
playstyle: Minions
difficulty: easy
budget: medium
tiers:
  starter: B
  endgame: A
  bossing: A
pros:
  - "Minions from the first zone"
  - "Very tanky thanks to Reactive Growth and Avatar of Evolution"
  - "No unique required"
cons:
  - "Many minion gems to level"
  - "Vaal Guard spectres make the screen very busy"
  - "Spectres need replacing in the late game"
skills:
  - gem: "Skeletal Warrior"
    supports: [Last Gasp, Amanamu's Tithe, Sacrificial Lamb I, Deathmarch]
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Magnified Area II, Brutus' Brain, Prolonged Duration II]
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Meat Shield II, Last Gasp, Minion Mastery, Prolonged Duration II]
  - gem: "Skeletal Storm Mage"
    supports: [Muster, Feeding Frenzy II, Shock, Overcharge, Esh's Radiance]
  - gem: "Despair"
    supports: [Heightened Curse, Cursed Ground, Efficiency II, Prolonged Duration II, Ritualistic Curse]
  - gem: "Skeletal Brute"
    supports: [Bidding III, Prolonged Duration II, Magnified Area II, Last Gasp, Efficiency II]
  - gem: "Wolf Pack"
    supports: [Muster, Feeding Frenzy II, Loyalty, Tecrod's Revenge, Rapid Attacks II]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Uhtred's Constellation, Upwelling I, Rapid Casting II]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery I, Rapid Casting II, Mobility, Efficiency II]
  - gem: "Skeletal Sniper"
    supports: [Maim, Last Gasp, Chain III, Culling Strike II, Rapid Attacks II]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1 Step 1"
        skills:
          - gem: "Shred"
          - gem: "Maul"
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Skeletal Sniper"
            supports: [Fire Attunement, Multishot I]
          - gem: "Skeletal Warrior"
      - name: "Act 1 Step 2"
        skills:
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Unearth"
            supports: [Fire Attunement]
          - gem: "Frost Bomb"
      - name: "Act 1 Step 3"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Infernal Legion I, Last Gasp]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Efficiency I]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy I, Minion Instability]
          - gem: "Volcano"
            supports: [Arcane Surge, Ignite II, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Cursed Ground]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy I, Loyalty]
      - name: "Act 4 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Minion Instability]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Volcano"
            supports: [Ignite II, Arcane Surge, Rapid Casting I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Cursed Ground, Heightened Curse]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash I]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Feeding Frenzy II, Last Gasp, Loyalty]
    rotations:
      - name: "Act1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill"
          - gem: "Skeletal Sniper"
          - gem: "Contagion"
            label: "Aoe dmg"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 Step 3"
        steps:
          - gem: "Skeletal Sniper"
            label: "Command Skill"
          - gem: "Volcano"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 2 & 3"
        steps:
          - gem: "Skeletal Sniper"
            label: "Command Skill"
          - gem: "Volcano"
          - gem: "Elemental Weakness"
            label: "More Raging Spirits"
          - gem: "Volcano"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interlude"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Volcano"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
  - name: "Campaign Snipers"
    steps:
      - name: "Act 1 Step 1"
        skills:
          - gem: "Shred"
          - gem: "Maul"
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Skeletal Sniper"
            supports: [Fire Attunement, Multishot I]
          - gem: "Skeletal Warrior"
      - name: "Act 1 Step 2"
        skills:
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Unearth"
            supports: [Brutality I]
          - gem: "Frost Bomb"
      - name: "Act 1 Step 3"
        skills:
          - gem: "Unearth"
            supports: [Brutality I]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality I]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Infernal Legion I, Last Gasp]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Heightened Curse]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy I, Brutality I]
          - gem: "Volcano"
            supports: [Arcane Surge, Ignite II]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Heightened Curse]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Magnified Area II]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy I, Loyalty]
      - name: "Act 4 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Brutality III]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Volcano"
            supports: [Ignite II, Arcane Surge, Rapid Casting II]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Heightened Curse, Cursed Ground]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash I]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Fire Attunement, Feeding Frenzy II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Magnified Area II, Cooldown Recovery I]
          - gem: "Wolf Pack"
            supports: [Feeding Frenzy II, Last Gasp, Loyalty]
      - name: "Endgame"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II, Deathmarch]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Sacrificial Offering, Meat Shield II, Elemental Army]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II, Minion Mastery]
          - gem: "Skeletal Storm Mage"
            supports: [Shock, Muster, Feeding Frenzy II, Overcharge]
          - gem: "Freezing Mark"
            supports: [Mark for Death II, Armour Demolisher II, Prolonged Duration II]
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Muster, Rage III, Pin II]
          - gem: "Wolf Pack"
            supports: [Loyalty, Muster, Last Gasp, Feeding Frenzy II]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Muster, Feeding Frenzy II, Minion Splash II, Rage III]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility]
    rotations:
      - name: "Act1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill"
          - gem: "Skeletal Sniper"
          - gem: "Contagion"
            label: "Aoe dmg"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 Step 3"
        steps:
          - gem: "Skeletal Sniper"
            label: "Command Skill"
          - gem: "Volcano"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 2 & 3"
        steps:
          - gem: "Skeletal Sniper"
            label: "Command Skill"
          - gem: "Volcano"
          - gem: "Elemental Weakness"
            label: "More Raging Spirits"
          - gem: "Volcano"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interlude"
        steps:
          - gem: "Skeletal Sniper"
            label: "Command skill"
          - gem: "Volcano"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Act1 Step 1 & 2"
    steps:
      - gem: "Volcano"
        label: "Command skill"
      - gem: "Skeletal Sniper"
      - gem: "Contagion"
        label: "Aoe dmg"
      - gem: "Unearth"
        label: "Corpses"
      - gem: "Frost Bomb"
        label: "Bosses/rares"
  - name: "Act 1 Step 3"
    steps:
      - gem: "Skeletal Sniper"
        label: "Command Skill"
      - gem: "Volcano"
      - gem: "Volcano"
        label: "Raging Spirits"
      - gem: "Unearth"
        label: "Corpses"
      - gem: "Frost Bomb"
        label: "Bosses/rares"
  - name: "Act 2 & 3"
    steps:
      - gem: "Skeletal Sniper"
        label: "Command Skill"
      - gem: "Volcano"
      - gem: "Elemental Weakness"
        label: "More Raging Spirits"
      - gem: "Volcano"
      - gem: "Pain Offering"
        label: "Rares & Bosses"
      - gem: "Frost Bomb"
      - gem: "Elemental Weakness"
      - gem: "Unearth"
        label: "Corpses"
  - name: "Act 4 & Interlude"
    steps:
      - gem: "Elemental Weakness"
        label: "Raging Spirits"
      - gem: "Volcano"
      - gem: "Pain Offering"
        label: "Rares & Bosses"
      - gem: "Frost Bomb"
      - gem: "Elemental Weakness"
      - gem: "Unearth"
        label: "Corpses"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
  offhand:
    base: Sacred Focus
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
  helmet:
    base: Kamasan Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
  body:
    base: Sacramental Robe
    mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
  gloves:
    base: Runeforged Vaal Gloves
    mods: [Energy Shield, Elemental Resistances, +Attributes]
  boots:
    unique: "Bones of Ullr"
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
  ring1:
    unique: "Evergrasping Ring"
  ring2:
    unique: "Evergrasping Ring"
  belt:
    base: Heavy Belt
    mods: [Charm Slots, Minion Melee Splash, Elemental Resistances, +Strength, Minion Life]
  weapon2:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
  offhand2:
    unique: Prism Guardian
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Block Chance, Elemental Resistances, Chaos Resistance]
    helmet:
      base: Twig Circlet
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Torn Gloves
      mods: [Elemental Resistances, +Maximum Life, Energy Shield, +Attributes, Chaos Resistance]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    ring2:
      base: Ruby Ring
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Strength, Armour, +Maximum Mana]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Lightning Damage]
    offhand:
      base: Painted Crest Shield
      mods: [Elemental Resistances, Block Chance, +Maximum Life, +Attributes]
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes, +Maximum Life]
    ring1:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes]
    belt:
      base: Fine Belt
      mods: [Charm Slots, Elemental Resistances, +Maximum Life, +Strength, Armour]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      unique: "Evergrasping Ring"
    ring2:
      unique: "Evergrasping Ring"
    belt:
      base: Heavy Belt
      mods: [Charm Slots, Minion Melee Splash, Elemental Resistances, +Strength, Minion Life]
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
    offhand2:
      unique: Prism Guardian
  minmax:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Portent Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      base: Topaz Ring
      mods: []
    ring2:
      unique: "Kalandra's Touch"
    belt:
      base: Heavy Belt
      mods: [Charm Slots, Minion Melee Splash, +Level of all Minion Skills, Elemental Resistances, +Strength, Armour]
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, +Maximum Mana, Allies in Presence Attack Speed]
    offhand2:
      unique: Prism Guardian
passives:
  attribute: int
  path:
    - "Devoted Protector"
    - "Restless Dead"
    - "Crystalline Flesh"
    - "Lord of Horrors"
    - "Enhanced Barrier"
    - "Necrotised Flesh"
    - "Relentless Fallen"
    - "Splintering Force"
    - "Profane Commander"
    - "Entropic Incarnation"
    - "Vile Mending"
    - "Dampening Shield"
    - "Rapid Recharge"
    - "Pure Energy"
    - "Melding"
    - "Insightfulness"
    - "Chaos Inoculation"
    - "Bringer of Order"
    - "Silent Guardian"
    - "Hallowed"
    - "Illuminated Crown"
    - "Warlord Leader"
    - "Warlord Berserker"
  ascendancy: [Sacred Flow, Reactive Growth, Avatar of Evolution, Wisdom of the Maji]
---

## How It Works

The campaign plays like the other minion guides: [[Volcano]] summons Raging Spirits, [[Skeletal Sniper]] gives a command skill that hits a wide area, and [[Unearth]] raises extra minions from corpses. At the end of Act 3, Vaal Guard spectres take over the damage; the source guide also offers a [[Skeletal Sniper]] path. Late in the game, Gargantuan Wasps replace them.

The permanent army: [[Skeletal Warrior]] and [[Skeletal Brute]] in front, [[Skeletal Storm Mage]] for lightning damage, [[Skeletal Cleric]] to revive and [[Wolf Pack]]. [[Pain Offering]] buffs them and [[Despair]] weakens bosses.

## Playstyle

**Clear.** Walk forward with the army and cast [[Unearth]] on corpses.

**Single target.** [[Pain Offering]] on rares and bosses, [[Despair]] on the boss, [[Refutation]] for big hits.

## Defences

Energy shield, energy shield recovery and block. Reactive Growth and Avatar of Evolution lower the elemental and physical damage you take, and [[Convalescence]] adds recovery.

## Gear Priorities

+Level of all Minion Skills and spirit first. [[Bones of Ullr]] and two [[Evergrasping Ring]]s are the endgame uniques, with [[Prism Guardian]] on the second weapon set.
