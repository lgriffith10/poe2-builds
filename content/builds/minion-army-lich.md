---
title: Minion Army Lich
class: Witch
ascendancy: Lich
author: Exile Codex
updated: 2026-11-08
patch: "0.5.5"
source:
  title: "Minion Army Lich Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/minion-army-lich-build-guide
  updated: 2026-10-30
summary: "Witch necromancer who commands skeletons, wolves and spectres from the first act to the endgame, behind Lich energy shield and block."
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
  - "Minions from the start of the campaign"
  - "Very tanky with energy shield, block and Eternal Life"
  - "Lots of different minions, so the army never feels empty"
cons:
  - "Many gems to level and link"
  - "The Vaal Guard explosions are hard on the eyes and the computer"
  - "Spectres need replacing around level 92"
skills:
  - gem: "Wolf Pack"
    supports: [Romira's Requital, Tecrod's Revenge, Muster, Feeding Frenzy II, Rapid Attacks II]
  - gem: "Skeletal Warrior"
    supports: [Last Gasp, Sacrificial Lamb I, Amanamu's Tithe, Meat Shield II, Deathmarch]
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Prolonged Duration II, Brutus' Brain, Magnified Area II]
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Deathmarch, Meat Shield II, Last Gasp, Prolonged Duration II]
  - gem: "Despair"
    supports: [Heightened Curse, Cursed Ground, Efficiency II, Prolonged Duration II, Ritualistic Curse]
  - gem: "Skeletal Storm Mage"
    supports: [Shock, Overcharge, Muster, Feeding Frenzy II, Esh's Radiance]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Uhtred's Constellation, Atziri's Communion]
  - gem: "Skeletal Sniper"
    supports: [Muster, Last Gasp, Maim, Chain III, Feeding Frenzy II]
  - gem: "Skeletal Brute"
    supports: [Bidding III, Last Gasp, Prolonged Duration II, Magnified Area II, Efficiency II]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility, Efficiency II]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1 - Step 1"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
          - gem: "Contagion"
      - name: "Act 1 - Step 2"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Frost Bomb"
      - name: "Act 1 - Step 3"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
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
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Efficiency I]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy I, Minion Instability]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Spell Cascade, Focused Curse]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Feeding Frenzy I]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 4 & Vaal Guard"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Minion Instability, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Elemental Army, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Focused Curse, Efficiency II]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy II, Loyalty]
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
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 2"
        steps:
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "More Raging Spirits"
          - gem: "Elemental Weakness"
          - gem: "Elemental Weakness"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 3"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Skeletal Sniper"
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interlude"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
            label: "More raging spirits"
          - gem: "Unearth"
            label: "Corpses"
  - name: "Campaign Snipers"
    steps:
      - name: "Act 1 - Step 1"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Frost Bomb"
      - name: "Act 1 - Step 2"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Frost Bomb"
      - name: "Act 1 - Step 3"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
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
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Efficiency I]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability, Infernal Legion I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Infernal Legion I]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Spell Cascade, Focused Curse]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Feeding Frenzy I]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Loyalty, Feeding Frenzy I]
      - name: "Act 4 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Minion Instability, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Danse Macabre, Elemental Army]
          - gem: "Elemental Weakness"
            supports: [Spell Cascade, Focused Curse, Efficiency II]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash II]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Feeding Frenzy II, Fire Attunement]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy II, Loyalty]
      - name: "Early Maps"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Sacrificial Offering, Meat Shield II, Elemental Army]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Muster, Feeding Frenzy II, Minion Splash II]
          - gem: "Skeletal Cleric"
            supports: [Rapid Casting II, Meat Shield II, Last Gasp, Elemental Army]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Spell Cascade, Focused Curse, Arcane Surge]
          - gem: "Skeletal Storm Mage"
            supports: [Shock, Muster, Feeding Frenzy II, Overcharge]
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Muster, Rage III, Pin II]
          - gem: "Wolf Pack"
            supports: [Loyalty, Muster, Last Gasp, Feeding Frenzy II, Rage III]
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
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 2"
        steps:
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "More Raging Spirits"
          - gem: "Elemental Weakness"
          - gem: "Elemental Weakness"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 3"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Skeletal Sniper"
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interludes & Early"
        steps:
          - gem: "Elemental Weakness"
            label: "Raging Spirits"
          - gem: "Skeletal Sniper"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
            label: "More raging spirits"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Early"
    steps:
      - gem: "Elemental Weakness"
        label: "Raging Spirits"
      - gem: "Pain Offering"
        label: "Rares & Bosses"
      - gem: "Elemental Weakness"
        label: "More raging spirits"
      - gem: "Unearth"
        label: "Corpses"
      - gem: "Refutation"
        label: "Defensive skill"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
  offhand:
    unique: "Prism Guardian"
  helmet:
    base: Runeforged Kamasan Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
  body:
    base: Sacramental Robe
    mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
  gloves:
    base: Runeforged Vaal Gloves
    mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
  boots:
    unique: "Bones of Ullr"
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
  ring1:
    base: Topaz Ring
    mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
  ring2:
    unique: "Evergrasping Ring"
  belt:
    base: Heavy Belt
    mods: [Minion Melee Splash, Elemental Resistances, +Maximum Life, +Strength]
  weapon2:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
  offhand2:
    base: Sacred Focus
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Lightning Damage]
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
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Strength, Armour, +Maximum Mana]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Allies in Presence Attack Speed, Allies in Presence gain Added Lightning Damage]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Lightning Damage, Elemental Resistances]
    offhand:
      base: Painted Crest Shield
      mods: [Block Chance, +Maximum Life, Chaos Resistance, Elemental Resistances, +Attributes]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, Chaos Resistance, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, Chaos Resistance, +Maximum Life, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [Increased Minion Damage, +Maximum Life, Elemental Resistances, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, +Maximum Life, Elemental Resistances, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, Armour]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Allies in Presence Attack Speed, +Spirit, +Maximum Mana]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
    offhand:
      unique: "Prism Guardian"
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    ring2:
      unique: "Evergrasping Ring"
    belt:
      base: Heavy Belt
      mods: [Minion Melee Splash, Elemental Resistances, +Maximum Life, +Strength]
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
    offhand2:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
  minmax:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, Chaos Resistance]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, Chaos Resistance, +Attributes, +Maximum Life]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Portent Amulet
      mods: [+Level of all Minion Skills, +Spirit, +Attributes, Elemental Resistances, Energy Shield]
    ring1:
      base: Sapphire Ring
      mods: []
    ring2:
      unique: "Kalandra's Touch"
    belt:
      unique: "Mageblood"
    weapon2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, +Maximum Mana, Allies in Presence Attack Speed]
    offhand2:
      unique: Prism Guardian
passives:
  attribute: int
  path:
    - "Raw Power"
    - "Elemental Force"
    - "Crystalline Flesh"
    - "Restless Dead"
    - "Lord of Horrors"
    - "Right Hand of Darkness"
    - "Relentless Fallen"
    - "Necrotised Flesh"
    - "Splintering Force"
    - "Enhanced Barrier"
    - "Profane Commander"
    - "Heavy Buffer"
    - "Silent Guardian"
    - "Bringer of Order"
    - "Pure Energy"
    - "Dampening Shield"
    - "Entropic Incarnation"
    - "Vile Mending"
    - "Melding"
    - "Dependable Ward"
    - "Insightfulness"
    - "Hallowed"
    - "Grip of Evil"
    - "Warding Fetish"
    - "Illuminated Crown"
  ascendancy: [Soulless Form, Necromantic Conduit, Eternal Life, Crystalline Phylactery]
---

## How It Works

You are a minion build from the first zone. [[Unearth]] raises bone constructs from corpses, [[Skeletal Sniper]] provides a command skill that blasts an area, and [[Volcano]] or [[Elemental Weakness]] summon Raging Spirits during the early acts.

From the end of Act 3, Vaal Guard spectres take over most of the damage. If their burning ground and explosions are too much, the source guide offers an alternative path built around [[Skeletal Sniper]]. Around level 92, Gargantuan Wasps replace the Vaal Guards.

The permanent army: [[Skeletal Warrior]] and [[Skeletal Brute]] in front, [[Skeletal Storm Mage]] for lightning damage, [[Skeletal Cleric]] to revive, plus [[Wolf Pack]]. [[Pain Offering]] buffs them, [[Despair]] weakens bosses, and [[Elemental Weakness]] and [[Frost Bomb]] help during the campaign.

## Playstyle

**Clear.** Advance with the army and cast [[Unearth]] on corpses for extra bodies.

**Single target.** [[Pain Offering]] for rares and bosses, [[Despair]] on the boss, and [[Refutation]] to block a big hit.

## Defences

Stack energy shield, energy shield recovery and block. Soulless Form and Eternal Life work with Heavy Buffer to reduce the damage you take while you have energy shield. [[Convalescence]] adds recovery in long fights.

## Gear Priorities

+Level of all Minion Skills and spirit on the sceptre, helmet and amulet. [[Prism Guardian]] is the shield of choice, with [[Bones of Ullr]] boots and an [[Evergrasping Ring]]. [[Enfolding Dawn]] is the source guide's campaign body armour.
