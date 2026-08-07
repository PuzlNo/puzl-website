import { buildLlmsFullTxt } from "@/lib/llms-txt";

/**
 * /llms-full.txt — deep-ingestion companion to /llms.txt, with full service
 * descriptions and article bodies inlined rather than linked.
 *
 * Not part of the llmstxt.org spec itself (which defines llms-ctx.txt and
 * llms-ctx-full.txt as generated artifacts), but the de-facto filename other
 * sites publish for this purpose.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
