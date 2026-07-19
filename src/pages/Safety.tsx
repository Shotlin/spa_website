import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'

export function Safety() {
  return (
    <div className="pt-32 pb-20">
      <Section className="max-w-4xl">
        <Reveal>
          <Eyebrow>Protocols</Eyebrow>
          <h1 className="mt-5 text-5xl md:text-6xl text-ivory font-serif">Safety & Verification</h1>
          <p className="mt-5 text-lg text-ivory-dim leading-relaxed">
            Our platform operates on a foundation of mutual consent, verification, and support. We hold both companions and clients to the highest safety standards to ensure secure and respectful social meetings.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-8 sm:grid-cols-2">
          <RevealItem>
            <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="font-serif text-2xl text-ivory">Companion Screening</h3>
              <p className="mt-4 text-sm text-ivory-dim leading-relaxed font-light">
                Every companion listed in our directory undergoes a rigorous face-to-face onboarding process. This includes verifying their government-issued identity, cross-checking recent photo portfolios, and performing background checks. We ensure they are independent individuals who have chosen to list themselves under their own terms.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="font-serif text-2xl text-ivory">Client Verification</h3>
              <p className="mt-4 text-sm text-ivory-dim leading-relaxed font-light">
                To protect our circle, new clients must complete a private verification process prior to their first introduction. This is handled securely and confidentially by our concierge team. We accept professional references, social media verification, or valid work credentials. Your data is encrypted and immediately deleted post-verification.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="font-serif text-2xl text-ivory">Safety Check-ins</h3>
              <p className="mt-4 text-sm text-ivory-dim leading-relaxed font-light">
                Every experience is monitored by our active concierge check-in protocol. Companions check in upon arrival and departure. If a check-in is missed, our emergency response team is immediately mobilized to verify their safety.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="rounded-2xl border border-ivory/10 bg-noir-soft/40 p-8 hover:border-gold/30 transition-all duration-300">
              <h3 className="font-serif text-2xl text-ivory">Zero-Tolerance Policy</h3>
              <p className="mt-4 text-sm text-ivory-dim leading-relaxed font-light">
                Consent is absolute. Any behavior violating mutual boundaries, verbal or physical harassment, or sharing private details will result in permanent exclusion from our services. We share verification flags with other high-end circles to prevent bad actors from entering.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>
    </div>
  )
}
