import { Phone, X } from 'lucide-react'
import { useState } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

const DEMO_CONTACT_NUMBER = '+91 98765 43210'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function profileContactDetails(phone?: string, whatsapp?: string, telegramUsername?: string) {
  const callNumber = phone?.trim() || DEMO_CONTACT_NUMBER
  const whatsappNumber = whatsapp?.trim() || callNumber
  const username = telegramUsername?.trim().replace(/^@/, '')
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href
  return {
    displayNumber: callNumber,
    telHref: `tel:${digits(callNumber)}`,
    whatsappHref: `https://wa.me/${digits(whatsappNumber)}`,
    telegramHref: username
      ? `https://t.me/${encodeURIComponent(username)}`
      : `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('I would like to enquire privately about this Surat profile.')}`,
  }
}

type ProfileContactActionsProps = {
  name: string
  phone?: string
  whatsapp?: string
  className?: string
}

export function ProfileContactActions({ name, phone, whatsapp, className = '' }: ProfileContactActionsProps) {
  const contact = profileContactDetails(phone, whatsapp)

  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <a
        href={contact.telHref}
        aria-label={`Call ${name} at ${contact.displayNumber}`}
        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-gold/35 bg-gold/10 px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.11em] text-gold-soft transition hover:border-gold hover:bg-gold/20 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        Call me
      </a>
      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open WhatsApp to message ${name}`}
        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-[#07140c] transition hover:bg-[#45df7d] focus:outline-none focus:ring-2 focus:ring-[#45df7d]"
      >
        <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
        WhatsApp now
      </a>
    </div>
  )
}

type ProfileContactPanelProps = ProfileContactActionsProps & {
  telegramUsername?: string
}

type ContactChannel = 'call' | 'whatsapp' | 'telegram'

export function ProfileContactPanel({ name, phone, whatsapp, telegramUsername, className = '' }: ProfileContactPanelProps) {
  const [active, setActive] = useState<ContactChannel | null>(null)
  const contact = profileContactDetails(phone, whatsapp, telegramUsername)
  const hasTelegramUsername = Boolean(telegramUsername?.trim())
  const channelCopy: Record<ContactChannel, { title: string; body: string; href: string; action: string }> = {
    call: {
      title: 'Call securely',
      body: `Calling ${contact.displayNumber} opens your device dialler.`,
      href: contact.telHref,
      action: 'Start call',
    },
    whatsapp: {
      title: 'Message on WhatsApp',
      body: 'WhatsApp opens a private conversation in a new window or the installed app.',
      href: contact.whatsappHref,
      action: 'Open WhatsApp',
    },
    telegram: {
      title: hasTelegramUsername ? 'Message on Telegram' : 'Share on Telegram',
      body: hasTelegramUsername
        ? 'Telegram opens the profile’s configured username directly.'
        : 'Telegram opens its secure share composer so you can choose a recipient.',
      href: contact.telegramHref,
      action: hasTelegramUsername ? 'Open Telegram' : 'Open Telegram share',
    },
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-3" aria-label={`Contact ${name}`}>
        <button type="button" onClick={() => setActive('whatsapp')} className="group grid min-h-24 place-items-center rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-3 text-center transition hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366]/20 focus:outline-none focus:ring-2 focus:ring-[#25D366]">
          <FaWhatsapp className="h-7 w-7 text-[#25D366] transition-transform group-hover:scale-110" aria-hidden="true" />
          <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ivory">WhatsApp</span>
        </button>
        <button type="button" onClick={() => setActive('telegram')} className="group grid min-h-24 place-items-center rounded-2xl border border-[#2AABEE]/40 bg-[#2AABEE]/10 px-3 text-center transition hover:-translate-y-0.5 hover:border-[#2AABEE] hover:bg-[#2AABEE]/20 focus:outline-none focus:ring-2 focus:ring-[#2AABEE]">
          <FaTelegramPlane className="h-7 w-7 text-[#2AABEE] transition-transform group-hover:scale-110" aria-hidden="true" />
          <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ivory">Telegram</span>
        </button>
        <button type="button" onClick={() => setActive('call')} className="group grid min-h-24 place-items-center rounded-2xl border border-gold/35 bg-gold/10 px-3 text-center transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-gold">
          <Phone className="h-7 w-7 text-gold-soft transition-transform group-hover:scale-110" aria-hidden="true" />
          <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ivory">Call</span>
        </button>
      </div>

      {active ? (
        <div role="dialog" aria-modal="true" aria-label={channelCopy[active].title} className="mt-4 rounded-2xl border border-ivory/15 bg-noir/90 p-5 shadow-2xl backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-2xl text-ivory">{channelCopy[active].title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{channelCopy[active].body}</p>
            </div>
            <button type="button" onClick={() => setActive(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ivory/15 text-ivory-dim hover:border-gold/50 hover:text-gold-soft" aria-label="Close contact options"><X className="h-4 w-4" /></button>
          </div>
          <a href={channelCopy[active].href} target={active === 'call' ? undefined : '_blank'} rel={active === 'call' ? undefined : 'noreferrer'} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-ruby to-burgundy px-4 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition hover:brightness-110">
            {channelCopy[active].action}
          </a>
        </div>
      ) : null}
    </div>
  )
}
