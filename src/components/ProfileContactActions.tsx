import { Phone, X } from 'lucide-react'
import { useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'

const DEMO_CONTACT_NUMBER = '+91 98765 43210'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function profileContactDetails(phone?: string, whatsapp?: string, telegramUsername?: string) {
  const callNumber = phone?.trim() || DEMO_CONTACT_NUMBER
  const whatsappNumber = whatsapp?.trim() || callNumber
  const telegramValue = telegramUsername?.trim() || ''
  const username = telegramValue.replace(/^@/, '')
  return {
    displayNumber: callNumber,
    telHref: `tel:${digits(callNumber)}`,
    whatsappHref: `https://wa.me/${digits(whatsappNumber)}`,
    telegramHref: username
      ? (telegramValue.startsWith('http') ? telegramValue : `https://t.me/${encodeURIComponent(username)}`)
      : 'https://t.me/share/url',
  }
}

function currentPage() {
  return typeof window === 'undefined' ? '' : window.location.href
}

function createMessage(subject: string, details: Record<string, string | boolean>) {
  const lines = Object.entries(details)
    .filter(([, value]) => typeof value === 'boolean' ? value : value.trim())
    .map(([key, value]) => `${key}: ${value}`)
  return [`Private enquiry: ${subject}`, ...lines, '', 'Please keep this enquiry confidential.'].join('\n')
}

function channelHrefs(contact: ReturnType<typeof profileContactDetails>, message: string) {
  return {
    call: contact.telHref,
    whatsapp: `${contact.whatsappHref}?text=${encodeURIComponent(message)}`,
    // Telegram's share composer reliably carries the prepared message and page link.
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentPage())}&text=${encodeURIComponent(message)}`,
  }
}

function ContactSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ivory/12 bg-noir-soft/95 p-2 ${className}`}>
      {children}
    </div>
  )
}

type ProfileContactActionsProps = {
  name: string
  phone?: string
  whatsapp?: string
  telegramUsername?: string
  description?: string
  profileUrl?: string
  imageUrl?: string
  iconOnly?: boolean
  className?: string
}

export function ProfileContactActions({ name, phone, whatsapp, telegramUsername, description = '', profileUrl, imageUrl, iconOnly = false, className = '' }: ProfileContactActionsProps) {
  const contact = profileContactDetails(phone, whatsapp, telegramUsername)
  const message = createMessage(name, {
    Profile: name,
    Description: description,
    'View profile': profileUrl || currentPage(),
    Image: imageUrl || profileUrl || currentPage(),
  })
  const hrefs = channelHrefs(contact, message)
  const actionClass = iconOnly
    ? 'grid h-11 w-11 place-items-center rounded-full text-lg drop-shadow-[0_2px_3px_rgba(0,0,0,0.78)] transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2'
    : 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.09em] transition focus:outline-none focus:ring-2'

  const content = <div className={`grid ${iconOnly ? 'grid-cols-3 place-items-center gap-1' : 'grid-cols-3 gap-2'}`} aria-label={`Contact ${name}`}>
    <a href={hrefs.call} aria-label={`Call about ${name}`} className={`${actionClass} ${iconOnly ? 'text-gold-soft hover:bg-noir/55 focus:ring-gold' : 'border-gold/50 bg-gold/15 text-gold-soft hover:border-gold focus:ring-gold'}`}><Phone className={iconOnly ? 'h-5 w-5' : 'h-4 w-4'} /><span className={iconOnly ? 'sr-only' : ''}>Call</span></a>
    <a href={hrefs.whatsapp} target="_blank" rel="noreferrer" aria-label={`Message about ${name} on WhatsApp`} className={`${actionClass} ${iconOnly ? 'text-[#45df7d] hover:bg-noir/55 focus:ring-[#45df7d]' : 'border border-[#25D366]/55 bg-[#25D366] text-[#07140c] hover:bg-[#45df7d] focus:ring-[#45df7d]'}`}><FaWhatsapp className={iconOnly ? 'h-5 w-5' : 'h-4 w-4'} /><span className={iconOnly ? 'sr-only' : ''}>WhatsApp</span></a>
    <a href={hrefs.telegram} target="_blank" rel="noreferrer" aria-label={`Share ${name} enquiry on Telegram`} className={`${actionClass} ${iconOnly ? 'text-[#a9e4ff] hover:bg-noir/55 focus:ring-[#2AABEE]' : 'border border-[#2AABEE]/50 bg-[#2AABEE]/20 text-[#a9e4ff] hover:bg-[#2AABEE]/30 focus:ring-[#2AABEE]'}`}><FaTelegramPlane className={iconOnly ? 'h-5 w-5' : 'h-4 w-4'} /><span className={iconOnly ? 'sr-only' : ''}>Telegram</span></a>
  </div>

  return iconOnly ? <div className={className}>{content}</div> : <ContactSurface className={className}>{content}</ContactSurface>
}

type ContactChannel = 'call' | 'whatsapp' | 'telegram'

export function ProfileContactPanel({ name, phone, whatsapp, telegramUsername, description = '', profileUrl, imageUrl, className = '' }: ProfileContactActionsProps) {
  const [active, setActive] = useState<ContactChannel | null>(null)
  const contact = profileContactDetails(phone, whatsapp, telegramUsername)
  const message = createMessage(name, { Profile: name, Description: description, 'View profile': profileUrl || currentPage(), Image: imageUrl || profileUrl || currentPage() })
  const hrefs = channelHrefs(contact, message)
  const copy: Record<ContactChannel, { title: string; body: string; href: string }> = {
    call: { title: 'Call securely', body: `Calling ${contact.displayNumber} opens your device dialler.`, href: hrefs.call },
    whatsapp: { title: 'Message on WhatsApp', body: 'The model details and direct page link are already prepared for you.', href: hrefs.whatsapp },
    telegram: { title: 'Share on Telegram', body: 'Telegram opens with this profile’s details and page link prepared.', href: hrefs.telegram },
  }
  return (
    <div className={className}>
      <ContactSurface><div className="grid grid-cols-3 gap-2"><button type="button" onClick={() => setActive('whatsapp')} className="grid min-h-20 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25"><FaWhatsapp className="h-6 w-6" /><span className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ivory">WhatsApp</span></button><button type="button" onClick={() => setActive('telegram')} className="grid min-h-20 place-items-center rounded-xl bg-[#2AABEE]/15 text-[#2AABEE] hover:bg-[#2AABEE]/25"><FaTelegramPlane className="h-6 w-6" /><span className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ivory">Telegram</span></button><button type="button" onClick={() => setActive('call')} className="grid min-h-20 place-items-center rounded-xl bg-gold/15 text-gold-soft hover:bg-gold/25"><Phone className="h-6 w-6" /><span className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-ivory">Call</span></button></div></ContactSurface>
      {active ? <div role="dialog" aria-modal="true" aria-label={copy[active].title} className="mt-3 rounded-2xl border border-ivory/15 bg-noir/95 p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-serif text-2xl text-ivory">{copy[active].title}</p><p className="mt-2 text-sm leading-relaxed text-ivory-dim">{copy[active].body}</p></div><button type="button" onClick={() => setActive(null)} className="grid h-9 w-9 place-items-center rounded-full border border-ivory/15 text-ivory-dim" aria-label="Close"><X className="h-4 w-4" /></button></div><a href={copy[active].href} target={active === 'call' ? undefined : '_blank'} rel={active === 'call' ? undefined : 'noreferrer'} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gold px-4 text-xs font-bold uppercase tracking-[0.14em] text-noir">Continue</a></div> : null}
    </div>
  )
}

export type InquiryContactSettings = { phone?: string; whatsapp?: string; telegram?: string }

export function InquiryActions({ subject, details, formRef, contacts, disabled = false }: { subject: string; details?: Record<string, string | boolean>; formRef?: RefObject<HTMLFormElement | null>; contacts: InquiryContactSettings; disabled?: boolean }) {
  const contact = profileContactDetails(contacts.phone, contacts.whatsapp, contacts.telegram)
  const readDetails = () => formRef?.current
    ? Object.fromEntries(Array.from(new FormData(formRef.current).entries()).map(([key, value]) => [key, String(value)]))
    : details || {}
  const hrefs = channelHrefs(contact, createMessage(subject, readDetails()))
  const openChannel = (event: MouseEvent<HTMLAnchorElement>, channel: ContactChannel) => {
    if (disabled) { event.preventDefault(); return }
    if (formRef?.current && !formRef.current.checkValidity()) { event.preventDefault(); formRef.current.reportValidity(); return }
    if (!formRef?.current || channel === 'call') return
    event.preventDefault()
    const next = channelHrefs(contact, createMessage(subject, readDetails()))[channel]
    window.open(next, '_blank', 'noopener,noreferrer')
  }
  const actionClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-3 text-[0.61rem] font-bold uppercase tracking-[0.08em] transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-40'
  return <ContactSurface><div className="grid grid-cols-3 gap-2" aria-label={`Contact about ${subject}`}><a aria-disabled={disabled} onClick={(event) => openChannel(event, 'call')} href={hrefs.call} className={`${actionClass} border border-gold/45 bg-gold/15 text-gold-soft focus:ring-gold`}><Phone className="h-4 w-4" /><span className="hidden sm:inline">Call</span></a><a aria-disabled={disabled} onClick={(event) => openChannel(event, 'whatsapp')} href={hrefs.whatsapp} target="_blank" rel="noreferrer" className={`${actionClass} bg-[#25D366] text-[#07140c] focus:ring-[#45df7d]`}><FaWhatsapp className="h-4 w-4" /><span className="hidden sm:inline">WhatsApp</span></a><a aria-disabled={disabled} onClick={(event) => openChannel(event, 'telegram')} href={hrefs.telegram} target="_blank" rel="noreferrer" className={`${actionClass} border border-[#2AABEE]/50 bg-[#2AABEE]/20 text-[#a9e4ff] focus:ring-[#2AABEE]`}><FaTelegramPlane className="h-4 w-4" /><span className="hidden sm:inline">Telegram</span></a></div></ContactSurface>
}
