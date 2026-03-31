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
      <div 
        className="flex items-center justify-between border-y border-gray-200 px-4 py-4 rounded-xl shadow-sm transition-all duration-500"
        style={{ backgroundColor: '#FFFFEE' }}
      >
        {/* Left Medallion: Verse Count */}
        <div className="flex flex-col items-center justify-center w-20 h-16 bg-emerald-600 rounded-2xl text-white shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Ayahs</span>
          <span className="text-lg font-bold">
            {toEasternArabicNumerals(chapter.verses_count ?? 0)}
          </span>
        </div>

        {/* Center: Names */}
        <div className="flex flex-col items-center flex-[2] px-4">
            <h1 className="text-4xl sm:text-6xl !text-emerald-700 mb-4 leading-tight flex items-center justify-center gap-4 text-center" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                {chapter.name_arabic}
                <span className="text-4xl sm:text-6xl !text-emerald-700">سورة</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-black !text-gray-900 mb-2">
                Surah {chapter.id === 3 ? "Al-'Imran" : chapter.name_simple}
            </h2>
            <p className="text-m !text-gray-600 font-bold uppercase tracking-wider">
                {chapter.translated_name?.name}
            </p>
        </div>

        {/* Right Medallion: Surah Number */}
        <div className="flex flex-col items-center justify-center w-20 h-16 bg-emerald-600 rounded-2xl text-white shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Series</span>
          <span className="text-lg font-bold">
            {toEasternArabicNumerals(chapter.id)}
          </span>
        </div>
      </div>
    </div>
  );
}
