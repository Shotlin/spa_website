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
  const cardDescription = companion.description || companion.tagline
  return (
    <article className="group overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/55 transition-all duration-500 hover:-translate-y-1 hover:border-gold/45">
      <div className="relative aspect-[3/4] bg-noir">
        <Link to={`/profile/${companion.id}`} className="absolute inset-0 block">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.015]"><Portrait image={companion.image} kind={companion.imageKind} name={companion.name} className="object-contain" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir/45 via-transparent to-transparent" />
          <span className="absolute right-3 top-3 rounded bg-noir/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-gold-soft backdrop-blur-sm">Surat</span>
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-noir via-noir/75 to-transparent" />
        <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-noir/70 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ivory shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.95)]" aria-hidden="true" />Available now</div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <Link to={`/profile/${companion.id}`} className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-gold">
            <div className="flex items-end justify-between gap-3"><div><p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">{companion.category.replace(' Girls', '').replace(' Escorts', '')}</p><h3 className="mt-1 font-serif text-2xl leading-none text-ivory transition-colors group-hover:text-gold-soft">{companion.name}</h3></div><span className="mb-0.5 shrink-0 text-sm font-medium text-ivory">{companion.age} yrs</span></div>
            <p className="mt-2 line-clamp-2 text-sm leading-snug text-ivory-dim">{cardDescription}</p>
          </Link>
          <ProfileContactActions className="mt-2" name={companion.name} description={companion.description || companion.bio.join(' ') || companion.tagline} profileUrl={profileUrl} phone={contacts?.phone} whatsapp={contacts?.whatsapp} telegramUsername={contacts?.telegram} iconOnly />
        </div>
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
