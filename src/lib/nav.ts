import type { Dictionary } from "@/i18n/dictionaries/en";

type NavKey = Exclude<keyof Dictionary["nav"], "toggleMenu" | "language" | "groups" | "allBuilds" | "allGuides" | "overview">;
type GroupKey = keyof Dictionary["nav"]["groups"];

export type NavItem = {
  href: string;
  /** Label and blurb key (`t.nav[key]`, `t.home.tools[key]`). */
  key: NavKey;
  /** Label shown in the menu instead of `t.nav[key]` (e.g. "All builds" under the Builds heading). */
  menuLabel?: "allBuilds" | "allGuides";
};

export type NavGroup = { key: GroupKey; items: NavItem[] };

/** Main navigation: top-level headings, each opening a sub-menu. The Database group lists DB_SECTIONS. */
export const NAV_GROUPS: NavGroup[] = [
  {
    key: "builds",
    items: [
      { href: "/builds", key: "builds", menuLabel: "allBuilds" },
      { href: "/tier-list", key: "tierList" },
      { href: "/meta", key: "meta" },
      { href: "/compare", key: "compare" },
      { href: "/quiz", key: "quiz" },
    ],
  },
  {
    key: "guides",
    items: [
      { href: "/guides", key: "guides", menuLabel: "allGuides" },
      { href: "/farming", key: "farming" },
      { href: "/farming/planner", key: "atlasPlanner" },
      { href: "/glossary", key: "glossary" },
    ],
  },
  {
    key: "tools",
    items: [
      { href: "/planner", key: "planner" },
      { href: "/craft", key: "craft" },
      { href: "/weapons", key: "weapons" },
      { href: "/loot-value", key: "lootValue" },
      { href: "/character", key: "character" },
    ],
  },
  { key: "database", items: [{ href: "/database", key: "database" }] },
];

/** Every top-level page, flat (home tool grid, search index, sitemap). */
export const NAV: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

type DatabaseKey = "gems" | "uniques" | "bases" | "ascendancies" | "currency";

/** Database sections; label and blurb keys live in the dictionary's `database` section. */
export const DB_SECTIONS: { href: string; key: DatabaseKey; blurb: `${DatabaseKey}Blurb` }[] = [
  { href: "/database/gems", key: "gems", blurb: "gemsBlurb" },
  { href: "/database/uniques", key: "uniques", blurb: "uniquesBlurb" },
  { href: "/database/bases", key: "bases", blurb: "basesBlurb" },
  { href: "/database/ascendancies", key: "ascendancies", blurb: "ascendanciesBlurb" },
  { href: "/database/currency", key: "currency", blurb: "currencyBlurb" },
];
