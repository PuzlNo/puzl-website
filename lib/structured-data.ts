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
