export type QuranChapter = {
  id: number
  name_simple: string
  name_complex?: string
  name_arabic: string
  revelation_place?: string
  verses_count?: number
  pages?: [number, number]
  translated_name?: { name: string; language_name?: string }
}

export type TajweedVerse = {
  id: number
  verse_key: string
  verse_number?: number
  text_uthmani_tajweed: string
}

const API_BASE = 'https://api.quran.com/api/v4'
const ONE_DAY = 60 * 60 * 24
const MAX_PER_PAGE = 50

export async function fetchChapters(): Promise<QuranChapter[]> {
  const res = await fetch(`${API_BASE}/chapters?language=en`, {
    next: { revalidate: ONE_DAY },
  })
  if (!res.ok) throw new Error(`Failed to fetch chapters (${res.status})`)
  const data = (await res.json()) as { chapters: QuranChapter[] }
  return data.chapters
}

export async function fetchUthmaniTajweedPage(
  pageNumber: number,
): Promise<TajweedVerse[]> {
  const res = await fetch(
    `${API_BASE}/quran/verses/uthmani_tajweed?page_number=${pageNumber}`,
    { next: { revalidate: ONE_DAY } },
  )
  if (!res.ok) throw new Error(`Failed to fetch mushaf page (${res.status})`)
  const data = (await res.json()) as { verses: TajweedVerse[] }
  return data.verses
}

export type MushafWord = {
  id: number
  position: number
  verse_key: string
  line_number: number
  page_number: number
  code_v2?: string
  char_type_name?: string
  text_qpc_hafs?: string
  text_uthmani?: string
  text_uthmani_tajweed?: string
  text?: string
}

export type VerseWithWords = {
  id: number
  verse_key: string
  words: MushafWord[]
}

export async function fetchMushafPageWords(options: {
  pageNumber: number
  mushaf?: number
}): Promise<VerseWithWords[]> {
  const { pageNumber, mushaf } = options

  const url = new URL(`${API_BASE}/verses/by_page/${pageNumber}`)
  url.searchParams.set('words', 'true')
  url.searchParams.set(
    'word_fields',
    'id,position,verse_key,line_number,page_number,code_v2,char_type_name,text_qpc_hafs,text_uthmani',
  )
  url.searchParams.set('per_page', String(MAX_PER_PAGE))
  if (mushaf) url.searchParams.set('mushaf', String(mushaf))

  const firstRes = await fetch(url.toString(), { next: { revalidate: ONE_DAY } })
  if (!firstRes.ok) throw new Error(`Failed to fetch page words (${firstRes.status})`)
  const firstData = (await firstRes.json()) as Paginated<VerseWithWords>

  const totalPages = firstData.pagination?.total_pages ?? 1
  if (totalPages <= 1) return firstData.verses

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(async (p) => {
      const pUrl = new URL(url.toString())
      pUrl.searchParams.set('page', String(p))
      const res = await fetch(pUrl.toString(), { next: { revalidate: ONE_DAY } })
      if (!res.ok) throw new Error(`Failed to fetch page words page ${p}`)
      const data = (await res.json()) as Paginated<VerseWithWords>
      return data.verses
    }),
  )

  return [firstData.verses, ...rest].flat()
}

export type VerseTranslation = {
  id: number
  resource_id: number
  text: string
  verse_key: string
}

export type ChapterVerse = {
  id: number
  verse_key: string
  verse_number: number
  page_number?: number
  text_uthmani_tajweed?: string
  translations?: VerseTranslation[]
}

export type ChapterVerseWithWords = ChapterVerse & {
  words?: MushafWord[]
}

type Paginated<T> = {
  verses: T[]
  pagination?: {
    per_page: number
    current_page: number
    next_page: number | null
    total_pages: number
    total_records: number
  }
}

export async function fetchVersesByChapter(options: {
  chapterNumber: number
  translationIds?: number[]
}): Promise<ChapterVerseWithWords[]> {
  const { chapterNumber, translationIds = [85] } = options

  const baseUrl = new URL(`${API_BASE}/verses/by_chapter/${chapterNumber}`)
  baseUrl.searchParams.set('language', 'en')
  baseUrl.searchParams.set(
    'fields',
    'verse_key,verse_number,text_uthmani_tajweed,page_number',
  )
  baseUrl.searchParams.set('per_page', String(MAX_PER_PAGE))
  baseUrl.searchParams.set('words', 'true')
  baseUrl.searchParams.set(
    'word_fields',
    'id,position,verse_key,line_number,page_number,text_uthmani_tajweed',
  )
  if (translationIds.length) {
    baseUrl.searchParams.set('translations', translationIds.join(','))
    baseUrl.searchParams.set('translation_fields', 'resource_id,text,verse_key')
  }

  const firstRes = await fetch(baseUrl.toString(), {
    next: { revalidate: ONE_DAY },
  })
  if (!firstRes.ok) {
    throw new Error(`Failed to fetch chapter verses (${firstRes.status})`)
  }
  const firstData = (await firstRes.json()) as Paginated<ChapterVerseWithWords>

  const totalPages = firstData.pagination?.total_pages ?? 1
  if (totalPages <= 1) return firstData.verses

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(async (p) => {
      const url = new URL(baseUrl.toString())
      url.searchParams.set('page', String(p))
      const res = await fetch(url.toString(), { next: { revalidate: ONE_DAY } })
      if (!res.ok) throw new Error(`Failed to fetch chapter page ${p}`)
      const data = (await res.json()) as Paginated<ChapterVerseWithWords>
      return data.verses
    }),
  )

  return [firstData.verses, ...rest].flat()
}

export async function fetchVersesByChapterWithWords(options: {
  chapterNumber: number
  translationIds?: number[]
}): Promise<ChapterVerseWithWords[]> {
  const { chapterNumber, translationIds = [85] } = options

  const baseUrl = new URL(`${API_BASE}/verses/by_chapter/${chapterNumber}`)
  baseUrl.searchParams.set('language', 'en')
  baseUrl.searchParams.set(
    'fields',
    'verse_key,verse_number,text_uthmani_tajweed,page_number',
  )
  baseUrl.searchParams.set('words', 'true')
  baseUrl.searchParams.set(
    'word_fields',
    'id,position,verse_key,line_number,page_number,code_v2,char_type_name,text_qpc_hafs,text_uthmani,text_uthmani_tajweed',
  )
  baseUrl.searchParams.set('per_page', String(MAX_PER_PAGE))
  if (translationIds.length) {
    baseUrl.searchParams.set('translations', translationIds.join(','))
    baseUrl.searchParams.set('translation_fields', 'resource_id,text,verse_key')
  }

  const firstRes = await fetch(baseUrl.toString(), { next: { revalidate: ONE_DAY } })
  if (!firstRes.ok) {
    throw new Error(`Failed to fetch chapter verses (${firstRes.status})`)
  }
  const firstData = (await firstRes.json()) as Paginated<ChapterVerseWithWords>

  const totalPages = firstData.pagination?.total_pages ?? 1
  if (totalPages <= 1) return firstData.verses

  const rest = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(async (p) => {
      const url = new URL(baseUrl.toString())
      url.searchParams.set('page', String(p))
      const res = await fetch(url.toString(), { next: { revalidate: ONE_DAY } })
      if (!res.ok) throw new Error(`Failed to fetch chapter page ${p}`)
      const data = (await res.json()) as Paginated<ChapterVerseWithWords>
      return data.verses
    }),
  )

  return [firstData.verses, ...rest].flat()
}

export type SearchResult = {
  verse_key: string
  text: string
  translations: { text: string; name?: string; resource_id?: number }[]
}

export type SearchResponse = {
  search: {
    query: string
    total_results: number
    current_page: number
    results: SearchResult[]
  }
}

export async function searchQuran(query: string, options: { page?: number; size?: number } = {}): Promise<SearchResponse> {
  const { page = 1, size = 20 } = options
  const url = new URL(`${API_BASE}/search`)
  url.searchParams.set('q', query)
  url.searchParams.set('size', String(size))
  url.searchParams.set('page', String(page))
  url.searchParams.set('language', 'en')
  url.searchParams.set('mode', 'advanced')
  url.searchParams.set('exact_matches_only', '1')
  url.searchParams.set('translations', '131')

  const res = await fetch(url.toString(), { next: { revalidate: ONE_DAY } })
  if (!res.ok) throw new Error(`Failed to search Quran (${res.status})`)
  return (await res.json()) as SearchResponse
}
