"use client";
import React, { useMemo } from "react";
import type { ChapterVerseWithWords, MushafWord, QuranChapter } from "@/lib/quranCom";
import { Bismillah } from "./Bismillah";
import { refineTajweed } from "@/lib/tajweed";
import { useQuran } from "@/lib/quranContext";

export function MushafView({
    verses,
    chapter,
    chapters,
    showTajweed = true
}: {
    verses: ChapterVerseWithWords[],
    chapter: QuranChapter,
    chapters: QuranChapter[],
    showTajweed?: boolean
}) {
    const pages = useMemo(() => {
        const pMap = new Map<number, Map<number, MushafWord[]>>();
        verses.forEach(v => {
            (v.words || []).forEach(w => {
                const p = w.page_number || 1;
                const l = w.line_number || 1;
                if (!pMap.has(p)) {
                    pMap.set(p, new Map());
                }
                const pageLines = pMap.get(p)!;
                if (!pageLines.has(l)) {
                    pageLines.set(l, []);
                }
                pageLines.get(l)!.push(w);
            });
        });
        return pMap;
    }, [verses]);

    return (
        <div className="flex flex-col gap-8 sm:gap-12 items-center w-full">
            {/* Dynamic Font Loading */}
            {Array.from(pages.keys()).map(page => {
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

            {Array.from(pages.entries()).map(([page, linesMap]) => {
                const isCenteredPage = page === 1 || page === 2;
                const pageGap = isCenteredPage ? "gap-5 lg:gap-8 py-12 sm:py-20" : "gap-2 lg:gap-3 py-10 sm:py-16";

                return (
                    <div
                        key={page}
                        className={`w-full max-w-4xl px-4 sm:px-12 md:px-16 rounded-[3rem] flex flex-col justify-center shadow-2xl transition-all duration-500 ${pageGap}`}
                        style={{ backgroundColor: '#FFFFEE' }}
                    >
                        {Array.from(linesMap.entries()).sort((a, b) => a[0] - b[0]).map(([lineNumber, words], index, allLines) => {
                            const lastWord = words[words.length - 1];
                            const isLastLineOfSurah = (() => {
                                if (!lastWord) return false;
                                const vk = lastWord.verse_key;
                                if (!vk) return false;
                                const [cId, vNum] = vk.split(":").map(Number);
                                
                                if (lastWord.char_type_name === "end") {
                                    const c = chapters.find(ch => ch.id === cId);
                                    if (c && vNum === c.verses_count) return true;
                                }

                                if (index === allLines.length - 1) {
                                    const allPages = Array.from(pages.keys()).sort((a, b) => a - b);
                                    if (page === allPages[allPages.length - 1]) return true;
                                }

                                const nextLineWords = allLines[index + 1]?.[1];
                                const nextFirstWord = nextLineWords?.[0];
                                if (nextFirstWord) {
                                    const [nextCId] = nextFirstWord.verse_key.split(":").map(Number);
                                    if (nextCId !== cId) return true;
                                }

                                return false;
                            })();

                            const isShortSurah = (chapter.verses_count || 0) <= 10;
                            const isShortLine = words.length < 5;
                            const justify = (isCenteredPage || isShortLine || isLastLineOfSurah || isShortSurah) ? "justify-center gap-[0.5em] sm:gap-[0.7em]" : "justify-between";
                            const lineClasses = `flex flex-wrap w-full items-center ${justify}`;

                            const firstWord = words[0];
                            const isNewSurahStart = firstWord?.verse_key?.endsWith(":1") && firstWord.position === 1;
                            const currentChapterId = firstWord ? Number.parseInt(firstWord.verse_key.split(":")[0], 10) : null;
                            const currentChapter = chapters.find(c => c.id === currentChapterId);

                            return (
                                <React.Fragment key={lineNumber}>
                                    {isNewSurahStart && currentChapter && currentChapter.id !== 1 && currentChapter.id !== 9 && (
                                        <div className="mt-6 mb-10 w-full flex justify-center">
                                            <Bismillah fontFamily={`'quran-font-v2-${page}-${showTajweed ? 'tajweed' : 'plain'}', UthmanicHafs, serif`} />
                                        </div>
                                    )}
                                    <div
                                        className={lineClasses}
                                        style={{ direction: 'rtl' }}
                                    >
                                    {words.map(w => {
                                        const content = w.code_v2 || w.text_qpc_hafs || w.text_uthmani || "";
                                        
                                        return (
                                            <span
                                                key={w.id}
                                                className="text-gray-900 flex-none"
                                                style={{ 
                                                    fontFamily: `'quran-font-v2-${page}-${showTajweed ? 'tajweed' : 'plain'}', UthmanicHafs, serif`, 
                                                    fontSize: 'var(--quran-font-size)', 
                                                    lineHeight: '2.0' 
                                                }}
                                                lang="ar"
                                                dangerouslySetInnerHTML={{ __html: content }}
                                            />
                                        );
                                    })}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        <div className="mt-8 text-center text-gray-400 text-sm font-semibold border-t border-gray-100 pt-4">
                            {page}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
