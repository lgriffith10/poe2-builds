---
title: "Breach"
summary: "Hiveborn waves on a timer, Catalysts and the Genesis Tree: how Breach works, what it drops, how to turn it into currency, and which builds farm it best."
hub: "Keepers of the Flame Monastery, south on the Atlas"
pinnacle: "Xesht, We That Are One (Breach Splinters); Breachlords Tul and Esh (Breachstones)"
rewards:
  - "Catalysts"
  - "Breach rings"
  - "Hiveblood and Wombgifts"
  - "Breach Splinters"
  - "Lineage Support gems"
demands:
  clear: 3
  single: 1
  tank: 2
  speed: 3
loot:
  exchange: ["Breach"]
  items: ["Breachlord Sac", "Xesht's Reliquary Key", "Xoph's Pyre", "Tul's Stillness", "Tul's Avalanche", "Esh's Radiance", "Esh's Prowess", "Uul-Netol's Embrace", "Breachlord's Amalgam", "Breachlord's Rift"]
  uniques: ["Skin of the Loyal", "Xoph's Blood", "Choir of the Storm", "The Pandemonius", "Hand of Wisdom and Action", "Beyond Reach"]
updated: 2026-11-18
sources:
  - title: "Breach (Maxroll)"
    url: https://maxroll.gg/poe2/resources/breach
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

Walk over a Breach hand in a map to open an unstable Breach: Hiveborn pour out in waves, and killing enough of them before the timer runs out stabilises it. A group of Rare monsters, sometimes the Marshals of Xesht, then has to die to close it, and drops a large pile of loot. **Hives** are a variant where you defend Ailith while she closes the Breach (run through the walls around her first to break them). The hub is the Keepers of the Flame Monastery, south on the Atlas.

```flow
caption: "How a Breach plays out"
steps:
  - title: "Open the hand"
    text: "Walk over a Breach hand in a map: the Breach opens and a timer starts."
  - title: "Kill the waves"
    text: "Hiveborn pour in from every side. Kill enough of them before the timer runs out."
  - title: "Stabilise"
    text: "The Breach stabilises and a group of Rares, sometimes Xesht's Marshals, appears."
  - title: "Kill the Rares"
    text: "Killing them closes the Breach and drops a large pile of loot."
  - title: "Hatch at the Genesis Tree"
    text: "Spend Hiveblood on Wombgifts for jewellery or currency."
```

## What You Get

- **Catalysts** raise the quality of rings and amulets, which strengthens their modifiers of the matching type: catalysing a life ring gives more life. Breach rings take up to 40% quality instead of 20%. This patch also added jewel Catalysts (Ruby for fire, Quartz for caster, Tourmaline for attribute and Mephrite for defence modifiers).
- **Hiveblood and Wombgifts** are spent at the **Genesis Tree**: Hiveblood hatches Wombgifts into rings, amulets, belts or currency. Points in the tree let you steer what hatches: the modifier type (minion, caster…), a minimum modifier level, or the base type, including bases found nowhere else (Lament, Portent and Absent) with implicits such as maximum elemental resistances or increased maximum life on rings.
- **Breach Splinters** open the Realmgate to the pinnacle boss Xesht, whose drops include [[Skin of the Loyal]], [[Xoph's Blood]], [[Choir of the Storm]], [[The Pandemonius]], [[Hand of Wisdom and Action]] and [[Beyond Reach]]. **Breachstones**, hatched at the Genesis Tree, reveal a Breach Domain on the Atlas with the Breachlords Tul and Esh in its fortress.
- **Lineage Support gems** such as [[Xoph's Pyre]], [[Tul's Stillness]] and [[Esh's Radiance]].

## Making Currency

- Sell Catalysts in bulk on the Currency Exchange: every Breach drops several and crafters always need them.
- Breach Splinters and Breachstones sell to players who farm the bosses. If you do not fight Xesht yourself, sell them as you go.
- Use the Genesis Tree to target sought-after jewellery (minion or caster rings, the exclusive bases) and sell the good rolls. Catalysing a good ring before listing it raises its price.
- Lineage Support gems and Xesht's uniques are the jackpots.

```loot
caption: "Breach loot, from drop to currency"
items:
  - item: "Catalysts"
    use: "Quality on rings and amulets; Breach rings go to 40%"
    sell: "Sell in bulk on the Currency Exchange"
    value: medium
  - item: "Hiveblood and Wombgifts"
    use: "Hatch jewellery or currency at the Genesis Tree"
    sell: "Lavish Wombgifts hatch currency; sell good jewellery rolls"
    value: medium
  - item: "Breach Splinters and Breachstones"
    use: "Open Xesht's Realmgate and the Breachlord domains"
    sell: "Sell to bossers if you do not fight them"
    value: medium
  - item: "Lineage Supports and Xesht's uniques"
    use: "Build-defining gems and uniques"
    sell: "The jackpots: sell on the trade site"
    value: high
```

## Farming Strategy and Atlas Tree

Breach pays out in Rares, so take the nodes that add Rares and keep Breaches open longer first. Then turn the Genesis Tree into a source of currency: set Breeding Program to Lavish Wombgifts, which hatch into currency, and put the extra Genesis points into the Currency womb. Vruun's nodes come next, for the Lineage Support jackpot. Leave the Hive nodes for last unless you play minions or totems, which do well defending Ailith from a fixed spot.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list. This order is our own reading of the tree, built around the strategy above.

```atlas
tree: Breach
order:
  - node: Breeding Program
    choice: Lavish Wombgifts
    note: "Lavish Wombgifts hatch currency. If you craft jewellery, pick the Signet (rings), Ornate (amulets) or Banded (belts) ones instead."
  - node: Moment of Risk
    note: "Two more Rares per Breach, and Wombgifts can drop one level higher."
  - node: Shape the Chains
    choice: 15% increased Pack Size
    note: "For clear builds. Builds that melt Rares can take the other option: tougher, more rewarding Rares in smaller packs."
  - node: Reality Wound
    note: "Ten more seconds of killing before the Breach collapses."
  - Diverse Control
  - node: Growing Wealth
    note: "Five more points in the Currency womb, which goes with Lavish Wombgifts."
  - node: Frantic Invasion
    note: "Vruun, Marshal of Xesht, appears twice as often."
  - node: Study the Chains
    note: "Vruun drops Lineage Supports more often: the jackpot."
  - Flesh Flower
  - Essence Transference
  - Exquisite Design
  - Swelling Hives
  - Provoke the Swarm
  - node: Sole Purpose
    choice: 50% increased number of skills created
    note: "More of Ailith's skills means more monsters to kill. Take the damage option if Hives are a struggle."
  - Reactive Hiveseeding
  - node: Tear Open the Rift
    choice: Add a Modifier to one revealed Map
    note: "The other option costs an extra Breachstone each time."
```

## Which Builds Fit

It suits builds with fast, wide clear that keep up with swarms coming from every side. Minion and totem builds do well in Hives, where you fight from a fixed spot.
