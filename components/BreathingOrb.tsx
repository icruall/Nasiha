"use client"
import { motion } from "framer-motion"

export default function BreathingOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[320px] h-[320px] md:w-[540px] md:h-[540px] bg-gradient-to-tr from-emerald-500/15 via-emerald-600/10 to-amber-500/10 rounded-full blur-[100px] md:blur-[140px]"
      />
    </div>
  )
}
