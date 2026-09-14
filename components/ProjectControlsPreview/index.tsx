import React from 'react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// NEW — compact homepage-sized representation of /project-controls.
// Real copy from ProjectControls' own hero and metrics data, condensed
// to fit a single homepage section instead of that page's full 3-part
// (hero / measured-not-guessed split / benefits) structure.
const metrics = [
  { code: 'CPI', label: 'Cost performance' },
  { code: 'SPI', label: 'Schedule performance' },
  { code: 'EAC', label: 'Forecast at completion' },
  { code: 'VAR', label: 'Cost & schedule variance' },
];

export const ProjectControlsPreview = () => {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap">
        <RevealOnScroll>
          <div className="sec-header max-w-2xl mx-auto text-center">
            <span className="eyebrow-plain">PROJECT SCHEDULING, CONTROLS & EVM</span>
            <h2 className="sec-title">Know where the project really stands.</h2>
            <p className="sec-sub sec-sub--center">
              Schedules that hold up under scrutiny, cost and progress you can defend,
              and earned value that tells the truth.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <div className="grid sm:grid-cols-4 gap-4 mb-10">
            {metrics.map((m) => (
              <div key={m.code} className="card text-center">
                <span className="tag-mono tag-mono--accent font-bold text-lg block mb-2">{m.code}</span>
                <span className="text-ink_text-secondary text-xs leading-snug">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/project-controls" className="btn btn--primary">
              See project controls →
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
