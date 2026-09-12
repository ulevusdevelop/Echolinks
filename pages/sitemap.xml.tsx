// pages/sitemap.xml.tsx
//
// Generates sitemap.xml dynamically at request time so real Insights
// posts are always included, not just the static routes. Uses
// getServerSideProps rather than a static file since the post list
// changes as content gets published in WordPress.
import { GetServerSideProps } from 'next';
import { getArticles } from '@/lib/service';
import { SITE_URL } from '@/lib/site';

// TODO: update SITE_URL in lib/site.ts once the production domain is
// finalized — this assumes the new build replaces the domain the old
// WordPress site currently uses. If it launches on a different domain
// first (e.g. a Render subdomain during a transition period), update
// that constant and public/robots.txt's Sitemap: line to match.

// SITEMAP FIX: staticRoutes hadn't been updated since several new
// pages were added in later rounds — white-papers, both industry
// pages, and all three managed-services pages were live, public, and
// fully indexable, but missing from the sitemap entirely. login, lab,
// and account are deliberately excluded (private/noindex pages, not an
// oversight). membership was previously excluded too, matching an old
// robots.txt disallow — but that page is public pricing content, not
// private, so the disallow (and this exclusion) was the actual mistake.
// Fixed both; membership is back in the sitemap.
const staticRoutes = [
  '', 'layer', 'services', 'how-it-works', 'traceability', 'project-controls',
  'training', 'clients', 'insights', 'contact', 'membership', 'white-papers',
  'industries/healthcare', 'industries/transportation',
  'services/edi-api-managed-services', 'services/erp-managed-services',
  'services/facet-configurations',
];

function generateSitemap(postSlugs: string[]) {
  const urls = [
    ...staticRoutes.map(
      (route) => `  <url><loc>${SITE_URL}/${route}</loc></url>`
    ),
    ...postSlugs.map(
      (slug) => `  <url><loc>${SITE_URL}/insights/${slug}</loc></url>`
    ),
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export default function Sitemap() {
  // This component never renders — getServerSideProps returns the XML
  // directly via the response object below.
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let postSlugs: string[] = [];
  try {
    const posts = await getArticles(200);
    postSlugs = posts.map((p) => p.slug);
  } catch (err) {
    console.warn('Sitemap: could not fetch posts, generating static routes only:', err);
  }

  const sitemap = generateSitemap(postSlugs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};
