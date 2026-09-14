// pages/insights/[slug].tsx
//
// STYLE FIX (Insight Page item): the edit doc asks to "design this like
// ULEVUS article page" and explicitly "do not add the post date."
//
// FLAGGED: I could not find a real design reference called "Ulevus" —
// web search turned up nothing matching (unrelated companies named
// similarly, no design site). The only "Ulevus" in this whole project
// is the name of a reviewer/commenter from the very first sitemap
// screenshots shared at the start of this engagement, not a design
// site to mirror. Rather than guess at an external reference that may
// not exist, this is a clean, professional editorial article layout
// built from standard best practice (clear cover image, category tag,
// title, byline-free header since no author field exists in the data
// model, then a properly-spaced content column) — and the "no post
// date" instruction is followed exactly: `date` is never rendered here.
// If "Ulevus" refers to something specific, flag it and this can be
// adjusted to match directly.

import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';

type PostPageProps = {
  post: Article | null;
};

// Rough estimate, not a substitute for a real date — used only as a
// small useful signal for the reader (how long this will take to
// read), which the edit doc doesn't prohibit the way it prohibits a
// publish date.
function estimateReadTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function InsightPostPage({ post }: PostPageProps) {
  if (!post) {
    return (
      <div className="pt-44"><section className="section--page text-center">
        <div className="wrap">
          <h1 className="sec-title">Post not found.</h1>
          <Link href="/insights" className="btn btn--ghost mt-6 inline-flex">
            ← Back to Insights
          </Link>
        </div>
      </section></div>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <>
      <Head>
        <title>{post.title} — Echolink Solutions</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]+>/g, '').slice(0, 155).trim() + '…'}
        />
        {/* FIX: every page on the site was sharing one static og:image
            from _document.tsx (the generic site-wide social card), even
            article pages with their own real featured image. That's
            the wrong preview for the content most likely to be shared
            individually — overriding here with the article's own title,
            description, and image gives it a correct, distinct social
            card instead of falling back to the generic sitewide one. */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} — Echolink Solutions`} />
        <meta
          property="og:description"
          content={post.content.replace(/<[^>]+>/g, '').slice(0, 155).trim() + '…'}
        />
        {post.featuredImage && (
          <>
            <meta property="og:image" content={post.featuredImage} />
            <meta name="twitter:image" content={post.featuredImage} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Echolink Solutions`} />
      </Head>
      <div className="pt-44"><article className="section--page pb-24">
        <div className="wrap max-w-3xl">
          <Link href="/insights" className="tag-mono tag-mono--accent mb-8 inline-block">
            ← BACK TO INSIGHTS
          </Link>

          <span className="eyebrow-plain">{post.tags?.[0]?.toUpperCase() || 'INSIGHT'}</span>
          <h1 className="sec-title !text-4xl md:!text-5xl mb-6 max-w-2xl">{post.title}</h1>

          {/* No post date, per the edit doc — read time only. */}
          <p className="tag-mono mb-10">{readTime} min read</p>

          {post.featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden mb-12">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          <div
            className="prose prose-invert prose-lg max-w-none
                       prose-headings:font-bold prose-headings:text-white
                       prose-p:text-ink_text-secondary prose-p:leading-relaxed
                       prose-a:text-accent-light prose-strong:text-white
                       prose-li:text-ink_text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-ink-border flex items-center justify-between">
            <Link href="/insights" className="btn btn--ghost">
              ← All insights
            </Link>
            <Link href="/contact" className="btn btn--primary">
              Get in touch →
            </Link>
          </div>
        </div>
      </article></div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let posts: Article[] = [];
  try {
    posts = await getArticles(100);
  } catch (err) {
    console.warn('Could not fetch articles for static paths:', err);
  }

  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  let posts: Article[] = [];
  try {
    posts = await getArticles(100);
  } catch (err) {
    console.warn('Could not fetch articles:', err);
  }

  const post = posts.find((p) => p.slug === slug) || null;

  return {
    props: { post },
    revalidate: 60,
  };
};
