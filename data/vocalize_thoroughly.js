const fs = require('fs');
const path = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';

try {
  const content = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(content);

  const replacements = [
    // General Morning/Evening Markers
    { from: /وإذَا أَمْسَى قَالَ/g, to: "وَإِذَا أَمْسَى قَالَ" },
    { from: /وإذا أمسى قال/g, to: "وَإِذَا أَمْسَى قَالَ" },
    
    // Specific Adhkars requested by user
    { 
      id: 265, 
      text: "الْبَاقِيَاتُ الصَّالِحَاتُ سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ" 
    },
    { 
      from: /أمسينا وأمسى الملك للَّه/g, 
      to: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ" 
    },
    { 
      from: /اللَّهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير/g, 
      to: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ" 
    },
    { 
      from: /اللَّهم إني أمسيت/g, 
      to: "اللَّهُمَّ إِنِّي أَمْسَيْتُ" 
    },
    { 
      from: /اللَّهم ما أمسى بي/g, 
      to: "اللَّهُمَّ مَا أَمْسَى بِي" 
    },
    { 
      from: /أمسيت أثني عليك/g, 
      to: "أَمْسَيْتُ أُثْنِي عَلَيْكَ" 
    }
  ];

  data.English.forEach(section => {
    section.TEXT.forEach(adhkar => {
      // Fix by ID
      const fixById = replacements.find(r => r.id === adhkar.ID);
      if (fixById) {
        adhkar.ARABIC_TEXT = fixById.text;
      }
      
      // Fix by global replacement
      if (adhkar.ARABIC_TEXT) {
        replacements.forEach(r => {
          if (r.from) {
            adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT.replace(r.from, r.to);
          }
        });
      }
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("Thorough vocalization complete.");

} catch (e) {
  console.error("Error:", e.message);
}
