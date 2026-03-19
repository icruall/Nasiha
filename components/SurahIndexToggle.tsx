"use client";

import { useQuran } from "@/lib/quranContext";
import { usePathname } from "next/navigation";

export default function SurahIndexToggle() {
  const { toggleSidebar, isSidebarOpen, chapters } = useQuran();
  const pathname = usePathname();

  // Only show toggle on Quran reading pages (not the main index)
  const isQuranIndex = pathname === "/quran";
  const isQuranPage = pathname.startsWith("/quran");
  if (isQuranIndex || !isQuranPage) return null;

  // Extract surah number from path
  const surahMatch = pathname.match(/\/quran\/surah\/(\d+)/);
  const surahId = surahMatch ? parseInt(surahMatch[1]) : null;
  const currentChapter = surahId ? chapters.find(c => c.id === surahId) : null;

  return (
    <div className="fixed top-6 right-6 z-50 sm:top-8 sm:right-8">
      <button
        onClick={toggleSidebar}
        className={`group relative flex h-12 min-w-[3rem] items-center justify-center rounded-2xl bg-[#121820]/80 backdrop-blur-lg border border-white/10 shadow-2xl transition-all hover:bg-emerald-500/20 hover:border-emerald-500/40 active:scale-95 px-3 ${
          isSidebarOpen ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "text-gray-300"
        }`}
        aria-label="Toggle Surah Index"
        title="Surah Index"
      >
        <div className="flex items-center gap-2">
          {currentChapter && (
            <span 
              className="text-lg leading-none pt-1 hidden md:block"
              style={{ fontFamily: 'UthmanicHafs, serif' }}
            >
              سورة {currentChapter.name_arabic}
            </span>
          )}
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${isSidebarOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        
        {/* Tooltip hint on hover */}
        <span className="absolute top-1/2 -left-32 -translate-y-1/2 scale-0 rounded-lg bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20 shadow-xl transition-all group-hover:scale-100 whitespace-nowrap z-[100]">
          BROWSE SURAHS
        </span>
      </button>
    </div>
  );
}
