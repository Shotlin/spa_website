import { useState } from 'react'
import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'

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
    <div className="border-b border-ivory/10 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="font-serif text-lg md:text-xl text-ivory hover:text-gold-soft transition-colors duration-300">
          {question}
        </span>
        <span className="text-gold-soft text-xl font-light transform transition-transform duration-300">
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-60 mt-3 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm md:text-base text-ivory-dim leading-relaxed font-light">
          {answer}
        </p>
      </div>
    </div>
  )
}

export function Faq() {
  return (
    <div className="pt-32 pb-20">
      <Section className="max-w-4xl">
        <Reveal>
          <Eyebrow>Support Desk</Eyebrow>
          <h1 className="mt-5 text-5xl md:text-6xl text-ivory font-serif">Frequently Asked Questions</h1>
          <p className="mt-5 text-lg text-ivory-dim max-w-2xl leading-relaxed">
            All aspects of the booking process, security guidelines, and safety practices explained transparently. If you have an enquiry not addressed below, please reach out to our concierge.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <RevealItem key={i}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </div>
  )
}
