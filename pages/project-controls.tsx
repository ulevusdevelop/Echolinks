// pages/project-controls.tsx
import Head from 'next/head';
import { ProjectControls } from '@/components/ProjectControls';

export default function ProjectControlsPage() {
  return (
    <>
      <Head>
        <title>Project Controls & EVM — Echolink Solutions</title>
        <meta
          name="description"
          content="Know where the project really stands. CPM schedules, earned value, and reporting wired to your live systems."
        />
        <meta property="og:title" content="Project Controls & EVM — Echolink Solutions" />
        <meta property="og:description" content="Know where the project really stands. CPM schedules, earned value, and reporting wired to your live systems." />
      </Head>
      {/* CLIENT QA FIX (Project Control page #1): "Ensure that the top
          section of this page is in alignment with other pages" —
          the screenshot showed an overflow/scrollbar artifact at the
          top caused by DOUBLE top padding: this wrapper added pt-44
          on top of the pt-44 the hero inside <ProjectControls />
          already has on its own `<section>` (same pattern every
          other page-opening hero uses, e.g. Insights, Layer). Removed
          the redundant wrapper so the hero provides its own
          clearance, same as everywhere else. */}
      <ProjectControls />
    </>
  );
}
