import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Companion } from '../data/companions'
import { Portrait } from './Portrait'
import { ProfileContactActions } from './ProfileContactActions'
import type { SiteContactSettings } from '../lib/site-data'

const PAGE_SIZE = 6

function ProfileSkeletonCard({ index }: { index: number }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/35" aria-label="Profile placeholder">
      <div className="relative aspect-[4/5] animate-pulse bg-gradient-to-br from-noir-soft via-noir to-burgundy-deep/35">
        <div className="absolute inset-x-5 bottom-5 space-y-2">
          <div className="h-5 w-2/3 rounded-full bg-ivory/10" />
          <div className="h-3 w-1/2 rounded-full bg-gold/10" />
        </div>
        <span className="absolute right-4 top-4 rounded-full border border-gold/15 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-gold-soft/45">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="space-y-3 border-t border-ivory/10 p-4">
        <div className="h-3 w-full animate-pulse rounded-full bg-ivory/10" />
        <div className="h-3 w-4/5 animate-pulse rounded-full bg-ivory/5" />
        <div className="h-10 animate-pulse rounded-xl bg-gold/5" />
      </div>
    </article>
  )
}

function ProfileCard({ companion, contacts }: { companion: Companion; contacts?: SiteContactSettings }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30">
      <Link to={`/profile/${companion.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
            <Portrait image={companion.image} kind={companion.imageKind} name={companion.name} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
          {companion.verified ? <span className="absolute left-3 top-3 rounded bg-gold px-1.5 py-0.5 text-[0.6rem] font-bold text-noir shadow-lg">★</span> : null}
          <span className="absolute right-3 top-3 rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-gold-soft backdrop-blur-sm">{companion.tier}</span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-xl text-ivory group-hover:text-gold-soft">{companion.name}</h3>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ivory-dim">{companion.city} · {companion.category.replace(' Girls', '').replace(' Escorts', '')}</p>
          </div>
        </div>
      </Link>
      <div className="border-t border-ivory/10 bg-noir/30 p-4">
        <p className="min-h-[5rem] line-clamp-4 text-xs leading-relaxed text-ivory-dim/90">{companion.description || companion.bio.join(' ') || companion.tagline}</p>
        <ProfileContactActions name={companion.name} phone={contacts?.phone || companion.contactPhone} whatsapp={contacts?.whatsapp || companion.whatsappNumber} telegramUsername={contacts?.telegram || companion.telegramUsername} className="mt-3" />
      </div>
    </article>
  )
}

type InfiniteProfileFeedProps = {
  companions: Companion[]
  title?: string
  description?: string
  className?: string
  contacts?: SiteContactSettings
}

export function InfiniteProfileFeed({ companions, title, description, className = '', contacts }: InfiniteProfileFeedProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [companions])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || visibleCount >= companions.length) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((current) => Math.min(current + PAGE_SIZE, companions.length))
      },
      { rootMargin: '480px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [companions.length, visibleCount])

  return (
    <section className={className} aria-label="Companion profiles">
      {title ? (
        <div className="mb-8 max-w-2xl">
          <div className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-soft"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Live profile feed</div>
          <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">{title}</h2>
          {description ? <p className="mt-4 text-ivory-dim">{description}</p> : null}
        </div>
      ) : null}

      {companions.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companions.slice(0, visibleCount).map((companion) => <ProfileCard key={companion.id} companion={companion} contacts={contacts} />)}
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-soft">Profiles opening soon</p>
              <h2 className="mt-3 font-serif text-3xl text-ivory">Your next introduction starts here</h2>
            </div>
            <p className="hidden text-right text-xs uppercase tracking-[0.16em] text-ivory-dim/60 sm:block">Client-ready placeholders</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }, (_, index) => <ProfileSkeletonCard key={index} index={index} />)}
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-ivory-dim/60">Add profiles and photos in Studio to fill this feed.</p>
        </div>
      )}

      {companions.length && visibleCount < companions.length ? (
        <div ref={sentinelRef} className="flex min-h-20 items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-gold-soft/70" aria-live="polite">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> Loading more profiles
        </div>
      ) : null}
    </section>
  )
}
