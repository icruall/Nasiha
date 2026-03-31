"use client"

import { useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

// Curated list of 30+ beautiful reflective Ayahs
const verses = [
  { id: 1, chapter: 2, verse: 186, arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ", translation: "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.", surahName: "Al-Baqarah" },
  { id: 2, chapter: 94, verse: 5, arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", translation: "For indeed, with hardship [will be] ease.", surahName: "Ash-Sharh" },
  { id: 3, chapter: 13, verse: 28, arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", translation: "Unquestionably, by the remembrance of Allah hearts are assured.", surahName: "Ar-Ra'd" },
  { id: 4, chapter: 2, verse: 152, arabic: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ", translation: "So remember Me; I will remember you.", surahName: "Al-Baqarah" },
  { id: 5, chapter: 2, verse: 286, arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", translation: "Allah does not burden a soul beyond that it can bear.", surahName: "Al-Baqarah" },
  { id: 6, chapter: 3, verse: 139, arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ", translation: "So do not weaken and do not grieve, and you will be superior if you are [true] believers.", surahName: "Ali 'Imran" },
  { id: 7, chapter: 39, verse: 53, arabic: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ", translation: "Do not despair of the mercy of Allah.", surahName: "Az-Zumar" },
  { id: 8, chapter: 65, verse: 3, arabic: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", translation: "And whoever relies upon Allah - then He is sufficient for him.", surahName: "At-Talaq" },
  { id: 9, chapter: 8, verse: 33, arabic: "وَمَا كَانَ اللَّهُ مُعَذِّبَهُمْ وَهُمْ يَسْتَغْفِرُونَ", translation: "And Allah would not punish them while they seek forgiveness.", surahName: "Al-Anfal" },
  { id: 10, chapter: 2, verse: 153, arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.", surahName: "Al-Baqarah" },
  { id: 11, chapter: 20, verse: 25, arabic: "رَبِّ اشْرَحْ لِي صَدْرِي", translation: "My Lord, expand for me my breast [with assurance].", surahName: "Ta-Ha" },
  { id: 12, chapter: 25, verse: 74, arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes.", surahName: "Al-Furqan" },
  { id: 13, chapter: 14, verse: 7, arabic: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ", translation: "If you are grateful, I will surely increase you [in favor].", surahName: "Ibrahim" },
  { id: 14, chapter: 3, verse: 159, arabic: "فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", translation: "And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely [upon Him].", surahName: "Ali 'Imran" },
  { id: 15, chapter: 2, verse: 216, arabic: "وَعَسَىٰ أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ", translation: "But perhaps you hate a thing and it is good for you.", surahName: "Al-Baqarah" },
  { id: 16, chapter: 2, verse: 45, arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", translation: "And seek help through patience and prayer.", surahName: "Al-Baqarah" },
  { id: 17, chapter: 67, verse: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", translation: "Blessed is He in whose hand is dominion, and He is over all things competent.", surahName: "Al-Mulk" },
  { id: 18, chapter: 93, verse: 3, arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ", translation: "Your Lord has not forsaken you, [O Muhammad], nor has He detested [you].", surahName: "Ad-Duha" },
  { id: 19, chapter: 17, verse: 80, arabic: "عَسَىٰ أَنْ يَبْعَثَكَ رَبُّكَ مَقَامًا مَحْمُودًا", translation: "It grows likely that your Lord will resurrect you to a praised station.", surahName: "Al-Isra" },
  { id: 20, chapter: 4, verse: 28, arabic: "يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنْكُمْ ۚ وَخُلِقَ الْإِنْسَانُ ضَعِيفًا", translation: "Allah wants to lighten for you [your difficulties]; and mankind was created weak.", surahName: "An-Nisa" },
  { id: 21, chapter: 16, verse: 128, arabic: "إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ", translation: "Indeed, Allah is with those who fear Him and those who are doers of good.", surahName: "An-Nahl" },
  { id: 22, chapter: 57, verse: 4, arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ", translation: "And He is with you wherever you are.", surahName: "Al-Hadid" },
  { id: 23, chapter: 40, verse: 60, arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ", translation: "Call upon Me; I will respond to you.", surahName: "Ghafir" },
  { id: 24, chapter: 6, verse: 12, arabic: "كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ الرَّحْمَةَ", translation: "Your Lord has prescribed on Himself mercy.", surahName: "Al-An'am" },
  { id: 25, chapter: 50, verse: 16, arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ", translation: "And We are closer to him than [his] jugular vein.", surahName: "Qaf" },
  { id: 26, chapter: 27, verse: 62, arabic: "أَمَّنْ يُجِيبُ الْمُضْطَرَّ إِذَا دَعَاهُ وَيَكْشِفُ السُّوءَ", translation: "Is He [not best] who responds to the desperate one when he calls upon Him and removes evil?", surahName: "An-Naml" },
  { id: 27, chapter: 15, verse: 49, arabic: "نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ", translation: "Inform My servants that it is I who am the Forgiving, the Merciful.", surahName: "Al-Hijr" },
  { id: 28, chapter: 55, verse: 60, arabic: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ", translation: "Is the reward for good [anything] but good?", surahName: "Ar-Rahman" },
  { id: 29, chapter: 1, verse: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help.", surahName: "Al-Fatihah" },
  { id: 30, chapter: 112, verse: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One.'", surahName: "Al-Ikhlas" },
  { id: 31, chapter: 10, verse: 57, arabic: "يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُمْ مَوْعِظَةٌ مِنْ رَبِّكُمْ وَشِفَاءٌ لِمَا فِي الصُّدُورِ", translation: "O mankind, there has to come to you instruction from your Lord and healing for what is in the breasts.", surahName: "Yunus" },
  { id: 32,chapter: 3,verse: 173,arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",surahName: "Al-'Imran"},
  { id: 33,chapter: 65,verse: 2,arabic: "وَمَنْ يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",translation: "And whoever fears Allah - He will make for him a way out.",surahName: "At-Talaq"},
  { id: 34,chapter: 29,verse: 69,arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",translation: "And those who strive for Us - We will surely guide them.",surahName: "Al-Ankabut"},
  { id: 35,chapter: 20,verse: 46,arabic: "إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ",translation: "Indeed, I am with you both; I hear and I see.",surahName: "Ta-Ha"},
  { id: 36,chapter: 9,verse: 51,arabic: "قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا",translation: "Nothing will happen to us except what Allah has decreed.",surahName: "At-Tawbah"},
  { id: 37,chapter: 42,verse: 36,arabic: "وَمَا عِندَ اللَّهِ خَيْرٌ وَأَبْقَىٰ",translation: "And what is with Allah is better and more lasting.",surahName: "Ash-Shura"},
  { id: 38,chapter: 94,verse: 6,arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",translation: "Indeed, with hardship comes ease.",surahName: "Ash-Sharh",},
  { id: 39,chapter: 3,verse: 200,arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا",translation: "O you who believe, persevere and endure.",surahName: "Ali 'Imran",},
  { id: 40,chapter: 16,verse: 97,arabic: "مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ...",translation: "Whoever does righteousness... We will give them a good life.",surahName: "An-Nahl",},
  { id: 41,chapter: 2,verse: 214,arabic: "أَمْ حَسِبْتُمْ أَن تَدْخُلُوا الْجَنَّةَ...",translation: "Do you think you will enter Paradise without trials?",surahName: "Al-Baqarah",},
  { id: 42,chapter: 12,verse: 87,arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",translation: "Do not despair of relief from Allah.",surahName: "Yusuf",},
  { id: 43,chapter: 28,verse: 56,arabic: "إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ",translation: "You cannot guide whom you love.",surahName: "Al-Qasas",},
  { id: 44,chapter: 57,verse: 23,arabic: "لِكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ",translation: "So that you do not grieve over what has escaped you.",surahName: "Al-Hadid",},
  { id: 45,chapter: 2,verse: 155,arabic: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ...",translation: "We will surely test you with fear and loss...",surahName: "Al-Baqarah",}
]

export default function DailyAyahCard() {
  const dailyVerse = useMemo(() => {
    // Current date logic to seed the selection
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    return verses[dayOfYear % verses.length];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <Link 
        href={`/quran/surah/${dailyVerse.chapter}#ayah-${dailyVerse.verse}`}
        className="group block"
      >
        <div className="
          relative overflow-hidden
          glass-card p-6 md:p-14 rounded-[2rem] md:rounded-[3rem] 
          bg-white/[0.02]
          transition-all duration-700
          border-sky-500/20 hover:border-sky-400/50
          hover:shadow-[0_0_50px_rgba(56,189,248,0.15)]
          shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]
          hover:bg-white/[0.04] active:scale-[0.99]
          text-center space-y-8
        ">
          {/* Section Heading */}
          <div className="flex flex-col items-center space-y-2 opacity-50 transition-opacity duration-500 group-hover:opacity-80">
            <span className="text-[10px] uppercase tracking-[0.5em] text-sky-400 font-bold">
              Daily Ayah
            </span>
            <div className="h-[1px] w-6 bg-sky-500/40" />
          </div>

          {/* Subtle Quote Icon */}
          <div className="flex justify-center opacity-20 transition-opacity duration-500 group-hover:opacity-40">
            <Quote size={40} className="text-sky-400 rotate-180" />
          </div>

          <div className="space-y-6">
            {/* Arabic Text */}
            <div
              className="text-3xl md:text-5xl leading-[1.8] md:leading-[1.8] text-white"
              style={{ fontFamily: 'var(--font-amiri), serif' }}
              dir="rtl"
              lang="ar"
            >
              {dailyVerse.arabic}
            </div>

            {/* Translation Text */}
            <p className="text-lg md:text-xl text-sky-100/70 font-sans italic leading-relaxed max-w-2xl mx-auto">
              &ldquo;{dailyVerse.translation}&rdquo;
            </p>
          </div>

          {/* Reference Block */}
          <div className="pt-6 flex flex-col items-center space-y-4">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-sky-400/50 group-hover:text-sky-300 transition-colors duration-500">
              {dailyVerse.surahName} {dailyVerse.chapter}:{dailyVerse.verse}
            </span>
          </div>

          {/* Interaction Hint */}
          <div className="absolute bottom-4 right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
             <span className="text-[10px] text-sky-400 font-sans tracking-widest uppercase">
               Read in Qur&apos;an
             </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
