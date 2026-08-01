-- Add the category manager used by Studio and the homepage browse section.
-- Run this once in the Supabase SQL editor for an existing project.

begin;

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

create index if not exists categories_public_listing_idx
  on public.categories (sort_order, updated_at desc)
  where published and is_public;

grant usage on schema public to anon, authenticated;
grant select on table public.categories to anon, authenticated;
grant insert, update, delete on table public.categories to authenticated;

alter table public.categories enable row level security;

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

commit;
