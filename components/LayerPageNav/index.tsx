import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'layer', label: 'How it works' },
  { id: 'whole-stack', label: 'The stack' },
  { id: 'not-a-crypto-play', label: 'Not a crypto play' },
  { id: 'software-that-acts', label: 'Software that acts' },
  { id: 'how-we-engage', label: 'How we engage' },
  { id: 'what-we-do', label: 'What we do' },
  { id: 'who-we-serve', label: 'Who we serve' },
  { id: 'everything-we-connect', label: 'Solutions we handle' },
  { id: 'agent-grid', label: 'AI agents' },
  { id: 'why-decentralized', label: 'Why decentralized' },
  { id: 'see-it-clearly', label: 'See it clearly' },
  { id: 'six-ways', label: 'Six ways' },
];

// NEW: this page absorbed 12 sections in an earlier restructure
// (correctly, per the edit doc's own grouping), but that makes it long
// enough to feel like an undifferentiated wall of scrolling — direct
// feedback: "a bit much and not perfectly balanced." Rather than cut
// content that was explicitly asked to live here, added a sticky
// jump-nav so the page's full scope is visible the moment someone
// lands on it, and any section is one click away instead of endless
// scrolling. Becomes sticky only after scrolling past the hero (via
// IntersectionObserver on a sentinel div), so it doesn't compete with
// the main site header right at the top of the page.
export const LayerPageNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('layer-nav-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sticky top-[112px] z-40 bg-white border-b border-[#E5E5E5] transition-transform duration-200 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="wrap overflow-x-auto">
        <div className="flex items-center gap-1 py-3 whitespace-nowrap">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-[11px] tracking-tag uppercase px-3 py-2 hover:bg-[#F2F5F7] transition-colors flex-shrink-0"
              style={{ color: '#16003B' }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
