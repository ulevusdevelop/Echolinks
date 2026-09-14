import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const points = [
  {
    number: '01',
    title: 'Proof, not just capability',
    description:
      'Your systems do the work. But can you prove a record was not changed after the fact? A normal database can\u2019t, anyone with access can edit a record and its logs. We make every action verifiable, so when an auditor, regulator, insurer, or customer asks you to prove it, you can.',
    protects: 'You are never the company that "can\u2019t explain what happened." You hold tamper-proof evidence.',
  },
  {
    number: '02',
    title: 'No single vendor owns your intelligence',
    description:
      'Most AI today runs inside one provider\u2019s walls. That vendor sees your data, owns the model, and can change pricing or terms whenever they like. Decentralized means no one provider holds your data or your AI hostage.',
    protects: 'No lock-in, no surprise price hikes, no single point of failure, and your data stays yours.',
  },
  {
    number: '03',
    title: 'Governance before you need it',
    description:
      'As AI agents start to act, spending, sending documents, moving inventory, "the AI did something and we can\u2019t explain why" becomes a legal and board-level problem. Policy controls and an audit trail answer that before it ever happens.',
    protects: 'Every agent acts only within your rules, and every action is logged, so you stay in control as AI scales.',
  },
];

// Light, editorial treatment: a clean numbered list with rule lines,
// closer to a spec document than a card grid. Deliberately different
// from CapabilitiesIntro's asymmetric ghost-watermark layout and
// StatsBar's numeric treatment — each light section earns its own
// language rather than repeating a formula.
export const WhyDecentralized = () => {
  return (
    <section id="why-decentralized" className="relative bg-[#FFFFFF] py-[50px] lg:py-[100px]">
      <div className="wrap">
        <RevealOnScroll>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="tag-mono !text-[#B24300] mb-4 inline-block">
            WHY DECENTRALIZED AI
          </span>
          <h2 className="text-[#16003B] font-bold text-3xl md:text-4xl leading-tight mb-5">
            Your systems already do the work. They can&apos;t yet prove it, or
            protect you.
          </h2>
          <p className="text-[#434343] text-[20px] font-normal leading-relaxed">
            You do not move off what you run. You add a layer on top of it. Here is
            the honest reason that layer matters, and how it protects you.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="max-w-5xl mx-auto border-t border-[#16003B]/15">
          {points.map((point) => (
            <div
              key={point.number}
              className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-10 py-8 border-b border-[#16003B]/15"
            >
              <span className="text-[#B24300] font-bold text-2xl">
                {point.number}
              </span>
              <div>
                <h4 className="text-[#16003B] font-bold text-lg mb-2">
                  {point.title}
                </h4>
                <p className="text-[#434343] text-sm leading-relaxed mb-3">
                  {point.description}
                </p>
                <p className="text-sm leading-relaxed text-[#434343]">
                  <span className="text-[#16003B] font-bold">How it protects you:</span>{' '}
                  {point.protects}
                </p>
              </div>
            </div>
          ))}
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={250}>
        <div className="max-w-4xl mx-auto text-center mt-14 border border-[#16003B]/20 rounded-card p-8">
          <span className="tag-mono !text-[#B24300]">THE HONEST PART</span>
          <p className="text-[#434343] text-sm leading-relaxed mt-4 mb-6">
            You do not need to rip out a thing. Your systems keep running the work
            exactly as they do now. We add the layer that makes it provable, keeps
            your data and AI out of one vendor&apos;s hands, and gives you the audit
            trail regulators are starting to demand. Your systems run the work. We
            make it trustworthy.
          </p>
          <Link href="/contact" className="btn btn--primary">
            Talk through your setup →
          </Link>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
