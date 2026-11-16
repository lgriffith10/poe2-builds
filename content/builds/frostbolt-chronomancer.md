---
title: Frostbolt Chronomancer
class: Sorceress
ascendancy: Chronomancer
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Chronomancer using Frostbolt"
  author: 三百六十度原地轉一圈 (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/ophster125268-3466/%E4%B8%89%E7%99%BE%E5%85%AD%E5%8D%81%E5%BA%A6%E5%8E%9F%E5%9C%B0%E8%BD%89%E4%B8%80%E5%9C%88
  updated: 2026-10-21
origin: ladder
summary: "Sorceress who fires Frostbolt and lets critical hits trigger Comet and other spells, on the Chronomancer's time magic."
tags: [caster, cold, projectile, trigger]
damage: Cold
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Frostbolt is the only spell you really aim"
  - "Comet and other spells trigger on critical hits"
  - "Strong ascendancy with Phased Form and Quicksand Hourglass"
cons:
  - "Small sample: 258 ladder characters"
  - "The trigger setup takes some understanding"
  - "The reference gear includes Mageblood"
skills:
  - gem: Frostbolt
    supports: [Vilenta's Propulsion, Sione's Temper, Trickster's Shard, Atalui's Bloodletting, Rakiata's Flow]
  - gem: Powered by Verisium
    supports: &a1 [Projectile Acceleration III, Zenith II, Esh's Prowess]
    note: Socketed in Spellslinger
  - gem: Spark
    supports: *a1
    note: Socketed in Spellslinger
  - gem: Spellslinger
    supports: []
    note: Holds Powered by Verisium, Spark
  - gem: Living Bomb
    supports: &a2 [Boundless Energy II, Efficiency II, Execute III]
    note: Socketed in Cast on Critical
  - gem: Comet
    supports: *a2
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Living Bomb, Comet
  - gem: Living Bomb
    supports: &a3 [Boundless Energy II, Efficiency II, Creeping Chill]
    note: Socketed in Cast on Critical
  - gem: Grim Pillars
    supports: *a3
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Living Bomb, Grim Pillars
  - gem: Archmage
    supports: [Dialla's Desire, Herbalism II, Lightning Mastery, Her Declaration, Cannibalism I]
  - gem: Explosive Transmutation
    supports: [Mórrigan's Insight, Spell Cascade, Zenith II, Physical Mastery, Lightning Attunement]
  - gem: Time Snap
    supports: [Atziri's Impatience, Second Wind III, Rapid Casting II, Uhtred's Rite]
  - gem: Refutation
    supports: [Uhtred's Constellation, Prolonged Duration II, Rapid Casting II, Mobility]
  - gem: Time Freeze
    supports: [Second Wind III, Rapid Casting II, Magnified Area II]
  - gem: Rite of Restoration
    supports: [Second Wind III, Rapid Casting III, Magnified Area II]
  - gem: Mana Remnants
    supports: [Remnant Potency I, Harmonic Remnants II, Khatal's Rejuvenation]
  - gem: Blink
    supports: [Cooldown Recovery II, Rapid Casting II]
  - gem: Remnants of Kalguur
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Trinity
    supports: [Atziri's Communion, Uhtred's Omen]
  - gem: Purity of Fire
    supports: []
  - gem: Raise Shield
    supports: []
gemPriority:
  skills:
    - label: "Start"
      gems: [Spark, Flame Wall, Frost Bomb]
    - label: "Act I"
      gems: [Ice Nova, Frost Darts, Snap]
    - label: "Act Ii"
      gems: [Elemental Weakness]
    - label: "Act III"
      gems: [Frost Wall]
    - label: "Maps"
      gems: [Comet]
  spirit:
    - label: "Act I"
      gems: [Withering Presence, Arctic Armour]
    - label: "Act III"
      gems: [Siphon Elements]
    - label: "Maps"
      gems: [Cast on Elemental Ailment]
    - label: "160 Spirit"
      gems: [Cast on Elemental Ailment, Siphon Elements, Convalescence]
  supports:
    - label: "Act I"
      gems: [Controlled Destruction, Spell Cascade, Rapid Casting I, Overabundance I]
    - label: "Act Ii"
      gems: [Spell Echo, Rising Tempest, Magnified Area I, Heightened Curse, Prolonged Duration I, Fortress I]
    - label: "Act III"
      gems: [Astral Projection, Icicle, Harmonic Remnants II]
    - label: "Act Iv"
      gems: [Considered Casting, Potent Exposure, Cooldown Recovery II, Elemental Focus]
    - label: "Maps"
      gems: [Boundless Energy II, Efficiency II, Rising Tempest, Focused Curse]
levelingSource:
  title: "Ice Nova Snap Stormweaver Build Guide"
  url: https://maxroll.gg/poe2/build-guides/cold-snap-frostbolt-stormweaver-leveling-guide
leveling:
  - steps:
      - name: "Level 3 Swap"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Magnified Area I]
          - gem: "Frost Darts"
          - gem: "Frost Bomb"
          - gem: "Flame Wall"
      - name: "Act 1"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Magnified Area I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Rapid Casting I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Cascade]
          - gem: "Flame Wall"
          - gem: "Snap"
          - gem: "Arctic Armour"
      - name: "Act 2"
        skills:
          - gem: "Ice Nova"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting]
          - gem: "Snap"
            supports: [Rising Tempest, Magnified Area I]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Prolonged Duration II]
          - gem: "Arctic Armour"
      - name: "Act 3"
        skills:
          - gem: "Ice Nova"
            supports: [Astral Projection, Rising Tempest, Magnified Area II]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting, Cold Penetration]
          - gem: "Snap"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery I]
          - gem: "Frost Wall"
            supports: [Icicle, Spell Cascade, Cooldown Recovery I]
          - gem: "Frost Bomb"
            supports: [Spell Echo, Overabundance I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Prolonged Duration II]
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II]
          - gem: "Arctic Armour"
gear:
  gloves:
    base: Opulent Gloves
    mods: [+75 to maximum Mana, 15% increased Projectile Speed, +2 to Level of all Projectile Skills, +25 to Intelligence, 33% increased Projectile Damage, Projectiles have 96% chance for an additional Projectile when Forking]
    runes: ["Perfect Vision Rune: 20% increased Life and Mana Recovery from Flasks", "Kolr's Hunt: Can roll Marksman modifiers"]
    ladder:
      - name: Maligaro's Virtuosity
        pct: 53
      - name: Rare Gloves
        pct: 35
      - name: Nightscale
        pct: 10
      - name: Idle Hands
        pct: 0
  belt:
    unique: Mageblood
    ladder:
      - name: Rare Belt
        pct: 44
      - name: Mageblood
        pct: 34
      - name: Headhunter
        pct: 11
      - name: Midnight Braid
        pct: 7
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+146 to maximum Mana, +4 to Level of all Spell Skills, 33% increased Critical Hit Chance, +50 to Spirit]
    ladder:
      - name: Rare Amulet
        pct: 92
      - name: Eventide Petals
        pct: 5
      - name: Choir of the Storm
        pct: 1
      - name: Fixation of Yix
        pct: 1
  weapon2:
    base: Dueling Wand
    mods: [Gain 22% of Damage as Extra Cold Damage, 73% increased Fire Damage, +118 to maximum Mana, +4 to Level of all Spell Skills, 27% increased Cast Speed, Gain 22 Life per enemy killed]
    runes: ["Greater Iron Rune: 30% increased Spell Damage"]
    ladder:
      - name: Rare Staff
        pct: 71
      - name: Rare Wand
        pct: 34
      - name: Atziri's Rule
        pct: 9
      - name: Widowhail
        pct: 8
  boots:
    base: Sekhema Sandals
    mods: [+128 to maximum Life, +122 to maximum Mana, 18% increased Rarity of Items found, 58% reduced Shock duration on you, 35% increased Movement Speed, 60% increased effect of Socketed Augment Items]
    runes: ["Tecrod's Gaze: 16% increased Movement Speed when on Low Life", "Perfect Vision Rune: 32% increased Life and Mana Recovery from Flasks"]
    ladder:
      - name: Rare Boots
        pct: 98
      - name: Atziri's Step
        pct: 1
      - name: Wanderlust
        pct: 1
      - name: Wondertrap
        pct: 0
  helmet:
    unique: Alpha's Howl
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency"]
    ladder:
      - name: Rare Helmet
        pct: 73
      - name: Alpha's Howl
        pct: 13
      - name: Scold's Bridle
        pct: 5
      - name: Myris Uxor
        pct: 4
  offhand2:
    unique: Crest of Ardura
    runes: ["Greater Body Rune: +60 to maximum Life"]
    ladder:
      - name: Rare Focus
        pct: 30
      - name: Drillneck
        pct: 8
      - name: Svalinn
        pct: 2
      - name: Arvil's Wheel
        pct: 1
  body:
    unique: Reverie
    runes: ["Cannot be Ignited", "-10 Physical Damage taken from Attack Hits", "Perfect Vision Rune: 20% increased Life and Mana Recovery from Flasks", "Warding Rune of Nourishment: 15% Life Recovery from Flasks also applies to Runic Ward"]
    ladder:
      - name: Rare Body Armour
        pct: 72
      - name: Sacrosanctum
        pct: 8
      - name: Morior Invictus
        pct: 6
      - name: Sands of Silk
        pct: 3
  ring1:
    unique: Snakepit
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Snakepit
        pct: 78
      - name: Kalandra's Touch
        pct: 8
      - name: Dream Fragments
        pct: 1
  offhand:
    unique: Sacred Flame
    runes: ["Rabbit Idol: 15% increased Spirit", "Perfect Resolve Rune: +15 to Intelligence"]
    ladder:
      - name: Rare Focus
        pct: 30
      - name: Drillneck
        pct: 8
      - name: Svalinn
        pct: 2
      - name: Arvil's Wheel
        pct: 1
  ring2:
    base: Mnemonic Ring
    implicits: [8% increased maximum Mana]
    mods: [15% increased Critical Hit Chance for Spells, 22% increased Critical Spell Damage Bonus, +10% to all Elemental Resistances, 30% increased Mana Cost Efficiency of Spells, +222 to maximum Mana, 8% increased maximum Mana]
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Snakepit
        pct: 78
      - name: Kalandra's Touch
        pct: 8
      - name: Dream Fragments
        pct: 1
  weapon:
    base: Dueling Wand
    mods: [72% increased Critical Hit Chance for Spells, Gain 31% of Damage as Extra Fire Damage, +3 to Level of all Spell Skills, 123% increased Spell Damage, +175 to maximum Mana, +1 to Level of all Spell Skills, 28% increased Cast Speed, Gain 10% of Elemental Damage as Extra Cold Damage]
    runes: ["Rune of Reach: Remnants you create have 25% reduced effect, Remnants can be collected from 50% further away", "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    ladder:
      - name: Rare Staff
        pct: 71
      - name: Rare Wand
        pct: 34
      - name: Atziri's Rule
        pct: 9
      - name: Widowhail
        pct: 8
passives:
  attribute: int
  path:
    - "Raw Power"
    - "Practiced Signs"
    - "Arcane Remnants"
    - "Vigorous Remnants"
    - "Efficient Casting"
    - "Empowering Remnants"
    - "Shocking Limit"
    - "Frozen Limit"
    - "Infernal Limit"
    - "Empowering Infusions"
    - "Everlasting Infusions"
    - "Infusion of Power"
    - "Mind Over Matter"
    - "Pain Attunement"
    - "Well of Power"
    - "True Strike"
  ascendancy: [Unbound Encore, Quicksand Hourglass, Now and Again, Ultimate Command]
  weaponSet1: [Critical Overload, For the Jugular, Evocational Practitioner, Turn the Clock Forward]
  weaponSet2: [Preservation, Lingering Horror, Devoted Protector, Grounded in the Earth]
farming:
  clear: 3
  single: 3
  tank: 2
  speed: 2
  style: ranged
  traits: [es]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide: 258 Chronomancer characters use [[Frostbolt]], and the reference character is level 97. Frostbolt is the spell you aim; players link it with **Sione's Temper (84%)**, which builds up to a burst of extra projectiles in a circle, **Vilenta's Propulsion (83%)**, which applies cast speed to projectile speed, and **Trickster's Shard (69%)**, which creates a Fractured Mimic that casts the spell too.

The rest of the damage is triggered. Frostbolt's critical hits fire [[Cast on Critical]], which holds [[Comet]] (80% of these players) and [[Living Bomb]], and a second Cast on Critical with [[Grim Pillars]]. [[Spellslinger]] casts [[Spark]] and [[Powered by Verisium]] on its own. [[Frost Wall]] (86%), [[Frost Bomb]] (71%) and [[Elemental Weakness]] (65%) are the common boss tools.

The Chronomancer ascendancy:
- **Unbound Encore** grants [[Time Snap]], which resets your skill cooldowns.
- **Quicksand Hourglass (86%)** grants Sands of Time.
- **Now and Again (82%)** gives cascadable spells a 20% chance to Echo and repeatable spells a 20% chance to Repeat.
- **Ultimate Command** grants [[Time Freeze]], which stops enemies in place.
- **Phased Form (90%)** is the most common pick, although the reference character skips it: you take 30% less damage, then 30% of each hit four seconds later.

## Leveling

No ladder character shows a campaign, so the leveling steps on this page come from Maxroll's Cold Snap and Frostbolt Stormweaver leveling guide, a Sorceress route with Ice Nova, Frost Darts and Snap. The tree and ascendancy above are endgame choices: follow the leveling guide's tree during the campaign.

Frostbolt is in the leveling route already. Add Cast on Critical with Comet once you have critical chance and enough Spirit. Take Phased Form or Unbound Encore first, then Quicksand Hourglass and Now and Again.

## Playstyle

**Mapping.** Fire Frostbolt into packs: Sione's Temper's bursts and the triggered Comets clear the screen while Spellslinger fires Spark on its own.

**Bossing.** Frost Wall to keep the boss in place, Frost Bomb and Elemental Weakness to lower resistances, then Frostbolt so its critical hits trigger Comet and Grim Pillars. Time Freeze holds the boss still, and Time Snap gives your cooldowns back for a second round.

## Endgame Progression

**First maps.**
- Cheap and common uniques: [[Snakepit]] (78%, spell damage, cast speed and forking or chaining depending on the ring slot), [[Maligaro's Virtuosity]] (53%, a fixed 250% critical damage bonus) and Lavianga's Spirits (50%).
- Critical chance on the weapon and focus: the Cast on Critical triggers depend on it.
- Energy shield or evasion gear with capped resistances.

**Endgame.**
- Heart of the Well (68%) is the common jewel, Nascent Hope (63%), Rite of Passage (39%) and The Fall of the Axe (26%) the common charms.
- The reference character wears [[Alpha's Howl]], [[Crest of Ardura]], [[Reverie]] and [[Sacred Flame]].
- Whispers of Doom (21%) lets you apply an additional curse, and Chaos Inoculation (20%) is a minority choice.
- [[Mageblood]] (36%) is a luxury, worn by the reference character but not required.

## Gear Priorities

Critical chance, + to spell skill levels and cast speed, then energy shield and capped resistances. Spirit for Archmage, Trinity and the meta gems, and movement speed on boots.

## FAQ

**Why do my Comets stop falling?** Cast on Critical needs critical hits from Frostbolt. More critical chance on gear, Pinpoint-style supports or Maligaro's Virtuosity fix it.

**Should I take Phased Form?** 90% of these players do. It smooths out big hits; the reference character takes Now and Again instead for more damage.

**What does Trickster's Shard do?** It creates a Fractured Mimic that casts Frostbolt with you, adding projectiles on top of Sione's Temper.
