# VIP Spa website + Studio dashboard

The public Vite site has a protected content-management dashboard at `/admin`.
It is designed for a photo-first directory: each profile has one primary image,
while banners, offers, homepage copy, site identity, and reusable page blocks
are managed from Studio.

## What Studio controls

- Profiles: publishing state, city, category, availability, featured status,
  profile copy, and exactly one primary model image.
- Media: upload image assets to Supabase Storage and reuse them safely.
- Content: homepage hero image/copy plus additional structured page blocks.
- Offers: image-led banners, offer codes, terms, call to action, and scheduled
  visibility.
- Settings: public name and concierge contact details.

Studio uses Supabase Auth plus Row Level Security. A browser user cannot grant
themselves access, and no service-role key is included in the frontend.

`site-media` is intentionally a public delivery bucket so published images can
load directly in the browser. Upload only marketing images that are safe to be
publicly retrievable; truly private media needs a separate private bucket and
server-issued signed URLs.

## Local development

1. Copy `.env.example` to `.env.local` and fill in the Supabase URL and
   publishable key.
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173/admin`.

Without the two public variables, `/admin` shows a safe setup screen and the
public site keeps using its bundled fallback content.

## Supabase setup

1. Create a Supabase project.
2. Apply [`supabase/schema.sql`](supabase/schema.sql) as a migration. It
   creates the required tables, policies, indexes, `site-media` Storage bucket,
   and initial homepage/settings content.
3. Create the first administrator in **Authentication → Users**.
4. In the Supabase SQL editor, run the bootstrap statement at the top of
   `supabase/schema.sql`, replacing the placeholder with that user's UUID and
   choosing `owner` or `editor`.
5. Add your local and Vercel URLs to **Authentication → URL Configuration →
   Redirect URLs**. The magic-link redirect must end in `/admin`.

Use a custom SMTP provider before inviting arbitrary administrator email
addresses; Supabase's default SMTP is intended for team-member testing.

## Vercel deployment

The existing `vercel.json` already rewrites `/admin/*` to the Vite SPA.
In the Vercel project, add these Production and Preview environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Redeploy after adding them. Do not add a Supabase `service_role` key to Vercel
for this frontend and never prefix one with `VITE_`.

## Verification

```text
npm run build
npx oxlint src
```
