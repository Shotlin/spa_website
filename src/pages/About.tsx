import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Portrait } from '../components/Portrait'

export function About() {
  return (
    <div className="overflow-hidden pt-32 pb-20">
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_0.72fr] lg:gap-16">
          <Reveal className="max-w-2xl">
            <Eyebrow>Philosophy</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl text-ivory md:text-6xl">About the Circle</h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory-dim">
              Founded on the values of choice, respect, and utmost discretion, our circle has evolved from a small collective into India’s most trusted directory for elite companionship.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mx-auto w-full max-w-md lg:mr-0">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/20 bg-noir-soft shadow-[0_28px_80px_-34px_rgba(155,27,46,0.75)]">
              <Portrait image="scene-1" name="An evening at the Circle" kind="decor" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <span className="max-w-[12rem] font-serif text-2xl leading-none text-ivory">An atmosphere made for unhurried connection.</span>
                <span className="rounded-full border border-ivory/25 bg-noir/40 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-gold-soft backdrop-blur-sm">Est. India</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-6 lg:mt-24">
          <RevealItem>
            <article className="grid overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft/40 md:grid-cols-[minmax(0,1fr)_14rem]">
              <div className="flex flex-col justify-center p-7 md:p-10">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">01 / Principle</span>
                <h3 className="mt-3 font-serif text-3xl text-ivory">Our Mission</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim md:text-base">
                  We believe that companionship is a mutual, positive experience built on clear boundaries and shared respect. Our mission is to provide an elite, safe, and entirely private space where companions can safely advertise their presence, and select clients can seek their company with peace of mind.
                </p>
              </div>
              <div className="relative min-h-56 overflow-hidden border-t border-ivory/10 md:min-h-full md:border-t-0 md:border-l">
                <Portrait image="model-2" name="Member of the Circle" kind="decor" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
            </article>
          </RevealItem>

          <RevealItem>
            <article className="grid overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft/40 md:grid-cols-[14rem_minmax(0,1fr)]">
              <div className="relative min-h-56 overflow-hidden border-b border-ivory/10 md:order-first md:min-h-full md:border-r md:border-b-0">
                <Portrait image="scene-4" name="A private setting" kind="decor" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">02 / Promise</span>
                <h3 className="mt-3 font-serif text-3xl text-ivory">Discretion by Design</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim md:text-base">
                  We collect only what is essential to verify safety and facilitate secure introductions. Our systems are custom built to prevent tracker accumulation or database breaches. We operate entirely in the shadows to maintain the absolute privacy of both our models and members.
                </p>
              </div>
            </article>
          </RevealItem>

          <RevealItem>
            <article className="grid overflow-hidden rounded-3xl border border-ivory/10 bg-noir-soft/40 md:grid-cols-[minmax(0,1fr)_14rem]">
              <div className="flex flex-col justify-center p-7 md:p-10">
                <span className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-soft">03 / Standard</span>
                <h3 className="mt-3 font-serif text-3xl text-ivory">A Curated Network</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-ivory-dim md:text-base">
                  We are not a mass directory. We select only professional, independent companions who appreciate the finer things and value intellectual and physical connection. Every intro is filtered by our human concierge to ensure compatibility.
                </p>
              </div>
              <div className="relative min-h-56 overflow-hidden border-t border-ivory/10 md:min-h-full md:border-t-0 md:border-l">
                <Portrait image="model-3" name="A curated Circle member" kind="decor" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
            </article>
          </RevealItem>
        </RevealGroup>
      </Section>
    </div>
  )
}
