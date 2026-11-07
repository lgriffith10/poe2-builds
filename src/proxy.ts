import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "./i18n/config";

// English URLs have no prefix (/planner); French lives under /fr (/fr/planner).
// Internally every page is rendered by app/[lang], so unprefixed paths are rewritten to /en.
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  // /en/... is not a public URL: redirect to the unprefixed canonical one.
  if (first === DEFAULT_LOCALE) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  // First visit with a French browser and no explicit choice yet: send to the French site.
  const chosen = req.cookies.get(LOCALE_COOKIE)?.value;
  if (!chosen && /^fr\b/i.test(req.headers.get("accept-language") ?? "")) {
    const url = req.nextUrl.clone();
    url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the API, static data/images and any file with an extension.
  matcher: ["/((?!_next|api|data|img|favicon\\.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
