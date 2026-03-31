const fs = require('fs');
const path = 'data/hisn-ul-muslim.json';

try {
  let content = fs.readFileSync(path, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  const data = JSON.parse(content);
  
  const bismillah = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  function sanitize(text) {
    if (!text) return "";
    return text
      .replace(/[,;?:!()\[\]*.]/g, '') // Remove Western punctuation
      .replace(/[،؛؟]/g, '')           // Remove Arabic punctuation (not supported by font)
      .replace(/◌/g, '')
      .replace(/صلى الله عليه وسلم/g, 'ﷺ')
      .replace(/ صلى الله عليه وسلم /g, ' ﷺ ')
      .replace(/ ص /g, ' ﷺ ')
      .replace(/ صلى الله عليه و سلم /g, ' ﷺ ')
      .replace(/\s+/g, ' ')           // Collapse spaces
      .trim();
  }

  data.English.forEach(section => {
    if (!section.TEXT) return;
    section.TEXT.forEach(adhkar => {
      if (!adhkar.ARABIC_TEXT) adhkar.ARABIC_TEXT = "";

      // Preservation for 3 Quls
      if (adhkar.ID === 76) return;

      // Handle Ayat al-Kursi (preserve newlines)
      if (adhkar.ARABIC_TEXT.includes("اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ")) {
           adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT
            .replace(/[.()\[\]*،؛؟]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ /g, "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\n")
            .trim();
           return;
      }

      adhkar.ARABIC_TEXT = sanitize(adhkar.ARABIC_TEXT);
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("JSON Final Ultra-Sanitize complete");

} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
