import React from 'react';
import Link from 'next/link';

const trainingCards = [
  { title: 'Hands-on, not theory', description: 'Live labs on your own systems and data, not generic demos.' },
  { title: 'Project controls & EVM cohorts', description: 'Primavera P6, CPM, baselines, earned value, Excel, Power BI, and automation, taught as a working build.' },
  { title: 'Role-based tracks', description: 'Different paths for operators, analysts, schedulers, developers, and leadership.' },
  { title: 'Bootcamps & workshops', description: 'Focused cohorts on AI agents, automation, blockchain, integration.' },
  { title: 'Certification & curriculum', description: 'Assessments and reusable material so knowledge stays in-house.' },
  { title: 'Ongoing enablement', description: 'Support after launch so adoption sticks and your team keeps growing.' },
];
const roles = ['Project Scheduler', 'Project Controls Analyst', 'AI & Automation Specialist', 'Integration Developer', 'API Developer', 'Facets Configuration Analyst', 'HL7/FHIR Specialist', 'ERP Consultant'];

export const Training = () => {
  return (
    <section className="section--page">
      <div className="wrap">
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow">TRAINING & ENABLEMENT</span>
          <h2 className="sec-title">
            The tech is only half the job. Your people are the other half.
          </h2>
          <p className="sec-sub sec-sub--center">
            Most companies spend heavily integrating AI, blockchain, and automation,
            then leave the people who use it to figure it out alone. That is where the
            value leaks. We close that gap with hands-on training built around your
            actual systems.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="text-white font-bold text-xl mb-5">The class is the build</h3>
            <p className="text-ink_text-secondary text-sm leading-relaxed mb-5 max-w-sm">
              We do not teach from slides about someone else&apos;s example. Your team
              learns by building and operating your real workflows, the same agents,
              integrations, schedules, and trust records they will use on Monday.
            </p>
            <p className="text-white text-sm font-semibold leading-relaxed max-w-sm">
              By the end, your people are not just trained. They are running it.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {trainingCards.map((c) => (
              <div key={c.title} className="card !py-5 border-l-2 border-l-accent">
                <h4 className="text-white font-bold text-sm mb-1">{c.title}</h4>
                <p className="text-ink_text-secondary text-xs leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Duotone photo-band treatment, echoing the old site's "Tech
            Made Easy" section (photo behind a training/education claim).
            Placeholder gradient stands in for a real photo — same
            reasoning as the Hero: dropping in an actual photo of a
            training session or workspace here would complete it. */}
        <div
          className="card mt-20 relative overflow-hidden grid md:grid-cols-[1.4fr_1fr] gap-12 items-center"
          style={{
            backgroundImage:
              'linear-gradient(100deg, rgba(22,14,55,0.94) 0%, rgba(22,14,55,0.75) 55%, rgba(255,96,0,0.18) 100%), linear-gradient(135deg, #271A5F 0%, #180F39 60%, #3D1F0A 100%)',
          }}
        >
          {/* Subtle growth-path illustration, low-opacity background
              texture — reinforces "careers, now pointed at what comes
              next" without competing with the 2,000+ stat, which stays
              the visual focal point. */}
          <svg
            viewBox="0 0 400 200"
            className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-[0.08] pointer-events-none hidden md:block"
            aria-hidden="true"
          >
            <path
              d="M0 180 L80 150 L160 160 L240 90 L320 100 L400 20"
              fill="none"
              stroke="#FF6000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="400" cy="20" r="8" fill="#FF6000" />
          </svg>
          <div>
            <h3 className="text-white font-bold text-2xl mb-5">
              A track record of 2,000 careers, now pointed at what comes next
            </h3>
            <p className="text-ink_text-secondary text-sm leading-relaxed mb-4 max-w-md">
              Echolink Solutions has trained more than 2,000 people into technology
              careers through its institute, built on enterprise integration and
              healthcare IT. The platform and the method carry forward. The curriculum
              has moved to where the work is going: decentralized AI and agents,
              automation and robotics, verifiable traceability, and project controls
              with earned value.
            </p>
            <p className="text-ink_text-secondary text-sm leading-relaxed mb-6 max-w-md">
              Same approach as every client engagement. The class is the build, on real
              systems, with technical and business skills taught together.
            </p>
            <Link href="/training" className="btn btn--ghost">
              Talk about a cohort →
            </Link>
          </div>
          <div className="text-center">
            <span className="text-6xl font-bold text-accent">2,000+</span>
            <p className="tag-mono mt-3 mb-5">
              Trained into technology careers to date. Current tracks lead to:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {roles.map((role) => (
                <span key={role} className="tag-mono border border-ink-border rounded-pill px-3 py-1.5 !text-[10px]">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-xl">
          <p className="text-ink_text-secondary text-sm leading-relaxed mb-6">
            Integration gets you the capability. Training is what turns it into
            results. We deliver both, so your investment actually gets used.
          </p>
          <Link href="/training" className="btn btn--primary">
            Train your team →
          </Link>
        </div>
      </div>
    </section>
  );
};
