import React from 'react';

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
export const WholeStack = () => {
  return (
    <section className="relative bg-[#F2F5F7] py-20 lg:py-28 overflow-hidden">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute top-6 right-6 w-28 h-28 pointer-events-none hidden lg:block opacity-70"
        aria-hidden="true"
      >
        <path
          d="M10 30 C 90 10, 150 60, 120 140"
          stroke="#FF6000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M108 132 l14 10 l-18 8 Z" fill="#FF6000" />
      </svg>

      <div className="wrap relative">
        <div className="max-w-xl mb-14">
          <span className="tag-mono !text-[#FF6000] mb-4 inline-block">
            THE CATEGORY WE OWN
          </span>
          <h2 className="text-[#180F39] font-bold text-3xl md:text-4xl leading-tight mb-5">
            The whole stack, assembled into one layer.
          </h2>
          <p className="text-[#4A4560] text-base leading-relaxed">
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
              className="border border-[#180F39]/20 rounded-lg px-5 py-4 max-w-xs"
            >
              <span className="block text-[#180F39] font-bold text-sm mb-1">
                {row.label}
              </span>
              <span className="block text-[#4A4560] text-xs leading-relaxed">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div
          className="inline-flex items-center gap-3 rounded-lg px-5 py-4"
          style={{ background: '#180F39' }}
        >
          <span className="text-[#FF6000] font-bold text-sm">One layer</span>
          <span className="tag-mono !text-[#FF9E5E]">
            ALL FIVE, ASSEMBLED INTO ONE VERIFIABLE WHOLE
          </span>
        </div>

        <p className="text-[#4A4560] text-sm leading-relaxed mt-8 max-w-xl">
          We are the connective trust layer that hides the complexity and
          delivers the outcome, trust, automation, and compliance, in the
          language enterprise buyers already speak.
        </p>
      </div>
    </section>
  );
};
