#!/usr/bin/env node
// Lists the build guides whose Maxroll source was updated after the version we used (front matter `source.updated`).
// Prints a Markdown report; exits 0 either way (it is information for a human, not a failure).
//
// Usage: node scripts/check-sources.mjs [--out report.md]

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "content", "builds");
const outIdx = process.argv.indexOf("--out");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rows = [];
for (const file of (await fs.readdir(DIR)).filter((f) => f.endsWith(".md")).sort()) {
  const text = await fs.readFile(path.join(DIR, file), "utf8");
  const url = text.match(/^\s+url:\s*"?(https:\/\/maxroll\.gg\/[^\s"]+)/m)?.[1];
  const ours = text.match(/^source:[\s\S]*?^\s+updated:\s*"?([\d-]+)/m)?.[1];
  if (!url) continue;
  await sleep(500);
  let theirs = null;
  try {
    const html = await (await fetch(url, { headers: { "user-agent": "ExileCodex source check" } })).text();
    theirs = html.match(/"dateModified"\s*:\s*"([^"T]+)/)?.[1] ?? null;
  } catch (e) {
    console.error(`! ${file}: ${e.message}`);
  }
  if (theirs && ours && theirs > ours) rows.push({ slug: file.replace(/\.md$/, ""), url, ours, theirs });
}

const report = rows.length
  ? [
      `### ${rows.length} source guide(s) updated since our version`,
      "",
      "| Guide | Our version | Maxroll | Source |",
      "| --- | --- | --- | --- |",
      ...rows.map((r) => `| \`${r.slug}\` | ${r.ours} | ${r.theirs} | ${r.url} |`),
      "",
      "Refresh the facts with `npm run draft:maxroll -- <guide-slug>` / `node scripts/leveling-from-maxroll.cjs <slug>` and review the text.",
    ].join("\n")
  : "All Maxroll source guides are unchanged since our versions.";
console.log(report);
if (outIdx > 0) await fs.writeFile(process.argv[outIdx + 1], report + "\n");
