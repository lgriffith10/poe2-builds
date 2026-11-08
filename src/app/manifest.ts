import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Path of Exile 2 Builds`,
    short_name: SITE_NAME,
    description: "Path of Exile 2 build guides, tier list, passive tree planner and item database.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0a08",
    theme_color: "#14100b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
