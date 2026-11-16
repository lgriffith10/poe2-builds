---
title: His Scattering Calamity Titan
class: Warrior
ascendancy: Titan
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Titan using His Scattering Calamity"
  author: 샤닝타이탄오오 (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/%EC%83%A4%EC%9D%B4%EB%8B%9D-5233/%EC%83%A4%EB%8B%9D%ED%83%80%EC%9D%B4%ED%83%84%EC%98%A4%EC%98%A4
  updated: 2026-11-08
origin: ladder
summary: "Titan caster built around the unique staff The Unborn Lich: its skill His Scattering Calamity does nearly all the damage, protected by Mind Over Matter and Eldritch Battery."
tags: [caster, lightning, unique-based, mana]
damage: Lightning
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "One skill does almost all the damage"
  - "Very consistent setup across the ladder"
  - "The Titan's size and Hulking Form make it sturdy"
cons:
  - "Requires The Unborn Lich"
  - "A warrior played as a caster is unusual and takes some respec planning"
  - "The reference gear includes expensive uniques"
skills:
  - gem: His Scattering Calamity
    supports: [Zenith II, Execute III, Rakiata's Flow, Esh's Radiance, Sione's Temper]
  - gem: Comet
    supports: [Boundless Energy II, Spell Cascade, Efficiency II, Lifetap]
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Comet
  - gem: Sigil of Power
    supports: [Prolonged Duration II, Magnified Area II, Cooldown Recovery II, Efficiency II, Profanity II]
  - gem: Mana Tempest
    supports: [Lightning Mastery, Morgana's Tempest, Lifetap, Efficiency II, Dialla's Desire]
  - gem: Powered by Verisium
    supports: &a1 [Wildshards II, Efficiency II, Atalui's Bloodletting]
    note: Socketed in Cast on Critical
  - gem: Arc
    supports: *a1
    note: Socketed in Cast on Critical
  - gem: Cast on Critical
    supports: []
    note: Holds Powered by Verisium, Arc
  - gem: Temporal Chains
    supports: [Seraph's Heart, Atziri's Communion, Ritualistic Curse, Clarity I]
    note: Socketed in Blasphemy
  - gem: Blasphemy
    supports: []
    note: Holds Temporal Chains
  - gem: Feast of Flesh
    supports: [Magnified Area II, Rapid Casting II, Corpse Conservation]
  - gem: Explosive Transmutation
    supports: [Lightning Mastery, Spell Cascade, Magnified Area II]
  - gem: Siphon Elements
    supports: [Lightning Mastery, Harmonic Remnants II, Remnant Potency I]
  - gem: Mana Remnants
    supports: [Harmonic Remnants II, Remnant Potency I, Cannibalism I]
  - gem: Remnants of Kalguur
    supports: [Harmonic Remnants II, Remnant Potency I]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Boneshatter, Shockwave Totem, Perfect Strike, Infernal Cry, Frost Bomb]
    - label: "Act Ii"
      gems: [Leap Slam, Forge Hammer]
    - label: "Act Iii"
      gems: [Hammer of the Gods, Earthshatter, Seismic Cry]
  spirit:
    - label: "Act I"
      gems: [Herald of Ash]
    - label: "Act Iii"
      gems: [Scavenged Plating]
  supports:
    - label: "ACT I (Rapid Twice)"
      gems: [Impact Shockwave, Concentrated Area, Rapid Attacks I, Magnified Area I, Overabundance I, Window of Opportunity I]
    - label: "Act Ii"
      gems: [Execute I, Brink I, Rapid Attacks I, Fist of War I, Crater]
    - label: "Act Iii+"
      gems: [Branching Fissures I, Fist of War II, Execute II, Urgent Totems II, Cannibalism I, Rapid Attacks II]
levelingSource:
  title: "Boneshatter Titan Build Guide"
  url: https://maxroll.gg/poe2/build-guides/boneshatter-titan-leveling-guide
leveling:
  - steps:
      - name: "Act 1"
        skills:
          - gem: "Mace Strike"
            supports: [Concentrated Area, Rapid Attacks I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Rolling Slam"
            supports: [Rapid Attacks I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Execute I]
          - gem: "Infernal Cry"
          - gem: "Perfect Strike"
            supports: [Rapid Attacks I, Window of Opportunity I]
          - gem: "Herald of Ash"
          - gem: "Frost Bomb"
      - name: "Act 2"
        skills:
          - gem: "Mace Strike"
            supports: [Concentrated Area, Rapid Attacks I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Rolling Slam"
            supports: [Rapid Attacks I]
          - gem: "Forge Hammer"
            supports: [Fist of War I, Execute I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Execute I]
          - gem: "Infernal Cry"
            supports: [Raging Cry]
          - gem: "Leap Slam"
            supports: [Brink I, Crater]
          - gem: "Herald of Ash"
      - name: "Act 3+"
        skills:
          - gem: "Mace Strike"
            supports: [Rapid Attacks I, Armour Break I, Armour Demolisher I]
          - gem: "Boneshatter"
            supports: [Impact Shockwave, Magnified Area I]
          - gem: "Forge Hammer"
            supports: [Fist of War II, Execute II, Branching Fissures I]
          - gem: "Shockwave Totem"
            supports: [Overabundance I, Urgent Totems III]
          - gem: "Infernal Cry"
            supports: [Raging Cry]
          - gem: "Leap Slam"
            supports: [Brink I, Crater, Rapid Attacks II]
          - gem: "Herald of Ash"
            supports: [Cannibalism I]
          - gem: "Scavenged Plating"
            supports: [Prolonged Duration I]
          - gem: "Hammer of the Gods"
            supports: [Fist of War I, Heavy Swing]
          - gem: "Seismic Cry"
            supports: [Raging Cry]
gear:
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+4 to Level of all Spell Skills, +176 to maximum Mana, +50 to Spirit, 37% increased Cast Speed]
    ladder:
      - name: Rare Amulet
        pct: 99
      - name: Defiance of Destiny
        pct: 1
      - name: Beacon of Azis
        pct: 0
      - name: Astramentis
        pct: 0
  body:
    unique: Morior Invictus
    runes: ["2× Perfect Mind Rune: +100 to maximum Mana", "3× Perfect Glacial Rune: +66% to Cold Resistance"]
    ladder:
      - name: Rare Body Armour
        pct: 52
      - name: Morior Invictus
        pct: 42
      - name: Reverie
        pct: 1
      - name: Kaom's Heart
        pct: 1
  boots:
    base: Sekhema Sandals
    mods: [+44% to Fire Resistance, 35% increased Movement Speed, +59 to maximum Energy Shield, +43% to Lightning Resistance, +25% to Chaos Resistance, 99% increased Energy Shield]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Tecrod's Gaze: 10% increased Movement Speed when on Low Life"]
    ladder:
      - name: Rare Boots
        pct: 99
      - name: Decree of Flight
        pct: 1
      - name: Ghostmarch
        pct: 0
      - name: Wanderlust
        pct: 0
  belt:
    unique: Mageblood
    ladder:
      - name: Headhunter
        pct: 43
      - name: Mageblood
        pct: 38
      - name: Rare Belt
        pct: 12
      - name: Ingenuity
        pct: 6
  helmet:
    base: Ancestral Tiara
    mods: [+72 to maximum Energy Shield, 37% increased Energy Shield, +32 to maximum Mana, 26% increased Critical Hit Chance, +37% to Fire Resistance, +35% to Lightning Resistance, 100% increased Energy Shield]
    runes: ["Pain Attunement", "Raven-Touched Shard: Raven-Touched"]
    ladder:
      - name: Rare Helmet
        pct: 95
      - name: Alpha's Howl
        pct: 2
      - name: Veil of the Night
        pct: 2
      - name: Scold's Bridle
        pct: 1
  gloves:
    base: Opulent Gloves
    mods: [+122 to maximum Mana, +2 to Level of all Projectile Skills, 38% increased Projectile Damage, +56 to maximum Energy Shield, 60% increased effect of Socketed Augment Items, 28% increased Critical Damage Bonus]
    runes: ["Fenumus' Rune of Spinning: 12% increased Cast Speed", "Kolr's Hunt: Can roll Marksman modifiers"]
    ladder:
      - name: Rare Gloves
        pct: 96
      - name: Leopold's Applause
        pct: 2
      - name: Maligaro's Virtuosity
        pct: 1
      - name: Painter's Servant
        pct: 1
  weapon2:
    base: Chiming Staff
    mods: [Gain 52% of Damage as Extra Lightning Damage, 132% increased Spell Damage, +22 to Intelligence, 72% increased chance to Shock, +172 to maximum Mana, +6 to Level of all Spell Skills]
    runes: ["Astrid's Creativity: Can have 1 additional Crafted Modifier", "Greater Inspiration Rune: 30% increased Mana Regeneration Rate"]
    ladder:
      - name: The Unborn Lich
        pct: 100
      - name: Rare Staff
        pct: 71
      - name: Rare Talisman
        pct: 1
      - name: Amor Mandragora
        pct: 1
  ring1:
    unique: Kalandra's Touch
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 75
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
  weapon:
    unique: The Unborn Lich
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements", "Thane Girt's Rune of Wildness: 25% chance for Spell Skills to fire 2 additional Projectiles"]
    ladder:
      - name: The Unborn Lich
        pct: 100
      - name: Rare Staff
        pct: 71
      - name: Rare Talisman
        pct: 1
      - name: Amor Mandragora
        pct: 1
  ring2:
    base: Mnemonic Ring
    implicits: [8% increased maximum Mana]
    mods: [+254 to maximum Mana, 21% increased Cast Speed, +31 to Intelligence, +15% to all Elemental Resistances, Gain 11% of Damage as Extra Fire Damage with Spells, 8% increased maximum Mana]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 75
      - name: Ventor's Gamble
        pct: 1
      - name: Andvarius
        pct: 1
passives:
  attribute: int
  path:
    - "Cruel Fate"
    - "Constricting"
    - "Mind Over Matter"
    - "Raw Mana"
    - "Controlling Magic"
    - "Arcane Intensity"
    - "Eldritch Battery"
    - "For the Jugular"
    - "True Strike"
    - "Heartbreaking"
    - "Heartstopping"
    - "Remnant Attraction"
    - "Tempered Mind"
    - "Dreamcatcher"
    - "Mental Alacrity"
    - "Brain Freeze"
    - "Invigorating Archon"
    - "Energising Archon"
    - "Brain Storm"
    - "Cooked"
  ascendancy: [Mysterious Lineage, Hulking Form, Crushing Impacts, Colossal Capacity]
  weaponSet1: [Turn the Clock Back, Turn the Clock Forward, Forthcoming, Careful Assassin, Throatseeker, Near at Hand]
  weaponSet2: [Preservation, Effervescent, Casting Cascade, Overzealous, Final Barrage, Reverberation]
farming:
  clear: 3
  single: 2
  tank: 3
  speed: 1
  style: ranged
  traits: [armour]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide: 529 Titan characters use [[His Scattering Calamity]], and the reference character is level 99. It is a lightning spell granted by the unique staff [[The Unborn Lich]], which every one of these players wields (100%). Players link it with **Zenith II (90%), Sione's Temper (79%), Rakiata's Flow (66%) and Esh's Radiance (61%)**, with Execute III on about half. Zenith II deals more damage while you are above 90% of your maximum mana.

[[Comet]] (49%), [[Arc]] (64%) and [[Powered by Verisium]] (62%) sit in [[Cast on Critical]], so critical hits trigger them. [[Mana Tempest]] (66%) and [[Sigil of Power]] (66%) boost your spells, and [[Temporal Chains]] in [[Blasphemy]] slows enemies.

Defence is built on mana:
- **Eldritch Battery (93%)** converts all your energy shield to mana, but doubles mana costs.
- **Mind Over Matter (91%)** takes all damage from mana before life, with 50% less mana recovery rate.
- **Mysterious Lineage (92%)** gives 15% more maximum life, and **Hulking Form (100%)** 50% increased effect of small passives.
- **Crushing Impacts (75%)** makes your hits Crushing Blows, with 25% more damage against heavily stunned enemies. Colossal Capacity (100%) adds inventory space.

## Leveling

No ladder character shows a campaign, so the leveling steps on this page come from Maxroll's Boneshatter Titan leveling guide, a melee Warrior route. This build only becomes a caster once you equip The Unborn Lich, and the tree above is a caster tree: follow the leveling guide's tree during the campaign, then respec.

The Unborn Lich is very cheap: buy it once you are ready to switch, along with gear that gives mana and energy shield. Take Mysterious Lineage and Hulking Form first, then Crushing Impacts. Eldritch Battery and Mind Over Matter come with the respec.

## Playstyle

**Mapping.** Cast His Scattering Calamity into packs; Sione's Temper builds up to bursts of extra projectiles, and critical hits trigger Arc and Comet for clear.

**Bossing.** Place Sigil of Power, curse with Blasphemy, use Mana Tempest, then keep casting His Scattering Calamity while your mana stays above 90% for Zenith II. Critical hits keep Comet and Powered by Verisium firing.

## Endgame Progression

**First maps.**
- [[The Unborn Lich]] (100%) is required and cheap.
- Maximum mana and energy shield on every slot: Eldritch Battery turns energy shield into mana, and Mind Over Matter makes mana your first life pool.
- Cast speed, critical chance and capped resistances.

**Endgame.**
- Heart of the Well (89%) is the common jewel, Rite of Passage (73%) and Nascent Hope (65%) the common charms.
- [[Kalandra's Touch]] (75%) copies your best ring, and [[Morior Invictus]] (42%) is the common body armour.
- [[Headhunter]] (41%) for clear speed.
- [[Mageblood]] (40%) is a luxury, worn by the reference character but not required.

## Gear Priorities

Maximum mana and energy shield, then + to spell skill levels, cast speed and critical chance. Capped resistances, mana regeneration, and movement speed on boots.

## FAQ

**Why a Titan for a caster?** Mysterious Lineage and Hulking Form give a lot of life and passive value, which the mana-based defences build on.

**Why is my mana always empty?** Eldritch Battery doubles mana costs and Mind Over Matter takes hits from mana. Get more maximum mana and regeneration; Mana Remnants and Siphon Elements help too.

**Do I need The Unborn Lich?** Yes: His Scattering Calamity is the staff's skill.
