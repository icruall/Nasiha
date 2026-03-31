const fs = require('fs');
const path = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';

try {
  const content = fs.readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(content);

  data.English.forEach(section => {
    section.TEXT.forEach(adhkar => {
      // ID 91: Should be Subhanallah wa bihamdih (100x)
      if (adhkar.ID === 91) {
        adhkar.ARABIC_TEXT = "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ";
      }

      // ID 84: Should be the Afwa wal-Afiya dua
      if (adhkar.ID === 84) {
        adhkar.ARABIC_TEXT = "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي اللَّهُم اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي";
      }
    });
  });

  fs.writeFileSync(path, JSON.stringify(data, null, '\t'), 'utf8');
  console.log("Restoration of ID 91 and check of ID 84 complete.");

} catch (e) {
  console.error("Error:", e.message);
}
