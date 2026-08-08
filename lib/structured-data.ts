import type { FaqItem } from "@/lib/posts";

export const SITE_URL = "https://puzl.no";
export const SITE_NAME = "Puzl";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "hei@puzl.no",
  sameAs: ["https://www.linkedin.com/company/puzlno"],
  description:
    "Vi bygger AI-løsninger skreddersydd til din bedrift, dine systemer og dine mål.",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Frontmatter only carries a bare date ("2026-07-28"), with no real
 * time-of-day — articles aren't published at a tracked instant. Google's
 * structured data validator wants a full ISO 8601 datetime with an explicit
 * timezone offset, not just a date, so this fills midnight UTC ("Z") rather
 * than guessing a Norway offset (+01:00/+02:00) that flips with DST and
 * would imply a precision the source data doesn't have.
 */
function toIsoDateTime(date: string): string {
  return `${date}T00:00:00Z`;
}

export type BlogPostingArgs = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
};

export function blogPostingJsonLd({
  slug,
  title,
  summary,
  publishedAt,
  updatedAt,
  author,
}: BlogPostingArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    image: `${SITE_URL}/artikler/${slug}/opengraph-image`,
    datePublished: toIsoDateTime(publishedAt),
    dateModified: toIsoDateTime(updatedAt ?? publishedAt),
    author: { "@type": "Organization", name: author, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/artikler/${slug}`,
  };
}

/**
 * Note: Google retired the FAQ rich result feature in Search from May 2026
 * (announced in their May 2026 changelog, docs removed June 2026), so this
 * no longer produces a Google SERP rich result. Still emitted as valid
 * schema.org FAQPage markup — other engines (Bing, AI answer/citation
 * engines relevant to GEO) still consume FAQPage structured data, and it
 * costs nothing to include alongside BreadcrumbList/BlogPosting on the
 * same page (distinct @type, no property overlap).
 */
export function faqPageJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
