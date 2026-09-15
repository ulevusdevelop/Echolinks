// pages/industries/transportation.tsx
import Head from 'next/head';
import { IndustryHero } from '@/components/IndustryHero';

export default function TransportationPage() {
  return (
    <>
      <Head>
        <title>Transportation & Logistics — Echolink Solutions</title>
        <meta
          name="description"
          content="EDI and API integration for logistics providers — onboard partners faster and get real-time shipment visibility."
        />
        <meta property="og:title" content="Transportation & Logistics — Echolink Solutions" />
        <meta property="og:description" content="EDI and API integration for logistics providers — onboard partners faster and get real-time shipment visibility." />
      </Head>
      <IndustryHero
        title="Transportation & Logistics"
        description="A versatile integration framework that keeps carriers, partners, and shipment data moving in sync."
        photoSeed="echolink-transport"
      />

      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap grid md:grid-cols-[1fr_1.6fr] gap-12">
          <div>
            <span className="font-bold text-2xl block" style={{ color: '#FF6100' }}>
              Enhanced Integration
            </span>
          </div>
          <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: '#434343' }}>
            <p>
              Logistics providers require a versatile and extensible framework that
              supports both EDI and API integration alternatives. EDI automates the
              processing of bulk data by allowing transfer of business documents such as
              purchase orders, invoices, ASNs, and more. EDI standards allow for rapid
              onboarding while ensuring regulatory compliance. APIs are flexible and
              ideal for real-time data exchange. To account for the absence of
              standards, APIs need to be designed and properly implemented to meet the
              business need and comply with regulations.
            </p>
            <p>
              With 10+ carrier integrations, Echolink Solutions enables companies to
              onboard partners faster, and ensure seamless information flow across
              different entities that in turn provides for real-time shipment
              visibility.
            </p>
            <p>
              We offer cloud-based, fully managed 24x7 EDI services that span
              onboarding, connectivity with partners, flow configuration, translation,
              mapping, compliance reporting, and incident resolution. Our EDI
              integration services comply with ANSI X12 standards. We use secure and
              encrypted communication protocols, Applicability Statement 2 (AS2), EDI
              Value Added Network (VAN), and others, for onboarding trading partners and
              data transactions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
