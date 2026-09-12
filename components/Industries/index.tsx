import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW component (Homepage item 4: "Create this on the home page.
// Industries" — this section did not exist anywhere in the codebase).
// Mirrored directly from the old homepage: a dark purple band, a list
// of industry names on the left with underline dividers, a heading +
// paragraph on the right, and a curved orange decorative line in the
// corner.
const industries = ['Healthcare', 'Retail', 'Manufacturing', 'Transportation'];

export const Industries = () => {
  return (
    <section className="relative overflow-hidden py-[50px] lg:py-[100px]" style={{ background: '#16003B' }}>
      {/* SCALE + SHAPE FIX: checked directly against the old homepage's
          own Industries-area decoration — it's a thick, bold curve
          sweeping the FULL height of the section from the top edge down
          to the bottom-right corner, not a thin (2px stroke) squiggle
          contained in a small 260x180 box in the corner, which is what
          this had become. Rebuilt as a full-height sweep with a much
          heavier stroke, matching the reference's actual scale and
          confidence. Dropped the small arrowhead — the reference crop
          doesn't show one, just a clean uninterrupted sweep. */}
      <svg
        viewBox="0 0 400 800"
        fill="none"
        preserveAspectRatio="none"
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block"
        aria-hidden="true"
      >
        <path
          d="M400 0 C 260 120, 200 340, 320 480 C 400 570, 340 700, 180 800"
          stroke="#FF6100"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>

      <div className="wrap grid md:grid-cols-2 gap-12 items-center relative">
        <RevealOnScroll>
          <ul className="flex flex-col">
            {/* BOLDER (direct feedback): was border-b (1px) at 20%
                opacity — quite faint against the dark purple background.
                Doubled both thickness and opacity for real visual
                weight. */}
            {industries.map((name, i) => (
              <li
                key={name}
                className={`py-5 ${i < industries.length - 1 ? 'border-b-2 border-white/40' : ''}`}
              >
                <span className="text-white font-bold text-lg tracking-wide uppercase">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-5">
            Industries
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md">
            Our managed service solutions are customizable to meet your unique
            business needs. Whether you are a small business or a large corporation,
            we have a plan that fits your budget and requirements.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
