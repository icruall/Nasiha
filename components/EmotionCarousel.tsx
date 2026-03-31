'use client'

import Link from 'next/link'
import { getEmotionColor } from '@/lib/emotionColors'

type Emotion = {
  _id: string
  slug: string
  title: string
  description: string
}

type EmotionCarouselProps = {
  emotions: Emotion[]
}

export default function EmotionCarousel({ emotions }: EmotionCarouselProps) {
  return (
    <div
      className="
        grid gap-6 pb-4
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
      "
    >
      {emotions.map((emotion) => {
        const color = getEmotionColor(emotion.slug)

        return (
          <Link
            key={emotion._id}
            href={`/emotion/${emotion.slug}`}
            className="group relative block h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] glass-card border border-white/5 bg-white/[0.02]"
          >
            {/* Signature Border Light (Emotions = Sky) */}
            <div className="absolute inset-0 border-2 border-sky-500/20 rounded-3xl pointer-events-none group-hover:border-sky-400/50 transition-colors duration-500" />
            
            <div className="relative p-6 sm:p-8 flex flex-col h-full space-y-4">
              <div 
                className="w-12 h-1.5 rounded-full shadow-[0_0_15px_rgba(var(--sky-glow),0.3)] transition-all duration-500 group-hover:w-20"
                style={{ backgroundColor: color }}
              />

              <div className="space-y-2">
                <h3 className="text-2xl font-serif text-white group-hover:text-sky-300 transition-colors">
                  {emotion.title}
                </h3>

                <p className="text-sm text-sky-100/40 leading-relaxed font-sans line-clamp-3 group-hover:text-sky-100/60 transition-colors">
                  {emotion.description}
                </p>
              </div>

              <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] text-sky-400 font-sans tracking-widest uppercase font-bold">
                  Explore Guidance
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

