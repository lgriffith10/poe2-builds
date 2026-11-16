---
title: Twister Gemling Legionnaire
class: Mercenary
ascendancy: Gemling Legionnaire
author: Exile Codex
updated: 2026-11-07
patch: "0.5.5"
source:
  title: Gemling Legionnaire Twister Build Guide
  author: Goratha (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/gemling-legionnaire-twister-build-guide
  updated: 2026-09-19
summary: Spear Mercenary that stacks Whirling Slash stages and Barrage to fill the screen with elemental Twisters, using Gemling's gem bonuses for speed.
tags: [spear, twister, elemental, projectile, mapping]
damage: Elemental
playstyle: Ranged attack
difficulty: hard
budget: medium
tiers:
  starter: S
pros:
  - Screen-wide clear once Whirling Slash and Barrage are combined
  - Whirling Slash doubles as fast movement
  - Scales extremely well with The Taming
cons:
  - Needs two weapon sets and careful gem setup
  - Gem Studded asks you to balance support gem colours
skills:
  - gem: Twister
    supports: [Elemental Armament II, Projectile Acceleration III, Ice Bite II, Retreat II, Salvo]
    note: Main damage, weapon set 2
  - gem: Whirling Slash
    supports: [Rapid Attacks III, Rage III, Punch Through, Blind II, Maim]
    note: Builds up to three stages for multiple Twisters; also your movement. Keep it at gem level 1 and on weapon set 1.
    level: 1
  - gem: Barrage
    supports: [Rapid Casting II, Cooldown Recovery II, Prolonged Duration II, Perpetual Charge]
    note: Multiplies the next Twister cast
  - gem: Herald of Ice
    supports: [Magnified Area II, Armour Break III, Armour Explosion]
    note: Clear
  - gem: Sniper's Mark
    supports: [Efficiency II, Eternal Mark, Charge Profusion II, Prolonged Duration II, Mark of Siphoning II]
    note: Mark for rares and bosses
  - gem: Righteous Descent
    supports: [Concentrated Area, Fist of War III, Elemental Armament II]
  - gem: Purity of Ice
    supports: [Vitality II, Precision II, Cool Headed]
    note: Aura
  - gem: Wind Dancer
    supports: [Blind II, Freeze, Magnified Area II, Ambush]
    note: Defensive buff
  - gem: Combat Frenzy
    supports: [Charge Profusion II]
    note: Frenzy charges for Barrage
  - gem: Berserk
    supports: [Vitality I]
    note: Rage buff, strong with gem quality
  - gem: Virtuous Barrier
    supports: []
  - gem: Charge Regulation
    supports: []
gemPriority:
  skills:
    - label: "Act I"
      gems: [Whirling Slash, Twister, Frost Bomb, Barrage, Ice-Tipped Arrows]
    - label: "Act Ii"
      gems: [Freezing Mark]
  spirit:
    - label: "Act I"
      gems: [War Banner, Herald of Ice, Wind Dancer]
  supports:
    - label: "Act I"
      gems: [Rage I, Rapid Attacks I, Retreat I, Projectile Acceleration I]
    - label: "Act Ii"
      gems: [Salvo]
leveling:
  - name: "Leveling"
    steps:
      - name: "Twister Leveling"
        skills:
          - gem: "Whirling Slash"
            supports: [Rage I, Rapid Attacks I]
          - gem: "Twister"
            supports: [Retreat I, Frost Nexus, Projectile Acceleration I, Salvo]
          - gem: "Frost Bomb"
          - gem: "Barrage"
            supports: [Rapid Casting I]
          - gem: "Ice-Tipped Arrows"
            supports: [Rapid Casting I]
          - gem: "War Banner"
            supports: [Prolonged Duration I]
          - gem: "Freezing Mark"
            supports: [Mark of Siphoning, Charged Mark]
          - gem: "Purity of Lightning"
      - name: "Early Maps"
        skills:
          - gem: "Virtuous Barrier"
          - gem: "Righteous Descent"
            supports: [Concentrated Area, Fist of War III, Elemental Armament II]
          - gem: "Purity of Ice"
            supports: [Vitality II, Precision II, Cool Headed]
          - gem: "Wind Dancer"
            supports: [Blind II, Freeze, Magnified Area II, Ambush]
          - gem: "Whirling Slash"
            supports: [Rapid Attacks III, Rage III, Punch Through, Blind II, Maim]
          - gem: "Combat Frenzy"
            supports: [Charge Profusion II]
          - gem: "Barrage"
            supports: [Rapid Casting II, Cooldown Recovery II, Prolonged Duration II, Perpetual Charge, Olroth's Conviction]
          - gem: "Twister"
            supports: [Elemental Armament II, Projectile Acceleration III, Ice Bite II, Retreat II, Salvo]
          - gem: "Herald of Ice"
            supports: [Magnified Area II, Armour Break III, Armour Explosion, Uruk's Smelting]
          - gem: "Sniper's Mark"
            supports: [Efficiency II, Eternal Mark, Charge Profusion II, Prolonged Duration II, Mark of Siphoning II]
          - gem: "Berserk"
            supports: [Vitality I]
          - gem: "Charge Regulation"
    rotations:
      - name: "Clear"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Twister"
      - name: "Single Target"
        steps:
          - gem: "Whirling Slash"
            count: 3
          - gem: "Ice-Tipped Arrows"
          - gem: "Barrage"
          - gem: "Twister"
rotations:
  - name: "Clear"
    steps:
      - gem: "Whirling Slash"
        count: 3
      - gem: "Barrage"
      - gem: "Twister"
  - name: "Single Target"
    steps:
      - gem: "Whirling Slash"
        count: 3
      - gem: "Barrage"
      - gem: "Sniper's Mark"
      - gem: "Twister"
gear:
  weapon:
    unique: Skysliver
    note: Weapon set 1 for Whirling Slash. A rare Akoyan Spear with physical damage and critical strike chance goes in set 2.
    runes: ["Soul Core of Quipolatl: 5% increased Attack Speed"]
  offhand:
    unique: Guiding Palm of the Eye
  helmet:
    base: Freebooter Cap
    mods: [Evasion Rating, +Maximum Life, Deflection, Lightning Resistance]
    runes: ["Raven-Touched Shard", "Perfect Glacial Rune: +22% to Cold Resistance", "Greater Desert Rune: +18% to Fire Resistance"]
  body:
    base: Slipstrike Vest
    mods: [Evasion Rating, +Maximum Life]
    runes: ["2× Greater Iron Rune: 18% increased Armour, Evasion and Energy Shield"]
  gloves:
    base: Runeforged Polished Bracers
    mods: [Evasion Rating, Adds Physical Damage to Attacks, Adds Fire Damage to Attacks, Lightning Resistance]
    runes: ["Kolr's Hunt: Can roll Marksman modifiers"]
  boots:
    base: Treerunner Shoes
    mods: [+Maximum Life, Evasion Rating, Fire Resistance]
    note: Movement speed is optional, Whirling Slash is your movement.
    runes: ["Greater Desert Rune: +18% to Fire Resistance", "Greater Storm Rune: +18% to Lightning Resistance"]
  amulet:
    unique: Yoke of Suffering
  ring1:
    unique: The Taming
    note: The biggest upgrade; Berek's rings work as a cheaper stand-in.
  ring2:
    base: Gold Ring
    mods: [+Maximum Life, Adds Physical Damage to Attacks, +Strength, +Intelligence, Elemental Resistances]
  belt:
    unique: Darkness Enthroned
    runes: ["Fox Idol", "Idol of Eramir"]
  weapon2:
    base: Akoyan Spear
    mods: [Increased Physical Damage, Adds Physical Damage, Critical Hit Chance]
  offhand2:
    unique: Guiding Palm of the Eye
passives:
  attribute: dex
  path:
    - Remorseless
    - Avoiding Deflection
    - Enduring Deflection
    - Stupefy
    - Dizzying Hits
    - The Fabled Stag
    - Heartstopping
    - Heartbreaking
    - Struck Through
    - Fervour
    - Enhanced Reflexes
    - Trained Deflection
    - Catalysis
    - Dance with Death
    - Acceleration
    - The Wild Cat
    - Focused Thrust
    - Catapult
  ascendancy: [Essence of Virtue, Advanced Thaumaturgy, Gem Studded, Integrated Efficiency]
  weaponSet1: [Stimulants, Roll and Strike, Precise Point, Versatile Arms, Bond of the Wolf]
  weaponSet2: [Prolonged Assault, Coming Calamity, Material Solidification, Maiming Strike, Javelin, Crystal Elixir, The Frenzied Bear]
farming:
  clear: 3
  single: 2
  tank: 2
  speed: 3
  style: ranged
  traits: []
---

## How It Works

[[Twister]] and [[Whirling Slash]] are combo skills. Each Whirling Slash adds a stage, up to three, and a Twister thrown right after splits into several Twisters. [[Barrage]] then multiplies that cast again, so a full sequence fills the screen.

Twister also takes on the element of the ground it passes over. With [[The Taming]], wind skills count as empowered by chilled, shocked and ignited ground at the same time, which is why it is the single most important upgrade. Before that, shattering with cold creates chilled ground for the same effect.

The Gemling Legionnaire ascendancy makes the combo faster: Advanced Thaumaturgy gives Whirling Slash attack speed, Twister projectile speed and Barrage a chance not to consume frenzy charges. Gem Studded rewards a balanced mix of red, green and blue support gems; fill spare sockets in throw-away skills to hit the thresholds. Integrated Efficiency adds even more skill speed to Whirling Slash.

## Setup

- Put [[Whirling Slash]] on **weapon set 1** and every other skill on **weapon set 2**. This matters: Skysliver powers the slashes while the second spear carries the Twisters.
- Keep [[Whirling Slash]] at **gem level 1** for its low mana cost. Once you have attack speed, you will use it to move.

## Playstyle

**Mapping.** Slash three times through a pack, fire [[Barrage]], then throw [[Twister]]. [[Herald of Ice]] chains the clear.

**Bossing.** Apply [[Sniper's Mark]], build three [[Whirling Slash]] stages, then repeat [[Barrage]] + [[Twister]] while keeping [[Berserk]] and [[Combat Frenzy]] up.

## Endgame Progression

**Weapon sets.** Set 1 makes Whirling Slash as fast as possible: rush Dance with Death on the tree and skip the off-hand. A Winged Spear from Act 2, with any early Essence of Haste, lasts until maps; Skysliver is the option if you have currency. Set 2 is for Twister damage: as much flat elemental damage as possible, attack speed does not matter there. Use a buckler early to Parry into Fangs of Frost (mostly Act 1), then a Spirit sceptre for more Spirit gems.

**Early maps.**
- The Taming is the single biggest upgrade: all three ground effects at once, more Twister damage and an easier rotation. If you cannot afford it yet, Berek's Grip, Berek's Pass or Berek's Respite work.
- Yoke of Suffering is a strong damage amulet usable from low level and well into the endgame. Thrillsteel speeds up Whirling Slash while levelling.
- Sceptre: Guiding Palm of the Eye for damage. Sacred Flame is more expensive and needs you out of enemies' presence, which does not combine well with Rakiata's Flow later.
- Lavianga's Spirits in the mana flask slot, best with physical damage leeched as mana on gloves or a ring; it enables passives such as Stimulants for an even faster Whirling Slash.
- You move with Whirling Slash, so boots can skip movement speed for evasion and life.

**Endgame.**
- Body armour: Loreweave with the Polcirkeln modifier supercharges clear with Herald of Ice and armour explosions, but frenzy charges get harder (Freeze support and Pressure Points help). If you struggle defensively, a pure evasion chest is much tankier for less damage. Perfidy can be instilled if it has the "Raven-touched" modifier.
- Second spear: high physical damage with critical chance, critical damage bonus and + projectile levels. The Ordained is hard to replace for its critical chance.
- Darkness Enthroned with the body armour modifier and a Fox Idol for gem quality. An Absent Amulet with Eternal Rage pairs with Berserk: instill Paragon (Ferocity, Isolation, Despair) for gem quality, and roll a Kurgal Preserved Collarbone suffix for up to 5% skill gem quality.
- Evasion on boots, gloves and helmet. Boots can roll skill effect duration and chance not to consume charges (Uhtred's Sidereus), gloves projectile levels and projectile speed (Kolr's Hunt).

**Min-max.** Mageblood with Silver, Jade and Diamond. Rite of Passage (Cat is best and most expensive). A Soaring Spear with attack speed and the Celestial Alloy prefix, filled with Soul Cores of Quipolatl, maximises Whirling Slash speed.

## Gear Priorities

[[The Taming]] first, then [[Skysliver]] and a strong second spear. Evasion and Deflection on helmet, gloves and boots, and life everywhere. [[Yoke of Suffering]] and [[Guiding Palm of the Eye]] are strong damage pieces; [[Darkness Enthroned]] boosts socketed items.

## FAQ

**Which skills go on which weapon set?** [[Whirling Slash]] on weapon set 1 (it matters later for [[Rigwald's Ferocity]]) and [[Twister]] on weapon set 2. Enable spirit gems in the order you want them active across swaps: [[Wind Dancer]] and [[Berserk]] should be the first ones enabled, at the top of your gem list, so they stay on for both sets.

**How do I sustain mana?** [[Lavianga's Spirits]] and physical damage leeched as mana on gloves, rings or the weapon should be enough; [[Oisín's Oath]] on Twister is a backup that should not be needed. Keeping [[Whirling Slash]] at gem level 1 is very important.

**I feel squishy, what can I do?** The build has damage to spare, so take fewer damage nodes and more evasion or evasion/energy shield nodes. You can also run [[Berserk]] on weapon set 2 only to reduce its degeneration.

**Do I have to use Salvo?** [[Salvo]] feels best in indoor areas. If you dislike it on outdoor maps, [[Deliberation]] or [[Ice Bite II]] are more consistent alternatives.

**Why am I having attribute problems?** Keep your Strength and Intelligence spirit gems at low levels, especially [[Berserk]].
