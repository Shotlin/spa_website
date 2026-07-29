import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  ArrowUpRight,
  BadgePercent,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FilePenLine,
  ImagePlus,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  PanelsTopLeft,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UsersRound,
  X,
} from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import {
  archiveAdminProfile,
  deactivateOffer,
  getAdminRole,
  getCurrentUser,
  listAdminProfiles,
  listContentBlocks,
  listMediaAssets,
  listOffers,
  listSiteSettings,
  requestAdminPasswordReset,
  saveAdminProfile,
  saveContentBlock,
  saveOffer,
  saveSiteSetting,
  signInAdminWithPassword,
  signOutAdmin,
  updateAdminPassword,
  uploadMediaAsset,
  type AdminProfile,
  type ContentBlock,
  type MediaAsset,
  type Offer,
  type SiteSetting,
} from '../lib/admin-api'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import {
  getHomeHero,
  getSiteIdentity,
  toEditableProfile,
  type HomeHeroContent,
  type ProfileInputState,
} from '../lib/site-data'
import './admin.css'

type AdminSection = 'overview' | 'profiles' | 'media' | 'content' | 'offers' | 'settings'

type AdminData = {
  profiles: AdminProfile[]
  media: MediaAsset[]
  content: ContentBlock[]
  offers: Offer[]
  settings: SiteSetting[]
}

const emptyAdminData: AdminData = {
  profiles: [],
  media: [],
  content: [],
  offers: [],
  settings: [],
}

const navItems: { section: AdminSection; label: string; href: string; icon: LucideIcon }[] = [
  { section: 'overview', label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { section: 'profiles', label: 'Profiles', href: '/admin/profiles', icon: UsersRound },
  { section: 'media', label: 'Media', href: '/admin/media', icon: ImagePlus },
  { section: 'content', label: 'Content', href: '/admin/content', icon: PanelsTopLeft },
  { section: 'offers', label: 'Offers', href: '/admin/offers', icon: BadgePercent },
  { section: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings2 },
]

const categoryOptions = ['Call Girls', 'Male Escorts', 'Shemale Escorts', 'Massages']
const cityOptions = ['Surat', 'Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa', 'Hyderabad', 'Kolkata']

function sectionFromPath(pathname: string): AdminSection {
  if (pathname.startsWith('/admin/profiles')) return 'profiles'
  if (pathname.startsWith('/admin/media')) return 'media'
  if (pathname.startsWith('/admin/content')) return 'content'
  if (pathname.startsWith('/admin/offers')) return 'offers'
  if (pathname.startsWith('/admin/settings')) return 'settings'
  return 'overview'
}

function profileIdFromPath(pathname: string) {
  const match = pathname.match(/^\/admin\/profiles\/([^/]+)$/)
  return match && match[1] !== 'new' ? decodeURIComponent(match[1]) : null
}

function offerIdFromPath(pathname: string) {
  const match = pathname.match(/^\/admin\/offers\/([^/]+)$/)
  return match && match[1] !== 'new' ? decodeURIComponent(match[1]) : null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

function fromCsv(value: string) {
  return Array.from(new Set(value.split(',').map((item) => item.trim()).filter(Boolean)))
}

function toCsv(values: string[]) {
  return values.join(', ')
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toLocalDateTime(value: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function toIsoDateTime(value: string) {
  return value ? new Date(value).toISOString() : null
}

function formatDate(value: string | null) {
  if (!value) return 'Not scheduled'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Not scheduled'
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

function statusLabel(live: boolean) {
  return live ? 'Live' : 'Draft'
}

function StatusPill({ live, muted = false }: { live: boolean; muted?: boolean }) {
  const className = muted ? 'admin-status-muted' : live ? 'admin-status-live' : 'admin-status-draft'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.11em] ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-current' : 'bg-current/70'}`} />
      {muted ? 'Paused' : statusLabel(live)}
    </span>
  )
}

function AdminButton({
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger'
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type={type}
      className={`admin-button inline-flex items-center justify-center gap-2 px-4 admin-button-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  )
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-gold-soft">{eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl leading-none text-[var(--admin-ink)] sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--admin-muted)] sm:text-base">{description}</p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  )
}

function MediaThumb({ src, alt, className = '' }: { src: string | null; alt: string; className?: string }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  }

  return (
    <div className={`grid h-full w-full place-items-center bg-[linear-gradient(145deg,var(--color-burgundy-deep),var(--color-noir-soft))] ${className}`}>
      <ImagePlus className="h-6 w-6 text-gold/70" aria-hidden="true" />
    </div>
  )
}

function FullPageState({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="admin-app grid min-h-[100dvh] place-items-center px-5 py-10">
      <div className="admin-panel w-full max-w-lg rounded-3xl p-7 text-center sm:p-10">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-5 font-serif text-4xl text-[var(--admin-ink)]">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--admin-muted)]">{description}</p>
        {children ? <div className="mt-7 text-left">{children}</div> : null}
      </div>
    </div>
  )
}

export function AdminApp() {
  return <AdminAuthGate />
}

function AdminAuthGate() {
  const [status, setStatus] = useState<'checking' | 'unconfigured' | 'signed-out' | 'not-admin' | 'ready'>('checking')
  const [user, setUser] = useState<User | null>(null)
  const [passwordRecovery, setPasswordRecovery] = useState(false)

  const refreshAccess = useCallback(async (sessionUser?: User | null) => {
    if (!isSupabaseConfigured) {
      setStatus('unconfigured')
      setUser(null)
      return
    }

    const currentUser = sessionUser === undefined ? await getCurrentUser() : sessionUser
    setUser(currentUser)
    if (!currentUser) {
      setStatus('signed-out')
      return
    }

    try {
      const role = await getAdminRole(currentUser.id)
      setStatus(role ? 'ready' : 'not-admin')
    } catch {
      setStatus('not-admin')
    }
  }, [])

  useEffect(() => {
    void refreshAccess()
    let isMounted = true
    const listener = supabase?.auth.onAuthStateChange((event, session) => {
      // Supabase warns that calling another async Supabase API directly inside
      // this callback can deadlock the client. Defer the role lookup instead.
      if (event === 'PASSWORD_RECOVERY') setPasswordRecovery(true)
      if (event === 'SIGNED_OUT') setPasswordRecovery(false)
      window.setTimeout(() => {
        if (isMounted) void refreshAccess(session?.user ?? null)
      }, 0)
    })
    return () => {
      isMounted = false
      listener?.data.subscription.unsubscribe()
    }
  }, [refreshAccess])

  if (status === 'checking') {
    return <FullPageState icon={LoaderCircle} title="Opening Studio" description="Checking your secure workspace…" />
  }

  if (status === 'unconfigured') {
    return (
      <FullPageState
        icon={Settings2}
        title="Connect Supabase"
        description="Studio is built and protected, but it needs this site's public Supabase connection before anyone can sign in or publish content."
      >
        <div className="admin-subtle-panel rounded-2xl p-4">
          <p className="admin-label">Required Vercel variables</p>
          <code className="block overflow-x-auto text-xs leading-6 text-[var(--admin-ink)]">VITE_SUPABASE_URL{`\n`}VITE_SUPABASE_PUBLISHABLE_KEY</code>
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-[var(--admin-muted)]">
          Only the publishable key belongs in the browser. Never use a service-role key here.
        </p>
      </FullPageState>
    )
  }

  if (status === 'signed-out') return <AdminLogin />

  if (passwordRecovery && user) {
    return <AdminPasswordReset onComplete={() => setPasswordRecovery(false)} />
  }

  if (status === 'not-admin') {
    return (
      <FullPageState
        icon={ShieldCheck}
        title="Studio access required"
        description="You are signed in, but this account is not listed as a Studio administrator. This is intentional: the dashboard never promotes a browser user into an admin."
      >
        {user ? (
          <div className="admin-subtle-panel rounded-2xl p-4">
            <p className="admin-label">Signed-in user ID</p>
            <code className="block break-all text-xs text-[var(--admin-ink)]">{user.id}</code>
            <p className="mt-3 admin-help">Add this ID to <code>public.admin_users</code> with role <code>owner</code> or <code>editor</code> after creating the account in Supabase Auth.</p>
          </div>
        ) : null}
        <div className="mt-4 flex justify-center">
          <AdminButton variant="secondary" onClick={() => void signOutAdmin()}>Sign out</AdminButton>
        </div>
      </FullPageState>
    )
  }

  return <AdminShell user={user} />
}

function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [resetPending, setResetPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')
    const normalizedEmail = email.trim()
    if (!normalizedEmail) {
      setError('Enter your administrator email address.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }

    setPending(true)
    try {
      await signInAdminWithPassword(normalizedEmail, password)
      setMessage('Signed in. Opening Studio...')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not sign in.')
    } finally {
      setPending(false)
    }
  }

  const requestPasswordReset = async () => {
    setError('')
    setMessage('')
    const normalizedEmail = email.trim()
    if (!normalizedEmail) {
      setError('Enter your administrator email address first.')
      return
    }

    setResetPending(true)
    try {
      await requestAdminPasswordReset(normalizedEmail)
      setMessage('Check your inbox for a password reset email. Use it to choose a new password, then sign in here with your email and password.')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not send the password reset email.')
    } finally {
      setResetPending(false)
    }
  }

  return (
    <FullPageState
      icon={ShieldCheck}
      title="VIP Spa Studio"
      description="A private workspace for publishing profiles, images, offers, banners, and page content."
    >
      <form onSubmit={submit} className="space-y-4">
        <label>
          <span className="admin-label">Administrator email</span>
          <input
            className="admin-field"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          <span className="admin-label">Password</span>
          <input
            className="admin-field"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        {error ? <p className="text-sm text-[var(--admin-danger)]">{error}</p> : null}
        {message ? <p className="text-sm text-[var(--admin-success)]">{message}</p> : null}
        <AdminButton type="submit" loading={pending} className="w-full">
          <span>Sign in to Studio</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </AdminButton>
        <AdminButton
          variant="quiet"
          className="w-full"
          loading={resetPending}
          disabled={pending}
          onClick={() => void requestPasswordReset()}
        >
          Forgot password?
        </AdminButton>
        <p className="pt-1 text-center text-xs leading-relaxed text-[var(--admin-muted)]">
          Sign in with your email and password. Access is checked again in the database after sign-in.
        </p>
      </form>
    </FullPageState>
  )
}

function AdminPasswordReset({ onComplete }: { onComplete: () => void }) {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 8) {
      setError('Choose a password with at least 8 characters.')
      return
    }
    if (password !== confirmation) {
      setError('Your passwords do not match.')
      return
    }

    setPending(true)
    try {
      await updateAdminPassword(password)
      setPassword('')
      setConfirmation('')
      setMessage('Password updated successfully.')
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update your password.')
    } finally {
      setPending(false)
    }
  }

  return (
    <FullPageState
      icon={ShieldCheck}
      title="Choose a new password"
      description="Set a password for your Studio account. Future sign-ins will use your email and password."
    >
      <form onSubmit={submit} className="space-y-4">
        <label>
          <span className="admin-label">New password</span>
          <input
            className="admin-field"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            required
          />
        </label>
        <label>
          <span className="admin-label">Confirm new password</span>
          <input
            className="admin-field"
            type="password"
            autoComplete="new-password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder="Repeat your new password"
            required
          />
        </label>
        {error ? <p className="text-sm text-[var(--admin-danger)]">{error}</p> : null}
        {message ? <p className="text-sm text-[var(--admin-success)]">{message}</p> : null}
        <AdminButton type="submit" loading={pending} className="w-full">
          Save new password
        </AdminButton>
        {message ? (
          <AdminButton variant="secondary" className="w-full" onClick={onComplete}>
            Continue to Studio
          </AdminButton>
        ) : null}
      </form>
    </FullPageState>
  )
}

function AdminShell({ user }: { user: User | null }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [data, setData] = useState<AdminData>(emptyAdminData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const section = sectionFromPath(location.pathname)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [profiles, media, content, offers, settings] = await Promise.all([
        listAdminProfiles(),
        listMediaAssets(),
        listContentBlocks(),
        listOffers(),
        listSiteSettings(),
      ])
      setData({ profiles, media, content, offers, settings })
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load the Studio workspace.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const signOut = async () => {
    await signOutAdmin()
    navigate('/admin', { replace: true })
  }

  const renderPage = () => {
    if (loading) return <WorkspaceLoading />
    if (error) return <WorkspaceError error={error} onRetry={() => void refresh()} />

    const common = { data, refresh, user }
    switch (section) {
      case 'profiles':
        return <ProfilesPage {...common} />
      case 'media':
        return <MediaPage {...common} />
      case 'content':
        return <ContentPage {...common} />
      case 'offers':
        return <OffersPage {...common} />
      case 'settings':
        return <SettingsPage {...common} />
      default:
        return <OverviewPage {...common} />
    }
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r px-4 py-5 lg:flex">
        <StudioMark />
        <nav className="mt-9 space-y-1" aria-label="Studio navigation">
          {navItems.map((item) => (
            <SidebarLink key={item.section} item={item} active={section === item.section} />
          ))}
        </nav>
        <div className="mt-auto space-y-3 border-t border-[var(--admin-border)] pt-4">
          <Link to="/" className="admin-nav-link flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View public site
          </Link>
          <button className="admin-nav-link flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-[100dvh] pb-24 lg:ml-64 lg:pb-0">
        <header className="sticky top-0 z-20 border-b border-[var(--admin-border)] bg-[color:var(--admin-canvas)]/95 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-9">
          <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <button
                className="admin-button admin-button-secondary grid h-11 w-11 place-items-center px-0"
                aria-label={mobileMenuOpen ? 'Close Studio menu' : 'Open Studio menu'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <Link to="/admin" className="truncate font-serif text-xl text-[var(--admin-ink)]">Studio</Link>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--admin-muted)]">Content operations</p>
              <p className="mt-0.5 text-sm text-[var(--admin-ink)]">{user?.email || 'Administrator'}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="admin-button admin-button-secondary grid h-11 w-11 place-items-center px-0" onClick={() => void refresh()} aria-label="Refresh Studio data">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
              </button>
              <ThemeToggle />
              <Link to="/" className="admin-button admin-button-secondary hidden items-center gap-2 px-4 sm:inline-flex">
                <span>View site</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        {mobileMenuOpen ? <MobileMenu section={section} onSignOut={signOut} /> : null}
        <div className="mx-auto max-w-[100rem] px-4 py-7 sm:px-6 sm:py-9 lg:px-9">{renderPage()}</div>
      </main>

      <nav className="admin-mobile-bottom admin-sidebar fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t px-1 pt-1 lg:hidden" aria-label="Studio mobile navigation">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon
          const active = section === item.section
          return (
            <Link key={item.section} to={item.href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[0.57rem] font-bold uppercase tracking-[0.08em] ${active ? 'text-gold-soft' : 'text-[var(--admin-muted)]'}`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function StudioMark() {
  return (
    <Link to="/admin" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 font-serif text-xl text-gold">V</span>
      <span>
        <span className="block font-serif text-xl leading-none text-[var(--admin-ink)]">VIP Spa</span>
        <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-soft">Studio</span>
      </span>
    </Link>
  )
}

function SidebarLink({
  item,
  active,
}: {
  item: { section: AdminSection; label: string; href: string; icon: LucideIcon }
  active: boolean
}) {
  const Icon = item.icon
  return (
    <Link to={item.href} data-active={active} className="admin-nav-link flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {item.label}
    </Link>
  )
}

function MobileMenu({ section, onSignOut }: { section: AdminSection; onSignOut: () => Promise<void> }) {
  return (
    <div className="admin-sidebar fixed inset-x-0 top-[69px] z-20 border-b px-4 py-4 shadow-2xl lg:hidden">
      <nav className="grid gap-1" aria-label="Studio menu">
        {navItems.map((item) => (
          <SidebarLink key={item.section} item={item} active={section === item.section} />
        ))}
        <Link to="/" className="admin-nav-link mt-2 flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View public site
        </Link>
        <button className="admin-nav-link flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-sm font-medium" onClick={() => void onSignOut()}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </nav>
    </div>
  )
}

function WorkspaceLoading() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="text-center">
        <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-gold" aria-hidden="true" />
        <p className="mt-3 text-sm text-[var(--admin-muted)]">Loading Studio data…</p>
      </div>
    </div>
  )
}

function WorkspaceError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="admin-panel mx-auto mt-12 max-w-xl rounded-3xl p-7 text-center">
      <AlertTriangle className="mx-auto h-7 w-7 text-[var(--admin-danger)]" aria-hidden="true" />
      <h2 className="mt-4 font-serif text-3xl text-[var(--admin-ink)]">Studio needs attention</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--admin-muted)]">{error}</p>
      <AdminButton variant="secondary" className="mt-6" onClick={onRetry}><RefreshCw className="h-4 w-4" /> Try again</AdminButton>
    </div>
  )
}

function OverviewPage({ data }: { data: AdminData; refresh: () => Promise<void>; user: User | null }) {
  const navigate = useNavigate()
  const publishedProfiles = data.profiles.filter((profile) => profile.published)
  const activeOffers = data.offers.filter((offer) => offer.active)
  const liveBlocks = data.content.filter((block) => block.published)
  const hero = getHomeHero(Object.fromEntries(data.content.map((block) => [block.key, block])))

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="VIP Spa Studio"
        title="Keep the site current."
        description="Publish a profile, replace the hero image, place an offer, or update a page block from one calm control room."
        actions={<><AdminButton variant="secondary" onClick={() => navigate('/admin/media')}><UploadCloud className="h-4 w-4" /> Upload media</AdminButton><AdminButton onClick={() => navigate('/admin/profiles/new')}><Plus className="h-4 w-4" /> New profile</AdminButton></>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={UsersRound} label="Live profiles" value={publishedProfiles.length} detail={`${data.profiles.length} total listings`} />
        <Kpi icon={ImagePlus} label="Media library" value={data.media.length} detail="Images ready to place" />
        <Kpi icon={BadgePercent} label="Active offers" value={activeOffers.length} detail={`${data.offers.length} offer records`} />
        <Kpi icon={FilePenLine} label="Published blocks" value={liveBlocks.length} detail="Page content currently live" />
      </div>

      <section className="admin-panel overflow-hidden rounded-3xl">
        <div className="flex flex-col gap-4 border-b border-[var(--admin-border)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[0.67rem] font-bold uppercase tracking-[0.16em] text-gold-soft">What is live</p>
            <h2 className="mt-1 font-serif text-3xl text-[var(--admin-ink)]">The public front door</h2>
          </div>
          <AdminButton variant="quiet" onClick={() => navigate('/admin/content')}>Edit homepage <ChevronRight className="h-4 w-4" /></AdminButton>
        </div>
        <div className="grid gap-px bg-[var(--admin-border)] lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <article className="bg-[var(--admin-panel)] p-5 sm:p-6">
            <div className="flex gap-4">
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--admin-border)] sm:h-28 sm:w-28">
                <MediaThumb src={hero.imageUrl || null} alt="Current homepage hero" />
              </div>
              <div className="min-w-0">
                <StatusPill live />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--admin-muted)]">Homepage hero</p>
                <h3 className="mt-1 truncate font-serif text-2xl text-[var(--admin-ink)]">{hero.heading} {hero.accent}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--admin-muted)]">{hero.body}</p>
              </div>
            </div>
          </article>
          <article className="bg-[var(--admin-panel)] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--admin-muted)]">Featured profile</p>
            {publishedProfiles[0] ? (
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-xl"><MediaThumb src={publishedProfiles[0].primary_image_url} alt={publishedProfiles[0].name} /></div>
                <div className="min-w-0"><p className="truncate font-medium text-[var(--admin-ink)]">{publishedProfiles[0].name}</p><p className="mt-0.5 text-xs text-[var(--admin-muted)]">{publishedProfiles[0].city} · {publishedProfiles[0].tier}</p></div>
              </div>
            ) : <EmptyInline text="Publish your first profile to populate the directory." />}
          </article>
          <article className="bg-[var(--admin-panel)] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--admin-muted)]">Promotion rail</p>
            {activeOffers[0] ? (
              <div className="mt-4"><StatusPill live /><p className="mt-3 font-medium text-[var(--admin-ink)]">{activeOffers[0].title}</p><p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--admin-muted)]">{activeOffers[0].body}</p></div>
            ) : <EmptyInline text="No live offer. Add one when there is something to announce." />}
          </article>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="admin-panel rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4"><div><p className="text-[0.67rem] font-bold uppercase tracking-[0.16em] text-gold-soft">Next actions</p><h2 className="mt-1 font-serif text-3xl text-[var(--admin-ink)]">Publishing queue</h2></div><Clock3 className="h-5 w-5 text-[var(--admin-muted)]" /></div>
          <div className="mt-5 divide-y divide-[var(--admin-border)]">
            <QueueItem title={`${data.profiles.filter((profile) => !profile.published).length} profile drafts`} body="Review photos and details, then publish when ready." action="Open profiles" onClick={() => navigate('/admin/profiles')} />
            <QueueItem title={`${data.content.filter((block) => !block.published).length} page blocks in draft`} body="Draft copy stays out of the public site until you publish it." action="Open content" onClick={() => navigate('/admin/content')} />
            <QueueItem title="Media has alt text" body={`${data.media.filter((asset) => asset.alt_text.trim()).length} of ${data.media.length} images are described for accessibility.`} action="Review media" onClick={() => navigate('/admin/media')} />
          </div>
        </section>
        <section className="admin-subtle-panel rounded-3xl p-5 sm:p-6">
          <Sparkles className="h-5 w-5 text-gold" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-3xl text-[var(--admin-ink)]">One-image rule, kept.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--admin-muted)]">Each directory card has exactly one selected primary image. The media library can hold as many assets as you need without turning a profile card into a gallery.</p>
          <AdminButton variant="secondary" className="mt-5" onClick={() => navigate('/admin/profiles/new')}><Plus className="h-4 w-4" /> Create clean profile</AdminButton>
        </section>
      </div>
    </div>
  )
}

function Kpi({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: number; detail: string }) {
  return (
    <article className="admin-kpi rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3"><p className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-[var(--admin-muted)]">{label}</p><Icon className="h-4 w-4 text-gold" aria-hidden="true" /></div>
      <p className="mt-3 font-serif text-4xl leading-none text-[var(--admin-ink)]">{value}</p>
      <p className="mt-2 text-xs text-[var(--admin-muted)]">{detail}</p>
    </article>
  )
}

function QueueItem({ title, body, action, onClick }: { title: string; body: string; action: string; onClick: () => void }) {
  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="font-medium text-[var(--admin-ink)]">{title}</p><p className="mt-1 text-xs leading-relaxed text-[var(--admin-muted)]">{body}</p></div>
      <button className="shrink-0 text-left text-xs font-bold uppercase tracking-[0.1em] text-gold-soft hover:text-gold sm:text-right" onClick={onClick}>{action} →</button>
    </div>
  )
}

function EmptyInline({ text }: { text: string }) {
  return <p className="mt-4 text-xs leading-relaxed text-[var(--admin-muted)]">{text}</p>
}

function ProfilesPage({
  data,
  refresh,
  user,
}: {
  data: AdminData
  refresh: () => Promise<void>
  user: User | null
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const profileId = profileIdFromPath(location.pathname)
  const isNew = location.pathname === '/admin/profiles/new'

  if (isNew || profileId) {
    const profile = profileId ? data.profiles.find((item) => item.id === profileId) : undefined
    if (profileId && !profile) {
      return (
        <section className="admin-panel rounded-3xl p-7 text-center">
          <h1 className="font-serif text-3xl text-[var(--admin-ink)]">Profile not found</h1>
          <p className="mt-3 text-sm text-[var(--admin-muted)]">It may have been removed in another Studio session.</p>
          <AdminButton variant="secondary" className="mt-6" onClick={() => navigate('/admin/profiles')}>Back to profiles</AdminButton>
        </section>
      )
    }
    return <ProfileEditor profile={profile} media={data.media} user={user} refresh={refresh} />
  }

  return <ProfileList profiles={data.profiles} onCreate={() => navigate('/admin/profiles/new')} onEdit={(id) => navigate(`/admin/profiles/${id}`)} />
}

function ProfileList({
  profiles,
  onCreate,
  onEdit,
}: {
  profiles: AdminProfile[]
  onCreate: () => void
  onEdit: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | 'live' | 'draft'>('all')
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    return profiles.filter((profile) => {
      const matchesStatus = status === 'all' || (status === 'live' ? profile.published : !profile.published)
      const matchesQuery = !search || [profile.name, profile.city, profile.category, profile.slug].some((value) => value.toLowerCase().includes(search))
      return matchesStatus && matchesQuery
    })
  }, [profiles, query, status])

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Directory"
        title="Profiles"
        description="Manage every public listing from one photo-first workspace. A profile always has one selected primary image."
        actions={<AdminButton onClick={onCreate}><Plus className="h-4 w-4" /> Add profile</AdminButton>}
      />
      <div className="admin-panel rounded-3xl p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block sm:max-w-sm sm:flex-1">
            <span className="sr-only">Search profiles</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" aria-hidden="true" />
            <input className="admin-field pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a name, city, or category" />
          </label>
          <div className="flex flex-wrap gap-2" aria-label="Profile status filter">
            {(['all', 'live', 'draft'] as const).map((item) => (
              <button key={item} className={`admin-button min-h-10 px-3 ${status === item ? 'admin-button-primary' : 'admin-button-quiet'}`} onClick={() => setStatus(item)}>{item === 'all' ? 'All' : item === 'live' ? 'Live' : 'Drafts'}</button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={UsersRound} title="No profiles here yet" body={profiles.length === 0 ? 'Create the first listing, select one primary image, and decide when it should appear publicly.' : 'Try a different search or status filter.'} action={profiles.length === 0 ? 'Create profile' : undefined} onAction={profiles.length === 0 ? onCreate : undefined} />
      ) : (
        <div className="admin-panel overflow-hidden rounded-3xl">
          <div className="hidden grid-cols-[minmax(15rem,1.5fr)_minmax(9rem,.8fr)_minmax(7rem,.6fr)_7rem_3.5rem] gap-4 border-b border-[var(--admin-border)] px-6 py-3 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[var(--admin-muted)] lg:grid">
            <span>Profile</span><span>Location & type</span><span>Rate</span><span>Status</span><span className="text-right">Edit</span>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {filtered.map((profile) => (
              <article key={profile.id} className="admin-table-row grid gap-4 px-4 py-4 transition-colors sm:px-6 lg:grid-cols-[minmax(15rem,1.5fr)_minmax(9rem,.8fr)_minmax(7rem,.6fr)_7rem_3.5rem] lg:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-14 w-12 shrink-0 overflow-hidden rounded-xl border border-[var(--admin-border)]"><MediaThumb src={profile.primary_image_url} alt={profile.primary_image_alt || profile.name} /></div>
                  <div className="min-w-0"><p className="truncate font-medium text-[var(--admin-ink)]">{profile.name}</p><p className="mt-0.5 truncate text-xs text-[var(--admin-muted)]">{profile.tagline || profile.slug}</p></div>
                </div>
                <div className="flex items-center justify-between gap-4 lg:block"><p className="text-sm text-[var(--admin-ink)]">{profile.city}</p><p className="mt-0.5 text-xs text-[var(--admin-muted)]">{profile.category}</p></div>
                <p className="text-sm text-[var(--admin-ink)]">₹{profile.rate.toLocaleString('en-IN')}</p>
                <div><StatusPill live={profile.published} /></div>
                <div className="flex justify-end"><button className="admin-button admin-button-secondary grid h-10 w-10 place-items-center px-0" onClick={() => onEdit(profile.id)} aria-label={`Edit ${profile.name}`}><Pencil className="h-4 w-4" /></button></div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileEditor({
  profile,
  media,
  user,
  refresh,
}: {
  profile?: AdminProfile
  media: MediaAsset[]
  user: User | null
  refresh: () => Promise<void>
}) {
  const navigate = useNavigate()
  const [form, setForm] = useState<ProfileInputState>(() => toEditableProfile(profile))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => setForm(toEditableProfile(profile)), [profile])

  const update = (patch: Partial<ProfileInputState>) => setForm((current) => ({ ...current, ...patch }))
  const updateList = (field: 'cities' | 'languages' | 'interests' | 'traits' | 'experiences' | 'bio', value: string) => update({ [field]: field === 'bio' ? value.split('\n').map((entry) => entry.trim()).filter(Boolean) : fromCsv(value) } as Partial<ProfileInputState>)

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !user) return
    setUploading(true)
    setError('')
    try {
      const asset = await uploadMediaAsset(file, form.primary_image_alt || `${form.name || 'Profile'} portrait`, user.id)
      update({ primary_image_id: asset.id, primary_image_url: asset.public_url, primary_image_alt: asset.alt_text })
      await refresh()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the image.')
    } finally {
      setUploading(false)
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!user) return
    const name = form.name.trim()
    const slug = slugify(form.slug || name)
    if (!name || !slug) {
      setError('Add a name and a valid URL slug before saving.')
      return
    }
    if (!form.primary_image_id) {
      setError('Choose one primary image. Each profile card uses exactly one image.')
      return
    }

    setSaving(true)
    try {
      const saved = await saveAdminProfile({
        ...form,
        slug,
        name,
        city: 'Surat',
        cities: ['Surat'],
        age: Math.max(18, Math.round(form.age || 18)),
        rate: Math.max(0, Math.round(form.rate || 0)),
      }, user.id)
      await refresh()
      setSuccess(form.published ? 'Published and visible to public visitors.' : 'Saved as a private draft.')
      if (!profile) navigate(`/admin/profiles/${saved.id}`, { replace: true })
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the profile.')
    } finally {
      setSaving(false)
    }
  }

  const removeFromPublicSite = async () => {
    if (!profile || !user) return
    if (!window.confirm(`Remove ${profile.name} from the public directory? The record will remain here as a draft.`)) return
    setSaving(true)
    setError('')
    try {
      await archiveAdminProfile(profile.id, user.id)
      await refresh()
      setForm((current) => ({ ...current, published: false }))
      setSuccess('The profile is now private and saved as a draft.')
    } catch (archiveError) {
      setError(archiveError instanceof Error ? archiveError.message : 'Could not remove the profile from the public site.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <PageHeader
        eyebrow={profile ? 'Directory / Edit profile' : 'Directory / New profile'}
        title={profile ? `Edit ${profile.name}` : 'Create a profile'}
        description="Complete the listing, select its one primary image, and choose whether it is ready to be seen publicly."
        actions={<><AdminButton variant="secondary" onClick={() => navigate('/admin/profiles')}>Cancel</AdminButton><AdminButton type="submit" loading={saving}><Save className="h-4 w-4" /> {form.published ? 'Save & publish' : 'Save draft'}</AdminButton></>}
      />
      {error ? <Notice tone="error">{error}</Notice> : null}
      {success ? <Notice tone="success">{success}</Notice> : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <section className="admin-panel rounded-3xl p-5 sm:p-6">
            <SectionTitle title="Identity" body="The basics that appear around the directory card and profile page." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Display name"><input className="admin-field" value={form.name} onChange={(event) => update({ name: event.target.value, slug: form.slug || slugify(event.target.value) })} placeholder="Profile name" required /></Field>
              <Field label="URL slug" help="Lowercase, space-free URL used by the profile page."><input className="admin-field" value={form.slug} onChange={(event) => update({ slug: slugify(event.target.value) })} placeholder="elegant-name" required /></Field>
              <Field label="Primary city"><select className="admin-select" value={form.city} onChange={(event) => update({ city: event.target.value })}>{cityOptions.filter((city) => city === 'Surat').map((city) => <option key={city}>{city}</option>)}</select></Field>
              <Field label="Category"><select className="admin-select" value={form.category} onChange={(event) => update({ category: event.target.value })}>{categoryOptions.map((category) => <option key={category}>{category}</option>)}</select></Field>
              <Field label="Age"><input className="admin-field" type="number" min="18" value={form.age} onChange={(event) => update({ age: Number(event.target.value) })} /></Field>
              <Field label="Rate (₹)"><input className="admin-field" type="number" min="0" step="100" value={form.rate} onChange={(event) => update({ rate: Number(event.target.value) })} /></Field>
              <Field label="Tier"><select className="admin-select" value={form.tier} onChange={(event) => update({ tier: event.target.value as ProfileInputState['tier'] })}><option>Signature</option><option>Elite</option><option>Muse</option></select></Field>
              <Field label="Sort order" help="Lower numbers appear first."><input className="admin-field" type="number" value={form.sort_order} onChange={(event) => update({ sort_order: Number(event.target.value) })} /></Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Short introduction"><input className="admin-field" value={form.tagline} onChange={(event) => update({ tagline: event.target.value })} placeholder="A concise reason to meet this profile." /></Field>
              <Field label="Card description" help="Shown directly on every public card."><input className="admin-field" value={form.description} onChange={(event) => update({ description: event.target.value })} placeholder="A short, welcoming profile description." /></Field>
              <Field label="Call number" help="Use international format. This opens the visitor's dialler."><input className="admin-field" type="tel" value={form.contact_phone} onChange={(event) => update({ contact_phone: event.target.value })} placeholder="+91 98765 43210" /></Field>
              <Field label="WhatsApp number" help="Use digits with country code; no spaces required."><input className="admin-field" type="tel" value={form.whatsapp_number} onChange={(event) => update({ whatsapp_number: event.target.value })} placeholder="+91 98765 43210" /></Field>
              <Field label="Telegram username" help="Optional. Without one, Telegram opens a secure share composer."><input className="admin-field" value={form.telegram_username} onChange={(event) => update({ telegram_username: event.target.value.replace(/^@/, '') })} placeholder="your_telegram_handle" /></Field>
            </div>
          </section>

          <section className="admin-panel rounded-3xl p-5 sm:p-6">
            <SectionTitle title="Primary image" body="This is the only image used on the public profile card. Upload more assets to the library without attaching a gallery to the listing." />
            <div className="mt-5 grid gap-5 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--admin-border)]"><MediaThumb src={form.primary_image_url} alt={form.primary_image_alt || form.name || 'Primary profile image'} /></div>
              <div className="space-y-4">
                <Field label="Image from media library"><MediaSelect media={media} value={form.primary_image_id} onChange={(asset) => update({ primary_image_id: asset?.id || null, primary_image_url: asset?.public_url || null, primary_image_alt: asset?.alt_text || form.primary_image_alt })} /></Field>
                <Field label="Image description"><input className="admin-field" value={form.primary_image_alt || ''} onChange={(event) => update({ primary_image_alt: event.target.value })} placeholder="Describe the image for visitors using assistive tech" /></Field>
                <label className="admin-upload-zone flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--admin-ink)]"><UploadCloud className="h-4 w-4 text-gold" /><span>{uploading ? 'Uploading image…' : 'Upload a new image'}</span><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={uploading} onChange={upload} /></label>
              </div>
            </div>
          </section>

          <section className="admin-panel rounded-3xl p-5 sm:p-6">
            <SectionTitle title="Profile detail" body="Comma-separate short lists. Each biography line becomes a separate readable paragraph." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Available cities"><input className="admin-field" value={toCsv(form.cities)} onChange={(event) => updateList('cities', event.target.value)} placeholder="Surat" /></Field>
              <Field label="Languages"><input className="admin-field" value={toCsv(form.languages)} onChange={(event) => updateList('languages', event.target.value)} placeholder="English, Hindi" /></Field>
              <Field label="Interests"><input className="admin-field" value={toCsv(form.interests)} onChange={(event) => updateList('interests', event.target.value)} placeholder="Art, music, travel" /></Field>
              <Field label="Traits"><input className="admin-field" value={toCsv(form.traits)} onChange={(event) => updateList('traits', event.target.value)} placeholder="Warm, discreet, curious" /></Field>
              <Field label="Experiences" className="sm:col-span-2"><input className="admin-field" value={toCsv(form.experiences)} onChange={(event) => updateList('experiences', event.target.value)} placeholder="Social companionship, cultural evenings" /></Field>
              <Field label="Biography" className="sm:col-span-2" help="Use one paragraph per line."><textarea className="admin-textarea" value={form.bio.join('\n')} onChange={(event) => updateList('bio', event.target.value)} placeholder="A thoughtful first paragraph…&#10;A second paragraph…" /></Field>
              <Field label="Availability" className="sm:col-span-2" help="One line per slot: Friday | Evening – late"><textarea className="admin-textarea" value={form.availability.map((slot) => `${slot.day} | ${slot.slots}`).join('\n')} onChange={(event) => update({ availability: event.target.value.split('\n').flatMap((line) => { const [day, ...slots] = line.split('|'); return day?.trim() && slots.join('|').trim() ? [{ day: day.trim(), slots: slots.join('|').trim() }] : [] }) })} placeholder="Friday | Evening – late&#10;Saturday | Afternoon – late" /></Field>
            </div>
          </section>
        </div>

        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
          <section className="admin-panel rounded-3xl p-5">
            <p className="admin-label">Publication</p>
            <div className="mt-4 space-y-3">
              <ToggleRow label="Visible on the public directory" description="Only published profiles pass the public security policy." checked={form.published} onChange={(checked) => update({ published: checked })} />
              <ToggleRow label="Feature this profile" description="Featured listings are shown before the regular order." checked={form.featured} onChange={(checked) => update({ featured: checked })} />
              <ToggleRow label="Verification badge" description="Shows the verification mark on the profile and directory card." checked={form.verified} onChange={(checked) => update({ verified: checked })} />
            </div>
          </section>
          <section className="admin-subtle-panel rounded-3xl p-5">
            <p className="admin-label">Card preview</p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel)]"><div className="aspect-[4/5]"><MediaThumb src={form.primary_image_url} alt={form.primary_image_alt || form.name || 'Profile preview'} /></div><div className="p-4"><div className="flex items-center justify-between gap-3"><p className="font-medium text-[var(--admin-ink)]">{form.name || 'New profile'}</p><span className="text-xs text-[var(--admin-muted)]">{form.age} yrs</span></div><p className="mt-1 line-clamp-2 text-xs text-[var(--admin-muted)]">{form.tagline || 'The short introduction will appear here.'}</p></div></div>
          </section>
          {profile?.published ? <AdminButton type="button" variant="danger" className="w-full" loading={saving} onClick={() => void removeFromPublicSite()}>Remove from public site</AdminButton> : null}
        </aside>
      </div>
    </form>
  )
}

function Field({ label, help, className = '', children }: { label: string; help?: string; className?: string; children: ReactNode }) {
  return <label className={`block ${className}`}><span className="admin-label">{label}</span>{children}{help ? <span className="mt-1.5 block admin-help">{help}</span> : null}</label>
}

function SectionTitle({ title, body }: { title: string; body: string }) {
  return <div><h2 className="font-serif text-3xl text-[var(--admin-ink)]">{title}</h2><p className="mt-2 text-sm leading-relaxed text-[var(--admin-muted)]">{body}</p></div>
}

function Notice({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tone === 'error' ? 'border-[color:color-mix(in_srgb,var(--admin-danger)_45%,transparent)] text-[var(--admin-danger)]' : 'border-[color:color-mix(in_srgb,var(--admin-success)_45%,transparent)] text-[var(--admin-success)]'}`}>{children}</div>
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 transition-colors hover:bg-[var(--admin-hover)]"><input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--color-ruby)]" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span><span className="block text-sm font-medium text-[var(--admin-ink)]">{label}</span><span className="mt-0.5 block text-xs leading-relaxed text-[var(--admin-muted)]">{description}</span></span></label>
}

function MediaSelect({ media, value, onChange }: { media: MediaAsset[]; value: string | null; onChange: (asset: MediaAsset | null) => void }) {
  return <select className="admin-select" value={value || ''} onChange={(event) => onChange(media.find((asset) => asset.id === event.target.value) || null)}><option value="">Select an uploaded image</option>{media.map((asset) => <option key={asset.id} value={asset.id}>{asset.alt_text} · {asset.storage_path.split('/').at(-1)}</option>)}</select>
}

function EmptyState({ icon: Icon, title, body, action, onAction }: { icon: LucideIcon; title: string; body: string; action?: string; onAction?: () => void }) {
  return <section className="admin-panel grid min-h-72 place-items-center rounded-3xl p-7 text-center"><div><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold"><Icon className="h-6 w-6" /></div><h2 className="mt-4 font-serif text-3xl text-[var(--admin-ink)]">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--admin-muted)]">{body}</p>{action && onAction ? <AdminButton className="mt-5" onClick={onAction}><Plus className="h-4 w-4" /> {action}</AdminButton> : null}</div></section>
}

function MediaPage({ data, refresh, user }: { data: AdminData; refresh: () => Promise<void>; user: User | null }) {
  const [file, setFile] = useState<File | null>(null)
  const [altText, setAltText] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return data.media
    return data.media.filter((asset) => `${asset.alt_text} ${asset.storage_path}`.toLowerCase().includes(search))
  }, [data.media, query])

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file || !user) {
      setError('Choose an image before uploading.')
      return
    }
    setUploading(true)
    setError('')
    setSuccess('')
    try {
      await uploadMediaAsset(file, altText || file.name.replace(/\.[^.]+$/, ''), user.id)
      await refresh()
      setFile(null)
      setAltText('')
      setSuccess('Image added to the media library. It is ready to attach to one profile, a banner, or an offer.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Could not upload the image.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Assets" title="Media library" description="Upload public-ready images once, describe them clearly, and reuse them in profiles, banners, offers, and page blocks." />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <section className="admin-panel rounded-3xl p-5 sm:p-6">
          <SectionTitle title="Upload an image" body="JPG, PNG, WebP, and AVIF up to 10 MB. Every upload gets an accessible description before it is placed on the site." />
          <form className="mt-5 grid gap-4" onSubmit={upload}>
            <label className="admin-upload-zone flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl p-5 text-center"><UploadCloud className="h-6 w-6 text-gold" /><span className="mt-2 text-sm font-medium text-[var(--admin-ink)]">{file ? file.name : 'Choose an image to upload'}</span><span className="mt-1 text-xs text-[var(--admin-muted)]">The file stays local until you press Upload.</span><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setFile(event.target.files?.[0] || null)} /></label>
            <Field label="Image description" help="This becomes the alt text used on the public site."><input className="admin-field" value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="A concise, accurate description of this image" /></Field>
            {error ? <Notice tone="error">{error}</Notice> : null}
            {success ? <Notice tone="success">{success}</Notice> : null}
            <AdminButton type="submit" loading={uploading} disabled={!file}><UploadCloud className="h-4 w-4" /> Upload to library</AdminButton>
          </form>
        </section>

        <section className="admin-subtle-panel rounded-3xl p-5">
          <p className="admin-label">Media practice</p>
          <h2 className="mt-2 font-serif text-3xl text-[var(--admin-ink)]">One library, clear reuse.</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--admin-muted)]"><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--admin-success)]" />Use a meaningful alt description for every photo.</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--admin-success)]" />Select one primary asset per model profile.</li><li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--admin-success)]" />Use the same asset on a banner only when it tells the same story.</li></ul>
        </section>
      </div>

      <section className="admin-panel rounded-3xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[0.67rem] font-bold uppercase tracking-[0.16em] text-gold-soft">Library</p><h2 className="mt-1 font-serif text-3xl text-[var(--admin-ink)]">{data.media.length} uploaded images</h2></div><label className="relative block sm:w-72"><span className="sr-only">Search media</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" /><input className="admin-field pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search image descriptions" /></label></div>
        {filtered.length === 0 ? <p className="mt-7 text-sm text-[var(--admin-muted)]">No images match this search.</p> : <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{filtered.map((asset) => <article key={asset.id} className="overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-panel-muted)]"><div className="aspect-square"><MediaThumb src={asset.public_url} alt={asset.alt_text} /></div><div className="p-3"><p className="line-clamp-2 text-xs font-medium leading-relaxed text-[var(--admin-ink)]">{asset.alt_text}</p><p className="mt-1 truncate text-[0.65rem] text-[var(--admin-muted)]">{asset.storage_path.split('/').at(-1)}</p></div></article>)}</div>}
      </section>
    </div>
  )
}

function ContentPage({ data, refresh, user }: { data: AdminData; refresh: () => Promise<void>; user: User | null }) {
  const blockMap = useMemo(() => Object.fromEntries(data.content.map((block) => [block.key, block])), [data.content])
  const existingHero = blockMap.home_hero
  const [hero, setHero] = useState<HomeHeroContent>(() => getHomeHero(blockMap))
  const [heroMediaId, setHeroMediaId] = useState<string | null>(existingHero?.media_asset_id || null)
  const [savingHero, setSavingHero] = useState(false)
  const [heroNotice, setHeroNotice] = useState('')
  const [heroError, setHeroError] = useState('')
  const [selectedKey, setSelectedKey] = useState<string | null>(data.content.find((block) => block.key !== 'home_hero')?.key || null)

  useEffect(() => {
    setHero(getHomeHero(blockMap))
    setHeroMediaId(existingHero?.media_asset_id || null)
  }, [blockMap, existingHero?.media_asset_id])

  const saveHero = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    setSavingHero(true)
    setHeroNotice('')
    setHeroError('')
    try {
      await saveContentBlock({
        id: existingHero?.id,
        key: 'home_hero',
        page: 'home',
        label: 'Homepage hero',
        payload: { ...hero, imageUrl: '' },
        media_asset_id: heroMediaId,
        sort_order: 0,
        published: true,
      }, user.id)
      await refresh()
      setHeroNotice('Homepage hero saved and published.')
    } catch (saveError) {
      setHeroError(saveError instanceof Error ? saveError.message : 'Could not save the hero.')
    } finally {
      setSavingHero(false)
    }
  }

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Pages & banners" title="Content hub" description="Update the homepage hero now, then use structured content blocks for the rest of the website without mixing text with code." />
      <form onSubmit={saveHero} className="admin-panel overflow-hidden rounded-3xl">
        <div className="flex flex-col gap-3 border-b border-[var(--admin-border)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="text-[0.67rem] font-bold uppercase tracking-[0.16em] text-gold-soft">Homepage</p><h2 className="mt-1 font-serif text-3xl text-[var(--admin-ink)]">Hero section</h2></div><AdminButton type="submit" loading={savingHero}><Save className="h-4 w-4" /> Save hero</AdminButton></div>
        <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Eyebrow" className="sm:col-span-2"><input className="admin-field" value={hero.eyebrow} onChange={(event) => setHero((current) => ({ ...current, eyebrow: event.target.value }))} /></Field><Field label="Heading"><input className="admin-field" value={hero.heading} onChange={(event) => setHero((current) => ({ ...current, heading: event.target.value }))} /></Field><Field label="Italic accent"><input className="admin-field" value={hero.accent} onChange={(event) => setHero((current) => ({ ...current, accent: event.target.value }))} /></Field><Field label="Hero description" className="sm:col-span-2"><textarea className="admin-textarea" value={hero.body} onChange={(event) => setHero((current) => ({ ...current, body: event.target.value }))} /></Field><Field label="Primary button label"><input className="admin-field" value={hero.primaryCtaLabel} onChange={(event) => setHero((current) => ({ ...current, primaryCtaLabel: event.target.value }))} /></Field><Field label="Primary button link"><input className="admin-field" value={hero.primaryCtaHref} onChange={(event) => setHero((current) => ({ ...current, primaryCtaHref: event.target.value }))} /></Field><Field label="Secondary button label"><input className="admin-field" value={hero.secondaryCtaLabel} onChange={(event) => setHero((current) => ({ ...current, secondaryCtaLabel: event.target.value }))} /></Field><Field label="Secondary button link"><input className="admin-field" value={hero.secondaryCtaHref} onChange={(event) => setHero((current) => ({ ...current, secondaryCtaHref: event.target.value }))} /></Field></div>
          <aside className="space-y-4"><Field label="Hero image"><MediaSelect media={data.media} value={heroMediaId} onChange={(asset) => setHeroMediaId(asset?.id || null)} /></Field><div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--admin-border)]"><MediaThumb src={data.media.find((asset) => asset.id === heroMediaId)?.public_url || hero.imageUrl || null} alt="Homepage hero preview" /></div><p className="admin-help">On mobile, the public hero keeps this photo clear and places the copy in its own glass panel.</p></aside>
        </div>
        {heroError ? <div className="px-5 pb-5 sm:px-6"><Notice tone="error">{heroError}</Notice></div> : null}{heroNotice ? <div className="px-5 pb-5 sm:px-6"><Notice tone="success">{heroNotice}</Notice></div> : null}
      </form>

      <ContentBlockEditor blocks={data.content.filter((block) => block.key !== 'home_hero')} media={data.media} selectedKey={selectedKey} onSelectedKey={setSelectedKey} refresh={refresh} user={user} />
    </div>
  )
}

function ContentBlockEditor({
  blocks,
  media,
  selectedKey,
  onSelectedKey,
  refresh,
  user,
}: {
  blocks: ContentBlock[]
  media: MediaAsset[]
  selectedKey: string | null
  onSelectedKey: (key: string | null) => void
  refresh: () => Promise<void>
  user: User | null
}) {
  const selected = blocks.find((block) => block.key === selectedKey)
  const [draft, setDraft] = useState<ContentBlock>(() => selected || makeEmptyBlock())
  const [payloadText, setPayloadText] = useState(() => JSON.stringify(selected?.payload || {}, null, 2))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const next = selected || makeEmptyBlock()
    setDraft(next)
    setPayloadText(JSON.stringify(next.payload, null, 2))
    setError('')
    setSuccess('')
  }, [selected, selectedKey])

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    setError('')
    setSuccess('')
    let payload: Record<string, unknown>
    try {
      const parsed: unknown = JSON.parse(payloadText || '{}')
      if (!isRecord(parsed)) throw new Error('Content JSON must be an object with named fields.')
      payload = parsed
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : 'Content JSON is not valid.')
      return
    }
    if (!slugify(draft.key)) {
      setError('Give the content block a stable key, such as about_intro.')
      return
    }
    setSaving(true)
    try {
      const saved = await saveContentBlock({ ...draft, key: slugify(draft.key), payload }, user.id)
      await refresh()
      onSelectedKey(saved.key)
      setSuccess(saved.published ? 'Content block published.' : 'Content block saved as a draft.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the content block.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="admin-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[0.67rem] font-bold uppercase tracking-[0.16em] text-gold-soft">Flexible editor</p><h2 className="mt-1 font-serif text-3xl text-[var(--admin-ink)]">Page content blocks</h2><p className="mt-2 text-sm text-[var(--admin-muted)]">Every published block appears on its named public page. Use home, discover, experiences, membership, about, safety, or faq, with JSON fields such as eyebrow, heading, body, and imageUrl.</p></div><AdminButton variant="secondary" onClick={() => onSelectedKey(null)}><Plus className="h-4 w-4" /> New block</AdminButton></div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[15rem_minmax(0,1fr)]"><div className="admin-scrollbar max-h-[34rem] space-y-2 overflow-y-auto pr-1">{blocks.length === 0 ? <p className="admin-help p-3">No additional blocks yet. Create one to keep page content editable.</p> : blocks.map((block) => <button key={block.id} className={`w-full rounded-xl border p-3 text-left transition-colors ${selectedKey === block.key ? 'border-gold/60 bg-gold/10' : 'border-[var(--admin-border)] hover:bg-[var(--admin-hover)]'}`} onClick={() => onSelectedKey(block.key)}><div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-medium text-[var(--admin-ink)]">{block.label}</span><StatusPill live={block.published} /></div><p className="mt-1 truncate text-xs text-[var(--admin-muted)]">{block.page} · {block.key}</p></button>)}</div><form onSubmit={save} className="grid gap-4"><div className="grid gap-4 sm:grid-cols-3"><Field label="Block key"><input className="admin-field" value={draft.key} onChange={(event) => setDraft((current) => ({ ...current, key: event.target.value }))} placeholder="about_intro" /></Field><Field label="Page"><input className="admin-field" value={draft.page} onChange={(event) => setDraft((current) => ({ ...current, page: event.target.value }))} placeholder="about" /></Field><Field label="Editor label"><input className="admin-field" value={draft.label} onChange={(event) => setDraft((current) => ({ ...current, label: event.target.value }))} placeholder="About introduction" /></Field></div><Field label="Attached image"><MediaSelect media={media} value={draft.media_asset_id} onChange={(asset) => setDraft((current) => ({ ...current, media_asset_id: asset?.id || null, image_url: asset?.public_url || null }))} /></Field><Field label="Content JSON" help="For example: {&quot;heading&quot;:&quot;About us&quot;,&quot;body&quot;:&quot;…&quot;}"><textarea className="admin-textarea font-mono text-xs" rows={11} value={payloadText} onChange={(event) => setPayloadText(event.target.value)} /></Field><div className="flex flex-col gap-3 rounded-2xl border border-[var(--admin-border)] p-4 sm:flex-row sm:items-center sm:justify-between"><ToggleRow label="Publish this block" description="Public pages only receive published content through Supabase." checked={draft.published} onChange={(published) => setDraft((current) => ({ ...current, published }))} /><AdminButton type="submit" loading={saving}><Save className="h-4 w-4" /> Save block</AdminButton></div>{error ? <Notice tone="error">{error}</Notice> : null}{success ? <Notice tone="success">{success}</Notice> : null}</form></div>
    </section>
  )
}

function makeEmptyBlock(): ContentBlock {
  return { id: '', key: '', page: 'page', label: '', payload: {}, media_asset_id: null, image_url: null, sort_order: 0, published: false, created_at: '', updated_at: '' }
}

function OffersPage({ data, refresh, user }: { data: AdminData; refresh: () => Promise<void>; user: User | null }) {
  const location = useLocation()
  const navigate = useNavigate()
  const offerId = offerIdFromPath(location.pathname)
  const isNew = location.pathname === '/admin/offers/new'
  if (offerId || isNew) {
    const offer = offerId ? data.offers.find((item) => item.id === offerId) : undefined
    if (offerId && !offer) {
      return <section className="admin-panel rounded-3xl p-7 text-center"><h1 className="font-serif text-3xl text-[var(--admin-ink)]">Offer not found</h1><AdminButton variant="secondary" className="mt-5" onClick={() => navigate('/admin/offers')}>Back to offers</AdminButton></section>
    }
    return <OfferEditor offer={offer} media={data.media} user={user} refresh={refresh} />
  }
  return <OffersList offers={data.offers} onCreate={() => navigate('/admin/offers/new')} onEdit={(id) => navigate(`/admin/offers/${id}`)} />
}

function OffersList({ offers, onCreate, onEdit }: { offers: Offer[]; onCreate: () => void; onEdit: (id: string) => void }) {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Promotions" title="Offers & banners" description="Build time-aware promotions with a clear message, image, call to action, and direct publish control." actions={<AdminButton onClick={onCreate}><Plus className="h-4 w-4" /> New offer</AdminButton>} />
      {offers.length === 0 ? <EmptyState icon={BadgePercent} title="No offers yet" body="Create a promotion when you have an announcement, a seasonal moment, or a private member benefit to share." action="Create offer" onAction={onCreate} /> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{offers.map((offer) => <article key={offer.id} className="admin-panel overflow-hidden rounded-3xl"><div className="relative aspect-[16/9]"><MediaThumb src={offer.image_url} alt={offer.image_alt || offer.title} /><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" /><div className="absolute bottom-3 left-3"><StatusPill live={offer.published && offer.active} muted={!offer.active} /></div></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[0.63rem] font-bold uppercase tracking-[0.13em] text-gold-soft">{offer.placement}</p><h2 className="mt-1 font-serif text-3xl leading-none text-[var(--admin-ink)]">{offer.title}</h2></div><button className="admin-button admin-button-secondary grid h-10 w-10 shrink-0 place-items-center px-0" aria-label={`Edit ${offer.title}`} onClick={() => onEdit(offer.id)}><Pencil className="h-4 w-4" /></button></div><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--admin-muted)]">{offer.body || 'No offer copy yet.'}</p><div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--admin-border)] pt-3 text-xs text-[var(--admin-muted)]"><span>{formatDate(offer.starts_at)}{offer.ends_at ? ` – ${formatDate(offer.ends_at)}` : ''}</span>{offer.code ? <span className="rounded-md bg-gold/10 px-2 py-1 font-bold text-gold-soft">{offer.code}</span> : null}</div></div></article>)}</div>}
    </div>
  )
}

function OfferEditor({
  offer,
  media,
  user,
  refresh,
}: {
  offer?: Offer
  media: MediaAsset[]
  user: User | null
  refresh: () => Promise<void>
}) {
  const navigate = useNavigate()
  const [form, setForm] = useState<Offer>(() => offer || makeEmptyOffer())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  useEffect(() => setForm(offer || makeEmptyOffer()), [offer])
  const update = (patch: Partial<Offer>) => setForm((current) => ({ ...current, ...patch }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    if (!form.title.trim()) {
      setError('Add an offer title before saving.')
      return
    }
    if (form.ends_at && form.starts_at && Date.parse(form.ends_at) <= Date.parse(form.starts_at)) {
      setError('The offer end must be later than its start.')
      return
    }
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const saved = await saveOffer({ ...form, title: form.title.trim() }, user.id)
      await refresh()
      setSuccess(saved.published && saved.active ? 'Offer published and ready to appear during its scheduled window.' : 'Offer saved as a draft or inactive promotion.')
      if (!offer) navigate(`/admin/offers/${saved.id}`, { replace: true })
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the offer.')
    } finally {
      setSaving(false)
    }
  }

  const deactivate = async () => {
    if (!offer || !user) return
    if (!window.confirm(`Deactivate ${offer.title}? It will no longer be public.`)) return
    setSaving(true)
    setError('')
    try {
      await deactivateOffer(offer.id, user.id)
      await refresh()
      update({ active: false, published: false })
      setSuccess('Offer deactivated and removed from the public site.')
    } catch (deactivateError) {
      setError(deactivateError instanceof Error ? deactivateError.message : 'Could not deactivate this offer.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-7">
      <PageHeader eyebrow={offer ? 'Promotions / Edit offer' : 'Promotions / New offer'} title={offer ? `Edit ${offer.title}` : 'Create an offer'} description="Set the message, timing, image, and live status for a new banner or promotion." actions={<><AdminButton variant="secondary" onClick={() => navigate('/admin/offers')}>Cancel</AdminButton><AdminButton type="submit" loading={saving}><Save className="h-4 w-4" /> Save offer</AdminButton></>} />
      {error ? <Notice tone="error">{error}</Notice> : null}{success ? <Notice tone="success">{success}</Notice> : null}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="admin-panel rounded-3xl p-5 sm:p-6">
          <SectionTitle title="Offer details" body="Write the part visitors see and keep the terms close to the promotion for your team." />
          <div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Offer title" className="sm:col-span-2"><input className="admin-field" value={form.title} onChange={(event) => update({ title: event.target.value })} placeholder="A considered offer title" required /></Field><Field label="Offer code"><input className="admin-field" value={form.code || ''} onChange={(event) => update({ code: event.target.value || null })} placeholder="PRIVATE10" /></Field><Field label="Placement"><select className="admin-select" value={form.placement} onChange={(event) => update({ placement: event.target.value })}><option value="home">Homepage</option><option value="membership">Membership</option><option value="directory">Directory</option></select></Field><Field label="Offer message" className="sm:col-span-2"><textarea className="admin-textarea" value={form.body} onChange={(event) => update({ body: event.target.value })} placeholder="Explain the offer clearly and simply." /></Field><Field label="Terms / internal notes" className="sm:col-span-2"><textarea className="admin-textarea" value={form.terms || ''} onChange={(event) => update({ terms: event.target.value || null })} placeholder="Expiry, eligibility, and notes for the team." /></Field><Field label="Button label"><input className="admin-field" value={form.cta_label || ''} onChange={(event) => update({ cta_label: event.target.value || null })} placeholder="Learn more" /></Field><Field label="Button link"><input className="admin-field" value={form.cta_href || ''} onChange={(event) => update({ cta_href: event.target.value || null })} placeholder="/membership" /></Field><Field label="Starts at"><input className="admin-field" type="datetime-local" value={toLocalDateTime(form.starts_at)} onChange={(event) => update({ starts_at: toIsoDateTime(event.target.value) })} /></Field><Field label="Ends at"><input className="admin-field" type="datetime-local" value={toLocalDateTime(form.ends_at)} onChange={(event) => update({ ends_at: toIsoDateTime(event.target.value) })} /></Field><Field label="Sort order"><input className="admin-field" type="number" value={form.sort_order} onChange={(event) => update({ sort_order: Number(event.target.value) })} /></Field></div>
        </section>
        <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start"><section className="admin-panel rounded-3xl p-5"><p className="admin-label">Banner artwork</p><div className="mt-3 aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--admin-border)]"><MediaThumb src={form.image_url} alt={form.image_alt || form.title || 'Offer image'} /></div><div className="mt-4 space-y-4"><MediaSelect media={media} value={form.media_asset_id} onChange={(asset) => update({ media_asset_id: asset?.id || null, image_url: asset?.public_url || null, image_alt: asset?.alt_text || form.image_alt })} /><Field label="Image description"><input className="admin-field" value={form.image_alt || ''} onChange={(event) => update({ image_alt: event.target.value || null })} placeholder="Describe the banner image" /></Field></div></section><section className="admin-subtle-panel rounded-3xl p-5"><p className="admin-label">Publication</p><div className="mt-3 space-y-2"><ToggleRow label="Publish offer" description="Allows the offer to be read by the public site." checked={form.published} onChange={(published) => update({ published })} /><ToggleRow label="Activate promotion" description="Active offers appear only inside their scheduled window." checked={form.active} onChange={(active) => update({ active })} /></div></section>{offer?.active ? <AdminButton type="button" variant="danger" className="w-full" loading={saving} onClick={() => void deactivate()}>Deactivate offer</AdminButton> : null}</aside>
      </div>
    </form>
  )
}

function makeEmptyOffer(): Offer {
  return { id: '', title: '', body: '', code: null, terms: null, media_asset_id: null, image_url: null, image_alt: null, cta_label: null, cta_href: null, placement: 'home', active: false, starts_at: null, ends_at: null, sort_order: 0, published: false, created_at: '', updated_at: '' }
}

function SettingsPage({ data, refresh, user }: { data: AdminData; refresh: () => Promise<void>; user: User | null }) {
  const settingsMap = useMemo(() => Object.fromEntries(data.settings.map((setting) => [setting.key, setting])), [data.settings])
  const stored = settingsMap.site_identity
  const identity = getSiteIdentity(settingsMap)
  const [form, setForm] = useState({ siteName: identity.siteName, conciergeEmail: identity.conciergeEmail, conciergePhone: identity.conciergePhone, tagline: asString(stored?.value.tagline) })
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const identityTagline = asString(stored?.value.tagline)

  useEffect(() => {
    setForm({ siteName: identity.siteName, conciergeEmail: identity.conciergeEmail, conciergePhone: identity.conciergePhone, tagline: identityTagline })
  }, [identity.conciergeEmail, identity.conciergePhone, identity.siteName, identityTagline])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return
    setSaving(true)
    setNotice('')
    setError('')
    try {
      await saveSiteSetting({ key: 'site_identity', value: form, published: true }, user.id)
      await refresh()
      setNotice('Site identity saved and published.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save the site identity.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Site controls" title="Settings" description="Set the public identity and keep the security/deployment hand-off visible for the person operating the site." />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <form onSubmit={submit} className="admin-panel rounded-3xl p-5 sm:p-6"><SectionTitle title="Public identity" body="These details are available to the public site through one published settings record." /><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Site name"><input className="admin-field" value={form.siteName} onChange={(event) => setForm((current) => ({ ...current, siteName: event.target.value }))} /></Field><Field label="Concierge email"><input className="admin-field" type="email" value={form.conciergeEmail} onChange={(event) => setForm((current) => ({ ...current, conciergeEmail: event.target.value }))} placeholder="hello@example.com" /></Field><Field label="Concierge phone"><input className="admin-field" value={form.conciergePhone} onChange={(event) => setForm((current) => ({ ...current, conciergePhone: event.target.value }))} placeholder="Optional phone or Signal handle" /></Field><Field label="Short site line" className="sm:col-span-2"><input className="admin-field" value={form.tagline} onChange={(event) => setForm((current) => ({ ...current, tagline: event.target.value }))} placeholder="Private company, thoughtfully arranged" /></Field></div>{error ? <div className="mt-4"><Notice tone="error">{error}</Notice></div> : null}{notice ? <div className="mt-4"><Notice tone="success">{notice}</Notice></div> : null}<AdminButton type="submit" loading={saving} className="mt-5"><Save className="h-4 w-4" /> Save identity</AdminButton></form>
        <div className="space-y-5"><section className="admin-subtle-panel rounded-3xl p-5"><ShieldCheck className="h-5 w-5 text-gold" /><h2 className="mt-4 font-serif text-3xl text-[var(--admin-ink)]">Admin access stays deliberate.</h2><p className="mt-3 text-sm leading-relaxed text-[var(--admin-muted)]">Only users listed in <code>public.admin_users</code> can edit Studio. Add or remove access from Supabase’s SQL Editor, not from an open browser form.</p></section><section className="admin-panel rounded-3xl p-5"><p className="admin-label">Production checklist</p><ol className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--admin-muted)]"><li className="flex gap-2"><span className="text-gold">1.</span> Add the two Vite Supabase variables in Vercel.</li><li className="flex gap-2"><span className="text-gold">2.</span> Add your Vercel URL to Supabase Auth redirect URLs.</li><li className="flex gap-2"><span className="text-gold">3.</span> Create an Auth user, then give its UUID an owner or editor role.</li><li className="flex gap-2"><span className="text-gold">4.</span> Publish a profile and test the public page.</li></ol></section></div>
      </div>
    </div>
  )
}
