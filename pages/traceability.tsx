// pages/traceability.tsx
import Head from 'next/head';
import { Traceability } from '@/components/Traceability';

export default function TraceabilityPage() {
  return (
    <>
      <Head>
        <title>Traceability — Echolink Solutions</title>
        <meta
          name="description"
          content="Prove where anything came from. Tamper-proof provenance for airlines, air taxis, supply chain, pharma, food, and luxury goods."
        />
        <meta property="og:title" content="Traceability — Echolink Solutions" />
        <meta property="og:description" content="Prove where anything came from. Tamper-proof provenance for airlines, air taxis, supply chain, pharma, food, and luxury goods." />
      </Head>
      <div className="pt-44">
        <Traceability />
      </div>
    </>
  );
}
