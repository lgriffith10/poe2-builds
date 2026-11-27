// The PoE2 1.0 release: date, what is confirmed, and the patch note changes once published (content/patch/1.0.json),
// crossed with the site's builds. Until the notes are out, `changes` is empty and pages say so.
import patchJson from "../../content/patch/1.0.json";

export const RELEASE = {
  version: "1.0",
  /** Launch day (Pacific time). */
  date: "2026-12-11",
  /** Exact launch moment (ISO, with offset) once GGG announces it; null until then. */
  launchAt: null as string | null,
  sources: [
    { title: "Path of Exile 2 Fully Releases on December 11! (pathofexile.com)", url: "https://www.pathofexile.com/forum/view-thread/3999366" },
    { title: "ExileCon 2026 Announcements (pathofexile.com)", url: "https://www.pathofexile.com/forum/view-thread/4012710" },
  ],
};

/** Midnight Pacific time on launch day (PST is UTC-8): the countdown runs to the day while the hour is unknown. */
export const releaseMoment = () => new Date(RELEASE.launchAt ?? `${RELEASE.date}T00:00:00-08:00`);

export type ChangeKind = "gem" | "unique" | "passive" | "mechanic" | "class";
export type ChangeType = "buff" | "nerf" | "rework" | "removed" | "new";

export interface PatchChange {
  kind: ChangeKind;
  /** Exact in-game name (gem, unique, notable…), used to find the builds that use it. */
  name: string;
  type: ChangeType;
  text: { en: string; fr: string };
}

export interface PatchNotes {
  version: string;
  published: boolean;
  notesUrl: string | null;
  changes: PatchChange[];
}

export const patch = patchJson as PatchNotes;

/** What a build uses that a change can touch. */
export interface BuildFootprint {
  gems: string[];
  uniques: string[];
  passives: string[];
}

/** Changes that touch a build: its gems, its uniques or its key passives. */
export function changesFor(fp: BuildFootprint, changes: PatchChange[] = patch.changes): PatchChange[] {
  const gems = new Set(fp.gems);
  const uniques = new Set(fp.uniques);
  const passives = new Set(fp.passives);
  return changes.filter(
    (c) => (c.kind === "gem" && gems.has(c.name)) || (c.kind === "unique" && uniques.has(c.name)) || (c.kind === "passive" && passives.has(c.name)),
  );
}

/** Whether a build was written for an earlier version than the release (e.g. "0.5.5" before "1.0"). */
export const beforeRelease = (buildPatch: string) => {
  const [a, b] = [buildPatch, RELEASE.version].map((v) => v.split(".").map(Number));
  for (let i = 0; i < Math.max(a.length, b.length); i++) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) < (b[i] ?? 0);
  return false;
};
