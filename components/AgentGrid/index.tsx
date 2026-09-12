import React from 'react';
import Link from 'next/link';

const agents = [
  { title: 'Finance', description: 'Invoicing, reconciliation, AP/AR, and reporting, every action logged and auditable.' },
  { title: 'Sales', description: 'Lead routing, quoting, follow-ups, and pipeline updates across your CRM.' },
  { title: 'Customer service', description: 'Answers grounded in your real data, with escalation to a human when needed.' },
  { title: 'IT', description: 'Ticket triage, access requests, and system checks under strict policy controls.' },
  { title: 'Legal', description: 'Contract review, clause checks, and compliance flags with a verifiable trail.' },
  { title: 'Marketing', description: 'Content drafts, campaign ops, and reporting, drawing on your own data.' },
  { title: 'Healthcare', description: 'Clinical assist grounded in live FHIR context and your own documentation.' },
  { title: 'Hospitals & clinics', description: 'Scheduling, records, and care coordination, with patient privacy built in.' },
  { title: 'Supply chain', description: 'Replenishment, exception handling, and provenance from supplier to shelf.' },
  { title: 'HR', description: 'Onboarding, requests, and policy answers, with privacy and access built in.' },
  { title: 'Compliance & risk', description: 'Monitors controls, flags violations, and keeps a verifiable record.' },
  { title: 'Project management & controls', description: 'Tracks tasks, deadlines, and dependencies, and watches schedule, cost, and progress data, flagging slippage before it lands.' },
];
const pillars = [
  { title: 'Decentralized', description: 'No single vendor or model owns your intelligence.' },
  { title: 'Policy-controlled', description: 'Every agent acts only within the rules you set.' },
  { title: 'Verifiable', description: 'Each action is logged and anchored to the trust layer.' },
  { title: 'Shared context', description: 'Agents plug into one decision network.' },
];

export const AgentGrid = () => {
  return (
    <section id="agent-grid" className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -top-3 left-16 w-6 h-6 bg-accent rounded-none hidden lg:block"
      />
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow-plain">DECENTRALIZED AI AGENTS BY FUNCTION</span>
          <h2 className="sec-title">An agent for every part of the business.</h2>
          <p className="sec-sub sec-sub--center">
            Purpose-built AI agents for the work your teams do every day, each one
            decentralized, policy-controlled, and verifiable. No black box, no single
            vendor owning your intelligence.
          </p>
        </div>

        {/* STYLE FIX (Layer Page item 8): mirrored the "Capabilities"
            list treatment from the automation/IoT pages (images 22/23)
            — plain text rows with a thin divider line, no card box.
            Kept all 13 roles (the reference's own list is short because
            it's page-specific; this section needs all of them) and kept
            the 3-column grid since 13 rows in one column would run very
            long — the divider-line treatment is what actually mirrors
            the reference, not the column count. Skipped adding a photo
            like the reference has, since a single generic photo doesn't
            fit 13 distinct agent roles the way it fits one page's single
            topic. */}
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
          {agents.map((agent) => (
            <div key={agent.title} className="pt-5 border-t border-ink-border">
              <h4 className="text-white font-bold mb-2">{agent.title}</h4>
              <p className="text-ink_text-secondary text-sm leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>

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

        <div className="mt-14">
          <Link href="/contact" className="btn btn--primary">
            Build an agent for your team →
          </Link>
        </div>
      </div>
    </section>
  );
};
