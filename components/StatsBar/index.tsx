import React from 'react';

const stats = [
  { value: '15', label: 'Years in integration' },
  { value: '5', label: 'Layers, one verifiable whole' },
  { value: '4', label: 'Regions, one partnership model' },
  { value: '2,000+', label: 'People trained into technology careers' },
];

// Light, numeric "by the numbers" treatment — big bold navy figures on
// warm off-white, separated by thin vertical rules. A different device
// again from the other light sections: numbers as the hero, not text.
export const StatsBar = () => {
  return (
    <section className="relative bg-[#F2F5F7] py-16 lg:py-20">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center px-4 ${
              i > 0 ? 'md:border-l md:border-[#180F39]/15' : ''
            }`}
          >
            <span className="text-4xl md:text-5xl font-black text-[#180F39]">
              {stat.value}
            </span>
            <p className="text-[#4A4560] text-xs mt-3 leading-snug max-w-[16ch] mx-auto uppercase tracking-tag font-mono">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
