---
title: Flameblast Oil Grenade Gemling
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Flameblast Oil Grenade Gemling Build Guide"
  author: "cptngarbage (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/flameblast-oil-grenade-gemling-build-guide
  updated: 2026-09-09
summary: "Gemling Mercenary who carpets the map in Oil Grenade and ignites it once with Flameblast: every monster that walks on the burning oil melts."
tags: [fire, ignite, damage over time, grenade, mapping]
damage: Fire
playstyle: Caster
difficulty: medium
budget: low
pros:
  - "Full-screen ignited ground with huge damage"
  - "Very fast dodge-roll mobility"
  - "Clears stationary content like Ritual in one shot"
cons:
  - "Levels as a Tactician and respecs at 52"
  - "Strict gear rules: no flat fire damage anywhere"
skills:
  - gem: "Flameblast"
    supports: [Burgeon II, Concentrated Area, Considered Casting, Searing Flame II, Ignite III]
    weaponSet: 1
  - gem: "Oil Grenade"
    supports: [Short Fuse II, Nova Projectiles I, Encroaching Ground, Multishot I, Projectile Acceleration II]
    weaponSet: 2
  - gem: "Cast on Dodge"
    supports: [Tornado, Morgana's Tempest, Boundless Energy II, Magnified Area II, Acrimony]
    weaponSet: 2
  - gem: "Tornado"
    supports: [Prolonged Duration II, Magnified Area II, Rapid Casting II, Mobility]
  - gem: "Arctic Armour"
    supports: [Brutality I]
  - gem: "Remnants of Kalguur"
    supports: [Remnant Potency III, Harmonic Remnants II, Khatal's Rejuvenation]
  - gem: "Sigil of Power"
    supports: [Magnified Area II]
  - gem: "Despair"
    supports: [Heightened Curse, Magnified Area II, Cursed Ground, Prolonged Duration II]
  - gem: "Elemental Conflux"
    supports: [Compressed Duration II]
    weaponSet: 1

gemPriority:
  skills:
    - label: "Act I"
      gems: [Explosive Grenade, Frost Bomb, Contagion, Flash Grenade, Pounce, Gas Grenade]
    - label: "Act Ii"
      gems: [Oil Grenade]
  spirit:
    - label: "Act I"
      gems: [Herald of Ash]
    - label: "Ash + Banner OR Blasphemy Temporal Chains"
      gems: [War Banner, Blasphemy]
  supports:
    - label: "Act I"
      gems: [Multishot I, Magnified Area I, Execute I]
    - label: "Act Ii-Iii"
      gems: [Multishot II, Short Fuse I, Persistent Ground I, Elemental Armament II, Magnified Area II]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Explosive Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Flash Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Fragmentation Rounds"
          - gem: "Frost Bomb"
          - gem: "Crossbow Shot"
            supports: [Multishot I, Execute I]
          - gem: "Contagion"
          - gem: "Pounce"
          - gem: "Gas Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Herald of Ash"
      - name: "Act 2"
        skills:
          - gem: "Explosive Grenade"
            supports: [Multishot II, Magnified Area I]
          - gem: "Oil Grenade"
            supports: [Multishot II, Volt]
          - gem: "Flash Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Pounce"
          - gem: "Gas Grenade"
            supports: [Multishot II, Magnified Area I]
          - gem: "Herald of Ash"
          - gem: "Frost Bomb"
          - gem: "Supporting Fire"
            supports: [Bidding I, Lightning Attunement]
      - name: "Act 3"
        skills:
          - gem: "Explosive Grenade"
            supports: [Multishot II, Elemental Armament II, Short Fuse I]
          - gem: "Oil Grenade"
            supports: [Multishot II, Volt, Deliberation]
          - gem: "Flash Grenade"
            supports: [Multishot I, Magnified Area I]
          - gem: "Pounce"
          - gem: "Gas Grenade"
            supports: [Multishot II, Magnified Area I, Elemental Armament II]
          - gem: "Herald of Ash"
          - gem: "Frost Bomb"
          - gem: "Supporting Fire"
            supports: [Bidding I, Lightning Attunement]
      - name: "Early Maps"
        skills:
          - gem: "Flameblast"
            supports: [Burgeon II, Concentrated Area, Considered Casting, Searing Flame II, Ignite III]
          - gem: "Oil Grenade"
            supports: [Short Fuse II, Nova Projectiles I, Encroaching Ground, Multishot I, Projectile Acceleration II]
          - gem: "Cast on Dodge"
            supports: [Tornado, Morgana's Tempest, Boundless Energy II, Magnified Area II, Acrimony]
          - gem: "Tornado"
            supports: [Prolonged Duration II, Magnified Area II, Rapid Casting II, Mobility]
          - gem: "Arctic Armour"
            supports: [Brutality I]
          - gem: "Remnants of Kalguur"
            supports: [Remnant Potency III, Harmonic Remnants II, Khatal's Rejuvenation]
          - gem: "Sigil of Power"
            supports: [Magnified Area II]
          - gem: "Despair"
            supports: [Heightened Curse, Magnified Area II, Cursed Ground, Prolonged Duration II]
          - gem: "Elemental Conflux"
            supports: [Compressed Duration II]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Flash Grenade"
            label: "(Stun enemies)"
          - gem: "Explosive Grenade"
            label: "Predict where enemies will be"
          - gem: "Fragmentation Rounds"
            label: "Finish stragglers or shoot new grenade"
          - gem: "Explosive Grenade"
          - gem: "Gas Grenade"
            label: "Alternate between Grenades once unlocked"
          - gem: "Cluster Grenade"
      - name: "Misc."
        steps:
          - gem: "Supporting Fire"
            label: "Freely use, better on larger packs"
          - gem: "Pounce"
            label: "For mobility"
          - gem: "Contagion"
            label: "For first few levels"
      - name: "Single Target"
        steps:
          - gem: "Frost Bomb"
            label: "Use right before Boss becomes targetable"
          - gem: "Supporting Fire"
          - gem: "Oil Grenade"
            label: "For slow + Exposure"
          - gem: "Explosive Grenade"
            label: "Boom"
          - gem: "Gas Grenade"
          - gem: "Cluster Grenade"
          - gem: "Crossbow Shot"
            label: "Use in Act 1 when Grenade recharging"
          - gem: "Frost Bomb"
            label: "Maintain 25% Exposure"
rotations:
  - name: "Clear"
    steps:
      - gem: "Flash Grenade"
        label: "(Stun enemies)"
      - gem: "Explosive Grenade"
        label: "Predict where enemies will be"
      - gem: "Fragmentation Rounds"
        label: "Finish stragglers or shoot new grenade"
      - gem: "Explosive Grenade"
      - gem: "Gas Grenade"
        label: "Alternate between Grenades once unlocked"
      - gem: "Cluster Grenade"
  - name: "Misc."
    steps:
      - gem: "Supporting Fire"
        label: "Freely use, better on larger packs"
      - gem: "Pounce"
        label: "For mobility"
      - gem: "Contagion"
        label: "For first few levels"
  - name: "Single Target"
    steps:
      - gem: "Frost Bomb"
        label: "Use right before Boss becomes targetable"
      - gem: "Supporting Fire"
      - gem: "Oil Grenade"
        label: "For slow + Exposure"
      - gem: "Explosive Grenade"
        label: "Boom"
      - gem: "Gas Grenade"
      - gem: "Cluster Grenade"
      - gem: "Crossbow Shot"
        label: "Use in Act 1 when Grenade recharging"
      - gem: "Frost Bomb"
        label: "Maintain 25% Exposure"
gear:
  weapon:
    base: Chiming Staff
    mods: [Gain Damage as Extra Fire, Increased Spell Damage, Increased Fire Damage, +Level of all Fire Spell Skills]
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "2× Perfect Desert Rune: Gain 12% of Damage as Extra Fire Damage"]
  helmet:
    base: Imperial Greathelm
    mods: [+Maximum Life, Elemental Resistances, Armour, Armour applies to Elemental Damage, Armour applies to Chaos Damage, +Attributes]
    runes: ["Legacy of Greymake", "Raven-Touched Shard"]
  body:
    unique: "The Brass Dome"
    runes: ["3× Warding Rune of Reinforcement: 20% increased Runic Ward"]
  gloves:
    base: Massive Mitts
    mods: [Ignite Magnitude, Faster Damaging Ailments]
    runes: ["Katla's Gloom: Can roll Decay modifiers", "Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
  boots:
    unique: "Decree of Flight"
    runes: ["Rune of Acrobatics: +0.3 metres to Dodge Roll distance"]
  amulet:
    unique: "Defiance of Destiny"
  ring1:
    base: Sapphire Ring
    mods: [+Maximum Life, Elemental Resistances]
  ring2:
    unique: "Blackflame"
  belt:
    base: Utility Belt
    mods: [+Maximum Life, Elemental Resistances, +Attributes]
  weapon2:
    base: Cannonade Crossbow
    mods: [+Level of all Projectile Skills, Increased Attack Speed, Grenades Explode Twice]
gearStages:
  campaign:
    weapon:
      base: Dyad Crossbow
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Adds Fire Damage, Adds Lightning Damage, Increased Attack Speed]
      runes: ["Lesser Iron Rune: 14% increased Physical Damage", "Lesser Glacial Rune: Adds 3 to 5 Cold Damage"]
    helmet:
      base: Visored Helm
      mods: [Elemental Resistances, +Maximum Life, Armour and Evasion, Armour applies to Elemental Damage]
      runes: ["Lesser Glacial Rune: +10% to Cold Resistance"]
    body:
      base: Rogue Armour
      mods: [Armour and Evasion, Armour, Elemental Resistances, +Maximum Life, +Spirit]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    gloves:
      base: Layered Gauntlets
      mods: [Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, Elemental Resistances, +Maximum Life]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    boots:
      base: Braced Sabatons
      mods: [Movement Speed, Elemental Resistances, +Maximum Life]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    amulet:
      base: Bloodstone Amulet
      mods: [Elemental Resistances, +Level of all Projectile Skills, +Maximum Life, +Spirit, Armour, +Attributes]
    ring1:
      base: Ruby Ring
      mods: [Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, Elemental Resistances, +Maximum Life]
    ring2:
      base: Sapphire Ring
      mods: [Adds Cold Damage to Attacks, Adds Fire Damage to Attacks, Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, Elemental Resistances, +Maximum Life]
    belt:
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Life]
    weapon2:
      base: Changeling Talisman
      mods: []
  mapping:
    weapon:
      base: Pyrophyte Staff
      mods: [Gain Damage as Extra Fire, Increased Spell Damage, Increased Fire Damage, +Level of all Fire Spell Skills]
      runes: ["2× Desert Rune: Gain 8% of Damage as Extra Fire Damage"]
    helmet:
      base: Goliath Greathelm
      mods: [+Maximum Life, Elemental Resistances, Armour, Armour applies to Elemental Damage]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    body:
      base: Colosseum Plate
      mods: [Armour, Elemental Resistances, +Spirit]
      runes: ["Storm Rune: +14% to Lightning Resistance", "Glacial Rune: +14% to Cold Resistance"]
    gloves:
      unique: "Doedre's Tenure"
    boots:
      base: Veteran Sabatons
      mods: [Movement Speed, +Maximum Life, Elemental Resistances]
    amulet:
      unique: "Surefooted Sigil"
    ring1:
      base: Ruby Ring
      mods: [Elemental Resistances, +Maximum Life]
    ring2:
      base: Ruby Ring
      mods: [Elemental Resistances, +Maximum Life]
    belt:
      base: Utility Belt
      mods: [Elemental Resistances, +Maximum Life]
    weapon2:
      base: Bombard Crossbow
      mods: [+Level of all Projectile Skills, Increased Attack Speed, Grenades Explode Twice]
  endgame:
    weapon:
      base: Chiming Staff
      mods: [Gain Damage as Extra Fire, Increased Spell Damage, Increased Fire Damage, +Level of all Fire Spell Skills]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "2× Perfect Desert Rune: Gain 12% of Damage as Extra Fire Damage"]
    helmet:
      base: Imperial Greathelm
      mods: [+Maximum Life, Elemental Resistances, Armour, Armour applies to Elemental Damage, Armour applies to Chaos Damage, +Attributes]
      runes: ["Legacy of Greymake", "Raven-Touched Shard"]
    body:
      unique: "The Brass Dome"
      runes: ["3× Warding Rune of Reinforcement: 20% increased Runic Ward"]
    gloves:
      base: Massive Mitts
      mods: [Ignite Magnitude, Faster Damaging Ailments]
      runes: ["Katla's Gloom: Can roll Decay modifiers", "Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Decree of Flight"
      runes: ["Rune of Acrobatics: +0.3 metres to Dodge Roll distance"]
    amulet:
      unique: "Defiance of Destiny"
    ring1:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances]
    ring2:
      unique: "Blackflame"
    belt:
      base: Utility Belt
      mods: [+Maximum Life, Elemental Resistances, +Attributes]
    weapon2:
      base: Bombard Crossbow
      mods: [Increased Attack Speed, +Level of all Projectile Skills, Grenades Explode Twice]
      runes: ["2× Soul Core of Azcapa: +15 to Spirit"]
  minmax:
    weapon:
      base: Chiming Staff
      mods: [Gain Damage as Extra Fire, Increased Spell Damage, Increased Fire Damage, +Level of all Fire Spell Skills]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "2× Perfect Desert Rune: Gain 12% of Damage as Extra Fire Damage"]
    helmet:
      unique: "Alpha's Howl"
      runes: ["Raven-Touched Shard"]
    body:
      unique: "The Brass Dome"
      runes: ["3× Warding Rune of Reinforcement: 20% increased Runic Ward"]
    gloves:
      base: Massive Mitts
      mods: [Armour applies to Elemental Damage]
      runes: ["Katla's Gloom: Can roll Decay modifiers", "Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      unique: "Decree of Flight"
      runes: ["Rune of Acrobatics: +0.3 metres to Dodge Roll distance"]
    amulet:
      unique: "Defiance of Destiny"
    belt:
      unique: "Mageblood"
    weapon2:
      base: Cannonade Crossbow
      mods: [+Level of all Projectile Skills, Increased Attack Speed, Grenades Explode Twice]
passives:
  attribute: int
  path:
    - "Adrenaline Rush"
    - "Authority"
    - "Engineered Blaze"
    - "Momentum"
    - "Light on your Feet"
    - "Volatile Catalyst"
    - "Tempered Defences"
    - "Flamekeeper"
    - "Primal Growth"
    - "Prism Guard"
    - "Close Confines"
    - "Swift Flight"
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded]
  weaponSet1: [Arsonist, Searing Heat, Fast Acting Toxins, Deterioration, Steady Footing]
  weaponSet2: [Volatile Grenades, Grenadier, Cluster Bombs, Utility Ordnance, Multitasking]
farming:
  clear: 3
  single: 2
  tank: 2
  speed: 3
  style: ranged
  traits: [dot]
  adjust:
    ritual: 2
    delirium: 1
  notes:
    ritual: "One well-placed oil carpet with enough duration kills Ritual monsters as they come back."
    delirium: "The same oil carpet trick works in the Simulacrum, where monsters spawn in waves."
---
## How It Works

[[Oil Grenade]] covers a large area in Oil Ground. When an ignited enemy touches it, the oil becomes Ignited Ground with the exact ignite DPS of that enemy, and fresh oil touching it refreshes and spreads the fire. So you ignite one monster with [[Flameblast]] (once per area), then keep shooting Oil Grenades next to the burning ground with a slight overlap: the new oil ignites instantly for Flameblast's damage.

The Gemling's Advanced Thaumaturgy adds a second quality bonus to every active gem: at 20% quality Flameblast gets 400% more ignite magnitude, and around 50% quality in the endgame gives roughly 1000% more, reaching the damage over time cap with ease. Essence of Virtue and Gem Studded complete the setup: Gem Studded gives critical immunity, lower mana costs and more mobility while channelling Flameblast, as long as your support gem colours are balanced. [[Cast on Dodge]] quality also lengthens your dodge rolls.

## Leveling

Level as a **Tactician**: Unleash Hell!'s [[Supporting Fire]] carries the campaign and beats the Gemling's weak first point. Use [[Explosive Grenade]] (aim where monsters will be in three seconds, or [[Flash Grenade]] first so you do not have to predict), [[Gas Grenade]] to alternate on bosses, and [[Frost Bomb]] for Exposure in Act 1 only. Supporting Fire is a minion skill: only its supports and your Strength (1% more damage per point) scale it, so put spare attributes into Strength.

**The level 52 swap.** Do not run the Trial of Chaos before level 52; run it then and change to Gemling at the Trialmaster (about 15,000 gold). Only then respec to Flameblast and give it as much quality as you can right away: 20% roughly quadruples its damage. Prepare in Acts 1 to 4:
- save Gemcutter's Prisms, stop gambling around level 45 and bank about 40,000 gold in total;
- keep a Bombard Crossbow **without** flat fire damage, which would make Oil Grenade ignite itself with a weak ignite;
- keep zero flat fire damage on gloves and rings;
- craft a staff with spell or fire damage, Damage as Extra Fire and + Fire Spell levels (Essence of Sorcery on a fire base, or Augmentation, Regal and three Exalted Orbs), and an Uncut Skill Gem (level 13) for Flameblast.

## Playstyle

**Mapping.** Shoot Oil Grenade under a pack, Flameblast one monster, then keep chaining Oil Grenades next to the burning ground as you dodge roll through the map. Long, fast dodge rolls are your movement.

**Stationary content.** In Ritual or Simulacrum, one well-placed oil carpet with enough duration kills monsters as they spawn.

## Endgame Progression

**Buy or craft first.**
- A Thawing and a Stone Charm, a solid Ultimate Life Flask and an Ultimate Mana Flask.
- A staff with about 200% increased spell and fire damage, +3 levels and 35%+ Damage as Extra Fire, with two Greater or Perfect Desert Runes.
- Cheap rings, belt and helmet with resistances, life and armour; Fluxes balance resistances.
- Decree of Flight for cheap mobility (Ghostmarch if monsters block your rolls, at the cost of speed).
- A crossbow with +4 Projectile levels, the desecrated "Grenades have #% chance to activate a second time" and ideally attack speed. The cheapest craft: a +4 base with an open suffix, then a Preserved Jawbone with Omen of Dextral Necromancy and Omen of the Liege. A +5 base lets a level 19 Oil Grenade reach the same radius.
- Rare jewels with two useful modifiers, completed with Distilled Emotions (Guilt for fire damage on a Ruby, Greed for elemental on an Emerald, Envy for spell damage on a Sapphire, Ire for armour on a Ruby).

**Core upgrades.**
- Perfect Jeweller's Orbs on Flameblast and Oil Grenade (each Flameblast level is roughly 12% more damage).
- An amulet with + Projectile levels and/or Spirit; instill Immolation, or Paragon on a very good amulet. Defiance of Destiny is the comfortable defensive pick.
- Body armour: a Runeforged **The Brass Dome** with Warding Runes of Reinforcement, Remnants of Kalguur and level 4-5 Scavenged Plating doubles your effective life while mapping (about 2,500 life and 3,000 Ward). It needs a Warding Rune of Disintegration in the crossbow. Loreweave trades that for more gem quality, damage and speed. Morior Invictus or a high armour rare are alternatives.
- A Chiming Staff for Sigil of Power (15-45% more damage), a Prism of Belief with +2 Flameblast, and three- or four-mod jewels.

**Last.** Gloves with Katla's Gloom and high-value damage modifiers (ignite magnitude, faster damaging ailments, ailment magnitude, exposure effect), crafted with omens, and a corrupted Flameblast with +1 level or 23% quality.

## Gear Priorities

Gem quality and levels for Flameblast, a strong fire staff, and a crossbow with + Projectile levels and the "activate a second time" grenade modifier. Never flat fire damage on the crossbow, gloves or rings. Armour and life everywhere else, and aim for 200%+ increased item rarity in the endgame.

## FAQ

**Why is my Flameblast so weak?** Make sure it is set to weapon set 1 only; otherwise you are effectively using no weapon.

**Why does the ignited ground disappear?** It lasts 7-12 seconds depending on duration, but moving about one and a half screens away despawns it. Do not scale mobility faster than projectile speed and area of effect. The Brass Dome or Ghostmarch slow you down enough for this to stop being a problem.

**Why is Trinity not working?** It needs a perfect split between fire, cold and lightning, which comes from Trinity's alternate quality on Oil Grenade (not the staff set). Avoid any Damage as Extra Fire, Cold or Lightning (such as Heart of the Well) and any flat elemental damage on the crossbow.

**Why does Oil Grenade ignite on its own?** Flat fire damage on the crossbow, rings or gloves; no Elemental Focus with Trinity; Scavenged Plating not at level 4 (ideally corrupted to level 3); Arctic Armour without Brutality I; or Molten Being allocated outside weapon set 1. Keep Elemental Conflux on weapon set 1 and Cast on Dodge on weapon set 2.

**How do I get more Spirit?** From the amulet, the body armour before Loreweave or The Brass Dome, and up to +30 on the crossbow with two Soul Cores of Azcapa. Quality on Blasphemy lowers its reservation; Khatal's Rejuvenation and Heightened Curse raise it.
