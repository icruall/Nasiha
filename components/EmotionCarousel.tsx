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
            className="
              rounded-2xl border border-white/10
              px-5 py-5
              transition-transform duration-200
              hover:-translate-y-0.5
              focus:outline-none
            "
            style={{
              background: `
                radial-gradient(
                  120% 120% at 2% 0%,
                  ${color}12 0%,
                  transparent 60%
                ),
                rgba(255,255,255,0.02)
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `
                radial-gradient(
                  120% 120% at 4% 6%,
                  ${color}20 0%,
                  transparent 62%
                ),
                rgba(255,255,255,0.035)
              `
              e.currentTarget.style.filter = 'brightness(1.06) saturate(1.12)'
              e.currentTarget.style.boxShadow = `0 0 0 1px ${color} inset`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `
                radial-gradient(
                  120% 120% at 2% 0%,
                  ${color}12 0%,
                  transparent 60%
                ),
                rgba(255,255,255,0.02)
              `
              e.currentTarget.style.filter = 'brightness(1) saturate(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${color}`
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div
              className="mb-4 h-1 w-12 rounded-full"
              style={{ backgroundColor: color }}
            />

            <h3 className="text-xl font-semibold text-gray-50">
              {emotion.title}
            </h3>

            <p className="mt-2 text-sm text-gray-100 leading-relaxed">
              {emotion.description}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

