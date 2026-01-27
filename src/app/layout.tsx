import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric Yun | Full-Stack Engineer & Designer",
  description:
    "Portfolio of Eric Yun - Full-stack engineer building tournament platforms, AI-powered tools, and polished web experiences.",
  openGraph: {
    title: "Eric Yun | Full-Stack Engineer & Designer",
    description:
      "Portfolio of Eric Yun - Full-stack engineer building tournament platforms, AI-powered tools, and polished web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} min-h-dvh bg-white font-sans antialiased dark:bg-zinc-950`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
