"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchChapters, QuranChapter } from "@/lib/quranCom";

export type TabType = "surah" | "verse";

type QuranContextType = {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedChapterId: number | null;
  setSelectedChapterId: (id: number | null) => void;
  chapters: QuranChapter[];
  isLoadingData: boolean;
  fontSize: number;
  setFontSize: (size: number) => void;
};

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export function QuranProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("surah");
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [chapters, setChapters] = useState<QuranChapter[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [fontSize, setFontSize] = useState(32); // Default Arabic font size
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Initialize from localStorage with bounds check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSize = localStorage.getItem("quran-font-size");
      if (savedSize) {
        const parsed = parseInt(savedSize, 10);
        if (parsed >= 20 && parsed <= 60) {
          setFontSize(parsed);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quran-font-size", fontSize.toString());
    // Also set it as a CSS variable on the root for easy access
    document.documentElement.style.setProperty('--quran-font-size', `${fontSize}px`);
  }, [fontSize]);

  // Automatically close sidebar when navigation occurs
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Fetch static data once
  useEffect(() => {
    async function loadData() {
      setIsLoadingData(true);
      try {
        const chaptersData = await fetchChapters();
        setChapters(chaptersData);
      } catch (error) {
        console.error("Failed to load Quran data:", error);
      } finally {
        setIsLoadingData(false);
      }
    }
    loadData();
  }, []);

  return (
    <QuranContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        activeTab,
        setActiveTab,
        selectedChapterId,
        setSelectedChapterId,
        chapters,
        isLoadingData,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
}

export function useQuran() {
  const context = useContext(QuranContext);
  if (context === undefined) {
    throw new Error("useQuran must be used within a QuranProvider");
  }
  return context;
}
