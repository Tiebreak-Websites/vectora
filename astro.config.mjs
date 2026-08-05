// @ts-check
import { defineConfig } from 'astro/config';

// This branch serves the launch placeholder only — a single page at `/`, with
// functions/_middleware.js pointing every other path at it. The real site's
// config (page redirects, gate flag) lives on the `website` branch.
// https://astro.build/config
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 4321,
  },
});
