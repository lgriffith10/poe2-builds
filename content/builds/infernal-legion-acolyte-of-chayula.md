---
title: Infernal Legion Acolyte of Chayula
class: Monk
ascendancy: Acolyte of Chayula
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Infernal Legion Acolyte of Chayula Build Guide"
  author: "shayd (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/infernal-legion-acolyte-of-chayula
  updated: 2026-11-04
summary: "Monk whose tamed companion burns everything nearby with Infernal Legion while Chayula's remnants keep the Acolyte alive: a near zero-button endgame."
tags: [companion, fire, damage over time, energy shield]
damage: Fire
playstyle: Companion
difficulty: medium
budget: low
tiers:
  starter: A
tierChanges:
  starter: new
pros:
  - "High damage from a constant burning aura"
  - "Very tanky in the endgame"
  - "Almost no buttons to press once set up"
cons:
  - "Squishy early in the campaign"
  - "Levels with cold melee skills, not minions"
  - "Needs a specific tamed companion"
skills:
  - gem: "Into the Breach"
    supports: [Remnant Potency III, Harmonic Remnants II, Selfless Remnants]
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II]
  - gem: "Blasphemy"
    supports: [Elemental Weakness, Ritualistic Curse, Magnified Area II, Fire Mastery]
  - gem: "Frost Bomb"
    supports: [Overabundance II, Spell Echo, Potent Exposure, Long Fuse II]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Second Wind III, Prolonged Duration II, Rapid Casting II]
  - gem: "Spearfield"
    supports: [Bleed III, Rearm II, Magnified Area II, Rapid Attacks III]
  - gem: "Tame Beast"
    supports: [Infernal Legion II, Feeding Frenzy II, Scouring Flame, Magnified Area II, Hulking Minions]
    note: The tamed companion is your damage source; these supports go on it.
  - gem: "Purity of Fire"
    supports: [Upwelling II, Vitality II, Clarity II, Cannibalism II]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Frozen Locus, Glacial Cascade, Ice Strike, Frost Bomb]
    - label: "Act Ii"
      gems: [Tempest Bell, Freezing Mark]
    - label: "Act Iii"
      gems: [Hand of Chayula, Shattering Palm, Elemental Weakness]
  spirit:
    - label: "Act I"
      gems: [Herald of Ice]
    - label: "Act Iii"
      gems: [Ghost Dance]
  supports:
    - label: "Act I"
      gems: [Rage I, Elemental Armament I, Magnified Area I]
    - label: "Act Ii"
      gems: [Ice Bite I, Overabundance I, Harmonic Remnants I, Remnant Potency I]
    - label: "Act Iii"
      gems: [Embitter, Cooldown Recovery I, Cannibalism I, Clarity I, Magnified Area II, Harmonic Remnants II]
    - label: "Act Iv"
      gems: [Ancestral Call I, Rage II]
leveling:
  - name: "Hollow Palm Campaign"
    steps:
      - name: "Early Act 1"
        skills:
          - gem: "Frozen Locus"
            supports: [Ice Bite I, Elemental Armament I]
          - gem: "Glacial Cascade"
            supports: [Rage I, Concentrated Area]
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament I]
          - gem: "Frost Bomb"
      - name: "Late Act 1"
        skills:
          - gem: "Frozen Locus"
            supports: [Ice Bite I, Elemental Armament I]
          - gem: "Ice Strike"
            supports: [Rage I, Elemental Armament I]
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament I]
          - gem: "Frost Bomb"
      - name: "Act 2"
        skills:
          - gem: "Into the Breach"
            supports: [Remnant Potency I, Harmonic Remnants I]
          - gem: "Ice Strike"
            supports: [Rage I, Elemental Armament II]
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament II]
          - gem: "Freezing Mark"
            supports: [Mark of Siphoning]
          - gem: "Frozen Locus"
            supports: [Ice Bite I, Elemental Armament II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Tempest Bell"
            supports: [Magnified Area I, Overabundance I, Execute I]
      - name: "Act 3"
        skills:
          - gem: "Into the Breach"
            supports: [Remnant Potency II, Harmonic Remnants II]
          - gem: "Ice Strike"
            supports: [Rage I, Elemental Armament II, Embitter]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Elemental Armament II, Embitter]
          - gem: "Tempest Bell"
            supports: [Magnified Area II, Overabundance I, Execute I]
          - gem: "Hand of Chayula"
            supports: [Elemental Weakness, Freezing Mark, Mark of Siphoning]
          - gem: "Shattering Palm"
            supports: [Magnified Area II, Embitter]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery I, Cannibalism I, Clarity I]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
      - name: "Act 4"
        skills:
          - gem: "Into the Breach"
            supports: [Remnant Potency III, Harmonic Remnants II]
          - gem: "Ice Strike"
            supports: [Rage II, Elemental Armament II, Embitter]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Elemental Armament II, Embitter]
          - gem: "Tempest Bell"
            supports: [Magnified Area II, Overabundance II, Mana Leech]
          - gem: "Hand of Chayula"
            supports: [Elemental Weakness, Freezing Mark, Mark of Siphoning II]
          - gem: "Shattering Palm"
            supports: [Magnified Area II, Embitter, Ancestral Call I]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II, Cannibalism I, Clarity II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Long Fuse I]
      - name: "Early Maps"
        skills:
          - gem: "Into the Breach"
            supports: [Remnant Potency III, Harmonic Remnants II, Selfless Remnants]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II]
          - gem: "Blasphemy"
            supports: [Elemental Weakness, Ritualistic Curse, Magnified Area II]
          - gem: "Frost Bomb"
            supports: [Overabundance II, Spell Echo, Long Fuse II]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II]
          - gem: "Spearfield"
            supports: [Bleed III, Rearm II, Magnified Area II]
          - gem: "Purity of Fire"
            supports: [Upwelling II, Vitality II, Clarity II]
    rotations:
      - name: "Bossing"
        steps:
          - gem: "Hand of Chayula"
            label: "Debuff"
          - gem: "Frost Bomb"
          - gem: "Freezing Mark"
          - gem: "Ice Strike"
            count: 4
            label: "Build Combo"
          - gem: "Tempest Bell"
rotations:
  - name: "Bossing"
    steps:
      - gem: "Frost Bomb"
        label: "Debuff"
      - gem: "Spearfield"
        label: "Aggravate"
gear:
  weapon:
    unique: "Trenchtimbre"
    runes: ["Soul Core of Azcapa: +15 to Spirit"]
  offhand:
    base: Shrine Sceptre
    mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
    runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
  helmet:
    base: Grinning Mask
    mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances, Evasion and Energy Shield, Evasion Rating, Energy Shield]
    runes: ["Greater Desert Rune: +18% to Fire Resistance"]
  body:
    base: Falconer's Jacket
    mods: [Evasion and Energy Shield, Evasion Rating, Energy Shield, +Maximum Life, Elemental Resistances]
    runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "Soul Core of Ticaba: Hits against you have 50% reduced Critical Damage Bonus"]
  gloves:
    base: Vaal Wraps
    mods: [+Maximum Life, +Intelligence, Elemental Resistances, Evasion and Energy Shield]
    runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
  boots:
    base: Quickslip Shoes
    mods: [Movement Speed, +Maximum Life, Elemental Resistances, Evasion and Energy Shield]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
  amulet:
    base: Gold Amulet
    mods: [+Level of all Minion Skills, +All Attributes, Energy Shield, +Maximum Life]
  ring1:
    base: Topaz Ring
    mods: [Increased Minion Damage, Minion Life, +Maximum Life, Elemental Resistances]
  ring2:
    base: Topaz Ring
    mods: [Increased Minion Damage, Minion Life, +Maximum Life, Elemental Resistances]
  belt:
    base: Heavy Belt
    mods: [Minion Area of Effect, Minion Life, +Maximum Life, Elemental Resistances]
gearStages:
  campaign:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Intelligence]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Rune of the Hunt: Companions deal 30% increased Damage"]
    offhand:
      base: Array Buckler
      mods: [+Maximum Life, Elemental Resistances]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    helmet:
      base: Shaded Mask
      mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      base: Clandestine Jacket
      mods: [+Spirit, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
      runes: ["Glacial Rune: +14% to Cold Resistance", "Storm Rune: +14% to Lightning Resistance"]
    gloves:
      base: Furtive Wraps
      mods: [+Maximum Life, Elemental Resistances]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      base: Velour Shoes
      mods: [Movement Speed, Elemental Resistances]
      runes: ["Glacial Rune: +14% to Cold Resistance"]
    amulet:
      base: Lapis Amulet
      mods: [+Level of all Minion Skills, +Maximum Life, +Dexterity]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Elemental Resistances]
    ring2:
      base: Amethyst Ring
      mods: [+Maximum Life, Elemental Resistances]
    belt:
      base: Plate Belt
      mods: [+Maximum Life, Elemental Resistances]
  mapping:
    weapon:
      unique: "Trenchtimbre"
      runes: ["Soul Core of Azcapa: +15 to Spirit"]
    offhand:
      base: Shrine Sceptre
      mods: [Increased Allies in presence Damage, +Level of all Minion Skills, +Spirit, Minion Life]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    helmet:
      base: Death Mask
      mods: [Cold Resistance, +Maximum Life, +Level of all Minion Skills]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    body:
      base: Sleek Jacket
      mods: [Cold Resistance, Evasion Rating, Energy Shield, Evasion and Energy Shield, +Spirit]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield", "Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Utility Wraps
      mods: [Lightning Resistance, Chaos Resistance, +Maximum Life]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    boots:
      base: Bladed Shoes
      mods: [+Intelligence, Fire Resistance, +Maximum Life, Movement Speed]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Stellar Amulet
      mods: [+All Attributes, +Maximum Life, +Level of all Minion Skills]
    ring1:
      unique: "Blackflame"
    ring2:
      base: Sapphire Ring
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, Evasion Rating]
    belt:
      base: Heavy Belt
      mods: [+Strength, Fire Resistance, Lightning Resistance, +Maximum Life]
    weapon2:
      unique: Saitha's Spear
      runes: ["Greater Robust Rune: +12 to Strength"]
  endgame:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
      runes: ["Greater Iron Rune: 18% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
      runes: ["Idol of Ralakesh: 8% increased Reservation Efficiency of Minion Skills"]
    body:
      base: Falconer's Jacket
      mods: [+Spirit, Evasion and Energy Shield, Evasion Rating, Energy Shield, Critical Damage Bonus, +Intelligence]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "Soul Core of Ticaba: Hits against you have 50% reduced Critical Damage Bonus"]
    gloves:
      base: Secured Wraps
      mods: [Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Gold Amulet
      mods: [+Level of all Minion Skills, +Spirit, Grants a Passive Skill, +All Attributes, Energy Shield]
    ring1:
      base: Topaz Ring
      mods: [Increased Minion Damage, Minion Life, Elemental Resistances]
    ring2:
      unique: "Kalandra's Touch"
    belt:
      base: Heavy Belt
      mods: [Minion Area of Effect, Minion Life, Elemental Resistances]
    weapon2:
      unique: Saitha's Spear
      runes: ["Soul Core of Quipolatl: 5% increased Attack Speed"]
    offhand2:
      base: Tasalian Focus
      mods: []
      runes: ["Greater Desert Rune: Adds 13 to 16 Fire Damage"]
  minmax:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
      runes: ["Primate Idol: Allies in your Presence deal 40% increased Damage", "Rune of the Hunt: Companions deal 30% increased Damage"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
      runes: ["2× Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, +Intelligence]
      runes: ["Idol of Egrin: Enemies you Curse take 6% increased Damage", "Raven-Touched Shard"]
    body:
      base: Sacrificial Regalia
      mods: [Deflection, Energy Shield, Evasion Rating, Critical Damage Bonus, Elemental Resistances]
      runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "Soul Core of Ticaba: Hits against you have 50% reduced Critical Damage Bonus"]
    gloves:
      base: Secured Wraps
      mods: [Evasion and Energy Shield, Deflection, Evasion Rating, Energy Shield, Elemental Resistances]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Deflection, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Jiquani's Thesis: Increases and Reductions to Movement Speed also,  apply to Energy Shield Recharge Rate"]
    amulet:
      base: Gold Amulet
      mods: [+Level of all Minion Skills, +All Attributes, Energy Shield, Deflection, Elemental Resistances]
    ring1:
      base: Gold Ring
      mods: [Increased Minion Damage, Minion Life, Elemental Resistances]
    ring2:
      unique: "Kalandra's Touch"
    belt:
      unique: "Mageblood"
    weapon2:
      unique: Saitha's Spear
      runes: ["Soul Core of Azcapa: +15 to Spirit", "Soul Core of Quipolatl: 5% increased Attack Speed"]
    offhand2:
      base: Tasalian Focus
      mods: [Energy Shield, Elemental Resistances]
      runes: ["Perfect Glacial Rune: Adds 16 to 20 Cold Damage"]
passives:
  attribute: dex
  path:
    - "Step Like Mist"
    - "Mystic Stance"
    - "Bond of the Ape"
    - "Long Distance Relationship"
    - "Trusted Kinship"
    - "Bond of the Cat"
    - "Enhanced Barrier"
    - "Mind Over Matter"
    - "Shimmering"
    - "Spectral Ward"
    - "Mindful Awareness"
    - "First Principle of the Hollow"
    - "First Teachings of the Keeper"
    - "The Hollowkeeper"
    - "Heavy Buffer"
  ascendancy: [Waking Dream, Chayula's Gift]
  weaponSet1: [Dead can Dance, Vile Mending, Lord of Horrors, Right Hand of Darkness, Living Death, Unspoken Bond]
  weaponSet2: [Arcane Remnants, Vigorous Remnants, Empowering Remnants, Remnant Attraction]
---
## How It Works

The damage comes from your tamed companion. Supported by [[Infernal Legion II]], it burns everything around it with constant fire damage over time, so packs melt simply by walking through them. [[Into the Breach]] makes Flames of Chayula appear around you; picking them up grants extra damage and recovery. The source guide notes they can feel fiddly at first, but the remnant pickup range nodes on the tree make collecting them effortless.

The Acolyte of Chayula ascendancy (Waking Dream, Chayula's Gift) and the energy shield and evasion on the tree make the character very tanky. A large part of those defences depends on your companion staying in your Presence.

## Weapon Sets

The source guide splits skills between weapon sets: the companion, [[Skeletal Cleric]] and [[Ghost Dance]] on set 1, [[Into the Breach]] and [[Frost Bomb]] on set 2, everything else on both. Passive points tied to the companion are assigned to set 1.

## Leveling

Act 1 is the hardest part. Clear with [[Frozen Locus]] detonated by the tip of [[Glacial Cascade]], and add [[Herald of Ice]] for shatter explosions. At level 14, [[Ice Strike]] arrives and the character improves immediately. Slam [[Tempest Bell]] on bosses, and use [[Freezing Mark]] to freeze them more easily.

## Playstyle

**Mapping.** Walk through packs and let the companion burn them; grab the Flames of Chayula as you go.

**Bossing.** Keep [[Frost Bomb]] down for exposure, curse with [[Blasphemy]], and stay close so the companion and your defences remain active. [[Convalescence]] and [[Ghost Dance]] add defensive layers.

## FAQ

**Where do I tame the two companions?** Capture both beasts before the level 56 respec. In the Interludes, leave Khari Bazaar by its north-east exit and head north-west until you reach a merchant next to a checkpoint: two rare Plague Harvesters (they look like giant wasps) always spawn there, so do not kill them. In Act 3, the Troubled Camp in the Infested Barrens has a checkpoint with a rare Diretusk Boar. Each "Respawn at Checkpoint" rerolls their monster modifiers, so repeat it until you get the one you want, then tame it with [[Tame Beast]].

**Which modifiers do the companions need?** The Plague Harvester must have "All Damage Ignites": without it, the companion gets nothing from [[Into the Breach]]. The Diretusk Boar must have "All Damage Shocks", which makes enemies take more damage. Later on, "Shroud Walker" (the companion teleports to nearby enemies) is the next most valuable modifier on the main companion. Do not lose hours chasing a perfect beast during the campaign. Set both companions to weapon set 1 only: swapping sets then heals them, or brings them back to you if they get stuck.

**Are there modifiers to avoid?** Fire-based ones on the [[Infernal Legion II]] companion, such as Trail of Fire, Conjures Flamewalls, Periodic Fire Explosions or Periodically unleashes Fire. They can interfere with how the ignite is applied and cause gaps in your damage. It does not always happen, but keep it in mind.

**What do I need for the switch to Infernal Legion?** Around level 56, when you start the Stolen Bayra interlude: about 40,000 gold, at least 18 weapon set points and several level 5 Uncut Support Gems. Do not use Infernal Legion I, which lacks the fire resistance and much of the radius. To afford the respec, identify and sell your rare items during the campaign rather than gambling or buying expensive rares from vendors. Switching much earlier feels bad: Vile Mending, which keeps the companion alive, sits far from the companion nodes.

**Why do I feel squishy in the campaign?** The suggested tree takes many +5 attribute nodes to path towards Vile Mending, Long Distance Relationship and Bond of the Ape while keeping the respec cheap. While you play [[Ice Strike]], you can instead pick defensive nodes such as First Principle of the Hollow, Spectral Ward and the evasion and energy shield nodes; you will be much tankier, but the respec will cost more. For mana in the later acts, look for physical attack damage leeched as mana on a ring or the gloves.

**Do I have to use weapon swap snapshotting?** No, but give it a real try first. With [[Into the Breach]] on weapon set 2, enter every new zone or map in set 2 (your companions are unsummoned and you hold [[Saitha's Spear]]): your Flames of Chayula pickup radius becomes huge. If you skip it, allocate enough remnant pickup range nodes on weapon set 1 so you do not miss the purple flames, dropping defensive nodes such as Enhanced Barrier to fund them.
