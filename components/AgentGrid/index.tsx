import React, { useState } from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// CONTENT RESTORATION (sitewide content-completeness scan), three real
// issues found here, not just trims:
//   1. The reference lists 13 distinct agent roles, and this section's
//      own heading says "All 13 run on one..." — but only 12 agents
//      were listed, because "Project management" and "Project
//      controls" had been merged into a single combined entry. That's
//      an internal contradiction (the copy claims 13, the list has 12),
//      not just a content trim. Split back into the two distinct roles
//      the reference actually has.
//   2. Every agent was missing its entire "What it solves:" block —
//      real content, not a summary, absent for all 13 roles.
//   3. All 4 "pillar" descriptions (Decentralized, Policy-controlled,
//      Verifiable, Shared context) were trimmed to their first clause;
//      the reference gives each a second sentence.
// All three restored below.
const agents = [
  { title: 'Finance', description: 'Invoicing, reconciliation, AP/AR, and reporting, every action logged and auditable.', solves: 'Finance teams lose days to manual matching and chasing approvals. This agent reconciles and reports continuously, and every entry is provable, so audits stop being a scramble.' },
  { title: 'Sales', description: 'Lead routing, quoting, follow-ups, and pipeline updates across your CRM.', solves: 'Leads go cold and pipelines fall out of date. This agent routes, quotes, and follows up the moment something changes, so reps spend time selling instead of updating records.' },
  { title: 'Customer service', description: 'Answers grounded in your real data, with escalation to a human when needed.', solves: 'Generic bots give wrong answers and frustrate customers. This agent answers from your actual systems and data, and hands off to a person the instant it should.' },
  { title: 'IT', description: 'Ticket triage, access requests, and system checks under strict policy controls.', solves: 'IT drowns in repetitive tickets and access requests. This agent handles the routine under your rules, with every action logged, so your team focuses on real problems.' },
  { title: 'Legal', description: 'Contract review, clause checks, and compliance flags with a verifiable trail.', solves: 'Contract review is slow and easy to get wrong. This agent flags risky clauses and compliance gaps fast, and leaves an auditable record of what was checked and why.' },
  { title: 'Marketing', description: 'Content drafts, campaign ops, and reporting, drawing on your own data.', solves: 'Campaigns stall on production and messy reporting. This agent drafts, runs campaign operations, and reports from your real numbers, so marketing moves faster with less guesswork.' },
  { title: 'Healthcare', description: 'Clinical assist grounded in live FHIR context and your own documentation.', solves: 'Clinicians waste time hunting through records and documentation. This agent answers from live patient context and your own protocols, with every source traceable.' },
  { title: 'Hospitals & clinics', description: 'Scheduling, records, and care coordination, with patient privacy built in.', solves: 'Care coordination breaks across disconnected systems. This agent ties scheduling, records, and hand-offs together, keeping patient data private and every action verifiable.' },
  { title: 'Supply chain', description: 'Replenishment, exception handling, and provenance from supplier to shelf.', solves: 'Stockouts and surprises come from blind spots between systems. This agent watches stock, handles exceptions, and proves provenance end to end, so the chain runs on facts.' },
  { title: 'HR', description: 'Onboarding, requests, and policy answers, with privacy and access built in.', solves: 'HR repeats the same onboarding steps and policy answers endlessly. This agent handles them consistently, with the right access controls and a clear record of every action.' },
  { title: 'Compliance & risk', description: 'Monitors controls, flags violations, and keeps a verifiable record.', solves: 'Compliance gaps surface too late, usually during an audit. This agent watches your controls continuously, flags risks the moment they appear, and anchors proof of every check, so you are always audit-ready instead of scrambling.' },
  { title: 'Project management', description: 'Tracks tasks, deadlines, and dependencies across your tools, surfacing risks before they slip.', solves: 'Projects drift when status lives in five different tools. This agent keeps tasks, owners, and deadlines in sync, flags blockers early, and gives everyone one verifiable source of truth on where things stand.' },
  { title: 'Project controls', description: 'Watches the schedule, cost, and progress data, updates earned value, and flags slippage before it lands.', solves: 'Project status is usually a week old by the time anyone sees it. This agent pulls progress and cost from your live systems, recalculates CPI, SPI, and forecast at completion, and flags float erosion and variance while there is still time to recover, with every update traceable to its source.' },
];
const pillars = [
  { title: 'Decentralized', description: 'No single vendor or model owns your intelligence. Agents run across decentralized infrastructure.' },
  { title: 'Policy-controlled', description: 'Every agent acts only within the rules and limits you set, never outside them.' },
  { title: 'Verifiable', description: 'Each action is logged and anchored to the trust layer, so nothing happens off the record.' },
  { title: 'Shared context', description: 'Agents plug into one decision network, so the whole business works from the same verified truth.' },
];

export const AgentGrid = () => {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section id="agent-grid" className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -top-3 left-16 w-6 h-6 bg-accent rounded-none hidden lg:block"
      />
      <div className="wrap">
        <RevealOnScroll>
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow-plain">DECENTRALIZED AI AGENTS BY FUNCTION</span>
          <h2 className="sec-title">An agent for every part of the business.</h2>
          <p className="sec-sub sec-sub--center">
            Purpose-built AI agents for the work your teams do every day, each one
            decentralized, policy-controlled, and verifiable. No black box, no single
            vendor owning your intelligence.
          </p>
        </div>
        </RevealOnScroll>

        {/* STYLE FIX (Layer Page item 8): mirrored the "Capabilities"
            list treatment from the automation/IoT pages (images 22/23)
            — plain text rows with a thin divider line, no card box.
            Kept the 3-column grid since 13 rows in one column would run
            very long — the divider-line treatment is what actually
            mirrors the reference, not the column count. Now genuinely
            13 distinct rows (see restoration note above), and each
            row is clickable to reveal "What it solves," matching the
            same pattern established for Who We Serve. */}
        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {agents.map((agent) => {
            const isOpen = openTitle === agent.title;
            return (
              <button
                key={agent.title}
                type="button"
                onClick={() => setOpenTitle(isOpen ? null : agent.title)}
                className="pt-5 border-t border-ink-border text-left"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h4 className="text-white font-bold">{agent.title}</h4>
                  <span className="text-ink_text-muted text-lg leading-none flex-shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
                <p className="text-ink_text-secondary text-sm leading-relaxed">
                  {agent.description}
                </p>
                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-ink-border text-xs leading-relaxed">
                    <span className="font-bold text-white">What it solves: </span>
                    <span className="text-ink_text-secondary">{agent.solves}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={250}>
        <div className="mt-20">
          <p className="tag-mono mb-8">ALL 13 RUN ON ONE DECENTRALIZED AI AGENT LAYER</p>
          <div className="grid md:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card">
                <h4 className="text-white font-bold mb-2">{pillar.title}</h4>
                <p className="text-ink_text-secondary text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </RevealOnScroll>

        <div className="mt-14">
          <Link href="/contact" className="btn btn--primary">
            Build an agent for your team →
          </Link>
        </div>
      </div>
    </section>
  );
};
