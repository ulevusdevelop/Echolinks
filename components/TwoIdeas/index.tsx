import React, { useState } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';

// SECTION-WIDE FIX (this pass): checked structure, not just copy, against
// direct crops of Sample.pdf. Found real structural bugs, not just
// wording drift:
//   1. Diagram 2 was rendered with the SAME sequential-chain layout as
//      Diagram 1 (node -> arrow -> node -> arrow...). The reference shows
//      a completely different shape for Diagram 2: 6 systems in
//      PARALLEL, each with its own small "AI" badge, all converging into
//      one shared "BLOCKCHAIN" node, then down into "Shared Decision
//      Network". Rebuilt as its own layout, not a reused chain.
//   2. The hint placeholder text was the same generic string for both
//      diagrams ("Tap any box..."). Reference uses different wording per
//      diagram -- diagram 2 says "Tap any system...". Now configurable
//      per diagram.
//   3. There were two separate footer captions, one inside each card.
//      The reference has exactly ONE caption, shared, centered below
//      both cards together -- not duplicated per card.
//   4. Top diagram's "Blockchain" cluster had 2 overlapping shapes; the
//      reference shows 3 forming a small stacked cluster.

// CONTENT RESTORATION (careful sweep, cont'd): found the reference's
// actual click-detail dataset (DIA_INFO) in its script tag — every
// node's `detail` text below was invented placeholder wording, none of
// it matching the reference. Replaced with the real text verbatim.
// Also found two structural gaps this data revealed:
//   1. "Dynamics 365" is one of the reference's 7 systems in diagram 2;
//      this list only had 6, missing it entirely.
//   2. The reference's hand-off "chain" node (the three verify markers
//      in diagram 1) all share ONE detail text, not three different
//      invented ones — and diagram 2's BLOCKCHAIN pill and Shared
//      Decision Network box are themselves clickable with their own
//      info too, which they weren't here at all.
const chainDetail = 'Between every AI hand-off, the record is verified and written to the blockchain. If anything was altered, it fails the check, so nothing passes unverified.';

const trustChainNodes = [
  { id: 'erp', label: 'ERP AI', detail: 'An agent on your ERP reads orders and inventory, then decides what to do next, the first link in the chain.' },
  { id: 'verify1', label: 'verify', detail: chainDetail },
  { id: 'warehouse', label: 'Warehouse AI', detail: 'An agent on your warehouse system confirms stock and movement before work passes downstream.' },
  { id: 'verify2', label: 'verify', detail: chainDetail },
  { id: 'supplier', label: 'Supplier AI', detail: 'An agent coordinating with suppliers, placing and confirming what is needed, under your rules.' },
  { id: 'verify3', label: 'verify', detail: chainDetail },
  { id: 'customer', label: 'Customer AI', detail: 'An agent that closes the loop with the customer, delivery, status, and proof of fulfilment.' },
];

const sharedNetworkNodes = [
  { id: 'sap', label: 'SAP ERP', detail: 'SAP keeps running as-is. Its own AI agent reads and acts on its data under policy controls you set.' },
  { id: 'salesforce', label: 'Salesforce', detail: 'Your CRM gets its own agent, no migration, no replacement, just an agent that understands your customer data.' },
  { id: 'oracle', label: 'Oracle ERP', detail: 'Oracle keeps its place. Its agent participates in the shared decision network like every other system.' },
  { id: 'primavera', label: 'Primavera P6', detail: 'Your schedule gets its own agent. It reads progress and cost, recalculates earned value, and flags slippage and float erosion before it hits the critical path.' },
  { id: 'dynamics', label: 'Dynamics 365', detail: 'Dynamics runs its own agent, contributing to and drawing from the shared, verified network.' },
  { id: 'wms', label: 'Warehouse WMS', detail: 'Your warehouse system gets an agent that tracks stock and movement in real time.' },
  { id: 'manufacturing', label: 'Manufacturing', detail: 'Your shop floor and machines get an agent that reports output and proves completed work.' },
];
const blockchainDetail = chainDetail;
const networkDetail = "Every system's agent plugs into one network. They share verified decisions instead of working blind in silos, so the whole business acts as one.";

type Node = { id: string; label: string; detail: string };

// Diagram 1: sequential hand-off chain -- AI node, verify step, AI node,
// verify step... Matches the reference's vertical chain of rectangles
// with small orange cube "verify" markers between each pair.
const TrustChainDiagram = ({
  title,
  description,
  nodes,
  hint,
}: {
  title: string;
  description: string;
  nodes: Node[];
  hint: string;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = nodes.find((n) => n.id === activeId);

  return (
    <div className="rounded-card p-8 md:p-9 flex flex-col" style={{ background: '#16003B' }}>
      <h4 className="text-white font-bold mb-3">{title}</h4>
      <p className="text-ink_text-secondary text-sm leading-relaxed mb-8">{description}</p>

      <div className="relative flex flex-col items-center gap-0">
        {/* Vertical traveling-ball track — sits behind the chain,
            spans from the first node to the last. */}
        <div className="flow-track-vertical" aria-hidden="true">
          <span className="flow-packet-vertical" />
          <span className="flow-packet-vertical flow-packet-vertical--delay" />
        </div>
        {nodes.map((node, i) => {
          const isVerify = node.label === 'verify';
          const isActive = activeId === node.id;

          if (isVerify) {
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(node.id)}
                className="flex items-center justify-center py-2.5"
              >
                {/* "verify" text label removed (direct instruction) —
                    was sitting beside the cube, which pushed the cube
                    itself off-center from the vertical track line
                    running through the middle of the diagram. Cube is
                    now the only content in this row and centers
                    correctly on that line. */}
                <span className={`relative w-7 h-7 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} aria-hidden="true">
                  <span className="absolute inset-0 bg-accent rounded-none rotate-45" />
                  <span
                    className="absolute inset-0 bg-black/25 rounded-none rotate-45"
                    style={{ clipPath: 'polygon(0% 50%, 50% 100%, 100% 50%)' }}
                  />
                </span>
              </button>
            );
          }

          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`w-full max-w-[220px] text-sm tracking-tag text-center rounded-none py-3 transition-all border bg-ink-600 border-ink-border text-white ${
                  isActive ? 'ring-2 ring-accent scale-[1.02]' : 'hover:border-accent'
                }`}
              >
                {node.label}
              </button>
              {/* Dotted connector — the reference shows a short dotted
                  vertical line linking each node to the cube below it. */}
              {i < nodes.length - 1 && (
                <span
                  className="w-px h-3 border-l border-dotted border-ink-border"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="mt-8 bg-ink-900 border border-ink-border rounded-none p-5 min-h-[64px] text-sm text-ink_text-secondary">
        {active ? active.detail : hint}
      </div>
    </div>
  );
};

// Diagram 2: parallel systems, each with its own AI badge, all
// converging into one shared blockchain node, then into "Shared
// Decision Network". Structurally different from Diagram 1 -- six
// siblings feeding one trunk, not a sequential chain -- so it gets its
// own layout rather than reusing TrustChainDiagram.
const SharedNetworkDiagram = ({
  title,
  description,
  nodes,
  hint,
  blockchainDetail,
  networkDetail,
}: {
  title: string;
  description: string;
  nodes: Node[];
  hint: string;
  blockchainDetail: string;
  networkDetail: string;
}) => {
  // Extended to a union type so the BLOCKCHAIN pill and Shared Decision
  // Network box can be selected too, matching the reference — every
  // node in this diagram is clickable there, not just the system rows.
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = nodes.find((n) => n.id === activeId);
  const activeDetail =
    activeId === 'blockchain'
      ? blockchainDetail
      : activeId === 'network'
      ? networkDetail
      : activeNode?.detail;

  return (
    <div className="rounded-card p-8 md:p-9 flex flex-col" style={{ background: '#16003B' }}>
      <h4 className="text-white font-bold mb-3">{title}</h4>
      <p className="text-ink_text-secondary text-sm leading-relaxed mb-8">{description}</p>

      <div className="relative">
        {/* Decorative trunk line running down the right edge of the
            system rows, purely visual -- approximates the reference's
            converging connector lines without full SVG routing. */}
        <span
          className="absolute top-3 bottom-3 right-[13px] w-px bg-ink-border"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-2.5">
          {nodes.map((node) => {
            const isActive = activeId === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(node.id)}
                className="flex items-center gap-3 w-full"
              >
                <span
                  className={`flex-1 text-sm tracking-tag text-center rounded-none py-2.5 border bg-ink-600 border-ink-border text-white transition-all ${
                    isActive ? 'ring-2 ring-accent' : 'hover:border-accent'
                  }`}
                >
                  {node.label}
                </span>
                <span className="relative z-10 w-7 h-7 rounded-full bg-accent border border-accent flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
                  AI
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <span className="text-ink_text-muted text-xs">↓</span>
        {/* Text color overridden to white per direct instruction ("when
            we have an orange background with text on it, the text
            should be white") — Round 16 had set this to dark navy
            (!text-ink) after verifying it against an actual old-site
            screenshot showing dark text here specifically. Flagging the
            conflict rather than silently dropping that finding: this
            change knowingly overrides a previously-verified source
            detail because the newer, explicit instruction takes
            priority.
            CLICKABLE (careful sweep): this pill and the Shared Decision
            Network box below are clickable in the reference too, each
            with its own info — they were static here before. */}
        <button
          type="button"
          onClick={() => setActiveId('blockchain')}
          className={`tag-mono !text-white bg-accent px-4 py-2 rounded-none font-bold transition-all ${
            activeId === 'blockchain' ? 'ring-2 ring-white' : ''
          }`}
        >
          BLOCKCHAIN
        </button>
        <span className="text-ink_text-muted text-xs">↓</span>
        <button
          type="button"
          onClick={() => setActiveId('network')}
          className={`bg-ink-600 border border-ink-border rounded-none px-4 py-3 text-center w-full max-w-[220px] transition-all ${
            activeId === 'network' ? 'ring-2 ring-accent' : 'hover:border-accent'
          }`}
        >
          <span className="text-white font-bold text-sm block">Shared Decision</span>
          <span className="text-ink_text-secondary text-xs">Network</span>
        </button>
      </div>

      <div className="mt-8 bg-ink-900 border border-ink-border rounded-none p-5 min-h-[64px] text-sm text-ink_text-secondary">
        {activeDetail || hint}
      </div>
    </div>
  );
};

// Top illustrated summary: System -> AI -> Blockchain, with numbered
// caption steps and a "now provable" badge underneath. This is a CSS/SVG
// approximation of the reference artwork (glowing orb, cube clusters) --
// close in spirit and layout, not a pixel-identical illustration.
//
// STAGE-DRIVEN ANIMATION (direct instruction): the packet now actually
// travels System -> AI -> Blockchain -> checkmark, pausing at each stop
// (holds position for a full interval before the state advances, rather
// than moving continuously), and the checkmark visibly lights up
// exactly when the packet arrives there, in sync — driven by real React
// state rather than independent CSS timelines, which can't guarantee
// that kind of synchronization reliably.
const TopDiagram = () => {
  return (
    <div className="rounded-card p-8 md:p-9 mb-8" style={{ background: '#16003B' }}>
      {/* REBUILT again this round (direct correction): "remove the
          line" — the track element is gone entirely, only the ball
          remains. And "the ball does not reach its end and go back to
          the beginning but a new ball starts" — switched from React-
          state-driven position (a CSS transition on `left`, which
          visibly slid backward every time the state looped back to
          stage 0) to the same continuous fade-in/fade-out keyframe
          already used for the vertical trust-chain diagram: each cycle
          starts a fresh, invisible ball at the System icon that fades
          in, travels to the checkmark, fades out, and only then does
          the next cycle begin — no backward slide, no visible track. */}
      <div className="relative flex flex-wrap items-center justify-center gap-10 md:gap-16">
        <span className="flow-packet-horizontal" aria-hidden="true" />
        <span className="flow-packet-horizontal flow-packet-horizontal--delay" aria-hidden="true" />

        {/* System */}
        <div className="w-16 h-20 flex items-center justify-center relative icon-float">
          <div className="absolute inset-0 m-auto w-16 h-16 rounded-none rotate-45" style={{ background: 'linear-gradient(135deg, #1c4378, #143360)' }} />
          <div
            className="absolute inset-0 m-auto w-16 h-16 rounded-none rotate-45"
            style={{ background: 'linear-gradient(135deg, #0E2647, #081d38)', clipPath: 'polygon(0% 50%, 50% 100%, 100% 50%)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            System
          </div>
        </div>

        <span className="text-ink_text-muted hidden md:block">—</span>

        {/* AI */}
        <div className="w-20 h-20 relative flex items-center justify-center">
          <div className="absolute w-10 h-10 rounded-none rotate-45" style={{ background: 'linear-gradient(135deg, #1c4378, #143360)' }} aria-hidden="true" />
          <div className="absolute w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, #FF8A3D 0%, #F26A1B 55%, #a23d08 100%)', boxShadow: '0 0 24px 6px rgba(255,138,61,0.45)' }} />
          <span className="absolute w-20 h-6 border rounded-full icon-spin" style={{ borderColor: 'rgba(255,138,61,0.5)' }} aria-hidden="true" />
          <span className="relative z-10 text-white font-bold text-sm">AI</span>
        </div>

        <span className="text-ink_text-muted hidden md:block">—</span>

        {/* Blockchain */}
        <div className="w-16 h-20 flex items-center justify-center">
          <div className="relative" style={{ width: 64, height: 40 }}>
            <div className="absolute left-0 bottom-0 w-7 h-7 rounded-none rotate-45 icon-drift-a" style={{ background: 'linear-gradient(135deg, #d4540f, #a23d08)' }} />
            <div className="absolute left-4 bottom-0 w-7 h-7 rounded-none rotate-45 icon-drift-b" style={{ background: 'linear-gradient(135deg, #F26A1B, #c24d0c)' }} />
            <div className="absolute left-2 top-0 w-7 h-7 rounded-none rotate-45 icon-drift-c" style={{ background: 'linear-gradient(135deg, #FF8A3D, #F26A1B)' }} />
          </div>
        </div>

        {/* Checkmark */}
        <div className="w-20 h-20 flex items-center justify-center">
          <span
            className="w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ borderColor: 'rgba(61,190,122,0.5)', color: '#3DBE7A', background: 'transparent' }}
          >
            ✓
          </span>
        </div>
      </div>

      {/* Caption row — same 4 labels, now a separate row below the
          icons rather than stacked individually under each one, since
          the icons above no longer carry their own text-center wrapper
          per icon. */}
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mt-3 mb-5 text-center">
        <p className="tag-mono w-16">data event</p>
        <span className="text-ink_text-muted hidden md:block opacity-0">—</span>
        <p className="tag-mono tag-mono--accent w-20">verify</p>
        <span className="text-ink_text-muted hidden md:block opacity-0">—</span>
        <div className="w-16">
          <p className="tag-mono">Blockchain</p>
          <p className="tag-mono tag-mono--accent">anchored</p>
        </div>
        <p className="w-20"></p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <span className="tag-mono rounded-none px-4 py-2 border border-ink-border">
          1 A system creates a data event
        </span>
        <span className="text-ink_text-muted">—</span>
        <span className="tag-mono rounded-none px-4 py-2 border border-ink-border">
          2 Decentralized AI verifies it
        </span>
        <span className="text-ink_text-muted">—</span>
        <span className="tag-mono rounded-none px-4 py-2 border border-ink-border">
          3 It is anchored to the blockchain
        </span>
      </div>

      <div className="flex justify-center mt-5">
        <span className="tag-mono border border-ink-border rounded-none px-5 py-2">
          ✓ Now provable, forever
        </span>
      </div>
    </div>
  );
};

export const TwoIdeas = () => {
  return (
    // STYLE FIX (Layer Page item 9): flipped to a white section
    // background with solid deep-purple (#16003B) boxes, per the edit
    // doc: "the background can be white, and the rectangle boxes to be
    // the deep purple so the orange can really pop out." Inner node
    // rows kept at a lighter purple shade so they're still visible
    // against the now-darker outer boxes — same "family" of purple, but
    // enough contrast to read as nested elements rather than the exact
    // same surface.
    <section id="see-it-clearly" className="section--light">
      <div className="wrap">
        <RevealOnScroll>
        <div className="sec-header max-w-2xl mx-auto text-center">
          <span className="eyebrow-plain--dark">SEE IT CLEARLY</span>
          <h2 className="sec-title--dark">Two ideas, drawn simply.</h2>
          <p className="sec-sub--dark sec-sub--center">
            If the words &quot;decentralized AI&quot; and &quot;trust layer&quot; feel
            abstract, watch it work, then explore the two pictures below.
          </p>
        </div>

        <TopDiagram />
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
        <div className="grid md:grid-cols-2 gap-8">
          <TrustChainDiagram
            title="1 · Blockchain is the trust layer"
            description="As work moves from one AI to the next, each hand-off is verified and recorded on the blockchain. Nothing passes unchecked."
            nodes={trustChainNodes}
            hint="Tap any box to see what it does"
          />
          <SharedNetworkDiagram
            title="2 · Every system gets its own AI"
            description="Instead of one AI for everything, each system runs its own agent. They share one verified decision network through blockchain."
            nodes={sharedNetworkNodes}
            hint="Tap any system to see what it does"
            blockchainDetail={blockchainDetail}
            networkDetail={networkDetail}
          />
        </div>
        </RevealOnScroll>

        {/* Single shared caption below both cards -- the reference has
            exactly one, not a separate footer duplicated inside each
            card. */}
        <p className="tag-mono text-center mt-8">
          One AI per system, every decision verified, all working as one network.
        </p>
      </div>
    </section>
  );
};
