import { fetchChapters, fetchVersesByChapterWithWords } from '@/lib/quranCom'
import { notFound } from 'next/navigation'
import { SurahDetailHeader } from '@/components/SurahDetailHeader'
import { SurahViewSelector } from '@/components/SurahViewSelector'
import { Bismillah } from '@/components/Bismillah'

export default async function SurahReadingPage({
  params,
}: {
  params: Promise<{ chapterNumber: string }>
}) {
  const { chapterNumber } = await params
  const chapter = Number.parseInt(chapterNumber, 10)
  if (!Number.isFinite(chapter) || chapter < 1 || chapter > 114) notFound()

  const chapters = await fetchChapters()
  const ch = chapters.find((c) => c.id === chapter)
  if (!ch) notFound()

  const verses = await fetchVersesByChapterWithWords({ chapterNumber: chapter })

  return (
    <main className="min-h-screen flex justify-center px-4 py-8 sm:px-6 sm:py-16 pb-32">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <SurahDetailHeader chapter={ch} />

        <SurahViewSelector chapter={ch} verses={verses} />
      </div>
    </main>
  )
}

