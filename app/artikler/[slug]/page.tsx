import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image, { type ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

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

  const { title, description, publishedAt, updatedAt, author, coverImage } = post.frontmatter;

  return {
    title,
    description,
    alternates: {
      canonical: `/artikler/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [author],
      url: `/artikler/${slug}`,
      images: coverImage ? [coverImage] : undefined,
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

  const { title, description, publishedAt, updatedAt, author, coverImage } = post.frontmatter;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "Puzl" },
    mainEntityOfPage: `https://puzl.no/artikler/${slug}`,
    ...(coverImage ? { image: coverImage } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <article className="mx-auto max-w-[70ch]">
          <SectionEyebrow label="Artikkel" />
          <h1 className="mt-4 text-[32px] font-bold leading-[1.15] sm:text-[42px]">{title}</h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--ink-45)]">
            {formatDate(publishedAt)} · {author}
          </p>

          {coverImage && (
            <Image
              src={coverImage}
              alt=""
              width={1400}
              height={800}
              className="rounded-box mt-8 w-full"
              priority
            />
          )}

          <div className="article-body mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
