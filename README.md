# Vectora

Marketing site for **Vectora** — institutional-grade AI trading algos. Built with
[Astro](https://astro.build) and plain CSS/JS (no UI framework).

## Design system

Brand tokens live in [`src/styles/global.css`](src/styles/global.css) (`:root`).

| Token            | Value     | Use                      |
| ---------------- | --------- | ------------------------ |
| `--c-bg`         | `#1E262C` | Page background          |
| `--c-accent`     | `#09A165` | CTAs, important accents  |
| `--c-text`       | `#FFFFFF` | Headings / primary text  |

- **Type:** Plus Jakarta Sans (display) + Inter (body)
- **Style:** dark theme, glassmorphism cards, green glow, bold two-tone headlines

## Project structure

```text
public/                 static assets (logo, favicon, og image)
src/
  layouts/Layout.astro  HTML shell, meta, fonts, global scripts
  styles/global.css     design tokens + base styles
  components/           Header, Hero, Pillars, Strategy, Bots, Features,
                        Results, GlobalReach, Pricing, TrustBar, Contact, Footer
  pages/index.astro     homepage (composes the sections)
  pages/coming-soon.astro  standalone launch placeholder (no Header/Footer)
  middleware.ts         Coming Soon gate for `astro dev` (skipped at build)
functions/_middleware.js  Cloudflare Pages gates: Coming Soon, then Basic Auth
```

## Commands

| Command           | Action                                  |
| ----------------- | --------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Dev server at `localhost:4321`          |
| `npm run build`   | Build to `./dist/`                      |
| `npm run preview` | Preview the production build locally     |

## Branches

| Branch    | Purpose                                                |
| --------- | ------------------------------------------------------ |
| `dev`     | Active development                                     |
| `preview` | Staging (reserved)                                     |
| `prod`    | Production (reserved)                                  |
| `live`    | Deploy branch — pushing here deploys to Cloudflare     |

## Deployment (Cloudflare Pages)

**Live site:** https://vectora-7tw.pages.dev

Pushing to **`live`** triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and deploys it to Cloudflare Pages (project `vectora`).

[`functions/_middleware.js`](functions/_middleware.js) applies two gates, in order:

**1. Coming Soon — on by default.** Every route serves
[`src/pages/coming-soon.astro`](src/pages/coming-soon.astro), publicly and with
no password. The real pages are still in the build but unreachable.

| Env var        | Default | Effect                                          |
| -------------- | ------- | ----------------------------------------------- |
| `COMING_SOON`  | on      | `false` / `0` / `off` / `no` lifts the gate      |

**2. Basic Auth** — takes over once `COMING_SOON` is off, keeping the real site
off the public web. Credentials default to `parola` / `parola` and can be
overridden with `BASIC_AUTH_USER` / `BASIC_AUTH_PASS`.

### Locally

`astro dev` never runs Pages Functions, so [`src/middleware.ts`](src/middleware.ts)
mirrors the Coming Soon gate for the dev server — **`npm run dev` shows the
placeholder on every route**, same as the deployment. It is skipped during
`astro build`, so the real pages still prerender into `dist/` as normal.

To work on the real site, drop a `.env` in the project root (gitignored) and
restart the dev server:

```bash
COMING_SOON=false
```

On Windows, write that file **without a BOM** — a BOM makes the key parse as
`﻿COMING_SOON` and the flag is silently ignored. A real shell variable
(`$env:COMING_SOON='false'`) takes precedence over the file.

To exercise the production gates instead, build and run the Pages runtime:

```bash
npm run build && npx wrangler@4 pages dev dist
```

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
