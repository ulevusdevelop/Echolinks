import React from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

type IndustryHeroProps = {
  title: string;
  description: string;
  photoSeed: string;
};

// NEW, reusable — mirrored from the old site's Industry detail pages
// (Healthcare, Transportation & Logistics both use this exact pattern):
// a full-width photo with an orange-to-purple duotone gradient overlay,
// "INDUSTRIES" eyebrow, large title, short description, down-arrow.
//
// BUG FIX: this component was being used directly with no header-
// clearance wrapper on either page that renders it — since the header
// is `position: fixed`, that meant its top ~76px (the "INDUSTRIES"
// label and part of the title) was rendering hidden underneath the
// header, not just tightly spaced. Added `mt-28` here so the fix lives
// in one place rather than needing to be repeated in every page that
// uses this component.
export const IndustryHero = ({ title, description, photoSeed }: IndustryHeroProps) => {
  // PADDING FIX (consistency pass): same fixed-height issue as
  // Training's "Tech Made Easy" band — a fixed height:320 box with
  // flex-centered content doesn't guarantee real padding, only
  // centering, and this component's description length varies per
  // page (used across Healthcare, Transportation, and future industry
  // pages), so a fixed height is fragile even where it happens to look
  // fine today. Replaced with vertical padding so the band always has
  // consistent breathing room regardless of how long any given page's
  // description runs.
  //
  // CORRECTION, caught before shipping: my first pass here used pt-16
  // (64px) for the top clearance, replacing the old mt-28 (112px).
  // 64px is actually LESS than the real fixed-header height (44px logo
  // + 16px top/bottom padding at desktop = 76px) — that would have
  // caused actual header overlap, not just tight spacing. Every other
  // page-top hero section sitewide (5 of them) already uses pt-44
  // (112px) for exactly this header-clearance purpose. Matched that
  // instead of inventing a new value, fixing both the overlap bug and
  // an inconsistency in the same move.
  return (
    <section className="relative pt-44 pb-16 md:pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${photoSeed}/1600/500`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,97,0,0.55) 0%, rgba(22,0,59,0.85) 65%, rgba(22,0,59,0.95) 100%)',
          }}
        />
      </div>
      {/* NEW (direct request): a strategically-placed floating accent
          square, same device as ThreeSteps' photo column — genuinely
          overhangs the section's own bottom edge rather than being
          clipped to it, which needed the image moved into its own
          inner overflow-hidden wrapper first (same fix ThreeSteps
          needed) since this outer section previously clipped
          everything including any floating decoration. Used sparingly
          — this is one of only two new placements sitewide, chosen
          because this hero sits on both industry pages (Healthcare,
          Transportation) already has real photo content worth
          accenting. */}
      <span
        className="absolute -bottom-6 right-10 w-14 h-14 hidden md:block z-10"
        style={{ background: '#FF6100' }}
        aria-hidden="true"
      />
      <div className="wrap relative flex flex-col justify-center">
        <RevealOnScroll>
        <span className="text-xs font-bold tracking-tag uppercase text-white/80 mb-3">
          INDUSTRIES
        </span>
        <h1 className="text-white !font-bold text-4xl md:text-5xl mb-4 max-w-xl">
          {title}
        </h1>
        {/* WIDENED (direct feedback: "the intro sections... text
            width... span through a bit more width") — was max-w-lg
            (512px), narrower than the h1 right above it (max-w-xl,
            576px). Matched to max-w-xl so both share the same right
            edge, same fix applied across every page-opening hero
            sitewide. */}
        <p className="text-white text-[20px] font-normal max-w-xl mb-6">{description}</p>
        <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </RevealOnScroll>
      </div>
    </section>
  );
};
