import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW component (Homepage item 4: "Create this on the home page.
// Industries" — this section did not exist anywhere in the codebase).
// Mirrored directly from the old homepage: a dark purple band, a list
// of industry names on the left with underline dividers, a heading +
// paragraph on the right, and a curved orange decorative line in the
// corner.
// REMOVED "Energy" (direct instruction) — reverts the earlier addition
// back to the original 4-item list.
const industries = ['Healthcare', 'Retail', 'Manufacturing', 'Transportation'];

export const Industries = () => {
  return (
    <section className="relative overflow-hidden py-[50px] lg:py-[100px]" style={{ background: '#16003B' }}>
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

      <div className="wrap grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-center relative">
        <RevealOnScroll>
          <ul className="flex flex-col">
            {/* EXTRA LINE (direct instruction): the last item had no
                bottom divider (by design, to avoid a trailing line with
                nothing below it) — added one more line under
                Transportation too, so every item now has a divider,
                including the last. */}
            {industries.map((name) => (
              <li
                key={name}
                className="py-5 border-b-2 border-white"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '21px',
                    // CLIENT QA FIX: Syne has no real 900 weight (max
                    // loaded is 800/ExtraBold) — 900 was being faux-
                    // bolded by the browser, causing the stretched
                    // look the client flagged. Corrected to 800.
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    lineHeight: '49px',
                    color: '#FFFFFF',
                  }}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <h2
            className="mb-5"
            style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 600, lineHeight: '49px', color: '#FFFFFF', fontSize: 'clamp(30px, 3.5vw, 40px)' }}
          >
            Industries
          </h2>
          {/* WIDENED FURTHER (direct instruction: "spread out even
              more") — max-w-lg -> max-w-xl, plus the grid ratio itself
              shifted to give this column more of the row (0.9/1.1 ->
              0.85/1.15). */}
          <p className="text-white text-[20px] font-normal leading-relaxed max-w-xl">
            Our managed service solutions are customizable to meet your unique
            business needs. Whether you are a small business or a large corporation,
            we have a plan that fits your budget and requirements.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
