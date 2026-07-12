# WID PAI Exchange

Marketing site for **WID PAI Exchange** — a forex & crypto exchange desk. Built with Next.js
(App Router), TypeScript, Tailwind CSS v4, Framer Motion and React Three Fiber.

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4** — brand tokens defined in `src/app/globals.css` (`@theme`)
- **Framer Motion** — scroll reveals, marquee, menu transitions
- **React Three Fiber / drei / three** — the animated hero coin scene (`src/components/three`)
- **next/og `ImageResponse`** — code-generated favicon, apple touch icon and OG image
  (`src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx`) — no binary
  brand assets required
- Fonts: **Bricolage Grotesque** (display) + **Plus Jakarta Sans** (body), both self-hosted via
  `next/font/google`

## Brand system

The WID PAI wordmark is rebuilt as live SVG/text (`src/components/logo/Logo.tsx` and
`Leaf.tsx`) rather than a raster export, so it stays crisp at any size and can be recolored via
`currentColor`. The seven-blade leaf glyph is procedurally generated and reused as a decorative
motif across sections and in the generated icons.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

- Copy, phone numbers and social handles: `src/lib/utils.ts` (`SITE` object)
- Sections live in `src/components/sections/*` and are composed in `src/app/page.tsx`
- Brand colors / animation keyframes: `src/app/globals.css`

## Deployment (Vercel)

This is a zero-config Next.js app.

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new) — the Next.js framework preset is detected
   automatically.
3. Vercel will run `pnpm install` and `pnpm build` automatically (a `pnpm-lock.yaml` is
   committed, and `packageManager` is pinned in `package.json`).
4. No environment variables are required for the base site.

Or via CLI:

```bash
pnpm dlx vercel
```

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # run the production build locally
pnpm lint     # eslint
```
