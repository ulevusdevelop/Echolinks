import React, { useState } from 'react';

const industries = [
  { id: 'airlines', title: 'Airlines & aviation', description: 'Parts, maintenance, and flight records.', journey: 'A replacement part is photographed at the supplier, verified on receipt, logged at installation, and anchored to the aircraft maintenance record.' },
  { id: 'evtol', title: 'Air taxis & eVTOL', description: 'Battery integrity and fleet provenance.', journey: 'Battery cycles, charge history, and swap events are logged per unit, giving a verifiable safety record for every flight.' },
  { id: 'supply', title: 'Supply chain', description: 'Supplier-to-shelf, photo-verified.', journey: 'Every hand-off from supplier to warehouse to shelf is photographed and time-stamped.' },
  { id: 'pharma', title: 'Pharma', description: 'Cold chain and anti-counterfeit proof.', journey: 'Temperature logs and chain-of-custody checkpoints are anchored on-chain.' },
  { id: 'food', title: 'Food', description: 'Farm-to-shelf freshness and origin.', journey: 'Harvest date, handling conditions, and transport are recorded at each step.' },
  { id: 'hospitals', title: 'Hospitals & clinics', description: 'Medication, samples, and equipment provenance.', journey: 'Medication batches and equipment maintenance are logged with a tamper-proof trail.' },
  { id: 'luxury', title: 'Luxury goods', description: 'Authenticity and ownership history.', journey: 'Each item is anchored at creation, with ownership transfers logged.' },
  { id: 'capital', title: 'Capital projects', description: 'Progress claims, milestones, and payment.', journey: 'Milestone completion is photo-verified and tied to payment triggers.' },
];
const pillars = [
  { title: 'Part & batch traceability', description: 'Every item\u2019s origin, handling, and life recorded, tamper-proof, end to end.' },
  { title: 'Condition & integrity', description: 'Battery cycles, cold chain, freshness, whatever must stay within limits, verified.' },
  { title: 'Service & handling provenance', description: 'Who touched what, when, and whether the record has been altered since.' },
  { title: 'Decentralized AI checks', description: 'Agents that flag anomalies and exceptions, with every decision logged and verifiable.' },
  { title: 'Audit trails everyone trusts', description: 'One record operators, regulators, and insurers can all rely on, without trusting each other.' },
];

export const Traceability = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = industries.find((i) => i.id === activeId);

  return (
    <section className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute bottom-16 right-8 w-4 h-4 rounded-sm hidden lg:block bg-accent/70"
      />
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow">VERIFIABLE TRACEABILITY</span>
          <h2 className="sec-title">Prove where anything came from.</h2>
          <p className="sec-sub sec-sub--center">
            A tamper-proof record for high-stakes industries, from airlines and air
            taxis to the goods on your shelf. Every part, batch, and hand-off,
            photographed, verified, and anchored so it cannot be faked.
          </p>
          <p className="tag-mono tag-mono--accent mt-6">
            Click any industry to watch a live verified journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {industries.map((ind) => (
            <button
              key={ind.id}
              type="button"
              onClick={() => setActiveId(ind.id)}
              className={`card text-left transition-all hover:-translate-y-0.5 ${
                activeId === ind.id ? 'ring-2 ring-accent' : ''
              }`}
            >
              <h4 className="text-white font-bold text-sm mb-2">{ind.title}</h4>
              <p className="text-ink_text-secondary text-xs leading-relaxed">
                {ind.description}
              </p>
            </button>
          ))}
        </div>

        <div className="card mt-8 max-w-3xl">
          <span className="tag-mono tag-mono--accent">
            {active ? active.title.toUpperCase() : 'SELECT AN INDUSTRY'}
          </span>
          <h3 className="text-white font-bold text-xl mt-3 mb-3">
            {active ? 'Verified journey' : 'Watch provenance, live'}
          </h3>
          <p className="text-ink_text-secondary text-sm leading-relaxed">
            {active
              ? active.journey
              : 'Pick any industry above to see how a real item is verified at every step and locked to a tamper-proof record.'}
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 mt-24 items-start">
          <div>
            <h3 className="text-white font-bold text-xl mb-5">One problem, every industry</h3>
            <p className="text-ink_text-secondary text-sm leading-relaxed mb-5 max-w-sm">
              High-value goods pass through a web of operators, makers, handlers,
              regulators, and insurers, each holding a piece of the truth. When
              something is audited, recalled, or grounded, the full history has to be
              proven fast, and proven untouched.
            </p>
            <p className="text-ink_text-secondary text-sm leading-relaxed max-w-sm">
              That is a verifiable integration problem. The exact thing we do, applied
              wherever trust matters most.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="card !py-5 border-l-2 border-l-accent">
                <h4 className="text-white font-bold text-sm mb-1">{p.title}</h4>
                <p className="text-ink_text-secondary text-xs leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl">
          <p className="text-ink_text-secondary text-sm italic leading-relaxed mb-6">
            From the aircraft overhead to the food on your table, the same verifiable
            layer gives every party one tamper-proof record they can check themselves.
            We started with the hardest cases and built it to apply anywhere trust
            matters.
          </p>
          <button type="button" className="btn btn--ghost">
            Explore a traceability pilot
          </button>
        </div>
      </div>
    </section>
  );
};
