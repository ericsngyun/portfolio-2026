import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eric Yun — Design Engineer",
  description:
    "Portfolio of Eric Yun — Design Engineer crafting tournament platforms, AI-powered tools, and premium digital experiences.",
  openGraph: {
    title: "Eric Yun — Design Engineer",
    description:
      "Portfolio of Eric Yun — Design Engineer crafting tournament platforms, AI-powered tools, and premium digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable}`}>
      <body className="min-h-dvh bg-[var(--color-bg)] font-[family-name:var(--font-instrument)] text-[var(--color-text-primary)] antialiased">
        <SmoothScrollProvider>
          {/* Noise overlay for paper texture */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>

          <Header />
          <main id="main-content">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
