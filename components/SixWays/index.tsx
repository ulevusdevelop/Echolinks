import React from 'react';

const models = [
  { label: 'MODEL 01', title: 'Verifiable AI integration', description: 'You sit between your systems and AI agents, with blockchain as the audit layer.', delivered: 'Delivered as: integration build, then ongoing assurance', highlight: true },
  { label: 'MODEL 02', title: 'Agentic systems orchestration', description: 'AI agents with constrained authority run transactions across your systems.', delivered: 'Delivered as: agents under policy, managed end to end' },
  { label: 'MODEL 03', title: 'Data provenance for AI', description: 'Anchor data lineage and model decisions on chain for audit compliance.', delivered: 'Delivered as: provenance per data stream, audit-ready' },
  { label: 'MODEL 04', title: 'Decentralized AI gateway', description: 'Clients tap multiple AI and compute services through your API gateway.', delivered: 'Delivered as: one gateway, fully managed for you' },
  { label: 'MODEL 05', title: 'Robotics machine economy', description: 'Partner robots and line controls transact and log completed work on chain.', delivered: 'Delivered as: machines wired in and proving work' },
  { label: 'MODEL 06', title: 'Compliance as code', description: 'Regulatory workflows enforced by smart contracts.', delivered: 'Delivered as: rules enforced per compliance domain' },
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
        <div className="sec-header max-w-xl">
          <h2 className="sec-title">Six ways to put the layer to work.</h2>
          <p className="sec-sub">
            Each one solves a specific problem and scales as you grow. Start with a
            single workflow, expand across systems when you are ready. You pay for the
            outcome, never the blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model.label}
              className={`card ${model.highlight ? 'card--highlight' : ''}`}
            >
              <span className="tag-mono tag-mono--accent">{model.label}</span>
              <h4 className="text-white font-bold text-lg mt-3 mb-3">{model.title}</h4>
              <p className="text-ink_text-secondary text-sm leading-relaxed mb-5">
                {model.description}
              </p>
              <p className="tag-mono tag-mono--accent !normal-case !text-[11px] leading-snug">
                {model.delivered}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
