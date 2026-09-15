// pages/white-papers.tsx
import Head from 'next/head';
import Link from 'next/link';

// NEW page, mirrored from the old site's own /white-papers page —
// content (titles + descriptions) read directly from the reference,
// not invented. A light gray card grid, one card (EDI Implementation)
// styled as a dark highlighted card matching the reference exactly.
const papers = [
  {
    title: 'API Security Best Practice',
    description:
      'API security is crucial to protect sensitive data and ensure the integrity of interactions between different systems. Here are some best practices to enhance the security of your APIs.',
    highlight: false,
  },
  {
    title: 'EDI Implementation',
    description:
      'Implementing Electronic Data Interchange (EDI) involves setting up the necessary infrastructure, systems, and processes to enable electronic exchange of business documents between trading partners. Here\u2019s a high-level overview of the steps involved in EDI implementation.',
    highlight: true,
  },
  {
    title: 'API Implementation',
    description:
      'Implementing an Application Programming Interface (API) involves creating a set of rules and protocols that allow different software applications to communicate with each other. APIs enable the integration of functionalities, data, and services across various systems. Here\u2019s a general outline of the steps involved in API implementation.',
    highlight: false,
  },
  {
    title: 'EDI Innovation & Agility',
    description:
      'Electronic Data Interchange (EDI) innovation and agility refer to the ability to leverage new technologies and approaches to enhance the capabilities and flexibility of traditional EDI systems. As businesses evolve and technology advances, there are opportunities to bring innovation and agility to EDI processes. Here are some ways to achieve this.',
    highlight: false,
  },
  {
    title: 'FACET Configuration Implementation',
    description:
      'Implementing a healthcare facet involves configuring and integrating the Facets system to manage various aspects of healthcare operations. Facets is a healthcare management software solution developed by TriZetto, a Cognizant company, which focuses on health plan administration, claims processing, provider networks, and more. Here\u2019s an overview of the steps involved in implementing a healthcare facet system.',
    highlight: false,
  },
  {
    title: 'The Future of Automation & EDI',
    description:
      'Automation and EDI have a synergistic future, as they work together to streamline business processes, enhance efficiency, and enable organizations to adopt the evolving technological landscape. Here\u2019s how automation and EDI are shaping the future.',
    highlight: false,
  },
];

export default function WhitePapersPage() {
  return (
    <>
      <Head>
        <title>White Papers — Echolink Solutions</title>
        <meta
          name="description"
          content="Practical guides on EDI, API, and FACET implementation, and where integration and automation are headed next."
        />
        <meta property="og:title" content="White Papers — Echolink Solutions" />
        <meta property="og:description" content="Practical guides on EDI, API, and FACET implementation, and where integration and automation are headed next." />
      </Head>

      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
          <h1 className="text-white !font-bold text-4xl md:text-5xl">White Papers</h1>
        </div>
      </section>

      <section className="py-[50px] lg:py-[100px]" style={{ background: '#F2F5F7' }}>
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.title}
              className="p-8 flex flex-col"
              style={{
                background: paper.highlight ? '#16003B' : '#FFFFFF',
              }}
            >
              <h2
                className="font-bold text-xl text-center mb-4"
                style={{ color: paper.highlight ? '#FFFFFF' : '#16003B' }}
              >
                {paper.title}
              </h2>
              <p
                className="text-base leading-relaxed text-center mb-6 flex-1"
                style={{ color: paper.highlight ? 'rgba(255,255,255,0.7)' : '#707070' }}
              >
                {paper.description}
              </p>
              {/* DEAD-LINK FIX: same pattern as Traceability's "Explore
                  a pilot" button — no onClick, no href, did nothing.
                  Unlike that one, there's no real PDF asset behind these
                  papers yet (no url/file field in the data above), so
                  there's nothing to "read" directly. Routed to /contact
                  as a reasonable interim destination rather than leaving
                  it dead; swap to a real file link once actual white
                  papers exist. */}
              <Link
                href="/contact"
                className="btn btn--ghost-accent mx-auto"
                style={
                  paper.highlight
                    ? { color: '#FFFFFF', borderColor: '#FF6100' }
                    : undefined
                }
              >
                Read Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
