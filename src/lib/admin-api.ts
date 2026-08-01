import type { User } from '@supabase/supabase-js'
import { requireSupabase, supabase } from './supabase'

export type AvailabilitySlot = {
  day: string
  slots: string
}

type DbMediaAsset = {
  id: string
  storage_path: string
  mime_type: string
  byte_size: number
  alt_text: string | null
  caption: string | null
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

type DbProfile = {
  id: string
  slug: string
  name: string
  city: string
  category: string
  short_bio: string | null
  long_bio: string | null
  primary_image_id: string | null
  primary_image_alt: string | null
  featured: boolean
  sort_order: number
  published: boolean
  is_public: boolean
  metadata: unknown
  created_at: string
  updated_at: string
  primary_image?: DbMediaAsset | null
}

type DbCategory = {
  id: string
  slug: string
  title: string
  description: string | null
  icon: string | null
  media_asset_id: string | null
  sort_order: number
  published: boolean
  is_public: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  media_asset?: DbMediaAsset | null
}

type DbContentBlock = {
  id: string
  block_key: string
  section: string
  content: unknown
  media_asset_id: string | null
  sort_order: number
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
  media_asset?: DbMediaAsset | null
}

type DbOffer = {
  id: string
  title: string
  summary: string | null
  details: string | null
  code: string | null
  cta_label: string | null
  cta_href: string | null
  image_alt: string | null
  placement: string
  active: boolean
  media_asset_id: string | null
  starts_at: string | null
  ends_at: string | null
  sort_order: number
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
  media_asset?: DbMediaAsset | null
}

type DbSiteSetting = {
  setting_key: string
  value: unknown
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export type MediaAsset = {
  id: string
  storage_path: string
  public_url: string
  alt_text: string
  object_position: string
  mime_type: string
  byte_size: number
  width: number | null
  height: number | null
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export type AdminProfile = {
  id: string
  slug: string
  name: string
  primary_image_id: string | null
  primary_image_url: string | null
  primary_image_alt: string | null
  tagline: string
  description: string
  contact_phone: string
  whatsapp_number: string
  telegram_username: string
  age: number
  city: string
  cities: string[]
  category: string
  rate: number
  languages: string[]
  interests: string[]
  traits: string[]
  verified: boolean
  tier: 'Signature' | 'Elite' | 'Muse'
  experiences: string[]
  bio: string[]
  availability: AvailabilitySlot[]
  published: boolean
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type AdminCategory = {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  media_asset_id: string | null
  image_url: string | null
  sort_order: number
  published: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export type CategoryInput = Omit<AdminCategory, 'id' | 'created_at' | 'updated_at' | 'image_url'> & { id?: string }

export type ContentBlock = {
  id: string
  key: string
  page: string
  label: string
  payload: Record<string, unknown>
  media_asset_id: string | null
  image_url: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type Offer = {
  id: string
  title: string
  body: string
  code: string | null
  terms: string | null
  media_asset_id: string | null
  image_url: string | null
  image_alt: string | null
  cta_label: string | null
  cta_href: string | null
  placement: string
  active: boolean
  starts_at: string | null
  ends_at: string | null
  sort_order: number
  published: boolean
  created_at: string
  updated_at: string
}

export type SiteSetting = {
  key: string
  value: Record<string, unknown>
  published: boolean
  updated_at: string
}

export type ProfileInput = Omit<AdminProfile, 'id' | 'created_at' | 'updated_at' | 'primary_image_url'> & { id?: string }
export type OfferInput = Omit<Offer, 'id' | 'created_at' | 'updated_at' | 'image_url'> & { id?: string }
export type ContentBlockInput = Omit<ContentBlock, 'id' | 'created_at' | 'updated_at' | 'image_url'> & { id?: string }
export type SiteSettingInput = Omit<SiteSetting, 'updated_at'>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : []
}

function availabilitySlots(value: unknown): AvailabilitySlot[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((entry) => {
    if (!isRecord(entry) || typeof entry.day !== 'string' || typeof entry.slots !== 'string') return []
    return [{ day: entry.day, slots: entry.slots }]
  })
}

function valueString(metadata: Record<string, unknown>, key: string, fallback = '') {
  return typeof metadata[key] === 'string' ? metadata[key] : fallback
}

function valueNumber(metadata: Record<string, unknown>, key: string, fallback = 0) {
  return typeof metadata[key] === 'number' && Number.isFinite(metadata[key]) ? metadata[key] : fallback
}

function publicUrl(storagePath: string) {
  if (!supabase) return ''
  return supabase.storage.from('site-media').getPublicUrl(storagePath).data.publicUrl
}

export function mapMediaAsset(row: DbMediaAsset): MediaAsset {
  return {
    id: row.id,
    storage_path: row.storage_path,
    public_url: publicUrl(row.storage_path),
    alt_text: row.alt_text || row.caption || 'Site image',
    object_position: '50% 50%',
    mime_type: row.mime_type,
    byte_size: row.byte_size,
    width: null,
    height: null,
    published: row.published,
    is_public: row.is_public,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapAdminProfile(row: DbProfile): AdminProfile {
  const metadata = isRecord(row.metadata) ? row.metadata : {}
  const primaryImage = row.primary_image ? mapMediaAsset(row.primary_image) : null
  const tier = valueString(metadata, 'tier', 'Signature')
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    primary_image_id: row.primary_image_id,
    primary_image_url: primaryImage?.public_url || null,
    primary_image_alt: row.primary_image_alt,
    tagline: valueString(metadata, 'tagline', row.short_bio || ''),
    description: valueString(metadata, 'description', row.short_bio || ''),
    contact_phone: valueString(metadata, 'contact_phone', ''),
    whatsapp_number: valueString(metadata, 'whatsapp_number', ''),
    telegram_username: valueString(metadata, 'telegram_username', ''),
    age: valueNumber(metadata, 'age', 25),
    city: row.city,
    cities: stringList(metadata.cities).length > 0 ? stringList(metadata.cities) : [row.city],
    category: row.category,
    rate: valueNumber(metadata, 'rate', 0),
    languages: stringList(metadata.languages),
    interests: stringList(metadata.interests),
    traits: stringList(metadata.traits),
    verified: metadata.verified === true,
    tier: tier === 'Elite' || tier === 'Muse' ? tier : 'Signature',
    experiences: stringList(metadata.experiences),
    bio: stringList(metadata.bio).length > 0 ? stringList(metadata.bio) : (row.long_bio ? row.long_bio.split(/\n{2,}/).filter(Boolean) : []),
    availability: availabilitySlots(metadata.availability),
    published: row.published,
    featured: row.featured,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapAdminCategory(row: DbCategory): AdminCategory {
  const media = row.media_asset ? mapMediaAsset(row.media_asset) : null
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || '',
    icon: row.icon || 'spark',
    media_asset_id: row.media_asset_id,
    image_url: media?.public_url || null,
    sort_order: row.sort_order,
    published: row.published,
    is_public: row.is_public,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapContentBlock(row: DbContentBlock): ContentBlock {
  const content = isRecord(row.content) ? row.content : {}
  const label = valueString(content, '_label', row.block_key)
  const { _label: _ignoredLabel, ...payload } = content
  const media = row.media_asset ? mapMediaAsset(row.media_asset) : null
  return {
    id: row.id,
    key: row.block_key,
    page: row.section,
    label,
    payload,
    media_asset_id: row.media_asset_id,
    image_url: media?.public_url || null,
    sort_order: row.sort_order,
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapOffer(row: DbOffer): Offer {
  const media = row.media_asset ? mapMediaAsset(row.media_asset) : null
  return {
    id: row.id,
    title: row.title,
    body: row.summary || '',
    code: row.code,
    terms: row.details,
    media_asset_id: row.media_asset_id,
    image_url: media?.public_url || null,
    image_alt: row.image_alt,
    cta_label: row.cta_label,
    cta_href: row.cta_href,
    placement: row.placement,
    active: row.active,
    starts_at: row.starts_at,
    ends_at: row.ends_at,
    sort_order: row.sort_order,
    published: row.published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapSiteSetting(row: DbSiteSetting): SiteSetting {
  return {
    key: row.setting_key,
    value: isRecord(row.value) ? row.value : {},
    published: row.published,
    updated_at: row.updated_at,
  }
}

function toErrorMessage(error: { message?: string } | null, fallback: string) {
  return error?.message || fallback
}

function makeUploadPath(file: File) {
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const id = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  return `uploads/${new Date().toISOString().slice(0, 10)}/${id}-${safeName || 'image'}`
}

export async function getAdminRole(userId: string) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('admin_users')
    .select('role, is_active')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw new Error(toErrorMessage(error, 'Could not verify dashboard access.'))
  if (!data?.is_active) return null
  return data.role === 'owner' || data.role === 'editor' ? data.role : null
}

export async function signInAdminWithPassword(email: string, password: string) {
  const client = requireSupabase()
  const { error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw new Error(toErrorMessage(error, 'Email or password is incorrect.'))
}

export async function requestAdminPasswordReset(email: string) {
  const client = requireSupabase()
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/admin`,
  })
  if (error) throw new Error(toErrorMessage(error, 'Could not send the password reset email.'))
}

export async function updateAdminPassword(password: string) {
  const client = requireSupabase()
  const { error } = await client.auth.updateUser({ password })
  if (error) throw new Error(toErrorMessage(error, 'Could not update your password.'))
}

export async function signOutAdmin() {
  const client = requireSupabase()
  const { error } = await client.auth.signOut()
  if (error) throw new Error(toErrorMessage(error, 'Could not sign out.'))
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null
  const { data, error } = await supabase.auth.getUser()
  if (error) return null
  return data.user
}

export async function listAdminProfiles() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('profiles')
    .select('*, primary_image:media_assets!profiles_primary_image_id_fkey(*)')
    .eq('metadata->>live_profile', 'true')
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })

  if (error) throw new Error(toErrorMessage(error, 'Could not load profiles.'))
  return (data ?? []).map((row) => mapAdminProfile(row as DbProfile))
}

export async function saveAdminProfile(input: ProfileInput, userId: string) {
  const client = requireSupabase()
  const metadata = {
    live_profile: true,
    tagline: input.tagline,
    description: input.description,
    contact_phone: input.contact_phone,
    whatsapp_number: input.whatsapp_number,
    telegram_username: input.telegram_username,
    age: input.age,
    cities: input.cities,
    rate: input.rate,
    languages: input.languages,
    interests: input.interests,
    traits: input.traits,
    verified: input.verified,
    tier: input.tier,
    experiences: input.experiences,
    bio: input.bio,
    availability: input.availability,
  }
  const payload = {
    slug: input.slug,
    name: input.name,
    city: input.city,
    category: input.category,
    short_bio: input.tagline || null,
    long_bio: input.bio.join('\n\n') || null,
    primary_image_id: input.primary_image_id,
    primary_image_alt: input.primary_image_alt || null,
    featured: input.featured,
    sort_order: input.sort_order,
    published: input.published,
    is_public: true,
    metadata,
    updated_at: new Date().toISOString(),
  }
  const result = input.id
    ? await client.from('profiles').update(payload).eq('id', input.id).select('*, primary_image:media_assets!profiles_primary_image_id_fkey(*)').single()
    : await client.from('profiles').insert(payload).select('*, primary_image:media_assets!profiles_primary_image_id_fkey(*)').single()

  if (result.error) throw new Error(toErrorMessage(result.error, 'Could not save the profile.'))
  const saved = mapAdminProfile(result.data as DbProfile)
  await writeAuditLog(userId, input.id ? 'profile.updated' : 'profile.created', 'profiles', saved.id, saved.name)
  return saved
}

export async function archiveAdminProfile(id: string, userId: string) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('profiles')
    .update({ published: false, is_public: false, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, name')
    .single()
  if (error) throw new Error(toErrorMessage(error, 'Could not remove the profile from the public site.'))
  await writeAuditLog(userId, 'profile.unpublished', 'profiles', id, data?.name || 'Profile unpublished')
}

export async function listAdminCategories() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('categories')
    .select('*, media_asset:media_assets!categories_media_asset_id_fkey(*)')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })
  if (error) throw new Error(toErrorMessage(error, 'Could not load categories.'))
  return (data ?? []).map((row) => mapAdminCategory(row as DbCategory))
}

export async function saveAdminCategory(input: CategoryInput, userId: string) {
  const client = requireSupabase()
  const payload = {
    slug: input.slug,
    title: input.title,
    description: input.description || null,
    icon: input.icon || 'spark',
    media_asset_id: input.media_asset_id,
    sort_order: input.sort_order,
    published: input.published,
    is_public: true,
    created_by: userId,
    updated_at: new Date().toISOString(),
  }
  const result = input.id
    ? await client.from('categories').update(payload).eq('id', input.id).select('*, media_asset:media_assets!categories_media_asset_id_fkey(*)').single()
    : await client.from('categories').insert(payload).select('*, media_asset:media_assets!categories_media_asset_id_fkey(*)').single()
  if (result.error) throw new Error(toErrorMessage(result.error, 'Could not save the category.'))
  const saved = mapAdminCategory(result.data as DbCategory)
  await writeAuditLog(userId, input.id ? 'category.updated' : 'category.created', 'categories', saved.id, saved.title)
  return saved
}

export async function deleteAdminCategory(id: string, userId: string) {
  const client = requireSupabase()
  const { data, error } = await client.from('categories').delete().eq('id', id).select('id, title').single()
  if (error) throw new Error(toErrorMessage(error, 'Could not delete the category.'))
  await writeAuditLog(userId, 'category.deleted', 'categories', id, data?.title || 'Category deleted')
}

export async function listMediaAssets() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('media_assets')
    .select('*')
    .eq('published', true)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
  if (error) throw new Error(toErrorMessage(error, 'Could not load the media library.'))
  return (data ?? []).map((row) => mapMediaAsset(row as DbMediaAsset))
}

export async function uploadMediaAsset(file: File, altText: string, userId: string) {
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file (JPG, PNG, WebP, or AVIF).')
  if (file.size > 10 * 1024 * 1024) throw new Error('Images must be 10 MB or smaller.')

  const client = requireSupabase()
  const path = makeUploadPath(file)
  const { error: uploadError } = await client.storage.from('site-media').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  })
  if (uploadError) throw new Error(toErrorMessage(uploadError, 'Could not upload the image.'))

  const { data, error } = await client
    .from('media_assets')
    .insert({
      storage_path: path,
      alt_text: altText.trim() || 'Site image',
      mime_type: file.type,
      byte_size: file.size,
      published: true,
      is_public: true,
      created_by: userId,
    })
    .select('*')
    .single()

  if (error) {
    await client.storage.from('site-media').remove([path])
    throw new Error(toErrorMessage(error, 'The image uploaded but its media record could not be saved.'))
  }
  const asset = mapMediaAsset(data as DbMediaAsset)
  await writeAuditLog(userId, 'media.uploaded', 'media_assets', asset.id, asset.alt_text)
  return asset
}

export async function listContentBlocks() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('content_blocks')
    .select('*, media_asset:media_assets!content_blocks_media_asset_id_fkey(*)')
    .order('section', { ascending: true })
    .order('sort_order', { ascending: true })
  if (error) throw new Error(toErrorMessage(error, 'Could not load content blocks.'))
  return (data ?? []).map((row) => mapContentBlock(row as DbContentBlock))
}

export async function saveContentBlock(block: ContentBlockInput, userId: string) {
  const client = requireSupabase()
  const content = { ...block.payload, _label: block.label }
  const payload = {
    block_key: block.key,
    section: block.page,
    content,
    media_asset_id: block.media_asset_id,
    sort_order: block.sort_order,
    published: block.published,
    is_public: true,
    updated_at: new Date().toISOString(),
  }
  const result = block.id
    ? await client
      .from('content_blocks')
      .update(payload)
      .eq('id', block.id)
      .select('*, media_asset:media_assets!content_blocks_media_asset_id_fkey(*)')
      .single()
    : await client
      .from('content_blocks')
      .insert(payload)
      .select('*, media_asset:media_assets!content_blocks_media_asset_id_fkey(*)')
      .single()
  const { data, error } = result
  if (error) throw new Error(toErrorMessage(error, 'Could not save the content block.'))
  const saved = mapContentBlock(data as DbContentBlock)
  await writeAuditLog(userId, 'content.saved', 'content_blocks', saved.id, saved.label)
  return saved
}

export async function listOffers() {
  const client = requireSupabase()
  const { data, error } = await client
    .from('offers')
    .select('*, media_asset:media_assets!offers_media_asset_id_fkey(*)')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false })
  if (error) throw new Error(toErrorMessage(error, 'Could not load offers.'))
  return (data ?? []).map((row) => mapOffer(row as DbOffer))
}

export async function saveOffer(input: OfferInput, userId: string) {
  const client = requireSupabase()
  const payload = {
    title: input.title,
    summary: input.body || null,
    details: input.terms || null,
    code: input.code || null,
    cta_label: input.cta_label || null,
    cta_href: input.cta_href || null,
    image_alt: input.image_alt || null,
    placement: input.placement || 'home',
    active: input.active,
    media_asset_id: input.media_asset_id,
    starts_at: input.starts_at,
    ends_at: input.ends_at,
    sort_order: input.sort_order,
    published: input.published,
    is_public: true,
    updated_at: new Date().toISOString(),
  }
  const result = input.id
    ? await client.from('offers').update(payload).eq('id', input.id).select('*, media_asset:media_assets!offers_media_asset_id_fkey(*)').single()
    : await client.from('offers').insert(payload).select('*, media_asset:media_assets!offers_media_asset_id_fkey(*)').single()
  if (result.error) throw new Error(toErrorMessage(result.error, 'Could not save the offer.'))
  const saved = mapOffer(result.data as DbOffer)
  await writeAuditLog(userId, input.id ? 'offer.updated' : 'offer.created', 'offers', saved.id, saved.title)
  return saved
}

export async function deactivateOffer(id: string, userId: string) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('offers')
    .update({ active: false, published: false, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, title')
    .single()
  if (error) throw new Error(toErrorMessage(error, 'Could not deactivate the offer.'))
  await writeAuditLog(userId, 'offer.deactivated', 'offers', id, data?.title || 'Offer deactivated')
}

export async function listSiteSettings() {
  const client = requireSupabase()
  const { data, error } = await client.from('site_settings').select('*').order('setting_key')
  if (error) throw new Error(toErrorMessage(error, 'Could not load site settings.'))
  return (data ?? []).map((row) => mapSiteSetting(row as DbSiteSetting))
}

export async function saveSiteSetting(setting: SiteSettingInput, userId: string) {
  const client = requireSupabase()
  const { data, error } = await client
    .from('site_settings')
    .upsert({
      setting_key: setting.key,
      value: setting.value,
      published: setting.published,
      is_public: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'setting_key' })
    .select('*')
    .single()
  if (error) throw new Error(toErrorMessage(error, 'Could not save site settings.'))
  const saved = mapSiteSetting(data as DbSiteSetting)
  await writeAuditLog(userId, 'settings.saved', 'site_settings', null, saved.key)
  return saved
}

function isUuid(value: string | null) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value))
}

async function writeAuditLog(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string | null,
  summary: string,
) {
  if (!supabase) return
  await supabase.from('audit_log').insert({
    actor_id: userId,
    action,
    resource_type: resourceType,
    resource_id: isUuid(resourceId) ? resourceId : null,
    details: { summary },
  })
}
