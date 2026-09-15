import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// REBALANCED this round: EXPLORE had grown to 9 items across several
// rounds of adding new pages, while the other columns stayed at 4-5 —
// a visibly lopsided footer. Split into 4 more evenly-weighted columns
// (5/5/4/4) instead of 3 uneven ones, closer to the old site's own
// footer structure (which runs 4 link columns + Contact, not 2).
const columns = [
  {
    title: 'EXPLORE',
    links: [
      { name: 'The Layer', href: '/layer' },
      { name: 'Services', href: '/services' },
      { name: 'How we work', href: '/how-it-works' },
      { name: 'Live demo', href: '/lab' },
      { name: 'Business models', href: '/services#six-ways' },
    ],
  },
  {
    title: 'MANAGED SERVICES',
    links: [
      { name: 'EDI/API Managed Services', href: '/services/edi-api-managed-services' },
      { name: 'ERP Managed Services', href: '/services/erp-managed-services' },
      { name: 'FACET Configurations', href: '/services/facet-configurations' },
      { name: 'Project controls & EVM', href: '/project-controls' },
      { name: 'Training', href: '/training' },
    ],
  },
  {
    title: 'SEE IT',
    links: [
      { name: 'How it works', href: '/how-it-works' },
      { name: 'Traceability', href: '/traceability' },
      { name: 'Clients', href: '/clients' },
      { name: 'Insights', href: '/insights' },
    ],
  },
  {
    title: 'INDUSTRIES & RESOURCES',
    links: [
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'Transportation & Logistics', href: '/industries/transportation' },
      { name: 'White Papers', href: '/white-papers' },
      { name: 'Case Studies', href: '/clients' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="section--page border-t border-ink-border">
      <div className="wrap">
        {/* Closing CTA gets its own generous card, clearly separated from
            the link grid below rather than crowding straight into it.
            Scattered accent squares in the corners echo the old site's
            "Start Your New Experience" section — a recurring geometric
            motif, not a one-off.

            LAYOUT FIX: this was previously a 2-column grid (text left,
            buttons right, side by side). Checked against a direct crop
            of Sample.pdf and that's wrong — the reference is a single
            centered column: heading, then paragraph below it, then both
            buttons side by side on their own row underneath, everything
            horizontally centered within the card. Rebuilt to match. */}
        {/* SIMPLIFIED AGAIN per direct feedback — even the quiet
            gradient card wasn't landing as clean/professional enough.
            Removed the card treatment entirely: no background box, no
            gradient, no border, no scattered accents. Just centered
            content directly on the footer's own background, separated
            from the link grid below by generous whitespace and a
            single thin rule. This is close to as minimal as a closing
            CTA can be while still reading as its own section. */}
        {/* PADDING FIX (direct feedback): top padding was noticeably
            larger than bottom (112/144px vs 80/96px) — balanced to
            match. */}
        <div className="text-center py-20 md:py-24 border-b border-ink-border">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 max-w-xl mx-auto leading-tight">
            Let&apos;s wire your first verifiable workflow.
          </h3>
          <p className="text-ink_text-secondary text-base leading-relaxed max-w-lg mx-auto mb-10">
            Bring one system, one decision you need to trust, and one process you
            want a machine to run. We will scope the integration and the proof in a
            single working session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:info@echolinksolutions.com" className="btn btn--primary">
              info@echolinksolutions.com →
            </a>
            <Link href="/services" className="btn btn--ghost">
              See what we deliver
            </Link>
          </div>
        </div>

        {/* 340px brand column + flexible link columns — same asymmetric
            pattern used across the homepage sections, so the footer
            doesn't suddenly revert to a different, more generic layout
            logic than everything above it. */}
        {/* PADDING FIX (direct feedback): the border-b above closed the
            CTA off cleanly, but the columns grid immediately below it
            had no top spacing of its own at all — the rule sat right on
            top of "SERVICES"/"SOLUTIONS"/etc. with nothing separating
            them. Added real top margin here rather than more bottom
            padding above the border, so the border reads as a rule with
            space on both sides, not a line glued to the content below
            it. */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 mt-16 md:mt-20">
          <div>
            <span className="w-16 h-16 relative flex-shrink-0 block">
              <Image
                src="/logo-mark-transparent.png"
                alt="Echolink Solutions"
                fill
                sizes="64px"
                className="object-contain"
              />
            </span>
            <p className="text-base font-bold text-white mt-4">Echolink Solutions</p>
            <p className="tag-mono mt-1">VERIFIABLE INTEGRATION LAYER</p>
            <p className="text-ink_text-secondary text-base mt-4 max-w-xs leading-relaxed">
              The connective trust layer for enterprise systems, decentralized AI,
              agents, and robotics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                {/* TYPOGRAPHY FIX — exact values from the live site
                    (blueprint): column heading Syne/15px/900/white;
                    link text Syne/14px/400. */}
                <p
                  className="mb-5"
                  style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 900, color: '#FFFFFF' }}
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="hover:text-accent-light transition-colors"
                        style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '14px', fontWeight: 400, color: '#FFFFFF' }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="tag-mono mb-5">CONTACT</p>
              <p className="text-base text-ink_text-secondary">
                <Link href="/contact" className="hover:text-white">
                  Contact form →
                </Link>
              </p>
              <p className="text-base text-ink_text-secondary mt-3">
                info@echolinksolutions.com
              </p>
              <p className="text-base text-ink_text-secondary mt-3">
                Anderson, South Carolina
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-20 pt-8 border-t border-ink-border">
          <p className="text-xs text-ink_text-muted">
            © {new Date().getFullYear()} Echolink Solutions, LLC. Where AI, automation,
            and blockchain work as one.
          </p>
          <div className="flex gap-6 text-xs text-ink_text-secondary">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">X</a>
            <a href="#" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
