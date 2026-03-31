"use client"
import { motion } from "framer-motion"

export default function BreathingOrb() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sky-500/20 rounded-full blur-[80px] md:blur-[120px]"
      />
    </div>
  )
}
