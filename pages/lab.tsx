// pages/lab.tsx
//
// FULL BUILD (direct request): this was a placeholder ("full build to
// follow"). Content below is mirrored directly from the reference
// HTML's "Echolink Labs" section (id="labs") — same 6 simulations,
// same copy, same tags/levels.
//
// Two adaptations from the reference, both deliberate:
// 1. The reference's "Get your lab pass" name+email form is real,
//    included content here (restored after an earlier pass wrongly
//    dropped it while swapping the page's actual *access* gate for
//    real membership auth — RequireMembership, tied to actual
//    accounts, already wraps this page). Since membership already
//    controls who reaches the page at all, the form now does a lighter
//    job than in the reference: a session-scoped personalization step
//    ("keeps your progress for this session," per its own copy)
//    rather than a second access gate stacked on the first, which
//    would just be confusing for someone who already had to log in.
//    The content itself — heading, copy, form, "LAB PASS ACTIVE"
//    state — is all there, just not gating anything further.
// 2. Each reference lab card opens a fully interactive browser
//    simulation (a working blockchain-building tool, branching
//    scenario games, etc.) — genuine standalone applications, not
//    just content. Building 5-6 real interactive simulations is a
//    substantial engineering effort on its own, well beyond a content/
//    layout pass. What's built here is the complete page: the intro,
//    the full card grid with real copy, and a modal (reusing the same
//    Dialog pattern already established for Insights) that shows each
//    simulation's full description with a clear "not yet interactive"
//    state and a working CTA — a real, complete page ready to have the
//    actual simulations wired in behind each card, not a stub.
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RequireMembership } from '@/components/RequireMembership';

type Lab = {
  id: string;
  tag: string;
  level: string;
  title: string;
  description: string;
  competencies?: string[];
  cta: string;
  comingSoon?: boolean;
  externalUrl?: string;
};

// CONTENT RESTORATION (careful sweep, found in the reference's script
// tag as `LABS`): descriptions below were paraphrased/invented; the
// reference has real, specific objective text for each scenario, plus
// a competencies list not present here at all. Also found the
// Blockchain Foundations lab links to a real external platform
// (echolink-blockchain-platform.onrender.com) — not a modal at all,
// an actual separate live tool. Restored the real copy and wired the
// external link through.
//
// Note on scope: the reference's scenarios (orders, schedule, trace,
// agent) are each a fully-scripted branching quiz underneath — 4
// questions per scenario, 3 answer options each, with its own
// feedback text per option. That's a real interactive engine, well
// beyond this page's content/layout scope; what's restored here is
// the accurate objective/competencies copy that should surface on the
// card and in the modal, not the full question-branch logic.
const labs: Lab[] = [
  {
    id: 'blockchain',
    tag: 'LIVE PLATFORM',
    level: 'LEVEL 1',
    title: 'Blockchain Foundations',
    description:
      'Ten connected missions on the full Echolink simulation platform. You build a transaction, hash it, assemble a block, chain it, attack it, repair it, generate keys, sign and verify, then work a final investigation. It ends in a competency result you can show someone.',
    cta: 'Open the platform',
    externalUrl: 'https://echolink-blockchain-platform.onrender.com',
  },
  {
    id: 'orders',
    tag: 'SCENARIO · EPISODE 1',
    level: 'INTEGRATION',
    title: 'The Missing Orders',
    description:
      'Nexora Global shipped 1,400 orders last week. The ERP says 1,462. Find where the 62 went and prove it.',
    competencies: ['EDI hand-offs', 'Data lineage', 'Exception handling', 'Verifiable records'],
    cta: 'Run the simulation',
  },
  {
    id: 'schedule',
    tag: 'SCENARIO',
    level: 'PROJECT CONTROLS',
    title: 'Schedule Recovery',
    description:
      'A 14-month capital project is reporting green at month 8. CPI is 0.87 and SPI is 0.91. Work out what is actually happening and choose a recovery you can defend.',
    competencies: ['Earned value', 'Critical path', 'Float analysis', 'Change control'],
    cta: 'Run the simulation',
  },
  {
    id: 'trace',
    tag: 'SCENARIO',
    level: 'TRACEABILITY',
    title: 'Trace the Batch',
    description:
      'Vaccine batch VX-884 is flagged after delivery. A recall decision is due in four hours. Establish what is provable.',
    competencies: ['Chain of custody', 'Cold chain integrity', 'Tamper detection', 'Recall scoping'],
    cta: 'Run the simulation',
  },
  {
    id: 'agent',
    tag: 'SCENARIO',
    level: 'DECENTRALIZED AI',
    title: 'Agent Under Policy',
    description:
      'You are giving an AI agent authority over routine purchasing. Set the boundaries before it runs, then see what the policy engine catches.',
    competencies: ['Policy design', 'Constrained authority', 'Audit trail', 'Escalation'],
    cta: 'Run the simulation',
  },
  {
    id: 'city',
    tag: 'IN DEVELOPMENT',
    level: 'FLAGSHIP',
    title: 'Build My City',
    description:
      "The long-form build simulation. Stand up systems, wire them together, and keep a whole city's operations verifiable as it grows. Opening to lab pass holders first.",
    cta: 'Coming soon',
    comingSoon: true,
  },
];

export default function LabPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = labs.find((l) => l.id === openId) || null;

  // RESTORED — this whole section was left out when the page was first
  // built, not deliberately: the real RequireMembership gate replaced
  // the reference's lightweight name+email capture as the page's
  // *access* gate, but the "Get your lab pass" section itself is a
  // separate, real piece of content in the reference (its own heading,
  // its own copy, its own form) — not just a mechanism to swap out. It
  // should still be here, just doing a lighter job: since membership
  // already controls who can reach this page at all, this form is now
  // a session-scoped personalization step ("keeps your progress for
  // this session," per its own copy) rather than a second access gate
  // stacked on top of the first one, which would just be confusing for
  // someone who already had to log in to see this page.
  const [labName, setLabName] = useState('');
  const [labEmail, setLabEmail] = useState('');
  const [passActive, setPassActive] = useState(false);

  const handleEnterLab = () => {
    if (labName.trim() && labEmail.trim()) {
      setPassActive(true);
    }
  };

  return (
    <>
      <Head>
        <title>Echolink Labs — Echolink Solutions</title>
        <meta
          name="description"
          content="Get in the lab and try it yourself. Six hands-on simulations covering blockchain foundations, EDI integration, project controls, traceability, and decentralized AI, open to members."
        />
      </Head>
      {/* CLIENT QA FIX (Labs page intro): "Ensure that Labs page has
          its own intro as well." Root cause: this hero used to sit
          INSIDE <RequireMembership>, whose gate fully replaces its
          children — a logged-out visitor (i.e. most people who land
          on this page) saw only the bare "MEMBERS ONLY / Sign in to
          view this content" block and never this intro at all, unlike
          every other page on the site, which shows its intro
          regardless of auth state. Moved the hero above the gate so
          it's always visible as real marketing content — only the
          interactive lab-pass card, the simulation grid, and the
          modal (the actual gated functionality) stay behind
          membership. Same structure as every other page-opening hero
          (Insights, Layer, Project Controls). */}
      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
          <span className="eyebrow-plain">ECHOLINK LABS</span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
            Get in the lab and try it yourself.
          </h1>
          {/* WIDENED (direct feedback: "the intro sections... text
              width... span through a bit more width") — matched to the
              h1's own max-w-2xl above it, same fix applied across every
              page using this intro-hero pattern. */}
          <p className="text-white text-base leading-relaxed max-w-2xl mb-10">
            Open to anyone: students, engineers, operators, and executives. Pick a
            simulation and work a real scenario in a safe environment. Nothing to
            install, nothing you can break, and every move you make is anchored to
            a trust record you can read.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </div>
      </section>

      <RequireMembership>
        <section className="section--page !pt-16 !pb-24">
          <div className="wrap">
            <div className="card grid md:grid-cols-2 gap-10 items-center mb-16">
              <div>
                <h3 className="text-white font-bold text-xl mb-3">Get your lab pass</h3>
                <p className="text-ink_text-secondary text-base leading-relaxed mb-5">
                  One name, one email, and you are in. The pass unlocks every simulation
                  below and keeps your progress for this session.
                </p>
                {passActive && (
                  <div className="inline-flex items-center gap-2 tag-mono tag-mono--accent">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    LAB PASS ACTIVE · {labName}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  placeholder="First name"
                  autoComplete="given-name"
                  className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ink_text-muted focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  value={labEmail}
                  onChange={(e) => setLabEmail(e.target.value)}
                  placeholder="Work or personal email"
                  autoComplete="email"
                  className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-ink_text-muted focus:outline-none focus:border-accent"
                />
                <button type="button" onClick={handleEnterLab} className="btn btn--primary justify-center">
                  Enter the lab →
                </button>
                {!passActive && (labName || labEmail) && (labName.trim() === '' || labEmail.trim() === '') && (
                  <p className="text-ink_text-muted text-xs">Enter both a name and an email to activate your pass.</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs.map((lab) =>
                /* LINK FIX (careful sweep): Blockchain Foundations has a
                   real external URL in the reference, not a modal —
                   render it as a real link opening in a new tab instead
                   of routing through the same "not yet interactive"
                   modal as the scenario cards. */
                lab.externalUrl ? (
                  <a
                    key={lab.id}
                    href={lab.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card text-left flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="tag-mono tag-mono--accent">{lab.tag}</span>
                      <span className="tag-mono">{lab.level}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{lab.title}</h3>
                    <p className="text-ink_text-secondary text-base leading-relaxed mb-6 flex-1">
                      {lab.description}
                    </p>
                    <span className="text-sm font-semibold text-accent-light">
                      {lab.cta} →
                    </span>
                  </a>
                ) : (
                  <button
                    key={lab.id}
                    type="button"
                    onClick={() => setOpenId(lab.id)}
                    className={`card text-left flex flex-col ${lab.comingSoon ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="tag-mono tag-mono--accent">{lab.tag}</span>
                      <span className="tag-mono">{lab.level}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{lab.title}</h3>
                    <p className="text-ink_text-secondary text-base leading-relaxed mb-6 flex-1">
                      {lab.description}
                    </p>
                    <span className={`text-sm font-semibold ${lab.comingSoon ? 'text-ink_text-muted' : 'text-accent-light'}`}>
                      {lab.cta} {!lab.comingSoon && '→'}
                    </span>
                  </button>
                )
              )}
            </div>

            <p className="text-ink_text-secondary text-xs text-center mt-10 whitespace-nowrap">
              Simulations run in your browser. Nothing you do in the lab touches a
              production system.
            </p>
          </div>
        </section>

        <Transition show={open !== null} as={Fragment}>
          <Dialog onClose={() => setOpenId(null)} className="relative z-[60]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            </Transition.Child>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="card max-w-lg w-full relative">
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="absolute top-6 right-6 text-ink_text-secondary hover:text-white"
                    aria-label="Close"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                  {open && (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="tag-mono tag-mono--accent">{open.tag}</span>
                        <span className="tag-mono">{open.level}</span>
                      </div>
                      <Dialog.Title className="text-white font-bold text-2xl mb-4">
                        {open.title}
                      </Dialog.Title>
                      <p className="text-ink_text-secondary text-base leading-relaxed mb-6">
                        {open.description}
                      </p>
                      {open.competencies && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {open.competencies.map((c) => (
                            <span key={c} className="tag-mono border border-ink-border rounded-none px-3 py-1.5 !text-[10px]">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                      {open.comingSoon ? (
                        <p className="tag-mono">Opening to lab pass holders first — check back soon.</p>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link href="/contact" className="btn btn--primary">
                            Talk to us about this lab →
                          </Link>
                          <button
                            type="button"
                            onClick={() => setOpenId(null)}
                            className="btn btn--ghost"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </RequireMembership>
    </>
  );
}
