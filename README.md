# MIGO Rides website

MIGO Rides is an on-demand ride service that helps riders request trips, see fare estimates and driver details, and follow rides live. Drivers can sign up to receive nearby ride requests.

This website introduces the MIGO Rides service and app. The home page collects rider and driver waitlist sign-ups, while `/live` presents the product, how rides work, driver information, and safety features. Waitlist submissions are stored in Convex.

## Environment

Copy `.env.example` to `.env.local` for local development and set:

- `VITE_CONVEX_URL` to the Convex deployment URL used by the waitlist.
- `VITE_SITE_URL` to the public website origin, including `https://` (currently `https://migotech.org`).
- `VITE_POSTHOG_KEY` to the PostHog project API key (the public `phc_…` project token).
- `VITE_POSTHOG_HOST` to the PostHog ingestion host, e.g. `https://us.i.posthog.com` or `https://eu.i.posthog.com`.

Set both variables in the hosting provider's production build environment as well. Vite embeds `VITE_` variables when building the site.

## Analytics

`src/analytics.js` initialises PostHog with Session Replay through `posthog-js`, but only after the visitor allows analytics in the consent banner (`src/components/ConsentBanner.vue`). The decision is stored in `localStorage` under `migo-analytics-consent`; declining keeps the SDK from loading, and clearing that key asks again.

Replays mask every input value. Add the `ph-mask` class to mask text and `ph-no-capture` to keep an element out of recordings entirely (the admin page does this). Waitlist journey events (`waitlist_cta_clicked`, `waitlist_submitted`, `waitlist_signup_completed`, `waitlist_signup_failed`) are captured without personal data, and pageviews follow history changes so `/live` and `/waitlist` are tracked.

## SEO files

- `index.html` contains crawlable default metadata and Organization/WebSite structured data.
- Vue Unhead updates title, description, canonical, Open Graph, and Twitter metadata for `/` and `/live`.
- `public/robots.txt` allows crawling and points to `public/sitemap.xml`.
- Keep the canonical host in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `VITE_SITE_URL` aligned if the domain changes.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` creates the production site in `dist/`.
- `npm run preview` serves the production build locally.

