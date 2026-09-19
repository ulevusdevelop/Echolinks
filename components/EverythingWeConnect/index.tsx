import React from 'react';
import { Disclosure } from '@headlessui/react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// CONTENT RESTORATION (sitewide content-completeness scan): a previous
// round's comment claimed all 10 counts were "confirmed against the
// reference screenshot... read directly." Checked again against the
// actual reference HTML (more authoritative than a zoomed screenshot
// crop) and 8 of the 10 counts were wrong. More significantly: the
// reference doesn't summarize each category in one sentence at all —
// it lists the actual named technologies/protocols as individual chips
// (e.g. "EDI X12", "APIs", "ERP"... each its own tag). The single-
// sentence summary here was a paraphrase standing in for a real,
// different piece of UI. Rebuilt with the exact chip lists and
// corrected counts below.
const categories = [
  { title: 'ENTERPRISE INTEGRATION', count: 7, chips: ['EDI X12', 'APIs', 'ERP', 'WMS', 'MES', 'SCADA', 'HL7 / FHIR'] },
  { title: 'PROJECT CONTROLS & SCHEDULING', count: 9, chips: ['Primavera P6', 'MS Project', 'CPM Scheduling', 'WBS', 'Baselines', 'Earned Value', 'Cost Control', 'Resource Loading', 'Power BI Reporting'] },
  { title: 'DATA & ANALYTICS', count: 6, chips: ['ETL / ELT', 'Data Warehouses', 'Data Lakes', 'MDM', 'BI Platforms', 'Real-Time Streaming'] },
  { title: 'CLOUD & MIDDLEWARE', count: 6, chips: ['iPaaS', 'ESB', 'API Gateways', 'Event-Driven', 'Message Queues', 'Microservices'] },
  { title: 'SECURITY & IDENTITY', count: 7, chips: ['SSO', 'IAM', 'Active Directory', 'OAuth 2.0', 'OpenID Connect', 'SAML', 'MFA'] },
  { title: 'FINANCIAL SYSTEMS', count: 6, chips: ['AP / AR Automation', 'Banking', 'Payment Gateways', 'ACH', 'SWIFT', 'Treasury'] },
  { title: 'AI & AUTOMATION', count: 7, chips: ['RPA', 'AI Agents', 'ML Platforms', 'Generative AI', 'Document AI', 'Process Mining', 'Workflow Automation'] },
  { title: 'OPERATIONS & MACHINES', count: 6, chips: ['Robotics', 'PLC', 'MQTT', 'OPC UA', 'IoT Sensors', 'Fleet Managers'] },
  { title: 'COMMUNICATION', count: 5, chips: ['Email', 'SMS Gateways', 'VoIP', 'Contact Centers', 'Collaboration'] },
  { title: 'BLOCKCHAIN & WEB3', count: 7, chips: ['Blockchain Networks', 'Smart Contracts', 'Decentralized Identity', 'Traceability', 'Tokenization', 'Polygon', 'Hyperledger'] },
];

// STYLE FIX (Layer Page item 7): mirrored from the old site's
// /automation page accordion (same reference as the Layer section's
// "How it works" fix) — single-column, sharp-cornered white rows with
// a thin gray border, navy text, and a "+"/"-" toggle icon. Previous
// version was a 2-column grid of dark rounded pills with a chevron
// icon.
export const EverythingWeConnect = () => {
  return (
    <section id="everything-we-connect" className="bg-white relative overflow-hidden py-[50px] lg:py-[100px]">
      <span
        aria-hidden="true"
        className="absolute top-8 right-16 w-4 h-4 hidden lg:block"
        style={{ background: '#FF6100' }}
      />
      <div className="wrap">
        <RevealOnScroll>
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="eyebrow-plain">SOLUTIONS WE HANDLE</span>
          <h2 className="font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#16003B' }}>
            Everything we connect, in one place.
          </h2>
          <p className="text-[#434343] text-[20px] font-normal leading-relaxed mt-5">
            From core enterprise systems to AI, machines, and blockchain. Tap a
            category to see what we cover. If it has an API, a feed, or a protocol,
            we wire it in.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="max-w-4xl mx-auto border-t border-[#E5E5E5]">
          {categories.map((cat) => (
            <Disclosure key={cat.title}>
              {({ open }) => (
                <div className="border-b border-[#E5E5E5]">
                  <Disclosure.Button className="w-full flex items-center justify-between py-6">
                    <span className="flex items-center gap-4 text-left">
                      <span
                        className="text-xl leading-none w-5 flex-shrink-0"
                        style={{ color: '#16003B' }}
                        aria-hidden="true"
                      >
                        {open ? '−' : '+'}
                      </span>
                      <span className="font-bold" style={{ color: '#16003B' }}>
                        {cat.title}
                      </span>
                    </span>
                    <span className="text-xs" style={{ color: '#707070' }}>
                      {cat.count}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="pb-6 pl-9 text-left">
                    <div className="flex flex-wrap gap-2">
                      {cat.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-xs px-3 py-1.5 rounded-none border"
                          style={{ color: '#434343', borderColor: '#E5E5E5', background: '#F7F7F9' }}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
        </RevealOnScroll>

        {/* CLIENT QA FIX (Services page #3): "Keep the last sentence
            here centered." This had `text-center` but no explicit
            max-w-* class of its own, so the sitewide `p { max-width:
            68ch; }` line-length fallback (globals.css) clipped its
            box to ~68ch while leaving that box flush against the
            left edge of `.wrap` (default block behavior, no
            mx-auto) — text-center only centered the words *inside*
            that narrow, left-stuck box, which read as left-aligned on
            the page overall. Added max-w-2xl + mx-auto, same pattern
            as the eyebrow/heading block above, so the box itself is
            centered before the text inside it is. */}
        <p className="text-center mt-10 text-base max-w-2xl mx-auto" style={{ color: '#707070' }}>
          A selection of what we connect, not the full list.
        </p>
      </div>
    </section>
  );
};
