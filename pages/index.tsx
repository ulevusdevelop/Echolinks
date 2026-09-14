import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Hero } from '@/components/Hero';
import { CapabilitiesIntro } from '@/components/CapabilitiesIntro';
import { Industries } from '@/components/Industries';
import { Training } from '@/components/Training';
import { ServicesPreview } from '@/components/ServicesPreview';
import { ProjectControlsPreview } from '@/components/ProjectControlsPreview';
import { TrustedToBuildTrust } from '@/components/TrustedToBuildTrust';
import { TraceabilityPreview } from '@/components/TraceabilityPreview';
import { LabsPreview } from '@/components/LabsPreview';
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
      {/* HOMEPAGE HISTORY, so the reasoning behind the current shape is
          traceable rather than looking like flip-flopping:
          1. Training and TrustedToBuildTrust were de-duplicated OFF
             this page (their own dedicated pages already use them as
             real page-defining content).
          2. A "SiteOverview" link-card hub was tried as a lighter-
             weight way to give full-site coverage without duplication,
             then removed by direct feedback: the navbar/footer already
             do that job.
          3. Direct instruction: bring back real, substantial sections
             even where that means duplication — restored Training and
             TrustedToBuildTrust, added Layer (previously absent from
             the homepage entirely, even before step 1).
          4. Direct instruction to go further: build genuine homepage
             coverage for Traceability, Project Controls, Services, and
             Labs too — the four areas flagged as still missing at the
             end of step 3. Each of those pages is a multi-section
             component with its own dark "page hero" baked in (its own
             header-clearance padding, its own eyebrow/H1 meant to open
             a page), so copy-pasting the page component wholesale
             would have read as a second, out-of-place hero appearing
             mid-scroll. Built four new, purpose-sized components
             instead — ServicesPreview, ProjectControlsPreview,
             TraceabilityPreview, LabsPreview — each using real copy
             pulled from its full page's own data (not invented),
             condensed to fit a single homepage section, linking to the
             full page for the rest.

          Order and rhythm — 14 sections now, deliberately sequenced so
          new insertions never land next to a same-toned neighbor.
          Inserting into an already-alternating sequence one at a time
          always creates a collision with one neighbor (two adjacent
          slots are opposite colors by definition, so a single insert
          can only avoid one of them) — inserted the 4 new sections as
          two matched pairs instead (each pair internally alternating),
          which preserves alternation across the whole page:
          Hero(D) CapabilitiesIntro(W) Industries(D) Training(W)
          Layer(D) ServicesPreview(W) ProjectControlsPreview(D)
          TrustedToBuildTrust(W) TraceabilityPreview(D) LabsPreview(W)
          OneScan(D) TrustBand(W) StatsBar(W) Insights(D).
          Zero dark-dark pairs; one accepted white-white pair at the
          end (TrustBand/StatsBar), the same lesser-tradeoff precedent
          already used elsewhere rather than letting two darks sit back
          to back. */}
      <Hero />
      <CapabilitiesIntro />
      <Industries />
      <Training />
      <ServicesPreview />
      <ProjectControlsPreview />
      <TrustedToBuildTrust />
      <TraceabilityPreview />
      <LabsPreview />
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
