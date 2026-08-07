/**
 * Generates /llms.txt and /llms-full.txt per the llmstxt.org convention.
 *
 * Both documents are derived at build time from the same modules the pages and
 * the WebMCP tools read (`lib/services`, `lib/about`, `lib/pages`,
 * `content/posts`), so nothing here restates site copy that could drift.
 *
 * Format: H1 site name, blockquote summary, free prose (no headings), then H2
 * sections holding `- [Title](url): description` link lists. The trailing
 * "Optional" section carries the spec's defined meaning — content that may be
 * skipped when a shorter context is needed.
 */

import { services } from "@/lib/services";
import { pillars, experience } from "@/lib/about";
import { getAllPosts, getReadingTimeMinutes, truncateForMetaDescription } from "@/lib/posts";
import { pages, pageUrl } from "@/lib/pages";
import { organizationJsonLd, SITE_NAME, SITE_URL } from "@/lib/structured-data";

/** Keeps one-line link descriptions to a single readable line. */
const LINK_DESCRIPTION_LENGTH = 200;

/**
 * Context paragraph shared by both files. Describes what the site is and how
 * an agent can act on it — the WebMCP tools are the machine-callable path, and
 * an agent that finds llms.txt should know they exist.
 */
function preamble(): string {
  return [
    `Puzl er et norsk konsulentselskap som bygger skreddersydde AI-løsninger integrert i systemene virksomheten allerede bruker, framfor å selge ferdige hyllevareprodukter. Alt innhold på nettstedet er på norsk.`,
    ``,
    `Nettstedet eksponerer også WebMCP-verktøy (document.modelContext) som agenter kan kalle direkte i stedet for å lese HTML: \`get_services\`, \`search_articles\`, \`search_site\` og \`submit_contact_form\`. Verktøyene leser samme innhold som dette dokumentet.`,
  ].join("\n");
}

function header(): string {
  return [
    `# ${SITE_NAME}`,
    ``,
    `> ${organizationJsonLd.description}`,
    ``,
    preamble(),
  ].join("\n");
}

function linkLine(title: string, url: string, description: string): string {
  const oneLine = description.replace(/\s+/g, " ").trim();
  return `- [${title}](${url}): ${truncateForMetaDescription(oneLine, LINK_DESCRIPTION_LENGTH)}`;
}

/**
 * The curated index: links out to every meaningful surface with a one-line
 * description each, and no inlined body content.
 */
export function buildLlmsTxt(): string {
  const posts = getAllPosts();

  const sections = [
    [
      `## Tjenester`,
      ``,
      ...services.map((service) =>
        linkLine(service.title, pageUrl(pages.tjenester), service.summary)
      ),
    ],
    [
      `## Om oss`,
      ``,
      linkLine(pages.omOss.title, pageUrl(pages.omOss), pages.omOss.description),
      ...pillars.map((pillar) => linkLine(pillar.title, pageUrl(pages.omOss), pillar.text)),
    ],
    [
      `## Artikler`,
      ``,
      linkLine(pages.artikler.title, pageUrl(pages.artikler), pages.artikler.description),
      ...posts.map((post) =>
        linkLine(
          post.frontmatter.title,
          `${SITE_URL}/artikler/${post.frontmatter.slug}`,
          post.frontmatter.summary
        )
      ),
    ],
    [
      `## Kontakt`,
      ``,
      linkLine(pages.kontakt.title, pageUrl(pages.kontakt), pages.kontakt.description),
    ],
    [
      `## Optional`,
      ``,
      linkLine(pages.personvern.title, pageUrl(pages.personvern), pages.personvern.description),
    ],
  ];

  return `${[header(), ...sections.map((lines) => lines.join("\n"))].join("\n\n")}\n`;
}

/**
 * Shifts Markdown headings down `by` levels, so an inlined article's own `##`
 * headings nest under the `###` heading carrying its title instead of becoming
 * siblings of the document's `## Artikler` section — which would let article
 * content escape the section it belongs to. Fenced code blocks are left alone
 * so `#` comments inside them are not rewritten.
 */
function demoteHeadings(markdown: string, by: number): string {
  let inFence = false;

  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s{0,3}(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      return line.replace(/^(\s{0,3})(#{1,6})(\s)/, (_match, indent, hashes, space) => {
        const level = Math.min(6, hashes.length + by);
        return `${indent}${"#".repeat(level)}${space}`;
      });
    })
    .join("\n");
}

/**
 * The deep-ingestion companion: same skeleton, with full content inlined
 * instead of linked.
 *
 * Everything currently fits comfortably (~30 KB), so all services, principles
 * and article bodies are inlined in full. If the article corpus grows to the
 * point where this file becomes unwieldy, inline the most recent posts and
 * fall back to `linkLine` for the rest rather than truncating bodies mid-text.
 */
export function buildLlmsFullTxt(): string {
  const posts = getAllPosts();

  const servicesSection = [
    `## Tjenester`,
    ``,
    `Kilde: ${pageUrl(pages.tjenester)}`,
    ``,
    ...services.flatMap((service) => [
      `### ${service.title}`,
      ``,
      `Kategori: ${service.tag}`,
      ``,
      service.summary,
      ``,
      service.detail,
      ``,
    ]),
  ];

  const aboutSection = [
    `## Om oss`,
    ``,
    `Kilde: ${pageUrl(pages.omOss)}`,
    ``,
    `### Prinsipper`,
    ``,
    ...pillars.flatMap((pillar) => [`#### ${pillar.title} (${pillar.tag})`, ``, pillar.text, ``]),
    `### Erfaringen bak`,
    ``,
    ...experience.flatMap((card) => [`#### ${card.title} (${card.tag})`, ``, card.text, ``]),
  ];

  const articlesSection = [
    `## Artikler`,
    ``,
    `Kilde: ${pageUrl(pages.artikler)}`,
    ``,
    ...posts.flatMap((post) => [
      `### ${post.frontmatter.title}`,
      ``,
      `URL: ${SITE_URL}/artikler/${post.frontmatter.slug}`,
      `Publisert: ${post.frontmatter.publishedAt}${
        post.frontmatter.updatedAt ? ` (oppdatert ${post.frontmatter.updatedAt})` : ""
      }`,
      `Forfatter: ${post.frontmatter.author}`,
      ...(post.frontmatter.tags?.length ? [`Emner: ${post.frontmatter.tags.join(", ")}`] : []),
      `Lesetid: ${getReadingTimeMinutes(post.content)} min`,
      ``,
      `Sammendrag: ${post.frontmatter.summary}`,
      ``,
      // Article title sits at H3, so its body's H2s become H4s.
      demoteHeadings(post.content.trim(), 2),
      ``,
      // FAQ is authored as structured frontmatter (single-sourced with
      // <FAQSection> and the FAQPage JSON-LD), not body Markdown, so it's
      // rendered here explicitly rather than picked up by demoteHeadings.
      ...(post.frontmatter.faq?.length
        ? [
            `#### Ofte stilte spørsmål`,
            ``,
            ...post.frontmatter.faq.flatMap((item) => [`**${item.question}**`, ``, item.answer, ``]),
          ]
        : []),
    ]),
  ];

  const contactSection = [
    `## Kontakt`,
    ``,
    `Kilde: ${pageUrl(pages.kontakt)}`,
    ``,
    pages.kontakt.searchText,
    ``,
    `En agent kan sende kontaktskjemaet på vegne av brukeren med WebMCP-verktøyet \`submit_contact_form\` (felter: navn, email, telefon valgfritt, melding). Det sender en reell e-post til hei@puzl.no og bør bekreftes med brukeren først.`,
  ];

  const optionalSection = [
    `## Optional`,
    ``,
    `### ${pages.personvern.title}`,
    ``,
    `Kilde: ${pageUrl(pages.personvern)}`,
    ``,
    pages.personvern.searchText,
  ];

  const sections = [
    servicesSection,
    aboutSection,
    articlesSection,
    contactSection,
    optionalSection,
  ];

  return `${[header(), ...sections.map((lines) => lines.join("\n").trimEnd())].join("\n\n")}\n`;
}
