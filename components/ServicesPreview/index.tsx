import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW — compact homepage-sized representation of /services (direct
// request: real content on the homepage for every major area, not a
// link card). This is NOT the full CoreServices component (which is a
// 2-section, hero-plus-icon-grid page-level component) — it's a
// purpose-built condensed version: real copy pulled straight from
// CoreServices' own data (not invented), reduced to the 6 service
// titles as a scannable row instead of the full icon-grid-with-
// descriptions treatment, with a link to the full page for the rest.
const services = [
  'Enterprise integration',
  'Project scheduling, controls & EVM',
  'Automation & robotics',
  'Blockchain trust layer',
  'Verifiable traceability',
  'Training & enablement',
];

export const ServicesPreview = () => {
  return (
    <section className="section--light">
      <div className="wrap">
        <RevealOnScroll>
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
            <div>
              <span className="eyebrow-plain--dark">WHAT WE DO</span>
              <h2 className="sec-title" style={{ color: '#16003B' }}>
                Core services. Decentralized AI leads.
              </h2>
              <p className="text-[20px] font-normal leading-relaxed mt-5 mb-6" style={{ color: '#434343' }}>
                Each service stands on its own and gets stronger wired to the others.
                Start with one. Most clients start with decentralized AI.
              </p>
              <Link href="/services" className="btn btn--primary">
                See all services →
              </Link>
            </div>
            <div className="flex flex-col">
              {services.map((s, i) => (
                <div
                  key={s}
                  className={`py-4 ${i < services.length - 1 ? 'border-b' : ''}`}
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <span className="font-semibold text-sm" style={{ color: '#16003B' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
