import { ImageResponse } from "next/og";
import { OG_COLORS, PuzlMark, loadOgFonts } from "@/lib/og";

export const alt = "Puzl — Skreddersydde AI-løsninger";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_COLORS.paper,
          padding: "64px 72px",
          fontFamily: "Work Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <PuzlMark size={40} />
          <span style={{ fontFamily: "Space Grotesk", fontSize: 26, fontWeight: 700, color: OG_COLORS.ink }}>
            Puzl
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: OG_COLORS.chalk,
              marginBottom: 20,
            }}
          >
            Skreddersydde AI-løsninger
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Space Grotesk",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.05,
              color: OG_COLORS.ink,
            }}
          >
            <span>Ikke hyllevare</span>
            <span style={{ color: OG_COLORS.chalk }}>Tilpasset AI</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 18,
            color: OG_COLORS.ink,
            opacity: 0.55,
          }}
        >
          puzl.no
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
