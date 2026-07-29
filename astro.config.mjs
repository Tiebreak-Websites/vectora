// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 4321,
  },
  redirects: {
    '/results': '/analytics',
    '/bots': '/algos',
  },
});
