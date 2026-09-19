// pages/login.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // REDIRECT SUPPORT (direct request): when RequireMembership sends a
  // visitor here from a gated page (e.g. /lab, or a course's "Sign in
  // to open the Lab"), `redirect` carries where they were actually
  // trying to go. A successful login now sends them straight back
  // there instead of always to /account, so "login... then redirected
  // to where they can access the simulation" actually lands them on
  // the simulation, not a generic page they have to navigate away from
  // again. Only an internal path is ever honored (must start with a
  // single `/`, never `//`) — guards against this becoming an open
  // redirect to an arbitrary external URL via a crafted query string.
  const redirectParam = router.query.redirect;
  const redirectTo =
    typeof redirectParam === 'string' && redirectParam.startsWith('/') && !redirectParam.startsWith('//')
      ? redirectParam
      : '/account';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await login(username, password);

    setSubmitting(false);

    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Log in — Echolink Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Log in to your Echolink Solutions member account, or become a member." />
      </Head>

      {/* MIRRORED from the old site's own /client-login page: a
          "Welcome!" band with two choice buttons (Current Member
          Login / Become A Member) and decorative curved arrow lines,
          sitting above the actual login form rather than replacing it
          — the old site's version was a pure choice screen with no
          form of its own, but this site already has a working login
          form that shouldn't be thrown away, so the two are combined:
          welcome framing on top, working form below. */}
      <section className="relative overflow-hidden pt-44 pb-20 text-center" style={{ background: '#16003B' }}>
        <svg
          viewBox="0 0 400 120"
          className="absolute top-16 right-0 w-[400px] h-[120px] pointer-events-none hidden md:block"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M400 15 C 320 25, 270 75, 310 105 C 335 122, 300 130, 260 118"
            stroke="#FF6100"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <svg
          viewBox="0 0 260 140"
          className="absolute bottom-0 left-0 w-[260px] h-[140px] pointer-events-none hidden md:block"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 130 C 55 60, 130 55, 165 100 C 180 120, 200 60, 245 20"
            stroke="#FF6100"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M20 108 l-10 24 l24 -8 Z" fill="#FF6100" />
          <path d="M200 30 l24 -8 l-6 24 Z" fill="#FF6100" />
        </svg>

        <div className="wrap relative">
          <h1 className="text-white !font-bold text-4xl md:text-5xl mb-5">Welcome!</h1>
          <p className="text-lg mb-10">
            <span style={{ color: '#FF6100' }} className="font-bold">Login</span>
            <span className="text-white"> Or </span>
            <span style={{ color: '#FF6100' }} className="font-bold">Sign Up</span>
            <span className="text-white"> Here</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#login-form" className="btn btn--ghost !border-accent">
              Current Member Login
            </a>
            <Link
              href={redirectTo !== '/account' ? `/membership?redirect=${encodeURIComponent(redirectTo)}` : '/membership'}
              className="btn btn--ghost !border-accent"
            >
              Become A Member
            </Link>
          </div>
        </div>
      </section>

      <section id="login-form" className="section--page !pt-20 !pb-32">
        <div className="wrap max-w-md">
          <span className="eyebrow-plain">MEMBER LOGIN</span>
          <h2 className="sec-title mb-8">Welcome back.</h2>

          <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="tag-mono block mb-2">EMAIL OR USERNAME</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-border rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="password" className="tag-mono block mb-2">PASSWORD</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-border rounded-none px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {error && (
              <p className="text-base text-red-400 bg-red-950/40 border border-red-900 rounded-none px-4 py-3">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn btn--primary mt-2 justify-center">
              {submitting ? 'Signing in…' : 'Log in →'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
