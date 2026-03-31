const fs = require('fs');
let content = fs.readFileSync('c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}
const data = JSON.parse(content);
const allText = data.English.flatMap(section => section.TEXT);
const entry = allText.find(t => t.ID === 255);

if (entry) {
  console.log(`ID: ${entry.ID}`);
  const text = entry.ARABIC_TEXT;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
    process.stdout.write(`${char} (U+${code}) | `);
    if ((i+1) % 5 === 0) console.log('');
  }
} else {
  console.log("Entry 255 not found");
}
