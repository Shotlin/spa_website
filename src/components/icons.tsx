type IconProps = { className?: string }

const base = 'h-full w-full'

export function ShieldIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`}>
      <path d="M12 2l7 3v6c0 4.5-3 8-7 11-4-3-7-6.5-7-11V5l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`}>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CheckIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeartIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={`${base} ${className}`}>
      <path
        d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c2 0 3.5 1.5 4 2.5.5-1 2-2.5 4-2.5 3 0 4.5 3 3 6C19 15.65 12 20 12 20z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VerifiedIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <path
        d="M12 2l2.4 1.8 3 .2.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 .2L12 22l-2.4-1.8-3-.2-.9-2.9L3.3 15l.9-2.9-.9-2.9 2.4-1.8.9-2.9 3-.2L12 2z"
        fill="currentColor"
      />
      <path d="M8.5 12l2.3 2.3 4.7-5" stroke="#0c0708" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export const iconMap = {
  shield: ShieldIcon,
  lock: LockIcon,
  check: CheckIcon,
  heart: HeartIcon,
} as const
