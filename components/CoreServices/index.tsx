import React from 'react';
import Link from 'next/link';

const whyRows = [
  { label: 'Centralized AI', value: 'one vendor owns the model', bad: true },
  { label: 'Centralized AI', value: 'outputs taken on trust', bad: true },
  { label: 'Centralized AI', value: 'your data trains their model', bad: true },
  { label: 'Echolink decentralized AI', value: 'verifiable · portable · yours', bad: false },
];
const checklist = [
  { title: 'Verifiable inference.', description: 'Every AI decision is logged and independently auditable, not taken on faith.' },
  { title: 'No vendor lock-in.', description: 'Route across multiple models and decentralized compute through one gateway.' },
  { title: 'Data stays yours.', description: 'Your operational data is never surrendered to a single provider to train on.' },
  { title: 'Agentic execution.', description: 'Decentralized agents act inside your systems under policy controls you set.' },
];
const sizedFor = [
  { tag: 'FOR INDIVIDUALS', title: 'People & everyday use', description: 'Personal AI you control, that keeps your data yours. Verifiable, private, and simple.' },
  { tag: 'FOR ENTREPRENEURS', title: 'Founders & small business', description: 'AI agents that run real work, sales, finance, operations, so a lean team moves like a big one.' },
  { tag: 'FOR ENTERPRISE', title: 'Large organizations', description: 'Decentralized AI across many systems and teams, under policy controls, with full audit trails.' },
];
const serviceCards = [
  { title: 'Enterprise integration', description: 'EDI, APIs, ERP, WMS, MES, SCADA, and HL7/FHIR connected without rip and replace.' },
  { title: 'Project scheduling, controls & EVM', description: 'CPM schedules, baselines, earned value, and reporting tied to live data.', link: { label: 'See project controls', href: '/project-controls' } },
  { title: 'Automation & robotics', description: 'Robots, fleets, and line controls wired into your systems, output anchored to a trust record.' },
  { title: 'Blockchain trust layer', description: 'Cryptographic provenance for every AI decision, agent action, and machine transaction.' },
  { title: 'Verifiable traceability', description: 'Tamper-proof provenance for airlines, air taxis, supply chain, pharma, food, and luxury goods.', link: { label: 'See traceability', href: '/traceability' } },
  { title: 'Training & enablement', description: 'Hands-on cohorts and role-based tracks so your team can run what we build.', link: { label: 'See training', href: '/training' } },
];

export const CoreServices = () => {
  return (
    <section className="section--page relative overflow-hidden">
      {/* Same connector-arrow language as the Hero, reused here at low
          opacity as background texture rather than a foreground device —
          ties the visual system together without repeating itself. */}
      <svg
        viewBox="0 0 300 300"
        fill="none"
        className="absolute -top-10 -right-10 w-[300px] h-[300px] pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <path
          d="M20 260 C 100 240, 120 160, 200 140 C 240 130, 220 60, 280 20"
          stroke="rgba(255,96,0,0.18)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M274 24 l14 -4 l-6 15 Z" fill="rgba(255,96,0,0.18)" />
      </svg>
      <div className="wrap relative">
        <div className="sec-header max-w-xl">
          <span className="eyebrow">WHAT WE DO</span>
          <h2 className="sec-title">Core services. Decentralized AI leads.</h2>
          <p className="sec-sub">
            Each service stands on its own and gets stronger wired to the others. Start
            with one. Most clients start with decentralized AI.
          </p>
        </div>

        <div className="card grid lg:grid-cols-[1.3fr_1fr] gap-12">
          <div>
            <span className="tag-mono tag-mono--accent">FLAGSHIP SERVICE</span>
            <h3 className="text-2xl font-bold text-white mt-3 mb-4">Decentralized AI</h3>
            <p className="text-ink_text-secondary text-sm leading-relaxed mb-8 max-w-md">
              AI that does not depend on one vendor, one model, or one black box. We run
              AI across decentralized infrastructure with verifiable inference, so every
              output can be checked, every decision has provenance, and no single
              provider owns your intelligence.
            </p>

            <ul className="flex flex-col gap-4 mb-8">
              {checklist.map((item) => (
                <li key={item.title} className="flex gap-3 text-sm">
                  <span className="text-accent-light">✓</span>
                  <span className="text-ink_text-secondary">
                    <span className="text-white font-semibold">{item.title}</span>{' '}
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/services/decentralized-ai" className="btn btn--primary">
              Talk decentralized AI →
            </Link>
          </div>


          <div className="card bg-ink-700">
            <span className="tag-mono tag-mono--accent">
              ● WHY DECENTRALIZED
            </span>
            <div className="flex flex-col gap-4 mt-6">
              {whyRows.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-xs pb-4 ${
                    i < whyRows.length - 1 ? 'border-b border-ink-border' : ''
                  }`}
                >
                  <span className={row.bad ? 'text-ink_text-muted' : 'text-accent-light font-bold'}>
                    {row.label}
                  </span>
                  <span className={row.bad ? 'text-ink_text-secondary' : 'text-accent-light font-bold'}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <p className="tag-mono mb-8">DECENTRALIZED AI, SIZED FOR WHO YOU ARE</p>
          <div className="grid md:grid-cols-3 gap-6">
            {sizedFor.map((item) => (
              <div key={item.title} className="card">
                <span className="tag-mono tag-mono--accent">{item.tag}</span>
                <h4 className="text-white font-bold mt-3 mb-2">{item.title}</h4>
                <p className="text-ink_text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {serviceCards.map((card) => (
            <div key={card.title} className="card">
              <h4 className="text-white font-bold mb-2">{card.title}</h4>
              <p className="text-ink_text-secondary text-sm leading-relaxed">
                {card.description}{' '}
                {card.link && (
                  <Link href={card.link.href} className="text-accent-light font-medium">
                    {card.link.label} →
                  </Link>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
