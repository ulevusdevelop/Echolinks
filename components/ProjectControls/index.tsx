import React from 'react';
import Link from 'next/link';

const capabilities = [
  { title: 'Schedule development', description: 'CPM schedules in Primavera P6 or MS Project, with a clean WBS, sound logic, and resource loading built to survive review.' },
  { title: 'Baselines & change control', description: 'Baseline set and protected, changes logged, and every revision traceable to who approved it and why.' },
  { title: 'Earned value management', description: 'PV, EV, AC, CPI, SPI, and EAC calculated from real progress, on a cadence your team can actually keep.' },
  { title: 'Schedule & cost analysis', description: 'Critical path, float erosion, variance, and recovery options, with a clear read on where the risk sits.' },
  { title: 'Reporting & automation', description: 'Power BI dashboards and automated updates pulled from P6, your ERP, and field data, with no manual rekeying.' },
  { title: 'Verifiable project records', description: 'Baselines, approvals, and progress claims anchored to the trust layer, audit-ready for owners, lenders, and auditors.' },
];
const metrics = [
  { code: 'CPI', label: 'Cost performance', description: 'What you are actually getting for every dollar spent, not what was budgeted.' },
  { code: 'SPI', label: 'Schedule performance', description: 'How much of the planned work is genuinely complete, measured against the baseline.' },
  { code: 'EAC', label: 'Forecast at completion', description: 'Where the project lands if current performance holds, calculated instead of assumed.' },
  { code: 'VAR', label: 'Cost & schedule variance', description: 'The gap between plan and reality, surfaced early enough to still recover.' },
];
const tools = ['Primavera P6', 'MS Project', 'CPM', 'WBS', 'Baselines', 'Resource loading', 'Earned value', 'CPI / SPI', 'EAC / ETC', 'Variance analysis', 'Power BI', 'Excel', 'Power Automate', 'ERP cost feeds'];

// Light "dashboard / spec-sheet" treatment — data-dense content like
// CPI/SPI metrics and tool tags reads naturally as a report on a light
// background, distinct from the pull-quote and card-grid light sections
// elsewhere on the page. Metric cards get colored left-borders like real
// dashboard widgets instead of the dark .card treatment.
export const ProjectControls = () => {
  return (
    <section className="relative bg-[#F2F5F7] py-20 lg:py-28 overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute top-20 left-6 w-5 h-5 rounded-sm hidden lg:block"
        style={{ backgroundColor: '#FF6000' }}
      />
      <div className="wrap">
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <span
            className="font-mono text-xs tracking-tag uppercase inline-block mb-4"
            style={{ color: '#B24300' }}
          >
            PROJECT SCHEDULING, CONTROLS & EVM
          </span>
          <h2 className="text-[#180F39] font-bold text-3xl md:text-4xl leading-tight">
            Know where the project really stands.
          </h2>
          <p className="text-[#434343] text-base leading-relaxed mt-5">
            Schedules that hold up under scrutiny, cost and progress you can defend,
            and earned value that tells the truth. We build the schedule, run the
            controls, and wire the reporting to your live systems, so status is
            measured instead of estimated.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="text-[#180F39] font-bold text-xl mb-5">Measured, not guessed</h3>
            <p className="text-[#434343] text-sm leading-relaxed mb-5 max-w-sm">
              Most projects report status from a spreadsheet that was accurate last
              week. We build the CPM schedule, set the baseline, and connect cost and
              progress data to it, so variance shows up while there is still time to
              act on it.
            </p>
            <p className="text-[#434343] text-sm leading-relaxed max-w-sm">
              Because this runs on the same verifiable layer, the baseline, every
              revision, and every progress claim can be anchored, so what was approved
              and when is provable later.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="bg-[#F2F5F7] rounded-lg p-5 border-l-[3px]"
                style={{ borderLeftColor: '#FF6000' }}
              >
                <h4 className="text-[#180F39] font-bold text-sm mb-1">{c.title}</h4>
                <p className="text-[#434343] text-xs leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {metrics.map((m) => (
            <div
              key={m.code}
              className="bg-[#F2F5F7] rounded-lg p-5 border"
              style={{ borderColor: 'rgba(22,14,55,0.1)' }}
            >
              <span className="font-mono font-bold text-lg" style={{ color: '#B24300' }}>
                {m.code}
              </span>
              <h4 className="text-[#180F39] font-bold text-sm mt-2 mb-2">{m.label}</h4>
              <p className="text-[#434343] text-xs leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-xs px-4 py-2 rounded-pill border"
              style={{ borderColor: 'rgba(102,90,125,0.35)', color: '#665A7D' }}
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-14 max-w-xl">
          <p className="text-[#434343] text-sm leading-relaxed mb-6">
            We deliver it three ways: as a service on your projects, as embedded
            controls staff working alongside your team, or as training that leaves
            your own people running it. Same standard either way.
          </p>
          <Link href="/project-controls" className="btn btn--primary-inverse">
            Talk project controls →
          </Link>
        </div>
      </div>
    </section>
  );
};
