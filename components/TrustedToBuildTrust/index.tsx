import React from 'react';

const clients = [
  { status: 'DELIVERED', name: 'Aetna Health', tags: 'BLOCKCHAIN TRUST LAYER · DECENTRALIZED AI', description: 'Delivered a verifiable trust layer and decentralized AI for enterprise healthcare workflows, anchoring data integrity and auditable AI decisions.', delivered: true },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'DFO Retail Group', region: 'Canada', tags: 'SUPPLY-CHAIN PROVENANCE · VERIFIABLE AI', description: 'Building a farm-to-shelf integrity prototype: photo-verified hand-offs, AI exception checks, and tamper-proof records across the retail supply chain.', delivered: false },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'Oando', region: 'Oil & gas, Africa', tags: 'ASSET TRACEABILITY · DECENTRALIZED AI', description: 'Building a traceability prototype for energy operations: verifiable asset and volume records with auditable, on-chain provenance.', delivered: false },
  { status: 'PROTOTYPE IN DEVELOPMENT', name: 'Western Beef Supermarket', region: 'United States', tags: 'SUPPLY-CHAIN PROVENANCE · VERIFIABLE AI', description: 'Building a fresh-supply-chain prototype: cold-chain verification, photo-proofed hand-offs, and tamper-proof records from supplier to shelf.', delivered: false },
];

export const TrustedToBuildTrust = () => {
  return (
    <section className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute top-16 left-8 w-5 h-5 rounded-sm hidden lg:block bg-accent/70"
      />
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow">PROVEN IN PRODUCTION</span>
          <h2 className="sec-title">Trusted to build trust.</h2>
          <p className="sec-sub sec-sub--center">
            From healthcare to retail to energy, we build blockchain trust layers and
            decentralized AI where verifiability and data integrity are not optional.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {clients.map((c) => (
            <div key={c.name} className={`card ${c.delivered ? 'card--highlight' : ''}`}>
              <span
                className={`tag-mono !text-[10px] px-3 py-1.5 rounded-pill border inline-block ${
                  c.delivered
                    ? 'text-[#180F39] bg-[#FF6000] border-[#FF6000] font-bold'
                    : 'text-ink_text-muted border-ink-border'
                }`}
              >
                {c.status}
              </span>
              <h4 className="text-white font-bold mt-4">{c.name}</h4>
              {c.region && <p className="text-ink_text-muted text-xs mb-3">{c.region}</p>}
              <p className="tag-mono !text-[10px] leading-snug mb-4">{c.tags}</p>
              <p className="text-ink_text-secondary text-xs leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>

        <p className="tag-mono mt-10 text-center">
          Aetna engagement delivered. DFO Retail, Oando, and Western Beef prototypes
          shown with permission.
        </p>
      </div>
    </section>
  );
};
