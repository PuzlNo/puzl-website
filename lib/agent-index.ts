/**
 * Builds the content index served to WebMCP tools at /api/agent-index.
 *
 * Server-only: reads posts off the filesystem via `lib/posts`. Everything here
 * is derived from the same modules the pages render from (`lib/services`,
 * `lib/about`, `content/posts`), so agent-visible content can never drift from
 * what a human sees on the page.
 */

import { services } from "@/lib/services";
import { pillars, experience } from "@/lib/about";
import { getAllPosts, getReadingTimeMinutes } from "@/lib/posts";
import { SITE_URL } from "@/lib/structured-data";

/** A single searchable unit of site content. */
export type IndexEntry = {
  /** Stable identifier, unique within the index. */
  id: string;
  kind: "service" | "about" | "article" | "page";
  title: string;
  /** Site-relative path the entry lives on, e.g. "/tjenester". */
  path: string;
  /** Short line suitable for returning directly to an agent. */
  summary: string;
  /** Full searchable text (summary + body/detail), plain text. */
  text: string;
};

export type IndexedService = {
  title: string;
  tag: string;
  summary: string;
  detail: string;
  url: string;
};

export type IndexedArticle = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  url: string;
  /** Article body as plain text, for full-text search and snippets. */
  body: string;
};

export type AgentIndex = {
  services: IndexedService[];
  articles: IndexedArticle[];
  entries: IndexEntry[];
};

/**
 * Flattens MDX to prose. Unlike the reading-time stripper in `lib/posts`, this
 * preserves word order and spacing well enough to cut readable snippets from.
 */
function toPlainText(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Static descriptors for pages that hold no card-shaped content of their own. */
const staticPages: IndexEntry[] = [
  {
    id: "page:kontakt",
    kind: "page",
    title: "Kontakt",
    path: "/kontakt",
    summary:
      "Kontaktskjema og kontaktinformasjon for Puzl. E-post: hei@puzl.no. Skjemaet kan også fylles ut av en agent via submit_contact_form-verktøyet.",
    text: "Kontakt Puzl for å diskutere din neste AI-løsning. Ta kontakt om ditt neste prosjekt, så finner vi ut om vi er riktig match for det du prøver å bygge. E-post hei@puzl.no. LinkedIn: puzlno.",
  },
  {
    id: "page:personvern",
    kind: "page",
    title: "Personvernerklæring",
    path: "/personvern",
    summary:
      "Hvordan Puzl behandler personopplysninger sendt inn via kontaktskjemaet.",
    text: "Personvernerklæring. Puzl samler kun inn det du selv skriver i kontaktskjemaet: navn, e-post, eventuelt telefonnummer og melding. Ingen analyseverktøy, ingen sporing, ingen informasjonskapsler. Opplysningene brukes utelukkende til å svare på henvendelsen, sendes som e-post via Resend, deles ikke med tredjepart og brukes ikke til markedsføring. Du kan be om innsyn eller sletting ved å kontakte hei@puzl.no.",
  },
];

export function buildAgentIndex(): AgentIndex {
  const indexedServices: IndexedService[] = services.map((service) => ({
    title: service.title,
    tag: service.tag,
    summary: service.summary,
    detail: service.detail,
    url: `${SITE_URL}/tjenester`,
  }));

  const indexedArticles: IndexedArticle[] = getAllPosts().map((post) => ({
    slug: post.frontmatter.slug,
    title: post.frontmatter.title,
    summary: post.frontmatter.summary,
    publishedAt: post.frontmatter.publishedAt,
    updatedAt: post.frontmatter.updatedAt,
    author: post.frontmatter.author,
    tags: post.frontmatter.tags ?? [],
    readingMinutes: getReadingTimeMinutes(post.content),
    url: `${SITE_URL}/artikler/${post.frontmatter.slug}`,
    body: toPlainText(post.content),
  }));

  const entries: IndexEntry[] = [
    ...indexedServices.map((service) => ({
      id: `service:${service.title}`,
      kind: "service" as const,
      title: service.title,
      path: "/tjenester",
      summary: service.summary,
      text: `${service.tag} ${service.title} ${service.summary} ${service.detail}`,
    })),
    ...[...pillars, ...experience].map((card) => ({
      id: `about:${card.title}`,
      kind: "about" as const,
      title: card.title,
      path: "/om-oss",
      summary: card.text,
      text: `${card.tag} ${card.title} ${card.text}`,
    })),
    ...indexedArticles.map((article) => ({
      id: `article:${article.slug}`,
      kind: "article" as const,
      title: article.title,
      path: `/artikler/${article.slug}`,
      summary: article.summary,
      text: `${article.title} ${article.summary} ${article.body}`,
    })),
    ...staticPages,
  ];

  return { services: indexedServices, articles: indexedArticles, entries };
}
