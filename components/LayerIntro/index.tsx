import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW component (direct request): "I need the layer page Introduced
// similar to the starting section on the Project controls page as
// well (Add a new section above the initial layer section)." Mirrors
// ProjectControls' own opening hero structure exactly (eyebrow, H1,
// intro paragraph, down-arrow, dark purple background, same header-
// clearance padding) — a real page-opening hero sitting above the
// existing Layer component's own "One layer. Five jobs" content, not a
// replacement for it.
export const LayerIntro = () => {
  return (
    <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
      <div className="wrap">
        <RevealOnScroll>
          <span className="text-xs font-bold tracking-tag uppercase block mb-4" style={{ color: '#FF6100' }}>
            THE VERIFIABLE INTEGRATION LAYER
          </span>
          {/* WEIGHT BUG FIX: this used a plain inline style
              (fontWeight: 600), but a stylesheet rule elsewhere
              (bare `h1 { font-weight: 800 !important }`, from the
              typography-tier system) wins over a normal inline style
              regardless of the inline style's specificity — CSS
              !important on a stylesheet rule outranks inline styles
              entirely, a different mechanism than normal specificity.
              Switched to a real Tailwind utility class with its own !
              important modifier (!font-semibold = 600, with real
              !important in the compiled CSS) instead, which has class-
              level specificity and correctly wins over the bare h1
              tag-level rule. WIDENED (direct feedback: "not spread to
              occupy more width") — max-w-3xl -> max-w-4xl. */}
          <h1
            className="text-white !font-semibold leading-tight mb-6 max-w-4xl"
            style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(36px, 4vw, 48px)' }}
          >
            The layer that connects everything you already run.
          </h1>
          <p className="text-white text-[20px] font-normal leading-relaxed max-w-3xl mb-10">
            One connective layer for the systems you already run, the AI you are
            adding, and the projects you need to prove. No rip and replace, no black
            box, no guessing where things stand.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </RevealOnScroll>
      </div>
    </section>
  );
};
