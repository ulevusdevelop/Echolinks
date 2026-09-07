import React from 'react';

const models = [
  { label: 'MODEL 01', title: 'Verifiable AI integration', description: 'You sit between your systems and AI agents, with blockchain as the audit layer.', delivered: 'Delivered as: integration build, then ongoing assurance', highlight: true },
  { label: 'MODEL 02', title: 'Agentic systems orchestration', description: 'AI agents with constrained authority run transactions across your systems.', delivered: 'Delivered as: agents under policy, managed end to end' },
  { label: 'MODEL 03', title: 'Data provenance for AI', description: 'Anchor data lineage and model decisions on chain for audit compliance.', delivered: 'Delivered as: provenance per data stream, audit-ready' },
  { label: 'MODEL 04', title: 'Decentralized AI gateway', description: 'Clients tap multiple AI and compute services through your API gateway.', delivered: 'Delivered as: one gateway, fully managed for you' },
  { label: 'MODEL 05', title: 'Robotics machine economy', description: 'Partner robots and line controls transact and log completed work on chain.', delivered: 'Delivered as: machines wired in and proving work' },
  { label: 'MODEL 06', title: 'Compliance as code', description: 'Regulatory workflows enforced by smart contracts.', delivered: 'Delivered as: rules enforced per compliance domain' },
];

export const SixWays = () => {
  return (
    // Converted to a light band — was the middle of three dark sections
    // in a row (TwoIdeas -> SixWays -> Traceability), which read as
    // monotonous compared to Good Design's alternating rhythm. Plain
    // content grid with no dark-dependent visuals, so a clean candidate
    // to flip using the same light-section pattern as CapabilitiesIntro.
    <section id="six-ways" className="section--light">
      <div className="wrap">
        <div className="sec-header max-w-xl">
          <h2 className="sec-title--dark">Six ways to put the layer to work.</h2>
          <p className="sec-sub--dark">
            Each one solves a specific problem and scales as you grow. Start with a
            single workflow, expand across systems when you are ready. You pay for the
            outcome, never the blockchain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model) => (
            <div
              key={model.label}
              className="rounded-card p-8 border"
              style={
                model.highlight
                  ? {
                      background: 'rgba(255,96,0,0.08)',
                      borderColor: 'var(--accent)',
                    }
                  : {
                      background: '#FFFFFF',
                      borderColor: 'rgba(24,15,57,0.12)',
                    }
              }
            >
              <span className="tag-mono tag-mono--accent">{model.label}</span>
              <h4 className="text-[#180F39] font-bold text-lg mt-3 mb-3">{model.title}</h4>
              <p className="text-[#434343] text-sm leading-relaxed mb-5">
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
