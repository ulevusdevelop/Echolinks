// pages/layer.tsx
import Head from 'next/head';
import { Layer } from '@/components/Layer';
import { WholeStack } from '@/components/WholeStack';
import { NotACryptoPlay } from '@/components/NotACryptoPlay';
import { SoftwareThatActs } from '@/components/SoftwareThatActs';
import { SixWays } from '@/components/SixWays';
import { TwoIdeas } from '@/components/TwoIdeas';

export default function LayerPage() {
  return (
    <>
      <Head>
        <title>The Layer — Echolink Solutions</title>
        <meta
          name="description"
          content="One layer. Five jobs. Verifiable end to end. How Echolink's integration layer actually works."
        />
      </Head>
      <div className="pt-24">
        <Layer />
        <WholeStack />
        <NotACryptoPlay />
        <SoftwareThatActs />
        <SixWays />
        <TwoIdeas />
      </div>
    </>
  );
}
