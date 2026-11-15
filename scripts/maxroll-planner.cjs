// Finds the build planner of a public Maxroll PoE2 build guide.
// A guide can link several planners (an empty test one, a leveling one...): the first one with profiles wins.
// Newer "guide builder" planners hold a single build under `planner` instead of a `profiles` list; it is returned
// as one generic profile ("Variant 1", like multi-variant planners), so callers can always read `data.profiles`.
const UA = { "User-Agent": "Mozilla/5.0" };

async function guidePlanner(guideUrl) {
  const html = await (await fetch(guideUrl, { headers: UA })).text();
  const ids = [...new Set([...html.matchAll(/maxroll\.gg\/poe2\/planner\/([a-z0-9]+)/g)].map((m) => m[1]))];
  let single = null;
  for (const id of ids) {
    const res = await fetch(`https://planners.maxroll.gg/profiles/poe2/${id}`, { headers: UA });
    if (!res.ok) continue;
    const j = await res.json();
    const data = JSON.parse(j.data);
    if (data.profiles?.length) return { id, name: j.name, date: j.date, html, data };
    if (!single && data.planner?.passives) single = { id, name: j.name, date: j.date, html, data: { ...data, profiles: [{ ...data.planner, name: "Variant 1" }] } };
  }
  return single ? single : { id: null, html, data: null };
}

module.exports = { guidePlanner };
