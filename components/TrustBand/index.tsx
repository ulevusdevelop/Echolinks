import React from 'react';
import Link from 'next/link';

// Second light-background beat, mirroring the old site's rhythm: a light
// section early (CapabilitiesIntro) and a second one late, right before
// the final dark closing CTA. Same device family — ghost watermark,
// warm off-white background, accent square — applied consistently
// rather than as a one-off.
export const TrustBand = () => {
  return (
    <section className="relative bg-[#F2F5F7] py-20 lg:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 w-14 h-14 rounded-sm"
        style={{ background: '#FF6000' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-6 h-6 rounded-sm hidden md:block"
        style={{ backgroundColor: '#180F39' }}
      />

      <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center relative">
        <div>
          <span
            aria-hidden="true"
            className="block text-[140px] font-black leading-none select-none mb-6"
            style={{ color: 'rgba(255, 96, 0, 0.1)' }}
          >
            ES
          </span>
        </div>

        <div>
          <span className="tag-mono !text-[#B24300] mb-4 inline-block">
            THE HONEST PART
          </span>
          <p className="text-[#180F39] font-bold text-2xl md:text-3xl leading-snug mb-6">
            Your systems run the work. We make it trustworthy.
          </p>
          <p className="text-[#434343] text-sm leading-relaxed mb-8 max-w-sm">
            No rip and replace. We add the layer that makes it provable, keeps your
            data and AI out of one vendor&apos;s hands, and gives you the audit trail
            regulators are starting to demand.
          </p>
          <Link href="/contact" className="btn btn--primary-inverse">
            Talk through your setup →
          </Link>
        </div>
      </div>
    </section>
  );
};
