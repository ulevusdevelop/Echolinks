import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  { label: 'STEP ONE', title: 'Diagnose', description: 'Echolink Solutions maps how your business actually runs, which systems hold the truth, and which decisions you would struggle to prove today. You get a clear read on the gap before anyone writes a line of code or a line of schedule logic.' },
  { label: 'STEP TWO', title: 'Develop', description: 'Then Echolink Solutions builds it around your processes and wires it to the trust layer. Systems connected, agents deployed under policy, machines reporting real output, schedules and earned value running on live data. Nothing gets ripped out.' },
  { label: 'STEP THREE', title: 'Deploy', description: 'Once it is live, Echolink Solutions trains your people to run it and stays with it. Support, updates, and expansion as you grow, with every decision, action, and change anchored so it stays provable.' },
];

// MIRRORED from the old homepage's "How does it work?" section — three
// columns: a duotone photo, a solid-orange panel carrying the section's
// own heading + subhead + a circular "?" badge, then the steps stacked
// in a single column (not a 3-up card grid, which is what this section
// used previously). The section's heading/subhead now live inside the
// orange panel itself, same as the reference, instead of a separate
// centered header above the layout.
//
// `headingLevel` fixes a real heading-hierarchy gap found during a
// sitewide h1 audit: this component is used on two pages with two
// different semantic contexts — standalone on /how-it-works (where its
// heading needs to be the page's h1, since nothing else provides one)
// and as one of many sections on /layer (where Layer's own component
// already supplies the page's h1, so this needs to stay subordinate).
// Defaults to 'h3' (the /layer context) since that's the more common
// usage; /how-it-works passes 'h1' explicitly.
export const ThreeSteps = ({ headingLevel = 'h3' }: { headingLevel?: 'h1' | 'h3' }) => {
  const Heading = headingLevel;
  return (
    <section id="how-we-engage" className="section--light">
      <div className="wrap">
        <span className="eyebrow-plain--dark">HOW WE ENGAGE</span>

        <div className="grid md:grid-cols-[1fr_1fr_1.4fr] rounded-card overflow-hidden mt-6">
          {/* Photo column */}
          <div className="relative overflow-hidden min-h-[280px]" style={{ background: '#16003B' }}>
            <Image
              src="https://picsum.photos/seed/echolink-engage/500/600"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
              unoptimized
            />
            <div
              className="absolute inset-0 mix-blend-color"
              style={{ background: '#16003B' }}
              aria-hidden="true"
            />
            {/* Two-tone decorative squares at the photo's top-left
                corner — the reference shows both an orange square
                (upper) and a navy square (lower, overlapping), not
                just one. */}
            <span
              className="absolute -top-4 left-6 w-6 h-6 hidden md:block z-10"
              style={{ background: '#FF6100' }}
              aria-hidden="true"
            />
            <span
              className="absolute top-2 left-10 w-8 h-8 hidden md:block"
              style={{ background: '#16003B' }}
              aria-hidden="true"
            />
          </div>

          {/* Orange panel — carries the section heading */}
          <div
            className="relative flex flex-col justify-between p-8 md:p-10 min-h-[260px]"
            style={{ background: '#FF6100' }}
          >
            <div>
              <Heading className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
                Three steps. Diagnose, develop, deploy.
              </Heading>
              <p className="text-white/85 text-sm leading-relaxed">
                Every engagement runs the same way, whether it is decentralized AI,
                robotics, traceability, or project controls.
              </p>
            </div>
            <span className="w-11 h-11 rounded-full bg-white text-[#16003B] flex items-center justify-center text-lg font-bold mt-8">
              ?
            </span>
          </div>

          {/* Steps, stacked in one column */}
          <div className="bg-ink-800 p-8 md:p-10 flex flex-col gap-8">
            {steps.map((step) => (
              <div key={step.label}>
                <span className="tag-mono tag-mono--accent">{step.label}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-2">{step.title}</h3>
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
