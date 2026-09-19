// components/CourseTile/index.tsx
//
// NEW — the icon-tile "thumbnail" used on both the /courses archive
// grid and the single course page. See the file-header note in
// lib/courses.ts for why this is an original icon composition (this
// site's own strict 4-color brand palette + a real Heroicon) rather
// than a hotlinked or recreated copy of the old site's stock course
// graphics.
import React from 'react';
import { ICONS_BY_KEY, type Course } from '@/lib/courses';

export const CourseTile = ({ course, className = '' }: { course: Course; className?: string }) => {
  // `iconKey` (a plain string) is what actually crosses the
  // getStaticProps -> props boundary for WordPress-sourced courses —
  // see lib/courses.ts's file header for why. Resolved to a real
  // component here, the one shared place that does that lookup.
  const Icon = ICONS_BY_KEY[course.iconKey];
  const isNavy = course.tile === 'navy';

  return (
    <div
      className={`relative w-full aspect-[7/5] overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: isNavy ? '#16003B' : '#FF6100' }}
      aria-hidden="true"
    >
      {/* Decorative corner accent squares — the same scattered-square
          motif used elsewhere on the site (Footer's old closing CTA,
          Traceability's closing section), reused here instead of
          inventing a new decorative language for this one component. */}
      <span
        className="absolute -top-3 -left-3 w-10 h-10"
        style={{ background: isNavy ? 'rgba(255,97,0,0.18)' : 'rgba(22,0,59,0.16)' }}
      />
      <span
        className="absolute -bottom-4 -right-4 w-16 h-16"
        style={{ background: isNavy ? 'rgba(255,97,0,0.12)' : 'rgba(22,0,59,0.12)' }}
      />
      <Icon
        className="relative w-16 h-16 md:w-20 md:h-20"
        style={{ color: isNavy ? '#FF6100' : '#16003B' }}
        strokeWidth={1.4}
      />
    </div>
  );
};
