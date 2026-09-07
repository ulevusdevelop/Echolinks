import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Hero } from '@/components/Hero';
import { CapabilitiesIntro } from '@/components/CapabilitiesIntro';
import { Layer } from '@/components/Layer';
import { ThreeSteps } from '@/components/ThreeSteps';
import { CoreServices } from '@/components/CoreServices';
import { WhoWeServe } from '@/components/WhoWeServe';
import { EverythingWeConnect } from '@/components/EverythingWeConnect';
import { AgentGrid } from '@/components/AgentGrid';
import { WhyDecentralized } from '@/components/WhyDecentralized';
import { TwoIdeas } from '@/components/TwoIdeas';
import { SixWays } from '@/components/SixWays';
import { Traceability } from '@/components/Traceability';
import { ProjectControls } from '@/components/ProjectControls';
import { Training } from '@/components/Training';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
import { TrustBand } from '@/components/TrustBand';
import { StatsBar } from '@/components/StatsBar';
import { OneScan } from '@/components/OneScan';
import { Insights } from '@/components/Insights';
import { getArticles } from '@/lib/service';
import { Article } from '@/lib/types';

type HomeProps = {
  posts: Article[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Echolink Solutions — The Verifiable Integration Layer</title>
        <meta
          name="description"
          content="Echolink Solutions is the connective layer that wires your systems, machines, robotics, and AI into one verifiable whole."
        />
      </Head>
      <Hero />
      <CapabilitiesIntro />
      <Layer />
      <ThreeSteps />
      <CoreServices />
      <WhoWeServe />
      <EverythingWeConnect />
      <AgentGrid />
      <WhyDecentralized />
      <TwoIdeas />
      <SixWays />
      <Traceability />
      <ProjectControls />
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
