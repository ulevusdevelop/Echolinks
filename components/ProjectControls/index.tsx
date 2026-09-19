import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

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

// REBUILT (careful sweep against the reference HTML, id="pcevm"): this
// component previously mirrored the old site's AI-page template (dark
// hero, then a white "Capabilities" band with a photo in the middle) —
// a reasonable pattern in general, but not what this specific section
// actually is in the more authoritative reference. Checked line by
// line and found real mismatches, not just style drift:
//   1. The hero's eyebrow said "TECHNOLOGY SOLUTIONS" — the reference's
//      actual eyebrow for this section is "Project scheduling,
//      controls & EVM."
//   2. The hero's H1 said "Project Scheduling, Controls & EVM" — that's
//      the reference's EYEBROW text, repositioned as if it were the
//      heading. The reference's real H1 is "Know where the project
//      really stands."
//   3. An entire text block was missing: the reference pairs this
//      section's capabilities list with a left-hand column ("Measured,
//      not guessed," two paragraphs) in the same two-column
//      "train-split" layout Training uses for "The class is the
//      build" — not a heading + photo + list. There was no photo in
//      the reference at all; that was an invented addition.
// Kept the dark hero as this page's opener (this site splits the
// reference's one long page into several standalone pages, so each
// needs its own strong opener the reference itself doesn't need — same
// reasoning already applied to Traceability, White Papers, etc.), but
// corrected its copy and moved the reference's real header content
// there, then rebuilt the capabilities section as the actual
// train-split layout instead of the borrowed photo template.
export const ProjectControls = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
        <div className="wrap">
        <RevealOnScroll>
          {/* CLIENT QA FIX (Project Control page #1 / sitewide hero
              standardization): switched from a bespoke text-xs/font-
              bold/tracking-tag span to the shared `.eyebrow-plain`
              class every other page-opening hero (Insights, Layer,
              etc.) actually uses. */}
          <span className="eyebrow-plain">
            PROJECT SCHEDULING, CONTROLS & EVM
          </span>
          <h1 className="text-white !font-bold text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
            Know where the project really stands.
          </h1>
          {/* WIDENED (direct feedback: "the intro sections... text
              width... span through a bit more width") — was max-w-xl
              (576px), noticeably narrower than the h1 right above it
              (max-w-2xl, 672px), so the paragraph wrapped tighter than
              the heading it sits under. Matched to max-w-2xl so both
              lines now share the same right edge. */}
          <p className="text-white text-[20px] font-normal leading-relaxed max-w-2xl mb-10">
            Schedules that hold up under scrutiny, cost and progress you can defend,
            and earned value that tells the truth. We build the schedule, run the
            controls, and wire the reporting to your live systems, so status is
            measured instead of estimated.
          </p>
          <span className="text-white text-2xl" aria-hidden="true">↓</span>
        </RevealOnScroll>
        </div>
      </section>

      {/* Measured, not guessed / Capabilities — the reference's actual
          train-split layout, not a heading + photo + list. */}
      <section className="bg-white py-[50px] lg:py-[100px]">
        <div className="wrap grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <RevealOnScroll>
          <div>
            <h2 className="font-bold text-2xl md:text-3xl leading-tight mb-5" style={{ color: '#16003B' }}>
              Measured, not guessed
            </h2>
            <p className="text-[#434343] text-base leading-relaxed mb-5 max-w-sm">
              Most projects report status from a spreadsheet that was accurate last
              week. We build the CPM schedule, set the baseline, and connect cost and
              progress data to it, so variance shows up while there is still time to
              act on it.
            </p>
            <p className="text-[#434343] text-base leading-relaxed max-w-sm">
              Because this runs on the same verifiable layer, the baseline, every
              revision, and every progress claim can be anchored, so what was
              approved and when is provable later.
            </p>
          </div>
          </RevealOnScroll>
          <RevealOnScroll delayMs={150}>
          <div className="flex flex-col">
            {capabilities.map((c, i) => (
              <div
                key={c.title}
                className={`py-4 ${i < capabilities.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}
              >
                <p className="text-[#434343] text-base leading-relaxed">
                  <span className="font-semibold" style={{ color: '#16003B' }}>{c.title}.</span>{' '}
                  {c.description}
                </p>
              </div>
            ))}
          </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-[50px] lg:py-[100px]" style={{ background: '#F2F5F7' }}>
        <RevealOnScroll>
        <div className="wrap grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <h2 className="font-bold text-3xl" style={{ color: '#16003B' }}>
              Benefits
            </h2>
            <p className="text-[#434343] text-base mt-3">Our project controls solution will help:</p>
          </div>
          <div className="flex flex-col">
            {metrics.map((m, i) => (
              <div
                key={m.code}
                className={`py-5 ${i < metrics.length - 1 ? 'border-b border-[#DCDFE3]' : ''}`}
              >
                <p className="text-[#434343] text-base leading-relaxed">
                  <span className="font-bold" style={{ color: '#FF6100' }}>{m.code}</span>
                  {' — '}
                  <span className="font-semibold" style={{ color: '#16003B' }}>{m.label}.</span>{' '}
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        {/* ALIGNMENT FIX (direct instruction): these chips previously
            sat in a full-width wrap, not aligned with anything above
            them. Now uses the exact same grid ratio as the Benefits
            row above (1fr/1.4fr) with an empty first column, so the
            chips and closing paragraph land directly under the right
            column (the metrics list) instead of starting from the far
            left edge. */}
        <div className="wrap grid md:grid-cols-[1fr_1.4fr] gap-10 mt-14">
          <div aria-hidden="true" />
          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-4 py-2 rounded-none border"
                  style={{ borderColor: 'rgba(102,90,125,0.35)', color: '#665A7D' }}
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="max-w-xl">
              <p className="text-[#434343] text-base leading-relaxed mb-6">
                We deliver it three ways: as a service on your projects, as embedded
                controls staff working alongside your team, or as training that leaves
                your own people running it. Same standard either way.
              </p>
              <Link href="/contact" className="btn btn--primary-inverse">
                Talk project controls →
              </Link>
            </div>
          </div>
        </div>
        </RevealOnScroll>
      </section>
    </>
  );
};
