// Original, fictional marketing content for VIP Spa.

export type Experience = {
  id: string
  title: string
  scene: string
  summary: string
  detail: string
  duration: string
}

export const experiences: Experience[] = [
  {
    id: 'personal-meetings',
    title: 'Personal Meetings',
    scene: 'personal',
    summary: 'An unhurried evening of genuine conversation and easy company.',
    detail:
      'A quiet dinner, a gallery opening, or simply a long conversation over something poured slowly. Personal meetings are the heart of what we do — real, present, and yours to shape.',
    duration: '2–4 hours',
  },
  {
    id: 'companionship',
    title: 'Social Companionship',
    scene: 'companionship',
    summary: 'A poised, engaging presence for the evenings that matter.',
    detail:
      'Weddings, galas, launches, reunions. Arrive with a companion who is at ease in any room, reads the moment, and makes you look forward to the night ahead.',
    duration: 'Half day — full evening',
  },
  {
    id: 'city-tours',
    title: 'Private City Experiences',
    scene: 'city',
    summary: 'Your chosen city, seen through someone who truly knows it.',
    detail:
      'The rooftop with the right light at dusk, the kitchen that never makes the guidebooks, the quiet corner of a landmark. A curated day or evening, entirely local, entirely private.',
    duration: 'Half day — full day',
  },
  {
    id: 'celebrations',
    title: 'Private Celebrations',
    scene: 'celebration',
    summary: 'Milestones marked with warmth, discretion, and taste.',
    detail:
      'A birthday you would rather keep intimate, an anniversary of one, a quiet victory worth toasting. We help you mark the moment beautifully and privately.',
    duration: 'Evening',
  },
  {
    id: 'travel',
    title: 'Travel Companionship',
    scene: 'travel',
    summary: 'Considered company for the road, the coast, or the retreat.',
    detail:
      'A weekend by the sea, a heritage escape, a change of air. Travel companionship is arranged with extra care around logistics, privacy, and mutual comfort.',
    duration: 'Multi-day',
  },
  {
    id: 'cultural',
    title: 'Cultural Evenings',
    scene: 'cultural',
    summary: 'Music, performance, and heritage in refined company.',
    detail:
      'A ghazal evening, a classical recital, a private viewing. For guests who find their luxury in beauty and craft, shared with someone who feels it too.',
    duration: '3–5 hours',
  },
]

export type Tier = {
  name: string
  price: string
  cadence: string
  tagline: string
  features: string[]
  featured?: boolean
}

export const tiers: Tier[] = [
  {
    name: 'Ivory',
    price: '₹25,000',
    cadence: 'per year',
    tagline: 'A considered introduction to the VIP Spa circle.',
    features: [
      'Verified access to Signature companions',
      'Standard enquiry response within 24 hours',
      'Encrypted messaging',
      'Privacy-first profile with alias',
    ],
  },
  {
    name: 'Amber',
    price: '₹75,000',
    cadence: 'per year',
    tagline: 'Priority access and a dedicated point of contact.',
    featured: true,
    features: [
      'Access to Signature & Elite companions',
      'Priority response within 3 hours',
      'Dedicated concierge',
      'Curated introductions matched to you',
      'Pan-India availability & travel planning',
    ],
  },
  {
    name: 'Obsidian',
    price: 'By invitation',
    cadence: '',
    tagline: 'Our most private tier, offered by referral only.',
    features: [
      'Full access including Muse companions',
      'Round-the-clock concierge',
      'Bespoke experience design',
      'Enhanced privacy & NDA handling',
      'Complimentary discretion review',
    ],
  },
]

export type Testimonial = {
  quote: string
  author: string
  meta: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'What struck me was the calm of it all. Everything was handled before I had to ask. I simply arrived and enjoyed the evening.',
    author: 'A guest',
    meta: 'Amber member · Mumbai',
  },
  {
    quote:
      'Genuine conversation is harder to find than it should be. Here it felt effortless — and completely private.',
    author: 'A guest',
    meta: 'Obsidian member · Delhi',
  },
  {
    quote:
      'The discretion is real, not a tagline. That is why I keep coming back.',
    author: 'A guest',
    meta: 'Amber member · Bengaluru',
  },
]

export type Feature = {
  title: string
  body: string
  icon: 'shield' | 'lock' | 'check' | 'heart'
}

export const privacyFeatures: Feature[] = [
  {
    title: 'Consent at the centre',
    body: 'Every engagement is mutual, clearly defined, and revocable at any time by either party. Boundaries are agreed in advance and always respected.',
    icon: 'heart',
  },
  {
    title: 'Privacy by design',
    body: 'Aliases by default, encrypted messaging, and no data resale — ever. Your identity is yours to reveal, on your terms.',
    icon: 'lock',
  },
  {
    title: 'Verified on both sides',
    body: 'Companions and members are verified through a discreet, secure process so that everyone meets with confidence.',
    icon: 'shield',
  },
  {
    title: 'Safety, always on',
    body: 'Check-in protocols, a 24/7 concierge line, and clear conduct standards keep every experience secure and respectful.',
    icon: 'check',
  },
]
