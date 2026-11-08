---
title: Lightning Minion Shaman
class: Druid
ascendancy: Shaman
author: Exile Codex
updated: 2026-11-08
patch: "0.5.5"
source:
  title: "Lightning Minion Shaman Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/lightning-minion-shaman-build-guide
  updated: 2026-11-01
summary: "Druid summoner who levels with skeletons and Raging Spirits, then lets lightning spectres and Skeletal Storm Mages fight while Shaman reduces the damage you take."
tags: [minion, spectre, lightning, energy shield, league starter]
damage: Lightning / Physical
playstyle: Minions
difficulty: easy
budget: low
tiers:
  starter: B
  endgame: A
  bossing: S
pros:
  - "Excellent bossing"
  - "Very tanky with Chaos Inoculation, block and the Shaman's damage reduction"
  - "No unique required"
cons:
  - "Many minion gems to level"
  - "Spectres change during the interludes"
  - "Damage depends on keeping the army alive"
skills:
  - gem: "Skeletal Warrior"
    supports: [Sacrificial Lamb I, Last Gasp, Amanamu's Tithe, Deathmarch, Meat Shield II]
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Prolonged Duration II, Magnified Area II, Brutus' Brain]
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Deathmarch, Meat Shield II, Last Gasp, Prolonged Duration II]
  - gem: "Skeletal Storm Mage"
    supports: [Muster, Feeding Frenzy II, Shock, Overcharge, Esh's Radiance]
  - gem: "Sigil of Power"
    supports: [Prolonged Duration II, Magnified Area II]
  - gem: "Skeletal Brute"
    supports: [Bidding III, Prolonged Duration II, Magnified Area II, Last Gasp, Efficiency II]
  - gem: "Skeletal Frost Mage"
    supports: [Last Gasp, Bidding III, Magnified Area II, Prolonged Duration II, Efficiency II]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Upwelling I, Uhtred's Constellation, Rapid Casting II]
  - gem: "Wolf Pack"
    supports: [Muster, Loyalty, Tecrod's Revenge, Uul-Netol's Embrace, Feeding Frenzy II]
  - gem: "Skeletal Sniper"
    supports: [Last Gasp, Muster, Maim, Feeding Frenzy II]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II]
gemPriority:
  skills:
    - label: "First"
      gems: [Contagion, Skeletal Sniper]
    - label: ""
      gems: [Unearth, Frost Bomb]
    - label: ""
      gems: [Elemental Weakness, Pain Offering]
    - label: "Act 4 (Use one or two)"
      gems: [Skeletal Cleric]
    - label: "Swap to Powered Zealot Spectres in the Interlude"
      gems: [Bind Spectre]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [Raging Spirits]
    - label: "ACT II (Golden Tomb)"
      gems: [Raging Spirits]
    - label: "ACT III (The Azak Bog Witch)"
      gems: [Raging Spirits]
    - label: "+Damage & 10% less dmg taken"
      gems: [Wolf Pack]
  supports:
    - label: "Act I"
      gems: [Unleash, Multishot I, Fire Attunement, Ignite I, Last Gasp, Arcane Surge]
    - label: "Act Ii"
      gems: [Minion Splash I, Infernal Legion I, Multishot II, Minion Instability, Potent Exposure, Efficiency I]
    - label: "Act Iii"
      gems: [Feeding Frenzy I, Cursed Ground, Last Gasp, Loyalty, Meat Shield II, Elemental Army, Ignite II, Rapid Casting I]
    - label: "Act 4"
      gems: [Feeding Frenzy II, Muster, Efficiency II, Danse Macabre, Rapid Attacks II, Rapid Casting II, Heightened Curse, Wildshards II, Pierce III]
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
            supports: [Multishot I, Fire Attunement]
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
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Unearth"
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Minion Instability]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Skeletal Warrior"
            supports: [Infernal Legion I, Last Gasp]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Heightened Curse]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy I, Minion Instability]
          - gem: "Skeletal Warrior"
            supports: [Infernal Legion I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite II, Arcane Surge, Rapid Casting I]
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
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Heightened Curse, Cursed Ground]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Cooldown Recovery I]
          - gem: "Volcano"
            supports: [Ignite II, Arcane Surge, Rapid Casting I]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy I, Loyalty]
      - name: "Interludes Powered Zealots"
        skills:
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Minion Instability]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Heightened Curse, Cursed Ground]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Cooldown Recovery I]
          - gem: "Volcano"
            supports: [Ignite II, Arcane Surge, Rapid Casting I]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Feeding Frenzy I, Loyalty]
      - name: "Early Maps"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Sacrificial Offering, Meat Shield II, Elemental Army]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II, Elemental Army]
          - gem: "Skeletal Storm Mage"
            supports: [Shock, Muster, Feeding Frenzy II, Overcharge]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Heightened Curse, Efficiency II, Prolonged Duration II]
          - gem: "Frost Bomb"
            supports: [Overabundance II, Spell Echo, Potent Exposure, Prolonged Duration II]
          - gem: "Unearth"
            supports: [Feeding Frenzy II, Muster, Brutality III, Pin II]
          - gem: "Skeletal Brute"
            supports: [Bidding III, Last Gasp, Prolonged Duration II, Efficiency II]
          - gem: "Wolf Pack"
            supports: [Muster, Loyalty, Last Gasp, Feeding Frenzy II, Rage III]
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
      - name: "Act 2 & 3"
        steps:
          - gem: "Volcano"
            label: "Command Skill"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "More Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interlude Spectres"
        steps:
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Rares & Bosses"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Early"
    steps:
      - gem: "Pain Offering"
        label: "Rares & Bosses"
      - gem: "Frost Bomb"
      - gem: "Elemental Weakness"
      - gem: "Skeletal Brute"
      - gem: "Unearth"
        label: "Corpses"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
  offhand:
    base: Sacred Focus
    mods: [+Spirit, Elemental Resistances, +Dexterity]
  helmet:
    base: Runeforged Kamasan Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
  body:
    base: Runeforged Sacramental Robe
    mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
  gloves:
    base: Runeforged Vaal Gloves
    mods: [Energy Shield, Elemental Resistances, +Attributes]
  boots:
    unique: "Bones of Ullr"
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, +Attributes, Elemental Resistances, Energy Shield]
  ring1:
    unique: "Evergrasping Ring"
  ring2:
    unique: "Evergrasping Ring"
  belt:
    base: Heavy Belt
    mods: [Elemental Resistances, +Strength, Armour, Minion Life]
  weapon2:
    base: Chiming Staff
    mods: [+Level of all Spell Skills]
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
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Critical Damage Bonus]
    offhand:
      base: Painted Crest Shield
      mods: [Elemental Resistances, Block Chance, +Maximum Life, +Attributes]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, +Maximum Life]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Vaal Gloves
      mods: [Elemental Resistances, Energy Shield, +Attributes, +Maximum Life]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, Elemental Resistances, +Spirit, +Attributes, Energy Shield]
    ring1:
      base: Sapphire Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, Armour, Charm Slots]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
    offhand:
      base: Sacred Focus
      mods: [+Spirit, Elemental Resistances, +Dexterity]
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Runeforged Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, +Attributes, Elemental Resistances, Energy Shield]
    ring1:
      unique: "Evergrasping Ring"
    ring2:
      unique: "Evergrasping Ring"
    belt:
      base: Heavy Belt
      mods: [Elemental Resistances, +Strength, Armour, Minion Life]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
    offhand2:
      unique: Prism Guardian
  minmax:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Runeforged Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Portent Amulet
      mods: [+Level of all Minion Skills, +Spirit, +Attributes, Energy Shield, Elemental Resistances]
    ring1:
      unique: "Kalandra's Touch"
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, Minion Life]
    belt:
      base: Heavy Belt
      mods: [+Level of all Minion Skills, Elemental Resistances, +Strength, Armour]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
    offhand2:
      unique: Prism Guardian
passives:
  attribute: int
  path:
    - "Devoted Protector"
    - "Restless Dead"
    - "Crystalline Flesh"
    - "Lord of Horrors"
    - "Profane Commander"
    - "Enhanced Barrier"
    - "Silent Guardian"
    - "Bringer of Order"
    - "Relentless Fallen"
    - "Necrotised Flesh"
    - "Vile Mending"
    - "Illuminated Crown"
    - "Hallowed"
    - "Chaos Inoculation"
    - "Rapid Recharge"
    - "Dampening Shield"
    - "Pure Energy"
    - "Melding"
    - "Insightfulness"
    - "The Soul Meridian"
    - "Gigantic Following"
    - "Warding Fetish"
    - "Grip of Evil"
  ascendancy: [Sacred Flow, Reactive Growth, Avatar of Evolution, Wisdom of the Maji]
---

## How It Works

During the campaign, [[Volcano]] summons Raging Spirits, [[Skeletal Sniper]] provides a command skill that hits a wide area, and [[Unearth]] turns corpses into extra minions. [[Elemental Weakness]] and [[Frost Bomb]] make enemies take more damage.

From the first interlude, Powered Zealot spectres take over the damage, and Raging Spirits, [[Volcano]] and [[Skeletal Sniper]] are dropped. After the campaign, the army settles on [[Skeletal Storm Mage]] and [[Skeletal Frost Mage]] for damage, with [[Skeletal Warrior]] and [[Skeletal Brute]] in front, [[Skeletal Cleric]] to revive, and [[Wolf Pack]] linked to [[Loyalty]].

## Playstyle

**Clear.** Walk forward, let the spectres engage, and cast [[Unearth]] on corpses.

**Single target.** [[Pain Offering]] on rares and bosses, [[Sigil of Power]] under you, and [[Skeletal Brute]] to hold the boss in place. Keep [[Refutation]] ready for big hits.

## Defences

Energy shield, energy shield recovery and block, then Chaos Inoculation in the endgame. Reactive Growth and Avatar of Evolution lower the elemental and physical damage you take, and [[Wolf Pack]] with [[Loyalty]] reduces damage from hits further.

## Gear Priorities

+Level of all Minion Skills and spirit first. [[Bones of Ullr]] and two [[Evergrasping Ring]]s are the source guide's endgame uniques, with [[Prism Guardian]] on the second weapon set. [[Enfolding Dawn]] is a strong campaign body armour.
