---
title: Storm Wave Martial Artist
class: Monk
ascendancy: Martial Artist
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Hollow Focus Storm Wave Martial Artist Build Guide"
  author: "goratha (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/hollow-focus-storm-wave-martial-artist-build-guide
  updated: 2026-11-04
summary: "Monk Martial Artist who detonates Hollow Focus bells and clears with Shattering Palm and Herald of Ice, then overlaps Storm Wave fissures on bosses."
tags: [melee, quarterstaff, cold, crit, evasion]
damage: Physical / Cold
playstyle: Melee combo
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - "Explosive map clear with bells and Herald of Ice"
  - "Strong single target when fissures overlap"
  - "Fast Twister leveling"
cons:
  - "Combo-based, several buttons"
  - "Storm Wave positioning takes practice"
skills:
  - gem: "Hollow Focus"
    supports: [Magnified Area II, Mana Leech, Life Leech III, Cold Exposure, Cooldown Recovery II]
  - gem: "Fragments Of The Past"
    supports: [Cold Exposure, Freeze, Magnified Area II, Ice Bite II, Elemental Armament II]
  - gem: "Wind Dancer"
    supports: [Pin I, Maim, Life Leech III, Magnified Area II]
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II, Her Declaration, Precision II, Cool Headed]
  - gem: "Tempest Bell"
    supports: [Elemental Armament II, Close Combat II, Ancestral Call II, Heavy Swing, Magnified Area II]
  - gem: "Shattering Palm"
    supports: [Ice Bite II, Rage III, Magnified Area II, Ancestral Call II, Oisín's Oath]
  - gem: "Hand of Chayula"
    supports: [Elemental Weakness, Freezing Mark, Mark of Siphoning II, Culmination II, Ailith's Chimes]
  - gem: "Charged Staff"
    supports: [Culling Strike II, Innervate, Blind I, Blazing Critical, Ice Bite II]
  - gem: "Storm Wave"
    supports: [Rapid Attacks II, Kaom's Madness, Elemental Armament II, Garukhan's Resolve, Vorana's Siege]
  - gem: "Herald of Ice"
    supports: [Armour Break III, Armour Explosion, Uruk's Smelting, Magnified Area II, Elemental Armament II]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Whirling Slash, Twister, Frost Bomb, Barrage, Ice-Tipped Arrows]
    - label: "Act Ii"
      gems: [Freezing Mark]
  spirit:
    - label: "Act I"
      gems: [War Banner, Herald of Ice, Wind Dancer]
  supports:
    - label: "Act I"
      gems: [Rage I, Rapid Attacks I, Retreat I, Projectile Acceleration I]
    - label: "Act Ii"
      gems: [Salvo]
leveling:
  - name: "Twister Leveling"
    steps:
      - name: "Twister Leveling"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Frost Nexus, Projectile Acceleration I, Salvo]
          - gem: "Frost Bomb"
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Ice-Tipped Arrows"
            supports: [Rapid Casting I]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Mark of Siphoning, Charged Mark]
          - gem: "Spear Throw"
          - gem: "Purity of Lightning"
      - name: "Early Maps"
        skills:
          - gem: "Herald of Ice"
            supports: [Armour Break III, Armour Explosion, Armour Demolisher II, Magnified Area II]
          - gem: "Fragments Of The Past"
            supports: [Cold Exposure, Freeze, Elemental Armament II, Ice Bite II]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion II]
          - gem: "Tempest Bell"
            supports: [Heft, Close Combat II, Ancestral Call II, Heavy Swing, Magnified Area II]
          - gem: "Shattering Palm"
            supports: [Elemental Armament II, Magnified Area II, Rage III, Ancestral Call II]
          - gem: "Hand of Chayula"
            supports: [Culmination I, Elemental Weakness, Freezing Mark, Heightened Curse]
          - gem: "Charged Staff"
            supports: [Innervate, Blazing Critical, Blind I, Culling Strike II]
          - gem: "Storm Wave"
            supports: [Magnified Area II, Upheaval II, Elemental Armament II, Freeze, Rapid Attacks II]
          - gem: "Wind Dancer"
            supports: [Maim, Pin I]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Twister"
      - name: "Single Target"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Barrage"
          - gem: "Twister"
rotations:
  - name: "Single Target"
    steps:
      - gem: "Hand of Chayula"
      - gem: "Shattering Palm"
      - gem: "Tempest Bell"
      - gem: "Storm Wave"
        count: 3
  - name: "Clear"
    steps:
      - gem: "Shattering Palm"
        count: 2
      - gem: "Tempest Bell"
      - gem: "Storm Wave"
gear:
  weapon:
    base: Skullcrusher Quarterstaff
    mods: [Increased Physical Damage, Adds Physical Damage, Accuracy Rating, Critical Damage Bonus, Increased Attack Speed, Base Critical Hit Chance]
    runes: ["Greater Iron Rune: 18% increased Physical Damage", "Greater Mind Rune: Leeches 4% of Physical Damage as Mana"]
  helmet:
    unique: "Vestige of Darkness"
    runes: ["Perfect Storm Rune: +22% to Lightning Resistance", "Emergent Instinct: Targets that are Blinded, Maimed, and Bleeding cannot Evade your Hits"]
  body:
    base: Swiftstalker Coat
    mods: [Evasion Rating, Fire Resistance, Cold Resistance, Deflection, Slow Effect]
    runes: ["Greater Glacial Rune: +18% to Cold Resistance", "Perfect Storm Rune: +22% to Lightning Resistance"]
  gloves:
    base: Runeforged Fists of Stone
    mods: [Evasion Rating, Energy Shield, Gain Attack Damage as Extra Physical, Gain Attack Damage as Extra Cold, +Level of all Melee Skills, Quality of all Skill Gems]
    runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
  boots:
    base: Runeforged Dragonscale Boots
    mods: [Movement Speed, Evasion Rating, Fire Resistance, Chaos Resistance, Deflection]
    runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
  amulet:
    base: Gold Amulet
    mods: [+Spirit, +Level of all Melee Skills, +Intelligence, Elemental Resistances, Energy Shield, Evasion Rating]
  ring1:
    base: Amethyst Ring
    mods: [Adds Cold Damage to Attacks, Accuracy Rating, Evasion Rating, Lightning Resistance, Chaos Resistance, Life Leech]
  ring2:
    base: Sapphire Ring
    mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, Fire Resistance, Cold Resistance, Mana Leech]
  belt:
    unique: "Mageblood"
  weapon2:
    base: Lumbering Talisman
    mods: [Increased Physical Damage, Adds Fire Damage, Increased Attack Speed, +Intelligence]
gearStages:
  campaign:
    weapon:
      base: Winged Spear
      mods: []
    helmet:
      base: Corsair Cap
      mods: [+Maximum Life, Evasion Rating]
    body:
      base: Hunting Coat
      mods: [+Maximum Life, Evasion Rating]
    gloves:
      base: Hunting Bracers
      mods: [Adds Cold Damage to Attacks, Adds Physical Damage to Attacks, Increased Attack Speed, +Level of all Melee Skills]
    boots:
      base: Bound Boots
      mods: [+Maximum Life, Movement Speed]
    amulet:
      base: Pearlescent Amulet
      mods: [+Maximum Life, +Level of all Projectile Skills]
    ring1:
      base: Topaz Ring
      mods: [Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Life Leech]
    ring2:
      base: Ruby Ring
      mods: [Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks, Mana Leech, Life Leech]
    belt:
      base: Plate Belt
      mods: [+Maximum Life, Armour]
    weapon2:
      base: War Spear
      mods: [Adds Lightning Damage]
    offhand2:
      base: Shrine Sceptre
      mods: [+Spirit]
  mapping:
    weapon:
      base: Skullcrusher Quarterstaff
      mods: [Increased Physical Damage, Adds Physical Damage, Increased Attack Speed, Base Critical Hit Chance]
      runes: ["Greater Iron Rune: 18% increased Physical Damage", "Greater Mind Rune: Leeches 4% of Physical Damage as Mana"]
    helmet:
      unique: "Vestige of Darkness"
      runes: ["Perfect Storm Rune: +22% to Lightning Resistance", "Emergent Instinct: Targets that are Blinded, Maimed, and Bleeding cannot Evade your Hits"]
    body:
      base: Slipstrike Vest
      mods: [Evasion Rating, +Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
      runes: ["Desert Rune: +14% to Fire Resistance", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Runeforged Fists of Stone
      mods: [Gain Attack Damage as Extra Physical, Gain Attack Damage as Extra Cold, Quality of all Skill Gems, Onslaught on Hit, Cold Resistance]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    boots:
      base: Runeforged Quickslip Shoes
      mods: [Movement Speed, Evasion and Energy Shield, +Maximum Life, Fire Resistance, Deflection]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Gold Amulet
      mods: [Evasion Rating, +Maximum Life, +Level of all Melee Skills, Critical Damage Bonus]
    ring1:
      base: Topaz Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, +Maximum Life, +Dexterity, +Intelligence]
    ring2:
      base: Ruby Ring
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Lightning Resistance, Mana Leech]
    belt:
      base: Ornate Belt
      mods: [Armour, +Maximum Life, Cold Resistance, Lightning Resistance]
    weapon2:
      base: Lumbering Talisman
      mods: [Increased Physical Damage, Adds Fire Damage, Increased Attack Speed, +Intelligence]
  endgame:
    weapon:
      base: Skullcrusher Quarterstaff
      mods: [Increased Physical Damage, Adds Physical Damage, Accuracy Rating, Critical Damage Bonus, Increased Attack Speed, Base Critical Hit Chance]
      runes: ["Greater Iron Rune: 18% increased Physical Damage", "Greater Mind Rune: Leeches 4% of Physical Damage as Mana"]
    helmet:
      unique: "Vestige of Darkness"
      runes: ["Perfect Storm Rune: +22% to Lightning Resistance", "Emergent Instinct: Targets that are Blinded, Maimed, and Bleeding cannot Evade your Hits"]
    body:
      base: Swiftstalker Coat
      mods: [Evasion Rating, Fire Resistance, Cold Resistance, Deflection, Slow Effect]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance", "Perfect Storm Rune: +22% to Lightning Resistance"]
    gloves:
      base: Runeforged Fists of Stone
      mods: [Evasion Rating, Energy Shield, Gain Attack Damage as Extra Physical, Gain Attack Damage as Extra Cold, +Level of all Melee Skills, Quality of all Skill Gems]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    boots:
      base: Runeforged Dragonscale Boots
      mods: [Movement Speed, Evasion Rating, Fire Resistance, Chaos Resistance, Deflection]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    amulet:
      base: Gold Amulet
      mods: [+Spirit, +Level of all Melee Skills, +Intelligence, Elemental Resistances, Energy Shield, Evasion Rating]
    ring1:
      base: Amethyst Ring
      mods: [Adds Cold Damage to Attacks, Accuracy Rating, Evasion Rating, Lightning Resistance, Chaos Resistance, Life Leech]
    ring2:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, Fire Resistance, Cold Resistance, Mana Leech]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Lumbering Talisman
      mods: [Increased Physical Damage, Adds Fire Damage, Increased Attack Speed, +Intelligence]
passives:
  attribute: dex
  path:
    - "Flow Like Water"
    - "Flow State"
    - "Essence of the Mountain"
    - "Blinding Strike"
    - "Agile Succession"
    - "Killer Instinct"
    - "Spectral Ward"
    - "Heavy Frost"
    - "Thin Ice"
    - "Exposed to the Cosmos"
    - "Chakra of Rhythm"
    - "Chakra of Impact"
    - "Stupefy"
    - "Heartbreaking"
    - "Struck Through"
    - "Heartstopping"
    - "Enhanced Reflexes"
    - "Beastial Skin"
    - "Dizzying Hits"
    - "First Principle of the Hollow"
    - "First Teachings of the Keeper"
    - "The Hollowkeeper"
    - "True Strike"
    - "For the Jugular"
    - "Mindful Awareness"
    - "Step Like Mist"
  ascendancy: [Way of the Mountain, Way of the Stonefist, Runic Meridians, Hollow Focus Technique]
  weaponSet1: [Moment of Truth, Harness the Elements, Dizzying Sweep, Resolute Reach, Frantic Reach, Throatseeker, Careful Assassin]
  weaponSet2: [Shimmering, Agile Sprinter, Marathon Runner, Mending Deflection]
---
## How It Works

[[Hollow Focus]] spawns ethereal bells around you that explode when hit, chaining into [[Herald of Ice]]. Herald of Ice is linked to Armour Break III and uses Way of the Stonefist's damage gained as extra physical to break armour and trigger Armour Explosion. [[Shattering Palm]] dashes to a target and does most of the clearing, [[Tempest Bell]] helps both clear and single target, and [[Storm Wave]] cleans up and shines on bosses when its fissures overlap.

The build combines evasion and energy shield: evasion first, then deflection with Way of the Mountain. [[Ghost Dance]] recovers well thanks to your high evasion. The source guide has an early variant using Martial Adept for combo and an endgame variant without it.

## Leveling

Level with Twister until maps, the fastest option (Storm Wave works from level 21 with Siphoning Strike, and staff skills like Frozen Locus, Glacial Cascade or Ice Strike are fine too, but slower). If you start from scratch, make a Huntress first to get a spear and the Whirling Slash and Twister gems.
- Put Whirling Slash on weapon set 1 and everything else on set 2. This is very important.
- Weapon set 1 makes Whirling Slash as fast as possible: rush Dance with Death and skip the off-hand. A Winged Spear from Act 2 with an early Essence of Haste lasts until maps (or buy a Skysliver).
- Weapon set 2 wants as much flat elemental damage as possible for Twister; attack speed does not matter. A buckler early lets you Parry into Fangs of Frost, then a Spirit sceptre for more Spirit gems.
- Whirling Slash builds up to three stages and Twister then forms several tornadoes. Frost Nexus creates chilled ground for Twister when you shatter enemies, Ice-Tipped Arrows converts it to cold, and Barrage multiplies the Twisters. Salvo later makes it even stronger.
- The Monk is very squishy early: use armour/evasion bases first, then evasion/energy shield.

## Playstyle

**Mapping.** With good gear, Shattering Palm and Herald of Ice clear on their own; drop a Tempest Bell on big packs and weave in Storm Wave.

**Bossing.** Open with [[Hand of Chayula]] to apply Elemental Weakness and Freezing Mark at once, then Shattering Palm and Tempest Bell, then Storm Wave from close range so the fissures overlap (the right distance depends on the boss's hitbox). Combo: with Rune of Culmination and tree nodes, two Shattering Palms build the 4 combo Tempest Bell needs. Charged Staff, with 3 Power Charges from Ailith's Chimes and Culmination II, adds Blazing Critical and Innervate buffs (currently lost on weapon swap).

## Endgame Progression

**Early maps.**
- As much evasion as possible: it is your main defence with deflection and energy shield. Deflection on at least two items is needed to eventually reach the 95% cap.
- Vestige of Darkness is a great early helmet: a blind aura, easier freezes, and an invincible Bodach that deals big area damage if you get stunned. Without it, use Grip of Winter early (and take Material Solidification instead): freezing enables Ice Bite II, procs Freezing Mark and works with Thin Ice and Heavy Frost.
- Physical damage leeched as life and as mana on at least one slot, ideally rings; otherwise a Greater Mind or Greater Body Rune in the weapon.
- A staff with as much physical damage as possible, with attack speed, critical damage and critical chance. Melee gem levels make mana harder early on. Duality is a good alternative that can be upgraded at the forge: pick the damage version.

**Gloves.** Way of the Stonefist turns glove stats into stronger versions: attack speed becomes Onslaught on hit, melee gem levels become quality on all your gems, and physical damage to attacks lets Herald of Ice break armour.

**Endgame.**
- An amulet with +3 Melee Skills, global defences and percent evasion; Spirit there spares the body armour.
- A rare staff with high critical damage, attack speed and critical chance is best in slot.
- Lineage supports: Oisín's Oath on Shattering Palm for mana (still keep some mana leech), Kaom's Madness (an extra fissure, cheap) and Garukhan's Resolve (a big, expensive crit boost) on Storm Wave, and Vorana's Siege for area and single target. Rage III goes on Shattering Palm with very good gear.
- Fragments of the Past applies Maim and Cold Exposure but costs Runic Ward, so you need a little Ward on gear.
- Runes: Saqawal's Rune of Erosion (helmet), Craiceann's Rune of Warding and Warding Rune of Heart (body), Rune of Culmination (gloves), Farrul's Rune of the Chase (boots). Except for the gloves, swap them for resistances or attributes as needed.

## Gear Priorities

Physical damage, critical and attack speed on the staff, evasion and deflection everywhere, Way of the Stonefist modifiers on the gloves, and + Melee levels on gloves and amulet. Life and mana leech on rings.

## FAQ

**Why is my damage low?** Do not use Rapid Attacks III anywhere. Freeze bosses (Grip of Winter or Vestige of Darkness). Keep Elemental Weakness levelled for higher content, which needs a lot of Intelligence. Keep flat damage on rings and gloves and + Melee levels on gloves and amulet; the weapon is most of your damage. And position Storm Wave so its fissures overlap.
