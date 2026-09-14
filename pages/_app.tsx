// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppLayout } from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { syne } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* CRITICAL FIX (previous round): "font-mono" was applied
          directly to this wrapper — a real, directly-applied font-
          family declaration (Tailwind's default monospace stack) on
          <main> itself, not just a class name. Removed.
          jetbrainsMono removed entirely this round (direct
          instruction: "the font has to be Syne") — nothing in the
          codebase references it anymore. */}
      <main className={syne.variable}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </main>
    </AuthProvider>
  );
}
