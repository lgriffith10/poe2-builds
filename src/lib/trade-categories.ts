/** Trade site item categories (pathofexile.com/trade2) by item class, shared by the build pages and the price check. */
export const CLASS_CATEGORY: Record<string, string> = {
  Bow: "weapon.bow",
  Crossbow: "weapon.crossbow",
  Claw: "weapon.claw",
  Dagger: "weapon.dagger",
  Flail: "weapon.flail",
  Spear: "weapon.spear",
  Talisman: "weapon.talisman",
  Wand: "weapon.wand",
  Sceptre: "weapon.sceptre",
  Staff: "weapon.staff",
  Warstaff: "weapon.warstaff",
  "One Hand Axe": "weapon.oneaxe",
  "One Hand Mace": "weapon.onemace",
  "One Hand Sword": "weapon.onesword",
  "Two Hand Axe": "weapon.twoaxe",
  "Two Hand Mace": "weapon.twomace",
  "Two Hand Sword": "weapon.twosword",
  Quiver: "armour.quiver",
  Shield: "armour.shield",
  Buckler: "armour.buckler",
  Focus: "armour.focus",
  Helmet: "armour.helmet",
  "Body Armour": "armour.chest",
  Gloves: "armour.gloves",
  Boots: "armour.boots",
  Amulet: "accessory.amulet",
  Ring: "accessory.ring",
  Belt: "accessory.belt",
};

/** Weapon classes whose damage, speed and critical modifiers are local (caster weapons use spell modifiers). */
export const CASTER_WEAPONS = new Set(["weapon.wand", "weapon.sceptre", "weapon.staff"]);
