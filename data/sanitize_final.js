const fs = require('fs');
const path = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';

try {
  const content = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  // JSON.parse will handle duplicate keys by keeping the last one (usually)
  // but if the file is invalid due to duplicates, it might fail.
  // Actually, standard JSON doesn't allow duplicate keys, but many parsers just take the last one.
  const data = JSON.parse(content);

  const sanitize = (text) => {
    if (!text) return "";
    return text
      .replace(/[,;?:!\[\]*.]/g, '') // Remove Western punctuation (keeping parentheses)
      .replace(/[،؛؟！：]/g, '')        // Remove Arabic/Fullwidth punctuation
      .replace(/◌/g, '')               // Remove explicit dotted circles
      .replace(/ ﷺ/g, ' ﷺ')            // Ensure spacing around ﷺ
      .replace(/[^\S\r\n]+/g, ' ')     // Normalize spaces but preserve newlines
      .trim();
  };

  data.English.forEach(section => {
    section.TEXT.forEach(adhkar => {
      if (adhkar.ARABIC_TEXT) {
        adhkar.ARABIC_TEXT = sanitize(adhkar.ARABIC_TEXT);
      }
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("Ultra-sanitization and JSON fix complete.");

} catch (e) {
  console.error("Error during sanitization:", e.message);
  // If JSON.parse failed, we might need to fix it manually or use a more lenient parser.
}
