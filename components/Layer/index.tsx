import React, { useState, useRef } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

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

// STYLE FIX (direct request): "Similar to how you built the section for
// WHO WE SERVE... I want you to do the same thing for the very first
// section on that page [the Layer page]." Rebuilt entirely to match
// WhoWeServe's specific pattern: the same purple-to-orange diagonal
// gradient background, the same 2-column layout (intro text left, an
// expandable list right), and the same click-to-expand "+/−" row
// behavior with white/80 text throughout — replacing the previous
// white-card accordion styling (itself mirrored from the old site's
// /automation page) with this different, now-requested treatment.
export const Layer = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const openFirstRow = () => {
    setOpenId(steps[0].number);
    firstRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      id="layer"
      className="relative overflow-hidden py-[50px] lg:py-[100px]"
      // BACKGROUND CHANGED (direct feedback): "you have done well but i
      // will like a different background" — was the same purple-to-
      // orange diagonal gradient as WhoWeServe; switched to a solid
      // dark purple instead, keeping everything else about the
      // WhoWeServe-style layout (2-column, expandable list, white/80
      // text) exactly as it was.
      style={{ background: '#16003B' }}
    >
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <RevealOnScroll>
          <span className="text-xs font-bold tracking-tag uppercase text-white block mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-5">
            One layer. Five jobs. Verifiable end to end.
          </h2>
          <p className="text-white/80 text-[20px] font-normal leading-relaxed">
            Five jobs that usually live in five different tools. Echolink brings them
            together into one layer and connects them through deep integration work.{' '}
            <button
              type="button"
              onClick={openFirstRow}
              className="text-white underline underline-offset-2 font-semibold hover:text-[#16003B]"
            >
              Click any layer to see what we do and what it solves.
            </button>
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isOpen = openId === step.number;
            return (
              <div
                key={step.number}
                ref={i === 0 ? firstRowRef : undefined}
                className={`py-6 ${i < steps.length - 1 ? 'border-b border-white/20' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(step.number)}
                  className="flex items-start gap-5 w-full text-left"
                >
                  <span className="font-bold text-sm text-white flex-shrink-0 mt-0.5 w-8">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-white font-bold mb-1">{step.title}</h4>
                      <span className="text-white/70 text-xl leading-none flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-white/15 flex flex-col gap-3 text-sm leading-relaxed">
                        <p>
                          <span className="font-bold text-white">What we do: </span>
                          <span className="text-white/80">{step.whatWeDo}</span>
                        </p>
                        <p>
                          <span className="font-bold text-white">What it solves: </span>
                          <span className="text-white/80">{step.whatItSolves}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
