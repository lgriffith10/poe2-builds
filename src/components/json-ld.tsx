import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

/** schema.org structured data, rendered as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  // "<" is escaped so a string can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** The game every page is about. */
export const GAME = { "@type": "VideoGame", name: "Path of Exile 2", alternateName: "PoE2" } as const;

export const PUBLISHER = { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: absoluteUrl("/icon-512.png") } as const;

/** Article data for a guide page (build guides and beginner guides). */
export function articleLd(opts: { url: string; title: string; description: string; lang: string; updated?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    inLanguage: opts.lang,
    url: absoluteUrl(opts.url),
    mainEntityOfPage: absoluteUrl(opts.url),
    ...(opts.updated && { dateModified: opts.updated }),
    about: GAME,
    author: PUBLISHER,
    publisher: PUBLISHER,
  };
}

/** Breadcrumb trail: [name, path] pairs from the home page down. */
export function breadcrumbLd(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: absoluteUrl(path) })),
  };
}
