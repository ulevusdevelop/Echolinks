// lib/site.ts
//
// Shared production URL constant — previously duplicated locally
// inside pages/sitemap.xml.tsx with no single source of truth. Also
// used for the canonical URL tag in AppLayout. Update this one place
// (and public/robots.txt's Sitemap: line) once the real production
// domain is finalized; see the longer note that used to live in
// sitemap.xml.tsx for context on why this is still a placeholder.
export const SITE_URL = 'https://echolinksolutions.com';
