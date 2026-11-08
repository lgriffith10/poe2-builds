// Adds campaign leveling steps and skill rotations to build guides from their public Maxroll planner.
// Facts only (which gems at which stage, in which order); step and rotation names are Maxroll's labels.
// Also adds `gemPriority`: which skill, spirit and support gems to engrave first, act by act (Maxroll's "Gem Engraving
// Priority", from the planner's skillPriorities).
// Rewrites the `leveling:`, `rotations:` and `gemPriority:` blocks of the front matter and leaves everything else untouched.
//
// Usage: node scripts/leveling-from-maxroll.cjs [slug...]   (no slug = every guide whose source is maxroll.gg)
// Run `npm run data:sync` first.
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS dev script */
const fs = require("fs");
const path = require("path");

const P = path.resolve(__dirname, "..") + "/";
const DIR = P + "content/builds/";
const gems = JSON.parse(fs.readFileSync(P + "src/data/generated/gems.json"));
const gemsRaw = JSON.parse(fs.readFileSync(P + ".cache/raw/skill_gems.json"));
const gemByName = new Map(gems.map((g) => [g.name, g]));

const gemName = (id) => {
  for (const k of [id, id.replace("/Gems/", "/Gem/"), id.replace("/Gem/", "/Gems/")]) {
    const n = gemsRaw[k]?.base_item?.display_name;
    if (n) return n;
  }
  return null;
};

/** Skill groups of a planner step: first gem is the skill, the rest its supports. Unknown gems are dropped. */
function groups(step, warn) {
  const out = [];
  for (const s of step.skills ?? []) {
    const names = s.gems.map((g) => gemName(g.id));
    const known = names.filter((n) => n && gemByName.has(n));
    if (known.length < names.length) warn(`unknown gem(s) in "${step.name}": ${names.filter((n) => !gemByName.has(n)).join(", ")}`);
    if (!known.length) continue;
    const [gem, ...supports] = known;
    // Groups led by a placeholder (e.g. "Companion: {0}") start with a support once it is dropped.
    if (gemByName.get(gem).type === "support") continue;
    if (out.some((x) => x.gem === gem)) continue;
    out.push({ gem, supports: [...new Set(supports)] });
  }
  return out;
}

const isCampaign = (name) => /campaign|leveling|act\s*\d|level\s*\d|interlude/i.test(name);

function leveling(d, warn) {
  const paths = [];
  const profiles = d.profiles.filter((p) => !p.hidden || isCampaign(p.name));
  const campaignProfiles = profiles.filter((p) => isCampaign(p.name));
  if (campaignProfiles.length) {
    for (const p of campaignProfiles) paths.push({ name: p.name, steps: p.skills.steps, rotations: rotationList(p.skillRotations) });
  } else {
    // Single-profile planners keep the campaign as one or more named steps (and act-named rotations).
    const steps = profiles.flatMap((p) => p.skills.steps.filter((s) => isCampaign(s.name)));
    const rots = profiles.flatMap((p) => rotationList(p.skillRotations).filter((r) => isCampaign(r.name)));
    if (steps.length) paths.push({ name: null, steps, rotations: rots });
  }
  return paths
    .map((p) => ({
      name: p.name,
      steps: p.steps.map((s) => ({ name: s.name.trim(), skills: groups(s, warn) })).filter((s) => s.skills.length),
      rotations: p.rotations ?? [],
    }))
    .filter((p) => p.steps.length);
}

/**
 * First post-campaign setup of the guide, appended as the last leveling step so the route ends where the endgame
 * setup starts. Prefers a step or profile about maps; falls back to the first non-campaign setup ("Endgame").
 */
function firstMapStep(d, warn) {
  const visible = d.profiles.filter((p) => !p.hidden);
  const candidates = visible.flatMap((p) =>
    isCampaign(p.name) ? [] : p.skills.steps.filter((st) => !isCampaign(st.name)).map((st) => ({ p, st })),
  );
  const isMaps = ({ p, st }) => /map/i.test(st.name) || /map/i.test(p.name);
  const pick = candidates.find(isMaps) ?? candidates[0];
  if (!pick) return null;
  const skills = groups(pick.st, warn);
  return skills.length ? { name: isMaps(pick) ? "Early Maps" : "Endgame", skills } : null;
}

// Some planners label rotations in capitals ("SINGLE TARGET").
const titleIfCaps = (s) => (s === s.toUpperCase() ? s.toLowerCase().replace(/(^|[\s&/(-])\p{L}/gu, (c) => c.toUpperCase()) : s);

/**
 * Planner rotations -> [{ name, steps: [{ gem, count?, label? }] }]. A group's text becomes the label of its first
 * step, unless it only repeats the gem name.
 */
function rotationList(skillRotations) {
  return (skillRotations ?? [])
    .map((r) => {
      const steps = [];
      for (const g of r.groups ?? []) {
        const text = (g.text ?? "").trim();
        let first = true;
        for (const gem of g.gems ?? []) {
          const name = gemName(gem.id);
          if (!name || !gemByName.has(name)) continue;
          const label = first && text && text.toLowerCase() !== name.toLowerCase() ? titleIfCaps(text) : undefined;
          first = false;
          const last = steps.at(-1);
          if (last?.gem === name && !label) last.count = (last.count ?? 1) + 1;
          else steps.push({ gem: name, ...(label && { label }) });
        }
      }
      return { name: titleIfCaps(r.name.trim()), steps };
    })
    .filter((r) => r.steps.length > 1);
}
function rotations(d) {
  const preferred =
    d.profiles.find((p) => /map|endgame/i.test(p.name) && !/aspir|min.?max/i.test(p.name) && p.skillRotations?.length) ??
    d.profiles.find((p) => p.skillRotations?.length);
  return rotationList(preferred?.skillRotations);
}
/** Engraving priority by category, from the first profile that has one: [{ label, gems }] per category. */
function gemPriority(d) {
  const sp = d.profiles.map((p) => p.skillPriorities).find((x) => x && Object.values(x).some((v) => v?.length));
  if (!sp) return null;
  const out = {};
  for (const [key, cat] of [["active", "skills"], ["spirit", "spirit"], ["support", "supports"]]) {
    const stages = (sp[key] ?? [])
      .map((g) => ({
        label: titleIfCaps((g.text ?? "").trim()),
        gems: [...new Set((g.gems ?? []).map((x) => gemName(x.id)).filter((n) => n && gemByName.has(n)))],
      }))
      .filter((g) => g.gems.length);
    if (stages.length) out[cat] = stages;
  }
  return Object.keys(out).length ? out : null;
}

const q = (s) => JSON.stringify(s);
const rotationStep = (st, ind) => [
  `${ind}- gem: ${q(st.gem)}`,
  ...(st.count ? [`${ind}  count: ${st.count}`] : []),
  ...(st.label ? [`${ind}  label: ${q(st.label)}`] : []),
];
const list = (xs) => `[${xs.map((x) => (/^[\w' -]+$/.test(x) && !/^\d/.test(x) ? x : q(x))).join(", ")}]`;

function yaml(paths, rots, levelingSource, priority) {
  const out = [];
  if (priority) {
    out.push("gemPriority:");
    for (const [cat, stages] of Object.entries(priority)) {
      out.push(`  ${cat}:`);
      for (const st of stages) out.push(`    - label: ${q(st.label)}`, `      gems: ${list(st.gems)}`);
    }
  }
  if (levelingSource) {
    out.push("levelingSource:", `  title: ${q(levelingSource.title)}`, `  url: ${levelingSource.url}`);
  }
  if (paths.length) {
    out.push("leveling:");
    for (const p of paths) {
      if (p.name) out.push(`  - name: ${q(p.name)}`, "    steps:");
      else out.push("  - steps:");
      for (const s of p.steps) {
        out.push(`      - name: ${q(s.name)}`, "        skills:");
        for (const g of s.skills) {
          out.push(`          - gem: ${q(g.gem)}`);
          if (g.supports.length) out.push(`            supports: ${list(g.supports)}`);
        }
      }
      if (p.rotations?.length) {
        out.push("    rotations:");
        for (const r of p.rotations) {
          out.push(`      - name: ${q(r.name)}`, "        steps:");
          for (const st of r.steps) out.push(...rotationStep(st, "          "));
        }
      }
    }
  }
  if (rots.length) {
    out.push("rotations:");
    for (const r of rots) {
      out.push(`  - name: ${q(r.name)}`, "    steps:");
      for (const st of r.steps) out.push(...rotationStep(st, "      "));
    }
  }
  return out;
}

/** Replaces (or inserts before `gear:`) the top-level leveling/rotations blocks of a front matter. */
function rewrite(file, block) {
  const text = fs.readFileSync(file, "utf8");
  const end = text.indexOf("\n---", 4);
  const lines = text.slice(0, end).split("\n");
  const kept = [];
  let skipping = false;
  for (const line of lines) {
    if (/^(leveling|levelingSource|rotations|gemPriority):/.test(line)) skipping = true;
    else if (skipping && /^\S/.test(line)) skipping = false;
    if (!skipping) kept.push(line);
  }
  const at = kept.findIndex((l) => /^gear:/.test(l));
  kept.splice(at < 0 ? kept.length : at, 0, ...block);
  fs.writeFileSync(file, kept.join("\n") + text.slice(end));
}

async function loadGuide(url) {
  const html = await (await fetch(url)).text();
  const id = html.match(/maxroll\.gg\/poe2\/planner\/([a-z0-9]+)/)?.[1];
  if (!id) return null;
  const j = await (await fetch(`https://planners.maxroll.gg/profiles/poe2/${id}`)).json();
  const link = html.match(/href="((?:https:\/\/maxroll\.gg)?\/poe2\/build-guides\/[a-z0-9-]+-leveling-guide)"/)?.[1];
  const title = html.match(/<title>([^<]*?) - Path of Exile 2/)?.[1] ?? url;
  return {
    planner: JSON.parse(j.data),
    title,
    levelingUrl: link && link !== url.replace("https://maxroll.gg", "") ? new URL(link, "https://maxroll.gg").href : null,
  };
}

(async () => {
  const wanted = process.argv.slice(2);
  const files = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !wanted.length || wanted.includes(f.replace(/\.md$/, "")));
  for (const f of files) {
    const url = fs.readFileSync(DIR + f, "utf8").match(/^\s+url:\s*"?(https:\/\/maxroll\.gg\/[^\s"]+)/m)?.[1];
    if (!url) {
      console.log(`- ${f}: no Maxroll source, skipped`);
      continue;
    }
    const guide = await loadGuide(url);
    if (!guide) {
      console.log(`! ${f}: no planner on ${url}`);
      continue;
    }
    const warnings = [];
    let paths = leveling(guide.planner, (w) => warnings.push(w));
    let levelingSource = null;
    let priority = gemPriority(guide.planner);
    // Endgame-only guides link to a separate leveling guide: take the campaign from its planner.
    if (!paths.length && guide.levelingUrl) {
      const lv = await loadGuide(guide.levelingUrl);
      paths = lv ? leveling(lv.planner, (w) => warnings.push(w)) : [];
      if (paths.length) levelingSource = { title: lv.title, url: guide.levelingUrl };
      if (!priority && lv) priority = gemPriority(lv.planner);
    }
    const end = paths.length ? firstMapStep(guide.planner, (w) => warnings.push(w)) : null;
    if (end) paths.at(-1).steps.push(end);
    const rots = rotations(guide.planner);
    rewrite(DIR + f, yaml(paths, rots, levelingSource, priority));
    const steps = paths.map((p) => `${p.name ?? "campaign"}: ${p.steps.length}`).join(", ");
    const actRots = paths.flatMap((p) => p.rotations.map((r) => r.name));
    console.log(`✓ ${f}: gem priority [${priority ? Object.entries(priority).map(([k, v]) => `${k} ${v.length}`).join(", ") : "none"}]`);
    console.log(`✓ ${f}: campaign rotations [${actRots.join(", ") || "none"}]`);
    console.log(`✓ ${f}: leveling [${steps || "none"}]${levelingSource ? ` from ${levelingSource.url}` : ""}, rotations [${rots.map((r) => r.name).join(", ") || "none"}]`);
    for (const w of [...new Set(warnings)]) console.log(`    note: ${w}`);
  }
})();
