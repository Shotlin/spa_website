import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-ivory/10 bg-noir-soft/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold">
              V
            </span>
            <span className="font-serif text-xl tracking-wide text-ivory">
              VIP <span className="text-gold-soft">Spa</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-dim/80">
            A consent-first, privacy-first platform for curated companionship and
            private social experiences. Discreet by design. Pan-India.
          </p>
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
          <p>© {new Date().getFullYear()} VIP Spa. All rights reserved. Members 18+ only.</p>
          <p className="tracking-wide">Built on consent, privacy, and mutual respect.</p>
        </div>
      </div>
    </footer>
  )
}
