// pages/services/edi-api-managed-services.tsx
import Head from 'next/head';
import {
  CheckIcon,
  ArrowRightIcon,
  Squares2X2Icon,
  ComputerDesktopIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';

// NEW page, mirrored directly from the old site's own
// /edi-api-managed-services page — this is the actual source of the
// icon-grid pattern (navy square icon, orange heading, gray body text)
// already reused across WhoWeServe, CoreServices, and elsewhere.
const capabilities = [
  { title: 'Value-Added EDI and API software solutions.', description: 'Echolink Solutions offers a comprehensive Value-Added EDI/API solution for retailers, suppliers, Healthcare Facilities manufacturers, and their trading partners. Our highly secure, high-availability platform interconnects trading partners swiftly and securely across the Globe.', Icon: CheckIcon },
  { title: 'A popular and risk-free way to implement EDI and API.', description: 'Outsource your B2B EDI/API to us and enjoy a \u2018pay for what you use\u2019 managed service with 24x7 monitoring as standard. Whether you\u2019re just starting with an EDI/API solution or looking to outsource or replace an older EDI/API software system, a managed service is the most popular and risk-free way to implement EDI/API.', Icon: ArrowRightIcon },
  { title: 'Use Echolink Solutions Infrastructure and save.', description: 'Rather than incurring significant up-front costs of software and hardware, an Echolink Solutions B2B EDI/API Managed Service is a complete solution; running at a secure data center and including all the EDI/API software you need. Echolink Solutions runs a full disaster recovery system, helpdesk support, and 24x7 monitoring for high-security links.', Icon: Squares2X2Icon },
  { title: 'Bespoke EDI/API Software Solutions.', description: 'Our service, which runs on our in-house custom-designed software, is already used by many large retailers, manufacturers, and healthcare providers, along with their suppliers. Our EDI/API software is also tailored for many small and medium-sized businesses to connect to their trading partners via EDI.', Icon: ComputerDesktopIcon },
  { title: 'Full integration with ERP Systems and Blockchain Platform.', description: 'Enjoy peace of mind knowing that our EDI/API software solutions are fully integrated with all major finance, operations, Blockchain, and ERP solutions.', Icon: ArrowsRightLeftIcon },
];

const engagement = [
  'We analyzed your current solution, identification of gaps or problems, and made suggestions for improvement (e.g., high availability, consolidation of the EDI/API systems to be replaced, review of support processes, in-house solution vs. on-premises vs. cloud)',
  'Preparation of current system for new technologies and know-how transfer',
  'Planning of new or customized EDI/API processes, functions, user-defined APIs, or reports',
];
const engagement2 = [
  'Planning of new or customized EDI/API processes and functions using Blockchain and Artificial Intelligence',
  'Training for the implemented technologies for power users, administrators, and customer help desk',
  'Documentation, e.g., technical solution description, process manual, support manual, business continuity of services used.',
];

export default function EdiApiManagedServicesPage() {
  return (
    <>
      <Head>
        <title>EDI/API Managed Services — Echolink Solutions</title>
        <meta
          name="description"
          content="Value-Added EDI and API software solutions, fully managed, with 24x7 monitoring and full ERP and Blockchain integration."
        />
        <meta property="og:title" content="EDI/API Managed Services — Echolink Solutions" />
        <meta property="og:description" content="Value-Added EDI and API software solutions, fully managed, with 24x7 monitoring and full ERP and Blockchain integration." />
      </Head>

      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
          <span className="text-xs font-bold tracking-tag uppercase block mb-3" style={{ color: '#FF6100' }}>
            MANAGED SERVICES
          </span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl mb-6">
            EDI/API Managed Services
          </h1>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </div>
      </section>

      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap">
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {capabilities.map((c) => (
              <div key={c.title}>
                <span
                  className="w-12 h-12 flex items-center justify-center mb-4"
                  style={{ background: '#16003B' }}
                >
                  <c.Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </span>
                <h4 className="font-bold mb-2" style={{ color: '#FF6100' }}>
                  {c.title}
                </h4>
                <p className="text-[#434343] text-base leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[50px] lg:py-[100px]" style={{ background: '#16003B' }}>
        <div className="wrap grid md:grid-cols-[1fr_1fr_1fr] gap-10">
          <div className="flex flex-col">
            {engagement.map((item, i) => (
              <p
                key={item}
                className={`text-white/70 text-base leading-relaxed py-4 ${
                  i < engagement.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col">
            {engagement2.map((item, i) => (
              <p
                key={item}
                className={`text-white/70 text-base leading-relaxed py-4 ${
                  i < engagement2.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                {item}
              </p>
            ))}
          </div>
          <div className="flex items-center">
            <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight">
              Echolink Solutions Managed Full service
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}
