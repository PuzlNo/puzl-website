import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type FaqItem = {
  question: string;
  answer: string;
};

export type PostFrontmatter = {
  title: string;
  /** Full TL;DR key-takeaway summary — single source for the on-page
   * summary section and the BlogPosting JSON-LD description, both of
   * which benefit from complete, extractable answers with no meaningful
   * length constraint. For the HTML meta description and og:description,
   * which do get truncated in classic search/social contexts, derive a
   * shorter excerpt with `truncateForMetaDescription` instead of writing
   * a second field — that would duplicate hand-authored copy. */
  summary: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
  /** Optional Q&A pairs, single-sourced by <FAQSection>, the FAQPage
   * JSON-LD, and the llms.txt/agent-index text exports. Omit entirely
   * for articles with no FAQ content — every consumer treats it as
   * optional and renders nothing rather than an empty section. */
  faq?: FaqItem[];
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
};

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: { ...data, slug: data.slug ?? slug } as PostFrontmatter,
    content,
  };
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
}

const WORDS_PER_MINUTE = 210;

function stripMarkdown(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getReadingTimeMinutes(content: string): number {
  const wordCount = stripMarkdown(content).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

export function formatReadingTime(content: string): string {
  return `${getReadingTimeMinutes(content)} min lesetid`;
}

const META_DESCRIPTION_TARGET_LENGTH = 160;

/**
 * Derives a snippet-safe excerpt from the full `summary` for contexts that
 * truncate (HTML meta description, og:description) — cuts at the nearest
 * sentence boundary at or under the target length, falling back to the
 * nearest word boundary with an ellipsis. Keeps `summary` as the single
 * authored source instead of maintaining a separate short field.
 */
export function truncateForMetaDescription(
  summary: string,
  maxLength: number = META_DESCRIPTION_TARGET_LENGTH
): string {
  if (summary.length <= maxLength) return summary;

  const sentences = summary.match(/[^.!?]+[.!?]+/g) ?? [summary];
  let excerpt = "";
  for (const sentence of sentences) {
    if ((excerpt + sentence).trim().length > maxLength) break;
    excerpt += sentence;
  }
  excerpt = excerpt.trim();
  if (excerpt) return excerpt;

  const truncated = summary.slice(0, maxLength);
  return `${truncated.slice(0, truncated.lastIndexOf(" "))}…`;
}
