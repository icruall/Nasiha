"use client";

import Link from 'next/link';
import { ReactNode } from 'react';

interface AdhkarPageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backHref?: string;
}

export function AdhkarPageLayout({ 
  title, 
  subtitle, 
  children, 
  backHref = "/hisn-ul-muslim" 
}: AdhkarPageLayoutProps) {
  return (
    <main className="min-h-screen py-12 px-6 sm:py-24">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-8">
          <Link 
            href={backHref}
            className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-orange-400 transition-all gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-orange-500/30 group-hover:bg-orange-500/10 mb-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            Back to Library
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white/90 italic tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-orange-400/60 text-[10px] uppercase tracking-[0.4em] font-bold">{subtitle}</p>
            )}
          </div>
        </header>

        <div className="space-y-12">
          {children}
        </div>

        <footer className="pt-16 border-t border-white/5 opacity-30 hover:opacity-100 transition-opacity duration-700">
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
            Source: Hisn-ul-Muslim (Fortress of the Muslim)
          </p>
        </footer>
      </div>
    </main>
  );
}
