---
title: "Crafting Strategy: Protect Good Modifiers and Read the Odds"
summary: "Why crafting feels random, how to make sure a good modifier never gets removed, and what the percentages in our crafting simulator really mean."
order: 4
updated: 2026-11-08
sources:
  - title: "How to Craft in Path of Exile 2 (Maxroll)"
    url: https://maxroll.gg/poe2/resources/how-to-craft-in-path-of-exile-2
---

This guide follows [Crafting Basics](/guides/crafting-basics). It answers two questions: *how do I stop losing the good stats I already have?* and *what do the percentages in the [crafting simulator](/craft) mean?*

> **The short version.** Every currency either **adds** a random modifier or **removes** one. You can't choose what gets added, but you can control *where* it can land and *what* can be removed. Securing a stat means making sure no currency you use can touch it.

## The One Idea: Two Sides

Every modifier is a **prefix** or a **suffix**, and a rare holds at most **3 of each**. That split is your main tool:

- An omen can force an Exalted Orb to add **only** a prefix or **only** a suffix.
- An omen can force a Chaos Orb or an Orb of Annulment to remove **only** a prefix or **only** a suffix.
- If one side is full, a currency that adds a modifier **can only** add to the other side.

So when all your good modifiers are suffixes, any action that only touches prefixes is **safe** for them.

## What Each Currency Risks

| Currency | Adds | Removes | Risk to what you have |
| --- | --- | --- | --- |
| Transmutation, Augmentation, Regal, Exalted | 1 random mod | nothing | **None.** Only the new mod is random |
| Greater Essence | 1 guaranteed mod | nothing | **None** |
| Desecration on an item with a free slot | 1 mod, you pick among 3 | nothing | **None** |
| Chaos Orb | 1 random mod | 1 random mod | **High** without an omen |
| Orb of Annulment | nothing | 1 random mod | **High** without an omen |
| Perfect Essence | 1 guaranteed mod | 1 random mod | **Medium** (see below) |
| Desecration on a full item | 1 mod, you pick among 3 | 1 random mod | **Medium** |
| Vaal Orb | — | may reroll half the mods | **Very high**: only on finished items |

> **Rule of thumb.** Use the safe currencies first, while the item still has free slots. Only reach for removal when the item is full and one modifier is clearly bad, and then always with an omen that keeps it away from your good side.

## Four Ways to Secure a Modifier

### 1. Get it before anything risky

The hardest modifier to get (movement speed on boots, a top-tier life roll) should already be on the base you start from. Buying a magic item with it costs much less than gambling for it later.

### 2. Guarantee it with an essence

A **Greater Essence** turns a magic item into a rare and adds one specific modifier: nothing random about it. The limit: an item holds only **one** crafted modifier.

### 3. Remove only from the bad side

If the bad modifier is a prefix and all your suffixes are good, use a Chaos Orb or an Orb of Annulment with the **Sinistral** omen (prefixes only). Your suffixes cannot be touched. The **Dextral** omens do the same for suffixes.

The **Omen of Whittling** goes further: the Chaos Orb removes the modifier with the **lowest level requirement**. When your bad modifier is a cheap, low-level roll, that is a guaranteed removal.

```items
flow: true
cards:
  - base: Sleek Boots
    rarity: rare
    step: "Before: one weak prefix"
    mods: [30% increased Movement Speed, +131 to maximum Life, +18 to maximum Mana, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    bad: [2]
    note: "The mana roll is level 6, far below the others: Whittling will pick it."
  - base: Sleek Boots
    rarity: rare
    step: "Chaos Orb + Omen of Whittling"
    mods: [30% increased Movement Speed, +131 to maximum Life, 31% increased Evasion Rating, +38% to Fire Resistance, +33% to Cold Resistance, +23 to Dexterity]
    mark: [2]
    note: "Mana removed for sure. Suffixes were full, so the new mod had to be a prefix."
```

### 4. Use the side rule with Perfect Essences

A **Perfect Essence** removes a modifier and adds its own. On a full item, the removed one must come from the **same side** as the essence's modifier, since that's the only way to make room. On boots with three great suffixes, a movement speed essence (a prefix) can only remove a prefix.

## Desecration: Safe or Not?

Desecration adds a hidden modifier, revealed at the Well of Souls as **a choice of three**. On an item with a free slot it removes nothing, so it is one of the safest ways to finish a rare. On a **full** item it first removes a random modifier: only do that when the item is worth saving. An item can only hold one desecrated modifier.

## Reading the Percentages in the Simulator

Each suggestion in the [simulator](/craft) shows two numbers:

- **Chance to add a wanted modifier**: out of 800 simulated tries of that action, how often the item ended up with one more of the modifiers you ticked.
- **Risk to lose one you have**: how often the action removed a wanted modifier that was already on the item. A Chaos Orb on six modifiers where two are wanted has a 2 in 6 (33%) risk; with the right omen it can drop to 0%.

### Where the numbers come from

For an action that adds one modifier, the chance is simply:

> **(possible tiers of the modifiers you want) ÷ (all possible tiers)**

"Possible" means: allowed on this base, at or below the item level, not in a group the item already has, on a side with a free slot, and at or above the currency's minimum level (44 for Greater, 70 for Perfect).

Example with magic Sleek Boots (item level 82) that already have movement speed and fire resistance, aiming for life or cold resistance with a Regal Orb:

| Currency | Possible tiers | Life or cold tiers | Chance |
| --- | --- | --- | --- |
| Regal Orb | 115 | 17 | ≈ 15% |
| Greater Regal Orb | 51 | 7 | ≈ 14% |
| Perfect Regal Orb | 12 | 2 | ≈ 17% |

Greater and Perfect orbs barely change the chance to hit **which** modifier; they change **how good** it is when it hits. Use them when the roll value matters.

### Why they are estimates

The game gives every modifier tier a hidden **weight**: common tiers appear far more often than top tiers. Those weights are not public, so the simulator counts every possible tier as equally likely. Two consequences:

- The real chance of a **top tier** is lower than shown.
- Modifiers with many tiers (life has nine on boots) look a little more likely than they are.

Use the percentages to **compare** actions (a guaranteed essence beats a 15% regal, a 0% risk beats a 33% risk), not as exact promises.

## A Checklist Before Each Click

1. **What can this remove?** If the answer includes a modifier you want, add an omen or pick another currency.
2. **Where can the new modifier land?** Count free prefixes and suffixes.
3. **Is there a guaranteed option?** An essence or a desecration choice beats a random roll.
4. **Is the item worth the currency?** On cheap bases, it is often faster to buy a better starting item than to fix a bad one.
