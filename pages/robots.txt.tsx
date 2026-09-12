// pages/robots.txt.tsx
//
// Converted from a static public/robots.txt to a dynamically-generated
// route, mirroring the existing pages/sitemap.xml.tsx pattern — found
// during a consolidated integration check that the static file still
// had the production URL hardcoded, with no way to import the shared
// SITE_URL constant (lib/site.ts) into a plain text file. Generating
// it here instead means the Sitemap: line can never drift out of sync
// with the sitemap itself or the canonical tag, since all three now
// share one source of truth.
import { GetServerSideProps } from 'next';
import { SITE_URL } from '@/lib/site';

export default function Robots() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /account',
    'Disallow: /login',
    'Disallow: /api/',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();

  return { props: {} };
};
