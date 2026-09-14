// lib/fonts.ts
//
// Syne — the Echolink Solutions brand typeface per official Brand
// Guidelines (section 4.1/4.2): used for headings, sub-headings, AND
// body text across all brand touchpoints, not a heading-only display
// face paired with a separate body font.
//
// JetBrains Mono REMOVED entirely (direct instruction: "the font has
// to be Syne," no exceptions). It had been kept for small monospace UI
// labels (eyebrows, tag/metric text) as a deliberate distinct
// treatment, but every one of those usages — plus 19 stray instances
// of Tailwind's own `font-mono` utility class scattered across 15
// files, on top of the shared `.tag-mono`/`.number-badge` CSS classes —
// has now been converted to Syne. Nothing in the codebase references
// JetBrains Mono anymore, so the font and its variable are removed
// rather than left loaded and unused.
//
// SWITCHED from next/font/google to next/font/local: the actual Syne
// font files were provided directly (public/fonts/syne/*.ttf, from
// Syne.zip in an early upload) and had never actually been wired up —
// the site was fetching Syne from Google's CDN instead of using the
// provided files. next/font/local removes the Google Fonts dependency
// entirely: no outbound fetch needed at all, guaranteed to be the
// exact font files provided, and immune to the network-availability
// issues that made the previous next/font/google approach hard to
// verify from this sandboxed environment in the first place.
import localFont from 'next/font/local';

export const syne = localFont({
  src: [
    { path: '../public/fonts/syne/Syne-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/syne/Syne-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/syne/Syne-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/syne/Syne-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/syne/Syne-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-syne',
  display: 'swap',
});
