"use client";

import { useState, useEffect } from "react";
import type { ChapterVerseWithWords, QuranChapter } from "@/lib/quranCom";
import { TajweedVerseText } from "./TajweedVerseText";
import { MushafView } from "./MushafView";
import { Bismillah } from "./Bismillah";

export function SurahViewSelector({ verses, chapter, chapters }: { verses: ChapterVerseWithWords[], chapter: QuranChapter, chapters: QuranChapter[] }) {
    const [mode, setMode] = useState<"translation" | "mushaf">("mushaf");

    useEffect(() => {
        if (window.location.hash.startsWith('#ayah-')) {
            requestAnimationFrame(() => {
                setMode("translation");
            });
        }
    }, []);

    return (
        <div className="w-full mt-4 flex flex-col items-center">
            {/* Toggle at top left of the content block */}
            <div className="w-[min(100%,800px)] flex justify-start mb-4">
                <div className="flex bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 scale-90 origin-left">
                    <button
                        onClick={() => setMode("translation")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "translation"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        Translation
                    </button>
                    <button
                        onClick={() => setMode("mushaf")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${mode === "mushaf"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        Reading
                    </button>
                </div>
            </div>

            {mode === "translation" ? (
                <div className="w-[min(100%,800px)] border border-gray-100 rounded-[2rem] py-4 sm:py-8 shadow-sm" style={{ backgroundColor: '#FFFFEE' }}>
                    {chapter.id !== 1 && chapter.id !== 9 && (
                        <div className="mb-12 mt-4">
                            <Bismillah />
                        </div>
                    )}
                    {verses.map((verse) => (
                        <TajweedVerseText key={verse.id} verse={verse} />
                    ))}
                </div>
            ) : (
                <MushafView verses={verses} chapter={chapter} chapters={chapters} />
            )}
        </div>
    );
}
