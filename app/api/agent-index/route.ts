import { buildAgentIndex } from "@/lib/agent-index";

/**
 * Content index consumed by the WebMCP tools registered in
 * `components/WebMcpTools.tsx`. Fetched lazily on first tool call so the
 * payload never lands in the initial page bundle.
 *
 * Fully derived from build-time content, so it is prerendered as a static
 * asset rather than recomputed per request.
 */
export const dynamic = "force-static";

export async function GET() {
  return Response.json(buildAgentIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
