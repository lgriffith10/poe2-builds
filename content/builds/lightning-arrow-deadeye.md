---
title: Lightning Arrow Deadeye
class: Ranger
ascendancy: Deadeye
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: "Lightning Arrow Deadeye Build Guide"
  author: "Crouching_Tuna (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/lightning-arrow-deadeye
  updated: 2026-09-01
summary: "Bow build whose Lightning Arrows arc between packs and set off Herald of Thunder bolts, with stacked Lightning Rods for bosses."
tags: [bow, lightning, crit, shock, ranged]
damage: Lightning
playstyle: Ranged attack
difficulty: medium
budget: medium
tiers:
  starter: B
  endgame: A
  bossing: B
pros:
  - Clears whole screens from a safe distance
  - Herald of Thunder chains kills across packs
  - Rhoa Mount keeps you moving at full speed while shooting
cons:
  - Single target depends on setting up Lightning Rods first
  - Evasion-based defences leave you open to damage over time
  - Needs a lot of Spirit for all reservations
skills:
  - gem: "Lightning Arrow"
    supports: [Pinpoint Critical, Rakiata's Flow, Charged Shots II, Multishot II, Fork]
    note: "Main clear skill; fire it at Lightning Rods and tornadoes on bosses"
  - gem: "Lightning Rod"
    supports: [Deliberation, Elemental Armament II, Multishot II, Garukhan's Resolve, Rigwald's Ferocity]
    note: "Main single-target damage; stack rods under the boss"
  - gem: "Mirage Deadeye"
    supports: [Lightning Arrow, Prolonged Duration II, Cooldown Recovery II, Elemental Armament II, Eonyr's Thunder]
    note: "Mirage copy that fires Lightning Arrow alongside you"
  - gem: "Herald of Thunder"
    supports: [Magnified Area I, Pinpoint Critical, Elemental Focus, Lightning Attunement, Elemental Armament II]
    note: "Lightning bolts when shocked enemies die"
  - gem: "Wind Dancer"
    supports: [Blind I, Magnified Area I]
    note: "Evasion buff"
  - gem: "Ghost Dance"
    supports: [Cooldown Recovery II, Uhtred's Omen]
    note: "Energy shield recovery when hit"
  - gem: "Barrage"
    supports: [Rapid Casting III, Cooldown Recovery II, Prolonged Duration II]
    note: "Empowers the next Lightning Arrow or Lightning Rod; use on cooldown"
  - gem: "Tornado Shot"
    supports: [Prolonged Duration II, Rapid Attacks II, Overabundance II, Elemental Armament II]
    note: "Place on bosses, then shoot through it"
  - gem: "Voltaic Mark"
    supports: [Prolonged Duration I]
    note: "Better shocks against bosses"
  - gem: "Rhoa Mount"
    supports: [Blind I, Minion Mastery]
    note: "No movement speed penalty while shooting"
leveling:
  - steps:
      - name: "Act 1"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Pierce I]
          - gem: "Lightning Rod"
            supports: [Multishot I, Concentrated Area]
          - gem: "Herald of Thunder"
            supports: [Magnified Area I, Elemental Armament I]
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Execute I]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I]
          - gem: "Frost Bomb"
          - gem: "Electrocuting Arrow"
            supports: [Prolonged Duration I, Rapid Attacks I]
      - name: "Act 2"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Pierce I]
          - gem: "Lightning Rod"
            supports: [Multishot I, Concentrated Area]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I, Electrocute]
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Execute I]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I]
          - gem: "Frost Bomb"
          - gem: "Electrocuting Arrow"
            supports: [Prolonged Duration I, Rapid Attacks I]
      - name: "Act 3"
        skills:
          - gem: "Lightning Arrow"
            supports: [Lightning Attunement, Charged Shots I, Elemental Armament II, Multishot II]
          - gem: "Lightning Rod"
            supports: [Multishot I, Concentrated Area, Elemental Armament II]
          - gem: "Herald of Thunder"
            supports: [Magnified Area I, Elemental Armament II, Electrocute]
          - gem: "Barrage"
            supports: [Rapid Casting I, Cooldown Recovery I]
          - gem: "Wind Dancer"
            supports: [Blind I, Magnified Area I]
          - gem: "Tornado Shot"
            supports: [Overabundance I, Prolonged Duration I, Elemental Armament II]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I, Lightning Mastery]
          - gem: "Tame Beast"
            supports: [Loyalty]
          - gem: "Electrocuting Arrow"
            supports: [Prolonged Duration I, Rapid Attacks I]
      - name: "Endgame"
        skills:
          - gem: "Lightning Arrow"
            supports: [Lightning Attunement, Elemental Armament II, Multishot II, Charged Shots II]
          - gem: "Lightning Rod"
            supports: [Multishot I, Elemental Armament II, Concentrated Area]
          - gem: "Herald of Thunder"
            supports: [Magnified Area II, Elemental Armament II, Electrocute]
          - gem: "Barrage"
            supports: [Cooldown Recovery I, Rapid Casting II]
          - gem: "Wind Dancer"
            supports: [Blind I, Magnified Area I]
          - gem: "Tornado Shot"
            supports: [Elemental Armament II, Prolonged Duration II, Overabundance II]
          - gem: "Voltaic Mark"
            supports: [Prolonged Duration I, Lightning Mastery]
          - gem: "Tame Beast"
            supports: [Loyalty]
          - gem: "Electrocuting Arrow"
            supports: [Prolonged Duration II, Rapid Attacks III]
rotations:
  - name: "Rares"
    steps:
      - gem: "Lightning Rod"
        label: "Stack 20"
      - gem: "Barrage"
        label: "Spam"
      - gem: "Lightning Arrow"
  - name: "Bosses"
    steps:
      - gem: "Tornado Shot"
        label: "Pre-Stack & Maintain"
      - gem: "Lightning Rod"
      - gem: "Voltaic Mark"
        label: "Refresh"
      - gem: "Barrage"
        label: "Spam"
      - gem: "Lightning Arrow"
gear:
  weapon:
    base: Gemini Bow
    mods: [Increased Physical Damage, Adds Physical Damage, Critical Hit Chance, Additional Arrow, Adds Lightning Damage, Critical Damage Bonus]
  offhand:
    base: Visceral Quiver
    mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Level of all Projectile Skills, Attack Critical Hit Chance, Increased Attack Speed]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, +Intelligence, Elemental Resistances]
  body:
    base: Runemastered Primal Markings
    mods: [Evasion Rating, Energy Shield, Evasion and Energy Shield, Elemental Resistances, +Intelligence]
  gloves:
    unique: "Hand of Wisdom and Action"
  boots:
    base: Daggerfoot Shoes
    mods: [Movement Speed, Energy Shield, +Intelligence, Elemental Resistances]
  amulet:
    base: Solar Amulet
    mods: [+Spirit, +Level of all Projectile Skills, Energy Shield, Grants a Passive Skill, +Intelligence, Elemental Resistances]
  ring1:
    base: Breach Ring
    mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Intelligence, Elemental Resistances]
  ring2:
    base: Sapphire Ring
    mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Elemental Resistances, +Intelligence]
  belt:
    unique: "Headhunter"
gearStages:
  mapping:
    weapon:
      base: Dualstring Bow
      mods: [Adds Physical Damage, Increased Physical Damage, Adds Lightning Damage, Increased Attack Speed]
    offhand:
      base: Volant Quiver
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Level of all Projectile Skills, Increased Attack Speed]
    helmet:
      base: Wrapped Cap
      mods: [Elemental Resistances, +Maximum Life, Chaos Resistance]
    body:
      base: Slipstrike Vest
      mods: [+Maximum Life, Elemental Resistances, Evasion Rating]
    gloves:
      base: Stalking Bracers
      mods: [Adds Lightning Damage to Attacks, Increased Attack Speed, +Maximum Life, Chaos Resistance]
    boots:
      base: Sleek Boots
      mods: [Movement Speed, +Maximum Life, Elemental Resistances, Evasion Rating]
    amulet:
      base: Lunar Amulet
      mods: [+Level of all Projectile Skills, +Maximum Life, Elemental Resistances, Chaos Resistance]
    ring1:
      base: Amethyst Ring
      mods: [+Maximum Life, Adds Physical Damage to Attacks, Elemental Resistances, Chaos Resistance]
    ring2:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, Elemental Resistances, Fire Resistance, +Maximum Life]
    belt:
      base: Heavy Belt
      mods: [+Maximum Life, +Strength, Chaos Resistance, Cold Resistance]
  endgame:
    weapon:
      base: Gemini Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Critical Hit Chance, Additional Arrow, Adds Lightning Damage, Critical Damage Bonus]
    offhand:
      base: Visceral Quiver
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Level of all Projectile Skills, Attack Critical Hit Chance, Increased Attack Speed]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Intelligence, Elemental Resistances]
    body:
      base: Runemastered Primal Markings
      mods: [Evasion Rating, Energy Shield, Evasion and Energy Shield, Elemental Resistances, +Intelligence]
    gloves:
      unique: "Hand of Wisdom and Action"
    boots:
      base: Daggerfoot Shoes
      mods: [Movement Speed, Energy Shield, +Intelligence, Elemental Resistances]
    amulet:
      base: Solar Amulet
      mods: [+Spirit, +Level of all Projectile Skills, Energy Shield, Grants a Passive Skill, +Intelligence, Elemental Resistances]
    ring1:
      base: Breach Ring
      mods: [Adds Lightning Damage to Attacks, Adds Physical Damage to Attacks, +Intelligence, Elemental Resistances]
    ring2:
      base: Sapphire Ring
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Elemental Resistances, +Intelligence]
    belt:
      unique: "Headhunter"
passives:
  attribute: int
  path:
    - "Honed Instincts"
    - "Harness the Elements"
    - "Catalysis"
    - "Maiming Strike"
    - "Escape Velocity"
    - "Acceleration"
    - "Feathered Fletching"
    - "Coming Calamity"
    - "Mindful Awareness"
    - "Flow Like Water"
    - "Crashing Wave"
    - "Master Fletching"
    - "Subterfuge Mask"
    - "Heartbreaking"
    - "Struck Through"
    - "Heartstopping"
    - "True Strike"
    - "For the Jugular"
    - "Deadly Force"
    - "Sniper"
    - "Throatseeker"
    - "Careful Assassin"
    - "Patient Barrier"
    - "Tenfold Attacks"
    - "Killer Instinct"
    - "Spectral Ward"
    - "Flow State"
    - "Step Like Mist"
    - "Mystic Stance"
  ascendancy: [Gathering Winds, Endless Munitions, Mirage Deadeye]
---
## How It Works

[[Lightning Arrow]] hits an enemy and then arcs beams to up to three nearby targets; with pierce, one arrow procs this several times, which is what makes the build so fast in dense maps and Breaches. Shocked enemies that die trigger [[Herald of Thunder]], so packs fall in a chain reaction.

For single target, [[Lightning Rod]] is the real damage source: rods planted under a boss explode whenever another lightning attack hits them, and every extra arrow is one more rod. [[Tornado Shot]] and [[Voltaic Mark]] add damage and stronger shocks on top.

Deadeye's Gathering Winds, Endless Munitions and Mirage Deadeye give more projectiles and a mirage that copies your Lightning Arrow.

## Playstyle

**Mapping.** Ride [[Rhoa Mount]] and fire [[Lightning Arrow]] at every pack; [[Herald of Thunder]] cleans up what is left.

**Bossing.** Place [[Tornado Shot]], keep [[Voltaic Mark]] on the boss, stack around 20 [[Lightning Rod]]s, use [[Barrage]], then fire [[Lightning Arrow]] through the rods and tornadoes.

## Defences

Evasion from [[Wind Dancer]] and the tree avoids most hits, and [[Ghost Dance]] restores energy shield when one lands. Ground effects and damage over time get through, so keep moving.

## Gear Priorities

You need about 95 Spirit from the body armour and amulet to run every reservation. Look for added lightning and physical damage, attack speed and +level of projectile skills on the bow and quiver, then life and resistances everywhere else.
