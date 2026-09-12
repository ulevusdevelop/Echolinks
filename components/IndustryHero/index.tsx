import React from 'react';
import Image from 'next/image';

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
  // page-top hero section sitewide (5 of them) already uses pt-28
  // (112px) for exactly this header-clearance purpose. Matched that
  // instead of inventing a new value, fixing both the overlap bug and
  // an inconsistency in the same move.
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pb-20">
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
      <div className="wrap relative flex flex-col justify-center">
        <span className="font-mono text-xs font-bold tracking-tag uppercase text-white/80 mb-3">
          INDUSTRIES
        </span>
        <h1 className="text-white font-bold text-4xl md:text-5xl mb-4 max-w-xl">
          {title}
        </h1>
        <p className="text-white/80 text-sm max-w-lg mb-6">{description}</p>
        <span className="text-white text-2xl" aria-hidden="true">↓</span>
      </div>
    </section>
  );
};
