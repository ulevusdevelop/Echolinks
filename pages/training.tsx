// pages/training.tsx
import Head from 'next/head';
import { Training } from '@/components/Training';

export default function TrainingPage() {
  return (
    <>
      <Head>
        <title>Training — Echolink Solutions</title>
        <meta
          name="description"
          content="Hands-on training built around your actual systems. A track record of 2,000 careers, now pointed at decentralized AI, automation, and traceability."
        />
        <meta property="og:title" content="Training — Echolink Solutions" />
        <meta property="og:description" content="Hands-on training built around your actual systems. A track record of 2,000 careers, now pointed at decentralized AI, automation, and traceability." />
      </Head>
      <div className="pt-28">
        <Training headingLevel="h1" />
      </div>
    </>
  );
}
