import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { companions as fallbackCompanions, type Companion } from '../data/companions'
import { supabase } from './supabase'
import {
  mapAdminProfile,
  mapContentBlock,
  mapOffer,
  mapSiteSetting,
  type AdminProfile,
  type ContentBlock,
  type Offer,
  type SiteSetting,
} from './admin-api'

type SiteDataState = {
  companions: Companion[]
  contentBlocks: Record<string, ContentBlock>
  offers: Offer[]
  settings: Record<string, SiteSetting>
  loading: boolean
  configured: boolean
  error: string | null
  refresh: () => Promise<void>
}

const defaultState: SiteDataState = {
  companions: fallbackCompanions,
  contentBlocks: {},
  offers: [],
  settings: {},
  loading: false,
  configured: Boolean(supabase),
  error: null,
  refresh: async () => undefined,
}

const SiteDataContext = createContext<SiteDataState>(defaultState)

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function profileRowToCompanion(profile: AdminProfile): Companion {
  return {
    id: profile.slug,
    name: profile.name,
    image: profile.primary_image_url || '',
    tagline: profile.tagline,
    age: profile.age,
    city: profile.city,
    cities: profile.cities.length > 0 ? profile.cities : [profile.city],
    category: profile.category,
    rate: profile.rate,
    languages: profile.languages,
    interests: profile.interests,
    traits: profile.traits,
    verified: profile.verified,
    tier: profile.tier,
    experiences: profile.experiences,
    bio: profile.bio,
    availability: profile.availability,
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<SiteDataState, 'refresh'>>({
    companions: fallbackCompanions,
    contentBlocks: {},
    offers: [],
    settings: {},
    loading: Boolean(supabase),
    configured: Boolean(supabase),
    error: null,
  })

  const refresh = useCallback(async () => {
    if (!supabase) {
      setState((current) => ({ ...current, loading: false, configured: false, error: null }))
      return
    }

    setState((current) => ({ ...current, loading: true, configured: true, error: null }))
    const [profilesResult, contentResult, offersResult, settingsResult] = await Promise.all([
      supabase
        .from('profiles')
        .select('*, primary_image:media_assets!profiles_primary_image_id_fkey(*)')
        .eq('published', true)
        .order('sort_order', { ascending: true }),
      supabase.from('content_blocks').select('*, media_asset:media_assets!content_blocks_media_asset_id_fkey(*)').eq('published', true),
      supabase.from('offers').select('*, media_asset:media_assets!offers_media_asset_id_fkey(*)').eq('active', true).order('sort_order', { ascending: true }),
      supabase.from('site_settings').select('*'),
    ])

    const queryError = [profilesResult.error, contentResult.error, offersResult.error, settingsResult.error]
      .find((error) => error)?.message

    if (queryError) {
      setState((current) => ({ ...current, loading: false, configured: true, error: queryError }))
      return
    }

    const profileRows = (profilesResult.data ?? []).map((row) => mapAdminProfile(row as never))
    const contentRows = (contentResult.data ?? []).map((row) => mapContentBlock(row as never))
    const offerRows = (offersResult.data ?? []).map((row) => mapOffer(row as never))
    const settingRows = (settingsResult.data ?? []).map((row) => mapSiteSetting(row as never))
    const now = Date.now()
    const scheduledOffers = offerRows.filter((offer) => {
      const startsAt = offer.starts_at ? Date.parse(offer.starts_at) : Number.NEGATIVE_INFINITY
      const endsAt = offer.ends_at ? Date.parse(offer.ends_at) : Number.POSITIVE_INFINITY
      return startsAt <= now && now <= endsAt
    })

    setState({
      // An empty live dataset is intentional: it must not make old bundled
      // cards reappear after an editor unpublishes every remote profile.
      companions: profileRows.map(profileRowToCompanion),
      contentBlocks: Object.fromEntries(contentRows.map((block) => [block.key, block])),
      offers: scheduledOffers,
      settings: Object.fromEntries(settingRows.map((setting) => [setting.key, setting])),
      loading: false,
      configured: true,
      error: null,
    })
  }, [])

  useEffect(() => {
    void refresh().catch(() => {
      setState((current) => ({ ...current, loading: false, error: 'Could not load live site content.' }))
    })
  }, [refresh])

  const value = useMemo<SiteDataState>(() => ({ ...state, refresh }), [state, refresh])
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  return useContext(SiteDataContext)
}

export type HomeHeroContent = {
  eyebrow: string
  heading: string
  accent: string
  body: string
  imageUrl: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

const fallbackHero: HomeHeroContent = {
  eyebrow: 'Consent-first · Privacy-first · Pan-India',
  heading: 'The art of',
  accent: 'refined connection.',
  body: 'A private and verified directory of companions across India. Browsing is secure, introductions are mutual, and discretion is guaranteed.',
  imageUrl: '',
  primaryCtaLabel: 'Browse Directory',
  primaryCtaHref: '/discover',
  secondaryCtaLabel: 'Our philosophy',
  secondaryCtaHref: '/experiences',
}

export function getHomeHero(blocks: Record<string, ContentBlock>): HomeHeroContent {
  const payload = blocks.home_hero?.payload
  if (!isRecord(payload)) return fallbackHero

  return {
    eyebrow: typeof payload.eyebrow === 'string' ? payload.eyebrow : fallbackHero.eyebrow,
    heading: typeof payload.heading === 'string' ? payload.heading : fallbackHero.heading,
    accent: typeof payload.accent === 'string' ? payload.accent : fallbackHero.accent,
    body: typeof payload.body === 'string' ? payload.body : fallbackHero.body,
    imageUrl: typeof payload.imageUrl === 'string' ? payload.imageUrl : blocks.home_hero?.image_url || fallbackHero.imageUrl,
    primaryCtaLabel: typeof payload.primaryCtaLabel === 'string' ? payload.primaryCtaLabel : fallbackHero.primaryCtaLabel,
    primaryCtaHref: typeof payload.primaryCtaHref === 'string' ? payload.primaryCtaHref : fallbackHero.primaryCtaHref,
    secondaryCtaLabel: typeof payload.secondaryCtaLabel === 'string' ? payload.secondaryCtaLabel : fallbackHero.secondaryCtaLabel,
    secondaryCtaHref: typeof payload.secondaryCtaHref === 'string' ? payload.secondaryCtaHref : fallbackHero.secondaryCtaHref,
  }
}

export function getSiteIdentity(settings: Record<string, SiteSetting>) {
  const value = settings.site_identity?.value
  if (!isRecord(value)) {
    return { siteName: 'VIP Spa', conciergeEmail: '', conciergePhone: '' }
  }

  return {
    siteName: typeof value.siteName === 'string' && value.siteName.trim() ? value.siteName : 'VIP Spa',
    conciergeEmail: typeof value.conciergeEmail === 'string' ? value.conciergeEmail : '',
    conciergePhone: typeof value.conciergePhone === 'string' ? value.conciergePhone : '',
  }
}

export function toEditableProfile(profile?: AdminProfile): ProfileInputState {
  if (profile) return { ...profile }
  return {
    slug: '',
    name: '',
    primary_image_id: null,
    primary_image_url: null,
    primary_image_alt: '',
    tagline: '',
    age: 25,
    city: 'Surat',
    cities: ['Surat'],
    category: 'Call Girls',
    rate: 0,
    languages: ['English'],
    interests: [],
    traits: [],
    verified: false,
    tier: 'Signature',
    experiences: [],
    bio: [],
    availability: [],
    published: false,
    featured: false,
    sort_order: 0,
  }
}

export type ProfileInputState = Omit<AdminProfile, 'id' | 'created_at' | 'updated_at'> & { id?: string }
