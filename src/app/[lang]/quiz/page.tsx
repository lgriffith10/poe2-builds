import type { Metadata } from "next";
import { BuildQuiz } from "@/components/build-quiz";
import { PageHeader } from "@/components/ui";
import { getDictionary } from "@/i18n";
import { alternates, pageI18n, resolveLang } from "@/i18n/server";
import { isBeginnerPick } from "@/lib/beginner";
import { getBuilds, type Build } from "@/lib/builds";
import { getGem } from "@/lib/data";
import { familyOf, type QuizBuild } from "@/lib/quiz";
import { GEAR_STAGES } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/[lang]/quiz">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDictionary(lang);
  return { title: t.quiz.title, description: t.quiz.intro, alternates: alternates("/quiz", lang) };
}

/** Distinct uniques across the reference gear and every gear stage. */
const uniqueCount = (b: Build) =>
  new Set([b.gear, ...GEAR_STAGES.map((s) => b.gearStages[s] ?? {})].flatMap((g) => Object.values(g).flatMap((p) => (p?.unique ? [p.unique] : []))))
    .size;

/** Distinct skills in the longest rotation of the guide. */
const rotationLength = (b: Build) =>
  b.rotations.length ? Math.max(...b.rotations.map((r) => new Set(r.steps.map((s) => s.gem)).size)) : null;

export default async function QuizPage({ params }: PageProps<"/[lang]/quiz">) {
  const { lang, t } = await pageI18n(params);
  // The style family is read from the English playstyle; translated guides show "Serviteurs", "Corps à corps"…
  const englishStyle = new Map(getBuilds("en").map((b) => [b.slug, b.playstyle]));
  const builds: QuizBuild[] = getBuilds(lang)
    .filter((b) => !b.sample)
    .map((b) => {
      const g = b.skills[0] ? getGem(b.skills[0].gem) : undefined;
      return {
        slug: b.slug,
        title: b.title,
        className: b.className,
        ascendancy: b.ascendancy,
        playstyle: b.playstyle,
        family: familyOf(englishStyle.get(b.slug) ?? b.playstyle),
        difficulty: b.difficulty,
        budget: b.budget,
        ratings: b.ratings,
        rotation: rotationLength(b),
        uniques: uniqueCount(b),
        profile: b.farming ? { clear: b.farming.clear, single: b.farming.single, tank: b.farming.tank, speed: b.farming.speed } : null,
        beginner: isBeginnerPick(b.slug),
        gem: g ? { name: g.name, icon: g.icon, color: g.color } : null,
      };
    });
  return (
    <>
      <PageHeader title={t.quiz.title} sub={t.quiz.intro} />
      <BuildQuiz builds={builds} />
    </>
  );
}
