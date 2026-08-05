@AGENTS.md

## Verification / testing policy

Do NOT use Playwright MCP tool calls (screenshots, accessibility
snapshots) for routine self-verification during development — this
consumes a disproportionate share of session token budget.

Instead, for checks like text truncation, element dimensions, animation
state, responsive behavior across breakpoints, or console errors: write
and run a small Playwright script via the bash tool (headless
Chromium), and read text/measurement output from stdout. A reusable
helper lives at `scripts/verify-responsive.js` (usage:
`node scripts/verify-responsive.js <url> [selector]`).

Only use the Playwright MCP tool when a human explicitly asks to see a
visual screenshot.
