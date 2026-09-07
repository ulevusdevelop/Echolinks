import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Real favicon, generated from the actual logo file composited
            onto the site's exact navy background (#180F39) — replaces
            Next.js's default icon. */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#180F39" />

        {/* Site-wide default social share card. */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Echolink Solutions" />
        <meta property="og:image" content="https://echolinksolutions.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://echolinksolutions.com/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
