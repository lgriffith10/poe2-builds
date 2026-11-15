---
title: Companion Spirit Walker
class: Huntress
ascendancy: Spirit Walker
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Companion Spirit Walker Build Guide"
  author: "zizaran (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/companion-spirit-walker-build-guide
  updated: 2026-09-17
summary: "Spirit Walker who tames the Mighty Silverfist boss as a companion and lets it slam everything, with a skeleton army and marks in support."
tags: [companion, minion, league starter]
damage: Physical
playstyle: Companion
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - "Very simple, hands-off playstyle"
  - "No unique required to function"
  - "Huge companion damage with Tyranny's Grip"
cons:
  - "Levels with grenades until Act 3"
  - "Taming a strong boss takes some hunting"
skills:
  - gem: "Spear Stab"
    supports: [Rapid Attacks II, Multishot I]
  - gem: "Wild Protector"
    supports: [Rage III, Hulking Minions, Romira's Requital, Rapid Attacks II]
  - gem: "Skeletal Warrior"
    supports: []
  - gem: "Skeletal Reaver"
    supports: []
  - gem: "Sniper's Mark"
    supports: [Mark for Death, Eternal Mark, Charged Mark]
  - gem: "Pounce"
    supports: [Holy Descent, Blind II]
  - gem: "Refutation"
    supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility]
  - gem: "Skeletal Sniper"
    supports: []
  - gem: "Pain Offering"
    supports: [Prolonged Duration II, Efficiency II, Danse Macabre]
  - gem: "Skeletal Cleric"
    supports: []
gemPriority:
  skills:
    - label: "Grenades"
      gems: [Explosive Grenade, Frost Bomb, Flash Grenade]
    - label: "Minion Swap"
      gems: [Tame Beast, Pain Offering, Sniper's Mark]
  spirit:
    - label: "Grenades"
      gems: [Attrition]
    - label: "Minion Swap"
      gems: [Magma Barrier]
  supports:
    - label: "Grenades"
      gems: [Multishot I, Elemental Armament I, Magnified Area I]
    - label: "Minion Swap"
      gems: [Rapid Attacks II, Rage I, Minion Splash I, Eternal Mark, Mark for Death II]
leveling:
  - name: "Early Leveling"
    steps:
      - name: "Early Leveling"
        skills:
          - gem: "Crossbow Shot"
            supports: [Multishot I, Rapid Attacks I]
          - gem: "Explosive Grenade"
            supports: [Multishot I, Elemental Armament I]
          - gem: "Flash Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Frost Bomb"
          - gem: "Attrition"
      - name: "Minion Swap"
        skills:
          - gem: "Skeletal Warrior"
          - gem: "Sniper's Mark"
            supports: [Eternal Mark, Mark for Death II, Charged Mark]
          - gem: "Magma Barrier"
          - gem: "Pounce"
            supports: [Holy Descent, Blind II]
          - gem: "Pain Offering"
            supports: [Prolonged Duration II, Efficiency II]
      - name: "40+"
        skills:
          - gem: "Skeletal Warrior"
          - gem: "Tame Beast"
          - gem: "Sniper's Mark"
            supports: [Eternal Mark, Mark for Death II, Charged Mark]
          - gem: "Magma Barrier"
          - gem: "Pounce"
            supports: [Holy Descent, Blind II]
          - gem: "Pain Offering"
            supports: [Prolonged Duration II, Efficiency II, Meat Shield II]
      - name: "Endgame"
        skills:
          - gem: "Spear Stab"
            supports: [Rapid Attacks II, Multishot I]
          - gem: "Wild Protector"
            supports: [Rage III, Hulking Minions, Romira's Requital, Rapid Attacks II]
          - gem: "Skeletal Warrior"
          - gem: "Skeletal Reaver"
          - gem: "Sniper's Mark"
            supports: [Mark for Death, Eternal Mark, Charged Mark]
          - gem: "Pounce"
            supports: [Holy Descent, Blind II]
          - gem: "Refutation"
            supports: [Prolonged Duration II, Cooldown Recovery II, Rapid Casting II, Mobility]
          - gem: "Skeletal Sniper"
          - gem: "Pain Offering"
            supports: [Prolonged Duration II, Efficiency II, Danse Macabre]
          - gem: "Skeletal Cleric"
    rotations:
      - name: "Clearing"
        steps:
          - gem: "Explosive Grenade"
          - gem: "Flash Grenade"
          - gem: "Crossbow Shot"
      - name: "Single Target"
        steps:
          - gem: "Frost Bomb"
          - gem: "Explosive Grenade"
          - gem: "Crossbow Shot"
      - name: "Minions"
        steps:
          - gem: "Pain Offering"
          - gem: "Sniper's Mark"
rotations:
  - name: "Clearing"
    steps:
      - gem: "Explosive Grenade"
      - gem: "Flash Grenade"
      - gem: "Crossbow Shot"
  - name: "Single Target"
    steps:
      - gem: "Frost Bomb"
      - gem: "Explosive Grenade"
      - gem: "Crossbow Shot"
  - name: "Minions"
    steps:
      - gem: "Pain Offering"
      - gem: "Sniper's Mark"
gear:
  weapon:
    unique: "Tyranny's Grip"
    runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
  offhand:
    base: Rattling Sceptre
    mods: [Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Fire Damage, +Level of all Minion Skills, Allies in Presence Attack Speed, Minion Life, Increased Allies in presence Damage]
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
  helmet:
    base: Runeforged Cabalist Helm
    mods: [+Level of all Minion Skills, Lightning Resistance, +Maximum Life, Armour and Evasion, Chaos Resistance]
    runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
  body:
    base: Runeforged Slipstrike Vest
    mods: [+Maximum Life, +Dexterity, Lightning Resistance, Chaos Resistance, Evasion Rating]
    runes: ["Greater Adept Rune: +12 to Dexterity", "Greater Desert Rune: +18% to Fire Resistance"]
  gloves:
    base: Runeforged Ornate Cuffs
    mods: [+Maximum Life, +Intelligence, Cold Resistance, Lightning Resistance, Armour and Energy Shield]
    runes: ["Greater Desert Rune: +18% to Fire Resistance"]
  boots:
    base: Runeforged Cavalry Boots
    mods: [Cold Resistance, Evasion Rating, Movement Speed, Chaos Resistance, +Maximum Life]
    runes: ["Greater Desert Rune: +18% to Fire Resistance"]
  amulet:
    base: Lunar Amulet
    mods: [+Level of all Minion Skills, Elemental Resistances]
  ring1:
    base: Amethyst Ring
    mods: [Fire Resistance, Cold Resistance, Chaos Resistance, +Maximum Life, Evasion Rating]
  ring2:
    base: Sapphire Ring
    mods: [+Maximum Life, +Dexterity, Cold Resistance, Lightning Resistance]
  belt:
    base: Long Belt
    mods: [+Maximum Life, Fire Resistance, Lightning Resistance, Minion Immobilisation Buildup]
  weapon2:
    base: Nettle Talisman
    mods: []
gearStages:
  campaign:
    weapon:
      base: Rattling Sceptre
      mods: [Allies in Presence gain Added Cold Damage, Allies in Presence gain Added Lightning Damage, Increased Allies in presence Damage, +Level of all Minion Skills, Mana Regeneration]
      runes: ["Rune of the Hunt: Companions deal 30% increased Damage"]
    offhand:
      base: Runeforged Avian Targe
      mods: [Cold Resistance, Armour, Evasion Rating, Armour and Evasion, Stun Threshold, Block Chance]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    helmet:
      base: Runeforged Noble Greathelm
      mods: [Cold Resistance, Lightning Resistance, Armour, +Maximum Mana, +Level of all Minion Skills, Accuracy Rating]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    body:
      base: Runeforged Elegant Plate
      mods: [+Strength, Fire Resistance, Cold Resistance, +Maximum Life, Armour]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance", "Greater Storm Rune: +18% to Lightning Resistance"]
    gloves:
      base: Runeforged Stalking Bracers
      mods: [Lightning Resistance, Chaos Resistance, +Maximum Life, Adds Lightning Damage to Attacks, Accuracy Rating]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    boots:
      base: Runeforged Noble Sabatons
      mods: [+Dexterity, Fire Resistance, +Maximum Life, Armour and Evasion, Movement Speed]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Jade Amulet
      mods: [+Strength, +Maximum Life, Evasion Rating, +Level of all Minion Skills, Increased Spell Damage, Chaos Resistance]
    ring1:
      base: Gold Ring
      mods: [Cold Resistance, Chaos Resistance, +Maximum Mana, Evasion Rating, Increased Minion Damage]
    ring2:
      base: Ruby Ring
      mods: [+Intelligence, +Maximum Life, Adds Lightning Damage to Attacks, Increased Cast Speed]
    belt:
      base: Plate Belt
      mods: [+Strength, Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana, Mana Flask Recovery]
  endgame:
    weapon:
      unique: "Tyranny's Grip"
      runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
    offhand:
      base: Rattling Sceptre
      mods: [Allies in Presence gain Added Physical Damage, Allies in Presence gain Added Fire Damage, +Level of all Minion Skills, Allies in Presence Attack Speed, Minion Life, Increased Allies in presence Damage]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    helmet:
      base: Runeforged Cabalist Helm
      mods: [+Level of all Minion Skills, Lightning Resistance, +Maximum Life, Armour and Evasion, Chaos Resistance]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Runeforged Slipstrike Vest
      mods: [+Maximum Life, +Dexterity, Lightning Resistance, Chaos Resistance, Evasion Rating]
      runes: ["Greater Adept Rune: +12 to Dexterity", "Greater Desert Rune: +18% to Fire Resistance"]
    gloves:
      base: Runeforged Ornate Cuffs
      mods: [+Maximum Life, +Intelligence, Cold Resistance, Lightning Resistance, Armour and Energy Shield]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    boots:
      base: Runeforged Cavalry Boots
      mods: [Cold Resistance, Evasion Rating, Movement Speed, Chaos Resistance, +Maximum Life]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Lunar Amulet
      mods: [+Level of all Minion Skills, Elemental Resistances]
    ring1:
      base: Amethyst Ring
      mods: [Fire Resistance, Cold Resistance, Chaos Resistance, +Maximum Life, Evasion Rating]
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Life, +Dexterity, Cold Resistance, Lightning Resistance]
    belt:
      base: Long Belt
      mods: [+Maximum Life, Fire Resistance, Lightning Resistance, Minion Immobilisation Buildup]
    weapon2:
      base: Nettle Talisman
      mods: []
  minmax:
    weapon:
      unique: "Trenchtimbre"
      runes: ["2× Greater Rune of Leadership: Minions gain 10% of their Physical Damage as Extra Lightning Damage"]
    offhand:
      unique: "Sylvan's Effigy"
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    helmet:
      unique: "Starkonja's Head"
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills", "Greater Glacial Rune: +18% to Cold Resistance"]
    body:
      unique: "Forgotten Warden"
      runes: ["Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers", "Panther Idol: +10% of Armour also applies to Chaos Damage"]
    gloves:
      base: Runeforged Elegant Wraps
      mods: [+Maximum Life, Fire Resistance, Lightning Resistance, Evasion and Energy Shield, Chaos Resistance]
      runes: ["Wolf Idol: 15% increased Magnitude of Bleeding you inflict", "Carved Majesty: Companions gain Onslaught for 4 seconds on Hitting your Marked targets"]
    boots:
      base: Runeforged Dragonscale Boots
      mods: [Movement Speed, +Maximum Life, Fire Resistance, Chaos Resistance, Energy Shield]
      runes: ["Idol of Grold: 50% increased total Power counted by Warcries"]
    amulet:
      base: Azure Amulet
      mods: [+Level of all Minion Skills, +Intelligence]
    ring1:
      base: Prismatic Ring
      mods: [+Maximum Life, Fire Resistance, Cold Resistance, Chaos Resistance, Evasion Rating]
    ring2:
      base: Sapphire Ring
      mods: [+Dexterity, Cold Resistance, Lightning Resistance, +Maximum Life]
    belt:
      base: Long Belt
      mods: [+Maximum Life, Fire Resistance, Lightning Resistance]
passives:
  attribute: dex
  path:
    - "Blur"
    - "Bond of the Wolf"
    - "Iron Reflexes"
    - "Sturdy Ally"
    - "Captivating Companionship"
    - "Sic 'Em"
    - "Reverberating Parry"
    - "Nourishing Ally"
    - "Bond of the Owl"
    - "Bond of the Ape"
    - "Trusted Kinship"
    - "Inspiring Ally"
    - "Easy Going"
    - "Bond of the Mamba"
    - "Bond of the Viper"
    - "Long Distance Relationship"
    - "Unspoken Bond"
    - "Bond of the Cat"
    - "Gravedigger"
    - "Splintering Force"
    - "Relentless Fallen"
    - "Necrotised Flesh"
    - "Tempered Defences"
    - "Warlord Leader"
  ascendancy: [Wild Protector, The Catha's Balance, The Natural Order, Idolatry]
---
## How It Works

Your damage comes from a tamed boss. In Act 3, capture the **Mighty Silverfist** in the **Jungle Ruins** with [[Tame Beast]]: it becomes a Companion gem that slams enemies with its totem. The Natural Order lets Tame Beast capture unique beasts, and Trusted Kinship lets you run a second companion of a different type. [[Wild Protector]] and a few skeletons fill the screen, while [[Pain Offering]] and [[Sniper's Mark]] boost the companions.

The Catha's Balance gives companions part of your weapon's damage, which is why a Runemastered [[Tyranny's Grip]] is the big upgrade. Idolatry, the fourth ascendancy point, rewards socketing Idols for reservation efficiency.

## Leveling

Use [[Spear Stab]] and Whirling Assault until Clearfell, then switch to a crossbow: [[Explosive Grenade]] and [[Flash Grenade]] with [[Multishot I]], and Crossbow Shot while they are on cooldown. A talisman in weapon set 2 gives [[Pounce]] for mobility. After the first ascendancy (The Natural Order), you can tame Crowbell in the Hunting Grounds; the Silverfist takes over in Act 3.

## Playstyle

**Mapping.** Let the companions and skeletons clear; keep [[Pain Offering]] up on a skeleton.

**Bossing.** Mark the boss with [[Sniper's Mark]], refresh [[Pain Offering]] and use [[Refutation]] to avoid big hits.

## Companions

**Support gems.** For the Silverfist: Rapid Attacks II, Rage III, Hulking Minions, Muster and Loyalty. For most other melee companions: Loyalty, Minion Splash II, Rapid Attacks II, Rage III, and Muster or Meat Shield II depending on survivability. For ranged companions: Loyalty, Rapid Attacks II, Chain III, Multishot II and Muster. Loyalty stacks across all your companions.

**Second companion.** The Hunting Grounds (Act 1) are a good place to find one early. Aura priority: Haste Aura, then Physical Damage Aura, Energy Shield Aura, Heals Allies and Hinder Aura. Nice extras: always shocks, breaks armour, stuns, extra chaos or lightning damage, critical hits.

**A stronger Silverfist.** It is always the boss of the Riverside and Rupture maps. Roll "Unique Monsters have 1 additional Rare Modifier" on two tablets and add a Cruel Hegemony: map bosses then have three or more modifiers. Jado's Atlas point with a 20% chance to double tablet modifiers helps. With Ritual, starting the Rite of the Nameless on Riverside or Rupture puts the monkey boss in each final ritual, but that is dangerous. High-level maps are not needed for taming.

## Endgame Progression

**Early maps.**
- 75% elemental resistances; chaos resistance is optional but welcome. As much life as possible.
- + to Level of all Minion Skills on sceptre, helmet and amulet. On the sceptre, look for "Allies in your Presence deal increased Damage" too.
- Equip [[Tyranny's Grip]] once The Catha's Balance is allocated, and upgrade it twice at the Verisium Anvil from the Runes of Aldur quest. [[Trenchtimbre]] is the safer option for slightly less damage.
- In Hardcore, the source guide suggests a shield and Sacred Unity instead of The Catha's Balance and Idolatry, for much more mitigation from the bear.

**Endgame.** Sylvan's Effigy lets you run several companions and Forgotten Warden adds another one for free, so reservation and Idols matter more, along with Idolatry. Both items need a Perfect Jeweller's Orb for maximum sockets when they are level 19 or lower (not possible once corrupted). Idol priority: Idol of Ralakesh in the helmet, Fox Idol in the body armour, Primate Idol in the sceptre, then filler Idols in gloves and boots (Carved Majesty for a big budget). Cheap aura beasts with low reservation and good speed: Venomous Crab Matriarch (27.6%), Bramble Rhoa (34.2%), Alpha Primate (39.6%).

## Gear Priorities

Life and resistances everywhere, + minion levels on sceptre, helmet and amulet, and the best physical damage weapon you can get for The Catha's Balance. Movement speed on boots.

## FAQ

**Where do I find good companions?** The Hunting Grounds early on; in the endgame, check beasts while mapping. Binding the Open Marketplace key to a convenient button lets you pause the game to read a beast's modifiers (not in SSF).

**What should I watch out for while taming?** Unspec the ascendancy bear and deactivate your companions, or they will kill the beast before you can tame it.
