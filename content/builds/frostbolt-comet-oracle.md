---
title: Frostbolt Comet Oracle
class: Druid
ascendancy: Oracle
author: Exile Codex
updated: 2026-11-15
patch: "0.5.5"
source:
  title: "Frostbolt Cast On Crit Comet Oracle Build Guide"
  author: "zen_m (Maxroll)"
  url: https://maxroll.gg/poe2/build-guides/frostbolt-cast-on-crit-comet-oracle
  updated: 2026-09-03
summary: "Druid Oracle whose Frostbolts fork through Snakepit and explode across the screen, while every critical hit calls down Comets through Cast on Critical."
tags: [caster, cold, crit, freeze, energy shield, chaos inoculation]
damage: Cold / Fire
playstyle: Caster
difficulty: medium
budget: low
tiers:
  starter: A
pros:
  - "Freezes everything"
  - "High single-target damage"
  - "Easy to play once on Frostbolt"
cons:
  - "Frostbolt needs Snakepit, so it comes late"
  - "Relies on Infusion Remnants during the campaign"
skills:
  - gem: "Frostbolt"
    supports: [Projectile Acceleration III, Multishot II, Supercritical, Ice Bite II]
    weaponSet: 1
  - gem: "Cast on Critical"
    supports: [Comet, Living Bomb, Efficiency II, Supercritical]
  - gem: "Frost Wall"
    supports: [Spell Cascade, Fortress I, Supercritical, Cooldown Recovery II]
    weaponSet: 1
  - gem: "Frost Bomb"
    supports: [Overabundance I, Spell Echo, Potent Exposure, Cooldown Recovery II]
    weaponSet: 2
  - gem: "Elemental Weakness"
    supports: [Efficiency II, Prolonged Duration II, Heightened Curse, Cursed Ground]
    weaponSet: 2
  - gem: "Convalescence"
    supports: [Second Wind III, Prolonged Duration II, Cooldown Recovery II]
  - gem: "Sigil of Power"
    supports: [Prolonged Duration II, Cooldown Recovery II, Magnified Area II]
gemPriority:
  skills:
    - label: "Act I"
      gems: [Ice Nova, Frost Bomb, Frost Darts, Pounce, Snap]
    - label: "Act Ii"
      gems: [Elemental Weakness]
    - label: "Act Iii"
      gems: [Frost Wall]
    - label: "Maps"
      gems: [Comet, Living Bomb]
    - label: "Frostbolt Swap"
      gems: [Frostbolt]
  spirit:
    - label: "Act I"
      gems: [Arctic Armour]
    - label: "Act Iii"
      gems: [Siphon Elements]
    - label: "Maps"
      gems: [Cast on Critical]
    - label: "Ci"
      gems: [Convalescence]
    - label: "160 Spirit"
      gems: [Mana Remnants]
  supports:
    - label: "Act I"
      gems: [Controlled Destruction, Ice Bite I, Overabundance I, Spell Cascade, Rapid Casting I]
    - label: "Act Ii"
      gems: [Spell Echo, Considered Casting, Heightened Curse, Efficiency I]
    - label: "Act Iii"
      gems: [Astral Projection, Icicle, Spell Cascade, Elemental Focus, Cold Penetration, Cooldown Recovery I, Ice Bite II, Harmonic Remnants II, Remnant Potency I, Prolonged Duration II]
    - label: "Maps"
      gems: [Efficiency II, Supercritical, Cooldown Recovery II, Potent Exposure]
leveling:
  - name: "Campaign"
    steps:
      - name: "Act 1"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Ice Bite I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Rapid Casting I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Cascade]
          - gem: "Snap"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Pounce"
          - gem: "Arctic Armour"
      - name: "Act 2"
        skills:
          - gem: "Ice Nova"
            supports: [Controlled Destruction, Considered Casting, Ice Bite I]
          - gem: "Frost Darts"
            supports: [Controlled Destruction, Considered Casting]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo]
          - gem: "Snap"
            supports: [Magnified Area I, Controlled Destruction]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency I]
          - gem: "Pounce"
          - gem: "Arctic Armour"
      - name: "Act 3 to Maps"
        skills:
          - gem: "Ice Nova"
            supports: [Considered Casting, Astral Projection, Ice Bite II]
          - gem: "Frost Darts"
            supports: [Considered Casting, Elemental Focus, Cold Penetration]
          - gem: "Frost Wall"
            supports: [Icicle, Spell Cascade, Cooldown Recovery I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo, Cooldown Recovery I]
          - gem: "Snap"
            supports: [Magnified Area II, Elemental Focus, Cooldown Recovery I]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency I, Prolonged Duration II]
          - gem: "Pounce"
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II, Remnant Potency I]
          - gem: "Arctic Armour"
      - name: "Early Maps"
        skills:
          - gem: "Ice Nova"
            supports: [Magnified Area II, Astral Projection, Supercritical, Ice Bite II]
          - gem: "Frost Darts"
            supports: [Elemental Focus, Considered Casting, Supercritical, Cold Penetration]
          - gem: "Frost Wall"
            supports: [Spell Cascade, Icicle, Cooldown Recovery II, Fortress I]
          - gem: "Frost Bomb"
            supports: [Overabundance I, Spell Echo, Cooldown Recovery II, Potent Exposure]
          - gem: "Snap"
            supports: [Magnified Area II, Cooldown Recovery II, Elemental Focus, Rising Tempest]
          - gem: "Cast on Critical"
            supports: [Comet, Living Bomb, Efficiency II, Supercritical]
          - gem: "Elemental Weakness"
            supports: [Heightened Curse, Efficiency II, Focused Curse, Rapid Casting II]
          - gem: "Sigil of Power"
            supports: [Prolonged Duration II, Cooldown Recovery II, Magnified Area II]
          - gem: "Siphon Elements"
            supports: [Harmonic Remnants II, Remnant Potency III]
    rotations:
      - name: "Act 1"
        steps:
          - gem: "Frost Bomb"
            label: "Infusions Generator"
          - gem: "Ice Nova"
            label: "Infusions Spender"
      - name: "Act 2+"
        steps:
          - gem: "Ice Nova"
            label: "Freeze Enemies"
          - gem: "Snap"
            label: "Shater Frozen Enemies"
          - gem: "Ice Nova"
            label: "Spend Infusions"
      - name: "Single Target"
        steps:
          - gem: "Sigil of Power"
            label: "Debuffs"
          - gem: "Elemental Weakness"
          - gem: "Frost Bomb"
          - gem: "Frost Wall"
          - gem: "Ice Nova"
          - gem: "Frost Darts"
            label: "Filler"
rotations:
  - name: "Skill Rotation"
    steps:
      - gem: "Ice Nova"
        label: "Freeze Enemies"
      - gem: "Snap"
        label: "Shater Frozen Enemies"
      - gem: "Ice Nova"
        label: "Spend Infusions"
  - name: "Single Target"
    steps:
      - gem: "Sigil of Power"
        label: "Debuffs"
      - gem: "Elemental Weakness"
      - gem: "Frost Bomb"
      - gem: "Frost Wall"
      - gem: "Ice Nova"
      - gem: "Frost Darts"
        label: "Filler"
gear:
  weapon:
    base: Siphoning Wand
    mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
    runes: ["Greater Glacial Rune: Gain 10% of Damage as Extra Cold Damage"]
  offhand:
    base: Tasalian Focus
    mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, Increased Spell Damage, +Maximum Mana]
    runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
  helmet:
    base: Ancestral Tiara
    mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
    runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
  body:
    base: Vile Robe
    mods: [Energy Shield, +Spirit, Elemental Resistances]
    runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
  gloves:
    base: Pauascale Gloves
    mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
    runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
  boots:
    base: Sekhema Sandals
    mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
    runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Greater Desert Rune: +18% to Fire Resistance"]
  amulet:
    base: Amber Amulet
    mods: [+Level of all Spell Skills, +Spirit, Energy Shield, Increased Cast Speed, Elemental Resistances]
  ring1:
    unique: "Snakepit"
  ring2:
    base: Prismatic Ring
    mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
  belt:
    base: Rawhide Belt
    mods: [Elemental Resistances, +Maximum Mana, Mana Flask Recovery, Mana Regeneration]
  weapon2:
    base: Chiming Staff
    mods: [+Level of all Spell Skills, Increased Cast Speed]
gearStages:
  campaign:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
      runes: ["2× Iron Rune: 25% increased Spell Damage"]
    helmet:
      base: Hooded Mask
      mods: [+Maximum Life, Elemental Resistances]
    body:
      base: Altar Robe
      mods: [+Maximum Life, Elemental Resistances]
    gloves:
      base: Suede Bracers
      mods: [+Maximum Life, Elemental Resistances]
    boots:
      base: Hunting Shoes
      mods: [Movement Speed, +Maximum Life, Elemental Resistances]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Spell Skills, +Maximum Life, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Life, Elemental Resistances]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances]
    weapon2:
      base: Frenzied Talisman
      mods: [Increased Attack Speed]
  mapping:
    weapon:
      base: Gelid Staff
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold]
      runes: ["Iron Rune: 25% increased Spell Damage", "Storm Rune: Gain 8% of Damage as Extra Lightning Damage"]
    helmet:
      base: Sandsworn Tiara
      mods: [+Maximum Life, Energy Shield, Elemental Resistances]
      runes: ["Lesser Iron Rune: 14% increased Armour, Evasion and Energy Shield"]
    body:
      base: Vile Robe
      mods: [+Spirit, Energy Shield, +Maximum Life, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield", "Lesser Iron Rune: 14% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Pauascale Gloves
      mods: [Energy Shield, +Maximum Life, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Bound Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    amulet:
      base: Stellar Amulet
      mods: [+Level of all Spell Skills, +Spirit, Increased Cast Speed, Energy Shield, Elemental Resistances]
    ring1:
      base: Topaz Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    ring2:
      base: Sapphire Ring
      mods: [+Maximum Life, Increased Cast Speed, Elemental Resistances]
    belt:
      base: Rawhide Belt
      mods: [+Maximum Life, Elemental Resistances, +Maximum Mana, Mana Flask Recovery]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
  endgame:
    weapon:
      base: Siphoning Wand
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Gain Damage as Extra Lightning, Gain Damage as Extra Cold, Gain Damage as Extra Fire]
      runes: ["Greater Glacial Rune: Gain 10% of Damage as Extra Cold Damage"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, Increased Spell Damage, +Maximum Mana]
      runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
    body:
      base: Vile Robe
      mods: [Energy Shield, +Spirit, Elemental Resistances]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield", "Lesser Iron Rune: 14% increased Armour, Evasion and Energy Shield"]
    gloves:
      base: Pauascale Gloves
      mods: [Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Iron Rune: 16% increased Armour, Evasion and Energy Shield"]
    boots:
      base: Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Farrul's Rune of the Chase: 5% increased Movement Speed", "Greater Desert Rune: +18% to Fire Resistance"]
    amulet:
      base: Amber Amulet
      mods: [+Level of all Spell Skills, +Spirit, Energy Shield, Increased Cast Speed, Elemental Resistances]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Prismatic Ring
      mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
    belt:
      base: Rawhide Belt
      mods: [Elemental Resistances, +Maximum Mana, Mana Flask Recovery, Mana Regeneration]
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
  minmax:
    weapon:
      base: Attuned Wand
      mods: [+Level of all Cold Spell Skills, +Level of all Spell Skills, Spell Critical Hit Chance, Increased Spell Damage, Gain Damage as Extra Lightning, Gain Damage as Extra Cold]
      runes: ["Hedgewitch Assandra's Rune of Wisdom: +1 to Level of all Spell Skills", "Saqawal's Rune of the Sky: Gain 5% of Damage as Extra Damage of all Elements"]
    offhand:
      base: Tasalian Focus
      mods: [+Level of all Spell Skills, Spell Critical Hit Chance, Energy Shield, Increased Cast Speed, +Maximum Mana, Increased Cold Damage]
      runes: ["Perfect Iron Rune: 20% increased Physical Damage"]
    helmet:
      base: Ancestral Tiara
      mods: [Energy Shield, Mana Cost Efficiency, Elemental Resistances]
      runes: ["Idol of Eeshta: 15% increased Cost Efficiency", "Raven-Touched Shard"]
    body:
      base: Sacramental Robe
      mods: [Energy Shield, Elemental Resistances, +Attributes]
      runes: ["Fox Idol: Idols socketed in this item gain the benefits of their Bonded modifiers", "Craiceann's Rune of Recovery: 30% increased Energy Shield Recharge Rate", "Craiceann's Rune of Warding: 50% reduced effect of Curses on you"]
    gloves:
      base: Sirenscale Gloves
      mods: [Energy Shield, Critical Damage Bonus, Elemental Resistances]
      runes: ["Courtesan Mannan's Rune of Cruelty: 20% increased Magnitude of Damaging Ailments you inflict", "Fenumus' Rune of Spinning: 8% increased Cast Speed"]
    boots:
      base: Runeforged Sekhema Sandals
      mods: [Movement Speed, Energy Shield, Elemental Resistances, +Maximum Mana]
      runes: ["Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield", "Farrul's Rune of the Chase: 5% increased Movement Speed"]
    amulet:
      base: Absent Amulet
      mods: [+Level of all Spell Skills, +Spirit, Increased Cast Speed, Energy Shield, Elemental Resistances]
    ring1:
      unique: "Snakepit"
    ring2:
      base: Prismatic Ring
      mods: [Increased Cast Speed, Elemental Resistances, +Maximum Mana]
    belt:
      unique: "Mageblood"
    weapon2:
      base: Chiming Staff
      mods: [+Level of all Spell Skills, Increased Cast Speed]
passives:
  attribute: int
  path:
    - "Relentless Vindicator"
    - "Bolstering Presence"
    - "All Natural"
    - "Wildsurge Incantation"
    - "Illuminated Crown"
    - "Power of the Storm"
    - "Explosive Impact"
    - "Enhanced Barrier"
    - "Dependable Ward"
    - "Blackflame Covenant"
    - "Patient Barrier"
    - "Ether Flow"
    - "Whispers of Doom"
    - "Archon of the Storm"
    - "Chaos Inoculation"
    - "Conduit"
    - "Abasement"
    - "Invocated Efficiency"
    - "Shimmering Mirage"
    - "Pure Chaos"
    - "Mental Alacrity"
    - "Dreamcatcher"
    - "Invigorating Archon"
    - "Harsh Winter"
    - "Power Conduction"
    - "Mind Eraser"
  ascendancy: [The Unseen Path, Entwined Realities, The Lesser Harm, Forced Outcome]
  weaponSet1: [Desensitisation, Comradery, Cower Before the First Ones, Glaciation, Endless Blizzard, Turn the Clock Forward]
  weaponSet2: [Master of Hexes, Lingering Whispers, Stripped Defences, Fated End]
---
## How It Works

[[Frostbolt]] normally pierces and hits each enemy once. With **Snakepit in the left ring slot** it forks instead and explodes after forking, so overlapping explosions hit packs many times. [[Frost Wall]] creates Ice Crystals that Frostbolt shatters in a chain of explosions, and every critical hit feeds [[Cast on Critical]], which triggers [[Comet]] (with Living Bomb providing the fire remnants that double Comet's damage). Forced Outcome makes all your hits critical at the cost of critical damage: aim for 30-40% critical chance to reduce the penalty. The Unseen Path reveals hidden nodes only the Oracle can see.

The early game is a life and energy shield hybrid, much easier to gear than pure life or pure energy shield. Later you switch to Chaos Inoculation for a bigger effective health pool and immunity to chaos damage and bleeding.

## Leveling

Use Shred and Volcano to Clearfell, then [[Ice Nova]] and [[Frost Bomb]], with [[Frost Darts]] from level 3 for bosses and tough rares. Both rely on Cold Infusion Remnants: without them they deal three times less damage. Generate them with Frost Bomb and, later, by shattering frozen enemies with [[Snap]]. Use Frost Wall on bosses and rares and detonate it with Ice Nova (or Snap if the enemy is frozen). At level 58, add Cast on Critical with Comet and Living Bomb. Cold skills cost a lot of mana: use the best mana flask with increased amount recovered, or Mana Drain from an Attuned Wand in weapon set 2. A talisman in weapon set 2 gives [[Pounce]] for mobility.

## Playstyle

**Mapping (with Snakepit).** Cast Frostbolt; block and kill tougher enemies with Frost Wall, and use Frost Bomb for Exposure.

**Bossing.** Cast [[Sigil of Power]], [[Elemental Weakness]] and Frost Bomb at the start and stand in the Sigil. Place Frost Walls next to the boss and detonate them with Frostbolt to rain Comets.

## Endgame Progression

**Early maps.**
- Prioritise energy shield on top of some life, and increased energy shield recharge on helmet, body armour, gloves and boots. At least +30 Spirit on the body armour or amulet.
- The weapon is your biggest damage upgrade: + Cold Spell or + Spell levels. A Chiming Staff as main weapon, or in weapon set 2 instead of the talisman, enables Sigil of Power.
- At 5,000-6,000 energy shield, allocate Chaos Inoculation and stop caring about life and chaos resistance.
- Two jewels with "Recover 2% of Maximum Mana on Kill" fix mana while clearing; with 160 Spirit, Mana Remnants helps further. Keep Living Bomb at level 3 to lower its cost.

**Endgame.**
- Time-Lost Sapphires are the best later upgrades: they work very well with Entwined Realities, which lets you allocate nodes without travelling to them.
- An Absent Amulet with the Cast on Critical implicit runs a second Cast on Critical setup for no extra Spirit; otherwise at least high Spirit and +2 to Spell Skills.
- A Raven-Touched Shard in the helmet allows a helmet anoint: Zarokh's Gift for an extra jewel socket. Heroic Tragedy turns Mind Over Matter and Elemental Equilibrium into beneficial keystones and transforms nearby notables; look for Natural Energies or Steel Bastion.
- Rite of Passage: Spirit of the Cat (critical chance, cast speed, movement speed), or Owl for defence, or Stag for lightning damage. Aim for about 100% increased item rarity. Mageblood (Quicksilver, Gold, Diamond, Bismuth, Silver) and Headhunter are the chase items.
- Rakiata's Flow is a strong lineage support for Frostbolt while mapping only, since it weakens your boss setup. Boundless Energy II in one setup desynchronises Comet procs. With 500%+ critical damage, replace Supercritical everywhere.

**Min-max.** Temporalis cuts all cooldowns by up to 2 seconds (2.4 corrupted), which with + Blink levels makes the build one of the fastest in the game. A corrupted Runeseeker's Call with six runes and Legacy of Lifesprig is the best weapon (+9 to Spell Skills). Such levels push mana costs very high: offset them with a mana cost efficiency ring and a Time-Lost Sapphire with the desecrated mana cost efficiency modifier. With enough damage, Snakepit becomes optional (anoint Cooked instead of Split Shot), or anoint Dominion for a permanent, weaker Elemental Archon. Spark also becomes a viable main skill.

## Gear Priorities

+ Cold and Spell levels on the weapon, Snakepit in the left ring, then energy shield, energy shield recharge, cast speed on rings and amulet, and Spirit.

## FAQ

**Can I use Frostbolt before Snakepit?** No. Unless you can equip Snakepit at level 32, level with Ice Nova and Frost Darts.

**How do Cold Infusion Remnants work?** Skills like Frost Bomb drop them on the ground; pick them up to empower your next Ice Nova or Frost Darts. You hold up to 3 (Frozen Limit and Infused Limits raise it). Shattering enemies with Snap and freezing them while affected by Siphon Elements also create them.

**How does Cast on Critical charge?** Each critical hit generates energy by enemy rarity: 1 for normal, 2 for magic, 5 for rare and 20 for unique. A Comet costs 300 energy, so you need many frozen enemies.

**My Frostbolts still seem to pierce.** They cannot with Snakepit in the left ring (unless the modifier was removed with a Vaal Cultivation Orb): what you see is Frostbolt forking into two projectiles that then explode. Test it on a Frost Wall in your hideout.

**How do I stay alive in the campaign?** The Druid has few defensive options in the first three acts: scale life and resistances, and use armour bases with some Strength. Around Act 4, move to energy shield. Cast Frost Wall often to block and freeze enemies.
