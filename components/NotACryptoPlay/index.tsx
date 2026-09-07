import React from 'react';

export const NotACryptoPlay = () => {
  return (
    <section className="section relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'linear-gradient(135deg, #2A1608 0%, #180F39 60%)',
        }}
      />
      <div className="wrap relative grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="tag-mono tag-mono--accent">LET&apos;S BE CLEAR</span>
          <h2 className="sec-title mt-3">We are not a crypto play.</h2>
          <p className="text-ink_text-secondary text-base leading-relaxed mt-5 max-w-md">
            No token. No coin. No speculation. We are an integration company
            that uses blockchain as a trust tool, the same way you use a
            database. Your buyers never touch crypto, and they never need to
            understand it.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { text: 'Not a token or coin to buy', positive: false },
            { text: 'Not a DeFi or trading product', positive: false },
            { text: 'Not a rip-and-replace of your systems', positive: false },
            { text: 'An integration layer that makes trust verifiable', positive: true },
          ].map((item) => (
            <div
              key={item.text}
              className={`flex items-center gap-3 rounded-lg px-5 py-4 border ${
                item.positive
                  ? 'bg-accent-soft border-accent'
                  : 'bg-ink-900/60 border-ink-border'
              }`}
            >
              <span className={item.positive ? 'text-accent-light font-bold' : 'text-ink_text-muted'}>
                {item.positive ? '✓' : '✕'}
              </span>
              <span
                className={`text-sm ${
                  item.positive ? 'text-white font-semibold' : 'text-ink_text-secondary'
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
