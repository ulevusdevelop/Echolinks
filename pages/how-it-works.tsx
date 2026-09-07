// pages/how-it-works.tsx
import Head from 'next/head';
import { ThreeSteps } from '@/components/ThreeSteps';
import { OneScan } from '@/components/OneScan';

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>How it works — Echolink Solutions</title>
        <meta
          name="description"
          content="Three steps: diagnose, develop, deploy. See exactly how the verifiable layer works, end to end."
        />
      </Head>
      <div className="pt-24">
        <ThreeSteps />
        <OneScan />
      </div>
    </>
  );
}
