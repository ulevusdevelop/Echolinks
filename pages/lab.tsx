// pages/lab.tsx
// Example of a gated page — the interactive "Lab" demo section is
// members-only, per your sitemap notes on the Training & Support → Lab
// rename. This shows the pattern; apply RequireMembership the same way
// to any other page/section that should be gated.
import Head from 'next/head';
import { RequireMembership } from '@/components/RequireMembership';

export default function LabPage() {
  return (
    <>
      <Head>
        <title>Lab — Echolink Solutions</title>
        <meta
          name="description"
          content="See the layer work before you commit. Interactive demo scenarios covering EDI, agent policy control, and FHIR provenance, available to members."
        />
      </Head>
      <RequireMembership>
        <section className="section--page py-32">
          <div className="wrap text-center">
            <span className="eyebrow">MEMBER LAB</span>
            <h1 className="sec-title">See the layer work before you commit.</h1>
            <p className="sec-sub sec-sub--center mt-4">
              This is where the interactive demo scenarios go — EDI 850 to
              verified order, agent under policy control, robot logs, FHIR
              provenance — full build to follow.
            </p>
          </div>
        </section>
      </RequireMembership>
    </>
  );
}

// To gate behind a SPECIFIC membership tier instead of "any membership",
// use: <RequireMembership membership="Lab Access">...</RequireMembership>
// where "Lab Access" matches the exact MemberPress product title.
