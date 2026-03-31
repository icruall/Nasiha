"use client";

import React, { useState } from "react";
import { useQuran } from "@/lib/quranContext";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Minus, Plus, Settings2 } from "lucide-react";

export function FontSizeControls() {
  const { fontSize, setFontSize } = useQuran();
  const [isOpen, setIsOpen] = useState(false);

  const adjustSize = (delta: number) => {
    setFontSize(Math.min(60, Math.max(20, fontSize + delta)));
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card p-4 rounded-2xl flex flex-col gap-4 min-w-[200px]"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400/70">
                Font Size
              </span>
              <span className="text-sm font-mono text-sky-200 bg-sky-500/10 px-2 py-0.5 rounded-md">
                {fontSize}px
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustSize(-2)}
                disabled={fontSize <= 20}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-sky-200 transition-colors disabled:opacity-30"
                aria-label="Decrease font size"
              >
                <Minus size={18} />
              </button>
              
              <input
                type="range"
                min="20"
                max="60"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="flex-1 accent-sky-500 h-1.5 rounded-lg bg-white/10 appearance-none cursor-pointer"
              />

              <button
                onClick={() => adjustSize(2)}
                disabled={fontSize >= 60}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-sky-200 transition-colors disabled:opacity-30"
                aria-label="Increase font size"
              >
                <Plus size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-2xl transition-all duration-300 shadow-xl flex items-center gap-2 group ${
          isOpen 
            ? "bg-sky-500 text-white scale-95" 
            : "glass-card text-sky-400 hover:scale-105 hover:border-sky-500/30"
        }`}
      >
        {isOpen ? <Plus className="rotate-45" size={24} /> : <Type size={24} />}
        {!isOpen && (
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium">
                Font Settings
            </span>
        )}
      </button>
    </div>
  );
}
