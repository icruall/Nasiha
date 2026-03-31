const fs = require('fs');
try {
  let content = fs.readFileSync('data/hisn-ul-muslim.json', 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  const data = JSON.parse(content);
  console.log("Success! Data length:", data.English.length);
} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
