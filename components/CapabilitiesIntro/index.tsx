import React from 'react';

// Deliberate light-background section — a contrast beat against the
// otherwise all-dark theme, matching the old site's pattern of breaking
// up dark sections with a light one. Uses its own local tokens rather
// than the dark-theme CSS variables, since it's intentionally inverted.
export const CapabilitiesIntro = () => {
  return (
    <section className="relative bg-[#F2F5F7] py-20 lg:py-28 overflow-hidden">
      <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center relative">
        {/* Ghost watermark of the ES mark, ultra-light tint, purely
            decorative — echoes the old site's oversized faded logo motif. */}
        <div
          aria-hidden="true"
          className="hidden lg:block text-[180px] font-black leading-none select-none"
          style={{ color: 'rgba(255, 96, 0, 0.12)' }}
        >
          ES
        </div>

        <div>
          <span className="tag-mono !text-[#B24300] mb-4 inline-block">
            ENTERPRISE INTEGRATION · DECENTRALIZED AI · PROJECT CONTROLS
          </span>
          <h2 className="text-[#180F39] font-bold text-3xl md:text-4xl leading-tight mb-5">
            Enterprise systems, decentralized AI, and project controls, wired
            into one verifiable layer.
          </h2>
          <p className="text-[#434343] text-base leading-relaxed max-w-xl">
            One connective layer for the systems you already run, the AI you are
            adding, and the projects you need to prove. No rip and replace, no
            black box, no guessing where things stand.
          </p>
        </div>
      </div>
    </section>
  );
};
