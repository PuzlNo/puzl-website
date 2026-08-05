/**
 * Reusable headless verification script — checks a page across breakpoints
 * without needing the Playwright MCP tool (which burns screenshot tokens).
 *
 * Usage:
 *   node scripts/verify-responsive.js <url> [selector]
 *
 * Example:
 *   node scripts/verify-responsive.js http://localhost:3000 "#workflow-diagram"
 *
 * Logs, per breakpoint: element bounding box, whether it has zero
 * width/height, text content (to check truncation/wrapping), and any
 * console errors encountered during load.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { chromium } = require('playwright');

const BREAKPOINTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'mobile-414', width: 414, height: 896 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

async function main() {
  const url = process.argv[2];
  const selector = process.argv[3];

  if (!url) {
    console.error('Usage: node scripts/verify-responsive.js <url> [selector]');
    process.exit(1);
  }

  const browser = await chromium.launch();

  for (const bp of BREAKPOINTS) {
    const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    await page.goto(url, { waitUntil: 'networkidle' });

    console.log(`\n=== ${bp.name} (${bp.width}x${bp.height}) ===`);

    if (selector) {
      const el = page.locator(selector).first();
      const count = await el.count();
      if (count === 0) {
        console.log(`  FAIL: selector "${selector}" not found`);
      } else {
        const box = await el.boundingBox();
        const text = await el.innerText().catch(() => '');
        if (!box) {
          console.log(`  FAIL: element not visible / no bounding box`);
        } else if (box.width === 0 || box.height === 0) {
          console.log(`  FAIL: zero dimensions -> ${JSON.stringify(box)}`);
        } else {
          console.log(`  OK: bbox=${JSON.stringify(box)}`);
        }
        console.log(`  text: ${text.slice(0, 200).replace(/\n/g, ' \\n ')}`);
      }
    }

    console.log(
      consoleErrors.length
        ? `  console errors: ${consoleErrors.length}\n    ${consoleErrors.join('\n    ')}`
        : `  console: clean`
    );

    await page.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
