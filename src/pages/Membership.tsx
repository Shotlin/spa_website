import { useState } from 'react'
import { Section, Eyebrow, Button } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { ShieldIcon, LockIcon, CheckIcon, HeartIcon } from '../components/icons'
import { tiers } from '../data/content'

function EnquiryForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="rounded-3xl border border-gold/30 bg-gold/5 p-10 text-center">
        <div className="mx-auto h-11 w-11 text-gold"><CheckIcon /></div>
        <h3 className="mt-4 font-serif text-3xl text-ivory">Thank you</h3>
        <p className="mx-auto mt-3 max-w-md text-ivory-dim">
          Your private enquiry has reached our concierge. We will respond
          discreetly through the secure channel you provided.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true) }}
      className="rounded-3xl border border-ivory/10 bg-noir-soft/50 p-8 md:p-10"
    >
      <Eyebrow>Private Enquiry</Eyebrow>
      <h2 className="mt-4 text-3xl text-ivory sm:text-4xl">Speak with our concierge</h2>
      <p className="mt-3 text-sm text-ivory-dim">
        Everything here is confidential and encrypted. Use an alias if you prefer.
      </p>

      <div className="mt-8 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Preferred name / alias</span>
            <input required className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="How to address you" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">City of interest</span>
            <input className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="Mumbai, Delhi, Surat…" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Secure contact</span>
          <input required className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="Encrypted email or Signal handle" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Membership tier of interest</span>
          <select className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory focus:border-gold/50 focus:outline-none">
            {tiers.map((t) => <option key={t.name}>{t.name}</option>)}
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">How can we help?</span>
          <textarea rows={4} className="w-full resize-none rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="Tell us a little about what you're looking for." />
        </label>

        <label className="flex items-start gap-3 text-xs text-ivory-dim">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#9b1b2e]" />
          <span>
            I confirm I am 18 or older and I accept the consent and conduct policy.
            I understand introductions are mutual and either party may decline.
          </span>
        </label>

        <Button type="submit" className="mt-2 w-full">Send private enquiry</Button>
        <p className="text-center text-[0.7rem] text-ivory-dim/60">
          Encrypted end to end · Never shared or resold · Deleted on request
        </p>
      </div>
    </form>
  )
}

export function Membership() {
  const guarantees = [
    { icon: HeartIcon, title: 'Consent policy', body: 'Every engagement is mutual and revocable. Boundaries are set in advance and always honoured.' },
    { icon: LockIcon, title: 'Privacy guarantee', body: 'Aliases by default, end-to-end encryption, and a strict no-resale commitment on all data.' },
    { icon: ShieldIcon, title: 'Identity verification', body: 'A discreet, secure process verifies both members and companions before any introduction.' },
    { icon: CheckIcon, title: 'Secure communication', body: 'All messaging runs through encrypted channels with a 24/7 concierge on hand.' },
  ]
  const tierImages = ['model-1', 'model-3', 'model-5']

  return (
    <div className="overflow-hidden pt-32">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_0.72fr] lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>Membership &amp; Private Enquiry</Eyebrow>
            <h1 className="mt-5 text-5xl text-ivory sm:text-6xl">
              Discretion, as a standard
            </h1>
            <p className="mt-5 text-lg text-ivory-dim">
              Membership is how we keep the circle small, verified, and safe for
              everyone in it. Choose a tier, or simply begin a private enquiry below.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:mr-0">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/20 bg-noir-soft shadow-[0_28px_80px_-34px_rgba(155,27,46,0.75)]">
              <Portrait image="model-1" name="A private Circle member" kind="decor" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">The inner circle</span>
                <span className="mt-2 block max-w-[13rem] font-serif text-2xl leading-none text-ivory">A calmer way to make a connection.</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section className="mt-16">
        <RevealGroup className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, index) => (
            <RevealItem key={t.name}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                  t.featured
                    ? 'border-gold/50 bg-gradient-to-b from-gold/10 to-transparent shadow-[0_20px_60px_-20px_rgba(200,163,73,0.4)]'
                    : 'border-ivory/10 bg-noir-soft/40 hover:border-gold/30'
                }`}
              >
                <div className="relative h-36 shrink-0 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                    <Portrait image={tierImages[index % tierImages.length]} name={`${t.name} membership`} kind="decor" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/15 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[0.6rem] uppercase tracking-[0.24em] text-gold-soft">Private tier</span>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  {t.featured && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-gold/20 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold-soft">
                      Most chosen
                    </span>
                  )}
                  <h3 className="font-serif text-3xl text-ivory">{t.name}</h3>
                  <p className="mt-2 text-sm text-ivory-dim">{t.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-gold-soft">{t.price}</span>
                    {t.cadence && <span className="text-xs uppercase tracking-wider text-ivory-dim">{t.cadence}</span>}
                  </div>
                  <ul className="mt-7 flex-1 space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-ivory-dim">
                        <span className="mt-0.5 h-4 w-4 shrink-0 text-gold"><CheckIcon /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href="#enquire" variant={t.featured ? 'solid' : 'outline'} className="w-full">
                      {t.price === 'By invitation' ? 'Request an invitation' : 'Select ' + t.name}
                    </Button>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_0.56fr]">
          <Reveal className="max-w-2xl">
            <Eyebrow>Our assurances</Eyebrow>
            <h2 className="mt-5 text-4xl text-ivory sm:text-5xl">What every member is promised</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft">
              <Portrait image="scene-5" name="A warm private lounge" kind="decor" />
              <div className="absolute inset-0 bg-gradient-to-r from-noir/55 to-transparent" />
              <figcaption className="absolute bottom-4 left-5 text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">Made for ease</figcaption>
            </figure>
          </Reveal>
        </div>

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => {
            const Icon = g.icon
            return (
              <RevealItem key={g.title}>
                <div className="h-full rounded-2xl border border-ivory/10 bg-noir-soft/40 p-7 transition-colors hover:border-gold/30">
                  <div className="h-9 w-9 text-gold"><Icon /></div>
                  <h3 className="mt-5 font-serif text-xl text-ivory">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{g.body}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      <Section id="enquire" className="grid gap-10 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal><EnquiryForm /></Reveal>
        <Reveal delay={0.15}>
          <div className="relative flex h-full overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft">
            <div className="absolute inset-0">
              <Portrait image="scene-3" name="Your private concierge" kind="decor" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-noir via-noir/90 to-burgundy-deep/55" />
            <div className="relative z-10 flex h-full w-full flex-col justify-center p-8 md:p-10">
              <Eyebrow>Concierge</Eyebrow>
              <h3 className="mt-4 font-serif text-3xl text-ivory">A single, private point of contact</h3>
              <p className="mt-4 leading-relaxed text-ivory-dim">
                Members are looked after by a dedicated concierge who handles every
                detail — matching, scheduling, travel, and discretion — so nothing is
                ever left to chance.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-ivory/10 bg-noir/55 px-5 py-4 backdrop-blur-sm">
                  <span className="h-6 w-6 text-gold"><LockIcon /></span>
                  <div>
                    <p className="text-sm text-ivory">Encrypted concierge line</p>
                    <p className="text-xs text-ivory-dim">Available to members 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-ivory/10 bg-noir/55 px-5 py-4 backdrop-blur-sm">
                  <span className="h-6 w-6 text-gold"><ShieldIcon /></span>
                  <div>
                    <p className="text-sm text-ivory">Verified introductions only</p>
                    <p className="text-xs text-ivory-dim">Both sides confirmed before you meet</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-ivory-dim/80">
                VIP Spa operates on consent, privacy, and mutual respect. We do not
                facilitate anything unlawful, and we reserve the right to decline any
                enquiry. Members and companions are 18+.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
