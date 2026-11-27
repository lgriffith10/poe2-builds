"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/client";

/**
 * On a build written before 1.0: shown once the 1.0 patch notes are published (with what they change for this build)
 * or once 1.0 is out. Checked in the browser, since the page is built ahead of time.
 */
export function ReleaseBanner({ patch, releaseAt, published, changed }: { patch: string; releaseAt: string; published: boolean; changed: string[] }) {
  const { t, fmt, path } = useI18n();
  const [out, setOut] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOut(Date.now() >= new Date(releaseAt).getTime()), 0);
    return () => window.clearTimeout(id);
  }, [releaseAt]);
  if (!published && !out) return null;
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-sky-600/50 bg-sky-900/15 px-4 py-3 text-sm text-sky-100">
      <span>{changed.length ? fmt(t.release.bannerTouched, { patch, names: changed.join(", ") }) : fmt(t.release.banner, { patch })}</span>
      <Link href={path("/release")} className="text-sky-300 hover:underline">
        {t.release.bannerLink} →
      </Link>
    </p>
  );
}
