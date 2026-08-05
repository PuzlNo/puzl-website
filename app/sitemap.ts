import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://puzl.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/tjenester`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/om-oss`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/personvern`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/artikler`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/artikler/${post.frontmatter.slug}`,
    lastModified: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
