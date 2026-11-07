import Link from "next/link";
import { pageI18n } from "@/i18n/server";
import { DB_SECTIONS } from "@/lib/nav";

export default async function DatabaseLayout({ children, params }: LayoutProps<"/[lang]/database">) {
  const { t, path } = await pageI18n(params);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <Link href={path("/database")} className="font-display text-2xl font-bold tracking-wide hover:text-gold">
          {t.database.title}
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {DB_SECTIONS.map((s) => (
            <Link key={s.href} href={path(s.href)} className="text-muted hover:text-gold">
              {t.database[s.key]}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
