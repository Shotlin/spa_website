import { useLayoutEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const storageKey = 'vip-spa-theme'
const changeEvent = 'vip-spa-theme-change'

function savedTheme(): Theme {
  try {
    return window.localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

function broadcastTheme(theme: Theme) {
  window.dispatchEvent(new CustomEvent<Theme>(changeEvent, { detail: theme }))
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useLayoutEffect(() => {
    const stored = savedTheme()
    setTheme(stored)
    applyTheme(stored)

    const syncTheme = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      const nextTheme: Theme = event.newValue === 'light' ? 'light' : 'dark'
      setTheme(nextTheme)
      applyTheme(nextTheme)
    }

    const syncInPage = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail
      if (nextTheme !== 'dark' && nextTheme !== 'light') return
      setTheme(nextTheme)
      applyTheme(nextTheme)
    }

    window.addEventListener('storage', syncTheme)
    window.addEventListener(changeEvent, syncInPage)
    return () => {
      window.removeEventListener('storage', syncTheme)
      window.removeEventListener(changeEvent, syncInPage)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    applyTheme(nextTheme)

    try {
      window.localStorage.setItem(storageKey, nextTheme)
    } catch {
      // The visual preference still works when storage is unavailable.
    }

    // Both responsive nav variants stay in sync while CSS decides which is visible.
    broadcastTheme(nextTheme)
  }

  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      aria-pressed={isLight}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className={`group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/15 bg-noir/45 text-gold-soft shadow-[0_8px_24px_-16px_rgba(12,7,8,0.9)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-gold/10 hover:text-gold focus-visible:outline-offset-2 ${className}`}
    >
      <span className="sr-only">{isLight ? 'Light mode enabled' : 'Dark mode enabled'}</span>
      <span aria-hidden="true" className="relative block h-4 w-4">
        <span
          className={`absolute inset-0 transition-all duration-500 ${
            isLight ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-full w-full">
            <path d="M20.7 15.5A8.2 8.2 0 0 1 8.5 3.3 8.2 8.2 0 1 0 20.7 15.5Z" />
          </svg>
        </span>
        <span
          className={`absolute inset-0 transition-all duration-500 ${
            isLight ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-full w-full">
            <circle cx="12" cy="12" r="3.4" />
            <path d="M12 2.5v2.1M12 19.4v2.1M21.5 12h-2.1M4.6 12H2.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5M18.7 18.7l-1.5-1.5M6.8 6.8 5.3 5.3" />
          </svg>
        </span>
      </span>
    </button>
  )
}
