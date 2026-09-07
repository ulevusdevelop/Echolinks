import React, { useState, ReactNode, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Footer } from '../Footer';
import { useAuth } from '@/context/AuthContext';

// Simple (non-mega-menu) top-level items
const navigation = [
  { name: 'The Layer', href: '/layer' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'Traceability', href: '/traceability' },
  { name: 'Insights', href: '/insights' },
];

// Services mega-menu — 5 columns, per the sitemap direction doc.
// "About Services" replaces the old "More" label.
const servicesColumns = [
  {
    title: 'CORE SERVICES',
    links: [
      { name: 'Decentralized AI', href: '/services' },
      { name: 'Enterprise integration', href: '/services' },
      { name: 'Automation & robotics', href: '/services' },
      { name: 'Blockchain trust layer', href: '/services' },
      { name: 'Project scheduling & controls', href: '/project-controls' },
      { name: 'Verifiable traceability', href: '/traceability' },
      { name: 'Training & enablement', href: '/training' },
    ],
  },
  {
    title: 'AI AGENTS',
    links: [
      { name: 'Finance', href: '/#agent-grid' },
      { name: 'Sales', href: '/#agent-grid' },
      { name: 'Customer service', href: '/#agent-grid' },
      { name: 'IT', href: '/#agent-grid' },
      { name: 'Legal', href: '/#agent-grid' },
      { name: 'Marketing', href: '/#agent-grid' },
      { name: 'Healthcare', href: '/#agent-grid' },
      { name: 'Hospitals & clinics', href: '/#agent-grid' },
      { name: 'Supply chain', href: '/#agent-grid' },
      { name: 'HR', href: '/#agent-grid' },
    ],
  },
  {
    title: 'PROJECT CONTROLS',
    links: [
      { name: 'Schedule development', href: '/project-controls' },
      { name: 'Primavera P6 & CPM', href: '/project-controls' },
      { name: 'Baselines & change control', href: '/project-controls' },
      { name: 'Earned value management', href: '/project-controls' },
      { name: 'Cost & variance analysis', href: '/project-controls' },
      { name: 'Power BI reporting', href: '/project-controls' },
      { name: 'Verifiable project records', href: '/project-controls' },
    ],
  },
  {
    title: 'TRACEABILITY',
    links: [
      { name: 'Airlines & aviation', href: '/traceability' },
      { name: 'Air taxis & eVTOL', href: '/traceability' },
      { name: 'Supply chain', href: '/traceability' },
      { name: 'Pharma', href: '/traceability' },
      { name: 'Food', href: '/traceability' },
      { name: 'Hospitals & clinics', href: '/traceability' },
      { name: 'Luxury goods', href: '/traceability' },
    ],
  },
  {
    title: 'ABOUT SERVICES',
    links: [
      { name: 'How we work', href: '/how-it-works' },
      { name: 'Why decentralized AI', href: '/#why-decentralized' },
      { name: 'Who we serve', href: '/#who-we-serve' },
      { name: 'Solutions we handle', href: '/services#everything-we-connect' },
      { name: 'Business models', href: '/services#six-ways' },
      { name: 'How it works', href: '/how-it-works' },
      { name: 'See it work', href: '/how-it-works' },
    ],
  },
];

// Wraps a nav label in an SVG rectangle that "draws itself" on hover —
// pathLength={1} lets the CSS stroke-dasharray/dashoffset math in
// globals.css (.nav-draw) work the same regardless of each label's
// actual width, no manual measurement needed per item.
const NavDraw = ({ children }: { children: React.ReactNode }) => (
  <span className="nav-draw">
    {children}
    <svg aria-hidden="true">
      <rect x="0" y="0" width="100%" height="100%" rx="6" pathLength={1} />
    </svg>
  </span>
);

// Shared link styling for the white header — dark navy default, shifts
// to the accessible orange on hover (#B24300, verified 4.5:1+ against
// white — plain #FF6000 fails contrast here, same issue fixed earlier
// across the light sections).
const navLinkClass =
  'text-sm text-[#180F39] hover:text-[#B24300] transition-colors';

const ServicesMegaMenu = () => {
  // Which category's sub-items are showing in the flyout. Defaults to
  // the first category so the panel isn't empty the instant it opens.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {/* Chevron now sits OUTSIDE NavDraw as a normal flex sibling,
              spaced by the button's own gap-1 — it was previously
              nested inside NavDraw's content, which put it under the
              same inline-flex/absolute-SVG wrapper as the label and
              caused it to render on top of the text instead of after
              it. */}
          <Popover.Button className={`flex items-center gap-1 outline-none ${navLinkClass}`}>
            <NavDraw>Services</NavDraw>
            <ChevronDownIcon
              className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 -translate-x-1/2 mt-4 z-50">
              {/* Two-level flyout: left column lists all 5 category
                  names stacked vertically; hovering one shows its
                  sub-items on the right. Replaces the old "5 columns
                  shown at once" layout per request. */}
              <div
                className="flex bg-white rounded-card shadow-2xl border overflow-hidden w-[620px] max-w-[90vw]"
                style={{ borderColor: 'rgba(24,15,57,0.1)' }}
              >
                <div
                  className="w-56 flex-shrink-0 border-r py-3"
                  style={{ borderColor: 'rgba(24,15,57,0.1)' }}
                >
                  {servicesColumns.map((col, i) => (
                    <button
                      key={col.title}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      className="w-full text-left font-mono text-xs tracking-tag uppercase px-5 py-3 transition-colors"
                      style={{
                        color: activeIndex === i ? '#B24300' : '#434343',
                        background: activeIndex === i ? 'rgba(255,96,0,0.06)' : 'transparent',
                      }}
                    >
                      {col.title}
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-6">
                  <p className="font-mono text-xs tracking-tag uppercase mb-4" style={{ color: '#B24300' }}>
                    {servicesColumns[activeIndex].title}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {servicesColumns[activeIndex].links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm transition-colors"
                          style={{ color: '#434343' }}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
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
        <nav className="wrap flex items-center justify-between py-6 md:py-7" aria-label="Global">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-9 h-9 relative flex-shrink-0">
              <Image
                src="/logo-mark-transparent.png"
                alt="Echolink Solutions"
                fill
                className="object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-wide" style={{ color: '#180F39' }}>
                ECHOLINK
              </span>
              <span className="block text-[10px] font-mono tracking-tag" style={{ color: '#665A7D' }}>
                SOLUTIONS
              </span>
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-x-10">
            <Link href="/layer" className={navLinkClass}>
              <NavDraw>The Layer</NavDraw>
            </Link>
            <ServicesMegaMenu />
            {navigation.slice(1).map((item) => (
              <Link key={item.name} href={item.href} className={navLinkClass}>
                <NavDraw>{item.name}</NavDraw>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/how-it-works" className="btn btn--ghost-accent">
              See it work
            </Link>
            {!loading && user ? (
              <Link href="/account" className="btn btn--ghost-accent">
                My account
              </Link>
            ) : (
              <Link href="/contact" className="btn btn--ghost-accent">
                Contact us
              </Link>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden -m-2.5 p-2.5"
            style={{ color: '#180F39' }}
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
              <span className="text-sm font-bold" style={{ color: '#180F39' }}>
                ECHOLINK SOLUTIONS
              </span>
              <button
                type="button"
                className="-m-2.5 p-2.5"
                style={{ color: '#180F39' }}
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
                style={{ color: '#180F39' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                The Layer
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex items-center justify-between w-full text-lg"
                  style={{ color: '#180F39' }}
                >
                  Services
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-4 pl-4 flex flex-col gap-5">
                    {servicesColumns.map((col) => (
                      <div key={col.title}>
                        <p className="font-mono text-xs tracking-tag uppercase mb-2" style={{ color: '#B24300' }}>
                          {col.title}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {col.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                className="text-sm"
                                style={{ color: '#434343' }}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link.name}
                              </Link>
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
                  style={{ color: '#180F39' }}
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
