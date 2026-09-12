import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

// STYLE FIX (Project Control item 2): restructured to mirror the old
// site's page template (verified directly against the AI page PDF) —
// dark hero (eyebrow, title, description, down arrow), then a white
// "Capabilities" band (heading + photo + divided list), then a light
// gray "Benefits" band (heading + divided list). Previously this was a
// single light "dashboard" section with no hero and card-style
// capability boxes instead of the mirrored divided-list treatment.
export const ProjectControls = () => {
  return (
    <>
      {/* Hero */}
      {/* PADDING CONSISTENCY FIX: was py-24 md:py-28 (96px/112px
          symmetric) while every other page-top dark hero sitewide uses
          pt-28 (112px top) with a smaller, separate bottom value. Not
          broken — 96px already clears the header fine — but it was one
          more distinct padding treatment in a set of sections that
          should all feel like the same pattern. Matched the dominant
          convention. */}
      <section className="relative overflow-hidden pt-28 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
          <span className="font-mono text-xs font-bold tracking-tag uppercase block mb-4" style={{ color: '#FF6100' }}>
            TECHNOLOGY SOLUTIONS
          </span>
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
            Project Scheduling, Controls & EVM
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mb-10">
            Schedules that hold up under scrutiny, cost and progress you can defend,
            and earned value that tells the truth. We build the schedule, run the
            controls, and wire the reporting to your live systems, so status is
            measured instead of estimated.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </div>
      </section>

      {/* Capabilities */}
      {/* ALIGNMENT FIX (perfection sweep): checked directly against the
          old site's own equivalent layout (automation.pdf) — that
          reference only center-aligns this heading/photo/list pattern
          when the list is short (its own example has 4 compact items).
          This list has 6, making the column noticeably taller, so
          center-aligning the heading left it visually stranded with a
          lot of dead space above and below. Switched to top-alignment,
          which is what the reference itself does for its own longer,
          denser lists (the accordion-style "process falls under three
          categories" section). Traceability and the ERP page's
          equivalent sections were checked too — both have short lists
          (3 and 4 items) matching the reference's compact case, so
          they're left as center-aligned. */}
      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap grid md:grid-cols-[1fr_auto_1fr] gap-10 items-start">
          <div>
            <h2 className="font-bold text-2xl md:text-3xl leading-tight" style={{ color: '#FF6100' }}>
              Our Project Controls Capabilities
            </h2>
          </div>
          <div className="relative w-[230px] h-[280px] overflow-hidden rounded-none mx-auto hidden md:block" style={{ background: '#16003B' }}>
            <Image
              src="https://picsum.photos/seed/echolink-project-controls/360/440"
              alt=""
              fill
              sizes="230px"
              className="object-cover"
              style={{ filter: 'grayscale(1) contrast(1.1)' }}
              unoptimized
            />
            <div className="absolute inset-0 mix-blend-color" style={{ background: '#16003B' }} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`py-4 ${i < capabilities.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
              >
                <p className="text-[#434343] text-sm leading-relaxed">
                  <span className="font-semibold" style={{ color: '#16003B' }}>{c.title}.</span>{' '}
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-[50px] lg:py-[100px]" style={{ background: '#F2F5F7' }}>
        <div className="wrap grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <h2 className="font-bold text-3xl" style={{ color: '#16003B' }}>
              Benefits
            </h2>
            <p className="text-[#434343] text-sm mt-3">Our project controls solution will help:</p>
          </div>
          <div className="flex flex-col">
            {metrics.map((m, i) => (
              <div
                key={m.code}
                className={`py-5 ${i < metrics.length - 1 ? 'border-b border-[#DCDFE3]' : ''}`}
              >
                <p className="text-[#434343] text-sm leading-relaxed">
                  <span className="font-mono font-bold" style={{ color: '#FF6100' }}>{m.code}</span>
                  {' — '}
                  <span className="font-semibold" style={{ color: '#16003B' }}>{m.label}.</span>{' '}
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap mt-14">
          <div className="flex flex-wrap gap-2 mb-10">
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

          <div className="max-w-xl">
            <p className="text-[#434343] text-sm leading-relaxed mb-6">
              We deliver it three ways: as a service on your projects, as embedded
              controls staff working alongside your team, or as training that leaves
              your own people running it. Same standard either way.
            </p>
            <Link href="/contact" className="btn btn--primary-inverse">
              Talk project controls →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
