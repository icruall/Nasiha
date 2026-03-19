import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amiri } from 'next/font/google'
import SiteHeader from "@/components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nasiha.app'), // change to your real domain later
  title: {
    default: 'Nasiha — A calm space for reflection',
    template: '%s — Nasiha',
  },
  description:
    'A calm, reflective space to sit with your emotions through reflection, Qur’an, duʿā’, and hope.',
  robots: {
    index: true,
    follow: true,
  },
}

import { QuranProvider } from "@/lib/quranContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} antialiased`}
      >
        <QuranProvider>
          <SiteHeader />
          {children}
        </QuranProvider>
      </body>
    </html>
  );
}
