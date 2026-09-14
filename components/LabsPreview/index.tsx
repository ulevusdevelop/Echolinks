import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW — compact homepage-sized representation of /lab. Real lab
// titles from the Labs page's own data, condensed to a single section
// with no interactivity (the real "Get your lab pass" gate and per-
// simulation modals live on the dedicated page).
const labTitles = [
  'Blockchain Foundations',
  'The Missing Orders',
  'Schedule Recovery',
  'Trace the Batch',
  'Agent Under Policy',
];

export const LabsPreview = () => {
  return (
    <section className="section--light">
      <div className="wrap">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow-plain--dark">ECHOLINK LABS</span>
            <h2 className="sec-title" style={{ color: '#16003B' }}>
              Get in the lab and try it yourself.
            </h2>
            <p className="text-[20px] font-normal leading-relaxed mt-5 mb-8" style={{ color: '#434343' }}>
              Pick a simulation and work a real scenario in a safe environment. Nothing
              to install, nothing you can break.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {labTitles.map((title) => (
              <span
                key={title}
                className="text-sm px-4 py-2 rounded-none border"
                style={{ color: '#16003B', borderColor: '#E5E5E5', background: '#F7F7F9' }}
              >
                {title}
              </span>
            ))}
          </div>
          <div className="text-center">
            <Link href="/lab" className="btn btn--primary">
              Enter the lab →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
