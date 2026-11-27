import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { GLOSSARY, GLOSSARY_GROUPS } from "@/lib/glossary";

export async function generateMetadata({ params }: PageProps<"/[lang]/glossary">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.glossary.title, description: t.glossary.intro, alternates: alternates("/glossary", lang) };
}

export default async function GlossaryPage({ params }: PageProps<"/[lang]/glossary">) {
  const { lang, t } = await pageI18n(params);
  const sorted = (g: string) => GLOSSARY.filter((x) => x.group === g).sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang));
  return (
    <>
      <PageHeader title={t.glossary.title} sub={t.glossary.intro}>
        <nav className="mt-5 flex flex-wrap gap-2 text-sm">
          {GLOSSARY_GROUPS.map((g) => (
            <a key={g} href={`#${g}`} className="rounded-lg border border-line px-3 py-1.5 text-muted hover:border-gold-soft hover:text-gold">
              {t.glossary.groups[g]}
            </a>
          ))}
        </nav>
      </PageHeader>
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8">
        {GLOSSARY_GROUPS.map((g) => (
          <section key={g} id={g} className="scroll-mt-24">
            <h2 className="mb-4 font-display text-xl font-semibold text-gold">{t.glossary.groups[g]}</h2>
            <dl className="divide-y divide-line rounded-xl border border-line bg-surface">
              {sorted(g).map((x) => (
                <div key={x.id} id={x.id} className="scroll-mt-24 px-4 py-3 target:bg-gold/5">
                  <dt className="font-semibold">{x.name[lang]}</dt>
                  <dd className="mt-1 text-sm text-muted">{x.text[lang]}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <p className="text-xs text-faint">{t.glossary.note}</p>
      </div>
    </>
  );
}
