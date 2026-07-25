import { Portrait } from './Portrait'
import { Button } from './ui'
import { useSiteData } from '../lib/site-data'

type OfferPlacement = 'home' | 'membership' | 'directory'

export function OfferBanner({ placement, className = '' }: { placement: OfferPlacement; className?: string }) {
  const { offers } = useSiteData()
  const offer = offers.find((item) => item.placement === placement)

  if (!offer) return null

  return (
    <div className={`relative isolate overflow-hidden rounded-3xl border border-gold/25 bg-noir-soft/85 shadow-[0_22px_55px_-35px_rgba(0,0,0,0.9)] ${className}`}>
      {offer.image_url ? (
        <div className="absolute inset-0 -z-10 opacity-35">
          <Portrait image={offer.image_url} name={offer.image_alt || offer.title} className="object-[center_38%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/85 to-noir/35" />
        </div>
      ) : null}
      <div className="flex flex-col gap-5 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Private offer{offer.code ? ` · ${offer.code}` : ''}</p>
          <h2 className="mt-2 font-serif text-3xl text-ivory sm:text-4xl">{offer.title}</h2>
          {offer.body ? <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{offer.body}</p> : null}
        </div>
        {offer.cta_label && offer.cta_href ? <Button to={offer.cta_href} className="shrink-0">{offer.cta_label}</Button> : null}
      </div>
    </div>
  )
}
