// pages/insights/[slug].tsx
//
// ASSUMPTION FLAGGED: this calls `getArticles()` and filters client-side
// for the matching slug, since I don't currently have visibility into
// whether lib/service.ts already has a dedicated `getArticleBySlug(slug)`
// function (it likely does, following the same pattern as getPosts()/
// getArticles() — check the file). If it does, swap the implementation
// below to call that directly instead — it'll be one GraphQL request
// instead of fetching the whole list and filtering, which is faster and
// cheaper as your post count grows.

import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';

type PostPageProps = {
  post: Article | null;
};

export default function InsightPostPage({ post }: PostPageProps) {
  if (!post) {
    return (
      <section className="section--page py-32 text-center">
        <div className="wrap">
          <h1 className="sec-title">Post not found.</h1>
          <Link href="/insights" className="btn btn--ghost mt-6 inline-flex">
            ← Back to Insights
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} — Echolink Solutions</title>
      </Head>
      <article className="section--page py-32">
        <div className="wrap max-w-2xl">
          <Link href="/insights" className="tag-mono tag-mono--accent mb-6 inline-block">
            ← BACK TO INSIGHTS
          </Link>
          <span className="eyebrow">{post.tags?.[0]?.toUpperCase() || 'INSIGHT'}</span>
          <h1 className="sec-title mb-6">{post.title}</h1>
          <div
            className="prose prose-invert text-ink_text-secondary text-sm leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
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
    fallback: 'blocking', // new posts render on first request, then cache
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
