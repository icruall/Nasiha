import React, { useEffect } from "react";
import type { ChapterVerseWithWords } from "@/lib/quranCom";
import { refineTajweed } from "@/lib/tajweed";
import { useQuran } from "@/lib/quranContext";

export function TajweedVerseText({ verse }: { verse: ChapterVerseWithWords }) {
    
    // We concatenate each word's text_uthmani_tajweed field into a seamless string
    let tajweed = (verse.words || [])
        .map(w => w.text_uthmani_tajweed || "")
        .join(" ");

    tajweed = refineTajweed(tajweed);

    const mainTranslation = verse.translations?.[0]?.text;

    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === `#ayah-${verse.verse_number}`) {
                const el = document.getElementById(`ayah-${verse.verse_number}`);
                if (el) {
                    el.classList.add("ayah-highlight");
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 100);

                    // Fade out after a moment
                    setTimeout(() => {
                        el.classList.remove("ayah-highlight");
                    }, 2500);
                }
            }
        };

        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, [verse.verse_number]);

    return (
        <div id={`ayah-${verse.verse_number}`} className="py-12 px-4 sm:px-10 border-b border-gray-100 last:border-0 group quran-ayah transition-colors duration-500 hover:bg-black/[0.01] overflow-hidden qcf-white-container !rounded-none !shadow-none !border-x-0 !border-t-0">
            <div className="flex flex-col md:flex-row gap-8 md:gap-14">
                {/* Verse Number Indicator */}
                <div className="flex-none flex items-start mt-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 text-sm font-bold text-emerald-700 group-hover:border-emerald-500/30 group-hover:text-emerald-800 transition-all duration-300">
                        {verse.verse_number}
                    </div>
                </div>

                <div className="flex-1 space-y-10 min-w-0">
                    {/* Arabic Text */}
                    <div
                        className="text-right leading-[2.2] !text-black tajweed break-words"
                        style={{ fontFamily: 'UthmanicHafs, serif', fontSize: 'var(--quran-font-size)' }}
                        dir="rtl"
                        lang="ar"
                        dangerouslySetInnerHTML={{ __html: tajweed }}
                    />

                    {/* Translation */}
                    {mainTranslation && (
                        <div
                            className="text-left text-lg leading-relaxed text-gray-600 font-sans italic break-words"
                            dangerouslySetInnerHTML={{ __html: mainTranslation }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
