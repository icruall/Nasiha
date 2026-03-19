import { sanityClient } from '@/lib/sanity'
import { emotionBySlugQuery } from '@/lib/queries'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug?: string }>
}

interface QuranVerse {
  arabic: string
  translation: string
  reference?: string
}

interface DuaItem {
  arabic?: string
  translation: string
  prophet?: string
  canonicalSource?: string
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug?: string }> }
): Promise<Metadata> {
  const { slug } = await params

  if (!slug) {
    return {
      title: 'Emotion — Nasiha',
      description:
        'A calm space for reflection, Qur’an, duʿā’, and hope.',
    }
  }

  const emotion = await sanityClient.fetch(emotionBySlugQuery, {
    slug,
  })

  if (!emotion) {
    return {
      title: 'Emotion — Nasiha',
      description:
        'A calm space for reflection, Qur’an, duʿā’, and hope.',
    }
  }

  return {
    title: `${emotion.title} — Nasiha`,
    description: emotion.description,
    alternates: {
      canonical: `/emotion/${slug}`,
    },
  }
}

export default async function EmotionPage({ params }: Props) {
  const { slug } = await params

  const emotion = await sanityClient.fetch(emotionBySlugQuery, {
    slug,
  })

  if (!emotion) {
    return <div className="p-6">Emotion not found</div>
  }

  // Exhaustive filter for all "dotted circle" variations and small tajweed signs
  const filterArabic = (text: string) => 
    text?.replace(/[\u0600-\u061A\u06DD-\u06ED\u08E2-\u08E3\u25CC\u25CB\u25CE\u25D0-\u25FF\u200C\u00A0]/g, '');

  return (
    <main className="max-w-2xl mx-auto py-10 px-6 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-gray-50">{emotion.title}</h1>
        <p className="text-gray-400 text-sm italic">{emotion.description}</p>
      </div>

      {emotion.cards?.reflection?.text && (
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center">Reflection</p>
          <p className="text-gray-100 leading-relaxed text-center">{emotion.cards.reflection.text}</p>
        </div>
      )}

      {emotion.showMoralAnchor && emotion.cards?.moralAnchor?.text && (
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center">Moral Anchor</p>
          <p className="text-gray-100 leading-relaxed text-center">{emotion.cards.moralAnchor.text}</p>
        </div>
      )}

      {emotion.cards?.quran?.verses?.length > 0 && (
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center">Qur&apos;an</p>
          <div className="space-y-10">
            {emotion.cards.quran.verses.map((v: QuranVerse, i: number) => {
              // Robustly extract surah number and ayah number from strings like "Qur'an 9:105" or "13:11"
              const reference = v.reference || "";
              const matches = reference.match(/(\d+):(\d+)/);
              const surah = matches?.[1];
              const ayah = matches?.[2];
              const filteredArabic = filterArabic(v.arabic);

              return (
                <div key={i} className="space-y-6">
                  {surah && ayah ? (
                    <Link href={`/quran/surah/${surah}#ayah-${ayah}`}>
                      <p
                        dir="rtl"
                        lang="ar"
                        className="text-3xl md:text-4xl leading-[2.2] text-center text-gray-50 cursor-pointer hover:opacity-80 transition"
                        style={{ fontFamily: "UthmanicHafs, serif" }}
                      >
                        {filteredArabic}
                      </p>
                    </Link>
                  ) : (
                    <p
                      dir="rtl"
                      lang="ar"
                      className="text-3xl md:text-4xl leading-[2.2] text-center text-gray-50"
                      style={{ fontFamily: "UthmanicHafs, serif" }}
                    >
                      {filteredArabic}
                    </p>
                  )}
                  
                  <div className="translation-box">
                    <p className="text-base text-center italic leading-relaxed">
                      {v.translation}
                    </p>
                  </div>
                  
                  {v.reference && (
                    <p className="text-gray-400 text-xs text-center">{v.reference}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Duʿā’ Section */}
      {emotion.cards?.dua?.duas?.length > 0 && (
        <div className="space-y-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center">Du&apos;ā&apos;</p>
          <div className="space-y-16">
            {emotion.cards.dua.duas.map((d: DuaItem, i: number) => (
              <div key={i} className="space-y-6">
                {/* Arabic */}
                {d.arabic && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="text-3xl md:text-4xl leading-[2.2] text-center text-gray-50"
                    style={{ fontFamily: "UthmanicHafs, serif" }}
                  >
                    {filterArabic(d.arabic)}
                  </p>
                )}

                {/* Translation Box (No quote icon) */}
                <div className="translation-box">
                  <p className="text-base text-center italic leading-relaxed">
                    {d.translation}
                  </p>
                </div>

                {/* Source / attribution */}
                {(d.canonicalSource || d.prophet) && (
                  <div className="text-center space-y-1">
                    {d.prophet && <p className="text-xs uppercase tracking-widest text-emerald-400/80">{d.prophet}</p>}
                    {d.canonicalSource && <p className="text-gray-400 text-xs">{d.canonicalSource}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {emotion.cards?.hope?.text && (
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-gray-400 text-center">Hope</p>
          <p className="text-gray-100 text-sm leading-relaxed text-center">
            {emotion.cards.hope.text}
          </p>
          {emotion.cards.hope.nextStep && (
            <p className="text-emerald-400/80 text-sm italic text-center">
              {emotion.cards.hope.nextStep}
            </p>
          )}
        </div>
      )}
    </main>
  )
}