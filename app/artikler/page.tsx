import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import GrainlineMark from "@/components/GrainlineMark";
import ArticleCover from "@/components/ArticleCover";
import JsonLd from "@/components/JsonLd";
import { getAllPosts, formatReadingTime } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Artikler",
  description: "Tanker om skreddersydd AI, fra Puzl.",
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Hjem", path: "/" },
  { name: "Artikler", path: "/artikler" },
]);

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArtiklerPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <div className="mx-auto max-w-[1180px]">
          <SectionEyebrow label="Artikler" />
          <h1 className="mt-4 text-[36px] font-bold sm:text-[44px]">Ting vi tenker på</h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
            Innsikt fra arbeidet vårt med skreddersydd AI og digitale løsninger for norske
            virksomheter, fra konkrete erfaringer til generelle lærdommer underveis.
          </p>

          {posts.length === 0 ? (
            <p className="mt-14 text-[15px] text-[var(--ink-45)]">
              Ingen artikler publisert ennå.
            </p>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.frontmatter.slug}
                  href={`/artikler/${post.frontmatter.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-box border border-[var(--line)] bg-paper transition-colors hover:bg-[var(--paper-3)]"
                >
                  <ArticleCover seed={post.frontmatter.slug} className="aspect-[16/9] w-full rounded-none" />
                  <div className="p-7">
                    <div className="flex items-center gap-2.5">
                      <GrainlineMark size={18} className="shrink-0 text-[var(--chalk)]" />
                      <h2 className="text-[18px] font-semibold">{post.frontmatter.title}</h2>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
                      {formatDate(post.frontmatter.publishedAt)} · {formatReadingTime(post.content)}
                    </p>
                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-45)]">
                      {post.frontmatter.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
