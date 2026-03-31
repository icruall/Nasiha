const fs = require('fs');
const http = require('http');

const LOCAL_PATH = 'c:/Users/blizz/nasiha-web/data/hisn-ul-muslim.json';
const CATEGORIES_URL = 'http://www.hisnmuslim.com/api/ar/husn_ar.json';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data.replace(/^\uFEFF/, '')));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function sanitize(text) {
  if (!text) return "";
  return text
    .replace(/[,;?:!()\[\]*.]/g, '') // Remove Western punctuation
    .replace(/[،؛؟]/g, '')           // Remove Arabic punctuation (unsupported by font)
    .replace(/◌/g, '')
    .replace(/صلى الله عليه وسلم/g, 'ﷺ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function sync() {
  try {
    console.log("Fetching category list...");
    const categoriesData = await fetchJson(CATEGORIES_URL);
    const categories = categoriesData["العربية"];

    console.log(`Found ${categories.length} categories. Loading local data...`);
    const localContent = fs.readFileSync(LOCAL_PATH, 'utf8').replace(/^\uFEFF/, '');
    const localData = JSON.parse(localContent);

    // Create ID map for local adhkar
    const localAdhkarMap = {};
    localData.English.forEach(section => {
      section.TEXT.forEach(adhkar => {
        localAdhkarMap[adhkar.ID] = adhkar;
      });
    });

    let updatedCount = 0;
    for (const cat of categories) {
      console.log(`Syncing category: ${cat.TITLE} (${cat.ID})...`);
      try {
        const catData = await fetchJson(cat.TEXT);
        const remoteAdhkars = catData[Object.keys(catData)[0]];

        remoteAdhkars.forEach(remote => {
          if (localAdhkarMap[remote.ID]) {
            const original = localAdhkarMap[remote.ID].ARABIC_TEXT;
            const synced = remote.ARABIC_TEXT;
            
            // Apply sanitization to synced text
            localAdhkarMap[remote.ID].ARABIC_TEXT = sanitize(synced);
            updatedCount++;
          }
        });
      } catch (e) {
        console.error(`Failed to sync category ${cat.ID}: ${e.message}`);
      }
      // Small delay to be polite to the API
      await new Promise(r => setTimeout(r, 100));
    }

    console.log(`Sync complete! Updated ${updatedCount} entries. Saving...`);
    fs.writeFileSync(LOCAL_PATH, JSON.stringify(localData, null, '\t'), 'utf8');
    console.log("File saved successfully.");

  } catch (e) {
    console.error("Sync Error:", e.message);
  }
}

sync();
