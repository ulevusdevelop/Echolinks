// components/RequireMembership/index.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

type RequireMembershipProps = {
  children: ReactNode;
  // Optional: require a specific membership title (matches MemberPress
  // product name), not just "any active membership".
  membership?: string;
};

// TESTING BYPASS (direct request): "make sure everything that a logged
// in member can see, all can see." Rather than touching every page
// that uses this wrapper (currently just /lab, but this is the single
// choke point for any future gated page too), flipping one flag here
// disables the gate everywhere at once, and flipping it back restores
// real membership checks everywhere at once — no need to hunt down
// every usage again either way.
//
// TO RESTORE REAL GATING LATER: set this back to false.
const TESTING_BYPASS_ALL_GATES = true;

export const RequireMembership = ({ children, membership }: RequireMembershipProps) => {
  const { user, loading } = useAuth();

  if (TESTING_BYPASS_ALL_GATES) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="section--page !py-24 text-center">
        <p className="text-ink_text-secondary">Checking your access…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="section--page !py-24 text-center">
        <span className="eyebrow-plain">MEMBERS ONLY</span>
        <h2 className="sec-title">Sign in to view this content.</h2>
        <p className="sec-sub sec-sub--center mt-4">
          This page is available to Echolink members. Log in to continue.
        </p>
        <Link href="/login" className="btn btn--primary mt-6 inline-flex">
          Log in →
        </Link>
      </div>
    );
  }

  const hasAccess = membership
    ? user.activeMemberships.includes(membership)
    : user.hasActiveMembership;

  if (!hasAccess) {
    return (
      <div className="section--page !py-24 text-center">
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
