import React, { useState, useRef } from 'react';

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

// STYLE FIX (Layer Page item 2): mirrored from the old site's
// /automation page accordion — rows are sharp-cornered (no
// border-radius), WHITE background boxes with a thin gray border, dark
// navy text, instead of the previous dark purple `.card` treatment.
// Previously these rows already had a working "+" expand and click
// handler; only the color/shape treatment was wrong, not the
// behavior — kept the interaction, changed the surface.
export const Layer = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  // Makes the "Click any layer..." sentence itself an actual trigger
  // (item 2: "Ensure that the statement... is clickable"), not just
  // descriptive text next to clickable rows below it.
  const openFirstRow = () => {
    setOpenId(steps[0].number);
    firstRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="layer" className="section">
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow-plain">HOW IT WORKS</span>
          <h1 className="sec-title">One layer. Five jobs. Verifiable end to end.</h1>
          <p className="sec-sub sec-sub--center">
            Five jobs that usually live in five different tools. Echolink brings them
            together into one layer and connects them through deep integration work.{' '}
            <button
              type="button"
              onClick={openFirstRow}
              className="text-accent-light underline underline-offset-2 hover:text-accent"
            >
              Click any layer to see what we do and what it solves.
            </button>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {steps.map((step, i) => {
            const isOpen = openId === step.number;
            return (
              <div
                key={step.number}
                ref={i === 0 ? firstRowRef : undefined}
                className={`bg-white rounded-none border transition-all ${
                  step.highlight ? 'border-l-4' : 'border-[#E5E5E5]'
                } ${isOpen ? 'border-[#FF6100]' : ''}`}
                style={step.highlight ? { borderLeftColor: '#FF6100' } : undefined}
              >
                <button
                  type="button"
                  onClick={() => toggle(step.number)}
                  className="w-full text-left flex items-start md:items-center gap-6 p-6 md:p-7"
                >
                  <span
                    className="flex-shrink-0 w-12 h-12 rounded-none border flex items-center justify-center font-mono font-bold text-sm"
                    style={{ borderColor: '#16003B', color: '#FF6100' }}
                  >
                    {step.number}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-lg mb-2" style={{ color: '#16003B' }}>
                      {step.title}
                    </span>
                    <span className="block text-[#434343] text-sm leading-relaxed max-w-2xl">
                      {step.description}
                    </span>
                  </span>
                  <span
                    className="hidden md:block font-mono text-xs tracking-tag uppercase"
                    style={{ color: step.highlight ? '#FF6100' : '#707070' }}
                  >
                    {step.tag}
                  </span>
                  <span
                    className={`text-2xl leading-none flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    style={{ color: '#FF6100' }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-7 pb-7 flex flex-col gap-3">
                    <div className="bg-[#F7F7F9] rounded-none p-5 border border-[#E5E5E5]">
                      <p className="text-sm leading-relaxed text-[#434343]">
                        <span className="font-bold" style={{ color: '#FF6100' }}>What we do:</span>{' '}
                        {step.whatWeDo}
                      </p>
                    </div>
                    <div className="bg-[#F7F7F9] rounded-none p-5 border border-[#E5E5E5]">
                      <p className="text-sm leading-relaxed text-[#434343]">
                        <span className="font-bold" style={{ color: '#FF6100' }}>What it solves:</span>{' '}
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
