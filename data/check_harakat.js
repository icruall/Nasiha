const fs = require('fs');
const content = fs.readFileSync('c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(content);

const harakatRegex = /[\u064B-\u0652\u0670]/g;
const arabicLettersRegex = /[\u0621-\u064A]/g;

const report = [];

data.English.forEach(section => {
  if (!section.TEXT) return;
  section.TEXT.forEach(adhkar => {
    const text = adhkar.ARABIC_TEXT || "";
    const letters = text.match(arabicLettersRegex) || [];
    const harakat = text.match(harakatRegex) || [];
    
    if (letters.length > 10) {
      const density = harakat.length / letters.length;
      if (density < 0.6) {
        report.push({
          ID: adhkar.ID,
          Title: section.TITLE,
          Density: density.toFixed(2),
          Text: text.substring(0, 50) + "..."
        });
      }
    }
  });
});

console.log(JSON.stringify(report.slice(0, 20), null, 2));
console.log(`Total entries with low density (< 0.3): ${report.length}`);
