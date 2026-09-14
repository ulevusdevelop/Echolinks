// pages/insights/index.tsx
import React, { useState, Fragment } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';

type InsightsPageProps = {
  posts: Article[];
};

// PLACEHOLDER content, explicitly requested where real posts aren't
// available yet. Real WordPress posts (via getArticles in
// getStaticProps below) always take priority. Each entry carries its
// own `ratio` (width/height) — this is what actually drives the
// masonry effect: previous version forced every card's image to the
// same 5:4 box regardless of the source image's real proportions,
// which made every card roughly the same height and defeated the
// masonry look even though the CSS multi-column technique underneath
// was correct. Also added a full `content` field per post so "Read
// More" can open a modal with the complete article instead of linking
// to a page that doesn't exist yet for placeholders.
const placeholderPosts = [
  {
    slug: 'placeholder-1',
    title: 'Why decentralized AI beats one big black box',
    date: '15 August 2026',
    tag: 'PERSPECTIVE',
    excerpt: 'What changes when every system runs its own verifiable agent instead of trusting a single provider.',
    content:
      '<p>Most AI today runs inside one provider\u2019s walls. That vendor sees your data, owns the model, and can change pricing or terms whenever they like. Decentralized means no one provider holds your data or your AI hostage.</p><p>Instead, every system runs its own agent, scoped to its own context, with every decision logged and independently verifiable. No black box, no single point of failure, and your data stays yours.</p><p>This is not a theoretical benefit. When an auditor, regulator, or customer asks you to prove what your AI actually did, a decentralized architecture means you can show them a verifiable record, not just an assurance.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-1/700/500',
    ratio: 700 / 500,
  },
  {
    slug: 'placeholder-2',
    title: 'Farm to shelf, proven at every hand-off',
    date: '2 July 2026',
    tag: 'FIELD NOTES',
    excerpt: 'How a tamper-proof record follows a product from origin to checkout, and why shoppers can verify it themselves.',
    content:
      '<p>High-value goods pass through a web of operators, makers, handlers, regulators, and insurers, each holding a piece of the truth. When something is audited, recalled, or questioned, the full history has to be proven fast, and proven untouched.</p><p>Every step, from harvest to shelf, gets photographed, time-stamped, and anchored, so the shopper scanning the code at checkout sees the same verified record an auditor would.</p><p>We started with the hardest cases, cold chain, chain of custody, regulated goods, and built the layer to apply anywhere trust matters.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-2/700/920',
    ratio: 700 / 920,
  },
  {
    slug: 'placeholder-3',
    title: 'Earned value only works if the data is real',
    date: '19 June 2026',
    tag: 'PROJECT CONTROLS',
    excerpt: 'Why CPI and SPI mislead when progress is self-reported, and what changes when the inputs are verified at the source.',
    content:
      '<p>Most projects report status from a spreadsheet that was accurate last week. CPI and SPI are only as honest as the inputs feeding them, and self-reported progress has a way of drifting optimistic right up until it cannot anymore.</p><p>When the baseline, every revision, and every progress claim is anchored to a verifiable layer instead, what was approved and when becomes provable, not just claimed.</p><p>That is the difference between a status report and a status you can defend.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-3/700/640',
    ratio: 700 / 640,
  },
  {
    slug: 'placeholder-4',
    title: 'What changes when every system runs its own agent',
    date: '4 May 2026',
    tag: 'PERSPECTIVE',
    excerpt: 'Instead of one AI trying to understand your whole business, thirteen scoped agents that each know one job well.',
    content:
      '<p>Instead of one AI trying to understand your whole business, thirteen scoped agents that each know one job well, and prove what they did along the way.</p><p>A finance agent does not need to understand supply chain. A supply chain agent does not need HR context. Scoping each agent to its own domain, under its own policy controls, means smaller blast radius when something goes wrong, and a much clearer audit trail when everything goes right.</p><p>Shared context still matters, agents plug into one decision network, so the whole business works from the same verified truth.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-4/700/820',
    ratio: 700 / 820,
  },
  {
    slug: 'placeholder-5',
    title: 'The 855 acknowledgement, and why AI should read it',
    date: '22 March 2026',
    tag: 'FIELD NOTES',
    excerpt: 'A small EDI document type that quietly tells you whether your purchase order actually landed.',
    content:
      '<p>A small EDI document type that quietly tells you whether your purchase order actually landed, and how automating its review closes a gap most teams do not notice until it costs them.</p><p>The 855 acknowledgement is easy to ignore because it rarely contains bad news. That is exactly why it needs a second set of eyes, an AI agent that can flag the rare exception without needing a human to read every single one.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-5/700/460',
    ratio: 700 / 460,
  },
  {
    slug: 'placeholder-6',
    title: 'No lock-in, no surprise price hikes, your data stays yours',
    date: '8 February 2026',
    tag: 'PERSPECTIVE',
    excerpt: 'The real cost of centralized AI is not the invoice. It is what happens after you are already dependent on it.',
    content:
      '<p>The real cost of centralized AI is not the invoice. It is what happens when a single provider decides to change the terms after you are already dependent on them.</p><p>Decentralized infrastructure means routing across multiple models and compute providers through one gateway, so no single vendor can hold your operations hostage to a pricing change or a policy shift you did not agree to.</p>',
    image: 'https://picsum.photos/seed/echolink-insight-6/700/780',
    ratio: 700 / 780,
  },
];

export default function InsightsIndexPage({ posts }: InsightsPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ARCHITECTURE FIX: a real, dedicated /insights/[slug] page already
  // exists — properly built with its own SEO metadata and the "no post
  // date" decision already applied — but nothing linked to it. Every
  // card's "Read More" always opened the in-page modal, real posts
  // included, so that whole page was unreachable through normal
  // navigation. Placeholders have no real page to link to, so the modal
  // stays their fallback; real posts now link to their actual page
  // instead, so the detail page actually gets used and gets a real,
  // shareable, indexable URL.
  const isRealPosts = posts.length > 0;

  const items =
    isRealPosts
      ? posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.date
            ? new Date(p.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '',
          tag: p.tags?.[0]?.toUpperCase() || 'INSIGHT',
          excerpt: p.content.replace(/<[^>]+>/g, '').slice(0, 160) + '…',
          content: p.content,
          image: p.featuredImage || `https://picsum.photos/seed/${p.slug}/700/700`,
          ratio: 1, // real WP posts don't carry known dimensions ahead of load
        }))
      : placeholderPosts;

  const openPost = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <Head>
        <title>Insights — Echolink Solutions</title>
        <meta
          name="description"
          content="Ideas, updates, and field notes from the work of wiring AI, automation, and blockchain into one trusted layer."
        />
      </Head>

      {/* RESTYLED (direct request): "Organize the first section on the
          Insights page to have same starting Introductory Look Like
          Project Controls" — was centered with no down-arrow; now
          matches ProjectControls' hero exactly: left-aligned content,
          the same pt-44/pb-20 padding, and the down-arrow. */}
      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
          <span className="eyebrow-plain">INSIGHTS</span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
            Thinking on verifiable AI and trust.
          </h1>
          <p className="text-white text-base leading-relaxed max-w-xl mb-10">
            Ideas, updates, and field notes from the work of wiring AI, automation, and
            blockchain into one trusted layer.
          </p>
          {/* Down-arrow removed here specifically (direct instruction)
              — "Articles" already serves as the section's own visual
              anchor/label right below, so the arrow was redundant on
              this page even though other page-top heroes keep it. */}
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="wrap">
          <div className="flex items-center gap-6 pb-8 border-b border-[#E5E5E5] mb-10">
            <span
              className="text-xs tracking-tag uppercase px-5 py-2"
              style={{ background: '#16003B', color: '#FFFFFF' }}
            >
              Articles
            </span>
            <Link
              href="/contact"
              className="ml-auto text-xs tracking-tag uppercase underline underline-offset-4"
              style={{ color: '#16003B' }}
            >
              Suggest a topic →
            </Link>
          </div>

          {/* True masonry: each card's image keeps its own natural
              aspect ratio (`ratio` per post) instead of being forced
              into a uniform box, so cards genuinely land at different
              heights inside the CSS multi-column flow. "Read More" now
              opens a modal with the full article instead of linking to
              a page (placeholders had nowhere real to link to anyway,
              and this matches the homepage Insights section's existing
              modal pattern for consistency). */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {items.map((post, i) => (
              <div key={post.slug} className="break-inside-avoid mb-5">
                <div style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                  <div className="relative w-full" style={{ aspectRatio: post.ratio }}>
                    <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" unoptimized />
                  </div>
                  <div className="p-5">
                    {/* Post date removed per direct instruction ("Do not
                        add the post date") — was rendering here as
                        `post.date`. The data field itself is left alone
                        (still used for sitemap/structured-data purposes
                        elsewhere) — only the visible display is removed. */}
                    <h2 className="font-bold text-xl leading-snug mb-3" style={{ color: '#16003B' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#707070' }}>
                      {post.excerpt}
                    </p>
                    {isRealPosts ? (
                      <Link
                        href={`/insights/${post.slug}`}
                        className="inline-block text-sm font-medium underline px-4 py-2"
                        style={{ background: '#16003B', color: '#FFFFFF' }}
                      >
                        Read More
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        className="inline-block text-sm font-medium underline px-4 py-2"
                        style={{ background: '#16003B', color: '#FFFFFF' }}
                      >
                        Read More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-article modal */}
      <Transition show={openPost !== null} as={Fragment}>
        <Dialog onClose={() => setOpenIndex(null)} className="relative z-[60]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4 md:p-8">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white max-w-2xl w-full relative">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(null)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90"
                    aria-label="Close"
                  >
                    <XMarkIcon className="w-5 h-5" style={{ color: '#16003B' }} />
                  </button>

                  {openPost && (
                    <>
                      <div className="relative w-full aspect-[16/9]">
                        <Image src={openPost.image} alt={openPost.title} fill sizes="(min-width: 768px) 672px, 100vw" className="object-cover" unoptimized />
                      </div>
                      <div className="p-8 md:p-10">
                        {/* Post date removed here too, same instruction
                            as the card grid above. */}
                        <Dialog.Title
                          as="h2"
                          className="font-bold text-2xl md:text-3xl leading-tight mb-6"
                          style={{ color: '#16003B' }}
                        >
                          {openPost.title}
                        </Dialog.Title>
                        <div
                          className="text-sm leading-relaxed space-y-4 [&_p]:mb-4"
                          style={{ color: '#434343' }}
                          dangerouslySetInnerHTML={{ __html: openPost.content }}
                        />
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export const getStaticProps: GetStaticProps<InsightsPageProps> = async () => {
  let posts: Article[] = [];
  try {
    posts = await getArticles(50);
  } catch (err) {
    console.warn('Could not fetch articles from WordPress:', err);
  }

  return {
    props: { posts },
    revalidate: 60,
  };
};
