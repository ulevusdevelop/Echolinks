import React from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Deliberate light-background section — a contrast beat against the
// otherwise all-dark theme, matching the old site's pattern of breaking
// up dark sections with a light one. Uses its own local tokens rather
// than the dark-theme CSS variables, since it's intentionally inverted.
export const CapabilitiesIntro = () => {
  return (
    <section className="relative bg-[#FFFFFF] py-28 lg:py-40 overflow-hidden">
      <div className="wrap relative">
        {/* COMPOSITION REBUILT this round: direct feedback that the
            site's layout reads as "flat or predictable." This section
            was the clearest example — a faint background watermark
            politely avoided by a cleanly separated text block, two
            zones with zero interaction between them. Rebuilt with
            actual layering: the ES mark is bigger and more present
            (not just barely-visible texture), and the heading's left
            edge is deliberately allowed to overlap into the mark's
            space instead of staying clear of it — the kind of
            intersection that gives a composition depth instead of
            everything sitting in its own tidy, separate box. */}
        <div
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[620px] h-[383px] opacity-[0.16] pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/logo-es-mark-only.png"
            alt=""
            fill
            sizes="620px"
            className="object-contain object-left"
          />
        </div>

        {/* MOTION FIX (Homepage item 2): "Animate the bolded words in
            the section. Have it float up." The heading is the section's
            bold text — wrapped in RevealOnScroll ('up' variant) with the
            paragraph following on a slight delay, so the two pieces
            arrive as a short staggered sequence rather than a single
            block popping in at once. */}
        <div className="relative max-w-2xl ml-[18%] lg:ml-[22%]">
          <RevealOnScroll>
            <span className="tag-mono !text-[#B24300] mb-4 inline-block">
              ENTERPRISE INTEGRATION · DECENTRALIZED AI · PROJECT CONTROLS
            </span>
            <h2 className="text-[#16003B] font-bold text-3xl md:text-4xl leading-tight mb-5 relative -ml-[6%] md:-ml-[10%]">
              Enterprise systems, decentralized AI, and project controls, wired
              into one verifiable layer.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delayMs={150}>
            <p className="text-[#434343] text-base leading-relaxed max-w-xl">
              One connective layer for the systems you already run, the AI you are
              adding, and the projects you need to prove. No rip and replace, no
              black box, no guessing where things stand.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
