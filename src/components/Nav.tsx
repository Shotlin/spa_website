import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './ui'

const links = [
  { to: '/discover', label: 'Discover' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/membership', label: 'Membership' },
  { to: '/safety', label: 'Safety' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-ivory/10 bg-noir/80 py-3 backdrop-blur-xl'
          : 'border-b border-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-center gap-3" aria-label="VIP Spa home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold transition-colors group-hover:bg-gold/10">
            V
          </span>
          <span className="font-serif text-xl tracking-wide text-ivory">
            VIP <span className="text-gold-soft">Spa</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-xs uppercase tracking-[0.24em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-500 ${
                  isActive
                    ? 'text-gold-soft after:w-full'
                    : 'text-ivory-dim hover:text-ivory after:w-0 hover:after:w-full'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button to="/membership" variant="outline">Private Enquiry</Button>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          open ? 'max-h-96 border-t border-ivory/10' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 bg-noir/95 px-6 py-6 backdrop-blur-xl">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `py-3 text-sm uppercase tracking-[0.24em] ${isActive ? 'text-gold-soft' : 'text-ivory-dim'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3">
            <Button to="/membership" variant="outline" className="w-full">Private Enquiry</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
