import { useNavigate, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { Button, Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { HeartIcon, LockIcon, ShieldIcon, CheckIcon, iconMap } from '../components/icons'
import { companions, CITIES } from '../data/companions'
import { experiences, testimonials, privacyFeatures } from '../data/content'

type CategoryIcon = 'spark' | 'crown' | 'orchid' | 'lotus'

const categories: {
  id: string
  title: string
  description: string
  icon: CategoryIcon
  image: string
  links: { name: string; city: string }[]
}[] = [
  {
    id: 'call-girls',
    title: 'Call Girls',
    description: 'Verified independent female companions across India.',
    icon: 'spark',
    image: 'in-khopal-com-1', // Aanya — Call Girls
    links: [
      { name: 'Delhi', city: 'Delhi' },
      { name: 'Mumbai', city: 'Mumbai' },
      { name: 'Jaipur', city: 'Jaipur' },
    ],
  },
  {
    id: 'male-escorts',
    title: 'Male Escorts',
    description: 'Elite and verified male companions near you.',
    icon: 'crown',
    image: 'in-khopal-com-2', // Aarav — Male Escorts
    links: [],
  },
  {
    id: 'shemale-escorts',
    title: 'Shemale Escorts',
    description: 'Independent trans companions across India.',
    icon: 'orchid',
    image: 'tryst-link-bdsm-tsoliviarhodes-1', // Olivia — Shemale Escorts
    links: [],
  },
  {
    id: 'massages',
    title: 'Massages',
    description: 'Discreet spa and sensual massage sessions.',
    icon: 'lotus',
    image: 'in-khopal-com-massages-1', // Anaya — Massages
    links: [],
  },
]

// Photo-free decorative glyphs for the category tiles.
function CategoryGlyph({ icon }: { icon: CategoryIcon }) {
  const paths: Record<CategoryIcon, string> = {
    spark: 'M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z',
    crown: 'M4 8l4 4 4-7 4 7 4-4-1.5 11h-13L4 8z',
    orchid: 'M12 3c2.5 2 2.5 5 0 7-2.5-2-2.5-5 0-7zm0 7c3 0 5 2 5 5-3 0-5-2-5-5zm0 0c-3 0-5 2-5 5 3 0 5-2 5-5z',
    lotus: 'M12 4c1.5 2.5 1.5 5 0 7.5C10.5 9 10.5 6.5 12 4zM4 10c2.8.4 4.6 2.2 5.5 5C6.7 15 4.9 13.2 4 10zm16 0c-.9 3.2-2.7 5-5.5 5 .9-2.8 2.7-4.6 5.5-5z',
  }
  const cities: [string, string][] = [
    ['#c8a349', '#5a1220'],
    ['#9b1b2e', '#0c0708'],
    ['#d98a3d', '#3d0c16'],
    ['#cbb393', '#17100f'],
  ]
  const idx = { spark: 0, crown: 1, orchid: 2, lotus: 3 }[icon]
  const [a, b] = cities[idx]
  return (
    <div
      className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 backdrop-blur-sm"
      style={{ backgroundImage: `linear-gradient(140deg, ${a}66, ${b}aa)` }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-soft" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d={paths[icon]} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} className="relative isolate flex min-h-[44rem] items-end overflow-hidden md:min-h-[48rem] md:items-center md:overflow-visible">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Portrait
          image="scene-4"
          kind="decor"
          name="An elegant lounge evening"
          loading="eager"
          className="object-[64%_center] sm:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/65 via-noir/10 to-noir/0 md:bg-gradient-to-r md:from-noir/72 md:via-noir/46 md:to-noir/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/35 via-transparent to-transparent md:from-noir/20" />
      </motion.div>

      <Section className="relative flex min-h-[44rem] items-end pt-28 pb-7 sm:pb-10 md:block md:min-h-0 md:pt-32 md:pb-24">
        <motion.div
          style={{ opacity }}
          className="max-w-2xl rounded-[1.75rem] border border-ivory/12 bg-noir/45 p-5 shadow-[0_22px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-[3px] sm:p-7 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none"
        >
          <Reveal>
            <Eyebrow>Consent-first · Privacy-first · Pan-India</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-[2.7rem] leading-[0.93] tracking-tight text-ivory sm:text-6xl lg:text-7.5xl font-serif">
              The art of
              <span className="block italic text-gold-soft">refined connection.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-base font-light leading-relaxed text-ivory-dim sm:mt-7 sm:text-lg">
              A private and verified directory of companions across India. Browsing is secure, introductions are mutual, and discretion is guaranteed.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button to="/discover" className="w-full sm:w-auto">Browse Directory</Button>
              <Button to="/experiences" variant="ghost" className="w-full sm:w-auto">
                Our philosophy →
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
              {[
                { k: `${companions.length}+`, v: 'Curated profiles' },
                { k: '8', v: 'Cities pan-India' },
                { k: '24/7', v: 'Concierge & safety' },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-serif text-2xl text-gold-soft sm:text-3xl">{s.k}</div>
                  <div className="mt-1 text-[0.55rem] uppercase tracking-[0.14em] text-ivory-dim sm:text-[0.7rem] sm:tracking-[0.2em]">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </Section>
    </div>
  )
}

function CategorySection() {
  const navigate = useNavigate()

  return (
    <Section className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>Classifications</Eyebrow>
        <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Browse by Category</h2>
        <p className="mt-4 text-ivory-dim">Choose a classification to explore verified, independent companions.</p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <RevealItem key={cat.id}>
            <div
              onClick={() => navigate(`/discover?category=${encodeURIComponent(cat.title)}`)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/30 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-noir-soft/50"
            >
              {/* Contextual image header (matched to the category) */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                  <Portrait image={cat.image} name={cat.title} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                <div className="absolute left-4 top-4">
                  <CategoryGlyph icon={cat.icon} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-2xl text-ivory transition-colors group-hover:text-gold-soft">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{cat.description}</p>

                {cat.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-ivory/10 pt-5">
                    {cat.links.map((link) => (
                      <span
                        key={link.name}
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/discover?category=${encodeURIComponent(cat.title)}&city=${link.city}`)
                        }}
                        className="rounded-full border border-ivory/12 px-3 py-1 text-[0.68rem] uppercase tracking-wider text-gold-soft/80 transition-colors hover:border-gold/40 hover:text-gold"
                      >
                        {link.name}
                      </span>
                    ))}
                  </div>
                )}

                <span className="mt-auto pt-6 text-xs uppercase tracking-[0.2em] text-ivory-dim transition-colors group-hover:text-gold-soft">
                  Explore →
                </span>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function DiscoverPreview() {
  // City tabs (Surat leads), plus "All Cities". Live-filters the grid below.
  const cityTabs = CITIES
  const [city, setCity] = useState('Surat')

  const shown = useMemo(() => {
    const pool =
      city === 'All Cities'
        ? companions
        : companions.filter((c) => c.cities.includes(city))
    // Verified & higher tiers first so the strongest profiles lead.
    const rank = { Signature: 0, Elite: 1, Muse: 2 } as Record<string, number>
    return [...pool]
      .sort((a, b) => Number(b.verified) - Number(a.verified) || rank[a.tier] - rank[b.tier])
      .slice(0, 6)
  }, [city])

  return (
    <Section className="py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>Discover the Circle</Eyebrow>
          <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Companions near you</h2>
          <p className="mt-4 text-ivory-dim">
            Choose a city to preview verified companions. Every introduction is mutual and arranged privately.
          </p>
        </div>
        <Button to="/discover" variant="outline">Open full directory</Button>
      </Reveal>

      {/* City tabs */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2 rounded-2xl border border-ivory/10 bg-noir-soft/40 p-3">
          {cityTabs.map((c) => (
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
      </Reveal>

      {/* Live grid — keyed so it re-runs the reveal on every city change */}
      {shown.length > 0 ? (
        <RevealGroup key={city} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <RevealItem key={c.id}>
              <Link to={`/profile/${c.id}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                      <Portrait image={c.image} kind={c.imageKind} name={c.name} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
                    {c.verified && (
                      <span className="absolute left-3 top-3 rounded bg-gold px-1.5 py-0.5 text-[0.6rem] font-bold text-noir shadow-lg">
                        ★
                      </span>
                    )}
                    <span className="absolute right-3 top-3 rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-gold-soft backdrop-blur-sm">
                      {c.tier}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-serif text-xl text-ivory group-hover:text-gold-soft">{c.name}</h3>
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-dim">
                        {city === 'All Cities' ? c.city : city} · {c.category.replace(' Girls', '').replace(' Escorts', '')}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="mt-8 rounded-2xl border border-ivory/10 bg-noir-soft/40 py-12 text-center text-ivory-dim">
          No companions listed in {city} yet. <Link to="/discover" className="text-gold-soft hover:text-gold">Browse the full directory →</Link>
        </p>
      )}
    </Section>
  )
}

function ExperiencesPreview() {
  return (
    <Section className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>Curated Experiences</Eyebrow>
        <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Every evening, composed with intent</h2>
        <p className="mt-4 text-ivory-dim">
          From an unhurried dinner to a weekend by the coast, each experience is arranged around your comfort and privacy.
        </p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((e) => (
          <RevealItem key={e.id}>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Portrait image={e.scene} kind="decor" name={e.title} className="transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-5 text-[0.65rem] uppercase tracking-[0.24em] text-gold-soft">{e.duration}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
              <h3 className="mt-3 font-serif text-2xl text-ivory">{e.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-dim">{e.summary}</p>
              <Link
                to="/experiences"
                className="mt-5 text-xs uppercase tracking-[0.2em] text-gold-soft hover:text-gold"
              >
                Learn more →
              </Link>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Enquire privately', d: 'Send an encrypted enquiry using an alias if you wish.' },
    { n: '02', t: 'Get verified', d: 'A discreet, secure check confirms identity on both sides.' },
    { n: '03', t: 'Curated match', d: 'Your concierge proposes companions suited to the occasion.' },
    { n: '04', t: 'Meet with ease', d: 'Everything is arranged; you simply arrive and enjoy.' },
  ]
  return (
    <Section className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Four discreet steps</h2>
      </Reveal>
      <RevealGroup className="mt-14 grid gap-6 md:grid-cols-4">
        {steps.map((s) => (
          <RevealItem key={s.n}>
            <div className="h-full rounded-2xl border border-ivory/10 bg-noir-soft/40 p-7">
              <span className="font-serif text-4xl text-gold/40">{s.n}</span>
              <h3 className="mt-4 font-serif text-xl text-ivory">{s.t}</h3>
              <p className="mt-2 text-sm text-ivory-dim">{s.d}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function TrustSection() {
  return (
    <Section className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>Why the circle</Eyebrow>
        <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Built on consent and privacy</h2>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {privacyFeatures.map((f) => {
          const Icon = iconMap[f.icon]
          return (
            <RevealItem key={f.title}>
              <div className="h-full rounded-2xl border border-ivory/10 bg-noir-soft/40 p-7">
                <div className="h-8 w-8 text-gold"><Icon /></div>
                <h3 className="mt-4 font-serif text-xl text-ivory">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{f.body}</p>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

function Testimonials() {
  return (
    <Section className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>In their words</Eyebrow>
        <h2 className="mt-5 text-4xl text-ivory sm:text-5xl font-serif">Quietly, they return</h2>
      </Reveal>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <RevealItem key={i}>
            <figure className="flex h-full flex-col rounded-2xl border border-ivory/10 bg-noir-soft/40 p-8">
              <span className="font-serif text-5xl leading-none text-gold/30">“</span>
              <blockquote className="mt-2 flex-1 font-serif text-lg italic leading-relaxed text-ivory-dim">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-gold-soft">
                {t.author} · {t.meta}
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

function ClosingCta() {
  return (
    <Section className="py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-burgundy-deep/60 to-noir p-12 text-center md:p-16">
          <span className="eyebrow">Begin privately</span>
          <h2 className="mx-auto mt-5 max-w-xl text-4xl text-ivory sm:text-5xl font-serif">
            Ready to design your evening?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ivory-dim">
            Begin with a private enquiry. No detail is shared publicly, ever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/membership">Begin an enquiry</Button>
            <Link
              to="/discover"
              className="inline-flex items-center px-4 text-sm uppercase tracking-[0.2em] text-gold-soft hover:text-gold"
            >
              Browse the circle →
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-[0.7rem] uppercase tracking-[0.16em] text-ivory-dim/70">
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 text-gold"><HeartIcon /></span>Consent-first</span>
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 text-gold"><LockIcon /></span>Encrypted</span>
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 text-gold"><ShieldIcon /></span>Verified</span>
            <span className="inline-flex items-center gap-2"><span className="h-3.5 w-3.5 text-gold"><CheckIcon /></span>18+ only</span>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Home() {
  return (
    <div className="pb-16">
      <Hero />
      <CategorySection />
      <DiscoverPreview />
      <ExperiencesPreview />
      <HowItWorks />
      <TrustSection />
      <Testimonials />
      <ClosingCta />
    </div>
  )
}
