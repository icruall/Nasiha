import React, { useEffect } from "react";
import type { ChapterVerseWithWords } from "@/lib/quranCom";
import { refineTajweed } from "@/lib/tajweed";
import { useQuran } from "@/lib/quranContext";

export function TajweedVerseText({ 
    verse, 
    showTajweed = true 
}: { 
    verse: ChapterVerseWithWords, 
    showTajweed?: boolean 
}) {
    // Detect which pages are used in this verse to load fonts
    const pages = Array.from(new Set((verse.words || []).map(w => w.page_number))).filter(Boolean);
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
            {/* Dynamic Font Loading for this Ayah */}
            {pages.map(page => {
                const fontBase = showTajweed 
                    ? `https://verses.quran.foundation/fonts/quran/hafs/v4/colrv1/woff2/p${page}.woff2`
                    : `https://verses.quran.foundation/fonts/quran/hafs/v2/woff2/p${page}.woff2`;
                
                return (
                    <style key={`font-v2-${page}-${showTajweed}`} dangerouslySetInnerHTML={{ __html: `
                        @font-face {
                            font-family: 'quran-font-v2-${page}-${showTajweed ? 'tajweed' : 'plain'}';
                            src: url('${fontBase}') format('woff2');
                            font-display: swap;
                        }
                    `}} />
                );
            })}
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-14">
                {/* Verse Number Indicator */}
                <div className="flex-none flex items-start mt-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 text-sm font-bold text-emerald-700 group-hover:border-emerald-500/30 group-hover:text-emerald-800 transition-all duration-300">
                        {verse.verse_number}
                    </div>
                </div>

                <div className="flex-1 space-y-10 min-w-0">
                    {/* Arabic Text rendered word by word with High-Fidelity fonts */}
                    <div
                        className="text-right leading-[2.2] !text-black flex flex-wrap flex-row justify-start gap-x-2 gap-y-4"
                        dir="rtl"
                        lang="ar"
                    >
                        {(verse.words || []).map(w => {
                            const page = w.page_number;
                            const content = w.code_v2 || w.text_qpc_hafs || w.text_uthmani || "";
                            
                            return (
                                <span
                                    key={w.id}
                                    style={{ 
                                        fontFamily: `'quran-font-v2-${page}-${showTajweed ? 'tajweed' : 'plain'}', UthmanicHafs, serif`, 
                                        fontSize: 'var(--quran-font-size-translation)'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            );
                        })}
                    </div>

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
