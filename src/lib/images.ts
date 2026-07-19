// ============================================================
// Drop-in image system.
//
// To use your OWN licensed images: place files in
//   src/assets/models/   (portraits, e.g. aanya.jpg)
//   src/assets/scenes/    (experience / editorial imagery)
// then reference them by filename in the data files.
//
// Until a real file exists, `resolveImage` returns `null` and the
// <Portrait> / <SceneImage> components render an elegant generated
// placeholder instead — so the site looks complete out of the box
// and upgrades automatically the moment you add real assets.
// ============================================================

// Eagerly import anything the user drops into the asset folders.
const modelFiles = import.meta.glob('../assets/models/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const sceneFiles = import.meta.glob('../assets/scenes/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function index(files: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const path in files) {
    const name = path.split('/').pop() ?? ''
    const stem = name.replace(/\.[^.]+$/, '').toLowerCase()
    out[stem] = files[path]
    out[name.toLowerCase()] = files[path]
  }
  return out
}

const models = index(modelFiles)
const scenes = index(sceneFiles)

export function resolveModelImage(key?: string): string | null {
  if (!key) return null
  return models[key.toLowerCase()] ?? null
}

export function resolveSceneImage(key?: string): string | null {
  if (!key) return null
  return scenes[key.toLowerCase()] ?? null
}

// Deterministic palette pairs used to build placeholder gradients so a
// given profile always renders the same tones.
const PLACEHOLDER_PAIRS: [string, string][] = [
  ['#5a1220', '#0c0708'],
  ['#3d0c16', '#9b1b2e'],
  ['#a98f6c', '#3d0c16'],
  ['#c8a349', '#5a1220'],
  ['#9b1b2e', '#0c0708'],
  ['#d98a3d', '#3d0c16'],
  ['#cbb393', '#17100f'],
]

export function placeholderStyle(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const [a, b] = PLACEHOLDER_PAIRS[h % PLACEHOLDER_PAIRS.length]
  const angle = 120 + (h % 90)
  return {
    backgroundImage: `radial-gradient(circle at 30% 20%, ${a}dd, transparent 55%), linear-gradient(${angle}deg, ${b}, ${a})`,
  }
}
