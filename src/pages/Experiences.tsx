import { Link } from 'react-router-dom'
import { Section, Eyebrow, Button } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { experiences } from '../data/content'

export function Experiences() {
  return (
    <div className="pt-32">
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Curated Experiences</Eyebrow>
          <h1 className="mt-5 text-5xl text-ivory sm:text-6xl">
            Every evening, composed with intent
          </h1>
          <p className="mt-5 text-lg text-ivory-dim">
            From an unhurried dinner to a private celebration or a weekend by the
            coast, each experience is arranged around your comfort, your privacy,
            and mutual consent.
          </p>
        </Reveal>
      </Section>

      <Section className="mt-16 space-y-6 pb-8">
        {experiences.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.05}>
            <article
              className={`group grid overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft/40 md:grid-cols-2 ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="relative h-72 overflow-hidden md:h-auto">
                <div className="absolute inset-0 transition-transform duration-[1.5s] group-hover:scale-105">
                  <Portrait image={e.scene} name={e.title} kind="scene" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/50 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.28em] text-gold-soft">{e.duration}</span>
                <h2 className="mt-3 text-3xl text-ivory sm:text-4xl">{e.title}</h2>
                <p className="mt-4 leading-relaxed text-ivory-dim">{e.detail}</p>
                <div className="mt-7">
                  <Button to="/discover" variant="outline">Find a companion</Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Section>

      {/* How it works */}
      <Section className="py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-5 text-4xl text-ivory sm:text-5xl">Four discreet steps</h2>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { n: '01', t: 'Enquire privately', d: 'Send an encrypted enquiry using an alias if you wish.' },
            { n: '02', t: 'Get verified', d: 'A discreet, secure check confirms identity on both sides.' },
            { n: '03', t: 'Curated match', d: 'Your concierge proposes companions suited to the occasion.' },
            { n: '04', t: 'Meet with ease', d: 'Everything is arranged; you simply arrive and enjoy.' },
          ].map((s) => (
            <RevealItem key={s.n}>
              <div className="h-full rounded-2xl border border-ivory/10 bg-noir-soft/40 p-7">
                <span className="font-serif text-4xl text-gold/40">{s.n}</span>
                <h3 className="mt-4 font-serif text-xl text-ivory">{s.t}</h3>
                <p className="mt-2 text-sm text-ivory-dim">{s.d}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* CTA */}
      <Section className="pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-burgundy-deep/60 to-noir p-12 text-center md:p-16">
            <h2 className="mx-auto max-w-xl text-4xl text-ivory sm:text-5xl">
              Ready to design your evening?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ivory-dim">
              Begin with a private enquiry. No detail is shared publicly, ever.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/membership">Begin an enquiry</Button>
              <Link to="/discover" className="inline-flex items-center px-4 text-sm uppercase tracking-[0.2em] text-gold-soft">
                Browse the circle →
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
