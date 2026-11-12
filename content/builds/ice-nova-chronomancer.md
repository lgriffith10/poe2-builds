---
title: Ice Nova Chronomancer
class: Sorceress
ascendancy: Chronomancer
author: Exile Codex
updated: 2026-11-08
patch: 0.5.5
source:
  title: "Forbidden Rites ladder: Chronomancer using Ice Nova"
  author: Хинекоррочка (poe.ninja)
  url: https://poe.ninja/poe2/builds/forbiddenrites/character/Hinochka-7434/%D0%A5%D0%B8%D0%BD%D0%B5%D0%BA%D0%BE%D1%80%D1%80%D0%BE%D1%87%D0%BA%D0%B0
  updated: 2026-10-22
origin: ladder
summary: "Sorceress who casts Ice Nova around herself and replays it with the Chronomancer's time magic, backed by Comet, Frost Bomb and Frost Wall."
tags: [caster, cold, nova, critical]
damage: Cold
playstyle: Caster
difficulty: easy
budget: high
pros:
  - "Ice Nova does most of the damage"
  - "Magnified Area II is on almost every setup"
  - "Strong ascendancy synergy with Quicksand Hourglass and Phased Form"
cons:
  - "Ice Nova is cast around you, so you need to get close"
  - "Several support spells (Frost Bomb, Frost Wall, Comet) on bosses"
  - "The reference gear includes Mageblood"
skills:
  - gem: Ice Nova
    supports: [Ice Bite II, Pinpoint Critical, Magnified Area II, Runic Extraction, Cold Mastery]
  - gem: Time Snap
    supports: [Second Wind III, Cooldown Recovery II, Rapid Casting II, Efficiency II, Uhtred's Rite]
  - gem: Time Freeze
    supports: [Second Wind III, Prolonged Duration II, Magnified Area II, Rapid Casting II, Efficiency II]
  - gem: Elemental Weakness
    supports: [Heightened Curse, Focused Curse, Hayoxi's Fulmination, Magnified Area II, Efficiency II]
  - gem: Frost Wall
    supports: [Spell Cascade, Pinpoint Critical, Rising Tempest, Uhtred's Constellation, Vorana's Siege]
  - gem: Temporal Chains
    supports: &a1 [Ritualistic Curse, Magnified Area II, Slow Potency]
    note: Socketed in Blasphemy
  - gem: Enfeeble
    supports: *a1
    note: Socketed in Blasphemy
  - gem: Blasphemy
    supports: []
    note: Holds Temporal Chains, Enfeeble
  - gem: Refutation
    supports: [Prolonged Duration II, Cooldown Recovery II, Second Wind III, Rapid Casting II, Mobility]
  - gem: Frost Bomb
    supports: [Short Fuse II, Overabundance I, Spell Echo, Cooldown Recovery II, Efficiency II]
  - gem: Eye of Winter
    supports: [Mórrigan's Insight, Cold Mastery, Prolonged Duration II, Second Wind III, Efficiency II]
  - gem: Freezing Mark
    supports: [Charged Mark, Prolonged Duration II, Overcharge, Eternal Mark]
  - gem: Powered by Verisium
    supports: [Efficiency II, Cooldown Recovery II, Rapid Casting II, Second Wind III]
  - gem: Sigil of Power
    supports: [Prolonged Duration II, Magnified Area II, Rapid Casting II]
  - gem: Remnants of Kalguur
    supports: [Harmonic Remnants II, Remnant Potency III, Khatal's Rejuvenation]
  - gem: Chaos Bolt
    supports: [Excise, Rapid Casting III]
  - gem: Raise Shield
    supports: []
gear:
  ring1:
    unique: Doedre's Damning
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 18
      - name: Snakepit
        pct: 8
      - name: Ventor's Gamble
        pct: 1
  weapon2:
    base: Withered Wand
    mods: [+4 to Level of all Spell Skills, 31% increased Cast Speed, 52% increased Mana Regeneration Rate, +162 to maximum Mana, +1 to Level of all Spell Skills]
    runes: ["Warding Rune of Equinox: 40% less Mana Regeneration Rate, Mana Recovery from Regeneration is also applied to Runic Ward"]
    ladder:
      - name: Rare Staff
        pct: 84
      - name: Rare Wand
        pct: 14
      - name: Runeseeker's Call
        pct: 6
      - name: Sire of Shards
        pct: 6
  boots:
    base: Sekhema Sandals
    mods: [35% increased Movement Speed, +114 to maximum Mana, +21 to Intelligence, +44% to Fire Resistance, +42% to Lightning Resistance, +135 to maximum Life]
    runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    ladder:
      - name: Rare Boots
        pct: 99
      - name: Decree of Flight
        pct: 0
      - name: Windscream
        pct: 0
      - name: Wondertrap
        pct: 0
  ring2:
    base: Unset Ring
    implicits: [Grants 1 additional Skill Slot]
    mods: [+95 to maximum Life, +31 to Strength, +21 to Intelligence, +19% to all Elemental Resistances, Gain 13% of Damage as Extra Lightning Damage with Spells, +41 to maximum Runic Ward]
    ladder:
      - name: Rare Ring
        pct: 99
      - name: Kalandra's Touch
        pct: 18
      - name: Snakepit
        pct: 8
      - name: Ventor's Gamble
        pct: 1
  amulet:
    base: Lunar Amulet
    implicits: [+31 to maximum Energy Shield]
    mods: [+33 to Intelligence, +87 to maximum Energy Shield, 50% increased maximum Energy Shield, +3 to Level of all Spell Skills, +10% to all Elemental Resistances, 10% increased maximum Runic Ward]
    ladder:
      - name: Rare Amulet
        pct: 97
      - name: Choir of the Storm
        pct: 1
      - name: Eventide Petals
        pct: 1
      - name: Fixation of Yix
        pct: 0
  offhand2:
    unique: Arvil's Wheel
    runes: ["Perfect Inspiration Rune: 21% increased Mana Regeneration Rate"]
    ladder:
      - name: Rare Focus
        pct: 13
      - name: Svalinn
        pct: 1
      - name: Arvil's Wheel
        pct: 1
      - name: Rare Shield
        pct: 0
  gloves:
    unique: Maligaro's Virtuosity
    runes: ["Cadigan's Epiphany: Destroys all Augment Sockets on the item to create a Jewel Socket"]
    ladder:
      - name: Rare Gloves
        pct: 81
      - name: Maligaro's Virtuosity
        pct: 12
      - name: Nightscale
        pct: 4
      - name: Sine Aequo
        pct: 1
  body:
    base: Vile Robe
    mods: [+95 to maximum Energy Shield, +211 to maximum Life, +33% to Fire Resistance, +37% to Cold Resistance, +33% to Lightning Resistance, +52 to Spirit]
    runes: ["Craiceann's Rune of Warding: 50% reduced effect of Curses on you", "The Greatwolf's Rune of Willpower: 15% of Damage is taken from Mana before Life"]
    ladder:
      - name: Rare Body Armour
        pct: 90
      - name: Morior Invictus
        pct: 3
      - name: The Brass Dome
        pct: 2
      - name: Sacrosanctum
        pct: 1
  weapon:
    base: Chiming Staff
    mods: [Gain 58% of Damage as Extra Cold Damage, +7 to Level of all Cold Spell Skills, 85% increased Critical Hit Chance for Spells, Gain 16 Mana per enemy killed, Gain 55% of Damage as Extra Cold Damage, +150 to maximum Mana, +1 to Level of all Spell Skills]
    runes: ["Forged by the Breath of Aldur", "Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills"]
    ladder:
      - name: Rare Staff
        pct: 84
      - name: Rare Wand
        pct: 14
      - name: Runeseeker's Call
        pct: 6
      - name: Sire of Shards
        pct: 6
  belt:
    unique: Mageblood
    ladder:
      - name: Rare Belt
        pct: 37
      - name: Mageblood
        pct: 29
      - name: Headhunter
        pct: 26
      - name: Darkness Enthroned
        pct: 3
  helmet:
    base: Ancestral Tiara
    mods: [40% increased Energy Shield, +201 to maximum Life, +148 to maximum Mana, +33 to Intelligence, +37% to Cold Resistance, +20% to Chaos Resistance]
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency"]
    ladder:
      - name: Rare Helmet
        pct: 59
      - name: Alpha's Howl
        pct: 39
      - name: Myris Uxor
        pct: 1
      - name: Crown of the Victor
        pct: 0
passives:
  attribute: int
  path:
    - "Raw Power"
    - "Open Mind"
    - "Elemental Force"
    - "Arcane Remnants"
    - "Vigorous Remnants"
    - "Sudden Escalation"
    - "Efficient Casting"
    - "Roil"
    - "Frozen Limit"
    - "Echoing Frost"
    - "Ice Storm"
    - "Empowering Infusions"
    - "Whispers of Doom"
    - "Zone of Control"
    - "Echoing Thunder"
    - "Master of Hexes"
    - "Echoing Flames"
    - "Lightning Storm"
    - "Endless Blizzard"
    - "Glaciation"
    - "Ether Flow"
    - "Archon of the Storm"
    - "Heavy Frost"
    - "Thin Ice"
    - "Brain Freeze"
    - "Lucidity"
  ascendancy: [Unbound Encore, Quicksand Hourglass, Phased Form, Ultimate Command]
  weaponSet1: [Turn the Clock Forward, Controlling Magic, Careful Assassin, Climate Change, Stripped Defences, Overexposure, Stormbreaker]
  weaponSet2: [Harsh Winter, Preservation, Lingering Horror, Devoted Protector, Grounded in the Earth, Chronomancy]
---

## How It Works

This page is drawn from the poe.ninja ladder rather than a written guide. [[Ice Nova]] releases a ring of cold around you; **Magnified Area II (97%)** is on nearly every setup, with Cold Mastery (66%) and Runic Extraction (62%) the next most common links.

Most players add [[Comet]] (89%), [[Frost Bomb]] (87%) and [[Frost Wall]] (86%) for bosses, and [[Elemental Weakness]] (63%). This character also uses [[Time Snap]] and [[Time Freeze]] from the Chronomancer's toolkit.

## Ascendancy and Key Passives

Quicksand Hourglass (95%), Phased Form (93%), Now and Again (88%) and Apex of the Moment (79%). Whispers of Doom (61%) lets you apply an extra curse.

## Gear

Olroth's Resolve (54%) and Alpha's Howl (39%) are common. This character wears [[Doedre's Damning]] for an additional curse and [[Maligaro's Virtuosity]] for critical hit chance; [[Mageblood]] is an endgame luxury.
