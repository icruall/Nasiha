"use client"

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import DailyAyahCard from '@/components/DailyAyahCard'
import BreathingOrb from '@/components/BreathingOrb'

const categories = [
  {
    title: "Emotions",
    description: "Reflections, Qur'an and du'a'.",
    href: "/feeling",
    color: "sky",
  },
  {
    title: "Qur'an",
    description: "For reflection, comfort, and remembrance.",
    href: "/quran",
    color: "emerald",
  },
  {
    title: "Hisn-ul-Muslim (Fortress of Muslim)",
    description: "Authentic Adhkar and Supplications from the Sunnah.",
    href: "/hisn-ul-muslim",
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
    <main className="min-h-[calc(100vh-80px)] relative flex flex-col items-center px-4 py-12 md:py-24 overflow-hidden">
      {/* Background Effect */}
      <BreathingOrb />

      <div className="w-full max-w-4xl z-10 space-y-16 mt-8">
        {/* Daily Ayah Focus (Replaces Hero) */}
        <DailyAyahCard />

        {/* Categories List */}
        <section className="px-2 w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-6 ml-2 font-medium">
              DIVE IN AND EXPLORE
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {categories.map((cat) => {
              const colorMap = {
                sky: "border-[rgba(56,189,248,0.3)] hover:border-sky-400/80 bg-white/[0.02] hover:bg-white/[0.04]",
                emerald: "border-[rgba(52,211,153,0.3)] hover:border-emerald-400/80 bg-white/[0.02] hover:bg-white/[0.04]",
                orange: "border-[rgba(251,146,60,0.3)] hover:border-orange-400/80 bg-white/[0.02] hover:bg-white/[0.04]",
              }[cat.color as "sky" | "emerald" | "orange"];

              return (
                <motion.div key={cat.title} variants={item}>
                  <Link
                    href={cat.href}
                    className="group relative block w-full"
                  >
                    <div className={`
                      w-full p-6 md:p-8 rounded-2xl md:rounded-3xl
                      transition-all duration-300
                      border ${colorMap}
                      flex flex-col items-start justify-center
                    `}>
                      <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-white/90 transition-colors mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 font-sans tracking-wide">
                        {cat.description}
                      </p>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10vw] font-serif text-white pointer-events-none select-none hidden md:block"
      >
        Reflection
      </motion.div>
    </main>
  )
}
