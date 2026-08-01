import { Link } from 'react-router-dom'
import { getSiteContactSettings, getSiteIdentity, useSiteData } from '../lib/site-data'
import { profileContactDetails } from './ProfileContactActions'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { Phone } from 'lucide-react'

export function Footer() {
  const { settings } = useSiteData()
  const identity = getSiteIdentity(settings)
  const universalContacts = getSiteContactSettings(settings)
  const contact = profileContactDetails(universalContacts.phone, universalContacts.whatsapp, universalContacts.telegram)

  return (
    <footer className="relative mt-32 border-t border-ivory/10 bg-noir-soft/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold">
              V
            </span>
            <span className="font-serif text-xl tracking-wide text-ivory">
              {identity.siteName}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-dim/80">
            A consent-first, privacy-first platform for curated companionship and
            private social experiences. Discreet by design. Pan-India.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={contact.telHref} className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-3 py-2 text-[0.62rem] uppercase tracking-[0.12em] text-gold-soft hover:border-gold"><Phone className="h-3.5 w-3.5" /> Call</a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/35 px-3 py-2 text-[0.62rem] uppercase tracking-[0.12em] text-[#72e79a] hover:border-[#25D366]"><FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp</a>
            <a href={contact.telegramHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#2AABEE]/35 px-3 py-2 text-[0.62rem] uppercase tracking-[0.12em] text-[#8bd7ff] hover:border-[#2AABEE]"><FaTelegramPlane className="h-3.5 w-3.5" /> Telegram</a>
          </div>
          {identity.conciergeEmail || identity.conciergePhone ? <p className="mt-4 text-xs tracking-wide text-gold-soft">{identity.conciergeEmail}{identity.conciergeEmail && identity.conciergePhone ? ' · ' : ''}{identity.conciergePhone}</p> : null}
        </div>

        <div>
          <h4 className="eyebrow mb-4">Explore</h4>
          <ul className="space-y-3 text-sm text-ivory-dim">
            <li><Link to="/discover" className="hover:text-gold-soft">Discover</Link></li>
            <li><Link to="/experiences" className="hover:text-gold-soft">Experiences</Link></li>
            <li><Link to="/membership" className="hover:text-gold-soft">Membership</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Assurance</h4>
          <ul className="space-y-3 text-sm text-ivory-dim">
            <li><Link to="/safety" className="hover:text-gold-soft">Safety & Conduct</Link></li>
            <li><Link to="/about" className="hover:text-gold-soft">Privacy & About</Link></li>
            <li><Link to="/safety" className="hover:text-gold-soft">Identity Verification</Link></li>
            <li><Link to="/faq" className="hover:text-gold-soft">Help Desk & FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-ivory-dim/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} {identity.siteName}. All rights reserved. Members 18+ only.</p>
          <p className="tracking-wide">Built on consent, privacy, and mutual respect.</p>
        </div>
      </div>
    </footer>
  )
}
