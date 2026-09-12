// lib/fonts.ts
//
// Syne — the Echolink Solutions brand typeface per official Brand
// Guidelines (section 4.1/4.2): used for headings, sub-headings, AND
// body text across all brand touchpoints, not a heading-only display
// face paired with a separate body font. JetBrains Mono is kept for
// the small monospace UI labels (eyebrows, "SYSTEMS OF RECORD" style
// tags) — an established distinct treatment the brand guide doesn't
// address either way.
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
import { JetBrains_Mono } from 'next/font/google';

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

// JetBrains Mono has no provided local files, so this one stays on
// next/font/google — a real network dependency, but a much smaller
// risk surface than the primary brand typeface itself.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});
