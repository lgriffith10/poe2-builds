---
title: Despair Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-18
patch: 0.5.5
source:
  title: Despair Gemling Makes Mapping Feel Effortless | PoE2 0.5.5
  author: ExFluent (YouTube)
  url: https://www.youtube.com/watch?v=WObXuphAIpo
  updated: 2026-09-21
origin: creator
summary: "Gemling Legionnaire that spreads Despair curses with Impending Doom: every curse ends in a chaos Doom Blast, with almost no buttons to press."
tags: [curse, spell, chaos, mana]
damage: Chaos
playstyle: Curse caster
difficulty: medium
budget: high
pros:
  - "Very simple to play: curses and Doom Blasts do the work"
  - Huge gem levels on Despair make every Doom Blast large
  - Marks, Temporal Chains and Arctic Armour add utility and safety
cons:
  - The tree needs a Split Personality jewel (Sorceress's starting point) to be reached as shown
  - "The creator's gear is luxury: Headhunter belt, Morior Invictus, corrupted gems and jewels"
  - Runs on low life with life reserved by Archmage, which takes practice
  - "No written guide at the source: the campaign comes from a Maxroll Gemling leveling guide for another skill"
skills:
  - gem: Despair
    supports: [Cursed Ground, Spell Cascade, Impending Doom, Zenith II, Execute III]
    note: Main skill. Impending Doom triggers Doom Blast when the curse expires; Cursed Ground leaves curse zones
  - gem: Virtuous Barrier
    supports: [Armour Demolisher I]
    note: Gemling skill from Essence of Virtue
  - gem: Spellslinger
    supports: []
    note: Granted by the wand
  - gem: Mana Remnants
    supports: [Harmonic Remnants II, Khatal's Rejuvenation, Remnant Potency III]
  - gem: Archmage
    supports: [Lightning Mastery, Atziri's Communion, Clarity II]
    note: Adds lightning damage to spells based on maximum mana; Atziri's Communion makes it reserve life instead of Spirit
  - gem: Voltaic Mark
    supports: [Cooldown Recovery I, Efficiency I, Armour Demolisher I, Prolonged Duration I]
    note: The marks and their supports keep power and frenzy charges coming
  - gem: Sniper's Mark
    supports: [Charge Profusion I, Charged Mark, Second Wind I, Mobility]
  - gem: Bloodhound's Mark
    supports: [Slow Potency, Overabundance II, Pin I, Brutality I, Mark for Death]
  - gem: Detonate Dead
    supports: [Corrosion, Armour Demolisher I, Searing Flame II, Brutality I]
    note: Explodes corpses for extra area damage
  - gem: Temporal Chains
    supports: [Magnified Area II, Slow Potency, Ritualistic Curse, Armour Demolisher II]
    note: Slows enemies around you, through Blasphemy
  - gem: Blasphemy
    supports: []
    note: Holds Temporal Chains
  - gem: Charge Regulation
    supports: []
  - gem: Arctic Armour
    supports: [Cold Mastery, Cooldown Recovery I, Blindside]
    note: Defensive buff
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
  supports: [{label: "Act I", gems: [Multishot I, Magnified Area I, Execute I]}, {label: "Act Ii-Iii", gems: [Multishot II, Short Fuse I, Persistent Ground I, Elemental Armament II, Magnified Area II]}]
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
  weapon:
    base: Dueling Wand
    implicits: ["Grants Skill: Level 18 Spellslinger"]
    mods: [Gain 22% of Damage as Extra Lightning Damage, +5 to Level of all Chaos Spell Skills, 59% increased Critical Hit Chance for Spells, +179 to maximum Mana, +1 to Level of all Spell Skills, 31% increased Cast Speed, Gain 9% of Elemental Damage as Extra Cold Damage, 104% increased Chaos Damage]
    runes:
      - "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"
  offhand:
    base: Tasalian Focus
    mods: [+161 to maximum Mana, 36% increased Energy Shield, +31 to maximum Mana, +2 to Level of all Spell Skills, 50% increased Critical Hit Chance for Spells, 31% increased Cast Speed, Gain 7% of Elemental Damage as Extra Cold Damage, 98% increased Energy Shield]
    runes:
      - +100 to maximum Mana
  helmet:
    base: Kamasan Tiara
    implicits: [Allocates Thaumaturgic Generator]
    mods: [+34% to Lightning Resistance, 83% increased Energy Shield, +48 to maximum Life, +163 to maximum Mana, 34% increased Critical Hit Chance, +36% to Cold Resistance]
    runes:
      - 3% increased maximum Mana
      - "Raven-Touched Shard: Raven-Touched"
  body:
    unique: Morior Invictus
    runes:
      - "3× Perfect Mind Rune: +150 to maximum Mana"
      - "Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers"
  gloves:
    base: Grim Gloves
    mods: [+60 to maximum Energy Shield, 39% increased Energy Shield, +47 to maximum Life, +114 to maximum Mana, +25% to Fire Resistance, +35% to Cold Resistance, +17% to Lightning and Chaos Resistances]
    runes:
      - "Greater Mind Rune: +40 to maximum Mana"
  boots:
    base: Sandsworn Sandals
    mods: [29% increased Energy Shield, +108 to maximum Mana, +42% to Fire Resistance, +43% to Cold Resistance, +18% to Chaos Resistance, +46 to Stun Threshold, 30% increased Movement Speed]
    runes:
      - "Farrul's Rune of the Chase: 5% increased Movement Speed"
  amulet:
    base: Jade Amulet
    implicits: [Allocates Paragon, +14 to Dexterity]
    mods: [44% increased Armour, +46 to maximum Energy Shield, +86 to maximum Mana, +4 to Level of all Spell Skills, 30% increased Cast Speed, +4% to Quality of all Skills]
  ring1:
    base: Mnemonic Ring
    implicits: [7% increased maximum Mana]
    mods: [+170 to maximum Mana, 18% increased Critical Hit Chance for Spells, 21% increased Critical Spell Damage Bonus, 16% increased Cast Speed, 7% increased maximum Mana, 29% increased Chaos Damage]
  ring2:
    base: Prismatic Ring
    implicits: [+10% to all Elemental Resistances]
    mods: [+177 to Evasion Rating, +201 to maximum Mana, 23% increased Cast Speed, +15% to all Elemental Resistances, 7% increased maximum Mana, +40% to Lightning Resistance]
  belt:
    unique: Headhunter
passives:
  attribute: int
  startFrom: Sorceress
  path:
    - Critical Overload
    - Sudden Escalation
    - Critical Exploit
    - Void
    - Dynamism
    - Eldritch Battery
    - Mind Over Matter
    - Raw Mana
    - Arcane Intensity
    - For the Jugular
    - Impending Doom
    - True Strike
    - Careful Assassin
    - Deadly Force
    - Whispers of Doom
    - Pain Attunement
    - Evocational Practitioner
    - Throatseeker
    - Dark Entries
    - Heartbreaking
    - Stupefy
    - Heartstopping
    - Dizzying Hits
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded, Implanted Gems]
farming:
  clear: 3
  single: 2
  tank: 2
  speed: 2
  style: ranged
  traits: []
---

## How It Works

This page comes from the Path of Building that ExFluent published with the video: skills, gear and tree are those of the creator's level 96 character. The write-up is ours, based on that build and on what the video describes.

[[Despair]] is a chaos curse. Its supports turn it into the damage skill:
- [[Impending Doom]] triggers **Doom Blast** on cursed enemies when the curse expires. That explosion is what kills.
- [[Cursed Ground]] leaves areas that curse every enemy standing in them, so packs get cursed, and blown up, without aiming.
- Spell Cascade, Zenith II and Execute III add area and damage.

Doom Blast grows with Despair's level, so the build stacks gem levels: + chaos spell levels on the wand, + spell levels on the focus and amulet, a corrupted Prism of Belief with +2 to Despair, and **Implanted Gems** (the creator picks +2 to Level of all Skills with an Intelligence requirement; that choice is not in our tree data). The video shows Despair around level 39 and also stacks its quality, which **Advanced Thaumaturgy** turns into an extra effect.

The tree follows the curse: **Whispers of Doom** allows an extra curse, **Impending Doom** (the notable) activates curses faster and makes them stronger once half their duration has passed, **Void** and **Dark Entries** add chaos damage and chaos skill levels.

**Mana and low life.** [[Archmage]] adds lightning damage based on maximum mana. With Atziri's Communion it reserves life instead of Spirit, so you play on low life, and **Pain Attunement** gives 30% more critical damage bonus on low life. **Eldritch Battery** and **Mind Over Matter** turn energy shield into mana and take hits from mana first.

**Split Personality.** The tree also grows from the Sorceress's starting point thanks to a Split Personality jewel. Without that jewel, those passives cannot be reached, so treat this tree as an endgame goal.

## Leveling

The creator only shows the finished character, so the campaign on this page comes from Maxroll's Flameblast Oil Grenade Gemling guide, another Gemling Legionnaire route. Switch to Despair with Impending Doom once you have both gems and a few + chaos spell levels: Doom Blast is weak at low gem levels.

Wait for enough life and mana before you add Atziri's Communion to Archmage: reserving life is only safe with Mind Over Matter and a large mana pool.

## Playstyle

**Mapping.** Cast Despair ahead of you and keep moving. Cursed Ground and Spell Cascade spread the curse, and the Doom Blasts go off behind you. Detonate Dead uses the corpses for more area damage.

**Bossing.** Keep Despair on the boss and stay at range: each time the curse expires, Doom Blast hits. Temporal Chains through [[Blasphemy]] slows what gets close, and [[Arctic Armour]] helps against hits.

**Charges.** The three marks (Voltaic, Sniper's and Bloodhound's Mark) with their supports keep power and frenzy charges coming without extra buttons.

## Endgame Progression

**Damage.** Gem levels first: a wand with + chaos spell levels, a focus and an amulet with + spell levels, then a Prism of Belief with + Despair levels. Despair quality comes next.

**Jewels.** Sapphires with critical chance, curse area and faster curse activation, and a Time-Lost Sapphire next to the critical notables.

**Luxury.** Headhunter (belt) and Morior Invictus (body armour) are the creator's endgame pieces. The build plays without them: a rare belt with life and resistances and an energy shield body armour with Spirit work.

## Gear Priorities

1. + levels to chaos spells and all spells (wand, focus, amulet).
2. Maximum mana and increased maximum mana on rings, helmet, gloves and boots.
3. Critical hit chance for spells and cast speed.
4. Capped resistances, energy shield and movement speed on boots.

## FAQ

**Why does my life sit low?** Archmage with Atziri's Communion reserves life. That is intended: Pain Attunement rewards low life, and Mind Over Matter takes hits from mana first.

**Why is Doom Blast weak?** It scales with Despair's level. Check the gem levels on the wand, focus and amulet before anything else.

**Why can't I reach part of the tree?** That part starts from the Sorceress's starting point and needs a Split Personality jewel. Until you have one, path from the Mercenary start instead.
