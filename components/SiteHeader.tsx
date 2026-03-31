"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SurahIndexToggle from "./SurahIndexToggle";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="relative z-[100] px-6 pt-6 pb-2">
      <div className="flex items-center justify-between gap-4 md:gap-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-flex items-center shrink-0 group">
            <Image
              src="/nasiha_logo_new.png"
              alt="Nasiha"
              width={isHome ? 190 : 140}
              height={isHome ? 80 : 60}
              priority
              className="h-auto w-auto max-h-12 md:max-h-16 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(207,229,242,0.9)]"
            />
          </Link>

          {/* Minimal Divider & Title - Only show more info on Home */}
          <div className="hidden sm:flex items-center gap-6">
            <div
              className={`h-8 w-[1px] bg-white/10 transition-all duration-500 ${
                isHome ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
              }`}
            />
            
            <div
              className={`transition-all duration-500 origin-left ${
                isHome ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
              }`}
            >
              <h1 className="text-xl md:text-2xl font-serif text-white/90 italic tracking-wide">
                Nasiha
              </h1>
              {isHome && (
                <p className="hidden md:block text-[11px] text-sky-100/50 leading-relaxed max-w-lg mt-1 font-sans">
                  A calm, reflective space to sit with your emotions — through
                  reflection, Qur&apos;an, duʿā&apos;, and hope.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          <SurahIndexToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
