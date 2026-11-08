---
title: Djinn Minion Disciple of Varashta
class: Sorceress
ascendancy: Disciple of Varashta
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Disciple of Varashta Minion Build Guide
  author: Helmbreaker (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/disciple-of-varashta-minion-build-guide
  updated: 2026-11-06
summary: Sorceress minion army led by the djinn Kelari and Ruzhan, whose command skills deliver huge physical and fire bursts while skeletons hold the line.
tags: [minion, djinn, energy shield, commands]
damage: Physical / Fire
playstyle: Minions
difficulty: medium
budget: low
tiers:
  starter: S
  endgame: A
  bossing: S
pros:
  - Very tanky energy shield character
  - Very high damage from the djinn command skills
cons:
  - Many buttons to press for full damage
  - Lots of minions on screen hurt visual clarity
skills:
  - gem: Kelari, the Tainted Sands
    supports: [Muster, Bidding II, Brutality III, Heft, Minion Mastery]
    note: Djinn whose commands deal high physical area damage
  - gem: Ruzhan, the Blazing Sword
    supports: [Muster, Long Fuse II, Bidding II, Magnified Area II, Fire Attunement]
    note: Fire djinn; Ruzhan's Trap creates fire tornadoes
  - gem: Frost Bomb
    supports: [Long Fuse II, Spell Echo, Overabundance II, Potent Exposure]
    note: Applies exposure and makes Ruzhan attack
  - gem: Pain Offering
    supports: [Elemental Army, Meat Shield II, Danse Macabre, Prolonged Duration II]
    note: Minion damage buff for large packs and bosses
  - gem: Elemental Weakness
    supports: [Efficiency II, Heightened Curse, Cursed Ground, Prolonged Duration II]
    note: Curse bosses before the fight
  - gem: Skeletal Warrior
    supports: [Last Gasp, Meat Shield II, Deathmarch]
    note: Front line
  - gem: Skeletal Cleric
    supports: [Last Gasp, Rapid Casting II, Meat Shield II]
    note: Revives minions
  - gem: Skeletal Reaver
    supports: [Last Gasp, Muster, Rage III, Feeding Frenzy II]
  - gem: Skeletal Storm Mage
    supports: [Muster, Shock, Overcharge, Feeding Frenzy II]
  - gem: Skeletal Sniper
    supports: [Last Gasp, Maim, Chain III]
  - gem: Wolf Pack
    supports: [Muster, Last Gasp, Loyalty, Rage III, Feeding Frenzy II]
gemPriority:
  skills:
    - label: "First    (Max level 7 Volcano)"
      gems: [Volcano, Skeletal Sniper]
    - label: ""
      gems: [Unearth, Contagion, Frost Bomb]
    - label: ""
      gems: [Skeletal Arsonist, Freezing Mark, Skeletal Reaver, Skeletal Sniper, Pain Offering, Skeletal Storm Mage]
    - label: "Act 4 (Use one or two)"
      gems: [Skeletal Cleric]
    - label: "Swap to Powered Zealot Spectres in the Interlude"
      gems: [Bind Spectre, Elemental Weakness]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [Raging Spirits]
    - label: "ACT II (Golden Tomb)"
      gems: [Raging Spirits]
    - label: "ACT III (The Azak Bog Witch)"
      gems: [Wolf Pack]
  supports:
    - label: "Act I"
      gems: [Multishot I, Fire Attunement, Ignite I, Last Gasp, Arcane Surge, Lightning Attunement, Rapid Casting I]
    - label: "Act II"
      gems: [Multishot II, Bidding I, Elemental Armament II, Mark for Death, Armour Demolisher I, Fire Attunement, Last Gasp]
    - label: "Act Iii"
      gems: [Muster, Bidding I, Loyalty, Last Gasp]
    - label: ""
      gems: [Last Gasp, Meat Shield II]
    - label: "Act 4"
      gems: [Bidding II, Long Fuse I, Feeding Frenzy II, Danse Macabre, Meat Shield II, Elemental Army, Muster]
    - label: "Interludes"
      gems: [Pierce III, Wildshards II, Brutality III, Maim, Cursed Ground, Heightened Curse, Efficiency II, Chain III, Mobility, Heft]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1 Step 1"
        skills:
          - gem: "Firebolt"
          - gem: "Spark"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I]
          - gem: "Skeletal Warrior"
          - gem: "Unearth"
      - name: "Act 1 Step 2"
        skills:
          - gem: "Unearth"
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Fire Attunement]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Contagion"
          - gem: "Frost Bomb"
      - name: "Act 1 Step 3"
        skills:
          - gem: "Unearth"
            supports: [Lightning Attunement, Rapid Casting I]
          - gem: "Skeletal Sniper"
            supports: [Multishot I, Last Gasp]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp]
          - gem: "Frost Bomb"
      - name: "Act 2 & Snipers"
        skills:
          - gem: "Unearth"
            supports: [Lightning Attunement, Rapid Casting I]
          - gem: "Volcano"
            supports: [Ignite I, Arcane Surge]
          - gem: "Skeletal Warrior"
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp, Elemental Armament II]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Multishot II]
          - gem: "Frost Bomb"
      - name: "Act 2 & Djinns"
        skills:
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Raging Spirits"
            supports: [Fire Attunement, Last Gasp, Elemental Armament II]
          - gem: "Skeletal Arsonist"
            supports: [Multishot II, Last Gasp, Fire Attunement]
          - gem: "Kelari, the Tainted Sands"
            supports: [Bidding I, Lightning Attunement]
          - gem: "Frost Bomb"
          - gem: "Freezing Mark"
            supports: [Mark for Death, Armour Demolisher I]
      - name: "Act 3 & New Supports"
        skills:
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Skeletal Arsonist"
            supports: [Multishot II, Last Gasp, Muster]
          - gem: "Ruzhan, the Blazing Sword"
            supports: [Muster, Bidding I, Fire Attunement]
          - gem: "Kelari, the Tainted Sands"
            supports: [Bidding I, Lightning Attunement, Muster]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Loyalty, Muster]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp]
          - gem: "Freezing Mark"
            supports: [Mark for Death, Armour Demolisher I]
          - gem: "Skeletal Storm Mage"
            supports: [Last Gasp]
          - gem: "Pain Offering"
            supports: [Meat Shield II]
      - name: "Act 4 & Vaal Guards"
        skills:
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Ruzhan, the Blazing Sword"
            supports: [Muster, Bidding II, Long Fuse I]
          - gem: "Kelari, the Tainted Sands"
            supports: [Lightning Attunement, Bidding II, Muster]
          - gem: "Wolf Pack"
            supports: [Last Gasp, Loyalty, Muster]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Muster]
          - gem: "Freezing Mark"
            supports: [Mark for Death, Armour Demolisher I]
          - gem: "Skeletal Storm Mage"
            supports: [Last Gasp]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Danse Macabre]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Meat Shield II]
      - name: "Interludes Powered Zealots"
        skills:
          - gem: "Volcano"
            supports: [Arcane Surge, Rapid Casting I, Mobility]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield II]
          - gem: "Ruzhan, the Blazing Sword"
            supports: [Muster, Long Fuse II, Bidding II, Fire Attunement]
          - gem: "Kelari, the Tainted Sands"
            supports: [Muster, Bidding II, Brutality III, Heft]
          - gem: "Wolf Pack"
            supports: [Muster, Loyalty, Last Gasp, Feeding Frenzy II]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim, Chain III]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Muster, Feeding Frenzy II]
          - gem: "Freezing Mark"
            supports: [Mark for Death, Armour Demolisher I]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Efficiency II, Heightened Curse]
      - name: "Early Maps"
        skills:
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield II, Deathmarch]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre, Prolonged Duration II]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Heightened Curse, Cursed Ground, Prolonged Duration II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Frost Bomb"
            supports: [Long Fuse II, Spell Echo, Overabundance II, Potent Exposure]
          - gem: "Ruzhan, the Blazing Sword"
            supports: [Muster, Long Fuse II, Bidding II, Magnified Area II, Fire Attunement]
          - gem: "Kelari, the Tainted Sands"
            supports: [Muster, Bidding II, Brutality III, Heft, Minion Mastery]
          - gem: "Wolf Pack"
            supports: [Muster, Last Gasp, Loyalty, Rage III, Feeding Frenzy II]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim, Chain III]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Muster, Rage III, Feeding Frenzy II]
          - gem: "Skeletal Storm Mage"
            supports: [Muster, Shock, Overcharge, Feeding Frenzy II]
    rotations:
      - name: "Act1 Step 1 & 2"
        steps:
          - gem: "Volcano"
            label: "Command skill"
          - gem: "Skeletal Sniper"
          - gem: "Spark"
            label: "Aoe dmg"
          - gem: "Contagion"
          - gem: "Unearth"
            label: "Corpses"
          - gem: "Frost Bomb"
            label: "Bosses/rares"
      - name: "Act 1 - 2"
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
      - name: "Djinns Clearing"
        steps:
          - gem: "Kelari's Deception"
            label: "Clearing djinn skills"
          - gem: "Ruzhan's Trap"
          - gem: "Kelari, the Tainted Sands"
          - gem: "Volcano"
            label: "Ruzhan attack"
          - gem: "Ruzhan, the Blazing Sword"
      - name: "Djinns Bossing"
        steps:
          - gem: "Ruzhan's Trap"
            label: "Pre-cast before fight starts"
          - gem: "Pain Offering"
          - gem: "Freezing Mark"
            label: "Cast Mark and two Kelaris Brutality at the start of the fight"
          - gem: "Kelari, the Tainted Sands"
          - gem: "Kelari's Deception"
            label: "Cast 3x in a row"
          - gem: "Volcano"
            label: "Keep casting"
          - gem: "Kelari, the Tainted Sands"
          - gem: "Kelari's Deception"
          - gem: "Ruzhan's Trap"
rotations:
  - name: "Clearing"
    steps:
      - gem: "Ruzhan's Trap"
        label: "Main clearing skills"
      - gem: "Kelari's Deception"
      - gem: "Frost Bomb"
      - gem: "Kelari, the Tainted Sands"
        label: "Kelari's Brutality"
      - gem: "Pain Offering"
        count: 3
        label: "Buff on abysses and breaches"
  - name: "Bossing"
    steps:
      - gem: "Elemental Weakness"
        label: "Pre-cast before fight & Keep up at all times"
      - gem: "Pain Offering"
      - gem: "Ruzhan's Trap"
      - gem: "Frost Bomb"
      - gem: "Kelari, the Tainted Sands"
        label: "Cast Brutality at the start of the fight"
      - gem: "Kelari's Deception"
        label: "Skills to cast during fight"
      - gem: "Kelari, the Tainted Sands"
      - gem: "Frost Bomb"
      - gem: "Ruzhan's Trap"
gear:
  weapon:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, Allies in Presence deal Increased Damage, Allies in Presence Critical Damage Bonus, Increased Spirit, Presence Area]
  offhand:
    base: Painted Crest Shield
    mods: [+Maximum Life, Chaos Resistance, Elemental Resistances]
  helmet:
    base: Kamasan Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Increased Energy Shield]
  body:
    unique: Enfolding Dawn
  gloves:
    base: Vaal Gloves
    mods: [Energy Shield, Increased Energy Shield, +Maximum Life, Cold Resistance]
  boots:
    unique: Bones of Ullr
  amulet:
    base: Lapis Amulet
    mods: [+Level of all Minion Skills, Increased Energy Shield, Fire Resistance]
  ring1:
    base: Sapphire Ring
    mods: [+Maximum Life, Minions deal Increased Damage, Cold Resistance]
  ring2:
    base: Topaz Ring
    mods: [+Maximum Life, Minions deal Increased Damage, Lightning Resistance]
  belt:
    base: Double Belt
    mods: [Increased Damage with Command Skills, +Maximum Life, Fire Resistance]
  weapon2:
    base: Chiming Staff
    mods: [+Level of all Spell Skills]
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Allies in Presence gain Added Fire Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Lightning Damage]
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
      mods: [Block Chance, +Maximum Life, Chaos Resistance, Elemental Resistances, +Attributes]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Lapis Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes, +Maximum Life]
    ring1:
      base: Sapphire Ring
      mods: [Elemental Resistances, Increased Minion Damage, +Attributes, +Maximum Life]
    ring2:
      base: Topaz Ring
      mods: [Elemental Resistances, Increased Minion Damage, +Attributes, +Maximum Life]
    belt:
      base: Double Belt
      mods: [Increased Minion commanded skill Damage, Elemental Resistances, +Maximum Life, +Strength, Minion Area of Effect]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
  endgame:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, Increased Cast Speed]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      unique: "Evergrasping Ring"
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Critical Damage Bonus]
    belt:
      base: Heavy Belt
      mods: [Increased Minion commanded skill Damage, Elemental Resistances, Minion Area of Effect, +Strength]
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
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, Increased Cast Speed]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
    boots:
      unique: "Bones of Ullr"
    amulet:
      base: Portent Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      base: Ruby Ring
      mods: [Increased Minion Damage, Critical Damage Bonus]
    ring2:
      base: Topaz Ring
      mods: [Increased Minion Damage, Critical Damage Bonus]
    belt:
      base: Heavy Belt
      mods: [+Level of all Minion Skills, Increased Minion commanded skill Damage, Minion Area of Effect, Elemental Resistances]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills]
    offhand2:
      unique: Prism Guardian
passives:
  attribute: int
  path:
    - Gigantic Following
    - At your Command
    - Puppet Master chance
    - Lord of Horrors
    - Archon of Undeath
    - Necrotic Touch
    - Grip of Evil
    - Right Hand of Darkness
    - Restless Dead
    - Growing Swarm
    - Enduring Archon
    - Resurging Archon
    - Dampening Shield
    - Rapid Recharge
    - Pure Energy
    - Ingenuity
    - Enhanced Barrier
    - Melding
    - Crystalline Flesh
    - Insightfulness
  ascendancy: [Barya of Kelari, Kelari's Deception, Barya of Ruzhan, Ruzhan's Trap, The Fourth Teaching, Sacred Rituals]
---

## How It Works

The Disciple of Varashta binds djinn to her service. Barya of Kelari and Kelari's Deception unlock the command skills of [[Kelari, the Tainted Sands]], who deals large physical area bursts. Barya of Ruzhan brings [[Ruzhan, the Blazing Sword]], who attacks whenever you cast a damaging spell such as [[Frost Bomb]], and whose Ruzhan's Trap command lays traps that spawn fire tornadoes. A skeleton army and [[Wolf Pack]] fill out the ranks and keep enemies busy.

Defensively, the build is built on energy shield: The Fourth Teaching improves energy shield recharge and Sacred Rituals reduces physical damage taken. The source guide later moves to Chaos Inoculation around level 83, once you have roughly 5,000 to 6,000 energy shield.

## Playstyle

**Mapping.**

1. Command Ruzhan's Trap to scatter fire tornado traps ahead of you.
2. Throw [[Frost Bomb]] on packs for exposure and to make Ruzhan strike.
3. Command Kelari's Deception on rares (consecutive casts deal more damage), and Kelari's Brutality when the others are on cooldown.
4. Use [[Pain Offering]] on very large packs.

**Bossing.** Before the fight, curse with [[Elemental Weakness]], cast [[Pain Offering]] and lay Ruzhan's traps. Then cycle [[Frost Bomb]] and Kelari's commands.

## Gear Priorities

+Level of all Minion Skills on sceptre, helmet and amulet comes first, followed by energy shield and resistances. [[Enfolding Dawn]] gives a lot of Spirit for the army, and [[Bones of Ullr]] adds movement speed and reservation efficiency for undead minions. The source guide warns against "Minions have +% to all Elemental Resistances" modifiers on your gear for this setup.
