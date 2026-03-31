"use client"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const reflections = [
  {
    text: "And He is with you wherever you are.",
    source: "Qur'an 57:4",
  },
  {
    text: "Truly, in the remembrance of Allah do hearts find rest.",
    source: "Qur'an 13:28",
  },
  {
    text: "So verily, with every hardship, there is ease.",
    source: "Qur'an 94:5",
  },
]

export default function ReflectionCard() {
  // Use a fixed one for SSR consistency, or randomize in useEffect
  const reflection = reflections[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="max-w-2xl mx-auto text-center px-4 py-8"
    >
      <div className="flex justify-center mb-4">
        <Quote className="text-sky-400/40 w-8 h-8" />
      </div>
      <blockquote className="space-y-4">
        <p className="text-xl md:text-2xl font-serif italic text-gray-100 leading-relaxed">
          &ldquo;{reflection.text}&rdquo;
        </p>
        <footer className="text-sm font-sans tracking-widest uppercase text-sky-400/60">
          &mdash; {reflection.source}
        </footer>
      </blockquote>
    </motion.div>
  )
}
