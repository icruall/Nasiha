"use client";

import { useMemo } from 'react';
import type { ChapterVerseWithWords, MushafWord } from '@/lib/quranCom';
import { refineTajweed } from '@/lib/tajweed';

const CDN_BASE = 'https://verses.quran.foundation';

function qcfFontUrl(pageNumber: number, tajweedColors: boolean) {
  if (!tajweedColors) {
    return `${CDN_BASE}/fonts/quran/hafs/v2/woff2/p${pageNumber}.woff2`;
  }
  return `${CDN_BASE}/fonts/quran/hafs/v4/colrv1/woff2/p${pageNumber}.woff2`;
}

export function QcfVerseByVerse({
  verses,
  tajweedColors,
  showTranslation,
}: {
  verses: ChapterVerseWithWords[];
  tajweedColors: boolean;
  showTranslation: boolean;
}) {
  const pageNumbers = useMemo(() => {
    const set = new Set<number>();
    for (const v of verses) {
      for (const w of v.words ?? []) {
        if (w.page_number) set.add(w.page_number);
      }
    }
    return [...set].sort((a, b) => a - b);
  }, [verses]);

  const fontFacesCss = useMemo(() => {
    const faces = pageNumbers
      .map((p) => {
        const fam = `qcf-p${p}-${tajweedColors ? "v4" : "v2"}`;
        const url = qcfFontUrl(p, tajweedColors);
        return `@font-face{font-family:'${fam}';src:url('${url}') format('woff2');font-display:swap;}`;
      })
      .join("\n");

    const palette = tajweedColors
      ? `
@font-palette-values --qcf-tajweed { font-family: 'qcf-p1-v4'; base-palette: 0; }
`
      : "";

    return `
${faces}
${palette}
`;
  }, [pageNumbers, tajweedColors]);

  return (
    <div dir="rtl" lang="ar" className="qcf-page space-y-4">
      <style dangerouslySetInnerHTML={{ __html: fontFacesCss }} />
      {verses.map((v) => (
        <QcfVerse
          key={v.id}
          verse={v}
          tajweedColors={tajweedColors}
          showTranslation={showTranslation}
        />
      ))}
    </div>
  );
}

function QcfVerse(props: {
  verse: ChapterVerseWithWords;
  tajweedColors: boolean;
  showTranslation: boolean;
}) {
  const { verse, tajweedColors, showTranslation } = props;
  const words = verse.words ?? [];
  const translationHtml = verse.translations?.[0]?.text ?? "";

  return (
    <div className="py-8 px-5 sm:px-8 border-b border-gray-100 last:border-0 group">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-none items-start mt-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-sm font-semibold text-emerald-400">
            {verse.verse_number}
          </div>
        </div>
        <div className="flex-1 text-center sm:text-right">
          <div className="inline-flex flex-wrap justify-center items-center gap-[0.25rem]">
            {words.map((w: MushafWord) => {
              const isEnd = w.char_type_name === "end";

              if (isEnd) {
                const marker = w.text_qpc_hafs ?? w.text_uthmani ?? "";
                // If the marker contains Arabic letters, it's not a valid ayah number.
                if (/[A-Za-z\u0621-\u064A]/.test(marker)) return null;

                return (
                  <span
                    key={w.id}
                    className="qcf-end-vbv"
                    style={{ fontFamily: "UthmanicHafs, serif" }}
                  >
                    {marker}
                  </span>
                );
              }

              const tajweedHtml = w.text_uthmani_tajweed ? refineTajweed(w.text_uthmani_tajweed) : "";
              const fam = `qcf-p${w.page_number}-${tajweedColors ? "v4" : "v2"}`;
              const code = w.code_v2 ?? "";

              if (tajweedColors && tajweedHtml) {
                return (
                  <span
                    key={w.id}
                    className="tajweed text-gray-900"
                    style={{ fontFamily: 'UthmanicHafs, serif', fontSize: 'clamp(26px, 3.0vw, 42px)' }}
                    lang="ar"
                    dangerouslySetInnerHTML={{ __html: tajweedHtml }}
                  />
                );
              }

              const isStandardArabicEntity = code.startsWith("&#") && (() => {
                const num = parseInt(code.replace(/[^0-9]/g, ""), 10);
                return num >= 1536 && num <= 1791; // 0x0600 - 0x06FF
              })();

              if (!code || /[A-Za-z\u0621-\u064A]/.test(code) || /^[a-zA-Z0-9\s]+$/.test(code) || isStandardArabicEntity) return null;

              return (
                <span
                  key={w.id}
                  className="qcf-word"
                  style={
                    tajweedColors
                      ? ({ fontFamily: `${fam}, serif`, fontPalette: "--qcf-tajweed", fontSize: "clamp(26px, 3.0vw, 42px)" } as any)
                      : ({ fontFamily: `${fam}, serif`, fontSize: "clamp(26px, 3.0vw, 42px)" } as any)
                  }
                  dangerouslySetInnerHTML={{ __html: code }}
                />
              );
            })}
          </div>
        </div>

        <span className="shrink-0 self-end sm:self-start rounded-full border border-gray-100 bg-gray-50/50 px-2.5 py-1 text-xs font-medium text-gray-400 hidden sm:block">
          {verse.verse_key}
        </span>
      </div>

      {showTranslation && translationHtml ? (
        <div
          dir="ltr"
          className="mt-6 text-lg leading-relaxed text-zinc-600 text-left border-t border-gray-50 pt-5"
          dangerouslySetInnerHTML={{ __html: translationHtml }}
        />
      ) : null}
    </div>
  );
}
