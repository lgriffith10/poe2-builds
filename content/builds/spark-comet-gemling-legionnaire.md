---
title: Spark Comet Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Spark Comet Gemling Legionnaire Build Guide"
  author: "legi (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/spark-comet-gemling-legionnaire-build-guide
  updated: 2026-09-04
summary: "Gemling Mercenary who fills the screen with Spark, triggers Comets and Arcs through Cast on Elemental Ailment and Cast on Critical, and stacks Power Charges for Adonia's Ego."
tags: [caster, lightning, cold, crit, energy shield, chaos inoculation]
damage: Elemental
playstyle: Caster
difficulty: medium
budget: low
pros:
  - "Simple playstyle that maps and bosses well"
  - "7+ metre Blink and very good mobility"
  - "Very high effective health"
cons:
  - "Damage relies on keeping a buff up"
  - "Bad visual clarity and low avoidance"
skills:
  - gem: "Cast on Elemental Ailment"
    supports: [Living Bomb, Pinpoint Critical, Comet, Efficiency II, Vorana's Siege]
  - gem: "Cast on Critical"
    supports: [Arc, Pinpoint Critical, Dominus' Grasp, Sione's Temper, Efficiency II]
  - gem: "Spark"
    supports: [Pinpoint Critical, Vilenta's Propulsion, Arbiter's Ignition, Zenith II, Pierce III]
    weaponSet: 1
  - gem: "Orb of Storms"
    supports: [Pinpoint Critical, Innervate, Ice Bite II, Prolonged Duration II, Zenith II]
    weaponSet: 1
  - gem: "Frost Bomb"
    supports: [Short Fuse II, Cooldown Recovery II, Spell Cascade, Harmonic Remnants II]
    weaponSet: 1
  - gem: "Firestorm"
    supports: [Spell Cascade, Rapid Casting II, Mobility, Overabundance II]
    weaponSet: 2
  - gem: "Powered by Verisium"
    supports: [Uhtred's Constellation, Efficiency II, Cooldown Recovery II]
    weaponSet: 1
  - gem: "Pinnacle of Power"
    supports: [Prolonged Duration II, Heightened Charges, Cooldown Recovery II]
    weaponSet: 1
  - gem: "Mana Tempest"
    supports: [Efficiency II, Mobility, Cooldown Recovery II, Uhtred's Rite]
    weaponSet: 1
  - gem: "Blink"
    supports: [Cooldown Recovery II, Uhtred's Omen]
  - gem: "Mana Remnants"
    supports: [Harmonic Remnants II, Remnant Potency I, Khatal's Rejuvenation]
  - gem: "Convalescence"
    supports: [Cooldown Recovery II, Prolonged Duration II, Second Wind II]
  - gem: "Siphon Elements"
    supports: [Harmonic Remnants II, Remnant Potency I]
  - gem: "Virtuous Barrier"
    supports: []
  - gem: "Purity of Fire"
    supports: [Clarity II, Mysticism II, Cool Headed, Warm Blooded]
    weaponSet: 1
  - gem: "Power Siphon"
    supports: [Blind II, Shock, Lightning Attunement, Charge Profusion I, Slow Potency]
    weaponSet: 1
rotations:
  - name: "Adonia's Buff"
    steps:
      - gem: "Frost Bomb"
        label: "Infusions Gen"
      - gem: "Powered by Verisium"
      - gem: "Firestorm"
        label: "Power Charges Gen"
      - gem: "Spark"
        label: "Weapon Set 1 Buff"
      - gem: "Pinnacle of Power"
  - name: "Main Rotation"
    steps:
      - gem: "Frost Bomb"
        label: "Missing Infusions"
      - gem: "Powered by Verisium"
      - gem: "Spark"
        count: 2
        label: "Spam"
      - gem: "Mana Tempest"
        label: "Damage Buffs"
      - gem: "Orb of Storms"
      - gem: "Comet"
        label: "Triggers"
      - gem: "Arc"
gear:
  weapon:
    unique: "Adonia's Ego"
    runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
  offhand:
    unique: "Sacred Flame"
    runes: ["Rabbit Idol: 15% increased Spirit"]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, Grants a Passive Skill, Mana Cost Efficiency, Elemental Resistances, Critical Hit Chance, +Intelligence]
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
  body:
    base: Vile Robe
    mods: [Energy Shield, Elemental Resistances]
    runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers"]
  gloves:
    unique: "Maligaro's Virtuosity"
    runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
  boots:
    base: Runeforged Sekhema Sandals
    mods: [Movement Speed, Energy Shield, Elemental Resistances]
    runes: ["Uhtred's Sidereus: Can roll Chronomancy modifiers", "Jiquani's Thesis: Increases and Reductions to Movement Speed also,  apply to Energy Shield Recharge Rate"]
  amulet:
    base: Absent Amulet
    mods: [+Spirit, +Level of all Spell Skills, Increased Cast Speed, Energy Shield, Quality of all Skill Gems]
  ring1:
    base: Breach Ring
    mods: [Mana Cost Efficiency, Increased Cast Speed, +Maximum Mana, Elemental Resistances, +Intelligence, +Dexterity]
  ring2:
    base: Unset Ring
    mods: [Mana Cost Efficiency, Increased Cast Speed, +Maximum Mana, Elemental Resistances, +Intelligence, +Dexterity]
  belt:
    unique: "Mageblood"
  weapon2:
    unique: Adonia's Ego
  offhand2:
    base: Shrine Sceptre
    mods: [Maximum Infusion Stacks, +Spirit]
gearStages:
  mapping:
    weapon:
      unique: "Adonia's Ego"
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      unique: "Sacred Flame"
      runes: ["Rabbit Idol: 15% increased Spirit"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Grants a Passive Skill, Elemental Resistances, Mana Cost Efficiency, Critical Hit Chance, +Intelligence]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
    body:
      base: Vile Robe
      mods: [Energy Shield, Elemental Resistances, +Intelligence]
      runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers"]
    gloves:
      unique: "Maligaro's Virtuosity"
      runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
    boots:
      base: Runeforged Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
      runes: ["Uhtred's Sidereus: Can roll Chronomancy modifiers", "Jiquani's Thesis: Increases and Reductions to Movement Speed also,  apply to Energy Shield Recharge Rate"]
    amulet:
      base: Absent Amulet
      mods: [+Spirit, +Level of all Spell Skills, Increased Cast Speed, Energy Shield, Quality of all Skill Gems]
    ring1:
      unique: "Kalandra's Touch"
    ring2:
      base: Unset Ring
      mods: [Mana Cost Efficiency, Increased Cast Speed, +Maximum Mana, Elemental Resistances, +Dexterity, +Intelligence]
    belt:
      base: Heavy Belt
      mods: [Elemental Resistances, +Maximum Mana, Spell Cooldown Recovery, Energy Shield, +Strength, +Dexterity and Intelligence]
    weapon2:
      unique: "Adonia's Ego"
      runes: ["Xopec's Soul Core of Power: 50% chance when you gain a Power Charge to gain an additional Power Charge", "Legacy of Adonia's Ego"]
    offhand2:
      base: Shrine Sceptre
      mods: [Maximum Infusion Stacks, +Spirit]
  endgame:
    weapon:
      unique: "Adonia's Ego"
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      unique: "Sacred Flame"
      runes: ["Rabbit Idol: 15% increased Spirit"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Grants a Passive Skill, Mana Cost Efficiency, Elemental Resistances, Critical Hit Chance, +Intelligence]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
    body:
      base: Vile Robe
      mods: [Energy Shield, Elemental Resistances]
      runes: ["2× Perfect Iron Rune: 20% increased Armour, Evasion and Energy Shield", "Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers"]
    gloves:
      unique: "Maligaro's Virtuosity"
      runes: ["Thane Grannell's Rune of Mastery: 30% increased Magnitude of Non-Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
    boots:
      base: Runeforged Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
      runes: ["Uhtred's Sidereus: Can roll Chronomancy modifiers", "Jiquani's Thesis: Increases and Reductions to Movement Speed also,  apply to Energy Shield Recharge Rate"]
    amulet:
      base: Absent Amulet
      mods: [+Spirit, +Level of all Spell Skills, Increased Cast Speed, Energy Shield, Quality of all Skill Gems]
    ring1:
      base: Breach Ring
      mods: [Mana Cost Efficiency, Increased Cast Speed, +Maximum Mana, Elemental Resistances, +Intelligence, +Dexterity]
    ring2:
      base: Unset Ring
      mods: [Mana Cost Efficiency, Increased Cast Speed, +Maximum Mana, Elemental Resistances, +Intelligence, +Dexterity]
    belt:
      unique: "Mageblood"
    weapon2:
      unique: "Adonia's Ego"
      runes: ["Xopec's Soul Core of Power: 50% chance when you gain a Power Charge to gain an additional Power Charge", "Legacy of Adonia's Ego"]
    offhand2:
      base: Shrine Sceptre
      mods: [Maximum Infusion Stacks, +Spirit]
passives:
  attribute: int
  path:
    - "Dampening Shield"
    - "Pure Energy"
    - "Climate Change"
    - "Insightfulness"
    - "Melding"
    - "Efficient Casting"
    - "Chaos Inoculation"
    - "Frozen Limit"
    - "Enhanced Barrier"
    - "Patient Barrier"
    - "Preservation"
    - "Evocational Practitioner"
    - "Archon of the Storm"
    - "Embodiment of Lightning"
    - "Controlling Magic"
    - "Invigorating Archon"
    - "Practiced Signs"
    - "Raw Power"
    - "Elemental Force"
    - "Principal Infusion"
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Implanted Gems, Gem Studded]
  weaponSet1: [Careful Assassin, Critical Exploit, Blessing of the Moon]
  weaponSet2: [Lust for Power]
---
## How It Works

[[Spark]] fills the screen with piercing lightning projectiles that crit and apply every elemental ailment, building energy for [[Cast on Elemental Ailment]] (linked to [[Comet]], your main single-target trigger) and [[Cast on Critical]] (linked to [[Arc]] for clear, only when an Absent Amulet grants it for free). Living Bomb only provides the fire infusion that empowers Comet, so keep it at level 1. Arbiter's Ignition on Spark keeps Elemental Archon up, which matters a lot given the investment in it.

The build centres on Adonia's Ego: its Pinnacle of Power consumes Power Charges for up to 324% more elemental damage. You use two copies: the off-hand one only for its Legacy and a Xopec's Soul Core of Power, so stack up to 9 Power Charges on the off-hand set and use Pinnacle of Power from weapon set 1, which also avoids the wand's negative resistance downside. [[Firestorm]] consumes infusions to generate those charges, [[Frost Bomb]] and [[Powered by Verisium]] generate infusions on demand, and [[Siphon Elements]] generates them automatically.

The Gemling's Advanced Thaumaturgy gives every gem a second quality bonus: most notably a 7+ metre [[Blink]] and extra Spark projectiles. Essence of Virtue's Virtuous Barrier creates gem motes for mana regeneration, Neurological Implants adds gem levels (all your gems are Intelligence), and Gem Studded lowers spell costs; balancing Dexterity and Intelligence supports also gives less movement penalty while casting. Defence is a large energy shield pool, chill and freeze from cold-infused Spark, and [[Convalescence]] instead of avoidance.

Mandatory uniques: Adonia's Ego, Maligaro's Virtuosity and Split Personality.

## Leveling

Generic Spark leveling is fine. Sands of Silk is excellent once you have Advanced Thaumaturgy.

## Playstyle

**Adonia's Ego buff.** Cast Frost Bomb and Powered by Verisium for infusions, Firestorm for Power Charges (one cast fills them with enough infusions), then Spark or another weapon set 1 skill so you wield the right wand, then Pinnacle of Power. Heightened Charges gives a 20% chance to double the buff's effect and duration, which usually lasts a whole map or boss; you can keep fishing for it.

**General rotation.** Keep the buff up, cast Spark (it triggers Comet and Arc), use [[Orb of Storms]] while clearing for Ice Bite II and Innervate, Mana Tempest for a damage boost (it drains mana fast), infusion generators when needed, and Blink to move.

## Endgame Progression

**Uniques.**
- Adonia's Ego with +1 maximum Power Charge on both sets; its quality affects Pinnacle of Power (Vaal Arcanist's Infuser can reach another damage-per-charge breakpoint). A Xopec's Soul Core of Power in the weapon set 2 wand.
- The Sacred Flame is by far the best damage off-hand; Guiding Palm of the Mind or of the Eye are starter alternatives. Even with Rakiata's Flow on Spark, ignoring resistances still helps Comet.
- Maligaro's Virtuosity lets you skip critical damage bonus everywhere else. Split Personality saves about 15 passive points.
- Rite of Passage with Spirit of the Cat is best in slot (Owl or Ox to start). Kalandra's Touch works if you balance resistances and attributes, but needs an Unset Ring.

**Rare items.**
- Increased Mana Cost Efficiency is the most important affix, to keep triggering Comets. Cast speed works well with Vilenta's Propulsion.
- At least one Unset Ring to fit all the skills (otherwise drop Orb of Storms or Mana Tempest). Mana on rings, since armour prefixes go to energy shield.
- Powered by Verisium needs about 250 Ward: Runeforge gloves and boots; Runeforged Sekhema Sandals convert energy shield to Ward generously.
- Two attribute suffixes and four or five resistance suffixes across your gear; avoid Strength, which does not help Gem Studded.
- A Cast on Critical Absent Amulet is by far the best amulet. A Raven-Touched Shard helmet instilled with Embodiment of Frost or Dominion/Paragon is high priority.
- Before Mageblood or Headhunter, a Breach-tree belt with spell cooldown recovery shortens Blink. Energy shield recharge rate is a premium suffix with Convalescence; Jiquani's Thesis in the boots is a luxury.
- Mageblood with double Bismuth, Silver or Quicksilver is ideal; Jade (about 30% evasion) or Sapphire/Topaz/Ruby are cheaper options. Headhunter is good but makes resistance capping very hard.

**Jewels.** From Nothing with the Sceptre (or Focus) Time-Lost variant, or the Eldritch Battery variant. Voices and a Megalomaniac (Embodiment of Frost, Embodiment of Lightning) save many points. Uhtred's Sidereus boots give skill effect duration efficiently.

**Focus variant.** A Tasalian Focus with high energy shield and +2 to Spell Skills, and Transcendent Alloy's cast speed suffix. It needs tier 1 Spirit on the body armour or amulet and a 23% quality Cast on Elemental Ailment (Dialla's Desire gives some leeway).

## Gear Priorities

Mana cost efficiency, cast speed and Spirit, Adonia's Ego and The Sacred Flame, then energy shield and energy shield recharge, with enough attributes and resistances for Gem Studded.

## FAQ

**How do I fix mana?** As much Mana Cost Efficiency as possible everywhere, especially with Comet above level 30. Move a little while casting to pick up Mana Remnants, and use your mana flask.

**Why does Pinnacle of Power not work?** It cannot be assigned to a weapon set. Cast a weapon set 1 spell such as Spark first so the game wields the right Adonia's Ego, then cast Pinnacle of Power.

**How do I survive?** More energy shield, use Convalescence, and gear carefully.
