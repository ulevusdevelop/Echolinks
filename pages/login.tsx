// pages/login.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await login(username, password);

    setSubmitting(false);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Log in — Echolink Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <section className="section--page py-32">
        <div className="wrap max-w-md">
          <span className="eyebrow">MEMBER LOGIN</span>
          <h1 className="sec-title mb-8">Welcome back.</h1>

          <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
            <div>
              <label className="tag-mono block mb-2">EMAIL OR USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="tag-mono block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ink-900 border border-ink-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
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
