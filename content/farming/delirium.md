---
title: "Delirium"
summary: "A fog to keep pace with, Distilled Emotions and the Simulacrum: how Delirium works, what its loot is for, how to profit and which builds keep up with it."
hub: "The Withered Willow and the maps around it"
pinnacle: "Tang'Mazu, through the Simulacrum and Raven's Reflection"
rewards:
  - "Distilled Emotions"
  - "Simulacrum Splinters"
  - "Instilled amulets"
  - "Tang'Mazu's uniques"
demands:
  clear: 3
  single: 2
  tank: 2
  speed: 3
loot:
  exchange: ["Delirium"]
  items: ["Simulacrum", "Simulacrum Splinter", "Raven's Reflection", "Tangmazu's Reliquary Key"]
  uniques: ["Veilpiercer", "Sadist's Mercy", "The Auspex", "Horror's Flight", "The Raven's Flock", "Split Personality"]
updated: 2026-11-18
sources:
  - title: "Delirium (Maxroll)"
    url: https://maxroll.gg/poe2/resources/delirium
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

Walk through the mirror at the start of the map and a fog spreads forward across it. The fog adds Delirium monsters and makes every monster tougher and more rewarding the further it is from the mirror. Keep up: spending more than four seconds outside the fog ends the encounter. Fracturing Mirrors along the way release extra packs, and the progress bar shows what is left before the boss: extra Rares, the unique bosses Kosis and Omniphobia, and the Loathsome Mire, a side area that ends with an amulet carrying two instilled notables.

The questline starts at the Withered Willow. Each map around it counts once you kill its boss under the effect of the mirror, gives a Delirium Atlas point and raises the area's deliriousness. At 100% a **Simulacrum** appears: waves of increasingly hard monsters, each with random negative modifiers, and Kosis at the top. It drops Raven's Reflection, which opens the pinnacle fight with Tang'Mazu.

```flow
caption: "How a Delirium map plays out"
steps:
  - title: "Walk through the mirror"
    text: "The fog starts at the mirror and spreads forward across the map."
  - title: "Stay in the fog"
    text: "Monsters get tougher and richer the further you go. More than four seconds outside ends it."
  - title: "Break the Fracturing Mirrors"
    text: "They release extra packs and fill the progress bar."
  - title: "Reach the rewards"
    text: "Extra Rares, Kosis or Omniphobia, the Loathsome Mire, then the map boss under the mirror's effect."
  - title: "Push to 100%"
    text: "Each map raises the area's deliriousness; at 100% a Simulacrum appears."
```

## What You Get

- **Distilled Emotions** are spent at the Withered Willow. On an amulet, a combination of emotions instills a passive notable, often one your class cannot reach or one that saves several points. On a jewel they replace a modifier with a guaranteed one. On a Waystone they add extra modifiers: three [[Liquid Paranoia]] add about 36% more Rare monsters, and Rares drop most of the currency. Three emotions of the same kind combine into the next tier at the Reforging Bench.
- **Simulacrum Splinters** (with the right Atlas passive): 300 make a Simulacrum.
- Tang'Mazu drops [[Veilpiercer]], [[Sadist's Mercy]], [[The Auspex]], [[Horror's Flight]], The Raven's Flock and [[Split Personality]].

## Making Currency

- Sell emotions on the Currency Exchange; combine three into the next tier when it is worth more than the three separately. The Atlas passive "You can't scare me anymore!" lets you drop Potent emotions, which are expensive.
- Sell splinters and Simulacrums to players who farm them, or run them yourself if your build handles the late waves.
- Check the Loathsome Mire amulets: two good notables on one amulet sell well.
- Spend your own Paranoia on Waystones: more Rares means more currency from every map.

```loot
caption: "Delirium loot, from drop to currency"
items:
  - item: "Distilled Emotions"
    use: "Instill notables on amulets, modifiers on jewels and Waystones"
    sell: "Sell on the Currency Exchange; combine three when the next tier is worth more"
    value: high
  - item: "Liquid Paranoia"
    use: "Three on a Waystone add about 36% more Rares"
    sell: "Use your own: more Rares, more currency per map"
    value: medium
  - item: "Simulacrum Splinters"
    use: "300 make a Simulacrum"
    sell: "Sell to players who farm it, or run it yourself"
    value: medium
  - item: "Loathsome Mire amulets"
    use: "Amulets with two instilled notables"
    sell: "Two good notables sell well"
    value: medium
```

## Farming Strategy and Atlas Tree

Maxroll's priorities are "You can't scare me anymore!" for Potent emotions, "Is this about me... or you?" for Simulacrum Splinters, "I see your true nature now!" for an extra Map Boss and more Grand Mirrors, and Recurring Nightmares set to the steady spread. Its planner reaches them through the nodes in between, then fills in the rest. In maps, spread the fog fast: when a Grand Mirror spawns, search "Grand Mirror" on the Atlas and run that map. Push the area to 100% deliriousness, run the Simulacrum, then start again. Put three Liquid Paranoia on your best Waystones for more Rares.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list.

```atlas
tree: Delirium
order:
  - node: You can't just wake up from this one.
    note: "The fog lasts 30% longer, and Simulacrums offer a bonus pick between waves."
  - Come on! Face me!
  - node: You can't scare me anymore!
    note: "Unique monsters can drop Potent emotions, which are expensive."
  - There's nowhere to hide...
  - You thought you were free?
  - node: Is this about me... or you?
    note: "Delirium monsters in level 75+ maps drop Simulacrum Splinters."
  - node: Recurring Nightmares
    choice: Delirium Fog spreads to +4 additional Maps
    note: "The steady option. The other one adds 30% deliriousness to foggy maps instead."
  - The mirrors... the mirrors!
  - node: I see your true nature now!
    note: "An extra boss in the Map Boss arena, or a guaranteed Grand Mirror."
  - Is that the best you've got?!
  - I know your childhood fears...
  - Get out of my head!
  - These demons are all your own...
  - Are you sure you want to do that?
  - I'm not alone anymore!
```

## Which Builds Fit

It suits fast builds with strong clear that keep pace with the fog, and enough defences for the late Simulacrum waves. Slow or channelled builds struggle.
