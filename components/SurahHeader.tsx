'use client';

import React from 'react';
import type { QuranChapter } from '@/lib/quranCom';

// Helper to convert numbers to Eastern Arabic numerals
function toEasternArabicNumerals(num: number | string): string {
  const easternArabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/[0-9]/g, (d) => easternArabic[parseInt(d)]);
}

export function SurahHeader({ chapter }: { chapter: QuranChapter }) {
  if (!chapter) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between bg-[#f0f5f1] border-y-2 border-[#a3bda5] px-4 py-2 rounded-md">
        {/* Left Medallion: Verse Count */}
        <div className="flex flex-col items-center justify-center w-20 h-16 bg-[#2f7a4d] rounded-full text-white shadow-sm border-2 border-white/50">
          <span className="text-xs font-medium">آياتها</span>
          <span className="text-base font-bold">
            {toEasternArabicNumerals(chapter.verses_count ?? 0)}
          </span>
        </div>

        {/* Center: Surah Name */}
        <div className="text-center px-2">
          <h2
            className="text-3xl md:text-4xl leading-tight text-zinc-800 select-none"
            style={{ fontFamily: "'UthmanicHafs', serif" }}
          >
            سورة {chapter.name_arabic}
          </h2>
        </div>

        {/* Right Medallion: Surah Number */}
        <div className="flex flex-col items-center justify-center w-20 h-16 bg-[#2f7a4d] rounded-full text-white shadow-sm border-2 border-white/50">
          <span className="text-xs font-medium">ترتيبها</span>
          <span className="text-base font-bold">
            {toEasternArabicNumerals(chapter.id)}
          </span>
        </div>
      </div>
    </div>
  );
}
