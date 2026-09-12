// pages/services.tsx
import Head from 'next/head';
import { CoreServices } from '@/components/CoreServices';
import { SixWays } from '@/components/SixWays';
import { EverythingWeConnect } from '@/components/EverythingWeConnect';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services — Echolink Solutions</title>
        <meta
          name="description"
          content="Decentralized AI, enterprise integration, automation & robotics, and the blockchain trust layer, six ways to put it to work."
        />
        <meta property="og:title" content="Services — Echolink Solutions" />
        <meta property="og:description" content="Decentralized AI, enterprise integration, automation & robotics, and the blockchain trust layer, six ways to put it to work." />
      </Head>
      <div className="pt-28">
        <CoreServices headingLevel="h1" />
        <SixWays />
        <EverythingWeConnect />
      </div>
    </>
  );
}
