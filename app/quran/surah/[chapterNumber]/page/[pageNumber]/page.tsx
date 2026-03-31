import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { fetchChapters, fetchMushafPageWords } from '@/lib/quranCom'
import { QcfMushafLines } from '@/components/QcfMushafLines'

function clampChapter(chapter: number) {
  if (Number.isNaN(chapter) || chapter < 1 || chapter > 114) return null
  return chapter
}

function clampPage(page: number) {
  if (Number.isNaN(page) || page < 1 || page > 604) return null
  return page
}

export default async function SurahMushafPage({
  params,
}: {
  params: Promise<{ chapterNumber: string; pageNumber: string }>
}) {
  const { chapterNumber, pageNumber } = await params

  const chapter = clampChapter(Number.parseInt(chapterNumber, 10))
  const page = clampPage(Number.parseInt(pageNumber, 10))
  if (!chapter || !page) notFound()

  const chapters = await fetchChapters()
  const ch = chapters.find((c) => c.id === chapter)
  if (!ch?.pages) notFound()

  const [startPage, endPage] = ch.pages
  if (page < startPage) redirect(`/quran/surah/${chapter}/page/${startPage}`)
  if (page > endPage) redirect(`/quran/surah/${chapter}/page/${endPage}`)

  const tajweedColors = true

  const pageVerses = await fetchMushafPageWords({ pageNumber: page })

  const prev = page > startPage ? page - 1 : null
  const next = page < endPage ? page + 1 : null

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 sm:px-6 sm:py-20">
      <div className="w-full max-w-4xl space-y-12">
        <header 
          className="flex flex-col gap-6 p-8 sm:p-12 rounded-[3rem] shadow-2xl transition-all duration-500 relative overflow-hidden sm:flex-row sm:items-end sm:justify-between"
          style={{ backgroundColor: '#FFFFEE' }}
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-bold text-gray-500">
              Surah {String(ch.id).padStart(3, '0')}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              {ch.name_simple}
              {ch.translated_name?.name ? <span className="text-gray-400 font-medium"> — {ch.translated_name.name}</span> : ''}
            </h1>
            <div className="font-[var(--font-amiri)] text-5xl leading-tight text-emerald-600">
              {ch.name_arabic}
            </div>
            <p className="text-sm font-semibold text-gray-500">
              Mushaf page {page} <span className="mx-2 opacity-30">|</span> range {startPage}–{endPage}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/quran"
              className="rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-bold bg-white text-gray-700 hover:border-emerald-500/30 hover:bg-emerald-50/50 transition-all duration-300"
            >
              Surah list
            </Link>
            <Link
              href={`/quran/surah/${chapter}/verse-by-verse`}
              className="rounded-2xl border border-gray-200 px-5 py-2.5 text-sm font-bold bg-white text-gray-700 hover:border-emerald-500/30 hover:bg-emerald-50/50 transition-all duration-300"
            >
              Verse by verse
            </Link>
            <Link
              href={
                prev
                  ? `/quran/surah/${chapter}/page/${prev}`
                  : `/quran/surah/${chapter}/page/${startPage}`
              }
              aria-disabled={!prev}
              className={[
                'rounded-2xl border px-5 py-2.5 text-sm font-bold transition-all duration-300',
                prev
                  ? 'bg-white border-gray-200 text-gray-700 hover:border-emerald-500/30 hover:bg-emerald-50/50'
                  : 'bg-gray-50 border-gray-100 text-gray-300 opacity-50 pointer-events-none',
              ].join(' ')}
            >
              Prev
            </Link>
            <Link
              href={
                next
                  ? `/quran/surah/${chapter}/page/${next}`
                  : `/quran/surah/${chapter}/page/${endPage}`
              }
              aria-disabled={!next}
              className={[
                'rounded-2xl border px-5 py-2.5 text-sm font-bold transition-all duration-300',
                next
                  ? 'bg-white border-gray-200 text-gray-700 hover:border-emerald-500/30 hover:bg-emerald-50/50'
                  : 'bg-gray-50 border-gray-100 text-gray-300 opacity-50 pointer-events-none',
              ].join(' ')}
            >
              Next
            </Link>
          </nav>
        </header>

        <div
          className="
            qcf-white-container
            px-4 py-8 md:px-10
          "
        >
          <QcfMushafLines
            pageNumber={page}
            verses={pageVerses}
            tajweedColors={tajweedColors}
            chapters={chapters}
          />
        </div>
      </div>
    </main>
  )
}
