import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_URL } from '@/lib/site';

export default function Document() {
  return (
    <Html lang="en">
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
