import { Section, Eyebrow } from '../components/ui'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'

export function About() {
  return (
    <div className="pt-32 pb-20">
      <Section className="max-w-4xl">
        <Reveal>
          <Eyebrow>Philosophy</Eyebrow>
          <h1 className="mt-5 text-5xl md:text-6xl text-ivory font-serif">About the Circle</h1>
          <p className="mt-5 text-lg text-ivory-dim leading-relaxed">
            Founded on the values of choice, respect, and utmost discretion, our circle has evolved from a small collective into India’s most trusted directory for elite companionship.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 space-y-12">
          <RevealItem>
            <div className="relative border-l-2 border-gold pl-6 md:pl-10">
              <h3 className="font-serif text-2xl text-ivory">Our Mission</h3>
              <p className="mt-4 text-sm md:text-base text-ivory-dim leading-relaxed font-light">
                We believe that companionship is a mutual, positive experience built on clear boundaries and shared respect. Our mission is to provide an elite, safe, and entirely private space where companions can safely advertise their presence, and select clients can seek their company with peace of mind.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="relative border-l-2 border-gold pl-6 md:pl-10">
              <h3 className="font-serif text-2xl text-ivory">Discretion by Design</h3>
              <p className="mt-4 text-sm md:text-base text-ivory-dim leading-relaxed font-light">
                We collect only what is essential to verify safety and facilitate secure introductions. Our systems are custom built to prevent tracker accumulation or database breaches. We operate entirely in the shadows to maintain the absolute privacy of both our models and members.
              </p>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="relative border-l-2 border-gold pl-6 md:pl-10">
              <h3 className="font-serif text-2xl text-ivory">A Curated Network</h3>
              <p className="mt-4 text-sm md:text-base text-ivory-dim leading-relaxed font-light">
                We are not a mass directory. We select only professional, independent companions who appreciate the finer things and value intellectual and physical connection. Every intro is filtered by our human concierge to ensure compatibility.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>
    </div>
  )
}
