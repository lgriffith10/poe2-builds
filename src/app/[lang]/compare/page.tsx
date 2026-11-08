import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { ClassEmblem, GemIcon, PageHeader, TierBadge } from "@/components/ui";
import { getBuilds, type Build } from "@/lib/builds";
import { getGem } from "@/lib/data";
import { GEAR_STAGES, TIER_CATEGORIES } from "@/lib/types";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/compare">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.compare.title, description: t.compare.intro, alternates: alternates("/compare", lang) };
}

/** Every unique a guide uses, across its reference gear and gear stages. */
function uniquesOf(b: Build): string[] {
  const sets = [b.gear, ...GEAR_STAGES.map((s) => b.gearStages[s] ?? {})];
  return [...new Set(sets.flatMap((g) => Object.values(g).flatMap((p) => (p?.unique ? [p.unique] : []))))].sort();
}

// The selection lives in the query string (?a=&b=), which is request data: it renders inside <Suspense>
// so the route still has a static shell.
export default function ComparePage({ params, searchParams }: PageProps<"/[lang]/compare">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CompareBody params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CompareBody({ params, searchParams }: Pick<PageProps<"/[lang]/compare">, "params" | "searchParams">) {
  const { lang, t, path } = await pageI18n(params);
  const sp = await searchParams;
  const builds = getBuilds(lang);
  const pick = (v: string | string[] | undefined) => builds.find((b) => b.slug === (Array.isArray(v) ? v[0] : v));
  const a = pick(sp.a);
  const b = pick(sp.b);

  const byClass = [...new Set(builds.map((x) => x.className))].sort().map((c) => ({
    c,
    list: builds.filter((x) => x.className === c).sort((x, y) => x.title.localeCompare(y.title)),
  }));
  const select = (name: "a" | "b", current?: Build) => (
    <select
      name={name}
      defaultValue={current?.slug ?? ""}
      className="w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-ink"
      aria-label={name === "a" ? t.compare.first : t.compare.second}
    >
      <option value="">{name === "a" ? t.compare.first : t.compare.second}</option>
      {byClass.map(({ c, list }) => (
        <optgroup key={c} label={c}>
          {list.map((x) => (
            <option key={x.slug} value={x.slug}>
              {x.title}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );

  return (
    <>
      <PageHeader title={t.compare.title} sub={t.compare.intro}>
        <form action={path("/compare")} className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          {select("a", a)}
          {select("b", b)}
          <button type="submit" className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-bg hover:brightness-110">
            {t.compare.submit}
          </button>
        </form>
      </PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {a && b ? comparison(a, b) : <p className="text-muted">{t.compare.empty}</p>}
      </div>
    </>
  );

  function comparison(a: Build, b: Build) {
    const skillsA = a.skills.map((s) => s.gem);
    const skillsB = b.skills.map((s) => s.gem);
    const supA = new Set(a.skills.flatMap((s) => s.supports));
    const supB = new Set(b.skills.flatMap((s) => s.supports));
    const sharedSupports = [...supA].filter((s) => supB.has(s)).sort();
    const uA = uniquesOf(a);
    const uB = uniquesOf(b);
    const nodesA = new Set(a.planner.nodes);
    const sharedNodes = b.planner.nodes.filter((n) => nodesA.has(n)).length;
    const treeOverlap = Math.round((100 * sharedNodes) / Math.max(1, new Set([...a.planner.nodes, ...b.planner.nodes]).size));

    const gemList = (list: string[], other: string[]) => (
      <ul className="space-y-1.5">
        {list.map((name) => {
          const gem = getGem(name)!;
          const shared = other.includes(name);
          return (
            <li key={name} className={`flex items-center gap-2 text-sm ${shared ? "font-semibold text-gold" : ""}`}>
              <GemIcon gem={gem} size={26} />
              {name}
            </li>
          );
        })}
      </ul>
    );
    const uniqueList = (list: string[], other: string[]) =>
      list.length ? (
        <ul className="space-y-1 text-sm">
          {list.map((u) => (
            <li key={u} className={other.includes(u) ? "font-semibold text-gold" : "text-unique"}>
              {other.includes(u) && <span aria-hidden>◆ </span>}
              {u}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-faint">{t.compare.noUniques}</p>
      );
    const bullets = (items: string[], tone: string) => (
      <ul className="space-y-1 text-sm">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className={tone}>{tone === "text-emerald-400" ? "+" : "–"}</span>
            {x}
          </li>
        ))}
      </ul>
    );
    const tiers = (x: Build) => (
      <div className="flex gap-3">
        {TIER_CATEGORIES.map((c) => (
          <div key={c} className="flex flex-col items-center gap-1">
            {x.tiers[c] ? (
              <TierBadge tier={x.tiers[c]!} />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-faint">–</span>
            )}
            <span className="text-[10px] uppercase tracking-wider text-faint">{t.categories[c]}</span>
          </div>
        ))}
      </div>
    );

    return (
      <div className="overflow-hidden rounded-xl border border-line">
        <div className="grid grid-cols-2 bg-surface">
          {[a, b].map((x) => (
            <Link
              key={x.slug}
              href={path(`/builds/${x.slug}`)}
              className="flex items-center gap-3 border-line p-4 first:border-r hover:bg-surface-2"
            >
              <ClassEmblem name={x.className} size={44} />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold text-gold">{x.title}</p>
                <p className="truncate text-sm text-muted">
                  {x.ascendancy} · {x.className}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Row label={t.compare.tiers}>
          {tiers(a)}
          {tiers(b)}
        </Row>
        <Row label={t.compare.profile}>
          {[a, b].map((x) => (
            <dl key={x.slug} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
              <dt className="text-faint">{t.compare.damage}</dt>
              <dd>{x.damage}</dd>
              <dt className="text-faint">{t.compare.playstyle}</dt>
              <dd>{x.playstyle}</dd>
              <dt className="text-faint">{t.compare.difficulty}</dt>
              <dd>{t.levels[x.difficulty]}</dd>
              <dt className="text-faint">{t.compare.budget}</dt>
              <dd>{t.levels[x.budget]}</dd>
            </dl>
          ))}
        </Row>
        <Row label={t.common.skills}>
          {gemList(skillsA, skillsB)}
          {gemList(skillsB, skillsA)}
        </Row>
        <Row label={t.compare.sharedSupports} wide>
          {sharedSupports.length ? (
            <p className="text-sm">{sharedSupports.join(", ")}</p>
          ) : (
            <p className="text-sm text-faint">{t.compare.none}</p>
          )}
        </Row>
        <Row label={t.compare.uniques}>
          {uniqueList(uA, uB)}
          {uniqueList(uB, uA)}
        </Row>
        <Row label={t.common.passiveTree} wide>
          <p className="text-sm">
            {fmt(t.compare.treeOverlap, { pct: treeOverlap, n: sharedNodes })}
            <span className="ml-2 text-faint">
              ({a.pointsUsed} / {b.pointsUsed})
            </span>
          </p>
        </Row>
        <Row label={t.build.strengths}>
          {bullets(a.pros, "text-emerald-400")}
          {bullets(b.pros, "text-emerald-400")}
        </Row>
        <Row label={t.build.weaknesses}>
          {bullets(a.cons, "text-red-400")}
          {bullets(b.cons, "text-red-400")}
        </Row>
        <p className="border-t border-line bg-surface px-4 py-2 text-xs text-faint">{t.compare.legend}</p>
      </div>
    );
  }
}

function Row({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  const cells = Array.isArray(children) ? children : [children];
  return (
    <section className="border-t border-line">
      <h3 className="bg-surface-2/60 px-4 py-1.5 text-xs uppercase tracking-wider text-faint">{label}</h3>
      {wide ? (
        <div className="p-4">{cells}</div>
      ) : (
        <div className="grid grid-cols-2">
          {cells.map((c, i) => (
            <div key={i} className={`min-w-0 p-4 ${i === 0 ? "border-r border-line" : ""}`}>
              {c}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
