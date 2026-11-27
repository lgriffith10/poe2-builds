import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TipScope } from "@/components/ref-tooltips";
import { BuildTreeViewer } from "@/components/build-tree-viewer";
import { FavoriteButton } from "@/components/favorite-button";
import { GearInventory } from "@/components/gear-inventory";
import { LootFilterPanel } from "@/components/loot-filter-panel";
import { FarmingRanking } from "@/components/farming-ranking";
import { rankMechanics } from "@/lib/farming";
import { StatPriority } from "@/components/stat-priority";
import { statPriority } from "@/lib/stat-priority";
import { filterTargets, lootFilter } from "@/lib/loot-filter";
import { localePath } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";
import { LevelingTimeline, type TimelinePath } from "@/components/leveling-timeline";
import { PlayView, type PlayGearStage } from "@/components/play-view";
import { BuildTabs } from "@/components/build-tabs";
import { ReleaseBanner } from "@/components/release-banner";
import { beforeRelease, patch as releasePatch, releaseMoment } from "@/lib/release";
import { buildChanges } from "@/lib/release-builds";
import { classStyle } from "@/lib/classes";
import { GemCheck, SkillGroupDone, SkillsProgress } from "@/components/gem-checklist";
import { supportKey } from "@/lib/gem-checklist";
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

// Every build page is prerendered (generateStaticParams), so a navigation only waits for its static payload:
// no loading shell is needed, and the dev "instant navigation" check is turned off for this route.
export const instant = false;

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
  const farming = build.farming && rankMechanics(build.farming, lang, build.farmingNotes);

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

  const tabs = [
    { id: "overview", text: tr.build.guideTab },
    { id: "skills", text: tr.common.skills },
    ...(leveling.length ? [{ id: "leveling", text: tr.build.leveling }] : []),
    { id: "gear", text: tr.common.gear },
    { id: "passives", text: tr.common.passiveTree },
    ...(farming ? [{ id: "farming", text: tr.build.farming.title }] : []),
  ];
  const guideToc = build.toc.filter((t) => t.id !== "overview").map((t) => ({ ...t, id: `guide-${t.id}` }));
  const statStages = statPriority(inventory.stages, build.origin === "guide");
  const playStage = (i: number): PlayGearStage => ({
    id: inventory.stages[i].id,
    label: inventory.stages[i].label || tr.common.gear,
    items: inventory.stages[i].items.map((it) => ({
      slot: it.slot,
      slotLabel: it.slotLabel,
      title: it.title,
      kind: it.kind,
      icon: it.icon,
      mods: it.mods,
      ranked: it.ranked,
      grantsUsed: it.grantsUsed,
      runes: it.runes.map((r) => ({ count: r.count, name: r.name, effect: r.effect, icon: r.icon })),
      note: it.note,
      trade: it.trade,
      price: it.price,
    })),
    stats: statStages[i] ?? null,
  });
  const campaignIndex = inventory.stages.findIndex((s) => s.id === "campaign");
  const playGear = inventory.stages
    .map((_, i) => i)
    .filter((i) => !(leveling.length && i === campaignIndex))
    .map(playStage);
  const playLinks = [
    ...(leveling.length ? [{ id: "leveling", text: tr.build.leveling }] : []),
    { id: "gear", text: tr.common.gear },
    { id: "loot-filter", text: tr.build.lootFilter.title },
    { id: "stats", text: tr.build.statPriority.title },
    ...(farming ? [{ id: "farming", text: tr.build.farming.title }] : []),
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
            [tr.nav.builds, path("/builds")],
            [build.title, path(`/builds/${build.slug}`)],
          ]),
        ]}
      />
      <header className="relative overflow-hidden border-b border-line">
        {/* The class colour lights the header from behind the emblem. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(700px 320px at 8% 30%, ${classStyle(build.className).color}26, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link href={path("/builds")} className="text-sm text-muted hover:text-gold">
              {tr.build.allBuilds}
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <FavoriteButton slug={build.slug} title={build.title} labeled />
              <Link
                href={path(`/compare?a=${build.slug}`)}
                className="rounded-lg border border-line px-3 py-1 text-sm text-muted hover:border-gold-soft hover:text-gold"
              >
                {tr.build.compareWith}
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex gap-5">
              <span className="hidden sm:block">
                <ClassEmblem name={build.className} size={84} />
              </span>
              <div className="min-w-0">
                <h1 className="font-display text-3xl font-bold tracking-wide sm:text-[2.6rem] sm:leading-tight">{build.title}</h1>
                <p className="mt-1 text-muted">
                  <span className="text-ink">{build.ascendancy}</span>, {build.className}
                  <span className="text-faint">
                    {" "}
                    — {build.patch && `${fmt(tr.build.patch, { v: build.patch })}, `}
                    {fmt(tr.build.updatedBy, { date: build.updated, author: build.author })}
                  </span>
                </p>
                {/* The build's identity is its skills: the main ones, as the game shows them. */}
                <ul className="mt-4 flex flex-wrap items-center gap-2">
                  {build.skills.slice(0, 5).map((s, i) => {
                    const g = getGem(s.gem)!;
                    return (
                      <li key={s.gem}>
                        <Link
                          href={path(`/database/gems#${g.id}`)}
                          data-tip={gemTip(g.name)}
                          className={`flex items-center gap-2 rounded-lg border bg-surface/80 p-1 text-sm sm:pr-3 ${i === 0 ? "pr-3" : ""} hover:border-gold-soft ${i === 0 ? "border-gold-soft font-semibold text-ink" : "border-line text-muted"}`}
                        >
                          <GemIcon gem={g} size={i === 0 ? 34 : 28} />
                          <span className={i === 0 ? undefined : "sr-only sm:not-sr-only"}>{g.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <dl className="flex gap-3 md:justify-end">
              {TIER_CATEGORIES.map((c) => {
                const r = build.ratings[c];
                return r ? (
                  <div key={c} className="flex w-20 flex-col items-center gap-1.5 text-center">
                    <dd>
                      <TierBadge
                        tier={r.tier}
                        size="lg"
                        estimated={r.estimated}
                        title={r.estimated ? fmt(tr.common.estimatedTier, { tier: r.tier }) : undefined}
                      />
                    </dd>
                    <dt className="text-xs leading-tight text-muted">
                      {tr.categories[c]}
                      {r.estimated && <span className="block text-[10px] text-faint">{tr.common.estimated}</span>}
                    </dt>
                  </div>
                ) : null;
              })}
            </dl>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Pill tone="gold">{fmt(tr.common.difficulty, { v: tr.levels[build.difficulty] })}</Pill>
            <Pill tone="gold">{fmt(tr.common.budget, { v: tr.levels[build.budget] })}</Pill>
            {popularity && (
              <span className="text-muted">
                {popularity.skill
                  ? fmt(tr.ladderMeta.popularity, {
                      p: pctText(popularity.skill.share, lang),
                      asc: build.ascendancy,
                      skill: popularity.skill.name,
                    })
                  : fmt(tr.ladderMeta.popularityAsc, { p: pctText(popularity.ascendancyShare, lang), asc: build.ascendancy })}{" "}
                <Link href={path("/meta")} className="text-gold hover:underline">
                  {tr.nav.meta}
                </Link>
              </span>
            )}
          </div>
          {beforeRelease(build.patch) && (
            <ReleaseBanner
              patch={build.patch}
              releaseAt={releaseMoment().toISOString()}
              published={releasePatch.published}
              changed={[...new Set(buildChanges(build).map((c) => c.name))]}
            />
          )}
          {build.sample && (
            <p className="mt-4 rounded-lg border border-amber-700/50 bg-amber-900/15 px-4 py-3 text-sm text-amber-200">
              {tr.build.sampleNotice}
            </p>
          )}
          {build.source && (
            <p className="mt-4 max-w-4xl text-xs leading-relaxed text-faint">
              {build.origin === "guide" ? tr.build.basedOn : tr.build.drawnFrom}{" "}
              <a href={build.source.url} className="text-gold-soft underline-offset-2 hover:text-gold hover:underline" rel="noopener">
                {build.source.title}
              </a>{" "}
              {tr.build.by} {build.source.author}
              {build.source.updated && ` ${fmt(tr.build.updatedParen, { date: build.source.updated })}`}.{" "}
              {build.origin === "ladder" ? tr.build.ladderNote : build.origin === "creator" ? tr.build.creatorNote : tr.build.sourceNote}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-20">
        <TipScope className="min-w-0">
          <PlayView
            slug={build.slug}
            title={build.title}
            leveling={leveling}
            skills={build.skills.map((s) => ({ gem: gemView(s.gem), supports: s.supports.map(gemView) }))}
            rotations={build.rotations.map((r) => rotationView(r))}
            gear={playGear}
            campaign={leveling.length && campaignIndex >= 0 ? playStage(campaignIndex) : null}
            ascendancy={ascNotables.map((n) => ({ name: n.n, stats: n.s ?? [] }))}
            links={playLinks}
            plannerHref={path(`/planner#${build.plannerCode}`)}
            tree={{
              planner: build.planner,
              code: build.plannerCode,
              steps: build.passiveSteps,
              variants: build.treeVariants,
              variantsSource: build.treeVariantsSource,
            }}
          />
          <BuildTabs tabs={tabs}>
          <section id="overview" data-panel="overview" className="scroll-mt-32">
            <p className="text-lg leading-relaxed">{build.summary}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ProsCons title={tr.build.strengths} items={build.pros} tone="pro" />
              <ProsCons title={tr.build.weaknesses} items={build.cons} tone="con" />
            </div>
            {guideToc.length > 0 && (
              <nav aria-label={tr.build.guideContents} className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-y border-line py-3 text-sm">
                {guideToc.map((x) => (
                  <a key={x.id} href={`#${x.id}`} className="text-muted hover:text-gold">
                    {x.text}
                  </a>
                ))}
              </nav>
            )}
            <div className="prose-guide mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          </section>

          <section id="skills" data-panel="skills" className="scroll-mt-32">
            <SectionTitle sub={tr.build.skillsSub}>{tr.common.skills}</SectionTitle>
            <p className="-mt-3 mb-4 text-xs text-faint">{tr.build.skillFromHint}</p>
            <SkillsProgress slug={build.slug} gems={build.skills.flatMap((s) => [s.gem, ...s.supports.map((x) => supportKey(s.gem, x))])} />
            <div className="grid gap-3 lg:grid-cols-2">
              {build.skills.map((s) => {
                const gem = getGem(s.gem)!;
                const src = sources.get(s.gem)!;
                return (
                  <div key={s.gem} className="rounded-xl border border-line bg-surface p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-3">
                        <GemCheck slug={build.slug} gem={gem.name} />
                      </span>
                      <GemIcon gem={gem} size={44} />
                      <div className="min-w-0 flex-1">
                        <Link
                          href={path(`/database/gems#${gem.id}`)}
                          data-tip={gemTip(gem.name)}
                          className="font-semibold hover:text-gold"
                        >
                          {gem.name}
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          <SourceChip source={src} label={sourceLabel(src)} />
                          {s.weaponSet && (
                            <span
                              className="whitespace-nowrap rounded-full border px-2 py-0.5 text-xs"
                              style={{ color: WEAPON_SET_COLORS[s.weaponSet].light, borderColor: WEAPON_SET_COLORS[s.weaponSet].main }}
                              title={tr.build.weaponSetSkillHint}
                            >
                              {s.weaponSet === 1 ? tr.tree.weaponSet1 : tr.tree.weaponSet2}
                            </span>
                          )}
                          <SkillGroupDone slug={build.slug} gems={[s.gem, ...s.supports.map((x) => supportKey(s.gem, x))]} />
                          {s.level && (
                            <span className="whitespace-nowrap rounded-full border border-sky-400/60 px-2 py-0.5 text-xs text-sky-300" title={tr.build.gemLevelHint}>
                              {fmt(tr.build.gemLevel, { level: s.level })}
                            </span>
                          )}
                        </div>
                        {s.note && <p className="mt-1.5 text-sm text-muted">{s.note}</p>}
                      </div>
                    </div>
                    {s.supports.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
                        {s.supports.map((name) => {
                          const sup = getGem(name)!;
                          return (
                            <span
                              key={name}
                              className="flex items-center gap-1 rounded-md border border-line bg-surface-2 py-0.5 pl-1 pr-2 text-xs text-muted"
                            >
                              <GemCheck slug={build.slug} gem={sup.name} skill={s.gem} size="sm" />
                              <Link href={path(`/database/gems#${sup.id}`)} data-tip={gemTip(sup.name)} className="flex items-center gap-1.5 hover:text-ink">
                                <GemIcon gem={sup} size={22} />
                                {sup.name}
                              </Link>
                            </span>
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
            <section id="leveling" data-panel="leveling" className="scroll-mt-32">
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

          <section id="stats" data-panel="gear" className="scroll-mt-32">
            <SectionTitle sub={tr.build.statPriority.sub}>{tr.build.statPriority.title}</SectionTitle>
            <StatPriority stages={statStages} initialStage={inventory.initial}
              ordered={build.origin === "guide"}
              labels={tr.build.statPriority}
             />
          </section>

          <section id="gear" data-panel="gear" className="mt-14 scroll-mt-32">
            <SectionTitle sub={tr.build.gearSub}>{tr.common.gear}</SectionTitle>
            <GearInventory
              stages={inventory.stages}
              initialStage={inventory.initial}
              slotLabels={tr.slots}
              weaponSetsLabel={tr.tree.weaponSets}
              weaponLabels={{ title: tr.build.weapons, set1: tr.tree.weaponSet1, set2: tr.tree.weaponSet2 }}
              labels={{ runes: tr.build.socketed, ladder: tr.build.ladderSlot, craft: tr.build.craftThis, trade: tr.build.tradeSearch, tradeLevel: tr.build.tradeLevel, close: tr.build.closeCard, ...tr.build.modPriority }}
              hint={`${tr.build.inventoryHint} ${tr.build.modHint}`}
              priceLabels={{
                divine: "Divine Orb",
                exalted: "Exalted Orb",
                stageTotal: tr.build.stageTotal,
                note: fmt(tr.build.priceNote, { league: prices.league, date: prices.fetchedAt }),
              }}
            />
            <h3 id="loot-filter" className="mt-6 scroll-mt-32 font-semibold">{tr.build.lootFilter.title}</h3>
            <div className="mt-2">
              <LootFilterPanel
                {...lootFilter(build, absoluteUrl(localePath(lang, `/builds/${build.slug}`)))}
                summary={(() => {
                  const f = filterTargets(build);
                  return [...f.uniques, ...f.bases, ...f.weaponClasses.map((c) => fmt(tr.build.lootFilter.rareClass, { c }))];
                })()}
                labels={tr.build.lootFilter}
              />
            </div>
          </section>

          <section id="passives" data-panel="passives" className="scroll-mt-32">
            <SectionTitle sub={fmt(tr.build.pointsAllocated, { n: build.pointsUsed })}>{tr.common.passiveTree}</SectionTitle>
            {build.startFrom && (
              <p className="mb-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
                {fmt(tr.build.startFromNote, { cls: build.startFrom })}
              </p>
            )}
            <BuildTreeViewer
              planner={build.planner}
              code={build.plannerCode}
              steps={build.passiveSteps}
              variants={build.treeVariants}
              variantsSource={build.treeVariantsSource}
            />
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

          {farming && (
            <section id="farming" data-panel="farming" className="scroll-mt-32">
              <SectionTitle sub={tr.build.farming.sub}>{tr.build.farming.title}</SectionTitle>
              <FarmingRanking ranking={farming} labels={tr.build.farming} path={path} />
            </section>
          )}

          </BuildTabs>
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
    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${SOURCE_STYLE[source.kind]}`}>
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
              {/* Stage labels are often empty, so the position is part of the key. */}
              {priority[cat]!.map((st, si) => (
                <li key={`${si}-${st.label}`}>
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
