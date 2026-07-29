import { MessageCircle, Phone } from 'lucide-react'

const DEMO_CONTACT_NUMBER = '+91 98765 43210'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function profileContactDetails(phone?: string, whatsapp?: string) {
  const callNumber = phone?.trim() || DEMO_CONTACT_NUMBER
  const whatsappNumber = whatsapp?.trim() || callNumber
  return {
    displayNumber: callNumber,
    telHref: `tel:${digits(callNumber)}`,
    whatsappHref: `https://wa.me/${digits(whatsappNumber)}`,
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
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
        WhatsApp now
      </a>
    </div>
  )
}
