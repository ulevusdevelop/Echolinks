// pages/industries/healthcare.tsx
import Head from 'next/head';
import { IndustryHero } from '@/components/IndustryHero';

// NEW page, mirrored from the old site's /healthcare page: photo hero,
// then alternating white/dark client case-study blocks. Only the
// clients actually shown in the reference (PeaceHealth, Arrowhead
// Engineering) are included — no invented client names.
export default function HealthcarePage() {
  return (
    <>
      <Head>
        <title>Healthcare — Echolink Solutions</title>
        <meta
          name="description"
          content="Echolink Solutions helps healthcare providers integrate EDI, HL7, and EMR systems while staying compliant with HIPAA and Meaningful Use requirements."
        />
        <meta property="og:title" content="Healthcare — Echolink Solutions" />
        <meta property="og:description" content="Echolink Solutions helps healthcare providers integrate EDI, HL7, and EMR systems while staying compliant with HIPAA and Meaningful Use requirements." />
      </Head>
      <IndustryHero
        title="Healthcare"
        description="Integration, automation, and verifiable records for providers who cannot afford downtime or a compliance gap."
        photoSeed="echolink-healthcare"
      />

      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap grid md:grid-cols-[1fr_1.6fr] gap-12">
          <div>
            <p className="font-bold text-lg mb-1" style={{ color: '#16003B' }}>
              PeaceHealth
            </p>
            <p className="text-xs" style={{ color: '#707070' }}>Vancouver, Wash.</p>
          </div>
          <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: '#434343' }}>
            <p>
              Echolink Solutions provided a solution for PeaceHealth optometry clinic in
              Vancouver, Washington, setting up optometry-specific templates.
              Customizing EPIC EMR systems that offer specialized templates and
              workflows designed specifically for optometry practices. These templates
              included standard optometry forms, examination templates, refraction
              documentation, and other relevant optometry-specific features.
            </p>
            <p>
              We integrated EDI/HL7 with their diagnostic equipment, setting up their
              EMR solutions to integrate with the diagnostic equipment commonly used in
              optometry clinics. This integration allowed for seamless transfer of data
              from instruments like autorefractors, tonometers, retinal cameras, or
              visual field analyzers, eliminating the need for manual data entry.
            </p>
            <p>
              We ensured the EMR solution complies with relevant regulations and
              standards, such as HIPAA (Health Insurance Portability and Accountability
              Act) and Meaningful Use requirements, supporting secure data exchange and
              tools for reporting and attesting to meaningful use objectives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[50px] lg:py-[100px]" style={{ background: '#16003B' }}>
        <div className="wrap grid md:grid-cols-[1fr_1.6fr] gap-12">
          <div>
            <p className="text-white font-bold text-lg mb-1">Arrowhead Engineering</p>
            <p className="text-white/50 text-xs">Engineered Products</p>
          </div>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-white">
            <p>
              Echolink Solutions helped set up and integrate Arrowhead Engineering&apos;s
              EDI and ERP systems. The EDI solution helped Arrowhead Engineering
              exchange data, such as purchase orders, invoices, advance shipping
              notices, and other transactional documents, with their ERP system to
              automate and streamline processes.
            </p>
            <p>
              We helped with their compliance with industry standards, ensuring their
              EDI solution supports the necessary industry standards, such as ANSI X12
              or EDIFACT, which are widely used in manufacturing and supply chain
              operations. Setting up their compliance with these standards ensured
              compatibility and interoperability with trading partners, facilitating
              smooth data exchange.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
