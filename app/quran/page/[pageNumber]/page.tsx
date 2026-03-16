import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchChapters, fetchMushafPageWords } from '@/lib/quranCom'
import { QcfMushafLines } from '@/components/QcfMushafLines'
import { Bismillah } from '@/components/Bismillah'
import { SurahHeader } from '@/components/SurahHeader'

const MAX_MADANI_PAGES = 604

function clampMushafPage(page: number) {
  if (Number.isNaN(page) || page < 1 || page > MAX_MADANI_PAGES) return null
  return page
}

function getChapterNumberFromVerseKey(verseKey: string) {
  const chapter = Number.parseInt(verseKey.split(':')[0] ?? '', 10)
  return Number.isFinite(chapter) ? chapter : null
}

export default async function QuranMushafPage({
  params,
  searchParams,
}: {
  params: Promise<{ pageNumber: string }>
  searchParams?: Promise<{ tajweed?: string }>
}) {
  const { pageNumber } = await params
  const sp = (await searchParams) ?? {}
  const page = pageNumber ?? '1'
  const pageNum = clampMushafPage(Number.parseInt(page, 10))
  if (!pageNum) notFound()

  const tajweedColors = sp?.tajweed !== "off"

  const [pageVerses, chapters] = await Promise.all([
    fetchMushafPageWords({ pageNumber: pageNum }),
    fetchChapters(),
  ])

  const chapterById = new Map(chapters.map((c) => [c.id, c]))

  const prevPage = pageNum > 1 ? pageNum - 1 : null
  const nextPage = pageNum < MAX_MADANI_PAGES ? pageNum + 1 : null

  let lastChapter: number | null = null

  return (
    <main className="min-h-screen flex justify-center px-6 py-16">
      <div className="w-full max-w-3xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-wide text-gray-200">
              Qur&apos;an
            </h2>
            <p className="text-xs text-gray-400">
              Page {pageNum} / {MAX_MADANI_PAGES}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href={
                prevPage
                  ? `/quran/page/${prevPage}`
                  : `/quran/page/1`
              }
              aria-disabled={!prevPage}
              className={[
                'rounded-xl border px-3 py-2 text-sm',
                'bg-white/[0.02] border-white/10 text-gray-200',
                prevPage
                  ? 'hover:border-white/20 hover:bg-white/[0.04]'
                  : 'opacity-50 pointer-events-none',
              ].join(' ')}
            >
              Prev
            </Link>
            <Link
              href={
                nextPage
                  ? `/quran/page/${nextPage}`
                  : `/quran/page/${MAX_MADANI_PAGES}`
              }
              aria-disabled={!nextPage}
              className={[
                'rounded-xl border px-3 py-2 text-sm',
                'bg-white/[0.02] border-white/10 text-gray-200',
                nextPage
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
            pageNumber={pageNum}
            verses={pageVerses}
            tajweedColors={tajweedColors}
            chapters={chapters}
          />
        </div>
      </div>
    </main>
  )
}
