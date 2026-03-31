"use client"

import { useQuran } from '@/lib/quranContext'
import { motion } from 'framer-motion'
import { Type } from 'lucide-react'

export default function FontSizeSlider() {
  const { fontSize, setFontSize } = useQuran()

  const min = 20
  const max = 70

  return (
    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-md">
      <div className="flex items-center gap-2 text-sky-200/50">
        <Type size={14} />
        <span className="text-[10px] font-bold tracking-widest uppercase">Font Size</span>
      </div>
      
      <div className="relative flex items-center w-32 md:w-48 group">
        <input
          type="range"
          min={min}
          max={max}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="
            w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer
            accent-emerald-500 hover:accent-emerald-400
            transition-all duration-300
          "
        />
        {/* Subtle Glow beneath the thumb */}
        <div 
          className="absolute h-1.5 bg-emerald-500/20 rounded-lg pointer-events-none transition-all duration-300"
          style={{ width: `${((fontSize - min) / (max - min)) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">
        {fontSize}
      </div>
    </div>
  )
}
