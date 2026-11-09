import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TipScope } from "@/components/ref-tooltips";
import { BuildTreeViewer } from "@/components/build-tree-viewer";
import { FavoriteButton } from "@/components/favorite-button";
import { GearInventory } from "@/components/gear-inventory";
import { LevelingTimeline, type TimelinePath } from "@/components/leveling-timeline";
import { RotationStrip, type RotationGem, type RotationView } from "@/components/rotation-strip";
import { stepFr } from "@/lib/step-labels";
import { ClassEmblem, GemIcon, Pill, SectionTitle, TierBadge } from "@/components/ui";
import { gemTip } from "@/lib/tips";
import { getBuild, getBuilds, type GemPriority } from "@/lib/builds";
import { getClass, getGem, tree } from "@/lib/data";
import { inventoryStages } from "@/lib/inventory";
import { skillSources, type SkillSource } from "@/lib/skill-source";
import { ladderPopularity } from "@/lib/ladder";
import { prices } from "@/lib/prices";

const pctText = (share: number, lang: string) =>
  new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", { style: "percent", maximumFractionDigits: share >= 0.1 ? 0 : 1 }).format(share);
import { findNodeByName } from "@/lib/tree";
import { createGraph } from "@/lib/tree";
import { TIER_CATEGORIES, type SkillRotation } from "@/lib/types";
import { fmt, getDictionary, type Dictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { WEAPON_SET_COLORS } from "@/lib/weapon-sets";
import { articleLd, breadcrumbLd, JsonLd } from "@/components/json-ld";
import { SITE_NAME } from "@/lib/site";

export function generateStaticParams() {
  return getBuilds().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/builds/[slug]">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const build = getBuild(slug, lang);
  if (!build) return {};
  const t = getDictionary(lang);
  const title = fmt(t.build.metaTitle, { title: build.title, patch: build.patch || "0.5" });
  const description = fmt(t.meta.buildDescription, { summary: build.summary, patch: build.patch || "0.5" });
  return {
    title,
    description,
    alternates: alternates(`/builds/${slug}`, lang),
    openGraph: {
      title,
      description,
      type: "article",
      modifiedTime: build.updated || undefined,
      siteName: SITE_NAME,
      locale: t.meta.ogLocale,
    },
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

  const inventory = inventoryStages(build, tr, lang);
  const sources = skillSources(build);
  const sourceLabel = (src: SkillSource) => fmt(tr.build.skillFrom[src.kind], { from: "from" in src ? src.from : "" });
  const popularity = ladderPopularity(build);

  const gemView = (name: string): RotationGem => {
    const { id, icon, color } = getGem(name)!;
    return { id, name, icon, color, tip: gemTip(name)! };
  };
  const rotationView = (r: SkillRotation): RotationView => ({
    name: r.name,
    steps: r.steps.map((st) => ({ gem: gemView(st.gem), count: st.count, label: st.label })),
  });

  // Resolve leveling gems for the client and flag those absent from the previous step of the same path.
  // Campaign rotations named after an act ("Act 2 Bosses") go under the first step of that act.
  const leveling: TimelinePath[] = build.leveling.map((p) => {
    const stepKeys = p.steps.map((st) => ({ act: actOf(st.name), step: stepOf(st.name) }));
    const placed = new Map<number, RotationView[]>();
    const general: RotationView[] = [];
    for (const r of p.rotations ?? []) {
      const act = actOf(r.name);
      const step = stepOf(r.name);
      // Same act and step number ("Act 1 Step 3"), else the first step of that act.
      let at = act === null ? -1 : stepKeys.findIndex((k) => k.act === act && step !== null && k.step === step);
      if (at < 0 && act !== null) at = stepKeys.findIndex((k) => k.act === act);
      if (at < 0) general.push(rotationView(r));
      else placed.set(at, [...(placed.get(at) ?? []), rotationView(r)]);
    }
    return {
      name: p.name,
      rotations: general,
      steps: p.steps.map((step, i) => {
        const before = new Set(i ? p.steps[i - 1].skills.flatMap((s) => [s.gem, ...s.supports]) : []);
        const info = (name: string) => ({ ...gemView(name), isNew: i > 0 && !before.has(name) });
        return {
          name: step.name,
          skills: step.skills.map((s) => ({ gem: info(s.gem), supports: s.supports.map(info) })),
          rotations: placed.get(i) ?? [],
        };
      }),
    };
  });

  const sections = [
    { id: "overview", text: tr.common.overview },
    { id: "skills", text: tr.common.skills },
    ...(leveling.length ? [{ id: "leveling", text: tr.build.leveling }] : []),
    { id: "gear", text: tr.common.gear },
    { id: "passives", text: tr.common.passiveTree },
    ...build.toc.filter((t) => t.id !== "overview").map((t) => ({ ...t, id: `guide-${t.id}` })),
  ];
  // Prefix guide heading ids so they never collide with the fixed sections above.
  const html = build.html.replace(/<h([23]) id="/g, '<h$1 id="guide-');

  return (
    <article>
      <JsonLd
        data={[
          articleLd({
            url: path(`/builds/${build.slug}`),
            title: fmt(tr.build.metaTitle, { title: build.title, patch: build.patch || "0.5" }),
            description: build.summary,
            lang,
            updated: build.updated || undefined,
          }),
          breadcrumbLd([
            [tr.nav.builds, path("/")],
            [build.title, path(`/builds/${build.slug}`)],
          ]),
        ]}
      />
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link href={path("/")} className="text-sm text-muted hover:text-gold">
              {tr.build.allBuilds}
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <FavoriteButton slug={build.slug} title={build.title} labeled />
              <Link
                href={path(`/compare?a=${build.slug}`)}
              className="rounded-lg border border-gold-soft px-3 py-1 text-sm text-gold hover:bg-gold/10"
            >
                {tr.build.compareWith} →
              </Link>
            </div>
          </div>
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
          {popularity && (
            <p className="mt-4 text-sm text-muted">
              <span className="mr-2 rounded border border-line px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-faint">
                {tr.ladderMeta.title}
              </span>
              {popularity.skill
                ? fmt(tr.ladderMeta.popularity, {
                    p: pctText(popularity.skill.share, lang),
                    asc: build.ascendancy,
                    skill: popularity.skill.name,
                  })
                : fmt(tr.ladderMeta.popularityAsc, { p: pctText(popularity.ascendancyShare, lang), asc: build.ascendancy })}{" "}
              ·{" "}
              <Link href={path("/meta")} className="text-gold hover:underline">
                {tr.nav.meta} →
              </Link>
            </p>
          )}
          {build.source && (
            <p className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
              {build.origin === "ladder" ? tr.build.drawnFrom : tr.build.basedOn}{" "}
              <a href={build.source.url} className="font-semibold text-gold underline-offset-2 hover:underline" rel="noopener">
                {build.source.title}
              </a>{" "}
              {tr.build.by} {build.source.author}
              {build.source.updated && ` ${fmt(tr.build.updatedParen, { date: build.source.updated })}`}.{" "}
              {build.origin === "ladder" ? tr.build.ladderNote : tr.build.sourceNote}
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

        <TipScope className="min-w-0 space-y-14">
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
            <p className="-mt-3 mb-4 text-xs text-faint">{tr.build.skillFromHint}</p>
            <div className="space-y-3">
              {build.skills.map((s) => {
                const gem = getGem(s.gem)!;
                return (
                  <div key={s.gem} className="rounded-xl border border-line bg-surface p-4">
                    <div className="flex items-center gap-3">
                      <GemIcon gem={gem} size={48} />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={path(`/database/gems#${gem.id}`)}
                          data-tip={gemTip(gem.name)}
                          className="font-semibold hover:text-gold"
                        >
                          {gem.name}
                        </Link>
                        {s.note && <p className="text-sm text-muted">{s.note}</p>}
                      </div>
                      {s.weaponSet && (
                        <span
                          className="whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-semibold"
                          style={{ color: WEAPON_SET_COLORS[s.weaponSet].light, borderColor: WEAPON_SET_COLORS[s.weaponSet].main }}
                          title={tr.build.weaponSetSkillHint}
                        >
                          {s.weaponSet === 1 ? tr.tree.weaponSet1 : tr.tree.weaponSet2}
                        </span>
                      )}
                      <SourceChip source={sources.get(s.gem)!} label={sourceLabel(sources.get(s.gem)!)} />
                    </div>
                    {s.supports.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.supports.map((name) => {
                          const sup = getGem(name)!;
                          return (
                            <Link
                              key={name}
                              href={path(`/database/gems#${sup.id}`)}
                              data-tip={gemTip(sup.name)}
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
            {build.rotations.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold">{tr.build.rotation}</h3>
                <p className="text-sm text-muted">{tr.build.rotationSub}</p>
                <div className="mt-3 grid gap-3 lg:grid-cols-2">
                  {build.rotations.map((r) => (
                    <RotationStrip key={r.name} rotation={localizeRotation(rotationView(r), lang)} gemsHref={path("/database/gems")} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {leveling.length > 0 && (
            <section id="leveling" className="scroll-mt-24">
              <SectionTitle
                sub={
                  <>
                    {tr.build.levelingSub}
                    {build.levelingSource && (
                      <>
                        {" "}
                        {tr.build.levelingFrom}{" "}
                        <a href={build.levelingSource.url} rel="noopener" className="text-gold hover:underline">
                          {build.levelingSource.title}
                        </a>
                        .
                      </>
                    )}
                  </>
                }
              >
                {tr.build.leveling}
              </SectionTitle>
              <LevelingTimeline paths={leveling} storageKey={build.slug} />
              {build.gemPriority && (
                <GemPriorityTable
                  priority={build.gemPriority}
                  tr={tr}
                  path={path}
                  label={(l) => (lang === "fr" ? stepFr(l) : l)}
                />
              )}
            </section>
          )}

          <section id="gear" className="scroll-mt-24">
            <SectionTitle sub={tr.build.gearSub}>{tr.common.gear}</SectionTitle>
            <GearInventory
              stages={inventory.stages}
              initialStage={inventory.initial}
              slotLabels={tr.slots}
              weaponSetsLabel={tr.tree.weaponSets}
              weaponLabels={{ title: tr.build.weapons, set1: tr.tree.weaponSet1, set2: tr.tree.weaponSet2 }}
              labels={{ runes: tr.build.socketed, ladder: tr.build.ladderSlot }}
              hint={`${tr.build.inventoryHint} ${tr.build.modHint}`}
              priceLabels={{
                divine: "Divine Orb",
                exalted: "Exalted Orb",
                stageTotal: tr.build.stageTotal,
                note: fmt(tr.build.priceNote, { league: prices.league, date: prices.fetchedAt }),
              }}
            />
          </section>

          <section id="passives" className="scroll-mt-24">
            <SectionTitle sub={fmt(tr.build.pointsAllocated, { n: build.pointsUsed })}>{tr.common.passiveTree}</SectionTitle>
            <BuildTreeViewer planner={build.planner} code={build.plannerCode} steps={build.passiveSteps} />
            <div className="mt-6">
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
            </div>
          </section>

          <section className="prose-guide" dangerouslySetInnerHTML={{ __html: html }} />
        </TipScope>
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

const SOURCE_STYLE: Record<SkillSource["kind"], string> = {
  weapon: "border-amber-600/50 bg-amber-500/10 text-amber-200",
  item: "border-unique/50 bg-unique/10 text-unique",
  ascendancy: "border-violet-500/50 bg-violet-500/10 text-violet-200",
  gem: "border-line-strong text-muted",
  spirit: "border-teal-500/40 bg-teal-500/10 text-teal-200",
};
const SOURCE_ICON: Record<SkillSource["kind"], string> = { weapon: "⚔", item: "◈", ascendancy: "✦", gem: "◆", spirit: "◇" };

function SourceChip({ source, label }: { source: SkillSource; label: string }) {
  return (
    <span className={`shrink-0 self-start rounded-full border px-2.5 py-0.5 text-xs ${SOURCE_STYLE[source.kind]}`}>
      <span aria-hidden className="mr-1">
        {SOURCE_ICON[source.kind]}
      </span>
      {label}
    </span>
  );
}

const ROMAN: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4 };
/** Act number in a step or rotation name ("Act 2", "Act1 Step 3", "ACT I"), or null. */
function actOf(name: string): number | null {
  const m = name.match(/\bact\s*(\d+|iv|i{1,3})\b/i);
  if (!m) return null;
  return /\d/.test(m[1]) ? Number(m[1]) : ROMAN[m[1].toLowerCase()];
}
/** Step number in a name ("Act1 Step 1 & 2" -> 1), or null. */
function stepOf(name: string): number | null {
  const m = name.match(/\bstep\s*(\d+)/i);
  return m ? Number(m[1]) : null;
}
const localizeRotation = (r: RotationView, lang: string): RotationView =>
  lang === "fr" ? { ...r, name: stepFr(r.name), steps: r.steps.map((st) => ({ ...st, label: st.label && stepFr(st.label) })) } : r;

/** Engraving priority per category: each stage (usually an act) lists its gems in the order to engrave them. */
function GemPriorityTable({
  priority,
  tr,
  path,
  label,
}: {
  priority: GemPriority;
  tr: Dictionary;
  path: (p: string) => string;
  /** Localizes a stage label ("Act I"). */
  label: (s: string) => string;
}) {
  const cats = (["skills", "spirit", "supports"] as const).filter((c) => priority[c]?.length);
  return (
    <div className="mt-6">
      <h3 className="font-semibold">{tr.build.gemPriority}</h3>
      <p className="text-sm text-muted">{tr.build.gemPrioritySub}</p>
      <div className={`mt-3 grid gap-3 ${cats.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {cats.map((cat) => (
          <div key={cat} className="rounded-xl border border-line bg-surface p-3">
            <p className="font-display text-sm font-semibold uppercase tracking-wider text-gold">{tr.build.gemPriorityCats[cat]}</p>
            <ol className="mt-2 space-y-3">
              {priority[cat]!.map((st) => (
                <li key={st.label}>
                  <p className="text-xs uppercase tracking-wider text-faint">{label(st.label)}</p>
                  <ol className="mt-1 space-y-1">
                    {st.gems.map((name, i) => {
                      const gem = getGem(name)!;
                      return (
                        <li key={name} className="flex items-center gap-2 text-sm">
                          <span className="w-4 text-right text-xs tabular-nums text-faint">{i + 1}</span>
                          <GemIcon gem={gem} size={22} />
                          <Link href={path(`/database/gems#${gem.id}`)} data-tip={gemTip(gem.name)} className="hover:text-gold">
                            {gem.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
