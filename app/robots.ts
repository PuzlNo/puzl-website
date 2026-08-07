import type { MetadataRoute } from "next";

const BASE_URL = "https://puzl.no";

/**
 * Crawler policy.
 *
 * AI-crawler audit (Aug 2026): there is a single `User-agent: *` group with
 * `Allow: /` and no disallow rules, so every AI crawler and AI-training
 * control token — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot,
 * Google-Extended, Applebot-Extended — is permitted across the whole site.
 * Nothing was ever restricted, so there is no prior intent to preserve here.
 *
 * The wildcard group is deliberately left as the only group: in the robots
 * protocol a crawler obeys the single most specific matching user-agent group
 * and ignores `*` entirely, so adding per-bot groups that merely repeat
 * `Allow: /` would silently exempt those bots from any future `Disallow` added
 * to `*`. Restrictions, if ever wanted, belong in this one group.
 *
 * /llms.txt and /llms-full.txt are intentionally NOT listed as `Sitemap:`
 * entries. That directive belongs to the sitemaps protocol, whose plain-text
 * variant expects one bare URL per line; pointing it at Markdown makes the
 * sitemap unparseable and surfaces as a fetch error in Search Console. They
 * are discovered the same way robots.txt itself is — by well-known path — and
 * neither Cloudflare nor Perplexity advertises their llms.txt in robots.txt.
 * The explicit Allow entries below just make their crawlability durable.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/llms.txt", "/llms-full.txt"],
      disallow: [],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
