// Validates every guide in content/builds against the game data.
// Usage: npm run builds:check
import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";
import { getBuilds } from "@/lib/builds";
import { tree } from "@/lib/data";
import { MAX_ASCENDANCY_POINTS, MAX_PASSIVE_POINTS } from "@/lib/tree";

let warnings = 0;
for (const b of getBuilds()) {
  const asc = b.planner.nodes.filter((id) => tree.nodes[id].a && tree.nodes[id].t !== "ascStart").length;
  console.log(`✓ ${b.slug}: ${b.pointsUsed}/${MAX_PASSIVE_POINTS} passive, ${asc}/${MAX_ASCENDANCY_POINTS} ascendancy`);
  if (b.pointsUsed > MAX_PASSIVE_POINTS || asc > MAX_ASCENDANCY_POINTS) {
    console.warn(`  ⚠ ${b.slug} exceeds the point budget`);
    warnings++;
  }
}
// Translations: each locale must parse, and every guide should have one.
for (const lang of LOCALES.filter((l) => l !== DEFAULT_LOCALE)) {
  const builds = getBuilds(lang);
  const missing = fs
    .readdirSync(path.join("content", "builds"))
    .filter((f) => f.endsWith(".md") && !fs.existsSync(path.join("content", "builds", lang, f)));
  console.log(`✓ ${lang}: ${builds.length - missing.length}/${builds.length} guides translated`);
  for (const f of missing) {
    console.warn(`  ⚠ missing translation content/builds/${lang}/${f} (falls back to English)`);
    warnings++;
  }
}
if (warnings) process.exitCode = 1;
