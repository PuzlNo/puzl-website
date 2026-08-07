/**
 * Headless verification for the WebMCP tools registered by
 * components/WebMcpTools.tsx.
 *
 * No shipping headless browser implements WebMCP yet, so this installs a
 * spec-shaped `document.modelContext` shim (per the WebIDL in
 * https://github.com/webmachinelearning/webmcp) before page scripts run, then:
 *
 *   1. asserts all four tools register with well-formed JSON Schemas
 *   2. round-trips each read-only tool against real site content
 *   3. checks submit_contact_form posts the right payload to /api/contact
 *      (intercepted — no email is ever sent)
 *
 * Usage: node scripts/verify-webmcp.js [baseUrl]
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://localhost:3000';

const EXPECTED_TOOLS = [
  'get_services',
  'search_articles',
  'search_site',
  'submit_contact_form',
];

let failures = 0;
function check(label, condition, detail = '') {
  const status = condition ? 'PASS' : 'FAIL';
  if (!condition) failures++;
  console.log(`  [${status}] ${label}${detail ? ` — ${detail}` : ''}`);
}

/** Installs a minimal document.modelContext matching the spec's IDL. */
const SHIM = () => {
  const tools = new Map();
  const modelContext = {
    registerTool(tool, options = {}) {
      if (!tool || !tool.name || !tool.description) {
        return Promise.reject(new Error('InvalidStateError'));
      }
      if (tools.has(tool.name)) return Promise.reject(new Error('duplicate'));
      if (options.signal) {
        options.signal.addEventListener('abort', () => tools.delete(tool.name));
      }
      tools.set(tool.name, tool);
      return Promise.resolve();
    },
    getTools() {
      return Promise.resolve([...tools.values()]);
    },
    ontoolchange: null,
  };
  Object.defineProperty(document, 'modelContext', {
    value: modelContext,
    configurable: true,
  });
  // Test-only escape hatch so Node can drive execute() across the bridge.
  window.__webmcpTools = tools;
};

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  await page.addInitScript(SHIM);
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__webmcpTools?.size > 0, { timeout: 5000 });

  // ---------------------------------------------------------------- registration
  console.log('\n=== 1. Registration ===');
  const registered = await page.evaluate(() =>
    [...window.__webmcpTools.values()].map((t) => ({
      name: t.name,
      title: t.title,
      description: t.description,
      inputSchema: t.inputSchema,
      annotations: t.annotations,
    }))
  );
  const names = registered.map((t) => t.name);
  check(`all ${EXPECTED_TOOLS.length} tools registered`, names.length === EXPECTED_TOOLS.length, names.join(', '));
  for (const expected of EXPECTED_TOOLS) {
    check(`"${expected}" present`, names.includes(expected));
  }

  // ------------------------------------------------------------- schema coverage
  console.log('\n=== 2. JSON Schema coverage ===');
  for (const tool of registered) {
    const s = tool.inputSchema;
    const props = (s && s.properties) || {};
    const propNames = Object.keys(props);
    const undescribed = propNames.filter((p) => typeof props[p].description !== 'string' || !props[p].description);
    const untyped = propNames.filter((p) => !props[p].type);
    const required = s?.required || [];
    const danglingRequired = required.filter((r) => !propNames.includes(r));

    console.log(`  ${tool.name}:`);
    check('  schema type is object', s?.type === 'object');
    check('  has properties', propNames.length > 0, propNames.join(', '));
    check('  every property typed', untyped.length === 0, untyped.join(', ') || 'all typed');
    check('  every property described', undescribed.length === 0, undescribed.join(', ') || 'all described');
    check('  required[] all defined', danglingRequired.length === 0, danglingRequired.join(', ') || 'ok');
    check('  additionalProperties false', s?.additionalProperties === false);
    check('  description is contextual (>120 chars)', (tool.description || '').length > 120, `${tool.description.length} chars`);
    check('  has annotations.readOnlyHint', typeof tool.annotations?.readOnlyHint === 'boolean',
      `readOnlyHint=${tool.annotations?.readOnlyHint}`);
  }

  // --------------------------------------------------------------- round-tripping
  console.log('\n=== 3. Tool round-trips against real content ===');

  const callTool = (name, args) =>
    page.evaluate(
      async ([n, a]) => {
        const res = await window.__webmcpTools.get(n).execute(a);
        return JSON.parse(JSON.stringify(res));
      },
      [name, args]
    );

  const parse = (res) => {
    try {
      return JSON.parse(res.content[0].text);
    } catch {
      return null;
    }
  };

  const servicesRes = await callTool('get_services', {});
  const servicesData = parse(servicesRes);
  check('get_services returns 6 services', servicesData?.count === 6, `count=${servicesData?.count}`);
  check('get_services includes Logistikkagent',
    servicesData?.services?.some((s) => s.title === 'Logistikkagent'));
  check('get_services includes full detail text',
    (servicesData?.services?.[0]?.details || '').length > 200);

  const filtered = parse(await callTool('get_services', { query: 'logistikk', includeDetails: false }));
  check('get_services query filters', filtered?.count > 0 && filtered.count < 6, `count=${filtered?.count}`);
  check('get_services includeDetails=false omits details',
    filtered?.services?.[0] && !('details' in filtered.services[0]));

  const articles = parse(await callTool('search_articles', { query: 'AI' }));
  check('search_articles finds results', articles?.count > 0, `count=${articles?.count}`);
  check('search_articles returns snippet', (articles?.results?.[0]?.snippet || '').length > 50);
  check('search_articles returns real url',
    (articles?.results?.[0]?.url || '').startsWith('https://puzl.no/artikler/'),
    articles?.results?.[0]?.url);
  check('search_articles has readingMinutes', typeof articles?.results?.[0]?.readingMinutes === 'number');

  const emptyArticles = parse(await callTool('search_articles', { query: 'zzzznomatch' }));
  check('search_articles handles no matches', emptyArticles?.count === 0);

  const site = parse(await callTool('search_site', { query: 'skreddersydd' }));
  check('search_site finds cross-page results', site?.count > 0, `count=${site?.count}`);
  const kinds = new Set((site?.results || []).map((r) => r.kind));
  check('search_site spans multiple content kinds', kinds.size > 1, [...kinds].join(', '));

  const aboutOnly = parse(await callTool('search_site', { query: 'erfaring', kinds: ['about'] }));
  check('search_site kinds filter works',
    (aboutOnly?.results || []).every((r) => r.kind === 'about'),
    `kinds=${[...new Set((aboutOnly?.results || []).map((r) => r.kind))].join(',')}`);

  const limited = parse(await callTool('search_site', { query: 'ai', limit: 2 }));
  check('search_site respects limit', (limited?.results || []).length <= 2, `n=${limited?.results?.length}`);

  // ------------------------------------------------------ contact form (intercepted)
  console.log('\n=== 4. submit_contact_form (intercepted — no email sent) ===');
  let captured = null;
  await page.route('**/api/contact', async (route) => {
    captured = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });

  const submitRes = await callTool('submit_contact_form', {
    navn: 'Test Testesen',
    email: 'test@example.com',
    telefon: '+47 000 00 000',
    melding: 'Dette er en verifiseringsmelding fra en automatisert test.',
  });
  check('posts to /api/contact', captured !== null);
  check('payload uses the human form field names',
    captured && ['navn', 'email', 'telefon', 'melding'].every((k) => k in captured),
    captured ? Object.keys(captured).join(', ') : 'none');
  check('payload preserves values', captured?.navn === 'Test Testesen' && captured?.email === 'test@example.com');
  check('reports success to the agent', parse(submitRes)?.success === true);

  await page.unroute('**/api/contact');
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 429, contentType: 'application/json', body: '{"error":"For mange henvendelser. Prøv igjen om litt."}' })
  );
  const rejected = await callTool('submit_contact_form', {
    navn: 'Test', email: 'test@example.com', melding: 'Kort melding her.',
  });
  check('surfaces server rejection as isError', rejected?.isError === true);
  check('rejection text reaches the agent',
    (rejected?.content?.[0]?.text || '').includes('For mange'),
    rejected?.content?.[0]?.text);

  // ------------------------------------------------------------------ unregister
  console.log('\n=== 5. Teardown ===');
  const beforeUnmount = await page.evaluate(() => window.__webmcpTools.size);
  check('tools registered before navigation', beforeUnmount === 4, `size=${beforeUnmount}`);

  console.log('\n=== Console ===');
  console.log(consoleErrors.length ? `  ${consoleErrors.length} error(s):\n    ${consoleErrors.join('\n    ')}` : '  clean');

  await browser.close();

  console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
