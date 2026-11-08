---
title: Supporting Fire Tactician
class: Mercenary
ascendancy: Tactician
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Supporting Fire Tactician Build Guide"
  author: "shayd (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/supporting-fire-tactician-build-guide
  updated: 2026-10-19
summary: "Mercenary commander whose Supporting Fire artillery and minion army clear the screen with a single button, backed by energy shield."
tags: [minion, artillery, energy shield, league starter]
damage: Physical / Elemental
playstyle: Minions
difficulty: easy
budget: low
tiers:
  starter: A
pros:
  - "Essentially a one-button build"
  - "Phenomenal clear speed"
  - "One stat scales both offence and defence"
  - "Excellent league starter"
cons:
  - "Minion modifiers take up gear slots"
  - "Suffix pressure on endgame gear"
  - "Plays as a crossbow build early on"
skills:
  - gem: "Supporting Fire"
    supports: [Muster, Bidding III, Minion Mastery, Kurgal's Leash, Heft]
  - gem: "Malice"
    supports: [Prolonged Duration II, Upwelling II, Clarity II, Vitality II]
  - gem: "Withering Presence"
    supports: [Prolonged Duration II, Chaos Mastery]
  - gem: "Pounce"
    supports: [Cold Exposure, Pinpoint Critical, Inexorable Critical II, Prolonged Duration II]
  - gem: "Blasphemy"
    supports: [Temporal Chains, Ritualistic Curse, Magnified Area II, Despair, Slow Potency]
  - gem: "Skeletal Arsonist"
    supports: [Last Gasp, Efficiency II, Bidding III, Mobility]
  - gem: "Wolf Pack"
    supports: [Romira's Requital, Infernal Legion I, Essence Harvest, Blind II]
  - gem: "Skeletal Brute"
    supports: [Last Gasp, Armour Break III, Uruk's Smelting, Muster]
  - gem: "Skeletal Storm Mage"
    supports: [Overcharge, Shock, Last Gasp, Lightning Penetration]
  - gem: "Skeletal Cleric"
    supports: [Last Gasp, Rapid Casting II, Minion Mastery, Meat Shield II]
  - gem: "Skeletal Sniper"
    supports: [Multishot II, Last Gasp, Culling Strike II, Soul Drain]
leveling:
  - name: "Crossbow Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Fragmentation Rounds"
            supports: [Concentrated Area, Elemental Armament I]
          - gem: "Permafrost Bolts"
            supports: [Ice Bite I, Elemental Armament I]
          - gem: "Frost Bomb"
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament I]
      - name: "Act 2"
        skills:
          - gem: "Fragmentation Rounds"
            supports: [Concentrated Area, Elemental Armament II, Cold Attunement]
          - gem: "Permafrost Bolts"
            supports: [Ice Bite I, Elemental Armament II, Cold Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Herald of Ice"
            supports: [Magnified Area I, Elemental Armament II]
          - gem: "Freezing Mark"
          - gem: "Supporting Fire"
            supports: [Bidding I, Cold Attunement]
      - name: "Act 3"
        skills:
          - gem: "Fragmentation Rounds"
            supports: [Concentrated Area, Elemental Armament II, Deliberation]
          - gem: "Permafrost Bolts"
            supports: [Ice Bite II, Elemental Armament II, Cold Attunement]
          - gem: "Frost Bomb"
            supports: [Potent Exposure]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Elemental Armament II]
          - gem: "Freezing Mark"
          - gem: "Supporting Fire"
            supports: [Bidding I, Cold Attunement]
    rotations:
      - name: "Clear"
        steps:
          - gem: "Permafrost Bolts"
          - gem: "Crossbow Shot"
          - gem: "Herald of Ice"
          - gem: "Supporting Fire"
      - name: "Single Target"
        steps:
          - gem: "Frost Bomb"
            label: "Setup"
          - gem: "Freezing Mark"
          - gem: "Permafrost Bolts"
            label: "Until Frozen"
          - gem: "Fragmentation Rounds"
  - name: "Supporting Fire Campaign"
    steps:
      - name: "Act 3"
        skills:
          - gem: "Supporting Fire"
            supports: [Bidding I, Muster, Fire Attunement]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Bidding I, Muster]
          - gem: "Wolf Pack"
            supports: [Loyalty, Fire Attunement, Muster]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Heightened Curse]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Prolonged Duration II]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp]
          - gem: "Purity of Fire"
            supports: [Upwelling I, Vitality I, Clarity I]
      - name: "Act 4 + Interlude"
        skills:
          - gem: "Supporting Fire"
            supports: [Bidding III, Muster, Fire Attunement, Minion Mastery]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Bidding II, Muster, Fire Attunement]
          - gem: "Wolf Pack"
            supports: [Loyalty, Fire Attunement, Muster]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Heightened Curse, Prolonged Duration II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Prolonged Duration II]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp]
          - gem: "Skeletal Storm Mage"
            supports: [Last Gasp, Shock, Overcharge]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Purity of Fire"
            supports: [Upwelling II, Vitality II, Clarity II]
      - name: "Early Maps"
        skills:
          - gem: "Supporting Fire"
            supports: [Bidding III, Muster, Fire Attunement, Minion Mastery]
          - gem: "Skeletal Sniper"
            supports: [Multishot II, Bidding II, Muster, Fire Attunement]
          - gem: "Wolf Pack"
            supports: [Loyalty, Fire Attunement, Muster, Feeding Frenzy II]
          - gem: "Elemental Weakness"
            supports: [Cursed Ground, Heightened Curse, Prolonged Duration II]
          - gem: "Frost Bomb"
            supports: [Potent Exposure, Prolonged Duration II]
          - gem: "Skeletal Arsonist"
            supports: [Bidding III, Last Gasp, Efficiency II]
          - gem: "Skeletal Brute"
            supports: [Last Gasp, Armour Break III, Armour Demolisher II]
          - gem: "Skeletal Reaver"
            supports: [Last Gasp, Rage III, Muster]
          - gem: "Skeletal Storm Mage"
            supports: [Last Gasp, Shock, Overcharge]
          - gem: "Skeletal Cleric"
            supports: [Last Gasp, Rapid Casting II, Meat Shield II]
          - gem: "Malice"
            supports: [Upwelling II, Clarity II, Vitality II]
    rotations:
      - name: "Single Target"
        steps:
          - gem: "Elemental Weakness"
            label: "Setup"
          - gem: "Frost Bomb"
          - gem: "Skeletal Sniper"
            label: "Command"
          - gem: "Supporting Fire"
rotations:
  - name: "Clear"
    steps:
      - gem: "Supporting Fire"
        label: "Maintain"
      - gem: "Skeletal Arsonist"
        label: "Command"
  - name: "Single Target"
    steps:
      - gem: "Elemental Weakness"
        label: "Setup"
      - gem: "Frost Bomb"
      - gem: "Pounce"
      - gem: "Skeletal Arsonist"
        label: "Command"
      - gem: "Skeletal Brute"
      - gem: "Supporting Fire"
        label: "Archon of Undeath"
gear:
  weapon:
    base: Omen Sceptre
    mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit]
  offhand:
    base: Royal Tower Shield
    mods: [Block Chance, +Maximum Life, Elemental Resistances]
  helmet:
    base: Masked Greathelm
    mods: [+Level of all Minion Skills, +Maximum Life, Elemental Resistances]
  body:
    unique: "Enfolding Dawn"
  gloves:
    base: Ornate Mitts
    mods: [+Maximum Life, Elemental Resistances]
  boots:
    base: Ornate Greaves
    mods: [Movement Speed, +Maximum Life, Elemental Resistances]
  amulet:
    base: Solar Amulet
    mods: [+Level of all Minion Skills, +All Attributes, +Maximum Life]
  ring1:
    base: Amethyst Ring
    mods: [+Strength, +All Attributes, +Maximum Life, Elemental Resistances]
  ring2:
    base: Amethyst Ring
    mods: [+Strength, +All Attributes, +Maximum Life, Elemental Resistances]
  belt:
    unique: "Meginord's Girdle"
gearStages:
  campaign:
    weapon:
      base: Shrine Sceptre
      mods: [+Level of all Minion Skills, Increased Allies in presence Damage, +Spirit]
    offhand:
      base: Rampart Tower Shield
      mods: [Block Chance, +Maximum Life, Elemental Resistances]
    helmet:
      base: Elite Greathelm
      mods: [+Level of all Minion Skills, +Maximum Life]
    body:
      base: Full Plate
      mods: [+Spirit, Armour, +Maximum Life]
    gloves:
      base: Moulded Mitts
      mods: [+Maximum Life, Elemental Resistances]
    boots:
      base: Stone Greaves
      mods: [Movement Speed, Elemental Resistances]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Minion Skills, +Spirit, +Maximum Life, +Strength]
    ring1:
      base: Prismatic Ring
      mods: [+Maximum Life, Elemental Resistances]
    ring2:
      base: Prismatic Ring
      mods: [+Maximum Life, Elemental Resistances]
    belt:
      base: Plate Belt
      mods: [+Maximum Life, Elemental Resistances]
  mapping:
    weapon:
      base: Omen Sceptre
      mods: [Increased Allies in presence Damage, +Level of all Minion Skills, +Spirit]
    offhand:
      base: Royal Tower Shield
      mods: [Fire Resistance, Lightning Resistance, Chaos Resistance, +Maximum Life, Block Chance]
    helmet:
      base: Masked Greathelm
      mods: [Lightning Resistance, +Maximum Life, +Level of all Minion Skills]
    body:
      unique: "Enfolding Dawn"
    gloves:
      base: Ornate Mitts
      mods: [Fire Resistance, Cold Resistance, +Maximum Life]
    boots:
      base: Ornate Greaves
      mods: [Lightning Resistance, Chaos Resistance, +Maximum Life, Movement Speed]
    amulet:
      base: Solar Amulet
      mods: [+All Attributes, +Maximum Life, +Level of all Minion Skills]
    ring1:
      base: Amethyst Ring
      mods: [+Strength, +All Attributes, Cold Resistance, +Maximum Life]
    ring2:
      base: Amethyst Ring
      mods: [+Strength, +All Attributes, Cold Resistance, +Maximum Life]
    belt:
      unique: "Meginord's Girdle"
  endgame:
    weapon:
      unique: "Chober Chaber"
    offhand:
      base: Omen Sceptre
      mods: [+Level of all Minion Skills, +Spirit]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances]
    body:
      unique: "Morior Invictus"
    gloves:
      base: Sirenscale Gloves
      mods: [Energy Shield, Elemental Resistances]
    boots:
      base: Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Minion Skills, +Spirit, +All Attributes, +Strength, Energy Shield]
    ring1:
      base: Gold Ring
      mods: [+Strength, +Intelligence, Evasion Rating]
    ring2:
      unique: "Kalandra's Touch"
    belt:
      base: Heavy Belt
      mods: [Minion Area of Effect, Increased Minion commanded skill Damage, +Strength, Elemental Resistances]
    weapon2:
      base: Spiny Talisman
      mods: [Critical Hit Chance, Increased Attack Speed, Accuracy Rating]
  minmax:
    weapon:
      unique: "Chober Chaber"
    offhand:
      base: Omen Sceptre
      mods: [+Level of all Minion Skills, +Spirit]
    helmet:
      base: Ancestral Tiara
      mods: [+Level of all Minion Skills, Energy Shield, Elemental Resistances, +Intelligence]
    body:
      unique: "Morior Invictus"
    gloves:
      base: Sirenscale Gloves
      mods: [Energy Shield, +Maximum Life, Elemental Resistances, +Intelligence]
    boots:
      base: Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Intelligence]
    amulet:
      base: Solar Amulet
      mods: [+Level of all Minion Skills, +Spirit, +All Attributes, +Strength, Energy Shield]
    ring1:
      base: Breach Ring
      mods: [Critical Damage Bonus, Increased Minion Damage, Evasion Rating]
    ring2:
      unique: "Kalandra's Touch"
    belt:
      unique: "Mageblood"
    weapon2:
      base: Spiny Talisman
      mods: [Adds Cold Damage, Critical Hit Chance, Increased Attack Speed, Accuracy Rating]
passives:
  attribute: int
  path:
    - "Battle-hardened"
    - "Relentless"
    - "At your Command"
    - "Lord of Horrors"
    - "Right Hand of Darkness"
    - "Archon of Undeath"
    - "Enduring Archon"
    - "Resurging Archon"
    - "Gigantic Following"
    - "Puppet Master chance"
    - "Entropic Incarnation"
    - "Necrotic Touch"
    - "Grip of Evil"
    - "Growing Swarm"
    - "Licking Wounds"
    - "Sturdy Metal"
    - "Whispers of Doom"
    - "Beef"
    - "Tides of Change"
  ascendancy: [Unleash Hell!, A Solid Plan, Polish That Gear, "Stay Light, Use Cover"]
---
## How It Works

[[Supporting Fire]] calls in a squad that bombards everything around you; on its own it clears most content. A skeleton army ([[Skeletal Sniper]], [[Skeletal Storm Mage]], [[Skeletal Brute]], [[Skeletal Arsonist]], [[Skeletal Cleric]]) and [[Wolf Pack]] add damage and bodies, while [[Malice]], [[Withering Presence]] and [[Blasphemy]] weaken enemies. The Tactician ascendancy, starting with Unleash Hell!, strengthens the artillery.

## Leveling

The campaign is played with a crossbow until level 36:

1. Put [[Permafrost Bolts]] on weapon set 1 and [[Fragmentation Rounds]] on weapon set 2.
2. Right-click the weapon set icon above your crossbow so it is used by both sets.
3. Bind Crossbow Shot I and II to different keys and load each ammunition once.
4. You can now alternate the two without manual reloading. Clear with Permafrost Bolts, and use Fragmentation Rounds on frozen bosses.

[[Supporting Fire]] unlocks midway through Act 2 and already speeds up clearing. At level 36, swap fully to the minion setup.

## Playstyle

**Clear.** Keep [[Supporting Fire]] active as much as possible: it clears everything by itself.

**Single target.** Apply [[Elemental Weakness]] and [[Frost Bomb]] at the start of the fight and keep them up while your army works.

## Gear Priorities

Energy shield and minion modifiers. The source guide recommends jewels with increased maximum energy shield and faster start of energy shield recharge, then minion critical modifiers. [[Enfolding Dawn]] and [[Meginord's Girdle]] are its unique picks.
