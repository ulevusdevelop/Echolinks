// pages/404.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found — Echolink Solutions</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="The page you're looking for doesn't exist or has moved." />
      </Head>
      <section className="section--page !py-40 text-center">
        <div className="wrap">
          <span className="tag-mono tag-mono--accent">404</span>
          <h1 className="sec-title mt-4">This page didn&apos;t make it into the layer.</h1>
          <p className="sec-sub sec-sub--center mt-4 mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, or the link may be
            out of date. Let&apos;s get you back to something real.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/" className="btn btn--primary">
              Back to home →
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
