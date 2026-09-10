"use client";

import { useMemo } from "react";
import type { VerseWithWords, MushafWord, QuranChapter } from "@/lib/quranCom";
import { SurahHeader } from "./SurahHeader";
import { Bismillah } from "./Bismillah";
import { refineTajweed } from '@/lib/tajweed';

export function QcfMushafLines({
  pageNumber,
  verses,
  chapters,
  showTajweed = true
}: {
  pageNumber: number;
  verses: VerseWithWords[];
  chapters?: QuranChapter[];
  showTajweed?: boolean;
}) {
  const chapterById = useMemo(() => {
    if (!chapters) return new Map<number, QuranChapter>();
    return new Map(chapters.map((c) => [c.id, c]));
  }, [chapters]);

  return (
    <div className="mushaf-fluid-page px-2 md:px-0" dir="rtl" lang="ar" style={{ textAlign: 'justify', lineHeight: '2.5' }}>
        {/* Dynamic Font Loading for this page */}
        <style dangerouslySetInnerHTML={{ __html: `
            @font-face {
                font-family: 'quran-font-v2-${pageNumber}-${showTajweed ? 'tajweed' : 'plain'}';
                src: url('${showTajweed ? `https://verses.quran.foundation/fonts/quran/hafs/v4/colrv1/woff2/p${pageNumber}.woff2` : `https://verses.quran.foundation/fonts/quran/hafs/v2/woff2/p${pageNumber}.woff2`}') format('woff2');
                font-display: swap;
            }
        `}} />

      {verses.map((verse) => {
        const isFirstVerse = verse.verse_key?.endsWith(":1");
        const chapterId = isFirstVerse ? Number.parseInt(verse.verse_key.split(":")[0], 10) : null;
        const chapter = chapterId ? chapterById.get(chapterId) : null;

        const words = verse.words ?? [];

        return (
          <span key={verse.id} className="inline">
            {chapter && (
              <span className="pt-8 mb-4 border-b border-gray-100 pb-8 w-full block text-center">
                <SurahHeader chapter={chapter} />
                {chapter.id !== 1 && chapter.id !== 9 && (
                  <span className="mt-4 block">
                    <Bismillah fontFamily={`'quran-font-v2-${pageNumber}-${showTajweed ? 'tajweed' : 'plain'}', UthmanicHafs, serif`} />
                  </span>
                )}
              </span>
            )}
            
            <span className="inline">
              {words.map((w: MushafWord) => {
                const isEnd = w.char_type_name === "end";

                if (isEnd) {
                  const marker = w.code_v2 || w.text_qpc_hafs || w.text_uthmani || "";
                  if (!marker || (/[A-Za-z\u0621-\u064A]/.test(marker) && !w.code_v2)) return null;

                  return (
                    <span
                      key={w.id}
                      className="inline-flex items-center justify-center font-semibold qcf-end-mushaf opacity-80 hover:opacity-100 transition-opacity"
                      style={{ 
                          fontFamily: `quran-font-v2-${pageNumber}, UthmanicHafs, serif`, 
                          fontSize: 'max(1.2rem, calc(var(--quran-font-size, 2rem) * 0.7))', 
                          padding: '0 0.4ch' 
                      }}
                      dangerouslySetInnerHTML={{ __html: marker }}
                    />
                  );
                }

                // Prioritize code_v2 for the pixel-perfect Quran.com look and to fix "gibberish" PUA issues.
                const content = w.code_v2 || w.text_qpc_hafs || w.text_uthmani || "";

                return (
                    <span
                      key={w.id}
                      className="text-gray-900 flex-none"
                      style={{ 
                          fontFamily: `'quran-font-v2-${pageNumber}-${showTajweed ? 'tajweed' : 'plain'}', UthmanicHafs, serif`, 
                          fontSize: 'var(--quran-font-size)', 
                          lineHeight: '2.0' 
                      }}
                      lang="ar"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                );
              })}
            </span>
          </span>
        );
      })}
    </div>
  );
}
