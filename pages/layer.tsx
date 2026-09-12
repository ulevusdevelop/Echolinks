// pages/layer.tsx
import Head from 'next/head';
import { Layer } from '@/components/Layer';
import { WholeStack } from '@/components/WholeStack';
import { NotACryptoPlay } from '@/components/NotACryptoPlay';
import { SoftwareThatActs } from '@/components/SoftwareThatActs';
import { ThreeSteps } from '@/components/ThreeSteps';
import { CoreServices } from '@/components/CoreServices';
import { WhoWeServe } from '@/components/WhoWeServe';
import { EverythingWeConnect } from '@/components/EverythingWeConnect';
import { AgentGrid } from '@/components/AgentGrid';
import { WhyDecentralized } from '@/components/WhyDecentralized';
import { TwoIdeas } from '@/components/TwoIdeas';
import { SixWays } from '@/components/SixWays';

// RESTRUCTURED (Round 21): these sections previously lived on the
// homepage. The edit doc groups "How We Engage," "What We Do," "Who We
// Serve," "Solutions We Handle," "Decentralized AI Agents By
// Function," and "Why Decentralized AI" all under its "THE LAYER PAGE"
// heading — and the Traceability Page section explicitly says to
// remove Traceability "from the long sections connected to the layer
// page," confirming these sections are meant to live here.
//
// A sticky jump-nav (12 quick-links) was added in an earlier round to
// address a "feels like a wall of scroll" complaint, then removed by
// direct request — "I don't like this section" — since it wasn't
// landing as a solution. Removed the component and its scroll sentinel
// entirely rather than leaving unused code behind.
export default function LayerPage() {
  return (
    <>
      <Head>
        <title>The Layer — Echolink Solutions</title>
        <meta
          name="description"
          content="One layer. Five jobs. Verifiable end to end. How Echolink's integration layer actually works."
        />
        <meta property="og:title" content="The Layer — Echolink Solutions" />
        <meta property="og:description" content="One layer. Five jobs. Verifiable end to end. How Echolink's integration layer actually works." />
      </Head>
      <div className="pt-28">
        <Layer />
        <WholeStack />
        <NotACryptoPlay />
        <SoftwareThatActs />
        <ThreeSteps />
        <CoreServices />
        <WhoWeServe />
        <EverythingWeConnect />
        <AgentGrid />
        <WhyDecentralized />
        <TwoIdeas />
        <SixWays />
      </div>
    </>
  );
}
