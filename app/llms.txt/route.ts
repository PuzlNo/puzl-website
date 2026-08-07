import { buildLlmsTxt } from "@/lib/llms-txt";

/**
 * /llms.txt — curated index of the site for AI systems, per llmstxt.org.
 *
 * Generated from the same content modules the pages render from, so it cannot
 * drift from the live site. Content is build-time static, so prerender it.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      // Markdown body, but served as text/plain so it renders in a browser
      // rather than triggering a download. charset matters for æ/ø/å.
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
