import { useParams, Link } from 'react-router-dom'
import { useRef } from 'react'
import { Section, Eyebrow, VerifiedBadge, Tag, Button } from '../components/ui'
import { Reveal } from '../components/Reveal'
import { Portrait } from '../components/Portrait'
import { ShieldIcon, LockIcon } from '../components/icons'
import { getSiteContactSettings, useSiteData } from '../lib/site-data'
import { InquiryActions, ProfileContactPanel } from '../components/ProfileContactActions'

function RequestForm({ name, contacts }: { name: string; contacts: { phone: string; whatsapp: string; telegram: string } }) {
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl border border-ivory/10 bg-noir-soft/50 p-7"
    >
      <h3 className="font-serif text-2xl text-ivory">Request an experience with {name}</h3>
      <p className="mt-2 text-sm text-ivory-dim">
        Shared only with our concierge. Use an alias if you prefer — verification
        happens later, privately.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Preferred name / alias</span>
          <input name="Preferred name / alias" required className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="How should we address you?" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Secure contact</span>
          <input name="Secure contact" required className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="Encrypted email or signal handle" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Experience</span>
            <select name="Experience" className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory focus:border-gold/50 focus:outline-none">
              <option>Personal meeting</option>
              <option>Social companionship</option>
              <option>City experience</option>
              <option>Private celebration</option>
              <option>Cultural evening</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">Preferred date</span>
            <input name="Preferred date" type="date" className="w-full rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory focus:border-gold/50 focus:outline-none" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ivory-dim">A note (optional)</span>
          <textarea name="Note" rows={3} className="w-full resize-none rounded-xl border border-ivory/15 bg-noir/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/40 focus:border-gold/50 focus:outline-none" placeholder="Anything that helps us tailor the experience." />
        </label>

        <label className="flex items-start gap-3 text-xs text-ivory-dim">
          <input type="checkbox" name="18+ consent" required className="mt-0.5 h-4 w-4 accent-[#9b1b2e]" />
          <span>
            I am 18+ and I understand this is a mutual, consent-based introduction.
            Either party may decline or end an engagement at any time.
          </span>
        </label>

        <InquiryActions subject={`Request for ${name}`} formRef={formRef} contacts={contacts} />
        <p className="text-center text-[0.7rem] text-ivory-dim/60">Choose WhatsApp or Telegram to send the filled enquiry. Call opens your dialler.</p>
      </div>
    </form>
  )
}

export function ProfileDetail() {
  const { id } = useParams()
  const { companions, settings } = useSiteData()
  const contacts = getSiteContactSettings(settings)
  const c = id ? companions.find((companion) => companion.id === id) : undefined

  if (!c) {
    return (
      <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-4xl text-ivory">Profile not found</h1>
        <p className="mt-4 text-ivory-dim">This companion may no longer be listed.</p>
        <div className="mt-8"><Button to="/discover">Back to discovery</Button></div>
      </Section>
    )
  }

  return (
    <div className="pt-28">
      <Section>
        <Link to="/discover" className="text-xs uppercase tracking-[0.2em] text-ivory-dim hover:text-gold-soft">
          ← Back to the circle
        </Link>
      </Section>

      <Section className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Editorial portrait */}
        <Reveal>
          <div className="sticky top-28">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-ivory/10">
              <Portrait image={c.image} name={c.name} kind={c.imageKind} loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent pointer-events-none" />
              {c.verified && <VerifiedBadge className="absolute right-4 top-4" />}
            </div>
          </div>
        </Reveal>

        {/* Detail column */}
        <div>
          <Reveal>
            <Eyebrow>{c.tier} Companion</Eyebrow>
            <h1 className="mt-4 text-5xl text-ivory sm:text-6xl">{c.name}</h1>
            <p className="mt-3 font-serif text-xl italic text-gold-soft">{c.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory-dim">
              <span>{c.age} years</span>
              <span className="text-ivory/30">·</span>
              <span>{c.cities.join(', ')}</span>
              <span className="text-ivory/30">·</span>
              <span>{c.languages.join(', ')}</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4 leading-relaxed text-ivory-dim">
              {c.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-7 rounded-2xl border border-gold/20 bg-gold/5 p-4 sm:p-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">Private contact options</p>
              <p className="mt-2 text-sm leading-relaxed text-ivory-dim">Choose WhatsApp, Telegram, or a phone call. Each option opens a clear contact panel before it leaves this page.</p>
              <ProfileContactPanel name={c.name} phone={contacts.phone} whatsapp={contacts.whatsapp} telegramUsername={contacts.telegram} className="mt-4 max-w-lg" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {c.interests.map((i) => <Tag key={i}>{i}</Tag>)}
                </div>
              </div>
              <div>
                <h4 className="eyebrow mb-3">Personality</h4>
                <div className="flex flex-wrap gap-2">
                  {c.traits.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8">
              <h4 className="eyebrow mb-3">Preferred social experiences</h4>
              <div className="flex flex-wrap gap-2">
                {c.experiences.map((e) => (
                  <span key={e} className="rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-sm text-gold-soft">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Availability */}
          <Reveal delay={0.25}>
            <div className="mt-8 rounded-2xl border border-ivory/10 bg-noir-soft/40 p-6">
              <h4 className="eyebrow mb-4">Availability</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {c.availability.map((a) => (
                  <div key={a.day} className="flex items-center justify-between rounded-lg bg-noir/40 px-4 py-2.5 text-sm">
                    <span className="text-ivory">{a.day}</span>
                    <span className="text-gold-soft">{a.slots}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Verification & safety */}
          <Reveal delay={0.3}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-6">
                <div className="h-7 w-7 text-gold"><ShieldIcon /></div>
                <h4 className="mt-3 font-serif text-lg text-ivory">Verification</h4>
                <p className="mt-2 text-sm text-ivory-dim">
                  Identity, photos, and background confirmed through our discreet
                  verification process.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-6">
                <div className="h-7 w-7 text-gold"><LockIcon /></div>
                <h4 className="mt-3 font-serif text-lg text-ivory">Safety</h4>
                <p className="mt-2 text-sm text-ivory-dim">
                  Check-in protocols and a 24/7 concierge line accompany every
                  arranged experience.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Request form */}
          <div className="mt-10" id="enquire">
            <Reveal delay={0.35}>
              <RequestForm name={c.name} contacts={contacts} />
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  )
}
