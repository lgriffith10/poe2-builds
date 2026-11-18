---
title: Arc Totem Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-18
patch: 0.5.5
source:
  title: THIS ARC TOTEM BUILD IS BROKEN! | Gemling Legionnaire | PoE 2 0.5.5
  author: Barczi POE2 (YouTube)
  url: https://www.youtube.com/watch?v=GKyolCxY10Q
  updated: 2026-09-09
origin: creator
summary: "Mana-stacking Gemling Legionnaire whose Spell Totems cast Arc: the chains clear packs off-screen while the totems melt bosses."
tags: [totem, spell, lightning, mana]
damage: Lightning
playstyle: Spell totems
difficulty: medium
budget: high
pros:
  - Arc chains clear whole packs from off-screen
  - Totems keep casting while you reposition, which suits bosses
  - Mind Over Matter and a huge mana pool make it sturdier than it looks
cons:
  - The tree needs a Split Personality jewel (Warrior's starting point) to be reached as shown
  - "Mana is everything: damage, defence and costs all depend on it, so weak mana gear hurts twice"
  - "No written guide at the source: the campaign comes from a Maxroll Gemling leveling guide for another skill"
skills:
  - gem: Arc
    supports: [Deliberation, Urgent Totems III, Dominus' Grasp, Zenith II]
    note: Main skill, cast by Spell Totem. Dominus' Grasp adds chains, Urgent Totems III places totems faster
  - gem: Virtuous Barrier
    supports: []
    note: Gemling skill from Essence of Virtue
  - gem: Mana Drain
    supports: []
    note: Granted by the wand
  - gem: Purity of Fire
    supports: [Warm Blooded, Vitality II, Cool Headed, Clarity II]
    note: Granted by the Shrine Sceptre (off hand)
  - gem: Frost Bomb
    supports: [Potent Exposure, Short Fuse II, Efficiency II]
    note: Applies exposure so lightning hits harder
  - gem: Mana Remnants
    supports: [Remnant Potency III, Harmonic Remnants II]
  - gem: Archmage
    supports: [Lightning Mastery]
    note: Adds lightning damage to spells based on your maximum mana
  - gem: Spell Totem
    supports: []
    note: Holds Arc
  - gem: Elemental Weakness
    supports: [Heightened Curse, Cursed Ground, Efficiency I]
    note: Lowers enemy elemental resistances; Cursed Ground leaves curse zones
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
    base: Attuned Wand
    implicits: ["Grants Skill: Level 18 Mana Drain"]
    mods: [92% increased Lightning Damage, 25% reduced Attribute Requirements, +5 to Level of all Lightning Spell Skills, 40% increased Critical Hit Chance for Spells, +159 to maximum Mana, +1 to Level of all Spell Skills, Gain 25% of Damage as Extra Lightning Damage]
    runes:
      - "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"
  offhand:
    base: Shrine Sceptre
    implicits: ["Grants Skill: Level 14 Purity of Fire"]
    mods: [67% increased Spirit, +119 to maximum Mana, Allies in your Presence have 11% increased Attack Speed, 35% reduced Attribute Requirements, 33% increased Mana Regeneration Rate]
    runes:
      - "Rabbit Idol: 15% increased Spirit"
  helmet:
    base: Sorcerous Tiara
    mods: [+65 to maximum Energy Shield, 77% increased Energy Shield, +135 to maximum Mana, +26 to Intelligence, +22% to Lightning Resistance, +20% to Fire Resistance]
    runes:
      - 3% increased maximum Mana
  body:
    base: Vile Robe
    mods: [+91 to maximum Energy Shield, 106% increased Energy Shield, +54 to Spirit, +19 to Intelligence, +31% to Fire Resistance, +18% to Cold Resistance]
    runes:
      - "2× Greater Iron Rune: 36% increased Armour, Evasion and Energy Shield"
  gloves:
    base: Vaal Gloves
    mods: [+50 to maximum Energy Shield, +124 to maximum Mana, +2 to Level of all Projectile Skills, +26% to Cold Resistance, 25% increased Critical Damage Bonus, 24% increased Projectile Damage]
    runes:
      - "Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"
      - "Kolr's Hunt: Can roll Marksman modifiers"
  boots:
    base: Dunerunner Sandals
    mods: [35% increased Movement Speed, +97 to maximum Mana, +39% to Cold Resistance, 58% reduced Chill Duration on you, 60% increased effect of Socketed Augment Items, +45 to maximum Energy Shield]
    runes:
      - "2× Greater Mind Rune: +128 to maximum Mana"
  amulet:
    base: Bloodstone Amulet
    implicits: [Allocates Paragon, +40 to maximum Life]
    mods: [+83 to maximum Energy Shield, 8% increased maximum Mana, +4 to Level of all Spell Skills, +15 to all Attributes, 31.7 Life Regeneration per second, +41 to Spirit]
  ring1:
    base: Mnemonic Ring
    implicits: [7% increased maximum Mana]
    mods: [+74 to maximum Life, +194 to maximum Mana, +13% to all Elemental Resistances, +34% to Fire Resistance, 6% increased maximum Mana, +15 to Strength and Intelligence]
  ring2:
    base: Lazuli Ring
    implicits: [+32 to maximum Mana]
    mods: [+207 to Evasion Rating, +181 to maximum Mana, +27% to Cold Resistance, +38% to Lightning Resistance, 63% increased Mana Regeneration Rate, 7% increased maximum Mana]
  belt:
    base: Long Belt
    implicits: [18% increased Charm Effect Duration, Has 2 Charm Slots]
    mods: [+148 to maximum Life, +42% to Lightning Resistance, +22% to Chaos Resistance, 35% increased Flask Charges gained, 43 to 92 Physical Thorns damage, +112 to maximum Mana]
passives:
  attribute: int
  startFrom: Warrior
  path:
    - Barbaric Strength
    - Electrifying Nature
    - Bonded Precision
    - Desensitisation
    - Ancestral Bond
    - All Natural
    - Mind Over Matter
    - Ingenuity
    - Raw Mana
    - Controlling Magic
    - Turn the Clock Forward
    - Pure Power
    - Arcane Intensity
    - Eldritch Battery
    - Efficient Inscriptions
    - For the Jugular
    - True Strike
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded, Implanted Gems]
  weaponSet1:
    - Ancestral Reach
    - Sigil of Lightning
    - Supportive Ancestors
    - Ancestral Alacrity
    - Ancestral Conduits
  weaponSet2:
    - Lingering Whispers
    - Overexposure
    - Master of Hexes
farming:
  clear: 3
  single: 3
  tank: 2
  speed: 2
  style: totem
  traits: []
---

## How It Works

This page comes from the Path of Building that Barczi POE2 published with the video: skills, gear and tree are those of the creator's level 94 character. The write-up is ours, based on that build and on what the video describes.

[[Arc]] is socketed in [[Spell Totem]]: instead of casting Arc yourself, you place totems that cast it for you. Arc jumps from enemy to enemy, and [[Dominus' Grasp]] adds more chains, so one totem clears a whole pack. Urgent Totems III places the totems quickly, Deliberation and Zenith II add damage. Zenith II only works above 90% of maximum mana, which is why the build keeps so much mana.

Mana is the core of the build:
- [[Archmage]] adds lightning damage to spells based on maximum mana.
- **Eldritch Battery** turns all energy shield into mana, and **Mind Over Matter** takes damage from mana before life. Every point of mana is damage and defence at the same time.
- The wand grants [[Mana Drain]], and [[Mana Remnants]] (Remnant Potency III, Harmonic Remnants II) brings mana back as you fight.

The Gemling Legionnaire ascendancy works on gems:
- **Essence of Virtue** grants [[Virtuous Barrier]].
- **Advanced Thaumaturgy** gives an extra effect to quality on socketed skills.
- **Gem Studded** rewards the most common support gem colour: with mostly blue supports, skills cost 30% less.
- **Implanted Gems**: the creator picks the +2 to Level of all Skills with an Intelligence requirement option. That choice is not in our tree data, so the planner shows the node without its bonus.

**Split Personality.** The tree also grows from the Warrior's starting point thanks to a Split Personality jewel. Without that jewel, the passives on the Warrior side cannot be reached, so treat this tree as an endgame goal.

## Leveling

The creator only shows the finished character, so the campaign on this page comes from Maxroll's Flameblast Oil Grenade Gemling guide, another Gemling Legionnaire route. Level as that guide shows, then move to Arc and Spell Totem when you have the gems and a wand with + to lightning spell levels.

Take Essence of Virtue and Gem Studded early. Eldritch Battery and Mind Over Matter only pay off once you have a lot of mana and energy shield: pick them up when your gear supports it, not before.

## Playstyle

**Mapping.** Drop totems as you move forward: Arc chains reach enemies before you see them. Keep moving and let the totems clear the pack.

**Bossing.** Place your totems next to the boss, curse it with [[Elemental Weakness]] and throw [[Frost Bomb]] for exposure. Then stay mobile while the totems keep casting. Re-place them when the boss moves away.

**Mana.** Watch the mana bar rather than the life bar: Mind Over Matter takes hits from mana first, and Zenith II loses its bonus below 90% mana.

## Weapon Sets

The weapon-set points are split by role. Set 1 holds the totem notables (Ancestral Reach, Supportive Ancestors, Ancestral Alacrity, Ancestral Conduits) and Sigil of Lightning. Set 2 holds the curse and exposure notables (Lingering Whispers, Overexposure, Master of Hexes).

## Endgame Progression

**Damage.** The wand carries the build: + levels to lightning spells, + levels to all spells and extra lightning damage. Then add + spell levels on the amulet and runes.

**Video upgrades.** The video adds a Split Personality jewel, gloves with +2 to Level of all Projectile Skills and a corrupted Prism of Belief with +2 to Arc.

**Budget.** The creator also has a [budget version of the build](https://www.youtube.com/watch?v=8SVBEhUNtmc) with the same concept on cheaper gear.

## Gear Priorities

1. Wand: + levels to lightning spells and all spells, extra lightning damage, maximum mana.
2. Maximum mana and increased maximum mana on every slot that can roll it (rings, helmet, gloves, boots, belt).
3. Energy shield on armour pieces (Eldritch Battery turns it into mana) and capped resistances.
4. Spirit on the sceptre and body armour for Purity of Fire and the other buffs.

## FAQ

**Why do I take damage on mana?** Mind Over Matter takes all damage from mana before life. Keep mana high and recover it with Mana Drain and Mana Remnants.

**Why can't I reach part of the tree?** That part starts from the Warrior's starting point and needs a Split Personality jewel. Until you have one, path from the Mercenary start instead.

**Why do my skills cost so much mana?** Eldritch Battery doubles mana costs. Blue supports for Gem Studded and Mana Remnants offset it.
