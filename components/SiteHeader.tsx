"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SurahIndexToggle from "./SurahIndexToggle";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="px-6 pt-6 pb-2">
      <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:items-center gap-4 md:gap-6">
        <Link href="/" className="inline-flex items-center shrink-0 group">
          <Image
            src="/nasiha_logo_new.png"
            alt="Nasiha"
            width={190}
            height={80}
            priority
            className="h-auto w-auto max-h-16 transition-transform duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(207,229,242,0.9)]"
          />
        </Link>

        <div
          aria-hidden={!isHome}
          className={[
            // Divider bar between logo and heading/description.
            // Horizontal on mobile (stacked), vertical on larger screens.
            "rounded-full bg-white/80",
            "origin-left sm:origin-top",
            "transition-all duration-300 ease-out",
            isHome
              ? "h-1 w-full opacity-80 scale-x-100 sm:h-22 sm:w-0.5 sm:self-stretch sm:scale-y-100"
              : "h-0 w-0 opacity-0 scale-x-75 sm:h-0 sm:w-0 sm:scale-y-75",
          ].join(" ")}
        />

        <div
          aria-hidden={!isHome}
          className={[
            "min-w-0 overflow-hidden will-change-transform",
            "transition-all duration-300 ease-out",
            isHome
              ? "opacity-100 max-h-40 translate-x-0 translate-y-0"
              : "opacity-0 max-h-0 -translate-x-3 -translate-y-1 pointer-events-none",
          ].join(" ")}
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-50">
            Nasiha
          </h1>
          <p className="mt-1 text-sm text-gray-200 leading-relaxed max-w-xl">
            A calm, reflective space to sit with your emotions — through
            reflection, Qur&apos;an, duʿā&apos;, and hope.
          </p>
        </div>

        {/* Push to the right */}
        <div className="sm:flex-1" />

        <div className="flex items-center gap-4 self-end sm:self-center">
          <SurahIndexToggle />
        </div>
      </div>
    </header>
  );
}

