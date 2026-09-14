// pages/services.tsx
import Head from 'next/head';
import { CoreServices } from '@/components/CoreServices';
import { EverythingWeConnect } from '@/components/EverythingWeConnect';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services — Echolink Solutions</title>
        <meta
          name="description"
          content="Decentralized AI, enterprise integration, automation & robotics, and the blockchain trust layer, everything we connect in one place."
        />
        <meta property="og:title" content="Services — Echolink Solutions" />
        <meta property="og:description" content="Decentralized AI, enterprise integration, automation & robotics, and the blockchain trust layer, everything we connect in one place." />
      </Head>
      {/* DEDUPLICATION (direct request): SixWays was duplicated in full
          here and on /layer. "Six ways to put THE LAYER to work" is
          conceptually about the layer specifically, not the service
          catalog this page covers — moved its canonical home to
          /layer, removed the repeat here. */}
      <div className="pt-44">
        <CoreServices headingLevel="h1" />
        <EverythingWeConnect />
      </div>
    </>
  );
}
