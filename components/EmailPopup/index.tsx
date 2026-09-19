// components/EmailPopup/index.tsx
//
// NEW COMPONENT (client QA fix, Homepage #4): "for the
// info@echolinksolutions.com button, is it possible to have an email
// box popup? I tried it, and it took me away from the website
// completely to send an email to Echolink." The footer's CTA button
// used to be a plain `mailto:` link, which hands off to the visitor's
// OS mail client (or does nothing at all if they don't have one
// configured) instead of keeping them on the site. This replaces that
// with an in-page popup containing a real form that posts to the same
// working `/api/contact` endpoint (SMTP via nodemailer) the full
// /contact page already uses — same required fields (first/last name,
// email, organization) since that's what the API validates, just in a
// smaller, faster-to-fill layout meant for a quick note rather than a
// full inquiry.
import React, { useEffect, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  message: '',
};

type EmailPopupProps = {
  open: boolean;
  onClose: () => void;
};

export const EmailPopup = ({ open, onClose }: EmailPopupProps) => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Reset back to a blank form each time the popup is reopened, so a
  // prior success/error message doesn't linger on the next visit.
  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  // Close on Escape — standard modal behavior, and the only keyboard
  // affordance a visitor might reasonably expect here.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

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
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const fieldClass =
    'w-full bg-transparent border-0 border-b-2 border-white/20 pb-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6100] transition-colors';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Email us"
    >
      <div
        className="relative w-full max-w-md p-8 sm:p-10"
        style={{ background: '#16003B' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
          style={{ fontFamily: 'var(--font-syne), sans-serif' }}
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="pt-2">
            <h3 className="text-white font-bold text-xl mb-3">Message sent.</h3>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Thanks for reaching out — we&apos;ll get back to you at the email you
              provided, usually within one business day.
            </p>
            <button type="button" onClick={onClose} className="btn btn--ghost">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-white font-bold text-xl mb-2">Email us directly.</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-7">
              Send a quick note to info@echolinksolutions.com without leaving the
              site — we&apos;ll reply from there.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  aria-label="First name"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  aria-label="Last name"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                required
                value={form.email}
                onChange={handleChange}
                className={fieldClass}
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                aria-label="Organization"
                required
                value={form.organization}
                onChange={handleChange}
                className={fieldClass}
              />
              <textarea
                name="message"
                placeholder="Your message"
                aria-label="Your message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className={fieldClass + ' resize-none'}
              />

              {status === 'error' && (
                <p className="text-sm" style={{ color: '#FF6100' }}>
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn btn--primary w-fit"
              >
                {status === 'submitting' ? 'Sending…' : 'Send →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
