import React from "react";
import type { ChapterVerseWithWords, MushafWord, QuranChapter } from "@/lib/quranCom";
import { Bismillah } from "./Bismillah";
import { refineTajweed } from "@/lib/tajweed";

export function MushafView({ verses, chapter, chapters }: { verses: ChapterVerseWithWords[], chapter: QuranChapter, chapters: QuranChapter[] }) {
    // Group words by page_number, then by line_number
    const pages = new Map<number, Map<number, MushafWord[]>>();

    for (const v of verses) {
        if (!v.words) continue;
        for (const w of v.words) {
            const p = w.page_number || 1;
            const l = w.line_number || 1;

            if (!pages.has(p)) pages.set(p, new Map());
            if (!pages.get(p)!.has(l)) pages.get(p)!.set(l, []);
            pages.get(p)!.get(l)!.push(w);
        }
    }

    return (
        <div className="flex flex-col gap-12 items-center w-full">
            {Array.from(pages.entries()).map(([page, linesMap]) => {
                // Determine if this is a centered page (like Fatiha or start of Baqarah)
                const isCenteredPage = page === 1 || page === 2;
                const isFirstPage = page === Math.min(...Array.from(pages.keys()));
                const pageGap = isCenteredPage ? "gap-5 lg:gap-8 py-12 sm:py-20" : "gap-2 lg:gap-3 py-10 sm:py-16";

                return (
                    <div
                        key={page}
                        className={`w-[min(100%,800px)] px-2 sm:px-12 rounded-[2rem] flex flex-col justify-center min-h-[600px] ${pageGap}`}
                        style={{ backgroundColor: '#FFFFEE' }}
                    >
                        {/* Surah Headers and Bismillah are now handled dynamically per line below */}
                        {Array.from(linesMap.entries()).sort((a, b) => a[0] - b[0]).map(([lineNumber, words], index, allLines) => {
                            const lastWord = words[words.length - 1];
                            const isLastLineOfSurah = (() => {
                                if (!lastWord) return false;
                                const vk = lastWord.verse_key;
                                if (!vk) return false;
                                const [cId, vNum] = vk.split(":").map(Number);
                                
                                // 1. Direct check: is it the last word of its surah?
                                if (lastWord.char_type_name === "end") {
                                    const c = chapters.find(ch => ch.id === cId);
                                    if (c && vNum === c.verses_count) return true;
                                }

                                // 2. Contextual check: is it the last line of this view?
                                if (index === allLines.length - 1) {
                                    const allPages = Array.from(pages.keys()).sort((a, b) => a - b);
                                    if (page === allPages[allPages.length - 1]) return true;
                                }

                                // 3. Transition check: does the NEXT line start a new surah?
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
                            const lineClasses = `flex w-full items-center ${justify}`;

                            // Detect if this line starts a new surah
                            const firstWord = words[0];
                            const isNewSurahStart = firstWord?.verse_key?.endsWith(":1") && firstWord.position === 1;
                            const currentChapterId = firstWord ? Number.parseInt(firstWord.verse_key.split(":")[0], 10) : null;
                            const currentChapter = chapters.find(c => c.id === currentChapterId);

                            return (
                                <React.Fragment key={lineNumber}>
                                    {isNewSurahStart && currentChapter && currentChapter.id !== 1 && currentChapter.id !== 9 && (
                                        <div className="mt-6 mb-10 w-full flex justify-center">
                                            <Bismillah />
                                        </div>
                                    )}
                                    <div
                                        className={lineClasses}
                                        style={{ direction: 'rtl' }}
                                    >
                                    {words.map(w => {
                                        const rawHtml = w.text_uthmani_tajweed || w.text_qpc_hafs || w.text_uthmani || w.text || "";
                                        const refinedHtml = refineTajweed(rawHtml);

                                        return (
                                            <span
                                                key={w.id}
                                                className="tajweed text-gray-900 flex-none"
                                                style={{ 
                                                    fontFamily: 'UthmanicHafs, serif', 
                                                    fontSize: 'clamp(15px, 4.3vw, 36px)', 
                                                    lineHeight: '2.0' 
                                                }}
                                                lang="ar"
                                                dangerouslySetInnerHTML={{ __html: refinedHtml }}
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
