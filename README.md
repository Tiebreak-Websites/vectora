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

The site and the launch placeholder are split across separate branches with **no
shared files** — they are not meant to be merged into each other.

| Branch        | Purpose                                                        |
| ------------- | -------------------------------------------------------------- |
| `website`     | **This branch.** The real marketing site. Build it here.        |
| `live`        | Deploy branch — what the public gets. Mirrors `website`.        |
| `coming-soon` | Coming Soon placeholder only. Parked, not deployed.             |
| `dev`         | Active development (predates the split)                         |
| `preview`     | Staging (reserved)                                              |
| `prod`        | Production (reserved)                                           |

`live` is a mirror of this branch, so publishing is a fast-forward:

```bash
git switch live && git merge --ff-only website && git push
```

`coming-soon` shares no files with the site — it is a single page and none of
the site's pages or components. Merging it in either direction would drag one
into the other. To put the placeholder back up, reset `live` onto it instead:

```bash
git switch live && git reset --hard coming-soon && git push --force-with-lease
```

## Deployment (Cloudflare Pages)

**Live site:** https://vectora-7tw.pages.dev — serving the marketing site from
the `live` branch, which mirrors this one.

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys to Cloudflare Pages (project `vectora`). It is **manual-dispatch only**
(Actions tab → "Run workflow") and pushes `--branch=live`, so pushing to `live`
does not deploy on its own — run the workflow after every push.

This branch is gated behind HTTP Basic Auth via
[`functions/_middleware.js`](functions/_middleware.js). Credentials default to
`parola` / `parola` and can be overridden with the `BASIC_AUTH_USER` and
`BASIC_AUTH_PASS` environment variables in Cloudflare.

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
