"use client";

import Link from "next/link";
import { QuranChapter } from "@/lib/quranCom";

export function QuranChaptersBrowser({ chapters }: { chapters: QuranChapter[] }) {

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-100 italic tracking-tight">
            Surah Index
          </h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((c) => (
          <Link
            key={c.id}
            href={`/quran/surah/${c.id}`}
            className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
          >
            <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-md bg-white/[0.04] text-xs font-medium text-gray-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
              {c.id}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-100 truncate group-hover:text-emerald-400 transition-colors">
                {c.id === 3 ? "Al-'Imran" : c.name_simple}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {c.translated_name?.name ?? ""}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-2xl text-gray-100 group-hover:text-emerald-400 transition-colors" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                {c.name_arabic}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
                {c.verses_count} Ayahs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
