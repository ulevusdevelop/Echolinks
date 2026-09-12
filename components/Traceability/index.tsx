import React, { useState } from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

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
    <>
    <section className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute bottom-16 right-8 w-4 h-4 rounded-none hidden lg:block bg-accent"
      />
      <div className="wrap">
        {/* STYLE FIX (Traceability Page item 2): mirrored the old
            site's "Capabilities" pattern (Big Data / Automation / IoT
            pages) — heading on the left, a duotone photo in the middle,
            a short divided list on the right, instead of a single
            centered header block. The industry grid and interactive
            panel below are this component's own feature with no old-
            site equivalent, so kept unchanged. */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-10 items-center mb-16">
          <div>
            <span className="eyebrow-plain">VERIFIABLE TRACEABILITY</span>
            <h1 className="sec-title !text-left">Prove where anything came from.</h1>
          </div>
          <div className="relative w-[230px] h-[280px] overflow-hidden rounded-none mx-auto hidden md:block" style={{ background: '#16003B' }}>
            <Image
              src="https://picsum.photos/seed/echolink-traceability/360/440"
              alt=""
              fill
              sizes="230px"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
              unoptimized
            />
            <div className="absolute inset-0 mix-blend-color" style={{ background: '#16003B' }} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <p className="text-ink_text-secondary text-sm leading-relaxed py-4 border-b border-ink-border">
              A tamper-proof record for high-stakes industries, from airlines and air
              taxis to the goods on your shelf.
            </p>
            <p className="text-ink_text-secondary text-sm leading-relaxed py-4 border-b border-ink-border">
              Every part, batch, and hand-off, photographed, verified, and anchored so
              it cannot be faked.
            </p>
            <p className="tag-mono tag-mono--accent py-4">
              Click any industry below to watch a live verified journey.
            </p>
          </div>
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
            {active ? `${active.title}: verified journey` : 'Watch a live verified journey'}
          </h3>
          <p className="text-ink_text-secondary text-sm leading-relaxed">
            {active
              ? active.journey
              : 'Pick any industry above to see how a real item is verified at every step and locked to a tamper-proof record.'}
          </p>
        </div>
      </div>
    </section>

    {/* RHYTHM FIX: this whole page used to be one single dark <section>
        from the hero all the way down to the closing CTA — the most
        monotone page on the site, worse than the "dark-dark pairs"
        fixed elsewhere, since it's one continuous dark slab with no
        white break at all. The old site's own equivalent pages (e.g.
        /automation) alternate dark hero -> white capability section ->
        dark section -> white benefits section. Split this component
        into three sections instead of one to bring that same dark ->
        white -> dark rhythm here: the hero/industry-grid/journey-panel
        above stays dark, this middle "one problem, every industry"
        section is now white, and the closing CTA below stays its own
        separate dark section as it already was. */}
    <section className="section--light">
      <div className="wrap">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="font-bold text-xl mb-5" style={{ color: '#16003B' }}>One problem, every industry</h3>
            <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: '#434343' }}>
              High-value goods pass through a web of operators, makers, handlers,
              regulators, and insurers, each holding a piece of the truth. When
              something is audited, recalled, or grounded, the full history has to be
              proven fast, and proven untouched.
            </p>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#434343' }}>
              That is a verifiable integration problem. The exact thing we do, applied
              wherever trust matters most.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="!py-5 pl-5 border-l-2"
                style={{ borderLeftColor: '#FF6100', background: '#F7F7F9' }}
              >
                <h4 className="font-bold text-sm mb-1" style={{ color: '#16003B' }}>{p.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#434343' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl">
          <p className="text-sm italic leading-relaxed mb-6" style={{ color: '#434343' }}>
            From the aircraft overhead to the food on your table, the same verifiable
            layer gives every party one tamper-proof record they can check themselves.
            We started with the hardest cases and built it to apply anywhere trust
            matters.
          </p>
          <a href="/contact" className="btn btn--primary">
            Explore a traceability pilot
          </a>
        </div>
      </div>
    </section>

    {/* STYLE FIX (Traceability Page item 4): the page's closing section
        mirrored from the old homepage's "Start Your New Experience" —
        a plain full-width dark band (not a card box), scattered
        orange/white/purple accent squares in the corners, centered
        heading + subhead + one ghost button. Wrapped in RevealOnScroll
        per the item's explicit "add the motion on this section as
        well." */}
    <section className="relative overflow-hidden py-24" style={{ background: '#16003B' }}>
      {/* ENHANCED (direct feedback: "bigger and a little more
          intention") — previously small, uniform, scattered corner
          dots. Rebuilt as two deliberate layered clusters (top-left,
          bottom-right) at a noticeably larger scale, closer to the old
          homepage's actual "Start Your New Experience" composition: a
          large solid square with a smaller overlapping square offset
          at its corner, not just individual dots placed separately. */}
      <div className="absolute top-10 left-10 hidden md:block" aria-hidden="true">
        <span className="absolute top-0 left-0 w-24 h-24" style={{ background: '#FF6100' }} />
        <span className="absolute -top-6 left-20 w-11 h-11" style={{ background: '#16003B', border: '2px solid rgba(255,255,255,0.25)' }} />
        <span className="absolute top-24 left-28 w-7 h-7 bg-white" />
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block" aria-hidden="true">
        <span className="absolute bottom-0 right-0 w-24 h-24" style={{ background: '#FF6100' }} />
        <span className="absolute -bottom-6 right-20 w-11 h-11" style={{ background: '#16003B', border: '2px solid rgba(255,255,255,0.25)' }} />
        <span className="absolute bottom-24 right-28 w-7 h-7 bg-white" />
      </div>

      <RevealOnScroll className="wrap text-center relative">
        <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-6">
          Start Your Verified Journey
        </h2>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Whether you are proving provenance for a single product line or an entire
          supply chain, we will provide you with the highest-quality expertise, tools,
          and best practices to make it verifiable, end to end.
        </p>
        <a href="/contact" className="btn btn--ghost !text-white !border-white">
          Learn more →
        </a>
      </RevealOnScroll>
    </section>
    </>
  );
};
