import { sanityClient } from '@/lib/sanity'
import { emotionsQuery } from '@/lib/queries'

interface Emotion {
  slug: string
}

export default async function sitemap() {
  const emotions = await sanityClient.fetch(emotionsQuery)

  const emotionRoutes = emotions.map((emotion: Emotion) => ({
    url: `https://nasiha.app/emotion/${emotion.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: 'https://nasiha.app',
      lastModified: new Date(),
    },
    {
      url: 'https://nasiha.app/quran',
      lastModified: new Date(),
    },
    {
      url: 'https://nasiha.app/hisn-ul-muslim',
      lastModified: new Date(),
    },
    ...emotionRoutes,
  ]
}