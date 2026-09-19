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
      {/* CLIENT QA FIX (Traceability page #1): "Ensure that the top
          section of the page is alignment with the other pages." This
          wrapper stacked pt-44 (176px) on top of the hero's own
          `.section` padding (50/100px) inside <Traceability /> —
          226-276px of top clearance versus the 176px every other
          page-opening hero uses. Removed the wrapper; the hero itself
          now carries an explicit !pt-44 override instead (see
          components/Traceability/index.tsx). */}
      <Traceability />
    </>
  );
}
