import { ImageResponse } from "next/og";
import type { Tier } from "./types";

/** Share images (Open Graph): 1200x630 cards in the site's colours. Text and shapes only (no WebP game art). */
export const OG_SIZE = { width: 1200, height: 630 };

const GOLD = "#d4a64f";
/** Public address shown in the corner (SITE_URL, or URL on Netlify builds). */
const SITE = process.env.SITE_URL ?? process.env.URL;
const SITE_HOST = SITE ? new URL(SITE).host : null;
const TIER_COLOR: Record<Tier, string> = { S: "#e8513f", A: "#ea8a3a", B: "#d9b649", C: "#79b85c", D: "#7b8794" };

export interface OgCard {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Round emblem (class colour and letters). */
  emblem?: { color: string; glyph: string };
  tiers?: { label: string; tier: Tier }[];
  chips?: string[];
  footer: string;
}

export function ogImage(card: OgCard) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "radial-gradient(ellipse at 20% 0%, #2a2116 0%, #0c0a08 65%)",
          color: "#ece4d4",
          border: `6px solid ${GOLD}55`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <path d="M16 2 29 9v14l-13 7L3 23V9z" fill="none" stroke={GOLD} strokeWidth="1.8" />
            <path d="M16 8v16M10 12l6 4 6-4" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
            EXILE <span style={{ color: GOLD, marginLeft: 12 }}>CODEX</span>
          </div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 24, color: "#a39883", textTransform: "uppercase", letterSpacing: 3 }}>
            {card.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {card.emblem && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 150,
                height: 150,
                borderRadius: 999,
                border: `5px solid ${card.emblem.color}`,
                background: `${card.emblem.color}26`,
                color: card.emblem.color,
                fontSize: 64,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {card.emblem.glyph}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
            <div style={{ display: "flex", fontSize: card.title.length > 32 ? 58 : 72, fontWeight: 700, lineHeight: 1.05 }}>{card.title}</div>
            {card.subtitle && <div style={{ display: "flex", fontSize: 30, color: "#a39883", lineHeight: 1.3 }}>{card.subtitle}</div>}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", gap: 22 }}>
            {(card.tiers ?? []).map((t) => (
              <div key={t.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 70,
                    height: 70,
                    borderRadius: 12,
                    background: TIER_COLOR[t.tier],
                    color: "#0c0a08",
                    fontSize: 42,
                    fontWeight: 700,
                  }}
                >
                  {t.tier}
                </div>
                <div style={{ display: "flex", fontSize: 18, color: "#a39883", textTransform: "uppercase", letterSpacing: 2 }}>{t.label}</div>
              </div>
            ))}
            {!card.tiers?.length &&
              (card.chips ?? []).map((c) => (
                <div key={c} style={{ display: "flex", padding: "8px 18px", borderRadius: 999, border: "2px solid #40372a", fontSize: 24, color: "#ece4d4" }}>
                  {c}
                </div>
              ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            {card.tiers?.length
              ? (card.chips ?? []).slice(0, 3).map((c) => (
                  <div key={c} style={{ display: "flex", padding: "6px 16px", borderRadius: 999, border: "2px solid #40372a", fontSize: 22 }}>
                    {c}
                  </div>
                ))
              : null}
            <div style={{ display: "flex", fontSize: 22, color: GOLD }}>{SITE_HOST ?? card.footer}</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
