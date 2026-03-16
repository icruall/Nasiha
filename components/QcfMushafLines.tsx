"use client";

import { useMemo } from "react";
import type { VerseWithWords, MushafWord, QuranChapter } from "@/lib/quranCom";
import { SurahHeader } from "./SurahHeader";
import { Bismillah } from "./Bismillah";

const CDN_BASE = "https://verses.quran.foundation";

function fontUrlFor(pageNumber: number, variant: "v2" | "v4-colrv1") {
  if (variant === "v2") {
    return `${CDN_BASE}/fonts/quran/hafs/v2/woff2/p${pageNumber}.woff2`;
  }
  return `${CDN_BASE}/fonts/quran/hafs/v4/colrv1/woff2/p${pageNumber}.woff2`;
}

export function QcfMushafLines({
  pageNumber,
  verses,
  tajweedColors,
  chapters,
}: {
  pageNumber: number;
  verses: VerseWithWords[];
  tajweedColors: boolean;
  chapters?: QuranChapter[];
}) {
  const fontFamily = `qcf-p${pageNumber}-${tajweedColors ? "v4" : "v2"}`;
  const qcfFontUrl = fontUrlFor(pageNumber, tajweedColors ? "v4-colrv1" : "v2");

  const chapterById = useMemo(() => {
    if (!chapters) return new Map<number, QuranChapter>();
    return new Map(chapters.map((c) => [c.id, c]));
  }, [chapters]);

  const lines = useMemo(() => {
    const map = new Map<number, MushafWord[]>();
    for (const v of verses) {
      for (const w of v.words ?? []) {
        const line = w.line_number ?? 0;
        if (!line) continue;
        const arr = map.get(line) ?? [];
        arr.push(w);
        map.set(line, arr);
      }
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [verses]);

  return (
    <div className="qcf-page" dir="rtl" lang="ar">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@font-face {
  font-family: '${fontFamily}';
  src: url('${qcfFontUrl}') format('woff2');
  font-display: swap;
}

@font-palette-values --qcf-tajweed {
  font-family: '${fontFamily}';
  base-palette: 0;
}
`,
        }}
      />

      <div className="qcf-lines">
        {lines.map(([lineNumber, words], index) => {
          // Check if this line contains the first word of the first verse of a surah
          const firstVerseWord = words.find((w) => w.verse_key?.endsWith(":1") && w.position === 1);
          const chapterId = firstVerseWord
            ? Number.parseInt(firstVerseWord.verse_key.split(":")[0], 10)
            : null;
          const chapter = chapterId ? chapterById.get(chapterId) : null;

          const lastWord = words[words.length - 1];
          const currentVk = lastWord?.verse_key;
          const currentChapterId = currentVk ? Number.parseInt(currentVk.split(":")[0], 10) : null;
          
          // Check if the next line starts a new surah
          const nextLineChapterId = (() => {
            const nextLineWords = lines[index + 1]?.[1];
            const nextFirstWord = nextLineWords?.[0];
            const nextVk = nextFirstWord?.verse_key;
            return nextVk ? Number.parseInt(nextVk.split(":")[0], 10) : null;
          })();

          const isLastAyahSparse = (() => {
            if (words.length >= 4) return false;
            const vk = words[0]?.verse_key;
            if (!vk) return false;
            const [cId, vNum] = vk.split(":").map(Number);
            const chaptersCount = chapterById.get(cId)?.verses_count;
            return vNum === chaptersCount;
          })();

          const isShortSurah = (() => {
            const vk = words[0]?.verse_key;
            if (!vk) return false;
            const cId = Number.parseInt(vk.split(":")[0], 10);
            const count = chapterById.get(cId)?.verses_count;
            return count !== undefined && count <= 10;
          })();

          const isLastLineOfSurah = 
            isShortSurah ||
            isLastAyahSparse ||
            (currentChapterId && nextLineChapterId && currentChapterId !== nextLineChapterId) ||
            (lastWord?.char_type_name === "end" && (() => {
              const vk = lastWord.verse_key;
              if (!vk) return false;
              const [cId, vNum] = vk.split(":").map(Number);
              const chaptersCount = chapterById.get(cId)?.verses_count;
              return vNum === chaptersCount;
            })());

          return (
            <div key={`${pageNumber}-${lineNumber}`} className="contents">
              {chapter && (
                <div className="pt-4 mb-2 border-b border-gray-100 pb-8 w-full text-center">
                  <SurahHeader chapter={chapter} />
                  {chapter.id !== 1 && chapter.id !== 9 && (
                    <div className="mt-4">
                      <Bismillah />
                    </div>
                  )}
                </div>
              )}
              <div className={`qcf-line ${isLastLineOfSurah ? "is-last-line" : ""}`}>
                {words.map((w) => {
                  const isEnd = w.char_type_name === "end";
                  if (isEnd) {
                    const marker = w.text_qpc_hafs ?? w.text_uthmani ?? "";
                    // If the marker contains standard Arabic letters, it's not a valid ayah number.
                    if (/[A-Za-z\u0621-\u064A]/.test(marker)) return null;

                    return (
                      <span
                        key={w.id}
                        className="qcf-end-mushaf"
                        style={{ fontFamily: "UthmanicHafs, serif" }}
                      >
                        {marker}
                      </span>
                    );
                  }

                  const code = w.code_v2 ?? "";
                  if (!code) return null;

                  return (
                    <span
                      key={w.id}
                      className="qcf-word"
                      style={
                        tajweedColors
                          ? ({ fontFamily: `${fontFamily}, serif`, fontPalette: "--qcf-tajweed" } as any)
                          : ({ fontFamily: `${fontFamily}, serif` } as any)
                      }
                      dangerouslySetInnerHTML={{ __html: code }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

