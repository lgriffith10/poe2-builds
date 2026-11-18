---
title: "Vaal Temple"
summary: "Energized Crystals, a temple board to plan and rooms that upgrade each other: how the Vaal Temple (Incursion) works, what its rooms give, how to profit and which builds handle it."
hub: "The Lira Vaal city, north on the Atlas"
pinnacle: "Atziri, the Red Queen"
rewards:
  - "Room bonuses"
  - "Double corruption"
  - "Soul Cores"
  - "Vault rewards"
  - "Medallions"
demands:
  clear: 2
  single: 3
  tank: 3
  speed: 1
updated: 2026-11-18
sources:
  - title: "Vaal Temple Basics (Maxroll)"
    url: https://maxroll.gg/poe2/resources/vaal-temple-basics
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

Kill the corrupted monsters in the Vaal circles that appear in maps to collect Energized Crystals; six open a portal to the Vaal ruins. The Lira Vaal city, north on the Atlas, has guaranteed beacons and gives Fate of the Vaal Atlas points. In the temple console you place six rooms per run on an 80-square board and connect them. Rooms upgrade each other when placed next to the right neighbour (hold ALT on a room to see which), up to tier 3: higher tiers are harder and pay more. After each run part of the temple **destabilises** and disappears, much more after killing the Architect or Atziri.

```flow
caption: "How a temple run works"
steps:
  - title: "Collect crystals"
    text: "Kill corrupted monsters in Vaal circles; six Energized Crystals open the portal."
  - title: "Place six rooms"
    text: "On the 80-square board, place and connect six rooms per run."
  - title: "Upgrade by adjacency"
    text: "Rooms next to the right neighbour upgrade, up to tier 3 (hold ALT to see which)."
  - title: "Run the temple"
    text: "Higher tiers are harder and pay more; bonuses stack over the whole temple."
  - title: "Survive destabilisation"
    text: "Part of the temple disappears after each run; lock key rooms with Juatalotli's Medallion."
```

## What You Get

- **Room bonuses** stack over the whole temple: Alchemy Labs and Smithies raise item rarity, Garrisons and Commanders add and strengthen monsters, Synthflesh Labs raise experience. A tier 3 Flesh Surgeon replaces one of your limbs with a mechanical one, an extra modifier until you die.
- **Vaal crafting** in the best rooms: corrupting an already corrupted item a second time, ancient Soul Cores from Vaal Constructs, and special affixes on corrupted Vaal uniques.
- **Restricted rooms**, unlocked by beating the Architect, are one-time vaults: currency (Kishara's Vault), a Lineage Support (Vault of Reverence), a rune, Precursor Tablets, a unique, or a bench that destroys an item and returns its socketed rune. The Royal Access Chamber opens the path to Atziri.
- **Medallions** shape the board: Juatalotli's locks a room against destabilisation (the most important one), Quipolatl's upgrades a room, others reroll or add rooms.

## Making Currency

- Build a long chain of rooms (a "snake") around rarity and monster rooms, and lock its end with a Juatalotli's Medallion so the whole chain survives destabilisation.
- Place the Architect early in a good spot, then skip him and Atziri while the temple is growing: both wipe large parts of it.
- Sell what the vaults give: Lineage Support gems, uniques, Tablets and Soul Cores.
- Double corruption is a gamble: use it on items you can afford to lose, or on cheap uniques that become valuable with the right outcome.

```loot
caption: "Temple loot, from room to currency"
items:
  - item: "Vault rewards"
    use: "One-time vaults: currency, Lineage Supports, uniques, Tablets, runes"
    sell: "Sell what you do not use"
    value: high
  - item: "Vaal crafting"
    use: "Double corruption, ancient Soul Cores, Vaal unique affixes"
    sell: "Gamble on items you can lose or cheap uniques"
    value: medium
  - item: "Soul Cores"
    use: "Sockets with strong modifiers"
    sell: "Sell the valuable ones"
    value: medium
  - item: "Medallions"
    use: "Lock, upgrade, reroll or add rooms"
    sell: "Keep Juatalotli's: it protects your chain"
    value: low
```

## Farming Strategy and Atlas Tree

The temple pays when a long chain of upgraded rooms survives from run to run. So the first nodes go to Medallions, since Juatalotli's is what locks rooms, and to room strength, up to tier 4 rooms. Then take Atziri's vault and the duplication of Temple currency, then the restricted rooms. The beacon nodes only change Vaal Beacons in your maps: take them last, or earlier if you collect a lot of crystals in maps.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list. This order is our own reading of the tree, built around the strategy above.

```atlas
tree: Incursion
order:
  - node: Stolen Authority
    note: "35% more Medallions."
  - node: The Lost Architect
    note: "Unique temple monsters can drop Zantipi's Medallion."
  - Training and Preparation
  - Power Relays
  - Efficient Arteries
  - Xipocado's Machinations
  - node: Transcendent Progress
    note: "Rooms can reach tier 4."
  - Bloodrite Vestments
  - node: Riches of the Empire
    note: "Temple currency can be duplicated."
  - node: Atziri's Assets
    choice: Temple Currency
    note: "Or a Medallion while you are still building your board."
  - Protected Treasures
  - Expanded Designs
  - Secrets of the Ancients
  - Royal Prerogative
  - Offerings to the Queen
  - Military Reinforcements
  - Patrolling Legions
  - Loyal Gatekeepers
```

## Which Builds Fit

It suits sturdy builds that kill both packs and bosses: upgraded rooms raise monster power across the board, and the Architect and Atziri are real boss fights. It also asks for planning more than any other mechanic.
