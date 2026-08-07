"use client";

import { useEffect } from "react";
import { webmcpTools } from "@/lib/webmcp-tools";
import type { ModelContext } from "@/types/webmcp";

/**
 * Registers puzl.no's WebMCP tools so AI agents browsing the site can call
 * structured tools instead of scraping the DOM.
 *
 * Renders nothing. On browsers without WebMCP `modelContext` is undefined and
 * this is a no-op, so no feature-detection UI is needed — the spec has no
 * user-visible surface a page is expected to provide.
 *
 * Spec: https://github.com/webmachinelearning/webmcp (W3C WebML CG draft).
 */
export default function WebMcpTools() {
  useEffect(() => {
    // The spec moved this from `navigator` to `document` in July 2026; Chrome's
    // origin trial still serves the navigator location, so prefer the current
    // one and fall back rather than dropping support for trial browsers.
    const modelContext: ModelContext | undefined =
      document.modelContext ?? navigator.modelContext;

    if (!modelContext) return;

    // registerTool is only available in a secure context; on http:// origins
    // other than localhost the property is absent and we have already bailed.
    const controller = new AbortController();

    for (const tool of webmcpTools) {
      // Each registration is independent: one rejecting (e.g. a duplicate name
      // left over from a hot reload) must not prevent the rest from landing.
      void modelContext
        .registerTool(tool, { signal: controller.signal })
        .catch((error: unknown) => {
          if (controller.signal.aborted) return;
          console.warn(`WebMCP: kunne ikke registrere verktøyet "${tool.name}"`, error);
        });
    }

    // Aborting unregisters every tool — the spec has no unregisterTool method.
    return () => controller.abort();
  }, []);

  return null;
}
