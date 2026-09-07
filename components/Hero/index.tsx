import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Hand-drawn-style connector arrows, reproducing the old site's signature
// device: loose white curves with arrowheads threading through the photo
// grid. Approximated as smooth bezier paths, not traced from the original.
// viewBox height corrected to 390 to match the collage's real height
// (see the geometry fix below) — was 460, which stretched/misaligned
// these paths against the actual photo/square positions.
const ArrowLines = () => (
  <svg
    viewBox="0 0 420 390"
    fill="none"
    className="absolute inset-0 w-full h-full pointer-events-none z-10"
    aria-hidden="true"
  >
    <path
      d="M40 40 C 220 20, 340 90, 300 150 C 270 200, 380 220, 355 300"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M120 355 C 220 320, 200 250, 320 220 C 380 200, 340 130, 400 75"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Arrowheads */}
    <path d="M350 295 l10 12 l-16 2 Z" fill="rgba(255,255,255,0.55)" />
    <path d="M394 69 l14 -4 l-6 15 Z" fill="rgba(255,255,255,0.35)" />
  </svg>
);

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
}: {
  seed: string;
  tone: 'mono' | 'warm';
  className?: string;
}) => (
  <div className={`overflow-hidden relative rounded-lg ${className}`}>
    <Image
      src={`https://picsum.photos/seed/${seed}/400/400`}
      alt=""
      fill
      className="object-cover"
      style={{ filter: tone === 'mono' ? 'grayscale(1) contrast(1.05)' : 'none' }}
      unoptimized
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

      <div className="wrap relative grid lg:grid-cols-[1fr_420px] gap-16 items-center py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* No eyebrow tag here — confirmed against Good Design.pdf,
              the headline starts immediately with no pill/label above it. */}
          <h1 className="sec-title !text-[44px] md:!text-[58px] !leading-[1.05]">
            Where AI, automation, and blockchain{' '}
            <span className="text-accent">work as one</span>.
          </h1>

          <p className="sec-sub !max-w-lg !mt-8">
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
        </div>

        {/* Signature device, restored from the old site: a photo collage,
            a solid accent square, and hand-drawn connector arrows woven
            through the grid. This is the specific combination that reads
            as "on brand" rather than the colors alone.

            GEOMETRY FIX (this pass): measured the reference pixel-for-pixel
            (see hero_collage_crop.png in the audit notes) and found the
            bottom photo was anchored to the *container's* bottom edge
            (`bottom-0` in a 460px-tall box) instead of sitting directly
            under the top photo. That left a ~150px dead gap between the
            two photos that doesn't exist in the reference, and forced the
            container 70-80px taller than it needs to be. Fixed by:
              - bottom photo now sits at top-[190px], immediately under
                the top photo (was bottom-0)
              - container height corrected from 460 to 390, matching the
                real collage height (left column 190+120=310, orange
                column 190+190=380, plus a small margin)
            The orange square's position (top-[190px], right-0) was
            already correct and is unchanged.

            PHOTOS: real placeholder photography (Picsum, a legitimate
            placeholder-image service) instead of illustrated icon motifs,
            with a grayscale/warm tone treatment approximating the
            reference's duotone look. Swap the seed URLs in
            PlaceholderPhoto for real company photography whenever it's
            available — nothing else in this layout needs to change. */}
        <div className="relative hidden lg:block" style={{ height: 390 }}>
          <ArrowLines />
          <PlaceholderPhoto
            seed="echolink-team-collab"
            tone="mono"
            className="absolute top-0 left-0 w-[190px] h-[190px]"
          />
          <div className="absolute top-[190px] right-0 w-[190px] h-[190px] bg-accent rounded-lg" />
          <PlaceholderPhoto
            seed="echolink-team-office"
            tone="warm"
            className="absolute top-[190px] left-0 w-[190px] h-[120px]"
          />
        </div>
      </div>
      {/* No caption/tag row below the hero content — confirmed against
          Good Design.pdf, the section ends in empty space here, it does
          not carry the "EDI · API · ERP..." system-tags line. That line
          was removed; it did not exist in the reference. */}
    </section>
  );
};
