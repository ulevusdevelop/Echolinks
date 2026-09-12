import React from 'react';

const stats = [
  { value: '15', label: 'Years in integration' },
  { value: '5', label: 'Layers, one verifiable whole' },
  { value: '4', label: 'Regions, one partnership model' },
  { value: '2,000+', label: 'People trained into technology careers' },
];

// RHYTHM FIX (reopened): a past round deliberately paired this section
// dark with Insights right after it, specifically to turn two separate
// dark-dark runs into two clean pairs, rather than pushing for true
// alternation. That was a considered tradeoff at the time, but direct
// feedback now is that the section pairing/blending isn't reading as
// professional as the brand's flat, high-contrast alternation should.
// With Training also flipped to white in this same pass, holding
// StatsBar dark would just recreate a fresh dark-dark run against
// Insights. Flipped to white — a simple 4-number stat row adapts
// cleanly, no dark-theme-dependent illustration inside it either way.
export const StatsBar = () => {
  return (
    <section className="section--light">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-4 ${
              i > 0 ? 'md:border-l' : ''
            }`}
            style={i > 0 ? { borderColor: '#E5E5E5' } : undefined}
          >
            <span className="text-4xl md:text-5xl font-black" style={{ color: '#16003B' }}>
              {stat.value}
            </span>
            <p className="text-xs mt-3 leading-snug max-w-[16ch] mx-auto uppercase tracking-tag font-mono" style={{ color: '#707070' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
