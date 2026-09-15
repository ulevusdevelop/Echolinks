// pages/membership.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

// TEMP static plan data — once MemberPress products exist, these should
// come from MemberPress itself (either a WPGraphQL field similar to the
// activeMemberships bridge in MEMBERPRESS-BACKEND-SETUP.md, or by linking
// straight to MemberPress's own hosted checkout/pricing page instead of
// rendering plans here at all — often simpler than mirroring MemberPress's
// checkout UI in the headless frontend).
const plans = [
  {
    name: 'Lab Access',
    price: '$49/mo',
    description:
      'Full access to the interactive Lab — see the layer work on live demo scenarios before you commit.',
    features: ['Interactive Lab demos', 'EDI/FHIR sample workflows', 'Monthly office hours'],
  },
  {
    name: 'Partner',
    price: '$199/mo',
    description:
      'For teams actively integrating with Echolink — full Lab access plus priority support.',
    features: ['Everything in Lab Access', 'Priority support', 'Early access to new models'],
  },
];

export default function MembershipPage() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Membership — Echolink Solutions</title>
        <meta
          name="description"
          content="Choose a membership plan to unlock the interactive Lab and priority support."
        />
        <meta property="og:title" content="Membership — Echolink Solutions" />
        <meta property="og:description" content="Choose a membership plan to unlock the interactive Lab and priority support." />
      </Head>

      <section className="section--page !pt-44 !pb-32">
        <div className="wrap text-center">
          <span className="eyebrow-plain">MEMBERSHIP</span>
          <h1 className="sec-title">Unlock the full layer.</h1>
          <p className="sec-sub sec-sub--center mt-4">
            Membership gets you into the interactive Lab and keeps you close to what
            we&apos;re building next.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-14 max-w-3xl mx-auto text-left">
            {plans.map((plan) => (
              <div key={plan.name} className="card">
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-accent-light font-bold text-2xl mb-4">{plan.price}</p>
                <p className="text-ink_text-secondary text-base leading-relaxed mb-4">
                  {plan.description}
                </p>
                <ul className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-base text-ink_text-secondary">
                      <span className="text-accent-light">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {/*
                  IMPORTANT: this button currently links to /contact as a
                  placeholder. Real checkout needs to go through MemberPress's
                  own payment flow (Stripe/PayPal etc. as configured in
                  MemberPress), not a custom form here — MemberPress handles
                  PCI compliance and recurring billing; don't rebuild that.
                  Point this at your MemberPress registration/checkout URL
                  for the matching product once it exists, e.g.
                  https://yourdomain.com/register/lab-access/
                */}
                <Link href="/contact" className="btn btn--primary w-full justify-center">
                  Get {plan.name} →
                </Link>
              </div>
            ))}
          </div>

          {user && (
            <p className="text-ink_text-secondary text-base mt-10">
              Already a member?{' '}
              <Link href="/account" className="text-accent-light font-medium">
                View your account →
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
