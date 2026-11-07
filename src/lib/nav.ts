import type { Dictionary } from "@/i18n/dictionaries/en";

/** Main navigation; labels come from the dictionary's `nav` section. */
export const NAV: { href: string; key: keyof Dictionary["nav"] }[] = [
  { href: "/", key: "builds" },
  { href: "/tier-list", key: "tierList" },
  { href: "/planner", key: "planner" },
  { href: "/database", key: "database" },
  { href: "/character", key: "character" },
];

type DatabaseKey = "gems" | "uniques" | "bases" | "ascendancies";

/** Database sections; label and blurb keys live in the dictionary's `database` section. */
export const DB_SECTIONS: { href: string; key: DatabaseKey; blurb: `${DatabaseKey}Blurb` }[] = [
  { href: "/database/gems", key: "gems", blurb: "gemsBlurb" },
  { href: "/database/uniques", key: "uniques", blurb: "uniquesBlurb" },
  { href: "/database/bases", key: "bases", blurb: "basesBlurb" },
  { href: "/database/ascendancies", key: "ascendancies", blurb: "ascendanciesBlurb" },
];
