---
title: "Crafting Basics: Make Your Own Upgrades"
summary: "Read an item like a crafter, pick the right base, then use essences, omens, desecration and fluxes to make gear upgrades without gambling your currency away."
order: 3
updated: 2026-11-08
sources:
  - title: "How to Craft in Path of Exile 2 (Maxroll)"
    url: https://maxroll.gg/poe2/resources/how-to-craft-in-path-of-exile-2
  - title: "Trade in Path of Exile 2 (Maxroll)"
    url: https://maxroll.gg/poe2/resources/trade-in-path-of-exile-2
---

Crafting in Path of Exile 2 looks like gambling at first. It gets much more predictable once you know three things: what an item *can* roll, which base to start from, and which currencies remove the randomness.

> **The short version.** Start from a white or magic item that already has the hardest modifier you need, use a Greater Essence to guarantee another, and keep omens and desecration to finish the item. Never Vaal an unfinished item.

## Read an Item Like a Crafter

- **Modifiers** (or "mods") are the stats on magic and rare items. Magic items have up to 2, rares up to 6.
- **Prefixes and suffixes.** Every mod is one or the other. Magic items have at most one of each, rares at most three of each. If a rare already has three prefixes, no currency can add another prefix to it.
- **Item level** (not the level requirement) decides which tiers of a mod can roll. You only need the item level of the best tier you are aiming for, and lower item levels are much cheaper on trade.
- **Base type** sets the defences and attribute requirements. Implicit modifiers come with the base and can make it special (some crossbows fire an extra grenade, for example).
- **Crafted modifier.** Anything that guarantees a specific mod (an essence, for example) adds a *crafted* modifier, and an item can only hold **one**.

To see every mod an item can roll, its prefix or suffix type, and the item level each tier needs, use **PoE2DB**. To simulate a craft and see your odds, use **Craft of Exile**, or try our [crafting simulator](/craft): pick the modifiers you want and it ranks the next steps.

## Step 1: Get the Right Base

Most good crafts start from a **white or magic** item: it is a blank page you control.

- Pick up bases your build needs (make your loot filter highlight them).
- Or buy them: on the trade site, set the item category, rarity **Magic**, the item level you need, and the one or two mods you want already on it.
- Start with the hardest mod to get. For boots, that is movement speed: a magic pair with 30% movement speed and a good resistance is often cheap.
- A slightly worse base type (lower defences, lower requirements) is often far cheaper and nearly as good.

## Step 2: Add Modifiers With Control

| Tool | What it does | When to use it |
| --- | --- | --- |
| **Greater Essence** | Turns a magic item into a rare and guarantees one specific mod | Your magic base has two good mods: lock in a third |
| **Perfect Essence** | On a rare, removes a mod and adds a guaranteed one | Replace one bad mod on an otherwise great item |
| **Greater / Perfect orbs** | Exalted, Chaos and others with a higher minimum tier | When you can afford them, for better results per roll |
| **Omens** | Change how the next currency works: choose prefix or suffix, add two mods instead of one, choose what a Chaos Orb removes | Finishing an item where one side (prefix or suffix) is full |
| **Desecration** (Abyss) | Adds a hidden mod that you reveal at the Well of Souls by picking one of three options. On a full rare (6 mods) it replaces a random mod instead | Finishing an item, or saving a "near miss" |
| **Fluxes** | Swap an item's resistance to another element | The item is perfect but has the wrong resistance |

> **Trade tip.** Remember fluxes when buying gear: an item with the "wrong" resistance is often much cheaper, and a flux fixes it.

## Step 3: Finish, and Only Then Corrupt

Add quality, sockets and runes once the mods are done. A **Vaal Orb** corrupts the item forever: it can add a socket or an enchantment, change mod values, reroll half the mods (usually ruining the item), or do nothing. Only corrupt an item you are ready to lose, or a finished one you want to gamble on.

## A Simple First Craft: Boots

```items
flow: true
cards:
  - base: Sleek Boots
    rarity: magic
    step: "1. Magic base"
    mods: [30% increased Movement Speed, +38% to Fire Resistance]
  - base: Sleek Boots
    rarity: rare
    step: "2. Greater Essence of the Body"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance]
    mark: [1]
  - base: Sleek Boots
    rarity: rare
    step: "3. Dextral omen + Exalted Orb"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance, +33% to Cold Resistance]
    mark: [3]
  - base: Sleek Boots
    rarity: rare
    step: "4. Desecration"
    mods: [30% increased Movement Speed, +131 to maximum Life, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    mark: [4]
    note: "Two slots left for more resistances or evasion."
```


1. Buy magic boots with movement speed and a resistance, at the item level you need.
2. Use a Greater Essence for a third mod you want (life, for example): the boots become rare.
3. Check what is left. If you have a free suffix, use an omen that forces the next Exalted Orb to add a suffix, then exalt.
4. Missing a resistance? Desecrate and pick the best of the three options.
5. Wrong element? Flux it.

## Common Mistakes

- Starting from a random rare full of mods you don't want.
- Buying the highest item level when a lower one already allows the tier you need.
- Using two essences on the same item: only one crafted mod can stay.
- Corrupting before the item is finished.
- Desecrating a full item without checking: it replaces one of your mods at random. An item can only have one desecrated mod.
- Spending currency on campaign gear you will replace in a few levels.
