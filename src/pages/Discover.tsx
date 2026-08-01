import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Section, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { OfferBanner } from '../components/OfferBanner'
import { ManagedContentBlocks } from '../components/ManagedContentBlocks'
import { CITIES, CATEGORIES } from '../data/companions'
import { getSiteContactSettings, useSiteData } from '../lib/site-data'
import { InfiniteProfileFeed } from '../components/InfiniteProfileFeed'

export function Discover() {
  const [searchParams] = useSearchParams()
  const { companions, settings } = useSiteData()
  const contacts = getSiteContactSettings(settings)

  const initialCity = 'Surat'
  const initialCategory = searchParams.get('category') || 'All Categories'

  const [city, setCity] = useState(initialCity)
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')

  // Sync state with query parameters
  useEffect(() => {
    setCity('Surat')
    if (searchParams.get('category')) setCategory(searchParams.get('category') || 'All Categories')
  }, [searchParams])

  const filtered = useMemo(() => {
    return companions.filter((c) => {
      const cityOk = c.cities.includes('Surat')
      const categoryOk = category === 'All Categories' || c.category === category
      const q = query.trim().toLowerCase()
      const queryOk =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.interests.some((i) => i.toLowerCase().includes(q)) ||
        c.languages.some((l) => l.toLowerCase().includes(q))
      return cityOk && categoryOk && queryOk
    })
  }, [category, companions, query])

  return (
    <div className="pt-32">
      <Section>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-ivory/10 bg-noir-soft/40">
          <div className="absolute inset-0">
            <Portrait
              image="scene-2"
              kind="decor"
              name="An intimate lounge gathering"
              loading="eager"
              className="object-[63%_center] opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/85 to-noir/25" />
          </div>
          <Reveal className="relative max-w-2xl px-7 py-16 sm:px-12 sm:py-20">
            <Eyebrow>Discover</Eyebrow>
            <h1 className="mt-5 text-5xl text-ivory sm:text-6xl font-serif">The Circle</h1>
            <p className="mt-5 text-lg text-ivory-dim">
              A curated Surat directory. Browse with discretion; every
              introduction is mutual.
            </p>
          </Reveal>
        </div>

        <OfferBanner placement="directory" className="mt-6" />

        {/* Filters */}
        <Reveal delay={0.1} className="mt-12 space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-ivory/10 bg-noir-soft/30 p-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                  category === cat
                    ? 'bg-gradient-to-r from-ruby to-burgundy text-ivory font-bold'
                    : 'border border-ivory/15 text-ivory-dim hover:border-gold/40 hover:text-gold-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* City Filter & Search */}
          <div className="flex flex-col gap-5 rounded-2xl border border-ivory/10 bg-noir-soft/50 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                    city === c
                      ? 'bg-gradient-to-r from-ruby to-burgundy text-ivory'
                      : 'border border-ivory/15 text-ivory-dim hover:border-gold/40 hover:text-gold-soft'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative md:w-64">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Interests, language, name…"
                className="w-full rounded-full border border-ivory/15 bg-noir/60 px-5 py-2.5 text-sm text-ivory placeholder:text-ivory-dim/50 focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory-dim/70">
          {filtered.length} card{filtered.length === 1 ? '' : 's'}
          {city !== 'All Cities' && ` in ${city}`}
          {category !== 'All Categories' && ` · ${category}`}
        </p>

        <InfiniteProfileFeed companions={filtered} contacts={contacts} className="mt-6 pb-8" />
      </Section>
      <ManagedContentBlocks page="discover" />
    </div>
  )
}
