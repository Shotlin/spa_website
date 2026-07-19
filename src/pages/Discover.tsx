import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Section, Eyebrow, Button } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { companions, CITIES, CATEGORIES } from '../data/companions'

export function Discover() {
  const [searchParams] = useSearchParams()

  const initialCity = searchParams.get('city') || 'All Cities'
  const initialCategory = searchParams.get('category') || 'All Categories'

  const [city, setCity] = useState(initialCity)
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const cardsPerPage = 9

  // Sync state with query parameters
  useEffect(() => {
    if (searchParams.get('city')) setCity(searchParams.get('city') || 'All Cities')
    if (searchParams.get('category')) setCategory(searchParams.get('category') || 'All Categories')
  }, [searchParams])

  const filtered = useMemo(() => {
    return companions.filter((c) => {
      const cityOk = city === 'All Cities' || c.cities.includes(city)
      const categoryOk = category === 'All Categories' || c.category === category
      const q = query.trim().toLowerCase()
      const queryOk =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.interests.some((i) => i.toLowerCase().includes(q)) ||
        c.languages.some((l) => l.toLowerCase().includes(q))
      return cityOk && categoryOk && queryOk
    })
  }, [city, category, query])

  useEffect(() => {
    setPage(1)
  }, [city, category, query])

  const totalPages = Math.ceil(filtered.length / cardsPerPage)
  const pageCards = useMemo(() => {
    return filtered.slice((page - 1) * cardsPerPage, page * cardsPerPage)
  }, [filtered, page])

  return (
    <div className="pt-32">
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Discover</Eyebrow>
          <h1 className="mt-5 text-5xl text-ivory sm:text-6xl font-serif">The Circle</h1>
          <p className="mt-5 text-lg text-ivory-dim">
            A secure directory of companions across India. Browse with
            discretion; every introduction is mutual.
          </p>
        </Reveal>

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

        {/* Grid — keyed so it remounts and re-runs the reveal on every filter/page change */}
        <RevealGroup key={`${city}-${category}-${query}-${page}`} className="mt-8 grid gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {pageCards.map((c) => (
            <RevealItem key={c.id}>
              <Link to={`/profile/${c.id}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-500 hover:border-gold/30 hover:-translate-y-1">

                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                      <Portrait image={c.images[0]} name={c.name} />
                    </div>
                    
                    {/* Star Badge (Top-Left) */}
                    {c.verified && (
                      <span className="absolute left-3 top-3 rounded bg-gold text-noir px-1.5 py-0.5 text-[0.6rem] font-bold shadow-lg">
                        ★
                      </span>
                    )}

                    {/* Top Right Badges */}
                    <div className="absolute right-3 top-3 flex gap-1 pointer-events-none">
                      <span className="rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-ivory backdrop-blur-sm">
                        {c.category.replace(' Girls', '').replace(' Escorts', '')}
                      </span>
                      <span className="rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] text-ivory backdrop-blur-sm">
                        📷 {c.images.length}
                      </span>
                      <span className="rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] text-gold-soft font-semibold backdrop-blur-sm">
                        ₹{c.rate.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Content block below image */}
                  <div className="flex flex-1 flex-col p-4 bg-noir-soft/30 border-t border-ivory/5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-bold text-ivory group-hover:text-gold-soft transition-colors">{c.name}</h3>
                      <span className="text-[0.7rem] text-ivory-dim">{c.age} yrs</span>
                    </div>
                    <p className="mt-1 text-xs italic text-gold-soft line-clamp-1">{c.tagline}</p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between text-[0.7rem] text-ivory-dim">
                      <span className="flex items-center gap-1 font-light">
                        📍 {city === 'All Cities' ? c.city : city}, India
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Available
                      </span>
                    </div>
                  </div>

                </article>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 pb-12">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
                page === 1
                  ? 'border-ivory/5 text-ivory-dim/30 cursor-not-allowed'
                  : 'border-ivory/15 text-ivory-dim hover:border-gold/40 hover:text-gold-soft'
              }`}
            >
              ← Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-full w-8 h-8 flex items-center justify-center text-xs transition-colors ${
                  page === p
                    ? 'bg-gradient-to-r from-ruby to-burgundy text-ivory font-bold'
                    : 'border border-ivory/15 text-ivory-dim hover:border-gold/40 hover:text-gold-soft'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
                page === totalPages
                  ? 'border-ivory/5 text-ivory-dim/30 cursor-not-allowed'
                  : 'border-ivory/15 text-ivory-dim hover:border-gold/40 hover:text-gold-soft'
              }`}
            >
              Next →
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 py-20 text-center">
            <p className="font-serif text-2xl text-ivory">No companions match just yet</p>
            <p className="mt-3 text-ivory-dim">Try another filter or clear your search.</p>
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => { setCity('All Cities'); setCategory('All Categories'); setQuery('') }}>
                Reset filters
              </Button>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
