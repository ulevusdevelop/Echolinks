import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Hero } from '@/components/Hero';
import { CapabilitiesIntro } from '@/components/CapabilitiesIntro';
import { Industries } from '@/components/Industries';
import { Training } from '@/components/Training';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
import { TrustBand } from '@/components/TrustBand';
import { StatsBar } from '@/components/StatsBar';
import { OneScan } from '@/components/OneScan';
import { Insights } from '@/components/Insights';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';
import { SITE_URL } from '@/lib/site';

type HomeProps = {
  posts: Article[];
};

// RESTRUCTURED per the edit doc's own page groupings:
//   - Layer (Homepage item 3: "Remove the layer section from the
//     Homepage") and its companion deep-dive sections (How We Engage /
//     ThreeSteps, What We Do / CoreServices, Who We Serve, Solutions We
//     Handle, Decentralized AI Agents, Why Decentralized AI, See It
//     Clearly, Six Ways) all moved to pages/layer.tsx — the edit doc
//     groups them under "THE LAYER PAGE."
//   - Traceability and ProjectControls removed — each already has its
//     own dedicated page; the edit doc's Traceability Page item 1
//     explicitly says to remove it "from the long sections connected to
//     the layer page," confirming it shouldn't be duplicated here.
//   - Industries (item 4) added, positioned right after
//     CapabilitiesIntro to match the old homepage's own section order
//     (Hero -> Capabilities -> How it works [now on /layer] ->
//     Industries -> ...).
export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Echolink Solutions — The Verifiable Integration Layer</title>
        <meta
          name="description"
          content="Echolink Solutions is the connective layer that wires your systems, machines, robotics, and AI into one verifiable whole."
        />
        <meta property="og:title" content="Echolink Solutions — The Verifiable Integration Layer" />
        <meta
          property="og:description"
          content="Echolink Solutions is the connective layer that wires your systems, machines, robotics, and AI into one verifiable whole."
        />
        <meta property="og:url" content={SITE_URL + '/'} />
        <meta name="twitter:title" content="Echolink Solutions — The Verifiable Integration Layer" />
        <meta
          name="twitter:description"
          content="Echolink Solutions is the connective layer that wires your systems, machines, robotics, and AI into one verifiable whole."
        />
      </Head>
      <Hero />
      <CapabilitiesIntro />
      <Industries />
      <Training />
      <TrustedToBuildTrust />
      <OneScan />
      <TrustBand />
      <StatsBar />
      <Insights posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let posts: Article[] = [];
  try {
    posts = await getArticles(3);
  } catch (err) {
    console.warn('Could not fetch articles from WordPress:', err);
  }
  return { props: { posts }, revalidate: 60 };
};
