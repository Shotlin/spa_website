import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'

export function Safety() {
  return (
    <div className="overflow-hidden pt-32 pb-20">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_0.7fr] lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>Protocols</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl text-ivory md:text-6xl">Safety &amp; Verification</h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory-dim">
              Our platform operates on a foundation of mutual consent, verification, and support. We hold both companions and clients to the highest safety standards to ensure secure and respectful social meetings.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:mr-0">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/20 bg-noir-soft shadow-[0_28px_80px_-34px_rgba(155,27,46,0.75)]">
              <Portrait image="scene-7" name="A composed private setting" kind="decor" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">The private standard</span>
                <span className="mt-2 block max-w-[14rem] font-serif text-2xl leading-none text-ivory">Built around people feeling safe, seen, and respected.</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section className="mt-16">
        <RevealGroup className="grid gap-8 sm:grid-cols-2">
          <RevealItem>
            <article className="group h-full overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                  <Portrait image="model-3" name="Companion screening" kind="decor" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 to-transparent" />
                <span className="absolute bottom-4 left-6 text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">01 / Face to face</span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-ivory">Companion Screening</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim">
                  Every companion listed in our directory undergoes a rigorous face-to-face onboarding process. This includes verifying their government-issued identity, cross-checking recent photo portfolios, and performing background checks. We ensure they are independent individuals who have chosen to list themselves under their own terms.
                </p>
              </div>
            </article>
          </RevealItem>

          <RevealItem>
            <article className="group h-full overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                  <Portrait image="scene-2" name="Client verification" kind="decor" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 to-transparent" />
                <span className="absolute bottom-4 left-6 text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">02 / Confidential</span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-ivory">Client Verification</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim">
                  To protect our circle, new clients must complete a private verification process prior to their first introduction. This is handled securely and confidentially by our concierge team. We accept professional references, social media verification, or valid work credentials. Your data is encrypted and immediately deleted post-verification.
                </p>
              </div>
            </article>
          </RevealItem>

          <RevealItem>
            <article className="group h-full overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                  <Portrait image="scene-4" name="Safety check-ins" kind="decor" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 to-transparent" />
                <span className="absolute bottom-4 left-6 text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">03 / Always present</span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-ivory">Safety Check-ins</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim">
                  Every experience is monitored by our active concierge check-in protocol. Companions check in upon arrival and departure. If a check-in is missed, our emergency response team is immediately mobilized to verify their safety.
                </p>
              </div>
            </article>
          </RevealItem>

          <RevealItem>
            <article className="group h-full overflow-hidden rounded-2xl border border-ivory/10 bg-noir-soft/40 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-105">
                  <Portrait image="model-5" name="Consent and conduct" kind="decor" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 to-transparent" />
                <span className="absolute bottom-4 left-6 text-[0.6rem] uppercase tracking-[0.26em] text-gold-soft">04 / Non-negotiable</span>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-ivory">Zero-Tolerance Policy</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim">
                  Consent is absolute. Any behavior violating mutual boundaries, verbal or physical harassment, or sharing private details will result in permanent exclusion from our services. We share verification flags with other high-end circles to prevent bad actors from entering.
                </p>
              </div>
            </article>
          </RevealItem>
        </RevealGroup>
      </Section>
    </div>
  )
}
