---
title: Spiral Volley Deadeye
class: Ranger
ascendancy: Deadeye
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Spiral Volley Deadeye Build Guide"
  author: "cptngarbage (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/spiral-volley-deadeye-build-guide
  updated: 2026-09-04
summary: "Deadeye who clears the screen with Spiral Volley's 29-arrow spiral, fuelled by Frenzy Charges from Resonance, and bursts bosses with stacked Lightning Rods."
tags: [bow, lightning, projectile, crit, evasion]
damage: Lightning / Physical
playstyle: Ranged attack
difficulty: medium
budget: low
tiers:
  starter: C
pros:
  - "One of the most efficient one-click screen clears"
  - "Huge single-target burst with Lightning Rods"
  - "Fast and evasive with Gathering Winds"
cons:
  - "Does not work without Resonance and the right supports"
  - "Frenzy Charge generation needs a bow with physical damage"
skills:
  - gem: "Spiral Volley"
    supports: [Armour Break III, Enduring Impact II, Ambrosia, Ambush, Projectile Acceleration III]
  - gem: "Lightning Arrow"
    supports: [Rapid Attacks III, Chain II, Spectral Volley, Rigwald's Ferocity, Mobility]
    level: 1
  - gem: "Lightning Rod"
    supports: [Elemental Armament II, Execute II, Rakiata's Flow, Garukhan's Resolve, Projectile Acceleration III]
  - gem: "Herald of Thunder"
    supports: [Elemental Armament II, Exploit Weakness, Elemental Focus, Ambush, Lightning Penetration]
  - gem: "Barrage"
    supports: [Cooldown Recovery I, Heightened Charges, Perpetual Charge, Rapid Casting II]
  - gem: "Wind Dancer"
    supports: [Knockback, Cannibalism I, Punch Through]
  - gem: "Tornado Shot"
    supports: [Prolonged Duration I, Efficiency II, Overabundance II, Rapid Attacks III]
  - gem: "Snipe"
    supports: [Perfected Endurance, Hit and Run, Rapid Attacks III, Mana Leech]
    level: 3
  - gem: "Charge Regulation"
    supports: [Precision I]
  - gem: "Called Shots"
    supports: [Sniper's Mark, Mark for Death, Cooldown Recovery II, Charge Profusion II, Magnified Area II]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Lightning Rod, Freezing Salvo, Barrage]
    - label: "Act Iii"
      gems: [Tame Beast, Tornado Shot]
  spirit:
    - label: "Act I"
      gems: [Herald of Thunder]
    - label: "Act Iii"
      gems: [Wind Dancer]
  supports:
    - label: "Act I - 2x Arma/Magn"
      gems: [Rapid Attacks I, Elemental Armament I, Magnified Area I, Hourglass, Cooldown Recovery I]
    - label: "Act Iii+"
      gems: [Execute I, Innervate, Elemental Armament II, Overabundance I, Prolonged Duration I, Cannibalism I]
leveling:
  - steps:
      - name: "Act 1-2"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Elemental Armament I]
          - gem: "Lightning Rod"
            supports: [Elemental Armament I, Magnified Area I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Magnified Area I]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I]
          - gem: "Barrage"
            supports: [Cooldown Recovery I]
      - name: "Act 3+"
        skills:
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks I, Elemental Armament I, Innervate]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Magnified Area I, Execute I]
          - gem: "Freezing Salvo"
            supports: [Hourglass, Magnified Area I]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament I]
          - gem: "Barrage"
            supports: [Cooldown Recovery I]
          - gem: "Wind Dancer"
          - gem: "Tame Beast"
          - gem: "Tornado Shot"
            supports: [Overabundance I, Prolonged Duration I]
      - name: "Level 54 Spiral Volley no crit"
        skills:
          - gem: "Spiral Volley"
            supports: [Armour Break III, Enduring Impact II, Ambrosia, Longshot II]
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks II, Chain II, Spectral Volley]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Execute II, Magnified Area II, Rapid Attacks II]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament II, Exploit Weakness, Elemental Focus]
          - gem: "Barrage"
            supports: [Cooldown Recovery I, Heightened Charges, Perpetual Charge]
          - gem: "Wind Dancer"
            supports: [Knockback, Cannibalism I]
          - gem: "Tame Beast"
          - gem: "Tornado Shot"
            supports: [Prolonged Duration I, Efficiency II, Overabundance II]
          - gem: "Snipe"
            supports: [Perfected Endurance, Hit and Run, Rapid Attacks III]
      - name: "Endgame"
        skills:
          - gem: "Spiral Volley"
            supports: [Armour Break III, Enduring Impact II, Ambrosia, Ambush, Pinpoint Critical]
          - gem: "Lightning Arrow"
            supports: [Rapid Attacks III, Chain II, Spectral Volley, Rigwald's Ferocity]
          - gem: "Lightning Rod"
            supports: [Elemental Armament II, Execute II, Pinpoint Critical, Efficiency II, Lightning Penetration]
          - gem: "Herald of Thunder"
            supports: [Elemental Armament II, Exploit Weakness, Elemental Focus, Ambush]
          - gem: "Barrage"
            supports: [Cooldown Recovery I, Heightened Charges, Perpetual Charge, Rapid Casting II]
          - gem: "Wind Dancer"
            supports: [Knockback, Cannibalism I, Punch Through]
          - gem: "Tornado Shot"
            supports: [Prolonged Duration I, Efficiency II, Overabundance II, Rapid Attacks III]
          - gem: "Snipe"
            supports: [Perfected Endurance, Hit and Run, Rapid Attacks III, Mana Leech]
          - gem: "Charge Regulation"
            supports: [Precision I]
          - gem: "Called Shots"
            supports: [Sniper's Mark, Mark for Death, Cooldown Recovery II, Charge Profusion II, Magnified Area II]
rotations:
  - name: "Clear Early"
    steps:
      - gem: "Lightning Arrow"
        label: "if enough damage"
      - gem: "Lightning Rod"
        label: "if struggling on damage"
      - gem: "Lightning Arrow"
  - name: "Basic Single Target"
    steps:
      - gem: "Lightning Rod"
        label: "Stack 20 Rods"
      - gem: "Lightning Arrow"
        label: "Fire into them"
  - name: "Advanced Single Target Rotation"
    steps:
      - gem: "Lightning Rod"
        label: "x20 Before Boss Spawns"
      - gem: "Tornado Shot"
        label: "x1 before Boss spawns"
      - gem: "Freezing Salvo"
        label: "Optional As Boss Spawns (Skip later)"
      - gem: "Barrage"
        label: "Barrage once then spam LA"
      - gem: "Lightning Arrow"
  - name: "Spiral Volley Clear"
    steps:
      - gem: "Snipe"
        label: "Hit anything to gain Charge"
      - gem: "Spiral Volley"
        label: "Hit decent amount of monsters"
      - gem: "Spiral Volley"
        label: "Keep going"
      - gem: "Snipe"
        label: "When out of Frenzies"
  - name: "Spiral Volley Endgame"
    steps:
      - gem: "Spiral Volley"
        label: "Unempowered to gain Charge"
      - gem: "Spiral Volley"
        label: "Empowered and regain Charge"
      - gem: "Spiral Volley"
        label: "Repeat"
gear:
  weapon:
    base: Warmonger Bow
    mods: [Increased Physical Damage, Adds Physical Damage, Adds Lightning Damage, Critical Hit Chance, +Level of all Attack Skills, Increased Attack Speed]
    runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
  offhand:
    base: Visceral Quiver
    mods: [Adds Physical Damage to Attacks, Increased Damage with Bow Skills, Projectile Speed, Attack Critical Hit Chance, +Level of all Projectile Skills]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, +Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
    runes: ["Soul Core of Cholotl: Convert 40% of Requirements to Dexterity"]
  body:
    base: Slipstrike Vest
    mods: [Evasion Rating, Fire Resistance, Cold Resistance]
    runes: ["2× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  gloves:
    unique: "Maligaro's Virtuosity"
    runes: ["Cat Idol: 25% increased Accuracy Rating"]
  boots:
    base: Dragonscale Boots
    mods: [Deflection, Movement Speed, +Maximum Life, Lightning Resistance, Cold Resistance]
    runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
  amulet:
    unique: "Serpent's Egg"
  ring1:
    base: Amethyst Ring
    mods: [Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, Cold Resistance, Fire Resistance, Chaos Resistance]
  ring2:
    base: Amethyst Ring
    mods: [Adds Lightning Damage to Attacks, +Maximum Life, Cold Resistance, Chaos Resistance, Adds Cold Damage to Attacks, Mana Leech]
  belt:
    base: Utility Belt
    mods: [+Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
  weapon2:
    base: Warmonger Bow
    mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Critical Hit Chance, Increased Attack Speed, +Level of all Projectile Skills]
    runes: ["2× Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
  offhand2:
    base: Visceral Quiver
    mods: [Adds Cold Damage to Attacks, Increased Damage with Bow Skills, Projectile Speed, Increased Attack Speed, Attack Critical Hit Chance, Critical Damage Bonus]
gearStages:
  campaign:
    weapon:
      base: Dualstring Bow
      mods: [Increased Physical Damage, Adds Lightning Damage, Increased Attack Speed]
      runes: ["Storm Rune: Adds 1 to 20 Lightning Damage", "Iron Rune: 16% increased Physical Damage"]
    offhand:
      base: Fire Quiver
      mods: [Adds Fire Damage to Attacks, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks]
    helmet:
      base: Viper Cap
      mods: [+Maximum Life, Cold Resistance, Fire Resistance]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    body:
      base: Serpentscale Coat
      mods: [Evasion Rating]
      runes: ["Glacial Rune: +14% to Cold Resistance", "Desert Rune: +14% to Fire Resistance"]
    gloves:
      base: Spined Bracers
      mods: [Adds Lightning Damage to Attacks, Adds Fire Damage to Attacks]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      base: Lizardscale Boots
      mods: [Movement Speed, Fire Resistance]
      runes: ["Desert Rune: +14% to Fire Resistance"]
    amulet:
      base: Stellar Amulet
      mods: [+Maximum Life, +Level of all Projectile Skills, Fire Resistance]
    ring1:
      base: Prismatic Ring
      mods: [Adds Fire Damage to Attacks, Adds Physical Damage to Attacks, Elemental Resistances]
    ring2:
      base: Prismatic Ring
      mods: [Adds Fire Damage to Attacks, Adds Physical Damage to Attacks, Elemental Resistances]
    belt:
      base: Ornate Belt
      mods: [+Maximum Life, Fire Resistance, Cold Resistance, Chaos Resistance]
  mapping:
    weapon:
      base: Twin Bow
      mods: [Increased Physical Damage, Adds Physical Damage]
      runes: ["2× Greater Iron Rune: 18% increased Physical Damage"]
    offhand:
      base: Primed Quiver
      mods: [Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Projectile Speed, +Level of all Projectile Skills]
    helmet:
      base: Woven Cap
      mods: [+Maximum Life, Fire Resistance, Deflection, Evasion Rating]
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    body:
      base: Exquisite Vest
      mods: [Evasion Rating, +Maximum Life, Lightning Resistance]
      runes: ["2× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Stalking Bracers
      mods: [Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Chaos Resistance, +Maximum Life]
      runes: ["Storm Rune: +14% to Lightning Resistance"]
    boots:
      base: Cinched Boots
      mods: [+Maximum Life, Movement Speed, Fire Resistance, Lightning Resistance, Deflection]
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Prismatic Ring
      mods: [Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, +Dexterity and Intelligence]
    ring2:
      base: Prismatic Ring
      mods: [Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, +Dexterity and Intelligence, Mana Leech]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
  endgame:
    weapon:
      base: Warmonger Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Lightning Damage, Critical Hit Chance, +Level of all Attack Skills, Increased Attack Speed]
      runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      base: Visceral Quiver
      mods: [Adds Physical Damage to Attacks, Increased Damage with Bow Skills, Projectile Speed, Attack Critical Hit Chance, +Level of all Projectile Skills]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
      runes: ["Soul Core of Cholotl: Convert 40% of Requirements to Dexterity"]
    body:
      base: Slipstrike Vest
      mods: [Evasion Rating, Fire Resistance, Cold Resistance]
      runes: ["2× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      unique: "Maligaro's Virtuosity"
      runes: ["Cat Idol: 25% increased Accuracy Rating"]
    boots:
      base: Dragonscale Boots
      mods: [Deflection, Movement Speed, +Maximum Life, Lightning Resistance, Cold Resistance]
      runes: ["Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Amethyst Ring
      mods: [Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, +Maximum Life, Cold Resistance, Fire Resistance, Chaos Resistance]
    ring2:
      base: Amethyst Ring
      mods: [Adds Lightning Damage to Attacks, +Maximum Life, Cold Resistance, Chaos Resistance, Adds Cold Damage to Attacks, Mana Leech]
    belt:
      base: Utility Belt
      mods: [+Maximum Life, Fire Resistance, Cold Resistance, Lightning Resistance]
    weapon2:
      base: Warmonger Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Cold Damage, Critical Hit Chance, Increased Attack Speed, +Level of all Projectile Skills]
      runes: ["2× Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand2:
      base: Visceral Quiver
      mods: [Adds Cold Damage to Attacks, Increased Damage with Bow Skills, Projectile Speed, Increased Attack Speed, Attack Critical Hit Chance, Critical Damage Bonus]
  minmax:
    weapon:
      base: Warmonger Bow
      mods: [Increased Physical Damage, Adds Physical Damage, Adds Lightning Damage, Critical Hit Chance, +Level of all Attack Skills, Increased Attack Speed]
      runes: ["Countess Seske's Rune of Archery: Bow Attacks fire an additional Arrow", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      base: Visceral Quiver
      mods: [Adds Physical Damage to Attacks, Increased Damage with Bow Skills, Projectile Speed, Increased Attack Speed, Critical Damage Bonus, Attack Critical Hit Chance]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, +Maximum Life, Cold Resistance, Critical Hit Chance]
      runes: ["Soul Core of Cholotl: Convert 40% of Requirements to Dexterity"]
    body:
      unique: "Hyrri's Ire"
      runes: ["3× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Secured Wraps
      mods: [Increased Effect of Socketed Items, Adds Physical Damage to Attacks, Adds Lightning Damage to Attacks, Adds Cold Damage to Attacks, Increased Attack Speed, Critical Damage Bonus]
      runes: ["Idol of Sirrius: 8% increased Attack Speed", "Cat Idol: 25% increased Accuracy Rating", "Soul Core of Tacati: +13% to Chaos Resistance"]
    boots:
      base: Daggerfoot Shoes
      mods: [Increased Effect of Socketed Items, Movement Speed, Deflection, +Maximum Life, Cold Resistance, Evasion and Energy Shield]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Soul Core of Quipolatl: 15% reduced Slowing Potency of Debuffs on You", "Soul Core of Tacati: +13% to Chaos Resistance"]
    amulet:
      unique: "Serpent's Egg"
    ring1:
      base: Prismatic Ring
      mods: [Lightning Resistance, Cold Resistance, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks]
    ring2:
      base: Prismatic Ring
      mods: [Mana Leech, Cold Resistance, Adds Cold Damage to Attacks, Adds Lightning Damage to Attacks]
    belt:
      unique: "Headhunter"
passives:
  attribute: dex
  path:
    - "Escape Velocity"
    - "Maiming Strike"
    - "Acceleration"
    - "Coming Calamity"
    - "Beastial Skin"
    - "Master Fletching"
    - "Resonance"
    - "Killer Instinct"
    - "Fervour"
    - "Feathered Fletching"
    - "Sniper"
    - "Kite Runner"
    - "Wrapped Quiver"
    - "Blur"
    - "Savagery"
    - "Heartstopping"
    - "Struck Through"
    - "Death from Afar"
    - "Precision Salvo"
  ascendancy: [Gathering Winds, Endless Munitions, Called Shots]
  weaponSet1: [Harness the Elements, Primal Sundering, Catalysis]
  weaponSet2: [Material Solidification, First Approach]
farming:
  clear: 3
  single: 3
  tank: 1
  speed: 3
  style: ranged
  traits: [evasion]
---
## How It Works

[[Spiral Volley]] fires 29 arrows in a 360-degree spiral, one of the most efficient single-click clears in the game, but it deals a fraction of its damage without Frenzy Charges. Armour Break III and Enduring Impact II on Spiral Volley generate Endurance Charges, which the **Resonance** keystone converts to Frenzy Charges; with two sources, each cast usually refunds some or all of its charges if it hits a few monsters. Serpent's Egg adds more. [[Snipe]] with Perfected Endurance gives the first charge whenever you run out.

For single target, [[Lightning Rod]] places rods that explode (up to 8 times each) whenever [[Lightning Arrow]] chains to them: pre-stack several before shooting. [[Barrage]] multiplies Lightning Arrow, and [[Tornado Shot]] absorbs arrows and spits them back out, so Lightning Arrow chains from the tornado back to your rods.

The Deadeye's Gathering Winds stacks movement speed, attack speed and evasion; Endless Munitions adds a projectile to Lightning Rod; Called Shots auto-casts Sniper's Mark, which with Resonance gives Power Charges for Charge Regulation. Point Blank helps while levelling; swap it for Far Shot at level 54, which Spiral Volley benefits from much more.

## Leveling

Until level 54, Lightning Arrow and Lightning Rod are both your clear and single target: shoot a few rods, then Lightning Arrow. Freezing Salvo bursts tanky enemies and hordes in the early acts. At level 54, with Resonance allocated, switch to Spiral Volley for clear, cut a new level 1 Lightning Arrow just to trigger your rods (for its lower mana cost), and keep Snipe at level 3 for a lower cost.

## Playstyle

**Mapping.** Use Spiral Volley when at least a few monsters are around, to raise the odds of regaining its Frenzy Charges. Use Snipe whenever you have none. You will get a feel for how many monsters a cast needs.

**Bossing.** Pre-stack Lightning Rods, then Barrage and Lightning Arrow through a Tornado Shot so the arrows chain back to the rods.

## Endgame Progression

- [[Herald of Thunder]] triggers effects when killing shocked enemies, a big clear boost. [[Wind Dancer]] massively increases evasion. [[Ghost Dance]] recovers energy shield based on evasion once you move to energy shield in the endgame.
- [[Tame Beast]] enables the tree nodes that grant damage near a companion; a beast with Haste Aura is the best option (its Spirit cost depends on the beast).
- Charge Regulation adds critical chance, skill speed and occasional defences when Charge Profusion II grants an Endurance Charge.
- Only physical damage breaks armour for Armour Break III, so your bow needs a decent amount of physical damage. Enduring Impact II also grants charges on heavy stuns, even when one-shotting.
- Emerald jewels are excellent: every one should have "increased bonuses gained from Equipped Quiver", paired with bow attack speed, projectile damage, terrain chain chance, movement speed, elemental damage, damage against rares and uniques, bow damage, projectile speed, attack damage, evasion or ailment magnitude. You need at least one Sapphire with Recover 2% of Mana on Kill. Against the Darkness jewels can add a lot if you build around them.

## Gear Priorities

A bow with physical and lightning damage, critical chance and + Attack levels, a quiver that works with "increased bonuses gained from Equipped Quiver" jewels, and hybrid evasion and energy shield armour: sources of life are limited.

## FAQ

**Why do I run out of Frenzy Charges?** Check that Resonance is allocated, that Spiral Volley has Armour Break II or III and Enduring Impact II, and that Snipe is linked to Perfected Endurance (not needed once a 0-charge Spiral Volley breaks armour on its own). "Monsters are Armoured" and "increased Stun Threshold" map modifiers reduce charge generation until your gear improves.

**How do I fix mana?** A good mana flask, a Sapphire with mana on kill, and mana gained per enemy killed on the bow or quiver.

**Can I play it as a Pathfinder?** Yes: since 0.4.0, the Pathfinder can sprint without being knocked down. It deals less damage overall but feels more comfortable once your gear offsets it.
