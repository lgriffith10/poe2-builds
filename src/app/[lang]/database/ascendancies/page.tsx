import type { Metadata } from "next";
import { ClassEmblem } from "@/components/ui";
import { fmt, getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { classes, tree } from "@/lib/data";
import { belongsToAscendancy } from "@/lib/tree";

export async function generateMetadata({ params }: PageProps<"/[lang]/database/ascendancies">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang).database;
  return { title: t.ascendancies, description: t.ascendanciesMeta, alternates: alternates("/database/ascendancies", lang) };
}

export default async function AscendanciesPage({ params }: PageProps<"/[lang]/database/ascendancies">) {
  const { t } = await pageI18n(params);
  const nodes = Object.values(tree.nodes);
  return (
    <div className="mt-6 space-y-10">
      {classes.map((cls) => (
        <section key={cls.name}>
          <div className="mb-4 flex items-center gap-3">
            <ClassEmblem name={cls.name} size={44} />
            <div>
              <h2 className="font-display text-2xl font-semibold">{cls.name}</h2>
              <p className="text-sm text-muted">
                {fmt(t.database.baseStats, cls.base)}
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {cls.ascendancies.map((asc) => {
              const notables = nodes.filter((n) => n.t === "notable" && belongsToAscendancy(n, asc.name));
              return (
                <div key={asc.name} id={asc.id.toLowerCase().replace(/\s+/g, "-")} className="rounded-xl border border-line bg-surface p-4">
                  <h3 className="font-display text-lg font-semibold text-gold">{asc.name}</h3>
                  {asc.flavour && <p className="mt-1 text-sm italic text-unique">“{asc.flavour}”</p>}
                  <ul className="mt-3 space-y-2.5">
                    {notables.map((n) => (
                      <li key={n.n}>
                        <p className="text-sm font-semibold">{n.n}</p>
                        <ul className="text-sm text-[#8fb6f0]">
                          {n.s?.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
