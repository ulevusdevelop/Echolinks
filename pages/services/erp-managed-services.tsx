// pages/services/erp-managed-services.tsx
import Head from 'next/head';
import Image from 'next/image';
import { PencilIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// NEW page, mirrored directly from the old site's own
// /erp-managed-services page. Content read directly from the
// reference: intro paragraph, 2 capability items, a dark "pain points"
// band with photo + checklist, and a two-column industries-served list.
const capabilities = [
  {
    title: 'Making Strategic Decisions with Our ERP Assessment Services',
    description: 'The initiation of software selection can feel daunting with the large number of stakeholders that will influence and be affected by the final decision. Echolink Solutions will walk you through a step-by-step methodology to enable your organization to make the right cultural, financial, and strategic decisions when evaluating vendors.',
    Icon: PencilIcon,
  },
  {
    title: 'Embracing Your Culture',
    description: 'Echolink Solutions will take the time to learn your culture and understand the pain points of your existing systems. As part of our ERP assessment services, we build a custom plan and criteria for streamlining your business processes by determining the level of change your organization can handle. Our ERP software selection consultants help you gather requirements and select the technology that will enable an optimal customer experience.',
    Icon: UserGroupIcon,
  },
];

const weHelpYou = [
  'Understand and agree on your competitive advantages.',
  'Discuss and document the pain points.',
  'Educate and align the executive and project team.',
  'Prioritize your needs and align the technology.',
];

const industriesLeft = ['Manufacturing & Distribution', 'Professional Services', 'Government & Non-Profit', 'Healthcare & Medical Supplies', 'Aerospace & Defense', 'Retail'];
const industriesRight = ['Energy', 'Oil & Gas', 'Construction', 'Agriculture', 'Food & Beverage', 'And more…'];

export default function ErpManagedServicesPage() {
  return (
    <>
      <Head>
        <title>ERP Managed Services — Echolink Solutions</title>
        <meta
          name="description"
          content="Installation, configuration, customization, integration, training, and ongoing support for your ERP system."
        />
        <meta property="og:title" content="ERP Managed Services — Echolink Solutions" />
        <meta property="og:description" content="Installation, configuration, customization, integration, training, and ongoing support for your ERP system." />
      </Head>

      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap max-w-2xl">
          <span className="text-xs font-bold tracking-tag uppercase block mb-3" style={{ color: '#FF6100' }}>
            MANAGED SERVICES
          </span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl mb-6">
            ERP Managed Services
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Echolink Solutions offer a range of services related to ERP systems,
            including installation, configuration, customization, integration,
            training, and ongoing support. We are responsible for maintaining your ERP
            system, ensuring that it is updated with the latest patches and security
            measures, and troubleshooting any issues that arise.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </div>
      </section>

      <section className="bg-white py-[50px] lg:py-[100px] relative overflow-hidden">
        <span className="absolute top-16 right-16 w-6 h-6 hidden lg:block" style={{ background: '#FF6100' }} aria-hidden="true" />
        <span className="absolute top-24 right-24 w-8 h-8 hidden lg:block" style={{ background: '#16003B' }} aria-hidden="true" />
        <div className="wrap">
          <p className="max-w-xl text-base leading-relaxed mb-14" style={{ color: '#16003B' }}>
            By outsourcing the management of their ERP system to Echolink Solutions,
            your organizations can focus on their core business activities while
            leaving the technical aspects of your ERP system to us. This has always
            resulted in improved system performance, reduced downtime, and increased
            user satisfaction.
          </p>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            {capabilities.map((c) => (
              <div key={c.title}>
                <span
                  className="w-12 h-12 flex items-center justify-center mb-4"
                  style={{ background: '#16003B' }}
                >
                  <c.Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </span>
                <h4 className="font-bold mb-2" style={{ color: '#FF6100' }}>{c.title}</h4>
                <p className="text-[#434343] text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[50px] lg:py-[100px]" style={{ background: '#16003B' }}>
        <div className="wrap grid md:grid-cols-[1fr_auto_1fr] gap-10 items-center">
          <div>
            <h2 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-5">
              We Understand Your Organization Pain Points
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Often, organizations selecting new technology have outgrown their
              current systems and are using Excel to hold the ship together. We help
              these organizations move more rationally, logically, and aligned.
            </p>
          </div>
          <div className="relative w-[230px] h-[280px] overflow-hidden rounded-none mx-auto hidden md:block" style={{ background: '#16003B' }}>
            <Image
              src="https://picsum.photos/seed/echolink-erp/460/560"
              alt=""
              fill
              sizes="230px"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
              unoptimized
            />
            <div className="absolute inset-0 mix-blend-color" style={{ background: '#16003B' }} aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-tag uppercase block mb-4" style={{ color: '#FF6100' }}>
              WE HELP YOU
            </span>
            <div className="flex flex-col">
              {weHelpYou.map((item, i) => (
                <p
                  key={item}
                  className={`text-white/70 text-sm leading-relaxed py-3 ${
                    i < weHelpYou.length - 1 ? 'border-b border-white/15' : ''
                  }`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap grid md:grid-cols-[1fr_2fr] gap-12">
          <h2 className="font-bold text-2xl md:text-3xl leading-tight" style={{ color: '#FF6100' }}>
            Broad Industry Experience Industries We Serve
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10">
            <div className="flex flex-col">
              {industriesLeft.map((item, i) => (
                <p
                  key={item}
                  className={`text-sm py-3 ${i < industriesLeft.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                  style={{ color: '#16003B' }}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              {industriesRight.map((item, i) => (
                <p
                  key={item}
                  className={`text-sm py-3 ${i < industriesRight.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
                  style={{ color: '#16003B' }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
