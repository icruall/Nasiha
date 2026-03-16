import React from "react";
import type { QuranChapter } from "@/lib/quranCom";

export function SurahDetailHeader({ chapter }: { chapter: QuranChapter }) {
    return (
        <div className="w-[min(100%,800px)] flex flex-col items-center justify-center pb-6 mb-6 relative overflow-hidden">
            <div className="flex items-center justify-between w-full mb-2 px-4 sm:px-12">
                {/* Left: Surah Number */}
                <div className="flex flex-col items-center flex-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Surah</span>
                    <span className="text-lg font-bold text-gray-200">{chapter.id}</span>
                </div>

                {/* Center: Names */}
                <div className="flex flex-col items-center flex-[2] px-4">
                    <h1 className="text-3xl lg:text-4xl text-emerald-400 mb-1 leading-normal" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                        {chapter.name_arabic}
                    </h1>
                    <h2 className="text-base font-bold text-gray-200 mb-1">
                        {chapter.id === 3 ? "Al-'Imran" : chapter.name_simple}
                    </h2>
                    <p className="text-[10px] text-gray-400">
                        {chapter.translated_name?.name}
                    </p>
                </div>

                {/* Right: Ayahs */}
                <div className="flex flex-col items-center flex-1">
                    <span className="text-lg font-bold text-gray-200">{chapter.verses_count}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ayahs</span>
                </div>
            </div>

            <div className="mt-2 text-[9px] uppercase tracking-widest text-emerald-500/60 bg-emerald-500/10 px-3 py-1 rounded-full">
                {chapter.revelation_place} Revelation
            </div>
        </div>
    );
}
