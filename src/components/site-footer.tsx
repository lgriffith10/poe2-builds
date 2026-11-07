import { fmt, getDictionary, type Locale } from "@/i18n";
import { meta } from "@/lib/data";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).footer;
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-8 text-xs leading-relaxed text-faint">
        <p>{t.disclaimer}</p>
        <p className="mt-2">
          {t.dataFrom}{" "}
          <a className="underline hover:text-muted" href="https://github.com/repoe-fork/repoe-fork">
            RePoE
          </a>{" "}
          {t.and}{" "}
          <a className="underline hover:text-muted" href="https://github.com/PathOfBuildingCommunity/PathOfBuilding-PoE2">
            Path of Building PoE2
          </a>
          . {fmt(t.treeInfo, { version: meta.treeVersion, date: meta.syncedAt.slice(0, 10) })}
        </p>
      </div>
    </footer>
  );
}
