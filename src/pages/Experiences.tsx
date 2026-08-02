import { Section, Eyebrow } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { ManagedContentBlocks } from '../components/ManagedContentBlocks'
import { InfiniteProfileFeed } from '../components/InfiniteProfileFeed'
import { InquiryActions } from '../components/ProfileContactActions'
import { experiences } from '../data/content'
import { getSiteContactSettings, useSiteData } from '../lib/site-data'

export function Experiences() {
  const { companions, settings } = useSiteData()
  const contacts = getSiteContactSettings(settings)
  return (
    <div className="pt-24">
      <Section className="pb-7">
        <Reveal className="max-w-2xl"><Eyebrow>Curated Experiences</Eyebrow><h1 className="mt-4 text-4xl text-ivory sm:text-5xl">Every evening, composed with intent</h1><p className="mt-4 text-lg text-ivory-dim">From an unhurried dinner to a private celebration, each experience is arranged around comfort, privacy, and mutual consent.</p></Reveal>
      </Section>
      <ManagedContentBlocks page="experiences" />
      <Section className="space-y-4 pb-7 pt-7">
        {experiences.map((experience, index) => <Reveal key={experience.id} delay={index * 0.04}><article className="rounded-3xl border border-ivory/10 bg-noir-soft/45 p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="max-w-2xl"><span className="text-xs uppercase tracking-[0.28em] text-gold-soft">{experience.duration}</span><h2 className="mt-2 text-3xl text-ivory sm:text-4xl">{experience.title}</h2><p className="mt-3 leading-relaxed text-ivory-dim">{experience.detail}</p></div><div className="w-full sm:max-w-sm"><InquiryActions subject={experience.title} details={{ Experience: experience.title, Duration: experience.duration, Details: experience.detail, 'Page link': typeof window === 'undefined' ? '/experiences' : window.location.href }} contacts={contacts} /></div></div></article></Reveal>)}
      </Section>
      <Section className="py-10"><InfiniteProfileFeed companions={companions} contacts={contacts} title="Companions for the occasion" description="Browse the full live Surat roster without page limits." /></Section>
      <Section className="pb-10 pt-4"><Reveal><div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-burgundy-deep/60 to-noir p-7 text-center sm:p-10"><h2 className="mx-auto max-w-xl text-4xl text-ivory sm:text-5xl">Ready to design your evening?</h2><p className="mx-auto mt-3 max-w-md text-ivory-dim">Choose a channel and the complete experience details are prepared for the concierge.</p><div className="mx-auto mt-6 max-w-md"><InquiryActions subject="Custom evening enquiry" details={{ Page: 'Experiences', Request: 'I would like help designing a private evening.', 'Page link': typeof window === 'undefined' ? '/experiences' : window.location.href }} contacts={contacts} /></div></div></Reveal></Section>
    </div>
  )
}
