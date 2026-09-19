import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EmailPopup } from '@/components/EmailPopup';
import { RevealOnScroll } from '@/components/RevealOnScroll';

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
      // MOVED here from MANAGED SERVICES (direct request): EXPLORE is
      // the footer's main site-navigation column (same role "Courses"
      // has in the header nav, right after "Lab") — a more findable
      // spot than being the 6th item at the bottom of a services list.
      { name: 'Courses', href: '/courses' },
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
  const [emailOpen, setEmailOpen] = useState(false);

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
        {/* TOP PADDING REMOVED (direct feedback): `py-20 md:py-24` set
            top and bottom to the same value (a single Tailwind
            declaration, confirmed against the compiled CSS). Split
            into `pt-0` + `pb-20 md:pb-24` so the top goes to zero while
            the bottom padding stays exactly as it was — the section
            right above this one already carries its own bottom
            padding, so this CTA no longer stacks a second full gap on
            top of that. */}
        {/* CENTERING FIX (client QA, Homepage #4): "push this up a
            little so it is centered in that box." This section's own
            pt was 0 (a prior fix that removed a double-gap with the
            page section above it), but the footer's outer
            `.section--page` padding (100px desktop / 50px mobile)
            still sits above this div, while only this div's own
            pb-20/24 sits below it before the rule — leaving the CTA
            content sitting slightly low in the space bounded by the
            top of the footer and the rule beneath it. A small negative
            top margin nudges the content up without touching
            `.section--page` itself (shared by every other section on
            the site) or reintroducing the stacked-gap issue from the
            section above. */}
        <div className="text-center pt-0 -mt-4 md:-mt-10 pb-20 md:pb-24 border-b border-ink-border">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 max-w-xl mx-auto leading-tight">
            Let&apos;s wire your first verifiable workflow.
          </h3>
          <p className="text-ink_text-secondary text-base leading-relaxed max-w-lg mx-auto mb-10">
            Bring one system, one decision you need to trust, and one process you
            want a machine to run. We will scope the integration and the proof in a
            single working session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* EMAIL POPUP FIX (client QA, Homepage #4): "is it possible
                to have an email box popup? I tried it, and it took me
                away from the website completely to send an email to
                Echolink." Was a plain `mailto:` link — swapped for a
                button that opens the in-page EmailPopup modal instead,
                which posts to the same /api/contact endpoint the full
                /contact page uses, so visitors never leave the site. */}
            <button
              type="button"
              onClick={() => setEmailOpen(true)}
              className="btn btn--primary"
            >
              info@echolinksolutions.com →
            </button>
            <Link href="/services" className="btn btn--ghost">
              See what we deliver
            </Link>
          </div>
        </div>

        <EmailPopup open={emailOpen} onClose={() => setEmailOpen(false)} />

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
        {/* FLOAT-IN FIX (client QA, Homepage #5): "Let this part float
            in when people scroll down to the footer" — wrapped the
            logo + link-columns row in the same RevealOnScroll wrapper
            used for the Hero and other "fly-in from the bottom"
            sections elsewhere on the site, rather than leaving the
            footer as the one section with no scroll motion at all. */}
        <RevealOnScroll>
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
                    (blueprint): column heading Syne/15px/800/white;
                    link text Syne/14px/400. (Was 900 — CLIENT QA FIX:
                    Syne has no real 900 weight, only up to 800/
                    ExtraBold is loaded, so 900 was being faux-bolded/
                    stretched by the browser. Corrected to 800.) */}
                <p
                  className="mb-5"
                  style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}
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
              {/* CLIENT QA FIX ("the CONTACT section header is not
                  being treated as all the others"): this used
                  `.tag-mono` (12px, muted gray, letter-spaced) while
                  every other column heading (EXPLORE, MANAGED
                  SERVICES, SEE IT, INDUSTRIES & RESOURCES, just
                  above) uses an explicit Syne/15px/800/white style —
                  matched it exactly instead of using a different
                  shared class for this one column alone. */}
              <p
                className="mb-5"
                style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}
              >
                CONTACT
              </p>
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
        </RevealOnScroll>

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
