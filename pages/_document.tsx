import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_URL } from '@/lib/site';
import { syne } from '@/lib/fonts';

export default function Document() {
  return (
    // FONT-INHERITANCE ROOT-CAUSE FIX ("go through and fix any other
    // places not using the right fonts" — a long list of examples
    // spanning nearly every component: card titles, tag/checklist
    // text, accordion labels, etc.): `syne.variable` (the CSS custom
    // property `--font-syne` that every Syne rule in globals.css
    // reads via `var(--font-syne)`) was only ever applied to
    // `<main>` in _app.tsx. `html`/`body`'s own blanket
    // `font-family: var(--font-syne), sans-serif !important` rule —
    // meant to be the sitewide fallback for any element with no
    // explicit font-family of its own — sits ABOVE `<main>` in the
    // DOM, so it could never actually see that custom property (CSS
    // custom properties only inherit downward, and `<body>` is an
    // ANCESTOR of `<main>`, not a descendant). That made the
    // fallback rule invalid at computed-value time, so EVERY plain
    // element sitewide with no explicit `.eyebrow-plain`/`.tag-
    // mono`/`h1-h6`/`.btn`/`p`/etc. class of its own — a bare
    // `<span>`, `<div>`, `<button>`, or `<a>` used for card titles,
    // checklist rows, tag labels, and the like — inherited whatever
    // broken value that produced (the browser's own default font),
    // not Syne, even though every element with its OWN explicit Syne
    // rule rendered correctly. Adding the variable here, on `<html>`
    // itself (the actual DOM root, above everything including
    // React-portaled content like the Insights/Lab modals), makes
    // that fallback rule valid everywhere at once instead of
    // requiring a font-family override hunted down on every
    // individual element. Left in place on `<main>` too — harmless
    // and redundant, not worth removing.
    <Html lang="en" className={syne.variable}>
      <Head>
        {/* Real favicon, generated from the actual logo file composited
            onto the site's exact navy background (#16003B) — replaces
            Next.js's default icon. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#16003B" />

        {/* Site-wide default social share card. Now built from the
            shared SITE_URL constant (lib/site.ts) instead of a
            hardcoded string that could drift from the sitemap's and
            the canonical tag's own copy of the same URL. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Echolink Solutions" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

        {/* Organization structured data — found missing entirely
            during a craft sweep. Helps search engines understand
            Echolink Solutions as a distinct business entity (name,
            logo, contact point) rather than just a collection of
            unrelated pages, and is a prerequisite for various rich-
            result features. Deliberately omits `sameAs` social profile
            links — the Footer's LinkedIn/X/Instagram links are still
            placeholders (`href="#"`), and pointing structured data at
            profiles that don't actually exist yet would be worse than
            omitting the field; add `sameAs` once those are real. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Echolink Solutions',
              url: SITE_URL,
              logo: `${SITE_URL}/logo-horizontal-navy.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@echolinksolutions.com',
                contactType: 'customer service',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Anderson',
                addressRegion: 'SC',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
