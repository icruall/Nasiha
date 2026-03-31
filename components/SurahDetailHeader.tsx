import React from "react";
import type { QuranChapter } from "@/lib/quranCom";

export function SurahDetailHeader({ chapter }: { chapter: QuranChapter }) {
    return (
        <div 
            className="w-full max-w-4xl p-5 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl transition-all duration-500 mb-8 sm:mb-12 flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: '#FFFFEE' }}
        >
            <div className="flex items-center justify-between w-full mb-4 sm:mb-6">
                {/* Left: Surah Number */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <span className="text-[10px] sm:text-[14px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Series</span>
                    <span className="text-xl sm:text-3xl font-black text-gray-900">{chapter.id}</span>
                </div>

                {/* Center: Names */}
                <div className="flex flex-col items-center flex-[2] px-2 sm:px-4">
                    <h1 className="text-3xl sm:text-6xl text-emerald-600 mb-2 sm:mb-4 leading-tight flex items-center justify-center gap-2 sm:gap-4 text-center" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                        {chapter.name_arabic}
                        <span className="text-2xl sm:text-6xl text-emerald-600">سورة</span>
                    </h1>
                    <h2 className="text-lg sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2 whitespace-nowrap">
                        Surah {chapter.id === 3 ? "Al-'Imran" : chapter.name_simple}
                    </h2>
                    <p className="text-[10px] sm:text-m text-gray-500 font-bold uppercase tracking-wider">
                        {chapter.translated_name?.name}
                    </p>
                </div>

                {/* Right: Ayahs */}
                <div className="flex flex-col items-center flex-1">
                    <span className="text-xl sm:text-3xl font-black text-gray-900">{chapter.verses_count}</span>
                    <span className="text-[10px] sm:text-[14px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Ayahs</span>
                </div>
            </div>

            <div className="mt-4 text-[14px] uppercase tracking-widest font-black text-emerald-700 bg-emerald-700/5 px-6 py-2 rounded-full border border-emerald-700/10">
                Revelation: {chapter.revelation_place} 
            </div>
        </div>
    );
}
