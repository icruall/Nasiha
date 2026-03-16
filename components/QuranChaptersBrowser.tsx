"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import type { QuranChapter, SearchResult } from "@/lib/quranCom";
import { searchQuran } from "@/lib/quranCom";

export function QuranChaptersBrowser({ chapters }: { chapters: QuranChapter[] }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Filter local chapters (existing behavior)
  const filteredChapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter((c) => {
      const haystack = [
        String(c.id),
        c.name_simple,
        c.name_complex ?? "",
        c.name_arabic,
        c.translated_name?.name ?? "",
        c.revelation_place ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [chapters, query]);

  // Global search for verses/translations (new behavior)
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await searchQuran(q);
        // Sort results by Surah and then Verse order
        const sorted = response.search.results.sort((a, b) => {
          const [sA, vA] = a.verse_key.split(':').map(Number);
          const [sB, vB] = b.verse_key.split(':').map(Number);
          if (sA !== sB) return sA - sB;
          return vA - vB;
        });
        setSearchResults(sorted);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-100 italic tracking-tight">
            Surah Index
          </h2>
        </div>

        <div className="flex w-full sm:w-96 items-center gap-2">
          <div className="relative w-full">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Surah, Verse, or Keywords..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-11 py-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 transition-all hover:bg-white/[0.05]"
            />
            {isSearching && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
              </div>
            )}
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:text-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Global Results Section */}
      {searchResults.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
             <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
             <h3 className="text-xs font-bold text-emerald-400/80 uppercase tracking-[0.2em]">Verse Results</h3>
             <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          </div>
          <div className="grid gap-4">
            {searchResults.map((result) => {
              const [chapter, verse] = result.verse_key.split(':');
              const chapterObj = chapters.find(c => c.id === parseInt(chapter));
              return (
                <Link
                  key={result.verse_key}
                  href={`/quran/surah/${chapter}#ayah-${verse}`}
                  className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] overflow-hidden"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">
                      {chapterObj?.name_simple} {result.verse_key}
                    </span>
                  </div>
                  <p 
                    className="text-xl text-right text-gray-100 leading-relaxed group-hover:text-emerald-500 transition-colors search-result-arabic" 
                    style={{ fontFamily: 'UthmanicHafs, serif' }}
                    dangerouslySetInnerHTML={{ __html: result.text }} 
                  />
                  <div className="text-sm text-gray-400 leading-relaxed line-clamp-2 italic"
                     dangerouslySetInnerHTML={{ __html: result.translations[0]?.text || '' }} 
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Chapters Grid */}
      <div className="space-y-6">
        {searchResults.length > 0 && (
          <div className="flex items-center gap-3 pt-6">
             <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
             <h3 className="text-xs font-bold text-emerald-400/80 uppercase tracking-[0.2em]">Chapters</h3>
             <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((c) => (
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
      </div>
    </section>
  );
}
