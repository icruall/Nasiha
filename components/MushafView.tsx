import React from "react";
import type { ChapterVerseWithWords, MushafWord, QuranChapter } from "@/lib/quranCom";
import { Bismillah } from "./Bismillah";
import { refineTajweed } from "@/lib/tajweed";

export function MushafView({ verses, chapter }: { verses: ChapterVerseWithWords[], chapter: QuranChapter }) {
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
                        className={`w-[min(100%,800px)] px-3 sm:px-12 rounded-[2rem] flex flex-col justify-center min-h-[600px] ${pageGap} [--mushaf-font-size:22px] sm:[--mushaf-font-size:32px]`}
                        style={{ backgroundColor: '#FFFFEE' }}
                    >
                        {isFirstPage && chapter.id !== 1 && chapter.id !== 9 && (
                            <div className="mb-8 mt-2 w-full flex justify-center">
                                <Bismillah />
                            </div>
                        )}
                        {Array.from(linesMap.entries()).sort((a, b) => a[0] - b[0]).map(([lineNumber, words], index, allLines) => {
                            const lastWord = words[words.length - 1];
                            const isLastLineOfSurah = (() => {
                                // 1. Direct check: is it the last word of the surah?
                                if (lastWord?.char_type_name === "end") {
                                    const vk = lastWord.verse_key;
                                    if (vk) {
                                        const [, vNum] = vk.split(":").map(Number);
                                        if (vNum === chapter.verses_count) return true;
                                    }
                                }
                                // 2. Contextual check: is it the last line of this view?
                                if (index === allLines.length - 1) {
                                    // If it's the last line of the last page, it's definitely the end of the surat.
                                    const allPages = Array.from(pages.keys()).sort((a, b) => a - b);
                                    if (page === allPages[allPages.length - 1]) return true;
                                }
                                // 3. Sparse check (similar to QcfMushafLines)
                                if (words.length < 5) {
                                    const vk = words[0]?.verse_key;
                                    if (vk) {
                                        const [, vNum] = vk.split(":").map(Number);
                                        if (vNum === chapter.verses_count) return true;
                                    }
                                }
                                return false;
                            })();

                            const isShortSurah = (chapter.verses_count || 0) <= 10;

                            const isShortLine = words.length < 5;
                            const justify = (isCenteredPage || isShortLine || isLastLineOfSurah || isShortSurah) 
                                ? "justify-center gap-[0.4em] sm:gap-[0.7em]" 
                                : "justify-center sm:justify-between gap-[0.3em] sm:gap-0";
                            const lineClasses = `flex w-full items-center flex-wrap ${justify}`;

                            return (
                                <div
                                    key={lineNumber}
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
                                                    fontSize: 'var(--mushaf-font-size, 22px)', 
                                                    lineHeight: '2.2' 
                                                }}
                                                lang="ar"
                                                dangerouslySetInnerHTML={{ __html: refinedHtml }}
                                            />
                                        );
                                    })}
                                </div>
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
