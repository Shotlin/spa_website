const fs = require('fs')
const path = 'src/data/companions.ts'
let src = fs.readFileSync(path, 'utf8')

const startMarker = 'export const companions: Companion[] = '
const s = src.indexOf(startMarker)
if (s < 0) throw new Error('no start marker')
const arrStart = src.indexOf('[', s)

// Array ends at the `]` immediately before the getCompanion export.
const fnIdx = src.indexOf('export function getCompanion')
if (fnIdx < 0) throw new Error('no getCompanion')
const arrEnd = src.lastIndexOf(']', fnIdx)
if (arrEnd < 0) throw new Error('no array end')

const jsonText = src.slice(arrStart, arrEnd + 1)
const companions = JSON.parse(jsonText)
if (companions.length < 20) throw new Error('parsed too few: ' + companions.length)

// --- Make Surat the flagship city: strong roster across ALL categories ---
const wantSurat = {
  'in-khopal-com': { tier: 'Signature', verified: true },                  // Aanya, 10 photos, Call Girls
  'tryst-link-escort-roxygoddess': { tier: 'Signature', verified: true },  // Call Girls
  'tryst-link-escort-rachelamore': { tier: 'Elite', verified: true },      // Call Girls
  'in-khopal-com-call-girls-noida': { tier: 'Elite', verified: true },     // Male Escorts
  'tryst-link-bdsm-tsoliviarhodes': { tier: 'Signature', verified: true }, // Shemale Escorts
  'in-khopal-com-massages': { tier: 'Elite', verified: true },             // Massages
}

let touched = 0
for (const c of companions) {
  if (wantSurat[c.id]) {
    c.cities = ['Surat', ...c.cities.filter((x) => x !== 'Surat')]
    c.city = 'Surat'
    c.tier = wantSurat[c.id].tier
    c.verified = wantSurat[c.id].verified
    c.tagline = c.tagline.replace(/in [A-Z][a-z]+/, 'in Surat')
    if (Array.isArray(c.bio)) c.bio = c.bio.map((b) => b.replace(/based in [A-Z][a-z]+/, 'based in Surat'))
    touched++
  }
}

// Surat-primary companions lead the directory.
companions.sort((a, b) => (a.city === 'Surat' ? 0 : 1) - (b.city === 'Surat' ? 0 : 1))

const newJson = JSON.stringify(companions, null, 2)
src = src.slice(0, arrStart) + newJson + ';' + src.slice(arrEnd + 1)
// collapse any accidental double semicolon
src = src.replace(/\]\;\;/g, '];')
fs.writeFileSync(path, src)

const perCity = {}
for (const c of companions) for (const ct of c.cities) perCity[ct] = (perCity[ct] || 0) + 1
const surat = companions.filter((c) => c.cities.includes('Surat'))
console.log('touched:', touched, '| total:', companions.length)
console.log('Surat roster:', surat.map((c) => `${c.name}|${c.category}|${c.tier}|v${c.verified}`))
console.log('Surat categories:', [...new Set(surat.map((c) => c.category))])
console.log('per-city:', perCity)
