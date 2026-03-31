import type { Metadata } from 'next'
import { Geist, Geist_Mono, Amiri, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import NextTopLoader from 'nextjs-toploader';
import PageTransition from "@/components/PageTransition";

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

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nasiha.app'),
  title: {
    default: 'Nasiha — A calm space for reflection',
    template: '%s — Nasiha',
  },
  description:
    'A calm, reflective space to sit with your emotions through reflection, Qur’an, duʿā’, and hope.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
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
        className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${playfair.variable} antialiased selection:bg-sky-500/30`}
      >
        <NextTopLoader 
          color="#eab308" 
          initialPosition={0.08} 
          crawlSpeed={200} 
          height={3} 
          crawl={true} 
          showSpinner={false} 
          easing="ease" 
          speed={200} 
          shadow="0 0 10px #eab308,0 0 5px #eab308"
        />
        <div className="living-background" aria-hidden="true" />
        <QuranProvider>
          <SiteHeader />
          <div className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </QuranProvider>
      </body>
    </html>
  );
}
