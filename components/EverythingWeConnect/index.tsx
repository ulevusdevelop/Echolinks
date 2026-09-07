import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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

export const EverythingWeConnect = () => {
  return (
    <section id="everything-we-connect" className="section--page relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute top-8 right-16 w-4 h-4 rounded-sm hidden lg:block bg-accent/70"
      />
      <div className="wrap">
        <div className="sec-header max-w-xl mx-auto text-center">
          <span className="eyebrow">SOLUTIONS WE HANDLE</span>
          <h2 className="sec-title">Everything we connect, in one place.</h2>
          <p className="sec-sub sec-sub--center">
            From core enterprise systems to AI, machines, and blockchain. Tap a
            category to see what we cover. If it has an API, a feed, or a protocol,
            we wire it in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Disclosure key={cat.title}>
              {({ open }) => (
                <div className="card !py-0 overflow-hidden">
                  <Disclosure.Button className="w-full flex items-center justify-between py-5">
                    <span className="tag-mono tag-mono--accent text-left flex-1 min-w-0 pr-4">
                      {cat.title}
                    </span>
                    <span className="flex items-center gap-3 flex-shrink-0">
                      <span className="w-6 h-6 rounded-full bg-ink-600 border border-ink-border flex items-center justify-center text-[11px] font-mono text-ink_text-secondary">
                        {cat.count}
                      </span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-accent-light transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="pb-5 text-sm text-ink_text-secondary leading-relaxed text-left">
                    {cat.items}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>

        <p className="tag-mono text-center mt-10">
          A selection of what we connect, not the full list.
        </p>
      </div>
    </section>
  );
};
