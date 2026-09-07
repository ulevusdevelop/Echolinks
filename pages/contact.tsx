// pages/contact.tsx
import React, { useState } from 'react';
import Head from 'next/head';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <>
      <Head>
        <title>Contact us — Echolink Solutions</title>
        <meta
          name="description"
          content="Bring one system, one decision you need to trust, and one process you want a machine to run. Let's scope it in a single working session."
        />
      </Head>

      <section className="section--page py-32">
        <div className="wrap max-w-2xl">
          <span className="eyebrow">GET IN TOUCH</span>
          <h1 className="sec-title mb-4">
            Let&apos;s wire your first verifiable workflow.
          </h1>
          <p className="sec-sub mb-10">
            Bring one system, one decision you need to trust, and one process you want a
            machine to run. We will scope the integration and the proof in a single
            working session.
          </p>

          {status === 'success' ? (
            <div className="card border-l-2 border-l-accent">
              <h3 className="text-white font-bold mb-2">Message sent.</h3>
              <p className="text-ink_text-secondary text-sm">
                Thanks for reaching out — we&apos;ll get back to you at the email you
                provided, usually within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="tag-mono block mb-2">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="tag-mono block mb-2">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="tag-mono block mb-2">COMPANY (OPTIONAL)</label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="tag-mono block mb-2">
                  WHAT SYSTEM OR DECISION DO YOU WANT TO WIRE UP?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn--primary mt-2 justify-center"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message →'}
              </button>
            </form>
          )}

          <p className="text-ink_text-secondary text-sm mt-8">
            Prefer email? Reach us directly at{' '}
            <a href="mailto:info@echolinksolutions.com" className="text-accent-light">
              info@echolinksolutions.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
