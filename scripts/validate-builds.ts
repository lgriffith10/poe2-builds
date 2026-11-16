// Validates every guide in content/builds against the game data.
// Usage: npm run builds:check
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";
import { getBuilds } from "@/lib/builds";
import { getGuides } from "@/lib/guides";
import { FARMING_GUIDE, MECHANIC_INFO } from "@/lib/farming";
import { tree } from "@/lib/data";
import { MAX_ASCENDANCY_POINTS, MAX_PASSIVE_POINTS, MAX_WEAPON_SET_POINTS } from "@/lib/tree";

let warnings = 0;
for (const b of getBuilds(DEFAULT_LOCALE, true)) {
  const asc = b.planner.nodes.filter((id) => tree.nodes[id].a && tree.nodes[id].t !== "ascStart").length;
  const sets = Object.values(b.planner.weaponSets ?? {});
  const set1 = sets.filter((s) => s === 1).length;
  const set2 = sets.filter((s) => s === 2).length;
  const setInfo = sets.length ? `, weapon sets ${set1}/${set2} of ${MAX_WEAPON_SET_POINTS}` : "";
  console.log(`✓ ${b.slug}: ${b.pointsUsed}/${MAX_PASSIVE_POINTS} passive, ${asc}/${MAX_ASCENDANCY_POINTS} ascendancy${setInfo}${b.treeVariants.length ? `, ${b.treeVariants.length} source trees` : ""}`);
  if (b.pointsUsed > MAX_PASSIVE_POINTS || asc > MAX_ASCENDANCY_POINTS || set1 > MAX_WEAPON_SET_POINTS || set2 > MAX_WEAPON_SET_POINTS) {
    console.warn(`  ⚠ ${b.slug} exceeds the point budget`);
    warnings++;
  }
  if (!b.farming) {
    console.warn(`  ⚠ ${b.slug} has no farming profile: its endgame mechanics are not ranked (see src/lib/farming.ts)`);
    warnings++;
  }
}
// The build pages link each mechanic to its section of the farming guide.
for (const lang of LOCALES) {
  const guide = getGuides(lang).find((g) => `/guides/${g.slug}` === FARMING_GUIDE);
  const broken = Object.values(MECHANIC_INFO).filter((m) => !guide?.html.includes(`id="${m.anchor}"`));
  console.log(`✓ farming guide (${lang}): ${8 - broken.length}/8 mechanic sections`);
  for (const m of broken) {
    console.warn(`  ⚠ ${lang}: no #${m.anchor} section in ${FARMING_GUIDE} for ${m.name}`);
    warnings++;
  }
}
// Translations: each locale must parse, and every guide should have one.
for (const lang of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
  const builds = getBuilds(lang, true);
  const missing = fs
    .readdirSync(path.join("content", "builds"))
    .filter((f) => f.endsWith(".md") && !fs.existsSync(path.join("content", "builds", lang, f)));
  console.log(`✓ ${lang}: ${builds.length - missing.length}/${builds.length} guides translated`);
  for (const f of missing) {
    console.warn(`  ⚠ missing translation content/builds/${lang}/${f} (falls back to English)`);
    warnings++;
  }
}
// Beginner guides (content/guides): every locale must parse; internal #anchors must exist.
for (const lang of LOCALES) {
  const guides = getGuides(lang);
  for (const g of guides) {
    for (const [, slug, anchor] of g.html.matchAll(/href="\/(?:[a-z]{2}\/)?guides\/([a-z0-9-]+)#([a-z0-9-]+)"/g)) {
      const target = guides.find((x) => x.slug === slug);
      if (!target?.html.includes(`id="${anchor}"`)) {
        console.warn(`  ⚠ ${lang}/guides/${g.slug}: broken link to /guides/${slug}#${anchor}`);
        warnings++;
      }
    }
  }
  const missing = lang === DEFAULT_LOCALE ? [] : guides.filter((g) => !fs.existsSync(path.join("content", "guides", lang, `${g.slug}.md`)));
  console.log(`✓ guides (${lang}): ${guides.length - missing.length}/${guides.length}`);
  for (const g of missing) {
    console.warn(`  ⚠ missing translation content/guides/${lang}/${g.slug}.md`);
    warnings++;
  }
}
if (warnings) process.exitCode = 1;
