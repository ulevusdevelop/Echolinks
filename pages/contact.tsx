// pages/contact.tsx
import React, { useState } from 'react';
import Head from 'next/head';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  title: '',
  city: '',
  region: '',
  country: '',
  message: '',
};

// REBUILT this round, mirrored directly from the old site's own
// /contact page: a short dark "Let's Talk" hero (heading + two
// paragraphs + two decorative accent squares), then the form on a
// WHITE section with underline-only inputs (no boxes) instead of the
// previous full-height dark card with bordered box inputs. Field set
// also expanded to match the reference exactly: First/Last name,
// Email, Organization, Title, City/State/Country, message, and a
// privacy consent checkbox — the old version only had Name/Email/
// Company/Message.
export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setErrorMsg('Please agree to the privacy policy to continue.');
      return;
    }
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
      setForm(initialForm);
      setConsent(false);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const fieldClass =
    'w-full bg-transparent border-0 border-b-2 border-[#DCDFE3] pb-2 text-sm focus:outline-none focus:border-[#FF6100] transition-colors';

  return (
    <>
      <Head>
        <title>Contact us — Echolink Solutions</title>
        <meta
          name="description"
          content="Let's discuss what our expertise can do for you. Contact us to learn more about our end-to-end technology services."
        />
        <meta property="og:title" content="Contact us — Echolink Solutions" />
        <meta property="og:description" content="Let's discuss what our expertise can do for you. Contact us to learn more about our end-to-end technology services." />
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden pt-44 pb-24" style={{ background: '#16003B' }}>
        <span className="absolute bottom-10 right-32 w-6 h-6 bg-white hidden md:block" aria-hidden="true" />
        <span className="absolute bottom-0 right-16 w-14 h-14 hidden md:block" style={{ background: '#FF6100' }} aria-hidden="true" />
        {/* WIDENED (direct feedback: "the intro sections... text
            width... span through a bit more width") — same fix as the
            other page-opening heroes: widened from max-w-2xl (672px)
            to max-w-3xl (768px). */}
        <div className="wrap max-w-3xl">
          <h1 className="text-white !font-bold text-4xl md:text-5xl mb-6">Let&apos;s Talk</h1>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Let&apos;s discuss what our expertise can do for you. Contact us to learn more
            about how our end-to-end technology services, insightful business
            consulting, and customized solutions can help.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            Whether you have a specific goal or challenge in mind or want to discuss
            big-picture ideas for your organization, we&apos;ll provide insight,
            support, and guidance every step of the way. Complete the form below, and
            we&apos;ll connect you with the right team member to assist you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20">
        <div className="wrap max-w-2xl">
          {status === 'success' ? (
            <div className="border-l-2 pl-6" style={{ borderColor: '#FF6100' }}>
              <h3 className="font-bold mb-2" style={{ color: '#16003B' }}>Message sent.</h3>
              <p className="text-base" style={{ color: '#434343' }}>
                Thanks for reaching out — we&apos;ll get back to you at the email you
                provided, usually within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                    name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="organization" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                  Organization Name*
                </label>
                <input
                  type="text"
                  id="organization"
                    name="organization"
                  placeholder="Organization Name"
                  value={form.organization}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="title" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                    name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <label htmlFor="city" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="region" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                    State/Region/Province
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    placeholder="State/Region/Province"
                    value={form.region}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="country" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={form.country}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-bold block mb-2" style={{ color: '#16003B' }}>
                  How can we help?
                </label>
                <textarea
                  id="message"
                    name="message"
                  placeholder="Your message here"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className={fieldClass + ' resize-none'}
                />
              </div>

              <p className="text-base leading-relaxed" style={{ color: '#707070' }}>
                Echolink Solutions is committed to protecting and respecting your
                privacy. Please confirm that you agree with our privacy policy by
                checking the box below.
              </p>

              <label className="flex items-center gap-3 text-xs" style={{ color: '#434343' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4"
                />
                I agree with the privacy policy and consent to receive communications
                from Echolink Solutions.
              </label>

              {status === 'error' && (
                <p className="text-base text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn--ghost-accent w-fit"
              >
                {status === 'submitting' ? 'Sending…' : 'Submit →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
