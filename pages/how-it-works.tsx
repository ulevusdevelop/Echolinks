// pages/how-it-works.tsx
import Head from 'next/head';
import { ThreeSteps } from '@/components/ThreeSteps';
import { TwoIdeas } from '@/components/TwoIdeas';

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — Echolink Solutions</title>
        <meta
          name="description"
          content="Three steps: diagnose, develop, deploy. See exactly how the verifiable layer works, end to end."
        />
        <meta property="og:title" content="How it works — Echolink Solutions" />
        <meta property="og:description" content="Three steps: diagnose, develop, deploy. See exactly how the verifiable layer works, end to end." />
      </Head>
      {/* DEDUPLICATION (direct request): OneScan was duplicated in full
          here and on the homepage. Its content (the shopper's-view scan
          demo) isn't really about "how we engage" methodology — this
          page's own subject — so the homepage (where it already sits
          among the site's other proof/demo sections) is its more
          natural canonical home. Removed the repeat here rather than
          from the homepage.

          TwoIdeas ("See it clearly") ADDED (direct instruction): this
          page was missing its own "Two ideas, drawn simply" section
          entirely — the reference places it right after the process
          steps, walking through the same concept visually once it's
          been explained in words. Moved here from where it previously
          only existed (the Layer page). */}
      <ThreeSteps headingLevel="h1" />
      <TwoIdeas />
    </>
  );
}
