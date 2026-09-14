import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW — compact homepage-sized representation of /traceability. Real
// copy from Traceability's own hero and industries data, condensed to
// a single section — the industry grid here is a static list (no
// click-to-see-journey interaction), since the full interactive
// verified-journey viewer (with its real step/hash-anchor data) is
// what the dedicated page is for.
const industries = [
  'Airlines & aviation', 'Air taxis & eVTOL', 'Supply chain', 'Pharma',
  'Food', 'Hospitals & clinics', 'Luxury goods', 'Capital projects',
];

export const TraceabilityPreview = () => {
  return (
    <section className="section relative overflow-hidden" style={{ background: '#16003B' }}>
      <div className="wrap">
        <RevealOnScroll>
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div>
              <span className="eyebrow-plain">VERIFIABLE TRACEABILITY</span>
              <h2 className="sec-title !text-left">Prove where anything came from.</h2>
              <p className="text-ink_text-secondary text-[20px] font-normal leading-relaxed mt-5 mb-6 max-w-sm">
                A tamper-proof record for high-stakes industries, from airlines and air
                taxis to the goods on your shelf. Every part, batch, and hand-off,
                photographed, verified, and anchored so it cannot be faked.
              </p>
              <Link href="/traceability" className="btn btn--primary">
                Explore traceability →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((ind) => (
                <div key={ind} className="card !p-4">
                  <span className="text-white text-sm font-semibold">{ind}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
