import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Design tokens mirrored from app/globals.css — ImageResponse can't read CSS custom properties. */
export const OG_COLORS = {
  paper: "#F1EDE4",
  paper2: "#E9E2D2",
  ink: "#211E20",
  ink70: "rgba(33,30,32,0.70)",
  chalk: "#BD8A1F",
};

const FONTS_DIR = join(process.cwd(), "assets", "fonts");

export async function loadOgFonts() {
  const [spaceGroteskBold, workSansRegular, plexMonoMedium] = await Promise.all([
    readFile(join(FONTS_DIR, "SpaceGrotesk-Bold.ttf")),
    readFile(join(FONTS_DIR, "WorkSans-Regular.ttf")),
    readFile(join(FONTS_DIR, "IBMPlexMono-Medium.ttf")),
  ]);

  return [
    { name: "Space Grotesk", data: spaceGroteskBold, weight: 700 as const, style: "normal" as const },
    { name: "Work Sans", data: workSansRegular, weight: 400 as const, style: "normal" as const },
    { name: "IBM Plex Mono", data: plexMonoMedium, weight: 500 as const, style: "normal" as const },
  ];
}

/** The four rounded corner shapes from app/icon.svg's vector paths, at their native 0 0 2000 2000 viewBox. */
export function PuzlMark({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 2000 2000" fill="none">
      <path
        fill={OG_COLORS.chalk}
        d="m2000 1600c0 220.91-179.09 400-400 400-220.91 0-400-179.09-400-400v-400h400c220.91 0 400 179.09 400 400z"
      />
      <path
        fill={OG_COLORS.chalk}
        d="m1600 0c220.91 0 400 179.09 400 400 0 220.91-179.09 400-400 400h-400v-400c0-220.91 179.09-400 400-400z"
      />
      <path fill={OG_COLORS.chalk} d="m1200 800v400h-400v-400z" />
      <path
        fill={OG_COLORS.chalk}
        d="m400 200c220.91 0 400 179.09 400 400v800c0 220.91-179.09 400-400 400-220.91 0-400-179.09-400-400v-800c0-220.91 179.09-400 400-400z"
      />
    </svg>
  );
}
