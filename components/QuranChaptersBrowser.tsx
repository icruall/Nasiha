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
            className="group relative flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] active:scale-[0.98] glass-card overflow-hidden"
          >
            {/* Signature Border Light */}
            <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-3xl pointer-events-none group-hover:border-emerald-400/50 transition-colors duration-500" />
            
            <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-sm font-semibold text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-500">
              {c.id}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-lg font-serif text-white truncate group-hover:text-emerald-300 transition-colors">
                {c.id === 3 ? "Al-'Imran" : c.name_simple}
              </p>
              <p className="text-xs text-emerald-100/40 truncate mt-0.5 tracking-wide uppercase font-sans">
                {c.translated_name?.name ?? ""}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-2xl text-white/90 group-hover:text-emerald-300 transition-colors" style={{ fontFamily: 'UthmanicHafs, serif' }}>
                {c.name_arabic}
              </p>
              <p className="text-[10px] text-emerald-100/30 mt-1 uppercase tracking-widest font-semibold">
                {c.verses_count} Ayahs
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
