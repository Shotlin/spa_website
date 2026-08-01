-- SPA Website dashboard schema
-- Apply this in the Supabase SQL Editor (or as a reviewed migration).
--
-- Bootstrap the first dashboard owner:
--   1. Create the owner's Auth user first (Dashboard > Authentication > Users).
--   2. Copy that user's UUID from auth.users.
--   3. In the SQL Editor, run:
--        insert into public.admin_users (user_id, role)
--        values ('PASTE-AUTH-USER-UUID-HERE', 'owner')
--        on conflict (user_id) do update set role = excluded.role, is_active = true;
--
-- This deliberately has no client-facing INSERT policy on admin_users. It
-- prevents a newly signed-in visitor from granting themselves dashboard access.
-- Keep all client configuration to the publishable/anon key; never use a
-- privileged key in the SPA.

begin;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  mime_type text not null check (mime_type like 'image/%'),
  byte_size bigint check (byte_size is null or byte_size >= 0),
  alt_text text,
  caption text,
  published boolean not null default false,
  is_public boolean not null default true,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text not null,
  category text not null,
  short_bio text,
  long_bio text,
  primary_image_id uuid references public.media_assets (id) on delete set null,
  primary_image_alt text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_public boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Each profile has exactly one primary_image_id column. Do not add a gallery
-- table for model cards: the public card and detail page intentionally use one
-- image per profile.
comment on column public.profiles.primary_image_id is
  'The single image used for this profile. It references one media_assets row.';

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  icon text not null default 'spark',
  media_asset_id uuid references public.media_assets (id) on delete set null,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_public boolean not null default true,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null unique,
  section text not null,
  content jsonb not null default '{}'::jsonb,
  media_asset_id uuid references public.media_assets (id) on delete set null,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  details text,
  code text,
  cta_label text,
  cta_href text,
  image_alt text,
  placement text not null default 'home',
  active boolean not null default false,
  media_asset_id uuid references public.media_assets (id) on delete set null,
  starts_at timestamptz,
  ends_at timestamptz,
  sort_order integer not null default 0,
  published boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint offers_dates_are_valid check (
    ends_at is null or starts_at is null or ends_at > starts_at
  )
);

create table if not exists public.site_settings (
  setting_key text primary key,
  value jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  source_page text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed', 'spam')),
  internal_notes text,
  is_spam boolean not null default false,
  assigned_to uuid references public.admin_users (user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_public_listing_idx
  on public.profiles (featured desc, sort_order, created_at desc)
  where published and is_public;

create index if not exists categories_public_listing_idx
  on public.categories (sort_order, updated_at desc)
  where published and is_public;

create index if not exists media_assets_public_listing_idx
  on public.media_assets (created_at desc)
  where published and is_public;

create index if not exists content_blocks_public_listing_idx
  on public.content_blocks (section, sort_order)
  where published and is_public;

create index if not exists offers_public_listing_idx
  on public.offers (sort_order, starts_at desc)
  where published and is_public;

create index if not exists audit_log_created_at_idx
  on public.audit_log (created_at desc);

create index if not exists enquiries_status_created_at_idx
  on public.enquiries (status, created_at desc);

-- Explicit Data API grants are required on newer Supabase projects. RLS below
-- still determines exactly which rows each granted role can access.
grant usage on schema public to anon, authenticated;

revoke all on table
  public.admin_users,
  public.media_assets,
  public.profiles,
  public.categories,
  public.content_blocks,
  public.offers,
  public.site_settings,
  public.audit_log,
  public.enquiries
from anon, authenticated;

grant select on table
  public.media_assets,
  public.profiles,
  public.categories,
  public.content_blocks,
  public.offers,
  public.site_settings
to anon, authenticated;

grant insert, update, delete on table
  public.media_assets,
  public.profiles,
  public.categories,
  public.content_blocks,
  public.offers,
  public.site_settings
to authenticated;

grant select on table public.admin_users to authenticated;
grant select, insert on table public.audit_log to authenticated;
grant insert on table public.enquiries to anon, authenticated;
grant select, update, delete on table public.enquiries to authenticated;

alter table public.admin_users enable row level security;
alter table public.media_assets enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.content_blocks enable row level security;
alter table public.offers enable row level security;
alter table public.site_settings enable row level security;
alter table public.audit_log enable row level security;
alter table public.enquiries enable row level security;

-- An authenticated person can read only their own role. This lets the policies
-- below safely check public.admin_users without exposing the admin roster.
drop policy if exists "Users can read their own admin access" on public.admin_users;
create policy "Users can read their own admin access"
on public.admin_users
for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Public can read published media assets" on public.media_assets;
create policy "Public can read published media assets"
on public.media_assets
for select
to anon, authenticated
using (published and is_public);

drop policy if exists "Active admins can manage media assets" on public.media_assets;
create policy "Active admins can manage media assets"
on public.media_assets
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Public can read published profiles" on public.profiles;
create policy "Public can read published profiles"
on public.profiles
for select
to anon, authenticated
using (published and is_public);

drop policy if exists "Active admins can manage profiles" on public.profiles;
create policy "Active admins can manage profiles"
on public.profiles
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Public can read published categories" on public.categories;
create policy "Public can read published categories"
on public.categories
for select
to anon, authenticated
using (published and is_public);

drop policy if exists "Active admins can manage categories" on public.categories;
create policy "Active admins can manage categories"
on public.categories
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Public can read published content blocks" on public.content_blocks;
create policy "Public can read published content blocks"
on public.content_blocks
for select
to anon, authenticated
using (published and is_public);

drop policy if exists "Active admins can manage content blocks" on public.content_blocks;
create policy "Active admins can manage content blocks"
on public.content_blocks
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Public can read published offers" on public.offers;
create policy "Public can read published offers"
on public.offers
for select
to anon, authenticated
using (
  published
  and is_public
  and active
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at > now())
);

drop policy if exists "Active admins can manage offers" on public.offers;
create policy "Active admins can manage offers"
on public.offers
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Public can read published site settings" on public.site_settings;
create policy "Public can read published site settings"
on public.site_settings
for select
to anon, authenticated
using (published and is_public);

drop policy if exists "Active admins can manage site settings" on public.site_settings;
create policy "Active admins can manage site settings"
on public.site_settings
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

-- Audit records are append-only. Dashboard users can add records attributed to
-- themselves and inspect them, but cannot rewrite or erase history.
drop policy if exists "Active admins can read audit logs" on public.audit_log;
create policy "Active admins can read audit logs"
on public.audit_log
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Active admins can append audit logs" on public.audit_log;
create policy "Active admins can append audit logs"
on public.audit_log
for insert
to authenticated
with check (
  actor_id = (select auth.uid())
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

-- A visitor may submit an enquiry but can never read another visitor's data or
-- mark their own message as handled.
drop policy if exists "Visitors can submit new enquiries" on public.enquiries;
create policy "Visitors can submit new enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (
  status = 'new'
  and is_spam = false
  and assigned_to is null
  and internal_notes is null
);

drop policy if exists "Active admins can manage enquiries" on public.enquiries;
create policy "Active admins can manage enquiries"
on public.enquiries
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

-- Public delivery of images uses a public bucket. Listing object metadata stays
-- admin-only; do not add an anon SELECT policy on storage.objects.
insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

grant usage on schema storage to authenticated;
grant select, insert, update, delete on table storage.objects to authenticated;

drop policy if exists "Active admins can list site media" on storage.objects;
create policy "Active admins can list site media"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'site-media'
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Active admins can upload site media" on storage.objects;
create policy "Active admins can upload site media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-media'
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Active admins can update site media" on storage.objects;
create policy "Active admins can update site media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-media'
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
)
with check (
  bucket_id = 'site-media'
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

drop policy if exists "Active admins can delete site media" on storage.objects;
create policy "Active admins can delete site media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'site-media'
  and exists (
    select 1
    from public.admin_users as administrator
    where administrator.user_id = (select auth.uid())
      and administrator.is_active
      and administrator.role in ('owner', 'editor')
  )
);

-- Initial public content. DO NOTHING means re-running this file will not
-- overwrite editorial changes made in the dashboard.
insert into public.content_blocks (
  block_key,
  section,
  content,
  sort_order,
  published,
  is_public
)
values (
  'home_hero',
  'home',
  '{
    "eyebrow": "Consent-first · Privacy-first · Pan-India",
    "heading": "The art of",
    "accent": "refined connection.",
    "body": "A private and verified directory of companions across India. Browsing is secure, introductions are mutual, and discretion is guaranteed.",
    "primaryCtaLabel": "Browse Directory",
    "primaryCtaHref": "/discover",
    "secondaryCtaLabel": "Our philosophy",
    "secondaryCtaHref": "/experiences"
  }'::jsonb,
  0,
  true,
  true
)
on conflict (block_key) do nothing;

insert into public.site_settings (
  setting_key,
  value,
  published,
  is_public
)
values (
  'site_identity',
  '{
    "siteName": "VIP Spa",
    "tagline": "Private company, thoughtfully arranged",
    "conciergeEmail": "hello@example.com",
    "conciergePhone": ""
  }'::jsonb,
  true,
  true
)
on conflict (setting_key) do nothing;

commit;
