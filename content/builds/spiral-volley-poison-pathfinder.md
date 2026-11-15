---
title: Spiral Volley Poison Pathfinder
class: Ranger
ascendancy: Pathfinder
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Spiral Volley Poison Pathfinder Build Guide"
  author: "Crouching_Tuna (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/spiral-volley-poison-pathfinder
  updated: 2026-09-01
summary: "Ranger Pathfinder who doubles the poison limit with Overwhelming Toxicity, clears with chaining Spiral Volleys and Herald of Plague, and bursts bosses with Toxic Growth pustules."
tags: [bow, poison, chaos, damage over time, evasion]
damage: Physical / Chaos
playstyle: Ranged attack
difficulty: medium
budget: low
tiers:
  starter: C
  endgame: A
  bossing: B
pros:
  - "Poison spreads from pack to pack on its own"
  - "Immune to slows and heavy stuns while sprinting"
  - "Strong single target with Toxic Growth"
cons:
  - "Damage depends almost entirely on the bow and quiver"
  - "Few sources of life"
skills:
  - gem: "Spiral Volley"
    supports: [Armour Break III, Corrosion, Poison III, Bursting Plague]
  - gem: "Poisonburst Arrow"
    supports: [Multishot II, Bursting Plague, Corrosion, Armour Break III]
  - gem: "Toxic Growth"
    supports: [Arakaali's Lust, Long Fuse II, Deadly Poison II, Concentrated Area]
  - gem: "Vine Arrow"
    supports: [Prolonged Duration II, Overabundance II, Magnified Area II, Swift Affliction II]
  - gem: "Gas Arrow"
    supports: [Persistent Ground III, Encroaching Ground, Deadly Poison II, Prolonged Duration II]
  - gem: "Despair"
    supports: [Heightened Curse, Chaos Mastery, Ritualistic Curse, Focused Curse]
  - gem: "Wind Dancer"
    supports: [Blind II, Maim, Poison III, Life Leech III]
  - gem: "Herald of Plague"
    supports: [Chaos Mastery]
  - gem: "Withering Presence"
    supports: [Prolonged Duration II, Chaos Mastery]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Lightning Arrow, Lightning Rod, Frost Bomb, Stormcaller Arrow]
    - label: "Act Ii"
      gems: [Gas Arrow, Toxic Growth, Vine Arrow, Poisonburst Arrow]
    - label: "Act Iii"
      gems: [Despair]
    - label: "4 Sockets"
      gems: [Spiral Volley]
  spirit:
    - label: "Level 1-22"
      gems: [Herald of Thunder]
    - label: "Act Ii"
      gems: [Wind Dancer]
    - label: "Act Iii"
      gems: [Herald of Plague]
    - label: "Epilogue"
      gems: [Withering Presence]
    - label: "Hybrid"
      gems: [Ghost Dance]
  supports:
    - label: "Act I"
      gems: [Multishot I, Elemental Armament I, Chain I]
    - label: "Act Ii"
      gems: [Concentrated Area, Deadly Poison I, Persistent Ground I, Encroaching Ground, Bursting Plague]
    - label: "Act Iii"
      gems: [Long Fuse I]
leveling:
  - steps:
      - name: "Level 1-22"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain I]
          - gem: "Lightning Rod"
            supports: [Multishot I, Elemental Armament I]
          - gem: "Frost Bomb"
          - gem: "Stormcaller Arrow"
            supports: [Multishot I, Elemental Armament I]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I]
      - name: "Campaign"
        skills:
          - gem: "Poisonburst Arrow"
            supports: [Bursting Plague, Multishot II]
          - gem: "Toxic Growth"
            supports: [Concentrated Area, Deadly Poison I]
          - gem: "Vine Arrow"
            supports: [Prolonged Duration II, Overabundance II]
          - gem: "Gas Arrow"
            supports: [Persistent Ground I, Encroaching Ground]
          - gem: "Despair"
            supports: [Heightened Curse, Focused Curse]
          - gem: "Herald of Plague"
          - gem: "Wind Dancer"
            supports: [Blind I, Maim]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II]
      - name: "Early Maps"
        skills:
          - gem: "Spiral Volley"
            supports: [Armour Break III, Corrosion, Poison III, Bursting Plague]
          - gem: "Poisonburst Arrow"
            supports: [Multishot II, Bursting Plague, Corrosion, Armour Break III]
          - gem: "Toxic Growth"
            supports: [Arakaali's Lust, Long Fuse II, Deadly Poison II, Concentrated Area]
          - gem: "Vine Arrow"
            supports: [Prolonged Duration II, Overabundance II, Magnified Area II, Swift Affliction II]
          - gem: "Gas Arrow"
            supports: [Persistent Ground III, Encroaching Ground, Deadly Poison II, Prolonged Duration II]
          - gem: "Despair"
            supports: [Heightened Curse, Chaos Mastery, Ritualistic Curse, Focused Curse]
          - gem: "Wind Dancer"
            supports: [Blind II, Maim, Poison III, Life Leech III]
          - gem: "Herald of Plague"
            supports: [Chaos Mastery]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II, Chaos Mastery]
rotations:
  - name: "Single Target"
    steps:
      - gem: "Vine Arrow"
        label: "Pre-emptive"
      - gem: "Despair"
        label: "On Spawn"
      - gem: "Gas Arrow"
        label: "Maintain"
      - gem: "Toxic Growth"
        label: "Spam"
  - name: "Clear"
    steps:
      - gem: "Spiral Volley"
        label: "Generates Frenzies"
      - gem: "Toxic Growth"
        label: "On tanky rares"
gear:
  weapon:
    base: Fanatic Bow
    mods: [Adds Physical Damage, Critical Hit Chance, Increased Physical Damage, Increased Attack Speed, Gain Damage as Extra Physical]
    runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time"]
  offhand:
    base: Visceral Quiver
    mods: [Adds Physical Damage to Attacks, Attack Critical Hit Chance, Critical Damage Bonus, Projectile Speed, +Level of all Projectile Skills, Increased Damage with Bow Skills]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, +Maximum Life, Critical Hit Chance, Elemental Resistances]
    runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  body:
    base: Corsair Coat
    mods: [Evasion Rating, +Maximum Life, Elemental Resistances]
    runes: ["Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate", "Atmohua's Soul Core of Retreat: 40% increased Energy Shield from Equipped Focus"]
  gloves:
    base: Polished Bracers
    mods: [Adds Physical Damage to Attacks, Evasion Rating, Elemental Resistances, +Maximum Life, +Dexterity, Critical Damage Bonus]
    runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Fenumus' Rune of Draining: 20% increased Withered Magnitude"]
  boots:
    base: Drakeskin Boots
    mods: [Movement Speed, Elemental Resistances, Evasion Rating, +Maximum Life]
    runes: ["Farrul's Rune of Grace: 8% increased Deflection Rating while moving", "Farrul's Rune of the Chase: 5% increased Movement Speed"]
  amulet:
    unique: "Serpent's Egg"
  ring1:
    base: Amethyst Ring
    mods: [Adds Physical Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
  ring2:
    base: Amethyst Ring
    mods: [Adds Physical Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
  belt:
    unique: "Ryslatha's Coil"
gearStages:
  campaign:
    weapon:
      base: Cultist Bow
      mods: [Adds Physical Damage, Increased Physical Damage]
      runes: ["2× Lesser Tempered Rune"]
    offhand:
      base: Broadhead Quiver
      mods: [Adds Physical Damage to Attacks, +Dexterity, Elemental Resistances]
    helmet:
      base: Freebooter Cap
      mods: [Evasion Rating, +Maximum Life]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      base: Hardleather Coat
      mods: [Evasion Rating, +Maximum Life, Elemental Resistances]
      runes: ["Desert Rune: +14% to Fire Resistance", "Glacial Rune: +14% to Cold Resistance"]
    gloves:
      base: Spiked Bracers
      mods: [All Damage can Poison, Evasion and Energy Shield, Increased Attack Speed, Poison Chance]
    boots:
      base: Embroidered Boots
      mods: [Evasion Rating, +Maximum Life, Movement Speed, Elemental Resistances]
      runes: ["Lesser Glacial Rune: +10% to Cold Resistance"]
    amulet:
      base: Jade Amulet
      mods: [+Maximum Life, +Level of all Projectile Skills, Elemental Resistances]
    ring1:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life, Elemental Resistances]
    ring2:
      base: Prismatic Ring
      mods: [Adds Physical Damage to Attacks, +Maximum Life, Elemental Resistances]
    belt:
      base: Heavy Belt
      mods: [Increased Effect of Socketed Items]
  mapping:
    weapon:
      unique: "Slivertongue"
      runes: ["2× Lesser Iron Rune: 14% increased Physical Damage"]
    offhand:
      base: Visceral Quiver
      mods: [Adds Physical Damage to Attacks, Attack Critical Hit Chance, Projectile Speed, Increased Damage with Bow Skills]
    helmet:
      base: Freebooter Cap
      mods: [Evasion Rating, +Maximum Life, Elemental Resistances]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    body:
      base: Hardleather Coat
      mods: [Evasion Rating, +Maximum Life, Elemental Resistances]
      runes: ["Desert Rune: +14% to Fire Resistance", "Glacial Rune: +14% to Cold Resistance"]
    gloves:
      base: Spiked Bracers
      mods: [All Damage can Poison, Evasion and Energy Shield, Increased Attack Speed, Poison Chance]
    boots:
      base: Embroidered Boots
      mods: [Evasion Rating, +Maximum Life, Movement Speed, Elemental Resistances]
      runes: ["Lesser Glacial Rune: +10% to Cold Resistance"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Amethyst Ring
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, +Maximum Life, Chaos Resistance, Elemental Resistances]
    ring2:
      base: Amethyst Ring
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Chaos Resistance, +Maximum Life, Elemental Resistances]
    belt:
      base: Heavy Belt
      mods: [+Maximum Life, +Strength, Mana Flask Recovery, Elemental Resistances]
  endgame:
    weapon:
      base: Fanatic Bow
      mods: [Adds Physical Damage, Critical Hit Chance, Increased Physical Damage, Increased Attack Speed, Gain Damage as Extra Physical]
      runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time"]
    offhand:
      base: Visceral Quiver
      mods: [Adds Physical Damage to Attacks, Attack Critical Hit Chance, Critical Damage Bonus, Projectile Speed, +Level of all Projectile Skills, Increased Damage with Bow Skills]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Maximum Life, Critical Hit Chance, Elemental Resistances]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    body:
      base: Corsair Coat
      mods: [Evasion Rating, +Maximum Life, Elemental Resistances]
      runes: ["Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate", "Atmohua's Soul Core of Retreat: 40% increased Energy Shield from Equipped Focus"]
    gloves:
      base: Polished Bracers
      mods: [Adds Physical Damage to Attacks, Evasion Rating, Elemental Resistances, +Maximum Life, +Dexterity, Critical Damage Bonus]
      runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Fenumus' Rune of Draining: 20% increased Withered Magnitude"]
    boots:
      base: Drakeskin Boots
      mods: [Movement Speed, Elemental Resistances, Evasion Rating, +Maximum Life]
      runes: ["Farrul's Rune of Grace: 8% increased Deflection Rating while moving", "Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Amethyst Ring
      mods: [Adds Physical Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
    ring2:
      base: Amethyst Ring
      mods: [Adds Physical Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
    belt:
      unique: "Ryslatha's Coil"
  minmax:
    weapon:
      unique: "Voltaxic Rift"
      runes: ["Idol of Thruldana: 25% reduced Poison Duration, Targets can be affected by +1 of your Poisons at the same time", "Fenumus' Rune of Agony: Gain 13% of Damage as Extra Chaos Damage"]
    offhand:
      base: Visceral Quiver
      mods: [Adds Lightning Damage to Attacks, Attack Critical Hit Chance, Critical Damage Bonus, Projectile Speed, +Level of all Projectile Skills, Increased Damage with Bow Skills]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Maximum Life, Critical Hit Chance, Elemental Resistances]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    body:
      base: Corsair Coat
      mods: [Evasion Rating, Elemental Resistances, +Maximum Life]
      runes: ["Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate", "Atmohua's Soul Core of Retreat: 40% increased Energy Shield from Equipped Focus"]
    gloves:
      base: Polished Bracers
      mods: [Adds Physical Damage to Attacks, Evasion Rating, Critical Damage Bonus, Elemental Resistances, +Maximum Life]
      runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Fenumus' Rune of Draining: 20% increased Withered Magnitude"]
    boots:
      base: Drakeskin Boots
      mods: [Movement Speed, Elemental Resistances, Evasion Rating, +Maximum Life]
      runes: ["Farrul's Rune of Grace: 8% increased Deflection Rating while moving", "Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Amethyst Ring
      mods: [Adds Lightning Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
    ring2:
      base: Amethyst Ring
      mods: [Adds Lightning Damage to Attacks, Elemental Resistances, Chaos Resistance, +Dexterity, +Maximum Life]
    belt:
      unique: "Darkness Enthroned"
      runes: ["Courtesan Mannan's Rune of Cruelty", "Fenumus' Rune of Draining"]
passives:
  attribute: int
  path:
    - "Honed Instincts"
    - "Vile Wounds"
    - "Escape Velocity"
    - "Lasting Toxins"
    - "Stacking Toxins"
    - "Blinding Strike"
    - "Killer Instinct"
    - "True Strike"
    - "For the Jugular"
    - "Deadly Force"
    - "Moment of Truth"
    - "Crashing Wave"
    - "Flow Like Water"
    - "Mindful Awareness"
    - "Step Like Mist"
    - "Escalating Toxins"
    - "Toxic Tolerance"
    - "Building Toxins"
    - "Heartstopping"
    - "Struck Through"
    - "Heartbreaking"
    - "Beastial Skin"
    - "Enhanced Reflexes"
    - "Stupefy"
    - "Dizzying Hits"
    - "Serrated Edges"
    - "Low Tolerance"
    - "Crippling Toxins"
    - "Material Solidification"
    - "Fervour"
    - "Resonance"
    - "Frenetic"
  ascendancy: [Relentless Pursuit, Running Assault, Overwhelming Toxicity]
---
## How It Works

[[Spiral Volley]] clears packs. Its mandatory links, Armour Break III, Corrosion and Poison III, generate Endurance Charges, which Resonance turns into Frenzy Charges that Spiral Volley consumes to chain and deal more damage. Bursting Plague explodes enemies for part of their maximum life, and [[Herald of Plague]] spreads your most damaging poison to nearby enemies, so ailments cascade through packs. On bosses, [[Toxic Growth]] spawns pustules that [[Gas Arrow]] poisons until they explode, [[Vine Arrow]] adds a slowing plant whose chaos damage scales when poisoned, and [[Despair]] lowers chaos resistance.

The Pathfinder's Overwhelming Toxicity doubles your maximum poisons on any target; its 35% less poison duration is offset by Toxic Growth applying many stacks at once. Path Seeker and its minor node give 5 passive points, Relentless Pursuit grants immunity to all slows, and Running Assault halves the movement penalty while using skills and prevents heavy stuns while sprinting.

Defences come from evasion on item bases and [[Wind Dancer]] (more evasion, and it blinds and poisons enemies through Gale Force when you are hit), hybrid evasion and energy shield bases, and [[Ghost Dance]] for recovery. [[Withering Presence]] withers nearby enemies.

## Leveling

Start with a Lightning Rod into [[Lightning Arrow]] combo, with [[Frost Bomb]] for Exposure on tougher enemies; [[Stormcaller Arrow]] gets strong once you have Herald of Thunder. After your first Trial of the Sekhemas, take Overwhelming Toxicity and swap to Gas Arrow: respec the tree and find a bow with high physical damage, since other damage types do not add to poison magnitude unless you use Plaguefinger. Scattershot applies several poisons at once, and Toxic Growth detonates enemies already inside a gas cloud. Spiral Volley takes over for clear once your bow and quiver are good enough.

Vendor regex for useful bases (sockets, movement speed, physical and flat damage, + Projectile levels, attack speed): `"ts: S|\d+% i.+mov|d Ph|ds .+Da|ll P|k Sp"`.

## Playstyle

**Mapping.** Spiral Volley into packs; Herald of Plague and Bursting Plague carry poison from normal monsters to magic and rare ones.

**Bossing.** Fire Vine Arrow before the boss spawns, apply Despair once it is active (pre-cast it on bosses with delayed spawns), then Toxic Growth and pop the pustules with Gas Arrow. Extra arrows overlap gas clouds to stack poisons, letting you spam Toxic Growth on the area.

## Endgame Progression

- With Rigwald's Ferocity, lock your weapon to the off-hand set and put Spiral Volley on weapon set 2 in the gem panel.
- Garukhan's Resolve on Toxic Growth is a huge single-target boost; Blindside is the budget alternative. A bow with high damage and + critical chance makes your increased critical chance notables much more effective.
- Plaguefinger lets you scale damage from elemental sources too; until then, focus on physical and chaos. Silver Tongue and Voltaxic Rift are strong unique weapons.
- Hybrid evasion and energy shield bases; Subterfuge Mask is required for pure energy shield helmets.
- Mana: a good mana flask, a Sapphire with Recover 2% of Mana on Kill (you need at least one), and mana gained per enemy killed on the bow or quiver.
- Jewels, roughly by priority: increased damage with bows, global physical damage, evasion, mana on kill, projectile and attack damage, ailment and poison magnitude, quiver bonuses, movement speed, poison duration, attack speed and energy shield. The same stats are good on a Time-Lost Emerald covering many nodes. Jewels like Against the Darkness can add a lot if you build the tree around them.

## Gear Priorities

The bow and quiver are most of your power: physical damage, critical chance and attack speed on the bow, flat damage and + Projectile levels on the quiver. Then evasion and energy shield, and mana on kill.

## FAQ

**Which campaign bonuses should I take?** Valley of the Titans (Act 2): 30% charm charges gained or +1 charm slot. Venom Crypts (Act 3): 25% stun threshold. Halls of the Dead (Act 4): +5% lightning, cold or fire resistance. Abandoned Prison (Act 4): 30% mana recovery from flasks. Qimah (Interlude 2): 15% global defences. These bonuses are minor; a different pick will not hurt much.
