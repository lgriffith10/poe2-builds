---
title: "Ritual"
summary: "Altars that revive every monster in the circle, Tribute, Omens and the King in the Mist: how Ritual works, what to buy, how to profit and which builds hold the circle best."
hub: "Caer Tarth and the maps around it"
pinnacle: "The King in the Mist, then The Bodach"
rewards:
  - "Tribute"
  - "Omens"
  - "Uniques"
  - "Rite of the Nameless rewards"
demands:
  clear: 3
  single: 2
  tank: 3
  speed: 1
loot:
  exchange: ["Ritual"]
  items: ["Call of the Shadows"]
  exclude: ["Omen of Abyssal Echoes", "Omen of Light", "Omen of Sinistral Necromancy", "Omen of Dextral Necromancy", "Omen of Putrefaction"]
updated: 2026-11-18
sources:
  - title: "Ritual (Maxroll)"
    url: https://maxroll.gg/poe2/resources/ritual
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

A Ritual map has three or four Ritual sites. Clear the monsters inside a circle, then activate the altar: the circle closes and every monster that died in it comes back. Kill them again to earn **Tribute**. Tribute does not carry over to the next map, so spend it before you leave.

```flow
caption: "How a Ritual site plays out"
steps:
  - title: "Clear the circle"
    text: "Kill the monsters inside one of the three or four Ritual circles of the map."
  - title: "Activate the altar"
    text: "The circle closes and every monster that died in it comes back."
  - title: "Kill them again"
    text: "Each revived monster earns Tribute. Bosses can join on some altars."
  - title: "Spend the Tribute"
    text: "Buy Omens and uniques, defer, reroll or offer the rest to the King before leaving the map."
```

## What You Get

Tribute buys rewards from the Ritual page, made of uniques and **Omens**. Omens sit in your inventory and change the next use of a crafting currency: [[Omen of Greater Exaltation]] makes the next Exalted Orb add two modifiers, [[Omen of Dextral Annulment]] makes the next Orb of Annulment remove only a suffix. They are how expensive items get crafted.

You can spend Tribute four ways: take an item, **defer** it (pay a little to lock it, and it comes back cheaper in a later Ritual), **reroll** the page, or **offer** the rest to the King in the Mist. Filling his bar gives An Audience with the King: find the Crux of Nothingness on the Atlas to fight him. His Head starts the **Rite of the Nameless** at Caer Tarth: a chain of maps with guaranteed Rituals where you choose a reward for each map, currency included (Divine Orbs, or even a [[Mageblood]] with the right Atlas passive). Each map of the chain drops a Call of the Shadows; five of them open the fight with the pinnacle boss, The Bodach.

## Making Currency

- Always take the Omens that sell for a lot: [[Omen of Sinistral Annulment]], [[Omen of Dextral Annulment]], [[Omen of Sinistral Erasure]], [[Omen of Dextral Erasure]], [[Omen of Whittling]] and [[Omen of Chance]].
- Skip cheap items on the first pages and reroll to see more of them. Keep 1,000 to 1,500 Tribute after your last reroll so you can defer a rare item if one shows up.
- Only take uniques you can use or sell: the rest of the Tribute is worth more as offerings to the King.
- An Audience with the King, the Head of the King and Call of the Shadows can all be sold if you do not want to fight.
- Ritual scales with the number of monsters in the map: pack size on Waystones and Tablets, Distilled Emotions, and Delirium, whose monsters (including its bosses) are revived by the altars too.

```loot
caption: "Ritual loot, from Tribute to currency"
items:
  - item: "Omens"
    use: "Change the next use of a crafting currency"
    sell: "Always take the valuable ones (Annulment, Erasure, Whittling, Chance) and sell them"
    value: high
  - item: "Uniques on the Ritual page"
    use: "Gear, sometimes chase uniques"
    sell: "Only take what you use or can sell; offer the rest"
    value: medium
  - item: "King's bar: Audience, Head, Call of the Shadows"
    use: "Fight the King, run the Rite of the Nameless, reach The Bodach"
    sell: "Sell them if you do not want the fights"
    value: medium
  - item: "Rite of the Nameless picks"
    use: "A reward chosen per map, currency included"
    sell: "Pick Divine Orbs, or Mageblood with Hour of the Nameless"
    value: high
```

## Farming Strategy and Atlas Tree

This is Maxroll's order. Start with the nodes that make revived monsters Magic or Rare more often and add a boss to some altars. Then take the King's bar and the Rite of the Nameless nodes: Hour of the Nameless is what lets the Rite offer a [[Mageblood]]. Next come Traveller's Woe and Spreading Darkness, which steer unique drops, and the Tribute and reroll nodes come last. Maxroll leaves Royal Lenience out. In maps, add pack size wherever you can (Waystones, Tablets, Distilled Emotions) and run Delirium alongside, since the altars revive everything that died in the circle.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list.

```atlas
tree: Ritual
order:
  - node: Reborn in Shadow
    note: "Revived monsters are more often Magic and Rare."
  - node: Bring Forth the Unseen
    note: "15% of altars summon an extra boss."
  - node: Royal Tithe
    note: "The King's bar fills faster."
  - node: Hour of the Nameless
    note: "The Rite of the Nameless can offer valuable uniques such as Mageblood."
  - Ongoing Chants
  - Umbral Gathering
  - node: Traveller's Woe
    choice: Tainted
    note: "With Spreading Darkness, Tainted Rituals favour belts, charms and flasks: Maxroll's pick for hunting Headhunter and Mageblood."
  - Spreading Darkness
  - node: Mysterious Rites
    note: "Queen's Rituals: more Omens and a special Idol."
  - From the Mists
  - node: Invigorated Sacrifices
    choice: 10% increased number of Favours
    note: "More items to choose from. When you have too many deferred items to pay for, switch to an option that reduces the Tribute penalty."
  - Tempting Offers
  - Prayer and Pledge
  - Patient Devotion
  - Magnanimous Offerings
  - Between Two Worlds
  - Ancient Enmities
```

## Which Builds Fit

It suits builds with big area damage and the defences to hold their ground: the circle locks you in. Minions, totems and channelled skills are at home here, since standing still costs nothing.
