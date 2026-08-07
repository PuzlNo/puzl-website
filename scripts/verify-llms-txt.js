/**
 * Verifies /llms.txt and /llms-full.txt against the live site.
 *
 * Checks serving details (status, content type), llmstxt.org structure, and —
 * the point of generating rather than hand-writing these — that the content
 * still matches what the HTML pages actually render.
 *
 * Usage: node scripts/verify-llms-txt.js [baseUrl]
 */

const BASE = process.argv[2] || 'http://localhost:3000';

let failures = 0;
function check(label, condition, detail = '') {
  if (!condition) failures++;
  console.log(`  [${condition ? 'PASS' : 'FAIL'}] ${label}${detail ? ` — ${detail}` : ''}`);
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  return { res, body: await res.text() };
}

/** Strips tags so rendered page copy can be substring-matched. */
function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/\s+/g, ' ');
}

async function main() {
  console.log(`Base: ${BASE}`);

  // ------------------------------------------------------------------ serving
  console.log('\n=== 1. Serving ===');
  const llms = await get('/llms.txt');
  const full = await get('/llms-full.txt');

  for (const [name, r] of [['/llms.txt', llms], ['/llms-full.txt', full]]) {
    check(`${name} returns 200`, r.res.status === 200, `status=${r.res.status}`);
    const type = r.res.headers.get('content-type') || '';
    check(`${name} is text/plain or markdown`, /text\/(plain|markdown)/.test(type), type);
    check(`${name} declares utf-8`, /utf-8/i.test(type), type);
    check(`${name} is non-empty`, r.body.length > 500, `${r.body.length} bytes`);
    check(`${name} needs no auth`, !/<html|sign in|log in/i.test(r.body.slice(0, 200)));
  }

  // ---------------------------------------------------------------- structure
  console.log('\n=== 2. llmstxt.org structure ===');
  const lines = llms.body.split('\n');
  check('starts with a single H1', /^# \S/.test(lines[0]), lines[0]);
  check('H1 names the site', lines[0].includes('Puzl'));
  const blockquote = lines.find((l) => l.startsWith('> '));
  check('has a blockquote summary', Boolean(blockquote), blockquote);
  check('summary precedes first H2',
    lines.indexOf(blockquote) < lines.findIndex((l) => l.startsWith('## ')));

  const h2s = lines.filter((l) => l.startsWith('## ')).map((l) => l.slice(3));
  check('has the required sections',
    ['Tjenester', 'Om oss', 'Artikler', 'Kontakt'].every((s) => h2s.includes(s)),
    h2s.join(', '));
  check('"Optional" section is last if present',
    !h2s.includes('Optional') || h2s[h2s.length - 1] === 'Optional');
  check('no content headings above H2 after the H1',
    lines.slice(1).every((l) => !/^# /.test(l)));

  const linkLines = lines.filter((l) => l.startsWith('- ['));
  check('link lists use "- [title](url): description"',
    linkLines.length > 0 && linkLines.every((l) => /^- \[[^\]]+\]\(https?:\/\/[^)]+\): .+/.test(l)),
    `${linkLines.length} links`);
  check('all links are absolute puzl.no URLs',
    linkLines.every((l) => l.includes('](https://puzl.no')));

  // llms-full structure: document sections must not be polluted by inlined
  // article headings, which would let article content escape its section.
  const fullH2s = full.body.split('\n').filter((l) => l.startsWith('## ')).map((l) => l.slice(3));
  check('llms-full has only document-level H2 sections',
    fullH2s.every((h) => ['Tjenester', 'Om oss', 'Artikler', 'Kontakt', 'Optional'].includes(h)),
    fullH2s.join(', '));

  // ---------------------------------------------------- content matches live
  console.log('\n=== 3. Content matches the live pages ===');
  const tjenester = textOf((await get('/tjenester')).body);
  const artikler = textOf((await get('/artikler')).body);

  const serviceNames = ['Innholdsagent', 'Kunnskapsplattform', 'Serviceagent',
    'Innholdspipeline', 'Logistikkagent', 'Markedsføringsagent'];
  const inBoth = serviceNames.filter((n) => tjenester.includes(n) && llms.body.includes(n));
  check('every service on /tjenester appears in llms.txt',
    inBoth.length === serviceNames.length,
    `${inBoth.length}/${serviceNames.length}`);

  // Spot-check that a full sentence of copy is byte-identical, which catches
  // drift that a title-only check would miss.
  const sentence = 'AI som overvåker, koordinerer, anbefaler og optimaliserer logistikkflyt';
  check('service summary copy matches the rendered page',
    tjenester.includes(sentence) && llms.body.includes(sentence));

  const articleTitle = 'Hvorfor skreddersydd AI slår generiske SaaS-verktøy';
  check('published article title appears on /artikler and in llms.txt',
    artikler.includes(articleTitle) && llms.body.includes(articleTitle));

  check('llms-full inlines full service detail (not just the summary)',
    full.body.includes('Bedrifter med store produktkataloger'));
  check('llms-full inlines the article body',
    full.body.includes('Problemet med å bygge for «alle virksomheter»'));
  check('llms-full is substantially larger than llms.txt',
    full.body.length > llms.body.length * 3,
    `${llms.body.length} vs ${full.body.length} bytes`);

  // --------------------------------------------------------------- robots.txt
  console.log('\n=== 4. robots.txt ===');
  const robots = await get('/robots.txt');
  check('robots.txt returns 200', robots.res.status === 200);
  console.log(robots.body.split('\n').map((l) => `      ${l}`).join('\n'));

  const disallows = robots.body
    .split('\n')
    .filter((l) => /^disallow:/i.test(l))
    .map((l) => l.split(':')[1].trim())
    .filter(Boolean);
  check('no non-empty Disallow rules', disallows.length === 0, disallows.join(', ') || 'none');

  for (const ua of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot',
    'Google-Extended', 'Applebot-Extended']) {
    // With a single `*` group and no disallows, every agent falls through to it.
    const hasOwnGroup = new RegExp(`^user-agent:\\s*${ua}\\s*$`, 'im').test(robots.body);
    check(`${ua} is allowed`, !hasOwnGroup && disallows.length === 0,
      hasOwnGroup ? 'has its own group — verify manually' : 'via * group, no disallows');
  }

  check('llms files explicitly allowed',
    /allow:\s*\/llms\.txt/i.test(robots.body) && /allow:\s*\/llms-full\.txt/i.test(robots.body));

  const sitemapLines = robots.body.split('\n').filter((l) => /^sitemap:/i.test(l));
  check('exactly one Sitemap entry', sitemapLines.length === 1, sitemapLines.join(' | '));
  check('Sitemap points at XML, not markdown',
    sitemapLines.every((l) => l.trim().endsWith('.xml')));

  for (const line of sitemapLines) {
    const url = line.split(/:\s*/).slice(1).join(':').trim();
    const path = new URL(url).pathname;
    const r = await fetch(`${BASE}${path}`);
    check(`Sitemap reference resolves (${path})`, r.status === 200, `status=${r.status}`);
  }

  // ----------------------------------------------------------- sitemap purity
  console.log('\n=== 5. Markdown files stay out of sitemap.xml ===');
  const sitemap = await get('/sitemap.xml');
  check('sitemap.xml has no llms entries', !/llms/i.test(sitemap.body));
  check('sitemap.xml still lists HTML pages',
    sitemap.body.includes('/tjenester') && sitemap.body.includes('/artikler'));

  console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
