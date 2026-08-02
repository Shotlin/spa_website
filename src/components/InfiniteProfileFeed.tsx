import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Companion } from '../data/companions'
import { Portrait } from './Portrait'
import { ProfileContactActions } from './ProfileContactActions'
import type { SiteContactSettings } from '../lib/site-data'

const PAGE_SIZE = 8

function ProfileSkeletonCard({ index }: { index: number }) {
  return <article className="overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/35" aria-label="Profile placeholder"><div className="relative aspect-[3/4] animate-pulse bg-gradient-to-br from-noir-soft via-noir to-burgundy-deep/35"><span className="absolute right-4 top-4 rounded-full border border-gold/15 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-gold-soft/45">{String(index + 1).padStart(2, '0')}</span></div></article>
}

function ProfileCard({ companion, contacts }: { companion: Companion; contacts?: SiteContactSettings }) {
  const profileUrl = typeof window === 'undefined' ? `/profile/${companion.id}` : `${window.location.origin}/profile/${companion.id}`
  return (
    <article className="group overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/55 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45">
      <div className="relative aspect-[3/4] bg-noir">
        <Link to={`/profile/${companion.id}`} className="absolute inset-0 block">
          <div className="absolute inset-0 p-1 transition-transform duration-[1.2s] group-hover:scale-[1.015]"><Portrait image={companion.image} kind={companion.imageKind} name={companion.name} className="object-contain" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir/45 via-transparent to-transparent" />
          {companion.verified ? <span className="absolute left-3 top-3 rounded bg-gold px-1.5 py-0.5 text-[0.6rem] font-bold text-noir shadow-lg">★</span> : null}
          <span className="absolute right-3 top-3 rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-gold-soft backdrop-blur-sm">Surat</span>
        </Link>
      </div>
      <div className="border-t border-ivory/10 px-3 pb-3 pt-3">
        <Link to={`/profile/${companion.id}`} className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
          <div className="flex items-baseline justify-between gap-3"><h3 className="font-serif text-xl text-ivory transition-colors group-hover:text-gold-soft">{companion.name}</h3><span className="shrink-0 text-xs text-gold-soft">{companion.age} yrs</span></div>
          <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-ivory-dim">{companion.category.replace(' Girls', '').replace(' Escorts', '')}</p>
        </Link>
        <ProfileContactActions className="mt-3" name={companion.name} description={companion.description || companion.bio.join(' ') || companion.tagline} profileUrl={profileUrl} phone={contacts?.phone} whatsapp={contacts?.whatsapp} telegramUsername={contacts?.telegram} iconOnly />
      </div>
    </article>
  )
}

type InfiniteProfileFeedProps = { companions: Companion[]; title?: string; description?: string; className?: string; contacts?: SiteContactSettings }

export function InfiniteProfileFeed({ companions, title, description, className = '', contacts }: InfiniteProfileFeedProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => setVisibleCount(PAGE_SIZE), [companions])
  useEffect(() => {
    const node = sentinelRef.current
    if (!node || visibleCount >= companions.length) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisibleCount((current) => Math.min(current + PAGE_SIZE, companions.length)) }, { rootMargin: '560px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [companions.length, visibleCount])
  return (
    <section className={className} aria-label="Companion profiles">
      {title ? <div className="mb-5 max-w-2xl"><div className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-soft"><MapPin className="h-3.5 w-3.5" /> Surat live roster</div><h2 className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">{title}</h2>{description ? <p className="mt-3 text-ivory-dim">{description}</p> : null}</div> : null}
      {companions.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{companions.slice(0, visibleCount).map((companion) => <ProfileCard key={companion.id} companion={companion} contacts={contacts} />)}</div> : <div><div className="mb-5"><p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-soft">Profiles opening soon</p><h2 className="mt-3 font-serif text-3xl text-ivory">Your next introduction starts here</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: PAGE_SIZE }, (_, index) => <ProfileSkeletonCard key={index} index={index} />)}</div></div>}
      {companions.length && visibleCount < companions.length ? <div ref={sentinelRef} className="flex min-h-16 items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-gold-soft/70" aria-live="polite"><span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> Loading more profiles</div> : null}
    </section>
  )
}
