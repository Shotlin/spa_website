-- Reversible clean-slate archive for the old demo roster.
-- This keeps the rows and Storage objects available for reference, but removes
-- them from the public site and from the Studio's active media/profile lists.
-- Run once in the Supabase SQL editor for the project connected to Vercel.

begin;

update public.profiles
set
  published = false,
  is_public = false,
  featured = false,
  primary_image_id = null,
  updated_at = now();

update public.media_assets
set
  published = false,
  is_public = false,
  updated_at = now();

commit;

-- Verification: these should both return zero.
select count(*) as visible_profiles
from public.profiles
where published and is_public;

select count(*) as visible_media
from public.media_assets
where published and is_public;
