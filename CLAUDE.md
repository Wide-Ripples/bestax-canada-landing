# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Critical: This is Next.js 16 — not the version you know

Next.js 16 has breaking changes from training data. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code. Key differences already in use:

- **Middleware is `src/proxy.ts`** (not `middleware.ts`), exports `proxy` function (not `middleware`)
- **`revalidateTag` requires 2 args**: `revalidateTag("content", "max")`
- **`unstable_cache`** is the ISR caching primitive used here (not `fetch` cache options)

---

## Commands

```bash
npm run dev        # local dev server (localhost:3000)
npm run build      # production build — run before every deploy
npm run lint       # ESLint
npx vercel --prod  # deploy to production (requires Vercel CLI login)
```

## Environment Variables (required in `.env.local` and Vercel dashboard)

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Login password for `/admin` dashboard |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |
| `ANTHROPIC_API_KEY` | Claude API key for the AI chat in admin dashboard |

**Windows PowerShell pitfall**: piping secrets into Vercel CLI adds BOM (`0xFEFF`) and `\r`. Always use Bash `printf` to set secrets:
```bash
printf 'value' | npx vercel env add KEY production
```
All env var reads in code include `.replace(/^﻿/, "").trim()` defensively.

---

## Architecture Overview

### Content flow (the core data model)

```
Redis (Upstash) → getContent() → page.tsx (SSG/ISR) → rendered HTML
                                      ↑
                              Admin dashboard → Claude AI → saveContent() → revalidateTag("content","max")
```

**`src/lib/schema.ts`** — `PageContent` TypeScript interface. Every editable field on the page lives here.

**`src/lib/defaultContent.ts`** — Hardcoded fallback values. Used when Redis has no data or is missing new fields.

**`src/lib/content.ts`** — `getContent()` fetches from Redis and **deep-merges stored data ON TOP of defaultContent**. This means adding new fields to the schema never breaks old Redis data — new fields always get their default value. `saveContent()` deep-merges updates into current Redis state, then calls `revalidateTag`.

**`src/app/page.tsx`** — Single async server component with `export const revalidate = 60`. Calls `getContent()`, passes all content as props to child components.

### Admin system

**`/admin/login`** — Password form → `POST /api/admin/login` → sets `admin-token` httpOnly cookie (value = ADMIN_PASSWORD, 7-day TTL).

**`/admin`** — Chat UI. Messages sent to `POST /api/admin/chat` as JSON `{ messages, imageBase64?, imageType? }` (NOT FormData). Images are pasted via Ctrl+V or file picker and sent as base64 extracted from data URL.

**`/api/admin/chat`** — Calls Claude (`claude-sonnet-4-6`) with `update_page_content` tool. When Claude uses the tool, `saveContent()` is called immediately, updating Redis and busting the ISR cache.

**`src/proxy.ts`** — Route guard: redirects unauthenticated requests to `/admin/:path*` to `/admin/login`.

### Third-party integrations

**NimbusPop booking embed** (`src/components/BookingEmbed.tsx`):
- Loaded lazily via `IntersectionObserver` (300px before viewport on mobile, immediately on desktop)
- Uses `requestIdleCallback` to defer loading so it doesn't block the main thread (fixes TBT)
- Passes `height: window.innerHeight - 172` on desktop so the iframe fills the viewport exactly
- Polls for the created `<iframe>` to add an accessible `title` attribute

**Video** (`src/components/VideoPlayer.tsx`):
- 48MB MP4 at `/public/assets/Video Canada.mp4` — only loaded when 200px from viewport via `IntersectionObserver`

### Layout — desktop vs mobile

The page has **two separate headers**:
- `DesktopHeader` (`md:flex hidden`) — sticky bar: Logo + urgency text + "Request Callback" CTA
- `StickyHeader` (`md:hidden`) — mobile-only sticky header with phone + book button

The urgency strip (`<div class="md:hidden">`) is also hidden on desktop since it's merged into `DesktopHeader`.

The booking card on desktop:
- Sticky at `top-[60px]` (below desktop header)
- `h-[calc(100vh-60px)]` on the sticky wrapper
- Red header (`shrink-0`) + iframe area (`flex-1 overflow-hidden`) + "Prefer to call?" pinned footer (`shrink-0`)
- The `lg:pt-0 lg:pb-0` on the hero section ensures the card starts flush at y=60px

`MobileBookingBar` (fixed bottom bar) auto-hides via `IntersectionObserver` when `#inline-container` is visible — prevents confusion with NimbusPop's own "Schedule Consultation" button.

### Performance notes

- `overflow-x: clip` (not `hidden`) on the page wrapper — `overflow-x: hidden` breaks `position: sticky`
- Review images are all `.webp` in `public/assets/Reviews/`. Convert new images with: `node -e "require('sharp')('input.jpg').webp({quality:85}).toFile('output.webp')"`
- Security headers (CSP, COOP, XFO, nosniff) are set in `next.config.ts` via `headers()`

### Cache busting

After any Redis update, bust the ISR cache immediately:
```bash
curl -X POST "https://bestax-canada-landing.vercel.app/api/admin/content" \
  -H "Content-Type: application/json" \
  -b "admin-token=<ADMIN_PASSWORD>" \
  -d '{"banner":{"amount":"$427,000"}}'
```

Or use the admin chat — Claude calls `saveContent()` which calls `revalidateTag` automatically.
