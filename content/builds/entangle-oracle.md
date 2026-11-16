---
title: Entangle Oracle
class: Druid
ascendancy: Oracle
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Entangle Oracle Build Guide"
  author: "velyna (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/entangle-oracle-build-guide
  updated: 2026-09-02
summary: "Druid Oracle who spreads Entangle vines, overgrows them with Thunderstorm and crushes bosses with Thrashing Vines, casting with Life in the endgame."
tags: [caster, physical, league starter, mind over matter]
damage: Physical / Lightning
playstyle: Caster
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - "Easy map clear"
  - "Skills target enemies on their own"
  - "Cheap league start"
cons:
  - "Visual clutter"
  - "Pinnacle bosses need investment"
skills:
  - gem: "Entangle"
    supports: [Accelerated Growth II, Branching Fissures II, Atalui's Bloodletting, Uruk's Smelting, Rapid Casting II]
  - gem: "Thrashing Vines"
    supports: [Lifetap, Accelerated Growth II, Blindside, Exploit Weakness, Prolonged Duration II]
  - gem: "Thunderstorm"
    supports: [Shock, Living Lightning II, Concussive Spells, Lifetap, Prolonged Duration II]
  - gem: "Temporal Chains"
    supports: [Lifetap, Prolonged Duration II, Cursed Ground, Kalisa's Crescendo, Heightened Curse]
  - gem: "Archmage"
    supports: [Lightning Mastery, Vitality II, Clarity II]
  - gem: "Mana Remnants"
    supports: [Harmonic Remnants II, Remnant Potency I]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Entangle, Thunderstorm]
    - label: "Act Ii"
      gems: [Thrashing Vines]
  spirit:
    - label: "Act I"
      gems: [Attrition]
    - label: "Act Iii"
      gems: [Arctic Armour]
  supports:
    - label: "Act I"
      gems: [Unleash, Burgeon I, Concentrated Area]
    - label: "Act Ii"
      gems: [Accelerated Growth, Armour Break I, Considered Casting, Shock Conduction, Living Lightning]
    - label: "Act Iii"
      gems: [Branching Fissures I]
    - label: "Act Iv"
      gems: [Armour Break III, Prolonged Duration II]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Volcano"
            supports: [Burgeon I, Controlled Destruction]
          - gem: "Entangle"
          - gem: "Thunderstorm"
          - gem: "Attrition"
          - gem: "Unleash"
            supports: [Concentrated Area]
      - name: "Act 2"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Armour Break I]
          - gem: "Thrashing Vines"
            supports: [Accelerated Growth, Considered Casting]
          - gem: "Thunderstorm"
            supports: [Shock Conduction, Living Lightning]
          - gem: "Attrition"
          - gem: "Lightning Bolt"
      - name: "Act 3"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Armour Break I, Branching Fissures I]
          - gem: "Thrashing Vines"
            supports: [Accelerated Growth, Considered Casting]
          - gem: "Thunderstorm"
            supports: [Shock Conduction, Living Lightning]
          - gem: "Attrition"
          - gem: "Arctic Armour"
      - name: "Act 4"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Armour Break III, Branching Fissures I]
          - gem: "Thrashing Vines"
            supports: [Accelerated Growth, Considered Casting, Prolonged Duration II]
          - gem: "Thunderstorm"
            supports: [Shock Conduction, Living Lightning, Prolonged Duration II]
          - gem: "Attrition"
          - gem: "Arctic Armour"
      - name: "Act 5-7"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Rapid Casting II, Branching Fissures I, Physical Mastery]
          - gem: "Thrashing Vines"
            supports: [Heft, Concentrated Area, Prolonged Duration II, Physical Mastery]
          - gem: "Thunderstorm"
            supports: [Shock Conduction, Living Lightning, Prolonged Duration II]
          - gem: "Attrition"
          - gem: "Arctic Armour"
      - name: "Endgame"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth II, Branching Fissures II, Atalui's Bloodletting, Physical Mastery, Rapid Casting II]
          - gem: "Thrashing Vines"
            supports: [Prolonged Duration II, Concentrated Area, Physical Mastery, Blindside, Efficiency II]
          - gem: "Thunderstorm"
            supports: [Shock, Living Lightning II, Prolonged Duration II, Concussive Spells]
          - gem: "Attrition"
            supports: [Vitality II, Clarity II]
          - gem: "Mana Remnants"
            supports: [Harmonic Remnants II, Remnant Potency I]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Entangle"
          - gem: "Thunderstorm"
          - gem: "Thrashing Vines"
      - name: "Single Target"
        steps:
          - gem: "Entangle"
          - gem: "Thunderstorm"
          - gem: "Thrashing Vines"
rotations:
  - name: "Clear"
    steps:
      - gem: "Entangle"
      - gem: "Thunderstorm"
      - gem: "Thrashing Vines"
  - name: "Single Target"
    steps:
      - gem: "Temporal Chains"
      - gem: "Entangle"
      - gem: "Thunderstorm"
      - gem: "Thrashing Vines"
gear:
  weapon:
    base: Reaping Staff
    mods: [+Level of all Physical Spell Skills, Archon of Nature on Overgrowing Plant, Increased Spell physical Damage, Spell Damage with Spells that Cost Life, Spell Critical Hit Chance]
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Perfect Iron Rune: 35% increased Spell Damage"]
  helmet:
    base: Cryptic Crown
    mods: [Armour and Energy Shield, Life Cost Efficiency, +Maximum Life, Life Regeneration, +Maximum Mana]
    runes: ["Greater Rebirth Rune: Regenerate 0.45% of maximum Life per second", "Idol of Eeshta: 15% increased Cost Efficiency"]
  body:
    base: Conjurer Mantle
    mods: [Armour and Energy Shield, +Maximum Life, Life Regeneration]
    runes: ["Rabbit Idol: 12% increased Rarity of Items found", "Perfect Rebirth Rune: Regenerate 0.5% of maximum Life per second", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  gloves:
    base: Adherent Cuffs
    mods: [Armour and Energy Shield, +Maximum Life, Increased Effect of Socketed Items]
    runes: ["Tecrod's Gaze: 25% increased Life Cost Efficiency"]
  boots:
    base: Cryptic Leggings
    mods: [Armour and Energy Shield, +Maximum Life, Movement Speed, +Maximum Mana]
    runes: ["Idol of Yeena: 30% increased Skill Effect Duration with Plant Skills", "Soul Core of Quipolatl: 15% reduced Slowing Potency of Debuffs on You"]
  amulet:
    base: Gold Amulet
    mods: [+Maximum Life, +Spirit, Critical Hit Chance, Life Regeneration, Damage Taken from Mana before Life]
  ring1:
    base: Prismatic Ring
    mods: [+Maximum Life, +Maximum Mana]
  ring2:
    base: Ruby Ring
    mods: [+Maximum Life, +Maximum Mana]
  belt:
    base: Utility Belt
    mods: [+Maximum Life, Life Regeneration, Armour, +Maximum Mana]
  weapon2:
    base: Acrid Wand
    mods: [+Level of all Lightning Spell Skills, Increased Spell Damage, Increased Cast Speed, Critical Damage Bonus, Gain Damage as Extra Lightning]
  offhand2:
    unique: Effigy of Cruelty
gearStages:
  campaign:
    weapon:
      base: Voltaic Staff
      mods: [+Level of all Spell Skills, +Level of all Physical Spell Skills, Increased Spell Damage, Spell Critical Hit Chance, Increased Cast Speed]
    helmet:
      base: Archon Crown
      mods: [+Maximum Life]
    body:
      base: Wolfskin Mantle
      mods: [+Maximum Life, +Strength]
    gloves:
      base: Bound Cuffs
      mods: [+Maximum Life]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    boots:
      base: Faithful Leggings
      mods: [+Maximum Life, Movement Speed, +Intelligence]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    amulet:
      base: Stellar Amulet
      mods: [+Maximum Life, +Dexterity]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life]
    ring2:
      base: Amethyst Ring
      mods: [+Maximum Life, +Dexterity]
    belt:
      base: Utility Belt
      mods: [+Maximum Life]
  mapping:
    weapon:
      base: Reaping Staff
      mods: [Increased Spell physical Damage, Spell Critical Hit Chance, +Level of all Physical Spell Skills, Archon of Nature on Overgrowing Plant, Spell Damage with Spells that Cost Life]
    helmet:
      base: Divine Crown
      mods: [Armour and Energy Shield, +Maximum Life, Critical Hit Chance, +Maximum Mana]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency"]
    body:
      base: Zenith Vestments
      mods: [Armour and Energy Shield, +Maximum Life, +Spirit, Life Regeneration]
      runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Gleaming Cuffs
      mods: [Armour and Energy Shield, +Maximum Life, Critical Damage Bonus, +Maximum Mana]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    boots:
      base: Warlock Leggings
      mods: [Armour and Energy Shield, +Maximum Life, Movement Speed, +Maximum Mana]
      runes: ["Idol of Yeena: 30% increased Skill Effect Duration with Plant Skills"]
    amulet:
      base: Stellar Amulet
      mods: [+Maximum Life]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Mana Regeneration, +Maximum Mana]
    ring2:
      base: Amethyst Ring
      mods: [+Maximum Life, +Maximum Mana]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, Life Regeneration, Armour]
    weapon2:
      base: Galvanic Wand
      mods: [+Level of all Lightning Spell Skills, Increased Spell Damage, Increased Lightning Damage, Gain Damage as Extra Lightning, Increased Cast Speed]
    offhand2:
      unique: Effigy of Cruelty
  endgame:
    weapon:
      base: Reaping Staff
      mods: [+Level of all Physical Spell Skills, Archon of Nature on Overgrowing Plant, Increased Spell physical Damage, Spell Damage with Spells that Cost Life, Spell Critical Hit Chance]
      runes: ["2× Perfect Vision Rune: 28% increased Critical Hit Chance for Spells", "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    helmet:
      base: Cryptic Crown
      mods: [Armour and Energy Shield, Life Cost Efficiency, +Maximum Life, Life Regeneration, +Maximum Mana]
      runes: ["Greater Rebirth Rune: Regenerate 0.45% of maximum Life per second", "Idol of Eeshta: 15% increased Cost Efficiency"]
    body:
      base: Conjurer Mantle
      mods: [Armour and Energy Shield, +Maximum Life, Life Regeneration]
      runes: ["2× Soul Core of Jiquani: 5% increased maximum Life", "Rabbit Idol: 12% increased Rarity of Items found"]
    gloves:
      base: Adherent Cuffs
      mods: [Armour and Energy Shield, +Maximum Life, Increased Effect of Socketed Items]
      runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Tecrod's Gaze: 25% increased Life Cost Efficiency"]
    boots:
      base: Cryptic Leggings
      mods: [Armour and Energy Shield, +Maximum Life, Movement Speed, +Maximum Mana]
      runes: ["Idol of Yeena: 30% increased Skill Effect Duration with Plant Skills", "Soul Core of Quipolatl: 15% reduced Slowing Potency of Debuffs on You"]
    amulet:
      base: Gold Amulet
      mods: [+Maximum Life, +Spirit, Critical Hit Chance, Life Regeneration, Damage Taken from Mana before Life]
    ring1:
      base: Prismatic Ring
      mods: [+Maximum Life, +Maximum Mana]
    ring2:
      base: Ruby Ring
      mods: [+Maximum Life, +Maximum Mana]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, Life Regeneration, Armour, +Maximum Mana]
    weapon2:
      base: Acrid Wand
      mods: [+Level of all Lightning Spell Skills, Increased Spell Damage, Increased Cast Speed, Critical Damage Bonus, Gain Damage as Extra Lightning]
    offhand2:
      unique: Effigy of Cruelty
  minmax:
    weapon:
      base: Reaping Staff
      mods: [+Level of all Physical Spell Skills, Archon of Nature on Overgrowing Plant, Increased Spell physical Damage, Spell Damage with Spells that Cost Life, Spell Critical Hit Chance]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Perfect Iron Rune: 35% increased Spell Damage"]
    helmet:
      base: Cryptic Crown
      mods: [Armour and Energy Shield, Life Cost Efficiency, +Maximum Life, Life Regeneration, +Maximum Mana]
      runes: ["Greater Rebirth Rune: Regenerate 0.45% of maximum Life per second", "Idol of Eeshta: 15% increased Cost Efficiency"]
    body:
      base: Conjurer Mantle
      mods: [Armour and Energy Shield, +Maximum Life, +Spirit, Life Regeneration]
      runes: ["Rabbit Idol: 12% increased Rarity of Items found", "Perfect Rebirth Rune: Regenerate 0.5% of maximum Life per second", "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Adherent Cuffs
      mods: [Armour and Energy Shield, +Maximum Life, Increased Effect of Socketed Items]
      runes: ["Tecrod's Gaze: 25% increased Life Cost Efficiency"]
    boots:
      base: Cryptic Leggings
      mods: [Armour and Energy Shield, +Maximum Life, Movement Speed, Slow Effect, +Maximum Mana]
      runes: ["Idol of Yeena: 30% increased Skill Effect Duration with Plant Skills", "Soul Core of Quipolatl: 15% reduced Slowing Potency of Debuffs on You"]
    amulet:
      base: Gold Amulet
      mods: [+Level of all Spell Skills, +Spirit, +Maximum Life, Life Regeneration, Damage Taken from Mana before Life]
    ring1:
      base: Prismatic Ring
      mods: [+Maximum Life, +Maximum Mana]
    ring2:
      base: Ruby Ring
      mods: [+Maximum Life, +Maximum Mana]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, +Maximum Mana, Life Regeneration, Armour]
    weapon2:
      base: Acrid Wand
      mods: [+Level of all Lightning Spell Skills, Increased Spell Damage, Increased Cast Speed, Critical Damage Bonus, Gain Damage as Extra Lightning]
      runes: ["3× Perfect Storm Rune: Gain 12% of Damage as Extra Lightning Damage"]
    offhand2:
      unique: "Effigy of Cruelty"
passives:
  attribute: int
  path:
    - "Relentless Vindicator"
    - "Resilient Soul"
    - "Bolstering Presence"
    - "Scarred Faith"
    - "Zealot's Oath"
    - "Primal Hunger"
    - "Ancient Aegis"
    - "Aspiring Genius"
    - "Dangerous Blossom"
    - "Elemental Equilibrium"
    - "Mind Over Matter"
    - "Blackflame Covenant"
    - "Eldritch Battery"
    - "Wildsurge Incantation"
    - "Deadly Swarm"
    - "Grounded in the Earth"
    - "Devoted Protector"
    - "Everlasting Bloom"
    - "Arcane Nature"
    - "Arcane Intensity"
    - "Sanguimantic Rituals"
    - "Desensitisation"
    - "Breaking Point"
    - "Ether Flow"
    - "Stormwalker"
    - "Chronomancy"
    - "Erraticism"
    - "Full Recovery"
  ascendancy: [The Unseen Path, Entwined Realities, The Lesser Harm, Forced Outcome]
  weaponSet1: [Deadly Thorns, Calculated Hunter, Wasting Casts, Cut to the Bone, Blood Tearing]
  weaponSet2: [Power Conduction]
farming:
  clear: 3
  single: 1
  tank: 2
  speed: 2
  style: ranged
  traits: []
---
## How It Works

[[Entangle]] spreads vines under enemies (it stacks up to 12) and [[Thunderstorm]] on top makes them Overgrown, so Accelerated Growth II blows them up and blinds. [[Thrashing Vines]] grows bigger vines that slam rares and bosses, and [[Temporal Chains]] slows them down. Oracle's Entwined Realities lets you allocate strong notables near your allocated keystones, for more power with fewer points.

The campaign plays as a standard life-based caster stacking armour and "Armour applies to Elemental Damage". In the endgame you cast with Life (Atalui's Bloodletting, Lifetap, Blood Transfusion on the tree), which lets you run both Mind Over Matter and Eldritch Battery: your energy shield and mana take damage before your life.

## Leveling

In Act 1, Entangle only slows and gathers enemies near Volcano: charge Volcano for 2 to 4 seconds, release, cast Entangle once or twice and use Lightning Bolt until you need to move. From Act 2, the loop is Entangle a few times, then Thunderstorm on top. Thrashing Vines arrives near the end of Act 2: link it to damage supports such as Accelerated Growth and Considered Casting. Living Lightning minions extract impales from Impale Chance. In the midgame, swap Arctic Armour for [[Mana Remnants]], and keep Attrition until Archmage.

## Playstyle

**Mapping.** Cast [[Entangle]] a few times on packs and [[Thunderstorm]] over it to trigger the overgrowth.

**Bossing.** Cast [[Temporal Chains]] just before the boss becomes active, stack Entangle, Thunderstorm on top, and [[Thrashing Vines]] for big bursts.

## Endgame Progression

**Late campaign and early maps.**
- Life, energy shield and armour on every armour piece. A staff with + Physical or Spell gem levels and other damage modifiers, and an amulet with + levels and life.
- Cast speed on rings, weapon and amulet helps you cast everything before enemies react.
- Effigy of Cruelty in weapon set 2 with only Thunderstorm on that set: Thunderstorm then applies Critical Weakness. Everything else goes on set 1.
- Idol of Uldurn helps single target and clear with Thrashing Vines and Thunderstorm. Bushwhack adds defence through Pin in the campaign.

**Preparing for Archmage.** [[Archmage]] adds damage that scales with your mana, but it gives Accelerated Growth explosions a mana cost, which Atalui's Bloodletting turns into a life cost. Before enabling it, gather:
- Vitality II, one or two Greater Rebirth Runes, Tecrod's Gaze (gloves) and an Idol of Eeshta;
- two or three life regeneration suffixes on gear;
- the Necromantic Ward anoint on the amulet.

Atalui's Bloodletting should be among your first big purchases. Lifetap goes on Thrashing Vines and Thunderstorm. Only enable Archmage late in the endgame.

**Endgame uniques.** With Uul-Netol's Embrace, replace Rapid Casting II and Uruk's Smelting on Entangle with Uul-Netol's Embrace and Physical Mastery. Rakiata's Flow replaces Prolonged Duration II in Thrashing Vines.

## Gear Priorities

+ Physical and Spell gem levels on the staff and amulet, then cast speed. Life, energy shield and armour on armour pieces, and life and mana regeneration to sustain the life costs.

## FAQ

**What is Undying Hate for?** It converts the keystones in its radius into a new one depending on its name. "In tribute to Tecrod" gives Sacrifice of Blood: life regeneration scaling with life spent recently. It also changes small and medium nodes, so the socket near Blackflame Covenant is ideal: nothing useful is lost.

**How do I sustain life and mana in the endgame?** Life costs plus mana taking damage through Mind Over Matter and Eldritch Battery make sustain essential. Use Clarity II and Vitality II, Mana Remnants with Harmonic Remnants II and Remnant Potency I, keep Thunderstorm at a low level for a lower cost (as long as it can still Drench enemies of your level), get Arcane Surge from Aspiring Genius turned into life by Sanguimantic Rituals, and Sacrifice of Blood from a Tecrod Undying Hate.
