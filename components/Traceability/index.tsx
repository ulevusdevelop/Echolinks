import React, { useState } from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// CONTENT RESTORATION (careful sweep): the interactive panel below
// only showed one flat summary sentence per industry (the `journey`
// field) — a placeholder-style paraphrase. The reference has a real,
// fully-authored dataset for this exact feature (TRACE_DATA in its
// script): each of the 8 industries tracks a specific named item
// through 4 numbered steps, each with its own title, description, and
// blockchain-style hash anchor (e.g. "0x4a7f…11c2") — not a single
// summary line. Replaced `journey: string` with the real structured
// data below, verbatim from the reference.
const industries = [
  {
    id: 'airlines', title: 'Airlines & aviation', description: 'Parts, maintenance, and flight records.',
    itemTitle: 'Aircraft turbine blade',
    steps: [
      { title: 'Forged at supplier', description: 'Serial logged, alloy certified, origin recorded.', hash: '0x4a7f…11c2' },
      { title: 'Installed on aircraft', description: 'Fitment and torque checked, signed by engineer.', hash: '0x9b22…6df0' },
      { title: 'Maintenance check', description: 'Inspected, hours logged, condition verified.', hash: '0x1c84…a907' },
      { title: 'Audit-ready record', description: 'Full life history anchored, provable on demand.', hash: '0x7e03…bb15' },
    ],
  },
  {
    id: 'evtol', title: 'Air taxis & eVTOL', description: 'Battery integrity and fleet provenance.',
    itemTitle: 'eVTOL battery pack',
    steps: [
      { title: 'Cells manufactured', description: 'Batch and chemistry certified at source.', hash: '0x3d11…88a4' },
      { title: 'Charge cycles logged', description: 'Every cycle recorded, health tracked live.', hash: '0x6f90…22c1' },
      { title: 'Pre-flight check', description: 'Integrity verified before each flight.', hash: '0x2b47…d50e' },
      { title: 'Regulator-ready proof', description: 'Complete cycle history anchored and sealed.', hash: '0x8c12…f773' },
    ],
  },
  {
    id: 'supply', title: 'Supply chain', description: 'Supplier-to-shelf, photo-verified.',
    itemTitle: 'Coffee lot CFE-2207',
    steps: [
      { title: 'Harvested', description: 'Origin geo-tagged, farm and date recorded.', hash: '0x7af3…e2c1' },
      { title: 'Processed', description: 'Washed, dried, photographed at each step.', hash: '0x9b41…7c08' },
      { title: 'Shipped', description: 'Container sealed, route and handlers logged.', hash: '0x1c77…a190' },
      { title: 'On the shelf', description: 'Buyer can scan and verify the full journey.', hash: '0x3e02…bd55' },
    ],
  },
  {
    id: 'pharma', title: 'Pharma', description: 'Cold chain and anti-counterfeit proof.',
    itemTitle: 'Vaccine batch VX-884',
    steps: [
      { title: 'Manufactured', description: 'Batch certified, ingredients traced to source.', hash: '0x5a31…44b8' },
      { title: 'Cold chain logged', description: 'Temperature verified continuously in transit.', hash: '0x2d77…91ca' },
      { title: 'Pharmacy received', description: 'Seal and condition confirmed on arrival.', hash: '0x8f04…3e21' },
      { title: 'Anti-counterfeit proof', description: 'Authenticity provable to patient and regulator.', hash: '0x1b63…cc09' },
    ],
  },
  {
    id: 'food', title: 'Food', description: 'Farm-to-shelf freshness and origin.',
    itemTitle: 'Grass-fed beef cut',
    steps: [
      { title: 'Sourced at farm', description: 'Animal, farm, and date recorded at origin.', hash: '0x6c12…a3f7' },
      { title: 'Cold chain verified', description: 'Temperature held and logged through transit.', hash: '0x9e40…77b2' },
      { title: 'Processed & packed', description: 'Handling photographed and time-stamped.', hash: '0x3a81…d104' },
      { title: 'Farm-to-shelf proof', description: 'Shopper sees the full origin story.', hash: '0x7d29…be55' },
    ],
  },
  {
    id: 'hospitals', title: 'Hospitals & clinics', description: 'Medication, samples, and equipment provenance.',
    itemTitle: 'Surgical instrument tray',
    steps: [
      { title: 'Sterilized', description: 'Cycle logged, operator and method recorded.', hash: '0x4f21…99a0' },
      { title: 'Issued to theatre', description: 'Chain of custody signed and time-stamped.', hash: '0x8b34…21cd' },
      { title: 'Used & tracked', description: 'Procedure linked, usage recorded.', hash: '0x2c90…57e3' },
      { title: 'Compliance record', description: 'Full handling history anchored and auditable.', hash: '0x6a11…f482' },
    ],
  },
  {
    id: 'luxury', title: 'Luxury goods', description: 'Authenticity and ownership history.',
    itemTitle: 'Designer handbag #A2291',
    steps: [
      { title: 'Crafted', description: 'Materials and maker certified at origin.', hash: '0x3e77…1a09' },
      { title: 'Authenticated', description: 'Unique identity sealed to the item.', hash: '0x9c20…84bf' },
      { title: 'Sold to owner', description: 'Ownership transfer recorded on chain.', hash: '0x1f48…d6e2' },
      { title: 'Resale-ready proof', description: 'Authenticity and history provable forever.', hash: '0x7b03…aa91' },
    ],
  },
  {
    id: 'capital', title: 'Capital projects', description: 'Progress claims, milestones, and payment.',
    itemTitle: 'Milestone MS-14 · Structural steel',
    steps: [
      { title: 'Baseline approved', description: 'Schedule baseline sealed, owner approval recorded.', hash: '0x5c19…30ab' },
      { title: 'Progress claimed', description: 'Field quantities and photos captured at the source.', hash: '0x2a68…c714' },
      { title: 'Earned value calculated', description: 'EV, CPI, and SPI computed from verified progress.', hash: '0x8d35…41fe' },
      { title: 'Payment application', description: 'Claim, approval, and payment tied to one provable record.', hash: '0x6b27…9ac3' },
    ],
  },
];
const pillars = [
  { title: 'Part & batch traceability', description: 'Every item\u2019s origin, handling, and life recorded, tamper-proof, end to end.' },
  { title: 'Condition & integrity', description: 'Battery cycles, cold chain, freshness, whatever must stay within limits, verified.' },
  { title: 'Service & handling provenance', description: 'Who touched what, when, and whether the record has been altered since.' },
  { title: 'Decentralized AI checks', description: 'Agents that flag anomalies and exceptions, with every decision logged and verifiable.' },
  { title: 'Audit trails everyone trusts', description: 'One record operators, regulators, and insurers can all rely on, without trusting each other.' },
];

export const Traceability = () => {
  // DEFAULT-ACTIVE FIX: this is fully interactive state — the step-by-
  // step journey (with hash anchors) only ever appeared after clicking
  // an industry card; before that, the panel showed a generic "select
  // an industry" placeholder with no real content visible at all. Very
  // likely why the actual journey content ("Forged at supplier...")
  // wasn't seen — defaulting to the first industry means the real
  // content is visible immediately on page load, with the rest still
  // fully interactive/clickable exactly as before.
  const [activeId, setActiveId] = useState<string | null>(industries[0].id);
  const active = industries.find((i) => i.id === activeId);

  return (
    <>
    {/* CLIENT QA FIX ("The traceability page still does not have that
        introductory section as the project-controls page and the
        others, please ensure to add it"): dedicated standalone intro
        section, same structure as ProjectControls'/Lab's hero
        (eyebrow, h1, intro paragraph, down-arrow, dark purple, pt-44/
        pb-20) — this page previously folded its eyebrow/h1 straight
        into the 3-column photo/list grid below with no separate intro
        of its own. The h1 moved up here; the grid below no longer
        repeats it (see its own comment). */}
    <section className="relative overflow-hidden pt-44 pb-20" style={{ background: '#16003B' }}>
      <div className="wrap">
        <span className="eyebrow-plain">VERIFIABLE TRACEABILITY</span>
        <h1 className="text-white !font-bold text-4xl md:text-5xl leading-tight mb-6 max-w-2xl">
          Prove where anything came from.
        </h1>
        {/* WIDENED (direct feedback: "the intro sections... text
            width... span through a bit more width") — matched to the
            h1's own max-w-2xl above it, same fix applied across every
            page using this intro-hero pattern. */}
        <p className="text-white text-[20px] font-normal leading-relaxed max-w-2xl mb-10">
          From the factory floor to the customer&apos;s hands, we connect the
          systems already tracking your parts, batches, and shipments, and
          anchor every hand-off to a tamper-proof record. What used to be a
          claim becomes something your buyer, auditor, or regulator can check
          themselves, in seconds, not a weeks-long paper chase.
        </p>
        <span className="text-white text-2xl" aria-hidden="true">↓</span>
      </div>
    </section>

    <section className="section relative overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute bottom-16 right-8 w-4 h-4 rounded-none hidden lg:block bg-accent"
      />
      <div className="wrap">
        {/* STYLE FIX (Traceability Page item 2): mirrored the old
            site's "Capabilities" pattern (Big Data / Automation / IoT
            pages) — a duotone photo alongside a short divided list,
            instead of a single centered header block. The industry
            grid and interactive panel below are this component's own
            feature with no old-site equivalent, so kept unchanged.
            HEADING REMOVED (this round): the eyebrow/h1 that used to
            sit in the first column here now live in the dedicated
            intro section above instead — kept the photo + list as a
            supporting 2-column block rather than duplicating the page
            heading a second time. */}
        {/* REBALANCED (direct feedback: "make the image and text to the
            right look better"). Previous layout was `grid-cols-[auto_1fr]`
            with a small 230px photo and a text column left with no
            max-width of its own — the divider rules under each line
            stretched the full 1fr grid-track width while the text itself
            wrapped far short of it, leaving a large dead gap to the
            right of every line. Fixed on both sides: the image column is
            now a fixed, larger 340px (was an auto-sized 230px) and picks
            up the same corner-square accent mark used on photos
            elsewhere on the site (TrustBand, TrustedToBuildTrust), so it
            reads as a deliberate framed visual instead of a small,
            unexplained thumbnail; the text column is capped to `max-w-md`
            so its divider rules now end where the text does, and the
            "click any industry" line is pulled out of the divided list
            into its own small pill/tag treatment so it reads as a
            call-to-action rather than a third, oddly-short list row. */}
        <div className="grid md:grid-cols-[340px_1fr] gap-12 items-center mb-16">
          <div className="relative w-full max-w-[340px] h-[400px] mx-auto md:mx-0 hidden md:block" aria-hidden="false">
            <div className="relative w-full h-full overflow-hidden rounded-none" style={{ background: '#16003B' }}>
              <Image
                src="https://picsum.photos/seed/echolink-traceability/360/440"
                alt=""
                fill
                sizes="340px"
                className="object-cover"
                style={{ filter: 'grayscale(1) contrast(1.1)' }}
                unoptimized
              />
              <div className="absolute inset-0 mix-blend-color" style={{ background: '#16003B' }} aria-hidden="true" />
            </div>
            {/* Corner accent mark — same layered-square motif used on
                photo treatments elsewhere (TrustBand's ghost logo corner,
                TrustedToBuildTrust's scattered squares), so this photo
                reads as a designed element rather than a floating crop. */}
            <span
              className="absolute -top-4 -left-4 w-12 h-12"
              style={{ background: '#FF6100' }}
              aria-hidden="true"
            />
            <span
              className="absolute -bottom-3 -right-3 w-6 h-6 bg-white"
              style={{ border: '2px solid #16003B' }}
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col max-w-md">
            <p className="text-ink_text-secondary text-base leading-relaxed py-4 border-b border-ink-border">
              A tamper-proof record for high-stakes industries, from airlines and air
              taxis to the goods on your shelf.
            </p>
            <p className="text-ink_text-secondary text-base leading-relaxed py-4 border-b border-ink-border">
              Every part, batch, and hand-off, photographed, verified, and anchored so
              it cannot be faked.
            </p>
            <span className="tag-mono tag-mono--accent inline-flex mt-5 border border-accent rounded-none px-4 py-2 w-fit">
              Click any industry below to watch a live verified journey.
            </span>
          </div>
        </div>

        {/* CLIENT QA FIX (Traceability page #2): "We need to realign
            the section and put them side-by-side... the small
            rectangular boxes can be moved to the left, maybe two
            boxes on each row. Then the big box which is the active
            box... should be placed on the right side. This will help
            people see it in action while they click rather than the
            response been underneath the industries." Restructured
            from a full-width 4-across grid + detail panel stacked
            below it, into a two-column layout: the 8 industry cards
            in a 2-per-row grid on the left, the detail panel on the
            right (sticky, so it stays in view alongside the list
            while scrolling through it), collapsing back to a single
            stacked column below the lg breakpoint. */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
          {/* SPACING FIX (direct feedback: "too tight, especially between
              the first Row and second Row") — split the gap so rows get
              more vertical breathing room than columns need
              horizontally. HOVER FIX (direct instruction): each card now
              gets a small orange accent square that's invisible by
              default and appears specifically on hover — not fixed
              permanently to any one card. */}
          <div className="grid sm:grid-cols-2 gap-x-5 gap-y-9">
            {industries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setActiveId(ind.id)}
                className={`group relative card text-left transition-all hover:-translate-y-0.5 ${
                  activeId === ind.id ? 'ring-2 ring-accent' : ''
                }`}
              >
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#FF6100' }}
                  aria-hidden="true"
                />
                <h4 className="text-white font-bold text-sm mb-2">{ind.title}</h4>
                <p className="text-ink_text-secondary text-base leading-relaxed">
                  {ind.description}
                </p>
              </button>
            ))}
          </div>

        <div className="card lg:sticky lg:top-28">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="tag-mono tag-mono--accent">
                {active ? active.title.toUpperCase() : 'SELECT AN INDUSTRY'}
              </span>
              <h3 className="text-white font-bold text-xl mt-3">
                {active ? active.itemTitle : 'Watch provenance, live'}
              </h3>
            </div>
            {/* Reset button — hidden until an industry is picked,
                matching the reference's tl-reset behavior. */}
            {active && (
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="tag-mono text-accent-light border border-accent rounded-none px-4 py-2 flex-shrink-0 hover:bg-accent-soft"
              >
                Reset
              </button>
            )}
          </div>

          {!active ? (
            <p className="text-ink_text-secondary text-base leading-relaxed">
              Pick any industry above to see how a real item is verified at every step
              and locked to a tamper-proof record.
            </p>
          ) : (
            <>
              {/* Numbered steps — each with its own title, description,
                  and hash anchor, matching the reference's tl-step
                  markup exactly instead of a single summary sentence. */}
              <div className="flex flex-col gap-5 mt-5">
                {active.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="number-badge flex-shrink-0">{i + 1}</span>
                    <div>
                      <h5 className="text-white font-bold text-sm mb-1">{step.title}</h5>
                      <p className="text-ink_text-secondary text-base leading-relaxed mb-1">
                        {step.description}
                      </p>
                      <span className="tag-mono tag-mono--accent !text-[10px]">
                        ✓ anchored {step.hash}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 mt-6 pt-5 border-t border-ink-border">
                <span className="text-accent-light font-bold flex-shrink-0">✓</span>
                <p className="text-ink_text-secondary text-base leading-relaxed">
                  Every step verified and anchored. <b className="text-white">0 tampering.</b>{' '}
                  This is what your customer, auditor, or regulator can check
                  themselves.
                </p>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </section>

    {/* RHYTHM FIX: this whole page used to be one single dark <section>
        from the hero all the way down to the closing CTA — the most
        monotone page on the site, worse than the "dark-dark pairs"
        fixed elsewhere, since it's one continuous dark slab with no
        white break at all. The old site's own equivalent pages (e.g.
        /automation) alternate dark hero -> white capability section ->
        dark section -> white benefits section. Split this component
        into three sections instead of one to bring that same dark ->
        white -> dark rhythm here: the hero/industry-grid/journey-panel
        above stays dark, this middle "one problem, every industry"
        section is now white, and the closing CTA below stays its own
        separate dark section as it already was. */}
    <section className="section--light">
      <div className="wrap">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <h3 className="font-bold text-xl mb-5" style={{ color: '#16003B' }}>One problem, every industry</h3>
            <p className="text-base leading-relaxed mb-5 max-w-sm" style={{ color: '#434343' }}>
              High-value goods pass through a web of operators, makers, handlers,
              regulators, and insurers, each holding a piece of the truth. When
              something is audited, recalled, or grounded, the full history has to be
              proven fast, and proven untouched.
            </p>
            <p className="text-base leading-relaxed max-w-sm" style={{ color: '#434343' }}>
              That is a verifiable integration problem. The exact thing we do, applied
              wherever trust matters most.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="!py-5 pl-5 border-l-2"
                style={{ borderLeftColor: '#FF6100', background: '#F7F7F9' }}
              >
                <h4 className="font-bold text-sm mb-1" style={{ color: '#16003B' }}>{p.title}</h4>
                <p className="text-base leading-relaxed" style={{ color: '#434343' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl">
          <p className="text-base italic leading-relaxed mb-6" style={{ color: '#434343' }}>
            From the aircraft overhead to the food on your table, the same verifiable
            layer gives every party one tamper-proof record they can check themselves.
            We started with the hardest cases and built it to apply anywhere trust
            matters.
          </p>
          <a href="/contact" className="btn btn--primary">
            Explore a traceability pilot
          </a>
        </div>
      </div>
    </section>

    {/* STYLE FIX (Traceability Page item 4): the page's closing section
        mirrored from the old homepage's "Start Your New Experience" —
        a plain full-width dark band (not a card box), scattered
        orange/white/purple accent squares in the corners, centered
        heading + subhead + one ghost button. Wrapped in RevealOnScroll
        per the item's explicit "add the motion on this section as
        well." */}
    <section className="relative overflow-hidden py-24" style={{ background: '#16003B' }}>
      {/* ENHANCED (direct feedback: "bigger and a little more
          intention") — previously small, uniform, scattered corner
          dots. Rebuilt as two deliberate layered clusters (top-left,
          bottom-right) at a noticeably larger scale, closer to the old
          homepage's actual "Start Your New Experience" composition: a
          large solid square with a smaller overlapping square offset
          at its corner, not just individual dots placed separately. */}
      <div className="absolute top-10 left-10 hidden md:block" aria-hidden="true">
        <span className="absolute top-0 left-0 w-24 h-24" style={{ background: '#FF6100' }} />
        <span className="absolute -top-6 left-20 w-11 h-11" style={{ background: '#16003B', border: '2px solid rgba(255,255,255,0.25)' }} />
        <span className="absolute top-24 left-28 w-7 h-7 bg-white" />
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block" aria-hidden="true">
        <span className="absolute bottom-0 right-0 w-24 h-24" style={{ background: '#FF6100' }} />
        <span className="absolute -bottom-6 right-20 w-11 h-11" style={{ background: '#16003B', border: '2px solid rgba(255,255,255,0.25)' }} />
        <span className="absolute bottom-24 right-28 w-7 h-7 bg-white" />
      </div>

      <RevealOnScroll className="wrap text-center relative">
        <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-6">
          Start Your Verified Journey
        </h2>
        <p className="text-white text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Whether you are proving provenance for a single product line or an entire
          supply chain, we will provide you with the highest-quality expertise, tools,
          and best practices to make it verifiable, end to end.
        </p>
        <a href="/contact" className="btn btn--ghost !text-white !border-white">
          Learn more →
        </a>
      </RevealOnScroll>
    </section>
    </>
  );
};
