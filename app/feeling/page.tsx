import { sanityClient } from '@/lib/sanity'
import { emotionsQuery } from '@/lib/queries'
import EmotionCarousel from '@/components/EmotionCarousel'

export default async function FeelingPage() {
  const emotions = await sanityClient.fetch(emotionsQuery)

  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-6xl space-y-10">
        <section className="space-y-4">
          <h2 className="text-sm uppercase tracking-wide text-gray-200">
            Choose how you&apos;re feeling
          </h2>
          <EmotionCarousel emotions={emotions} />
        </section>
      </div>
    </main>
  )
}

