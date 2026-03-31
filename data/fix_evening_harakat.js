const fs = require('fs');
const path = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';

let content = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '');

// Fix duplicate keys in the file (crudely but effectively for this specific case)
content = content.replace(/"TRANSLATED_TEXT": "\(He \(PBUH\) also said: ‘A miser is one whom when I am mentioned to him,  fails to send prayers upon me\.\)\)",\n\t\t\t\t\t"TRANSLATED_TEXT"/g, '"TRANSLATED_TEXT"');
// Handle the specific duplicate around line 2511-2512 reported by lint
// Actually, let's just parse it as JSON, fix it, and stringify it back.

try {
  const data = JSON.parse(content);
  
  const replacements = [
    { from: /وإذا أمسى قال أمسينا وأمسى الملك للَّه/g, to: "وَإِذَا أَمْسَى قَالَ: أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ" },
    { from: /وإذا أمسى قال رب أسألك خير ما في هذه الليلة وخير ما بعدها وأعوذ بك من شر ما في هذه الليلة وشر ما بعدها/g, to: "وَإِذَا أَمْسَى قَالَ: رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا" },
    { from: /وإذا أمسى قال اللَّهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير/g, to: "وَإِذَا أَمْسَى قَالَ: اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ" },
    { from: /وإذا أمسى قال اللَّهم إني أمسيت/g, to: "وَإِذَا أَمْسَى قَالَ: اللَّهُمَّ إِنِّي أَمْسَيْتُ" },
    { from: "وإذا أمسى قال: اللَّهم ما أمسى بي من نعمة، أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر", to: "وَإِذَا أَمْسَى قَالَ: اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ، أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ" },
    { from: /وإذا أمسى قال رضينا بالله رباً وبالإسلام ديناً وبمحمد ﷺ نبياً/g, to: "وَإِذَا أَمْسَى قَالَ: رَضِينَا بِاللَّهِ رَبَّاً وَبِالْإِسْلَامِ دِيناً وَبِمُحَمَّدٍ ﷺ نَبِيَّاً" }
  ];

  data.English.forEach(section => {
    section.TEXT.forEach(adhkar => {
      replacements.forEach(r => {
        if (adhkar.ARABIC_TEXT) {
          adhkar.ARABIC_TEXT = adhkar.ARABIC_TEXT.replace(r.from, r.to);
        }
      });
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("Harakat fix for evening variants complete");

} catch (e) {
  console.error("Error:", e.message);
}
