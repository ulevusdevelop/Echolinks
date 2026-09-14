import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const trainingCards = [
  { title: 'Hands-on, not theory', description: 'Live labs on your own systems and data, not generic demos.' },
  { title: 'Project controls & EVM cohorts', description: 'Primavera P6, CPM, baselines, earned value, Excel, Power BI, and automation, taught as a working build.' },
  { title: 'Role-based tracks', description: 'Different paths for operators, analysts, schedulers, developers, and leadership.' },
  { title: 'Bootcamps & workshops', description: 'Focused cohorts on AI agents, automation, blockchain, integration.' },
  { title: 'Certification & curriculum', description: 'Assessments and reusable material so knowledge stays in-house.' },
  { title: 'Ongoing enablement', description: 'Support after launch so adoption sticks and your team keeps growing.' },
];
const roles = ['Project Scheduler', 'Project Controls Analyst', 'AI & Automation Specialist', 'Integration Developer', 'API Developer', 'Facets Configuration Analyst', 'HL7/FHIR Specialist', 'ERP Consultant'];

// `headingLevel` fixes a real heading-hierarchy gap found during a
// sitewide h1 audit: used on the homepage (needs h2, subordinate to
// Hero's h1) and standalone on /training (needs h1, nothing else on
// that page provides one). Defaults to 'h2' (the homepage context);
// /training passes 'h1' explicitly.
export const Training = ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) => {
  const Heading = headingLevel;
  return (
    // RHYTHM FIX: this was a dark section (`section--page`) sitting
    // directly after Industries (also dark) — two dark sections back to
    // back, which a past round had deliberately accepted as a "paired"
    // compromise rather than true alternation. Direct feedback now is
    // that the color/section blending isn't reading as professional as
    // it should, and the brand guide is explicit about alternating deep
    // purple and white, not pairing darks. Flipped to white. The two
    // internal cards below (the training-topic list and the flame-
    // gradient "2,000 careers" card, plus the photo band) are
    // self-contained dark elements that now read as intentional dark
    // accents floating on a white section — closer to how the old
    // homepage actually composed its "How does it work?" section
    // (white page, colored card blocks inside it) than a flat dark
    // slab was.
    <section className="section--light">
      <div className="wrap">
        {/* RESTRUCTURED again (direct correction): reverted the column
            swap from last round — "class is the build" is back on the
            left, cards back on the right, matching the original order.
            The "TRAINING & ENABLEMENT" heading block is no longer
            inside either column at all — it's now its own full-width
            row at the top, with the two-column layout (class-is-the-
            build text left, cards right) as a second row underneath,
            exactly as described: 2 rows, 2 columns, with the main
            heading on its own row alone at the top. */}
        <RevealOnScroll>
        <div className="max-w-2xl mb-14">
          <span className="eyebrow-plain--dark">TRAINING & ENABLEMENT</span>
          <Heading className="text-left mt-4 mb-5" style={{ color: '#16003B', fontFamily: 'var(--font-syne), sans-serif', fontWeight: 600, lineHeight: '1.25', fontSize: 'clamp(28px, 3vw, 36px)' }}>
            The tech is only half the job. Your people are the other half.
          </Heading>
          <p className="text-[20px] font-normal leading-relaxed max-w-md" style={{ color: '#434343' }}>
            Most companies spend heavily integrating AI, blockchain, and automation,
            then leave the people who use it to figure it out alone. That is where the
            value leaks. We close that gap with hands-on training built around your
            actual systems.
          </p>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="font-bold text-xl mb-5" style={{ color: '#16003B' }}>The class is the build</h3>
            <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: '#434343' }}>
              We do not teach from slides about someone else&apos;s example. Your team
              learns by building and operating your real workflows, the same agents,
              integrations, schedules, and trust records they will use on Monday.
            </p>
            <p className="text-sm font-semibold leading-relaxed max-w-sm" style={{ color: '#16003B' }}>
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
        </RevealOnScroll>

        <RevealOnScroll delayMs={250}>
        {/* FIX: this card was still using a full-bleed photo background
            (with a color-multiply overlay) while the rest of the site's
            cards now use the consistent solid/gradient treatment.
            Replaced the photo with the same flame gradient used on
            .card--highlight elsewhere, keeping this card visually
            consistent with the rest of the site instead of being the
            one leftover "picture in the background" card. */}
        <div
          className="mt-20 relative overflow-hidden grid md:grid-cols-[1.4fr_1fr] gap-12 items-center p-10 md:p-16"
          style={{ background: 'linear-gradient(135deg, var(--flame-from) 0%, var(--flame-to) 100%)' }}
        >
          {/* Subtle growth-path illustration, low-opacity background
              texture — reinforces "careers, now pointed at what comes
              next" without competing with the 2,000+ stat, which stays
              the visual focal point. */}
          <svg
            viewBox="0 0 400 200"
            className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-[0.1] pointer-events-none hidden md:block"
            aria-hidden="true"
          >
            <path
              d="M0 180 L80 150 L160 160 L240 90 L320 100 L400 20"
              fill="none"
              stroke="#FF6100"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="400" cy="20" r="8" fill="#FF6100" />
          </svg>
          <div>
            {/* WEIGHT FIX: the new h3 tag-level typography rule
                (600 weight, !important) now overrides this element's
                own font-bold (700) — a side effect of this round's
                typography system change landing on an h3 that was
                deliberately bold for extra standout inside this
                highlight card. Added an explicit !font-bold to win back
                the intended weight, same pattern used for Hero's h1. */}
            <h3 className="text-white !font-bold text-2xl mb-5">
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
                <span key={role} className="tag-mono border border-ink-border rounded-none px-4 py-2 !text-[10px]">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={350}>
        <div className="mt-14 max-w-2xl">
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#434343' }}>
            Integration gets you the capability. Training is what turns it into
            results. We deliver both, so your investment actually gets used.
          </p>
          <Link href="/training" className="btn btn--primary">
            Train your team →
          </Link>
        </div>
        </RevealOnScroll>
      </div>

      {/* NEW this round, mirrored from the old homepage's own "Tech
          Made Easy" section — a distinct photo-band moment with its own
          look (full-bleed photo, dark gradient overlay, centered text)
          that hadn't been used anywhere on the new site yet, even
          though the training institute it describes is the same one
          already referenced above ("trained more than 2,000 people...
          through its institute"). Copy adapted from the old site's
          EDITI framing to Echolink's own program instead of copied
          verbatim, since EDITI itself is a different company's
          platform name, not Echolink's. */}
      {/* PADDING FIX (direct feedback): this was a fixed height:320
          container with its content flex-centered inside. Once the
          actual content (eyebrow + heading + 4-line paragraph + button)
          got close to that fixed height, centering it stopped meaning
          "comfortable padding" and started meaning "squeezed flush
          against the top and bottom edges" — flex-centering inside a
          fixed box doesn't add breathing room, it just centers whatever
          does or doesn't fit. Replaced the fixed height with real
          vertical padding, so the band grows to fit its content with
          consistent space above and below, regardless of how many
          lines the paragraph wraps to at any given width. */}
      <div className="relative mt-24 overflow-hidden py-20 md:py-28">
        <Image
          src="https://picsum.photos/seed/echolink-tech-made-easy/1600/500"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(22,0,59,0.75) 0%, rgba(22,0,59,0.94) 100%)' }}
        />
        <RevealOnScroll>
        <div className="wrap relative flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold tracking-tag uppercase mb-3" style={{ color: '#FF6100' }}>
            TRAINING & SUPPORT
          </span>
          <h3 className="text-white font-bold text-3xl md:text-4xl mb-4">Tech Made Easy</h3>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl mb-8">
            Our training institute has helped more than 2,000 people transition into
            roles like Integration Developer, EDI Analyst, ERP Consultant, API
            Developer, and HL7/FHIR Specialist. A hands-on learning platform built to
            give you technical and business skills together, not one without the
            other.
          </p>
          <Link href="/training" className="btn btn--ghost">
            Learn more →
          </Link>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
