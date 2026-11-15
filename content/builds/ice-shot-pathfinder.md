---
title: Ice Shot Pathfinder
class: Ranger
ascendancy: Pathfinder
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Pathfinder using Ice Shot"
  author: yoohom (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/yyy-3469/yoohom
  updated: 2026-11-08
origin: ladder
summary: "Ranger archer firing Ice Shot through Mirage Deadeye, with Tornado Shot and Herald of Ice to clear, on the Pathfinder ascendancy."
tags: [ranged, bow, cold, projectile]
damage: Cold
playstyle: Ranged attack
difficulty: easy
budget: high
pros:
  - "Ice Shot does almost all the damage"
  - "Very fast clear with Tornado Shot and Herald of Ice"
  - "Cadiro's Gambit is the only unique most players share"
cons:
  - "The reference gear includes expensive uniques"
  - "Mirage Deadeye adds a meta gem to understand"
  - "Bow builds need good movement to stay safe"
skills:
  - gem: Ice Shot
    supports: [Rapid Attacks II, Elemental Armament II, Deliberation, Cooldown Recovery II]
    note: Socketed in Mirage Deadeye
  - gem: Mirage Deadeye
    supports: []
    note: Holds Ice Shot
  - gem: Mana Remnants
    supports: [Atziri's Communion, Dialla's Desire, Harmonic Remnants II, Khatal's Rejuvenation, Remnant Potency I]
  - gem: Freezing Mark
    supports: [Charged Mark, Eternal Mark, Rapid Attacks II, Prolonged Duration II]
    note: Socketed in Pounce
  - gem: Pounce
    supports: []
    note: Holds Freezing Mark
  - gem: Herald of Ice
    supports: [Magnified Area I, Elemental Armament II, Elemental Focus, Cold Attunement, Longshot II]
  - gem: Barrage
    supports: [Rapid Casting II, Cooldown Recovery II, Perpetual Charge, Efficiency II, Olroth's Conviction]
  - gem: Tornado Shot
    supports: [Prolonged Duration II, Durability, Blind II, Overabundance II]
  - gem: Cackling Companions
    supports: [Brutus' Brain, Maim, Blind II]
  - gem: Wind Dancer
    supports: [Knockback, Blind II, Magnified Area I]
  - gem: Ghost Dance
    supports: [Cooldown Recovery II]
levelingSource:
  title: "Lightning Arrow Deadeye Leveling Build Guide"
  url: https://maxroll.gg/poe2/build-guides/lightning-arrow-deadeye-leveling-build-guide
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain I, Rapid Attacks I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament I, Multishot I]
          - gem: "Frost Bomb"
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I, Concentrated Area]
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Freezing Salvo"
            supports: [Hourglass]
      - name: "Act 2"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain II, Rapid Attacks I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Multishot II]
          - gem: "Frost Bomb"
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I, Concentrated Area]
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Innervate]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I, Mark for Death]
      - name: "Act 3"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain II, Rapid Attacks I, Charged Shots I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Multishot II, Concentrated Area]
          - gem: "Frost Bomb"
          - gem: "Herald of Thunder"
            supports: [Elemental Armament II, Concentrated Area, Elemental Focus]
          - gem: "Barrage"
            supports: [Rapid Casting I, Cooldown Recovery I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Innervate]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I, Mark for Death]
          - gem: "Wind Dancer"
            supports: [Blind I]
          - gem: "Tornado Shot"
            supports: [Overabundance I, Maim]
      - name: "Act 4"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain II, Rapid Attacks II, Charged Shots I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Multishot II, Concentrated Area]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Rapid Casting II]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament II, Concentrated Area, Elemental Focus]
          - gem: "Barrage"
            supports: [Rapid Casting II, Cooldown Recovery II]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Innervate]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I, Mark for Death]
          - gem: "Wind Dancer"
            supports: [Blind I]
          - gem: "Tornado Shot"
            supports: [Overabundance II, Maim, Prolonged Duration II]
      - name: "Act 5 / End of Campaign"
        skills:
          - gem: "Lightning Arrow"
            supports: [Chain III, Rapid Attacks II, Charged Shots I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Multishot II, Concentrated Area]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Rapid Casting II]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament II, Concentrated Area, Elemental Focus]
          - gem: "Barrage"
            supports: [Rapid Casting II, Cooldown Recovery II, Second Wind III]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Innervate]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration II, Mark for Death II]
          - gem: "Wind Dancer"
            supports: [Blind II, Cannibalism I]
          - gem: "Tornado Shot"
            supports: [Overabundance II, Maim, Prolonged Duration II]
    rotations:
      - name: "Basic Single Target"
        steps:
          - gem: "Lightning Rod"
            label: "Stack Max Rods"
          - gem: "Lightning Arrow"
            label: "Fire LA into Rods"
      - name: "Advanced Single Target"
        steps:
          - gem: "Lightning Rod"
            label: "Before the Boss Spawns"
          - gem: "Frost Bomb"
          - gem: "Tornado Shot"
          - gem: "Voltaic Mark"
            label: "As the Boss Spawns"
          - gem: "Freezing Salvo"
          - gem: "Barrage"
            label: "Spam LA into LR/TS"
          - gem: "Lightning Arrow"
      - name: "Quick Single Target"
        steps:
          - gem: "Barrage"
            label: "Quickly Stack Rods"
          - gem: "Lightning Rod"
          - gem: "Frost Bomb"
          - gem: "Barrage"
            label: "Spam LA into LR/TS"
          - gem: "Lightning Arrow"
gear:
  weapon:
    base: Warmonger Bow
    mods: [179% increased Physical Damage, Adds 35 to 57 Physical Damage, 100% increased Elemental Damage with Attacks, +200% Surpassing chance to fire an additional Arrow, +4.5% to Critical Hit Chance, +2 to Level of all Attack Skills, 25% chance to gain Onslaught on Killing Hits with this Weapon]
    runes: ["Serle's Triumph: +1 Suffix Modifier allowed", "Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    ladder:
      - name: Rare Bow
        pct: 95
      - name: Hysseg's Claw
        pct: 27
      - name: Adonia's Ego
        pct: 4
      - name: Sylvan's Effigy
        pct: 2
  body:
    unique: Morior Invictus
    runes: ["Rune of Foundations: +30 to Armour, +30 to Evasion Rating, +10 to maximum Energy Shield", "Emergent Possibility: 15% of Chaos Damage from Hits taken as Damage of a random Element", "Hawk Idol: 10% increased Deflection Rating"]
    ladder:
      - name: Rare Body Armour
        pct: 65
      - name: Morior Invictus
        pct: 30
      - name: Hyrri's Ire
        pct: 2
      - name: The Brass Dome
        pct: 1
  belt:
    unique: Mageblood
    ladder:
      - name: Mageblood
        pct: 49
      - name: Headhunter
        pct: 42
      - name: Rare Belt
        pct: 6
      - name: Ingenuity
        pct: 2
  ring1:
    base: Gold Ring
    implicits: [15% increased Rarity of Items found]
    mods: [19% increased Rarity of Items found, Adds 32 to 47 Cold damage to Attacks, +14% to all Elemental Resistances, +21% to Chaos Resistance, Adds 25 to 40 Physical Damage to Attacks, 11% increased Attack Speed]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 47
      - name: Andvarius
        pct: 1
      - name: Ventor's Gamble
        pct: 0
  amulet:
    base: Gold Amulet
    implicits: [20% increased Rarity of Items found]
    mods: [+3 to Level of all Projectile Skills, 65% increased maximum Energy Shield, +46 to Spirit, 36% increased Critical Hit Chance, +24 to all Attributes, Gain 17% of Physical Damage as Extra Cold Damage]
    ladder:
      - name: Rare Amulet
        pct: 97
      - name: Astramentis
        pct: 1
      - name: Yoke of Suffering
        pct: 1
      - name: Eventide Petals
        pct: 0
  weapon2:
    unique: Hysseg's Claw
    ladder:
      - name: Rare Bow
        pct: 95
      - name: Hysseg's Claw
        pct: 27
      - name: Adonia's Ego
        pct: 4
      - name: Sylvan's Effigy
        pct: 2
  offhand:
    unique: Cadiro's Gambit
    ladder:
      - name: Cadiro's Gambit
        pct: 83
      - name: Rare Quiver
        pct: 18
      - name: Drillneck
        pct: 0
      - name: Sunsplinter
        pct: 0
  boots:
    base: Daggerfoot Shoes
    mods: [23% increased Movement Speed while Sprinting, 35% increased Movement Speed, 90% increased Evasion and Energy Shield, +43% to Fire Resistance, 16% increased Rarity of Items found, 60% increased effect of Socketed Augment Items]
    runes: ["Farrul's Rune of the Chase: 8% increased Movement Speed", "Uhtred's Sidereus: Can roll Chronomancy modifiers"]
    ladder:
      - name: Rare Boots
        pct: 98
      - name: Atziri's Step
        pct: 1
      - name: Ghostmarch
        pct: 0
      - name: Gamblesprint
        pct: 0
  helmet:
    base: Ancestral Tiara
    mods: [100% increased Energy Shield, 42% increased Energy Shield, +45 to maximum Life, 16% increased Rarity of Items found, 32% increased Critical Hit Chance, +40% to Lightning Resistance, +73 to maximum Energy Shield]
    runes: ["+50 to all Attributes", "Raven-Touched Shard: Raven-Touched"]
    ladder:
      - name: Rare Helmet
        pct: 97
      - name: Alpha's Howl
        pct: 2
      - name: Decree of Acuity
        pct: 0
      - name: Crown of Eyes
        pct: 0
  ring2:
    base: Gold Ring
    implicits: [15% increased Rarity of Items found]
    mods: [Adds 26 to 44 Physical Damage to Attacks, Adds 1 to 91 Lightning damage to Attacks, 18% increased Rarity of Items found, +14% to all Elemental Resistances, +37% to Cold Resistance, Adds 33 to 46 Fire damage to Attacks]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 47
      - name: Andvarius
        pct: 1
      - name: Ventor's Gamble
        pct: 0
  gloves:
    base: Secured Wraps
    mods: [Adds 1 to 57 Lightning damage to Attacks, Adds 28 to 44 Fire damage to Attacks, +2 to Level of all Projectile Skills, 39% increased Projectile Damage, +65% Surpassing chance to fire an additional Projectile, 26% increased Critical Damage Bonus]
    runes: ["Idol of Sirrius: 8% increased Attack Speed", "Kolr's Hunt: Can roll Marksman modifiers"]
    ladder:
      - name: Rare Gloves
        pct: 97
      - name: Maligaro's Virtuosity
        pct: 1
      - name: Sine Aequo
        pct: 1
      - name: Painter's Servant
        pct: 1
passives:
  attribute: int
  path:
    - "Blur"
    - "Escape Velocity"
    - "Harness the Elements"
    - "Sniper"
    - "Acceleration"
    - "The Wild Cat"
    - "Heartbreaking"
    - "Enhanced Reflexes"
    - "Struck Through"
    - "Heartstopping"
    - "First Principle of the Hollow"
    - "Thin Ice"
    - "Spectral Ward"
    - "For the Jugular"
    - "True Strike"
    - "Shimmering"
    - "Crashing Wave"
    - "Flow Like Water"
    - "Mindful Awareness"
    - "Step Like Mist"
    - "Essence of the Mountain"
    - "Serrated Edges"
  ascendancy: [Path Seeker, Relentless Pursuit, Traveller's Wisdom, Running Assault]
  weaponSet1: [Maiming Strike, Catalysis, Coming Calamity, Stupefy, Dizzying Hits, Throatseeker, Deadly Force, Moment of Truth]
  weaponSet2: [Marked for Sickness, Marked Agility, Frazzled, Marathon Runner, The Noble Wolf]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide: 835 Pathfinder characters use [[Ice Shot]], and the reference character is level 100. Ice Shot fires a cold arrow; players link it with **Elemental Armament II (98%), Cooldown Recovery II (92%) and Rapid Attacks II (78%)**, and half of them add Deliberation (50%). The reference character sockets it in [[Mirage Deadeye]], so a mirage fires Ice Shot with you.

Clear comes from [[Tornado Shot]] (90%) and [[Herald of Ice]] (80%), which shatters frozen enemies. [[Barrage]] (56%) is the usual boss tool, and [[Freezing Mark]] (47%) is linked to [[Pounce]] on the reference character. [[Cadiro's Gambit]] (83%) is the one unique almost everyone shares: each arrow becomes one of six special arrows.

The Pathfinder ascendancy is about movement:
- **Path Seeker (99%)** is taken by almost everyone.
- **Relentless Pursuit (96%)**: your speed is unaffected by slows.
- **Traveller's Wisdom (89%)** lets attribute passives give 5% increased damage, defences or cost efficiency instead.
- **Running Assault (77%)**: no heavy stun while sprinting, and 30% less movement speed penalty from using skills while moving.

## Leveling

No ladder character shows a campaign, so the leveling steps on this page come from Maxroll's Lightning Arrow Deadeye leveling guide, a Ranger bow route with Lightning Arrow, Lightning Rod and Barrage. The tree and ascendancy above are endgame choices: follow the leveling guide's tree during the campaign.

Swap to Ice Shot and Tornado Shot once you have them with Elemental Armament II, and add Herald of Ice for clear. Take Path Seeker and Relentless Pursuit first, then Traveller's Wisdom and Running Assault.

## Playstyle

**Mapping.** Fire Tornado Shot and Ice Shot ahead of you while moving; Herald of Ice shatters frozen packs. Running Assault lets you keep moving while you shoot.

**Bossing.** Apply Freezing Mark, then Barrage and Ice Shot while the mirage adds its own shots. Stay mobile: Relentless Pursuit keeps you fast even when slowed, and [[Ghost Dance]] and [[Wind Dancer]] add defence.

## Endgame Progression

**First maps.**
- A bow with high physical or cold damage and + to projectile skill levels carries the damage. [[Cadiro's Gambit]] (83%) is the quiver almost everyone uses.
- Evasion gear with capped resistances, and added cold damage to attacks on rings and gloves.
- Lavianga's Spirits (62%) is the common flask, and cheap.

**Endgame.**
- Heart of the Well (89%) is the common jewel, Rite of Passage (81%) and Nascent Hope (70%) the common charms.
- Against the Darkness (48%) and [[Kalandra's Touch]] (46%) are frequent upgrades.
- The reference character wears [[Morior Invictus]] and keeps [[Hysseg's Claw]] on weapon set 2.
- [[Mageblood]] (50%) is a luxury, worn by the reference character but not required.

## Gear Priorities

Bow damage and + to projectile skill levels, then evasion and capped resistances. Added cold damage to attacks on rings and gloves, accuracy, and movement speed on boots.

## FAQ

**Which quiver should I use?** Cadiro's Gambit: 83% of these players use it.

**How do I clear faster?** Tornado Shot and Herald of Ice do most of the clear; Ice Shot is the heavy hitter for rares and bosses.

**Why Cooldown Recovery II on Ice Shot?** 92% of these players link it, so the mirage and the main skill come back faster.
