import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { fetchChapters, fetchMushafPageWords } from '@/lib/quranCom'
import { QcfMushafLines } from '@/components/QcfMushafLines'
import { Bismillah } from '@/components/Bismillah'
import { SurahHeader } from '@/components/SurahHeader'

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
  searchParams,
}: {
  params: Promise<{ chapterNumber: string; pageNumber: string }>
  searchParams?: Promise<{ tajweed?: string }>
}) {
  const { chapterNumber, pageNumber } = await params
  const sp = (await searchParams) ?? {}

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
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Surah {String(ch.id).padStart(3, '0')}
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-50">
              {ch.name_simple}
              {ch.translated_name?.name ? ` — ${ch.translated_name.name}` : ''}
            </h1>
            <div className="font-[var(--font-amiri)] text-4xl leading-[1.2] text-gray-50">
              {ch.name_arabic}
            </div>
            <p className="text-xs text-gray-400">
              Mushaf page {page} (range {startPage}–{endPage})
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/quran"
              className="rounded-xl border px-3 py-2 text-sm bg-white/[0.02] border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
            >
              Surah list
            </Link>
            <Link
              href={`/quran/surah/${chapter}/verse-by-verse`}
              className="rounded-xl border px-3 py-2 text-sm bg-white/[0.02] border-white/10 text-gray-200 hover:border-white/20 hover:bg-white/[0.04]"
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
                  ? `/quran/surah/${chapter}/page/${next}`
                  : `/quran/surah/${chapter}/page/${endPage}`
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
