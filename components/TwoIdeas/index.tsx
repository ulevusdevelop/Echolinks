import React, { useState } from 'react';

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

const trustChainNodes = [
  { id: 'erp', label: 'ERP AI', detail: 'The ERP AI creates a data event, ready to hand off.' },
  { id: 'verify1', label: 'verify', detail: 'The hand-off is checked and anchored before it moves on.' },
  { id: 'warehouse', label: 'Warehouse AI', detail: 'The Warehouse AI reads the verified event and acts on it.' },
  { id: 'verify2', label: 'verify', detail: 'This hand-off is verified too.' },
  { id: 'supplier', label: 'Supplier AI', detail: 'The Supplier AI receives a verified, tamper-proof instruction.' },
  { id: 'verify3', label: 'verify', detail: 'The final hand-off is checked and anchored, same as every step before it.' },
  { id: 'customer', label: 'Customer AI', detail: 'The Customer AI receives the completed, fully verified chain of custody.' },
];

const sharedNetworkNodes = [
  { id: 'sap', label: 'SAP ERP', detail: 'Runs its own decentralized AI agent.' },
  { id: 'salesforce', label: 'Salesforce', detail: 'Its agent handles CRM actions.' },
  { id: 'oracle', label: 'Oracle ERP', detail: 'A second ERP, a second agent.' },
  { id: 'primavera', label: 'Primavera P6', detail: 'Schedule and cost data gets its own agent.' },
  { id: 'wms', label: 'Warehouse WMS', detail: 'Inventory movements logged by a scoped agent.' },
  { id: 'manufacturing', label: 'Manufacturing', detail: 'Line and machine data feeds its own agent.' },
];

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
    <div className="card flex flex-col">
      <h4 className="text-white font-bold mb-3">{title}</h4>
      <p className="text-ink_text-secondary text-sm leading-relaxed mb-8">{description}</p>

      <div className="flex flex-col items-center gap-0">
        {nodes.map((node, i) => {
          const isVerify = node.label === 'verify';
          const isActive = activeId === node.id;

          if (isVerify) {
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveId(node.id)}
                className="flex items-center gap-2.5 py-2.5"
              >
                {/* Solid cube with a darker lower-facet overlay to fake
                    3D depth — checked against an extreme-zoom crop of
                    Sample.pdf, which shows a solid filled two-tone cube,
                    not a translucent outlined diamond. */}
                <span className={`relative w-7 h-7 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} aria-hidden="true">
                  <span className="absolute inset-0 bg-accent rounded-[3px] rotate-45" />
                  <span
                    className="absolute inset-0 bg-black/25 rounded-[3px] rotate-45"
                    style={{ clipPath: 'polygon(0% 50%, 50% 100%, 100% 50%)' }}
                  />
                </span>
                <span className="tag-mono tag-mono--accent">verify</span>
              </button>
            );
          }

          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`w-full max-w-[220px] text-sm font-mono tracking-tag text-center rounded-lg py-3 transition-all border bg-ink-600 border-ink-border text-white ${
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

      <div className="mt-8 bg-ink-900 border border-ink-border rounded-lg p-5 min-h-[64px] text-sm text-ink_text-secondary">
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
}: {
  title: string;
  description: string;
  nodes: Node[];
  hint: string;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = nodes.find((n) => n.id === activeId);

  return (
    <div className="card flex flex-col">
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
                  className={`flex-1 text-sm font-mono tracking-tag text-center rounded-lg py-2.5 border bg-ink-600 border-ink-border text-white transition-all ${
                    isActive ? 'ring-2 ring-accent' : 'hover:border-accent'
                  }`}
                >
                  {node.label}
                </span>
                <span className="relative z-10 w-7 h-7 rounded-full bg-accent border border-accent flex items-center justify-center text-[9px] font-bold text-ink flex-shrink-0">
                  AI
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-2">
        <span className="text-ink_text-muted text-xs">↓</span>
        <span className="tag-mono !text-ink bg-accent px-4 py-2 rounded-lg font-bold">
          BLOCKCHAIN
        </span>
        <span className="text-ink_text-muted text-xs">↓</span>
        <div className="bg-ink-600 border border-ink-border rounded-lg px-4 py-3 text-center w-full max-w-[220px]">
          <span className="text-white font-bold text-sm block">Shared Decision</span>
          <span className="text-ink_text-secondary text-xs">Network</span>
        </div>
      </div>

      <div className="mt-8 bg-ink-900 border border-ink-border rounded-lg p-5 min-h-[64px] text-sm text-ink_text-secondary">
        {active ? active.detail : hint}
      </div>
    </div>
  );
};

// Top illustrated summary: System -> AI -> Blockchain, with numbered
// caption steps and a "now provable" badge underneath. This is a CSS/SVG
// approximation of the reference artwork (glowing orb, cube clusters) --
// close in spirit and layout, not a pixel-identical illustration.
const TopDiagram = () => {
  return (
    <div className="card mb-8">
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 py-8">
        {/* System */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 relative">
            <div className="absolute inset-0 rounded-lg bg-ink-600 border border-ink-border rotate-45" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              System
            </div>
          </div>
          <p className="tag-mono">data event</p>
        </div>

        <span className="text-ink_text-muted hidden md:block">—</span>

        {/* AI */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-accent/20 border border-accent flex items-center justify-center relative">
            <div className="absolute inset-2 rounded-full bg-accent/40 blur-md" />
            <span className="relative text-white font-bold text-sm">AI</span>
          </div>
          <p className="tag-mono tag-mono--accent">verify</p>
        </div>

        <span className="text-ink_text-muted hidden md:block">—</span>

        {/* Blockchain -- 3-cube cluster, corrected from 2, matching the
            reference's stacked-block icon. */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3" style={{ width: 64, height: 40 }}>
            <div className="relative w-full h-full">
              <div className="absolute left-0 bottom-0 w-7 h-7 rounded bg-accent-soft border border-accent rotate-45" />
              <div className="absolute left-4 bottom-0 w-7 h-7 rounded bg-accent-soft border border-accent rotate-45" />
              <div className="absolute left-2 top-0 w-7 h-7 rounded bg-accent-soft border border-accent rotate-45" />
            </div>
          </div>
          <p className="tag-mono">Blockchain</p>
          <p className="tag-mono tag-mono--accent">anchored</p>
        </div>

        <span className="w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent">
          ✓
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <span className="tag-mono border border-ink-border rounded-pill px-4 py-2">
          1 A system creates a data event
        </span>
        <span className="text-ink_text-muted">—</span>
        <span className="tag-mono border border-accent text-accent-light rounded-pill px-4 py-2">
          2 Decentralized AI verifies it
        </span>
        <span className="text-ink_text-muted">—</span>
        <span className="tag-mono border border-ink-border rounded-pill px-4 py-2">
          3 It is anchored to the blockchain
        </span>
      </div>

      <div className="flex justify-center mt-5">
        <span className="tag-mono tag-mono--accent border border-accent rounded-pill px-5 py-2">
          ✓ Now provable, forever
        </span>
      </div>
    </div>
  );
};

export const TwoIdeas = () => {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-header max-w-xl mx-auto text-center">
          <span className="eyebrow">SEE IT CLEARLY</span>
          <h2 className="sec-title">Two ideas, drawn simply.</h2>
          <p className="sec-sub sec-sub--center">
            If the words &quot;decentralized AI&quot; and &quot;trust layer&quot; feel
            abstract, watch it work, then explore the two pictures below.
          </p>
        </div>

        <TopDiagram />

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
          />
        </div>

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
