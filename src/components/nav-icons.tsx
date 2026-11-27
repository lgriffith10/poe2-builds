import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  builds: <path d="M6 26 20 12m-3-5 8 8M20 4l8 8-4 4-8-8zM4 28l4-4" />,
  tierList: <path d="M5 7h22M5 13h16M5 19h11M5 25h6" />,
  meta: <path d="M5 27V17m7 10V9m7 18v-6m7 6V5M3 28h26" />,
  guides: <path d="M5 6c4-1 8-1 11 2 3-3 7-3 11-2v20c-4-1-8-1-11 2-3-3-7-3-11-2zM16 8v20" />,
  planner: (
    <>
      <circle cx="16" cy="16" r="3" />
      <circle cx="6" cy="8" r="2.5" />
      <circle cx="26" cy="8" r="2.5" />
      <circle cx="8" cy="26" r="2.5" />
      <circle cx="25" cy="25" r="2.5" />
      <path d="m8 9.5 6 4.5m10-4.5-6 4.5m-8 10 4.5-6m11 4.5-4.5-4.5" />
    </>
  ),
  craft: <path d="M16 3 27 9.5v13L16 29 5 22.5v-13zM16 3v26M5 9.5l22 13m0-13-22 13" />,
  database: (
    <>
      <ellipse cx="16" cy="7" rx="10" ry="3.5" />
      <path d="M6 7v18c0 2 4.5 3.5 10 3.5S26 27 26 25V7M6 16c0 2 4.5 3.5 10 3.5S26 18 26 16" />
    </>
  ),
  glossary: <path d="M7 4h15l4 4v20H7zM22 4v4h4M11 13h11M11 18h11M11 23h7" />,
  quiz: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M12 12.5a4 4 0 1 1 5.5 3.7c-1 .4-1.5 1.2-1.5 2.3v1M16 23.5v.5" />
    </>
  ),
  compare: <path d="M16 4v24M6 10h6M6 16h6M6 22h6M20 10h6m-6 6h6m-6 6h6" />,
  character: (
    <>
      <circle cx="16" cy="10" r="5" />
      <path d="M6 28c1-6 5-9 10-9s9 3 10 9" />
    </>
  ),
  farming: <path d="M16 3v6m0 14v6M3 16h6m14 0h6M16 9a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />,
  weapons: <path d="M5 27 21 11m0 0 2-6 4-1-1 4-6 2M9 19l4 4M4 24l4 4" />,
};

/** Line icon for a navigation entry (keys of `NAV`). */
export function NavIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {icon}
    </svg>
  );
}
