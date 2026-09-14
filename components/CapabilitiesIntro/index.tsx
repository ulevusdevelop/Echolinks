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

        {/* REPOSITIONED (blueprint): text block now starts at ~40% of
            the section width and flows right, left-aligned throughout
            — replaces the previous 18-22% margin and the deliberate
            negative-margin overlap-into-the-watermark effect from an
            earlier round, which isn't what's being asked for here.
            Container widened slightly (max-w-2xl -> max-w-3xl) per
            direct instruction. Eyebrow removed entirely. Title and
            body now use the exact typography read directly off the
            live site: title Syne/600/line-height 49px, body Syne/20px/
            400. */}
        <div className="relative max-w-3xl text-left lg:ml-[40%]">
          <RevealOnScroll>
            <h2
              className="text-[#16003B] mb-5"
              style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 600, lineHeight: '49px', fontSize: 'clamp(28px, 3vw, 36px)' }}
            >
              Enterprise systems, decentralized AI, and project controls, wired
              into one verifiable layer.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delayMs={150}>
            <p
              className="text-[#434343] leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 400, fontSize: '20px' }}
            >
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
