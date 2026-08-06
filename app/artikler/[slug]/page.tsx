import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";
import ArticleCover from "@/components/ArticleCover";
import JsonLd from "@/components/JsonLd";
import { getAllSlugs, getPostBySlug, formatReadingTime, truncateForMetaDescription } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, summary, publishedAt, updatedAt, author } = post.frontmatter;
  const metaDescription = truncateForMetaDescription(summary);

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: `/artikler/${slug}`,
    },
    openGraph: {
      title,
      description: metaDescription,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [author],
      url: `/artikler/${slug}`,
    },
  };
}

const mdxComponents = {
  img: ({ alt = "", ...props }: ImageProps) => (
    <Image
      {...props}
      alt={alt}
      width={props.width ?? 1200}
      height={props.height ?? 675}
      className="rounded-box"
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
    />
  ),
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArtikkelPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, summary, publishedAt, updatedAt, author } = post.frontmatter;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "Puzl" },
    mainEntityOfPage: `https://puzl.no/artikler/${slug}`,
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Hjem", path: "/" },
    { name: "Artikler", path: "/artikler" },
    { name: title, path: `/artikler/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <article className="mx-auto max-w-[91ch]">
          <Link
            href="/artikler"
            className="stitch-link inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--chalk)] transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            Alle artikler
          </Link>
          <h1 className="mt-4 text-[32px] font-bold leading-[1.15] sm:text-[42px]">{title}</h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-45)]">
            {formatDate(publishedAt)} · {author} · {formatReadingTime(post.content)}
          </p>

          <ArticleCover seed={slug} className="mt-8 aspect-[16/9] w-full" />

          <section className="mt-8 rounded-box bg-ink px-6 py-6 text-paper sm:px-8 sm:py-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--chalk)]">
              Oppsummering av artikkelen
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--paper-70)]">{summary}</p>
          </section>

          <div className="article-body mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
