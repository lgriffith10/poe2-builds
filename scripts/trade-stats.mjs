// Saves the official trade site's stat list (pathofexile.com/trade2) so build pages can link to prefilled searches.
// Explicit, pseudo and granted skill stats are kept, as [text, id] pairs. Run again when a patch adds modifiers.
import fs from "node:fs";

const res = await fetch("https://www.pathofexile.com/api/trade2/data/stats", {
  headers: { "User-Agent": "poe2-builds static site generator (trade stats)" },
});
if (!res.ok) throw new Error(`Trade stats: HTTP ${res.status}`);
const { result } = await res.json();
const stats = result
  .filter((g) => g.id === "explicit" || g.id === "pseudo" || g.id === "skill")
  .flatMap((g) => g.entries.map((e) => [e.text, e.id]));
fs.writeFileSync("src/data/generated/trade-stats.json", JSON.stringify(stats) + "\n");
console.log(`${stats.length} trade stats saved.`);
