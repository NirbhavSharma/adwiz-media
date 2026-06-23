# Adwiz Media Platform

Full-stack digital growth agency website built with Next.js, Firebase, and TypeScript.

## Overview

Adwiz Media helps brands grow with social media management, online presence setup, reach campaigns, content strategy, and growth analytics. This is the production website and lead management platform.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **Icons**: lucide-react
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project ([console.firebase.google.com](https://console.firebase.google.com))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

**Firebase Admin SDK** (from Firebase Console → Project Settings → Service Accounts → Generate New Private Key):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (paste the full key, including `-----BEGIN PRIVATE KEY-----` header)

**Firebase Client SDK** (from Firebase Console → Project Settings → General → Your Apps → Web App):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

**Site URL**:
- `NEXT_PUBLIC_SITE_URL` — your production domain

### 3. Seed Firestore (optional)

Populate the `services` and `packages` collections with default data:

```bash
npm run seed
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

> **Preview mode**: The site works without Firebase credentials. Lead form submissions are validated but not persisted. Add credentials to enable full database storage.

### 5. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/
│   ├── auth/verify/route.ts    # Token verification
│   ├── health/route.ts         # Health check
│   └── leads/
│       ├── route.ts            # Lead CRUD (POST + GET)
│       └── [id]/route.ts       # Single lead (GET + PATCH)
├── admin/
│   ├── layout.tsx              # Admin layout + auth
│   ├── page.tsx                # Login page
│   ├── dashboard/page.tsx      # Lead management
│   └── admin.css               # Admin styles
├── globals.css                 # Marketing site styles
├── layout.tsx                  # Root layout + SEO
├── page.tsx                    # Marketing homepage
├── sitemap.ts                  # Dynamic sitemap
└── robots.ts                   # Robots configuration
lib/
├── firebase-admin.ts           # Admin SDK init
├── firebase-client.ts          # Client SDK init
├── validators.ts               # Shared validation
└── auth-context.tsx            # Auth React context
scripts/
└── seed-firestore.ts           # Firestore seed script
firestore.rules                 # Security rules
```

## Admin Dashboard

The admin dashboard at `/admin` provides:
- Firebase Auth login (email/password)
- Lead management table with filtering
- Lead status tracking (new → contacted → qualified → won/lost)
- Real-time lead detail view

To create an admin user, go to Firebase Console → Authentication → Users → Add User.

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/leads` | No | Submit a lead (public) |
| GET | `/api/leads` | Yes | List all leads |
| GET | `/api/leads/:id` | Yes | Get single lead |
| PATCH | `/api/leads/:id` | Yes | Update lead status |
| POST | `/api/auth/verify` | No | Verify auth token |
| GET | `/api/health` | No | Service health check |

## Firestore Collections

- **leads** — Website enquiries and lead tracking
- **services** — Agency service definitions
- **packages** — Service tier packages
- **consultations** — Consultation bookings (future)
- **campaigns** — Campaign tracking (future)

## Deployment

The project is ready for deployment on:
- **Vercel** — `vercel deploy` (recommended for Next.js)
- **Firebase Hosting** — with Cloud Functions for API routes

Set all environment variables in your deployment platform's dashboard.

## License

Private. All rights reserved.
