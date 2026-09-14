import React, { useState, ReactNode, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Footer } from '../Footer';
import { useAuth } from '@/context/AuthContext';
import { SITE_URL } from '@/lib/site';

// Simple (non-mega-menu) top-level items
// "Lab" added (direct request) — positioned right before "How it
// works", matching the reference site's own nav order exactly
// (Services dropdown -> Lab -> How it works -> Traceability ->
// Insights).
const navigation = [
  { name: 'The Layer', href: '/layer' },
  { name: 'Lab', href: '/lab' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Project Control', href: '/project-controls' },
  { name: 'Traceability', href: '/traceability' },
  { name: 'Insights', href: '/insights' },
];

// Services mega-menu — 5 columns, per the sitemap direction doc.
// "About Services" replaces the old "More" label.
// UX FIX: each column's TITLE is now the clickable link to that
// category's own page (clicking "Core Services" -> /services, etc.).
// The items listed under each title are a hover PREVIEW only, not
// individually clickable links, per direction: "the sub categories
// should not be clickable, they are just there to give a clue of what
// that category page looks like." `items` is now a plain string list
// instead of {name, href} pairs, since no per-item destination is
// needed anymore.
const servicesColumns = [
  {
    title: 'CORE SERVICES',
    href: '/services',
    items: [
      'Decentralized AI',
      'Enterprise integration',
      'Automation & robotics',
      'Blockchain trust layer',
      'Project scheduling & controls',
      'Verifiable traceability',
      'Training & enablement',
    ],
  },
  {
    title: 'AI AGENTS',
    href: '/layer#agent-grid',
    items: [
      'Finance',
      'Sales',
      'Customer service',
      'IT',
      'Legal',
      'Marketing',
      'Healthcare',
      'Hospitals & clinics',
      'Supply chain',
      'HR',
    ],
  },
  {
    title: 'PROJECT CONTROLS',
    href: '/project-controls',
    items: [
      'Schedule development',
      'Primavera P6 & CPM',
      'Baselines & change control',
      'Earned value management',
      'Cost & variance analysis',
      'Power BI reporting',
      'Verifiable project records',
    ],
  },
  {
    title: 'TRACEABILITY',
    href: '/traceability',
    items: [
      'Airlines & aviation',
      'Air taxis & eVTOL',
      'Supply chain',
      'Pharma',
      'Food',
      'Hospitals & clinics',
      'Luxury goods',
    ],
  },
  {
    title: 'ABOUT SERVICES',
    href: '/layer',
    items: [
      'How we work',
      'Why decentralized AI',
      'Who we serve',
      'Solutions we handle',
      'Business models',
      'How it works',
      'See it work',
    ],
  },
];

// Solid filled triangle, replacing Heroicons' ChevronDownIcon for
// dropdown indicators. Per the edit doc (item 2): "Make sure the
// dropdown triangles next to the tabs are thick and filled in just
// like the original website" — Heroicons' chevron (even the /solid
// variant) is a curved arrow shape, not a true filled triangle, so a
// custom SVG matches the reference more precisely than swapping icon
// sets would.
const FilledTriangle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 12 8" className={className} aria-hidden="true">
    <path d="M0 0 L12 0 L6 8 Z" fill="currentColor" />
  </svg>
);

// Wraps a nav label in an SVG rectangle that "draws itself" on hover —
// pathLength={1} lets the CSS stroke-dasharray/dashoffset math in
// globals.css (.nav-draw) work the same regardless of each label's
// actual width, no manual measurement needed per item.
const NavDraw = ({ children }: { children: React.ReactNode }) => (
  <span className="nav-draw">
    {children}
    <svg aria-hidden="true">
      <rect x="0" y="0" width="100%" height="100%" rx="0" pathLength={1} />
    </svg>
  </span>
);

// Shared link styling for the white header. Text color stays constant
// on hover per direction ("the color should remain same") — the
// nav-draw rectangle is now the only hover feedback, not a color
// change too.
// TYPOGRAPHY FIX — exact values from the live site's own nav-link CSS
// (blueprint): Syne, 17px, 400 weight — was Tailwind's text-sm (14px)
// font-medium (500), an approximation rather than a match.
const navLinkClass = 'transition-colors text-[#16003B]';
const navLinkStyle = { fontFamily: 'var(--font-syne), sans-serif', fontSize: '17px', fontWeight: 400 };

const ServicesMegaMenu = () => {
  // Which category's sub-items are currently previewed. Defaults to
  // the first category so the panel isn't empty the instant it opens,
  // before the user has hovered anything.
  const [hovered, setHovered] = useState(0);
  // Separate from `hovered` above on purpose: `hovered` defaults to 0
  // so the preview panel has content immediately, but that would make
  // "CORE SERVICES" incorrectly show as orange even before a real
  // hover if used for color too. Tracks whether the mouse has actually
  // entered a category yet, independent of which one is defaulted.
  const [hasHovered, setHasHovered] = useState(false);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {/* SPLIT TRIGGER (direct correction): "I wanted to be able to
              access the services page from the Navbar without there
              being the addition of a new nav link" — removed the "All
              Services" nav item from last round and solved it properly
              instead: "Services" itself is now a real Link straight to
              /services, with just the small arrow as its own separate
              Popover.Button controlling the dropdown open/close. Both
              sit in one flex group so they still read as a single nav
              item visually, but clicking the word navigates and
              clicking the arrow toggles the panel — no new top-level
              link added. */}
          <span className={`flex items-center gap-1 ${navLinkClass}`} style={navLinkStyle}>
            <Link href="/services">
              <NavDraw>Services</NavDraw>
            </Link>
            <Popover.Button className="outline-none flex items-center" aria-label="Toggle services menu">
              <FilledTriangle
                className={`w-2.5 h-2 transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </Popover.Button>
          </span>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            {/* Reverted to the old behavior per direction: categories
                listed vertically (clickable, not a 3-column grid of
                everything at once), and hovering one reveals its
                sub-items in a preview panel alongside it. Sub-items
                stay non-clickable, same as before. */}
            <Popover.Panel className="fixed left-0 right-0 mt-4 z-50">
              <div style={{ background: '#16003B' }} className="border-t border-white/10 shadow-2xl">
                <div className="wrap py-28 md:py-32">
                  <div className="grid lg:grid-cols-[240px_260px_1fr] gap-12">
                    <div>
                      <h3 className="text-white font-bold text-3xl leading-[1.15]">
                        Services &amp; Solutions
                      </h3>
                    </div>

                    <ul className="flex flex-col gap-1" onMouseLeave={() => setHovered(0)}>
                      {servicesColumns.map((col, i) => (
                        <li key={col.title} onMouseEnter={() => { setHovered(i); setHasHovered(true); }}>
                          <Link
                            href={col.href}
                            className="block text-xs tracking-tag uppercase py-3 border-l-2 pl-4 transition-colors font-bold"
                            style={{
                              // COLOR FIX (direct instruction): category
                              // labels default to white now, orange only
                              // on real hover — previously always orange
                              // regardless of hover state. Uses
                              // `hasHovered` rather than `hovered ===
                              // i`, since `hovered` defaults to 0 for
                              // the preview panel's sake, which would
                              // otherwise make the first category look
                              // "hovered" (orange) before any real mouse
                              // interaction.
                              color: hasHovered && hovered === i ? 'var(--accent)' : '#FFFFFF',
                              borderColor: hasHovered && hovered === i ? 'var(--accent)' : 'transparent',
                            }}
                          >
                            {col.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Preview only — not clickable. Shows just the
                        hovered category's items, matching the old
                        site's flyout behavior instead of showing every
                        category's items at once. */}
                    <ul className="flex flex-col gap-3">
                      {servicesColumns[hovered].items.map((item) => (
                        <li key={item} className="text-sm text-white/60">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Canonical URL, set once here for every page instead of
          repeated per-page — found missing entirely during a craft
          sweep. Strips any query string, since query params (utm
          tracking, etc.) shouldn't create a distinct canonical
          destination from the clean page URL. */}
      <Head>
        <link rel="canonical" href={`${SITE_URL}${router.asPath.split('?')[0]}`} />
      </Head>

      {/* White header, matching the old site. Always solid (not
          transparent-until-scroll) — that was the exact source of the
          logo/button invisibility bug fixed earlier, and a white bar is
          also simply how the old site's nav actually looked at rest,
          not just after scrolling. Shadow deepens slightly on scroll
          for depth, background stays constant. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* Reuses the exact .wrap class from every content section below
            it, rather than an approximated custom padding — guarantees
            the logo and last button align pixel-for-pixel with where
            content actually starts/ends on every other section, per
            direct feedback that the previous custom padding didn't
            truly match. */}
        <nav className="wrap flex items-center justify-between py-4 md:py-6" aria-label="Global">
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* Logo swap: was a separate mark icon + "ECHOLINK / SOLUTIONS"
                text stacked beside it. Per the edit doc, the homepage
                logo should be the single horizontal navy logo image,
                not a mark-plus-text reconstruction. Sized up twice more
                per direct feedback (Round 31, then again this round). */}
            <span className="relative h-11 w-[231px]">
              <Image
                src="/logo-horizontal-navy.png"
                alt="Echolink Solutions"
                fill
                sizes="420px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            <Link href="/layer" className={navLinkClass} style={navLinkStyle}>
              <NavDraw>The Layer</NavDraw>
            </Link>
            <ServicesMegaMenu />
            {navigation.slice(1).map((item) => (
              <Link key={item.name} href={item.href} className={navLinkClass} style={navLinkStyle}>
                <NavDraw>{item.name}</NavDraw>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/how-it-works" className="btn btn--ghost-accent !py-3">
              See it work
            </Link>
            {!loading && user ? (
              <Link href="/account" className="btn btn--ghost-accent !py-3">
                My account
              </Link>
            ) : (
              <Link href="/contact" className="btn btn--ghost-accent !py-3">
                Contact us
              </Link>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5"
            style={{ color: '#16003B' }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50 bg-white" />
          <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-white px-8 py-8">
            <div className="flex items-center justify-between">
              <span className="relative h-11 w-[231px]">
                <Image
                  src="/logo-horizontal-navy.png"
                  alt="Echolink Solutions"
                  fill
                  sizes="231px"
                  className="object-contain object-left"
                />
              </span>
              <button
                type="button"
                className="-m-2.5 p-2.5"
                style={{ color: '#16003B' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-14 flex flex-col gap-6">
              <Link
                href="/layer"
                className="text-lg"
                style={{ ...navLinkStyle, color: '#16003B', fontSize: '17px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                The Layer
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-lg"
                  style={{ color: '#16003B' }}
                >
                  Services
                  <FilledTriangle
                    className={`w-3 h-2.5 transition-transform ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-4 pl-4 flex flex-col gap-5">
                    {servicesColumns.map((col) => (
                      <div key={col.title}>
                        <Link
                          href={col.href}
                          className="text-xs tracking-tag uppercase mb-2 inline-block"
                          style={{ color: '#B24300' }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {col.title}
                        </Link>
                        {/* Preview only — not clickable, same as desktop. */}
                        <ul className="flex flex-col gap-2">
                          {col.items.map((item) => (
                            <li key={item} className="text-sm" style={{ color: '#8A8A8A' }}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg"
                  style={{ ...navLinkStyle, color: '#16003B', fontSize: '17px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!loading && user ? (
                <Link
                  href="/account"
                  className="btn btn--primary w-fit mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My account
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="btn btn--primary w-fit mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact us
                </Link>
              )}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
};
