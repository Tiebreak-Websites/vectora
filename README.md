# Vectora — launch placeholder

**This branch is the Coming Soon page and nothing else.** One page, no header,
no footer, no links out. The real marketing site lives on
[`website`](https://github.com/chr1srusevv/vectora/tree/website).

## Branches

The two branches share **no page or component files** and are not meant to be
merged into each other.

| Branch    | Purpose                                                            |
| --------- | ------------------------------------------------------------------ |
| `live`    | **This branch.** Placeholder only. Deploy branch — what the public gets |
| `website` | The real marketing site. Build it there.                           |
| `dev`     | Active development (predates the split)                            |
| `preview` | Staging (reserved)                                                 |
| `prod`    | Production (reserved)                                              |

`git merge website` would drag the whole site back in here. To launch, reset
this branch to `website` instead:

```bash
git switch live && git reset --hard website && git push --force-with-lease
```

## Project structure

```text
public/                 brand assets (logo, favicon, og image)
src/
  styles/global.css     brand tokens + reset (component rules live on `website`)
  pages/index.astro     the placeholder — self-contained page, inline canvas script
functions/_middleware.js  serves the placeholder for every path except its assets
```

The page carries the wordmark, a headline, one supporting line, a calibration
rail and a rotating strapline over an animated backdrop. Every moving part
loops, and all of it collapses to a static frame under
`prefers-reduced-motion`.

## Commands

| Command           | Action                              |
| ----------------- | ----------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at `localhost:4321`      |
| `npm run build`   | Build to `./dist/`                  |
| `npm run preview` | Preview the production build        |

`astro dev` does not run Pages Functions, so locally only `/` serves the page —
other paths 404. To exercise the real routing, build and run the Pages runtime:

```bash
npm run build && npx wrangler@4 pages dev dist
```

## Deployment (Cloudflare Pages)

**Live site:** https://vectora-7tw.pages.dev

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys to Cloudflare Pages (project `vectora`). It is **manual-dispatch only**
— Actions tab → "Run workflow". The `push` trigger is commented out because the
Cloudflare API token is IP-restricted and gets rejected from GitHub runners
(error 9109).

There is no Basic Auth on this branch: the placeholder is public by design, and
there is nothing else deployed to protect. The auth gate lives on `website`.

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — token with **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID
