import { fetchChapters } from '@/lib/quranCom'
import { QuranChaptersBrowser } from '@/components/QuranChaptersBrowser'

export default async function QuranPage() {
  const chapters = await fetchChapters()

  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-6xl space-y-10">
        <QuranChaptersBrowser chapters={chapters} />
      </div>
    </main>
  )
}

