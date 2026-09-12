import React from 'react';
import { Disclosure } from '@headlessui/react';

// Category counts confirmed against the reference screenshot (zoomed
// crop, all 10 values read directly, not estimated): Enterprise
// Integration 7, Project Controls & Scheduling 9, Data & Analytics 5,
// Cloud & Middleware 4, Security & Identity 4, Financial Systems 5,
// AI & Automation 6, Operations & Machines 4, Communication 3,
// Blockchain & Web3 4. All match below — no changes needed.
const categories = [
  { title: 'ENTERPRISE INTEGRATION', count: 7, items: 'EDI, APIs, ERP, WMS, MES, SCADA, and HL7/FHIR, connected without rip and replace.' },
  { title: 'PROJECT CONTROLS & SCHEDULING', count: 9, items: 'Primavera P6, MS Project, CPM, WBS, baselines, resource loading, earned value.' },
  { title: 'DATA & ANALYTICS', count: 5, items: 'Power BI, Excel, data warehouses, and reporting pipelines fed by live system data.' },
  { title: 'CLOUD & MIDDLEWARE', count: 4, items: 'Event-driven middleware and API gateways connecting cloud and on-prem systems.' },
  { title: 'SECURITY & IDENTITY', count: 4, items: 'Access controls, policy enforcement, and audit trails wired into every agent action.' },
  { title: 'FINANCIAL SYSTEMS', count: 5, items: 'AP/AR, invoicing, reconciliation, and cost systems connected to the trust layer.' },
  { title: 'AI & AUTOMATION', count: 6, items: 'Decentralized AI agents, automation workflows, and robotics process control.' },
  { title: 'OPERATIONS & MACHINES', count: 4, items: 'Robots, fleets, and line controls transacting and logging completed work.' },
  { title: 'COMMUNICATION', count: 3, items: 'Messaging, notification, and workflow tools kept in sync with system-of-record data.' },
  { title: 'BLOCKCHAIN & WEB3', count: 4, items: 'Cryptographic provenance, smart contracts, and on-chain audit trails.' },
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
        <div className="max-w-xl mx-auto text-center mb-14">
          <span className="eyebrow-plain">SOLUTIONS WE HANDLE</span>
          <h2 className="font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#16003B' }}>
            Everything we connect, in one place.
          </h2>
          <p className="text-[#434343] text-base leading-relaxed mt-5">
            From core enterprise systems to AI, machines, and blockchain. Tap a
            category to see what we cover. If it has an API, a feed, or a protocol,
            we wire it in.
          </p>
        </div>

        <div className="max-w-3xl mx-auto border-t border-[#E5E5E5]">
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
                    <span className="font-mono text-xs" style={{ color: '#707070' }}>
                      {cat.count}
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="pb-6 pl-9 text-sm text-[#434343] leading-relaxed text-left">
                    {cat.items}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>

        <p className="text-center mt-10 text-sm" style={{ color: '#707070' }}>
          A selection of what we connect, not the full list.
        </p>
      </div>
    </section>
  );
};
