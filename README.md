# Vectora

Marketing site for **Vectora** — institutional-grade AI trading bots. Built with
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
functions/_middleware.js  Cloudflare Pages Basic Auth gate
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

Pushing to **`live`** triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and deploys it to Cloudflare Pages (project `vectora`).

The deployment is gated behind HTTP Basic Auth via
[`functions/_middleware.js`](functions/_middleware.js). Credentials default to
`parola` / `parola` and can be overridden with the `BASIC_AUTH_USER` and
`BASIC_AUTH_PASS` environment variables in Cloudflare.

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
