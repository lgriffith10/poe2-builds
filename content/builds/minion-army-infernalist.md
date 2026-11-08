---
title: Minion Army Infernalist
class: Witch
ascendancy: Infernalist
author: Exile Codex
updated: 2026-11-08
patch: "0.5.5"
source:
  title: "Minion Army Infernalist Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/minion-army-infernalist-build-guide
  updated: 2026-10-31
summary: "Witch summoner who adds Infernalist's hellhound to a skeleton army, with spectres doing the heavy lifting from the end of Act 3."
tags: [minion, spectre, energy shield, league starter]
damage: Physical / Fire
playstyle: Minions
difficulty: easy
budget: low
tiers:
  starter: C
  endgame: B
  bossing: A
pros:
  - "Minions from the first zone of the campaign"
  - "Loyal Hellhound adds a strong permanent minion"
  - "No unique required"
cons:
  - "Many minion gems to level"
  - "Vaal Guard spectres make the screen very busy"
  - "Weaker endgame clear than the other minion guides"
skills:
  - gem: "Skeletal Warrior"
    supports: [Last Gasp, Sacrificial Lamb I, Essence Harvest, Deathmarch, Amanamu's Tithe]
  - gem: "Summon Infernal Hound"
    supports: [Romira's Requital, Tecrod's Revenge, Muster, Feeding Frenzy II, Rapid Attacks II]
  - gem: "Skeletal Sniper"
    supports: [Last Gasp, Maim, Chain III, Essence Harvest, Culling Strike II]
  - gem: "Pain Offering"
    supports: [Danse Macabre, Sacrificial Offering, Brutus' Brain, Prolonged Duration II, Magnified Area II]
  - gem: "Skeletal Cleric"
    supports: [Rapid Casting II, Last Gasp, Meat Shield II, Essence Harvest, Deathmarch]
  - gem: "Skeletal Storm Mage"
    supports: [Shock, Muster, Overcharge, Feeding Frenzy II, Esh's Radiance]
  - gem: "Skeletal Brute"
    supports: [Bidding III, Prolonged Duration II, Last Gasp, Efficiency II, Magnified Area II]
  - gem: "Despair"
    supports: [Cursed Ground, Heightened Curse, Efficiency II, Prolonged Duration II, Ritualistic Curse]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Uhtred's Constellation, Upwelling I]
  - gem: "Refutation"
    supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Mobility, Efficiency II]
gemPriority:
  skills:
    - label: "First"
      gems: [Skeletal Sniper]
    - label: ""
      gems: [Volcano, Contagion, Frost Bomb]
    - label: ""
      gems: [Elemental Weakness]
    - label: ""
      gems: [Pain Offering]
    - label: "(Swap after you have enough spirit to summon at least 4-5)"
      gems: [Skeletal Arsonist]
    - label: "Act 4 (Use one or two)"
      gems: [Skeletal Cleric]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [Raging Spirits]
    - label: "ACT II (Golden Tomb)"
      gems: [Raging Spirits]
    - label: "ACT III (The Azak Bog Witch)"
      gems: [Raging Spirits]
  supports:
    - label: "Act 1"
      gems: [Multishot I, Fire Attunement, Ignite I, Unleash, Last Gasp, Arcane Surge, Brutality I]
    - label: "Act 2"
      gems: [Minion Splash I, Multishot II, Last Gasp, Loyalty, Efficiency I, Potent Exposure, Brutality II]
    - label: "Act 3"
      gems: [Feeding Frenzy I, Cursed Ground, Meat Shield II, Rapid Casting I, Sacrificial Lamb I, Meat Shield I]
    - label: "Act 4"
      gems: [Danse Macabre, Muster, Feeding Frenzy II, Fire Exposure, Heightened Curse, Rapid Attacks II, Rapid Casting II, Meat Shield II]
    - label: "Interludes"
      gems: [Minion Splash II, Rage III, Brutality III]
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
            supports: [Brutality I]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
          - gem: "Frost Bomb"
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality II]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Efficiency I]
          - gem: "Summon Infernal Hound"
            supports: [Last Gasp, Loyalty]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality II, Feeding Frenzy I]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Feeding Frenzy I]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Cursed Ground]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield I]
      - name: "Act 4 & Vaal Guard"
        skills:
          - gem: "Unearth"
            supports: [Muster, Feeding Frenzy II, Brutality III]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash II]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Elemental Army, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Efficiency II, Heightened Curse]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II, Fire Exposure]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
    rotations:
      - name: "Act 1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Contagion"
            label: "Aoe Dmg"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 Step 3"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
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
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Elemental Weakness"
            label: "Bosses/Rares"
          - gem: "Pain Offering"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interludes"
        steps:
          - gem: "Volcano"
            count: 2
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Bosses/Rares"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
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
            supports: [Brutality I]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
          - gem: "Frost Bomb"
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality II]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Fire Attunement]
          - gem: "Elemental Weakness"
            supports: [Efficiency I]
          - gem: "Summon Infernal Hound"
            supports: [Last Gasp, Loyalty]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Unearth"
            supports: [Brutality II, Feeding Frenzy I]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II, Feeding Frenzy I]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Minion Splash I, Feeding Frenzy I]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Efficiency I, Cursed Ground]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II]
      - name: "Act 4 & Interludes"
        skills:
          - gem: "Unearth"
            supports: [Muster, Feeding Frenzy II, Brutality III]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Last Gasp, Feeding Frenzy II, Muster]
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Meat Shield II]
          - gem: "Raging Spirits"
            supports: [Last Gasp, Feeding Frenzy II, Minion Splash II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Elemental Army, Danse Macabre]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Efficiency II, Heightened Curse]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II, Fire Exposure]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
      - name: "Early Maps"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Sacrificial Lamb I, Last Gasp, Essence Harvest, Deathmarch]
          - gem: "Summon Infernal Hound"
            supports: [Loyalty, Last Gasp, Meat Shield II, Elemental Army]
          - gem: "Sniper's Mark"
            supports: [Mark for Death II, Charged Mark, Eternal Mark, Armour Demolisher II]
          - gem: "Pain Offering"
            supports: [Danse Macabre, Meat Shield II, Efficiency II, Elemental Army]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Muster, Feeding Frenzy II, Brutality III, Minion Splash II]
          - gem: "Skeletal Cleric"
            supports: [Rapid Casting II, Last Gasp, Meat Shield II, Essence Harvest]
          - gem: "Skeletal Storm Mage"
            supports: [Shock, Muster, Feeding Frenzy II, Overcharge]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Muster, Feeding Frenzy II, Rapid Attacks II]
          - gem: "Unearth"
            supports: [Muster, Feeding Frenzy II, Brutality III, Minion Splash II]
          - gem: "Refutation"
            supports: [Cooldown Recovery II, Prolonged Duration II, Rapid Casting II, Mobility]
    rotations:
      - name: "Act 1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Contagion"
            label: "Aoe Dmg"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 Step 3"
        steps:
          - gem: "Volcano"
            label: "Command skill combo"
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
            label: "Command skill combo"
          - gem: "Skeletal Sniper"
          - gem: "Volcano"
            label: "Raging Spirits"
          - gem: "Elemental Weakness"
            label: "Bosses/Rares"
          - gem: "Pain Offering"
          - gem: "Frost Bomb"
          - gem: "Unearth"
            label: "Corpses"
      - name: "Act 4 & Interludes"
        steps:
          - gem: "Volcano"
            count: 2
            label: "Raging Spirits"
          - gem: "Pain Offering"
            label: "Bosses/Rares"
          - gem: "Frost Bomb"
          - gem: "Elemental Weakness"
          - gem: "Unearth"
            label: "Corpses"
rotations:
  - name: "Early Vaal Guard"
    steps:
      - gem: "Pain Offering"
        label: "Bosses/Rares"
      - gem: "Sniper's Mark"
      - gem: "Unearth"
        label: "Corpses"
      - gem: "Refutation"
        label: "Defensive skill"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Lightning Damage]
  offhand:
    base: Sacred Focus
    mods: [+Spirit, Elemental Resistances, +Dexterity]
  helmet:
    base: Kamasan Tiara
    mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
  body:
    base: Sacramental Robe
    mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
  gloves:
    base: Runeforged Vaal Gloves
    mods: [Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
  boots:
    unique: "Bones of Ullr"
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, Energy Shield, Elemental Resistances, Chaos Resistance, +Attributes]
  ring1:
    base: Topaz Ring
    mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
  ring2:
    unique: "Evergrasping Ring"
  belt:
    base: Heavy Belt
    mods: [Elemental Resistances, +Maximum Life, +Strength, Minion Area of Effect]
  weapon2:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
  offhand2:
    unique: Prism Guardian
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence Attack Speed]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Elemental Resistances, Chaos Resistance, Block Chance, +Attributes]
    helmet:
      base: Twig Circlet
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Torn Gloves
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Attributes, Energy Shield]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
    ring2:
      base: Ruby Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes, Chaos Resistance, Mana Regeneration]
    belt:
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, +Maximum Mana, Chaos Resistance]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Allies in Presence Attack Speed, Allies in Presence gain Added Lightning Damage]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage, Elemental Resistances]
    offhand:
      base: Painted Crest Shield
      mods: [Block Chance, +Maximum Life, Chaos Resistance, Elemental Resistances, +Attributes]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances, Energy Shield, Chaos Resistance, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Vaal Gloves
      mods: [Elemental Resistances, Energy Shield, +Maximum Life, +Attributes, Chaos Resistance]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, Elemental Resistances, +Attributes, Chaos Resistance]
    ring1:
      base: Sapphire Ring
      mods: [Elemental Resistances, +Maximum Life, +Attributes, Chaos Resistance]
    ring2:
      base: Topaz Ring
      mods: [Lightning Resistance, +Maximum Life, Chaos Resistance, +Attributes]
    belt:
      base: Fine Belt
      mods: [+Maximum Life, Elemental Resistances, Chaos Resistance, +Strength]
    weapon2:
      unique: Trenchtimbre
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Allies in Presence Attack Speed, +Spirit]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Lightning Damage]
    offhand:
      base: Sacred Focus
      mods: [+Spirit, Elemental Resistances, +Dexterity]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances, +Intelligence]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, Elemental Resistances, Chaos Resistance, +Attributes]
    ring1:
      base: Topaz Ring
      mods: [Increased Minion Damage, Elemental Resistances, +Maximum Life]
    ring2:
      unique: "Evergrasping Ring"
    belt:
      base: Heavy Belt
      mods: [Elemental Resistances, +Maximum Life, +Strength, Minion Area of Effect]
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
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Maximum Life]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Energy Shield, Elemental Resistances]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, +Maximum Life, Elemental Resistances, +Intelligence]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Twisted Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, +All Attributes, Elemental Resistances]
    ring1:
      unique: "Kalandra's Touch"
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, +Maximum Life]
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
    - "Growing Swarm"
    - "Lord of Horrors"
    - "Necrotised Flesh"
    - "Relentless Fallen"
    - "Profane Commander"
    - "Right Hand of Darkness"
    - "Pure Energy"
    - "Enhanced Barrier"
    - "Silent Guardian"
    - "Bringer of Order"
    - "Dampening Shield"
    - "Melding"
    - "Insightfulness"
    - "Dependable Ward"
    - "Entropic Incarnation"
    - "Vile Mending"
    - "Hallowed"
    - "Heavy Buffer"
    - "Mind Over Matter"
    - "Warding Fetish"
    - "Grip of Evil"
    - "Illuminated Crown"
  ascendancy: [Loyal Hellhound, Altered Flesh, Beidat's Will, Beidat's Hand]
---

## How It Works

You play minions from the start. During the campaign, [[Volcano]] summons Raging Spirits, [[Skeletal Sniper]] gives a command skill that hits a wide area, and [[Unearth]] turns corpses into extra minions. [[Elemental Weakness]] and [[Frost Bomb]] make enemies take more damage.

At the end of Act 3 you can switch to Vaal Guard spectres for most of the damage; the source guide also keeps a [[Skeletal Sniper]] path for players who prefer a calmer screen. The Infernalist ascendancy brings Loyal Hellhound, a permanent fire minion that you call with [[Summon Infernal Hound]].

The rest of the army: [[Skeletal Warrior]] and [[Skeletal Brute]] in front, [[Skeletal Storm Mage]] for lightning damage and [[Skeletal Cleric]] to revive. [[Pain Offering]] buffs them and [[Despair]] weakens what they fight.

## Playstyle

**Clear.** Walk with the army and cast [[Unearth]] on corpses.

**Single target.** [[Pain Offering]] on rares and bosses, then mark the boss with [[Skeletal Sniper]]'s command. Use [[Refutation]] before a big hit.

## Defences

Energy shield and block, with [[Convalescence]] for recovery. The minions draw most of the attention.

## Gear Priorities

+Level of all Minion Skills and spirit first. [[Bones of Ullr]] and an [[Evergrasping Ring]] are the source guide's endgame uniques, with [[Prism Guardian]] on the second weapon set.
