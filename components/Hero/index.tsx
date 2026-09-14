import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// REMOVED (direct instruction): "Completely remove the lines on the
// Hero section." The ArrowLines component that used to render here
// (three rebuilds across earlier rounds, chasing the old site's
// hand-drawn connector-line device) is gone entirely, not just hidden
// — deleted rather than left as unused dead code, consistent with how
// this codebase already treats anything removed by direct feedback.

// Real placeholder photography (via Picsum, a widely-used dev/placeholder
// image service — actual photographs, not fabricated content, and not
// hotlinked from an unverifiable stock/AI-generated source). Fixed seeds
// keep the same image on every load instead of a random one each time.
// A grayscale or warm color-overlay + blend mode approximates Good
// Design's duotone photo treatment even though the underlying subject
// matter is generic rather than art-directed. Swap the `src` for real
// company photography whenever it's available — nothing else needs to
// change, the tone treatment (filter/overlay) still applies on top.
const PlaceholderPhoto = ({
  seed,
  tone,
  className,
  priority,
}: {
  seed: string;
  tone: 'mono' | 'warm';
  className?: string;
  priority?: boolean;
}) => (
  <div className={`overflow-hidden relative rounded-none bg-ink-700 ${className}`}>
    <Image
      src={`https://picsum.photos/seed/${seed}/400/400`}
      alt=""
      fill
      sizes="230px"
      className="object-cover"
      style={{ filter: tone === 'mono' ? 'grayscale(1) contrast(1.05)' : 'none' }}
      unoptimized
      priority={priority}
    />
    {tone === 'warm' && (
      <div
        className="absolute inset-0 mix-blend-color"
        style={{ background: '#B24300' }}
        aria-hidden="true"
      />
    )}
  </div>
);

export const Hero = () => {
  return (
    <section className="section--page relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* REMOVED this round, direct feedback: an orange horizontal
          sweep was added here last round as a replacement for the old
          scattered-square accent, modeled on Industries' curve "in
          spirit." Direct correction: for any line-drawing in the Hero,
          reference the actual old home screen, not a new invention.
          The old homepage's hero has no separate orange line element
          at all — its only decoration is the white curved arrows
          already threaded through the photo collage below. Removed
          this entirely rather than replace it with another new idea;
          the strengthened ArrowLines above (thicker, bolder, now
          actually crossing) is the real, reference-grounded fix. */}

      {/* FIX (direct visual feedback, actual screenshot reviewed): the
          text/image gap looked far wider than the gap-8 CSS value
          because the text column was `1fr` on a page that's now
          1720px wide — the text itself naturally wraps much narrower
          than that, so the column left a lot of dead space before
          reaching the fixed 460px image column. Constrained the whole
          hero content row to a narrower max-width (independent of the
          page's own outer max-width, which stays wide) so text and
          images actually sit close together, with the extra page width
          becoming outer margin instead of dead space between columns. */}
      {/* EDGE FIX: removed the max-w-[1120px] centering constraint —
          direct request to "push back the sections to the edges of the
          screen widths." The row now spans the full .wrap width (up to
          the page's own max-width), so the text column and the image
          collage sit closer to the true left/right edges of the page
          instead of being boxed into a narrower centered zone. The
          larger gap-24 (set earlier this round) is what keeps the two
          from reading as cramped now that the row is wider again. */}
      <div className="wrap relative">
        {/* WIDTH FIX (direct correction): text column needs to occupy
            at least 65% of the row's width — the previous 1.4fr/380px
            ratio didn't guarantee that at every viewport size. Switched
            to an explicit percentage split (65%/1fr) so the text column
            is always exactly 65%, with the image column taking
            whatever's left. Gap reduced slightly (24->16) since a 65/35
            split leaves less room for a wide gap than the previous,
            more generous ratio did. */}
        <div className="grid lg:grid-cols-[65%_1fr] gap-16 items-center py-20 lg:py-32">
        {/* MOTION FIX (Homepage item 1): "the header should have a
            fly-in animation from the bottom, as it is in the original
            website." Wrapped the text column in RevealOnScroll (an
            IntersectionObserver + CSS-transition reveal — see the
            component's own file for why no animation library was
            added). Runs once on initial load since the hero starts
            already in view. */}
        <RevealOnScroll className="max-w-3xl">
          {/* No eyebrow tag here — confirmed against Good Design.pdf,
              the headline starts immediately with no pill/label above it. */}
          {/* WEIGHT FIX (typography system): .sec-title is a class, so
              it wins over the tag-level h1 rule on specificity alone
              even though both use !important (class beats bare tag).
              Without its own explicit weight here, this h1 would
              render at .sec-title's 700 (the H2 tier) instead of the
              spec's 700-800 H1 tier — same reason its size already had
              its own override below, just extended to weight too. */}
          {/* TYPOGRAPHY FIX — exact values from the live production
              site's own computed CSS (blueprint): font-size 44px below
              1024px (line-height 1.2em there specifically), 53px from
              1024-1423px, 64px above 1423px (line-height 65px at both
              of the wider tiers). Weight now comes from the h1.sec-title
              rule alone (600, corrected from 800 — see that rule's own
              comment) — the redundant !font-extrabold override that
              used to sit here is gone; having two different !important
              weight declarations competing for the same property was
              exactly what produced the "crossed out" conflicting rules
              flagged directly. */}
          <h1 className="sec-title !text-[44px] !leading-[1.2] lg:!text-[53px] lg:!leading-[65px] min-[1423px]:!text-[64px]">
            Where AI, automation, and blockchain{' '}
            <span className="text-accent">work as one</span>.
          </h1>

          <p className="sec-sub !max-w-2xl !mt-8">
            Echolink Solutions is the connective layer that wires your systems,
            machines, robotics, and AI into one verifiable whole, whatever you run and
            however it connects. Blockchain provides the trust. We provide the
            integration. You keep the control.
          </p>

          {/* Button copy corrected to match Good Design exactly:
              "Book a working session" / "See the layer" — was previously
              "Contact us" / "See the layer". Links to /contact since no
              dedicated booking route exists yet; relabel the href once
              one does. */}
          <div className="flex flex-wrap items-center gap-5 mt-10">
            <Link href="/contact" className="btn btn--primary">
              Book a working session →
            </Link>
            <Link href="/layer" className="btn btn--ghost">
              See the layer
            </Link>
          </div>
        </RevealOnScroll>

        {/* Signature device, restored from the old site: a photo collage,
            a solid accent square, and hand-drawn connector arrows woven
            through the grid. This is the specific combination that reads
            as "on brand" rather than the colors alone.

            GEOMETRY FIX (this round): rebuilt again per direct
            correction. The three elements are meant to form a diagonal
            cascade, each one touching the next at exactly one corner —
            not two stacked in a left column with the square offset to
            the right (the previous layout). All three are now the same
            size (190x190 — the bottom photo was previously a shorter
            190x120, corrected to match). Positions: top photo at
            (0,0); the orange square at (190,190), so its top-left
            corner touches the top photo's bottom-right corner exactly;
            bottom photo at (0,380), so its top-right corner touches the
            square's bottom-left corner exactly. Container resized from
            420x390 to 380x570 to fit this taller diagonal shape.

            PHOTOS: real placeholder photography (Picsum, a legitimate
            placeholder-image service) instead of illustrated icon motifs,
            with a grayscale/warm tone treatment approximating the
            reference's duotone look. Swap the seed URLs in
            PlaceholderPhoto for real company photography whenever it's
            available — nothing else in this layout needs to change. */}
        {/* REBUILT this round: switched from absolutely-positioned
            elements with matching coordinates to a real CSS Grid with
            gap:0. The coordinate-matching approach was mathematically
            correct (verified repeatedly) but kept being reported as
            not touching — moving to Grid removes any possibility of a
            subpixel/positioning discrepancy, since adjacent grid cells
            share their boundary by construction, not by two
            separately-computed offsets happening to agree.
            3 rows, not 2: column 1 holds the two photos stacked full
            height (rows 1 and 3), column 2 holds the square offset to
            the middle row only (row 2) — that offset is exactly what
            makes the square's corners land on both photos' corners. */}
        <div
          className="relative hidden lg:grid"
          style={{
            gridTemplateColumns: '210px 210px',
            gridTemplateRows: '210px 210px 210px',
            gap: 0,
            width: 420,
            height: 630,
          }}
        >
          <div style={{ gridColumn: 1, gridRow: 1, width: 210, height: 210 }}>
            <PlaceholderPhoto
              seed="echolink-team-collab"
              tone="mono"
              className="w-full h-full"
              priority
            />
          </div>
          <div style={{ gridColumn: 2, gridRow: 2, width: 210, height: 210 }} className="bg-accent rounded-none" />
          <div style={{ gridColumn: 1, gridRow: 3, width: 210, height: 210 }}>
            <PlaceholderPhoto
              seed="echolink-team-office"
              tone="warm"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      </div>
      {/* No caption/tag row below the hero content — confirmed against
          Good Design.pdf, the section ends in empty space here, it does
          not carry the "EDI · API · ERP..." system-tags line. That line
          was removed; it did not exist in the reference. */}
    </section>
  );
};
