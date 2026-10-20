# MIGO Rides website

MIGO Rides is an on-demand ride service that helps riders request trips, see fare estimates and driver details, and follow rides live. Drivers can sign up to receive nearby ride requests.

This website introduces the MIGO Rides service and app. The home page collects rider and driver waitlist sign-ups, while `/live` presents the product, how rides work, driver information, and safety features. Waitlist submissions are stored in Convex.

## Environment

Copy `.env.example` to `.env.local` for local development and set:

- `VITE_CONVEX_URL` to the Convex deployment URL used by the waitlist.
- `VITE_SITE_URL` to the public website origin, including `https://` (currently `https://migotech.org`).

Set both variables in the hosting provider's production build environment as well. Vite embeds `VITE_` variables when building the site.

## SEO files

- `index.html` contains crawlable default metadata and Organization/WebSite structured data.
- Vue Unhead updates title, description, canonical, Open Graph, and Twitter metadata for `/` and `/live`.
- `public/robots.txt` allows crawling and points to `public/sitemap.xml`.
- Keep the canonical host in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `VITE_SITE_URL` aligned if the domain changes.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` creates the production site in `dist/`.
- `npm run preview` serves the production build locally.

