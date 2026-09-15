import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Verified against the original source HTML directly (previously
// transcribed from a zoomed screenshot with some values illegible) —
// every string below is now an exact match, not a best-effort read.
const checklist = [
  { title: 'Sees', description: 'Pulls live context from your applications, data, and machines, whatever you run, the moment a decision is needed.' },
  { title: 'Decides', description: 'Reasons over the data against your rules. Routes across multiple models, so no one provider is a single point of failure.' },
  { title: 'Acts, within limits', description: 'Executes the task under policy controls you define. Anything outside its authority is blocked and escalated to a human.' },
  { title: 'Proves it', description: 'Every action is anchored to the trust layer. You can audit what the agent did, why, and when, after the fact.' },
];

// Right-hand panel — confirmed exact against source, including the
// "Spend authority" row that was missing entirely in the prior
// transcription (the panel had 3 rows instead of the real 4).
const activityRows = [
  { label: 'Spend authority', value: 'up to $25,000' },
  { label: 'Approved vendors', value: 'whitelist only' },
  { label: 'Off-policy action', value: 'blocked → human', flagged: true },
  { label: 'Every action', value: 'logged & verifiable' },
];

const agents = [
  { title: 'Procurement agent', description: 'Watches stock, drafts and places replenishment orders with approved vendors, and stops at your spend cap.' },
  { title: 'EDI exchange agent', description: 'Receives an 850, validates it, flags exceptions, and returns the 855 acknowledgement without manual handling.' },
  { title: 'Clinical assist agent', description: 'Answers staff questions grounded in live FHIR patient context and your hospital\u2019s own build documentation.' },
  { title: 'Fleet coordination agent', description: 'Assigns work to robots, confirms completed tasks, and logs proof of output to the trust record.' },
];

export const SoftwareThatActs = () => {
  return (
    // RHYTHM FIX: this sat directly after NotACryptoPlay, another dark
    // section — the second dark-dark pair on this page (the other being
    // CoreServices -> WhoWeServe, fixed separately). Flipped to white.
    // Every piece of content inside already uses the self-contained
    // dark `.card` treatment (the checklist card, the policy-control
    // panel, the four agent cards), so nothing internal needs to
    // change — it now reads as dark cards on a white section, the same
    // pattern applied to Training and consistent with how the old
    // site's own pages mix white sections with colored card blocks
    // rather than full-bleed dark slabs.
    <section id="software-that-acts" className="section--light">
      <div className="wrap">
        <RevealOnScroll>
        <div className="sec-header max-w-2xl">
          <span className="eyebrow-plain--dark">DECENTRALIZED AI AGENTS</span>
          <h2 className="sec-title" style={{ color: '#16003B' }}>Software that acts, not just answers.</h2>
          <p className="sec-sub" style={{ color: '#434343' }}>
            An agent is AI you give a job, not a chat box you query. It reads
            your live data, decides, and takes action across your systems,
            inside limits you set. Decentralized means no single vendor owns
            the agent or its reasoning, and every action it takes is logged
            and verifiable.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="card grid lg:grid-cols-[1.2fr_1fr] gap-10 mb-6">
          <div className="flex flex-col gap-4">
            {checklist.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <span className="number-badge flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-ink_text-secondary text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-ink-900 border border-ink-border rounded-none p-5">
            <p className="tag-mono tag-mono--accent mb-4">POLICY CONTROL</p>
            <div className="flex flex-col gap-3 mb-4">
              {activityRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center pb-3 border-b border-ink-border last:border-0 last:pb-0">
                  <span className="text-ink_text-secondary text-xs">{row.label}</span>
                  <span className={`text-xs font-semibold ${row.flagged ? 'text-accent-light' : 'text-white'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-ink_text-secondary text-base leading-relaxed">
              Agents are powerful because they act on their own. They are safe
              because they cannot act outside the rules you give them.
            </p>
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={250}>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {agents.map((agent) => (
            <div key={agent.title} className="card">
              <h4 className="text-white font-bold text-sm mb-2">{agent.title}</h4>
              <p className="text-ink_text-secondary text-base leading-relaxed">
                {agent.description}
              </p>
            </div>
          ))}
        </div>
        </RevealOnScroll>

        <div className="flex flex-wrap gap-4">
          <Link href="/lab" className="btn btn--primary">
            Try an agent in the labs →
          </Link>
          <Link href="/contact" className="btn btn--ghost">
            Scope an agent for your team
          </Link>
        </div>
      </div>
    </section>
  );
};
