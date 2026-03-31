"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, Heart, BookOpen, Shield, Home } from 'lucide-react'

const menuItems = [
  { title: "Home", href: "/", icon: Home, color: "sky" },
  { title: "Emotions", href: "/feeling", icon: Heart, color: "sky" },
  { title: "Qur'an", href: "/quran", icon: BookOpen, color: "emerald" },
  { title: "Hisn-ul-Muslim", href: "/hisn-ul-muslim", icon: Shield, color: "orange" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-sky-200/70 hover:text-white transition-colors"
        aria-label="Open Menu"
      >
        <Menu size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#020617]/80 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[60] w-[80%] max-w-sm bg-[#0a0f1d]/90 backdrop-blur-xl border-l border-white/10 shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif text-white italic">Nasiha</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-sky-200/50 hover:text-white transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <nav className="flex-1 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group block"
                  >
                    <div className={`
                      flex items-center gap-4 p-4 rounded-2xl
                      bg-white/[0.03] border border-white/5
                      transition-all duration-300
                      hover:bg-white/[0.06] hover:border-white/10
                    `}>
                      <div className={`p-2 rounded-xl bg-${item.color}-500/10 text-${item.color}-400`}>
                        <item.icon size={24} />
                      </div>
                      <span className="text-lg font-medium text-gray-200 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-white/5">
                <p className="text-xs text-center text-sky-200/30 uppercase tracking-widest leading-relaxed">
                  A calm space for your soul
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
