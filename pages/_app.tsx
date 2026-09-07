// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AppLayout } from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { syne, jetbrainsMono } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={`${syne.variable} ${jetbrainsMono.variable} font-mono`}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </main>
    </AuthProvider>
  );
}
