import React from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW — mirrored from the old site's About Us page: "Echolink is Proud
// to Partner With" (Boomi) and "Companies We've Worked With in the
// Past" (Arrowhead Engineering, PeaceHealth). Rendered as styled
// wordmarks rather than real logo image assets, since none were
// provided for these specific partners — swap in real logo files
// whenever available, nothing else in the layout needs to change.
export const PartnerLogos = () => {
  return (
    <section className="bg-white py-16 border-t border-[#E5E5E5]">
      <RevealOnScroll>
      <div className="wrap text-center">
        <p className="font-bold text-lg mb-6" style={{ color: '#16003B' }}>
          Echolink is Proud to Partner With
        </p>
        <p
          className="text-3xl font-bold mb-14"
          style={{ color: '#0072C6', fontFamily: 'var(--font-syne), sans-serif' }}
        >
          boomi
        </p>

        <p className="font-bold text-sm mb-8" style={{ color: '#FF6100' }}>
          Companies We&apos;ve Worked With in the Past
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
          <span className="font-bold text-xl tracking-wide" style={{ color: '#16003B' }}>
            ARROWHEAD ENGINEERING
          </span>
          <span className="font-bold text-xl" style={{ color: '#16003B' }}>
            PeaceHealth
          </span>
        </div>
      </div>
      </RevealOnScroll>
    </section>
  );
};
