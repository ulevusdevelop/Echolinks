import React from 'react';

// New page-level hero, matching the AI reference page's own hero
// structure (edit doc item 88): dark purple band, small category
// eyebrow, large H1, short paragraph, down-arrow scroll cue. The
// ProjectControls component (below, on the page) previously carried
// its own centered eyebrow+heading block doing this job at a smaller
// scale mid-page -- that's now redundant with this page-level hero and
// was removed from that component to avoid the same headline
// effectively appearing twice.
export const ProjectControlsHero = () => {
  return (
    <section style={{ background: '#16003B' }} className="pb-24">
      <div className="wrap">
        <span className="font-mono text-xs tracking-tag uppercase text-accent inline-block mb-4">
          PROJECT MANAGEMENT
        </span>
        <h1 className="text-white font-bold text-4xl md:text-5xl leading-tight max-w-2xl mb-6">
          Project Controls
        </h1>
        <p className="text-white/75 text-base leading-relaxed max-w-2xl">
          Echolink Solutions builds schedules that hold up under scrutiny and earned
          value that tells the truth. We map how your projects actually run, wire the
          reporting to your live systems, and anchor every baseline and progress claim
          to a record that is provable, not just reported.
        </p>
        <span className="text-white/50 text-xl mt-10 inline-block" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
};
