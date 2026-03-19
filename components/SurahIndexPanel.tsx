"use client";

import { useQuran, TabType } from "@/lib/quranContext";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import type { QuranChapter } from "@/lib/quranCom";

export default function SurahIndexPanel() {
  const { 
    isSidebarOpen, 
    setSidebarOpen, 
    activeTab, 
    setActiveTab, 
    chapters, 
    isLoadingData,
    selectedChapterId,
    setSelectedChapterId
  } = useQuran();
  
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Filter logic based on active tab
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    if (activeTab === "surah") {
      if (!q) return chapters;
      return chapters.filter((c: QuranChapter) => 
        String(c.id).includes(q) || 
        c.name_simple.toLowerCase().includes(q) || 
        c.name_arabic.includes(q)
      );
    }
    
    if (activeTab === "verse") {
      if (!selectedChapterId) {
        if (!q) return chapters;
        return chapters.filter((c: QuranChapter) => 
          String(c.id).includes(q) || 
          c.name_simple.toLowerCase().includes(q)
        );
      }
      const chapter = chapters.find((c: QuranChapter) => c.id === selectedChapterId);
      if (!chapter) return [];
      const verses = Array.from({ length: chapter.verses_count || 0 }, (_, i) => i + 1);
      if (!q) return verses;
      return verses.filter(v => String(v).includes(q));
    }
    
    return [];
  }, [activeTab, chapters, query, selectedChapterId]);

  // Handle item click
  const handleItemClick = (type: string, id: number) => {
    if (type === "verse_chapter") {
      setSelectedChapterId(id);
      setQuery("");
    } else {
      setSidebarOpen(false);
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSidebarOpen]);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "surah", label: "Surah" },
    { id: "verse", label: "Verse" },
  ];

  const searchPlaceholder = useMemo(() => {
    switch (activeTab) {
      case "surah": return "Search Surah";
      case "verse": return selectedChapterId ? "Search Verse" : "Search Surah";
      default: return "Search...";
    }
  }, [activeTab, selectedChapterId]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-sm border-l border-white/10 bg-[#121820]/95 backdrop-blur-md shadow-2xl transition-transform duration-500 ease-out sm:w-[380px] ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Tabs Header */}
          <div className="p-6 pb-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSelectedChapterId(null);
                      setQuery("");
                    }}
                    className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-lg scale-105"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mb-6 px-1">
              <p className="text-[10px] text-gray-500 italic">
                Tip: try navigating with <span className="inline-flex items-center justify-center border border-white/10 rounded px-1.5 py-0.5 bg-white/[0.03] not-italic ml-1">ctrl K</span>
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-4 pr-10 py-3 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 transition-all"
              />
              {activeTab === "verse" && selectedChapterId && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400/50 uppercase tracking-tighter">Verse</span>
                  <button 
                    onClick={() => setSelectedChapterId(null)}
                    className="p-1 rounded-md bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto px-4 pb-8 custom-scrollbar">
            {isLoadingData ? (
              <div className="flex flex-col items-center justify-center pt-12 gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
                <p className="text-[10px] tracking-widest text-gray-500 uppercase">Searching...</p>
              </div>
            ) : (
              <div className="space-y-1">
                {activeTab === "surah" && (filteredItems as QuranChapter[]).map((c) => (
                  <Link
                    key={c.id}
                    href={`/quran/surah/${c.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all hover:bg-emerald-500/[0.03] border border-transparent hover:border-emerald-500/10"
                  >
                    <span className="text-sm font-bold text-gray-500 group-hover:text-emerald-400/70">{c.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">
                        Surah {c.id === 3 ? "Al-'Imran" : c.name_simple}
                      </p>
                    </div>
                    <span 
                      className="text-xl text-gray-400 group-hover:text-emerald-400 transition-colors"
                      style={{ fontFamily: 'UthmanicHafs, serif' }}
                    >
                      سورة {c.name_arabic}
                    </span>
                  </Link>
                ))}

                {activeTab === "verse" && !selectedChapterId && (filteredItems as QuranChapter[]).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleItemClick("verse_chapter", c.id)}
                    className="group w-full flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all hover:bg-emerald-500/[0.03] border border-transparent hover:border-emerald-500/10 text-left"
                  >
                    <span className="text-sm font-bold text-gray-500 group-hover:text-emerald-400/70">{c.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">
                        Surah {c.id === 3 ? "Al-'Imran" : c.name_simple}
                      </p>
                    </div>
                    <span 
                      className="text-xl text-gray-400 group-hover:text-emerald-400 transition-colors"
                      style={{ fontFamily: 'UthmanicHafs, serif' }}
                    >
                      سورة {c.name_arabic}
                    </span>
                  </button>
                ))}

                {activeTab === "verse" && selectedChapterId && (filteredItems as number[]).map((v) => (
                  <Link
                    key={v}
                    href={`/quran/surah/${selectedChapterId}#ayah-${v}`}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all hover:bg-emerald-500/[0.03] border border-transparent hover:border-emerald-500/10"
                  >
                    <span className="text-sm font-bold text-gray-500 group-hover:text-emerald-400/70">{v}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-100 group-hover:text-emerald-400 transition-colors">
                        Verse {v}
                      </p>
                    </div>
                  </Link>
                ))}

                {filteredItems.length === 0 && !isLoadingData && (
                  <div className="px-6 py-12 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">No results found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
