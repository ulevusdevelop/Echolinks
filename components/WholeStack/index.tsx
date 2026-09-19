import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const rows = [
  { label: 'Enterprise integration', value: 'EDI, APIs, ERP, WMS, MES, SCADA, HL7/FHIR.' },
  { label: 'Decentralized AI', value: 'We handle decentralized AI and agentic execution.' },
  { label: 'Automation & robotics', value: 'Machines wired in and proving their work.' },
  { label: 'Blockchain trust', value: 'Verifiable, audit-ready provenance.' },
];

// Third distinct light treatment: a horizontal spec-sheet strip rather
// than either the asymmetric text layout (CapabilitiesIntro) or the
// numbered editorial list (WhyDecentralized). Calmest content on the
// Layer page, so it gets the calmest, most technical-reads-as-precise
// presentation.
//
// LAYOUT EXPERIMENT (direct feedback: "sections feel like stacked
// blocks, not designed" — specifically about the Layer page): the
// closing "One layer" pill used to sit neatly inside this section's own
// padding, ending cleanly before NotACryptoPlay's dark section began
// equally cleanly below it — two self-contained rectangles with no
// compositional relationship. Turned that pill into a genuinely bigger
// card and let it physically straddle the boundary between the two
// sections (absolutely positioned, translated half its height below
// this section's bottom edge), so there's real depth/layering at this
// one transition instead of a flat stack. `overflow-hidden` removed
// from this section specifically — it would otherwise clip the card
// at exactly the point it's supposed to cross. `z-10` on the section
// is what lets the overlapping card paint above NotACryptoPlay's
// background (a later sibling) instead of being covered by it.
export const WholeStack = () => {
  return (
    <section id="whole-stack" className="relative z-10 bg-[#FFFFFF] py-[50px] lg:py-[100px]">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute top-6 right-6 w-28 h-28 pointer-events-none hidden lg:block opacity-70"
        aria-hidden="true"
      >
        <path
          d="M10 30 C 90 10, 150 60, 120 140"
          stroke="#FF6100"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M108 132 l14 10 l-18 8 Z" fill="#FF6100" />
      </svg>

      <div className="wrap relative">
        <RevealOnScroll>
        <div className="max-w-2xl mb-14">
          <span className="tag-mono !text-[#FF6100] mb-4 inline-block">
            THE CATEGORY WE OWN
          </span>
          <h2 className="text-[#16003B] font-bold text-3xl md:text-4xl leading-tight mb-5">
            The whole stack, assembled into one layer.
          </h2>
          <p className="text-[#4A4560] text-[20px] font-normal leading-relaxed">
            The market today is specialized: strong AI agent platforms, capable
            blockchain builders, deep integration providers, each excellent at
            their piece. The opportunity is bringing those pieces together.
            Echolink combines enterprise integration, decentralized AI,
            automation and robotics, and a blockchain trust layer into one
            delivery, so the parts work as a whole.
          </p>
        </div>

        {/* Spec-sheet strip: compact label/value chips in a wrapping row,
            not a stacked card list — reads like a technical datasheet. */}
        <div className="flex flex-wrap gap-3 mb-6">
          {rows.map((row) => (
            <div
              key={row.label}
              className="border border-[#16003B]/20 rounded-none px-5 py-4 max-w-xs"
            >
              <span className="block text-[#16003B] font-bold text-sm mb-1">
                {row.label}
              </span>
              <span className="block text-[#4A4560] text-base leading-relaxed">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[#4A4560] text-base leading-relaxed mt-8 mb-10 max-w-xl">
          We are the connective trust layer that hides the complexity and
          delivers the outcome, trust, automation, and compliance, in the
          language enterprise buyers already speak.
        </p>
        </RevealOnScroll>

        {/* CLIENT QA FIX (Layer page #3): "You can take out the
            rectangle surrounding the 'One Layer ALL FIVE, ASSEMBLED
            INTO ONE VERIFIABLE WHOLE'. It make it look like an action
            button but if its not clickable, visitors may think it's
            an action button that is broken." This used to be a dark,
            shadowed, padded rounded-none box (plus a negative-margin
            "bridge" straddling this section and the next) that read
            exactly like a clickable card. Removed the box treatment
            (background, padding, shadow, overlap) entirely — same
            copy, now rendered as plain text in the section's normal
            flow instead of something that looks interactive. */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-[#FF6100] font-bold text-lg">One layer</span>
          <span className="tag-mono !text-[#4A4560]">
            ALL FIVE, ASSEMBLED INTO ONE VERIFIABLE WHOLE
          </span>
        </div>
      </div>
    </section>
  );
};
