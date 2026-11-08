# Exile Codex

A Path of Exile 2 build site inspired by d4builds.gg: build guides, a meta tier list, an interactive
passive tree planner and a game data database. Built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.
Pages are statically generated from local files. The only server code is a small stateless route (`/api/pobb/[id]`)
that relays pobb.in codes, so the site must run with `next start` (or any Node host), not as a static export.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run preview` | Build then serve in production mode: use this to judge speed (dev mode is several times slower) |
| `npm run data:sync` | Downloads game data and regenerates `src/data/generated/*.json`, `public/data/tree.json` and the passive icon atlas `public/data/tree-icons.webp` (add `-- --force` to re-download) |
| `npm run builds:check` | Validates every guide in `content/builds` against the game data and point budgets |
| `npm run test:planner` | Sanity checks for the passive tree logic and share codes |
| `npm run draft:maxroll -- <guide-slug> [profile]` | Drafts a guide's front matter (skills, ascendancy order, key passives, gear) from a public Maxroll guide; prints to stdout, notes to stderr |
| `npm run draft:maxroll -- <guide-slug> --stages [--map "campaign=Name,endgame=Name"]` | Prints a `gearStages` block from every equipment set of the guide's planner; without `--map`, stages are picked from the set names |
| `npm run prices:sync [-- "League name"]` | Snapshots unique prices from poe.ninja into `src/data/generated/prices.json` (gear panel, compare page) |
| `npm run sources:check` | Lists build guides whose Maxroll source was updated after our version |
| `npm run data:refresh` | `ladder:sync` + `prices:sync` + `sources:check` |
| `npm run ladder:sync [-- leagueUrl]` | Snapshots ladder statistics from poe.ninja into `src/data/generated/ladder.json` (ascendancy, skill, unique and key passive popularity) |
| `npm run draft:ninja -- "<Ascendancy>" "<Main skill>" [pick]` | Drafts a "ladder build" from a representative poe.ninja character (the `pick`-th in poe.ninja's list for that filter); ladder statistics for the write-up go to stderr |
| `npm run skills:granted` | Lists skills granted by base types, uniques and ascendancy notables (`src/data/generated/granted-skills.json`), shown as each skill's origin on build pages |
| `npm run research:maxroll -- <plannerId> [profile]` | Human-readable summary of a Maxroll planner |
| `npm run lint` | ESLint |

## Where the data comes from

`scripts/sync-data.mjs` downloads and compiles public data into compact JSON:

- **Passive tree** and **unique item modifiers**: [Path of Building PoE2](https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2)
  (`src/TreeData/<version>/tree.json`, `src/Data/Uniques/*.lua`). Change `TREE_VERSION` in the script when a new patch lands.
- **Gems, base items, unique art, ascendancies**: [RePoE fork](https://repoe-fork.github.io/poe2/).
- Item and gem icons are downloaded once, resized to WebP and served from `public/img` (about 10 MB), so pages never
  wait on a third-party host. Gem and item lookups for the planner and character page live in `public/data/catalog.json`
  and are fetched only when needed.
- Passive tree icons are decoded from PoB's sprite textures (zstd-compressed DDS arrays, BC1) by `scripts/tree-icons.mjs`
  and packed into one WebP atlas.

Raw downloads are cached in `.cache/raw` (git-ignored). The generated JSON is committed so the site builds offline.

## Writing a build guide

Add a Markdown file to `content/builds/`. The file name becomes the URL (`/builds/<file-name>`).

```yaml
---
title: Lightning Arrow Deadeye
class: Ranger                 # one of the 8 classes
ascendancy: Deadeye
author: Your Name
updated: 2026-11-02
summary: One or two sentences shown on cards.
tags: [bow, lightning]
damage: Lightning
playstyle: Ranged attack
difficulty: easy              # easy | medium | hard
budget: low                   # low | medium | high
patch: "0.5.5"
source:                       # optional: credit the guide this build is based on
  title: Ice Shot Deadeye Build Guide
  author: aer0 (Maxroll)
  url: https://maxroll.gg/poe2/build-guides/ice-shot-deadeye-build-guide
  updated: 2026-09-04
tiers: { starter: A, endgame: S, bossing: B }   # S A B C D, any subset
tierChanges: { starter: new }  # optional badge on the tier list: new | up | down (only when the source says so)
pros: [...]
cons: [...]
skills:
  - gem: Lightning Arrow
    supports: [Lightning Penetration, Pierce I]
    note: Main skill
gear:                         # weapon offhand helmet body gloves boots amulet ring1 ring2 belt
  helmet: { unique: Ezomyte Peak }
  weapon: { base: Gemini Bow, mods: [Adds Lightning Damage, Increased Attack Speed] }
gearStages:                   # optional progression tabs: campaign | mapping | endgame | minmax
  campaign:
    weapon: { base: Crude Bow, mods: [Adds Physical Damage] }
  endgame:
    helmet: { unique: Ezomyte Peak }
passives:
  attribute: dex              # choice for attribute nodes on the path: str | dex | int
  path: [Eagle Eye, Clean Shot]           # notables/keystones, allocated in order by shortest path
  ascendancy: [Gathering Winds, Endless Munitions]
---

## Playstyle

Free Markdown. `[[Gem or Unique Name]]` becomes a link to the database.
```

Every gem, unique, base type and passive name is checked against the game data at build time; a typo fails the build
with a clear message. Run `npm run builds:check` to see point usage per build.

The guides shipped in `content/builds` are based on public Maxroll guides for patch 0.5.5 (credited on each page with
a link). Skills, ascendancy order, key passives and gear follow the source; the text is original and the passive tree is
re-pathed from the listed notables, so point totals can differ slightly from the source.

Tiers: League Start follows Maxroll's League Starter Build Tier List (3 November 2026). Endgame and Bossing are derived
from the source guide's own ratings out of 5 (on the guide page or in its planner): endgame = (2 x clear speed + defence) / 3,
bossing = (2 x bossing + defence) / 3, rounded, 5 = S … 1 = D. Guides without ratings get no Endgame/Bossing tier.

`gear` is the reference set (used by the planner and the character comparison); `gearStages` drives the inventory tabs
on the build page. When a guide has no stages, the page shows `gear`.
`sample: true` shows a "Sample" badge for placeholder guides.

## Ladder data (poe.ninja)

The site never calls poe.ninja at runtime: `npm run ladder:sync` writes a snapshot to `src/data/generated/ladder.json`,
which feeds the `/meta` page and the "x% of players" line on build pages. `scripts/ninja-lib.mjs` decodes poe.ninja's
protobuf search responses and its "NDIC" dictionaries, and throttles requests (one per second, long back-off on 429).

Guides with `origin: ladder` are drawn from one ladder character instead of a written guide; the page says so and links
the character as the source. Pick a character whose main damage really comes from the skill in the title (check its DPS
breakdown), and prefer modest gear over the richest character.

## Automatic data refresh

`.github/workflows/data-refresh.yml` runs every Monday (or by hand from the Actions tab): it refreshes the ladder and
price snapshots, checks the Maxroll source guides, makes sure the site still builds, and opens a "Weekly data refresh"
pull request. Nothing changes on the live site until that PR is merged. The repository must allow GitHub Actions to
create pull requests (Settings → Actions → General → Workflow permissions).

## Search

The header search (Ctrl+K or /) covers pages, builds and guides (passed by the layout at build time) and every gem,
unique and base type (loaded from `public/data/catalog.json` when the search opens).

## Guides

Beginner guides live in `content/guides/<slug>.md` (front matter: `title`, `summary`, `updated`, `sources`) with the
French version in `content/guides/fr/<slug>.md` (`title`, `summary` and the body). They are served at `/guides`.

## Compare

`/compare?a=<slug>&b=<slug>` shows two builds side by side: tiers, profile, skills, shared supports, uniques across all
gear stages, passive tree overlap, strengths and weaknesses.

## Planner

`/planner` renders the passive tree on a canvas (drag to pan, wheel or pinch to zoom). Clicking a node allocates the
shortest path to it; clicking an allocated node refunds it and everything that depended on it. Shift+click an
allocated attribute node to cycle Strength/Dexterity/Intelligence. The whole build (class, ascendancy, passives,
skills, gear) is encoded in the URL hash, so sharing the link shares the build.

Not affiliated with Grinding Gear Games. Path of Exile 2 data and art © Grinding Gear Games.

## My Character

`/character` imports a character from a Path of Building PoE2 export code or a pobb.in link (decoded in the browser,
see `src/lib/pob.ts`). It shows the passive tree, skills and gear, and ranks the guides by similarity
(`src/lib/compare.ts`), listing missing key passives, skills, supports and uniques. `/character#pobb=<id>` is a
shareable link. Logging in with a Path of Exile account (GGG OAuth, `account:characters` scope) is not implemented: it
requires an application approved by GGG and an HTTPS domain.

## Languages

The site is available in English (no URL prefix: `/planner`) and French (`/fr/planner`). All pages live under
`src/app/[lang]/`; `src/proxy.ts` rewrites unprefixed URLs to `/en`, redirects `/en/...` to the canonical URL, and sends
first-time visitors whose browser prefers French to `/fr` (the language switcher stores the choice in the
`NEXT_LOCALE` cookie, which wins afterwards).

- UI strings: `src/i18n/dictionaries/en.ts` and `fr.ts` (the French file is type-checked against the English one).
  Server components use `pageI18n(params)`, client components `useI18n()`.
- Guides: `content/builds/fr/<slug>.md` translates the prose of a guide (front matter `summary`, `pros`, `cons`, `tags`,
  `damage`, `playstyle`, `skillNotes`, `gearNotes`, plus the Markdown body). Facts (skills, passives, gear) stay in the
  English file. `npm run builds:check` reports missing translations.
- Game terms (gems, passives, items, classes) stay in English: no reliable source for the official French names.

## Passive tree art

`scripts/tree-art.mjs` decodes BC7 textures from Path of Building (with `dds-ktx-parser`) into `public/data/tree-art/`:
node frames, the central ring and one illustration per class and ascendancy, drawn behind the tree. The tree has a
fullscreen button (Fullscreen API, with a fixed-overlay fallback where the API is unavailable).

