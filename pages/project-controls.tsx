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
      </Head>
      <div className="pt-24">
        <ProjectControls />
      </div>
    </>
  );
}
