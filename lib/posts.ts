import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  /** TL;DR key-takeaway summary — single source for the on-page summary
   * section, the meta description, and the BlogPosting JSON-LD description. */
  summary: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
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
