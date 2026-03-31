import hisnDataRaw from '../data/hisn-ul-muslim.json';

export interface Adhkar {
  ID: number;
  ARABIC_TEXT: string;
  TRANSLATED_TEXT: string;
  REPEAT: number;
  AUDIO: string;
}

export interface Chapter {
  ID: number;
  TITLE: string;
  AUDIO_URL: string;
  TEXT: Adhkar[];
}

interface HisnData {
  English: Chapter[];
}

const hisnData = hisnDataRaw as unknown as HisnData;

// Ensure audio URLs use HTTPS to avoid mixed-content issues
hisnData.English.forEach(chapter => {
  if (chapter.AUDIO_URL) {
    chapter.AUDIO_URL = chapter.AUDIO_URL.replace('http://', 'https://');
  }
  chapter.TEXT.forEach(adhkar => {
    if (adhkar.AUDIO) {
      adhkar.AUDIO = adhkar.AUDIO.replace('http://', 'https://');
    }
  });
});

export function getAllChapters(): Chapter[] {
  return hisnData.English;
}

export function getChapterById(id: number): Chapter | undefined {
  return hisnData.English.find((chapter) => chapter.ID === id);
}

export function getChapterByTitle(title: string): Chapter | undefined {
  return hisnData.English.find((chapter) => 
    chapter.TITLE.toLowerCase().includes(title.toLowerCase())
  );
}

// Specific helper for frequently used sections
export const HISN_SECTIONS = {
  MORNING_EVENING: 27,
  SLEEPING: 28,
  AFTER_SALAH: 25, // Note: Verified this usually corresponds to "Supplications after the prayer"
  EPITOME: 130, // "The excellence of remembering Allah"
};
