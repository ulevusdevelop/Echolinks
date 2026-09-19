import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// CONTENT FIX (careful sweep): checked against the reference's actual
// "Proof" section and found only 3 stats there (15/5/4) — the 4th,
// "2,000+ People trained," isn't part of this section in the reference
// at all. That figure does appear on the site, prominently, as its own
// large stat card in Training's "2,000 careers" section — adding it
// again here duplicated it rather than restoring something missing.
// Removed to match the reference's actual 3-stat design.
const stats = [
  { value: '15', label: 'Years in integration' },
  { value: '5', label: 'Layers, one verifiable whole' },
  { value: '4', label: 'Regions, one partnership model' },
];

// RHYTHM FIX (reopened): a past round deliberately paired this section
// dark with Insights right after it, specifically to turn two separate
// dark-dark runs into two clean pairs, rather than pushing for true
// alternation. That was a considered tradeoff at the time, but direct
// feedback now is that the section pairing/blending isn't reading as
// professional as the brand's flat, high-contrast alternation should.
// With Training also flipped to white in this same pass, holding
// StatsBar dark would just recreate a fresh dark-dark run against
// Insights. Flipped to white — a simple stat row adapts cleanly, no
// dark-theme-dependent illustration inside it either way.
export const StatsBar = () => {
  return (
    <section className="section--light">
      <RevealOnScroll>
      <div className="wrap grid grid-cols-1 sm:grid-cols-3 gap-y-10">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-4 ${
              i > 0 ? 'sm:border-l' : ''
            }`}
            style={i > 0 ? { borderColor: '#E5E5E5' } : undefined}
          >
            {/* CLIENT QA FIX (sitewide stretched-typography sweep): found
                while verifying the build output — `font-black` is
                Tailwind's font-weight:900 utility, the same missing-
                glyph/faux-bold issue behind "the titles in orange
                color look stretched" (Syne only has real weights up
                to 800/ExtraBold). Not orange here, but the same
                distortion would show on these large 4xl/5xl stat
                numbers. Swapped for font-extrabold (800). */}
            <span className="text-4xl md:text-5xl font-extrabold" style={{ color: '#16003B' }}>
              {stat.value}
            </span>
            <p className="text-xs mt-3 leading-snug max-w-[16ch] mx-auto uppercase tracking-tag" style={{ color: '#707070' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      </RevealOnScroll>
    </section>
  );
};
