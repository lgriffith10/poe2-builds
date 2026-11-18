---
title: "Expedition"
summary: "Explosives, Remnants and Logbooks: how Expedition works, what Runeforging loot and Remnant rewards are worth, how to profit and which builds survive the dangerous Remnants."
hub: "The Ruins of Kingsmarch, on the coast south-east of the Atlas start"
pinnacle: "The Aberration, at the Shattered Triskelion (after the Expedition bosses)"
rewards:
  - "Runes and Verisium"
  - "Logbooks and Sagas"
  - "Remnant currency"
  - "+1 passive point (once)"
demands:
  clear: 2
  single: 3
  tank: 3
  speed: 1
loot:
  exchange: ["Expedition"]
  items: ["Olroth's Reliquary Key", "Shattered Triskelion", "The Triskelion Reforged", "Medved's Felling", "Vorana's Siege", "Uhtred's Exodus", "Uhtred's Augury", "Uhtred's Omen", "Uhtred's Rite", "Uhtred's Constellation", "Olroth's Conviction", "Olroth's Hubris", "Styrn's Ferocity", "Styrn's Mountain"]
updated: 2026-11-18
sources:
  - title: "Expedition (Maxroll)"
    url: https://maxroll.gg/poe2/resources/expedition
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

Place a fuse line of explosives (the button left of the skill bar), then hit the detonator. Everything inside the blast radius is unearthed: **Runic monsters** (red flags), **Remnants** (floating rocks) and chests. A Remnant has three to ten runes; each rune adds a wave of monsters, and higher rune counts offer better loot. Click a Remnant first to pick which reward it gives. Remnant modifiers make the monsters much more dangerous, so read them.

The Ruins of Kingsmarch, on the coast south-east of the Atlas start, lead to the ocean. **Logbooks** reveal new islands; Grand Expeditions (tier 6+, jagged edges) are one huge dig site with fifteen explosives, with no monsters until you unearth them and sometimes Mysterious Chests full of a single reward type. Bosses (Medved, Vorana, Uhtred, Olroth, and Styrn in a hidden tomb) lead to the Shattered Triskelion and the pinnacle fight with The Aberration.

```flow
caption: "How an Expedition plays out"
steps:
  - title: "Place the explosives"
    text: "Lay a fuse line with the button left of the skill bar, through Remnants and chests."
  - title: "Pick the Remnant rewards"
    text: "Click each Remnant first: it offers a reward and adds Runic modifiers."
  - title: "Detonate"
    text: "Everything in the blast radius is unearthed: Runic monsters, Remnants and chests."
  - title: "Kill what comes out"
    text: "Each rune on a Remnant adds a wave of monsters, stronger with its modifiers."
  - title: "Sail further"
    text: "Logbooks reveal islands and Grand Expeditions, on the way to the bosses."
```

## What You Get

Runes, Verisium, Alloys and Fluxes for Runeforging and Ward, Kalguuran skill gems, Sagas (they force a given boss to appear in your next Logbook) and Crests. Remnants can also offer currency (up to ten Divine Orbs at once) or, once, a permanent character bonus: **+1 passive skill point**, +10 Spirit or +5% to elemental resistances. Expedition is the only endgame content that can give an extra passive point.

## Making Currency

- Pick currency on Remnants when nothing better is offered, and favour Remnants with many runes and purple pre-socketed runes.
- Sell Logbooks, Sagas, Alloys, Fluxes and Verisium in bulk.
- In a Grand Expedition without a good Remnant, detonate one explosive near the start and move on: it is not worth the time.
- Rare chests and Runic monsters in normal maps also drop Logbooks: unearth them on the way.

```loot
caption: "Expedition loot, from drop to currency"
items:
  - item: "Remnant rewards"
    use: "Currency (up to ten Divine Orbs) or a permanent bonus such as +1 passive point"
    sell: "Take currency when nothing better shows; favour many runes"
    value: high
  - item: "Runes, Verisium, Alloys, Fluxes"
    use: "Runeforging and Ward"
    sell: "Sell in bulk"
    value: medium
  - item: "Logbooks and Sagas"
    use: "Reveal islands; force a given boss"
    sell: "Sell in bulk, or run them yourself"
    value: medium
  - item: "Kalguuran skill gems"
    use: "Expedition-only skills"
    sell: "Sell what you do not use"
    value: low
```

## Farming Strategy and Atlas Tree

Expedition money comes from Remnants: more of them, more Runic modifiers on them, and more loot for each modifier. Take Expanding Territory for the extra Remnant first, then Gaining Traction and Calculated Investment, which turn every modifier into more and better loot. Logbooks come next, then the explosive and Grand Expedition nodes. Double or Nothing raises the stakes: take its extra modifier only if your build survives dangerous Remnants. Cultivate the Sea, a biome choice for ocean maps, is left out. In maps, run Ocean maps and Grand Expeditions and unearth every Runic monster on the way: they drop Logbooks.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list. This order is our own reading of the tree, built around the strategy above.

```atlas
tree: Expedition
order:
  - node: Expanding Territory
    choice: 10% chance for an additional Verisium Remnant Encounter
  - node: Gaining Traction
    note: "Each Remnant completed in the area raises monster rarity by 50%."
  - node: Calculated Investment
    choice: 1% increased Quantity of Items per Runic Modifier
  - node: Steady Development
    choice: Remnant
  - node: Sown Seeds
    note: "More Logbooks from Runic monsters."
  - Face the Past
  - node: Strategic Advantage
    choice: Explosives only wait for 50% of Monsters to be slain
    note: "Faster runs."
  - node: The Quest Continues
    note: "Grand Expeditions get up to three modifiers and one more area level."
  - node: Double or Nothing
    choice: 25% chance to add an additional Runic Modifier
    note: "More danger, more loot. Pick the option that adds no Runic modifiers if Remnants already kill you."
  - node: Feeling Lucky?
    note: "Farrow sells Liquid Verisium."
  - Buried Ambition
```

## Which Builds Fit

It suits builds with solid defences and good damage on Rares: the best rewards come with the most dangerous Remnants. Builds that love large packs can let everything unearth first, then clear it in one go.
