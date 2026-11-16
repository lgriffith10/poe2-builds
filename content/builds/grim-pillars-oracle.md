---
title: Grim Pillars Spell Totem Oracle
class: Druid
ascendancy: Oracle
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Grim Pillars Spell Totem Oracle Build Guide
  author: Palsteron (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/grim-pillars-spell-totem-oracle-build-guide
  updated: 2026-09-07
summary: Druid totem caster that lets Spell Totems cast Grim Pillars for huge cold damage, then shatters the leftover Ice Crystals with Entangle.
tags: [totem, cold, lightning, caster, league starter]
damage: Cold / Lightning
playstyle: Totems
difficulty: medium
budget: low
tiers:
  starter: S
pros:
  - One of the best league starters, with very high damage on little gear
  - Totems fight for you, keeping you at a safe distance
cons:
  - The totem playstyle is not for everyone
  - Lots of effects on screen can be heavy on your computer
skills:
  - gem: Spell Totem
    supports: [Grim Pillars, Urgent Totems III, Efficiency II, Magnified Area II, Cold Mastery]
    note: Main damage; totems cast Grim Pillars. As high as possible early, then a total level of 14 once you have Unnamed Heartwood.
    weaponSet: 1
    level: 14
  - gem: Entangle
    supports: [Biting Frost I, Living Lightning II, Branching Fissures I, Rapid Casting II, Magnified Area II]
    note: Consumes the Ice Crystals' freeze. Keep a copy at gem level 1 for a tiny mana cost.
    weaponSet: 2
    level: 1
  - gem: Mana Tempest
    supports: [Advancing Storm, Efficiency II, Lightning Mastery]
    note: Damage buff
    weaponSet: 2
  - gem: Frost Bomb
    supports: [Spell Echo, Overabundance I, Potent Exposure, Efficiency II]
    note: Exposure for bosses
    weaponSet: 2
    level: 18
  - gem: Elemental Weakness
    supports: [Efficiency II, Cursed Ground, Heightened Curse, Ritualistic Curse]
    note: Curse
    weaponSet: 2
    level: 18
  - gem: Purity of Fire
    supports: [Mysticism II, Clarity II, Vitality II]
    note: Aura
    weaponSet: 2
gemPriority:
  skills:
    - label: "Act I"
      gems: [Contagion, Frost Bomb, Essence Drain, Bone Cage, Bonestorm, Thunderstorm]
    - label: "Act Ii"
      gems: [Entangle]
    - label: "Act Iii"
      gems: [Thrashing Vines]
  spirit:
    - label: "Act I"
      gems: [Ravenous Swarm]
  supports:
    - label: "Act I"
      gems: [Unleash, Controlled Destruction, Spell Cascade, Swift Affliction I, Rapid Casting I, Burgeon I, Corrosion]
    - label: "Act Ii"
      gems: [Living Lightning, Magnified Area I, Lightning Attunement, Concentrated Area]
    - label: "Act Iii"
      gems: [Branching Fissures I]
leveling:
  - name: "Plants Leveling"
    steps:
      - name: "Act1"
        skills:
          - gem: "Contagion"
            supports: [Unleash]
          - gem: "Volcano"
            supports: [Controlled Destruction]
          - gem: "Essence Drain"
            supports: [Swift Affliction I, Zenith I]
          - gem: "Frost Bomb"
          - gem: "Bone Cage"
            supports: [Spell Cascade, Controlled Destruction]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion]
      - name: "Act2"
        skills:
          - gem: "Bone Cage"
            supports: [Spell Cascade, Controlled Destruction, Lightning Attunement]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I, Lightning Attunement]
          - gem: "Thunderstorm"
            supports: [Living Lightning, Magnified Area I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion, Clarity I]
      - name: "Act3"
        skills:
          - gem: "Entangle"
            supports: [Accelerated Growth, Branching Fissures I, Controlled Destruction]
          - gem: "Bonestorm"
            supports: [Rapid Casting I, Burgeon I, Lightning Attunement]
          - gem: "Thunderstorm"
            supports: [Living Lightning, Magnified Area I]
          - gem: "Ravenous Swarm"
            supports: [Corrosion, Clarity I]
          - gem: "Thrashing Vines"
            supports: [Concentrated Area, Accelerated Growth, Rapid Casting I]
      - name: "Endgame"
        skills:
          - gem: "Spell Totem"
            supports: [Grim Pillars, Urgent Totems III, Efficiency II, Magnified Area II, Cold Mastery]
          - gem: "Entangle"
            supports: [Biting Frost I, Living Lightning II, Branching Fissures I, Rapid Casting II, Magnified Area II]
          - gem: "Mana Tempest"
            supports: [Advancing Storm, Efficiency II, Lightning Mastery]
          - gem: "Elemental Weakness"
            supports: [Efficiency II, Cursed Ground, Heightened Curse, Ritualistic Curse]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I, Potent Exposure, Efficiency II]
          - gem: "Purity of Fire"
            supports: [Vitality II, Mysticism II, Clarity II]
    rotations:
      - name: "Bossing (Lvl 1-13)"
        steps:
          - gem: "Frost Bomb"
          - gem: "Volcano"
      - name: "Pack Clear (Lvl 1-13)"
        steps:
          - gem: "Contagion"
          - gem: "Essence Drain"
      - name: "Bossing (lvl14+)"
        steps:
          - gem: "Bonestorm"
          - gem: "Thrashing Vines"
          - gem: "Bonestorm"
          - gem: "Thunderstorm"
          - gem: "Bonestorm"
      - name: "Pack Clear (Lvl 14+)"
        steps:
          - gem: "Bone Cage"
          - gem: "Entangle"
          - gem: "Thrashing Vines"
          - gem: "Thunderstorm"
rotations:
  - name: "Bossing (Lvl 1-13)"
    steps:
      - gem: "Frost Bomb"
      - gem: "Volcano"
  - name: "Pack Clear (Lvl 1-13)"
    steps:
      - gem: "Contagion"
      - gem: "Essence Drain"
  - name: "Bossing (lvl14+)"
    steps:
      - gem: "Bonestorm"
      - gem: "Thrashing Vines"
      - gem: "Bonestorm"
      - gem: "Thunderstorm"
      - gem: "Bonestorm"
  - name: "Pack Clear (Lvl 14+)"
    steps:
      - gem: "Bone Cage"
      - gem: "Entangle"
      - gem: "Thrashing Vines"
      - gem: "Thunderstorm"
gear:
  weapon:
    base: Attuned Wand
    mods: [+Level of all Spell Skills, Increased Spell Damage, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
  offhand:
    base: Shrine Sceptre
    mods: [Increased Spirit, +Maximum Mana]
    runes: ["Rabbit Idol: 15% increased Spirit"]
  helmet:
    base: Cryptic Crown
    mods: [+Maximum Life, +Maximum Mana, Elemental Resistances, Chaos Resistance]
    runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
  body:
    base: Corvus Mantle
    mods: [+Maximum Life, +Spirit, Elemental Resistances, Chaos Resistance]
    runes: ["Greater Desert Rune: +18% to Fire Resistance"]
  gloves:
    base: Adherent Cuffs
    mods: [+Maximum Life, +Maximum Mana, Elemental Resistances, Chaos Resistance]
    runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
  boots:
    base: Cryptic Leggings
    mods: [Movement Speed, +Maximum Life, +Maximum Mana, Elemental Resistances]
  amulet:
    base: Solar Amulet
    mods: [+Level of all Spell Skills, +Spirit]
  ring1:
    base: Pearl Ring
    mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
  ring2:
    base: Pearl Ring
    mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
  belt:
    base: Utility Belt
    mods: [+Maximum Life, +Maximum Mana, +Strength, Elemental Resistances]
  weapon2:
    base: Attuned Wand
    mods: [Increased Spell Damage, +Level of all Cold Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
  offhand2:
    base: Shrine Sceptre
    mods: [+Spirit, +Maximum Mana]
    runes: ["Rabbit Idol: 15% increased Spirit"]
gearStages:
  campaign:
    weapon:
      unique: "Lifesprig"
      runes: ["Greater Storm Rune: Gain 10% of Damage as Extra Lightning Damage"]
    offhand:
      mods: [+Spirit]
    helmet:
      base: Mailed Crown
      mods: [Fire Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
    body:
      base: Bearskin Mantle
      mods: [+Maximum Life, +Spirit]
    gloves:
      base: Signet Cuffs
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
    boots:
      base: Pelt Leggings
      mods: [Movement Speed]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Spell Skills]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Fine Belt
      mods: [Fire Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana]
  mapping:
    weapon:
      base: Attuned Wand
      mods: [Increased Spell Damage, +Level of all Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
      runes: ["Rabbit Idol: 15% increased Spirit"]
    helmet:
      base: Cryptic Crown
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    body:
      base: Corvus Mantle
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Spirit]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    gloves:
      base: Adherent Cuffs
      mods: [Fire Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    boots:
      base: Cryptic Leggings
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Spell Skills, +Spirit]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Utility Belt
      mods: [+Strength, Fire Resistance, Cold Resistance, +Maximum Life, +Maximum Mana]
  endgame:
    weapon:
      base: Attuned Wand
      mods: [Increased Spell Damage, +Level of all Cold Spell Skills, Increased Cast Speed, Spell Critical Hit Chance, Gain Damage as Extra Lightning]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
      runes: ["Rabbit Idol: 15% increased Spirit"]
    helmet:
      base: Cryptic Crown
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
      runes: ["Greater Storm Rune: +18% to Lightning Resistance"]
    body:
      base: Corvus Mantle
      mods: [Cold Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Spirit]
      runes: ["Greater Desert Rune: +18% to Fire Resistance"]
    gloves:
      base: Adherent Cuffs
      mods: [Fire Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, +Maximum Mana]
      runes: ["Greater Glacial Rune: +18% to Cold Resistance"]
    boots:
      base: Cryptic Leggings
      mods: [Cold Resistance, Lightning Resistance, +Maximum Life, +Maximum Mana, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Spell Skills, +Spirit]
    ring1:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Pearl Ring
      mods: [+Maximum Life, +Maximum Mana, Increased Cast Speed]
    belt:
      base: Utility Belt
      mods: [+Strength, Fire Resistance, Cold Resistance, +Maximum Life, +Maximum Mana]
    weapon2:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    offhand2:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
      runes: ["Rabbit Idol: 15% increased Spirit"]
  minmax:
    weapon:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    offhand:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
      runes: ["Rabbit Idol: 15% increased Spirit"]
    helmet:
      base: Ancestral Tiara
      mods: [Cold Resistance, Lightning Resistance, Energy Shield, +Maximum Life]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield"]
    body:
      base: Vile Robe
      mods: [Fire Resistance, Cold Resistance, Lightning Resistance, Energy Shield, +Spirit]
      runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate"]
    gloves:
      base: Vaal Gloves
      mods: [Cold Resistance, Energy Shield, Adds Physical Damage to Attacks, Critical Damage Bonus]
      runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    boots:
      base: Sekhema Sandals
      mods: [Cold Resistance, Lightning Resistance, Energy Shield, Movement Speed]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Stellar Amulet
      mods: [Energy Shield, +Level of all Spell Skills, +Spirit]
    ring1:
      base: Gold Ring
      mods: [Fire Resistance, Cold Resistance, +Maximum Mana, Increased Cast Speed]
    ring2:
      base: Gold Ring
      mods: [Fire Resistance, Cold Resistance, +Maximum Mana, Increased Cast Speed]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, Gain Damage as Extra Cold, Increased Elemental Damage]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    offhand2:
      base: Shrine Sceptre
      mods: [+Spirit, +Maximum Mana]
      runes: ["Rabbit Idol: 15% increased Spirit"]
passives:
  attribute: str
  path:
    - Relentless Vindicator
    - Bolstering Presence
    - Vulgar Methods
    - Barbaric Strength
    - Sigil of Lightning
    - Sigil of Ice
    - Desensitisation
    - All Natural
    - Endless Blizzard
    - Glaciation
    - Controlling Magic
    - Ancestral Bond
    - Lasting Incantations
    - Wasting Casts
    - Limitless Pursuit
    - Calculated Hunter
    - Cower Before the First Ones
  ascendancy: [The Unseen Path, The Lesser Harm, Forced Outcome, Unnamed Heartwood]
  weaponSet1: [Ancestral Alacrity, Supportive Ancestors, Ancestral Reach, Ancestral Conduits, Stormcharged, Rustle of the Leaves, Mighty Trunk]
  weaponSet2: [Radial Force, Splitting Ground, Touch the Arcane, Erraticism, Casting Cascade, Overzealous]
farming:
  clear: 3
  single: 3
  tank: 2
  speed: 1
  style: totem
  traits: []
  notes:
    delirium: "Even if you farm something else, finish the Delirium questline: it unlocks instilling a passive notable on your amulet."
---

## How It Works

[[Grim Pillars]] is socketed in [[Spell Totem]], so your totems do the casting. The pillars deal heavy cold damage and leave Ice Crystals behind. To cash those in, you need to consume their freeze: [[Entangle]] supported by [[Biting Frost I]] does that automatically, without needing to deal damage itself, and [[Living Lightning II]] cleans up leftover crystals.

The totem count grows with the build:

| Source | Totems |
| --- | --- |
| Base | 1 |
| [[Spell Totem]] at gem level 14 | 2 |
| Unnamed Heartwood (ascendancy) | 3 |
| Ancestral Bond (keystone) | 6 |

Beyond five totems, the source guide notes diminishing returns: placing them takes time and costs Spirit.

## Playstyle

**Mapping.** Drop totems as you move, then cast [[Entangle]] over the pillars to shatter the Ice Crystals. [[Mana Tempest]] boosts the damage while it lasts.

**Bossing.** Curse with [[Elemental Weakness]], apply exposure with [[Frost Bomb]], plant your full set of totems near the boss and keep re-casting [[Entangle]] on the crystals.

## Leveling

The source guide levels through the campaign with plant skills and elemental spells such as [[Volcano]] and [[Frost Bomb]], then respecs into totems once the setup comes online.

## Endgame Progression

**Getting Grim Pillars in Forbidden Rites.** The event removes Runes of Aldur and leaves only Expeditions, so the gem is harder to find. Your options: Plunderer's Point (Act 4 questline), or the Interlude zones with an Expedition (Stones of Serle, Pools of Khatal, Glacial Tarn), which cannot be reset. If you are unlucky, farm the Expedition zones at the bottom of the Atlas (at sea) or buy one, and keep playing the plant setup meanwhile.

**Gearing in maps.**
- Keep all resistances at 75% or more with gear and runes; Void Flux can bring chaos resistance up.
- Life on every piece; mana and mana regeneration keep totems and utility skills running.
- The wand is your biggest damage upgrade (more + levels, spell damage). Rings with cast speed.
- Instill the amulet with a notable from the passive tree once you have done the Delirium questline on the Atlas: hold Alt over a passive to see which emotions it costs.
- Set up charms against stun, freeze and slows. If the game stutters, enable Dynamic Culling in the graphics options.

**Critical strike respec.** From level 80 with Forced Outcome (third ascendancy), add critical chance for spells on the wand and critical damage bonus on jewels, then respec the tree (weapon set points change slightly). The source guide reports up to double damage, growing with gear. By then you should place at least four totems with Ancestral Bond, five or six with good gear.

**Energy shield respec.** It costs about 30% damage for roughly three times the tankiness, so only do it when you have damage to spare and most of this: high energy shield gear (Rage Carapace, Agony Slippers, Phoenix Claw, Victory Star), several jewels with maximum energy shield and faster start of recharge, and a Darkness Enthroned with "gains bonuses from socketed items as though it was a body armour", holding Craiceann's Rune of Recovery and a Rune of the Blossom. Stay under 99% socketed item effect, or the Rune of the Blossom grants no Spirit.

## Gear Priorities

+Level of all Spell Skills on the wand and amulet, Spirit on the sceptre, amulet and body armour (each totem needs it), then life, mana and resistances. The build works on very little gear, which is what makes it such a strong league starter.

## FAQ

**How do I get the Grim Pillars gem?** As of patch 0.5.5, the exact drop source is still unknown: all that is known is that it is found somewhere in Act 4. Complete every Runes of Aldur encounter you come across, keep using your levelling setup until then, and switch to totems as soon as the gem drops.

**Why do my totems disappear when I cast other spells?** Your weapon set passives are set up wrong, and this setup is mandatory, not a bonus. In the inventory, right-click both the wand and the sceptre on the weapon set 1 button so they are equipped in both sets (shadows appear in set 2). In the skills panel, put [[Spell Totem]] on weapon set 1 only and every other skill on weapon set 2 only. Allocate the totem passives on set 1 and the utility passives on set 2: totems always use the set 1 tree, whichever set you are holding. You should have 24 weapon set points after the campaign.

**Which sceptre should I use?** Always one with [[Purity of Fire]], [[Purity of Ice]] or [[Purity of Lightning]] as its innate skill. These can run aura supports such as Mysticism II, Vitality II and Clarity II without reserving Spirit, which leaves all your Spirit for totems. Any other sceptre is useless for this build.

**What levels should my gems be?** Only the level of [[Grim Pillars]] changes your damage: raise it with a Thaumaturgic Flux of the matching level, but never overlevel since it cannot be undone. Keep [[Spell Totem]] as high as possible early for survivability, then once you have Unnamed Heartwood set its total level to exactly 14, counting wand and amulet bonuses, to save mana while keeping two totems. Keep [[Entangle]] at level 1, and [[Elemental Weakness]] and [[Frost Bomb]] at level 18 for the endgame, not higher, to limit mana costs.

**Where does the Spirit for more totems come from?** Campaign quests give up to 100: 30 by the end of Act 1, 60 by the end of Act 3 and 100 after the Interludes. A good sceptre is the biggest source with 150 to 210, then up to 65 from a Solar Amulet and up to 61 from a body armour prefix. Efficient Inscriptions on the amulet lowers the cost of each totem from 75 to 63 Spirit.

**Any tips for levelling a spellcaster?** Take every % damage node you see on the tree and get +levels to skills on your wand, focus and amulet as early as possible: every level is a big damage increase. Check vendors at every level, and trade for them with the Exalted Orbs you find if needed.
