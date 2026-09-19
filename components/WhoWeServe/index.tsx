import React, { useState } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import {
  UserIcon,
  BuildingStorefrontIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

// CONTENT RESTORATION (sitewide content-completeness scan): every
// segment here was missing its entire "What we do for you:" block —
// not trimmed text, a whole piece of content absent from all 6 cards.
// The reference makes each row expandable (a "+" toggle revealing this
// text); restored both the content and the expand/collapse behavior,
// using useState the same way other expandable content already does
// elsewhere on the site rather than inventing a new pattern.
const segments = [
  {
    title: 'Individuals & creators',
    description: 'Solo founders and professionals who want AI, automation, and verifiable records without a big team or budget.',
    solves: 'We set you up with personal AI and automation you fully control, plus tamper-proof records of your work, so you can move like a bigger operation while keeping your data private and your costs low.',
    Icon: UserIcon,
  },
  {
    title: 'Small business',
    description: 'Shops, clinics, and local operators who want to connect their tools and prove their work, simply.',
    solves: 'We connect the tools you already use and add AI agents that handle the busywork, so you spend less time on admin and can prove your work to customers and regulators without extra effort.',
    Icon: BuildingStorefrontIcon,
  },
  {
    title: 'Startups & scale-ups',
    description: 'Fast-moving teams that need integration and AI agents that grow with them, not against them.',
    solves: 'We wire your stack together and deploy AI agents that scale as you grow, so you ship faster, avoid technical debt, and keep a verifiable record investors and partners can trust.',
    Icon: RocketLaunchIcon,
  },
  {
    title: 'Enterprise',
    description: 'Large organizations wiring many systems, machines, and AI into one auditable, compliant whole.',
    solves: 'We integrate your many systems, machines, and AI under one verifiable layer with policy controls and full audit trails, so you get automation at scale without losing compliance or control.',
    Icon: BuildingOffice2Icon,
  },
  {
    title: 'Capital projects & programs',
    description: 'Owners, contractors, and program offices that need schedules, cost, and earned value they can defend.',
    solves: 'We build and maintain the CPM schedule, run earned value against a controlled baseline, and automate reporting from your live cost and progress data, so status is measured instead of estimated and every revision is traceable.',
    Icon: BriefcaseIcon,
  },
  {
    title: 'Hospitals & clinics',
    description: 'Care providers connecting clinical systems and records, with patient data kept private and every action verifiable.',
    solves: 'We connect your clinical systems and records, add AI that assists care under strict privacy rules, and anchor every action to a tamper-proof trail, so coordination improves and compliance is provable.',
    Icon: HeartIcon,
  },
];

// STYLE FIX (Layer Page item 6): corrected this round. Previously
// mirrored the EDI-grid pattern from the AI page; the edit doc's own
// reference for this specific section (images 18/19) is actually the
// Blockchain page's "Benefits" band — a full-width purple-to-orange
// diagonal gradient, heading + subhead on the left, a vertical list of
// icon + text rows on the right with thin divider lines between them,
// white text and icons throughout. The edit doc is the more explicit,
// authoritative source for this named section, so it wins over the
// earlier general-purpose mirroring example.
export const WhoWeServe = () => {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section
      id="who-we-serve"
      className="relative overflow-hidden py-[50px] lg:py-[100px]"
      // COLOR FIX: the 55%-stop brown (#7A2A0A) isn't a brand color at
      // all — it's what you get from a naive purple→orange interpolation
      // through RGB space, and it read as a muddy, unintentional-looking
      // smear rather than a deliberate two-tone blend. The edit doc's own
      // reference calls for a "purple-to-orange diagonal gradient" — a
      // clean two-stop blend of the two real brand colors, not a third
      // invented one in between.
      style={{ background: 'linear-gradient(135deg, #16003B 0%, #FF6100 100%)' }}
    >
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
        <RevealOnScroll>
        <div>
          <span className="text-xs font-bold tracking-tag uppercase text-white block mb-4">
            WHO WE SERVE
          </span>
          <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-5">
            Not just for enterprises.
          </h2>
          <p className="text-white text-[20px] font-normal leading-relaxed">
            The same verifiable layer scales to fit you, whether you are one person
            with an idea or a global company with a thousand systems. You start where
            you are and grow from there.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="flex flex-col">
          {segments.map((seg, i) => {
            const isOpen = openTitle === seg.title;
            return (
              <div
                key={seg.title}
                className={`py-6 ${i < segments.length - 1 ? 'border-b border-white/20' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenTitle(isOpen ? null : seg.title)}
                  className="flex items-start gap-5 w-full text-left"
                >
                  <seg.Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-white font-bold mb-1">{seg.title}</h4>
                      <span className="text-white text-xl leading-none flex-shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    <p className="text-white text-base leading-relaxed">{seg.description}</p>
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-white/15 text-base leading-relaxed">
                        <span className="font-bold text-white">What we do for you: </span>
                        <span className="text-white">{seg.solves}</span>
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

      {/* MISSING CLOSING LINE, restored — was absent entirely. */}
      {/* ALIGNMENT FIX (client QA, Layer page #4): "The last sentence
          should be moved to the left side of the screen or aligned
          with the list to the right." This was centered across the
          full section width, floating with no relationship to
          anything above it. Reused the same lg:grid-cols-[1fr_1.4fr]
          column template as the row above, with an empty left cell,
          so the sentence lines up under the segment list on the
          right and left-aligns within that column instead of sitting
          dead-center under the whole section. */}
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mt-16">
        <div aria-hidden="true" className="hidden lg:block" />
        <p className="text-white text-base max-w-2xl">
          If you run a system, a process, or an idea, there is a version of this layer
          sized for you.
        </p>
      </div>
    </section>
  );
};
