import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './ui'
import { ThemeToggle } from './ThemeToggle'

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
          ? 'border-b border-ivory/10 bg-noir/85 py-2.5 backdrop-blur-xl'
          : 'border-b border-ivory/10 bg-noir/75 py-3 backdrop-blur-xl md:border-transparent md:bg-transparent md:py-5 md:backdrop-blur-none'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="VIP Spa home">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 font-serif text-lg text-gold transition-colors group-hover:bg-gold/10">
            V
          </span>
          <span className="whitespace-nowrap font-serif text-lg tracking-wide text-ivory sm:text-xl">
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

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/membership" variant="outline">Private Enquiry</Button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-ivory transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`transition-all duration-500 md:hidden ${
          open
            ? 'max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ivory/10'
            : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col gap-1 bg-noir/95 px-4 py-5 backdrop-blur-xl sm:px-6 sm:py-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex h-11 items-center text-sm uppercase tracking-[0.24em] ${isActive ? 'text-gold-soft' : 'text-ivory-dim'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-3">
            <Button to="/membership" variant="outline" className="min-h-11 w-full">Private Enquiry</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
