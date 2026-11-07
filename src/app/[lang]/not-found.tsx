"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/client";

export default function NotFound() {
  const { t, path } = useI18n();
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">{t.notFound.title}</h1>
      <p className="mt-2 text-muted">{t.notFound.text}</p>
      <Link
        href={path("/")}
        className="mt-6 inline-block rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-[#e2b964]"
      >
        {t.notFound.back}
      </Link>
    </div>
  );
}
