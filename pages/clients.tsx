// pages/clients.tsx
import Head from 'next/head';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
import { PartnerLogos } from '@/components/PartnerLogos';
import { StatsBar } from '@/components/StatsBar';

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
      <div className="pt-28">
        <TrustedToBuildTrust headingLevel="h1" />
        <PartnerLogos />
        <StatsBar />
      </div>
    </>
  );
}
