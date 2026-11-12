---
title: Minion Army Spirit Walker
class: Huntress
ascendancy: Spirit Walker
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Minion Army Spirit Walker Build Guide"
  author: "helmbreaker (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/minion-army-spirit-walker-build-guide
  updated: 2026-11-06
summary: "Huntress minion commander combining Spirit Walker's Wild Protector with a skeleton army, becoming very tanky after Chaos Inoculation."
tags: [minion, companion, energy shield, league starter]
damage: Physical
playstyle: Minions
difficulty: easy
budget: low
tiers:
  starter: A
  endgame: A
  bossing: A
pros:
  - "Very high damage"
  - "Few buttons once the army is up"
  - "Tanky with Chaos Inoculation"
  - "Switches to minions early, in Act 2"
cons:
  - "Not everyone enjoys minion builds"
  - "Levels without minions in Acts 1 and 2"
  - "Needs a specific tamed companion"
skills:
  - gem: "Wild Protector"
    supports: [Muster, Feeding Frenzy II, Loyalty, Minion Splash II, Rage III]
  - gem: "Pain Offering"
    supports: [Elemental Army, Meat Shield II, Danse Macabre, Prolonged Duration II]
  - gem: "Sniper's Mark"
    supports: [Mark for Death II, Eternal Mark, Charged Mark, Cooldown Recovery II]
  - gem: "Skeletal Warrior"
    supports: [Last Gasp, Deathmarch, Meat Shield II, Blind II]
  - gem: "Skeletal Sniper"
    supports: [Last Gasp, Maim, Blind II, Chain III]
  - gem: "Despair"
    supports: [Heightened Curse, Cursed Ground, Efficiency II, Prolonged Duration II]
  - gem: "Skeletal Cleric"
    supports: [Last Gasp, Meat Shield II, Rapid Casting II, Prolonged Duration II]
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II, Upwelling I]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility]
gemPriority:
  skills:
    - label: "First"
      gems: [Twister, Explosive Grenade]
    - label: ""
      gems: [Flash Grenade, Frost Bomb]
    - label: ""
      gems: [Pain Offering, Freezing Mark, Skeletal Sniper]
  spirit:
    - label: "ACT I (The King in The Mist)"
      gems: [War Banner]
    - label: "ACT II ( Golden Tomb)"
      gems: [Withering Presence]
  supports:
    - label: "Act I"
      gems: [Multishot I, Lightning Attunement, Elemental Armament I, Rapid Attacks I, Prolonged Duration I, Last Gasp]
    - label: "Act Ii"
      gems: [Short Fuse I, Minion Splash I, Upwelling I, Mark for Death, Danse Macabre, Meat Shield I, Maim, Last Gasp]
leveling:
  - name: "Campaign Crossbow"
    steps:
      - name: "Act 1 Spear start"
        skills:
          - gem: "Whirling Slash"
          - gem: "Twister"
      - name: "Act 1 Crossbow step 1"
        skills:
          - gem: "Crossbow Shot"
          - gem: "Explosive Grenade"
            supports: [Multishot I, Elemental Armament I]
          - gem: "Frost Bomb"
          - gem: "Flash Grenade"
            supports: [Multishot I, Lightning Attunement]
      - name: "Act 1 Crossbow step 2"
        skills:
          - gem: "Crossbow Shot"
            supports: [Multishot I, Rapid Attacks I]
          - gem: "Explosive Grenade"
            supports: [Multishot I, Elemental Armament I]
          - gem: "Frost Bomb"
          - gem: "Flash Grenade"
            supports: [Multishot I, Lightning Attunement]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
      - name: "Act 2 & New Support"
        skills:
          - gem: "Crossbow Shot"
            supports: [Multishot I, Rapid Attacks I]
          - gem: "Explosive Grenade"
            supports: [Multishot I, Short Fuse I]
          - gem: "Frost Bomb"
          - gem: "Flash Grenade"
            supports: [Multishot I, Lightning Attunement]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
    rotations:
      - name: "Spear Twister"
        steps:
          - gem: "Whirling Slash"
            count: 3
            label: "3x Slash & Twister"
          - gem: "Twister"
      - name: "Bossing"
        steps:
          - gem: "Frost Bomb"
            label: "Pre-cast"
          - gem: "War Banner"
          - gem: "Explosive Grenade"
            label: "On cooldown"
          - gem: "Flash Grenade"
          - gem: "Crossbow Shot"
      - name: "Clearing"
        steps:
          - gem: "Flash Grenade"
          - gem: "Explosive Grenade"
          - gem: "Crossbow Shot"
  - name: "Campaign Twister"
    steps:
      - name: "Act 1 Step 1"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I]
          - gem: "Frost Bomb"
          - gem: "Fangs of Frost"
      - name: "Act 1 Step 2"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Prolonged Duration I]
          - gem: "Frost Bomb"
          - gem: "Fangs of Frost"
            supports: [Elemental Armament I]
          - gem: "Barrage"
      - name: "Act 1 Step 3"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Prolonged Duration I]
          - gem: "Frost Bomb"
          - gem: "Fangs of Frost"
            supports: [Elemental Armament I]
          - gem: "Barrage"
          - gem: "War Banner"
            supports: [Prolonged Duration I]
      - name: "Act 2 & New Supports"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Frost Nexus]
          - gem: "Barrage"
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Prolonged Duration I]
          - gem: "Ice-Tipped Arrows"
            supports: [Elemental Armament I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Lightning Attunement]
          - gem: "Herald of Ice"
    rotations:
      - name: "Act 1 Bossing"
        steps:
          - gem: "Frost Bomb"
          - gem: "Parry"
          - gem: "Fangs of Frost"
          - gem: "Whirling Slash"
            count: 3
            label: "3x Slash & Twister"
          - gem: "Twister"
      - name: "Act 2 Bossing"
        steps:
          - gem: "Ice-Tipped Arrows"
          - gem: "Freezing Mark"
          - gem: "Barrage"
          - gem: "Whirling Slash"
            count: 3
            label: "3x Slash & Twister"
          - gem: "Twister"
      - name: "Map Clear"
        steps:
          - gem: "Ice-Tipped Arrows"
          - gem: "Whirling Slash"
            count: 3
            label: "3x Slash & Twister"
          - gem: "Twister"
  - name: "Campaign Minions (level 22)"
    steps:
      - name: "Act 2 & Bear Asendancy"
        skills:
          - gem: "Wild Protector"
            supports: [Minion Splash I, Lightning Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp]
          - gem: "Pain Offering"
            supports: [Meat Shield I, Danse Macabre]
          - gem: "Freezing Mark"
            supports: [Mark for Death]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp]
          - gem: "Withering Presence"
            supports: [Upwelling I, Prolonged Duration I]
      - name: "Act 2 Chaos DMG Notable"
        skills:
          - gem: "Wild Protector"
            supports: [Minion Splash I, Lightning Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield I]
          - gem: "Pain Offering"
            supports: [Meat Shield I, Danse Macabre, Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Mark for Death, Prolonged Duration I]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim]
          - gem: "Withering Presence"
            supports: [Upwelling I, Prolonged Duration I]
          - gem: "Despair"
      - name: "Act 3 & Before Monkey"
        skills:
          - gem: "Wild Protector"
            supports: [Minion Splash I, Feeding Frenzy I, Lightning Attunement]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield I]
          - gem: "Pain Offering"
            supports: [Meat Shield I, Danse Macabre, Prolonged Duration I]
          - gem: "Sniper's Mark"
            supports: [Mark for Death, Eternal Mark]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim]
          - gem: "Withering Presence"
            supports: [Upwelling I, Prolonged Duration I]
          - gem: "Despair"
      - name: "Act 3 & 2nd Ascendancy"
        skills:
          - gem: "Wild Protector"
            supports: [Muster, Minion Splash I, Feeding Frenzy I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield I]
          - gem: "Pain Offering"
            supports: [Meat Shield I, Danse Macabre, Prolonged Duration I]
          - gem: "Sniper's Mark"
            supports: [Mark for Death, Eternal Mark, Second Wind I]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim]
          - gem: "Withering Presence"
            supports: [Upwelling I, Prolonged Duration I]
          - gem: "Wolf Pack"
            supports: [Loyalty, Deathmarch, Muster]
          - gem: "Despair"
      - name: "Act 4 New Supports"
        skills:
          - gem: "Wild Protector"
            supports: [Muster, Feeding Frenzy II, Minion Splash I]
          - gem: "Wolf Pack"
            supports: [Loyalty, Muster, Pin II, Feeding Frenzy II]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Danse Macabre, Prolonged Duration I]
          - gem: "Sniper's Mark"
            supports: [Mark for Death, Eternal Mark, Second Wind II]
          - gem: "Withering Presence"
            supports: [Upwelling I, Prolonged Duration II]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield II, Deathmarch]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim, Chain II]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II]
          - gem: "Despair"
            supports: [Heightened Curse, Cursed Ground, Efficiency II]
      - name: "Interludes"
        skills:
          - gem: "Wild Protector"
            supports: [Muster, Feeding Frenzy II, Rage III, Minion Splash II]
          - gem: "Wolf Pack"
            supports: [Loyalty, Muster, Pin II, Feeding Frenzy II]
          - gem: "Pain Offering"
            supports: [Meat Shield II, Danse Macabre, Prolonged Duration II, Elemental Army]
          - gem: "Sniper's Mark"
            supports: [Mark for Death, Eternal Mark, Charged Mark, Second Wind II]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II, Upwelling I]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Meat Shield II, Deathmarch]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Chain II, Maim]
          - gem: "Despair"
            supports: [Heightened Curse, Cursed Ground, Efficiency II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Meat Shield II, Rapid Casting II]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II]
      - name: "Early Maps"
        skills:
          - gem: "Wild Protector"
            supports: [Muster, Feeding Frenzy II, Loyalty, Minion Splash II, Rage III]
          - gem: "Pain Offering"
            supports: [Elemental Army, Meat Shield II, Danse Macabre, Prolonged Duration II]
          - gem: "Sniper's Mark"
            supports: [Mark for Death II, Eternal Mark, Charged Mark, Cooldown Recovery II]
          - gem: "Skeletal Warrior"
            supports: [Last Gasp, Deathmarch, Meat Shield II, Blind II]
          - gem: "Skeletal Sniper"
            supports: [Last Gasp, Maim, Blind II, Chain III]
          - gem: "Despair"
            supports: [Heightened Curse, Cursed Ground, Efficiency II, Prolonged Duration II]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Meat Shield II, Rapid Casting II, Prolonged Duration II]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II, Upwelling I]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility]
    rotations:
      - name: "Wild Protector & Minions"
        steps:
          - gem: "Pain Offering"
            label: "Buff"
          - gem: "Freezing Mark"
            label: "Armour Break"
          - gem: "Sniper's Mark"
          - gem: "Despair"
            label: "Debuff"
          - gem: "Refutation"
            label: "Defensive skill"
rotations:
  - name: "Wild Protector & Minions"
    steps:
      - gem: "Pain Offering"
        label: "Buff"
      - gem: "Sniper's Mark"
        label: "Armour Break"
      - gem: "Despair"
        label: "Debuff"
      - gem: "Refutation"
        label: "Defensive skill"
gear:
  weapon:
    unique: "Tyranny's Grip"
    runes: ["Greater Iron Rune: 18% increased Physical Damage"]
  offhand:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage, Critical Damage Bonus, +Spirit]
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Hawk Idol: Companions have 12% increased Attack Speed"]
  helmet:
    base: Runeforged Kamasan Tiara
    mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
    runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
  body:
    base: Sleek Jacket
    mods: [Evasion and Energy Shield, Energy Shield, Evasion Rating, +Spirit, Elemental Resistances, +Intelligence]
    runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
  gloves:
    base: Runeforged Vaal Gloves
    mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
    runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
  boots:
    base: Luxurious Slippers
    mods: [Movement Speed, Energy Shield, Elemental Resistances, +Intelligence]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
  amulet:
    base: Amber Amulet
    mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
  ring1:
    base: Sapphire Ring
    mods: [+Maximum Life, Elemental Resistances, +Attributes]
  ring2:
    base: Topaz Ring
    mods: [+Maximum Life, Elemental Resistances, +Attributes]
  belt:
    base: Fine Belt
    mods: [Elemental Resistances, +Strength, +Maximum Life, Armour, Minion Melee Splash]
  weapon2:
    unique: Trenchtimbre
    runes: ["Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
  offhand2:
    base: Rattling Sceptre
    mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence Attack Speed]
    runes: ["Hawk Idol: Companions have 12% increased Attack Speed"]
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Lightning Damage, Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Cold Damage, Allies in Presence gain Added Fire Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Emblem Crest Shield
      mods: [+Maximum Life, Block Chance, Elemental Resistances, Chaos Resistance]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    helmet:
      base: Runeforged Brimmed Helm
      mods: [+Level of all Minion Skills, Elemental Resistances, +Maximum Life, Energy Shield, +Intelligence]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      unique: "Enfolding Dawn"
      runes: ["Glacial Rune: +14% to Cold Resistance", "Storm Rune: +14% to Lightning Resistance"]
    gloves:
      base: Runeforged Rope Cuffs
      mods: [Elemental Resistances, +Maximum Life, Energy Shield, +Attributes, Chaos Resistance]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      base: Runeforged Steelpoint Shoes
      mods: [Movement Speed, +Maximum Life, Elemental Resistances]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
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
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance, +Strength]
    weapon2:
      unique: Trenchtimbre
      runes: ["Lesser Resolve Rune: +6 to Intelligence"]
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Lightning Damage, Allies in Presence Attack Speed]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
  mapping:
    weapon:
      unique: "Tyranny's Grip"
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    offhand:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence Attack Speed, Allies in Presence gain Added Physical Damage, Critical Damage Bonus, +Spirit]
      runes: ["Hawk Idol: Companions have 12% increased Attack Speed"]
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Elemental Resistances, Energy Shield, +Maximum Life, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Sleek Jacket
      mods: [Evasion and Energy Shield, Energy Shield, Evasion Rating, +Spirit, Elemental Resistances, +Intelligence]
      runes: ["2× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Life, +Attributes]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Luxurious Slippers
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Maximum Life, +Attributes]
    ring1:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes]
    ring2:
      base: Topaz Ring
      mods: [+Maximum Life, Elemental Resistances, +Attributes]
    belt:
      base: Fine Belt
      mods: [Elemental Resistances, +Strength, +Maximum Life, Armour, Minion Melee Splash]
    weapon2:
      unique: Trenchtimbre
      runes: ["Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
    offhand2:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence Attack Speed]
      runes: ["Hawk Idol: Companions have 12% increased Attack Speed"]
  endgame:
    weapon:
      unique: "Trenchtimbre"
      runes: ["2× Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
    offhand:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence Attack Speed, Critical Damage Bonus]
      runes: ["Hawk Idol: Companions have 12% increased Attack Speed"]
    helmet:
      base: Runeforged Kamasan Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Sleek Jacket
      mods: [Evasion and Energy Shield, Energy Shield, Evasion Rating, +Spirit, Deflection, Elemental Resistances]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      base: Luxurious Slippers
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Minion Skills, +Spirit, Elemental Resistances, Energy Shield, +Attributes]
    ring1:
      base: Topaz Ring
      mods: [Increased Minion Damage, Critical Damage Bonus, Elemental Resistances, +Attributes]
    ring2:
      unique: "Evergrasping Ring"
    belt:
      base: Heavy Belt
      mods: [Minion Melee Splash, Elemental Resistances, +Strength, Armour, Minion Life]
  minmax:
    weapon:
      unique: "Trenchtimbre"
      runes: ["3× Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
    offhand:
      base: Rattling Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, Allies in Presence gain Added Physical Damage, Allies in Presence Attack Speed, +Spirit]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Hawk Idol: Companions have 12% increased Attack Speed"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Raven-Touched Shard"]
    body:
      base: Falconer's Jacket
      mods: [Evasion and Energy Shield, Energy Shield, Deflection, Elemental Resistances, +Spirit, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Runeforged Vaal Gloves
      mods: [Energy Shield, Elemental Resistances, +Attributes]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      base: Runeforged Sandsworn Sandals
      mods: [Movement Speed, Energy Shield, +Attributes]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Legacy of Wanderlust"]
    amulet:
      base: Distorted Amulet
      mods: [+Level of all Minion Skills, +Spirit, Energy Shield, +Attributes, Elemental Resistances]
    ring1:
      unique: "Kalandra's Touch"
    ring2:
      base: Ruby Ring
      mods: [Increased Minion Damage, Critical Damage Bonus, Elemental Resistances]
    belt:
      base: Fine Belt
      mods: [+Level of all Minion Skills, Minion Melee Splash, Elemental Resistances, Armour, Minion Life]
    weapon2:
      base: Grand Spear
      mods: [Increased Physical Damage, Adds Physical Damage, Accuracy Rating, Increased Attack Speed]
      runes: ["2× Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
passives:
  attribute: str
  path:
    - "Bond of the Cat"
    - "Bond of the Wolf"
    - "Bond of the Ape"
    - "Blur"
    - "Bond of the Mamba"
    - "Inspiring Ally"
    - "Easy Going"
    - "Unspoken Bond"
    - "Trusted Kinship"
    - "Long Distance Relationship"
    - "Sturdy Ally"
    - "Captivating Companionship"
    - "Bond of the Owl"
    - "Nourishing Ally"
    - "Sic 'Em"
    - "Enhanced Reflexes"
    - "Beastial Skin"
    - "Spectral Ward"
    - "First Principle of the Hollow"
    - "First Teachings of the Keeper"
    - "The Hollowkeeper"
    - "Shimmering"
    - "Immaterial"
  ascendancy: [Wild Protector, The Natural Order, The Catha's Balance]
---
## How It Works

Spirit Walker's [[Wild Protector]] and the ascendancy notables The Natural Order and The Catha's Balance strengthen your companions, while a skeleton army ([[Skeletal Warrior]], [[Skeletal Sniper]], [[Skeletal Cleric]]) and a tamed companion do the fighting. [[Pain Offering]] buffs the army, [[Despair]] and [[Sniper's Mark]] weaken targets.

## Leveling

The first levels use [[Twister]] with [[Whirling Slash]]. As soon as you find a crossbow, switch to grenades: [[Explosive Grenade]] for wide fire damage (add [[Multishot I]] early) and Flash Grenade for weaker groups and stuns. [[Frost Bomb]] applies exposure, and [[War Banner]] is a big single-target boost once you have a spirit gem. The source guide switches to minions in Act 2.

## Playstyle

**Minions.** Cast [[Pain Offering]] on a [[Skeletal Warrior]] or [[Skeletal Sniper]] to boost the whole army, mark bosses with [[Sniper's Mark]] and let the minions work.

## Companions

Your strongest damage dealer is a beast you capture with [[Tame Beast]]: bring a rare beast low, use the skill on it, and it becomes a "Companion" skill gem that keeps the beast's rare modifiers. Turn your own minions off before you start, or they will kill the beast before you can tame it.

**Main companion.** The Natural Order (second ascendancy) lets [[Tame Beast]] capture unique beast bosses. Once you also have the Easy Going notable and the Trusted Kinship keystone, tame the **Mighty Silverfist** in the **Jungle Ruins** (Act 3). In maps, replace it with **Zekoa, the Headcrusher** (Rupture and Riverside maps), ideally with several rare modifiers, "Extra Crits" first. Vaal City maps with rare tablets that add unique monsters are another way to find this boss type (the **Croilla Sergeant**).

**Second companion.** During the campaign, [[Wolf Pack]] is the simple choice. After the campaign, go to the "Troubled Camp" in the **Infested Barrens**: one or two rare beasts spawn near the checkpoint. Use "Respawn at checkpoint" to reroll their modifiers until one has **Haste Aura** (not "Hasted"), tame it and support it with [[Loyalty]].

Gemcutter's Prisms on both Companion gems lower the Spirit they reserve.

## Gear Priorities

Minion levels and energy shield. Recommended jewel modifiers: minion critical damage and chance, increased maximum energy shield, presence area of effect and minion damage. [[Tyranny's Grip]] is the source guide's weapon.
