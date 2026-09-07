import React from 'react';
import Link from 'next/link';

const steps = [
  { label: 'STEP ONE', title: 'Diagnose', description: 'Echolink Solutions maps how your business actually runs, which systems hold the truth, and which decisions you would struggle to prove today. You get a clear read on the gap before anyone writes a line of code or a line of schedule logic.' },
  { label: 'STEP TWO', title: 'Develop', description: 'Then Echolink Solutions builds it around your processes and wires it to the trust layer. Systems connected, agents deployed under policy, machines reporting real output, schedules and earned value running on live data. Nothing gets ripped out.' },
  { label: 'STEP THREE', title: 'Deploy', description: 'Once it is live, Echolink Solutions trains your people to run it and stays with it. Support, updates, and expansion as you grow, with every decision, action, and change anchored so it stays provable.' },
];

export const ThreeSteps = () => {
  return (
    // Light band, matching Good Design: this section sits on the same
    // cream background as CapabilitiesIntro right above it, not the dark
    // page background — confirmed against Good Design.pdf, where the
    // orange+navy split card floats on white/cream, not on a dark section.
    <section className="section--light">
      <div className="wrap">
        <div className="sec-header max-w-xl mx-auto text-center">
          <span className="eyebrow--dark">HOW WE ENGAGE</span>
          <h2 className="sec-title--dark">Three steps. Diagnose, develop, deploy.</h2>
          <p className="sec-sub--dark sec-sub--center">
            Every engagement runs the same way, whether it is decentralized AI,
            robotics, traceability, or project controls. It starts with the decision
            you need to trust, not with a platform we want to sell you.
          </p>
        </div>

        {/* The old site's boldest color device: a full solid-orange panel
            carrying real weight in the layout, not a tiny accent. Restored
            here as the anchor for the three steps, with the same small
            "?" circle badge the original used. */}
        <div className="grid md:grid-cols-[280px_1fr] rounded-card overflow-hidden">
          <div
            className="relative flex flex-col justify-between p-8 md:p-10 min-h-[260px] md:min-h-full"
            style={{ background: '#FF6000' }}
          >
            <div>
              <span className="text-[#180F39] font-mono text-xs font-bold tracking-tag uppercase block mb-3">
                Every engagement, same shape
              </span>
              <h3 className="text-[#180F39] text-2xl md:text-3xl font-bold leading-tight">
                One process. No platform pitch. Just the decision you need to trust.
              </h3>
            </div>
            <span className="w-11 h-11 rounded-full bg-[#180F39] text-[#FF6000] flex items-center justify-center text-lg font-bold mt-8">
              ?
            </span>
          </div>

          <div className="bg-ink-800 grid sm:grid-cols-3 gap-px">
            {steps.map((step) => (
              <div key={step.label} className="bg-ink-800 p-6 md:p-7 flex flex-col">
                <span className="tag-mono tag-mono--accent">{step.label}</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-4">{step.title}</h3>
                <p className="text-ink_text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link href="/contact" className="btn btn--primary">
            Start with one workflow →
          </Link>
        </div>
      </div>
    </section>
  );
};
