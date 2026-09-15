import React, { useState } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const checklist = [
  'Every step photographed and time-stamped',
  'Origin to shelf, in plain language',
  'A trust check the shopper can verify themselves',
];
// CONTENT FIX (careful sweep): these 4 steps were invented generic
// text ("Farm A," "Cold storage," etc.) — the reference has a real,
// specific dataset for this exact scan demo (SCAN_JOURNEY in its
// script), matching the "Coffee · Lot CFE-2207" product label already
// added last round. Replaced with the reference's actual steps:
// specific places and blockchain-style hash anchors, not generic
// placeholders.
const journeySteps = [
  { title: 'Harvested', location: 'Kiambu Highlands, Kenya', hash: '0x7af3…e2c1' },
  { title: 'Washed & dried', location: 'Nyeri Co-op', hash: '0x9b41…7c08' },
  { title: 'Shipped', location: 'Mombasa → Rotterdam', hash: '0x1c77…a190' },
  { title: 'On the shelf', location: 'Amsterdam', hash: '0x3e02…bd55' },
];

export const OneScan = () => {
  const [scanned, setScanned] = useState(false);
  return (
    <section className="section">
      <div className="wrap grid md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll>
        <div>
          <span className="eyebrow-plain">THE SHOPPER&apos;S VIEW</span>
          <h2 className="sec-title">One scan. The whole story.</h2>
          <p className="sec-sub">
            This is what your customer sees. They scan the code on the product and the
            entire verified journey appears, with photos, locations, and a trust check
            anyone can read. Provenance stops being a backend feature and becomes
            something people can hold.
          </p>
          <ul className="flex flex-col gap-3 mt-8">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3 text-base text-ink_text-secondary">
                <span className="text-accent-light">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setScanned(true)} className="btn btn--primary mt-10">
            Scan the product →
          </button>
        </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="flex justify-center">
          {/* FRAME FIX: this was a plain rounded-corner box (rounded-[2rem]
              border), not an actual phone shape. Checked against Sample.pdf
              and the reference is a real phone silhouette: a thick dark
              bezel, a notch cut into the top of the screen, and small side
              buttons on the frame edges. Rebuilt the frame only — the QR
              icon, text, and verified-journey content inside are
              unchanged. */}
          <div className="relative w-[240px]">
            {/* Side buttons */}
            <span className="absolute -left-[3px] top-20 w-[3px] h-8 bg-ink-600 rounded-l-sm" aria-hidden="true" />
            <span className="absolute -left-[3px] top-32 w-[3px] h-12 bg-ink-600 rounded-l-sm" aria-hidden="true" />
            <span className="absolute -right-[3px] top-28 w-[3px] h-14 bg-ink-600 rounded-r-sm" aria-hidden="true" />

            <div
              className="relative rounded-[2.5rem] border-[10px] border-ink-600 bg-ink-900 overflow-hidden"
              style={{ aspectRatio: '9 / 19.5' }}
            >
              {/* Notch */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink-600 rounded-b-2xl z-10"
                aria-hidden="true"
              />
              <div className="w-full h-full bg-ink-900 flex flex-col items-center justify-center p-6 text-center">
                {!scanned ? (
                  <>
                    <div className="w-24 h-24 rounded-none bg-white mb-4" style={{ backgroundImage: 'repeating-conic-gradient(#16003B 0% 25%, #fff 0% 50%)', backgroundSize: '10px 10px' }} />
                    <p className="text-ink_text-muted text-xs">Tap &quot;Scan the product&quot; to verify</p>
                  </>
                ) : (
                  <div className="w-full text-left">
                    {/* CONTENT RESTORATION (careful sweep): the reference's
                        scan-result state also shows a product/lot label at
                        the top ("Coffee · Lot CFE-2207") and a closing
                        "0 tampering" confirmation line — neither was
                        present here before. Added both. */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="tag-mono tag-mono--accent">✓ VERIFIED</span>
                      <span className="text-white text-xs">Coffee · Lot CFE-2207</span>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {journeySteps.map((step, i) => (
                        <li key={step.title} className="text-xs flex gap-2">
                          <span className="text-accent-light flex-shrink-0">{i + 1}</span>
                          <span>
                            <span className="text-white font-semibold block">{step.title}</span>
                            <span className="text-ink_text-secondary">{step.location}</span>
                            <span className="text-accent-light block mt-0.5">
                              ✓ {step.hash}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-ink_text-secondary flex items-center gap-2 mt-4 pt-4 border-t border-ink-border">
                      <span className="text-accent-light">✓</span>
                      All hand-offs verified on the trust layer. <b className="text-white">0 tampering.</b>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
