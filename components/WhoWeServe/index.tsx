import React from 'react';
import {
  UserIcon,
  BuildingStorefrontIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const segments = [
  { title: 'Individuals & creators', description: 'Solo founders and professionals who want AI, automation, and verifiable records without a big team or budget.', Icon: UserIcon },
  { title: 'Small business', description: 'Shops, clinics, and local operators who want to connect their tools and prove their work, simply.', Icon: BuildingStorefrontIcon },
  { title: 'Startups & scale-ups', description: 'Fast-moving teams that need integration and AI agents that grow with them, not against them.', Icon: RocketLaunchIcon },
  { title: 'Enterprise', description: 'Large organizations wiring many systems, machines, and AI into one auditable, compliant whole.', Icon: BuildingOffice2Icon },
  { title: 'Capital projects & programs', description: 'Owners, contractors, and program offices that need schedules, cost, and earned value they can defend.', Icon: BriefcaseIcon },
  { title: 'Hospitals & clinics', description: 'Care providers connecting clinical systems and records, with patient data kept private and every action verifiable.', Icon: HeartIcon },
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
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
        <div>
          <span className="font-mono text-xs font-bold tracking-tag uppercase text-white/70 block mb-4">
            WHO WE SERVE
          </span>
          <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-5">
            Not just for enterprises.
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            The same verifiable layer scales to fit you, whether you are one person
            with an idea or a global company with a thousand systems. You start where
            you are and grow from there.
          </p>
        </div>

        <div className="flex flex-col">
          {segments.map((seg, i) => (
            <div
              key={seg.title}
              className={`flex items-start gap-5 py-6 ${
                i < segments.length - 1 ? 'border-b border-white/20' : ''
              }`}
            >
              <seg.Icon className="w-6 h-6 text-white flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <h4 className="text-white font-bold mb-1">{seg.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{seg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
