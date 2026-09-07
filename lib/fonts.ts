// lib/fonts.ts
//
// Plus Jakarta Sans (headings) + Inter (body/UI) — the exact typefaces
// from echolinksolutions.com's live stylesheet:
//   body,button,input,select,textarea{font-family:'Inter',sans-serif}
//   h1,h2,h3,h4,h5,h6{font-family:'Plus Jakarta Sans',sans-serif;font-weight:600}
//
// Variable/export names are kept as `syne`/`jetbrainsMono` so nothing
// else in the codebase needs to change — every component and CSS
// reference (--font-syne, --font-jetbrains, font-syne, font-mono)
// picks up the correct new font automatically.

import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

export const syne = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const jetbrainsMono = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});
