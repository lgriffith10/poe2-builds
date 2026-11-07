import type { Metadata } from "next";
import { CharacterImport, type CharacterMeta } from "@/components/character/character-import";
import { PageHeader } from "@/components/ui";
import { getDictionary, type Locale } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { getBuilds } from "@/lib/builds";
import type { GuideFingerprint } from "@/lib/compare";
import { classes, getClass, tree } from "@/lib/data";
import { createGraph, findNodeByName } from "@/lib/tree";

export async function generateMetadata({ params }: PageProps<"/[lang]/character">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).character;
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternates("/character", lang) };
}

const graph = createGraph(tree);

// Derived from the guides: computed once per guide list, not on every request.
const memo = new Map<string, { builds: ReturnType<typeof getBuilds>; guides: GuideFingerprint[] }>();

function fingerprints(lang: Locale): GuideFingerprint[] {
  const builds = getBuilds(lang);
  const cached = memo.get(lang);
  if (cached?.builds === builds) return cached.guides;
  const guides: GuideFingerprint[] = builds.map((b) => {
    const cls = getClass(b.className)!;
    return {
      slug: b.slug,
      title: b.title,
      className: b.className,
      ascendancy: b.ascendancy,
      nodes: b.planner.nodes.filter((id) => !["start", "ascStart"].includes(tree.nodes[id].t)),
      keyPassives: [...b.keyPassives, ...b.ascendancyOrder].map((name) => ({
        name,
        id: findNodeByName(graph, name, cls, b.ascendancy)!,
      })),
      skills: b.skills.map(({ gem, supports }) => ({ gem, supports })),
      uniques: Object.values(b.gear)
        .map((g) => g?.unique)
        .filter((u): u is string => Boolean(u)),
    };
  });
  memo.set(lang, { builds, guides });
  return guides;
}

const meta: CharacterMeta = {
  classes: classes.map((c) => ({ name: c.name, ascendancies: c.ascendancies.map((a) => a.name) })),
  treeVersion: tree.version,
};

export default async function CharacterPage({ params }: PageProps<"/[lang]/character">) {
  const { lang, t } = await pageI18n(params);
  const c = t.character;
  return (
    <>
      <PageHeader
        title={c.title}
        sub={
          <>
            {c.introStart} <b className="text-ink">{c.importExport}</b> {c.fromAccount}{" "}
            <b className="text-ink">{c.generate}</b> {c.introEnd}
          </>
        }
      />
      <CharacterImport guides={fingerprints(lang)} meta={meta} />
    </>
  );
}
