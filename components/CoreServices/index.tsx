import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import {
  LinkIcon,
  CalendarDaysIcon,
  CogIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

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
  { tag: 'FOR INDIVIDUALS', title: 'People & everyday use', description: 'Personal AI you control, that keeps your data yours. Verifiable, private, and simple, no company or technical team required.' },
  { tag: 'FOR ENTREPRENEURS', title: 'Founders & small business', description: 'AI agents that run real work, sales, finance, operations, so a lean team moves like a big one, with every action provable.' },
  { tag: 'FOR ENTERPRISE', title: 'Large organizations', description: 'Decentralized AI across many systems and teams, under policy controls, with full audit trails and no vendor lock-in.' },
];
const serviceCards = [
  { title: 'Enterprise integration', description: 'EDI, APIs, ERP, WMS, MES, SCADA, and HL7/FHIR connected without rip and replace.', Icon: LinkIcon },
  { title: 'Project scheduling, controls & EVM', description: 'CPM schedules, baselines, earned value, and reporting tied to live cost and progress data.', link: { label: 'See project controls', href: '/project-controls' }, Icon: CalendarDaysIcon },
  { title: 'Automation & robotics', description: 'Robots, fleets, and line controls wired into your systems and proving completed work, with output anchored to a trust record.', Icon: CogIcon },
  { title: 'Blockchain trust layer', description: 'Cryptographic provenance for every AI decision, agent action, and machine transaction. Audit-ready by design.', Icon: ShieldCheckIcon },
  { title: 'Verifiable traceability', description: 'Tamper-proof provenance for airlines, air taxis, supply chain, pharma, food, and luxury goods.', link: { label: 'See traceability', href: '/traceability' }, Icon: MagnifyingGlassIcon },
  { title: 'Training & enablement', description: 'Hands-on cohorts and role-based tracks so your team can run what we build.', link: { label: 'See training', href: '/training' }, Icon: AcademicCapIcon },
];
// CONTENT RESTORATION (sitewide content-completeness scan): checked
// every string in this file against the reference line by line, not
// just heading/structure match. Found 6 trimmed descriptions across
// sizedFor and serviceCards — each missing its closing clause compared
// to the reference:
//   - "People & everyday use" was missing "no company or technical
//     team required."
//   - "Founders & small business" was missing "with every action
//     provable."
//   - "Large organizations" was missing "and no vendor lock-in."
//   - "Project scheduling..." said "tied to live data" where the
//     reference says "tied to live cost and progress data."
//   - "Automation & robotics" was missing "and proving completed
//     work."
//   - "Blockchain trust layer" was missing its second sentence,
//     "Audit-ready by design."
// All 6 restored to the reference's exact wording above.

// `headingLevel` fixes a real heading-hierarchy gap found during a
// sitewide h1 audit: used standalone on /services (needs h1, nothing
// else on that page provides one) and as a subsection of /layer
// (needs to stay subordinate to Layer's own h1). Defaults to 'h2' (the
// /layer context); /services passes 'h1' explicitly.
export const CoreServices = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const Heading = headingLevel;
  return (
    <>
      <section id="what-we-do" className="section--page relative overflow-hidden">
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
        <RevealOnScroll>
          <div className="sec-header max-w-2xl">
            <span className="eyebrow-plain">WHAT WE DO</span>
            <Heading className="sec-title">Core services. Decentralized AI leads.</Heading>
            <p className="sec-sub">
              Each service stands on its own and gets stronger wired to the others.
              Start with one. Most clients start with decentralized AI.
            </p>
          </div>
        </RevealOnScroll>

          {/* STYLE FIX (Layer Page item 4): inner box switched from the
              dark `.card` treatment to a sharp-cornered white box with
              dark text, per the reference — "make the inner box a sharp
              rectangle and white, the words can be dark." */}
        <RevealOnScroll delayMs={150}>
          <div className="bg-white rounded-none grid lg:grid-cols-[1.3fr_1fr] gap-12 p-8 md:p-12">
            <div>
              <span className="text-xs font-bold tracking-tag uppercase" style={{ color: '#FF6100' }}>
                FLAGSHIP SERVICE
              </span>
              <h3 className="text-2xl font-bold mt-3 mb-4" style={{ color: '#16003B' }}>
                Decentralized AI
              </h3>
              <p className="text-[#434343] text-sm leading-relaxed mb-8 max-w-md">
                AI that does not depend on one vendor, one model, or one black box. We
                run AI across decentralized infrastructure with verifiable inference,
                so every output can be checked, every decision has provenance, and no
                single provider owns your intelligence.
              </p>

              <ul className="flex flex-col gap-4 mb-8">
                {checklist.map((item) => (
                  <li key={item.title} className="flex gap-3 text-sm">
                    <span style={{ color: '#FF6100' }}>✓</span>
                    <span className="text-[#434343]">
                      <span className="font-semibold" style={{ color: '#16003B' }}>{item.title}</span>{' '}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="btn btn--primary">
                Talk decentralized AI →
              </Link>
            </div>

            <div className="bg-[#F7F7F9] rounded-none p-6 border border-[#E5E5E5]">
              <span className="text-xs font-bold tracking-tag uppercase" style={{ color: '#FF6100' }}>
                ● WHY DECENTRALIZED
              </span>
              <div className="flex flex-col gap-4 mt-6">
                {whyRows.map((row, i) => (
                  <div
                    key={row.value}
                    className={`flex justify-between text-xs pb-4 ${
                      i < whyRows.length - 1 ? 'border-b border-[#E5E5E5]' : ''
                    }`}
                  >
                    <span className={row.bad ? 'text-[#707070]' : 'font-bold'} style={!row.bad ? { color: '#FF6100' } : undefined}>
                      {row.label}
                    </span>
                    <span className={row.bad ? 'text-[#434343]' : 'font-bold'} style={!row.bad ? { color: '#FF6100' } : undefined}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={250}>
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
        </RevealOnScroll>
        </div>
      </section>

      {/* STYLE FIX (Layer Page item 5, "continuation of What We Do"):
          mirrored from another old-site page's icon grid (same pattern
          already applied to WhoWeServe) — solid navy icon badge, bold
          orange heading, gray body text, plain on white, no card box.
          Given the reference for this specific grid uses a WHITE page,
          split into its own white band rather than forcing it onto the
          dark section above, consistent with the site's alternating
          purple/white section rule. */}
      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap">
        <RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {serviceCards.map((card) => (
              <div key={card.title}>
                <span
                  className="w-12 h-12 rounded-none flex items-center justify-center mb-4"
                  style={{ background: '#16003B' }}
                >
                  <card.Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </span>
                <h4 className="font-bold mb-2" style={{ color: '#FF6100' }}>
                  {card.title}
                </h4>
                <p className="text-[#434343] text-sm leading-relaxed">
                  {card.description}{' '}
                  {card.link && (
                    <Link href={card.link.href} className="font-medium" style={{ color: '#FF6100' }}>
                      {card.link.label} →
                    </Link>
                  )}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
        </div>
      </section>
    </>
  );
};
