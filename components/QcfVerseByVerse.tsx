"use client";

import React from 'react';
import type { ChapterVerseWithWords, MushafWord } from '@/lib/quranCom';
import { refineTajweed } from '@/lib/tajweed';

export function QcfVerseByVerse({
  verses,
  showTranslation,
}: {
  verses: ChapterVerseWithWords[];
  showTranslation: boolean;
  tajweedColors?: boolean; // kept optionally to allow parent to pass it without breaking
}) {
  return (
    <div dir="rtl" lang="ar" className="qcf-page space-y-4">
      {verses.map((v) => (
        <QcfVerse
          key={v.id}
          verse={v}
          showTranslation={showTranslation}
        />
      ))}
    </div>
  );
}

function QcfVerse(props: {
  verse: ChapterVerseWithWords;
  showTranslation: boolean;
}) {
  const { verse, showTranslation } = props;
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
                if (/[A-Za-z\u0621-\u064A]/.test(marker)) return null;

                return (
                  <span
                    key={w.id}
                    className="qcf-end-vbv text-emerald-600/60 font-semibold"
                    style={{ fontFamily: "UthmanicHafs, serif", fontSize: "0.85em", padding: "0 0.5ch" }}
                  >
                    {marker}
                  </span>
                );
              }

              const tajweedHtml = w.text_uthmani_tajweed ? refineTajweed(w.text_uthmani_tajweed) : "";

              if (tajweedHtml) {
                return (
                  <span
                    key={w.id}
                    className="tajweed !text-black flex-none"
                    style={{ 
                        fontFamily: 'UthmanicHafs, serif', 
                        fontSize: 'var(--quran-font-size, 2rem)', 
                        lineHeight: '2.0' 
                    }}
                    lang="ar"
                    dangerouslySetInnerHTML={{ __html: tajweedHtml }}
                  />
                );
              }

              return null;
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
          className="mt-6 text-lg leading-relaxed text-gray-600 text-left border-t border-gray-50 pt-5"
          dangerouslySetInnerHTML={{ __html: translationHtml }}
        />
      ) : null}
    </div>
  );
}
