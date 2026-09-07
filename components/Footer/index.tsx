import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const columns = [
  {
    title: 'EXPLORE',
    links: [
      { name: 'The Layer', href: '/layer' },
      { name: 'Services', href: '/services' },
      { name: 'How we work', href: '/how-it-works' },
      { name: 'Project controls & EVM', href: '/project-controls' },
      { name: 'Training', href: '/training' },
      { name: 'Business models', href: '/services' },
    ],
  },
  {
    title: 'SEE IT',
    links: [
      { name: 'How it works', href: '/how-it-works' },
      { name: 'Live demo', href: '/lab' },
      { name: 'Traceability', href: '/traceability' },
      { name: 'Clients', href: '/clients' },
      { name: 'Insights', href: '/insights' },
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
        <div className="card mb-24 relative overflow-hidden text-center bg-gradient-to-br from-ink-800 to-ink-900 py-14 px-8">
          <span className="absolute -top-3 -left-3 w-6 h-6 bg-accent rounded-sm" aria-hidden="true" />
          <span className="absolute top-8 left-10 w-3 h-3 rounded-sm hidden md:block bg-accent/60" aria-hidden="true" />
          <span className="absolute -bottom-3 right-24 w-5 h-5 bg-ink-600 border border-ink-border rounded-sm hidden md:block" aria-hidden="true" />

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-xl mx-auto">
            Let&apos;s wire your first verifiable workflow.
          </h3>
          <p className="text-ink_text-secondary text-sm leading-relaxed max-w-lg mx-auto mb-8">
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
        <div className="grid lg:grid-cols-[320px_1fr] gap-16">
          <div>
            <span className="w-9 h-9 relative flex-shrink-0 block">
              <Image
                src="/logo-mark-transparent.png"
                alt="Echolink Solutions"
                fill
                className="object-contain"
              />
            </span>
            <p className="text-sm font-bold text-white mt-4">Echolink Solutions</p>
            <p className="tag-mono mt-1">VERIFIABLE INTEGRATION LAYER</p>
            <p className="text-ink_text-secondary text-sm mt-4 max-w-xs leading-relaxed">
              The connective trust layer for enterprise systems, decentralized AI,
              agents, and robotics.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="tag-mono mb-5">{col.title}</p>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink_text-secondary hover:text-white transition-colors"
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
              <p className="text-sm text-ink_text-secondary">
                <Link href="/contact" className="hover:text-white">
                  Contact form →
                </Link>
              </p>
              <p className="text-sm text-ink_text-secondary mt-3">
                info@echolinksolutions.com
              </p>
              <p className="text-sm text-ink_text-secondary mt-3">
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
