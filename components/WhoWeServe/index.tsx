import React from 'react';

const segments = [
  { title: 'Individuals & creators', description: 'Solo founders and professionals who want AI, automation, and verifiable records without a big team or budget.' },
  { title: 'Small business', description: 'Shops, clinics, and local operators who want to connect their tools and prove their work, simply.' },
  { title: 'Startups & scale-ups', description: 'Fast-moving teams that need integration and AI agents that grow with them, not against them.' },
  { title: 'Enterprise', description: 'Large organizations wiring many systems, machines, and AI into one auditable, compliant whole.' },
  { title: 'Capital projects & programs', description: 'Owners, contractors, and program offices that need schedules, cost, and earned value they can defend.' },
  { title: 'Hospitals & clinics', description: 'Care providers connecting clinical systems and records, with patient data kept private and every action verifiable.' },
];

// Light-theme treatment — warm, welcoming content reads better here than
// as another dark card grid. Cards are white with a thin navy border
// instead of the dark .card class, and the accent square is solid navy
// on cream instead of the usual orange-on-dark.
export const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className="relative overflow-hidden bg-[#F2F5F7] py-20 lg:py-28">
      <span
        aria-hidden="true"
        className="absolute top-12 right-10 w-5 h-5 rounded-sm hidden lg:block"
        style={{ backgroundColor: '#180F39' }}
      />
      <div className="wrap">
        <div className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
          <span
            className="inline-flex items-center gap-2 font-mono text-xs tracking-tag uppercase px-4 py-1.5 rounded-pill mb-6"
            style={{ background: 'rgba(255,96,0,0.12)', color: '#B24300' }}
          >
            WHO WE SERVE
          </span>
          <h2 className="text-[#180F39] font-bold text-3xl md:text-4xl leading-tight">
            Not just for enterprises.
          </h2>
          <p className="text-[#434343] text-base leading-relaxed mt-5 max-w-lg mx-auto">
            The same verifiable layer scales to fit you, whether you are one person
            with an idea or a global company with a thousand systems. You start where
            you are and grow from there.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {segments.map((seg) => (
            <div
              key={seg.title}
              className="bg-white rounded-lg p-6 border"
              style={{ borderColor: 'rgba(22,14,55,0.12)' }}
            >
              <h4 className="text-[#180F39] font-bold mb-2">{seg.title}</h4>
              <p className="text-[#434343] text-sm leading-relaxed">
                {seg.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
