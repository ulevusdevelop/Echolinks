// pages/clients.tsx
import Head from 'next/head';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
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
      </Head>
      <div className="pt-24">
        <TrustedToBuildTrust />
        <StatsBar />
      </div>
    </>
  );
}
