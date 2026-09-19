import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

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
  // HEADER CLEARANCE FIX: this component is only ever used as the
  // first section on /how-it-works, which previously wrapped it in a
  // plain, backgroundless "pt-44" div for header clearance — that
  // div's gap showed the page's own dark-purple default background
  // through it, before this section's actual white background began,
  // reading as an empty purple strip right under the navbar. Moved the
  // clearance padding onto this section directly instead, so the white
  // background itself extends up into that space with no gap/color-
  // mismatch possible.
  return (
    <section id="process" className="section--light !pt-44">
      <div className="wrap">
      <RevealOnScroll>
        {/* LABEL FIX (content-completeness scan): this eyebrow was
            "HOW WE ENGAGE" — but per the reference, that phrase belongs
            to the Six Ways section (id="models" there), not this one.
            This section's own id in the reference is "process" with
            eyebrow "How does it work" — confirmed by this very
            component's own file comment, which says it was "MIRRORED
            from the old homepage's 'How does it work?' section."
            Corrected the label; SixWays already carries "HOW WE ENGAGE"
            correctly as of this same round. */}
        <span className="eyebrow-plain--dark">HOW DOES IT WORK</span>

        {/* OVERFLOW FIX (direct instruction): the decorative squares
            below were already positioned outside the photo's own
            clipping wrapper (see that inner overflow-hidden div), but
            this OUTER grid container also had overflow-hidden on it —
            a second, further-out clip that caught the squares anyway
            even though they'd escaped the first one. Removed it here:
            --radius-card is 0px sitewide now (the "no radius" rule),
            so this overflow-hidden wasn't actually protecting any
            rounded corners anymore — nothing depends on it, safe to
            drop so the squares can genuinely float past the photo's
            edges as intended. */}
        <div className="grid md:grid-cols-[1fr_1fr_1.4fr] gap-[10px] rounded-card mt-6">
          {/* Photo column */}
          <div className="relative overflow-visible min-h-[280px]" style={{ background: '#16003B' }}>
            <div className="absolute inset-0 overflow-hidden">
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
            </div>
            {/* SIZE FIX (direct feedback, sized up again this round on
                top of the earlier increases): kept genuinely different
                sizes from each other and nudged inward from the left
                edge rather than sitting flush against it. */}
            <span
              className="absolute -top-8 left-9 w-14 h-14 hidden md:block z-10"
              style={{ background: '#FF6100' }}
              aria-hidden="true"
            />
            <span
              className="absolute top-5 left-[72px] w-[72px] h-[72px] hidden md:block z-10"
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
              <p className="text-white/85 text-base leading-relaxed">
                Every engagement runs the same way, whether it is decentralized AI,
                robotics, traceability, or project controls. It starts with the
                decision you need to trust, not with a platform we want to sell you.
              </p>
            </div>
            <span className="w-11 h-11 rounded-full bg-white text-[#16003B] flex items-center justify-center text-lg font-bold mt-8">
              ?
            </span>
          </div>

          {/* Steps, stacked in one column */}
          <div className="bg-ink-800 p-8 md:p-10 flex flex-col gap-8">
            {/* TYPOGRAPHY FIX — exact values from the live site
                (blueprint), corrected further this round: the step
                label was wrongly set to JetBrains Mono before — the
                blueprint specifies Syne for this element too, not the
                monospace font used for tags/eyebrows elsewhere.
                Responsive breakpoints added (both label and title now
                step down at max-width 1024px, matching the blueprint's
                own media query, not just a single flat size). */}
            {steps.map((step) => (
              <div key={step.label}>
                <span
                  className="block max-lg:!text-[13px] max-lg:!leading-[1.2]"
                  // CLIENT QA FIX ("titles in orange color look
                  // stretched"): Syne has no real 900 weight, only up
                  // to 800/ExtraBold is loaded — 900 was being faux-
                  // bolded/distorted by the browser. Corrected to 800.
                  style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '14px', fontWeight: 800, lineHeight: '34px', color: '#FF6100', textTransform: 'uppercase' }}
                >
                  {step.label}
                </span>
                <h3
                  className="mb-2 max-lg:!text-[30px] max-lg:!leading-[1.2]"
                  style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '33px', fontWeight: 600, lineHeight: '34px', color: '#FFFEFF' }}
                >
                  {step.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 400, lineHeight: '23px', color: '#FFFFFF' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CLIENT QA FIX: "the action button 'START WITH ONE WORKFLOW'
            takes people to let's talk. It should direct people to one
            of the animated section." Was a Link to /contact — points
            to the animated "Two ideas, drawn simply" diagram section
            (id="see-it-clearly") right below this one on the same
            page instead, via a same-page anchor (smooth-scroll is set
            globally on <html>). */}
        <div className="mt-10">
          <Link href="#see-it-clearly" className="btn btn--primary">
            Start with one workflow →
          </Link>
        </div>
      </RevealOnScroll>
      </div>
    </section>
  );
};
