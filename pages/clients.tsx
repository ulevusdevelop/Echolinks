// pages/clients.tsx
import Head from 'next/head';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
import { PartnerLogos } from '@/components/PartnerLogos';

export default function ClientsPage() {
  return (
    <>
      <Head>
        <title>Clients — Echolink Solutions</title>
        <meta
          name="description"
          content="Trusted to build trust. From healthcare to retail to energy, see who we've built verifiable systems for."
        />
        <meta property="og:title" content="Clients — Echolink Solutions" />
        <meta property="og:description" content="Trusted to build trust. From healthcare to retail to energy, see who we've built verifiable systems for." />
      </Head>
      {/* DEDUPLICATION (direct request): StatsBar was duplicated in
          full here and on the homepage. Its content (years in business,
          regions, people trained) is general company-proof, not
          specifically about clients — the homepage, where it already
          sits alongside the site's other proof sections, is the more
          natural canonical home. Removing it here also happens to
          improve this page's own rhythm: it was three white sections in
          a row (TrustedToBuildTrust, PartnerLogos, StatsBar); this
          brings it down to two. */}
      <div className="pt-44">
        <TrustedToBuildTrust headingLevel="h1" />
        <PartnerLogos />
      </div>
    </>
  );
}
