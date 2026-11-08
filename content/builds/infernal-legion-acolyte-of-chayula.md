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
  offhand:
    base: Shrine Sceptre
    mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
  helmet:
    base: Grinning Mask
    mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances, Evasion and Energy Shield, Evasion Rating, Energy Shield]
  body:
    base: Falconer's Jacket
    mods: [Evasion and Energy Shield, Evasion Rating, Energy Shield, +Maximum Life, Elemental Resistances]
  gloves:
    base: Vaal Wraps
    mods: [+Maximum Life, +Intelligence, Elemental Resistances, Evasion and Energy Shield]
  boots:
    base: Quickslip Shoes
    mods: [Movement Speed, +Maximum Life, Elemental Resistances, Evasion and Energy Shield]
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
    offhand:
      base: Array Buckler
      mods: [+Maximum Life, Elemental Resistances]
    helmet:
      base: Shaded Mask
      mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances]
    body:
      base: Clandestine Jacket
      mods: [+Spirit, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
    gloves:
      base: Furtive Wraps
      mods: [+Maximum Life, Elemental Resistances]
    boots:
      base: Velour Shoes
      mods: [Movement Speed, Elemental Resistances]
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
    offhand:
      base: Shrine Sceptre
      mods: [Increased Allies in presence Damage, +Level of all Minion Skills, +Spirit, Minion Life]
    helmet:
      base: Death Mask
      mods: [Cold Resistance, +Maximum Life, +Level of all Minion Skills]
    body:
      base: Sleek Jacket
      mods: [Cold Resistance, Evasion Rating, Energy Shield, Evasion and Energy Shield, +Spirit]
    gloves:
      base: Utility Wraps
      mods: [Lightning Resistance, Chaos Resistance, +Maximum Life]
    boots:
      base: Bladed Shoes
      mods: [+Intelligence, Fire Resistance, +Maximum Life, Movement Speed]
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
  endgame:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
    body:
      base: Falconer's Jacket
      mods: [+Spirit, Evasion and Energy Shield, Evasion Rating, Energy Shield, Critical Damage Bonus, +Intelligence]
    gloves:
      base: Secured Wraps
      mods: [Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
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
  minmax:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit, Minion Life]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, +Intelligence]
    body:
      base: Sacrificial Regalia
      mods: [Deflection, Energy Shield, Evasion Rating, Critical Damage Bonus, Elemental Resistances]
    gloves:
      base: Secured Wraps
      mods: [Evasion and Energy Shield, Deflection, Evasion Rating, Energy Shield, Elemental Resistances]
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Deflection, Evasion and Energy Shield, Evasion Rating, Energy Shield, Elemental Resistances]
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
