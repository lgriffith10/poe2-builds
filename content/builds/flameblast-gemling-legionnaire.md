---
title: Flameblast Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Gemling Legionnaire using Flameblast"
  author: 幸运女神眷顾 (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/%E6%AC%A7%E7%9A%87-9552/%E5%B9%B8%E8%BF%90%E5%A5%B3%E7%A5%9E%E7%9C%B7%E9%A1%BE
  updated: 2026-11-08
origin: ladder
summary: "The most played Gemling Legionnaire setup on the ladder: channel Flameblast until it erupts, with Oil Grenade to soak enemies first."
tags: [caster, fire, channelling, league starter]
damage: Fire
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Very popular: 9,458 ladder characters use Flameblast"
  - "One skill does nearly all the damage"
  - "Supports are nearly identical across players"
cons:
  - "You stand still while channelling"
  - "The reference gear includes Mageblood"
  - "Gemling ascendancy relies on many gem-related notables"
skills:
  - gem: Flameblast
    supports: [Controlled Destruction, Considered Casting, Searing Flame II, Concentrated Area, Burgeon II]
  - gem: Sigil of Power
    supports: [Efficiency II, Prolonged Duration II, Overabundance I, Arcane Surge, Magnified Area II]
  - gem: Arctic Armour
    supports: [Cold Mastery, Blind II, Knockback, Elemental Focus, Lasting Shock]
  - gem: Wind Dancer
    supports: [Fire Penetration II, Brutality I, Cooldown Recovery II, Maim, Bounty I]
  - gem: Refutation
    supports: [Boundless Energy II, Efficiency I, Energy Retention, Dialla's Desire]
    note: Socketed in Cast on Dodge
  - gem: Cast on Dodge
    supports: []
    note: Holds Refutation
  - gem: Pounce
    supports: [Brutus' Brain, Elemental Focus, Rapid Attacks III, Minion Splash II, Heightened Accuracy II]
  - gem: Despair
    supports: [Magnified Area II, Ritualistic Curse, Rapid Casting II, Prolonged Duration II]
    note: Socketed in Blasphemy
  - gem: Blasphemy
    supports: []
    note: Holds Despair
  - gem: Oil Grenade
    supports: [Multishot II, Short Fuse II, Magnified Area II, Nova Projectiles I, Encroaching Ground]
  - gem: Flash Grenade
    supports: [Brutality III, Fire Penetration II, Fire Attunement, Long Fuse I, Lightning Exposure]
  - gem: Contagion
    supports: [Efficiency II, Runic Extraction, Magnified Area II, Prolonged Duration II]
    note: Socketed in Cast on Elemental Ailment
  - gem: Cast on Elemental Ailment
    supports: []
    note: Holds Contagion
  - gem: Explosive Grenade
    supports: [Poison I, Deliberation, Pin I, Rapid Attacks I, Multishot I]
  - gem: Cluster Grenade
    supports: [Fire Penetration II, Short Fuse II, Swift Affliction I, Slow Potency]
  - gem: Artillery Ballista
    supports: [Magnified Area I]
  - gem: Virtuous Barrier
    supports: []
  - gem: Incendiary Shot
    supports: []
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
levelingSource:
  title: "Flameblast Oil Grenade Gemling Build Guide"
  url: https://maxroll.gg/poe2/build-guides/flameblast-oil-grenade-gemling-build-guide
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
  amulet:
    base: Gold Amulet
    implicits: [20% increased Rarity of Items found]
    mods: [+50 to Spirit, 36% increased Rarity of Items found, +4 to Level of all Spell Skills, +5% to Quality of all Skills, "30% increased Global Armour, Evasion and Energy Shield"]
    ladder:
      - name: Rare Amulet
        pct: 89
      - name: Defiance of Destiny
        pct: 6
      - name: Surefooted Sigil
        pct: 2
      - name: Fireflower
        pct: 2
  helmet:
    unique: Decree of Acuity
    runes: ["2× Perfect Storm Rune: +44% to Lightning Resistance"]
    ladder:
      - name: Rare Helmet
        pct: 91
      - name: Decree of Acuity
        pct: 4
      - name: Alpha's Howl
        pct: 4
      - name: Constricting Command
        pct: 0
  weapon2:
    base: Siege Crossbow
    implicits: [Grenade Skills Fire an additional Projectile]
    mods: [+4 to Level of all Projectile Skills, Gain 22 Mana per enemy killed, Grenade Skills have +1 Cooldown Use, 16% increased Attack Speed]
    runes: ["2× Soul Core of Azcapa: +30 to Spirit", "Perfect Rebirth Rune: Gain 45 Life per enemy killed"]
    ladder:
      - name: Rare Staff
        pct: 91
      - name: Rare Crossbow
        pct: 80
      - name: Runeseeker's Call
        pct: 5
      - name: Rare Spear
        pct: 4
  gloves:
    base: Massive Mitts
    mods: [+45% to Fire Resistance, +190 to Armour, 100% increased Armour, +45% to Cold Resistance, +25% to Chaos Resistance, 39% increased Armour, +46 to maximum Life]
    runes: ["2× Perfect Iron Rune: 40% increased Armour, Evasion and Energy Shield"]
    ladder:
      - name: Rare Gloves
        pct: 97
      - name: Doedre's Tenure
        pct: 1
      - name: Maligaro's Virtuosity
        pct: 0
      - name: Aurseize
        pct: 0
  weapon:
    base: Chiming Staff
    mods: [236% increased Fire Damage, +7 to Level of all Fire Spell Skills, 40% increased Cast Speed, +32 to Intelligence, Gain 56% of Damage as Extra Fire Damage, 181% increased Spell Damage]
    runes: ["Forged by the Passion of Aldur", "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Jiquani's Soul Core of Rippling: +1 to Level of all Nova Skill Gems"]
    ladder:
      - name: Rare Staff
        pct: 91
      - name: Rare Crossbow
        pct: 80
      - name: Runeseeker's Call
        pct: 5
      - name: Rare Spear
        pct: 4
  boots:
    unique: Atziri's Step
    runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    ladder:
      - name: Rare Boots
        pct: 77
      - name: Decree of Flight
        pct: 15
      - name: Atziri's Step
        pct: 5
      - name: Ghostmarch
        pct: 3
  ring2:
    base: Gold Ring
    implicits: [15% increased Rarity of Items found]
    mods: [42% increased Fire Damage, +118 to maximum Life, 18% increased Rarity of Items found, +22% to all Elemental Resistances, +25% to Chaos Resistance, 19% increased Rarity of Items found]
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Kalandra's Touch
        pct: 26
      - name: Blackflame
        pct: 15
      - name: Ventor's Gamble
        pct: 4
  ring1:
    unique: Blackflame
    ladder:
      - name: Rare Ring
        pct: 97
      - name: Kalandra's Touch
        pct: 26
      - name: Blackflame
        pct: 15
      - name: Ventor's Gamble
        pct: 4
  belt:
    unique: Mageblood
    ladder:
      - name: Mageblood
        pct: 55
      - name: Rare Belt
        pct: 32
      - name: Darkness Enthroned
        pct: 5
      - name: Headhunter
        pct: 3
  body:
    unique: Morior Invictus
    runes: ["Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Soul Core of Jiquani: 5% increased maximum Life", "+50% of Armour also applies to Elemental Damage", "Warding Rune of Heart: Gain 5% of maximum Life as Extra maximum Runic Ward"]
    ladder:
      - name: Rare Body Armour
        pct: 48
      - name: Morior Invictus
        pct: 31
      - name: Forgotten Warden
        pct: 7
      - name: The Brass Dome
        pct: 3
passives:
  attribute: int
  path:
    - "Battle-hardened"
    - "Strong Chin"
    - "Gem Enthusiast"
    - "Leather Bound Gauntlets"
    - "Tolerant Equipment"
    - "Engineered Blaze"
    - "General's Bindings"
    - "Tempered Defences"
    - "Fulmination"
    - "Prism Guard"
    - "Cirel of Tarth's Light"
    - "Immolation"
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded, Implanted Gems]
  weaponSet1: [Arsonist, Flamekeeper, Searing Heat, Deterioration]
  weaponSet2: [Distracting Presence, Cluster Bombs, Utility Ordnance, Multitasking, Primal Growth, Swift Flight]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide: 9,458 Gemling Legionnaire characters use [[Flameblast]], and the reference character is level 100. You channel Flameblast to build up stages, then release it for a large fire explosion. Players link it with **Considered Casting (94%), Searing Flame II (91%) and Concentrated Area (90%)**, then Burgeon II (69%) and Controlled Destruction (67%). Our [Flameblast Oil Grenade Gemling](/builds/flameblast-oil-grenade-gemling) guide, from Maxroll, plays the same skill.

[[Oil Grenade]] (82%) soaks enemies in oil before you channel, [[Despair]] in [[Blasphemy]] curses them, and [[Sigil of Power]] boosts spell damage while you stand in it. [[Contagion]] in [[Cast on Elemental Ailment]] spreads to nearby enemies, and [[Refutation]] in [[Cast on Dodge]] blocks damage when you dodge roll. [[Arctic Armour]] and [[Wind Dancer]] add defence while you stand still.

The Gemling Legionnaire ascendancy is about gems:
- **Essence of Virtue (100%)** grants [[Virtuous Barrier]].
- **Advanced Thaumaturgy (100%)** gives socketed skills an additional effect from gem quality: quality your main gems.
- **Implanted Gems (96%)** and **Gem Studded (91%)**: Gem Studded rewards the most common support colour, for example 30% less skill cost with mostly blue supports.
- Neurological Implants (90%) is also taken by almost everyone.

## Leveling

No ladder character shows a campaign, so the leveling steps on this page come from Maxroll's Flameblast Oil Grenade Gemling guide, the same skill on the same ascendancy. The tree and ascendancy above are endgame choices: follow that guide's tree during the campaign.

Take Essence of Virtue and Advanced Thaumaturgy first, then Implanted Gems and Gem Studded. Put your first Gemcutter's Prisms into Flameblast to benefit from Advanced Thaumaturgy.

## Playstyle

**Mapping.** Throw Oil Grenade into the pack, channel Flameblast for a few stages and release. Concentrated Area keeps the blast tight, so aim at the centre of the pack.

**Bossing.** Place Sigil of Power, curse with Despair, throw Oil Grenade, then channel Flameblast to full stages. Dodge roll out of big attacks: Cast on Dodge triggers Refutation and you can channel again right after.

## Endgame Progression

**First maps.**
- A staff with + to fire spell levels and cast speed carries the damage. The reference character also keeps a Siege Crossbow on weapon set 2 for the grenades.
- Capped resistances, life and armour or evasion gear: you stand still while channelling.
- Lavianga's Spirits (58%) is the common flask, and cheap.

**Endgame.**
- Rite of Passage (59%), Nascent Hope (53%) and The Fall of the Axe (24%) are the common charms, Heart of the Well (28%) the common jewel.
- [[Morior Invictus]] (31%) as the body armour, and [[Kalandra's Touch]] (26%) on a ring.
- The reference character adds [[Decree of Acuity]], [[Atziri's Step]] for deflection and [[Blackflame]], whose chaos ignites stack with Flameblast.
- Blackflame Covenant (22%) is a common keystone.
- [[Mageblood]] (55%) is a luxury, worn by the reference character but not required.

## Gear Priorities

+ to fire spell levels and cast speed on the staff and amulet, then life, capped resistances and armour or evasion. Gem quality on your main skills for Advanced Thaumaturgy, and movement speed on boots.

## FAQ

**Why am I dying while channelling?** You stand still while building stages. Release earlier, dodge roll (Refutation triggers) and keep Arctic Armour and Wind Dancer up.

**What is Gem Studded?** It rewards the colour your supports have most of. Count your support colours and pick the bonus you want.

**What is the difference with the Maxroll Flameblast guide?** That guide is written and includes gear stages; this page shows what ladder players use at level 100.
