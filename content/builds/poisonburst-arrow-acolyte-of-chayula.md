---
title: Poisonburst Arrow Acolyte of Chayula
class: Monk
ascendancy: Acolyte of Chayula
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Poisonburst Arrow Acolyte of Chayula Build Guide"
  author: "goratha (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/poisonburst-arrow-acolyte-of-chayula-build-guide
  updated: 2026-11-04
summary: "Acolyte of Chayula whose Poisonburst Arrows set off chains of poison, bleed and chaos explosions, then awakens into the Archon of Chayula and its chaos tornadoes."
tags: [bow, poison, chaos, damage over time, evasion, energy shield]
damage: Chaos / Physical
playstyle: Ranged attack
difficulty: medium
budget: low
tiers:
  starter: D
pros:
  - "Chain reactions of explosions for clear"
  - "Choice of Power roughly triples damage"
  - "Easy chaos resistance with Chayula's Gift"
cons:
  - "Weak single target before Toxic Growth"
  - "Archon of Chayula has a 20-second lockout"
skills:
  - gem: "Archon of Chayula"
    supports: [Prolonged Duration II, Magnified Area II, Poison III, Withering Touch, Corrosion]
  - gem: "Into the Breach"
    supports: [Harmonic Remnants II, Remnant Potency III, Khatal's Rejuvenation]
  - gem: "Poisonburst Arrow"
    supports: [Bleed III, Bursting Plague, Escalating Poison, Deadly Poison II, Fork]
  - gem: "Wind Dancer"
    supports: [Rage II, Maim, Blind II, Life Leech III]
  - gem: "Herald of Plague"
    supports: [Chaos Mastery]
  - gem: "Plague Bearer"
    supports: [Chaos Mastery, Astral Projection, Deadly Poison II, Exploit Weakness, Magnified Area II]
  - gem: "Blasphemy"
    supports: [Repulsion, Magnified Area II, Bleed III, Living Lightning II]
  - gem: "Herald of Blood"
    supports: [Poison III, Bursting Plague, Bleed III, Magnified Area II, Admixture]
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II]
  - gem: "Toxic Growth"
    supports: [Concentrated Area, Escalating Poison, Deadly Poison II, Long Fuse II, Arakaali's Lust]
  - gem: "Vine Arrow"
    supports: [Prolonged Duration II, Deliberation, Swift Affliction II, Magnified Area II, Stoicism II]
gemPriority:
  skills:
    - label: ""
      gems: [Poisonburst Arrow, Vine Arrow, Contagion, Toxic Growth]
  spirit:
    - label: "Act I"
      gems: [Herald of Blood]
    - label: "Act Ii"
      gems: [Plague Bearer]
    - label: "Act Iii"
      gems: [Herald of Plague]
    - label: "Act Iv"
      gems: [Blasphemy]
  supports:
    - label: "Poisonburst"
      gems: [Bleed I, Bursting Plague]
    - label: "Toxic Growth"
      gems: [Concentrated Area, Escalating Poison, Deadly Poison I]
leveling:
  - name: "Campaign"
    steps:
      - name: "Campaign"
        skills:
          - gem: "Into the Breach"
            supports: [Harmonic Remnants II, Remnant Potency III]
          - gem: "Herald of Plague"
          - gem: "Toxic Growth"
            supports: [Concentrated Area, Escalating Poison, Deadly Poison II, Long Fuse I]
          - gem: "Pounce"
          - gem: "Vine Arrow"
            supports: [Prolonged Duration I, Swift Affliction I, Deliberation]
          - gem: "Poisonburst Arrow"
            supports: [Bleed II, Bursting Plague, Escalating Poison]
          - gem: "Wind Dancer"
          - gem: "Plague Bearer"
            supports: [Magnified Area I, Chaos Mastery]
          - gem: "Herald of Blood"
            supports: [Poison II, Bursting Plague, Bleed I]
          - gem: "Blasphemy"
            supports: [Repulsion, Magnified Area I, Living Lightning]
      - name: "Early Maps"
        skills:
          - gem: "Archon of Chayula"
            supports: [Prolonged Duration II, Magnified Area II, Poison III, Withering Touch, Corrosion]
          - gem: "Into the Breach"
            supports: [Harmonic Remnants II, Remnant Potency III, Khatal's Rejuvenation]
          - gem: "Poisonburst Arrow"
            supports: [Bleed III, Bursting Plague, Escalating Poison, Deadly Poison II, Fork]
          - gem: "Wind Dancer"
            supports: [Rage II, Maim, Blind II, Life Leech III]
          - gem: "Herald of Plague"
            supports: [Chaos Mastery]
          - gem: "Plague Bearer"
            supports: [Chaos Mastery, Astral Projection, Deadly Poison II, Exploit Weakness, Magnified Area II]
          - gem: "Blasphemy"
            supports: [Repulsion, Magnified Area II, Bleed III, Living Lightning II]
          - gem: "Herald of Blood"
            supports: [Poison III, Bursting Plague, Bleed III, Magnified Area II, Admixture]
          - gem: "Ghost Dance"
            supports: [Cooldown Recovery II]
          - gem: "Toxic Growth"
            supports: [Concentrated Area, Escalating Poison, Deadly Poison II, Long Fuse II, Arakaali's Lust]
          - gem: "Vine Arrow"
            supports: [Prolonged Duration II, Deliberation, Swift Affliction II, Magnified Area II, Stoicism II]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Poisonburst Arrow"
            count: 5
            label: "Poisonburst Until 100% Plaguebearer"
          - gem: "Plague Bearer"
            label: "Use Active At 100%"
      - name: "Single Target"
        steps:
          - gem: "Toxic Growth"
          - gem: "Poisonburst Arrow"
          - gem: "Plague Bearer"
rotations:
  - name: "Clear"
    steps:
      - gem: "Poisonburst Arrow"
      - gem: "Plague Bearer"
        label: "Use Active At 100%"
      - gem: "Archon of Chayula"
  - name: "Single Target"
    steps:
      - gem: "Archon of Chayula"
      - gem: "Vine Arrow"
        count: 2
      - gem: "Toxic Growth"
      - gem: "Plague Bearer"
      - gem: "Toxic Growth"
gear:
  weapon:
    base: Obliterator Bow
    mods: [Increased Physical Damage, Adds Physical Damage, Chance to Fire Additional Projectiles, Onslaught on Kill]
    runes: ["Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time", "Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow"]
  offhand:
    base: Primed Quiver
    mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, +Dexterity, Life on Kill, Chance to Fire Additional Projectiles]
  helmet:
    base: Sorcerous Tiara
    mods: [Energy Shield, +Maximum Life, Fire Resistance, Lightning Resistance, Archon Duration]
    runes: ["Rune of Reach: Remnants you create have 15% increased effect"]
  body:
    base: Corsair Coat
    mods: [Evasion Rating, +Spirit, +Dexterity, Fire Resistance, Deflection]
    runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Storm Rune: +18% to Lightning Resistance", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
  gloves:
    base: Stalking Bracers
    mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Increased Attack Speed, Cold Resistance, Deflection]
    runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict"]
  boots:
    base: Charmed Shoes
    mods: [Movement Speed, Evasion Rating, Energy Shield, Evasion and Energy Shield, +Spirit, Deflection]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
  amulet:
    base: Bloodstone Amulet
    mods: [Evasion Rating, +Spirit, +All Attributes, +Strength, Grants a Passive Skill, Remnant Effect]
  ring1:
    base: Ruby Ring
    mods: [Adds Physical Damage to Attacks, Fire Resistance, Cold Resistance, Remnant Effect]
  ring2:
    base: Sapphire Ring
    mods: [Adds Physical Damage to Attacks, +Maximum Life, Increased Attack Speed, +Intelligence, Lightning Resistance, Remnant Effect]
  belt:
    base: Long Belt
    mods: [+Maximum Life, Cold Resistance, Lightning Resistance]
  weapon2:
    unique: Hysseg's Claw
gearStages:
  campaign:
    weapon:
      unique: "Splinterheart"
      runes: ["2× Greater Iron Rune: 18% increased Physical Damage"]
    offhand:
      base: Toxic Quiver
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Mana on Kill]
    helmet:
      base: Leatherbound Hood
      mods: [Evasion Rating, +Maximum Life, Lightning Resistance]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    body:
      base: Ascetic Garb
      mods: [Evasion Rating, Energy Shield, Evasion and Energy Shield, +Maximum Life, +Spirit, Fire Resistance]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield", "Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Buckled Wraps
      mods: [Evasion and Energy Shield, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, +Dexterity, Cold Resistance, Mana on Kill]
      runes: ["Lesser Desert Rune: +10% to Fire Resistance"]
    boots:
      base: Runeforged Feathered Sandals
      mods: [Movement Speed, Energy Shield, +Maximum Life, Lightning Resistance]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    amulet:
      base: Jade Amulet
      mods: [+Maximum Life, +Spirit]
    ring1:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Evasion Rating, +Dexterity, +Intelligence, Fire Resistance]
    ring2:
      unique: "Blackheart"
    belt:
      base: Wide Belt
      mods: [+Maximum Life, +Strength, Cold Resistance, Lightning Resistance]
    weapon2:
      unique: Amor Mandragora
  mapping:
    weapon:
      base: Obliterator Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Chance to Fire Additional Projectiles, Onslaught on Kill]
      runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time"]
    offhand:
      base: Primed Quiver
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, +Dexterity, Life on Kill, Chance to Fire Additional Projectiles]
    helmet:
      base: Sorcerous Tiara
      mods: [Energy Shield, +Maximum Life, Fire Resistance, Lightning Resistance, Archon Duration]
      runes: ["Rune of Reach: Remnants you create have 15% increased effect"]
    body:
      base: Corsair Coat
      mods: [Evasion Rating, +Spirit, +Dexterity, Fire Resistance, Deflection]
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Stalking Bracers
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Increased Attack Speed, Cold Resistance, Deflection]
      runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict"]
    boots:
      base: Charmed Shoes
      mods: [Movement Speed, Evasion Rating, Energy Shield, Evasion and Energy Shield, +Spirit, Deflection]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Bloodstone Amulet
      mods: [Evasion Rating, +Spirit, +All Attributes, +Strength, Grants a Passive Skill, Remnant Effect]
    ring1:
      base: Ruby Ring
      mods: [Adds Physical Damage to Attacks, Fire Resistance, Cold Resistance, Remnant Effect]
    ring2:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life, Increased Attack Speed, +Intelligence, Lightning Resistance, Remnant Effect]
    belt:
      base: Long Belt
      mods: [+Maximum Life, Cold Resistance, Lightning Resistance]
    weapon2:
      unique: Hysseg's Claw
  minmax:
    weapon:
      base: Obliterator Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Accuracy Rating, Critical Hit Chance, Critical Damage Bonus, Onslaught on Kill]
      runes: ["Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time", "Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow"]
    offhand:
      base: Primed Quiver
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Increased Damage with Bow Skills, Attack Critical Hit Chance, Critical Damage Bonus, Increased Attack Speed]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Maximum Life, Critical Hit Chance, Lightning Resistance, Archon Duration]
      runes: ["Rune of Reach: Remnants you create have 15% increased effect", "Raven-Touched Shard"]
    body:
      base: Corsair Coat
      mods: [Evasion Rating, +Spirit, Chaos Resistance, Deflection]
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Storm Rune: +18% to Lightning Resistance", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Polished Bracers
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Critical Damage Bonus, Increased Attack Speed, Deflection]
      runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Fenumus' Rune of Draining: 20% increased Withered Magnitude"]
    boots:
      base: Charmed Shoes
      mods: [Movement Speed, Evasion Rating, Energy Shield, Evasion and Energy Shield, +Spirit, Deflection]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Absent Amulet
      mods: [+Spirit, +Level of all Projectile Skills, Critical Hit Chance, Grants a Passive Skill, Remnant Effect]
    ring1:
      base: Ruby Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Fire Resistance, Cold Resistance, Chaos Resistance, Remnant Effect]
    ring2:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life, Increased Attack Speed, +Intelligence, Lightning Resistance, Remnant Effect]
    belt:
      unique: "Mageblood"
    weapon2:
      unique: Hysseg's Claw
passives:
  attribute: str
  path:
    - "Flow Like Water"
    - "Mindful Awareness"
    - "Step Like Mist"
    - "Flow State"
    - "Subterfuge Mask"
    - "Crippling Toxins"
    - "Escape Velocity"
    - "Tenfold Attacks"
    - "Kite Runner"
    - "First Teachings of the Keeper"
    - "Escalating Toxins"
    - "Toxic Tolerance"
    - "First Principle of the Hollow"
    - "The Hollowkeeper"
    - "Shimmering"
    - "Quick Fingers"
    - "Spectral Ward"
    - "Catlike Agility"
    - "Blur"
  ascendancy: [Chayula's Gift, Waking Dream, Lucid Dreaming]
  weaponSet1: [Blinding Strike, Lasting Toxins, Stacking Toxins, Master Fletching, Killer Instinct, Leeching Toxins, Building Toxins]
  weaponSet2: [Empowering Remnants, Remnant Attraction]
farming:
  clear: 3
  single: 1
  tank: 2
  speed: 2
  style: ranged
  traits: [evasion, es, dot]
  adjust:
    breach: 1
  notes:
    breach: "Archon of Chayula, the last ascendancy notable, unlocks after killing Tul and Esh in the Breach questline."
---
## How It Works

[[Poisonburst Arrow]] starts the chain reaction: [[Herald of Blood]], [[Herald of Plague]] and Repulsion turn poisoned and bleeding enemies into a cascade of explosions. Bursting Plague can bleed, so it chains itself with Herald of Blood. [[Toxic Growth]] is the single-target skill, and [[Plague Bearer]] blows up its pustules in one use.

The Acolyte's Waking Dream spawns flame remnants around you: purple flames give 7% of damage as extra chaos, red and blue ones leech life and mana. Lucid Dreaming's Choice of Power adds damage as chaos and triples the build's damage. Chayula's Gift doubles your chaos resistance sources and adds +10% maximum chaos resistance. The last point, Archon of Chayula, gives 20% more physical and chaos damage and summons Chaos Tornadoes that Wither enemies and detonate Toxic Growth almost instantly; it needs Glory (gained within a second of attacking) and has a 20-second lockout after it ends. It unlocks after killing Tul and Esh in the endgame Breach questline.

Defences are evasion, energy shield and deflection.

## Leveling

Poisonburst Arrow works from level 1 but lacks single target without flat damage on gear: Explosive Grenade or Twister are alternatives until level 14. Link Bleed I and Bursting Plague to Poisonburst Arrow, use Contagion early in Act 1, and link Herald of Blood (your first Spirit gem) to Poison I, Bursting Plague and Bleed I; keep it low level if attributes are tight. [[Vine Arrow]] takes damage supports. At level 14, [[Toxic Growth]] with Concentrated Area for easier overlaps. Plague Bearer is the second Spirit gem and Herald of Plague the third; Blasphemy and Repulsion once you have Spirit on gear and enough Intelligence (Repulsion scales with flat damage on quiver, rings and gloves, not the weapon).

Gear: flat damage on rings, gloves and quiver. Splinterheart is a great early bow that can be runeforged (with Medved's Crest of the Circle) at level 40 and lasts into maps. Watch for + attributes, and Spirit on chest and amulet for Blasphemy and Repulsion.

## Playstyle

**Mapping.** Spam Poisonburst Arrow and use Plague Bearer's active once it reaches 100%. Early on, weave in Vine Arrow and Toxic Growth for magic packs.

**Bossing.** Use Archon of Chayula whenever it is up, cast Vine Arrow a few times, then Toxic Growth every other attack: it overrides its own pustules if they do not explode fast enough, so only recast after they pop. Use Plague Bearer between. With very high damage you can spam Toxic Growth while Archon is active.

## Endgame Progression

**Early maps.**
- A high evasion body armour and a high energy shield helmet, for Subterfuge Mask and later Spectral Ward. Keep stacking flat damage on gloves, rings and quiver; a Primed Quiver is ideal for attack speed.
- + Projectile levels anywhere (amulet, bow, quiver, "Marksman" gloves) add a lot of damage. More Spirit lets you run [[Ghost Dance]] instead of Pounce for recovery (its cost drops with quality).
- A cheap amulet anoint: Serrated Edges for damage, or Beastial Skin defensively until you take it on the tree.
- Support Waking Dream with Remnant Potency III and Harmonic Remnants II, plus Khatal's Rejuvenation for Ghost Dance cooldown. Fork on Poisonburst Arrow for clear. Living Lightning II on Blasphemy and Repulsion to trigger it. Prolonged Duration II on Archon of Chayula for longer tornadoes, and Poison III to detonate Toxic Growth. Arakaali's Lust is a cheap, strong boost for Toxic Growth, especially at +5 poisons.

**Endgame.**
- Craft the helmet with Cyclonic Alloy for better Archon uptime. Remnant effect on rings and amulet (Omen of the Liege with a Preserved Collarbone, an Amanamu prefix) and a Rune of Reach in the helmet make the purple flames much stronger.
- In the bow, an Idol of Thruldana (+1 poison cap) and Countess Seske's Rune of Archery (an extra arrow); aim for 100% surpassing chance of an additional arrow for a third.
- Craiceann's Rune of Warding with The Hollowkeeper makes you immune to curses. Replace Repulsion with Despair for single-target bosses.

**Min-max.** Move from non-crit to crit: 50% critical chance on helmet, quiver and amulet for Garukhan's Resolve on Toxic Growth. A bow with high physical damage, critical chance and Onslaught on Kill. An Absent Amulet with Eternal Rage (enables Tacati's Ire on Plague Bearer) with Spirit and + Projectile levels; Dominion as an instill keeps Archon always active at reduced effect. Vorana's Siege on Plague Bearer, Her Declaration on Ghost Dance. Mageblood (Diamond flask if under 50% crit), Headhunter, and Rite of Passage (Cat, or Serpent as a cheaper option).

## Gear Priorities

Flat damage on rings, gloves and quiver and the bow's damage, + Projectile levels, then evasion and energy shield, Spirit for the heralds and auras, and remnant effect for Waking Dream.

## FAQ

**What is weapon set 2 "snapshotting"?** Entering a zone while on weapon set 2, which holds the remnant nodes, keeps those nodes active for the whole zone. If you enter on weapon set 1 by mistake, relog or re-enter the zone. The source guide notes this may be fixed; remnant pickup range on gear or passives is the fallback.

**Why is my single target weak?** Use Concentrated Area on Toxic Growth, only recast Toxic Growth after the first pustules explode, and get as much flat damage on rings, quiver and gloves and damage on the bow as possible.
