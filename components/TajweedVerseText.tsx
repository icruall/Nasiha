import React, { useEffect } from "react";
import type { ChapterVerseWithWords } from "@/lib/quranCom";
import { refineTajweed } from "@/lib/tajweed";

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
        <div id={`ayah-${verse.verse_number}`} className="py-8 px-4 sm:px-8 border-b border-gray-100 last:border-0 group quran-ayah">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Verse Number Indicator */}
                <div className="flex-none flex items-start mt-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-sm font-semibold text-emerald-400">
                        {verse.verse_number}
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    {/* Arabic Text */}
                    <div
                        className="text-right text-3xl leading-[2.5] text-gray-900 tajweed"
                        style={{ fontFamily: 'UthmanicHafs, serif', fontSize: 'clamp(24px, 4vw, 36px)' }}
                        dir="rtl"
                        lang="ar"
                        dangerouslySetInnerHTML={{ __html: tajweed }}
                    />

                    {/* Translation */}
                    {mainTranslation && (
                        <div
                            className="text-left text-base leading-relaxed text-gray-700 font-sans"
                            dangerouslySetInnerHTML={{ __html: mainTranslation }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
