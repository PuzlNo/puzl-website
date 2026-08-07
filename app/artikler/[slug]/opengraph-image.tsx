import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { OG_COLORS, PuzlMark, loadOgFonts } from "@/lib/og";

export const alt = "Puzl — Artikkel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? "Puzl";
  const tag = post?.frontmatter.tags?.[0];
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "IBM Plex Mono",
            fontSize: 20,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: OG_COLORS.chalk,
          }}
        >
          <PuzlMark size={28} />
          {tag ?? "Artikkel"}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: title.length > 50 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.15,
            color: OG_COLORS.ink,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "Space Grotesk",
            fontSize: 22,
            fontWeight: 700,
            color: OG_COLORS.ink,
            opacity: 0.55,
          }}
        >
          puzl.no/artikler
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
