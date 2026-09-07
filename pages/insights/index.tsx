// pages/insights/index.tsx
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';

type InsightsPageProps = {
  posts: Article[];
};

export default function InsightsIndexPage({ posts }: InsightsPageProps) {
  return (
    <>
      <Head>
        <title>Insights — Echolink Solutions</title>
        <meta
          name="description"
          content="Ideas, updates, and field notes from the work of wiring AI, automation, and blockchain into one trusted layer."
        />
      </Head>

      <section className="section--page py-32">
        <div className="wrap text-center">
          <span className="eyebrow">INSIGHTS</span>
          <h1 className="sec-title">Thinking on verifiable AI and trust.</h1>
          <p className="sec-sub sec-sub--center mt-4">
            Ideas, updates, and field notes from the work of wiring AI, automation, and
            blockchain into one trusted layer.
          </p>

          {posts.length === 0 ? (
            <p className="text-ink_text-secondary mt-12">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-5 mt-12 text-left">
              {posts.map((post) => (
                <Link key={post.slug} href={`/insights/${post.slug}`} className="card block">
                  <span className="tag-mono tag-mono--accent">
                    {post.tags?.[0]?.toUpperCase() || 'INSIGHT'}
                  </span>
                  <h4 className="text-white font-bold mt-2 mb-2">{post.title}</h4>
                  <p className="text-ink_text-secondary text-sm leading-relaxed mb-4">
                    {post.content.replace(/<[^>]+>/g, '').slice(0, 140)}…
                  </p>
                  <span className="text-accent-light text-sm font-medium">Read →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<InsightsPageProps> = async () => {
  let posts: Article[] = [];
  try {
    posts = await getArticles(50); // pull a generous batch for the listing page
  } catch (err) {
    console.warn('Could not fetch articles from WordPress:', err);
  }

  return {
    props: { posts },
    revalidate: 60,
  };
};
