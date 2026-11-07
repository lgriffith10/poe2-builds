import { Suspense } from "react";
import { NavBar, NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
        <Suspense fallback={<NavBar pathname={null} />}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
