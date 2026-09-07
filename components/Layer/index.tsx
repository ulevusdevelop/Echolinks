import React, { useState } from 'react';

export type LayerStep = {
  number: string;
  title: string;
  description: string;
  tag: string;
  whatWeDo: string;
  whatItSolves: string;
  highlight?: boolean;
};

const steps: LayerStep[] = [
  {
    number: '01',
    title: 'Your systems',
    description: 'Every system, application, machine, and data source you run today, exactly as it runs, connected as one.',
    tag: 'SYSTEMS OF RECORD',
    whatWeDo: 'We map and connect everything you already run, no matter how old or mixed, into one place we can work with.',
    whatItSolves: 'Your tools stop living in silos. Nothing gets ripped out or replaced, so you keep what works and finally see it all together.',
  },
  {
    number: '02',
    title: 'Integration fabric',
    description: 'API gateways and event-driven middleware connect every system. No rip and replace.',
    tag: 'EDI · API · BOOMI',
    whatWeDo: 'We connect your APIs, EDI feeds, and event-driven middleware so every system talks to every other system in real time.',
    whatItSolves: 'No more manual re-entry or brittle point-to-point connections. One integration layer replaces a tangle of one-off scripts.',
  },
  {
    number: '03',
    title: 'Decentralized AI & agents',
    description: 'AI agents with constrained authority read your data and act across your systems, driving transactions, document exchange, procurement, and inventory under policy controls.',
    tag: 'AGENTIC EXECUTION',
    whatWeDo: 'We deploy AI agents with scoped, policy-controlled authority to act inside your systems, not just answer questions about them.',
    whatItSolves: 'Work that used to need a human copying data between screens now runs itself, with every action logged and reviewable.',
  },
  {
    number: '04',
    title: 'Automation & robotics',
    description: 'Robots, fleets, and line controls transact and log completed work autonomously, paying for services and proving output without a human in the loop.',
    tag: 'MACHINE ECONOMY',
    whatWeDo: 'We wire robots, fleets, and line controls into the same layer so completed work is logged and verified automatically.',
    whatItSolves: 'You stop taking output on faith. Every unit of work is provable, not just reported.',
  },
  {
    number: '05',
    title: 'Blockchain trust layer',
    description: 'Every AI decision, agent action, and machine transaction is cryptographically logged and independently verifiable. Audit-ready by design.',
    tag: 'VERIFIABLE · IMMUTABLE',
    whatWeDo: 'Every decision, agent action, and machine transaction gets cryptographically logged and anchored on chain.',
    whatItSolves: 'When an auditor, regulator, or customer asks you to prove it, you can, instantly, without digging through logs that could have been altered.',
    highlight: true,
  },
];

export const Layer = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="layer" className="section">
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2 className="sec-title">One layer. Five jobs. Verifiable end to end.</h2>
          <p className="sec-sub sec-sub--center">
            Five jobs that usually live in five different tools. Echolink brings them
            together into one layer and connects them through deep integration work.{' '}
            <span className="text-accent-light">
              Click any layer to see what we do and what it solves.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {steps.map((step) => {
            const isOpen = openId === step.number;
            return (
              <div
                key={step.number}
                className={`card transition-all ${
                  step.highlight ? 'card--highlight' : ''
                } ${isOpen ? '!border-accent' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(step.number)}
                  className="w-full text-left flex items-start md:items-center gap-6"
                >
                  <span className="number-badge">{step.number}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-white font-bold text-lg mb-2">
                      {step.title}
                    </span>
                    <span className="block text-ink_text-secondary text-sm leading-relaxed max-w-2xl">
                      {step.description}
                    </span>
                  </span>
                  <span
                    className={`hidden md:block tag-mono ${
                      step.highlight ? 'tag-mono--accent' : ''
                    }`}
                  >
                    {step.tag}
                  </span>
                  <span
                    className={`text-xl leading-none flex-shrink-0 transition-transform ${
                      step.highlight ? 'text-accent' : 'text-accent-light'
                    } ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="bg-ink-900 rounded-lg p-5 border border-ink-border">
                      <p className="text-sm leading-relaxed text-ink_text-secondary">
                        <span className="text-accent-light font-bold">What we do:</span>{' '}
                        {step.whatWeDo}
                      </p>
                    </div>
                    <div className="bg-ink-900 rounded-lg p-5 border border-ink-border">
                      <p className="text-sm leading-relaxed text-ink_text-secondary">
                        <span className="text-accent-light font-bold">What it solves:</span>{' '}
                        {step.whatItSolves}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
