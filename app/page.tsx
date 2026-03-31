"use client"

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Heart, BookOpen, Shield, ChevronRight } from 'lucide-react'
import DailyAyahCard from '@/components/DailyAyahCard'
import BreathingOrb from '@/components/BreathingOrb'

const categories = [
  {
    title: "Emotions",
    description: "Find peace and guidance through your current feelings.",
    href: "/feeling",
    icon: Heart,
    color: "sky",
  },
  {
    title: "Qur'an",
    description: "Explore the word of Allah for comfort and remembrance.",
    href: "/quran",
    icon: BookOpen,
    color: "emerald",
  },
  {
    title: "Hisn-ul-Muslim",
    description: "Authentic Adhkar and supplications from the Sunnah.",
    href: "/hisn-ul-muslim",
    icon: Shield,
    color: "orange",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
    } 
  },
}

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] relative flex flex-col items-center justify-center px-4 py-12 md:py-24 overflow-hidden">
      {/* Background Effect */}
      <BreathingOrb />

      <div className="w-full max-w-6xl z-10 space-y-16 md:space-y-24">
        {/* Daily Ayah Focus (Replaces Hero) */}
        <DailyAyahCard />

        {/* Categories Grid */}
        <section className="px-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {categories.map((cat) => {
              // Explicitly map colors to ensure Tailwind's JIT picks them up correctly
              const colorMap = {
                sky: "border-sky-400/50 hover:border-sky-300 text-sky-400 shadow-sky-500/20",
                emerald: "border-emerald-400/50 hover:border-emerald-300 text-emerald-400 shadow-emerald-500/20",
                orange: "border-orange-400/50 hover:border-orange-300 text-orange-400 shadow-orange-500/20",
              }[cat.color as "sky" | "emerald" | "orange"];

              return (
                <motion.div key={cat.title} variants={item}>
                  <Link
                    href={cat.href}
                    className="group relative block h-full"
                  >
                      <div className={`
                        h-full p-8 rounded-[2rem] glass-card
                        transition-all duration-500 hover:-translate-y-2
                        active:scale-[0.98]
                        flex flex-col items-center text-center space-y-6
                        border-2 ${colorMap}
                        shadow-[inset_0_0_20px_rgba(0,0,0,0.15)]
                      `}>
                        <div className={`
                          p-4 rounded-2xl bg-white/5 
                          ${cat.color === 'sky' ? 'text-sky-400' : cat.color === 'emerald' ? 'text-emerald-400' : 'text-orange-400'}
                          group-hover:scale-110 
                          transition-transform duration-500
                        `}>
                          <cat.icon size={32} strokeWidth={1.5} />
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-2xl font-serif text-white group-hover:text-white/90 transition-colors">
                            {cat.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed font-sans">
                            {cat.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-auto">
                          <span className={`
                            inline-flex items-center text-xs font-semibold 
                            tracking-widest uppercase
                            ${cat.color === 'sky' ? 'text-sky-400/60' : cat.color === 'emerald' ? 'text-emerald-400/60' : 'text-orange-400/60'}
                            group-hover:text-white
                            transition-colors duration-300
                          `}>
                            Explore <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>

      {/* Decorative footer element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10vw] font-serif text-white pointer-events-none select-none"
      >
        Reflection
      </motion.div>
    </main>
  )
}
