import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW (direct request): the homepage should give "a complete overview
// of everything going on on the website," without becoming
// overpopulated by re-rendering full sections that already live on
// their own dedicated pages — several of which (Training,
// TrustedToBuildTrust) were deliberately de-duplicated OFF the
// homepage in an earlier round for exactly that overpopulation
// reason. Reconciled by building a single compact hub instead of
// adding multiple full sections back: one card per major page, each
// using that page's own real H1 and a one-sentence trim of its own
// real intro copy (not invented summaries), linking out to the full
// page. Gives a genuine map of the whole site in one scannable grid
// rather than a wall of re-duplicated content.
//
// Scoped to the 8 primary destinations (matches the main nav plus
// Training/Clients, which are one level down in the footer) rather
// than every sub-page (EDI/API, ERP, FACET, Healthcare,
// Transportation, White Papers) — going a level deeper than that
// would be the overpopulation the request specifically warned against.
const destinations = [
  {
    label: 'THE PRODUCT',
    title: 'One layer. Five jobs. Verifiable end to end.',
    description: 'The core layer that wires your systems, AI, and blockchain trust together.',
    href: '/layer',
  },
  {
    label: 'WHAT WE OFFER',
    title: 'Core services. Decentralized AI leads.',
    description: 'Every service we deliver, from enterprise integration to the blockchain trust layer.',
    href: '/services',
  },
  {
    label: 'THE PROCESS',
    title: 'Three steps. Diagnose, develop, deploy.',
    description: 'Exactly how an engagement runs, start to finish, every time.',
    href: '/how-it-works',
  },
  {
    label: 'PROJECT CONTROLS',
    title: 'Know where the project really stands.',
    description: 'Schedules, earned value, and cost data you can defend, not guess at.',
    href: '/project-controls',
  },
  {
    label: 'TRACEABILITY',
    title: 'Prove where anything came from.',
    description: 'A tamper-proof record for high-stakes industries, from airlines to your shelf.',
    href: '/traceability',
  },
  {
    label: 'TRAINING',
    title: 'The tech is only half the job.',
    description: 'Hands-on training built around your actual systems, not generic slides.',
    href: '/training',
  },
  {
    label: 'ECHOLINK LABS',
    title: 'Get in the lab and try it yourself.',
    description: 'Six hands-on simulations, open to members, no production system at risk.',
    href: '/lab',
  },
  {
    label: 'CLIENTS',
    title: 'Trusted to build trust.',
    description: 'Who we have built verifiable systems for, and what we delivered.',
    href: '/clients',
  },
];

export const SiteOverview = () => {
  return (
    <section className="section--light">
      <div className="wrap">
        <RevealOnScroll>
          <div className="sec-header max-w-2xl mx-auto text-center">
            <span className="eyebrow-plain">EXPLORE</span>
            <h2 className="sec-title" style={{ color: '#16003B' }}>
              One layer. Every piece of it.
            </h2>
            <p className="sec-sub sec-sub--center" style={{ color: '#434343' }}>
              A quick map of everything Echolink does, so you know exactly where to
              look next.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="border rounded-none p-6 flex flex-col transition-all hover:-translate-y-0.5 hover:border-accent"
                style={{ borderColor: '#E5E5E5' }}
              >
                <span className="tag-mono tag-mono--accent mb-3">{d.label}</span>
                <h3 className="font-bold text-base leading-snug mb-2" style={{ color: '#16003B' }}>
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#434343' }}>
                  {d.description}
                </p>
                <span className="text-sm font-semibold" style={{ color: '#FF6100' }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
