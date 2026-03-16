import { sanityClient } from '@/lib/sanity'
import { emotionsQuery } from '@/lib/queries'

export default async function sitemap() {
  const emotions = await sanityClient.fetch(emotionsQuery)

  const emotionRoutes = emotions.map((emotion: any) => ({
    url: `https://nasiha.app/emotion/${emotion.slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: 'https://nasiha.app',
      lastModified: new Date(),
    },
    ...emotionRoutes,
  ]
}