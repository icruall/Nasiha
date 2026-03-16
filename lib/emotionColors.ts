export const emotionColors: Record<string, string> = {
  // primary set (from your mapping)
  angry: '#D08A8A', // muted red
  anxious: '#7FAEDC', // soft blue
  ashamed: '#9A8A96',
  confused: '#8FAFB3',
  content: '#9FB3A1',
  grateful: '#8FB8A3',
  grieving: '#4c84b5',
  guilty: '#8E7A9A',
  happy: '#D9C48F', // gentle warm gold
  jealous: '#8FA58C',
  lazy: '#B8AFA3', // muted sand
  lonely: '#7E97A6',
  overwhelmed: '#9A8FB8', // desaturated purple
  rejected: '#B48C8C',
  restless: '#7C93B8', // gentle green
  sad: '#87f5ff', // cool gray-blue
  scared: '#A79BC8', // soft violet
  tired: '#B8B09A',
}


const aliases: Record<string, keyof typeof emotionColors> = {
  sadness: 'sad',
  anger: 'angry',
}

function hslToHex(h: number, s: number, l: number) {
  const S = s / 100
  const L = l / 100
  const c = (1 - Math.abs(2 * L - 1)) * S
  const hh = h / 60
  const x = c * (1 - Math.abs((hh % 2) - 1))
  let r = 0, g = 0, b = 0

  if (0 <= hh && hh < 1) [r, g, b] = [c, x, 0]
  else if (1 <= hh && hh < 2) [r, g, b] = [x, c, 0]
  else if (2 <= hh && hh < 3) [r, g, b] = [0, c, x]
  else if (3 <= hh && hh < 4) [r, g, b] = [0, x, c]
  else if (4 <= hh && hh < 5) [r, g, b] = [x, 0, c]
  else if (5 <= hh && hh < 6) [r, g, b] = [c, 0, x]

  const m = L - c / 2
  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function colorFromString(key: string) {
  // djb2-ish hash -> stable hue per key
  let hash = 5381
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i)
  }
  const hue = Math.abs(hash) % 360
  // muted + calm by default
  return hslToHex(hue, 35, 62)
}

export function getEmotionColor(rawKey: string) {
  const key = (rawKey ?? '').toLowerCase().trim()
  const normalized = (aliases[key] as string | undefined) ?? key
  return emotionColors[normalized] ?? colorFromString(normalized)
}

export default emotionColors
