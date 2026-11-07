import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuildTreeViewer } from "@/components/build-tree-viewer";
import { ClassEmblem, GemIcon, ItemIcon, Pill, SectionTitle, TierBadge } from "@/components/ui";
import { getBuild, getBuilds } from "@/lib/builds";
import { getBase, getClass, getGem, getUnique, tree } from "@/lib/data";
import { findNodeByName } from "@/lib/tree";
import { createGraph } from "@/lib/tree";
import { GEAR_SLOTS, TIER_CATEGORIES } from "@/lib/types";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export function generateStaticParams() {
  return getBuilds().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/builds/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const build = getBuild(slug, lang);
  if (!build) return {};
  return {
    title: fmt(getDictionary(lang).build.metaTitle, { title: build.title }),
    description: build.summary,
    alternates: alternates(`/builds/${slug}`, lang),
  };
}

const graph = createGraph(tree);

export default async function BuildPage({ params }: PageProps<"/[lang]/builds/[slug]">) {
  const { lang, t: tr, path } = await pageI18n(params);
  const build = getBuild((await params).slug, lang);
  if (!build) notFound();
  const cls = getClass(build.className)!;

  const ascNotables = build.ascendancyOrder.map((name) => {
    const id = findNodeByName(graph, name, cls, build.ascendancy)!;
    return tree.nodes[id];
  });

  const sections = [
    { id: "overview", text: tr.common.overview },
    { id: "skills", text: tr.common.skills },
    { id: "gear", text: tr.common.gear },
    { id: "passives", text: tr.common.passiveTree },
    ...build.toc.filter((t) => t.id !== "overview").map((t) => ({ ...t, id: `guide-${t.id}` })),
  ];
  // Prefix guide heading ids so they never collide with the fixed sections above.
  const html = build.html.replace(/<h([23]) id="/g, '<h$1 id="guide-');

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link href={path("/")} className="text-sm text-muted hover:text-gold">
            {tr.build.allBuilds}
          </Link>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
            <ClassEmblem name={build.className} size={72} />
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-wide sm:text-4xl">{build.title}</h1>
              <p className="mt-1 text-muted">
                {build.ascendancy} · {build.className}
                {build.patch && ` · ${fmt(tr.build.patch, { v: build.patch })}`} ·{" "}
                {fmt(tr.build.updatedBy, { date: build.updated, author: build.author })}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {build.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
                <Pill tone="gold">{fmt(tr.common.difficulty, { v: tr.levels[build.difficulty] })}</Pill>
                <Pill tone="gold">{fmt(tr.common.budget, { v: tr.levels[build.budget] })}</Pill>
              </div>
            </div>
            <div className="flex gap-4">
              {TIER_CATEGORIES.map((c) =>
                build.tiers[c] ? (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <TierBadge tier={build.tiers[c]!} size="lg" />
                    <span className="text-xs uppercase tracking-wider text-faint">{tr.categories[c]}</span>
                  </div>
                ) : null,
              )}
            </div>
          </div>
          {build.sample && (
            <p className="mt-6 rounded-lg border border-amber-700/50 bg-amber-900/15 px-4 py-3 text-sm text-amber-200">
              {tr.build.sampleNotice}
            </p>
          )}
          {build.source && (
            <p className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
              {tr.build.basedOn}{" "}
              <a href={build.source.url} className="font-semibold text-gold underline-offset-2 hover:underline" rel="noopener">
                {build.source.title}
              </a>{" "}
              {tr.build.by} {build.source.author}
              {build.source.updated && ` ${fmt(tr.build.updatedParen, { date: build.source.updated })}`}.{" "}
              {tr.build.sourceNote}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-24 space-y-1 border-l border-line text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 text-muted hover:border-gold hover:text-ink">
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-14">
          <section id="overview" className="scroll-mt-24">
            <SectionTitle>{tr.common.overview}</SectionTitle>
            <p className="text-lg leading-relaxed">{build.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ProsCons title={tr.build.strengths} items={build.pros} tone="pro" />
              <ProsCons title={tr.build.weaknesses} items={build.cons} tone="con" />
            </div>
          </section>

          <section id="skills" className="scroll-mt-24">
            <SectionTitle sub={tr.build.skillsSub}>{tr.common.skills}</SectionTitle>
            <div className="space-y-3">
              {build.skills.map((s) => {
                const gem = getGem(s.gem)!;
                return (
                  <div key={s.gem} className="rounded-xl border border-line bg-surface p-4">
                    <div className="flex items-center gap-3">
                      <GemIcon gem={gem} size={48} />
                      <div>
                        <Link href={path(`/database/gems#${gem.id}`)} className="font-semibold hover:text-gold">
                          {gem.name}
                        </Link>
                        {s.note && <p className="text-sm text-muted">{s.note}</p>}
                      </div>
                    </div>
                    {s.supports.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.supports.map((name) => {
                          const sup = getGem(name)!;
                          return (
                            <Link
                              key={name}
                              href={path(`/database/gems#${sup.id}`)}
                              title={sup.text ?? undefined}
                              className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 py-1 pl-1 pr-3 text-sm hover:border-line-strong"
                            >
                              <GemIcon gem={sup} size={28} />
                              {sup.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section id="gear" className="scroll-mt-24">
            <SectionTitle sub={tr.build.gearSub}>{tr.common.gear}</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {GEAR_SLOTS.filter((slot) => build.gear[slot]).map((slot) => {
                const piece = build.gear[slot]!;
                const unique = piece.unique ? getUnique(piece.unique) : undefined;
                const base = piece.base ? getBase(piece.base) : undefined;
                return (
                  <div key={slot} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
                    <ItemIcon src={unique?.icon ?? base?.icon ?? null} alt={unique?.name ?? base?.name ?? ""} size={64} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-wider text-faint">{tr.slots[slot]}</p>
                      {unique ? (
                        <details>
                          <summary className="cursor-pointer font-semibold text-unique">{unique.name}</summary>
                          <p className="text-xs text-muted">{unique.base}</p>
                          <ul className="mt-1 space-y-0.5 text-sm text-[#8fb6f0]">
                            {[...unique.implicits, ...unique.mods].map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <>
                          <p className="font-semibold text-[#e8d77a]">{fmt(tr.common.rareItem, { base: base?.name ?? tr.slots[slot] })}</p>
                          <ul className="mt-1 space-y-0.5 text-sm text-muted">
                            {piece.mods?.map((m) => (
                              <li key={m}>• {m}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {piece.note && <p className="mt-1 text-xs text-faint">{piece.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="passives" className="scroll-mt-24">
            <SectionTitle sub={fmt(tr.build.pointsAllocated, { n: build.pointsUsed })}>{tr.common.passiveTree}</SectionTitle>
            <BuildTreeViewer planner={build.planner} code={build.plannerCode} />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">{tr.build.ascendancyOrder}</h3>
                <ol className="mt-2 space-y-2">
                  {ascNotables.map((n, i) => (
                    <li key={n.n} className="flex gap-3 rounded-lg border border-line bg-surface p-3">
                      <span className="font-display text-lg text-gold">{i + 1}</span>
                      <div>
                        <p className="font-semibold">{n.n}</p>
                        <ul className="text-sm text-[#8fb6f0]">
                          {n.s?.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold">{tr.build.keyPassives}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {build.keyPassives.map((p) => (
                    <Pill key={p}>{p}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="prose-guide" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </article>
  );
}

function ProsCons({ title, items, tone }: { title: string; items: string[]; tone: "pro" | "con" }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <h3 className={`font-semibold ${tone === "pro" ? "text-[#7fbf6a]" : "text-[#e07a6a]"}`}>{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className={tone === "pro" ? "text-[#7fbf6a]" : "text-[#e07a6a]"}>{tone === "pro" ? "+" : "−"}</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
