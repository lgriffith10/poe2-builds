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
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Xipocado's Soul Core of Dominion: Minions deal 40% increased Damage with Command Skills"]
  offhand:
    base: Painted Crest Shield
    mods: [+Maximum Life, Chaos Resistance, Elemental Resistances]
    runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
  helmet:
    base: Kamasan Tiara
    mods: [+Level of all Minion Skills, Energy Shield, Increased Energy Shield]
    runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
  body:
    unique: Enfolding Dawn
    runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Glacial Rune: +18% to Cold Resistance"]
  gloves:
    base: Vaal Gloves
    mods: [Energy Shield, Increased Energy Shield, +Maximum Life, Cold Resistance]
    runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
  boots:
    unique: Bones of Ullr
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Legacy of Wanderlust"]
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
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Block Chance, Elemental Resistances, Chaos Resistance]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    helmet:
      base: Twig Circlet
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Glacial Rune: +14% to Cold Resistance", "Storm Rune: +14% to Lightning Resistance"]
    gloves:
      base: Torn Gloves
      mods: [Elemental Resistances, +Maximum Life, Energy Shield, +Attributes, Chaos Resistance]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
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
      runes: ["Lesser Resolve Rune: +6 to Intelligence"]
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
  mapping:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, +Spirit, Increased Allies in presence Damage, Critical Damage Bonus]
      runes: ["Xipocado's Soul Core of Dominion: Minions deal 40% increased Damage with Command Skills"]
    offhand:
      base: Painted Crest Shield
      mods: [Block Chance, +Maximum Life, Chaos Resistance, Elemental Resistances, +Attributes]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Glacial Rune: +18% to Cold Resistance"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Greater Desert Rune: +18% to Fire Resistance"]
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
      runes: ["Xipocado's Soul Core of Dominion: Minions deal 40% increased Damage with Command Skills"]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, Increased Cast Speed]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    helmet:
      base: Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
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
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Xipocado's Soul Core of Dominion: Minions deal 40% increased Damage with Command Skills"]
    offhand:
      base: Sacred Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence, Increased Cast Speed]
      runes: ["2× Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Raven-Touched Shard"]
    body:
      base: Sacramental Robe
      mods: [+Spirit, Elemental Resistances, Energy Shield, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Bones of Ullr"
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Legacy of Wanderlust"]
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

## Endgame Progression

**Early maps.**
- Cap resistances and meet attribute requirements first, with + minion levels on sceptre, helmet and amulet, and increased Spirit or + Spirit on body armour, amulet and sceptre to summon more minions.
- A Rattling Sceptre is best, but any Shrine Sceptre works: it gives resistances and runs Upwelling II, Strong Hearted, Cool Headed and Vitality II without extra Spirit. Socket a Xipocado's Soul Core of Dominion or a Primate Talisman (better with sources of increased presence area).
- Energy shield on every armour piece and the amulet, body armour and helmet first. Cast speed helps you use command skills faster.
- Instill Splintering Force on the amulet, then replace Freezing Mark with Skeletal Storm Mage.
- Runeforge Enfolding Dawn. Bones of Ullr for more minions (reservation efficiency and movement speed; the Verisium Anvil adds 5% movement speed). Talisman of Ralakesh in the helmet. Fluxes balance resistances; once capped, Greater Iron Runes add energy shield and a Soul Core of Tacati helps chaos resistance.

**Mid (Chaos Inoculation).**
- Maximum energy shield on every piece. A Sacramental or Vile Robe, Runeforged for more energy shield and Runic Ward. A Farrul's Rune of the Chase in the boots, ideally corrupted with 3-5% extra movement speed.
- A rare ring with "Minions Break Armour equal to #% of Physical damage dealt": with it, instill Warlord Leader instead of Splintering Force. One Evergrasping Ring for extra minion chaos damage (its drawback no longer matters with CI), or a rare ring with several minion modifiers. Prism Guardian for Spirit.

**Late.** Instill Dominion on the amulet. A high energy shield focus with +2 minion levels, Runeforged Bones of Ullr with 14-15% movement speed and 29-30% reservation efficiency, Lavianga's Spirits instead of the Ultimate Mana Flask, Cadigan's Epiphany in the gloves and a Craiceann's Rune of Warding in the body armour.

**Min-max.** A Megalomaniac with Warlord Leader, Zarokh's Gift on the helmet with a Raven-Touched Shard. Powered by Verisium needs Runic Ward on boots, gloves and the helmet or body armour: around 120-150 is enough, so avoid Runeforging items that lose most of their energy shield. Avoid "Minions have +#% to all Elemental Resistances". Mageblood (Quicksilver, Gold, Bismuth) can replace the +2 minion belt; with Quicksilver, put a Farrul's Rune of the Chase in the boots for the movement speed.

## Gear Priorities

+Level of all Minion Skills on sceptre, helmet and amulet comes first, followed by energy shield and resistances. [[Enfolding Dawn]] gives a lot of Spirit for the army, and [[Bones of Ullr]] adds movement speed and reservation efficiency for undead minions. The source guide warns against "Minions have +% to all Elemental Resistances" modifiers on your gear for this setup.

## FAQ

**How do I get the right spectres?** At the end of Act 3, in Utzaal, use [[Bind Spectre]] on a Vaal Guard. Three monsters share that name: a melee one (50 Spirit), a ranged one (60 Spirit) and the one you want, which throws bombs (50 Spirit). In the Interludes, start with Doryani's Contingency: in its second to last area, Etched Ravine, three kinds of Powered Zealot appear, and only the one casting lightning balls (Spark) is worth binding, for 55 Spirit. Wait until you have cut [[Wildshards II]] and [[Pierce III]] before replacing your Vaal Guards. Disenchanting the Vaal Guard spectre gem at the NPC gives back a clean [[Bind Spectre]] with the same level and sockets.

**How do I fix mana problems in the campaign?** Never level [[Volcano]] above level 7, and you can support it with [[Efficiency I]] instead of [[Arcane Surge]]. Support [[Elemental Weakness]] with [[Efficiency I]]; [[Pain Offering]] can take it too.

**Why do I get one-shot with Chaos Inoculation and high energy shield?** Under Chaos Inoculation you cannot have any modifier saying damage taken bypasses energy shield, such as the Heavy Buffer notable. The Mind Over Matter keystone is one way around it: damage is taken from mana before life, at the cost of 50% less mana recovery. Never use a mana flask that removes mana recovered from life when used, like a Caustic Ultimate Mana Flask with that modifier. Before CI, cap elemental resistances at 75% and aim for around 60% chaos resistance; ignore chaos resistance once you have CI.

**Can I replace the Powered Zealots with another spectre?** Yes: they are mainly there for bosses, so another boss-killing spectre works. In Act 1, look for Death Knights in the Cemetery of the Eternals and bind a rare one, since normal and magic ones lack the special skill that greatly boosts single target damage. Support it with [[Muster]], [[Feeding Frenzy II]], [[Rage III]], [[Rapid Attacks II]], and [[Heft]] or [[Brutality III]] (if you have no extra chaos damage) or [[Dialla's Desire]].

**How many of each minion should I use?** It depends on your Spirit. As a guide: one to three [[Skeletal Cleric]]s, up to one [[Skeletal Sniper]] and one [[Skeletal Reaver]], the two [[Skeletal Warrior]]s that come free with your Rattling Sceptre (do not spend Spirit on more), [[Wolf Pack]], and the rest on Powered Zealot spectres.

**How do I get more sockets for my Skeletal Warriors?** With Skeletal Warriors granted by a Rattling Sceptre, the number of support sockets follows the skill level on the sceptre: level 20 allows five supports. A Perfect Jeweller's Orb on the sceptre also adds sockets, except on corrupted or sanctified items.
