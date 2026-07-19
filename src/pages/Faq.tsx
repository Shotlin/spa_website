import { useState } from 'react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'

const faqs = [
  {
    question: 'How do I request an introduction with a companion?',
    answer: 'Simply browse the circle and click on the companion you are interested in meeting. Fill out the discrete enquiry form with your preferred alias, contact method (Signal or Telegram preferred), and details about your desired social experience. Our concierge will review the request and get back to you privately.',
  },
  {
    question: 'How is my privacy protected during enquiries?',
    answer: 'We do not collect or store your real identity in any database. Enquiries are sent via encrypted protocols directly to our secure offline triage system. You may use a pseudonym or alias for your initial request. Verification of identity happens over secure, direct communication channels and is immediately purged once verified.',
  },
  {
    question: 'What safety measures are implemented for meetings?',
    answer: 'All companions are fully verified via face-to-face checks, government IDs, and history validation. For every arranged meeting, a secure check-in protocol is followed with our 24/7 support line. Any breach of consent or safety boundaries results in immediate platform ban and reporting to local authorities.',
  },
  {
    question: 'What are the payment and booking policies?',
    answer: 'Introductions are strictly mutual and consent-based. The fees mentioned represent agency logistics, introduction security, and companion presence. Cancellations must be made at least 24 hours in advance. Deposits may be required for Muse or Signature level companions to protect their time.',
  },
  {
    question: 'Are companions available for travel or international trips?',
    answer: 'Yes. Many companions in our circle are available for travel companionship, both within India and internationally. These experiences are structured as travel bookings and require prior concierge verification and longer coordination windows.',
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-ivory/10 py-5 first:border-t">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 text-left focus:outline-none"
      >
        <span className="font-serif text-lg text-ivory transition-colors duration-300 hover:text-gold-soft md:text-xl">
          {question}
        </span>
        <span className="shrink-0 text-xl font-light text-gold-soft transition-transform duration-300">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'mt-3 max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm font-light leading-relaxed text-ivory-dim md:text-base">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <div className="overflow-hidden pt-32 pb-20">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_0.68fr] lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>Support Desk</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl text-ivory md:text-6xl">Frequently Asked Questions</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory-dim">
              All aspects of the booking process, security guidelines, and safety practices explained transparently. If you have an enquiry not addressed below, please reach out to our concierge.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:mr-0">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/20 bg-noir-soft shadow-[0_28px_80px_-34px_rgba(155,27,46,0.75)]">
              <Portrait image="model-4" name="A member of the VIP Spa circle" kind="decor" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">Clear answers, quietly given</span>
                <span className="mt-2 block max-w-[12rem] font-serif text-2xl leading-none text-ivory">Everything begins with a private conversation.</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section className="mt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[0.62fr_minmax(0,1fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft">
              <Portrait image="scene-8" name="The Circle support desk" kind="decor" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-7">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">Private concierge</span>
                <p className="mt-3 max-w-[14rem] font-serif text-3xl leading-[0.95] text-ivory">No automated answers. Just a discreet human point of contact.</p>
              </figcaption>
            </figure>
          </Reveal>

          <RevealGroup className="rounded-3xl border border-ivory/10 bg-noir-soft/35 px-6 py-2 md:px-9">
            {faqs.map((faq, i) => (
              <RevealItem key={i}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>
    </div>
  )
}
