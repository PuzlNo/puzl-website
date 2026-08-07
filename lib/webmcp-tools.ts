/**
 * WebMCP tool definitions for puzl.no.
 *
 * Client-side only. Each tool carries a self-contained description — the spec
 * has no side-channel for page context, so anything an agent needs to pick the
 * right tool has to live in the description text itself.
 *
 * Content is fetched lazily from /api/agent-index on first call, which keeps
 * the article corpus out of the initial page bundle.
 */

import type { AgentIndex, IndexEntry } from "@/lib/agent-index";
import type { ModelContextTool, ToolResult } from "@/types/webmcp";

const SNIPPET_LENGTH = 320;

let indexPromise: Promise<AgentIndex> | null = null;

function loadIndex(): Promise<AgentIndex> {
  // Cached at module scope: the index is build-time static, so one fetch per
  // document is enough no matter how many tool calls arrive.
  indexPromise ??= fetch("/api/agent-index", { headers: { accept: "application/json" } }).then(
    (res) => {
      if (!res.ok) throw new Error(`Kunne ikke laste innholdsindeks (${res.status})`);
      return res.json() as Promise<AgentIndex>;
    }
  );
  return indexPromise;
}

function ok(data: unknown): ToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}

function fail(message: string): ToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length > 1);
}

/**
 * Scores an entry against query tokens, weighting title over summary over body.
 * Deliberately simple substring matching — the corpus is a few dozen entries,
 * so an index-backed search engine would be more machinery than the content
 * justifies.
 */
function scoreEntry(entry: Pick<IndexEntry, "title" | "summary" | "text">, tokens: string[]) {
  const title = entry.title.toLowerCase();
  const summary = entry.summary.toLowerCase();
  const text = entry.text.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (title.includes(token)) score += 3;
    if (summary.includes(token)) score += 2;
    if (text.includes(token)) score += 1;
  }
  return score;
}

/** Cuts a readable window of text around the first matching token. */
function snippet(text: string, tokens: string[]): string {
  const lower = text.toLowerCase();
  const hit = tokens
    .map((token) => lower.indexOf(token))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (hit === undefined) return text.slice(0, SNIPPET_LENGTH).trim();

  const start = Math.max(0, hit - SNIPPET_LENGTH / 4);
  const raw = text.slice(start, start + SNIPPET_LENGTH).trim();
  return `${start > 0 ? "…" : ""}${raw}${start + SNIPPET_LENGTH < text.length ? "…" : ""}`;
}

function clampLimit(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? Math.floor(value) : fallback;
  return Math.min(20, Math.max(1, Number.isFinite(parsed) ? parsed : fallback));
}

export const webmcpTools: ModelContextTool[] = [
  {
    name: "get_services",
    title: "Puzls tjenester",
    description:
      "Returns Puzl's current catalogue of custom AI consulting services (AI-løsninger) — the same offerings listed on the /tjenester page. Puzl is a Norwegian consultancy that builds bespoke AI systems integrated into a client's existing stack rather than selling off-the-shelf SaaS. Each service includes a short category tag, a one-line summary, and a full description of the problem it solves and the kind of business it fits. Use this to answer what Puzl offers, builds, or sells. Service content is in Norwegian.",
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Optional free-text filter, matched against service titles, tags and descriptions (e.g. 'kundeservice', 'logistics', 'SEO'). Omit to return the full catalogue.",
        },
        includeDetails: {
          type: "boolean",
          description:
            "Whether to include each service's full multi-sentence description. Set false for a compact title-and-summary listing.",
          default: true,
        },
      },
      required: [],
      additionalProperties: false,
    },
    async execute(input) {
      try {
        const { services } = await loadIndex();
        const query = typeof input.query === "string" ? input.query.trim() : "";
        const includeDetails = input.includeDetails !== false;

        const tokens = tokenize(query);
        const matched = tokens.length
          ? services
              .map((service) => ({
                service,
                score: scoreEntry(
                  {
                    title: service.title,
                    summary: service.summary,
                    text: `${service.tag} ${service.summary} ${service.detail}`,
                  },
                  tokens
                ),
              }))
              .filter(({ score }) => score > 0)
              .sort((a, b) => b.score - a.score)
              .map(({ service }) => service)
          : services;

        return ok({
          count: matched.length,
          services: matched.map((service) => ({
            title: service.title,
            category: service.tag,
            summary: service.summary,
            ...(includeDetails ? { details: service.detail } : {}),
            url: service.url,
          })),
        });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Kunne ikke hente tjenester");
      }
    },
  },

  {
    name: "search_articles",
    title: "Søk i artikler",
    description:
      "Full-text search across Puzl's published blog articles at /artikler, covering each article's title, summary and body text. Articles are written in Norwegian and cover custom AI, e-commerce, automation and SEO/AIO topics. Returns matching articles with a relevance-ranked snippet, reading time, publication date and canonical URL. Use this for questions about Puzl's published writing or opinions; use search_site instead for general questions about the company or its services.",
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search terms matched against article titles, summaries and full body text. Norwegian or English terms both work, though the corpus is Norwegian.",
          minLength: 2,
        },
        limit: {
          type: "integer",
          description: "Maximum number of articles to return, ordered by relevance.",
          minimum: 1,
          maximum: 20,
          default: 5,
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    async execute(input) {
      try {
        const query = typeof input.query === "string" ? input.query.trim() : "";
        if (!query) return fail("Parameteret 'query' må være en ikke-tom streng.");

        const tokens = tokenize(query);
        if (!tokens.length) return fail("Søket inneholdt ingen brukbare søkeord.");

        const { articles } = await loadIndex();
        const limit = clampLimit(input.limit, 5);

        const results = articles
          .map((article) => ({
            article,
            score: scoreEntry(
              { title: article.title, summary: article.summary, text: article.body },
              tokens
            ),
          }))
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(({ article, score }) => ({
            title: article.title,
            slug: article.slug,
            summary: article.summary,
            snippet: snippet(article.body, tokens),
            publishedAt: article.publishedAt,
            author: article.author,
            tags: article.tags,
            readingMinutes: article.readingMinutes,
            url: article.url,
            relevance: score,
          }));

        return ok({ query, count: results.length, results });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Søket feilet");
      }
    },
  },

  {
    name: "search_site",
    title: "Søk på hele nettstedet",
    description:
      "General-purpose search across all of puzl.no: service offerings (/tjenester), company background and track record (/om-oss), published articles (/artikler), plus the contact and privacy pages. Puzl is a Norwegian consultancy building bespoke AI solutions. Use this for broad questions that do not map cleanly onto get_services or search_articles — company history, experience, pricing approach, working process, or privacy handling. Returns ranked results with the page path each result lives on. Content is in Norwegian.",
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search terms matched against all indexed site content.",
          minLength: 2,
        },
        limit: {
          type: "integer",
          description: "Maximum number of results to return, ordered by relevance.",
          minimum: 1,
          maximum: 20,
          default: 8,
        },
        kinds: {
          type: "array",
          description:
            "Optional filter restricting results to certain content types. Omit to search everything.",
          items: {
            type: "string",
            enum: ["service", "about", "article", "page"],
            description:
              "'service' = an offering on /tjenester, 'about' = company principle or track-record card on /om-oss, 'article' = a blog post, 'page' = a standalone page such as contact or privacy.",
          },
          uniqueItems: true,
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
    async execute(input) {
      try {
        const query = typeof input.query === "string" ? input.query.trim() : "";
        if (!query) return fail("Parameteret 'query' må være en ikke-tom streng.");

        const tokens = tokenize(query);
        if (!tokens.length) return fail("Søket inneholdt ingen brukbare søkeord.");

        const { entries } = await loadIndex();
        const limit = clampLimit(input.limit, 8);
        const kinds = Array.isArray(input.kinds) ? (input.kinds as string[]) : null;

        const results = entries
          .filter((entry) => !kinds?.length || kinds.includes(entry.kind))
          .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(({ entry, score }) => ({
            title: entry.title,
            kind: entry.kind,
            path: entry.path,
            summary: entry.summary,
            snippet: snippet(entry.text, tokens),
            relevance: score,
          }));

        return ok({ query, count: results.length, results });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Søket feilet");
      }
    },
  },

  {
    name: "submit_contact_form",
    title: "Send kontaktskjema",
    description:
      "Submits Puzl's contact form on behalf of the user, sending their enquiry as an email to hei@puzl.no — exactly what the human-facing form at /kontakt does. This sends a real message to a real inbox and cannot be undone, so confirm the wording and the user's contact details with them before calling it. Do not call it speculatively, to test the tool, or more than once for the same enquiry. Puzl uses the submitted details only to reply; they are not stored in a CRM or used for marketing (see /personvern). All fields are free text and may be written in Norwegian or English.",
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    inputSchema: {
      type: "object",
      properties: {
        navn: {
          type: "string",
          description: "Full name of the person making the enquiry (Norwegian: 'navn').",
          minLength: 1,
          maxLength: 100,
        },
        email: {
          type: "string",
          format: "email",
          description:
            "Reply-to email address for the person making the enquiry. Puzl replies to this address, so it must be one the user actually reads.",
          maxLength: 200,
        },
        telefon: {
          type: "string",
          description:
            "Optional phone number (Norwegian: 'telefon'), e.g. '+47 000 00 000'. Omit if the user has not provided one — never invent it.",
          maxLength: 40,
        },
        melding: {
          type: "string",
          description:
            "The enquiry itself (Norwegian: 'melding'): what the user wants to build or discuss. Write it in the user's own words and confirm the text with them before sending.",
          minLength: 10,
          maxLength: 5000,
        },
      },
      required: ["navn", "email", "melding"],
      additionalProperties: false,
    },
    async execute(input) {
      try {
        // Posts to the same endpoint and payload shape as the human form, so
        // server-side validation and rate limiting apply identically.
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            navn: input.navn,
            email: input.email,
            telefon: input.telefon,
            melding: input.melding,
          }),
        });

        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
          success?: boolean;
        };

        if (!res.ok || json.error) {
          return fail(
            json.error ??
              `Skjemaet kunne ikke sendes (HTTP ${res.status}). Meldingen ble ikke levert.`
          );
        }

        return ok({
          success: true,
          message:
            "Henvendelsen er sendt til hei@puzl.no. Puzl svarer normalt til oppgitt e-postadresse.",
        });
      } catch (error) {
        return fail(
          error instanceof Error
            ? `Skjemaet kunne ikke sendes: ${error.message}`
            : "Skjemaet kunne ikke sendes."
        );
      }
    },
  },
];
