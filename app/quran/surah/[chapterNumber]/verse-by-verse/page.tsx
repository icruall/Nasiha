import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  fetchChapters,
  fetchVersesByChapterWithWords,
} from '@/lib/quranCom'
import { QuranTajweedLegendToggle } from '@/components/QuranTajweedLegendToggle'
import { QcfVerseByVerse } from '@/components/QcfVerseByVerse'
import { Bismillah } from '@/components/Bismillah'
import { SurahHeader } from '@/components/SurahHeader'

function clampChapter(chapter: number) {
  if (Number.isNaN(chapter) || chapter < 1 || chapter > 114) return null
  return chapter
}

export default async function SurahVerseByVersePage({
  params,
  searchParams,
}: {
  params: Promise<{ chapterNumber: string }>
  searchParams?: Promise<{ translation?: string; showTranslation?: string; tajweed?: string }>
}) {
  const { chapterNumber } = await params
  const sp = (await searchParams) ?? {}

  const chapter = clampChapter(Number.parseInt(chapterNumber, 10))
  if (!chapter) notFound()

  const translationId = Number.parseInt(sp.translation ?? '85', 10)
  const showTranslation = (sp.showTranslation ?? '1') !== '0'
  const tajweedColors = true

  const [chapters, verses] = await Promise.all([
    fetchChapters(),
    fetchVersesByChapterWithWords({
      chapterNumber: chapter,
      translationIds: Number.isFinite(translationId) ? [translationId] : [85],
    }),
  ])

  const chapterInfo = chapters.find((c) => c.id === chapter)

  const prev = chapter > 1 ? chapter - 1 : null
  const next = chapter < 114 ? chapter + 1 : null

  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-6">
        <header className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Surah {String(chapter).padStart(3, '0')} — verse by verse
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-50">
                {chapterInfo?.name_simple ?? `Surah ${chapter}`}
                {chapterInfo?.translated_name?.name
                  ? ` — ${chapterInfo.translated_name.name}`
                  : ''}
              </h1>
              {chapterInfo?.name_arabic ? (
                <div className="font-[var(--font-amiri)] text-4xl leading-[1.2] text-gray-50">
                  {chapterInfo.name_arabic}
                </div>
              ) : null}
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <Link
                href="/quran"
                className="rounded-xl border px-3 py-2 text-sm bg-white/[0.02] border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
              >
                Surah list
              </Link>
              <Link
                href={`/quran/surah/${chapter}`}
                className="rounded-xl border px-3 py-2 text-sm bg-white/[0.02] border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
              >
                Mushaf view
              </Link>
            </nav>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <Link
                href={
                  prev
                    ? `/quran/surah/${prev}/verse-by-verse?translation=${translationId}&showTranslation=${showTranslation ? 1 : 0}`
                    : `/quran/surah/1/verse-by-verse?translation=${translationId}&showTranslation=${showTranslation ? 1 : 0}`
                }
                aria-disabled={!prev}
                className={[
                  'rounded-xl border px-3 py-2 text-sm',
                  'bg-white/[0.02] border-white/10 text-gray-200',
                  prev
                    ? 'hover:border-white/20 hover:bg-white/[0.04]'
                    : 'opacity-50 pointer-events-none',
                ].join(' ')}
              >
                Prev
              </Link>
              <Link
                href={
                  next
                    ? `/quran/surah/${next}/verse-by-verse?translation=${translationId}&showTranslation=${showTranslation ? 1 : 0}`
                    : `/quran/surah/114/verse-by-verse?translation=${translationId}&showTranslation=${showTranslation ? 1 : 0}`
                }
                aria-disabled={!next}
                className={[
                  'rounded-xl border px-3 py-2 text-sm',
                  'bg-white/[0.02] border-white/10 text-gray-200',
                  next
                    ? 'hover:border-white/20 hover:bg-white/[0.04]'
                    : 'opacity-50 pointer-events-none',
                ].join(' ')}
              >
                Next
              </Link>
            </div>

            <Link
              href={`/quran/surah/${chapter}/verse-by-verse?translation=${translationId}&showTranslation=${showTranslation ? 0 : 1}`}
              className="rounded-xl border px-3 py-2 text-sm bg-white/[0.02] border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {showTranslation ? 'Hide' : 'Show'} translation
            </Link>
          </div>
        </header>

        <div className="qcf-white-container p-1 overflow-hidden">
          <div className="pt-8 mb-4 w-full text-center">
            {chapterInfo && <SurahHeader chapter={chapterInfo} />}
            {chapter !== 1 && chapter !== 9 && (
              <div className="mt-2">
                <Bismillah />
              </div>
            )}
          </div>
          <QcfVerseByVerse
            verses={verses}
            tajweedColors={tajweedColors}
            showTranslation={showTranslation}
          />

          <div className="mt-6 border-t border-gray-100 pt-4 px-4 pb-6 md:px-8">
            <QuranTajweedLegendToggle />
          </div>
        </div>
      </div>
    </main>
  )
}
