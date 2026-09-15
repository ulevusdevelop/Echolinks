import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// CONTENT RESTORATION (sitewide content-completeness scan): checked
// against the reference line by line and found three real gaps, not
// just missing polish:
//   1. The eyebrow ("How we engage") was missing entirely — this
//      section had no eyebrow label at all above its heading.
//   2. Every description was trimmed to its first sentence; the
//      reference gives each model two.
//   3. Every card was missing its entire "Solves for you:" paragraph —
//      a real, separate piece of content on each of the 6 cards in the
//      reference, not present here at all.
// All three restored below, verbatim from the reference.
const models = [
  {
    label: 'MODEL 01',
    title: 'Verifiable AI integration',
    description: 'You sit between your systems and AI agents, with blockchain as the audit layer. Every agent action across your applications, data, and machines is cryptographically logged and verifiable.',
    solves: 'Businesses can finally trust AI in production, because every decision is provable. For enterprises, it turns AI from a compliance risk into an audit-ready asset regulators and boards accept.',
    delivered: 'Delivered as: integration build, then ongoing assurance',
    highlight: true,
  },
  {
    label: 'MODEL 02',
    title: 'Agentic systems orchestration',
    description: 'AI agents with constrained authority run transactions, document exchange, procurement, and operations across whatever systems you operate, with provenance on chain.',
    solves: 'Small teams get the output of a much larger one as agents run real work safely. Enterprises automate across departments without losing control, since every agent acts only within set policy.',
    delivered: 'Delivered as: agents under policy, managed end to end',
  },
  {
    label: 'MODEL 03',
    title: 'Data provenance for AI',
    description: 'Anchor data lineage and model decisions on chain for audit, FDA, and supply-chain compliance. Strong fit for FHIR and EDI traceability.',
    solves: 'Businesses prove where their data and AI outputs came from instead of taking it on faith. Enterprises pass audits and regulatory reviews faster, with lineage already recorded and tamper-proof.',
    delivered: 'Delivered as: provenance per data stream, audit-ready',
  },
  {
    label: 'MODEL 04',
    title: 'Decentralized AI gateway',
    description: 'Clients tap multiple AI and compute services through your API gateway, billed and settled programmatically. The buyer never touches a token.',
    solves: 'Businesses avoid lock-in to a single AI vendor and route to the best model for each job. Enterprises get one governed, billable entry point to many AI services, with no crypto complexity for users.',
    delivered: 'Delivered as: one gateway, fully managed for you',
  },
  {
    label: 'MODEL 05',
    title: 'Robotics machine economy',
    description: 'Partner robots and line controls transact and log completed work on chain, paying for services and proving output, industrial DePIN done right.',
    solves: 'Businesses get machines that prove the work they did, not just claim it. Enterprises can let fleets and lines transact and settle autonomously, with a verifiable record of every unit of output.',
    delivered: 'Delivered as: machines wired in and proving work',
  },
  {
    label: 'MODEL 06',
    title: 'Compliance as code',
    description: 'Regulatory and operational workflows enforced by smart contracts that will not settle unless your conditions are met and recorded, across any industry or standard.',
    solves: 'Businesses stop relying on people to remember the rules, the rules enforce themselves. Enterprises turn compliance from a costly manual burden into automatic, provable controls that cannot be skipped.',
    delivered: 'Delivered as: rules enforced per compliance domain',
  },
];

// CONSISTENCY FIX (cross-page audit pass): this was flipped to a light
// section in an earlier round specifically to avoid three dark
// sections in a row with TwoIdeas and Traceability as neighbors. That
// reasoning no longer holds — Traceability moved to its own dedicated
// page in Round 21, and TwoIdeas itself flipped to white in Round 23
// (Layer Page item 9, an explicit edit-doc instruction). The result was
// a NEW problem this round's audit caught: WhyDecentralized -> TwoIdeas
// -> SixWays now ran three white sections in a row at the end of
// /layer. Flipped back to dark to close the page on a proper beat,
// using the standard dark .card / .card--highlight treatment already
// established elsewhere instead of the light-section card styling.
export const SixWays = () => {
  return (
    <section id="six-ways" className="section">
      <div className="wrap">
        <RevealOnScroll>
        <div className="sec-header max-w-2xl">
          <span className="eyebrow-plain">HOW WE ENGAGE</span>
          <h2 className="sec-title">Six ways to put the layer to work.</h2>
          <p className="sec-sub">
            Each one solves a specific problem and scales as you grow. Start with a
            single workflow, expand across systems when you are ready. You pay for the
            outcome, never the blockchain.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model.label}
              className="card card--highlight-on-hover flex flex-col"
            >
              <span className="tag-mono tag-mono--accent">{model.label}</span>
              <h4 className="text-white font-bold text-lg mt-3 mb-3">{model.title}</h4>
              <p className="text-ink_text-secondary text-base leading-relaxed mb-4">
                {model.description}
              </p>
              <div className="text-base leading-relaxed mb-5 pt-4 border-t border-ink-border">
                <span className="font-bold text-white">Solves for you: </span>
                <span className="text-ink_text-secondary">{model.solves}</span>
              </div>
              <p className="tag-mono tag-mono--accent !normal-case !text-[11px] leading-snug mt-auto">
                {model.delivered}
              </p>
            </div>
          ))}
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
