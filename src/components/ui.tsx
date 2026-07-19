import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { VerifiedIcon } from './icons'

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'outline' | 'ghost'
  type?: 'button' | 'submit'
  className?: string
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  type = 'button',
  className = '',
}: ButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs font-medium uppercase tracking-[0.28em] transition-all duration-500'
  const styles = {
    solid:
      'bg-gradient-to-r from-ruby to-burgundy text-ivory shadow-[0_10px_40px_-12px_rgba(155,27,46,0.7)] hover:shadow-[0_14px_50px_-10px_rgba(192,35,56,0.85)] hover:-translate-y-0.5',
    outline:
      'border border-gold/40 text-gold-soft hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5',
    ghost: 'text-ivory-dim hover:text-gold-soft',
  }[variant]

  const cls = `${base} ${styles} ${className}`

  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}

export function VerifiedBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-noir/60 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-soft backdrop-blur ${className}`}
      title="Identity verified"
    >
      <span className="h-3 w-3 text-gold">
        <VerifiedIcon />
      </span>
      Verified
    </span>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-ivory/12 bg-ivory/5 px-3 py-1 text-[0.68rem] tracking-wide text-ivory-dim">
      {children}
    </span>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-gold/50" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>
      {children}
    </section>
  )
}
