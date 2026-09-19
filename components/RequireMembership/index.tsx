// components/RequireMembership/index.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

type RequireMembershipProps = {
  children: ReactNode;
  // Optional: require a specific membership title (matches MemberPress
  // product name), not just "any active membership".
  membership?: string;
};

// GATE OPEN AGAIN (direct request, current round): "For now I need
// users to be able to access every page even without login yet."
// Flipped back on for the same reason it exists — this is still the
// single choke point every gated page (currently /lab) runs through,
// so no page needed individual edits. The membership/login check
// itself is untouched below; when real gating is wanted again, flip
// this one flag back to false rather than touching every page that
// uses this wrapper.
const TESTING_BYPASS_ALL_GATES = true;

export const RequireMembership = ({ children, membership }: RequireMembershipProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (TESTING_BYPASS_ALL_GATES) {
    return <>{children}</>;
  }

  // TOP PADDING FIX (direct feedback): these gate states sit directly
  // under the site's fixed header with no page content above them, but
  // were only using `!py-24` (96px) top clearance — noticeably tighter
  // than the `!pt-44` (176px) every other page that opens straight
  // under the header already uses (login.tsx, lab.tsx, membership.tsx,
  // account.tsx). Split to `!pt-44 !pb-24` so the top clearance matches
  // that sitewide convention instead of being a one-off exception;
  // bottom padding is unchanged.
  if (loading) {
    return (
      <div className="section--page !pt-44 !pb-24 text-center">
        <p className="text-ink_text-secondary">Checking your access…</p>
      </div>
    );
  }

  if (!user) {
    // Carries the page the visitor was actually trying to reach (e.g.
    // /lab) through to login.tsx as `redirect`, so a successful login
    // or a completed "Become a member" sign-up sends them straight
    // back to the simulation they wanted instead of a generic account
    // page — the "redirected to where they can access the simulation"
    // half of the requirement.
    const redirectTo = router.asPath;
    return (
      <div className="section--page !pt-44 !pb-24 text-center">
        <span className="eyebrow-plain">MEMBERS ONLY</span>
        <h2 className="sec-title">Sign in to view this content.</h2>
        <p className="sec-sub sec-sub--center mt-4">
          This page is available to Echolink members. Log in, or register a free account, to
          continue.
        </p>
        <Link
          href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
          className="btn btn--primary mt-6 inline-flex"
        >
          Log in or register →
        </Link>
      </div>
    );
  }

  const hasAccess = membership
    ? user.activeMemberships.includes(membership)
    : user.hasActiveMembership;

  if (!hasAccess) {
    return (
      <div className="section--page !pt-44 !pb-24 text-center">
        <span className="eyebrow-plain">UPGRADE REQUIRED</span>
        <h2 className="sec-title">This content needs a different plan.</h2>
        <p className="sec-sub sec-sub--center mt-4">
          Your current membership doesn&apos;t include access to this page.
        </p>
        <Link href="/membership" className="btn btn--primary mt-6 inline-flex">
          View membership options →
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};
