---
title: Comet Infernalist
class: Witch
ascendancy: Infernalist
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Infernalist using Comet"
  author: Powershot_A (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/Ray007-1442/Powershot_A
  updated: 2026-11-08
origin: ladder
summary: "Witch whose Comets fall on their own: Cast on Elemental Ailment triggers them while Spark and Arc apply ailments, with Infernalist's fire ascendancy."
tags: [caster, fire, cold, trigger, chaos inoculation]
damage: Elemental
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Comet is triggered automatically, few buttons to press"
  - "Very popular: 5,167 ladder characters"
  - "Supports are consistent across players"
cons:
  - "The trigger setup takes some understanding"
  - "Chaos Inoculation (71%) needs a respec and energy shield"
  - "The reference gear includes Mageblood"
skills:
  - gem: Comet
    supports: &a1 [Spell Cascade, Execute III, Arbiter's Ignition]
    note: Socketed in Cast on Elemental Ailment
  - gem: Summon Infernal Hound
    supports: [Magnified Area II, Romira's Requital, Hulking Minions, Brutus' Brain, Ignite III]
  - gem: Living Bomb
    supports: *a1
    note: Socketed in Cast on Elemental Ailment
  - gem: Cast on Elemental Ailment
    supports: []
    note: Holds Comet, Living Bomb
  - gem: Spark
    supports: [Rakiata's Flow, Pierce III, Commiserate, Considered Casting, Execute III]
  - gem: Arc
    supports: [Sione's Temper, Pierce III, Projectile Acceleration III, Execute III, Considered Casting]
  - gem: Ice Nova
    supports: [Magnified Area II, Boundless Energy II, Execute III]
    note: Socketed in Cast on Block
  - gem: Cast on Block
    supports: []
    note: Holds Ice Nova
  - gem: Trinity
    supports: [Atziri's Communion, Cannibalism I, Fire Mastery, Dialla's Desire]
  - gem: Raise Shield
    supports: [Punch Through, Knockback, Retaliate II]
  - gem: Powered by Verisium
    supports: [Uhtred's Rite, Uhtred's Constellation, Prolonged Duration II]
  - gem: The Stars Answer
    supports: [Efficiency II, Prolonged Duration II]
  - gem: Remnants of Kalguur
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Elemental Conflux
    supports: [Cold Mastery, Uhtred's Omen]
  - gem: Siphon Elements
    supports: [Remnant Potency I, Harmonic Remnants II]
  - gem: Charge Regulation
    supports: [Armour Demolisher II]
levelingSource:
  title: "Essence Drain Lich Leveling Build Guide"
  url: https://maxroll.gg/poe2/build-guides/essence-drain-lich-leveling-build-guide
leveling:
  - name: "Campaign"
    steps:
      - name: "Level 2: Clearfell"
        skills:
          - gem: "Chaos Bolt"
          - gem: "Skeletal Sniper"
          - gem: "Flame Wall"
          - gem: "Unearth"
      - name: "Level 3: Defeat Devourer"
        skills:
          - gem: "Chaos Bolt"
          - gem: "Contagion"
          - gem: "Skeletal Sniper"
            supports: [Fire Attunement]
          - gem: "Flame Wall"
          - gem: "Unearth"
      - name: "Level 3 to 5"
        skills:
          - gem: "Chaos Bolt"
            supports: [Chain I]
          - gem: "Contagion"
            supports: [Zenith I]
          - gem: "Skeletal Sniper"
            supports: [Fire Attunement]
          - gem: "Flame Wall"
          - gem: "Unearth"
      - name: "Level 6 to 14"
        skills:
          - gem: "Chaos Bolt"
            supports: [Unleash]
          - gem: "Contagion"
            supports: [Rapid Casting I]
          - gem: "Essence Drain"
            supports: [Chain I, Zenith I]
          - gem: "Skeletal Sniper"
            supports: [Fire Attunement]
          - gem: "Flame Wall"
      - name: "Act 1"
        skills:
          - gem: "Chaos Bolt"
            supports: [Unleash]
          - gem: "Essence Drain"
            supports: [Chain I, Zenith I]
          - gem: "Contagion"
            supports: [Rapid Casting I, Magnified Area I]
          - gem: "Withering Presence"
            supports: [Prolonged Duration I]
      - name: "Act 2"
        skills:
          - gem: "Chaos Bolt"
            supports: [Considered Casting, Unleash]
          - gem: "Essence Drain"
            supports: [Chain II, Zenith I]
          - gem: "Contagion"
            supports: [Rapid Casting I, Magnified Area I]
          - gem: "Withering Presence"
            supports: [Prolonged Duration I]
          - gem: "Temporal Chains"
            supports: [Slow Potency]
          - gem: "Sigil of Power"
            supports: [Magnified Area I, Prolonged Duration I]
      - name: "Act 3"
        skills:
          - gem: "Chaos Bolt"
            supports: [Considered Casting, Unleash]
          - gem: "Essence Drain"
            supports: [Chain II, Zenith II, Swift Affliction II]
          - gem: "Contagion"
            supports: [Rapid Casting I, Magnified Area I, Unleash]
          - gem: "Despair"
            supports: [Decaying Hex, Heightened Curse]
          - gem: "Dark Effigy"
            supports: [Withering Touch, Poison II]
          - gem: "Blasphemy"
            supports: [Temporal Chains, Slow Potency]
          - gem: "Sigil of Power"
            supports: [Magnified Area I, Prolonged Duration I]
      - name: "Act 4"
        skills:
          - gem: "Chaos Bolt"
            supports: [Considered Casting, Unleash]
          - gem: "Essence Drain"
            supports: [Chain II, Zenith II, Swift Affliction II]
          - gem: "Contagion"
            supports: [Rapid Casting I, Magnified Area I, Unleash]
          - gem: "Despair"
            supports: [Decaying Hex, Heightened Curse, Prolonged Duration II]
          - gem: "Dark Effigy"
            supports: [Withering Touch, Poison II, Urgent Totems II]
          - gem: "Blasphemy"
            supports: [Temporal Chains, Slow Potency, Magnified Area II]
          - gem: "Sigil of Power"
            supports: [Magnified Area I, Prolonged Duration I]
      - name: "Act 5 / End of Campaign"
        skills:
          - gem: "Chaos Bolt"
            supports: [Chaos Mastery, Unleash]
          - gem: "Essence Drain"
            supports: [Chain III, Zenith II, Swift Affliction II, Considered Casting]
          - gem: "Contagion"
            supports: [Rapid Casting III, Magnified Area II, Unleash]
          - gem: "Despair"
            supports: [Decaying Hex, Heightened Curse, Prolonged Duration II]
          - gem: "Dark Effigy"
            supports: [Withering Touch, Poison II, Urgent Totems III]
          - gem: "Blasphemy"
            supports: [Temporal Chains, Slow Potency, Magnified Area II]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II, Chaos Mastery]
          - gem: "Sigil of Power"
            supports: [Magnified Area II, Prolonged Duration II, Rapid Casting II]
      - name: "Optional Late Campaign"
        skills:
          - gem: "Chaos Bolt"
            supports: [Chaos Mastery, Unleash]
          - gem: "Essence Drain"
            supports: [Chain III, Zenith II, Swift Affliction II, Considered Casting]
          - gem: "Contagion"
            supports: [Rapid Casting III, Magnified Area II, Unleash]
          - gem: "Despair"
            supports: [Decaying Hex, Heightened Curse, Prolonged Duration II]
          - gem: "Dark Effigy"
            supports: [Withering Touch, Poison II, Urgent Totems III]
          - gem: "Blasphemy"
            supports: [Temporal Chains, Slow Potency, Magnified Area II]
          - gem: "Withering Presence"
            supports: [Prolonged Duration II, Chaos Mastery]
          - gem: "Sigil of Power"
            supports: [Magnified Area II, Prolonged Duration II, Rapid Casting II]
          - gem: "Convalescence"
            supports: [Cooldown Recovery II, Second Wind III, Rapid Casting III]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Contagion"
          - gem: "Essence Drain"
      - name: "Single Target"
        steps:
          - gem: "Sigil of Power"
            label: "Before the Boss Spawns"
          - gem: "Despair"
          - gem: "Dark Effigy"
          - gem: "Essence Drain"
            label: "Apply DoTs"
          - gem: "Contagion"
          - gem: "Chaos Bolt"
            label: "Max Wither"
gear:
  belt:
    unique: Mageblood
    ladder:
      - name: Mageblood
        pct: 49
      - name: Headhunter
        pct: 38
      - name: Rare Belt
        pct: 8
      - name: Coward's Legacy
        pct: 3
  offhand:
    unique: Svalinn
    runes: ["Ox Idol: 15% increased Block chance", "Warding Rune of Reinforcement: 20% increased Runic Ward"]
    ladder:
      - name: Svalinn
        pct: 54
      - name: Rare Focus
        pct: 12
      - name: Crest of Ardura
        pct: 3
      - name: Redblade Banner
        pct: 2
  helmet:
    unique: Alpha's Howl
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard: Raven-Touched"]
    ladder:
      - name: Alpha's Howl
        pct: 76
      - name: Rare Helmet
        pct: 22
      - name: Myris Uxor
        pct: 1
      - name: Vestige of Darkness
        pct: 0
  ring2:
    base: Gold Ring
    implicits: [14% increased Rarity of Items found]
    mods: [16% increased Rarity of Items found, 54% increased Spell Damage, 26% increased Cold Damage, +50% to Chaos Resistance, Gain 10% of Damage as Extra Fire Damage with Spells]
    ladder:
      - name: Rare Ring
        pct: 98
      - name: Kalandra's Touch
        pct: 63
      - name: Snakepit
        pct: 6
      - name: Andvarius
        pct: 1
  boots:
    base: Blacksteel Sabatons
    mods: [18% increased Rarity of Items found, 35% increased Movement Speed, +123 to maximum Mana, +45% to Lightning Resistance, 60% increased effect of Socketed Augment Items, 30% increased Runic Ward]
    runes: ["Perfect Ward Rune: +48 to maximum Runic Ward", "Warding Rune of Reinforcement: 32% increased Runic Ward", "Tecrod's Gaze: 16% increased Movement Speed when on Low Life"]
    ladder:
      - name: Rare Boots
        pct: 99
      - name: Shankgonne
        pct: 0
      - name: Trampletoe
        pct: 0
      - name: Decree of Flight
        pct: 0
  body:
    unique: The Brass Dome
    runes: ["4× Warding Rune of Reinforcement: 80% increased Runic Ward"]
    ladder:
      - name: The Brass Dome
        pct: 78
      - name: Sacrosanctum
        pct: 6
      - name: Rare Body Armour
        pct: 6
      - name: Temporalis
        pct: 5
  amulet:
    base: Absent Amulet
    implicits: [-1 Prefix Modifier allowed, -1 Suffix Modifier allowed]
    mods: [+50 to Spirit, +4 to Level of all Spell Skills, +5% to Quality of all Skills, 10% increased maximum Runic Ward]
    ladder:
      - name: Rare Amulet
        pct: 99
      - name: Choir of the Storm
        pct: 0
      - name: Yoke of Suffering
        pct: 0
      - name: Eventide Petals
        pct: 0
  ring1:
    base: Gold Ring
    implicits: [16% increased Rarity of Items found]
    mods: [54% increased Spell Damage, 41% increased Rarity of Items found, 22% increased Cast Speed, +50% to Fire Resistance, Gain 13% of Damage as Extra Lightning Damage with Spells]
    ladder:
      - name: Rare Ring
        pct: 98
      - name: Kalandra's Touch
        pct: 63
      - name: Snakepit
        pct: 6
      - name: Andvarius
        pct: 1
  gloves:
    base: Blacksteel Gauntlets
    mods: [+2 to Level of all Projectile Skills, 33% increased Projectile Speed, 34% increased Critical Damage Bonus, +36 to Dexterity, 40% increased Projectile Damage, 26% increased Runic Ward, Remnants can be collected from 44% further away]
    runes: ["Serle's Triumph: +1 Suffix Modifier allowed", "Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Kolr's Hunt: Can roll Marksman modifiers"]
    ladder:
      - name: Rare Gloves
        pct: 94
      - name: Maligaro's Virtuosity
        pct: 3
      - name: Aurseize
        pct: 1
      - name: Sine Aequo
        pct: 1
  weapon:
    unique: Runeseeker's Call
    runes: ["105% increased Spell Damage", "+9 to Level of all Spell Skills", "Gain 45% of maximum Life as Extra maximum Runic Ward", "45% less maximum Life", "Gain 15% of Damage as Extra Damage of all Elements", "150% increased Spell Damage while your Companion is in your Presence"]
    ladder:
      - name: Runeseeker's Call
        pct: 57
      - name: Rare Wand
        pct: 34
      - name: Sacred Flame
        pct: 21
      - name: Rare Staff
        pct: 19
passives:
  attribute: int
  path:
    - "Controlling Magic"
    - "Turn the Clock Forward"
    - "Bone Chains"
    - "Turn the Clock Back"
    - "Sanguine Tolerance"
    - "Rupturing Pins"
    - "Careful Assassin"
    - "Invocated Efficiency"
    - "Energise"
    - "Core of the Guardian"
    - "Evocational Practitioner"
    - "Wide Barrier"
    - "Heartbreaking"
    - "Heartstopping"
    - "Cooked"
  ascendancy: [Pyromantic Pact, Loyal Hellhound, Bringer of Flame, Grinning Immolation]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide: 5,167 Infernalist characters use [[Comet]], and the reference character is level 100. Comet and [[Living Bomb]] are socketed in [[Cast on Elemental Ailment]], so they fire on their own whenever you freeze, chill, shock or ignite something. Players link Comet with **Spell Cascade (91%)**, which drops extra impacts on either side of the target, and **Arbiter's Ignition (84%)**, which grants Elemental Archon when Comet ignites.

[[Spark]] (87%) is the ailment applier: Rakiata's Flow makes its hits treat enemy elemental resistances as inverted, and Considered Casting trades cast speed for damage. [[Arc]] (43%) with Sione's Temper is the second applier, and [[Frost Bomb]] (41%) is a common alternative. [[Ice Nova]] in [[Cast on Block]] adds free damage whenever [[Raise Shield]] or a passive block goes off.

The Infernalist ascendancy carries the build:
- **Pyromantic Pact (97%)** replaces mana with twice as much Infernal Flame: skills add flame instead of spending mana. At maximum you take your maximum life and energy shield as fire damage and lose all flame, so watch the gauge; it drains when you stop casting.
- **Grinning Immolation (95%)** gives 50% more critical damage bonus, but your critical hits ignite you for 15% of your life and energy shield per second.
- **Bringer of Flame (92%)** makes all your damage, and your allies', build Flammability and Ignite, which helps Cast on Elemental Ailment trigger.
- **Loyal Hellhound (51%)** grants [[Summon Infernal Hound]]. Here it is a defensive tool: Romira's Requital makes it take part of the hits you would take, and Brutus' Brain stops it from dealing or taking damage.

## Leveling

No ladder character shows a campaign, so the leveling steps on this page come from Maxroll's Essence Drain Lich leveling guide, a Witch route with Chaos Bolt, Skeletal Snipers and Essence Drain. The passive tree and ascendancy above are endgame choices: during the campaign follow the leveling guide's tree.

Move to Spark and Comet once you have Cast on Elemental Ailment and enough Spirit to keep it up. Take Pyromantic Pact first so mana stops being a problem, then Bringer of Flame. Leave Grinning Immolation until you have fire resistance and enough recovery for the self-ignite. Chaos Inoculation (71%) is a later respec, once your gear gives a large energy shield pool.

## Playstyle

**Mapping.** Cast Spark into packs; the ailments it applies trigger Comet and Living Bomb, and Spell Cascade spreads the impacts. Arc chains through what Spark misses.

**Bossing.** Keep Spark and Arc on the boss so Cast on Elemental Ailment keeps firing. Raise Shield into heavy hits to block and trigger Ice Nova. Use your cooldowns ([[Powered by Verisium]], [[The Stars Answer]]) when the boss is in place, and stop casting for a moment if Infernal Flame gets close to maximum.

## Endgame Progression

**First maps.**
- Cheap and common uniques: [[The Brass Dome]] (78%, large armour, no extra damage from critical hits, but lower maximum resistances) and Heart of the Well (78%).
- Rings with spell damage, cast speed and resistances, and an amulet with + to spell skill levels and Spirit.
- Cap resistances first: The Brass Dome lowers your maximum elemental resistances.

**Endgame.**
- [[Alpha's Howl]] (76%) for +100 Spirit and a doubled Presence radius, which pairs with Bringer of Flame.
- [[Svalinn]] (54%) makes block chance lucky, which keeps Cast on Block and Ice Nova busy.
- [[Kalandra's Touch]] (63%) copies your other ring. Rite of Passage (78%) and From Nothing (59%) are the common charm and jewel.
- [[Runeseeker's Call]] (58%) multiplies the effect of socketed runes, but very few are listed and it is expensive.
- [[Mageblood]] is a luxury, worn by the reference character but not required.

## Gear Priorities

Energy shield and capped resistances, then spell damage and cast speed on rings, + to spell skill levels on the amulet and weapon, and + to projectile skill levels on gloves for Spark and Arc. Spirit for Cast on Elemental Ailment, Trinity and the heralds.

## FAQ

**Why do I keep dying with full health?** Infernal Flame reached its maximum: Pyromantic Pact then deals your maximum life and energy shield as fire damage. Pause for a moment when the gauge is nearly full, and keep fire resistance capped for Grinning Immolation's self-ignite.

**Do I need Chaos Inoculation?** 71% of these players take it. It gives chaos immunity at the cost of your life, so only respec once energy shield carries your defences.

**Why does the hound not attack?** Brutus' Brain stops it from dealing damage: it is used to absorb hits with Romira's Requital. Drop Brutus' Brain if you would rather have it fight.
