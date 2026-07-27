import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionEyebrow from "@/components/SectionEyebrow";
import GrainlineMark from "@/components/GrainlineMark";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artikler",
  description: "Tanker om skreddersydd AI, fra Puzl.",
};

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
      <Nav />
      <main className="flex-1 px-6 pt-32 pb-28 sm:pt-36">
        <div className="mx-auto max-w-[1180px]">
          <SectionEyebrow label="Artikler" />
          <h1 className="mt-4 text-[36px] font-bold sm:text-[44px]">Ting vi tenker på.</h1>
          <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--ink-45)]">
            Notater om skreddersydd AI, tilnærmingen vår og hva vi lærer underveis.
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
                  className="group relative overflow-hidden rounded-box border border-[var(--line)] bg-paper p-7 transition-colors hover:bg-[var(--paper-3)]"
                >
                  <div className="flex items-center gap-2.5">
                    <GrainlineMark size={18} className="shrink-0 text-[var(--chalk)]" />
                    <h2 className="text-[18px] font-semibold">{post.frontmatter.title}</h2>
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--chalk)]">
                    {formatDate(post.frontmatter.publishedAt)}
                  </p>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-45)]">
                    {post.frontmatter.description}
                  </p>
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
