import React from "react";
import type { QuranChapter } from "@/lib/quranCom";

export function SurahDetailHeader({ chapter }: { chapter: QuranChapter }) {
    return (
        <div className="w-[min(100%,800px)] flex flex-col items-center justify-center pb-6 mb-6 relative overflow-hidden">
            <div className="flex items-center justify-between w-full mb-2 px-4 sm:px-12">
                {/* Left: Surah Number */}
                <div className="flex flex-col items-center justify-center flex-1">
                    <span className="text-[14px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Series</span>
                    <span className="text-3xl font-black text-gray-100/90">{chapter.id}</span>
                    <span className="text-[18px] text-gray-400 font-medium mb-1" style={{ fontFamily: 'UthmanicHafs, serif' }}>ترتيبها</span>
                </div>

                {/* Center: Names */}
                <div className="flex flex-col items-center flex-[2] px-4">
                    <h1 className="text-3xl sm:text-5xl text-emerald-400 mb-2 leading-tight flex flex-wrap items-center justify-center gap-4 text-center" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                        {chapter.name_arabic}
                        <span className="text-3xl sm:text-5xl text-emerald-400">سورة</span>
                    </h1>
                    <h2 className="text-2xl font-black text-gray-100 mb-1">
                        Surah {chapter.id === 3 ? "Al-'Imran" : chapter.name_simple}
                    </h2>
                    <p className="text-m text-gray-400 font-bold uppercase tracking-wider">
                        {chapter.translated_name?.name}
                    </p>
                </div>

                {/* Right: Ayahs */}
                <div className="flex flex-col items-center flex-1">
                    <span className="text-[18px] text-gray-400 font-medium mb-1" style={{ fontFamily: 'UthmanicHafs, serif' }}>آية</span>
                    <span className="text-2xl font-black text-gray-100">{chapter.verses_count}</span>
                    <span className="text-[14px] text-gray-500 uppercase tracking-widest mt-1 font-bold">Ayahs</span>
                </div>
            </div>

            <div className="mt-4 text-[14px] uppercase tracking-widest font-black text-emerald-500/80 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                Revelation: {chapter.revelation_place} 
            </div>
        </div>
    );
}
