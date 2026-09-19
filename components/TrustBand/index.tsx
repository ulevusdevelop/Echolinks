import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// Second light-background beat, mirroring the old site's rhythm: a light
// section early (CapabilitiesIntro) and a second one late, right before
// the final dark closing CTA. Same device family — ghost watermark,
// warm off-white background, accent square — applied consistently
// rather than as a one-off.
export const TrustBand = () => {
  return (
    <section className="relative bg-[#FFFFFF] py-28 lg:py-40 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-6 w-14 h-14 rounded-none"
        style={{ background: '#FF6100' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-10 right-10 w-6 h-6 rounded-none hidden md:block"
        style={{ backgroundColor: '#16003B' }}
      />

      <div className="wrap relative">
        {/* CORRECTED again this round, same fix as CapabilitiesIntro:
            swapped the framed logo-mark-transparent.png for the clean
            cropped letterform (logo-es-mark-only.png), enlarged, and
            repositioned to bleed off the edge as its own absolute
            decoration rather than sitting inside the grid as a content
            column — matching the reference's treatment and staying
            consistent with how CapabilitiesIntro's mark now works. */}
        <div
          className="hidden xl:block absolute -right-16 top-1/2 -translate-y-1/2 w-[500px] h-[309px] opacity-[0.12] pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/logo-es-mark-only.png"
            alt=""
            fill
            sizes="500px"
            className="object-contain object-right"
          />
        </div>

        <RevealOnScroll>
        <div className="relative max-w-2xl">
          <span className="tag-mono !text-accent-light mb-4 inline-block">
            THE HONEST PART
          </span>
          <p className="text-[#16003B] font-bold text-2xl md:text-3xl leading-snug mb-6">
            Your systems run the work. We make it trustworthy.
          </p>
          <p className="text-[#434343] text-[20px] font-normal leading-relaxed mb-8 max-w-sm">
            No rip and replace. We add the layer that makes it provable, keeps your
            data and AI out of one vendor&apos;s hands, and gives you the audit trail
            regulators are starting to demand.
          </p>
          <Link href="/contact" className="btn btn--primary-inverse">
            Talk through your setup →
          </Link>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
