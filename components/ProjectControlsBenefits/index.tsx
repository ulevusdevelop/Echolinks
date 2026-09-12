import React from 'react';

// Matches the AI reference page's "Benefits" section pattern (edit doc
// item 88): light gray band, short heading + intro on the left, a
// plain bulleted list of value statements on the right -- distinct
// from the card-grid treatment used elsewhere on the site.
const benefits = [
  'Defend your numbers to owners, lenders, and auditors with a schedule and cost record that holds up under scrutiny.',
  'Catch variance while there is still time to recover, instead of finding out at the monthly report.',
  'Replace status meetings built on stale spreadsheets with live, connected reporting.',
  'Anchor every baseline, revision, and progress claim so what was approved and when is provable later.',
  'Free your controls staff from manual rekeying so they spend time on analysis, not data entry.',
];

export const ProjectControlsBenefits = () => {
  return (
    <section className="py-20" style={{ background: '#F2F2F2' }}>
      <div className="wrap grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
        <div>
          <h3 className="text-[#16003B] font-bold text-2xl mb-3">Benefits</h3>
          <p className="text-[#434343] text-sm leading-relaxed">
            Our project controls solution will help you:
          </p>
        </div>
        <ul className="flex flex-col gap-5">
          {benefits.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-[#434343] leading-relaxed pb-5 border-b border-[#16003B]/10 last:border-b-0 last:pb-0">
              <span className="text-accent flex-shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
