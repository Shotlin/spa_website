export type Companion = {
  id: string
  name: string
  image: string
  imageKind?: 'model' | 'decor'
  tagline: string
  description?: string
  contactPhone?: string
  whatsappNumber?: string
  telegramUsername?: string
  age: number
  city: string
  cities: string[]
  category: string
  rate: number
  languages: string[]
  interests: string[]
  traits: string[]
  verified: boolean
  tier: 'Signature' | 'Elite' | 'Muse'
  experiences: string[]
  bio: string[]
  availability: { day: string; slots: string }[]
}

export const CITIES = ['Surat']

export const CATEGORIES = [
  'All Categories',
  'Call Girls',
  'Male Escorts',
  'Shemale Escorts',
  'Massages',
]

// The previous demo profiles are preserved in companions.archive.ts for reference,
// but the live site starts empty so the client can add only their own listings.
export const companions: Companion[] = []

export function getCompanion(id: string) {
  return companions.find((companion) => companion.id === id.trim())
}
