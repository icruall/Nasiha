const fs = require('fs');
const path = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';

try {
  const content = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(content);

      const getRepeatArabic = (count) => {
    switch (count) {
      case 1: return "مَرَّةً وَاحِدَةً";
      case 2: return "مَرَّتَيْنِ";
      case 3: return "ثَلَاثَ مَرَّاتٍ";
      case 4: return "أَرْبَعَ مَرَّاتٍ";
      case 7: return "سَبْعَ مَرَّاتٍ";
      case 10: return "عَشْرَ مَرَّاتٍ";
      case 33: return "ثَلَاثاً وَثَلَاثِينَ مَرَّةً";
      case 34: return "أَرْبَعاً وَثَلَاثِينَ مَرَّةً";
      case 100: return "مِائَةَ مَرَّةٍ";
      default: return `${count} مَرَّاتٍ`;
    }
  };

  data.English.forEach(section => {
    section.TEXT.forEach(adhkar => {
      // 1. Structural Overhaul for ID 76 (3 Quls)
      if (adhkar.ID === 76) {
        adhkar.ARABIC_TEXT = `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾
(ثَلَاثَ مَرَّاتٍ)

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾
(ثَلَاثَ مَرَّاتٍ)

بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾
(ثَلَاثَ مَرَّاتٍ)`;
      } else {
        // 2. Remove ALL ﴿ and ﴾ brackets as requested
        adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT.replace(/[﴿﴾]/g, '');
        
        // 3. Remove ALL existing repetition counts (ultra-aggressive)
        const countsToStrip = [
          /ثَلَاثَ مَرَّاتٍ/g, /ثلاثَ مرَّاتٍ/g, /ثلاث مرات/g, /ثلاثَ مَرَّاتٍ/g,
          /أَرْبَعَ مَرَّاتٍ/g, /أربعَ مرَّاتٍ/g, /أربع مرات/g,
          /سَبْعَ مَرَّاتٍ/g, /سبعَ مَرَّاتٍ/g, /سبع مرات/g, /سَبْعَ مَرّاتٍ/g, /سبعَ مَرّاتٍ/g,
          /عَشْرَ مَرَّاتٍ/g, /عشر مرات/g,
          /مِائَةَ مَرَّةٍ/g, /مائة مرة/g,
          /مَرَّةً وَاحِدَةً/g, /مرة واحدة/g,
          /مَرَّتَيْنِ/g, /مرتين/g,
          /\(.*\)/g // Also remove anything in parentheses
        ];

        countsToStrip.forEach(regex => {
          adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT.replace(regex, '');
        });
        
        adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT.trim();

        // 4. Append vocalized repetition count in parentheses
        const repeatStr = getRepeatArabic(adhkar.REPEAT);
        adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT + "\n(" + repeatStr + ")";

        // 5. Final sanitization: Remove redundant double brackets and ensure newlines look good
        adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT
          .replace(/\(\(/g, '(')
          .replace(/\)\)/g, ')')
          .replace(/  +/g, ' ')
          .trim();
      }
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("Absolute final overhaul complete.");

} catch (e) {
  console.error("Error:", e.message);
}
