import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Article } from '@/lib/types';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const fallbackPosts = [
  {
    tag: 'PERSPECTIVE',
    title: 'Why decentralized AI beats one big black box',
    excerpt: 'What changes when every system runs its own verifiable agent instead of trusting a single provider.',
    content:
      'Most AI today runs inside one provider\u2019s walls. That vendor sees your data, owns the model, and can change pricing or terms whenever they like. Decentralized means no one provider holds your data or your AI hostage. Instead, every system runs its own agent, scoped to its own context, with every decision logged and independently verifiable. No black box, no single point of failure, and your data stays yours.',
  },
  {
    tag: 'FIELD NOTES',
    title: 'Farm to shelf, proven at every hand-off',
    excerpt: 'How a tamper-proof record follows a product from origin to checkout, and why shoppers can verify it themselves.',
    content:
      'High-value goods pass through a web of operators, makers, handlers, regulators, and insurers, each holding a piece of the truth. When something is audited, recalled, or questioned, the full history has to be proven fast, and proven untouched. Every step, from harvest to shelf, gets photographed, time-stamped, and anchored, so the shopper scanning the code at checkout sees the same verified record an auditor would.',
  },
  {
    tag: 'PROJECT CONTROLS',
    title: 'Earned value only works if the data is real',
    excerpt: 'Why CPI and SPI mislead when progress is self-reported, and what changes when the inputs are verified at the source.',
    content:
      'Most projects report status from a spreadsheet that was accurate last week. CPI and SPI are only as honest as the inputs feeding them, and self-reported progress has a way of drifting optimistic right up until it can\u2019t anymore. When the baseline, every revision, and every progress claim is anchored to a verifiable layer instead, what was approved and when becomes provable, not just claimed.',
  },
];

type InsightsProps = { posts?: Article[]; };

export const Insights = ({ posts }: InsightsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = posts && posts.length > 0
    ? posts.map((p) => ({
        tag: p.tags?.[0]?.toUpperCase() || 'INSIGHT',
        title: p.title,
        excerpt: p.content.replace(/<[^>]+>/g, '').slice(0, 140) + '…',
        content: p.content,
      }))
    : fallbackPosts;

  const openPost = openIndex !== null ? items[openIndex] : null;

  return (
    // BACKGROUND + LAYOUT FIX: this whole section was built as a light
    // section (bg-[#FFFFFF]) with posts as a horizontal list (rows with
    // dividers, tag/title/excerpt/"Read" in 3 columns per row). Checked
    // against a direct crop of Sample.pdf and both are wrong — the
    // reference has this on the site's standard DARK section background,
    // with the header centered (eyebrow, then title, then subhead, all
    // stacked and centered, not split left/right), and posts as a
    // 3-column grid of standard dark cards (pill tag, bold title,
    // description, "Read →" at the bottom) — not a list. Rebuilt to
    // match on all three points.
    <section className="section">
      <div className="wrap">
        <RevealOnScroll>
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow-plain">INSIGHTS</span>
          <h2 className="sec-title">Thinking on verifiable AI and trust.</h2>
          <p className="sec-sub sec-sub--center">
            Ideas, updates, and field notes from the work of wiring AI, automation,
            and blockchain into one trusted layer.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((post, i) => (
            <button
              key={post.title}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="card text-left group"
            >
              <span className="eyebrow-plain !text-[11px] !mb-0">{post.tag}</span>
              <h4 className="text-white font-bold text-lg mt-4 mb-2 group-hover:underline">
                {post.title}
              </h4>
              <p className="text-ink_text-secondary text-sm leading-relaxed mb-5">
                {post.excerpt}
              </p>
              <span className="text-accent-light text-sm font-semibold">
                Read →
              </span>
            </button>
          ))}
        </div>
        </RevealOnScroll>

        <p className="text-ink_text-secondary text-sm mt-10 text-center">
          More insights coming soon. Want to be notified?{' '}
          <Link href="/contact" className="text-accent-light font-semibold">
            Get in touch →
          </Link>
        </p>
      </div>

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
            <div className="fixed inset-0 bg-[#16003B]/60 backdrop-blur-sm" aria-hidden="true" />
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
                <Dialog.Panel className="w-full max-w-2xl bg-white rounded-card shadow-2xl p-8 md:p-10 relative max-h-[85vh] overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(null)}
                    className="absolute top-6 right-6 text-[#16003B] hover:text-[#B24300] transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  {openPost && (
                    <>
                      <span className="tag-mono !text-[#B24300] mb-4 inline-block">
                        {openPost.tag}
                      </span>
                      <Dialog.Title className="text-[#16003B] font-bold text-2xl md:text-3xl leading-tight mb-6 pr-8">
                        {openPost.title}
                      </Dialog.Title>
                      <div
                        className="insight-content text-[#434343] text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: openPost.content }}
                      />
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
};
