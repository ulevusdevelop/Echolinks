// pages/account.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // If the session check finishes and there's no user, bounce to login
  // rather than showing an empty page.
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <section className="section--page py-32 text-center">
        <p className="text-ink_text-secondary">Loading your account…</p>
      </section>
    );
  }

  // Covers the brief moment between "not loading" and the redirect above
  // actually firing — avoids a flash of empty/broken content.
  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My Account — Echolink Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="section--page py-32">
        <div className="wrap max-w-2xl">
          <span className="eyebrow">MY ACCOUNT</span>
          <h1 className="sec-title mb-8">Welcome back, {user.name}.</h1>

          <div className="card mb-6">
            <span className="tag-mono tag-mono--accent">MEMBERSHIP STATUS</span>
            {user.hasActiveMembership ? (
              <>
                <h3 className="text-white font-bold text-lg mt-2 mb-3">
                  ✓ Active membership
                </h3>
                {user.activeMemberships.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {user.activeMemberships.map((m) => (
                      <span
                        key={m}
                        className="tag-mono border border-ink-border rounded-pill px-3 py-1.5"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mt-2 mb-3">
                  No active membership
                </h3>
                <p className="text-ink_text-secondary text-sm leading-relaxed mb-4">
                  You&apos;re logged in, but don&apos;t currently have an active
                  membership plan. Upgrade to unlock member-only content like the
                  interactive Lab.
                </p>
                <Link href="/membership" className="btn btn--primary">
                  View membership options →
                </Link>
              </>
            )}
          </div>

          <div className="card mb-6">
            <span className="tag-mono tag-mono--accent">QUICK LINKS</span>
            <div className="flex flex-col gap-2 mt-3">
              <Link href="/lab" className="text-sm text-ink_text-secondary hover:text-white">
                → The Lab
              </Link>
              <Link href="/training" className="text-sm text-ink_text-secondary hover:text-white">
                → Training
              </Link>
              <Link href="/contact" className="text-sm text-ink_text-secondary hover:text-white">
                → Contact support
              </Link>
            </div>
          </div>

          <button type="button" onClick={handleLogout} className="btn btn--ghost">
            Log out
          </button>
        </div>
      </section>
    </>
  );
}
