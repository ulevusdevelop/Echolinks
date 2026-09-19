import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const clients = [
  { status: 'DELIVERED', name: 'Aetna Health', tags: 'BLOCKCHAIN TRUST LAYER · DECENTRALIZED AI', description: 'Delivered a verifiable trust layer and decentralized AI for enterprise healthcare workflows, anchoring data integrity and auditable AI decisions.', delivered: true },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'DFO Retail Group', region: 'Canada', tags: 'SUPPLY-CHAIN PROVENANCE · VERIFIABLE AI', description: 'Building a farm-to-shelf provenance prototype: photo-verified hand-offs, AI exception checks, and tamper-proof records across the retail supply chain.', delivered: false },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'Oando', region: 'Oil & Gas · Africa', tags: 'ASSET TRACEABILITY · DECENTRALIZED AI', description: 'Building a traceability and integrity prototype for energy operations: verifiable asset and volume records with auditable, on-chain provenance.', delivered: false },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'Western Beef Supermarket', region: 'United States', tags: 'SUPPLY-CHAIN PROVENANCE · VERIFIABLE AI', description: 'Building a fresh-supply-chain prototype: cold-chain verification, photo-proofed hand-offs, and tamper-proof records from supplier to shelf.', delivered: false },
];

// CONSISTENCY FIX (homepage rhythm pass): flipped from dark to a light
// section — see StatsBar's comment for the full reasoning. This one
// plus StatsBar break the previous four-dark / three-light runs into
// pairs of two, without touching the two larger, more deeply-styled
// dark components (Training, Insights) that sit between them.
// `headingLevel` fixes a real heading-hierarchy gap found during a
// sitewide h1 audit: used on the homepage (needs h2, subordinate to
// Hero's h1) and standalone on /clients (needs h1, nothing else on
// that page provides one). Defaults to 'h2' (the homepage context);
// /clients passes 'h1' explicitly.
export const TrustedToBuildTrust = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const Heading = headingLevel;
  return (
    <section className="relative bg-white py-[50px] lg:py-[100px] overflow-hidden">
      {/* SCALE FIX: same issue as Hero and Industries had before this
          round — a single small (20px) square read as a stray mark
          rather than the site's scattered-square motif. Rescaled to
          match, using the layered two-square composition established
          elsewhere; the second square is purple-outlined rather than
          white since this section's background is white, not dark. */}
      <span aria-hidden="true" className="absolute top-10 left-8 hidden lg:block">
        <span className="absolute top-0 left-0 w-10 h-10" style={{ background: '#FF6100' }} />
        <span className="absolute -top-3 left-12 w-5 h-5 bg-white" style={{ border: '2px solid #16003B' }} />
      </span>
      <div className="wrap">
        <RevealOnScroll>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="eyebrow-plain--dark">PROVEN IN PRODUCTION</span>
          <Heading className="font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#16003B' }}>
            Trusted to build trust.
          </Heading>
          <p className="text-[#434343] text-[20px] font-normal leading-relaxed mt-5 max-w-lg mx-auto">
            From healthcare to retail to energy, we build blockchain trust layers and
            decentralized AI where verifiability and data integrity are not optional.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-4 gap-6">
          {clients.map((c) => (
            <div
              key={c.name}
              className="rounded-card p-6 border"
              style={
                c.delivered
                  ? { background: '#16003B', borderColor: '#16003B' }
                  : { background: '#FFFFFF', borderColor: '#E5E5E5' }
              }
            >
              <span
                className="text-[10px] tracking-tag uppercase px-3 py-1.5 rounded-none border inline-block"
                style={
                  c.delivered
                    ? { color: '#FFFFFF', background: '#FF6100', borderColor: '#FF6100', fontWeight: 700 }
                    : { color: '#707070', borderColor: '#E5E5E5' }
                }
              >
                {c.status}
              </span>
              <h4 className="font-bold mt-4" style={{ color: c.delivered ? '#FFFFFF' : '#16003B' }}>
                {c.name}
              </h4>
              {c.region && (
                <p className="text-xs mb-3" style={{ color: c.delivered ? 'rgba(255,255,255,0.6)' : '#707070' }}>
                  {c.region}
                </p>
              )}
              <p
                className="text-[10px] tracking-tag uppercase leading-snug mb-4"
                style={{ color: c.delivered ? 'rgba(255,255,255,0.5)' : '#707070' }}
              >
                {c.tags}
              </p>
              <p className="text-base leading-relaxed" style={{ color: c.delivered ? 'rgba(255,255,255,0.85)' : '#434343' }}>
                {c.description}
              </p>
            </div>
          ))}
        </div>
        </RevealOnScroll>

        {/* CLIENT QA FIX ("I need the text all on one line"): this had
            no explicit max-w-* class, so the sitewide `p { max-width:
            68ch; }` line-length fallback (styles/globals.css) clipped
            it to a box narrower than the sentence itself, forcing an
            unwanted wrap right in the middle of it. Added `max-w-none`
            to opt out of that fallback and `whitespace-nowrap` to
            guarantee one line, same pattern already used for the Lab
            page's own single-line caption. */}
        <p className="text-center mt-10 text-base max-w-none whitespace-nowrap" style={{ color: '#707070' }}>
          Aetna engagement delivered. DFO Retail, Oando, and Western Beef prototypes
          shown with permission.
        </p>
      </div>
    </section>
  );
};
