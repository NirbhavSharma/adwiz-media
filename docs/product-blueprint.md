# AxiSuite Enterprise Website Blueprint

## Reference Analysis

The reference site uses a broad ERP catalog model: demo CTAs, pricing/download/support links, mega-menu product categories, retail/distribution/manufacturing verticals, mobile app ecosystems, partner/support credibility, high-volume operational stats, testimonials, awards, and FAQ content. AxiSuite keeps the business logic and conversion intent, but modernizes the experience into a premium SaaS narrative with cleaner hierarchy, stronger lead capture, product cards, interactive demo views, SEO-ready resources, and enterprise credibility signals.

## Sitemap

Home, Products, Industries, Features, Interactive Demo, Why Choose Us, Success Stories, Pricing, Blog & Resources, FAQ, Contact, Privacy, Security, Partner Program, Support.

## Wireframes

1. Sticky conversion navigation with product anchors and Book Demo CTA.
2. Hero with trust badge, headline, value proposition, dual CTA, statistics, and dashboard mockup.
3. Client and partner logo strip.
4. Product and industry card grids.
5. Feature grid with operational benefits.
6. Interactive product screenshot/demo tab section.
7. Why Choose Us credibility row.
8. Testimonials and pricing cards.
9. Resource/blog cards for SEO.
10. FAQ accordion and lead generation form.
11. Footer with product, company, and resource links.

## UI Design System

Color palette: slate `#101828`, blue `#0B5FFF`, teal `#00A896`, amber `#FFB020`, rose `#F45B69`, page `#F7F9FC`, white `#FFFFFF`.

Typography: Inter/system sans. Hero 72/1.02 desktop, section headings 48/1.05, body 18/1.75, cards 20/1.25, captions 12-14 bold uppercase.

Components: buttons, cards, glass panels, dashboard widgets, logo tiles, tabs, pricing plans, accordion rows, form fields, responsive mobile navigation.

## Component Architecture

`app/layout.tsx` handles metadata and global shell. `app/page.tsx` contains the landing page components: navigation, hero, logo strip, section wrapper, card grid, interactive demo, pricing, FAQ, lead form, blueprint blocks, and footer. `app/api/leads/route.ts` validates and persists leads when `DATABASE_URL` is configured.

## API Structure

`POST /api/leads`

Request fields: `name`, `company`, `email`, `phone`, `interest`, `message`.

Response: `{ ok: true }` in production, or preview mode when PostgreSQL is not configured.

## Database Schema

See `database/schema.sql` for PostgreSQL tables covering accounts, leads, demo bookings, products, and pricing plans.

## SEO And Performance

The implementation includes metadata, OpenGraph tags, JSON-LD software schema, sitemap generation, robots configuration, semantic headings, accessible form labels, responsive CSS, reduced-motion handling, and server-friendly static content. Production Lighthouse tuning should use real images sized through `next/image`, analytics deferral, and configured deployment caching.
