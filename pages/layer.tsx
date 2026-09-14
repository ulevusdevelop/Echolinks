// pages/layer.tsx
import Head from 'next/head';
import { LayerIntro } from '@/components/LayerIntro';
import { Layer } from '@/components/Layer';
import { WholeStack } from '@/components/WholeStack';
import { NotACryptoPlay } from '@/components/NotACryptoPlay';
import { SoftwareThatActs } from '@/components/SoftwareThatActs';
import { WhoWeServe } from '@/components/WhoWeServe';
import { AgentGrid } from '@/components/AgentGrid';
import { WhyDecentralized } from '@/components/WhyDecentralized';
import { SixWays } from '@/components/SixWays';

// RESTRUCTURED (Round 21): these sections previously lived on the
// homepage. The edit doc groups "How We Engage," "What We Do," "Who We
// Serve," "Solutions We Handle," "Decentralized AI Agents By
// Function," and "Why Decentralized AI" all under its "THE LAYER PAGE"
// heading — and the Traceability Page section explicitly says to
// remove Traceability "from the long sections connected to the layer
// page," confirming these sections are meant to live here.
//
// DEDUPLICATION (direct request): ThreeSteps, CoreServices,
// EverythingWeConnect, and TwoIdeas were each duplicated in full here
// AND on their own dedicated pages — their canonical home is the
// dedicated page, removed the repeats here.
//
// LayerIntro ADDED (direct request): "I need the layer page Introduced
// similar to the starting section on the Project controls page as
// well." Real page-opening hero now sits above Layer's own content,
// matching ProjectControls' hero structure exactly (eyebrow/H1/intro/
// down-arrow) — it now provides this page's actual h1, so Layer's own
// heading was downgraded to h2 (it's no longer the first or only
// heading on the page). LayerIntro carries its own pt-44 header-
// clearance padding the same way ProjectControls does, so the page-
// level pt-44 wrapper that used to sit around everything is gone —
// only LayerIntro needs it now, as the true first section.
//
// Rhythm: LayerIntro(D) sitting directly before Layer(D) adds one more
// dark-dark pair at the very start of the page, on top of the one
// already unavoidable at the end (5D/3W split before this, now 6D/3W —
// still not evenly divisible for perfect alternation). Treated the
// same as the existing end-of-page pair: an accepted "opening beat"
// rather than something to force-fix by inserting an artificial light
// section that doesn't belong here content-wise.
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
      <LayerIntro />
      <Layer />
      <WholeStack />
      <NotACryptoPlay />
      <SoftwareThatActs />
      <WhoWeServe />
      <WhyDecentralized />
      <AgentGrid />
      <SixWays />
    </>
  );
}
