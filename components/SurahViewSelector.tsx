"use client";

import { useState, useEffect } from "react";
import type { ChapterVerseWithWords, QuranChapter } from "@/lib/quranCom";
import { TajweedVerseText } from "./TajweedVerseText";
import { MushafView } from "./MushafView";
import { Bismillah } from "./Bismillah";
export function SurahViewSelector({ verses, chapter, chapters }: { verses: ChapterVerseWithWords[], chapter: QuranChapter, chapters: QuranChapter[] }) {
    const [mode, setMode] = useState<"translation" | "mushaf">("mushaf");
    const [showTajweed, setShowTajweed] = useState(true);

    useEffect(() => {
        if (window.location.hash.startsWith('#ayah-')) {
            requestAnimationFrame(() => {
                setMode("translation");
            });
        }
    }, []);

    return (
        <div className="w-full mt-4 flex flex-col items-center">
            {/* Controls Row - Just the Toggles */}
            <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-2">
                {/* Mode Toggle */}
                <div className="flex bg-white/[0.03] backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
                    <button
                        onClick={() => setMode("translation")}
                        className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === "translation"
                            ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]"
                            : "text-sky-100/40 hover:text-white"
                            }`}
                    >
                        Translation
                    </button>
                    <button
                        onClick={() => setMode("mushaf")}
                        className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${mode === "mushaf"
                            ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]"
                            : "text-sky-100/40 hover:text-white"
                            }`}
                    >
                        Reading
                    </button>
                </div>

                {/* Tajweed Toggle (Premium Look) */}
                <div className="flex items-center gap-3 bg-white/[0.03] backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
                    <span className="text-xs font-bold tracking-widest uppercase text-sky-100/30">Tajweed</span>
                    <button
                        onClick={() => setShowTajweed(!showTajweed)}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 p-1 ${showTajweed ? 'bg-emerald-500/30' : 'bg-white/5'}`}
                    >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${showTajweed ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {mode === "translation" ? (
                <div 
                    className="w-full max-w-4xl rounded-[3rem] py-8 sm:py-16 shadow-2xl transition-all duration-500"
                    style={{ backgroundColor: '#FFFFEE' }}
                >
                    {chapter.id !== 1 && chapter.id !== 9 && (
                        <div className="mb-20 mt-4 opacity-80 hover:opacity-100 transition-opacity duration-700">
                            <Bismillah />
                        </div>
                    )}
                    <div className="space-y-4">
                        {verses.map((verse) => (
                            <TajweedVerseText key={verse.id} verse={verse} showTajweed={showTajweed} />
                        ))}
                    </div>
                </div>
            ) : (
                <MushafView verses={verses} chapter={chapter} chapters={chapters} showTajweed={showTajweed} />
            )}
        </div>
    );
}
