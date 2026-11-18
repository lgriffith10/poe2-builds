---
title: "Abyss"
summary: "Fissures, Abyssal Pits and desecration bones: how Abyss works, what its loot is for, how to profit and which builds clear the hordes and kill the Abyssal Rares."
hub: "The Well of Souls, east on the Atlas, and the cracks spreading from it"
pinnacle: "The Lightless bosses, then the Vessel of Kulemak"
rewards:
  - "Desecration bones"
  - "Abyss Omens"
  - "Abyssal Troves"
  - "Dark Domains"
demands:
  clear: 3
  single: 3
  tank: 2
  speed: 2
loot:
  exchange: ["Abyss"]
  items: ["Omen of Abyssal Echoes", "Omen of Light", "Omen of Sinistral Necromancy", "Omen of Dextral Necromancy", "Kulemak's Invitation", "Kurgal's Leash", "Amanamu's Tithe", "Tecrod's Revenge", "Kulemak's Dominion"]
  uniques: ["Darkness Enthroned", "Undying Hate", "Heart of the Well"]
updated: 2026-11-18
sources:
  - title: "Abyss (Maxroll)"
    url: https://maxroll.gg/poe2/resources/abyss
  - title: "Endgame Activities (Maxroll)"
    url: https://maxroll.gg/poe2/resources/endgame-activities
  - title: "Currency Guide (Maxroll)"
    url: https://maxroll.gg/poe2/resources/currency-guide
  - title: "Atlas passive tree data (RePoE)"
    url: https://repoe-fork.github.io/poe2/passive_skill_trees/Atlas.json
---

## How It Works

Green fissures in a map lead to a large Abyssal Pit. Kill monsters near the fissures to close them; each one spawns Abyssal monsters based on what you killed (normal, magic, Rares that keep their modifiers and can gain deadly Abyssal modifiers, Rogue Exiles that become Lichborn, bosses that summon a huge creature). Once every fissure is closed, the pit opens; clear it and an **Abyssal Trove** rises with a large amount of loot. On the Atlas, cracks spread from the Well of Souls in the east: those maps give Abyss Atlas points and end in Abyssal Depths with one of the Lightless bosses.

```flow
caption: "How an Abyss plays out"
steps:
  - title: "Close the fissures"
    text: "Kill monsters near the green fissures; each closed one spawns Abyssal monsters."
  - title: "Fight the Abyssal spawns"
    text: "Rares keep their modifiers and can gain deadly Abyssal ones; exiles become Lichborn."
  - title: "Open the pit"
    text: "Once every fissure is closed, the Abyssal Pit opens. Clear it."
  - title: "Loot the Trove"
    text: "An Abyssal Trove rises with a large amount of loot."
  - title: "Follow the cracks"
    text: "Sealed pits can reveal Dark Domains; the cracks from the Well of Souls lead to the Lightless."
```

## What You Get

- **Bones** ([[Gnawed Jawbone]], [[Ancient Jawbone]] and the rib and collarbone versions) **desecrate** an item: they add a hidden modifier that you reveal at the Well of Souls, choosing one of three. It is a controlled way to add a strong modifier to an almost finished item.
- **Abyss Omens** steer desecration: [[Omen of Abyssal Echoes]] rerolls the three choices, [[Omen of Light]] removes a desecrated modifier so you can try again, [[Omen of Sinistral Necromancy]] and [[Omen of Dextral Necromancy]] force a prefix or a suffix, and the faction Omens force the modifiers only desecration can add.
- Sealing a pit can reveal a **Dark Domain**: an Abyssal City where every Rare has Abyssal modifiers, with exclusive Lineage Support gems such as [[Kurgal's Leash]], Omens of Abyssal Echoes and socketables. Other domains hold the Abyssal Commanders, which drop uniques such as [[Darkness Enthroned]] and [[Undying Hate]], and Kulemak's Invitation to the pinnacle fight with the Vessel of Kulemak.

## Making Currency

- Sell bones in bulk: anyone crafting endgame gear needs them.
- Sell the Omens, especially Omens of Abyssal Echoes: players use them on every expensive desecration.
- Desecrate good bases yourself and sell the result when you hit a strong modifier.
- Lichborn exiles drop the sought-after Heart of the Well jewel; Kulemak's Invitation sells to bossers.

```loot
caption: "Abyss loot, from drop to currency"
items:
  - item: "Bones (jawbones, ribs, collarbones)"
    use: "Desecrate an item: reveal one of three hidden modifiers at the Well of Souls"
    sell: "Sell in bulk: every endgame crafter needs them"
    value: high
  - item: "Abyss Omens"
    use: "Steer desecration (reroll the choices, force a prefix or suffix)"
    sell: "Omens of Abyssal Echoes sell on every expensive desecration"
    value: high
  - item: "Dark Domain rewards"
    use: "Lineage Supports, socketables, Commander uniques"
    sell: "Sell the Lineage Supports and uniques"
    value: high
  - item: "Lichborn drops and Kulemak's Invitation"
    use: "Heart of the Well jewels; the pinnacle fight"
    sell: "Sell to jewel buyers and bossers"
    value: medium
```

## Farming Strategy and Atlas Tree

Abyss pays in volume and in Rares with Abyssal modifiers. Start with the pit nodes (more pits per Abyss), then Lord of the Pit for extra Abysses and Sprawling Rupture for more monsters. Unholy Influence and Armaments of Evil make Abyssal Rares deadlier and richer, so take them once your build handles them. The branch through Rotting Bones steers the loot: Ancient bones, Omens, and Ulaman's currency chests. Abyssal Depths and Overrun nodes come last. In maps, follow the cracks out of the Well of Souls first, since those maps earn your Abyss points.

How to read the tree: the numbers give the order to take the notables in as your points come in, and the gold path marks the small nodes on the way. Hover a node for its exact effect; keystones (dashed rings) make you pick one option, given by the arrow in the list. This order is our own reading of the tree, built around the strategy above.

```atlas
tree: Abyss
order:
  - node: From Below
    note: "One more pit per Abyss."
  - node: Dark Depths
    note: "Chances for two to four extra pits."
  - node: Ghastly Relics
    note: "Large Abyssal chests become Abyssal Strongboxes."
  - node: Lord of the Pit
    choice: Abysses have a 20% chance to contain an additional Abyss
    note: "The option that makes Abyssal monsters stronger with each closed pit suits builds that kill everything."
  - node: Sprawling Rupture
    note: "25% more monsters."
  - node: Unholy Influence
    note: "Twice as many Abyssal and Lichborn modifiers: more danger, better loot."
  - Armaments of Evil
  - node: Strange Aversions
    note: "Faction chests: Ulaman may have currency chests."
  - node: Rotting Bones
    note: "More Ancient bones, the valuable ones."
  - node: Vile Treasures
    choice: Omens
    note: "Omens of Abyssal Echoes sell on every expensive desecration. Lineage Supports are the jackpot option."
  - node: Balance of Power
    choice: Ulaman
    note: "With Strange Aversions, Ulaman's Abysses can hold currency chests."
  - Abyssal Ire
  - Close to the Surface
  - Stir the Swarm
  - Endless War
  - Dark Bloodlines
  - Shadow of Undeath
  - Blessing of the Source
```

## Which Builds Fit

It suits builds with fast clear that also kill Rares quickly: pits are hordes of monsters, but the money is in the Rares with Abyssal modifiers.
